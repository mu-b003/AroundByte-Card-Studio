import {t,lang,setLang} from './i18n.js';
import './strings.js';
import {$,$$,esc,toast,ICON,copyText} from './ui.js';
import {TEMPLATES,CATS,GROUPS,CAT_ORDER,byId} from './templates/index.js';
import {newDesign,fromSaved,mkSize,LIMITS,tplLink} from './design.js';
import {loadFonts,draw,dims,SIZES} from './render.js';
import {S} from './state.js';
import * as editor from './editor.js';
import {listDesigns,deleteDesign,getDesign} from './store.js';

const A=()=>lang()==='ar'?1:0,LN_=lang=>lang==='ar'?'la':'le';
const tcat=c=>CATS[c][LN_(lang())],ctitle=c=>CATS[c].title[A()],cdesc=c=>CATS[c].desc[A()];
const catList=()=>{const k=Object.keys(CATS);return [...CAT_ORDER.filter(c=>CATS[c]),...k.filter(c=>!CAT_ORDER.includes(c))]};
const gicon={school:'student',higher:'inst',work:'employee'};
const root=document.documentElement;
let current=null,depth=0;
export {newDesign};
/* ---------- shell ---------- */
function shell(route){
  root.lang=lang();root.dir=lang()==='ar'?'rtl':'ltr';
  $('#menuLabel').firstChild.textContent=t('navStudio')+' ';$('#aboutNav').textContent=t('navAbout')
  $('#footerAbout').textContent=t('navAbout');
  $('#footerPrivacy').textContent=lang()==='ar'?'سياسة الخصوصية':'Privacy Policy';
  $('#footerTerms').textContent=lang()==='ar'?'شروط الاستخدام':'Terms of Use';
  $('#footerDisclaimer').textContent=lang()==='ar'?'إخلاء المسؤولية':'Disclaimer';
  $('#footerContact').textContent=lang()==='ar'?'التواصل':'Contact';
  $('#lang').textContent=lang()==='ar'?'English':'العربية';$('#settingsNav').title=t('settings');$('#privacy').textContent=t('privacy');$('#footerYear').textContent=new Date().getFullYear();
  const items=[['gallery','grid',t('navGallery')],...catList().map(c=>[c,gicon[CATS[c].group]||'grid',tcat(c)]),['designs','folder',t('navDesigns')]];
  $('#nav').innerHTML=items.map(([h,i,k])=>`<a href="#${h}" class="${h===route?'on':''}">${ICON[i]}<span>${esc(k)}</span></a>`).join('');
}
const head=(title,desc)=>{$('#title').textContent=title;$('#desc').textContent=desc;document.title=title+' — AroundByte Card Studio'};

/* ---------- gallery ---------- */
function catSection(c){const L=TEMPLATES.filter(x=>x.cat===c);
  return `<section class="cat" id="cat-${c}"><div class="cat-head"><h2>${esc(tcat(c))}</h2><span class="tag">${t('nTemplates',{n:L.length})}</span></div><p class="cat-desc">${esc(cdesc(c))}</p><div class="tpl-grid">`+
   L.map(x=>`<article class="tpl"><div class="tpl-prev"><canvas data-t="${x.id}" aria-label="${esc(x.name[lang()])}"></canvas></div><div class="tpl-body"><b>${esc(x.name[lang()])}</b><div class="tpl-tags">${x.dir?`<span class="tag">${esc(x.dir)}</span>`:''}<span class="tag">${t('bothOrient')}</span><span class="tag">${t('sidesTag')}</span></div><div class="tpl-act"><button class="btn pri" data-sel="${x.id}">${t('select')}</button><button class="btn icon ghost" data-copy="${x.id}" title="${t('copyTplLink')}" aria-label="${t('copyTplLink')}">${ICON.link}</button></div></div></article>`).join('')+`</div></section>`}
function gallery(view,route){
  const cat=CATS[route]?route:null;let pref=localStorage.getItem('abcs-gorient')||'landscape';
  head(cat?ctitle(cat):t('galTitle'),cat?cdesc(cat):t('galDesc'));
  let body;
  if(cat)body=catSection(cat);
  else{const used=new Set();
    body=`<nav class="chips" aria-label="${t('jumpTo')}">`+catList().map(c=>`<button data-jump="cat-${c}">${esc(tcat(c))}</button>`).join('')+`</nav>`+
     GROUPS.map(g=>{const cs=catList().filter(c=>CATS[c].group===g.id);cs.forEach(c=>used.add(c));return cs.length?`<div class="grp"><div class="grp-head"><h2>${esc(g[LN_(lang())])}</h2><p>${esc(g[lang()==='ar'?'da':'de'])}</p></div>${cs.map(catSection).join('')}</div>`:''}).join('')+
     catList().filter(c=>!used.has(c)).map(catSection).join('');}
  view.innerHTML=`<div class="gal-bar"><span>${t('previewAs')}</span><div class="seg" role="group"><button data-o="landscape" class="${pref==='landscape'?'on':''}">${t('landscape')}</button><button data-o="portrait" class="${pref==='portrait'?'on':''}">${t('portrait')}</button></div></div>`+body;
  /* previews are painted lazily (only when scrolled near) — keeps a 70+ template gallery fast on phones */
  const paint=cv=>{const tp=byId(cv.dataset.t),o=pref,{W,H}=dims(o),px=6,sm=CATS[tp.cat].sample,l=lang();cv.width=W*px;cv.height=H*px;cv.dataset.o=o;
    draw(cv.getContext('2d'),{tpl:tp,orient:o,side:'front',px,ph:true,round:true,state:{palette:'p0',cardLang:l,sides:2,values:{...sm[l]},custom:sm.custom,codes:null}})};
  const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);paint(e.target)}}),{rootMargin:'300px'}):null;
  $$('canvas[data-t]',view).forEach(cv=>io?io.observe(cv):paint(cv));
  $$('.gal-bar .seg button',view).forEach(b=>b.onclick=()=>{pref=b.dataset.o;localStorage.setItem('abcs-gorient',pref);$$('.gal-bar .seg button',view).forEach(x=>x.classList.toggle('on',x===b));
    $$('canvas[data-t]',view).forEach(cv=>{if(cv.dataset.o){paint(cv)}})});
  $$('[data-jump]',view).forEach(b=>b.onclick=()=>{const el=document.getElementById(b.dataset.jump);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})});
  $$('[data-copy]',view).forEach(b=>b.onclick=async()=>{toast(t(await copyText(tplLink(b.dataset.copy))?'linkCopied':'linkFailed'),'ok')});
  $$('[data-sel]',view).forEach(b=>b.onclick=()=>startDialog(b.dataset.sel,localStorage.getItem('abcs-gorient')||'landscape'));
}
function startDialog(tplId,orient,pre={}){
  const tp=byId(tplId),d=$('#dlg');d.className='studio';
  d.innerHTML=`<div class="dh"><b>${t('startTitle')} — ${esc(tp.name[lang()])}</b><button class="btn icon ghost" data-x aria-label="${t('close')}">${ICON.x}</button></div><div class="db">
  <p style="margin-bottom:8px;color:var(--tx);font-weight:600">${t('orientation')}</p><div class="opts">
   <label class="opt"><input type="radio" name="o" value="landscape" ${orient==='landscape'?'checked':''}><i class="l"></i><b>${t('landscape')}</b></label>
   <label class="opt"><input type="radio" name="o" value="portrait" ${orient==='portrait'?'checked':''}><i class="p"></i><b>${t('portrait')}</b></label></div>
  <p style="margin-bottom:8px;color:var(--tx);font-weight:600">${t('sides')}</p><div class="opts">
   <label class="opt"><input type="radio" name="s" value="1" ${pre.s===1?'checked':''}><i class="s1"></i><b>${t('single')}</b><span>${t('singleSub')}</span></label>
   <label class="opt"><input type="radio" name="s" value="2" ${pre.s===1?'':'checked'}><i class="s2"></i><b>${t('double')}</b><span>${t('doubleSub')}</span></label></div>
  <p style="margin-bottom:8px;color:var(--tx);font-weight:600">${t('cardSize')}</p>
  <select id="sz">${SIZES.map(z=>`<option value="${z.id}">${z.id==='custom'?t('sizeCustom'):z.id==='cr80'?'CR80 · 85.6 × 54 mm':z.w+' × '+z.h+' mm'}</option>`).join('')}</select>
  <div class="size-row" id="szc" hidden><label>${t('widthMm')}<input type="number" id="szw" min="${LIMITS.min}" max="${LIMITS.max}" step="0.1" value="85.6"></label><label>${t('heightMm')}<input type="number" id="szh" min="${LIMITS.min}" max="${LIMITS.max}" step="0.1" value="54"></label></div>
  <p class="hint">${t('sizeNote')}</p>
  <div class="row2"><button class="btn ghost" data-x>${t('cancel')}</button><button class="btn pri" id="go">${t('start')}</button></div></div>`;
  if(pre.z&&SIZES.some(z=>z.id===pre.z&&z.id!=='custom'))$('#sz',d).value=pre.z;
  $$('[data-x]',d).forEach(b=>b.onclick=()=>d.close());
  $('#sz',d).onchange=e=>{$('#szc',d).hidden=e.target.value!=='custom'};
  $('#go',d).onclick=()=>{const sz=mkSize($('#sz',d).value,$('#szw',d).value,$('#szh',d).value);
    S.ED=newDesign(tplId,$('input[name=o]:checked',d).value,+$('input[name=s]:checked',d).value,sz);d.close();location.hash='#editor';if(current==='editor')render('hash')};
  d.showModal();
}
/* ---------- designs / settings / about ---------- */
async function designs(view){
  head(t('dTitle'),t('dDesc'));let list=[];try{list=await listDesigns()}catch(e){view.innerHTML=`<div class="empty">${esc(t('failed'))}: ${esc(e.message)}</div>`;return}
  if(!list.length){view.innerHTML=`<div class="empty"><b>${t('dEmpty')}</b><br>${t('dEmptySub')}</div>`;return}
  const fmt=new Intl.DateTimeFormat(lang()==='ar'?'ar':'en',{dateStyle:'medium',timeStyle:'short'});
  view.innerHTML=`<div class="dgrid">`+list.map(d=>{const tp=byId(d.tplId);return `<article class="dcard"><img src="${d.thumb||''}" alt=""><div class="b"><b>${esc(d.name||t('unnamed'))}</b><small>${esc(tp?tp.name[lang()]:'')} · ${t(d.orient)} · ${d.sides===2?t('double'):t('single')}<br>${t('updated',{d:fmt.format(d.updated)})}</small><div class="row2"><button class="btn pri" data-open="${d.id}">${t('open')}</button><button class="btn ghost" data-del="${d.id}">${t('delete')}</button></div></div></article>`}).join('')+`</div>`;
  $$('[data-open]',view).forEach(b=>b.onclick=async()=>{const d=await getDesign(b.dataset.open);S.ED=fromSaved(d);location.hash='#editor'});
  $$('[data-del]',view).forEach(b=>b.onclick=async()=>{if(confirm(t('confirmDelete'))){await deleteDesign(b.dataset.del);designs(view)}});
}
function settings(view){
  head(t('setTitle'),'');const th=root.dataset.theme||'dark';
  view.innerHTML=`<div class="panel plain"><label>${t('setLang')}<select id="sl"><option value="en">English</option><option value="ar">العربية</option></select></label><label>${t('setTheme')}<select id="st"><option value="dark">${t('dark')}</option><option value="light">${t('light')}</option></select></label></div>`;
  $('#sl').value=lang();$('#st').value=th;$('#sl').onchange=e=>{setLang(e.target.value);render('lang')};
  $('#st').onchange=e=>{root.dataset.theme=e.target.value;localStorage.setItem('abcs-theme',e.target.value)};
}
const about=view=>{head(t('abTitle'),'');view.innerHTML=`<div class="panel plain prose"><p>${t('abP1')}</p><p>${t('abP2')}</p><p>${t('abP3')}</p></div>`};

/* ---------- router ---------- */
const route=()=>(location.hash||'#gallery').slice(1).split('?')[0]||'gallery';
export async function render(reason){
  const r=route(),view=$('#view');if(current==='editor'&&r!=='editor')editor.unmount();
  current=r;shell(r);$('#toolsDropdown').open=false;
  const bb=$('#backBtn');bb.hidden=r==='gallery';$('#backLbl').textContent=t('back');
  const wide=r==='editor';
  if(r==='editor'){if(!S.ED){toast(t('noDesign'),'err');location.hash='#gallery';return}head(t('edTitle'),t('edDesc'));editor.mount(view)}
  else if(r.startsWith('t/')){const tp=byId(decodeURIComponent(r.slice(2)));if(!tp){location.hash='#gallery';return}
    gallery(view,tp.cat);const q=new URLSearchParams(location.hash.split('?')[1]||''),d=$('#dlg');
    startDialog(tp.id,q.get('o')==='portrait'?'portrait':'landscape',{s:+q.get('s')||2,z:q.get('z')});
    d.addEventListener('close',()=>{if(route().startsWith('t/')){history.replaceState(null,'','#'+tp.cat);current=tp.cat;shell(tp.cat)}},{once:true})}
  else if(CATS[r]||r==='gallery')gallery(view,r);else if(r==='designs')await designs(view);else if(r==='settings')settings(view);else if(r==='about')about(view);else{location.hash='#gallery';return}
  if(reason==='hash')window.scrollTo(0,0);
}
$('#lang').onclick=()=>{setLang(lang()==='ar'?'en':'ar');if(current==='editor')editor.unmount({preserveState:true});render('lang')};
$('#settingsNav').title=t('settings');
window.addEventListener('hashchange',()=>{depth++;render('hash')});
$('#backBtn').onclick=()=>{if(depth>0){depth--;history.back()}else location.hash=current==='editor'&&S.ED&&CATS[byId(S.ED.tplId).cat]?'#'+byId(S.ED.tplId).cat:'#gallery'};
document.addEventListener('click',e=>{const dd=$('#toolsDropdown');if(dd.open&&!dd.contains(e.target))dd.open=false});
await loadFonts();render('init');
window.__cs={S,render}; // handy for tests

if('serviceWorker' in navigator && location.protocol!=='file:'){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(err=>console.warn('Offline support unavailable:',err)));
}
