// Renderer: ONE function draws every card (preview, PNG, PDF, A4 sheet, bulk) so output always matches the preview.
const C128='212222,222122,222221,121223,121322,131222,122213,122312,132212,221213,221312,231212,112232,122132,122231,113222,123122,123221,223211,221132,221231,213212,223112,312131,311222,321122,321221,312212,322112,322211,212123,212321,232121,111323,131123,131321,112313,132113,132311,211313,231113,231311,112133,112331,132131,113123,113321,133121,313121,211331,231131,213113,213311,213131,311123,311321,331121,312113,312311,332111,314111,221411,431111,111224,111422,121124,121421,141122,141221,112214,112412,122114,122411,142112,142211,241211,221114,413111,241112,134111,111242,121142,121241,114212,124112,124211,411212,421112,421211,212141,214121,412121,111143,111341,131141,114113,114311,411113,411311,113141,114131,311141,411131,211412,211214,211232'.split(','),STOP='2331112';
export const CARD={w:85.6,h:54,radius:3.18,dpi:300};
export const SIZES=[{id:'cr80',w:85.6,h:54},{id:'90x60',w:90,h:60},{id:'100x70',w:100,h:70},{id:'custom',w:85.6,h:54}];
/* Physical card size in mm for an orientation. size = {w,h} (landscape dims); omitted = CR80. */
export const dims=(o,s)=>{const w=(s&&s.w)||CARD.w,h=(s&&s.h)||CARD.h;return o==='portrait'?{W:h,H:w}:{W:w,H:h}};
export const pxmm=dpi=>dpi/25.4;
const FONT={sans:'Inter',serif:'"Playfair Display"',disp:'"Space Grotesk"'};
export const FONT_FACES=['400 12px Inter','500 12px Inter','600 12px Inter','700 12px Inter','400 12px "Noto Sans Arabic"','500 12px "Noto Sans Arabic"','600 12px "Noto Sans Arabic"','700 12px "Noto Sans Arabic"','600 12px "Playfair Display"','700 12px "Playfair Display"','500 12px "Space Grotesk"','700 12px "Space Grotesk"'];
export const loadFonts=()=>Promise.all(FONT_FACES.map(f=>document.fonts.load(f,'Aa أب'))).then(()=>document.fonts.ready);
const AR=/[\u0600-\u06FF]/;
const col=(p,c)=>(c&&p[c])||c||'#000';
export const code128Valid=s=>/^[\x20-\x7e]+$/.test(String(s));
export function code128(txt){ // Code 128-B -> array of bar/space widths (starts with a bar)
  const s=String(txt).replace(/[^\x20-\x7e]/g,'?');let sum=104;const seq=[104];
  for(let i=0;i<s.length;i++){const v=s.charCodeAt(i)-32;seq.push(v);sum+=v*(i+1)}
  seq.push(sum%103);const w=[];seq.forEach(v=>w.push(...C128[v].split('').map(Number)));w.push(...STOP.split('').map(Number));return w;
}
export function qrMatrix(txt){
  const Q=window.qrcode;if(Q.stringToBytesFuncs&&Q.stringToBytesFuncs['UTF-8'])Q.stringToBytes=Q.stringToBytesFuncs['UTF-8']; // Arabic / accented text must be UTF-8
  const q=Q(0,'M');q.addData(String(txt||' '),'Byte');q.make();const n=q.getModuleCount(),m=[];
  for(let r=0;r<n;r++){m.push([]);for(let c=0;c<n;c++)m[r].push(q.isDark(r,c))}return m;
}
function rr(ctx,x,y,w,h,r){r=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function shapePath(ctx,e,x,y,w,h){if(e.shape==='circ'){ctx.beginPath();ctx.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,7)}else if(e.shape==='round')rr(ctx,x,y,w,h,(e.r||1.5)*ctx._s);else{ctx.beginPath();ctx.rect(x,y,w,h)}}

export const LAB={
 en:{name:'Name',id:'ID No.',role:'Role',unit:'Unit',org:'Organization',sig:'Authorized signature',terms:'Terms of use',addr:'Address',phone:'Phone',valid:'Valid until',holder:'Card holder'},
 ar:{name:'الاسم',id:'الرقم',role:'الصفة',unit:'الوحدة',org:'الجهة',sig:'التوقيع المعتمد',terms:'شروط الاستخدام',addr:'العنوان',phone:'الهاتف',valid:'صالحة حتى',holder:'حامل البطاقة'}};

/* ---- code engine -------------------------------------------------------
   A template exposes a code AREA per side (k:'codearea', or — for older templates — the box of its built-in qr/bar element).
   When state.codes exists the built-in qr/bar elements are dropped and QR / Code 128 are laid out inside that area, so a code can never
   overlap the template's own content. state.codes = {qr:{on,side,scale,dx,dy}, bar:{…}} ; single-sided cards always use the front. */
export const codeSide=(st,k)=>st.sides===1?'front':((st.codes[k]||{}).side||'front');
function findArea(lay,all,side,RF,on){
  const a=lay.find(e=>e.k==='codearea');if(a)return a;
  const old=lay.find(e=>e.k==='qr'||e.k==='bar');
  if(old)return old.k==='qr'?{x:old.x,y:old.y,w:old.s,h:old.s}:{x:old.x,y:old.y,w:old.w,h:old.h};
  const L=RF.W>RF.H,w=L?30:RF.W-8,h=L?10:11;return {x:L?RF.W-4-w:4,y:RF.H-3.5-h,w,h,fallback:1}; // template has no code area
}
export const hasArea=(tpl,orient,side)=>{const RF=dims(orient),l=tpl.layout(orient,RF.W,RF.H)[side]||[];return l.some(e=>e.k==='codearea'||e.k==='qr'||e.k==='bar')};
function placeCodes(a,on,cd){
  let qr=null,bar=null;const both=on.length===2;
  if(both){if(a.w>=a.h*1.8){const s=Math.min(a.h,a.w*.4);qr={x:a.x,y:a.y+(a.h-s)/2,s};bar={x:a.x+s+1.5,y:a.y,w:a.w-s-1.5,h:a.h}}
    else{const s=Math.min(a.w,a.h*.58);qr={x:a.x+(a.w-s)/2,y:a.y,s};bar={x:a.x,y:a.y+s+1,w:a.w,h:a.h-s-1}}}
  else if(on[0]==='qr'){const s=Math.min(a.w,a.h);qr={x:a.x+(a.w-s)/2,y:a.y+(a.h-s)/2,s}}
  else{const h=Math.min(a.h,Math.max(6,a.w*.22));bar={x:a.x,y:a.y+(a.h-h)/2,w:a.w,h}}
  const out=[],clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
  if(qr){const c=cd.qr,k=clamp(c.scale||1,.5,1.5),s=qr.s*k;out.push({k:'qr2',x:qr.x+(qr.s-s)/2+(c.dx||0),y:qr.y+(qr.s-s)/2+(c.dy||0),s})}
  if(bar){const c=cd.bar,k=clamp(c.scale||1,.5,1.5),w=bar.w*k,h=bar.h*k;out.push({k:'bar2',x:bar.x+(bar.w-w)/2+(c.dx||0),y:bar.y+(bar.h-h)/2+(c.dy||0),w,h})}
  return out;
}
export function withCodes(lay,all,side,st,RF){
  const cd=st.codes,out=lay.filter(e=>e.k!=='qr'&&e.k!=='bar'&&e.k!=='codearea');
  const on=['qr','bar'].filter(k=>cd[k]&&cd[k].on&&codeSide(st,k)===side);if(!on.length)return out;
  return out.concat(placeCodes(findArea(lay,all,side,RF,on),on,cd));
}
/* Module (narrowest bar / QR cell) size in whole pixels at 300 DPI for each enabled code — below 2 px a printed code is not reliably scannable. */
export function codeMetrics(tpl,orient,size,st){const c=st.codes;if(!c)return {};
  const RF=dims(orient),{W,H}=dims(orient,size),k=Math.min(W/RF.W,H/RF.H),all=tpl.layout(orient,RF.W,RF.H),V=st.values||{},out={},ppm=300/25.4;
  for(const side of ['front','back']){const lay=withCodes(all[side]||[],all,side,st,RF),q=lay.find(e=>e.k==='qr2'),b=lay.find(e=>e.k==='bar2'),bv=V.bar||V.id||'';
    if(q){const n=qrMatrix(V.qr||V.id||V.name).length+8;out.qr={side,px:Math.floor(q.s*k*ppm/n)}}
    if(b&&bv&&code128Valid(bv)){const mods=code128(bv).reduce((a,x)=>a+x,0)+20;out.bar={side,px:Math.floor(b.w*k*ppm/mods)}}}
  return out}
export const BLOCKING=['barChars','barEmpty','qrEmpty'];
export function codeIssues(st,g){const c=st.codes,V=st.values||{},o=[];if(!c)return o;
  if(c.bar&&c.bar.on){const v=V.bar||V.id||'';if(!v)o.push('barEmpty');else if(!code128Valid(v))o.push('barChars')}
  if(c.qr&&c.qr.on){const v=V.qr||V.id||V.name||'';if(!v)o.push('qrEmpty');else if(new TextEncoder().encode(v).length>90)o.push('qrLong')}
  if(g){const m=codeMetrics(g.tpl,g.orient,g.size,st);if(m.bar&&m.bar.px<2)o.push('barSmall');if(m.qr&&m.qr.px<2)o.push('qrSmall')}
  return o}

/* draw(ctx,{tpl,orient,side,state,px,bleed,ph,guides,round,size})
   state: {palette,colors,fontFam,cardLang,sides,values,custom,photoImg,photo,logoImg,hide,labels,style,xf,codes}
   Layouts are authored for CR80; other sizes are scaled uniformly (never distorted) and centred, edge-touching shapes extend to fill. */
export function draw(ctx,o){
  const {tpl,orient,side,state,px,bleed=0}=o,{W,H}=dims(orient,o.size),RF=dims(orient),k=Math.min(W/RF.W,H/RF.H),ox=(W-RF.W*k)/2,oy=(H-RF.H*k)/2,S=px*k;
  const pal=tpl.palettes.find(p=>p.id===state.palette)||tpl.palettes[0],P={...pal.c,...(state.colors||{})};
  const lang=state.cardLang||'en',M=lang==='ar',L=LAB[lang],V=state.values||{};
  const all=tpl.layout(orient,RF.W,RF.H);let lay=all[side]||[];if(state.codes)lay=withCodes(lay,all,side,state,RF);
  ctx.save();ctx.setTransform(1,0,0,1,0,0);
  ctx.translate(bleed*px,bleed*px);
  if(o.round){rr(ctx,0,0,W*px,H*px,CARD.radius*px);ctx.clip()}
  ctx.fillStyle=P.bg;ctx.fillRect(-bleed*px,-bleed*px,(W+2*bleed)*px,(H+2*bleed)*px);
  ctx.translate(ox*px,oy*px);ctx._s=S;
  const exX=(bleed+ox)/k,exY=(bleed+oy)/k;
  const X=(x,w=0)=>(M?RF.W-x-w:x)*S;
  const lblFor=key=>(tpl.fields.find(f=>f.k===key)||{})['l'+(M?'a':'e')]||L[key]||key;
  const K={P,S,M,V,L,X,st:state,lblFor,fontFam:state.fontFam};
  for(const e of lay){
    ctx.save();ctx.globalAlpha=e.o??1;
    if(e.k==='rect'){let{x,y,w,h}=e;if(x<=0){x-=exX;w+=exX}if(x+w>=RF.W-.001){w+=exX}if(y<=0){y-=exY;h+=exY}if(y+h>=RF.H-.001){h+=exY}
      ctx.fillStyle=col(P,e.f);if(e.r){rr(ctx,X(x,w),y*S,w*S,h*S,e.r*S);ctx.fill()}else ctx.fillRect(X(x,w),y*S,w*S,h*S);
      if(e.s){ctx.strokeStyle=col(P,e.s);ctx.lineWidth=(e.sw||.3)*S;e.r?ctx.stroke():ctx.strokeRect(X(x,w),y*S,w*S,h*S)}}
    else if(e.k==='circ'){ctx.beginPath();ctx.arc(X(e.x),e.y*S,e.r*S,0,7);if(e.f){ctx.fillStyle=col(P,e.f);ctx.fill()}if(e.s){ctx.strokeStyle=col(P,e.s);ctx.lineWidth=(e.sw||.3)*S;ctx.stroke()}}
    else if(e.k==='poly'){ctx.beginPath();e.p.forEach(([x,y],i)=>ctx[i?'lineTo':'moveTo'](X(x),y*S));ctx.closePath();if(e.f){ctx.fillStyle=col(P,e.f);ctx.fill()}if(e.s){ctx.strokeStyle=col(P,e.s);ctx.lineWidth=(e.sw||.3)*S;ctx.lineJoin='round';ctx.stroke()}}
    else if(e.k==='line'){ctx.strokeStyle=col(P,e.s);ctx.lineWidth=(e.sw||.3)*S;if(e.dash)ctx.setLineDash(e.dash.map(d=>d*S));ctx.beginPath();ctx.moveTo(X(e.x),e.y*S);ctx.lineTo(X(e.x2),e.y2*S);ctx.stroke()}
    else if(e.k==='arc'){ctx.beginPath();const a0=e.a0*Math.PI/180,a1=e.a1*Math.PI/180;M?ctx.arc(X(e.x),e.y*S,e.r*S,Math.PI-a1,Math.PI-a0):ctx.arc(X(e.x),e.y*S,e.r*S,a0,a1);ctx.strokeStyle=col(P,e.s);ctx.lineWidth=(e.sw||.3)*S;ctx.lineCap='round';ctx.stroke()}
    else if(e.k==='dots'){const g=e.g||1.7;ctx.fillStyle=col(P,e.f);for(let yy=0;yy<=e.h;yy+=g)for(let xx=0;xx<=e.w;xx+=g){ctx.beginPath();ctx.arc(X(e.x+xx),(e.y+yy)*S,(e.r||.28)*S,0,7);ctx.fill()}}
    else if(e.k==='text')txt(ctx,e,K);
    else if(e.k==='photo')photo(ctx,e,state,P,S,X,o.ph);
    else if(e.k==='logo')logo(ctx,e,state,P,S,X,o.ph,V);
    else if(e.k==='qr'){const m=qrMatrix(V.qr||V.id||V.name),n=m.length,pad=e.pad??1.2,cs=(e.s-2*pad)/n,x0=X(e.x,e.s);
      ctx.fillStyle=e.bg||'#fff';ctx.fillRect(x0,e.y*S,e.s*S,e.s*S);ctx.fillStyle=e.f||'#000';
      for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(m[r][c])ctx.fillRect(x0+(pad+c*cs)*S,(e.y+pad+r*cs)*S,cs*S+.5,cs*S+.5)}
    else if(e.k==='bar'){const w=code128(V.id||V.name||'0'),tot=w.reduce((a,b)=>a+b,0),u=e.w/tot,x0=X(e.x,e.w);
      if(e.bg){ctx.fillStyle=e.bg;ctx.fillRect(x0-1*S,(e.y-.8)*S,(e.w+2)*S,(e.h+1.6)*S)}
      ctx.fillStyle=e.f||'#000';let cx=0;w.forEach((n,i)=>{if(i%2===0)ctx.fillRect(x0+cx*u*S,e.y*S,n*u*S+.4,e.h*S);cx+=n})}
    else if(e.k==='qr2'){ // engine QR: integer-pixel modules, 4-module quiet zone, always black on white
      const m=qrMatrix(V.qr||V.id||V.name),n=m.length,tot=n+8,box=e.s*S,cell=box/tot>=1?Math.floor(box/tot):box/tot,tile=cell*tot,x0=X(e.x,e.s)+(box-tile)/2,y0=e.y*S+(box-tile)/2;
      ctx.fillStyle='#fff';ctx.fillRect(x0,y0,tile,tile);ctx.fillStyle='#000';
      for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(m[r][c])ctx.fillRect(x0+(4+c)*cell,y0+(4+r)*cell,cell,cell)}
    else if(e.k==='bar2'){ // engine Code 128: integer-pixel modules, 10-module quiet zones, black on white
      const v=V.bar||V.id||'';if(v&&code128Valid(v)){const w=code128(v),tot=w.reduce((a,b)=>a+b,0),mods=tot+20,box=e.w*S,u=box/mods>=1?Math.floor(box/mods):box/mods,tw=u*mods,x0=X(e.x,e.w)+(box-tw)/2,y0=e.y*S;
        ctx.fillStyle='#fff';ctx.fillRect(x0,y0,tw,e.h*S);ctx.fillStyle='#000';let cx=10*u;w.forEach((n,i)=>{if(i%2===0)ctx.fillRect(x0+cx,y0,n*u,e.h*S);cx+=n*u})}}
    else if(e.k==='custom'){let y=e.y;const rows=(state.custom||[]).filter(c=>c.l||c.v).slice(0,e.n||4);
      rows.forEach(c=>{txt(ctx,{x:e.x,y,w:e.w,s:e.s*.8,c:e.mu||'mu',wt:600,up:1,ls:.4,al:e.al},K,c.l);
        txt(ctx,{x:e.x,y:y+2.6,w:e.w,s:e.s,c:e.c||'tx',wt:500,al:e.al},K,c.v);y+=e.gap||5.8})}
    ctx.restore();
  }
  ctx.restore();
  if(o.round||o.guides){ctx.save();ctx.translate(bleed*px,bleed*px);
    if(o.guides){const m=3*px;ctx.setLineDash([3,3]);ctx.strokeStyle='rgba(255,60,60,.8)';ctx.lineWidth=1;ctx.strokeRect(m,m,W*px-2*m,H*px-2*m)}ctx.restore()}
}
function txt(ctx,e,K,over){
  const {P,S,M,V,L,X,st}=K;let s,key=null,isLabel=false;
  if(over!==undefined)s=String(over);
  else{const v=e.v;
    if(v&&v[0]==='=')s=v.slice(1);
    else if(v&&v[0]==='@'){key=v.slice(1);isLabel=true;s=((st.labels||{})[st.cardLang]||{})[key]||K.lblFor(key)}
    else if(v&&v[0]==='$')s=L[v.slice(1)]||v.slice(1);
    else{key=v;s=V[v]||''}
    if(key&&st.hide&&st.hide[key])return;
    if(s&&e.pre&&!isLabel)s=e.pre+s;}
  if(!s)return;if(e.up&&!AR.test(s))s=s.toUpperCase();
  const sty=(!isLabel&&key&&st.style&&st.style[key])||{};
  let sz=e.s*(sty.s||1)*.3528*S;const base=sz,ff=FONT[K.fontFam||sty.f||e.f||'sans'],wt=sty.wt||e.wt||500,rtl=AR.test(s);
  const setf=()=>{ctx.font=`${wt} ${sz}px ${ff},"Noto Sans Arabic",sans-serif`};
  ctx.direction=rtl?'rtl':'ltr';ctx.textBaseline='middle';ctx.fillStyle=sty.c||col(P,e.c||'tx');
  if('letterSpacing' in ctx)ctx.letterSpacing=(!rtl&&e.ls)?e.ls*S/3+'px':'0px';
  setf();const maxw=e.w*S;let al=sty.al||e.al||'left';if(M)al=al==='left'?'right':al==='right'?'left':al;
  const ax=al==='left'?X(e.x,e.w):al==='right'?X(e.x,e.w)+maxw:X(e.x,e.w)+maxw/2;ctx.textAlign=al;
  if((e.ml||1)<2){while(ctx.measureText(s).width>maxw&&sz>base*.55){sz*=.95;setf()}ctx.fillText(s,ax,e.y*S);return}
  const words=s.split(/\s+/),lines=[];let cur='';for(const w of words){const t=cur?cur+' '+w:w;if(ctx.measureText(t).width>maxw&&cur){lines.push(cur);cur=w}else cur=t}if(cur)lines.push(cur);
  lines.slice(0,e.ml).forEach((l,i)=>ctx.fillText(l,ax,(e.y+i*e.s*.3528*(e.lh||1.3))*S));
}
const box=(e,xf)=>{const t=xf||{},sc=t.sc||1;return {x:e.x+e.w*(1-sc)/2+(t.dx||0),y:e.y+e.h*(1-sc)/2+(t.dy||0),w:e.w*sc,h:e.h*sc}};
function photo(ctx,e0,st,P,S,X,ph){
  const b=box(e0,st.xf&&st.xf.photo),e={...e0,...b};
  const x=X(e.x,e.w),y=e.y*S,w=e.w*S,h=e.h*S;ctx.save();shapePath(ctx,e,x,y,w,h);ctx.clip();
  const im=st.photoImg;
  if(im){const ph_=st.photo||{},z=Math.max(1,ph_.zoom||1),sc=Math.max(w/im.width,h/im.height)*z,dw=im.width*sc,dh=im.height*sc;
    ctx.drawImage(im,x+(w-dw)/2+(ph_.ox||0)*(dw-w)/2,y+(h-dh)/2+(ph_.oy||0)*(dh-h)/2,dw,dh)}
  else{ctx.fillStyle=ph?'#cfd5dd':'#e6e9ee';ctx.fillRect(x,y,w,h);
    if(ph){ctx.fillStyle='#f4f6f9';ctx.beginPath();ctx.arc(x+w/2,y+h*.38,w*.2,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(x+w/2,y+h*1.02,w*.42,h*.36,0,0,7);ctx.fill()}}
  ctx.restore();
  if(e.bw){ctx.save();ctx.strokeStyle=col(P,e.bs||'c');ctx.lineWidth=e.bw*S;shapePath(ctx,e,x,y,w,h);ctx.stroke();ctx.restore()}
}
function logo(ctx,e0,st,P,S,X,ph,V){
  const e={...e0,...box(e0,st.xf&&st.xf.logo)},x=X(e.x,e.w),y=e.y*S,w=e.w*S,h=e.h*S,im=st.logoImg;
  if(im){const sc=Math.min(w/im.width,h/im.height);ctx.drawImage(im,x+(w-im.width*sc)/2,y+(h-im.height*sc)/2,im.width*sc,im.height*sc)}
  else if(ph){const r=Math.min(w,h)/2;ctx.strokeStyle=col(P,e.c||'c');ctx.lineWidth=.45*S;ctx.beginPath();ctx.arc(x+w/2,y+h/2,r*.92,0,7);ctx.stroke();
    ctx.fillStyle=col(P,e.c||'c');ctx.font=`700 ${r*1.05}px Inter,"Noto Sans Arabic",sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';ctx.fillText((V.org||'A').trim().charAt(0),x+w/2,y+h/2+r*.05)}
}
