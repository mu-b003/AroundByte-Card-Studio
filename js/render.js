// Renderer: ONE function draws every card (preview, PNG, PDF, A4 sheet, bulk) so output always matches the preview.
const C128='212222,222122,222221,121223,121322,131222,122213,122312,132212,221213,221312,231212,112232,122132,122231,113222,123122,123221,223211,221132,221231,213212,223112,312131,311222,321122,321221,312212,322112,322211,212123,212321,232121,111323,131123,131321,112313,132113,132311,211313,231113,231311,112133,112331,132131,113123,113321,133121,313121,211331,231131,213113,213311,213131,311123,311321,331121,312113,312311,332111,314111,221411,431111,111224,111422,121124,121421,141122,141221,112214,112412,122114,122411,142112,142211,241211,221114,413111,241112,134111,111242,121142,121241,114212,124112,124211,411212,421112,421211,212141,214121,412121,111143,111341,131141,114113,114311,411113,411311,113141,114131,311141,411131,211412,211214,211232'.split(','),STOP='2331112';
export const CARD={w:85.6,h:54,radius:3.18,dpi:300};
export const dims=o=>o==='portrait'?{W:CARD.h,H:CARD.w}:{W:CARD.w,H:CARD.h};
export const pxmm=dpi=>dpi/25.4;
const FONT={sans:'Inter',serif:'"Playfair Display"',disp:'"Space Grotesk"'};
export const FONT_FACES=['400 12px Inter','500 12px Inter','600 12px Inter','700 12px Inter','400 12px "Noto Sans Arabic"','500 12px "Noto Sans Arabic"','600 12px "Noto Sans Arabic"','700 12px "Noto Sans Arabic"','600 12px "Playfair Display"','700 12px "Playfair Display"','500 12px "Space Grotesk"','700 12px "Space Grotesk"'];
export const loadFonts=()=>Promise.all(FONT_FACES.map(f=>document.fonts.load(f,'Aa أب'))).then(()=>document.fonts.ready);
const AR=/[\u0600-\u06FF]/;
const col=(p,c)=>(c&&p[c])||c||'#000';

export function code128(txt){ // Code 128-B -> array of bar/space widths (starts with a bar)
  const s=String(txt).replace(/[^\x20-\x7e]/g,'?');let sum=104;const seq=[104];
  for(let i=0;i<s.length;i++){const v=s.charCodeAt(i)-32;seq.push(v);sum+=v*(i+1)}
  seq.push(sum%103);const w=[];seq.forEach(v=>w.push(...C128[v].split('').map(Number)));w.push(...STOP.split('').map(Number));return w;
}
export function qrMatrix(txt){
  const q=window.qrcode(0,'M');q.addData(String(txt||' '),'Byte');q.make();const n=q.getModuleCount(),m=[];
  for(let r=0;r<n;r++){m.push([]);for(let c=0;c<n;c++)m[r].push(q.isDark(r,c))}return m;
}
function rr(ctx,x,y,w,h,r){r=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function shapePath(ctx,e,x,y,w,h){if(e.shape==='circ'){ctx.beginPath();ctx.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,7)}else if(e.shape==='round')rr(ctx,x,y,w,h,(e.r||1.5)*ctx._s);else{ctx.beginPath();ctx.rect(x,y,w,h)}}

export const LAB={
 en:{name:'Name',id:'ID No.',role:'Role',unit:'Unit',org:'Organization',sig:'Authorized signature',terms:'Terms of use',addr:'Address',phone:'Phone',valid:'Valid until',holder:'Card holder'},
 ar:{name:'الاسم',id:'الرقم',role:'الصفة',unit:'الوحدة',org:'الجهة',sig:'التوقيع المعتمد',terms:'شروط الاستخدام',addr:'العنوان',phone:'الهاتف',valid:'صالحة حتى',holder:'حامل البطاقة'}};

/* draw(ctx,{tpl,orient,side,state,px,bleed,ph,guides,round}) — state: {palette,cardLang,values,custom,photoImg,photo:{zoom,ox,oy},logoImg} */
export function draw(ctx,o){
  const {tpl,orient,side,state,px,bleed=0}=o,{W,H}=dims(orient),S=px;
  const pal=tpl.palettes.find(p=>p.id===state.palette)||tpl.palettes[0],P=pal.c;
  const lang=state.cardLang||'en',M=lang==='ar',L=LAB[lang],V=state.values||{};
  const lay=tpl.layout(orient,W,H)[side]||[];
  ctx.save();ctx._s=S;ctx.setTransform(1,0,0,1,0,0);
  ctx.translate(bleed*S,bleed*S);
  if(o.round){rr(ctx,0,0,W*S,H*S,CARD.radius*S);ctx.clip()}
  ctx.fillStyle=P.bg;ctx.fillRect(-bleed*S,-bleed*S,(W+2*bleed)*S,(H+2*bleed)*S);
  const X=(x,w=0)=>(M?W-x-w:x)*S;
  const lblFor=k=>(tpl.fields.find(f=>f.k===k)||{})['l'+(M?'a':'e')]||L[k]||k;
  for(const e of lay){
    ctx.save();ctx.globalAlpha=e.o??1;
    if(e.k==='rect'){let{x,y,w,h}=e;if(x<=0){x-=bleed;w+=bleed}if(x+w>=W){w+=bleed}if(y<=0){y-=bleed;h+=bleed}if(y+h>=H){h+=bleed}
      ctx.fillStyle=col(P,e.f);if(e.r){rr(ctx,X(x,w),y*S,w*S,h*S,e.r*S);ctx.fill()}else ctx.fillRect(X(x,w),y*S,w*S,h*S);
      if(e.s){ctx.strokeStyle=col(P,e.s);ctx.lineWidth=(e.sw||.3)*S;e.r?ctx.stroke():ctx.strokeRect(X(x,w),y*S,w*S,h*S)}}
    else if(e.k==='circ'){ctx.beginPath();ctx.arc(X(e.x),e.y*S,e.r*S,0,7);if(e.f){ctx.fillStyle=col(P,e.f);ctx.fill()}if(e.s){ctx.strokeStyle=col(P,e.s);ctx.lineWidth=(e.sw||.3)*S;ctx.stroke()}}
    else if(e.k==='poly'){ctx.beginPath();e.p.forEach(([x,y],i)=>ctx[i?'lineTo':'moveTo'](X(x),y*S));ctx.closePath();ctx.fillStyle=col(P,e.f);ctx.fill()}
    else if(e.k==='line'){ctx.strokeStyle=col(P,e.s);ctx.lineWidth=(e.sw||.3)*S;ctx.beginPath();ctx.moveTo(X(e.x),e.y*S);ctx.lineTo(X(e.x2),e.y2*S);ctx.stroke()}
    else if(e.k==='dots'){const g=e.g||1.7;ctx.fillStyle=col(P,e.f);for(let yy=0;yy<=e.h;yy+=g)for(let xx=0;xx<=e.w;xx+=g){ctx.beginPath();ctx.arc(X(e.x+xx),(e.y+yy)*S,(e.r||.28)*S,0,7);ctx.fill()}}
    else if(e.k==='text')txt(ctx,e,P,S,M,W,V,lblFor,L,X);
    else if(e.k==='photo')photo(ctx,e,state,P,S,X,o.ph);
    else if(e.k==='logo')logo(ctx,e,state,P,S,X,o.ph,V);
    else if(e.k==='qr'){const m=qrMatrix(V.qr||V.id||V.name),n=m.length,pad=e.pad??1.2,cs=(e.s-2*pad)/n,x0=X(e.x,e.s);
      ctx.fillStyle=e.bg||'#fff';ctx.fillRect(x0,e.y*S,e.s*S,e.s*S);ctx.fillStyle=e.f||'#000';
      for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(m[r][c])ctx.fillRect(x0+(pad+c*cs)*S,(e.y+pad+r*cs)*S,cs*S+.5,cs*S+.5)}
    else if(e.k==='bar'){const w=code128(V.id||V.name||'0'),tot=w.reduce((a,b)=>a+b,0),u=e.w/tot,x0=X(e.x,e.w);
      if(e.bg){ctx.fillStyle=e.bg;ctx.fillRect(x0-1*S,(e.y-.8)*S,(e.w+2)*S,(e.h+1.6)*S)}
      ctx.fillStyle=e.f||'#000';let cx=0;w.forEach((n,i)=>{if(i%2===0)ctx.fillRect(x0+cx*u*S,e.y*S,n*u*S+.4,e.h*S);cx+=n})}
    else if(e.k==='custom'){let y=e.y;const rows=(state.custom||[]).filter(c=>c.l||c.v).slice(0,e.n||4);
      rows.forEach(c=>{txt(ctx,{x:e.x,y,w:e.w,s:e.s*.8,c:e.mu||'mu',wt:600,up:1,ls:.4,al:e.al},P,S,M,W,V,()=>0,L,X,c.l);
        txt(ctx,{x:e.x,y:y+2.6,w:e.w,s:e.s,c:e.c||'tx',wt:500,al:e.al},P,S,M,W,V,()=>0,L,X,c.v);y+=e.gap||5.8})}
    ctx.restore();
  }
  ctx.restore();
  if(o.round||o.guides){ctx.save();ctx.translate(bleed*S,bleed*S);
    if(o.guides){const m=3*S;ctx.setLineDash([3,3]);ctx.strokeStyle='rgba(255,60,60,.8)';ctx.lineWidth=1;ctx.strokeRect(m,m,W*S-2*m,H*S-2*m)}ctx.restore()}
}
function txt(ctx,e,P,S,M,W,V,lblFor,L,X,over){
  let s=over!==undefined?String(over):e.v;if(over===undefined){
    if(s&&s[0]==='=')s=s.slice(1);else if(s&&s[0]==='@')s=lblFor(s.slice(1));else if(s&&s[0]==='$')s=L[s.slice(1)]||s.slice(1);else s=V[s]||'';
    if(s&&e.pre)s=e.pre+s;}
  if(!s)return;if(e.up&&!AR.test(s))s=s.toUpperCase();
  let sz=e.s*.3528*S;const base=sz,ff=FONT[e.f||'sans'],wt=e.wt||500,rtl=AR.test(s);
  const setf=()=>{ctx.font=`${wt} ${sz}px ${ff},"Noto Sans Arabic",sans-serif`};
  ctx.direction=rtl?'rtl':'ltr';ctx.textBaseline='middle';ctx.fillStyle=col(P,e.c||'tx');
  if('letterSpacing' in ctx)ctx.letterSpacing=(!rtl&&e.ls)?e.ls*S/3+'px':'0px';
  setf();const maxw=e.w*S;let al=e.al||'left';if(M)al=al==='left'?'right':al==='right'?'left':al;
  const ax=al==='left'?X(e.x,e.w):al==='right'?X(e.x,e.w)+maxw:X(e.x,e.w)+maxw/2;ctx.textAlign=al;
  if((e.ml||1)<2){while(ctx.measureText(s).width>maxw&&sz>base*.55){sz*=.95;setf()}ctx.fillText(s,ax,e.y*S);return}
  const words=s.split(/\s+/),lines=[];let cur='';for(const w of words){const t=cur?cur+' '+w:w;if(ctx.measureText(t).width>maxw&&cur){lines.push(cur);cur=w}else cur=t}if(cur)lines.push(cur);
  lines.slice(0,e.ml).forEach((l,i)=>ctx.fillText(l,ax,(e.y+i*e.s*.3528*(e.lh||1.3))*S));
}
function photo(ctx,e,st,P,S,X,ph){
  const x=X(e.x,e.w),y=e.y*S,w=e.w*S,h=e.h*S;ctx.save();shapePath(ctx,e,x,y,w,h);ctx.clip();
  const im=st.photoImg;
  if(im){const ph_=st.photo||{},z=Math.max(1,ph_.zoom||1),sc=Math.max(w/im.width,h/im.height)*z,dw=im.width*sc,dh=im.height*sc;
    ctx.drawImage(im,x+(w-dw)/2+(ph_.ox||0)*(dw-w)/2,y+(h-dh)/2+(ph_.oy||0)*(dh-h)/2,dw,dh)}
  else{ctx.fillStyle=ph?'#cfd5dd':'#e6e9ee';ctx.fillRect(x,y,w,h);
    if(ph){ctx.fillStyle='#f4f6f9';ctx.beginPath();ctx.arc(x+w/2,y+h*.38,w*.2,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(x+w/2,y+h*1.02,w*.42,h*.36,0,0,7);ctx.fill()}}
  ctx.restore();
  if(e.bw){ctx.save();ctx.strokeStyle=col(P,e.bs||'c');ctx.lineWidth=e.bw*S;shapePath(ctx,e,x,y,w,h);ctx.stroke();ctx.restore()}
}
function logo(ctx,e,st,P,S,X,ph,V){
  const x=X(e.x,e.w),y=e.y*S,w=e.w*S,h=e.h*S,im=st.logoImg;
  if(im){const sc=Math.min(w/im.width,h/im.height);ctx.drawImage(im,x+(w-im.width*sc)/2,y+(h-im.height*sc)/2,im.width*sc,im.height*sc)}
  else if(ph){const r=Math.min(w,h)/2;ctx.strokeStyle=col(P,e.c||'c');ctx.lineWidth=.45*S;ctx.beginPath();ctx.arc(x+w/2,y+h/2,r*.92,0,7);ctx.stroke();
    ctx.fillStyle=col(P,e.c||'c');ctx.font=`700 ${r*1.05}px Inter,"Noto Sans Arabic",sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='ltr';ctx.fillText((V.org||'A').trim().charAt(0),x+w/2,y+h/2+r*.05)}
}
