// Shared design state: what a user's card looks like, independent of the template that renders it.
import {byId} from './templates/index.js';
import {dims,SIZES} from './render.js';
import {lang} from './i18n.js';
export const LIMITS={min:30,max:200};
export const sizeOf=id=>SIZES.find(s=>s.id===id)||SIZES[0];
export const mkSize=(id,w,h)=>id==='custom'?{id,w:clampMM(w),h:clampMM(h)}:{...sizeOf(id)};
const clampMM=v=>Math.max(LIMITS.min,Math.min(LIMITS.max,+v||LIMITS.min));
/* Starting code settings mimic what the template already prints, so nothing changes visually until the user chooses. */
export function codeDefaults(tpl,orient,sides){
  const RF=dims(orient),lay=tpl.layout(orient,RF.W,RF.H),has=(s,k)=>(lay[s]||[]).some(e=>e.k===k);
  const c={qr:{on:false,side:'front',scale:1,dx:0,dy:0},bar:{on:false,side:'front',scale:1,dx:0,dy:0}};
  for(const k of ['qr','bar']){if(has('front',k)){c[k].on=true}else if(sides===2&&has('back',k)){c[k].on=true;c[k].side='back'}}
  return c;
}
export function newDesign(tplId,orient,sides,size){
  const tp=byId(tplId);
  return {id:null,name:'',tplId,orient,sides,size:size||mkSize('cr80'),palette:'p0',cardLang:lang(),values:{},custom:[],photo:{data:null,zoom:1,ox:0,oy:0},logo:{data:null},side:'front',zoom:100,guides:false,
    colors:{},fontFam:'',hide:{},labels:{en:{},ar:{}},style:{},xf:{photo:{dx:0,dy:0,sc:1},logo:{dx:0,dy:0,sc:1}},codes:codeDefaults(tp,orient,sides)};
}
/* Designs saved before the code engine existed keep codes:null (legacy rendering) until the user opts in. */
export const fromSaved=d=>{const b=newDesign(d.tplId,d.orient,d.sides,d.size);const e={...b,...d,side:'front'};if(!('codes' in d))e.codes=null;
  e.xf={photo:{...b.xf.photo,...(d.xf&&d.xf.photo)},logo:{...b.xf.logo,...(d.xf&&d.xf.logo)}};e.labels={en:{},ar:{},...(d.labels||{})};return e};

/* Direct link to a template: #t/<id>[?o=portrait&s=1&z=90x60] opens that template's start dialog. */
export const tplLink=(id,{orient,sides,size}={})=>{const q=new URLSearchParams();if(orient)q.set('o',orient);if(sides)q.set('s',sides);if(size&&size.id&&size.id!=='custom')q.set('z',size.id);
  const s=q.toString();return location.href.split('#')[0]+'#t/'+encodeURIComponent(id)+(s?'?'+s:'')};
