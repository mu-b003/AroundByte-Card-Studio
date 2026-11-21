import {t,lang} from './i18n.js';
import {$,$$,esc,toast,ICON,importImage,loadImage,download,safeName,copyText} from './ui.js';
import {byId,CATS} from './templates/index.js';
import {draw,dims,hasArea,codeIssues,codeSide,BLOCKING} from './render.js';
import {mkSize,codeDefaults,LIMITS,tplLink} from './design.js';
import {SIZES} from './render.js';
import {S} from './state.js';
import {renderCard,pngBlob,jpgBlob,cardsPdf,sheetPdf,sheetLayout,slotXY,A4} from './export.js';
import {saveDesign} from './store.js';

let view,raf=0,onResize;
const ED=()=>S.ED,tpl=()=>byId(S.ED.tplId),sample=()=>CATS[tpl().cat].sample;
const fl=f=>f['l'+(lang()==='ar'?'a':'e')];

/* Preview state shows sample text for empty fields; export state uses only what the user entered. */
function viewState(real){
  const e=ED(),sm=sample(),sv=sm[e.cardLang]||sm.en,v={},lg=e.cardLang,lb=e.labels[lg]||{};
  for(const k of Object.keys(sv))v[k]=real?(e.values[k]||''):(e.values[k]||sv[k]);
  if(e.values.qr)v.qr=e.values.qr;if(e.values.bar)v.bar=e.values.bar;
  /* optional details (teacher, parent, …) are only printed when the user typed a value; they join the user's own custom rows */
  const extras=tpl().fields.filter(f=>f.side==='extra'&&!e.hide[f.k]&&(e.values[f.k]||'').trim()).map(f=>({l:lb[f.k]||f['l'+(lg==='ar'?'a':'e')],v:e.values[f.k]}));
  const rows=[...extras,...e.custom.filter(c=>c.l||c.v)];
  return {palette:e.palette,colors:e.colors,fontFam:e.fontFam,cardLang:lg,sides:e.sides,values:v,custom:real||rows.length?rows:sm.custom,photoImg:e.photoImg,photo:e.photo,logoImg:e.logoImg,hide:e.hide,labels:e.labels,style:e.style,xf:e.xf,codes:e.codes};
}
async function hydrate(){const e=ED();
  if(e.photo.data&&!e.photoImg)try{e.photoImg=await loadImage(e.photo.data)}catch{e.photo.data=null}
  if(e.logo.data&&!e.logoImg)try{e.logoImg=await loadImage(e.logo.data)}catch{e.logo.data=null}}
function redraw(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{
  const cv=$('#cv',view);if(!cv)return;const e=ED(),{W,H}=dims(e.orient,e.size),px=10;cv.width=Math.round(W*px);cv.height=Math.round(H*px);
  const st=$('#stage',view),avail=Math.max(200,st.clientWidth-28),base=Math.min(avail,W>H?640:360)*(e.zoom/100);cv.style.width=base+'px';cv.style.height=base*H/W+'px';
  cv.style.borderRadius=(3.18/W*base)+'px';
  draw(cv.getContext('2d'),{tpl:tpl(),orient:e.orient,side:e.side,px,ph:true,round:true,guides:e.guides,size:e.size,state:viewState(false)})})}

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
   `<span class="sp"></span><button class="btn ghost" id="cplink" title="${t('copyTplLink')}">${ICON.link}<span>${t('copyLink')}</span></button><label class="check-row"><input type="checkbox" id="guides" ${e.guides?'checked':''}>${t('showSafe')}</label><label style="flex-direction:row;align-items:center;gap:8px">${t('viewZoom')}<input type="range" id="zoom" min="50" max="200" step="5" value="${e.zoom}"></label>`;
  const o=t(e.orient),s=e.sides===2?t('double'):t('single'),{W,H}=dims(e.orient,e.size);$('#cfg',view).innerHTML=t('printCfg',{o,s,mm:t('mm'),sz:`${+W.toFixed(1)} × ${+H.toFixed(1)}`})+(e.sides===2?` · <b>${t('editingSide',{s:t(e.side)})}</b>`:'');
  $$('[data-side]',view).forEach(b=>b.onclick=()=>{e.side=b.dataset.side;bar();panel();redraw()});
  $('#cplink',view).onclick=async()=>toast(t(await copyText(tplLink(e.tplId,{orient:e.orient,sides:e.sides,size:e.size}))?'linkCopied':'linkFailed'),'ok');
  $('#guides',view).onchange=x=>{e.guides=x.target.checked;redraw()};$('#zoom',view).oninput=x=>{e.zoom=+x.target.value;redraw()};
}

/* ---------- side panel ---------- */
const seg=(name,opts,cur)=>`<div class="seg" data-seg="${name}">`+opts.map(([v,l])=>`<button data-v="${v}" class="${String(cur)===String(v)?'on':''}">${l}</button>`).join('')+`</div>`;
const hex=c=>/^#[0-9a-f]{6}$/i.test(c||'')?c:'#000000';
let openField=null;
const isAr=v=>/[\u0600-\u06FF]/.test(v||'');
function fieldHtml(f){const e=ED(),sv=(sample()[e.cardLang]||sample().en)[f.k]||'',val=esc(e.values[f.k]||''),hid=!!e.hide[f.k],st=e.style[f.k]||{},lb=(e.labels[e.cardLang]||{})[f.k]||'';
  const star=f.req?` <span class="req-star" title="${t('req')}">*</span>`:'',sens=f.sens?`<span class="chip-sens" title="${esc(t('sensNote'))}">⚠ ${t('sensitive')}</span>`:'';
  const inp=f.long?`<textarea data-f="${f.k}" placeholder="${esc(t('samplePh',{s:sv}))}" maxlength="200">${val}</textarea>`:`<input data-f="${f.k}" value="${val}" placeholder="${esc(t('samplePh',{s:sv}))}" maxlength="80" ${isAr(e.values[f.k])?'dir="auto"':''}>`;
  const tools=openField===f.k?`<div class="fld-tools"><label>${t('label')}<input data-lbl="${f.k}" value="${esc(lb)}" placeholder="${esc(fl(f))}" maxlength="40"></label>
   <div class="r2"><label>${t('color')}<input type="color" data-sty="${f.k}.c" value="${hex(st.c)}"></label><label>${t('sizeMul')}<input type="range" data-sty="${f.k}.s" min=".6" max="1.5" step=".05" value="${st.s||1}"></label></div>
   <div class="r2"><label>${t('font')}<select data-sty="${f.k}.f"><option value="">${t('fontDef')}</option>${[['sans','fontSans'],['serif','fontSerif'],['disp','fontDisp']].map(([v,k])=>`<option value="${v}" ${st.f===v?'selected':''}>${t(k)}</option>`).join('')}</select></label>
   <label>${t('align')}<select data-sty="${f.k}.al"><option value="">${t('alDef')}</option>${[['left','alL'],['center','alC'],['right','alR']].map(([v,k])=>`<option value="${v}" ${st.al===v?'selected':''}>${t(k)}</option>`).join('')}</select></label></div>
   <button class="btn ghost" data-rsty="${f.k}">${t('resetStyle')}</button></div>`:'';
  return `<div class="fld ${openField===f.k?'open':''}"><div class="fld-top"><label><span>${esc(fl(f))}${star}${sens}</span>${inp}</label><button class="btn icon ghost" data-vis="${f.k}" aria-pressed="${!hid}" title="${hid?t('hideField'):t('showField')}" aria-label="${hid?t('hideField'):t('showField')}">${hid?ICON.eyeoff:ICON.eye}</button><button class="btn icon ghost" data-gear="${f.k}" aria-expanded="${openField===f.k}" title="${t('fieldStyle')}" aria-label="${t('fieldStyle')}">${ICON.gear}</button></div>${tools}</div>`}
const slider=(attr,label,min,max,step,val)=>`<label>${label}<input type="range" ${attr} min="${min}" max="${max}" step="${step}" value="${val}"></label>`;
function photoHtml(){const e=ED(),p=e.photo,xf=e.xf.photo;let warn='';
  if(e.photoImg){const RF=dims(e.orient),ph=tpl().layout(e.orient,RF.W,RF.H).front.find(x=>x.k==='photo');
    if(ph){const k=Math.min(dims(e.orient,e.size).W/RF.W,dims(e.orient,e.size).H/RF.H),mm=Math.max(ph.w*xf.sc*k/e.photoImg.width,ph.h*xf.sc*k/e.photoImg.height)/Math.max(1,p.zoom),dpi=Math.round(25.4/mm);if(dpi<200)warn=`<div class="hint warn">${t('lowRes',{n:dpi})}</div>`}}
  return `<div class="sec"><h2>${t('photo')}</h2><div class="row2"><span class="btn file-btn">${e.photo.data?t('replacePhoto'):t('uploadPhoto')}<input type="file" id="photoIn" accept="image/*"></span>${p.data?`<button class="btn ghost" id="photoRm">${t('remove')}</button>`:''}</div>`+
   (p.data?`<label>${t('zoom')}<input type="range" data-ph="zoom" min="1" max="3" step=".01" value="${p.zoom}"></label><label>${t('moveX')}<input type="range" data-ph="ox" min="-1" max="1" step=".01" value="${p.ox}"></label><label>${t('moveY')}<input type="range" data-ph="oy" min="-1" max="1" step=".01" value="${p.oy}"></label>`+warn:`<div class="hint">${t('photoNone')}</div>`)+
   `<div class="hint" style="margin-top:4px"><b>${t('frame')}</b></div>`+slider('data-xf="photo.sc"',t('frameSize'),.6,1.4,.02,xf.sc)+slider('data-xf="photo.dx"',t('frameX'),-15,15,.5,xf.dx)+slider('data-xf="photo.dy"',t('frameY'),-15,15,.5,xf.dy)+`</div>`}
function brandingHtml(){const e=ED(),xf=e.xf.logo;
  return `<div class="sec"><h2>${t('branding')}</h2><div class="row2"><span class="btn file-btn">${e.logo.data?t('replaceLogo'):t('uploadLogo')}<input type="file" id="logoIn" accept="image/*"></span>${e.logo.data?`<button class="btn ghost" id="logoRm">${t('remove')}</button>`:''}</div><div class="hint">${t('logoNote')}</div>`+
   slider('data-xf="logo.sc"',t('frameSize'),.5,2,.02,xf.sc)+slider('data-xf="logo.dx"',t('frameX'),-15,15,.5,xf.dx)+slider('data-xf="logo.dy"',t('frameY'),-15,15,.5,xf.dy)+`</div>`}
function colorsHtml(){const e=ED(),pal=(tpl().palettes.find(p=>p.id===e.palette)||tpl().palettes[0]).c;
  const key=[['bg','colBg'],['a','colA'],['c','colC'],['tx','colTx']];
  return `<div class="sec"><h2>${t('colors')}</h2><div class="sw">${tpl().palettes.map(x=>`<button data-pal="${x.id}" class="${e.palette===x.id?'on':''}" aria-label="${x.id}"><i style="background:${x.c.bg}"></i><i style="background:${x.c.a}"></i><i style="background:${x.c.c}"></i></button>`).join('')}</div>
   <div class="colors-grid">${key.map(([k,l])=>`<label>${t(l)}<input type="color" data-col="${k}" value="${hex(e.colors[k]||pal[k])}"></label>`).join('')}</div>
   <button class="btn ghost" id="colRst">${t('colReset')}</button>
   <label>${t('typeface')}<select id="ffam"><option value="">${t('fontDef')}</option>${[['sans','fontSans'],['serif','fontSerif'],['disp','fontDisp']].map(([v,k])=>`<option value="${v}" ${e.fontFam===v?'selected':''}>${t(k)}</option>`).join('')}</select></label></div>`}
const issues=()=>{const e=ED();return codeIssues(viewState(true),{tpl:tpl(),orient:e.orient,size:e.size})};
function codesHtml(){const e=ED(),c=e.codes;
  if(!c)return `<div class="sec"><h2>${t('codesTitle')}</h2><div class="hint">${t('codeLegacy')}</div><button class="btn ghost" id="codeUp">${t('codeUpgrade')}</button></div>`;
  const one=(k,name,ph)=>{const x=c[k],side=codeSide(e,k),area=x.on?hasArea(tpl(),e.orient,side):true;
   return `<div class="code-box"><label class="check-row"><input type="checkbox" data-cd="${k}.on" ${x.on?'checked':''}>${name}</label>`+(x.on?
    `<label>${t('codeValue')}<input data-val="${k}" value="${esc(e.values[k]||'')}" placeholder="${esc(ph)}" maxlength="120" dir="auto"></label>`+
    (e.sides===2?`<label>${t('codeSide')}${seg('cdside-'+k,[['front',t('front')],['back',t('back')]],x.side)}</label>`:'')+
    slider(`data-cd="${k}.scale"`,t('codeScale'),.5,1.5,.05,x.scale)+slider(`data-cd="${k}.dx"`,t('codeX'),-15,15,.5,x.dx)+slider(`data-cd="${k}.dy"`,t('codeY'),-15,15,.5,x.dy)+(area?'':`<div class="hint warn">${t('codeNoArea')}</div>`):'')+`</div>`};
  const iss=issues().filter(i=>!(/Empty$/.test(i)&&!e.values.id));
  return `<div class="sec"><h2>${t('codesTitle')}</h2>${e.sides===1?`<div class="hint">${t('codeSingle')}</div>`:''}${one('qr',t('codeQr'),t('codeQrPh'))}${one('bar',t('codeBar'),t('codeBarPh'))}`+
   iss.map(i=>`<div class="hint err" role="alert">${t('issue_'+i)}</div>`).join('')+`<div class="hint">${t('codeNote')}</div></div>`}
function customHtml(){const e=ED();
  if(e.sides!==2)return `<div class="sec"><h2>${t('custom')}</h2><div class="hint">${t('customNeedsBack')}</div></div>`;
  return `<div class="sec"><h2>${t('custom')}</h2><div class="hint">${t('customNote')}</div>`+e.custom.map((c,i)=>`<div class="cf-row"><input data-c="${i}" data-k="l" value="${esc(c.l)}" placeholder="${t('customLabel')}" maxlength="24"><input data-c="${i}" data-k="v" value="${esc(c.v)}" placeholder="${t('customValue')}" maxlength="40"><button class="btn icon ghost" data-crm="${i}" aria-label="${t('remove')}">${ICON.x}</button></div>`).join('')+(e.custom.length<3?`<button class="btn ghost" id="cadd">+ ${t('addCustom')}</button>`:'')+`</div>`}
function sizeHtml(){const e=ED(),z=e.size;
  return `<label>${t('cardSize')}<select id="szs">${SIZES.map(s=>`<option value="${s.id}" ${z.id===s.id?'selected':''}>${s.id==='custom'?t('sizeCustom'):s.id==='cr80'?'CR80 · 85.6 × 54 mm':s.w+' × '+s.h+' mm'}</option>`).join('')}</select></label>
   <div class="size-row" ${z.id==='custom'?'':'hidden'}><label>${t('widthMm')}<input type="number" id="szw" min="${LIMITS.min}" max="${LIMITS.max}" step=".1" value="${z.w}"></label><label>${t('heightMm')}<input type="number" id="szh" min="${LIMITS.min}" max="${LIMITS.max}" step=".1" value="${z.h}"></label></div>`}
function panel(){const e=ED(),tp=tpl(),p=$('#panel',view),front=e.side==='front';
  const fields=tp.fields.filter(f=>front?(f.side!=='back'&&f.side!=='extra'):f.side==='back'),extras=tp.fields.filter(f=>f.side==='extra');
  const optHtml=!extras.length?'':e.sides===2?(front?'':`<div class="sec"><h2>${t('optDetails')}</h2><div class="hint">${t('optNote')}</div>${extras.map(fieldHtml).join('')}</div>`):(front?`<div class="sec"><h2>${t('optDetails')}</h2><div class="hint">${t('optSingle')}</div></div>`:'');
  p.innerHTML=`<div class="sec"><h2>${t('setup')}</h2><label>${t('designName')}<input id="dname" value="${esc(e.name)}" maxlength="60" placeholder="${esc(tp.name[lang()])}"></label>
   <label>${t('orientation')}${seg('orient',[['landscape',t('landscape')],['portrait',t('portrait')]],e.orient)}</label>
   <label>${t('sides')}${seg('sides',[[1,t('single')],[2,t('double')]],e.sides)}</label>${sizeHtml()}
   <label>${t('cardLang')}${seg('cl',[['en','English'],['ar','العربية']],e.cardLang)}</label><div class="hint">${t('cardLangNote')}</div></div>
  ${colorsHtml()}${brandingHtml()}
  <div class="sec"><h2>${front?t('frontDetails'):t('backDetails')}</h2>${front?'':`<div class="hint">${t('sharedHint')}</div>`}${fields.map(fieldHtml).join('')}</div>${optHtml}`+
  (front?photoHtml():'')+codesHtml()+(front?(e.sides!==2?customHtml():''):customHtml())+
  `<div class="sec"><div class="hint">${t('savedNote')}</div><button class="btn" id="save">${t('save')}</button><button class="btn pri" id="exp">${t('export')}</button></div>`;
  wire(p);
}
const setPath=(o,path,v)=>{const ks=path.split('.');let r=o;ks.slice(0,-1).forEach(k=>r=r[k]=r[k]||{});r[ks.at(-1)]=v};
function wire(p){const e=ED();
  $('#dname',p).oninput=x=>{e.name=x.target.value};
  $$('[data-seg]',p).forEach(g=>$$('button',g).forEach(b=>b.onclick=()=>{const k=g.dataset.seg,v=b.dataset.v;
    if(k==='orient'){e.orient=v}else if(k==='sides'){e.sides=+v;if(e.sides===1)e.side='front'}else if(k==='cl')e.cardLang=v;
    else if(k.startsWith('cdside-')){e.codes[k.slice(7)].side=v}
    bar();panel();redraw()}));
  const szs=$('#szs',p);if(szs){const apply=()=>{e.size=mkSize(szs.value,$('#szw',p)&&$('#szw',p).value,$('#szh',p)&&$('#szh',p).value);redraw();bar()};
    szs.onchange=()=>{if(szs.value==='custom'){e.size={...e.size,id:'custom'}}else e.size=mkSize(szs.value);panel();bar();redraw()};
    ['#szw','#szh'].forEach(id=>{const i=$(id,p);if(i)i.onchange=()=>{e.size=mkSize('custom',$('#szw',p).value,$('#szh',p).value);$('#szw',p).value=e.size.w;$('#szh',p).value=e.size.h;bar();redraw()}})}
  $$('[data-pal]',p).forEach(b=>b.onclick=()=>{e.palette=b.dataset.pal;e.colors={};panel();redraw()});
  $$('[data-col]',p).forEach(i=>i.oninput=()=>{e.colors[i.dataset.col]=i.value;redraw()});
  const cr=$('#colRst',p);if(cr)cr.onclick=()=>{e.colors={};panel();redraw()};
  const ff=$('#ffam',p);if(ff)ff.onchange=()=>{e.fontFam=ff.value;redraw()};
  $$('[data-f]',p).forEach(i=>i.oninput=()=>{e.values[i.dataset.f]=i.value;if(isAr(i.value))i.dir='auto';redraw()});
  $$('[data-vis]',p).forEach(b=>b.onclick=()=>{const k=b.dataset.vis;if(e.hide[k])delete e.hide[k];else e.hide[k]=true;panel();redraw()});
  $$('[data-gear]',p).forEach(b=>b.onclick=()=>{openField=openField===b.dataset.gear?null:b.dataset.gear;panel()});
  $$('[data-lbl]',p).forEach(i=>i.oninput=()=>{const l=e.labels[e.cardLang]=e.labels[e.cardLang]||{};if(i.value.trim())l[i.dataset.lbl]=i.value;else delete l[i.dataset.lbl];redraw()});
  $$('[data-sty]',p).forEach(i=>{const h=()=>{const [k,prop]=i.dataset.sty.split('.'),st=e.style[k]=e.style[k]||{};let v=i.value;if(prop==='s')v=+v;if(v===''||(prop==='s'&&v===1))delete st[prop];else st[prop]=v;redraw()};i.oninput=h;i.onchange=h});
  $$('[data-rsty]',p).forEach(b=>b.onclick=()=>{const k=b.dataset.rsty;delete e.style[k];if(e.labels[e.cardLang])delete e.labels[e.cardLang][k];panel();redraw()});
  $$('[data-xf]',p).forEach(i=>i.oninput=()=>{setPath(e.xf,i.dataset.xf,+i.value);redraw()});
  $$('[data-cd]',p).forEach(i=>{const h=()=>{const [k,prop]=i.dataset.cd.split('.');e.codes[k][prop]=i.type==='checkbox'?i.checked:+i.value;if(prop==='on'){panel()}redraw()};i[i.type==='range'?'oninput':'onchange']=h});
  $$('[data-val]',p).forEach(i=>i.oninput=()=>{e.values[i.dataset.val]=i.value;redraw();const iss=$$('.hint.err',p);if(iss.length||/[^\x20-\x7e]/.test(i.value))panel2()});
  const up2=$('#codeUp',p);if(up2)up2.onclick=()=>{e.codes=codeDefaults(tpl(),e.orient,e.sides);panel();redraw()};
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
/* refresh only the code panel's warnings while typing, without stealing focus */
function panel2(){const box=$('#panel',view);if(!box)return;const old=$$('.sec',box).find(s=>$('[data-val]',s));if(!old)return;
  const iss=issues();$$('.hint.err',old).forEach(x=>x.remove());const n=old.querySelector('.hint:last-child');
  iss.forEach(i=>{const d=document.createElement('div');d.className='hint err';d.setAttribute('role','alert');d.textContent=t('issue_'+i);n.before(d)})}
/* ---------- save ---------- */
async function save(){const e=ED();
  try{const tp=tpl(),{W,H}=dims(e.orient,e.size),c=document.createElement('canvas'),px=4;c.width=W*px;c.height=H*px;
    draw(c.getContext('2d'),{tpl:tp,orient:e.orient,side:'front',px,ph:true,round:true,size:e.size,state:viewState(false)});
    if(!e.id)e.id=Date.now().toString(36)+Math.random().toString(36).slice(2,7);
    await saveDesign({id:e.id,name:e.name,tplId:e.tplId,orient:e.orient,sides:e.sides,size:e.size,palette:e.palette,colors:e.colors,fontFam:e.fontFam,cardLang:e.cardLang,values:e.values,custom:e.custom,photo:e.photo,logo:e.logo,hide:e.hide,labels:e.labels,style:e.style,xf:e.xf,codes:e.codes,updated:Date.now(),thumb:c.toDataURL('image/png')});
    toast(t('saved'),'ok')}catch(err){toast(t('failed')+': '+err.message,'err')}}

/* ---------- export / print ---------- */
function missing(){const e=ED();return tpl().fields.filter(f=>f.req&&!e.hide[f.k]&&!(e.values[f.k]||'').trim()).map(fl)}
function exportDialog(){
  const e=ED(),d=$('#dlg'),tp=tpl(),{W,H}=dims(e.orient,e.size);d.className='studio wide';
  const opt={fmt:'pdf',bleed:false,marks:true,copies:null,margin:8,gap:null,per:null};
  d.innerHTML=`<div class="dh"><b>${t('expTitle')} — ${esc(tp.name[lang()])}</b><button class="btn icon ghost" data-x aria-label="${t('close')}">${ICON.x}</button></div><div class="db">
   <div class="err" id="xerr" hidden></div>
   <label>${t('fmt')}${seg('fmt',[['pdf',t('fmtPdf')],['png',t('fmtPng')],['jpg',t('fmtJpg')],['a4',t('fmtA4')]],'pdf')}</label>
   <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:flex-end;margin:12px 0"><label class="check-row"><input type="checkbox" id="xb">${t('bleed')}</label>
    <span id="a4o" hidden style="display:none;gap:14px;flex-wrap:wrap;align-items:flex-end"><label class="check-row"><input type="checkbox" id="xm" checked>${t('marks')}</label>
     <label style="width:110px">${t('perPage')}<input type="number" id="xp" min="1" max="60"></label><label style="width:110px">${t('copies')}<input type="number" id="xc" min="1" max="500"></label>
     <label style="width:110px">${t('margin')}<input type="number" id="xmg" min="3" max="30" step=".5" value="8"></label><label style="width:110px">${t('gapMm')}<input type="number" id="xg" min="0" max="20" step=".5"></label></span></div>
   <div class="sheet-prev" id="prev"></div><p class="hint" id="info"></p><p class="hint">${t('printNote')}</p>
   <div class="row2" style="margin-top:12px"><button class="btn ghost" data-x>${t('cancel')}</button><button class="btn pri" id="dl">${t('download')}</button></div></div>`;
  const q=s=>$(s,d),L=()=>sheetLayout(W,H,opt.bleed?2:0,opt.marks,{margin:opt.margin,gap:opt.gap??undefined,per:opt.per||undefined});
  const miss=missing(),iss=issues();const msgs=[];if(miss.length)msgs.push(t('reqMissing',{f:miss.join(', ')}));iss.forEach(i=>msgs.push(t('issue_'+i)));
  if(msgs.length){const x=q('#xerr');x.hidden=false;x.innerHTML=msgs.map(m=>`<div>${esc(m)}</div>`).join('');q('#dl').disabled=!!(miss.length||iss.some(i=>BLOCKING.includes(i)))}
  const thumbs={};const thumb=side=>thumbs[side+opt.bleed]||(thumbs[side+opt.bleed]=renderCard(tp,e.orient,side,viewState(false),{bleed:opt.bleed?2:0,dpi:60,size:e.size}));
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
    const px=`${Math.round((W+2*b)*300/25.4)} × ${Math.round((H+2*b)*300/25.4)} px`;
    if(opt.fmt==='png'||opt.fmt==='jpg')info.innerHTML=`${opt.fmt.toUpperCase()} · 300 DPI · ${px}`+(e.sides===2?' · '+t('front')+' + '+t('back'):'');
    else if(opt.fmt==='pdf')info.innerHTML=`PDF · ${t('printCfg',{o:t(e.orient),s:e.sides===2?t('double'):t('single'),mm:t('mm'),sz:`${+W.toFixed(1)} × ${+H.toFixed(1)}`})}`}
  const sync=()=>{q('#a4o').style.display=opt.fmt==='a4'?'flex':'none';if(opt.fmt==='a4'){const l=L();if(!q('#xp').dataset.u)q('#xp').value=l.per;q('#xp').max=l.max;if(!q('#xg').dataset.u)q('#xg').value=l.gap;if(!q('#xc').dataset.u)q('#xc').value=l.per}preview()};
  $$('[data-seg=fmt] button',d).forEach(b=>b.onclick=()=>{opt.fmt=b.dataset.v;$$('[data-seg=fmt] button',d).forEach(x=>x.classList.toggle('on',x===b));sync()});
  const reset=()=>{if(!q('#xg').dataset.u)q('#xg').value=L().gap;if(!q('#xp').dataset.u)q('#xp').value=L().per;if(!q('#xc').dataset.u)q('#xc').value=L().per;q('#xp').max=L().max};
  q('#xb').onchange=x=>{opt.bleed=x.target.checked;reset();preview()};
  q('#xm').onchange=x=>{opt.marks=x.target.checked;reset();preview()};
  q('#xmg').oninput=x=>{opt.margin=Math.max(3,Math.min(30,+x.target.value||8));reset();preview()};
  q('#xg').oninput=x=>{x.target.dataset.u=1;opt.gap=Math.max(0,Math.min(20,+x.target.value||0));preview()};
  q('#xp').oninput=x=>{x.target.dataset.u=1;opt.per=Math.max(1,Math.min(L().max,+x.target.value||1));if(!q('#xc').dataset.u)q('#xc').value=opt.per;preview()};
  q('#xc').oninput=x=>{x.target.dataset.u=1;opt.copies=Math.max(1,Math.min(500,+x.target.value||1));preview()};
  $$('[data-x]',d).forEach(b=>b.onclick=()=>d.close());
  q('#dl').onclick=async()=>{const btn=q('#dl');btn.disabled=true;const old=btn.textContent;btn.textContent=t('preparing');
    try{const b=opt.bleed?2:0,st=viewState(true),mk=side=>renderCard(tp,e.orient,side,st,{bleed:b,size:e.size}),front=mk('front'),back=e.sides===2?mk('back'):null,item={W,H,front,back},nm=safeName(e.name||tp.name.en);
      if(opt.fmt==='png'||opt.fmt==='jpg'){const enc=opt.fmt==='png'?pngBlob:jpgBlob,ext=opt.fmt;
        if(back){const z=new JSZip();z.file(nm+'-front.'+ext,await enc(front));z.file(nm+'-back.'+ext,await enc(back));download(await z.generateAsync({type:'blob'}),nm+'.zip')}else download(await enc(front),nm+'-front.'+ext)}
      else if(opt.fmt==='pdf')download(await cardsPdf([item],{bleed:b}),nm+'.pdf');
      else{const l=L(),n=opt.copies||l.per;download(await sheetPdf(Array(n).fill(item),{bleed:b,marks:opt.marks,sides:e.sides,margin:opt.margin,gap:opt.gap??undefined,per:opt.per||undefined}),nm+'-A4.pdf')}
      toast(t('exported'),'ok')}catch(err){console.error(err);toast(t('failed')+': '+err.message,'err')}finally{btn.disabled=!!(missing().length||issues().some(i=>BLOCKING.includes(i)));btn.textContent=old}};
  sync();d.showModal();
}
