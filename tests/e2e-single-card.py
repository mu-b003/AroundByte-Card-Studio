import subprocess,time,sys,os,json
from playwright.sync_api import sync_playwright
srv=subprocess.Popen(['node','serve.mjs','8099'],cwd='/home/claude/card-studio',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(.8)
os.makedirs('/home/claude/dl',exist_ok=True)
res={}
try:
  with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={'width':1400,'height':900},accept_downloads=True);pg=ctx.new_page();logs=[]
    pg.on('console',lambda m:logs.append(m.type+': '+m.text) if m.type in('error','warning') else 0);pg.on('pageerror',lambda e:logs.append('PAGEERR '+str(e)))
    pg.goto('http://localhost:8099/index.html');pg.wait_for_selector('.tpl canvas')
    # template 2 (creative), portrait, double
    pg.click('[data-sel=st-premium]');pg.click('input[name=o][value=portrait]');pg.click('input[name=s][value="2"]');pg.click('#go')
    pg.wait_for_selector('#cv');pg.wait_for_timeout(400)
    cv=pg.eval_on_selector('#cv','c=>[c.width,c.height]');res['portrait canvas']=cv
    pg.fill('[data-f=name]','Test Student');pg.fill('[data-f=id]','ST-1001');pg.fill('[data-f=org]','Demo School')
    pg.set_input_files('#photoIn','/home/claude/test_photo.jpg');pg.wait_for_selector('[data-ph=zoom]')
    pg.set_input_files('#logoIn','/home/claude/test_logo.svg');pg.wait_for_selector('#logoRm')
    pg.fill('[data-ph=zoom]','1.5');pg.dispatch_event('[data-ph=zoom]','input')
    pg.click('[data-pal=p1]');pg.wait_for_timeout(300);pg.screenshot(path='/home/claude/ed_front.png')
    pg.click('[data-side=back]');pg.click('#cadd');pg.fill('[data-c="0"][data-k=l]','Bus');pg.fill('[data-c="0"][data-k=v]','Route 4');pg.fill('[data-f=addr]','5 Test Road');pg.wait_for_timeout(300);pg.screenshot(path='/home/claude/ed_back.png')
    pg.fill('#dname','My Test Card');pg.click('#save');pg.wait_for_timeout(500);res['toast']=pg.inner_text('#toast')
    # bad file
    open('/home/claude/bad.txt','w').write('x');pg.click('[data-side=front]')
    pg.set_input_files('#photoIn','/home/claude/bad.txt');pg.wait_for_timeout(300);res['bad upload toast']=pg.inner_text('#toast')
    # export PNG zip
    pg.click('#exp');pg.wait_for_selector('#dl');res['validation msg']=pg.inner_text('#xerr');res['dl disabled']=pg.is_disabled('#dl');pg.keyboard.press('Escape');pg.fill('[data-f=role]','Grade 5');pg.click('#exp');pg.wait_for_selector('#dl');res['dl enabled after fill']=not pg.is_disabled('#dl');pg.click('[data-seg=fmt] [data-v=png]')
    with pg.expect_download() as d: pg.click('#dl')
    d.value.save_as('/home/claude/dl/'+d.value.suggested_filename);res['png dl']=d.value.suggested_filename
    pg.click('[data-seg=fmt] [data-v=pdf]');pg.check('#xb')
    with pg.expect_download() as d: pg.click('#dl')
    d.value.save_as('/home/claude/dl/'+d.value.suggested_filename);res['pdf dl']=d.value.suggested_filename
    pg.uncheck('#xb');pg.click('[data-seg=fmt] [data-v=a4]');pg.wait_for_timeout(300);pg.screenshot(path='/home/claude/exp_a4.png')
    with pg.expect_download() as d: pg.click('#dl')
    d.value.save_as('/home/claude/dl/'+d.value.suggested_filename);res['a4 dl']=d.value.suggested_filename
    pg.keyboard.press('Escape')
    res['info']='ok'
    print(json.dumps(res,ensure_ascii=False,indent=1));print('\n'.join(logs[:10]));b.close()
finally: srv.kill()
