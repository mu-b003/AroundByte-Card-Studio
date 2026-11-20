import P from './pages-data.js';
const slug=location.pathname.split('/').pop().replace('.html','');
const $=s=>document.querySelector(s);
const lang=()=>localStorage.getItem('abcs-lang')==='ar'?'ar':'en';
const nav={en:{home:'Home',about:'About',pdf:'AroundByte PDF',privacy:'Privacy Policy',terms:'Terms of Use',disclaimer:'Disclaimer',contact:'Contact'},ar:{home:'الرئيسية',about:'من نحن',pdf:'AroundByte PDF',privacy:'سياسة الخصوصية',terms:'شروط الاستخدام',disclaimer:'إخلاء المسؤولية',contact:'التواصل'}};
function render(){
 const l=lang(),d=(P[slug]||P.about)[l];
 document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';
 $('#pageTitle').textContent=d[0];$('#pageDesc').textContent=d[1];
 document.title=d[0]+' | AroundByte Card Studio';
 const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=d[1];
 const content=$('#content');content.replaceChildren();
 const lead=document.createElement('p');lead.className='lead';lead.textContent=d[2];content.append(lead);
 for(const [heading,body] of d[3]){
  const h=document.createElement('h2');h.textContent=heading;content.append(h);
  const p=document.createElement('p');
  if(slug==='contact'){
   const a=document.createElement('a');a.className='contact-email';a.href='mailto:mubarakdigitals26@gmail.com';a.textContent='mubarakdigitals26@gmail.com';p.append(a);
  }else p.textContent=body;
  content.append(p);
 }
 $('#lang').textContent=l==='ar'?'English':'العربية';
 document.querySelectorAll('[data-i]').forEach(a=>a.textContent=nav[l][a.dataset.i]);
 $('#year').textContent=new Date().getFullYear();
}
$('#lang').addEventListener('click',()=>{localStorage.setItem('abcs-lang',lang()==='ar'?'en':'ar');render()});
render();
