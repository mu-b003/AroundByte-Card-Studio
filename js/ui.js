import {t} from './i18n.js';
export const $=(s,r=document)=>r.querySelector(s);
export const $$=(s,r=document)=>[...r.querySelectorAll(s)];
export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const svg=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
export const ICON={grid:svg('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'),
 student:svg('<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/>'),employee:svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>'),
 inst:svg('<path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M2 10l10-6 10 6z"/>'),folder:svg('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),x:svg('<path d="M6 6l12 12M18 6 6 18"/>')};
export function toast(m,k=''){const e=$('#toast');e.textContent=m;e.className='show '+k;clearTimeout(toast.h);toast.h=setTimeout(()=>e.className='',3800)}
export function download(blob,name){const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000)}
export const safeName=n=>(n||'').trim().replace(/[\\/:*?"<>|]+/g,'_').slice(0,60)||'aroundbyte-card';
export const loadImage=src=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej(new Error('badImg'));i.src=src});
/* Validate + normalise an uploaded image: returns {data (dataURL), w, h}. SVG is rasterised via <img> (scripts never run). Nothing leaves the browser. */
export async function importImage(file,{max=1600,alpha=false}={}){
  const ok=/^image\/(png|jpe?g|webp|gif|bmp|svg\+xml)$/i.test(file.type)||/\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(file.name);
  if(!ok)throw new Error('badType');if(file.size>15*1048576)throw new Error('tooBig');if(!file.size)throw new Error('badImg');
  const url=URL.createObjectURL(file);
  try{const im=await loadImage(url);let w=im.naturalWidth,h=im.naturalHeight;if(!w||!h){w=h=600}
    const s=/svg/i.test(file.type+file.name)?max/Math.max(w,h):Math.min(1,max/Math.max(w,h));const cw=Math.max(1,Math.round(w*s)),ch=Math.max(1,Math.round(h*s));
    const c=document.createElement('canvas');c.width=cw;c.height=ch;const x=c.getContext('2d');if(!alpha){x.fillStyle='#fff';x.fillRect(0,0,cw,ch)}x.drawImage(im,0,0,cw,ch);
    return {data:c.toDataURL(alpha?'image/png':'image/jpeg',.92),w:cw,h:ch}}
  catch(e){throw new Error(e.message==='badType'?'badType':'badImg')}finally{URL.revokeObjectURL(url)}
}
