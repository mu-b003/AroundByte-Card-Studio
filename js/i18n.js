// Same philosophy as AroundByte PDF: flat en/ar dictionaries, t(key,vars), language stored locally, re-render in place.
const D={en:{
navStudio:'Card Studio',navGallery:'All templates',navStudent:'Student Cards',navEmployee:'Employee Cards',navInst:'Institutional Cards',navDesigns:'My Designs',navAbout:'About',navPdf:'AroundByte PDF',settings:'Settings',
galTitle:'Card Studio',galDesc:'Choose a template, add your details and export print-ready ID cards.',
tStudent:'Student Cards',tEmployee:'Employee Cards',tInstitutional:'Institutional Cards',
titleStudent:'Student ID Cards',titleEmployee:'Employee ID Cards',titleInst:'Institutional ID Cards',
previewAs:'Preview as',landscape:'Landscape',portrait:'Portrait',nTemplates:'{n} templates',select:'Select template',bothOrient:'Landscape & portrait',sidesTag:'1 or 2 sides',
startTitle:'Start your design',orientation:'Orientation',sides:'Card sides',single:'Single-sided',singleSub:'Front only. No back side is designed or exported.',double:'Double-sided',doubleSub:'Front and back, each with its own content.',start:'Start designing',cancel:'Cancel',close:'Close',
edTitle:'Card editor',edDesc:'Edit the details on the right. The preview updates instantly.',
setup:'Card setup',designName:'Design name',cardLang:'Card language',cardLangNote:'Sets the labels printed on the card and mirrors the layout for Arabic.',colors:'Colour scheme',branding:'Logo',
front:'Front',back:'Back',frontDetails:'Front details',backDetails:'Back details',sharedHint:'Organization name, logo and colours are shared with the front.',
photo:'Photograph',uploadPhoto:'Upload photo',replacePhoto:'Replace photo',remove:'Remove',zoom:'Zoom',moveX:'Move left / right',moveY:'Move up / down',photoNone:'No photo yet. The preview shows a placeholder.',lowRes:'This photo is low resolution for print (about {n} dpi). A larger image will look sharper.',
uploadLogo:'Upload logo',replaceLogo:'Replace logo',logoNote:'PNG with transparency, SVG, JPG or WebP. The aspect ratio is preserved.',
custom:'Custom fields',addCustom:'Add field',customLabel:'Label',customValue:'Value',customNeedsBack:'Custom fields are printed on the back. Choose “Double-sided” to use them.',customNote:'Shown on the back, up to 3 fields.',
showSafe:'Show safe area',viewZoom:'View zoom',printCfg:'<bdi>CR80 · 85.6 × 54 {mm}</bdi> · {o} · {s} · <bdi>300 DPI</bdi>',samplePh:'e.g. {s}',
save:'Save design',saved:'Design saved on this device.',export:'Export / Print',req:'required',
expTitle:'Export & print',fmt:'Format',fmtPdf:'PDF — one page per side',fmtPng:'PNG — 300 DPI',fmtA4:'A4 sheet — several cards per page',bleed:'Add 2 mm bleed',marks:'Crop marks',copies:'Number of cards',
sheetInfo:'A4 · {c} × {r} = {n} per page · {p} page(s) of fronts{b}',backInfo:' + {p} page(s) of backs (mirrored for flip on long edge)',
reqMissing:'Complete the required fields: {f}',download:'Download',preparing:'Preparing…',exported:'Export ready.',printNote:'Print at 100% / “Actual size”. Do not use “Fit to page”.',frontPage:'Front page',backPage:'Back page',
dTitle:'My Designs',dDesc:'Designs saved in this browser. Nothing is uploaded.',dEmpty:'No saved designs yet',dEmptySub:'Choose a template, design a card and press “Save design”.',open:'Open',delete:'Delete',confirmDelete:'Delete this design?',updated:'Updated {d}',unnamed:'Untitled design',
badType:'Unsupported file type. Use PNG, JPG, WebP, GIF, BMP or SVG.',tooBig:'File is larger than 15 MB.',badImg:'This image could not be read.',failed:'Something went wrong',noDesign:'Choose a template first.',
privacy:'Everything is processed in your browser. Photos and designs are never uploaded.',
setTitle:'Settings',setLang:'Language',setTheme:'Theme',dark:'Dark',light:'Light',
abTitle:'About Card Studio',abP1:'AroundByte Card Studio is a browser-based studio for professional student, employee and institutional ID cards. Pick a structured template, enter the details, add a photograph and logo, and export print-ready files.',abP2:'Cards use the CR80 size (85.6 × 54 mm), 300 DPI output, optional 2 mm bleed, and A4 sheets with correct front/back ordering for double-sided printing.',abP3:'Bulk creation from CSV and Excel is being added next; the template and data model already support it.',
mm:'mm'
},ar:{
navStudio:'استوديو البطاقات',navGallery:'كل القوالب',navStudent:'بطاقات الطلاب',navEmployee:'بطاقات الموظفين',navInst:'بطاقات المؤسسات',navDesigns:'تصاميمي',navAbout:'من نحن',navPdf:'AroundByte PDF',settings:'الإعدادات',
galTitle:'استوديو البطاقات',galDesc:'اختر قالبًا وأضف بياناتك وصدّر بطاقات هوية جاهزة للطباعة.',
tStudent:'بطاقات الطلاب',tEmployee:'بطاقات الموظفين',tInstitutional:'بطاقات المؤسسات',
titleStudent:'بطاقات هوية الطلاب',titleEmployee:'بطاقات هوية الموظفين',titleInst:'بطاقات هوية المؤسسات',
previewAs:'معاينة بوضع',landscape:'أفقي',portrait:'عمودي',nTemplates:'{n} قوالب',select:'اختيار القالب',bothOrient:'أفقي وعمودي',sidesTag:'وجه أو وجهان',
startTitle:'ابدأ تصميمك',orientation:'الاتجاه',sides:'أوجه البطاقة',single:'وجه واحد',singleSub:'الوجه الأمامي فقط. لا يُصمَّم ولا يُصدَّر وجه خلفي.',double:'وجهان',doubleSub:'أمامي وخلفي، لكل منهما محتواه.',start:'ابدأ التصميم',cancel:'إلغاء',close:'إغلاق',
edTitle:'محرر البطاقة',edDesc:'عدّل البيانات من اللوحة الجانبية. تتحدث المعاينة فورًا.',
setup:'إعداد البطاقة',designName:'اسم التصميم',cardLang:'لغة البطاقة',cardLangNote:'تحدد لغة العناوين المطبوعة وتعكس التخطيط للعربية.',colors:'نظام الألوان',branding:'الشعار',
front:'الأمامي',back:'الخلفي',frontDetails:'بيانات الوجه الأمامي',backDetails:'بيانات الوجه الخلفي',sharedHint:'اسم الجهة والشعار والألوان مشتركة مع الوجه الأمامي.',
photo:'الصورة الشخصية',uploadPhoto:'رفع صورة',replacePhoto:'استبدال الصورة',remove:'إزالة',zoom:'التكبير',moveX:'تحريك يمينًا / يسارًا',moveY:'تحريك لأعلى / لأسفل',photoNone:'لا توجد صورة بعد. تعرض المعاينة صورة بديلة.',lowRes:'دقة هذه الصورة منخفضة للطباعة (حوالي {n} نقطة/بوصة). صورة أكبر ستكون أوضح.',
uploadLogo:'رفع شعار',replaceLogo:'استبدال الشعار',logoNote:'PNG شفاف أو SVG أو JPG أو WebP. تُحفظ نسبة الأبعاد.',
custom:'حقول مخصصة',addCustom:'إضافة حقل',customLabel:'العنوان',customValue:'القيمة',customNeedsBack:'تُطبع الحقول المخصصة على الوجه الخلفي. اختر «وجهان» لاستخدامها.',customNote:'تظهر على الوجه الخلفي، حتى 3 حقول.',
showSafe:'إظهار المنطقة الآمنة',viewZoom:'تكبير العرض',printCfg:'<bdi>CR80 · 85.6 × 54 {mm}</bdi> · {o} · {s} · <bdi>300 DPI</bdi>',samplePh:'مثال: {s}',
save:'حفظ التصميم',saved:'تم حفظ التصميم على هذا الجهاز.',export:'تصدير / طباعة',req:'مطلوب',
expTitle:'التصدير والطباعة',fmt:'الصيغة',fmtPdf:'PDF — صفحة لكل وجه',fmtPng:'PNG — 300 DPI',fmtA4:'ورقة A4 — عدة بطاقات في الصفحة',bleed:'إضافة 2 مم للقص (Bleed)',marks:'علامات القص',copies:'عدد البطاقات',
sheetInfo:'A4 · {c} × {r} = {n} في الصفحة · {p} صفحة للأوجه الأمامية{b}',backInfo:' + {p} صفحة للأوجه الخلفية (معكوسة للطباعة على الوجهين من الحافة الطويلة)',
reqMissing:'أكمل الحقول المطلوبة: {f}',download:'تنزيل',preparing:'جارٍ التحضير…',exported:'الملف جاهز.',printNote:'اطبع بحجم 100% / «الحجم الفعلي». لا تستخدم «ملاءمة الصفحة».',frontPage:'صفحة الأمام',backPage:'صفحة الخلف',
dTitle:'تصاميمي',dDesc:'التصاميم المحفوظة في هذا المتصفح. لا يتم رفع أي شيء.',dEmpty:'لا توجد تصاميم محفوظة بعد',dEmptySub:'اختر قالبًا وصمّم بطاقة ثم اضغط «حفظ التصميم».',open:'فتح',delete:'حذف',confirmDelete:'هل تريد حذف هذا التصميم؟',updated:'آخر تعديل {d}',unnamed:'تصميم بدون اسم',
badType:'نوع الملف غير مدعوم. استخدم PNG أو JPG أو WebP أو GIF أو BMP أو SVG.',tooBig:'حجم الملف أكبر من 15 ميغابايت.',badImg:'تعذر قراءة هذه الصورة.',failed:'حدث خطأ ما',noDesign:'اختر قالبًا أولًا.',
privacy:'تتم المعالجة كلها داخل متصفحك. لا يتم رفع الصور أو التصاميم أبدًا.',
setTitle:'الإعدادات',setLang:'اللغة',setTheme:'المظهر',dark:'داكن',light:'فاتح',
abTitle:'عن استوديو البطاقات',abP1:'AroundByte Card Studio استوديو داخل المتصفح لإنشاء بطاقات هوية احترافية للطلاب والموظفين والمؤسسات. اختر قالبًا منظمًا وأدخل البيانات وأضف الصورة والشعار ثم صدّر ملفات جاهزة للطباعة.',abP2:'تستخدم البطاقات مقاس CR80 (85.6 × 54 مم) وجودة 300 DPI و2 مم قص اختياري، وأوراق A4 بترتيب صحيح للأوجه عند الطباعة على الوجهين.',abP3:'سيُضاف الإنشاء الجماعي من CSV وExcel لاحقًا؛ وبنية القوالب والبيانات جاهزة له.',
mm:'مم'}};
let L=localStorage.getItem('abcs-lang')||'en';
export const lang=()=>L;
export function setLang(l){L=l;localStorage.setItem('abcs-lang',l)}
export const t=(k,v={})=>(D[L][k]??D.en[k]??k).replace(/\{(\w+)\}/g,(_,x)=>v[x]??'');
export const addStrings=(e,a)=>{Object.assign(D.en,e);Object.assign(D.ar,a)};
