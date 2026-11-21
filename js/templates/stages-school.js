/* Student ID collection — preschool, primary, secondary. Every template is its own composition (layout, type, shapes), authored for CR80 (85.6×54 / 54×85.6 mm).
   Rules every template follows: shows all core fields of its stage on the front; owns a front code area (CA) that sits on plain background, so QR / Code 128 never overlap content. */
import {add,mk,defCat,fset,R,C,PL,LN,DT,T,PH,LG,CA,AC,back} from './core.js';
const cap=(W,H,w=W-8,h=11)=>CA(W/2-w/2,H-h-2.4,w,h); // bottom-centre code area for portrait layouts

/* ───────────────────────── Preschool ───────────────────────── */
defCat('preschool',{le:'Kindergarten / Preschool',la:'رياض الأطفال / ما قبل المدرسة',group:'school',
 title:['Kindergarten & Preschool ID Cards','بطاقات هوية رياض الأطفال'],desc:['Friendly, colourful cards for ages 3–5 with large, clear type.','بطاقات ودودة وملونة للأعمار من 3 إلى 5 سنوات بخط كبير وواضح.'],
 fields:fset(['name','id','role','unit','org','teacher','parent','pphone','dob','room','route','addr','phone','terms'],{role:{le:'Class / Level',la:'الصف / المستوى',req:1}}),
 sample:{en:{name:'Lina Hassan',id:'KG-2026-031',role:'Sunflower Class',unit:'2026 / 2027',org:'Little Stars Nursery',addr:'8 Garden Road, Riverton',phone:'+1 555 0166',terms:'If found, please return this card to the nursery office.'},
  ar:{name:'لينا حسن',id:'KG-2026-031',role:'صف زهرة الشمس',unit:'2026 / 2027',org:'حضانة النجوم الصغيرة',addr:'8 شارع الحديقة، ريفرتون',phone:'555 0166 1+',terms:'في حال العثور على البطاقة يرجى إعادتها إلى مكتب الحضانة.'},
  custom:[{l:'Teacher',v:'Ms. Rania'},{l:'Room',v:'A-3'}]}});

add('pk-colorful','preschool','Colorful Kids','أطفال ملوّن','Confetti circles and a big round portrait.',
 mk({bg:'#fff8e7',a:'#ff6b6b',b:'#4ecdc4',c:'#ffd23f',tx:'#2b2d42',mu:'#7b7f95',on:'#ffffff'},[{a:'#8e6bff',b:'#ff9ecf'},{a:'#2ec4b6',b:'#ff9f1c',c:'#e71d36'},{a:'#4361ee',b:'#f72585',c:'#ffd60a'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),C(9,8,10,'a'),C(30,-1,6,'b'),C(W-4,6,7,'c',{o:.9}),C(W-2,40,4,'b',{o:.7}),C(2,52,4,'c',{o:.8}),
  LG(4,3,10,10,{c:'on'}),T('org',17,8.5,W-31,5,{c:'mu',wt:600,ml:2,lh:1.1}),C(W/2,32,15.5,'#ffffff'),PH(W/2-13.5,18.5,27,27,'circ',{bw:1,bs:'a'}),
  T('name',3,52.5,W-6,10.5,{f:'disp',wt:700,c:'tx',al:'center'}),R(W/2-15,56.6,30,6,'c',{r:3}),T('role',W/2-14,59.6,28,5,{wt:700,c:'tx',al:'center'}),
  T('unit',3,66,W-6,4.6,{c:'mu',al:'center'}),T('id',3,70.2,W-6,5.2,{f:'disp',wt:700,c:'a',al:'center'}),cap(W,H)]
 :[R(0,0,W,H,'bg'),C(8,6,9,'a'),C(27,-1,6,'b'),C(W-5,H-3,9,'b',{o:.35}),C(24,31,19,'#ffffff'),PH(8,15,32,32,'circ',{bw:1.1,bs:'a'}),
  LG(4.2,2.4,8,8,{c:'on'}),T('org',46,8,W-50,5.4,{c:'mu',wt:600,ml:2,lh:1.1}),T('name',46,20.5,W-50,11,{f:'disp',wt:700,c:'tx'}),R(46,24.8,W-50,6,'c',{r:3}),T('role',48,27.8,W-54,5,{wt:700,c:'tx',al:'center'}),
  T('unit',46,34,W-50,4.6,{c:'mu'}),T('id',46,37.8,W-50,5,{f:'disp',wt:700,c:'a'}),CA(46,40.5,W-50,11.5)],
 (W,H)=>back(W,H,'foot',{f:'disp'}),{dir:'Colorful'});

add('pk-minimal','preschool','Minimal Kids','أطفال بسيط','Soft frame, generous whitespace, calm typography.',
 mk({bg:'#ffffff',a:'#3d5a80',b:'#e0eef5',c:'#ee6c4d',tx:'#1d2d44',mu:'#7a8aa0',on:'#ffffff'},[{a:'#2a9d8f',b:'#e3f4f1',c:'#f4a261'},{a:'#7b5ea7',b:'#efe9f7',c:'#f28482'},{a:'#e07a5f',b:'#fbeee9',c:'#3d405b'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),R(2.5,2.5,W-5,H-5,'bg',{r:3,s:'b',sw:.6}),LG(W/2-4,6.5,8,8,{c:'a'}),T('org',6,18.5,W-12,5,{c:'mu',wt:600,al:'center',ml:1}),
  PH(W/2-12,23,24,26,'round',{r:3}),T('name',5,54.5,W-10,10,{f:'disp',wt:700,c:'tx',al:'center'}),T('role',5,60.3,W-10,5.4,{c:'a',wt:600,al:'center'}),T('unit',5,64.4,W-10,4.4,{c:'mu',al:'center'}),
  T('id',5,68.4,W-10,5,{f:'disp',wt:700,c:'c',al:'center'}),cap(W,H,W-14,10)]
 :[R(0,0,W,H,'bg'),R(2.5,2.5,W-5,H-5,'bg',{r:3,s:'b',sw:.6}),PH(7,7,24,32,'round',{r:3}),
  LG(37.5,7,8,8,{c:'a'}),T('org',47,11,W-53,5,{c:'mu',wt:600,ml:2,lh:1.1}),T('name',37.5,21.5,W-44,10.5,{f:'disp',wt:700,c:'tx'}),T('role',37.5,27.2,W-44,5.4,{c:'a',wt:600}),T('unit',37.5,31.6,W-44,4.4,{c:'mu'}),
  T('id',37.5,36,W-44,5,{f:'disp',wt:700,c:'c'}),CA(37.5,39.5,W-44.5,11)],
 (W,H)=>back(W,H,'minimal',{f:'disp'}),{dir:'Minimal'});

const bear=(x,y,k=1)=>{const br='#b07a4f',sn='#ecd0a8',dk='#3b2a20';return [C(x-5.4*k,y-5.4*k,2.8*k,br),C(x+5.4*k,y-5.4*k,2.8*k,br),C(x-5.4*k,y-5.4*k,1.4*k,sn),C(x+5.4*k,y-5.4*k,1.4*k,sn),C(x,y,7*k,br),C(x,y+2.4*k,3.3*k,sn),C(x,y+1.3*k,1*k,dk),C(x-2.5*k,y-1.3*k,.8*k,dk),C(x+2.5*k,y-1.3*k,.8*k,dk)]};
const grass=(W,y,h)=>{const e=[R(0,y,W,h,'b')];for(let x=2;x<W+6;x+=7)e.push(C(x,y,3.4,'b'));return e};
add('pk-animals','preschool','Cartoon Animals','حيوانات كرتونية','Original bear and grass illustration.',
 mk({bg:'#e8f6ff',a:'#4f9fe8',b:'#8bd17c',c:'#ffb703',tx:'#23395b',mu:'#5f7794',on:'#ffffff'},[{a:'#ff8fab',b:'#b5e48c',c:'#ffd166'},{a:'#9b8cff',b:'#80ed99',c:'#ffd6a5'},{a:'#ff9f68',b:'#7bd389',c:'#ffe066'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),C(10,24,4,'#ffffff'),C(15,23,5,'#ffffff'),C(W-8,34,3.5,'#ffffff'),C(W-4,33,4.5,'#ffffff'),...bear(W-13,11,1.05),
  LG(4,3,9,9,{c:'a'}),T('org',4,17,W-8,5,{c:'mu',wt:600,ml:1}),PH(W/2-11,21,22,25,'round',{r:3,bw:1,bs:'#ffffff'}),
  T('name',3,50.6,W-6,10,{f:'disp',wt:700,c:'tx',al:'center'}),T('role',3,56,W-6,5.4,{c:'a',wt:700,al:'center'}),T('unit',3,60.2,W-6,4.4,{c:'mu',al:'center'}),
  T('id',3,64.2,W-6,5,{f:'disp',wt:700,c:'tx',al:'center'}),...grass(W,69,40),cap(W,H,W-8,11)]
 :[R(0,0,W,H,'bg'),C(54,8,4,'#ffffff'),C(59,7,5,'#ffffff'),C(30,9,3,'#ffffff'),C(34,9,4,'#ffffff'),...bear(W-10.5,15,1),
  PH(7,7,26,30,'round',{r:3,bw:1,bs:'#ffffff'}),LG(38,4.5,8,8,{c:'a'}),T('org',47,8.5,W-47-21,5,{c:'mu',wt:600,ml:2,lh:1.1}),T('name',38,22,W-42,10,{f:'disp',wt:700,c:'tx'}),T('role',38,28.6,W-42,5.4,{c:'a',wt:700}),T('unit',38,33.6,W-42,4.4,{c:'mu'}),
  ...grass(W,40,20),T('id',6,46.8,30,5,{f:'disp',wt:700,c:'on'}),CA(W-38,41,34,11)],
 (W,H)=>back(W,H,'foot',{f:'disp'}),{dir:'Illustrated'});

add('pk-montessori','preschool','Montessori','منتسوري','Natural tones, arch shapes and a serif name.',
 mk({bg:'#f5efe6',a:'#7a8f6d',b:'#e2d4bd',c:'#c47a55',tx:'#3f3a33',mu:'#8a8174',on:'#fbf7f0'},[{a:'#6d8a96',b:'#d7e0e4',c:'#c98f6a'},{a:'#a67c6d',b:'#ead7c9',c:'#7d8f69'},{a:'#8d8f6a',b:'#e4e1c9',c:'#b4694e'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),R(W/2-15,5,30,38,'b',{r:15}),PH(W/2-12.5,7.5,25,33,'round',{r:12.5}),C(W-7,9,3.6,'c',{o:.9}),
  LG(4,4,8,8,{c:'a'}),T('org',3,47,W-6,4.6,{f:'serif',wt:600,c:'mu',al:'center',ml:1}),T('name',3,53,W-6,10,{f:'serif',wt:700,c:'tx',al:'center'}),
  T('role',3,59.2,W-6,5.2,{c:'a',wt:600,al:'center'}),T('unit',3,63.4,W-6,4.4,{c:'mu',al:'center'}),T('id',3,67.7,W-6,5,{f:'serif',wt:700,c:'c',al:'center'}),cap(W,H)]
 :[R(0,0,W,H,'bg'),R(5,5,30,40,'b',{r:15}),PH(7.5,7.5,25,35,'round',{r:12.5}),
  LG(40,4.5,8,8,{c:'a'}),T('org',50,8.5,W-54,5,{f:'serif',wt:700,c:'a',ml:2,lh:1.1}),T('name',40,21,W-44,10,{f:'serif',wt:700,c:'tx'}),LN(40,25.4,W-5,25.4,'c',.5),
  T('role',40,29.8,W-44,5.2,{c:'a',wt:600}),T('unit',40,34.2,W-44,4.4,{c:'mu'}),T('id',40,38.2,W-44,5,{f:'serif',wt:700,c:'c'}),CA(40,40.5,W-44,11.5)],
 (W,H)=>back(W,H,'stripe',{f:'serif'}),{dir:'Natural'});

add('pk-nursery','preschool','Professional Nursery','حضانة احترافية','Structured, trustworthy and easy to read at a glance.',
 mk({bg:'#ffffff',a:'#1f3c68',b:'#e9f0fa',c:'#2bb3a3',tx:'#172a46',mu:'#61738f',on:'#ffffff'},[{a:'#7a2a4f',b:'#f6e9f0',c:'#e0a43a'},{a:'#146356',b:'#e5f3ef',c:'#e0a43a'},{a:'#33415c',b:'#ecedf2',c:'#f2994a'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),R(0,0,W,16,'a'),LG(4,3,10,10,{c:'c'}),T('org',16,8,W-20,5.6,{c:'on',wt:700,ml:2,lh:1.1}),R(0,16,W,1.2,'c'),
  PH(W/2-12,21,24,27,'round',{r:2,bs:'a',bw:.5}),T('name',3,53.6,W-6,10,{wt:700,c:'tx',al:'center'}),T('role',3,59.4,W-6,5.2,{c:'a',wt:700,al:'center'}),T('unit',3,63.6,W-6,4.4,{c:'mu',al:'center'}),
  R(0,H-15.6,W,15.6,'b'),T('id',3,67.2,W-6,5,{f:'disp',wt:700,c:'tx',al:'center'}),cap(W,H)]
 :[R(0,0,W,H,'bg'),R(0,0,W,12,'a'),LG(4,1.6,8.8,8.8,{c:'c'}),T('org',15,6,W-19,6,{c:'on',wt:700,ml:1}),R(0,12,W,1,'c'),
  PH(5,17,22,31,'round',{r:2,bs:'a',bw:.5}),R(31,39,W-31,H-39,'b'),T('name',32,21.6,W-36,9,{wt:700,c:'tx'}),T('role',32,28.2,W-36,5.4,{wt:700,c:'a'}),T('unit',32,33,W-36,4.4,{c:'mu'}),
  T('id',32,36.8,W-36,5,{f:'disp',wt:700,c:'tx'}),CA(34,40.5,W-38,11.5)],
 (W,H)=>back(W,H,'band'),{dir:'Professional'});

const rainbow=(cx,cy,r)=>[C(cx,cy,r,'#ef476f'),C(cx,cy,r-2.2,'#ff9f1c'),C(cx,cy,r-4.4,'#ffd166'),C(cx,cy,r-6.6,'#06d6a0'),C(cx,cy,r-8.8,'#118ab2'),C(cx,cy,r-11,'bg')];
add('pk-rainbow','preschool','Rainbow Kids','أطفال قوس قزح','Rainbow arch behind a cheerful circular portrait.',
 mk({bg:'#ffffff',a:'#ef476f',b:'#06d6a0',c:'#ffd166',tx:'#26324b',mu:'#6c7a93',on:'#ffffff'},[{a:'#845ec2',b:'#00c9a7',c:'#ffc75f'},{a:'#ff6f91',b:'#4b9cd3',c:'#f9f871'},{a:'#118ab2',b:'#ef476f',c:'#ffd166'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),...rainbow(W/2,33,25),R(0,33,W,H-33,'bg'),PH(W/2-11.5,21.5,23,23,'circ',{bw:.9,bs:'#ffffff'}),LG(3,3,7,7,{c:'a'}),
  T('org',3,50,W-6,4.6,{c:'mu',wt:600,al:'center',ml:1}),T('name',3,56,W-6,10,{f:'disp',wt:700,c:'tx',al:'center'}),T('role',3,61.8,W-6,5.2,{c:'a',wt:700,al:'center'}),T('unit',3,65.8,W-6,4.4,{c:'mu',al:'center'}),T('id',3,69.6,W-6,5,{f:'disp',wt:700,c:'tx',al:'center'}),cap(W,H)]
 :[R(0,0,W,H,'bg'),...rainbow(24,29,24),R(0,29,48,H-29,'bg'),PH(12.5,17.5,23,23,'circ',{bw:.9,bs:'#ffffff'}),T('org',3,46,42,4.6,{c:'mu',wt:600,al:'center',ml:1}),
  LG(54,4,9,9,{c:'a'}),T('org',64,8.6,W-68,4.6,{c:'mu',wt:600,ml:2,lh:1.1}),T('name',52,21,W-56,10,{f:'disp',wt:700,c:'tx'}),T('role',52,26.8,W-56,5.2,{c:'a',wt:700}),T('unit',52,31,W-56,4.4,{c:'mu'}),T('id',52,35.2,W-56,5,{f:'disp',wt:700,c:'tx'}),CA(50,39.5,W-54,12)],
 (W,H)=>back(W,H,'stripe',{f:'disp'}),{dir:'Rainbow'});

/* shared helpers: label+value pair and a row of pairs */
export const kv=(x,y,w,k,o={})=>[T('@'+k,x,y,w,3.6,{c:o.lc||'mu',up:1,ls:.5,wt:600,f:o.lf}),T(k,x,y+4,w,o.s||5.4,{wt:o.wt||700,c:o.c||'tx',f:o.f})];
export const row=(x,y,cols,o={})=>{let e=[];for(const [k,w] of cols){e=e.concat(kv(x,y,w-1.5,k,o));x+=w}return e};

/* ───────────────────────── Primary / Elementary ───────────────────────── */
defCat('primary',{le:'Primary / Elementary School',la:'المرحلة الابتدائية',group:'school',
 title:['Primary & Elementary School ID Cards','بطاقات هوية المرحلة الابتدائية'],desc:['Energetic, clear cards with room for grade, section and house identity.','بطاقات نشيطة وواضحة مع مساحة للصف والشعبة وهوية البيت.'],
 fields:fset(['name','id','role','sec','unit','org','dob','teacher','room','parent','pphone','bus','route','house','blood','addr','phone','terms'],{role:{le:'Grade',la:'الصف',req:1},sec:{le:'Section',la:'الشعبة',req:1}}),
 sample:{en:{name:'Omar Al-Farsi',id:'PRM-2026-1182',role:'Grade 4',sec:'B',unit:'2026 / 2027',org:'Riverside Primary School',house:'Falcon House',addr:'40 School Lane, Riverton',phone:'+1 555 0123',terms:'This card remains the property of the school.'},
  ar:{name:'عمر الفارسي',id:'PRM-2026-1182',role:'الصف الرابع',sec:'ب',unit:'2026 / 2027',org:'مدرسة الضفة الابتدائية',house:'بيت الصقر',addr:'40 شارع المدرسة، ريفرتون',phone:'555 0123 1+',terms:'تبقى هذه البطاقة ملكًا للمدرسة.'},
  custom:[{l:'Teacher',v:'Mr. Salim'},{l:'Bus',v:'Route 6'}]}});

const contour=(cx,cy,rs,col='b')=>rs.map(r=>C(cx,cy,r,undefined,{s:col,sw:.35,o:.8}));
add('pr-explorers','primary','Young Explorers','المستكشفون الصغار','Topographic lines and a trail-badge ID.',
 mk({bg:'#0f4c5c',a:'#fb8b24',b:'#1f7a8c',c:'#ffd166',tx:'#ffffff',mu:'#a8d5dc',on:'#0f3b47'},[{bg:'#2d3a1f',a:'#e9a23b',b:'#55702f',mu:'#c9d6a8',on:'#2d3a1f'},{bg:'#3b1f4d',a:'#ff7a59',b:'#6b3a85',mu:'#d6b9e8',on:'#3b1f4d'},{bg:'#12355b',a:'#ffb703',b:'#2a5d8f',mu:'#b6d1ee',on:'#12355b'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),...contour(W,H,[20,30,40,50]),LG(4,3,8,8,{c:'c'}),T('org',14,7,W-18,4.8,{c:'mu',wt:600,ml:2,lh:1.1}),PH(W/2-12,14,24,28,'round',{r:2.5,bw:.9,bs:'c'}),
  T('name',4,47.4,W-8,10,{f:'disp',wt:700,c:'tx',al:'center'}),...row(5,52.2,[['role',14],['sec',9],['unit',19]]),R(W/2-15,62.6,30,6,'a',{r:3}),T('id',W/2-14,65.6,28,4.8,{wt:700,c:'on',al:'center'}),cap(W,H)]
 :[R(0,0,W,H,'bg'),...contour(0,H,[16,26,36,46]),...contour(W,0,[14,24]),PH(7,8,26,30,'round',{r:2.5,bw:.9,bs:'c'}),R(7,41.5,26,6,'a',{r:3}),T('id',7,44.5,26,4.8,{wt:700,c:'on',al:'center'}),
  LG(40,5,8,8,{c:'c'}),T('org',50,9,W-54,4.8,{c:'mu',wt:600,ml:2,lh:1.1}),T('name',40,21.4,W-44,10.5,{f:'disp',wt:700,c:'tx'}),...row(40,26.4,[['role',14],['sec',9],['unit',W-44-27]]),CA(40,40,W-44,11.5)],
 (W,H)=>back(W,H,'band',{f:'disp'}),{dir:'Adventure'});

add('pr-academic','primary','Modern Academic','أكاديمي حديث','Bold angled colour block with a clean information grid.',
 mk({bg:'#ffffff',a:'#2457c5',b:'#eef3ff',c:'#ffb703',tx:'#13213f',mu:'#667392',on:'#ffffff'},[{a:'#0f766e',b:'#e6f6f3'},{a:'#7c3aed',b:'#f1ecfe',c:'#ffb703'},{a:'#c2410c',b:'#fdeee6',c:'#0f766e'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),PL([[0,0],[W,0],[W,24],[0,32]],'a'),PL([[0,32],[W,24],[W,27],[0,35]],'c'),LG(4,3,8,8,{c:'on'}),T('org',14,7,W-18,4.8,{c:'on',wt:700,ml:2,lh:1.1}),
  PH(W/2-12,17,24,28,'round',{r:2,bw:.8,bs:'#ffffff'}),T('name',4,51.2,W-8,10,{wt:700,c:'tx',al:'center'}),...row(5,56,[['role',14],['sec',9],['unit',19]]),T('id',4,67.4,W-8,5,{f:'disp',wt:700,c:'a',al:'center'}),cap(W,H)]
 :[R(0,0,W,H,'bg'),PL([[0,0],[40,0],[30,H],[0,H]],'a'),PL([[40,0],[43,0],[33,H],[30,H]],'c'),PH(6,8,26,32,'round',{r:2,bw:.8,bs:'#ffffff'}),T('id',3,45.6,31,5,{wt:700,c:'on',al:'center'}),
  LG(46,5,8,8,{c:'a'}),T('org',56,9,W-60,4.8,{c:'mu',wt:600,ml:2,lh:1.1}),T('name',46,21,W-50,10.5,{wt:700,c:'tx'}),LN(46,25.4,W-6,25.4,'c',.8),...row(46,28.2,[['role',16],['sec',9],['unit',W-50-25]]),CA(46,40,W-50,11.5)],
 (W,H)=>back(W,H,'band'),{dir:'Modern'});

add('pr-houses','primary','School Houses','بيوت المدرسة','House colour leads the design; the house name is printed on the front.',
 mk({bg:'#ffffff',a:'#d62828',b:'#fdecec',c:'#111827',tx:'#111827',mu:'#6b7280',on:'#ffffff'},[{a:'#1d4ed8',b:'#e8effd'},{a:'#15803d',b:'#e7f5ec'},{a:'#ca8a04',b:'#fdf5dc',on:'#1f1500'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),R(0,0,W,22,'a'),LG(4,3,9,9,{c:'on'}),T('org',15,7.5,W-19,4.8,{c:'on',wt:700,ml:2,lh:1.1}),T('house',4,17.4,W-8,6.4,{f:'disp',wt:700,c:'on',up:1,ls:.6}),
  PH(W/2-12,20,24,28,'round',{r:2,bw:.8,bs:'#ffffff'}),T('name',4,53.2,W-8,10,{wt:700,c:'tx',al:'center'}),...row(5,57.6,[['role',14],['sec',9],['unit',19]]),T('id',4,68.4,W-8,5,{f:'disp',wt:700,c:'a',al:'center'}),cap(W,H)]
 :[R(0,0,W,H,'bg'),R(0,40,W,14,'a'),PH(6,6,26,30,'round',{r:2}),T('id',6,38.4,26,4.4,{f:'disp',wt:700,c:'tx',al:'center'}),
  LG(38,5,8,8,{c:'a'}),T('org',48,9,W-52,4.8,{c:'mu',wt:600,ml:2,lh:1.1}),T('name',38,21.4,W-42,10.5,{wt:700,c:'tx'}),...row(38,26.6,[['role',14],['sec',9],['unit',W-42-27]]),
  T('house',6,47,W-46,6.2,{f:'disp',wt:700,c:'on',up:1,ls:.5}),CA(W-38,41.2,34,11.6)],
 (W,H)=>back(W,H,'foot'),{dir:'House identity',front:['house']});

const leaf=(x,y,k,f,o)=>PL([[x,y],[x+3*k,y-4*k],[x+8*k,y-5*k],[x+10*k,y],[x+8*k,y+5*k],[x+3*k,y+4*k]],f,o);
add('pr-nature','primary','Nature & Science','الطبيعة والعلوم','Leaves, molecules and a circular portrait.',
 mk({bg:'#f3f9ee',a:'#2f7d4a',b:'#d6ebcd',c:'#f2b134',tx:'#1c3a28',mu:'#5f7d69',on:'#ffffff'},[{a:'#0f766e',b:'#d3efeb'},{a:'#6a8d1f',b:'#e4efc7',c:'#d9480f'},{a:'#1d6fa5',b:'#d4e8f5',c:'#f2b134'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),R(0,0,W,24,'a'),leaf(W-16,6,1.3,'b',{o:.5}),leaf(W-9,16,1,'c',{o:.8}),C(W-6,4,2,'c'),C(W-12,10,1.4,'b'),LN(W-6,4,W-12,10,'b',.4),LG(4,3,8,8,{c:'on'}),T('org',14,7,W-30,4.8,{c:'on',wt:700,ml:2,lh:1.1}),
  PH(W/2-12,13,24,24,'circ',{bw:1,bs:'#ffffff'}),T('name',4,43.4,W-8,10,{f:'disp',wt:700,c:'tx',al:'center'}),...row(5,48.6,[['role',14],['sec',9],['unit',19]]),R(W/2-15,60.6,30,6,'a',{r:3}),T('id',W/2-14,63.6,28,4.8,{wt:700,c:'on',al:'center'}),cap(W,H)]
 :[R(0,0,W,H,'bg'),R(0,0,36,H,'b'),leaf(2,50,1.4,'a',{o:.35}),leaf(22,47,1.1,'a',{o:.5}),leaf(26,8,1,'a',{o:.35}),PH(6,8,26,26,'circ',{bw:1,bs:'a'}),R(6,38.5,26,6,'a',{r:3}),T('id',6,41.5,26,4.8,{wt:700,c:'on',al:'center'}),
  C(W-8,8,2.2,'c'),C(W-16,13,1.6,'a'),C(W-9,18,1.6,'a'),LN(W-8,8,W-16,13,'a',.35),LN(W-8,8,W-9,18,'a',.35),
  LG(41,5,8,8,{c:'a'}),T('org',51,9,W-70,4.8,{c:'mu',wt:600,ml:2,lh:1.1}),T('name',41,21.4,W-45,10.5,{f:'disp',wt:700,c:'tx'}),...row(41,26.6,[['role',14],['sec',9],['unit',W-45-27]]),CA(41,40,W-45,11.5)],
 (W,H)=>back(W,H,'stripe'),{dir:'Nature'});

add('pr-sports','primary','Sports Kids','أطفال رياضيون','Speed stripes and a bold, uppercase name.',
 mk({bg:'#0b132b',a:'#ff4d00',b:'#1c2541',c:'#ffffff',tx:'#ffffff',mu:'#9fb0d1',on:'#0b132b'},[{a:'#00c2a8',bg:'#0a1f2e',b:'#123145'},{a:'#ffd100',bg:'#111111',b:'#222222',on:'#111111'},{a:'#e63946',bg:'#14213d',b:'#1f3158'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),PL([[0,0],[W,0],[W,20],[0,34]],'a'),PL([[0,34],[W,20],[W,23],[0,37]],'c'),LG(4,3,8,8,{c:'on'}),T('org',14,7,W-18,4.8,{c:'on',wt:700,ml:2,lh:1.1}),
  PH(W/2-12,15,24,28,'round',{r:2,bw:.8,bs:'c'}),T('name',4,49.2,W-8,10.5,{f:'disp',wt:800,c:'tx',al:'center',up:1}),...row(5,54.4,[['role',14],['sec',9],['unit',19]]),T('id',4,66.6,W-8,5.4,{f:'disp',wt:800,c:'a',al:'center',ls:1}),cap(W,H)]
 :[R(0,0,W,H,'bg'),PL([[0,0],[30,0],[18,54],[0,54]],'a'),PL([[30,0],[34,0],[22,54],[18,54]],'c'),PH(7,8,26,32,'round',{r:2,bw:.8,bs:'c'}),R(6,44.4,28,6.4,'bg',{r:3.2}),T('id',6,47.6,28,4.8,{f:'disp',wt:800,c:'a',al:'center',ls:.6}),
  LG(42,5,8,8,{c:'a'}),T('org',52,9,W-56,4.8,{c:'mu',wt:600,ml:2,lh:1.1}),T('name',42,21.4,W-46,11,{f:'disp',wt:800,c:'tx',up:1}),...row(42,26.6,[['role',14],['sec',9],['unit',W-46-27]]),CA(42,40,W-46,11.5)],
 (W,H)=>back(W,H,'band',{f:'disp'}),{dir:'Sport'});

const MOS=['#ff595e','#ffca3a','#8ac926','#1982c4','#6a4c93'];
add('pr-creative','primary','Creative Colors','ألوان إبداعية','Playful colour tiles with an offset portrait.',
 mk({bg:'#ffffff',a:'#1982c4',b:'#fff4cc',c:'#ffca3a',tx:'#1d1b3a',mu:'#6b6890',on:'#ffffff'},[{a:'#ff595e',b:'#ffe3e4'},{a:'#6a4c93',b:'#ece6f4'},{a:'#2a9d6f',b:'#e0f3ea'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),...MOS.map((c,i)=>R(i*W/5,0,W/5+.2,6,c)),LG(4,9,8,8,{c:'a'}),T('org',14,13,W-18,4.8,{c:'mu',wt:600,ml:2,lh:1.1}),R(W/2-10,22,24,28,'c',{r:2}),PH(W/2-14,19,24,28,'round',{r:2,bw:.7,bs:'tx'}),
  T('name',4,54,W-8,10,{f:'disp',wt:700,c:'tx',al:'center'}),...row(5,58.4,[['role',14],['sec',9],['unit',19]]),T('id',4,69.2,W-8,5,{f:'disp',wt:700,c:'a',al:'center'}),cap(W,H)]
 :[R(0,0,W,H,'bg'),...MOS.map((c,i)=>R(0,i*H/5,5,H/5+.2,c)),R(13,12,26,32,'c',{r:2}),PH(9,8,26,32,'round',{r:2,bw:.7,bs:'tx'}),T('id',8,47.4,30,4.8,{f:'disp',wt:700,c:'a',al:'center'}),
  LG(44,5,8,8,{c:'a'}),T('org',54,9,W-58,4.8,{c:'mu',wt:600,ml:2,lh:1.1}),T('name',44,21.4,W-48,10.5,{f:'disp',wt:700,c:'tx'}),...row(44,26.6,[['role',14],['sec',9],['unit',W-48-27]]),CA(44,40,W-48,11.5)],
 (W,H)=>back(W,H,'minimal',{f:'disp'}),{dir:'Creative'});

/* ───────────────────────── Secondary / High school ───────────────────────── */
defCat('secondary',{le:'Secondary / High School',la:'المرحلة الثانوية',group:'school',
 title:['Secondary & High School ID Cards','بطاقات هوية المرحلة الثانوية'],desc:['Mature, professional cards with strong typography and academic details.','بطاقات ناضجة واحترافية بخطوط قوية وتفاصيل أكاديمية.'],
 fields:fset(['name','id','role','sec','unit','org','dob','issue','expiry','adm','stream','advisor','parent','pphone','bus','route','house','email','blood','addr','phone','terms'],{role:{le:'Grade / Year',la:'الصف / السنة',req:1},sec:{le:'Section',la:'الشعبة',req:1}}),
 sample:{en:{name:'Amira Khalid',id:'SEC-2026-0417',role:'Grade 10',sec:'B',unit:'2026 / 2027',org:'Northfield International School',addr:'12 Cedar Avenue, Riverton',phone:'+1 555 0142',terms:'This card is the property of the school and must be carried on campus.'},
  ar:{name:'أميرة خالد',id:'SEC-2026-0417',role:'الصف العاشر',sec:'ب',unit:'2026 / 2027',org:'مدرسة نورثفيلد الدولية',addr:'12 شارع الأرز، ريفرتون',phone:'555 0142 1+',terms:'هذه البطاقة ملك للمدرسة ويجب حملها داخل الحرم المدرسي.'},
  custom:[{l:'Advisor',v:'Dr. Hana'},{l:'Stream',v:'Science'}]}});

add('sc-academic','secondary','Modern Academic','أكاديمي حديث','Full-height portrait with a structured information grid.',
 mk({bg:'#ffffff',a:'#14305f',b:'#e9eef8',c:'#c9a227',tx:'#14213d',mu:'#64718c',on:'#ffffff'},[{a:'#7f1d1d',b:'#f7e9e9',c:'#c9a227'},{a:'#0f4c5c',b:'#e3f0f3',c:'#e09f3e'},{a:'#2d2a6e',b:'#ecebf8',c:'#f2a541'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),PH(0,0,W,38,'rect'),R(0,38,W,7.5,'a'),LG(3,39,6,6,{c:'c'}),T('org',11,41.8,W-14,4.4,{c:'on',wt:700,ml:1}),
  T('name',4,50.6,W-8,9.5,{wt:700,c:'tx'}),...row(4,54.6,[['role',14],['sec',9],['unit',19]]),T('@id',4,64.6,W-8,3.6,{c:'mu',up:1,ls:.5,wt:600}),T('id',4,68.4,W-8,4.8,{f:'disp',wt:700,c:'a'}),CA(4,H-14.6,W-8,11)]
 :[R(0,0,W,H,'bg'),PH(0,0,28,H,'rect'),R(28,0,1.2,H,'c'),LG(34,5,7,7,{c:'a'}),T('org',43,8.6,W-47,4.6,{c:'mu',wt:700,ml:2,lh:1.1,up:1}),T('name',34,18.8,W-38,10.5,{wt:700,c:'tx'}),LN(34,23,W-5,23,'c',.5),
  ...row(34,24.6,[['role',16],['sec',9],['unit',W-38-25]]),...row(34,31.8,[['id',W-38]]),CA(34,40,W-38,11.5)],
 (W,H)=>back(W,H,'band'),{dir:'Modern academic'});

add('sc-dark','secondary','Premium Dark','داكن فاخر','Black and gold with a serif name and a ringed portrait.',
 mk({bg:'#0c0c10',a:'#d4af37',b:'#17171d',c:'#f1d98a',tx:'#f4f1e8',mu:'#a59f8c',on:'#0c0c10'},[{a:'#c0c7d1',c:'#eef1f6'},{a:'#c98a5e',c:'#f0c9a8'},{a:'#7fd1c1',c:'#c6f0e6'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),R(2.5,2.5,W-5,H-5,'bg',{r:3,s:'a',sw:.3}),LG(W/2-4,6,8,8,{c:'a'}),T('org',6,17.4,W-12,4.4,{f:'serif',wt:600,c:'a',al:'center',up:1,ls:.6,ml:1}),
  PH(W/2-12,21,24,24,'circ',{bw:.7,bs:'a'}),T('name',5,51,W-10,9.5,{f:'serif',wt:700,c:'tx',al:'center'}),...row(6,55.6,[['role',17],['sec',9],['unit',19]],{c:'tx'}),T('id',5,67,W-10,5,{f:'serif',wt:600,c:'a',al:'center',ls:1}),cap(W,H,W-8,10.5)]
 :[R(0,0,W,H,'bg'),R(2.5,2.5,W-5,H-5,'bg',{r:3,s:'a',sw:.3}),C(24,27,19,undefined,{s:'a',sw:.3,o:.6}),PH(9,12,30,30,'circ',{bw:.7,bs:'a'}),
  LG(47,6.5,7,7,{c:'a'}),T('org',56,10,W-60,4.2,{f:'serif',wt:600,c:'a',up:1,ls:.5,ml:2,lh:1.1}),T('name',47,20.6,W-51,10.5,{f:'serif',wt:700,c:'tx'}),LN(47,25,W-6,25,'a',.3),
  ...row(47,26.6,[['role',17],['sec',9],['unit',W-51-26]]),T('@id',47,34.4,20,3.4,{c:'mu',up:1,ls:.5,wt:600}),T('id',47,38,W-51,4.6,{f:'serif',wt:600,c:'a',ls:.8}),CA(47,41.2,W-51,10.2)],
 (W,H)=>back(W,H,'band',{f:'serif'}),{dir:'Premium'});

add('sc-tech','secondary','Technology','تقنية','Dark UI look with corner brackets and circuit lines.',
 mk({bg:'#0d1b2a',a:'#00e5ff',b:'#1b2b3f',c:'#7cf5c6',tx:'#e6f1ff',mu:'#7f94b0',on:'#031018'},[{a:'#a78bfa',c:'#f0abfc'},{a:'#34d399',c:'#a7f3d0'},{a:'#fb923c',c:'#fde68a'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),DT(W-22,4,18,12,'b'),LG(4,4,8,8,{c:'a'}),T('org',14,8,W-34,4.2,{f:'disp',wt:700,c:'a',up:1,ls:.5,ml:2,lh:1.1}),
  PH(W/2-12,19,24,28,'rect'),LN(W/2-14,17,W/2-8,17,'a',.6),LN(W/2-14,17,W/2-14,23,'a',.6),LN(W/2+14,49,W/2+8,49,'a',.6),LN(W/2+14,49,W/2+14,43,'a',.6),
  T('name',4,54.4,W-8,9.5,{f:'disp',wt:700,c:'tx',al:'center'}),...row(5,58.4,[['role',14],['sec',9],['unit',19]],{lf:'disp',f:'disp'}),R(W/2-15,68.6,30,0.01,'b'),T('id',4,68.2,W-8,4.6,{f:'disp',wt:700,c:'c',al:'center',ls:1.2}),cap(W,H,W-8,10.5)]
 :[R(0,0,W,H,'bg'),DT(52,4,28,14,'b'),LN(41,23,W-6,23,'a',.3),C(41,23,.9,'a'),C(W-6,23,.9,'a'),PH(8,9,27,33,'rect'),
  LN(6,7,12,7,'a',.6),LN(6,7,6,13,'a',.6),LN(37,44,31,44,'a',.6),LN(37,44,37,38,'a',.6),R(8,46,27,4.8,'b',{r:1}),T('id',8,48.4,27,4,{f:'disp',wt:700,c:'c',al:'center',ls:.8}),
  LG(41,5,7,7,{c:'a'}),T('org',50,8.6,W-54,4.2,{f:'disp',wt:700,c:'a',up:1,ls:.5,ml:2,lh:1.1}),T('name',41,18.2,W-45,10.5,{f:'disp',wt:700,c:'tx'}),...row(41,26,[['role',14],['sec',9],['unit',W-45-27]],{lf:'disp',f:'disp'}),CA(41,40,W-45,11.5)],
 (W,H)=>back(W,H,'stripe',{f:'disp'}),{dir:'Technology'});

add('sc-spirit','secondary','School Spirit','روح المدرسة','School-colour chevrons and a banner stripe.',
 mk({bg:'#ffffff',a:'#c8102e',b:'#fdeaed',c:'#ffd100',tx:'#111827',mu:'#6b7280',on:'#ffffff'},[{a:'#1d4ed8',b:'#e8effd',c:'#ffd100'},{a:'#15803d',b:'#e7f5ec',c:'#ffffff'},{a:'#6d28d9',b:'#efe8fb',c:'#fbbf24'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),PL([[0,0],[W,0],[W,22],[W/2,30],[0,22]],'a'),PL([[0,22],[W/2,30],[W,22],[W,25],[W/2,33],[0,25]],'c'),LG(4,3,8,8,{c:'on'}),T('org',14,7,W-18,4.8,{c:'on',wt:800,ml:2,lh:1.1,up:1}),
  PH(W/2-12,15,24,28,'round',{r:1.5,bw:.8,bs:'#ffffff'}),T('name',4,49.6,W-8,10,{f:'disp',wt:800,c:'tx',al:'center',up:1}),...row(5,54.4,[['role',14],['sec',9],['unit',19]]),T('id',4,66.4,W-8,5,{f:'disp',wt:800,c:'a',al:'center',ls:.8}),cap(W,H)]
 :[R(0,0,W,H,'bg'),PL([[0,0],[16,0],[26,27],[16,54],[0,54]],'a'),PL([[16,0],[21,0],[31,27],[21,54],[16,54]],'c'),PL([[21,0],[23,0],[33,27],[23,54],[21,54]],'tx'),PH(6,8,26,32,'round',{r:1.5,bw:.8,bs:'#ffffff'}),
  LG(40,5,8,8,{c:'a'}),T('org',50,9,W-54,4.8,{c:'mu',wt:700,ml:2,lh:1.1,up:1}),T('name',40,21.2,W-44,11,{f:'disp',wt:800,c:'tx',up:1}),...row(40,26.2,[['role',14],['sec',9],['unit',W-44-27]]),R(5,44.4,28,6.4,'bg',{r:3.2}),T('id',5,47.6,28,4.8,{f:'disp',wt:800,c:'a',al:'center'}),CA(40,40,W-44,11.5)],
 (W,H)=>back(W,H,'band',{f:'disp'}),{dir:'Spirit'});

add('sc-minimal','secondary','Minimal Professional','احترافي بسيط','Hairlines, quiet colour and precise typography.',
 mk({bg:'#ffffff',a:'#111827',b:'#e5e7eb',c:'#2563eb',tx:'#111827',mu:'#6b7280',on:'#ffffff'},[{c:'#059669'},{c:'#dc2626'},{c:'#7c3aed'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),R(5,6,3,3,'c'),T('org',11,7.6,W-16,4.2,{c:'tx',wt:700,up:1,ls:.7}),LN(5,13,W-5,13,'b',.3),PH(5,17,W-10,28,'rect'),
  T('name',5,50.6,W-10,9.6,{wt:600,c:'tx'}),...row(5,54.8,[['role',14],['sec',9],['unit',19]]),LN(5,66,W-5,66,'b',.3),T('id',5,69.4,W-10,4,{wt:600,c:'mu',ls:.6}),CA(5,H-13.4,W-10,10.5)]
 :[R(0,0,W,H,'bg'),PH(7,8,24,30,'rect'),R(37,8,3,3,'c'),T('org',43,9.6,W-48,4.2,{c:'tx',wt:700,up:1,ls:.7}),T('name',37,20.8,W-42,11,{wt:600,c:'tx'}),LN(37,25.6,W-7,25.6,'b',.3),
  ...row(37,27.4,[['role',14],['sec',9],['unit',W-44-27]]),T('id',7,41.6,24,4.4,{wt:700,c:'c',ls:.5}),LN(7,39.6,W-7,39.6,'b',.3),CA(37,40.5,W-44,11)],
 (W,H)=>back(W,H,'minimal'),{dir:'Minimal'});

add('sc-creative','secondary','Creative Generation','جيل مبدع','Overlapping shapes and a sticker-style portrait.',
 mk({bg:'#1a1033',a:'#ff3d81',b:'#7a5cff',c:'#00e0c6',tx:'#ffffff',mu:'#b9aee0',on:'#ffffff'},[{a:'#ffb703',b:'#fb5607',c:'#8338ec'},{a:'#06d6a0',b:'#118ab2',c:'#ffd166'},{a:'#f72585',b:'#4361ee',c:'#4cc9f0'}]),
 (P,W,H)=>P?[R(0,0,W,H,'bg'),C(8,4,18,'b',{o:.85}),C(W-4,12,15,'a',{o:.85}),C(W-14,28,5,'c',{o:.9}),C(0,H,24,'b',{o:.5}),LG(4,3,8,8,{c:'on'}),T('org',14,7,W-30,4.4,{c:'on',wt:700,ml:2,lh:1.1}),
  C(W/2+1.5,32.5,16,'c'),PH(W/2-13,19,26,26,'circ',{bw:1.1,bs:'#ffffff'}),T('name',4,53.4,W-8,10,{f:'disp',wt:700,c:'tx',al:'center'}),...row(5,57.8,[['role',14],['sec',9],['unit',19]],{lc:'mu'}),T('id',4,68.6,W-8,4.8,{f:'disp',wt:700,c:'c',al:'center',ls:.8}),cap(W,H,W-8,10.5)]
 :[R(0,0,W,H,'bg'),C(2,54,24,'b',{o:.8}),C(22,60,18,'a',{o:.8}),C(W-6,0,24,'b',{o:.7}),C(W,16,9,'a',{o:.85}),C(23,24,17,'c'),PH(8,9,28,28,'circ',{bw:1.1,bs:'#ffffff'}),
  R(6,41.6,32,6.4,'b',{r:3.2}),T('id',6,44.8,32,4.8,{f:'disp',wt:700,c:'tx',al:'center',ls:.6}),LG(44,5,7,7,{c:'on'}),T('org',53,8.6,W-70,4.4,{c:'mu',wt:600,ml:2,lh:1.1}),T('name',44,20.2,W-48,11,{f:'disp',wt:700,c:'tx'}),...row(44,25.6,[['role',14],['sec',9],['unit',W-48-27]]),CA(44,40,W-48,11.5)],
 (W,H)=>back(W,H,'foot',{f:'disp'}),{dir:'Creative'});
