/* Rendering + interaction. Content comes from data.js (window.PORTFOLIO). */
(function () {
  const D = window.PORTFOLIO, A = window.ANIM, RM = A.RM;
  const $ = s => document.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const SMALL = () => innerWidth < 760;
  const projById = Object.fromEntries(D.projects.map(p => [p.id, p]));

  const ICONS = {
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    twitter: '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    ext: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"/>'
  };
  const ico = (k, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`;

  /* ---------- toast ---------- */
  let toastT;
  const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600); };

  /* ---------- render ---------- */
  const P = D.profile;
  $('#heroName').innerHTML = P.name.split(' ').join('<br>');
  $('#titleSr').textContent = P.title;
  $('#heroValue').textContent = P.value;
  $('#heroPerk').innerHTML = P.perk;
  $('#availTxt').textContent = P.availability;
  $('#resumeBtn').addEventListener('click', e => { if (!P.resume) { e.preventDefault(); toast('Resume PDF coming soon. Add the file path in data.js.'); } });
  if (P.resume) { $('#resumeBtn').href = P.resume; $('#resumeBtn').setAttribute('download', ''); }

  const navHtml = D.nav.map((n, i) => `<li><a href="#${n.id}" data-t="${n.id}" style="--i:${i}">${n.label}</a></li>`).join('');
  $('#navLinks').innerHTML = navHtml; $('#mmLinks').innerHTML = navHtml;
  $('#footLinks').innerHTML = D.nav.map(n => `<a href="#${n.id}">${n.label}</a>`).join('');

  const rib = D.marquee.map(t => `<span>${t}</span>`).join('');
  $('#ribbon').innerHTML = rib + rib;

  $('#aboutCopy').innerHTML = `<p class="about-lead rv">${D.about.lead}</p>` + D.about.paras.map((p, i) => `<p class="rv" style="--d:${i + 1}">${p}</p>`).join('');
  $('#workList').innerHTML = D.about.style.map(s => `<li>${s}</li>`).join('');
  const statBg = ['var(--zd-lime)', 'var(--zd-teal)', 'var(--zd-yellow)', 'var(--zd-pink)'];
  $('#stats').innerHTML = D.stats.map((s, i) => `<div class="stat rv" style="--d:${i};background:${statBg[i % 4]}"><b data-count="${s.n}" data-suffix="${s.suffix || ''}">0</b><span>${s.label}</span></div>`).join('');

  // skills
  const groups = ['All', ...D.skillGroups];
  $('#skillFilter').innerHTML = groups.map((g, i) => `<button class="chip" aria-pressed="${i === 0}" data-g="${g}">${g}<span class="n">${g === 'All' ? D.skills.length : D.skills.filter(s => s.group === g).length}</span></button>`).join('');
  $('#skillsGrid').innerHTML = D.skills.map((s, i) => `
    <article class="card skill rv" style="--d:${i % 4}" data-g="${s.group}" data-id="${s.id}">
      <div class="stage" style="--bg:${s.color}" data-skill="${s.anim}" aria-hidden="true"></div>
      <div class="sk-body">
        <div class="sk-top"><h3>${s.name}</h3><span class="tag">${s.group}</span></div>
        <div class="sk-meta"><span><b data-count="${s.years}">0</b> yrs</span><span><b data-count="${s.level}">0</b>% · ${s.label}</span></div>
        <div class="bar" role="img" aria-label="${s.name} proficiency ${s.level} percent, ${s.years} years"><i style="--v:${s.level / 100}"></i></div>
        <button class="sk-toggle" aria-expanded="false" aria-controls="sk-${s.id}">Details <b aria-hidden="true">+</b></button>
        <div class="sk-more" id="sk-${s.id}"><div><p>${s.desc}</p><h4>Used in</h4><div class="tags">${s.projects.map(p => `<button class="tag" data-open="${p}">${projById[p].title}</button>`).join('')}</div></div></div>
      </div>
    </article>`).join('');

  // projects
  $('#catFilter').innerHTML = ['All', ...D.projectCategories].map((c, i) => `<button class="chip" aria-pressed="${i === 0}" data-c="${c}">${c}</button>`).join('');
  $('#techFilter').innerHTML = ['Any', ...D.projectTech].map((t, i) => `<button class="chip" aria-pressed="${i === 0}" data-t="${t}">${t}</button>`).join('');
  $('#projGrid').innerHTML = D.projects.map((p, i) => `
    <article class="card pcard rv" style="--d:${i % 3}" data-id="${p.id}" data-cat="${p.category}" data-tech="${p.stack.join('|')}">
      <div class="thumb"><div class="stage-p" data-project="${p.anim}" aria-hidden="true"></div>
        <div class="quick"><div class="tags">${p.stack.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          <div class="row"><a class="mini" href="${p.live}" aria-label="${p.title} live demo">Live ${ico('ext', 14)}</a><a class="mini alt" href="${p.code}" aria-label="${p.title} source code">${ico('github', 14)} Code</a></div></div></div>
      <div class="p-body">
        <div class="p-top"><span class="tag" style="background:${p.color}">${p.category}</span><span>${p.year}</span></div>
        <h3>${p.title}</h3><p>${p.summary}</p>
        <button class="p-open" data-open="${p.id}" aria-haspopup="dialog">View case study <span aria-hidden="true">→</span></button>
      </div>
    </article>`).join('') + '<p class="empty" id="projEmpty" hidden>No projects match that combo. Try another filter.</p>';

  // timeline
  const tlItem = (i, inner) => `<div class="tl-item ${i % 2 ? 'right' : ''}"><span class="tl-node" aria-hidden="true"></span><article class="card tl-card rv ${i % 2 ? 'r' : 'l'}">${inner}</article></div>`;
  const track = '<div class="tl-track" aria-hidden="true"><div class="tl-fill"></div></div>';
  $('#tlExp').innerHTML = track + D.experience.map((e, i) => tlItem(i, `<span class="when">${e.dates}</span><h4>${e.title}</h4><div class="org">${e.company} <small>· ${e.location}</small></div><p>${e.summary}</p><h5>Responsibilities</h5><ul class="bul">${e.resp.map(r => `<li>${r}</li>`).join('')}</ul><h5>Wins</h5><ul class="bul wins">${e.wins.map(r => `<li>${r}</li>`).join('')}</ul>`)).join('');
  $('#tlInt').innerHTML = track + D.internships.map((e, i) => tlItem(i, `<span class="when">${e.dates} · ${e.duration}</span><h4>${e.title}</h4><div class="org">${e.company}</div><h5>What I worked on</h5><p style="margin-top:0">${e.worked}</p><h5>What I learned</h5><p style="margin-top:0">${e.learned}</p>`)).join('');
  $('#tlEdu').innerHTML = track + D.education.map((e, i) => tlItem(i, `<span class="when">${e.dates}</span><h4>${e.degree}</h4><div class="org">${e.school} <small>· ${e.score}</small></div><h5>Relevant coursework</h5><div class="tags">${e.coursework.map(c => `<span class="tag">${c}</span>`).join('')}</div><h5>Achievements</h5><ul class="bul wins">${e.achievements.map(r => `<li>${r}</li>`).join('')}</ul>`)).join('');

  // certs
  $('#certs').innerHTML = D.certifications.map((c, i) => `
    <div class="cert rv pop" style="--d:${i % 3};--bg:${c.color}">
      <div class="cert-in">
        <div class="face front"><div class="seal" aria-hidden="true">${c.abbr}</div><h3>${c.title}</h3><div class="meta">${c.issuer}<br>${c.date}</div>
          <button class="flip-btn" aria-label="Show credential for ${c.title}">Flip for credential ↻</button></div>
        <div class="face back"><h3>${c.title}</h3><div class="meta">Issued ${c.date}</div><div class="cred">ID ${c.id}</div><div class="tags">${c.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
          <div class="row"><a class="btn sm teal" href="${c.link}" tabindex="-1">View credential ${ico('ext', 14)}</a><button class="flip-btn back-btn" tabindex="-1" aria-label="Flip back">↺ Back</button></div></div>
      </div>
    </div>`).join('');

  // awards
  $('#awardsGrid').innerHTML = D.awards.map((a, i) => `
    <article class="card award rv" style="--d:${i % 3}"><div class="aw-top"><span class="aw-year">${a.year}</span><span class="tag">${a.type}</span></div><h3>${a.title}</h3><div class="org">${a.org}</div><p>${a.desc}</p>
    ${a.stat ? `<div class="aw-stat"><b data-count="${a.stat.n}" data-suffix="${a.stat.suffix || ''}">0</b><span>${a.stat.label}</span></div>` : ''}</article>`).join('');

  // testimonials
  $('#quotes').innerHTML = D.testimonials.map((t, i) => `
    <figure class="card quote rv" style="--d:${i};--rot:${[-1.4, 1, -0.6][i % 3]}deg"><div class="qmark" aria-hidden="true">“</div><blockquote><p>${t.quote}</p></blockquote>
    <figcaption><span class="av" style="background:${t.color}" aria-hidden="true">${t.initials}</span><div><b>${t.name}</b><span>${t.role}</span></div></figcaption></figure>`).join('');

  // hobbies
  $('#hobbyGrid').innerHTML = D.hobbies.map((h, i) => `
    <article class="card hobby rv" style="--d:${i % 3}"><div class="h-stage paused" style="--bg:${h.color}" data-hobby aria-hidden="true">${A.hobby[h.key] || ''}</div><div class="hb"><h3>${h.name}</h3><p>${h.line}</p></div></article>`).join('');

  // contact
  $('#info').innerHTML = `
    <li class="rv" style="--d:3"><span class="ib">${ico('mail')}</span><div><small>Email</small><a href="mailto:${P.email}">${P.email}</a></div><button class="copy" id="copyBtn" type="button">Copy</button></li>
    <li class="rv" style="--d:4"><span class="ib">${ico('pin')}</span><div><small>Location</small>${P.location} · IST (UTC+5:30)</div></li>
    <li class="rv" style="--d:5"><span class="ib"><i class="dot"></i></span><div><small>Availability</small>${P.availability}</div></li>`;
  const soc = D.socials.map(s => `<a class="soc" href="${s.url}" ${s.key !== 'mail' ? 'target="_blank" rel="noopener"' : ''} aria-label="${s.label} ${s.handle}">${ico(s.key)}</a>`).join('');
  $('#socials').innerHTML = soc; $('#footSocials').innerHTML = soc;
  $('#copyBtn').addEventListener('click', async () => { try { await navigator.clipboard.writeText(P.email); toast('Email copied to clipboard'); } catch (e) { toast(P.email); } });

  /* ---------- heading word split ---------- */
  $$('.h-sec').forEach(h => { h.innerHTML = h.textContent.trim().split(/\s+/).map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(' '); });

  /* ---------- loops (lazy build, pause off-screen) ---------- */
  const loops = new Map();
  const loopFor = el => {
    if (loops.has(el)) return loops.get(el);
    let def;
    if (el.dataset.skill) def = A.skill[el.dataset.skill](el);
    else if (el.dataset.project) def = A.project[el.dataset.project](el);
    const L = new A.Loop(el, def); loops.set(el, L); return L;
  };
  const loopIO = new IntersectionObserver(es => es.forEach(e => {
    const el = e.target;
    if (el.hasAttribute('data-hobby')) { el.classList.toggle('paused', !e.isIntersecting); return; }
    const L = loopFor(el); e.isIntersecting ? L.start() : L.stop();
  }), { rootMargin: '120px 0px' });
  $$('[data-skill],[data-project],[data-hobby]').forEach(el => loopIO.observe(el));

  /* ---------- counters ---------- */
  const countIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; const n = e.target; countIO.unobserve(n);
    A.countTo(n, +n.dataset.count, { suffix: n.dataset.suffix || '', prefix: n.dataset.prefix || '', dec: +(n.dataset.dec || 0), dur: 1500 });
  }), { threshold: .6 });
  const watchCounts = root => $$('[data-count]', root).forEach(n => countIO.observe(n));
  watchCounts(document);

  /* ---------- reveal ---------- */
  const revIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; const t = e.target; t.classList.add('in'); revIO.unobserve(t);
    const d = parseFloat(getComputedStyle(t).getPropertyValue('--d')) || 0;
    setTimeout(() => t.classList.add('done'), 700 + d * 80);
  }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  const startReveal = () => { $$('.rv, .h-sec, #hand').forEach(el => revIO.observe(el)); $$('.cert').forEach(c => revIO.observe(c)); };

  /* ---------- nav: sticky border, active link, progress, timeline, edges ---------- */
  const nav = $('#nav'), prog = $('#progress'), links = $$('a[data-t]');
  const targets = D.nav.map(n => document.getElementById(n.id));
  const tls = $$('.tl').map(tl => ({ tl, fill: $('.tl-fill', tl), items: $$('.tl-item', tl) }));
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight, vh = innerHeight;
    prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    nav.classList.toggle('stuck', y > 8);
    let cur = null; targets.forEach(t => { if (t && t.getBoundingClientRect().top < vh * .4) cur = t.id; });
    links.forEach(a => a.classList.toggle('active', a.dataset.t === cur));
    tls.forEach(({ tl, fill, items }) => {
      const r = tl.getBoundingClientRect(); const p = Math.max(0, Math.min(1, (vh * .65 - r.top) / r.height));
      fill.style.transform = `scaleY(${RM ? (p > 0 ? 1 : 0) : p})`;
      items.forEach(it => it.classList.toggle('hit', it.offsetTop + 30 < p * r.height));
    });
    if (!RM) document.documentElement.style.setProperty('--sx', (y * .15).toFixed(1));
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  // mobile menu
  const burger = $('#burger'), mm = $('#mmenu');
  const setMenu = open => { burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); mm.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : ''; if (open) $('a', mm).focus(); };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  mm.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && mm.classList.contains('open')) { setMenu(false); burger.focus(); } });

  /* ---------- typing ---------- */
  (function typer() {
    const n = $('#typed'), W = P.roles;
    if (RM) { n.textContent = W[0]; return; }
    let w = 0, c = 0, del = false;
    const t = () => {
      const s = W[w]; n.textContent = s.slice(0, c);
      if (!del && c < s.length) { c++; setTimeout(t, 65); }
      else if (!del) { del = true; setTimeout(t, 1900); }
      else if (c > 0) { c--; setTimeout(t, 32); }
      else { del = false; w = (w + 1) % W.length; setTimeout(t, 350); }
    };
    setTimeout(t, 600);
  })();

  /* ---------- hero screen ---------- */
  (function heroScreen() {
    const segs = [
      { id: 'skills', label: 'Skills', html: () => D.skills.slice(0, 5).map(s => `<div class="ms-skill"><span>${s.name}</span><span class="mb"><i style="--v:${s.level / 100}"></i></span><span>${s.years}y</span></div>`).join('') },
      { id: 'projects', label: 'Projects', html: () => `<div class="ms-grid">${D.projects.map(p => `<div class="ms-tile" style="background:${p.color}">${p.title}</div>`).join('')}</div>` },
      { id: 'experience', label: 'Experience', html: () => `<div class="ms-tl">${[...D.experience, ...D.internships].slice(0, 3).map(e => `<div>${e.title}<small>${e.company} · ${e.dates}</small></div>`).join('')}</div>` },
      { id: 'internships', label: 'Internships', html: () => `<div class="ms-cards">${D.internships.map((e, i) => `<div style="background:${['var(--zd-yellow)', 'var(--zd-stone)'][i]}">${e.company}<small>${e.title} · ${e.duration}</small></div>`).join('')}</div>` },
      { id: 'certifications', label: 'Certifications', html: () => `<div class="ms-badges">${D.certifications.map((c, i) => `<i style="background:${c.color};--i:${i}">${c.abbr}</i>`).join('')}</div>` },
      { id: 'hobbies', label: 'Hobbies', html: () => `<div class="ms-chips">${D.hobbies.map(h => `<span style="background:${h.color}">${h.name}</span>`).join('')}</div>` }
    ];
    const N = segs.length, SEG = 3200;
    const scr = $('#screen'), trackEl = $('#scTrack'), tabs = $('#scTabs'), url = $('#scUrl'), thumb = $('#scThumb'), progI = $('#scProg'), cur = $('#scCur'), state = $('#scState');
    trackEl.style.height = N * 100 + '%'; thumb.style.height = 100 / N + '%';
    tabs.innerHTML = segs.map((s, i) => `<button class="sc-tab" data-i="${i}" type="button">${s.label}</button>`).join('');
    trackEl.innerHTML = segs.map(s => `<button class="sc-seg" type="button" data-go="${s.id}" aria-label="Jump to ${s.label}"><div class="sc-h"><b>${s.label}</b><span class="sc-open">Open section ↗</span></div>${s.html()}</button>`).join('');
    const tabEls = $$('.sc-tab', tabs), segEls = $$('.sc-seg', trackEl);
    scr.style.setProperty('--seg', SEG + 'ms');
    let i = 0, elapsed = 0, paused = false, visible = true, last = performance.now();
    const moveCursor = k => {
      const t = tabEls[k]; if (!t || !t.offsetParent) return;
      const sr = scr.getBoundingClientRect(), tr = t.getBoundingClientRect();
      cur.style.transform = `translate(${tr.left - sr.left + tr.width * .6}px, ${tr.top - sr.top + tr.height * .55}px)`;
    };
    const go = k => {
      i = (k + N) % N; elapsed = 0;
      trackEl.style.transform = `translateY(${-i * 100 / N}%)`;
      thumb.style.transform = `translateY(${i * 100}%)`;
      url.textContent = 'abbasali.dev/#' + segs[i].id;
      tabEls.forEach((t, j) => t.classList.toggle('on', j === i));
      segEls.forEach((s, j) => { s.classList.toggle('on', j === i); s.tabIndex = j === i ? 0 : -1; });
      moveCursor(i); cur.classList.remove('click'); void cur.offsetWidth; cur.classList.add('click');
      progI.classList.remove('run'); void progI.offsetWidth; if (!RM) progI.classList.add('run');
    };
    const setPaused = p => { paused = p; scr.classList.toggle('paused', p); state.textContent = p ? 'Paused' : 'Live'; };
    tabs.addEventListener('click', e => { const b = e.target.closest('.sc-tab'); if (b) go(+b.dataset.i); });
    trackEl.addEventListener('click', e => { const b = e.target.closest('.sc-seg'); if (!b) return; const t = document.getElementById(b.dataset.go); if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 80, behavior: RM ? 'auto' : 'smooth' }); });
    scr.addEventListener('mouseenter', () => setPaused(true));
    scr.addEventListener('mouseleave', () => setPaused(false));
    scr.addEventListener('focusin', () => setPaused(true));
    scr.addEventListener('focusout', e => { if (!scr.contains(e.relatedTarget)) setPaused(false); });
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(scr);
    const loop = t => {
      const dt = t - last; last = t;
      if (!paused && visible && !document.hidden && !RM) { elapsed += dt; if (elapsed >= SEG) go(i + 1); }
      requestAnimationFrame(loop);
    };
    go(0); requestAnimationFrame(loop);
    addEventListener('resize', () => moveCursor(i));
    if (RM) { setPaused(false); state.textContent = 'Preview'; }
  })();

  /* ---------- filters with FLIP animation ---------- */
  function flipFilter(items, match) {
    const first = new Map(items.map(el => [el, el.getBoundingClientRect()]));
    const wasHidden = new Map(items.map(el => [el, el.classList.contains('hide')]));
    items.forEach(el => el.classList.toggle('hide', !match(el)));
    if (RM) return;
    items.forEach(el => {
      if (el.classList.contains('hide')) return;
      const l = el.getBoundingClientRect(), f = first.get(el);
      el.classList.add('in', 'done');
      if (wasHidden.get(el)) { el.animate([{ opacity: 0, transform: 'scale(.85)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.3,1.6,.5,1)' }); }
      else { const dx = f.left - l.left, dy = f.top - l.top; if (dx || dy) el.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.2,.8,.2,1)' }); }
    });
  }
  const pressOne = (group, btn) => $$('.chip', group).forEach(b => b.setAttribute('aria-pressed', b === btn));

  const skillCards = $$('.skill');
  $('#skillFilter').addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return; pressOne(e.currentTarget, b); const g = b.dataset.g;
    flipFilter(skillCards, el => g === 'All' || el.dataset.g === g);
  });

  const projCards = $$('.pcard'); let cat = 'All', tech = 'Any';
  const applyProj = () => {
    const m = el => (cat === 'All' || el.dataset.cat === cat) && (tech === 'Any' || el.dataset.tech.split('|').includes(tech));
    flipFilter(projCards, m);
    const n = projCards.filter(m).length; $('#projEmpty').hidden = n > 0; $('#projLive').textContent = `${n} project${n === 1 ? '' : 's'} shown`;
  };
  $('#catFilter').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; pressOne(e.currentTarget, b); cat = b.dataset.c; applyProj(); });
  $('#techFilter').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; pressOne(e.currentTarget, b); tech = b.dataset.t; applyProj(); });

  /* ---------- skill expand ---------- */
  skillCards.forEach(card => {
    const btn = $('.sk-toggle', card);
    const toggle = () => { const o = !card.classList.contains('open'); card.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); btn.firstChild.textContent = o ? 'Hide details ' : 'Details '; };
    btn.addEventListener('click', e => { e.stopPropagation(); toggle(); });
    card.addEventListener('click', e => { if (!e.target.closest('button,a')) toggle(); });
    const st = $('.stage', card);
    card.addEventListener('mouseenter', () => loops.get(st)?.setSpeed(1.8));
    card.addEventListener('mouseleave', () => loops.get(st)?.setSpeed(1));
  });

  /* ---------- project cards: hover speed + tilt ---------- */
  projCards.forEach(card => {
    const st = $('[data-project]', card);
    card.addEventListener('mouseenter', () => loops.get(st)?.setSpeed(2.2));
    card.addEventListener('mouseleave', () => { loops.get(st)?.setSpeed(1); card.style.transform = ''; });
    card.addEventListener('focusin', () => loops.get(st)?.setSpeed(2.2));
    card.addEventListener('focusout', () => loops.get(st)?.setSpeed(1));
    if (FINE && !RM) card.addEventListener('mousemove', e => {
      if (!card.classList.contains('done') || SMALL()) return;
      const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translate(-3px,-3px)`;
    });
  });

  /* ---------- project modal ---------- */
  const pm = $('#pm'); let pmLoop = null, lastFocus = null;
  function openProject(id) {
    const p = projById[id]; if (!p) return; lastFocus = document.activeElement;
    pm.innerHTML = `
      <div class="pm-head"><div><span class="tag" style="background:${p.color}">${p.category} · ${p.year}</span><h2 id="pmTitle" style="margin-top:8px">${p.title}</h2></div><button class="x" type="button" aria-label="Close project details">×</button></div>
      <div class="pm-body">
        <div class="pm-top"><div class="thumb"><div data-project="${p.anim}" aria-hidden="true"></div></div>
          <dl class="facts"><div><dt>Summary</dt><dd>${p.summary}</dd></div><div><dt>My role</dt><dd>${p.role}</dd></div><div><dt>Stack</dt><dd class="tags" style="margin-top:8px">${p.stack.map(t => `<span class="tag">${t}</span>`).join('')}</dd></div>
          <div class="cta-row" style="margin-top:6px"><a class="btn sm" href="${p.live}">Live demo ${ico('ext', 14)}</a><a class="btn sm white" href="${p.code}">${ico('github', 14)} Source</a></div></dl></div>
        <div class="pm-cols"><div><h3>The problem</h3><p>${p.problem}</p><h3 style="margin-top:22px">Outcome</h3><p>${p.outcome}</p></div><div><h3>Key features</h3><ul class="feat">${p.features.map(f => `<li>${f}</li>`).join('')}</ul></div></div>
        <div><h3>By the numbers</h3><div class="metrics">${p.metrics.map((m, i) => `<div class="metric" style="background:${['var(--zd-lime)', 'var(--zd-yellow)', 'var(--zd-stone)'][i % 3]}"><b data-count="${m.n}" data-dec="${m.dec || 0}" data-prefix="${m.prefix || ''}" data-suffix="${m.suffix || ''}">0</b><span>${m.label}</span></div>`).join('')}</div></div>
      </div>`;
    const st = $('[data-project]', pm); pmLoop = new A.Loop(st, A.project[p.anim](st));
    pm.showModal(); pm.scrollTop = 0; $('.x', pm).focus();
    requestAnimationFrame(() => { pmLoop.start(); $$('[data-count]', pm).forEach(n => A.countTo(n, +n.dataset.count, { dec: +n.dataset.dec, prefix: n.dataset.prefix, suffix: n.dataset.suffix, dur: 1300 })); });
  }
  pm.addEventListener('click', e => { if (e.target === pm || e.target.closest('.x')) pm.close(); });
  pm.addEventListener('close', () => { pmLoop?.destroy(); pmLoop = null; lastFocus?.focus?.(); });
  document.addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b && !pm.contains(b)) { e.preventDefault(); openProject(b.dataset.open); } });

  /* ---------- cert flip ---------- */
  $$('.cert').forEach(c => {
    const front = $('.front .flip-btn', c), back = $$('.back a, .back button', c);
    const set = f => { c.classList.toggle('flip', f); back.forEach(b => b.tabIndex = f ? 0 : -1); front.tabIndex = f ? -1 : 0; (f ? back[0] : front).focus({ preventScroll: true }); };
    front.addEventListener('click', () => set(true));
    $('.back-btn', c).addEventListener('click', () => set(false));
    c.addEventListener('focusout', e => { if (!c.contains(e.relatedTarget) && c.classList.contains('flip')) { c.classList.remove('flip'); back.forEach(b => b.tabIndex = -1); front.tabIndex = 0; } });
  });

  /* ---------- contact form ---------- */
  const form = $('#form'), F = { name: $('#f-name'), email: $('#f-email'), msg: $('#f-msg') };
  const rules = {
    name: v => v.trim().length >= 2 || 'Please enter your name (2+ characters).',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'That email doesn’t look right.',
    msg: v => v.trim().length >= 20 || `Tell me a little more (${Math.max(0, 20 - v.trim().length)} more characters).`
  };
  const touched = {};
  const check = k => { const r = rules[k](F[k].value), bad = r !== true; F[k].setAttribute('aria-invalid', bad); $('#' + F[k].getAttribute('aria-describedby')).textContent = bad ? r : ''; return !bad; };
  Object.keys(F).forEach(k => {
    F[k].addEventListener('blur', () => { if (F[k].value) { touched[k] = true; check(k); } });
    F[k].addEventListener('input', () => { if (touched[k]) check(k); if (k === 'msg') $('#f-count').textContent = `${F.msg.value.length} / 600`; });
  });
  form.addEventListener('submit', e => {
    e.preventDefault(); Object.keys(F).forEach(k => touched[k] = true);
    const bad = Object.keys(F).filter(k => !check(k));
    if (bad.length) { const f = F[bad[0]]; f.focus(); const fl = f.closest('.field'); fl.classList.remove('shake'); void fl.offsetWidth; fl.classList.add('shake'); return; }
    const btn = $('#sendBtn'); btn.disabled = true; btn.innerHTML = 'Sending…';
    setTimeout(() => {
      $('#okTxt').textContent = `Thanks, ${F.name.value.trim().split(' ')[0]}! I’ll reply to ${F.email.value.trim()} within 24 hours.`;
      form.classList.add('sent'); $('#okPanel').focus(); btn.disabled = false; btn.innerHTML = 'Send message <span class="arr">→</span>';
    }, 1100);
  });
  $('#againBtn').addEventListener('click', () => { form.reset(); Object.keys(F).forEach(k => { touched[k] = false; F[k].removeAttribute('aria-invalid'); }); $$('.err', form).forEach(e => e.textContent = ''); $('#f-count').textContent = '0 / 600'; form.classList.remove('sent'); F.name.focus(); });

  /* ---------- intro loader ---------- */
  (function intro() {
    const root = document.documentElement;
    if (!root.classList.contains('show-loader')) { startReveal(); return; }
    const L = $('#loader'), name = $('#ldName');
    name.innerHTML = [...P.name.toUpperCase()].map((ch, i) => `<span style="--i:${i}">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
    const dur = RM ? 300 : 1300, t0 = performance.now(), bar = $('#ldBar'), pct = $('#ldPct');
    const f = t => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 2);
      bar.style.transform = `scaleX(${e})`; pct.textContent = Math.round(e * 100);
      if (p < 1) return requestAnimationFrame(f);
      try { sessionStorage.setItem('aa-intro', '1'); } catch (x) {}
      L.classList.add('done'); root.style.overflow = ''; document.body.style.overflow = 'visible';
      setTimeout(() => { root.classList.remove('show-loader'); document.body.style.overflow = ''; }, RM ? 0 : 800);
      setTimeout(startReveal, RM ? 0 : 250);
    };
    requestAnimationFrame(f);
  })();
})();
