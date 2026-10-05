(function () {
  'use strict';
  var S = window.SITE, P = S.profile, I = window.I18N || {};
  var LANGS = ['en', 'fr', 'ar'];
  var ICONS = {   // inline SVG, 24x24: no external requests, inherits the text colour
    github: { fill: true, d: ['M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'] },
    linkedin: { fill: true, d: ['M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'] },
    mail: { d: ['M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z', 'M3 7l9 6.5L21 7'] },
    pin: { d: ['M12 21s-6-5.2-6-10a6 6 0 0 1 12 0c0 4.8-6 10-6 10z', 'M12 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z'] },
    external: { d: ['M14 4h6v6', 'M20 4l-9 9', 'M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5'] },
    doc: { d: ['M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z', 'M14 3v5h5', 'M9 13h6M9 17h6'] },
    school: { d: ['M2 9l10-5 10 5-10 5z', 'M6 11.2V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.8', 'M22 9v6'] }
  };
  function icon(name) {
    var def = ICONS[name], ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'ico');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    if (def.fill) svg.setAttribute('fill', 'currentColor');
    else { svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '1.8'); svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round'); }
    def.d.forEach(function (d) { var path = document.createElementNS(ns, 'path'); path.setAttribute('d', d); svg.appendChild(path); });
    return svg;
  }
  var SCHOOL = '<a class="ext" href="' + P.schoolUrl + '" target="_blank" rel="noopener noreferrer">' + icon('school').outerHTML + 'ISSAT Mahdia</a>';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = 'en';
  var st = { year: 0, sem: 0, road: 0, cat: 'All', topo: 'rt' }; // UI state kept across language changes

  /* ---------- helpers (text only; innerHTML is used only for our own trusted translation templates) ---------- */
  function $(s) { return document.querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function make(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function add(parent, child) { parent.appendChild(child); return child; }
  function clear(sel) { var e = $(sel); e.textContent = ''; return e; }
  // translate a text from data.js; unknown strings (names, proper nouns) stay as they are
  function tr(s) {
    var d = I[lang] && I[lang].t;
    return d && d[s] !== undefined ? d[s] : s;
  }

  /* ---------- static text: remember every text node once, re-translate on demand ---------- */
  var texts = [];
  (function collect() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      var v = n.nodeValue, key = v.trim();
      if (!key || n.parentNode.closest('script,noscript,style,[data-th],[data-notr]')) continue;
      var at = v.indexOf(key);
      texts.push({ n: n, key: key, lead: v.slice(0, at), trail: v.slice(at + key.length) });
    }
  })();
  function applyStatic() {
    texts.forEach(function (t) { t.n.nodeValue = t.lead + tr(t.key) + t.trail; });
  }
  function applyHtml() {
    var d = I[lang] || I.en, year = String(new Date().getFullYear());
    $$('[data-th]').forEach(function (e) {
      var h = (d.html || {})[e.getAttribute('data-th')];
      if (h) e.innerHTML = h.replace(/\{school\}/g, SCHOOL).replace(/\{year\}/g, year);
    });
    document.title = d.title || document.title;
  }

  /* ---------- reusable renderers ---------- */
  function flow(sel, items) {
    var ol = clear(sel);
    items.forEach(function (it) {
      var li = add(ol, make('li'));
      add(li, make('b', '', tr(it[0])));
      add(li, make('span', '', tr(it[1])));
    });
  }
  function chips(sel, items) {
    var ul = clear(sel);
    items.forEach(function (t) { add(ul, make('li', '', tr(t))); });
  }
  function tabset(box, labels, cur, onSelect) {
    box.textContent = '';
    var btns = labels.map(function (label, i) {
      var b = add(box, make('button', '', tr(label)));
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.addEventListener('click', function () { select(i, false); });
      b.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (d) { e.preventDefault(); select((i + d + btns.length) % btns.length, true); }
      });
      return b;
    });
    function select(i, focus) {
      btns.forEach(function (b, j) { b.setAttribute('aria-selected', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
      if (focus) btns[i].focus();
      onSelect(i);
    }
    select(cur, false);
  }

  /* ---------- hero terminal (always English, like a real terminal) ---------- */
  function typeTerminal() {
    var pre = $('#term'), caret = make('span', 'caret');
    pre.textContent = '';
    function prompt() { add(pre, make('span', 'p', '$ ')); }
    if (reduce) {
      S.terminal.forEach(function (l) { prompt(); add(pre, document.createTextNode(l[0] + '\n')); add(pre, make('span', 'o', l[1] + '\n')); });
      prompt(); add(pre, caret); return;
    }
    var li = 0, ci = 0, cur;
    (function next() {
      if (li >= S.terminal.length) { prompt(); add(pre, caret); return; }
      var line = S.terminal[li];
      if (ci === 0) { if (caret.parentNode) pre.removeChild(caret); prompt(); cur = add(pre, make('span')); add(pre, caret); }
      if (ci < line[0].length) { cur.textContent += line[0][ci++]; setTimeout(next, 38); }
      else {
        pre.removeChild(caret);
        add(pre, document.createTextNode('\n'));
        add(pre, make('span', 'o', line[1] + '\n'));
        li++; ci = 0; setTimeout(next, 420);
      }
    })();
  }

  /* ---------- sections ---------- */
  function renderEducation() {
    var yp = $('#yearPanel'), sp = $('#semPanel');
    tabset(clear('#years'), S.years.map(function (y) { return y[0]; }), st.year, function (i) {
      st.year = i; yp.textContent = '';
      add(yp, make('h4', '', tr(S.years[i][1])));
      add(yp, make('p', '', tr(S.years[i][2])));
    });
    tabset(clear('#semTabs'), S.semesters.map(function (s) { return s.id; }), st.sem, function (i) {
      st.sem = i; sp.textContent = '';
      var grid = add(sp, make('div', 'cards'));
      S.semesters[i].groups.forEach(function (g) {   // module names stay in French (official course titles)
        var c = add(grid, make('div', 'card'));
        add(c, make('h4', '', tr(g[0])));
        var ul = add(c, make('ul'));
        g[1].forEach(function (m) { add(ul, make('li', '', m)); });
      });
    });
  }

  function renderCyber() {
    var ca = clear('#cyberAreas');
    S.cyberAreas.forEach(function (a) {
      var c = add(ca, make('div', 'card'));
      add(c, make('h4', '', tr(a[0])));
      add(c, make('p', '', tr(a[1])));
      add(c, make('span', 'status', tr('Learning direction')));
    });
    flow('#cyberFlow', S.cyberFlow);
  }

  function renderTopology() {
    var box = $('#topo'), svg = clear('#topoLines'), info = clear('#topoInfo'), byId = {}, btns = {};
    $$('.node', box).forEach(function (n) { box.removeChild(n); });
    S.topology.nodes.forEach(function (n) { byId[n.id] = n; });
    S.topology.edges.forEach(function (e) {
      var a = byId[e[0]], b = byId[e[1]], l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      l.setAttribute('x1', a.x); l.setAttribute('y1', a.y); l.setAttribute('x2', b.x); l.setAttribute('y2', b.y);
      svg.appendChild(l);
    });
    function show(id) {
      st.topo = id;
      Object.keys(btns).forEach(function (k) { btns[k].setAttribute('aria-pressed', String(k === id)); });
      info.textContent = '';
      add(info, make('h4', '', tr(byId[id].label)));
      add(info, make('p', '', tr(byId[id].text)));
    }
    S.topology.nodes.forEach(function (n) {
      var b = add(box, make('button', 'node', tr(n.label)));
      b.type = 'button'; b.style.left = n.x + '%'; b.style.top = n.y + '%';
      b.addEventListener('click', function () { show(n.id); });
      btns[n.id] = b;
    });
    show(st.topo);
  }

  function drawProjects() {
    var grid = clear('#projectGrid');
    $$('#filters button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-cat') === st.cat)); });
    S.projects.forEach(function (p) {
      if (st.cat !== 'All' && p.cat !== st.cat) return;
      var c = add(grid, make('article', 'card'));
      add(c, make('h4', '', tr(p.name)));
      var meta = add(c, make('p'));
      add(meta, make('span', 'status s-' + p.status.replace(' ', ''), tr(p.status)));
      add(meta, make('span', 'status', tr(p.cat)));
      if (p.example) add(meta, make('span', 'tag', tr('Example')));
      add(c, make('p', '', tr(p.desc)));
      add(c, make('p', 'mono small', p.tech.join(' · ')));
      var links = add(c, make('div', 'links'));
      [['GitHub', p.github, 'github'], ['Demo', p.demo, 'external'], ['Docs', p.docs, 'doc']].forEach(function (l) {
        var el = add(links, make(l[1] ? 'a' : 'span'));
        if (l[1]) { el.href = l[1]; el.rel = 'noopener'; }
        add(el, icon(l[2]));
        add(el, document.createTextNode(l[1] ? tr(l[0]) : tr(l[0]) + ' · ' + tr('soon')));
      });
    });
  }
  function renderProjects() {
    var f = clear('#filters');
    S.projectCats.forEach(function (n) {
      var b = add(f, make('button', '', tr(n)));
      b.type = 'button'; b.setAttribute('data-cat', n);
      b.addEventListener('click', function () { st.cat = n; drawProjects(); });
    });
    drawProjects();
  }

  function renderSkills() {
    var lg = clear('#legend'), grid = clear('#skillGrid');
    S.levels.forEach(function (l, i) { add(lg, make('li', '', (i + 1) + ' = ' + tr(l))); });
    S.skills.forEach(function (g) {
      var c = add(grid, make('div', 'card'));
      add(c, make('h4', '', tr(g[0])));
      g[1].forEach(function (s) {
        var row = add(c, make('div', 'skill')), left = add(row, make('div'));
        add(left, make('span', '', tr(s[0])));
        add(left, make('small', '', tr(S.levels[s[1]])));
        var m = add(row, make('span', 'meter'));
        m.setAttribute('role', 'img'); m.setAttribute('aria-label', tr(S.levels[s[1]]));
        for (var i = 0; i < 5; i++) add(m, make('i', i <= s[1] ? 'f' : ''));
      });
    });
  }

  function renderRoadmap() {
    var rp = $('#roadPanel');
    tabset(clear('#roadTabs'), S.roadmap.map(function (r) { return r[0]; }), st.road, function (i) {
      st.road = i; rp.textContent = '';
      add(rp, make('h4', '', tr(S.roadmap[i][1])));
      var ul = add(rp, make('ul', 'chips'));
      S.roadmap[i][2].forEach(function (t) { add(ul, make('li', '', tr(t))); });
    });
  }

  function renderMisc() {
    var ach = clear('#achList');
    S.achievements.forEach(function (a) {
      var d = add(ach, make('details')), s = add(d, make('summary', '', tr(a)));
      add(s, make('span', 'tag', tr('Coming soon')));
      add(d, make('p', '', tr('Nothing to show yet. This entry will be filled with real, verifiable results.')));
    });
    var goals = clear('#goalList');
    S.goals.forEach(function (g) {
      var c = add(goals, make('div', 'card'));
      add(c, make('h4', '', tr(g[0])));
      add(c, make('p', '', tr(g[1])));
    });
    var rows = [['Email', P.email, 'mailto:' + P.email, 'mail'], ['GitHub', P.github, P.github, 'github'],
                ['LinkedIn', P.linkedin, P.linkedin, 'linkedin'], ['Location', tr(P.location), '', 'pin']];
    var info = clear('#contactInfo'), soc = clear('#socials');
    rows.forEach(function (r) {
      var li = add(info, make('li')), row = add(li, make(r[2] ? 'a' : 'div', 'row'));
      if (r[2]) { row.href = r[2]; row.rel = 'noopener'; }
      add(add(row, make('span', 'tile')), icon(r[3]));
      var txt = add(row, make('span', 'txt'));
      add(txt, make('small', '', tr(r[0])));
      add(txt, make('strong', '', r[1].replace(/^https?:\/\//, '')));
      if (r[2]) {   // icon-only buttons in the footer
        var a = add(soc, make('a')); a.href = r[2]; a.rel = 'noopener'; a.setAttribute('aria-label', tr(r[0]));
        add(a, icon(r[3]));
      }
    });
  }

  function renderAll() {
    flow('#knowledgeFlow', S.knowledgeMap);
    renderEducation(); renderCyber();
    chips('#netTopics', S.netTopics); renderTopology();
    flow('#iotFlow', S.iotFlow); chips('#hardware', S.hardware);
    renderProjects(); renderSkills(); renderRoadmap();
    flow('#labFlow', S.labFlow); chips('#labTools', S.labTools);
    renderMisc();
  }

  /* ---------- contact form ---------- */
  var form = $('#form'), status = $('#formStatus');
  function check(id, errId, ok, msg) {
    var f = $(id), good = ok(f.value.trim());
    $(errId).textContent = good ? '' : tr(msg);
    f.setAttribute('aria-invalid', String(!good));
    return good;
  }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var a = check('#f-name', '#e-name', function (v) { return v.length >= 2 && v.length <= 80; }, 'Please enter your name (2–80 characters).');
    var b = check('#f-email', '#e-email', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }, 'Please enter a valid email address.');
    var c = check('#f-msg', '#e-msg', function (v) { return v.length >= 10 && v.length <= 1500; }, 'Please write at least 10 characters.');
    if (!(a && b && c)) { status.textContent = ''; return; }
    if (/example\.com$/.test(P.email)) { status.textContent = tr('Demo mode: set your real email in js/data.js to enable sending.'); return; }
    var body = $('#f-msg').value.trim() + '\n\nFrom: ' + $('#f-name').value.trim() + ' <' + $('#f-email').value.trim() + '>';
    status.textContent = tr('Opening your email app…');
    window.location.href = 'mailto:' + P.email + '?subject=' + encodeURIComponent(tr('Portfolio contact')) + '&body=' + encodeURIComponent(body);
  });

  /* ---------- language ---------- */
  function setLang(l) {
    lang = l;
    var r = document.documentElement;
    r.lang = l; r.dir = l === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('sitc-lang', l); } catch (e) {}
    applyStatic(); applyHtml(); renderAll();
    $$('.err').forEach(function (e) { e.textContent = ''; });
    $$('#form [aria-invalid]').forEach(function (f) { f.setAttribute('aria-invalid', 'false'); });
    status.textContent = '';
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === l)); });
  }
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  /* ---------- start ---------- */
  $('#ghLink').href = P.github;
  $('#ghLink').insertBefore(icon('github'), $('#ghLink').firstChild);
  var saved = null;
  try { saved = localStorage.getItem('sitc-lang'); } catch (e) {}
  var browser = (navigator.language || 'en').slice(0, 2);
  setLang(LANGS.indexOf(saved) > -1 ? saved : LANGS.indexOf(browser) > -1 ? browser : 'en');
  typeTerminal();

  /* ---------- scroll reveal + active nav ---------- */
  var secs = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    secs.forEach(function (s) { io.observe(s); });
  } else { secs.forEach(function (s) { s.classList.add('in'); }); }
  if ('IntersectionObserver' in window) {
    var links = {};
    $$('#nav a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === e.target.id); });
          links[e.target.id].scrollIntoView({ block: 'nearest', inline: 'center' });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('main section[id]').forEach(function (s) { spy.observe(s); });
  }
})();
