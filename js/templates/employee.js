import {add,mk,LA,DA,R,C,PL,LN,DT,T,PH,LG,Q,B,CU,back} from './core.js';

/* 1 · Corporate Professional — diagonal header, left photo */
add('em-corporate','employee','Corporate Professional','مؤسسي احترافي','Professional company identity with a diagonal header.',
 mk({bg:'#ffffff',a:'#1f4e79',b:'#eef2f7',c:'#2e86c1',tx:'#16212e',mu:'#5d6b7a',on:'#ffffff'},LA),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),PL([[0,0],[W,0],[W,22],[0,34]],'a'),PL([[0,34],[W,22],[W,25],[0,37]],'c'),LG(4,3.5,10,10,{c:'on'}),T('org',16,8.5,W-20,6.6,{c:'on',wt:700,ml:2,lh:1.15}),
  PH(W/2-14,22,28,35,'rect',{bs:'bg',bw:1.2}),T('name',4,63.5,W-8,11,{wt:700,c:'tx',al:'center'}),T('role',4,69.6,W-8,7.4,{c:'a',wt:600,al:'center'}),
  T('unit',4,73.8,W-8,6.2,{c:'mu',al:'center'}),R(0,H-9,W,9,'b'),T('@id',4,H-6,20,4,{c:'mu',up:1,wt:600,ls:.7}),T('id',4,H-2.8,W-8,6.4,{f:'disp',wt:700,c:'a'})]:[
  R(0,0,W,H,'bg'),PL([[0,0],[W,0],[W,11],[0,18]],'a'),PL([[0,18],[W,11],[W,13],[0,20]],'c'),LG(4,2.2,9.5,9.5,{c:'on'}),T('org',15.5,7,W-34,7,{c:'on',wt:700,ml:1}),
  PH(5,21,23,29,'rect',{bs:'bg',bw:1}),T('name',33,28,W-37,12.5,{wt:700,c:'tx'}),T('role',33,34.5,W-37,8,{c:'a',wt:600}),
  T('unit',33,38.8,W-37,6.6,{c:'mu'}),LN(33,42.5,W-5,42.5,'b',.5),T('@id',33,46,18,4,{c:'mu',up:1,ls:.7,wt:600}),T('id',46,46,W-50,6.6,{f:'disp',wt:700,c:'a'}),R(0,H-2.5,W,2.5,'a')],
 (W,H)=>back(W,H,'band'));

/* 2 · Executive Premium — black & gold, serif, framed */
add('em-executive','employee','Executive Premium','تنفيذي مميز','Premium dark card with restrained gold and serif type.',
 mk({bg:'#111214',a:'#c8a24a',b:'#1c1d20',c:'#e9d9a6',tx:'#f5f1e6',mu:'#a9a08a',on:'#111214'},[{a:'#d9d9de',c:'#ffffff',on:'#111214'},{a:'#7dd3c0',c:'#bdf0e4'},{a:'#e8b4b8',c:'#f6d9db'}]),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),R(2.2,2.2,W-4.4,H-4.4,'bg',{s:'a',sw:.35}),R(3.4,3.4,W-6.8,H-6.8,'bg',{s:'a',sw:.15}),
  LG(W/2-5,7,10,10),T('org',6,21,W-12,5.8,{f:'serif',wt:600,c:'a',up:1,ls:1.1,al:'center',ml:2,lh:1.2}),
  PH(W/2-13,29,26,32,'rect',{bs:'a',bw:.5}),T('name',5,67.5,W-10,10.5,{f:'serif',wt:700,c:'tx',al:'center'}),LN(W/2-7,71.6,W/2+7,71.6,'a',.35),
  T('role',5,75,W-10,6.8,{c:'a',wt:500,al:'center',up:1,ls:.8}),T('id',5,80.4,W-10,5.8,{f:'disp',wt:500,c:'mu',al:'center',ls:1})]:[
  R(0,0,W,H,'bg'),R(2.2,2.2,W-4.4,H-4.4,'bg',{s:'a',sw:.35}),R(3.4,3.4,W-6.8,H-6.8,'bg',{s:'a',sw:.15}),
  LG(7,7,9,9),T('org',18,11.5,31,6,{f:'serif',wt:600,c:'a',up:1,ls:1,ml:1}),
  T('name',7,27,W-40,12,{f:'serif',wt:700,c:'tx',ml:1}),LN(7,32,30,32,'a',.35),T('role',7,36.5,W-40,7,{c:'a',wt:500,up:1,ls:.8}),T('unit',7,40.8,W-40,6.2,{c:'mu'}),
  T('id',7,47,W-40,6,{f:'disp',wt:500,c:'mu',ls:1}),PH(W-34,9,26,36,'rect',{bs:'a',bw:.5})],
 (W,H)=>back(W,H,'minimal',{f:'serif'}));

/* 3 · Modern Geometric — overlapping circles/triangles */
add('em-geometric','employee','Modern Geometric','هندسي حديث','Distinct geometric composition, modern corporate style.',
 mk({bg:'#ffffff',a:'#0f766e',b:'#134e4a',c:'#f97316',tx:'#12312e',mu:'#5f7a76',on:'#ffffff'},[{a:'#4338ca',b:'#312e81',c:'#06b6d4'},{a:'#be123c',b:'#881337',c:'#f59e0b'},{a:'#1d4ed8',b:'#1e3a8a',c:'#84cc16'}]),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),PL([[0,0],[W,0],[0,40]],'a'),PL([[0,0],[24,0],[0,17]],'b'),C(W-6,34,12,'c',{o:.95}),C(W/2,40,17.5,'#ffffff'),PH(W/2-16,24,32,32,'circ'),
  LG(4,3,10,10,{c:'on'}),T('org',4,19,22,5,{c:'on',wt:600,ml:3,lh:1.1}),
  T('name',4,63,W-8,11,{wt:700,c:'tx',al:'center',f:'disp'}),T('role',4,69.6,W-8,7.2,{c:'a',wt:600,al:'center'}),T('unit',4,74,W-8,6.2,{c:'mu',al:'center'}),
  R(W/2-9,H-7.8,18,5.6,'b',{r:2.8}),T('id',W/2-9,H-5,18,5.4,{c:'on',f:'disp',wt:700,al:'center'})]:[
  R(0,0,W,H,'bg'),PL([[W,12],[W,H],[W-30,H]],'a'),PL([[W,H],[W-15,H],[W,H-21]],'b'),C(W-10,8,9,'c',{o:.95}),C(21,27,16.5,'#ffffff',{s:'a',sw:.5}),PH(6.5,12.5,29,29,'circ'),
  LG(W-19,3.8,8.4,8.4,{c:'on'}),T('org',6,6,38,5.6,{c:'mu',up:1,ls:.7,wt:600,ml:1}),
  T('name',42,24,W-60,10.5,{wt:700,c:'tx',f:'disp',ml:1}),T('role',42,31,W-60,7,{c:'a',wt:600}),T('unit',42,35.4,W-60,6.2,{c:'mu'}),
  R(42,40.5,22,6,'a',{r:3}),T('id',42,43.6,22,5.5,{c:'on',f:'disp',wt:700,al:'center'})],
 (W,H)=>back(W,H,'stripe'));

/* 4 · Minimal Office — hairlines, grid of info */
add('em-minimal','employee','Minimal Office','مكتبي بسيط','Clean and simple with excellent readability.',
 mk({bg:'#f7f7f5',a:'#2f3640',b:'#e6e6e1',c:'#3b82f6',tx:'#1b1f24',mu:'#767b82',on:'#ffffff'},[{c:'#ef4444'},{c:'#10b981'},{c:'#8b5cf6'}]),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),R(0,0,W,1.6,'c'),LG(5,6,8,8),T('org',15,10,W-20,5.8,{wt:600,c:'mu',ml:2,lh:1.15}),PH(5,19,W-10,30,'rect'),
  T('name',5,56,W-10,11,{wt:700,c:'tx'}),T('role',5,62,W-10,7.2,{c:'c',wt:600}),LN(5,66,W-5,66,'b',.5),
  T('@unit',5,69.6,W-10,4,{c:'mu',up:1,ls:.6}),T('unit',5,73.6,W-10,6.4,{wt:500}),T('id',5,79.4,W-10,5.4,{f:'disp',wt:500,c:'mu',ls:.8})]:[
  R(0,0,W,H,'bg'),R(0,0,1.6,H,'c'),LG(7,6,8,8),T('org',17,10,40,5.8,{wt:600,c:'mu',ml:1}),PH(W-29,6,22,28,'rect'),
  T('name',7,24,W-40,13,{wt:700,c:'tx',ml:1}),T('role',7,31.4,W-40,7.4,{c:'c',wt:600}),LN(7,37,W-8,37,'b',.5),
  T('@unit',7,41,28,4,{c:'mu',up:1,ls:.6}),T('unit',7,45,34,6.6,{wt:500}),T('@id',46,41,28,4,{c:'mu',up:1,ls:.6}),T('id',46,45,32,6.6,{f:'disp',wt:500})],
 (W,H)=>back(W,H,'minimal'));

/* 5 · Technology Staff — graphite, circuit lines, QR + tags */
add('em-tech','employee','Technology Staff','موظف تقني','Technology-inspired with department, position, ID and QR.',
 mk({bg:'#101418',a:'#10b981',b:'#1a2127',c:'#34d399',tx:'#e8f0ee',mu:'#8a9a97',on:'#06201a'},DA),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),R(0,0,W,22,'b'),LN(0,22,W,22,'a',.5),LN(8,22,8,15,'a',.35),LN(8,15,19,15,'a',.35),C(19,15,.9,'a'),LN(W-9,22,W-9,12,'a',.35),C(W-9,12,.9,'a'),
  LG(4,4,8,8),T('org',14,8,W-18,5.8,{c:'tx',wt:600,ml:2,lh:1.15}),PH(5,26,24,24,'round',{r:2,bs:'a',bw:.6}),Q(31,28,18,{bg:'#e8f0ee'}),
  T('name',4,60,W-8,10.5,{f:'disp',wt:700,c:'tx',al:'center'}),R(W/2-17,64.8,34,6,'b',{r:3,s:'a',sw:.25}),T('role',W/2-16,67.8,32,6,{c:'a',wt:600,al:'center'}),
  T('unit',4,74.4,W-8,6,{c:'mu',al:'center'}),R(0,H-5,W,5,'a'),T('id',4,H-2.5,W-8,6,{c:'on',f:'disp',wt:700,al:'center',ls:.8})]:[
  R(0,0,W,H,'bg'),R(0,0,W,9,'b'),LN(0,9,W,9,'a',.5),LG(4,1.5,6,6),T('org',12,4.5,50,5.4,{c:'tx',wt:600,ml:1}),LN(W-30,9,W-30,15,'a',.35),C(W-30,15,.9,'a'),
  PH(5,14,25,31,'round',{r:2,bs:'a',bw:.6}),T('name',35,17,W-61,11,{f:'disp',wt:700,c:'tx',ml:1}),
  R(35,21.5,W-62,6,'b',{r:3,s:'a',sw:.25}),T('role',37,24.6,W-66,6,{c:'a',wt:600}),R(35,29.5,W-62,6,'b',{r:3}),T('unit',37,32.6,W-66,6,{c:'tx'}),
  Q(W-24,13.5,19,{bg:'#e8f0ee'}),T('@id',35,41,20,4,{c:'mu',up:1,ls:.8}),T('id',35,45.4,W-40,6.4,{f:'disp',wt:700,c:'a'}),R(0,H-2.2,W,2.2,'a')],
 (W,H)=>back(W,H,'foot',{qr:1}));
