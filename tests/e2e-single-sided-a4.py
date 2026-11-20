import subprocess,time,json,glob,os
from playwright.sync_api import sync_playwright
srv=subprocess.Popen(['node','serve.mjs','8099'],cwd='/home/claude/card-studio',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(.8)
res={};os.makedirs('/home/claude/dl2',exist_ok=True)
for f in glob.glob('/home/claude/dl2/*'):os.remove(f)
try:
  with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={'width':1400,'height':900},accept_downloads=True);pg=ctx.new_page();logs=[]
    pg.on('console',lambda m:logs.append(m.type+': '+m.text) if m.type in('error','warning') else 0);pg.on('pageerror',lambda e:logs.append('PAGEERR '+str(e)))
    pg.goto('http://localhost:8099/index.html');pg.wait_for_selector('.tpl canvas')
    pg.click('[data-sel=em-corporate]');pg.click('input[name=s][value="1"]');pg.click('#go');pg.wait_for_selector('#cv')
    res['single: side tabs present']=pg.locator('[data-side]').count();res['single: custom hint']=pg.inner_text('.hint:has-text("back")') if pg.locator('.hint:has-text("back")').count() else None
    for k,v in dict(name='Ana Pérez',id='E-77',role='Engineer',org='Acme Corp').items():pg.fill(f'[data-f={k}]',v)
    pg.click('#exp');pg.wait_for_selector('#dl');pg.click('[data-seg=fmt] [data-v=png]')
    with pg.expect_download() as d:pg.click('#dl')
    d.value.save_as('/home/claude/dl2/'+d.value.suggested_filename);res['png']=d.value.suggested_filename
    pg.click('[data-seg=fmt] [data-v=pdf]')
    with pg.expect_download() as d:pg.click('#dl')
    d.value.save_as('/home/claude/dl2/'+d.value.suggested_filename);res['pdf']=d.value.suggested_filename
    pg.click('[data-seg=fmt] [data-v=a4]');res['default copies (landscape)']=pg.input_value('#xc');pg.fill('#xc','25');pg.dispatch_event('#xc','input')
    res['sheet info']=pg.inner_text('#info');pg.screenshot(path='/home/claude/exp_a4b.png')
    with pg.expect_download() as d:pg.click('#dl')
    d.value.save_as('/home/claude/dl2/'+d.value.suggested_filename);res['a4']=d.value.suggested_filename
    print(json.dumps(res,ensure_ascii=False,indent=1));print('\n'.join(logs[:10]));b.close()
finally: srv.kill()
from PIL import Image
from pypdf import PdfReader
print(Image.open(glob.glob('/home/claude/dl2/*.png')[0]).size)
for f in glob.glob('/home/claude/dl2/*.pdf'):
    r=PdfReader(f);print(os.path.basename(f),len(r.pages),'pages',[(round(float(x.mediabox.width)/72*25.4,1),round(float(x.mediabox.height)/72*25.4,1)) for x in r.pages][:2])
