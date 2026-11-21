# Needs: pip install playwright zxing-cpp pillow pypdf   (and: playwright install chromium)
import os,tempfile,pathlib
ROOT=str(pathlib.Path(__file__).resolve().parent.parent);TMP=tempfile.gettempdir()
import subprocess,time,io,base64
from playwright.sync_api import sync_playwright
from PIL import Image
srv=subprocess.Popen(['node','serve.mjs','8123'],cwd=ROOT,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(.8)
try:
  with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={'width':1400,'height':1000});pg=ctx.new_page();logs=[]
    pg.on('console',lambda m:logs.append(m.type+': '+m.text) if m.type in('error','warning') else 0);pg.on('pageerror',lambda e:logs.append('PAGEERR '+str(e)))
    pg.goto('http://localhost:8123/index.html');pg.wait_for_function('window.__cs',timeout=15000)
    pg.evaluate("location.hash='#gallery'");pg.wait_for_selector('[data-sel=pr-houses]',state='attached');pg.evaluate("document.querySelector('[data-sel=pr-houses]').click()");pg.wait_for_selector('#go');pg.click('#go');pg.wait_for_selector('#panel')
    E="window.__cs.S.ED"
    pg.fill('[data-f=name]','Omar Al-Farsi');pg.fill('[data-f=id]','PRM-2026-1182');pg.fill('[data-f=house]','Eagle House')
    # hide a field + custom label + style
    pg.click('[data-vis=unit]');print('hide.unit =',pg.evaluate(f"{E}.hide.unit"))
    pg.click('[data-gear=role]');pg.fill('[data-lbl=role]','Year Group');pg.fill('[data-sty="role.c"]','#ff0000') if False else pg.evaluate("(()=>{const i=document.querySelector('[data-sty=\"role.c\"]');i.value='#ff0000';i.dispatchEvent(new Event('input',{bubbles:true}))})()")
    pg.select_option('[data-sty="role.f"]','serif')
    print('labels/style:',pg.evaluate(f"JSON.stringify([{E}.labels.en,{E}.style.role])"))
    # colours + frame slider
    pg.evaluate("(()=>{const i=document.querySelector('[data-col=a]');i.value='#7c3aed';i.dispatchEvent(new Event('input',{bubbles:true}))})()")
    pg.evaluate("(()=>{const i=document.querySelector('[data-xf=\"photo.sc\"]');i.value='0.8';i.dispatchEvent(new Event('input',{bubbles:true}))})()")
    pg.wait_for_timeout(300);pg.locator('#cv').screenshot(path=TMP+'/abcs-e3-front.png')
    print('xf/colors:',pg.evaluate(f"JSON.stringify([{E}.xf.photo,{E}.colors])"))
    # optional details on back (double-sided)
    pg.click('[data-side=back]');pg.wait_for_selector('[data-f=teacher]');pg.fill('[data-f=teacher]','Mr. Salim');pg.fill('[data-f=dob]','2017-03-02')
    pg.wait_for_timeout(300);pg.locator('#cv').screenshot(path=TMP+'/abcs-e3-back.png');print('sensitive chip present:',pg.locator('.chip-sens').count()>0)
    # custom size
    pg.click('[data-side=front]');pg.select_option('#szs','custom');pg.fill('#szw','70');pg.fill('#szh','70');pg.press('#szh','Tab');pg.wait_for_timeout(300)
    print('size:',pg.evaluate(f"JSON.stringify({E}.size)"),'| cfg:',pg.inner_text('#cfg'))
    # save and re-open from My Designs
    pg.click('#save');pg.wait_for_timeout(500);pg.evaluate("location.hash='#designs'");pg.wait_for_selector('[data-open]');pg.click('[data-open]');pg.wait_for_selector('#panel')
    print('reopened:',pg.evaluate(f"JSON.stringify({{n:{E}.values.name,h:{E}.hide,sz:{E}.size,col:{E}.colors,codes:!!{E}.codes}})"))
    # legacy saved design (no codes key) opens in legacy mode and can opt in
    pg.evaluate("""(async()=>{const s=await import('./js/store.js');const d={id:'legacy1',name:'old',tplId:'st-modern',orient:'landscape',sides:2,palette:'p0',cardLang:'en',values:{name:'Old Card',id:'X1'},custom:[],photo:{data:null,zoom:1,ox:0,oy:0},logo:{data:null},updated:Date.now(),thumb:''};await s.saveDesign(d)})()""")
    pg.evaluate("location.hash='#gallery'");pg.evaluate("location.hash='#designs'");pg.wait_for_timeout(600)
    pg.click('[data-open=legacy1]');pg.wait_for_selector('#panel');print('legacy codes:',pg.evaluate(f"{E}.codes"),'| upgrade button:',pg.locator('#codeUp').count())
    pg.click('#codeUp');print('after upgrade:',pg.evaluate(f"JSON.stringify({E}.codes.qr.on)"))
    # mobile
    m=ctx.new_page();m.set_viewport_size({'width':390,'height':844});m.goto('http://localhost:8123/index.html');m.wait_for_function('window.__cs');m.wait_for_timeout(800);m.screenshot(path=TMP+'/abcs-mob-gal.png')
    print('mobile horizontal overflow:',m.evaluate("document.documentElement.scrollWidth>document.documentElement.clientWidth"))
    m.evaluate("location.hash='#gallery'");m.evaluate("document.querySelector('[data-sel=sc-tech]').click()");m.wait_for_selector('#go');m.click('#go');m.wait_for_selector('#panel');m.wait_for_timeout(500);m.screenshot(path=TMP+'/abcs-mob-ed.png')
    print('mobile editor overflow:',m.evaluate("document.documentElement.scrollWidth>document.documentElement.clientWidth"))
    print('\n'.join(logs[:10]) or 'no console errors')
    b.close()
finally: srv.kill()
