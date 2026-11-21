import subprocess,time
from playwright.sync_api import sync_playwright
srv=subprocess.Popen(['node','serve.mjs','8123'],cwd=__import__('pathlib').Path(__file__).resolve().parent.parent,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(.8)
try:
  with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={'width':1300,'height':900},permissions=['clipboard-read','clipboard-write']);pg=ctx.new_page();logs=[]
    pg.on('pageerror',lambda e:logs.append(str(e)));pg.on('console',lambda m:logs.append(m.text) if m.type=='error' else 0)
    # 1) open a direct link cold (like a recipient would)
    pg.goto('http://localhost:8123/index.html#t/sc-tech?o=portrait&s=1&z=100x70');pg.wait_for_selector('#go',timeout=10000)
    print('dialog title:',pg.inner_text('#dlg .dh b'))
    print('preselected:',pg.evaluate("[document.querySelector('input[name=o]:checked').value,document.querySelector('input[name=s]:checked').value,document.querySelector('#sz').value]"))
    print('back visible:',pg.is_visible('#backBtn'))
    pg.keyboard.press('Escape');pg.wait_for_timeout(300);print('after close url:',pg.url.split('#')[1],'| page title:',pg.inner_text('#title'))
    # 2) back from a category with no history -> main gallery
    pg.click('#backBtn');pg.wait_for_timeout(300);print('back ->',pg.url.split('#')[1],'| back hidden on main:',not pg.is_visible('#backBtn'))
    # 3) copy link from a card
    pg.evaluate("document.querySelector('[data-copy=pk-rainbow]').click()");pg.wait_for_timeout(300)
    print('clipboard:',pg.evaluate("navigator.clipboard.readText()"))
    # 4) in-app navigation then back
    pg.evaluate("location.hash='#university'");pg.wait_for_timeout(300);pg.evaluate("document.querySelector('[data-sel=un-classic]').click()");pg.wait_for_selector('#go');pg.click('#go');pg.wait_for_selector('#panel')
    print('editor url:',pg.url.split('#')[1]);pg.click('#backBtn');pg.wait_for_timeout(400);print('back from editor ->',pg.url.split('#')[1])
    pg.go_back();pg.wait_for_timeout(300)
    # 5) copy link inside editor
    pg.evaluate("location.hash='#gallery'");pg.evaluate("document.querySelector('[data-sel=un-classic]').click()");pg.wait_for_selector('#go');pg.click('#go');pg.wait_for_selector('#cplink');pg.click('#cplink');pg.wait_for_timeout(300)
    print('editor link:',pg.evaluate("navigator.clipboard.readText()").split('index.html')[-1] or pg.evaluate("navigator.clipboard.readText()"))
    # 6) unknown template id, RTL arrow
    pg.goto('http://localhost:8123/index.html#t/nope');pg.wait_for_timeout(800);print('unknown ->',pg.url.split('#')[1])
    pg.evaluate("localStorage.setItem('abcs-lang','ar')");pg.goto('http://localhost:8123/index.html#about');pg.wait_for_timeout(800);pg.screenshot(path=__import__('tempfile').gettempdir()+'/abcs-back.png',clip={'x':0,'y':0,'width':1300,'height':260})
    print('errors:',logs or 'none')
    b.close()
finally:srv.kill()
