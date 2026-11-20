import subprocess,time,json
from playwright.sync_api import sync_playwright
srv=subprocess.Popen(['node','serve.mjs','8099'],cwd='/home/claude/card-studio',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(.8)
res={}
try:
  with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={'width':1400,'height':900});pg=ctx.new_page();logs=[]
    pg.on('console',lambda m:logs.append(m.type+': '+m.text) if m.type in('error','warning') else 0);pg.on('pageerror',lambda e:logs.append('PAGEERR '+str(e)))
    pg.goto('http://localhost:8099/index.html');pg.wait_for_selector('.tpl canvas')
    pg.click('[data-sel=in-modern]');pg.click('#go');pg.wait_for_selector('#cv')
    pg.fill('[data-f=name]','Typed Name');pg.fill('[data-f=org]','Persisted Org')
    pg.click('#lang');pg.wait_for_timeout(500)
    res['dir']=pg.evaluate('document.documentElement.dir');res['lang']=pg.evaluate('document.documentElement.lang')
    res['name kept']=pg.input_value('[data-f=name]');res['org kept']=pg.input_value('[data-f=org]');res['title']=pg.inner_text('#title')
    pg.click('[data-seg=cl] [data-v=ar]');pg.fill('[data-f=name]','سلمى الأحمد');pg.fill('[data-f=org]','جامعة الأفق');pg.wait_for_timeout(300)
    pg.screenshot(path='/home/claude/ed_ar.png')
    res['h-overflow desktop AR']=pg.evaluate('document.documentElement.scrollWidth>document.documentElement.clientWidth')
    pg.goto('http://localhost:8099/index.html#gallery');pg.wait_for_selector('.tpl canvas');pg.wait_for_timeout(400);pg.screenshot(path='/home/claude/g_ar.png')
    # mobile
    m=b.new_context(viewport={'width':390,'height':800},is_mobile=True,has_touch=True);mp=m.new_page();mp.goto('http://localhost:8099/index.html');mp.wait_for_selector('.tpl canvas')
    res['h-overflow mobile gallery']=mp.evaluate('document.documentElement.scrollWidth>document.documentElement.clientWidth')
    mp.click('[data-sel=em-tech]');mp.click('#go');mp.wait_for_selector('#cv');mp.wait_for_timeout(400)
    res['h-overflow mobile editor']=mp.evaluate('document.documentElement.scrollWidth>document.documentElement.clientWidth')
    mp.screenshot(path='/home/claude/ed_m.png');mp.click('#exp');mp.wait_for_selector('#dl');mp.wait_for_timeout(300)
    res['h-overflow mobile dialog']=mp.evaluate('(()=>{const d=document.getElementById("dlg");return d.scrollWidth>d.clientWidth})()')
    # navigation + designs page
    pg2=ctx.new_page();pg2.goto('http://localhost:8099/index.html#designs');pg2.wait_for_selector('.empty,.dgrid');res['designs empty']=pg2.inner_text('.empty')[:30]
    for h in ['student','employee','institutional','about','settings']:
        pg2.goto('http://localhost:8099/index.html#'+h);pg2.wait_for_timeout(250);res['#'+h]=pg2.inner_text('#title')
    print(json.dumps(res,ensure_ascii=False,indent=1));print('\n'.join(logs[:10]));b.close()
finally: srv.kill()
