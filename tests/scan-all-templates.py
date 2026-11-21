# Needs: pip install playwright zxing-cpp pillow pypdf   (and: playwright install chromium)
import os,tempfile,pathlib
ROOT=str(pathlib.Path(__file__).resolve().parent.parent);TMP=tempfile.gettempdir()
import subprocess,time,base64,io
from playwright.sync_api import sync_playwright
import zxingcpp
from PIL import Image
srv=subprocess.Popen(['node','serve.mjs','8123'],cwd=ROOT,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(.8)
JS="""async ([size,mode])=>{const R=await import('./js/render.js');await R.loadFonts();const T=await import('./js/templates/index.js'),X=await import('./js/export.js'),D=await import('./js/design.js');const out=[];
 for(const t of T.TEMPLATES)for(const o of ['landscape','portrait']){const sm=T.CATS[t.cat].sample,sz=D.mkSize(size),
  codes={qr:{on:mode!=='bar',side:'front',scale:1,dx:0,dy:0},bar:{on:mode!=='qr',side:'front',scale:1,dx:0,dy:0}};
  const st={palette:'p0',cardLang:'en',sides:1,values:{...sm.en,id:'STU-26-0417'},custom:[],codes};
  out.push([t.id,t.cat,o,R.codeIssues(st,{tpl:t,orient:o,size:sz}),X.renderCard(t,o,'front',st,{size:sz}).toDataURL('image/png')])}return out}"""
try:
  with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page();pg.goto('http://localhost:8123/index.html');pg.wait_for_timeout(1500)
    for mode in ['qr','bar','both']:
      for size in ['cr80','100x70']:
        n=ok=warn=silent=0;wl=[]
        for tid,cat,o,iss,url in pg.evaluate(JS,[size,mode]):
          g={x.format.name for x in zxingcpp.read_barcodes(Image.open(io.BytesIO(base64.b64decode(url.split(',')[1]))))}
          need=({'QRCode'} if mode!='bar' else set())|({'Code128'} if mode!='qr' else set());good=need<=g;w=any(i in('barSmall','qrSmall') for i in iss)
          n+=1;ok+=good;warn+=w;silent+=(not good and not w)
          if w:wl.append(f'{tid}/{o[0]}')
        print(f'{mode:5} {size:7} templates*orient={n} decoded={ok} warned={warn} silentFail={silent}',wl[:6] if warn else '')
    b.close()
finally:srv.kill()
