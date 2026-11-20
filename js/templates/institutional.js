import {add,mk,LA,DA,R,C,PL,LN,DT,T,PH,LG,Q,B,CU,back} from './core.js';

/* 1 · University Official — crest-led, formal, double rule */
add('in-university','institutional','University Official','جامعة رسمي','Formal academic design with institution logo and official details.',
 mk({bg:'#f8f6f0',a:'#1b2a49',b:'#0f1a30',c:'#b8923a',tx:'#1a2238',mu:'#68708a',on:'#f8f6f0'},[{a:'#6d1a2b',b:'#3f0e18',c:'#b8923a'},{a:'#14532d',b:'#0c3320',c:'#b8923a'},{a:'#334155',b:'#1e293b',c:'#c2410c'}]),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),R(2,2,W-4,H-4,'bg',{s:'c',sw:.4}),R(3.2,3.2,W-6.4,H-6.4,'bg',{s:'c',sw:.15}),
  C(W/2,15.5,9,'a'),LG(W/2-6.5,9,13,13,{c:'c'}),T('org',6,30.5,W-12,6.2,{f:'serif',wt:700,c:'a',al:'center',ml:2,lh:1.15}),LN(W/2-8,36.4,W/2+8,36.4,'c',.4),
  PH(W/2-10,40,20,24,'rect',{bs:'a',bw:.5}),T('name',5,69.2,W-10,8.6,{f:'serif',wt:700,c:'tx',al:'center'}),T('role',5,74.2,W-10,6,{c:'a',al:'center',wt:600}),T('id',5,78.6,W-10,5.2,{f:'disp',c:'mu',al:'center',wt:500,ls:.8})]:[
  R(0,0,W,H,'bg'),R(2,2,W-4,H-4,'bg',{s:'c',sw:.4}),R(3.2,3.2,W-6.4,H-6.4,'bg',{s:'c',sw:.15}),
  C(15.5,15.5,8.2,'a'),LG(8.3,8.3,14.4,14.4,{c:'c'}),T('org',27,15.5,W-34,7,{f:'serif',wt:700,c:'a',ml:2,lh:1.15}),LN(7,26.2,W-7,26.2,'c',.4),
  PH(7,29.5,16.5,20.5,'rect',{bs:'a',bw:.4}),T('name',28,33.4,W-35,10,{f:'serif',wt:700,c:'tx',ml:1}),T('role',28,39.2,W-35,6.6,{c:'a',wt:600}),
  T('@id',28,44.6,14,3.8,{c:'mu',up:1,ls:.6}),T('id',28,48.6,22,5.4,{f:'disp',wt:600}),T('@unit',54,44.6,24,3.8,{c:'mu',up:1,ls:.6}),T('unit',54,48.6,24,5.4,{c:'a',wt:600})],
 (W,H)=>back(W,H,'minimal',{f:'serif'}));

/* 2 · School Identity — green wave, round photo, friendly formal */
add('in-school','institutional','School Identity','هوية مدرسية','Clear school identity for school communities.',
 mk({bg:'#ffffff',a:'#1f7a4d',b:'#e8f5ee',c:'#f2c230',tx:'#14301f',mu:'#5b7566',on:'#ffffff'},[{a:'#1d4ed8',b:'#e6eefc',c:'#f59e0b'},{a:'#9f1239',b:'#fbe9ee',c:'#f2c230'},{a:'#6d28d9',b:'#efe9fb',c:'#34d399'}]),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),R(0,0,W,30,'b'),PL([[0,26],[14,22],[28,27],[42,22],[W,26],[W,H],[0,H]],'a'),PL([[0,31],[14,27],[28,32],[42,27],[W,31],[W,34],[0,34]],'c',{o:.9}),
  LG(W/2-6,2.5,12,12),T('org',4,18.6,W-8,5.6,{wt:700,c:'a',al:'center',ml:2,lh:1.1}),
  C(W/2,43,15,'#ffffff'),PH(W/2-13.5,29.5,27,27,'circ'),T('name',4,64,W-8,10.5,{wt:700,c:'on',al:'center',f:'disp'}),T('role',4,70,W-8,7,{c:'on',al:'center',wt:600}),
  T('unit',4,74.2,W-8,6,{c:'c',al:'center',wt:600}),T('id',4,80.5,W-8,6,{c:'on',al:'center',f:'disp',wt:500,ls:.8})]:[
  R(0,0,W,H,'bg'),R(0,0,31,H,'b'),C(W+1,6,10,'a'),C(W-1,22,9,'a'),C(W+1,38,10,'a'),C(W-1,53,9,'a'),C(W-14,14,2.4,'c'),C(W-14,46,2.4,'c'),
  C(16,20,12,'#ffffff'),PH(4.5,8.5,23,23,'circ'),T('@id',2,37,27,3.8,{c:'mu',up:1,ls:.7,al:'center'}),T('id',2,41.4,27,5.8,{f:'disp',wt:700,c:'a',al:'center'}),
  LG(36,5,9,9),T('org',47,9.5,W-62,5.8,{wt:700,c:'a',ml:2,lh:1.1}),T('name',36,23.5,W-52,11.5,{wt:700,c:'tx',f:'disp',ml:1}),
  T('role',36,31,W-52,7.4,{c:'a',wt:600}),T('@unit',36,38.6,30,3.8,{c:'mu',up:1,ls:.6}),R(36,41.5,28,6,'c',{r:3}),T('unit',36,44.5,28,5.6,{c:'tx',wt:700,al:'center'})],
 (W,H)=>back(W,H,'foot'));

/* 3 · Training Institute — bold diagonal band, orange accent */
add('in-training','institutional','Training Institute','معهد تدريب','Modern professional educational design.',
 mk({bg:'#ffffff',a:'#0b5fa5',b:'#e9f2fb',c:'#ff8a1f',tx:'#0e2238',mu:'#5a6f85',on:'#ffffff'},[{a:'#7c3aed',b:'#efe9fd',c:'#f59e0b'},{a:'#0f766e',b:'#e3f4f2',c:'#f43f5e'},{a:'#111827',b:'#eceef2',c:'#facc15'}]),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),PL([[0,0],[W,0],[W,H*.43],[0,H*.55]],'a'),PL([[0,H*.55],[W,H*.43],[W,H*.43+4],[0,H*.55+4]],'c'),LG(4,4,9,9,{c:'on'}),T('org',15,8.5,W-19,6.4,{wt:700,c:'on',ml:2,lh:1.15}),
  PH(W/2-13,18,26,32,'round',{r:1.5,bs:'bg',bw:1.4}),T('name',4,H*.55+13,W-8,10.5,{wt:700,c:'tx',al:'center'}),T('role',4,H*.55+19,W-8,7,{c:'a',wt:600,al:'center'}),
  T('unit',4,H*.55+23.6,W-8,6,{c:'mu',al:'center'}),R(6,H-10,W-12,6,'b',{r:3}),T('id',6,H-7,W-12,5.8,{f:'disp',wt:700,c:'a',al:'center',ls:.8})]:[
  R(0,0,W,H,'bg'),PL([[0,0],[44,0],[30,H],[0,H]],'a'),PL([[44,0],[48,0],[34,H],[30,H]],'c'),LG(4,4,9,9,{c:'on'}),T('org',4,19,30,6,{wt:700,c:'on',ml:3,lh:1.15}),
  T('id',4,H-5,32,5.8,{f:'disp',wt:700,c:'on',ls:.6}),PH(W-28,6,22,27,'round',{r:1.5,bs:'a',bw:.5}),
  T('name',46,H-17,W-50,10.5,{wt:700,c:'tx',ml:1}),T('role',46,H-11.5,W-50,7,{c:'a',wt:600}),T('unit',46,H-7,W-50,6,{c:'mu'})],
 (W,H)=>back(W,H,'stripe'));

/* 4 · Government / Organization — centred emblem, double border, top rule */
add('in-government','institutional','Government / Organization','حكومي / منظمة','Formal institutional layout with clear hierarchy and restrained decoration.',
 mk({bg:'#ffffff',a:'#2d3a4a',b:'#eceff3',c:'#b3262e',tx:'#1a222c',mu:'#667180',on:'#ffffff'},[{a:'#14305f',b:'#e8eef8',c:'#b3262e'},{a:'#14532d',b:'#e7f4ec',c:'#a16207'},{a:'#3b2f2f',b:'#f1ebe7',c:'#9a3412'}]),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),R(0,0,W,3.2,'c'),R(3,6,W-6,H-9,'bg',{s:'a',sw:.4}),LG(W/2-6.5,9,13,13),T('org',5,27.4,W-10,6,{wt:700,c:'a',al:'center',ml:2,lh:1.15,up:1,ls:.3}),
  LN(W/2-9,33.4,W/2+9,33.4,'c',.5),PH(W/2-10.5,37,21,25.5,'rect',{bs:'a',bw:.4}),T('name',5,67.4,W-10,8.4,{wt:700,c:'tx',al:'center'}),T('role',5,72.2,W-10,5.8,{c:'c',al:'center',wt:700,up:1,ls:.5}),
  R(3.4,H-9.6,W-6.8,5.4,'b'),T('id',4,H-6.9,W-8,5.2,{f:'disp',wt:600,c:'a',al:'center',ls:.8})]:[
  R(0,0,W,H,'bg'),R(0,0,W,3,'c'),R(2.5,5.5,W-5,H-8,'bg',{s:'a',sw:.4}),LG(6.5,9,15,15),T('org',24,16.5,W-30,6.6,{wt:700,c:'a',ml:2,lh:1.15,up:1,ls:.3}),
  LN(6,28.5,W-6,28.5,'c',.5),PH(7,31.5,16,18.5,'rect',{bs:'a',bw:.4}),T('name',28,34,W-34,9.5,{wt:700,c:'tx',ml:1}),T('role',28,39.4,W-34,6.2,{c:'c',wt:700,up:1,ls:.4}),
  T('@id',28,44,18,3.6,{c:'mu',up:1,ls:.6}),T('id',28,47.8,24,5.2,{f:'disp',wt:600,c:'a'}),T('@unit',55,44,24,3.6,{c:'mu',up:1,ls:.6}),T('unit',55,47.8,24,5.2,{c:'tx',wt:600})],
 (W,H)=>back(W,H,'band'));

/* 5 · Modern Institutional — split panel, oversized initial, flexible branding */
add('in-modern','institutional','Modern Institutional','مؤسسي حديث','Contemporary split layout with flexible branding.',
 mk({bg:'#ffffff',a:'#4338ca',b:'#eef0ff',c:'#14b8a6',tx:'#17163a',mu:'#6b6a8c',on:'#ffffff'},[{a:'#0f766e',b:'#e3f4f2',c:'#f59e0b'},{a:'#be123c',b:'#fbe9ee',c:'#6366f1'},{a:'#111827',b:'#eceef2',c:'#22c55e'}]),
 (P,W,H)=>P?[
  R(0,0,W,H,'bg'),R(0,0,W,H*.46,'a'),DT(W-20,3,18,14,'c',{o:.55,g:2}),C(W+2,H*.46,7,'c',{o:.9}),LG(4,4,9,9,{c:'on'}),T('org',15,8.5,W-26,6.2,{wt:700,c:'on',ml:2,lh:1.15}),
  PH(W/2-13,H*.46-17,26,32,'round',{r:2,bs:'bg',bw:1.4}),T('name',4,H*.46+22,W-8,10.5,{wt:700,c:'tx',al:'center'}),T('role',4,H*.46+28.2,W-8,7,{c:'a',wt:600,al:'center'}),
  T('@id',4,H-12.6,W-8,3.8,{c:'mu',up:1,ls:.8,al:'center'}),T('id',4,H-8,W-8,6.4,{f:'disp',wt:700,c:'tx',al:'center'}),R(W/2-6,H-3.6,12,1.1,'c')]:[
  R(0,0,W,H,'bg'),R(0,0,31,H,'a'),DT(0,H-18,31,18,'c',{o:.45,g:2}),LG(4,4,9,9,{c:'on'}),T('org',4,18,24,5.4,{wt:700,c:'on',ml:2,lh:1.15}),
  PH(18,25,22,25.5,'round',{r:2,bs:'bg',bw:1.2}),T('$holder',46,10,W-50,3.8,{c:'c',up:1,ls:.8,wt:700}),T('name',46,22,W-50,11,{wt:700,c:'tx',ml:1}),T('role',46,28.8,W-50,7.2,{c:'a',wt:600}),LN(46,34.2,W-6,34.2,'b',.6),
  T('@id',46,39.4,18,3.8,{c:'mu',up:1,ls:.7}),T('id',46,44,19,6,{f:'disp',wt:700,c:'tx'}),T('@unit',66,39.4,17,3.8,{c:'mu',up:1,ls:.7}),T('unit',66,44,17,6,{c:'tx',wt:600})],
 (W,H)=>back(W,H,'band'));
