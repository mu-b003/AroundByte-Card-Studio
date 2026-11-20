import {t,lang} from './i18n.js';
import {$,$$,esc,toast,ICON,importImage,loadImage,download,safeName} from './ui.js';
import {byId,CATS} from './templates/index.js';
import {draw,dims} from './render.js';
import {S} from './state.js';
import {renderCard,pngBlob,cardsPdf,sheetPdf,sheetLayout,slotXY,A4} from './export.js';
import {saveDesign} from './store.js';

let view,raf=0,onResize;
const ED=()=>S.ED,tpl=()=>byId(S.ED.tplId),sample=()=>CATS[tpl().cat].sample;
const fl=f=>f['l'+(lang()==='ar'?'a':'e')];

/* Preview state shows sample text for empty fields; export state uses only what the user entered. */
function viewState(real){
  const e=ED(),sm=sample(),sv=sm[e.cardLang]||sm.en,v={};
  for(const k of Object.keys(sv))v[k]=real?(e.values[k]||''):(e.values[k]||sv[k]);
  if(e.values.qr)v.qr=e.values.qr;
  const has=e.custom.some(c=>c.l||c.v);
  return {palette:e.palette,cardLang:e.cardLang,values:v,custom:real||has?e.custom:sm.custom,photoImg:e.photoImg,photo:e.photo,logoImg:e.logoImg};
}
async function hydrate(){const e=ED();
  if(e.photo.data&&!e.photoImg)try{e.photoImg=await loadImage(e.photo.data)}catch{e.photo.data=null}
  if(e.logo.data&&!e.logoImg)try{e.logoImg=await loadImage(e.logo.data)}catch{e.logo.data=null}}
function redraw(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{
  const cv=$('#cv',view);if(!cv)return;const e=ED(),{W,H}=dims(e.orient),px=10;cv.width=Math.round(W*px);cv.height=Math.round(H*px);
  const st=$('#stage',view),avail=Math.max(200,st.clientWidth-28),base=Math.min(avail,W>H?640:360)*(e.zoom/100);cv.style.width=base+'px';cv.style.height=base*H/W+'px';
  cv.style.borderRadius=(3.18/W*base)+'px';
  draw(cv.getContext('2d'),{tpl:tpl(),orient:e.orient,side:e.side,px,ph:true,round:true,guides:e.guides,state:viewState(false)})})}

/* ---------- mount ---------- */
export function mount(v){
  view=v;const e=ED();if(e.sides===1)e.side='front';
  view.innerHTML=`<div class="work"><div><div class="ed-bar" id="bar"></div><div class="stage" id="stage"><canvas id="cv" role="img" aria-label="${esc(tpl().name[lang()])}"></canvas></div><div class="cfg" id="cfg"></div></div><aside class="panel" id="panel"></aside></div>`;
  bar();panel();hydrate().then(redraw);redraw();
  onResize=()=>redraw();window.addEventListener('resize',onResize);
}
export function unmount(){cancelAnimationFrame(raf);window.removeEventListener('resize',onResize)}

function bar(){const e=ED();
  $('#bar',view).innerHTML=(e.sides===2?`<div class="seg" role="tablist"><button data-side="front" class="${e.side==='front'?'on':''}">${t('front')}</button><button data-side="back" class="${e.side==='back'?'on':''}">${t('back')}</button></div>`:'')+
   `<span class="sp"></span><label class="check-row"><input type="checkbox" id="guides" ${e.guides?'checked':''}>${t('showSafe')}</label><label style="flex-direction:row;align-items:center;gap:8px">${t('viewZoom')}<input type="range" id="zoom" min="50" max="200" step="5" value="${e.zoom}"></label>`;
  const o=t(e.orient),s=e.sides===2?t('double'):t('single');$('#cfg',view).innerHTML=t('printCfg',{o,s,mm:t('mm')});
  $$('[data-side]',view).forEach(b=>b.onclick=()=>{e.side=b.dataset.side;bar();panel();redraw()});
  $('#guides',view).onchange=x=>{e.guides=x.target.checked;redraw()};$('#zoom',view).oninput=x=>{e.zoom=+x.target.value;redraw()};
}

/* ---------- side panel ---------- */
const seg=(name,opts,cur)=>`<div class="seg" data-seg="${name}">`+opts.map(([v,l])=>`<button data-v="${v}" class="${String(cur)===String(v)?'on':''}">${l}</button>`).join('')+`</div>`;
function fieldHtml(f){const e=ED(),sv=(sample()[e.cardLang]||sample().en)[f.k]||'',val=esc(e.values[f.k]||'');
  const star=f.req?` <span class="req-star" title="${t('req')}">*</span>`:'';
  return `<label><span>${esc(fl(f))}${star}</span>`+(f.long?`<textarea data-f="${f.k}" placeholder="${esc(t('samplePh',{s:sv}))}" maxlength="200">${val}</textarea>`:`<input data-f="${f.k}" value="${val}" placeholder="${esc(t('samplePh',{s:sv}))}" maxlength="80" ${/[\u0600-\u06FF]/.test(e.values[f.k]||'')?'dir="auto"':''}>`)+`</label>`}
function photoHtml(){const e=ED(),p=e.photo;let warn='';
  if(e.photoImg){const ph=tpl().layout(e.orient,...Object.values(dims(e.orient))).front.find(x=>x.k==='photo');
    if(ph){const mm=Math.max(ph.w/e.photoImg.width,ph.h/e.photoImg.height)/Math.max(1,p.zoom),dpi=Math.round(25.4/mm);if(dpi<200)warn=`<div class="hint warn">${t('lowRes',{n:dpi})}</div>`}}
  return `<div class="sec"><h2>${t('photo')}</h2><div class="row2"><span class="btn file-btn">${e.photo.data?t('replacePhoto'):t('uploadPhoto')}<input type="file" id="photoIn" accept="image/*"></span>${p.data?`<button class="btn ghost" id="photoRm">${t('remove')}</button>`:''}</div>`+
   (p.data?`<label>${t('zoom')}<input type="range" data-ph="zoom" min="1" max="3" step=".01" value="${p.zoom}"></label><label>${t('moveX')}<input type="range" data-ph="ox" min="-1" max="1" step=".01" value="${p.ox}"></label><label>${t('moveY')}<input type="range" data-ph="oy" min="-1" max="1" step=".01" value="${p.oy}"></label>`+warn:`<div class="hint">${t('photoNone')}</div>`)+`</div>`}
function customHtml(){const e=ED();
  if(e.sides!==2)return `<div class="sec"><h2>${t('custom')}</h2><div class="hint">${t('customNeedsBack')}</div></div>`;
  return `<div class="sec"><h2>${t('custom')}</h2><div class="hint">${t('customNote')}</div>`+e.custom.map((c,i)=>`<div class="cf-row"><input data-c="${i}" data-k="l" value="${esc(c.l)}" placeholder="${t('customLabel')}" maxlength="24"><input data-c="${i}" data-k="v" value="${esc(c.v)}" placeholder="${t('customValue')}" maxlength="40"><button class="btn icon ghost" data-crm="${i}" aria-label="${t('remove')}">${ICON.x}</button></div>`).join('')+(e.custom.length<3?`<button class="btn ghost" id="cadd">+ ${t('addCustom')}</button>`:'')+`</div>`}
function panel(){const e=ED(),tp=tpl(),p=$('#panel',view),front=e.side==='front';
  const fields=tp.fields.filter(f=>front?f.side!=='back':f.side==='back');
  p.innerHTML=`<div class="sec"><h2>${t('setup')}</h2><label>${t('designName')}<input id="dname" value="${esc(e.name)}" maxlength="60" placeholder="${esc(tp.name[lang()])}"></label>
   <label>${t('orientation')}${seg('orient',[['landscape',t('landscape')],['portrait',t('portrait')]],e.orient)}</label>
   <label>${t('sides')}${seg('sides',[[1,t('single')],[2,t('double')]],e.sides)}</label>
   <label>${t('cardLang')}${seg('cl',[['en','English'],['ar','العربية']],e.cardLang)}</label><div class="hint">${t('cardLangNote')}</div></div>
  <div class="sec"><h2>${t('colors')}</h2><div class="sw">${tp.palettes.map(x=>`<button data-pal="${x.id}" class="${e.palette===x.id?'on':''}" aria-label="${x.id}"><i style="background:${x.c.bg}"></i><i style="background:${x.c.a}"></i><i style="background:${x.c.c}"></i></button>`).join('')}</div></div>
  <div class="sec"><h2>${t('branding')}</h2><div class="row2"><span class="btn file-btn">${e.logo.data?t('replaceLogo'):t('uploadLogo')}<input type="file" id="logoIn" accept="image/*"></span>${e.logo.data?`<button class="btn ghost" id="logoRm">${t('remove')}</button>`:''}</div><div class="hint">${t('logoNote')}</div></div>
  <div class="sec"><h2>${front?t('frontDetails'):t('backDetails')}</h2>${front?'':`<div class="hint">${t('sharedHint')}</div>`}${fields.map(fieldHtml).join('')}</div>`+
  (front?photoHtml()+(e.sides!==2?customHtml():''):customHtml())+
  `<div class="sec"><button class="btn" id="save">${t('save')}</button><button class="btn pri" id="exp">${t('export')}</button></div>`;
  wire(p);
}
function wire(p){const e=ED();
  $('#dname',p).oninput=x=>{e.name=x.target.value};
  $$('[data-seg]',p).forEach(g=>$$('button',g).forEach(b=>b.onclick=()=>{const k=g.dataset.seg,v=b.dataset.v;
    if(k==='orient')e.orient=v;else if(k==='sides'){e.sides=+v;if(e.sides===1)e.side='front'}else e.cardLang=v;bar();panel();redraw()}));
  $$('[data-pal]',p).forEach(b=>b.onclick=()=>{e.palette=b.dataset.pal;$$('[data-pal]',p).forEach(x=>x.classList.toggle('on',x===b));redraw()});
  $$('[data-f]',p).forEach(i=>i.oninput=()=>{e.values[i.dataset.f]=i.value;if(/[\u0600-\u06FF]/.test(i.value))i.dir='auto';redraw()});
  $$('[data-c]',p).forEach(i=>i.oninput=()=>{e.custom[+i.dataset.c][i.dataset.k]=i.value;redraw()});
  $$('[data-crm]',p).forEach(b=>b.onclick=()=>{e.custom.splice(+b.dataset.crm,1);panel();redraw()});
  const add=$('#cadd',p);if(add)add.onclick=()=>{e.custom.push({l:'',v:''});panel();redraw();$$('[data-c]',view).pop()?.focus()};
  $$('[data-ph]',p).forEach(i=>i.oninput=()=>{e.photo[i.dataset.ph]=+i.value;redraw()});
  const up=(id,key,opt)=>{const inp=$(id,p);if(!inp)return;inp.onchange=async()=>{const f=inp.files[0];inp.value='';if(!f)return;
    try{const r=await importImage(f,opt);e[key].data=r.data;e[key+'Img']=await loadImage(r.data);if(key==='photo'){e.photo.zoom=1;e.photo.ox=0;e.photo.oy=0}panel();redraw()}
    catch(err){toast(t(['badType','tooBig','badImg'].includes(err.message)?err.message:'badImg'),'err')}}};
  up('#photoIn','photo',{max:1600,alpha:false});up('#logoIn','logo',{max:800,alpha:true});
  const rm=(id,key)=>{const b=$(id,p);if(b)b.onclick=()=>{e[key].data=null;e[key+'Img']=null;panel();redraw()}};rm('#photoRm','photo');rm('#logoRm','logo');
  $('#save',p).onclick=save;$('#exp',p).onclick=exportDialog;
}
/* ---------- save ---------- */
async function save(){const e=ED();
  try{const tp=tpl(),{W,H}=dims(e.orient),c=document.createElement('canvas'),px=4;c.width=W*px;c.height=H*px;
    draw(c.getContext('2d'),{tpl:tp,orient:e.orient,side:'front',px,ph:true,round:true,state:viewState(false)});
    if(!e.id)e.id=Date.now().toString(36)+Math.random().toString(36).slice(2,7);
    await saveDesign({id:e.id,name:e.name,tplId:e.tplId,orient:e.orient,sides:e.sides,palette:e.palette,cardLang:e.cardLang,values:e.values,custom:e.custom,photo:e.photo,logo:e.logo,updated:Date.now(),thumb:c.toDataURL('image/png')});
    toast(t('saved'),'ok')}catch(err){toast(t('failed')+': '+err.message,'err')}}

/* ---------- export / print ---------- */
function missing(){const e=ED();return tpl().fields.filter(f=>f.req&&!(e.values[f.k]||'').trim()).map(fl)}
function exportDialog(){
  const e=ED(),d=$('#dlg'),tp=tpl(),{W,H}=dims(e.orient);d.className='studio wide';
  const opt={fmt:'pdf',bleed:false,marks:true,copies:null};
  d.innerHTML=`<div class="dh"><b>${t('expTitle')} — ${esc(tp.name[lang()])}</b><button class="btn icon ghost" data-x aria-label="${t('close')}">${ICON.x}</button></div><div class="db">
   <div class="err" id="xerr" hidden></div>
   <label>${t('fmt')}${seg('fmt',[['pdf',t('fmtPdf')],['png',t('fmtPng')],['a4',t('fmtA4')]],'pdf')}</label>
   <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:flex-end;margin:12px 0"><label class="check-row"><input type="checkbox" id="xb">${t('bleed')}</label>
    <span id="a4o" hidden style="display:none;gap:18px;flex-wrap:wrap;align-items:flex-end"><label class="check-row"><input type="checkbox" id="xm" checked>${t('marks')}</label><label style="width:150px">${t('copies')}<input type="number" id="xc" min="1" max="500"></label></span></div>
   <div class="sheet-prev" id="prev"></div><p class="hint" id="info"></p><p class="hint">${t('printNote')}</p>
   <div class="row2" style="margin-top:12px"><button class="btn ghost" data-x>${t('cancel')}</button><button class="btn pri" id="dl">${t('download')}</button></div></div>`;
  const q=s=>$(s,d),L=()=>sheetLayout(W,H,opt.bleed?2:0,opt.marks);
  const miss=missing();if(miss.length){const x=q('#xerr');x.hidden=false;x.textContent=t('reqMissing',{f:miss.join(', ')});q('#dl').disabled=true}
  const thumbs={};const thumb=side=>thumbs[side+opt.bleed]||(thumbs[side+opt.bleed]=renderCard(tp,e.orient,side,viewState(false),{bleed:opt.bleed?2:0,dpi:60}));
  const sides=e.sides===2?['front','back']:['front'];
  function preview(){const P=q('#prev'),info=q('#info'),b=opt.bleed?2:0;P.innerHTML='';
    if(opt.fmt==='a4'){const l=L(),n=opt.copies||l.per,pages=Math.ceil(n/l.per),s=1.4;
      sides.forEach(side=>{const c=document.createElement('canvas');c.width=A4.w*s;c.height=A4.h*s;c.style.width='230px';const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);
        for(let i=0;i<Math.min(n,l.per);i++){const {x:px,y:py}=slotXY(l,i,side==='back');x.drawImage(thumb(side),px*s,py*s,l.sw*s,l.sh*s);
          if(opt.marks){x.strokeStyle='#000';x.lineWidth=.6;const tx=px+b,ty=py+b;for(const [cx,cy,sx,sy] of [[tx,ty,-1,-1],[tx+W,ty,1,-1],[tx,ty+H,-1,1],[tx+W,ty+H,1,1]]){x.beginPath();x.moveTo((cx+sx*1.2)*s,cy*s);x.lineTo((cx+sx*3.7)*s,cy*s);x.moveTo(cx*s,(cy+sy*1.2)*s);x.lineTo(cx*s,(cy+sy*3.7)*s);x.stroke()}}}
        const f=document.createElement('figure');f.append(c);f.append(t(side==='front'?'frontPage':'backPage'));P.append(f)});
      info.textContent=t('sheetInfo',{c:l.cols,r:l.rows,n:l.per,p:pages,b:e.sides===2?t('backInfo',{p:pages}):''})}
    else sides.forEach(side=>{const c=thumb(side),k=document.createElement('canvas');k.width=c.width;k.height=c.height;k.style.width=Math.min(300,W>H?300:170)+'px';k.getContext('2d').drawImage(c,0,0);
      const f=document.createElement('figure');f.append(k);f.append(t(side)+` · ${(W+2*b).toFixed(1)} × ${(H+2*b).toFixed(1)} mm`);P.append(f)});
    if(opt.fmt!=='a4')info.innerHTML=opt.fmt==='png'?`PNG · 300 DPI · ${Math.round((W+2*b)*300/25.4)} × ${Math.round((H+2*b)*300/25.4)} px`+(e.sides===2?' · '+t('front')+' + '+t('back'):''):`PDF · ${t('printCfg',{o:t(e.orient),s:e.sides===2?t('double'):t('single'),mm:t('mm')})}`}
  const sync=()=>{q('#a4o').style.display=opt.fmt==='a4'?'flex':'none';if(opt.fmt==='a4'&&!opt.copies)q('#xc').value=L().per;preview()};
  $$('[data-seg=fmt] button',d).forEach(b=>b.onclick=()=>{opt.fmt=b.dataset.v;$$('[data-seg=fmt] button',d).forEach(x=>x.classList.toggle('on',x===b));sync()});
  q('#xb').onchange=x=>{opt.bleed=x.target.checked;if(!q('#xc').dataset.u)opt.copies=null,q('#xc').value=L().per;preview()};
  q('#xm').onchange=x=>{opt.marks=x.target.checked;if(!q('#xc').dataset.u)q('#xc').value=L().per;preview()};
  q('#xc').oninput=x=>{x.target.dataset.u=1;opt.copies=Math.max(1,Math.min(500,+x.target.value||1));preview()};
  $$('[data-x]',d).forEach(b=>b.onclick=()=>d.close());
  q('#dl').onclick=async()=>{const btn=q('#dl');btn.disabled=true;const old=btn.textContent;btn.textContent=t('preparing');
    try{const b=opt.bleed?2:0,st=viewState(true),mk=side=>renderCard(tp,e.orient,side,st,{bleed:b}),front=mk('front'),back=e.sides===2?mk('back'):null,item={W,H,front,back},nm=safeName(e.name||tp.name.en);
      if(opt.fmt==='png'){if(back){const z=new JSZip();z.file(nm+'-front.png',await pngBlob(front));z.file(nm+'-back.png',await pngBlob(back));download(await z.generateAsync({type:'blob'}),nm+'.zip')}else download(await pngBlob(front),nm+'-front.png')}
      else if(opt.fmt==='pdf')download(await cardsPdf([item],{bleed:b}),nm+'.pdf');
      else{const n=opt.copies||L().per;download(await sheetPdf(Array(n).fill(item),{bleed:b,marks:opt.marks,sides:e.sides}),nm+'-A4.pdf')}
      toast(t('exported'),'ok')}catch(err){console.error(err);toast(t('failed')+': '+err.message,'err')}finally{btn.disabled=!!missing().length;btn.textContent=old}};
  sync();d.showModal();
}
