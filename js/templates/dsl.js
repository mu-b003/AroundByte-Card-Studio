// Tiny layout DSL. Units: mm (card space). Colour keys: bg a b c tx mu on (palette) or any hex. Text size in pt.
// Text value: 'name' = field · '=Literal' · '@key' = field label · '$key' = built-in label (sig, terms…)
export const R=(x,y,w,h,f,o={})=>({k:'rect',x,y,w,h,f,...o});
export const C=(x,y,r,f,o={})=>({k:'circ',x,y,r,f,...o});
export const PL=(p,f,o={})=>({k:'poly',p,f,...o});
export const LN=(x,y,x2,y2,s,sw=.3,o={})=>({k:'line',x,y,x2,y2,s,sw,...o});
export const DT=(x,y,w,h,f,o={})=>({k:'dots',x,y,w,h,f,...o});
export const T=(v,x,y,w,s,o={})=>({k:'text',v,x,y,w,s,...o});
export const PH=(x,y,w,h,shape='rect',o={})=>({k:'photo',x,y,w,h,shape,...o});
export const LG=(x,y,w,h,o={})=>({k:'logo',x,y,w,h,...o});
export const Q=(x,y,s,o={})=>({k:'qr',x,y,s,...o});
export const B=(x,y,w,h,o={})=>({k:'bar',x,y,w,h,...o});
export const CA=(x,y,w,h,o={})=>({k:'codearea',x,y,w,h,...o}); // area the code engine fills with QR / barcode (draws nothing itself)
export const AC=(x,y,r,a0,a1,s,o={})=>({k:'arc',x,y,r,a0,a1,s,...o});
export const CU=(x,y,w,s,o={})=>({k:'custom',x,y,w,s,...o});

/* Shared back-side builder. style: band | foot | stripe | minimal.  o.qr → QR instead of barcode. o.f = serif/disp heading font */
export function back(W,H,st,o={}){
  const L=W>H,m=4,e=[R(0,0,W,H,'bg')],hf=o.f||'sans';let t=14,bot=H-m,x0=m;
  if(st==='band'){e.push(R(0,0,W,10,'a'),LG(m,1.6,6.8,6.8,{c:'on'}),T('org',m+9,5,W-2*m-9,6.5,{c:'on',wt:700,f:hf}));t=14}
  else if(st==='foot'){e.push(R(0,H-9,W,9,'a'),LG(m,H-7.5,6.8,6.8,{c:'on'}),T('org',m+9,H-4.5,W-2*m-9,6.5,{c:'on',wt:700,f:hf}));t=5.5;bot=H-11}
  else if(st==='stripe'){if(L){e.push(R(0,0,6,H,'a'),DT(0,H-14,6,14,'c',{o:.5}));x0=11;t=7}else{e.push(R(0,0,W,6,'a'),DT(W-16,0,16,6,'c',{o:.5}));t=10}
    e.push(LG(x0,t-3.2,6.4,6.4),T('org',x0+8,t,W-x0-m-8,6.4,{c:'a',wt:700,f:hf}));t+=L?7:4.5}
  else{e.push(T('org',m,7,W-2*m,6.8,{c:'a',wt:700,f:hf}),LN(m,11,W-m,11,'c',.5));t=14}
  const w=W-x0-m,hd=(k,y,x=x0,ww=w)=>T(k,x,y,ww,4.2,{c:'mu',up:1,ls:.6,wt:600});
  if(L){const cw=(w-5)/2,rx=x0+cw+5;
    e.push(hd('$terms',t+1.5,x0,cw),T('terms',x0,t+5.5,cw,5,{c:'tx',ml:4,lh:1.35,wt:400}),
      hd('$addr',t+16,x0,cw),T('addr',x0,t+19.5,cw,5.2,{c:'tx',ml:2,lh:1.3}),T('phone',x0,t+27.5,cw,5.4,{c:'tx',wt:600}),
      CU(rx,t+2,cw,5.4,{n:3,gap:5.8}));
    e.push(CA(rx,t+20,cw,12.5));if(o.qr)e.push(Q(rx,t+20,12.5));else e.push(B(rx,t+22,cw,7,{f:'#111',bg:'#fff'}));
    e.push(LN(rx,t+33.3,rx+cw,t+33.3,'mu',.25),T('$sig',rx,t+35.4,cw,4.2,{c:'mu',wt:500,al:'center'}))}
  else{e.push(hd('$terms',t+1.5),T('terms',x0,t+5.5,w,5,{c:'tx',ml:5,lh:1.35,wt:400}),
      hd('$addr',t+22),T('addr',x0,t+25.5,w,5.2,{c:'tx',ml:2,lh:1.3}),T('phone',x0,t+33.5,w,5.4,{c:'tx',wt:600}),
      CU(x0,t+37,w,5.4,{n:3,gap:5.8}));
    e.push(CA(x0,t+54,w,14));if(o.qr)e.push(Q(x0+(w-14)/2,t+54,14));else e.push(B(x0,t+57,w,6.5,{f:'#111',bg:'#fff'}));
    e.push(LN(x0,t+69,x0+w,t+69,'mu',.25),T('$sig',x0,t+71,w,4.2,{c:'mu',wt:500,al:'center'}))}
  return e;
}
