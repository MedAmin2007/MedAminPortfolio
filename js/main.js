(function () {
  'use strict';
  var S = window.SITE, P = S.profile;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers (text only, never innerHTML) ---------- */
  function $(s) { return document.querySelector(s); }
  function make(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function add(parent, child) { parent.appendChild(child); return child; }

  function flow(id, items) {
    var ol = $(id);
    items.forEach(function (it) {
      var li = add(ol, make('li'));
      add(li, make('b', '', it[0]));
      add(li, make('span', '', it[1]));
    });
  }
  function chips(id, items) {
    var ul = $(id);
    items.forEach(function (t) { add(ul, make('li', '', t)); });
  }

  // accessible tab set: buttons + a render callback
  function tabset(box, labels, render, start) {
    var btns = labels.map(function (label, i) {
      var b = add(box, make('button', '', label));
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
      btns.forEach(function (b, j) {
        b.setAttribute('aria-selected', String(i === j));
        b.tabIndex = i === j ? 0 : -1;
      });
      if (focus) btns[i].focus();
      render(i);
    }
    select(start || 0, false);
  }

  /* ---------- hero ---------- */
  $('#ghLink').href = P.github;
  $('#year').textContent = new Date().getFullYear();

  function typeTerminal() {
    var pre = $('#term');
    pre.textContent = '';
    var caret = make('span', 'caret');
    if (reduce) {
      S.terminal.forEach(function (l) {
        add(pre, make('span', 'p', '$ ')); add(pre, document.createTextNode(l[0] + '\n'));
        add(pre, make('span', 'o', l[1] + '\n'));
      });
      add(pre, make('span', 'p', '$ ')); add(pre, caret);
      return;
    }
    var li = 0, ci = 0, cur;
    function next() {
      if (li >= S.terminal.length) { add(pre, make('span', 'p', '$ ')); add(pre, caret); return; }
      var line = S.terminal[li];
      if (ci === 0) {
        if (caret.parentNode) pre.removeChild(caret);
        add(pre, make('span', 'p', '$ '));
        cur = add(pre, make('span'));
        add(pre, caret);
      }
      if (ci < line[0].length) {
        cur.textContent += line[0][ci++];
        setTimeout(next, 38);
      } else {
        pre.removeChild(caret);
        add(pre, document.createTextNode('\n'));
        add(pre, make('span', 'o', line[1] + '\n'));
        li++; ci = 0;
        setTimeout(next, 420);
      }
    }
    next();
  }
  typeTerminal();

  /* ---------- about ---------- */
  flow('#knowledgeFlow', S.knowledgeMap);

  /* ---------- education ---------- */
  var yp = $('#yearPanel');
  tabset($('#years'), S.years.map(function (y) { return y[0]; }), function (i) {
    yp.textContent = '';
    add(yp, make('h4', '', S.years[i][1]));
    add(yp, make('p', '', S.years[i][2]));
  });
  var sp = $('#semPanel');
  tabset($('#semTabs'), S.semesters.map(function (s) { return s.id; }), function (i) {
    sp.textContent = '';
    var grid = add(sp, make('div', 'cards'));
    S.semesters[i].groups.forEach(function (g) {
      var c = add(grid, make('div', 'card'));
      add(c, make('h4', '', g[0]));
      var ul = add(c, make('ul'));
      g[1].forEach(function (m) { add(ul, make('li', '', m)); });
    });
  });

  /* ---------- cybersecurity ---------- */
  var ca = $('#cyberAreas');
  S.cyberAreas.forEach(function (a) {
    var c = add(ca, make('div', 'card'));
    add(c, make('h4', '', a[0]));
    add(c, make('p', '', a[1]));
    add(c, make('span', 'status', 'Learning direction'));
  });
  flow('#cyberFlow', S.cyberFlow);

  /* ---------- networks ---------- */
  chips('#netTopics', S.netTopics);
  (function topology() {
    var box = $('#topo'), svg = $('#topoLines'), info = $('#topoInfo'), byId = {}, btns = {};
    S.topology.nodes.forEach(function (n) { byId[n.id] = n; });
    S.topology.edges.forEach(function (e) {
      var a = byId[e[0]], b = byId[e[1]];
      var l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      l.setAttribute('x1', a.x); l.setAttribute('y1', a.y); l.setAttribute('x2', b.x); l.setAttribute('y2', b.y);
      svg.appendChild(l);
    });
    function show(id) {
      Object.keys(btns).forEach(function (k) { btns[k].setAttribute('aria-pressed', String(k === id)); });
      info.textContent = '';
      add(info, make('h4', '', byId[id].label));
      add(info, make('p', '', byId[id].text));
    }
    S.topology.nodes.forEach(function (n) {
      var b = add(box, make('button', 'node', n.label));
      b.type = 'button';
      b.style.left = n.x + '%'; b.style.top = n.y + '%';
      b.addEventListener('click', function () { show(n.id); });
      btns[n.id] = b;
    });
    show('rt');
  })();

  /* ---------- IoT ---------- */
  flow('#iotFlow', S.iotFlow);
  chips('#hardware', S.hardware);

  /* ---------- projects ---------- */
  var grid = $('#projectGrid'), cat = 'All', fbtn = [];
  function drawProjects() {
    grid.textContent = '';
    fbtn.forEach(function (b) { b.setAttribute('aria-pressed', String(b.textContent === cat)); });
    S.projects.forEach(function (p) {
      if (cat !== 'All' && p.cat !== cat) return;
      var c = add(grid, make('article', 'card'));
      add(c, make('h4', '', p.name));
      var meta = add(c, make('p'));
      add(meta, make('span', 'status s-' + p.status.replace(' ', ''), p.status));
      add(meta, make('span', 'status', p.cat));
      if (p.example) add(meta, make('span', 'tag', 'Example'));
      add(c, make('p', '', p.desc));
      add(c, make('p', 'mono small', p.tech.join(' · ')));
      var links = add(c, make('div', 'links'));
      [['GitHub', p.github], ['Demo', p.demo], ['Docs', p.docs]].forEach(function (l) {
        if (l[1]) { var a = add(links, make('a', '', l[0])); a.href = l[1]; a.rel = 'noopener'; }
        else add(links, make('span', '', l[0] + ' · soon'));
      });
    });
  }
  S.projectCats.forEach(function (n) {
    var b = add($('#filters'), make('button', '', n));
    b.type = 'button';
    b.addEventListener('click', function () { cat = n; drawProjects(); });
    fbtn.push(b);
  });
  drawProjects();

  /* ---------- skills ---------- */
  S.levels.forEach(function (l, i) { add($('#legend'), make('li', '', (i + 1) + ' = ' + l)); });
  S.skills.forEach(function (g) {
    var c = add($('#skillGrid'), make('div', 'card'));
    add(c, make('h4', '', g[0]));
    g[1].forEach(function (s) {
      var row = add(c, make('div', 'skill'));
      var left = add(row, make('div'));
      add(left, make('span', '', s[0]));
      add(left, make('small', '', S.levels[s[1]]));
      var m = add(row, make('span', 'meter'));
      m.setAttribute('role', 'img');
      m.setAttribute('aria-label', S.levels[s[1]]);
      for (var i = 0; i < 5; i++) add(m, make('i', i <= s[1] ? 'f' : ''));
    });
  });

  /* ---------- roadmap ---------- */
  var rp = $('#roadPanel');
  tabset($('#roadTabs'), S.roadmap.map(function (r) { return r[0]; }), function (i) {
    rp.textContent = '';
    add(rp, make('h4', '', S.roadmap[i][1]));
    var ul = add(rp, make('ul', 'chips'));
    S.roadmap[i][2].forEach(function (t) { add(ul, make('li', '', t)); });
  });

  /* ---------- lab ---------- */
  flow('#labFlow', S.labFlow);
  chips('#labTools', S.labTools);

  /* ---------- achievements & goals ---------- */
  S.achievements.forEach(function (a) {
    var d = add($('#achList'), make('details'));
    var s = add(d, make('summary', '', a));
    add(s, make('span', 'tag', 'Coming soon'));
    add(d, make('p', '', 'Nothing to show yet. This entry will be filled with real, verifiable results.'));
  });
  S.goals.forEach(function (g) {
    var c = add($('#goalList'), make('div', 'card'));
    add(c, make('h4', '', g[0]));
    add(c, make('p', '', g[1]));
  });

  /* ---------- contact ---------- */
  var info = $('#contactInfo');
  [['Email', P.email, 'mailto:' + P.email], ['GitHub', P.github, P.github], ['LinkedIn', P.linkedin, P.linkedin], ['Location', P.location, '']]
    .forEach(function (r) {
      var li = add(info, make('li'));
      add(li, make('span', '', r[0]));
      if (r[2]) { var a = add(li, make('a', '', r[1])); a.href = r[2]; a.rel = 'noopener'; }
      else add(li, document.createTextNode(r[1]));
    });

  var form = $('#form'), status = $('#formStatus');
  function check(id, errId, ok, msg) {
    var f = $(id), e = $(errId), good = ok(f.value.trim());
    e.textContent = good ? '' : msg;
    f.setAttribute('aria-invalid', String(!good));
    return good;
  }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var a = check('#f-name', '#e-name', function (v) { return v.length >= 2 && v.length <= 80; }, 'Please enter your name (2–80 characters).');
    var b = check('#f-email', '#e-email', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }, 'Please enter a valid email address.');
    var c = check('#f-msg', '#e-msg', function (v) { return v.length >= 10 && v.length <= 1500; }, 'Please write at least 10 characters.');
    if (!(a && b && c)) { status.textContent = ''; return; }
    if (/example\.com$/.test(P.email)) {
      status.textContent = 'Demo mode: set your real email in js/data.js to enable sending.';
      return;
    }
    var body = $('#f-msg').value.trim() + '\n\nFrom: ' + $('#f-name').value.trim() + ' <' + $('#f-email').value.trim() + '>';
    status.textContent = 'Opening your email app…';
    window.location.href = 'mailto:' + P.email + '?subject=' + encodeURIComponent('Portfolio contact') + '&body=' + encodeURIComponent(body);
  });

  /* ---------- scroll reveal + active nav ---------- */
  var secs = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    secs.forEach(function (s) { io.observe(s); });
  } else {
    secs.forEach(function (s) { s.classList.add('in'); });
  }
  if ('IntersectionObserver' in window) {
    var links = {};
    document.querySelectorAll('#nav a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === e.target.id); });
          var nv = $('#nav'), ln = links[e.target.id];
          if (nv.scrollTo) nv.scrollTo({ left: ln.offsetLeft - nv.clientWidth / 2 + ln.clientWidth / 2, behavior: 'smooth' });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });
  }
})();
