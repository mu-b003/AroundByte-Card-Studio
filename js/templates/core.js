import {R,C,PL,LN,DT,T,PH,LG,Q,B,CU,CA,AC,back} from './dsl.js';
const mk=(base,alts)=>[{id:'p0',c:base},...alts.map((a,i)=>({id:'p'+(i+1),c:{...base,...a}}))];
const LA=[{a:'#14532d',b:'#e7f4ec',c:'#d4a017'},{a:'#7f1d1d',b:'#f8e9e9',c:'#c08a2c'},{a:'#0f4c5c',b:'#e5f1f4',c:'#e36414'}];
const DA=[{a:'#f59e0b',c:'#fbbf24',on:'#111111'},{a:'#ec4899',c:'#f472b6',on:'#ffffff'},{a:'#22d3ee',c:'#67e8f9',on:'#04111f'}];
const FLD=(role,unit)=>[
 {k:'name',req:1,le:'Full name',la:'الاسم الكامل'},{k:'id',req:1,le:'ID number',la:'رقم الهوية'},
 {k:'role',req:1,le:role[0],la:role[1]},{k:'unit',le:unit[0],la:unit[1]},{k:'org',req:1,le:'Institution name',la:'اسم الجهة'},
 {k:'addr',side:'back',le:'Address',la:'العنوان'},{k:'phone',side:'back',le:'Phone',la:'الهاتف'},
 {k:'terms',side:'back',long:1,le:'Terms of use',la:'شروط الاستخدام'}];
export const CATS={
 student:{le:'Student Cards',la:'بطاقات الطلاب',fields:FLD(['Class / Grade','الصف'],['Academic year','العام الدراسي']),
  sample:{en:{name:'Amira Khalid',id:'STU-2026-0417',role:'Grade 10 · Section B',unit:'2026 / 2027',org:'Northfield International School',addr:'12 Cedar Avenue, Riverton',phone:'+1 555 0142',terms:'This card is the property of the school. If found, please return it to the address above.'},
   ar:{name:'أميرة خالد',id:'STU-2026-0417',role:'الصف العاشر · شعبة ب',unit:'2026 / 2027',org:'مدرسة الأفق الدولية',addr:'شارع الأرز 12، ريفرتون',phone:'555 0142 1+',terms:'هذه البطاقة ملك للمدرسة. في حال العثور عليها يرجى إعادتها إلى العنوان أعلاه.'},
   custom:[{l:'Blood type',v:'O+'},{l:'Transport',v:'Bus 7'}]}},
 employee:{le:'Employee Cards',la:'بطاقات الموظفين',fields:FLD(['Position','المنصب'],['Department','القسم']),
  sample:{en:{name:'Daniel Mercer',id:'EMP-004821',role:'Senior Product Designer',unit:'Design & Research',org:'Meridian Systems Ltd.',addr:'400 Harbor Street, Westport',phone:'+1 555 0188',terms:'Property of the company. Must be worn visibly on premises. Report loss immediately.'},
   ar:{name:'سامر العلي',id:'EMP-004821',role:'مصمم منتجات أول',unit:'التصميم والأبحاث',org:'شركة ميريديان للأنظمة',addr:'400 شارع الميناء، ويستبورت',phone:'555 0188 1+',terms:'ملك للشركة. يجب إبرازها داخل مقر العمل. أبلغ فورًا عند فقدانها.'},
   custom:[{l:'Access level',v:'B2'},{l:'Joined',v:'2021'}]}},
 institutional:{le:'Institutional Cards',la:'بطاقات المؤسسات',fields:FLD(['Title / Role','الصفة'],['Valid until','صالحة حتى']),
  sample:{en:{name:'Helen Ward',id:'INS-100245',role:'Faculty Member',unit:'31 Dec 2027',org:'Westbridge University',addr:'1 University Square, Westbridge',phone:'+1 555 0120',terms:'Official identification of Westbridge University. Not transferable. Valid only with this institution.'},
   ar:{name:'هالة منصور',id:'INS-100245',role:'عضو هيئة التدريس',unit:'31 ديسمبر 2027',org:'جامعة الجسر الغربي',addr:'1 ساحة الجامعة، الجسر الغربي',phone:'555 0120 1+',terms:'هوية رسمية صادرة عن الجامعة. غير قابلة للتحويل وصالحة داخل المؤسسة فقط.'},
   custom:[{l:'Department',v:'Physics'},{l:'Office',v:'B-214'}]}}};
const T_=[];export const TEMPLATES=T_;
/* add(id,cat,en,ar,desc,palettes,build,backFn,opt) — opt: {dir:'design direction tag', front:['key'…] promotes optional fields to the front for this template} */
const add=(id,cat,le,la,desc,palettes,build,backFn,opt={})=>T_.push({id,cat,name:{en:le,ar:la},desc,dir:opt.dir||'',palettes,
  fields:CATS[cat].fields.map(f=>opt.front&&opt.front.includes(f.k)?{...f,side:'front',opt:1}:f),sides:[1,2],orients:['landscape','portrait'],
  layout:(o,W,H)=>({front:build(o==='portrait',W,H),back:backFn(W,H)})});
export const byId=id=>T_.find(t=>t.id===id);

/* ---- collection registry: groups -> categories (stages) -> templates ---- */
export const CAT_ORDER=['preschool','primary','secondary','student','university','institutional','employee'];
export const GROUPS=[
 {id:'school',le:'School Cards',la:'بطاقات المدارس',de:'Preschool, primary and secondary school identification.',da:'بطاقات هوية لمرحلة ما قبل المدرسة والابتدائية والثانوية.'},
 {id:'higher',le:'College, University & Institutions',la:'الكليات والجامعات والمؤسسات',de:'Higher-education and institutional identity cards.',da:'بطاقات هوية للتعليم العالي والمؤسسات.'},
 {id:'work',le:'Employee & Staff',la:'الموظفون والعاملون',de:'Corporate and organisational staff identification.',da:'بطاقات تعريف للموظفين والعاملين.'}];
/* Field registry. side: undefined = front, 'extra' = optional detail (printed in the back details block), 'back'. sens = personal data: stays empty unless the user types it. */
export const FR={
 name:{le:'Full name',la:'الاسم الكامل',req:1},id:{le:'ID number',la:'رقم الهوية',req:1},org:{le:'Institution name',la:'اسم الجهة',req:1},
 role:{le:'Class / Level',la:'الصف / المستوى'},unit:{le:'Academic year',la:'العام الدراسي'},sec:{le:'Section',la:'الشعبة'},major:{le:'Major / Program',la:'التخصص / البرنامج'},
 teacher:{le:'Class teacher',la:'معلم الصف',side:'extra'},parent:{le:'Parent / Guardian',la:'ولي الأمر',side:'extra',sens:1},pphone:{le:'Parent contact',la:'هاتف ولي الأمر',side:'extra',sens:1},
 dob:{le:'Date of birth',la:'تاريخ الميلاد',side:'extra',sens:1},room:{le:'Classroom',la:'الفصل',side:'extra'},route:{le:'Bus route',la:'خط الحافلة',side:'extra'},bus:{le:'Bus number',la:'رقم الحافلة',side:'extra'},
 house:{le:'House / Team',la:'البيت / الفريق',side:'extra'},blood:{le:'Blood group (not medical verification)',la:'فصيلة الدم (ليست توثيقًا طبيًا)',side:'extra',sens:1},
 issue:{le:'Issue date',la:'تاريخ الإصدار',side:'extra'},expiry:{le:'Expiry date',la:'تاريخ الانتهاء',side:'extra'},adm:{le:'Admission number',la:'رقم القبول',side:'extra'},
 stream:{le:'Academic stream',la:'المسار الأكاديمي',side:'extra'},advisor:{le:'Class advisor',la:'المرشد الصفي',side:'extra'},email:{le:'School email',la:'البريد المدرسي',side:'extra'},
 dept:{le:'Department',la:'القسم',side:'extra'},degree:{le:'Degree',la:'الدرجة العلمية',side:'extra'},level:{le:'Study level',la:'المستوى الدراسي',side:'extra'},sem:{le:'Semester',la:'الفصل الدراسي',side:'extra'},
 reg:{le:'Registration number',la:'رقم التسجيل',side:'extra'},exam:{le:'Examination number',la:'رقم الامتحان',side:'extra'},campus:{le:'Campus',la:'الحرم الجامعي',side:'extra'},
 status:{le:'Student status',la:'الحالة الدراسية',side:'extra'},web:{le:'Website',la:'الموقع الإلكتروني',side:'extra'},icode:{le:'Institution code',la:'رمز المؤسسة',side:'extra'},
 addr:{le:'Address',la:'العنوان',side:'back'},phone:{le:'Phone',la:'الهاتف',side:'back'},terms:{le:'Terms of use',la:'شروط الاستخدام',side:'back',long:1}};
export const fset=(keys,over={})=>keys.map(k=>({k,...FR[k],...(over[k]||{})}));
/* defCat registers a stage/category: its field list, bilingual sample data and where it sits in navigation. */
export const defCat=(id,o)=>{CATS[id]={le:o.le,la:o.la,title:o.title,desc:o.desc,group:o.group,fields:o.fields,sample:o.sample};return CATS[id]};
Object.assign(CATS.student,{group:'school',le:'General Student Cards',la:'بطاقات الطلاب العامة',title:['General Student ID Cards','بطاقات هوية الطلاب العامة'],desc:['Versatile student cards for any school or college.','بطاقات طلاب متعددة الاستخدامات لأي مدرسة أو كلية.']});
Object.assign(CATS.employee,{group:'work',title:['Employee ID Cards','بطاقات هوية الموظفين'],desc:['Corporate and organisational staff cards.','بطاقات للموظفين في الشركات والمؤسسات.']});
Object.assign(CATS.institutional,{group:'higher',title:['Institutional ID Cards','بطاقات هوية المؤسسات'],desc:['University, school, training and government identity cards.','بطاقات هوية للجامعات والمدارس ومعاهد التدريب والجهات الحكومية.']});
export {add,mk,LA,DA,R,C,PL,LN,DT,T,PH,LG,Q,B,CU,CA,AC,back};
