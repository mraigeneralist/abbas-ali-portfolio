/* ============================================================
   PORTFOLIO CONTENT — edit this file only to change text/data.
   Layout lives in index.html + site.css, motion in anims.js/app.js.
   Colors reference Zombie Design tokens (var(--zd-*)).
   ============================================================ */
window.PORTFOLIO = {
  profile: {
    name: 'Abbas Ali',
    title: 'Full-Stack Web Developer',
    roles: ['Full-Stack Web Developer', 'React & Node.js Engineer', 'Dashboard Speed Freak', 'Accessibility Advocate'],
    value: 'I build fast, accessible web products that stay alive long after launch day.',
    perk: '<b>6+ YEARS</b> shipping React &amp; Node.js products for 40+ merchants and 120 enterprise teams.',
    location: 'Hyderabad, India',
    email: 'hello@abbasali.dev',
    availability: 'Open to senior full-stack roles from Nov 2026',
    resume: '', // e.g. 'assets/abbas-ali-resume.pdf' — empty shows a placeholder toast
    site: 'https://abbasali.dev'
  },

  nav: [
    { id: 'about', label: 'About' }, { id: 'skills', label: 'Skills' }, { id: 'projects', label: 'Projects' },
    { id: 'journey', label: 'Experience' }, { id: 'certifications', label: 'Certifications' },
    { id: 'awards', label: 'Awards' }, { id: 'hobbies', label: 'Hobbies' }, { id: 'contact', label: 'Contact' }
  ],

  about: {
    lead: 'I’m a full-stack developer from Hyderabad who turns messy product ideas into interfaces people actually enjoy using.',
    paras: [
      'I started with a B.Tech in Computer Science at JNTUH, where a hackathon win and two internships convinced me the web was where I wanted to live. Since 2020 I’ve shipped storefronts at Brightcart Commerce and, today, real-time analytics at Tidewave Analytics.',
      'I’m happiest building data-heavy UIs that feel instant: dashboards, checkouts, collaboration tools. The kind of product where shaving 300ms off an interaction changes how people work.'
    ],
    style: [
      'Ship small, measure, then ship again',
      'Accessibility is a requirement, not a ticket',
      'Write it down: RFCs before code, docs after',
      'Pair often, review kindly, mentor on purpose'
    ]
  },

  stats: [
    { n: 6, suffix: '+', label: 'Years building for the web' },
    { n: 24, label: 'Projects shipped' },
    { n: 15, label: 'Freelance clients' },
    { n: 3200, suffix: '+', label: 'Commits in the last year' }
  ],

  marquee: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Next.js', 'GraphQL', 'D3.js', 'Accessibility', 'Testing', 'AWS'],

  skillGroups: ['Frontend', 'Backend', 'Tools', 'Soft skills'],
  skills: [
    { id: 'html', name: 'HTML', group: 'Frontend', anim: 'html', color: 'var(--zd-cream)', years: 9, level: 95, label: 'Expert',
      desc: 'Semantic, accessible markup is where every project starts. I audit landmark structure and heading order on every PR and wrote Tidewave’s accessibility checklist.',
      projects: ['pulse', 'stockpile', 'reelhouse'] },
    { id: 'css', name: 'CSS', group: 'Frontend', anim: 'css', color: 'var(--zd-pink)', years: 9, level: 92, label: 'Expert',
      desc: 'Grid, container queries and custom-property design tokens. Built Brightcart’s theming layer so 40+ merchants could re-skin a storefront without touching code.',
      projects: ['stockpile', 'reelhouse', 'skycast'] },
    { id: 'js', name: 'JavaScript', group: 'Frontend', anim: 'js', color: 'var(--zd-yellow)', years: 8, level: 94, label: 'Expert',
      desc: 'Modern ES, async patterns, performance profiling. My first internship at Kodeflow was vanilla JS; I still reach for it before adding a dependency.',
      projects: ['skycast', 'huddle', 'dockboard'] },
    { id: 'ts', name: 'TypeScript', group: 'Frontend', anim: 'ts', color: 'var(--zd-stone)', years: 6, level: 88, label: 'Advanced',
      desc: 'Strict mode everywhere, generated GraphQL types, and typed API contracts shared between client and server.',
      projects: ['pulse', 'huddle', 'reelhouse'] },
    { id: 'react', name: 'React', group: 'Frontend', anim: 'react', color: 'var(--zd-teal)', years: 7, level: 93, label: 'Expert',
      desc: 'Hooks, Suspense, server components with Next.js, and render-performance tuning for dashboards with thousands of live data points.',
      projects: ['pulse', 'stockpile', 'reelhouse', 'huddle'] },
    { id: 'responsive', name: 'Responsive Design', group: 'Frontend', anim: 'responsive', color: 'var(--zd-lime)', years: 8, level: 91, label: 'Expert',
      desc: 'Mobile-first layouts that reflow cleanly from 320px to ultrawide. Stockpile’s mobile checkout drove 62% of its orders.',
      projects: ['stockpile', 'skycast', 'reelhouse'] },
    { id: 'node', name: 'Node.js & APIs', group: 'Backend', anim: 'node', color: 'var(--zd-flesh)', years: 6, level: 87, label: 'Advanced',
      desc: 'REST and GraphQL services with Express and Apollo, WebSockets with Socket.IO, queues and caching with Redis.',
      projects: ['pulse', 'huddle', 'dockboard', 'stockpile'] },
    { id: 'db', name: 'PostgreSQL', group: 'Backend', anim: 'db', color: 'var(--zd-cream)', years: 6, level: 82, label: 'Advanced',
      desc: 'Schema design, indexing and query plans. Rewrote Pulse’s report queries with materialized views to cut load time from 9s to 1.2s.',
      projects: ['pulse', 'dockboard', 'stockpile'] },
    { id: 'git', name: 'Git & CI', group: 'Tools', anim: 'git', color: 'var(--zd-yellow)', years: 8, level: 90, label: 'Expert',
      desc: 'Trunk-based workflow, small PRs, GitHub Actions pipelines with preview deploys for every branch.',
      projects: ['huddle', 'pulse', 'stockpile'] },
    { id: 'testing', name: 'Testing', group: 'Tools', anim: 'tests', color: 'var(--zd-stone)', years: 5, level: 84, label: 'Advanced',
      desc: 'Jest, React Testing Library and Playwright. Took Tidewave’s coverage from 41% to 86% without slowing the release train.',
      projects: ['pulse', 'stockpile'] },
    { id: 'comms', name: 'Communication', group: 'Soft skills', anim: 'comms', color: 'var(--zd-pink)', years: 6, level: 90, label: 'Expert',
      desc: 'Translating between product, design and engineering. I write the RFC, run the demo, and keep stakeholders unsurprised.',
      projects: ['reelhouse', 'pulse'] },
    { id: 'mentor', name: 'Mentoring', group: 'Soft skills', anim: 'mentor', color: 'var(--zd-lime)', years: 3, level: 80, label: 'Proficient',
      desc: 'Mentor four engineers at Tidewave through weekly pairing and review. Two were promoted within a year.',
      projects: ['pulse', 'huddle'] }
  ],

  projectCategories: ['Frontend', 'Full-stack', 'Real-time', 'Data viz'],
  projectTech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Next.js'],
  projects: [
    { id: 'pulse', title: 'Pulse', year: '2024', category: 'Data viz', anim: 'dash', color: 'var(--zd-teal)',
      summary: 'Real-time product analytics dashboard for enterprise SaaS teams.',
      problem: 'Tidewave’s customers waited up to 9 seconds for reports to load, and support tickets about “frozen charts” were climbing every month.',
      role: 'Lead full-stack developer at Tidewave Analytics. Owned the frontend architecture and the GraphQL aggregation layer.',
      stack: ['React', 'TypeScript', 'D3.js', 'GraphQL', 'Node.js', 'PostgreSQL'],
      features: ['Live-updating charts over WebSockets', 'Drag-to-compare date ranges', 'Saved views shared by URL', 'Fully keyboard-navigable charts with data tables'],
      outcome: 'Became Tidewave’s flagship product, now used by 120 enterprise clients.',
      metrics: [{ n: 1.2, dec: 1, suffix: 's', label: 'Report load (from 9s)' }, { n: 120, label: 'Enterprise clients' }, { n: 34, suffix: '%', label: 'Fewer support tickets' }],
      live: '#', code: '#' },
    { id: 'stockpile', title: 'Stockpile', year: '2022', category: 'Full-stack', anim: 'shop', color: 'var(--zd-pink)',
      summary: 'Headless e-commerce storefront template for independent merchants.',
      problem: 'Brightcart merchants were stuck on a slow legacy theme with a five-step checkout that lost a third of mobile shoppers.',
      role: 'Software engineer at Brightcart Commerce. Built the storefront, cart state and the checkout API.',
      stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Stripe'],
      features: ['One-page checkout with saved carts', 'Theme tokens merchants edit without code', 'Image CDN with responsive art direction', 'Inventory sync every 30 seconds'],
      outcome: 'Rolled out to 40+ merchants; mobile became the majority of orders.',
      metrics: [{ n: 18, prefix: '+', suffix: '%', label: 'Checkout conversion' }, { n: 40, suffix: '+', label: 'Merchants live' }, { n: 96, label: 'Lighthouse perf (from 54)' }],
      live: '#', code: '#' },
    { id: 'huddle', title: 'Huddle', year: '2022', category: 'Real-time', anim: 'chat', color: 'var(--zd-yellow)',
      summary: 'Open-source team chat with threads, presence and typing indicators.',
      problem: 'Small teams wanted a self-hosted chat that didn’t need a DevOps engineer to run.',
      role: 'Creator and maintainer. Started as a 36-hour build at HackHyd 2022.',
      stack: ['React', 'TypeScript', 'Node.js', 'Socket.IO', 'Redis', 'PostgreSQL'],
      features: ['Presence and typing indicators', 'Threaded replies', 'One-command Docker deploy', 'Offline message queue'],
      outcome: 'Won HackHyd 2022 and grew into a community project.',
      metrics: [{ n: 1200, suffix: '+', label: 'GitHub stars' }, { n: 48, suffix: 'ms', label: 'Median delivery' }, { n: 31, label: 'Contributors' }],
      live: '#', code: '#' },
    { id: 'reelhouse', title: 'Reelhouse', year: '2021', category: 'Frontend', anim: 'stream', color: 'var(--zd-lime)',
      summary: 'Streaming catalogue for an independent film collective.',
      problem: 'Frameshift Film Collective had 600 films hidden in a spreadsheet-style list nobody browsed.',
      role: 'Freelance frontend developer. Designed the browsing flow with their curator and built it solo.',
      stack: ['Next.js', 'React', 'TypeScript', 'CSS'],
      features: ['Auto-rotating hero spotlight', 'Horizontally scrolling genre rows', 'Keyboard and TV-remote navigation', 'Watchlist saved per device'],
      outcome: 'Visitors started browsing instead of bouncing.',
      metrics: [{ n: 38, suffix: '%', label: 'Longer sessions' }, { n: 1.4, dec: 1, suffix: 's', label: 'Largest paint' }, { n: 600, label: 'Films catalogued' }],
      live: '#', code: '#' },
    { id: 'dockboard', title: 'Dockboard', year: '2020', category: 'Full-stack', anim: 'kanban', color: 'var(--zd-stone)',
      summary: 'Kanban dispatch board for a last-mile logistics team.',
      problem: 'Parcelpoint dispatchers tracked 2,000 daily deliveries across WhatsApp groups and whiteboards.',
      role: 'Full-stack intern at Parcelpoint Logistics. Built the board, API and role permissions.',
      stack: ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
      features: ['Drag-and-drop between delivery stages', 'Live driver status', 'Role-based permissions', 'End-of-day CSV reports'],
      outcome: 'Replaced the whiteboard within a month of launch.',
      metrics: [{ n: 27, suffix: '%', label: 'Faster dispatch' }, { n: 60, label: 'Daily users' }, { n: 2000, suffix: '+', label: 'Deliveries per day' }],
      live: '#', code: '#' },
    { id: 'skycast', title: 'Skycast', year: '2019', category: 'Frontend', anim: 'weather', color: 'var(--zd-cream)',
      summary: 'Installable weather dashboard with hourly and five-day forecasts.',
      problem: 'Every weather app I tried buried the one number I wanted under ads.',
      role: 'Solo side project during my third year at JNTUH.',
      stack: ['React', 'JavaScript', 'PWA', 'OpenWeather API'],
      features: ['Offline-first with service workers', 'Animated condition icons', 'Five-day trend bars', 'Saved cities'],
      outcome: 'Picked up by a local tech blog and still running.',
      metrics: [{ n: 12, suffix: 'k', label: 'Monthly users' }, { n: 98, label: 'Lighthouse score' }, { n: 5, label: 'Cities per user avg.' }],
      live: '#', code: '#' }
  ],

  experience: [
    { company: 'Tidewave Analytics', title: 'Senior Full-Stack Developer', dates: 'Apr 2023 – Present', location: 'Hyderabad · Hybrid',
      summary: 'Lead developer on Pulse, Tidewave’s real-time analytics product.',
      resp: ['Own frontend architecture and the GraphQL aggregation layer', 'Run the component library and accessibility reviews', 'Mentor four engineers through pairing and code review'],
      wins: ['Cut report load time from 9s to 1.2s', 'Raised test coverage from 41% to 86%', 'Reduced AWS spend by 22%'] },
    { company: 'Brightcart Commerce', title: 'Software Engineer, Full-Stack', dates: 'Jul 2020 – Mar 2023', location: 'Bengaluru · Remote',
      summary: 'Built Stockpile, Brightcart’s headless storefront platform.',
      resp: ['Built storefront UI and cart state in Next.js', 'Designed the checkout API on Node.js and PostgreSQL', 'Created the merchant theming system'],
      wins: ['Lifted checkout conversion by 18%', 'Onboarded 40+ merchants', 'Improved Lighthouse performance from 54 to 96'] }
  ],
  internships: [
    { company: 'Parcelpoint Logistics', title: 'Full-Stack Intern', dates: 'Jan 2020 – Jun 2020', duration: '6 months',
      worked: 'Built Dockboard, a kanban dispatch board used by 60 staff, from database schema to drag-and-drop UI.',
      learned: 'How to ship to real users under deadline, and why talking to them on day one beats guessing.' },
    { company: 'Kodeflow Labs', title: 'Frontend Intern', dates: 'May 2018 – Jul 2018', duration: '3 months',
      worked: 'Built responsive landing pages and a small HTML/CSS component library for client sites.',
      learned: 'Clean semantic markup, cross-browser debugging, and taking design feedback without flinching.' }
  ],
  education: [
    { degree: 'B.Tech, Computer Science & Engineering', school: 'JNTUH College of Engineering, Hyderabad', dates: '2016 – 2020', score: 'CGPA 8.7 / 10',
      coursework: ['Data Structures', 'Database Systems', 'Computer Networks', 'Web Technologies', 'Human–Computer Interaction'],
      achievements: ['Winner, Smart India Hackathon 2019', 'Lead, university coding club (2018–2019)'] },
    { degree: 'Intermediate (MPC)', school: 'St. Joseph’s Junior College, Hyderabad', dates: '2014 – 2016', score: '94%',
      coursework: ['Mathematics', 'Physics', 'Chemistry'],
      achievements: ['First place, inter-college quiz 2015'] }
  ],

  certifications: [
    { title: 'Responsive Web Design', issuer: 'freeCodeCamp', abbr: 'FCC', date: 'Dec 2018', id: 'FCC-RWD-18-4471', color: 'var(--zd-lime)', skills: ['HTML', 'CSS', 'Flexbox'], link: '#' },
    { title: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', abbr: 'AWS', date: 'Aug 2021', id: 'AWS-DVA-8812-0921', color: 'var(--zd-yellow)', skills: ['Lambda', 'DynamoDB', 'CI/CD'], link: '#' },
    { title: 'Meta Front-End Developer', issuer: 'Meta via Coursera', abbr: 'META', date: 'Oct 2022', id: 'COURSERA-7XK2PQ', color: 'var(--zd-stone)', skills: ['React', 'UX', 'Testing'], link: '#' },
    { title: 'Introduction to Web Accessibility', issuer: 'W3C via edX', abbr: 'W3C', date: 'Jun 2023', id: 'W3Cx-WAI0.1x-2291', color: 'var(--zd-teal)', skills: ['WCAG', 'ARIA', 'Auditing'], link: '#' },
    { title: 'Apollo Graph Developer – Associate', issuer: 'Apollo GraphQL', abbr: 'APL', date: 'Feb 2024', id: 'APOLLO-GDA-3310', color: 'var(--zd-pink)', skills: ['GraphQL', 'Schema design', 'Caching'], link: '#' },
    { title: 'Node.js Application Developer (JSNAD)', issuer: 'OpenJS Foundation', abbr: 'JSN', date: 'Sep 2024', id: 'LF-JSNAD-2409-118', color: 'var(--zd-cream)', skills: ['Node.js', 'Streams', 'Security'], link: '#' }
  ],

  awards: [
    { year: '2019', type: 'Hackathon', title: 'Winner, Smart India Hackathon', org: 'Govt. of India · Software Edition', desc: 'Built an offline-first crop-price tracker for farmers with a four-person team.' },
    { year: '2021', type: 'Recognition', title: 'Spot Award for Checkout Rewrite', org: 'Brightcart Commerce', desc: 'Awarded for the one-page checkout that lifted conversion by 18%.' },
    { year: '2022', type: 'Hackathon', title: '1st Place, HackHyd', org: 'Hyderabad developer community', desc: 'Huddle started here as a 36-hour build and became an open-source project.' },
    { year: '2022–now', type: 'Open source', title: 'Maintainer, Huddle', org: 'GitHub', desc: 'Community-run chat server with 31 contributors.', stat: { n: 1200, suffix: '+', label: 'stars' } },
    { year: '2024', type: 'Recognition', title: 'Engineer of the Year', org: 'Tidewave Analytics', desc: 'For the Pulse performance overhaul and mentoring program.' },
    { year: '2025', type: 'Speaking', title: 'Talk: Fast dashboards with React + D3', org: 'Hyderabad JavaScript Meetup', desc: 'Shared the rendering tricks behind Pulse with 200 attendees.' }
  ],

  testimonials: [
    { quote: 'Abbas took our slowest product and made it our fastest. He also made the team around him better, which is rarer.', name: 'Priya Raman', role: 'Engineering Manager, Tidewave Analytics', initials: 'PR', color: 'var(--zd-teal)' },
    { quote: 'He asked better questions about our films than most film students. Reelhouse finally made our catalogue feel alive.', name: 'Marco Silva', role: 'Director, Frameshift Film Collective', initials: 'MS', color: 'var(--zd-pink)' },
    { quote: 'Even in second year he was the student others went to for help. He never gave answers, only better questions.', name: 'Dr. Kavitha Reddy', role: 'Professor & mentor, JNTUH', initials: 'KR', color: 'var(--zd-lime)' }
  ],

  hobbies: [
    { key: 'cricket', name: 'Weekend Cricket', line: 'Opening batsman for a Sunday tape-ball team. Strike rate better than my sleep schedule.', color: 'var(--zd-lime)' },
    { key: 'camera', name: 'Street Photography', line: 'Early-morning walks through the Old City with a 35mm prime.', color: 'var(--zd-stone)' },
    { key: 'cook', name: 'Cooking Biryani', line: 'Chasing my grandmother’s Hyderabadi dum biryani, one Sunday at a time.', color: 'var(--zd-yellow)' },
    { key: 'cycle', name: 'Cycling', line: '40 km loops around Gandipet lake before the city wakes up.', color: 'var(--zd-teal)' },
    { key: 'chess', name: 'Chess', line: 'Rapid rating around 1650. Loves the Sicilian, fears the endgame.', color: 'var(--zd-cream)' },
    { key: 'pen', name: 'Urdu Calligraphy', line: 'Practising nastaliq with a bamboo qalam. Patience training for code review.', color: 'var(--zd-pink)' }
  ],

  socials: [
    { key: 'github', label: 'GitHub', handle: '@abbasali-dev', url: 'https://github.com/' },
    { key: 'linkedin', label: 'LinkedIn', handle: 'in/abbasali-dev', url: 'https://linkedin.com/' },
    { key: 'twitter', label: 'X / Twitter', handle: '@abbas_builds', url: 'https://x.com/' },
    { key: 'mail', label: 'Email', handle: 'hello@abbasali.dev', url: 'mailto:hello@abbasali.dev' }
  ]
};
