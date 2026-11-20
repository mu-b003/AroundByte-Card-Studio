import {R,C,PL,LN,DT,T,PH,LG,Q,B,CU,back} from './dsl.js';
const mk=(base,alts)=>[{id:'p0',c:base},...alts.map((a,i)=>({id:'p'+(i+1),c:{...base,...a}}))];
const LA=[{a:'#14532d',b:'#e7f4ec',c:'#d4a017'},{a:'#7f1d1d',b:'#f8e9e9',c:'#c08a2c'},{a:'#0f4c5c',b:'#e5f1f4',c:'#e36414'}];
const DA=[{a:'#f59e0b',c:'#fbbf24',on:'#111111'},{a:'#ec4899',c:'#f472b6',on:'#ffffff'},{a:'#22d3ee',c:'#67e8f9',on:'#04111f'}];
const FLD=(role,unit)=>[
 {k:'name',req:1,le:'Full name',la:'الاسم الكامل'},{k:'id',req:1,le:'ID number',la:'رقم الهوية'},
 {k:'role',req:1,le:role[0],la:role[1]},{k:'unit',le:unit[0],la:unit[1]},{k:'org',req:1,le:'Institution name',la:'اسم الجهة'},
 {k:'addr',side:'back',le:'Address',la:'العنوان'},{k:'phone',side:'back',le:'Phone',la:'الهاتف'},
 {k:'terms',side:'back',long:1,le:'Terms of use',la:'شروط الاستخدام'},{k:'qr',side:'back',le:'QR code content (defaults to ID)',la:'محتوى رمز QR (الافتراضي: الرقم)'}];
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
const add=(id,cat,le,la,desc,palettes,build,backFn)=>T_.push({id,cat,name:{en:le,ar:la},desc,palettes,fields:CATS[cat].fields,sides:[1,2],orients:['landscape','portrait'],
  layout:(o,W,H)=>({front:build(o==='portrait',W,H),back:backFn(W,H)})});
export const byId=id=>T_.find(t=>t.id===id);
export {add,mk,LA,DA,R,C,PL,LN,DT,T,PH,LG,Q,B,CU,back};
