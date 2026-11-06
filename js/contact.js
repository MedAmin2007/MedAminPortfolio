/* Real contact form via Web3Forms (works on GitHub Pages, no server needed).
   1) Get a free access key at https://web3forms.com (enter your email, key arrives by mail)
   2) Paste it below. */
(function () {
  var KEY = 'e8b80aad-c6cb-43e3-baad-3a26fa51767c';
  var form = document.getElementById('form');
  if (!form) return;
  var status = document.getElementById('formStatus');
  var btn = form.querySelector('button[type="submit"]');

  function val(id) { return document.getElementById('f-' + id).value.trim(); }
  function err(id, msg) {
    var e = document.getElementById('e-' + id), f = document.getElementById('f-' + id);
    if (e) e.textContent = msg || '';
    if (f) f.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  // capture phase + stopImmediatePropagation: replaces any older demo handler in main.js
  form.addEventListener('submit', async function (ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();

    var name = val('name'), email = val('email'), msg = val('msg');
    var ok = true;
    err('name', name.length < 2 ? 'Please enter your name.' : ''); if (name.length < 2) ok = false;
    var badMail = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    err('email', badMail ? 'Please enter a valid email.' : ''); if (badMail) ok = false;
    err('msg', msg.length < 10 ? 'Message is too short (10 characters min).' : ''); if (msg.length < 10) ok = false;
    if (!ok) return;

    if (form.querySelector('[name="botcheck"]').checked) return; // bot caught
    if (KEY.indexOf('PASTE') === 0) { status.textContent = 'Access key not set yet in js/contact.js.'; return; }

    btn.disabled = true;
    status.textContent = 'Sending…';
    var ctrl = new AbortController();
    var t = setTimeout(function () { ctrl.abort(); }, 15000);
    try {
      var res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: KEY,
          subject: 'New portfolio message from ' + name,
          from_name: 'Portfolio website',
          name: name, email: email, message: msg
        }),
        signal: ctrl.signal
      });
      var data = await res.json();
      if (data.success) { status.textContent = 'Message sent. Thank you!'; form.reset(); }
      else { status.textContent = 'Could not send: ' + (data.message || 'unknown error'); }
    } catch (e) {
      status.textContent = 'Network error. Please try again or email me directly.';
    } finally {
      clearTimeout(t);
      btn.disabled = false;
    }
  }, true);
})();
