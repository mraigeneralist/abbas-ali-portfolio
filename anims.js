/* Motion-graphic builders. Each builder fills a stage element and returns {interval, steps[], still}.
   A Loop runs steps on a timer, can be paused off-screen, and sped up on hover. */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const q = (el, s) => el.querySelector(s);
  const qa = (el, s) => [...el.querySelectorAll(s)];
  const restart = (n, c) => { n.classList.remove(c); void n.offsetWidth; n.classList.add(c); };
  const PAL = ['var(--zd-pink)', 'var(--zd-teal)', 'var(--zd-yellow)', 'var(--zd-lime)', 'var(--zd-stone)', 'var(--zd-cream)'];

  function countTo(node, to, o = {}) {
    const dec = o.dec || 0, dur = o.dur || 1200, from = o.from || 0, pre = o.prefix || '', suf = o.suffix || '';
    const fmt = v => pre + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-IN')) + suf;
    if (RM) { node.textContent = fmt(to); return; }
    const t0 = performance.now();
    const f = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); node.textContent = fmt(from + (to - from) * e); if (p < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }

  class Loop {
    constructor(el, def) { this.el = el; this.def = def; this.i = 0; this.t = null; this.speed = 1; this.running = false; this.stilled = false; el.classList.add('paused'); }
    start() {
      if (this.running) return; this.running = true; this.el.classList.remove('paused');
      if (RM) { if (!this.stilled) this.still(); return; }
      this.tick();
    }
    tick() {
      const d = this.def, n = d.steps.length, k = this.i % n;
      d.steps[k](); this.i++;
      const iv = Array.isArray(d.interval) ? d.interval[k] : d.interval;
      this.t = setTimeout(() => this.tick(), iv / this.speed);
    }
    stop() { this.running = false; clearTimeout(this.t); this.el.classList.add('paused'); }
    still() { this.stilled = true; const d = this.def, n = d.still ?? Math.floor(d.steps.length / 2); for (let k = 0; k <= n; k++) d.steps[k](); }
    setSpeed(s) {
      this.speed = s; this.el.style.setProperty('--spd', s);
      if (this.running && !RM) { clearTimeout(this.t); this.t = setTimeout(() => this.tick(), 120); }
    }
    destroy() { this.stop(); }
  }

  /* ---------------- skills ---------------- */
  const skill = {
    html(el) {
      const tags = ['<body>', '<header>', '</header>', '<main>', '<article>', '</article>', '</main>', '</body>'], ind = [0, 1, 1, 1, 2, 2, 1, 0];
      el.innerHTML = `<div class="a-split"><div class="a-code">${tags.map((t, i) => `<div class="ln" style="padding-left:${ind[i] * 12}px">${t.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`).join('')}</div><div class="a-page"><div class="bx b-body"><div class="bx b-header"></div><div class="bx b-main"><div class="bx b-art"></div></div></div></div></div>`;
      const ln = qa(el, '.ln'), bx = k => q(el, '.b-' + k);
      const map = [['body', 'on'], ['header', 'on'], ['header', 'done'], ['main', 'on'], ['art', 'on'], ['art', 'done'], ['main', 'done'], ['body', 'done']];
      const steps = map.map(([k, c], i) => () => { ln[i].classList.add('on'); bx(k).classList.add(c); });
      steps.push(() => {}, () => { ln.forEach(l => l.classList.remove('on')); qa(el, '.bx').forEach(b => b.classList.remove('on', 'done')); });
      return { interval: 520, steps, still: 7 };
    },
    css(el) {
      el.innerHTML = `<div class="a-split"><div class="a-code a-rule"><div>.box {</div><div class="rl">&nbsp;</div><div>}</div></div><div class="a-cssbox"><div class="cbox"></div></div></div>`;
      const rl = q(el, '.rl'), b = q(el, '.cbox');
      const S = [['background', 'var(--zd-pink)', 'background', 'pink'], ['borderRadius', '50%', 'radius', '50%'], ['width', '78px', 'width', '78px'], ['transform', 'rotate(45deg)', 'rotate', '45deg'], ['background', 'var(--zd-yellow)', 'background', 'gold']];
      const steps = S.map(([p, v, k, t]) => () => { rl.innerHTML = `&nbsp;&nbsp;<i>${k}</i>: ${t};`; restart(rl, 'flash'); b.style[p] = v; });
      steps.push(() => {}, () => { rl.innerHTML = '&nbsp;&nbsp;/* reset */'; b.removeAttribute('style'); });
      return { interval: 950, steps, still: 3 };
    },
    js(el) {
      el.innerHTML = `<div class="a-pipe"><div class="pp-code"><span class="pp-arr">nums</span><span class="pp-m" data-k="map">.map(x =&gt; x * 2)</span><span class="pp-m" data-k="filter">.filter(x =&gt; x &gt; 4)</span><span class="pp-m" data-k="reduce">.reduce((a, b) =&gt; a + b)</span></div><div class="pp-row"></div></div>`;
      const row = q(el, '.pp-row'), ms = qa(el, '.pp-m'), C = ['var(--zd-pink)', 'var(--zd-teal)', 'var(--zd-yellow)', 'var(--zd-lime)', 'var(--zd-stone)'];
      const render = (vals, cls) => { row.innerHTML = vals.map((n, i) => `<b class="pp-c ${cls || ''}" style="background:${C[i % 5]};--i:${i}">${n}</b>`).join(''); };
      const hi = k => ms.forEach(m => m.classList.toggle('on', m.dataset.k === k));
      const steps = [
        () => { hi(null); render([1, 2, 3, 4, 5], 'in'); },
        () => { hi('map'); render([2, 4, 6, 8, 10], 'flip'); },
        () => { hi('filter'); qa(row, '.pp-c').forEach(c => { if (+c.textContent <= 4) c.classList.add('out'); }); },
        () => { render([6, 8, 10]); },
        () => { hi('reduce'); row.innerHTML = '<b class="pp-c big in" style="background:var(--zd-yellow)">24</b>'; },
        () => {}
      ];
      return { interval: [900, 1000, 700, 700, 1300, 900], steps, still: 4 };
    },
    ts(el) {
      el.innerHTML = `<div class="a-code a-full"><div><i>function</i> total(a: <u>number</u>, b: <u>number</u>)</div><div>&nbsp;&nbsp;<i>return</i> a + b</div><div class="call">total(<span class="arg">"2"</span>, 3)</div><div class="tsmsg"></div></div>`;
      const arg = q(el, '.arg'), m = q(el, '.tsmsg');
      const steps = [
        () => { arg.textContent = '"2"'; arg.className = 'arg'; m.className = 'tsmsg'; m.textContent = ''; },
        () => { arg.classList.add('err'); m.className = 'tsmsg bad'; m.textContent = '✗ string is not assignable to number'; },
        () => { arg.classList.remove('err'); arg.textContent = '2'; arg.classList.add('fix'); m.className = 'tsmsg'; },
        () => { m.className = 'tsmsg ok'; m.textContent = '✓ 0 errors · compiled'; },
        () => {}
      ];
      return { interval: 1100, steps, still: 3 };
    },
    react(el) {
      el.innerHTML = `<div class="a-tree"><div class="a-state">renders: <b>0</b></div><div class="tr"><span class="nd">&lt;App/&gt;</span></div><div class="tr"><span class="nd">&lt;Nav/&gt;</span><span class="nd lst">&lt;List/&gt;</span></div><div class="tr"><span class="nd it">&lt;Item/&gt;</span><span class="nd it">&lt;Item/&gt;</span><span class="nd it">&lt;Item/&gt;</span></div></div>`;
      const rows = qa(el, '.tr'), st = q(el, '.a-state b'); let c = 0;
      const flash = () => { qa(el, '.lst,.it').forEach((n, i) => { n.style.animationDelay = i * 70 + 'ms'; restart(n, 'flash'); }); st.textContent = ++c; };
      const steps = [() => rows[0].classList.add('on'), () => rows[1].classList.add('on'), () => rows[2].classList.add('on'), flash, flash, flash, () => { rows.forEach(r => r.classList.remove('on')); c = 0; st.textContent = 0; }];
      return { interval: 800, steps, still: 3 };
    },
    responsive(el) {
      el.innerHTML = `<div class="a-resp"><div class="rf" data-bp="d"><div class="rf-bar"></div><div class="rf-grid"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div><div class="rl-bp">1280px · desktop</div></div>`;
      const f = q(el, '.rf'), l = q(el, '.rl-bp');
      const W = [['96%', 'd', '1280px · desktop'], ['64%', 't', '768px · tablet'], ['36%', 'm', '375px · mobile'], ['64%', 't', '768px · tablet']];
      return { interval: 1400, steps: W.map(([w, c, t]) => () => { f.style.width = w; f.dataset.bp = c; l.textContent = t; }), still: 1 };
    },
    node(el) {
      el.innerHTML = `<div class="a-net"><div class="nb">client</div><div class="wire"><span class="pk req">GET /api/orders</span><span class="pk res">200 · 32ms</span></div><div class="nb srv">node</div></div>`;
      const rq = q(el, '.req'), rs = q(el, '.res'), s = q(el, '.srv');
      const steps = [() => rq.classList.add('go'), () => s.classList.add('busy'), () => { s.classList.remove('busy'); rs.classList.add('go'); }, () => {}, () => { rq.classList.remove('go'); rs.classList.remove('go'); }];
      return { interval: [900, 550, 900, 500, 300], steps, still: 2 };
    },
    db(el) {
      const R = [[1, 'aisha', 'pro'], [2, 'ravi', 'free'], [3, 'meera', 'pro'], [4, 'john', 'free']];
      el.innerHTML = `<div class="a-db"><div class="qb">CREATE TABLE users …</div><table><thead><tr><th>id</th><th>name</th><th>plan</th></tr></thead><tbody></tbody></table></div>`;
      const tb = q(el, 'tbody'), qb = q(el, '.qb');
      const steps = R.map(r => () => { qb.classList.remove('sel'); qb.textContent = `INSERT (${r[0]}, '${r[1]}', '${r[2]}')`; const tr = document.createElement('tr'); tr.dataset.plan = r[2]; tr.innerHTML = r.map(c => `<td>${c}</td>`).join(''); tb.appendChild(tr); });
      steps.push(() => { qb.textContent = "SELECT * WHERE plan = 'pro'"; qb.classList.add('sel'); qa(tb, 'tr').forEach(t => t.classList.add(t.dataset.plan === 'pro' ? 'hit' : 'miss')); }, () => {}, () => { tb.innerHTML = ''; qb.classList.remove('sel'); qb.textContent = 'CREATE TABLE users …'; });
      return { interval: 700, steps, still: 4 };
    },
    git(el) {
      el.innerHTML = `<div class="a-git"><svg viewBox="0 0 240 130" aria-hidden="true">
        <path class="gp m" pathLength="1" d="M12 92 H228"/>
        <path class="gp f" pathLength="1" d="M58 92 C78 92 74 42 96 42 H150 C172 42 168 92 190 92"/>
        <circle class="gc m" cx="30" cy="92" r="7"/><circle class="gc m" cx="58" cy="92" r="7"/><circle class="gc fc" cx="104" cy="42" r="7"/><circle class="gc m" cx="122" cy="92" r="7"/><circle class="gc fc" cx="140" cy="42" r="7"/><circle class="gc m" cx="190" cy="92" r="10"/><circle class="gc m" cx="216" cy="92" r="7"/>
        <text class="gt" x="12" y="118">main</text><text class="gt" x="96" y="26">feature/cart</text><text class="gt" x="170" y="118">merged</text></svg></div>`;
      const [pm, pf] = qa(el, '.gp'), c = qa(el, '.gc'), t = qa(el, '.gt'), on = n => n.classList.add('on');
      const steps = [() => { on(pm); on(t[0]); }, () => on(c[0]), () => on(c[1]), () => { on(pf); on(t[1]); }, () => on(c[2]), () => on(c[3]), () => on(c[4]), () => { on(c[5]); on(t[2]); }, () => on(c[6]), () => {}, () => qa(el, '.on').forEach(n => n.classList.remove('on'))];
      return { interval: 520, steps, still: 8 };
    },
    tests(el) {
      const T = ['renders cart', 'applies coupon', 'handles 401', 'checkout flow'];
      el.innerHTML = `<div class="a-tests">${T.map(t => `<div class="tt"><i class="st"></i><span>${t}</span></div>`).join('')}<div class="tsum">jest --watch</div></div>`;
      const r = qa(el, '.tt'), sum = q(el, '.tsum'), set = (i, s) => r[i].dataset.s = s, S = (t, s) => { sum.textContent = t; sum.dataset.s = s || ''; };
      const steps = [() => set(0, 'run'), () => set(0, 'pass'), () => set(1, 'run'), () => set(1, 'pass'), () => set(2, 'run'), () => { set(2, 'fail'); S('1 failed · 2 passed', 'fail'); }, () => { set(2, 'run'); S('re-running…'); }, () => set(2, 'pass'), () => set(3, 'run'), () => { set(3, 'pass'); S('4 passed · 1.2s', 'pass'); }, () => {}, () => { r.forEach(x => x.dataset.s = ''); S('jest --watch'); }];
      return { interval: 460, steps, still: 9 };
    },
    comms(el) {
      const M = [['l', 'Can we ship v2 Friday?'], ['r', 'Yes. 3 must-haves now, 2 next sprint.'], ['l', 'Perfect. Demo Thursday?'], ['r', 'Booked. Notes are in the doc.']];
      el.innerHTML = '<div class="a-chat"></div>'; const c = q(el, '.a-chat');
      const steps = M.map(([s, t]) => () => { const b = document.createElement('div'); b.className = 'bub ' + s; b.textContent = t; c.appendChild(b); });
      steps.push(() => {}, () => { c.innerHTML = ''; });
      return { interval: 1000, steps, still: 3 };
    },
    mentor(el) {
      el.innerHTML = `<div class="a-pr"><div class="pr-h"><b>#482</b> Extract useCart hook</div><div class="pr-code"><div>- const [c, setC] = useState()</div><div>+ const cart = useCart()</div></div><div class="pr-c"></div><div class="stamp">Approved</div></div>`;
      const pc = q(el, '.pr-c'), st = q(el, '.stamp');
      const add = (w, t) => () => { const d = document.createElement('div'); d.className = 'cm ' + w; d.innerHTML = `<i>${w === 'j' ? 'JR' : 'AA'}</i>${t}`; pc.appendChild(d); };
      const steps = [add('a', 'Nice. Memoise the total too?'), add('j', 'Done, plus a test for it.'), () => st.classList.add('on'), () => {}, () => { pc.innerHTML = ''; st.classList.remove('on'); }];
      return { interval: 1100, steps, still: 2 };
    }
  };

  /* ---------------- projects ---------------- */
  const project = {
    stream(el) {
      const T = [['NIGHT SHIFT', 'var(--zd-pink)'], ['THE LAST ARCHIVE', 'var(--zd-teal)'], ['MONSOON CITY', 'var(--zd-yellow)'], ['PAPER KITES', 'var(--zd-lime)']];
      const tiles = off => Array.from({ length: 7 }, (_, i) => `<i style="background:${PAL[(i + off) % 6]}"></i>`).join('');
      el.innerHTML = `<div class="p-stream"><div class="ps-nav">reelhouse<span></span><span></span><span></span></div><div class="ps-hero"><div class="ps-bg"></div><div class="ps-t"><small>NEW RELEASE</small><strong></strong><em>▶ Play</em></div></div><div class="ps-row"><div class="ps-track">${tiles(0)}${tiles(0)}</div></div><div class="ps-row r2"><div class="ps-track">${tiles(3)}${tiles(3)}</div></div></div>`;
      const bg = q(el, '.ps-bg'), box = q(el, '.ps-t'), t = q(el, '.ps-t strong');
      return { interval: 2400, still: 0, steps: T.map(([n, c]) => () => { bg.style.background = c; t.textContent = n; restart(box, 'in'); }) };
    },
    shop(el) {
      const P = [['Keyboard', '₹4,999', 'var(--zd-teal)'], ['Headset', '₹2,499', 'var(--zd-pink)'], ['Desk lamp', '₹1,299', 'var(--zd-yellow)']];
      el.innerHTML = `<div class="p-shop"><div class="sh-bar">stockpile<div class="sh-cart">Cart <span class="sh-n">0</span></div></div><div class="sh-grid">${P.map(([n, p, c]) => `<div class="sh-p"><div class="sh-img" style="background:${c}"></div><div class="sh-name">${n}</div><div class="sh-price">${p}</div><span class="sh-add">Add</span></div>`).join('')}</div><div class="sh-toast">Added to cart</div></div>`;
      const adds = qa(el, '.sh-add'), badge = q(el, '.sh-n'), toast = q(el, '.sh-toast'), root = q(el, '.p-shop'); let n = 0;
      const bump = () => { n++; badge.textContent = n; restart(badge, 'bump'); toast.classList.add('on'); setTimeout(() => toast.classList.remove('on'), 900); };
      const add = i => () => {
        const b = adds[i]; b.classList.add('done'); b.textContent = '✓ Added';
        if (RM) { bump(); return; }
        const r = root.getBoundingClientRect(), a = b.getBoundingClientRect(), c = badge.getBoundingClientRect();
        const d = document.createElement('i'); d.className = 'sh-dot';
        const x = a.left + a.width / 2 - r.left, y = a.top + a.height / 2 - r.top;
        d.style.left = x + 'px'; d.style.top = y + 'px';
        d.style.setProperty('--dx', (c.left + c.width / 2 - r.left - x) + 'px'); d.style.setProperty('--dy', (c.top + c.height / 2 - r.top - y) + 'px');
        d.addEventListener('animationend', () => { d.remove(); bump(); }); root.appendChild(d);
      };
      const reset = () => { n = 0; badge.textContent = 0; adds.forEach(b => { b.classList.remove('done'); b.textContent = 'Add'; }); };
      return { interval: [1300, 1300, 1300, 1400, 600], steps: [add(0), add(1), add(2), () => {}, reset], still: 2 };
    },
    weather(el) {
      const C = [['Hyderabad', 34, 'sun', 'Sunny · feels 37°', [34, 35, 33, 31, 34]], ['London', 12, 'rain', 'Light rain', [12, 10, 11, 14, 13]], ['Tokyo', 22, 'cloud', 'Overcast', [22, 24, 21, 19, 23]]];
      const D = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
      el.innerHTML = `<div class="p-wx" data-w="sun"><div class="wx-top"><div><div class="wx-city">—</div><div class="wx-cond"></div></div><div class="wx-ico"><i class="sun"></i><i class="cl2"></i><i class="cl"></i><i class="drops"><b></b><b></b><b></b></i></div></div><div class="wx-temp"><span>0</span>°</div><div class="wx-days">${D.map(d => `<div class="wx-d"><i></i><small>${d}</small></div>`).join('')}</div></div>`;
      const w = q(el, '.p-wx'), city = q(el, '.wx-city'), cond = q(el, '.wx-cond'), tn = q(el, '.wx-temp span'), bars = qa(el, '.wx-d i'); let last = 0;
      return { interval: 2700, still: 0, steps: C.map(([c, t, k, d, days]) => () => { w.dataset.w = k; city.textContent = c; cond.textContent = d; countTo(tn, t, { from: last, dur: 900 }); last = t; bars.forEach((b, i) => b.style.transform = `scaleY(${(days[i] / 40).toFixed(2)})`); }) };
    },
    chat(el) {
      const M = [['l', 'Priya', 'Standup in 5?'], ['r', 'Abbas', 'Joining. Pushing the fix now'], ['l', 'Sam', 'Build is green'], ['r', 'Abbas', 'Deployed ✓']];
      el.innerHTML = `<div class="p-chat"><div class="ch-h"><i></i><b>#frontend</b><small>4 online</small></div><div class="ch-list"></div></div>`;
      const list = q(el, '.ch-list'); let typing = null;
      const trim = () => { while (list.children.length > 4) list.firstChild.remove(); };
      const steps = [];
      M.forEach(([s, who, t]) => {
        steps.push(() => { typing = document.createElement('div'); typing.className = 'msg typing ' + s; typing.innerHTML = '<b></b><b></b><b></b>'; list.appendChild(typing); trim(); });
        steps.push(() => { if (typing) typing.remove(); const m = document.createElement('div'); m.className = 'msg ' + s; m.innerHTML = `<small>${who}</small>${t}`; list.appendChild(m); trim(); });
      });
      steps.push(() => {}, () => { list.innerHTML = ''; });
      return { interval: [900, 700, 900, 700, 900, 700, 900, 700, 1400, 300], steps, still: 7 };
    },
    kanban(el) {
      const cards = [{ t: 'Route API', c: 0, col: 'var(--zd-pink)' }, { t: 'Map view', c: 0, col: 'var(--zd-yellow)' }, { t: 'Driver app', c: 0, col: '#fff' }, { t: 'Auth', c: 1, col: 'var(--zd-teal)' }, { t: 'CSV export', c: 2, col: 'var(--zd-lime)' }];
      const init = cards.map(c => c.c);
      el.innerHTML = `<div class="p-kb"><div class="kb-cols"><div class="kb-col">To do</div><div class="kb-col">Doing</div><div class="kb-col">Done</div></div><div class="kb-layer">${cards.map(c => `<div class="kb-card" style="--c:${c.col}">${c.t}<small></small></div>`).join('')}</div></div>`;
      const nodes = qa(el, '.kb-card'); let seq = 0; cards.forEach((c, i) => c.o = i);
      const layout = () => [0, 1, 2].forEach(col => cards.filter(c => c.c === col).sort((a, b) => a.o - b.o).forEach((c, r) => { const n = nodes[cards.indexOf(c)]; n.style.setProperty('--x', col); n.style.setProperty('--y', r); }));
      layout();
      const move = (i, to) => () => { const n = nodes[i]; n.classList.add('lift'); cards[i].c = to; cards[i].o = 100 + ++seq; layout(); setTimeout(() => n.classList.remove('lift'), 500); };
      const reset = () => { cards.forEach((c, i) => { c.c = init[i]; c.o = i; }); layout(); };
      return { interval: 1100, steps: [move(3, 2), move(0, 1), move(1, 1), move(0, 2), move(2, 1), move(1, 2), () => {}, reset], still: 3 };
    },
    dash(el) {
      el.innerHTML = `<div class="p-dash"><div class="pd-kpis"><div><small>Revenue</small><b>0</b></div><div><small>Active users</small><b>0</b></div><div><small>Churn</small><b>0</b></div></div><div class="pd-charts"><svg class="pd-line" viewBox="0 0 200 90" preserveAspectRatio="none" aria-hidden="true"><polyline class="f" pathLength="1"/><polyline pathLength="1"/></svg><div class="pd-bars">${'<i></i>'.repeat(7)}</div></div></div>`;
      const k = qa(el, '.pd-kpis b'), lines = qa(el, 'polyline'), bars = qa(el, '.pd-bars i');
      const pts = () => Array.from({ length: 9 }, (_, i) => `${i * 25},${(15 + Math.random() * 60).toFixed(0)}`).join(' ');
      const draw = () => {
        lines.forEach(l => { l.classList.remove('on'); l.setAttribute('points', pts()); });
        void el.offsetWidth; lines.forEach((l, i) => setTimeout(() => l.classList.add('on'), i * 250));
        bars.forEach(b => b.style.transform = `scaleY(${(0.2 + Math.random() * 0.8).toFixed(2)})`);
        countTo(k[0], 60 + Math.random() * 40, { dec: 1, prefix: '₹', suffix: 'L', dur: 1100 });
        countTo(k[1], 8000 + Math.random() * 6000, { dur: 1100 });
        countTo(k[2], 1 + Math.random() * 2, { dec: 1, suffix: '%', dur: 1100 });
      };
      return { interval: [3000, 400], steps: [draw, () => {}], still: 0 };
    }
  };

  /* ---------------- hobbies (CSS-only loops) ---------------- */
  const hobby = {
    cricket: '<div class="hb-a"><i class="ck-ground"></i><i class="ck-bat"></i><i class="ck-ball"></i></div>',
    camera: '<div class="hb-a"><i class="cm-burst"></i><i class="cm-top"></i><i class="cm-body"></i><i class="cm-lens"></i><i class="cm-flash"></i></div>',
    cook: '<div class="hb-a"><i class="ck-pot"></i><i class="ck-lid"></i><i class="ck-st"></i><i class="ck-st"></i><i class="ck-st"></i></div>',
    cycle: '<div class="hb-a"><i class="cy-g"></i><i class="cy-w a"></i><i class="cy-w b"></i><i class="cy-f"></i></div>',
    chess: '<div class="hb-a"><div class="chb"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><i class="ch-k"></i></div>',
    pen: '<div class="hb-a"><i class="pn-line"></i><i class="pn-dot"></i><i class="pn-pen"></i></div>'
  };

  window.ANIM = { Loop, skill, project, hobby, countTo, RM };
})();
