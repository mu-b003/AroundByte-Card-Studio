/* Student ID collection — University / College. Authored for CR80; other sizes scale uniformly. */
import {add,mk,defCat,fset,R,C,PL,LN,DT,T,PH,LG,CA,AC,back} from './core.js';
import {kv,row} from './stages-school.js';
const cap=(W,H,w=W-8,h=11)=>CA(W/2-w/2,H-h-2.4,w,h);

defCat('university',{le:'University / College',la:'الجامعة / الكلية',group:'higher',
 title:['University & College ID Cards','بطاقات هوية الجامعات والكليات'],desc:['Formal, modern and premium identities with faculty, programme and validity details.','هويات رسمية وحديثة وفاخرة مع الكلية والبرنامج وبيانات الصلاحية.'],
 fields:fset(['name','id','role','major','unit','org','dept','degree','level','sem','reg','exam','email','campus','advisor','issue','expiry','status','web','icode','addr','phone','terms'],{role:{le:'Faculty / College',la:'الكلية',req:1},major:{le:'Major / Program',la:'التخصص / البرنامج',req:1}}),
 sample:{en:{name:'Omar Al-Mansouri',id:'UNI-2026-31457',role:'Faculty of Engineering',major:'Computer Engineering',unit:'2026 / 2027',org:'Riverton University',addr:'1 University Drive, Riverton',phone:'+1 555 0188',terms:'This card is the property of the university. Report loss immediately.'},
  ar:{name:'عمر المنصوري',id:'UNI-2026-31457',role:'كلية الهندسة',major:'هندسة الحاسوب',unit:'2026 / 2027',org:'جامعة ريفرتون',addr:'1 طريق الجامعة، ريفرتون',phone:'555 0188 1+',terms:'هذه البطاقة ملك للجامعة. يرجى الإبلاغ عن فقدانها فورًا.'},
  custom:[{l:'Campus',v:'Main'},{l:'Status',v:'Active'}]}});

add('un-classic','university','Classic University','جامعة كلاسيكية','Double rule frame, serif crest header and a formal portrait.',
 mk({bg:'#f7f1e3',a:'#7b1e2b',b:'#efe3c8',c:'#b8923a',tx:'#2a1a1a',mu:'#7a6a5a',on:'#ffffff'},[{a:'#14305f',c:'#b8923a'},{a:'#1f4d3a',c:'#b8923a'},{a:'#3b2a5c',c:'#c9a227'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),R(2.5,2.5,W-5,H-5,'bg',{r:2,s:'c',sw:.4}),R(3.8,3.8,W-7.6,H-7.6,'bg',{r:1.4,s:'c',sw:.2}),LG(6,6.5,9,9,{c:'a'}),T('org',17,11,W-23,5.4,{f:'serif',wt:700,c:'a',ml:2,lh:1.1}),LN(6,18.4,W-6,18.4,'c',.4),
  PH(W/2-11,21.5,22,25,'rect',{bw:.4,bs:'c'}),T('name',6,51,W-12,9.4,{f:'serif',wt:700,c:'tx',al:'center'}),T('role',6,55.8,W-12,5.2,{f:'serif',wt:600,c:'a',al:'center'}),T('major',6,59.6,W-12,4.8,{c:'mu',al:'center'}),T('unit',6,63.2,W-12,4.6,{c:'mu',al:'center'}),T('id',6,67.2,W-12,5,{f:'serif',wt:700,c:'tx',al:'center',ls:.6}),cap(W,H,W-8,10.5)]
 :[R(0,0,W,H,'bg'),R(2.5,2.5,W-5,H-5,'bg',{r:2,s:'c',sw:.4}),R(3.8,3.8,W-7.6,H-7.6,'bg',{r:1.4,s:'c',sw:.2}),LG(7,6,11,11,{c:'a'}),T('org',20,11.5,W-27,6,{f:'serif',wt:700,c:'a',ml:2,lh:1.1}),LN(7,19.4,W-7,19.4,'c',.4),
  PH(7,22.6,22,23,'rect',{bw:.4,bs:'c'}),T('id',7,48.2,22,4.2,{f:'serif',wt:700,c:'tx',al:'center'}),T('name',33,24.6,W-39,10,{f:'serif',wt:700,c:'tx'}),T('role',33,30.2,W-39,5.4,{f:'serif',wt:600,c:'a'}),T('major',33,34.4,W-39,4.8,{c:'mu'}),T('unit',33,38,W-39,4.6,{c:'mu'}),
  CA(33,40.6,W-39,9.6)],
 (W,H)=>back(W,H,'band',{f:'serif'}),{dir:'Classic'});

add('un-minimal','university','Modern Minimal','حديث بسيط','Quiet whitespace, small type and a single colour accent.',
 mk({bg:'#ffffff',a:'#0f172a',b:'#e2e8f0',c:'#2563eb',tx:'#0f172a',mu:'#64748b',on:'#ffffff'},[{c:'#059669'},{c:'#e11d48'},{c:'#7c3aed'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),R(6,6,3.4,3.4,'c'),T('org',12,7.8,W-17,4.2,{c:'tx',wt:700,up:1,ls:.6}),PH(6,14,W-12,30,'rect'),T('name',6,49.4,W-12,9.6,{wt:600,c:'tx'}),
  ...row(6,53.6,[['role',24],['major',W-12-24]]),...row(6,61.4,[['unit',20],['id',W-12-20]]),cap(W,H,W-8,10.5)]
 :[R(0,0,W,H,'bg'),R(7,7,3.4,3.4,'c'),T('org',13,8.8,W-48,4.2,{c:'tx',wt:700,up:1,ls:.6}),PH(W-31,7,24,31,'rect'),T('name',7,19.8,W-42,11.5,{wt:600,c:'tx'}),
  ...row(7,24.2,[['role',23],['major',W-42-23]]),...row(7,32.2,[['unit',20],['id',W-42-20]]),CA(7,40.6,W-48,11)],
 (W,H)=>back(W,H,'minimal'),{dir:'Minimal'});

add('un-executive','university','Premium Executive','تنفيذي فاخر','Charcoal and gold with a vertical rule and framed portrait.',
 mk({bg:'#1c1f26',a:'#c9a24a',b:'#2a2e38',c:'#e6c878',tx:'#ffffff',mu:'#aab0bd',on:'#1c1f26'},[{a:'#b8c0cc',c:'#e5e9f0'},{a:'#d08a5c',c:'#f0c3a0'},{a:'#7fb7a4',c:'#c4e6da'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),R(0,0,W,6,'a'),T('id',4,3.2,W-8,4,{wt:800,c:'on',al:'center',ls:1.2}),LG(4,9,8,8,{c:'c'}),T('org',14,13.2,W-18,4.6,{c:'c',wt:700,up:1,ls:.5,ml:2,lh:1.1}),
  PH(W/2-11,20,22,27,'rect',{bw:.6,bs:'a'}),T('name',4,52.6,W-8,9.4,{wt:700,c:'tx',al:'center'}),T('role',4,57.6,W-8,5,{c:'c',wt:600,al:'center'}),T('major',4,61.6,W-8,4.6,{c:'mu',al:'center'}),T('unit',4,65.4,W-8,4.4,{c:'mu',al:'center'}),cap(W,H,W-8,10.5)]
 :[R(0,0,W,H,'bg'),R(0,0,6,H,'a'),R(6,0,.8,H,'c'),LG(13,6,8,8,{c:'c'}),T('org',23,10,W-60,4.6,{c:'c',wt:700,up:1,ls:.5,ml:2,lh:1.1}),PH(W-31,7,25,31,'rect',{bw:.6,bs:'a'}),
  T('name',13,19.4,W-47,10.5,{wt:700,c:'tx'}),T('role',13,25,W-47,5.4,{c:'c',wt:600}),T('major',13,29,W-47,4.8,{c:'mu'}),...row(13,32,[['unit',18],['id',22]],{c:'tx'}),CA(13,40.5,W-17,11)],
 (W,H)=>back(W,H,'band'),{dir:'Executive'});

const chip=(x,y)=>[R(x,y,8,6,'#e6c15a',{r:1}),LN(x+2.7,y,x+2.7,y+6,'#a8862a',.25),LN(x+5.3,y,x+5.3,y+6,'#a8862a',.25),LN(x,y+3,x+8,y+3,'#a8862a',.25)];
const nfc=(x,y)=>[AC(x,y,1.6,-50,50,'on',{sw:.35}),AC(x,y,3.2,-50,50,'on',{sw:.35}),AC(x,y,4.8,-50,50,'on',{sw:.35})];
add('un-smart','university','Smart Campus','حرم ذكي','Smart-card look: chip graphic and a contactless symbol (print only).',
 mk({bg:'#f4f7fb',a:'#0057ff',b:'#dce7ff',c:'#00c2a8',tx:'#0b1b3a',mu:'#5d6b88',on:'#ffffff'},[{a:'#0f766e',b:'#d5efea'},{a:'#7c3aed',b:'#e9defc',c:'#f59e0b'},{a:'#0b1b3a',b:'#d9deea',c:'#00c2a8'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),PL([[0,0],[W,0],[W,15],[0,21]],'a'),DT(W-22,2,16,8,'on',{o:.25}),LG(4,3,8,8,{c:'on'}),T('org',14,7.4,W-30,4.6,{c:'on',wt:700,ml:2,lh:1.1}),...chip(W-12,4),...nfc(W-17,7),
  PH(W/2-11,24,22,25,'round',{r:2,bw:.7,bs:'c'}),T('name',4,52.4,W-8,9.4,{wt:700,c:'tx',al:'center'}),T('role',4,57.4,W-8,5,{c:'a',wt:700,al:'center'}),T('major',4,61,W-8,4.6,{c:'mu',al:'center'}),...row(8,63.4,[['unit',20],['id',W-16-20]]),cap(W,H,W-8,10)]
 :[R(0,0,W,H,'bg'),PL([[0,0],[W,0],[W,11],[0,16]],'a'),DT(W-40,1.5,20,6,'on',{o:.25}),LG(5,2.2,8,8,{c:'on'}),T('org',15,6.4,W-50,4.6,{c:'on',wt:700,ml:1}),...chip(W-14,2.6),...nfc(W-19,5.6),
  PH(W-31,18,25,31,'round',{r:2,bw:.7,bs:'c'}),T('name',7,20.4,W-42,10.4,{wt:700,c:'tx'}),T('role',7,25.8,W-42,5.4,{c:'a',wt:700}),T('major',7,29.8,W-42,4.8,{c:'mu'}),...row(7,32.2,[['unit',19],['id',22]]),CA(7,40.5,W-42,11)],
 (W,H)=>back(W,H,'band'),{dir:'Smart'});

add('un-identity','university','Academic Identity','هوية أكاديمية','The faculty leads: large faculty title with a colour spine.',
 mk({bg:'#ffffff',a:'#0f766e',b:'#e6f4f1',c:'#f59e0b',tx:'#10231f',mu:'#5b7470',on:'#ffffff'},[{a:'#1d4ed8',b:'#e8effd'},{a:'#9f1239',b:'#fbe9ee'},{a:'#4d3a8f',b:'#ece8f8'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),R(0,0,W,25.5,'a'),LG(4,3,7,7,{c:'on'}),T('org',13,6.4,W-17,4.2,{c:'on',wt:600,ml:1,o:.9}),T('role',4,14.6,W-8,7.6,{f:'disp',wt:800,c:'on',ml:1}),T('major',4,21.6,W-8,4.8,{c:'c',wt:700}),
  PH(W/2-11,28.5,22,25,'round',{r:2,bw:.8,bs:'a'}),T('name',4,57,W-8,9.4,{wt:700,c:'tx',al:'center'}),...row(6,62,[['unit',20],['id',W-12-20]]),cap(W,H,W-8,10)]
 :[R(0,0,W,H,'bg'),R(0,0,26,H,'a'),LG(5,5,16,16,{c:'on'}),PH(4,25,18,24,'round',{r:2,bw:.7,bs:'#ffffff'}),T('org',31,8,W-35,4.2,{c:'mu',wt:700,up:1,ls:.5,ml:1}),
  T('role',31,14.6,W-35,8,{f:'disp',wt:800,c:'a',ml:1}),T('major',31,20.6,W-35,5,{c:'tx',wt:600}),LN(31,24.4,W-5,24.4,'c',.7),T('name',31,27.8,W-35,9.6,{wt:700,c:'tx'}),...row(31,32.2,[['unit',19],['id',W-35-19]]),CA(31,40.6,W-35,11)],
 (W,H)=>back(W,H,'stripe'),{dir:'Academic'});

add('un-creative','university','Contemporary Creative','معاصر إبداعي','Asymmetric overlapping shapes and bold colour.',
 mk({bg:'#fff7ed',a:'#ff5a36',b:'#2d2a6e',c:'#ffc857',tx:'#1d1b3a',mu:'#6b6890',on:'#ffffff'},[{a:'#e11d74',b:'#1e3a8a',c:'#fcd34d'},{a:'#0ea5a4',b:'#0f2a43',c:'#fb923c'},{a:'#7c3aed',b:'#1f1147',c:'#fde047'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),C(8,2,22,'b'),PL([[W-26,0],[W,0],[W,26]],'a'),C(W-9,20,6,'c',{o:.95}),LG(4,3,8,8,{c:'on'}),T('org',14,7,W-34,4.4,{c:'on',wt:700,ml:2,lh:1.1}),
  C(W/2-3.5,32,16,'c'),PH(W/2-13,19,26,26,'circ',{bw:1,bs:'#ffffff'}),T('name',4,51.4,W-8,9.8,{f:'disp',wt:700,c:'tx',al:'center'}),T('role',4,56.4,W-8,5,{c:'a',wt:700,al:'center'}),T('major',4,60,W-8,4.6,{c:'mu',al:'center'}),...row(8,62.8,[['unit',20],['id',W-16-20]]),cap(W,H,W-8,10)]
 :[R(0,0,W,H,'bg'),C(14,44,24,'b'),PL([[0,0],[30,0],[0,26]],'a'),C(34,16,8,'c',{o:.95}),PH(8,8,28,28,'circ',{bw:1.1,bs:'#ffffff'}),R(5,41.4,32,6.4,'#ffffff',{r:3.2}),T('id',5,44.6,32,4.8,{f:'disp',wt:700,c:'b',al:'center'}),
  LG(45,5,7,7,{c:'a'}),T('org',54,8.6,W-58,4.4,{c:'mu',wt:600,ml:2,lh:1.1}),T('name',45,18.6,W-49,11,{f:'disp',wt:700,c:'tx'}),T('role',45,24.4,W-49,5.4,{c:'a',wt:700}),T('major',45,28.4,W-49,4.8,{c:'mu'}),...row(45,31.4,[['unit',18],['id',W-49-18]]),CA(45,40.6,W-49,11)],
 (W,H)=>back(W,H,'foot',{f:'disp'}),{dir:'Creative'});
