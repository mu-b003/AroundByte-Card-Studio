# Needs: pip install playwright zxing-cpp pillow pypdf   (and: playwright install chromium)
import os,tempfile,pathlib
ROOT=str(pathlib.Path(__file__).resolve().parent.parent);TMP=tempfile.gettempdir()
import subprocess,time,json,zipfile,io,re,sys
from playwright.sync_api import sync_playwright
import zxingcpp
from PIL import Image
srv=subprocess.Popen(['node','serve.mjs','8123'],cwd=ROOT,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(.8)
def scan(img):
    r=zxingcpp.read_barcodes(img);return [(x.format.name,x.text) for x in r]
try:
  with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={'width':1400,'height':1000},accept_downloads=True);pg=ctx.new_page();logs=[]
    pg.on('console',lambda m:logs.append(m.type+': '+m.text) if m.type in('error','warning') else 0);pg.on('pageerror',lambda e:logs.append('PAGEERR '+str(e)))
    pg.goto('http://localhost:8123/index.html');pg.wait_for_function('window.__cs',timeout=15000)
    def start(tpl,orient,sides,size):
        pg.evaluate("location.hash='#gallery'");pg.wait_for_selector(f'[data-sel={tpl}]',state='attached');pg.evaluate(f"document.querySelector('[data-sel={tpl}]').click()");pg.wait_for_selector('#go')
        pg.check(f'input[name=o][value="{orient}"]');pg.check(f'input[name=s][value="{sides}"]');pg.select_option('#sz',size);pg.click('#go');pg.wait_for_selector('#panel')
    def fill(k,v):pg.fill(f'[data-f={k}]',v)
    def export(fmt,opts=()):
        pg.click('#exp');pg.wait_for_selector('#dl');pg.click(f'[data-seg=fmt] button[data-v={fmt}]')
        for k,v in opts:pg.fill(k,str(v))
        with pg.expect_download() as d:pg.click('#dl')
        dl=d.value;path=fTMP+'/abcs-out-{dl.suggested_filename}';dl.save_as(path);pg.evaluate("document.querySelector('#dlg').close()");return path
    # ---- 1. single-sided, 100x70, QR (Arabic) + Code128 on the front
    start('pk-minimal','landscape',1,'100x70')
    fill('name','Lina Hassan');fill('id','KG-2026-031');fill('role','Sunflower');fill('org','Little Stars Nursery')
    pg.check('[data-cd="qr.on"]');pg.wait_for_selector('[data-val=qr]');pg.fill('[data-val=qr]','عمر-123 https://example.org/m/1');
    pg.check('[data-cd="bar.on"]')
    pg.wait_for_timeout(300);pg.screenshot(path=TMP+'/abcs-ed-codes.png')
    path=export('png');im=Image.open(path);print('PNG size',im.size,'dpi',im.info.get('dpi'),'expected',round(100*300/25.4),round(70*300/25.4))
    print('scan PNG:',scan(im))
    # JPG
    path=export('jpg');im=Image.open(path);print('JPG size',im.size,'dpi',im.info.get('dpi'));print('scan JPG:',scan(im))
    # PDF
    path=export('pdf');from pypdf import PdfReader;r=PdfReader(path);pp=r.pages[0];print('PDF pages',len(r.pages),'size mm',round(float(pp.mediabox.width)/72*25.4,2),round(float(pp.mediabox.height)/72*25.4,2))
    # barcode invalid chars blocks export
    pg.fill('[data-val=bar]','عربي');pg.wait_for_timeout(200)
    print('issue shown:',pg.inner_text('#panel .hint.err') if pg.query_selector('#panel .hint.err') else 'NONE')
    pg.click('#exp');pg.wait_for_selector('#dl');print('export blocked:',pg.is_disabled('#dl'),'|',pg.inner_text('#xerr')[:90]);pg.evaluate("document.querySelector('#dlg').close()")
    # ---- 2. double-sided: bar on back by default for new templates; QR front
    start('sc-dark','portrait',2,'cr80')
    fill('name','Amira Khalid');fill('id','SEC-2026-0417');fill('role','Grade 10');fill('sec','B');fill('org','Northfield')
    print('codes defaults (double):',pg.evaluate("JSON.stringify({qr:window.__cs.S.ED.codes.qr.on,bar:window.__cs.S.ED.codes.bar.on,barSide:window.__cs.S.ED.codes.bar.side})"))
    pg.check('[data-cd="qr.on"]')
    path=export('png');z=zipfile.ZipFile(path);print('zip:',z.namelist())
    for n in z.namelist():print(n,scan(Image.open(io.BytesIO(z.read(n)))))
    # ---- 3. A4 sheet
    start('un-minimal','landscape',2,'90x60');fill('name','Omar');fill('id','UNI-1');fill('role','Eng');fill('major','CE');fill('org','Riverton')
    path=export('a4',[('#xmg',6),('#xp',6)]);from pypdf import PdfReader;r=PdfReader(path);print('A4 pages',len(r.pages),[ (round(float(p.mediabox.width)/72*25.4,1),round(float(p.mediabox.height)/72*25.4,1)) for p in r.pages])
    print('\n'.join(logs[:10]) or 'no console errors')
    b.close()
finally: srv.kill()
