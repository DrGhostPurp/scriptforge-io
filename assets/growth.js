
// ScriptForge share + growth injection
(function() {
  // Exit intent popup
  var shown = false;
  document.addEventListener('mouseleave', function(e) {
    if (e.clientY < 10 && !shown && !sessionStorage.getItem('sf_popup')) {
      shown = true;
      sessionStorage.setItem('sf_popup', '1');
      var popup = document.createElement('div');
      popup.id = 'sf-exit-popup';
      popup.innerHTML = '<div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem"><div style="background:#111827;border:1px solid #6366f1;border-radius:1rem;padding:2.5rem;max-width:460px;width:100%;text-align:center;position:relative"><button onclick="document.getElementById(\'sf-exit-popup\').remove()" style="position:absolute;top:.75rem;right:1rem;background:none;border:none;color:#6b7280;font-size:1.25rem;cursor:pointer">×</button><div style="font-size:2rem;margin-bottom:.75rem">🚀</div><h2 style="color:#fff;font-size:1.5rem;font-weight:800;margin-bottom:.5rem">Wait — before you go</h2><p style="color:#9ca3af;font-size:.9rem;margin-bottom:1.5rem;line-height:1.6">Get early access to ScriptForge Pro — cloud sync, private sharing, and team scripts. Free for 30 days at launch.</p><form action="https://formspree.io/f/xpwzgvkj" method="POST" id="sf-exit-form" style="display:flex;gap:.5rem"><input type="email" name="email" placeholder="your@email.com" required style="flex:1;background:#1f2937;border:1px solid #374151;border-radius:.4rem;color:#fff;padding:.6rem .9rem;font-size:.9rem;outline:none"><button type="submit" style="background:#6366f1;color:#fff;border:none;padding:.6rem 1.1rem;border-radius:.4rem;font-weight:600;cursor:pointer;white-space:nowrap">Join Free</button></form><div id="sf-exit-msg" style="margin-top:.6rem;font-size:.8rem;color:#6ee7b7;min-height:1rem"></div><p style="margin-top:1rem;font-size:.78rem;color:#374151">No spam. Unsubscribe anytime.</p></div></div>';
      document.body.appendChild(popup);
      document.getElementById('sf-exit-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        var data = new FormData(this);
        try {
          var res = await fetch(this.action, {method:'POST',body:data,headers:{'Accept':'application/json'}});
          document.getElementById('sf-exit-msg').textContent = res.ok ? "You\'re on the list! We\'ll be in touch." : 'Error — try again.';
          if (res.ok) this.reset();
        } catch(err) {}
      });
    }
  });
  
  // Share widget — inject before </body> on tool pages
  if (window.location.pathname.includes('/tools/') && window.location.pathname.split('/').filter(Boolean).length >= 3) {
    window.addEventListener('DOMContentLoaded', function() {
      var footer = document.querySelector('footer');
      if (!footer) return;
      var widget = document.createElement('div');
      widget.style.cssText = 'background:#111827;border-top:1px solid #1f2937;padding:1.25rem 2rem;text-align:center';
      var url = encodeURIComponent(window.location.href);
      var text = encodeURIComponent('Just used this free browser dev tool — no install, no signup. 🔥');
      widget.innerHTML = '<p style="font-size:.8rem;color:#6b7280;margin-bottom:.6rem">Found it useful? Share it:</p><div style="display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap"><a href="https://twitter.com/intent/tweet?text=' + text + '&url=' + url + '" target="_blank" style="background:#1f2937;border:1px solid #374151;color:#9ca3af;padding:.35rem .85rem;border-radius:.4rem;text-decoration:none;font-size:.8rem">Share on X</a><a href="https://www.linkedin.com/sharing/share-offsite/?url=' + url + '" target="_blank" style="background:#1f2937;border:1px solid #374151;color:#9ca3af;padding:.35rem .85rem;border-radius:.4rem;text-decoration:none;font-size:.8rem">LinkedIn</a><a href="/scriptforge-io/tools/" style="background:#6366f1;color:#fff;padding:.35rem .85rem;border-radius:.4rem;text-decoration:none;font-size:.8rem;font-weight:600">All 8 Tools →</a></div>';
      footer.parentNode.insertBefore(widget, footer);
    });
  }
})();
