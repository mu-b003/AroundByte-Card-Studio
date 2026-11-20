import {t,lang,setLang} from './i18n.js';
import {$,$$,esc,toast,ICON} from './ui.js';
import {TEMPLATES,CATS,byId} from './templates/index.js';
import {loadFonts,draw,dims} from './render.js';
import {S} from './state.js';
import * as editor from './editor.js';
import {listDesigns,deleteDesign,getDesign} from './store.js';

const CATKEY={student:['navStudent','titleStudent'],employee:['navEmployee','titleEmployee'],institutional:['navInst','titleInst']};
const tcat=c=>t('t'+c[0].toUpperCase()+c.slice(1));
const root=document.documentElement;
let current=null;

export function newDesign(tplId,orient,sides){
  return {id:null,name:'',tplId,orient,sides,palette:'p0',cardLang:lang(),values:{},custom:[],photo:{data:null,zoom:1,ox:0,oy:0},logo:{data:null},side:'front',zoom:100,guides:false};
}
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
  const items=[['gallery','grid','navGallery'],['student','student','navStudent'],['employee','employee','navEmployee'],['institutional','inst','navInst'],['designs','folder','navDesigns']];
  $('#nav').innerHTML=items.map(([h,i,k])=>`<a href="#${h}" class="${h===route?'on':''}">${ICON[i]}<span>${esc(t(k))}</span></a>`).join('');
}
const head=(title,desc)=>{$('#title').textContent=title;$('#desc').textContent=desc;document.title=title+' — AroundByte Card Studio'};

/* ---------- gallery ---------- */
function gallery(view,route){
  const cat=CATS[route]?route:null,pref=localStorage.getItem('abcs-gorient')||'landscape';
  head(cat?t(CATKEY[cat][1]):t('galTitle'),t('galDesc'));
  const cats=cat?[cat]:Object.keys(CATS);
  view.innerHTML=`<div class="gal-bar"><span>${t('previewAs')}</span><div class="seg" role="group"><button data-o="landscape" class="${pref==='landscape'?'on':''}">${t('landscape')}</button><button data-o="portrait" class="${pref==='portrait'?'on':''}">${t('portrait')}</button></div></div>`+
  cats.map(c=>{const L=TEMPLATES.filter(x=>x.cat===c);return `<section class="cat" id="cat-${c}"><div class="cat-head"><h2>${esc(tcat(c))}</h2><span class="tag">${t('nTemplates',{n:L.length})}</span></div><div class="tpl-grid">`+
   L.map(x=>`<article class="tpl"><div class="tpl-prev"><canvas data-t="${x.id}" aria-label="${esc(x.name[lang()])}"></canvas></div><div class="tpl-body"><b>${esc(x.name[lang()])}</b><div class="tpl-tags"><span class="tag">${esc(tcat(c))}</span><span class="tag">${t('bothOrient')}</span><span class="tag">${t('sidesTag')}</span></div><button class="btn pri" data-sel="${x.id}">${t('select')}</button></div></article>`).join('')+`</div></section>`}).join('');
  const paint=o=>$$('canvas[data-t]',view).forEach(cv=>{const tp=byId(cv.dataset.t),{W,H}=dims(o),px=6,sm=CATS[tp.cat].sample,l=lang();cv.width=W*px;cv.height=H*px;
    draw(cv.getContext('2d'),{tpl:tp,orient:o,side:'front',px,ph:true,round:true,state:{palette:'p0',cardLang:l,values:{...sm[l]},custom:sm.custom}})});
  paint(pref);
  $$('.gal-bar .seg button',view).forEach(b=>b.onclick=()=>{localStorage.setItem('abcs-gorient',b.dataset.o);$$('.gal-bar .seg button',view).forEach(x=>x.classList.toggle('on',x===b));paint(b.dataset.o)});
  $$('[data-sel]',view).forEach(b=>b.onclick=()=>startDialog(b.dataset.sel,localStorage.getItem('abcs-gorient')||'landscape'));
}
function startDialog(tplId,orient){
  const tp=byId(tplId),d=$('#dlg');d.className='studio';
  d.innerHTML=`<div class="dh"><b>${t('startTitle')} — ${esc(tp.name[lang()])}</b><button class="btn icon ghost" data-x aria-label="${t('close')}">${ICON.x}</button></div><div class="db">
  <p style="margin-bottom:8px;color:var(--tx);font-weight:600">${t('orientation')}</p><div class="opts">
   <label class="opt"><input type="radio" name="o" value="landscape" ${orient==='landscape'?'checked':''}><i class="l"></i><b>${t('landscape')}</b></label>
   <label class="opt"><input type="radio" name="o" value="portrait" ${orient==='portrait'?'checked':''}><i class="p"></i><b>${t('portrait')}</b></label></div>
  <p style="margin-bottom:8px;color:var(--tx);font-weight:600">${t('sides')}</p><div class="opts">
   <label class="opt"><input type="radio" name="s" value="1"><i class="s1"></i><b>${t('single')}</b><span>${t('singleSub')}</span></label>
   <label class="opt"><input type="radio" name="s" value="2" checked><i class="s2"></i><b>${t('double')}</b><span>${t('doubleSub')}</span></label></div>
  <div class="row2"><button class="btn ghost" data-x>${t('cancel')}</button><button class="btn pri" id="go">${t('start')}</button></div></div>`;
  $$('[data-x]',d).forEach(b=>b.onclick=()=>d.close());
  $('#go',d).onclick=()=>{S.ED=newDesign(tplId,$('input[name=o]:checked',d).value,+$('input[name=s]:checked',d).value);d.close();location.hash='#editor';if(current==='editor')render('hash')};
  d.showModal();
}
/* ---------- designs / settings / about ---------- */
async function designs(view){
  head(t('dTitle'),t('dDesc'));let list=[];try{list=await listDesigns()}catch(e){view.innerHTML=`<div class="empty">${esc(t('failed'))}: ${esc(e.message)}</div>`;return}
  if(!list.length){view.innerHTML=`<div class="empty"><b>${t('dEmpty')}</b><br>${t('dEmptySub')}</div>`;return}
  const fmt=new Intl.DateTimeFormat(lang()==='ar'?'ar':'en',{dateStyle:'medium',timeStyle:'short'});
  view.innerHTML=`<div class="dgrid">`+list.map(d=>{const tp=byId(d.tplId);return `<article class="dcard"><img src="${d.thumb||''}" alt=""><div class="b"><b>${esc(d.name||t('unnamed'))}</b><small>${esc(tp?tp.name[lang()]:'')} · ${t(d.orient)} · ${d.sides===2?t('double'):t('single')}<br>${t('updated',{d:fmt.format(d.updated)})}</small><div class="row2"><button class="btn pri" data-open="${d.id}">${t('open')}</button><button class="btn ghost" data-del="${d.id}">${t('delete')}</button></div></div></article>`}).join('')+`</div>`;
  $$('[data-open]',view).forEach(b=>b.onclick=async()=>{const d=await getDesign(b.dataset.open);S.ED={...newDesign(d.tplId,d.orient,d.sides),...d,side:'front'};location.hash='#editor'});
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
  const wide=r==='editor';
  if(r==='editor'){if(!S.ED){toast(t('noDesign'),'err');location.hash='#gallery';return}head(t('edTitle'),t('edDesc'));editor.mount(view)}
  else if(CATS[r]||r==='gallery')gallery(view,r);else if(r==='designs')await designs(view);else if(r==='settings')settings(view);else if(r==='about')about(view);else{location.hash='#gallery';return}
  if(reason==='hash')window.scrollTo(0,0);
}
$('#lang').onclick=()=>{setLang(lang()==='ar'?'en':'ar');if(current==='editor')editor.unmount({preserveState:true});render('lang')};
$('#settingsNav').title=t('settings');
window.addEventListener('hashchange',()=>render('hash'));
document.addEventListener('click',e=>{const dd=$('#toolsDropdown');if(dd.open&&!dd.contains(e.target))dd.open=false});
await loadFonts();render('init');
window.__cs={S,render}; // handy for tests

if('serviceWorker' in navigator && location.protocol!=='file:'){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(err=>console.warn('Offline support unavailable:',err)));
}
