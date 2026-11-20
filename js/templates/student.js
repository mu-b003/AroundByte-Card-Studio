import {add,mk,LA,DA,R,C,PL,LN,DT,T,PH,LG,Q,B,CU,back} from './core.js';

/* 1 · Modern Academic — solid side column, photo + ID in column */
add('st-modern','student','Modern Academic','أكاديمي عصري','Clean academic look with a colour column.',
 mk({bg:'#ffffff',a:'#14305f',b:'#e8eef8',c:'#f2a900',tx:'#14213d',mu:'#5b6b85',on:'#ffffff'},LA),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),R(0,0,W,17,'a'),DT(W-22,0,22,17,'c',{o:.28,g:1.8}),LG(4,3.5,10,10,{c:'c'}),T('org',16.5,8.5,W-20,6.8,{c:'on',wt:700,ml:2,lh:1.15}),
  PH(13,21,28,34,'round',{r:1.6,bs:'c',bw:.7}),
  T('name',4,62.5,W-8,11.5,{al:'center',wt:700,c:'tx'}),T('role',4,68.8,W-8,7.5,{al:'center',wt:600,c:'a'}),T('unit',4,73,W-8,6.4,{al:'center',c:'mu'}),
  R(0,H-9,W,9,'a'),T('@id',4,H-6.2,20,4,{c:'c',wt:600,up:1,ls:.8}),T('id',4,H-3,W-8,6.4,{c:'on',wt:700,f:'disp'})]:[
  R(0,0,W,H,'bg'),R(0,0,25,H,'a'),DT(0,H-17,25,17,'c',{o:.3,g:1.8}),
  PH(3.5,7,18,23,'round',{r:1.4,bs:'c',bw:.7}),T('@id',2,35,21,4,{c:'c',al:'center',wt:600,up:1,ls:.8}),T('id',2,39.5,21,6.3,{c:'on',al:'center',wt:700,f:'disp'}),
  LG(30,4.5,10,10),T('org',42,9.5,W-46,7.2,{c:'a',wt:700,ml:2,lh:1.15}),LN(30,19,W-4,19,'c',.5),
  T('@name',30,23.8,50,4,{c:'mu',up:1,ls:.7,wt:600}),T('name',30,29.5,W-34,12.5,{c:'tx',wt:700}),
  T('@role',30,38.6,26,4,{c:'mu',up:1,ls:.7,wt:600}),T('role',30,42.8,28,7.8,{c:'tx',wt:600}),
  T('@unit',60,38.6,22,4,{c:'mu',up:1,ls:.7,wt:600}),T('unit',60,42.8,22,7.8,{c:'tx',wt:600}),R(30,49.6,W-34,1,'c')],
 (W,H)=>back(W,H,'band'));

/* 2 · Creative School — playful circles, pills, big round photo */
add('st-creative','student','Creative School','مدرسة إبداعية','Friendly geometric shapes for primary and secondary schools.',
 mk({bg:'#fff7e6',a:'#ff6b3d',b:'#2ec4b6',c:'#ffbf1f',tx:'#2b2d42',mu:'#6c6f85',on:'#ffffff'},[{a:'#7c3aed',b:'#ec4899',c:'#fbbf24'},{a:'#0ea5e9',b:'#22c55e',c:'#fde047'},{a:'#e11d48',b:'#f59e0b',c:'#38bdf8'}]),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),C(W/2,-4,34,'a'),C(0,H-2,9,'b',{o:.95}),PL([[W,H],[W-16,H],[W,H-15]],'a',{o:.9}),
  LG(W/2-5,2,10,10,{c:'on'}),T('org',6,16.5,W-12,6.3,{c:'on',wt:700,al:'center',ml:2,lh:1.1}),
  C(W/2,40,17,'#ffffff'),PH(W/2-15.5,24.5,31,31,'circ'),
  T('name',4,62,W-8,11,{f:'disp',wt:700,c:'tx',al:'center'}),
  R(W/2-18,67.5,36,6,'c',{r:3}),T('role',W/2-16,70.5,32,6.2,{c:'tx',wt:700,al:'center'}),
  T('unit',4,77,W-8,6,{c:'mu',al:'center',wt:600}),T('id',4,82,W-8,6.2,{f:'disp',wt:700,c:'a',al:'center'})]:[
  R(0,0,W,H,'bg'),C(80,5,22,'a'),C(68,58,17,'b',{o:.95}),PL([[0,0],[21,0],[0,19]],'c'),C(25,28,16.5,'#ffffff'),PH(10.5,13.5,29,29,'circ'),
  LG(70,2,9,9,{c:'on'}),T('org',62,14.5,22,5,{c:'on',wt:700,al:'center'}),
  T('name',46,26,W-50,10.5,{f:'disp',wt:700,c:'tx'}),R(46,32,31,5.8,'c',{r:2.9}),T('role',48,35,27,6,{c:'tx',wt:700}),
  T('unit',46,42,26,6,{c:'mu',wt:600}),T('id',6,50,40,6.2,{f:'disp',wt:700,c:'a'})],
 (W,H)=>back(W,H,'foot'));

/* 3 · University Premium — crest header, framed portrait, serif type */
add('st-premium','student','University Premium','جامعي مميز','Elegant, formal and strongly branded.',
 mk({bg:'#faf5ea',a:'#6d1a2b',b:'#3f0e18',c:'#c9a24b',tx:'#2a1418',mu:'#6f5a55',on:'#faf5ea'},[{a:'#14305f',b:'#0b1d3d',c:'#c9a24b'},{a:'#14532d',b:'#0c3320',c:'#c9a24b'},{a:'#2f3640',b:'#1b1f24',c:'#d4a017'}]),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),R(0,0,W,24,'a'),R(0,24,W,.9,'c'),LG(W/2-6,2.5,12,12,{c:'c'}),T('org',4,19.5,W-8,6.8,{f:'serif',wt:700,c:'on',up:1,ls:.5,al:'center',ml:1}),
  PH(W/2-12.5,29,25,31,'rect',{bs:'c',bw:.7}),T('name',3,66,W-6,10.5,{f:'serif',wt:700,c:'a',al:'center'}),LN(W/2-9,70.4,W/2+9,70.4,'c',.4),
  T('role',4,74,W-8,7,{c:'tx',al:'center',wt:600}),T('unit',4,78,W-8,6,{c:'mu',al:'center'}),R(0,H-5.5,W,5.5,'a'),T('id',4,H-2.7,W-8,6,{c:'c',f:'disp',wt:600,al:'center',ls:.8})]:[
  R(0,0,W,H,'bg'),R(0,0,W,13,'a'),R(0,13,W,.8,'c'),LG(4,1.6,9.8,9.8,{c:'c'}),T('org',16,6.6,W-20,8.2,{f:'serif',wt:700,c:'on',up:1,ls:.5}),
  PH(5,18.5,22,27.5,'rect',{bs:'c',bw:.7}),T('name',32,23.5,W-36,11.5,{f:'serif',wt:700,c:'a'}),LN(32,29,W-5,29,'c',.4),
  T('role',32,33.5,W-36,7.5,{c:'tx',wt:600}),T('unit',32,38,W-36,6.8,{c:'mu'}),T('@id',32,43.6,20,4,{c:'mu',up:1,ls:.7,wt:600}),T('id',46,43.6,W-50,6.8,{f:'disp',wt:600,c:'a'}),
  R(0,H-4,W,4,'a'),R(0,H-4.8,W,.8,'c')],
 (W,H)=>back(W,H,'minimal',{f:'serif'}));

/* 4 · Minimal Student — whitespace, one accent, strong type */
add('st-minimal','student','Minimal Student','طالب مينيمال','Minimal, highly readable, balanced white space.',
 mk({bg:'#ffffff',a:'#111111',b:'#f2f2f2',c:'#e4572e',tx:'#111111',mu:'#7a7a7a',on:'#ffffff'},[{c:'#2563eb'},{c:'#16a34a'},{c:'#a855f7'}]),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),R(5,5,5,1.4,'c'),T('org',5,11,W-10,5.6,{wt:600,c:'mu',up:1,ls:.7,ml:2,lh:1.2}),
  PH(5,20,W-10,36,'rect'),T('name',5,63,W-10,12,{f:'disp',wt:700,c:'tx'}),LN(5,69,W-5,69,'tx',.3),
  T('role',5,73,W-10,7,{wt:500}),T('unit',5,77,W-10,6,{c:'mu'}),T('id',5,82,W-10,6,{f:'disp',wt:500,c:'c',ls:.6}),LG(W-13,3,8,8)]:[
  R(0,0,W,H,'bg'),R(6,6,6,1.4,'c'),T('org',6,12,40,5.8,{wt:600,c:'mu',up:1,ls:.7,ml:2,lh:1.2}),LG(W-14,4.5,9,9),
  PH(6,20,21,27,'rect'),T('name',33,24,W-38,13.5,{f:'disp',wt:700,c:'tx'}),LN(33,30,W-6,30,'tx',.3),
  T('@role',33,35,24,4,{c:'mu',up:1,ls:.6}),T('role',33,39,26,7.4,{wt:600}),T('@unit',62,35,20,4,{c:'mu',up:1,ls:.6}),T('unit',62,39,20,7.4,{wt:600}),
  T('id',33,47,W-38,7,{f:'disp',wt:500,c:'c',ls:.8})],
 (W,H)=>back(W,H,'minimal'));

/* 5 · Digital Student — dark, tech grid, QR */
add('st-digital','student','Digital Student','طالب رقمي','Technology-inspired with a QR code for quick checks.',
 mk({bg:'#0b1324',a:'#0ea5e9',b:'#12203a',c:'#22d3ee',tx:'#e6f0ff',mu:'#8ea3c4',on:'#04111f'},[{a:'#8b5cf6',c:'#a78bfa',on:'#ffffff'},{a:'#10b981',c:'#34d399'},{a:'#f59e0b',c:'#fbbf24',on:'#111111'}]),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),DT(0,0,W,H,'c',{o:.13,g:3.2,r:.22}),R(0,0,W,1.2,'a'),LG(4,4,8,8),T('org',14,8,W-18,6,{wt:600,c:'tx',ml:2,lh:1.15}),
  C(W/2,34,15,'c',{o:.9}),PH(W/2-14,20,28,28,'circ'),T('name',4,56,W-8,10.5,{f:'disp',wt:700,c:'tx',al:'center'}),
  T('role',4,62,W-8,6.8,{c:'c',wt:600,al:'center'}),T('unit',4,66,W-8,6,{c:'mu',al:'center'}),
  R(4,70.5,W-8,.5,'c',{o:.5}),Q(4,73.5,9.5),T('@id',16,75.6,30,4,{c:'mu',up:1,ls:.8}),T('id',16,80.3,W-20,6.4,{f:'disp',wt:700,c:'c'})]:[
  R(0,0,W,H,'bg'),DT(0,0,W,H,'c',{o:.13,g:3.2,r:.22}),R(0,0,1.4,H,'a'),
  C(20,23,14,'c',{o:.9}),PH(7,10,26,26,'circ'),LG(5,41,8,8),T('org',14.5,45,34,5.4,{wt:600,c:'mu',ml:2,lh:1.1}),
  T('@name',40,9,30,4,{c:'c',up:1,ls:.8,wt:600}),T('name',40,14.5,W-45,10,{f:'disp',wt:700,c:'tx',ml:1}),
  T('role',40,22,W-45,6.8,{c:'tx',wt:500}),T('unit',40,26.2,W-45,6,{c:'mu'}),LN(40,31,W-5,31,'c',.3,{o:.5}),
  T('@id',40,35.5,22,4,{c:'mu',up:1,ls:.8}),T('id',40,40.4,22,6,{f:'disp',wt:700,c:'c'}),Q(W-24,33,19)],
 (W,H)=>back(W,H,'stripe',{qr:1}));
