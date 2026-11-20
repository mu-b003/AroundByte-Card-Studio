// Print output. Every canvas comes from render.draw(), the same function as the live preview.
import {draw,dims} from './render.js';
export const DPI=300,MM=72/25.4,A4={w:210,h:297};
export function renderCard(tpl,orient,side,state,{bleed=0,dpi=DPI}={}){
  const {W,H}=dims(orient),px=dpi/25.4,c=document.createElement('canvas');
  c.width=Math.round((W+2*bleed)*px);c.height=Math.round((H+2*bleed)*px);
  draw(c.getContext('2d'),{tpl,orient,side,state,px,bleed,ph:false,round:false});return c;
}
const crcT=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc=b=>{let c=~0;for(const x of b)c=crcT[(c^x)&255]^(c>>>8);return ~c>>>0};
const toBlob=(c,type='image/png')=>new Promise((res,rej)=>c.toBlob(b=>b?res(b):rej(new Error('encode')),type));
/* PNG with a pHYs chunk (300 DPI) so editors/printers know the true physical size */
export async function pngBlob(canvas,dpi=DPI){
  const buf=new Uint8Array(await (await toBlob(canvas)).arrayBuffer()),ppm=Math.round(dpi/0.0254),ch=new Uint8Array(21),dv=new DataView(ch.buffer);
  dv.setUint32(0,9);ch.set([112,72,89,115],4);dv.setUint32(8,ppm);dv.setUint32(12,ppm);ch[16]=1;dv.setUint32(17,crc(ch.subarray(4,17)));
  const out=new Uint8Array(buf.length+21);out.set(buf.subarray(0,33));out.set(ch,33);out.set(buf.subarray(33),54);return new Blob([out],{type:'image/png'});
}
const bytes=async c=>new Uint8Array(await (await pngBlob(c)).arrayBuffer());
/* items: [{W,H,front:canvas,back:canvas|null}] — one PDF page per side, page = card size (+bleed). */
export async function cardsPdf(items,{bleed=0}={}){
  const doc=await PDFLib.PDFDocument.create();
  for(const it of items)for(const c of [it.front,it.back]){if(!c)continue;
    const w=(it.W+2*bleed)*MM,h=(it.H+2*bleed)*MM,pg=doc.addPage([w,h]);pg.drawImage(await doc.embedPng(await bytes(c)),{x:0,y:0,width:w,height:h})}
  doc.setProducer('AroundByte Card Studio');doc.setCreator('AroundByte Card Studio');
  return new Blob([await doc.save()],{type:'application/pdf'});
}
/* A4 grid: cards (incl. bleed) in slots; gap grows when crop marks are on */
export function sheetLayout(W,H,bleed,marks){
  const sw=W+2*bleed,sh=H+2*bleed,gap=marks?6:(bleed?1:3),m=8;
  const cols=Math.max(1,Math.floor((A4.w-2*m+gap)/(sw+gap))),rows=Math.max(1,Math.floor((A4.h-2*m+gap)/(sh+gap)));
  return {cols,rows,sw,sh,gap,per:cols*rows,offX:(A4.w-(cols*sw+(cols-1)*gap))/2,offY:(A4.h-(rows*sh+(rows-1)*gap))/2};
}
/* Slot position; back pages mirror the columns so each back lands behind its front (flip on the long edge). */
export const slotXY=(L,i,mirror)=>{let c=i%L.cols;const r=Math.floor(i/L.cols);if(mirror)c=L.cols-1-c;return {x:L.offX+c*(L.sw+L.gap),y:L.offY+r*(L.sh+L.gap)}};
export function sheetPages(count,per,sides){const n=Math.ceil(count/per);return {fronts:n,backs:sides===2?n:0}}
export async function sheetPdf(list,{bleed=0,marks=false,sides=1}={}){
  const {W,H}=list[0],L=sheetLayout(W,H,bleed,marks),doc=await PDFLib.PDFDocument.create(),emb=new Map();
  const img=async c=>{if(!emb.has(c))emb.set(c,await doc.embedPng(await bytes(c)));return emb.get(c)};
  const mk=(pg,x,y)=>{ // crop marks at the trim corners, outside the trim box
    const tx=x+bleed,ty=y+bleed,len=2.5,off=1.2,ln=(a,b,c,d)=>pg.drawLine({start:{x:a*MM,y:(A4.h-b)*MM},end:{x:c*MM,y:(A4.h-d)*MM},thickness:.4,color:PDFLib.rgb(0,0,0)});
    for(const [cx,cy,sx,sy] of [[tx,ty,-1,-1],[tx+W,ty,1,-1],[tx,ty+H,-1,1],[tx+W,ty+H,1,1]]){ln(cx+sx*off,cy,cx+sx*(off+len),cy);ln(cx,cy+sy*off,cx,cy+sy*(off+len))}};
  for(let s=0;s<list.length;s+=L.per){const chunk=list.slice(s,s+L.per);
    for(const side of sides===2?['front','back']:['front']){const pg=doc.addPage([A4.w*MM,A4.h*MM]);
      for(let i=0;i<chunk.length;i++){const {x,y}=slotXY(L,i,side==='back');
        pg.drawImage(await img(chunk[i][side]),{x:x*MM,y:(A4.h-y-L.sh)*MM,width:L.sw*MM,height:L.sh*MM});if(marks)mk(pg,x,y)}}}
  doc.setProducer('AroundByte Card Studio');return new Blob([await doc.save()],{type:'application/pdf'});
}
