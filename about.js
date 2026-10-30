/* CST Training About Us page v1
   Page content: a div with id "cst-about", followed by a script tag loading this file
   (https://glancyl.github.io/cst-advisor/about/about.js?v=3).
   Images load from the WordPress Media Library (see IMG below). */
(function () {
  'use strict';

  /* ---------- CONFIG: edit here ---------- */
  var WP = 'https://www.csttraining.co.uk/wp-content/uploads/';
  var SITE = 'https://www.csttraining.co.uk';
  var VACANCIES_URL = SITE + '/recruitment/'; // TODO: confirm vacancies page URL
  var CONTACT_URL = SITE + '/contact/';

  var MILESTONES = [
    { date: '14 June 2019', title: 'CST Training is founded', text: 'Cohan Tyler sets up CST Training with behavioural safety at its core, so training changes how people work rather than just ticking a box.' },
    // Add 2020 to 2025 milestones here in date order
    { date: 'June 2026', title: 'We move into River House', text: 'Our new head office on Bexley High Street gives the team room to grow under one roof.', img: 'sign' },
    { date: 'October 2026', title: 'Full GQA approval for CSCS Q-Cards', text: 'CST Training gains full approval from GQA to deliver GQA CSCS Q-Cards.' },
    { date: '2026', title: 'UK’s #1 for CITB courses and construction NVQs', text: 'More people completed their CITB course or construction NVQ with CST Training than with any other provider, based on CITB’s own figures.', highlight: true },
    { date: 'Today', title: 'Nearly 200 people', text: 'Tutors, assessors and support teams working from River House, our permanent venues and 30+ training locations across the UK.' }
  ];

  var ROLES = ['First Aid Trainers', 'SMSTS/SSSTS Trainers', 'Internal QA Auditor', 'Temp Works Tutor', 'NVQ Assessors'];

  var VENUES = [
    { name: 'Bexley (head office)', addr: 'River House, Bexley High Street, Bexley, Kent, DA5 1JX', hq: true },
    { name: 'Manchester (2 venues)', addr: 'Units 470 and 471 Broadstone Mill, Reddish, Stockport, SK5 7DL', parking: true },
    { name: 'Chelmsford', addr: 'Unit 25a Little Boyton Hall Farm, Boyton Cross, Chelmsford, CM1 4LN', parking: true },
    { name: 'Birmingham', addr: 'Clinton House, High Street, Coleshill, Birmingham, B46 3BP', parking: true },
    { name: 'Milton Keynes', addr: '1 The Willows, Mill Farm Courtyard, Beachampton, Milton Keynes, MK19 6DS', parking: true },
    { name: 'Leeds', addr: 'Suite 5, First Floor, Wira Business Park, Ring Road, Leeds, LS16 6EB', parking: true },
    { name: 'Newcastle', addr: '27 Kingsway House, Newcastle, NE11 0HW', parking: true }
  ];

  var ACCREDITATIONS = [
    ['CITB', '2024/01/CITB-thumbnail-300x150.png', '/citb-courses/'],
    ['CMI', '2024/02/cmi-thumbnail-300x150.png', '/cmi-courses/'],
    ['ECITB', '2026/10/ECITB-thumbnail.png', '/contact/'],
    ['EUSR', '2023/12/EUSR-thumbnail-300x150.png', '/eusr-shea-courses/'],
    ['GQA', '2026/02/GQA-Master-logo.jpg', '/nvqs/'],
    ['Highfield', '2024/02/highfield-thumbnail-2-300x150.png', '/first-aid-at-work/'],
    ['ILM', '2025/08/ilm-awarding-body-thumbnail-new-300x150.jpg', '/ilm-courses-nvqs/'],
    ['IOSH', '2025/09/iosh-awarding-body-thumbnail.png', '/iosh-courses/'],
    ['ISEP', '2025/07/ISEP-thumbnail.jpg', '/isep-courses/'],
    ['NEBOSH', '2024/12/nebosh-courses-provider-360x180-1.png', '/nebosh-courses-online/'],
    ['NOCN', '2024/02/nocn-thumbnail-300x150.png', '/nvq-qualifications/'],
    ['Ofqual', '2020/05/Health-and-safety.jpeg', '/nvq-qualifications/'],
    ['PRINCE2®', '2026/03/ATO@3x-800x401-1.png', '/prince2-courses/'],
    ['ProQual', '2024/02/proqual-thumbnail-300x150.png', '/nvq-qualifications/'],
    ['SQA', '2026/02/qs-accreditation-certificate-logo.png', '/nvq-qualifications/']
  ];

  /* Team: [name, role, photo path under wp-content/uploads or '' for initials] */
  var AS = 'Assessor', TU = 'Tutor', BDE = 'Business Development Executive', ASE = 'Account Support Executive', ILMA = 'ILM Management NVQ Assessor';
  var TEAM = [
    { id: 'management', label: 'Management', people: [
      ['Cohan', 'Managing Director', '2026/10/website-meet-the-team-Cohan-Tyler-new.png'],
      ['Luisa', 'Director of Commercial Development', '2025/04/luisa.png'],
      ['Hannah', 'Director of Product', '2026/10/website-meet-the-team-Hannah-Tyler.png'],
      ['Dan', 'Operations Director', '2025/04/dan-church.png'],
      ['Photis', 'Finance Director', '2026/07/Photis-Kellaris-meet-the-team.png'],
      ['Jane', 'Customer Service Manager', '2024/04/jane-1.png'],
      ['Rob', 'Quality Manager', '2024/04/rob.png'],
      ['Liam', 'Head of Marketing · Governance', '2024/04/laim.png'],
      ['Nic', 'Head of Training and Standards', '2024/04/nic.png'],
      ['James', 'Head Assessor & IQA · Governance', '2024/04/james.png'],
      ['Simon', 'Head of Tutor Delivery', '2024/04/simon.png'],
      ['Karen', 'Scheduling Manager', '2024/04/karen.png'],
      ['Lauren', 'Customer Experience & Performance Manager', '2026/02/lauren-hill-meet-the-team.png'],
      ['Bruce', 'Facilities Manager', '2024/04/bruce.png'],
      ['Carey', 'HR Consultant', '2026/07/carey-smith-meet-the-team.png']
    ]},
    { id: 'customer-service', label: 'Customer Service', people: [
      ['Lauren', 'Customer Experience & Performance Manager', '2026/02/lauren-hill-meet-the-team.png'],
      ['Jane', 'Customer Service Manager', '2024/04/jane-1.png'],
      ['Rafana', 'Assessment Team Lead', '2024/04/rafana.png'],
      ['Rebecca', 'Course Operations Team Leader', '2024/12/REBECCA-W.png'],
      ['Chelsey', 'Customer Service Team Leader', '2026/02/chelsey-chapman-meet-the-team.png'],
      ['Ella', 'Account Support Executive Team Lead', '2026/02/Ella-Drury-meet-the-team.png'],
      ['Samantha', 'Assessments Co-ordinator', '2024/04/samantha.png'],
      ['Katie', 'Assessments Co-ordinator', '2024/04/katie.png'],
      ['Kelly', 'Assessments Co-ordinator', '2026/07/Kelly-Richards-meet-the-team.png'],
      ['Nami', 'Assessments Co-ordinator', '2026/07/Nami-Shah-meet-the-team.png'],
      ['Jina', 'Assessments Co-ordinator', '2026/07/Jina-Kirby-meet-the-team.png'],
      ['Maxine', 'Course Coordinator', '2024/10/MAXINE.png'],
      ['Jheniel', 'Course Coordinator', '2025/08/jheniel-g-meet-the-team.png'],
      ['Sharon', 'Course Coordinator', '2026/07/Sharon-Gaspar-meet-the-team.png'],
      ['Ben', 'Course Coordinator', ''],
      ['Laura', ASE, '2026/07/laura-wright-meet-the-team.png'],
      ['Deanna', ASE, '2026/02/Deanna-Jarvis-meet-the-team.png'],
      ['Katie B', ASE, '2026/10/website-meet-the-Katie-Bowers.png'],
      ['Emily H', ASE, '2026/10/website-meet-the-team-Emily-Harper.png'],
      ['Ellen', ASE, '2026/10/website-meet-the-team-Ellen-Rutter.png'],
      ['Fortune', 'Learner Progression Executive', '2026/02/Fortune-Emeri-meet-the-team.png'],
      ['Mirabel', 'Learner Progression Executive', ''],
      ['Mohamed', 'Learner Progression Executive', ''],
      ['Charika', 'Customer Sales and Upsell Executive', '2026/10/website-meet-the-team-Charika-G.png'],
      ['Michael U', 'Customer Sales and Upsell Executive', '2026/10/website-meet-the-team-Michael-Udoji.png'],
      ['Jordan U', 'Customer Sales and Upsell Executive', '']
    ]},
    { id: 'operations', label: 'Operations', people: [
      ['Karen', 'Scheduling Manager', '2024/04/karen.png'],
      ['Daniel', 'Scheduling Manager', '2026/07/Lewis-Huitson-meet-the-team.png'],
      ['Joanna', 'Scheduling Manager', '2026/07/Joanna-Nicholson-meet-the-team.png'],
      ['Paula', 'Tutor Coordinator', '2026/07/Paula-Belcher-meet-the-team.png']
    ]},
    { id: 'tutors', label: 'Tutors & Assessors', groups: [
      { label: 'Tutors', people: [
        ['Nic', 'Head of Training and Standards', '2024/04/nic.png'],
        ['Simon', 'Head of Tutor Delivery', '2024/04/simon.png'],
        ['Phil', 'Lead Tutor', '2024/04/philip.png'],
        ['Asten', 'Lead Tutor', '2024/10/ASTEN.png'],
        ['Mark', 'Lead Tutor', '2024/10/MARK.png'],
        ['Peter', 'Lead Tutor', '2024/10/PETER.png'],
        ['Lee B', 'Lead Temporary Works Tutor', '2026/07/Lee-Belcher-meet-the-team.png'],
        ['Peter F', 'NEBOSH Tutor', '2026/02/Peter-Fry-meet-the-team.png'],
        ['Andy', 'First Aid Tutor', '2024/10/Andy-Thorpe.png'],
        ['David', TU, '2024/04/david.png'], ['Derek', TU, '2024/04/derek.png'], ['Mark', TU, '2024/04/mark.png'],
        ['Michael', TU, '2025/11/michael-harper-website-meet-the-team.png'], ['Neil C', TU, '2024/04/neil.png'], ['Neil H', TU, ''],
        ['Alessandro', TU, '2025/08/Alessandro-h-meet-the-team.png'], ['David N', TU, '2026/02/David-Nichol-meet-the-team.png'],
        ['Godfrey', TU, '2026/02/Godfrey-Nyakura-meet-the-team.png'], ['Roger', TU, '2024/04/roger.png'], ['Sharon', TU, '2024/10/SHARON.png'],
        ['Toby', TU, '2024/10/TOBY.png'], ['Dean W', TU, ''], ['Ataif', TU, '2026/02/Ataif-Rafique-meet-the-team.png'], ['Ernest A', TU, ''],
        ['Hadley A', TU, ''], ['Stephen R', TU, '2026/02/Stephen-Rodgers-meet-the-team.png'], ['Steven D', TU, ''],
        ['Stephen K', TU, '2026/02/Stephen-Kaged-meet-the-team.png'], ['Jean', TU, '2026/07/Jean-Thompson-meet-the-team.png'],
        ['Barry K', TU, '2026/07/Barry-Kelly-meet-the-team.png'], ['Philip L', TU, ''], ['Frank S', TU, '2026/07/Frank-Sutherland-meet-the-team.png'],
        ['Leighton', TU, '2026/07/Leighton-Barnett-meet-the-team.png'], ['Joseph B', TU, '2026/07/Joseph-Beattie-meet-the-team.png'],
        ['Michael W', TU, '2026/07/Michael-Williams-meet-the-team.png'], ['Lisa B', TU, '2026/07/Lisa-Beadsworth-meet-the-team.png'],
        ['Ben', TU, '2026/07/ben-Reay-meet-the-team.png'], ['Gavin B', TU, '2026/07/Gavin-Bricklebank-meet-the-team.png'],
        ['Kelly W', TU, '2026/07/Kelly-Watson-meet-the-team.png'], ['Paul H', TU, '2026/07/Paul-Harvey-meet-the-team.png'],
        ['Jordan M', TU, '2026/07/Jordan-Mitchell-meet-the-team.png'], ['John R', TU, '2026/07/John-Rumble-meet-the-team.png'],
        ['Jonathan L', TU, '2026/07/Jonathan-Lye-meet-the-team.png'], ['Ransome D', TU, '2026/07/Ransome-Dick-meet-the-team.png'],
        ['John M', TU, '2026/07/John-Murphy-meet-the-team.png'], ['Matt F', TU, '2026/07/Matthew-Ford-meet-the-team.png'],
        ['Michael G', TU, '2026/07/Michael-Greenway-meet-the-team.png'], ['James W', TU, '2026/10/website-meet-the-team-James-Warren.png'],
        ['Andrew K', TU, ''], ['Steve L', TU, '2026/10/website-meet-the-team-Steve-Lane.png']
      ]},
      { label: 'Assessors', people: [
        ['James', 'Head Assessor & IQA', '2024/04/james.png'],
        ['Daniel', 'Senior Assessor', '2026/02/daniel-buckley-meet-the-team.png'],
        ['Vlad', 'Senior Assessor', '2024/04/vlad.png'],
        ['Wayne M', 'Assessor & IQA', '2024/10/WAYNE.png'],
        ['Ragbir', AS, '2024/10/RAGBIR.png'], ['Scott', AS, '2024/10/SCOTT.png'], ['Alexander E', AS, ''], ['Mark S', AS, ''],
        ['Gary N', AS, '2024/04/GARY.png'], ['Garry', AS, '2024/04/garry-alcock.png'], ['Ciprian', AS, '2024/10/ciprian.png'],
        ['Roger', AS, '2025/08/roger-s-meet-the-team.png'], ['Graham W', AS, ''], ['Brian C', AS, '2026/02/brian-carmichael-meet-the-team.png'],
        ['Fred D', AS, '2025/08/fred-d-meet-the-team.png'], ['Paul G', AS, '2026/02/Paul-Gascoyne-meet-the-team.png'],
        ['Kurt', AS, '2026/02/Kurtis-Richards-meet-the-team.png'], ['Oliver', AS, '2026/02/oliver-green-meet-the-team.png'],
        ['Levi', AS, '2026/02/levi-prescott-meet-the-team.png'], ['Martin T', AS, ''], ['Steven M', AS, ''],
        ['Gary B', AS, '2026/10/website-meet-the-team-Gary-Bower.png'], ['Steve R', AS, '2026/10/website-meet-the-team-Steve-Rhead.png'],
        ['Steven H', AS, '2026/10/website-meet-the-team-Steven-Harrison.png']
      ]},
      { label: 'CMI & ILM Assessors', people: [
        ['Cheryl', ILMA, '2026/02/Cheryl-Watson-meet-the-team.png'], ['Sandra', ILMA, '2026/02/Sandra-Addae-meet-the-team.png'],
        ['Stephen L', ILMA, '2026/07/Stephen-Littler-meet-the-team.png'], ['Rachel', ILMA, '2026/07/Rachel-Pratt-meet-the-team.png']
      ]},
      { label: 'Project Management Tutors', people: [
        ['Kobus', 'Senior Project Management Tutor', '2024/04/kobus.png'], ['Nelly', 'Project Management Tutor', '2024/10/nelly.png']
      ]}
    ]},
    { id: 'sales', label: 'Sales', people: [
      ['Luisa', 'Director of Commercial Development', '2025/04/luisa.png'],
      ['Riyad', 'Business Development Manager', '2025/08/RIYAD-I-meet-the-team.png'],
      ['Aaron', 'Regional Business Development Manager', '2026/09/website-meet-the-team-Aaron-N.png'],
      ['Jacqueline', 'Regional Business Development Manager', '2026/09/website-meet-the-team-Jacqueline-G.png'],
      ['Nichola', 'Regional Business Development Manager', ''],
      ['Rachel', 'Regional Business Development Manager', '2026/09/website-meet-the-team-rachel-a.png'],
      ['Thomas', 'Business Development Executive Team Lead', '2025/08/thomas-m-meet-the-team.png'],
      ['Jedidiah', 'Senior Business Development Executive', '2025/08/jedidiah-u-meet-the-team.png'],
      ['Blake', BDE, '2026/02/Blake-Maasalo-meet-the-team.png'], ['Ernest K', BDE, '2026/02/Ernest-Kargbo-meet-the-team.png'],
      ['Emeka', BDE, ''], ['Thomas', BDE, '2026/02/Thomas-Cole-meet-the-team.png'], ['Femi', BDE, ''],
      ['Raheem', BDE, '2026/02/Raheem-Agbalaya-meet-the-team.png'], ['Ewan', BDE, '2026/02/Ewan-Clement-meet-the-team.png'],
      ['Oluwatosin', BDE, ''], ['Remi', BDE, '2026/02/Remi-Lavai-meet-the-team.png'], ['Ben', BDE, '2026/07/ben-masters-meet-the-team.png'],
      ['Javanie', BDE, ''], ['Joshua', BDE, ''], ['James', BDE, ''], ['Thomas', BDE, ''], ['Jordan', BDE, '']
    ]},
    { id: 'marketing', label: 'Marketing', people: [
      ['Liam', 'Head of Marketing', '2024/04/laim.png'], ['Freya', 'Marketing Manager', '2024/04/freya.png'], ['Matthew', 'SEO Executive', '2025/04/Matthew.png']
    ]},
    { id: 'it', label: 'IT', people: [
      ['Luke G', 'Lead Developer', '2024/12/luke-golding-meet-the-team.png'], ['Ryan', 'IT Project Delivery Coordinator', '2026/08/Ryan-O-meet-the-team.png'],
      ['Katie', 'IT Support Technician', '2025/04/katie-b.png'], ['Dylan', 'Graduate Developer', ''], ['Abineha', 'Junior Fullstack Developer', '']
    ]},
    { id: 'quality', label: 'Quality Assurance', people: [
      ['Rob', 'Quality Manager', '2024/04/rob.png'], ['Renee', 'IQA Auditor', '2024/04/renee.png'], ['Darren', 'IQA Auditor', '2024/10/DARREN.png'],
      ['David', 'IQA Auditor', '2024/10/DAVID-RENTON.png'], ['Adenike', 'Document Controller', '2024/10/adenike.png'], ['Fiona', 'IQA', '2024/10/fiona.png']
    ]},
    { id: 'learning-design', label: 'Learning Design', people: [
      ['Jacob', 'Instructional Designer', '2026/07/Jacob-Fell-meet-the-team.png'], ['Leah', 'Instructional Designer', '2026/07/Leah-Frame-meet-the-team.png'],
      ['Annalise', 'Junior Instructional Designer', '2026/07/annalise-wills-meet-the-team.png']
    ]},
    { id: 'hr-accounts', label: 'HR & Accounts', people: [
      ['Carey', 'HR Consultant', '2026/07/carey-smith-meet-the-team.png'], ['Pooja', 'Senior HR Coordinator', '2024/04/pooja.png'],
      ['Photis', 'Finance Director', '2026/07/Photis-Kellaris-meet-the-team.png'], ['Danielle', 'Finance Manager', '2024/10/danielle.png'],
      ['Marco', 'Senior Credit Controller', '2026/10/website-meet-the-team-Marco-Dellavalle.png'], ['Winston', 'Credit Controller', '2025/08/Winston-H-meet-the-team.png'],
      ['Luke', 'Accounts Assistant', '2026/02/Luke-Probert-meet-the-team.png']
    ]}
  ];

  /* ---------- Images (WordPress Media Library) ---------- */
  var IMG = {
    team: WP + '2026/10/IMG_1683-1-scaled.jpeg',
    meeting: WP + '2026/10/IMG_5383-scaled.jpg',
    sign: WP + '2026/10/IMG_4281.jpg',
    classroom: WP + '2026/10/classroom-photo-no-logo-2.png',
    reception: ''  // TODO: add URL once about-reception.jpg (cropped version) is uploaded
  };
  if (window.CST_ABOUT_IMAGES) Object.keys(window.CST_ABOUT_IMAGES).forEach(function (k) { IMG[k] = window.CST_ABOUT_IMAGES[k]; });

  var GALLERY = [
    { k: 'team', cap: 'Some of the team at River House', cls: 'big' },
    { k: 'meeting', cap: 'Team meeting at River House', cls: 'tall' },
    { k: 'sign', cap: 'River House, Bexley High Street', cls: 'tall' },
    { k: 'classroom', cap: 'SSSTS delegates on the last day of their course', cls: 'wide' },
    { k: 'reception', cap: 'Reception at River House', cls: 'wide logo' }
  ].filter(function (g) { return IMG[g.k]; });

  /* ---------- Styles ---------- */
  var CSS = [
    'html{overflow-x:clip}',
    '#cst-about{--n:#1C2560;--n2:#141B4A;--o:#FF8A00;--s:#F4F6FA;--b:#DDE3F0;--t:#3D4665;--m:#6B7394;--hf:"Alata",Arial,sans-serif;--bf:"Asap",Arial,sans-serif;font-family:var(--bf);color:var(--t);line-height:1.6;font-size:17px;-webkit-font-smoothing:antialiased}',
    '#cst-about *,#cst-about *::before,#cst-about *::after{box-sizing:border-box}',
    '#cst-about h1,#cst-about h2,#cst-about h3,#cst-about h4,#cst-about p{margin:0;padding:0;text-transform:none;text-align:left}',
    '#cst-about h1,#cst-about h2,#cst-about h3{font-family:var(--hf);font-weight:400;letter-spacing:.02em;line-height:1.12;color:var(--n)}',
    '#cst-about a{text-decoration:none}',
    '#cst-about img{max-width:100%;display:block}',
    '#cst-about button{font-family:inherit;cursor:pointer}',
    '#cst-about .cab-band{width:100vw;margin-left:calc(50% - 50vw);position:relative}',
    '#cst-about .cab-wrap{max-width:1180px;margin:0 auto;padding:0 24px}',
    '#cst-about .cab-sec{padding:96px 0}',
    '#cst-about .cab-eyebrow{display:inline-flex;align-items:center;gap:10px;font-weight:700;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--o);margin-bottom:14px}',
    '#cst-about .cab-eyebrow::before{content:"";width:22px;height:3px;border-radius:2px;background:var(--o)}',
    '#cst-about .cab-h2{font-size:clamp(30px,4vw,46px);margin-bottom:14px}',
    '#cst-about .cab-lead{font-size:19px;color:var(--m);max-width:640px}',
    '#cst-about .cab-head{margin-bottom:48px}',
    '#cst-about .cab-btn{display:inline-flex;align-items:center;gap:10px;padding:15px 26px;border-radius:999px;font-weight:700;font-size:16px;border:2px solid transparent;transition:transform .25s,box-shadow .25s,background .25s,color .25s}',
    '#cst-about .cab-btn:hover{transform:translateY(-2px)}',
    '#cst-about .cab-btn-o{background:var(--o);color:#fff;box-shadow:0 10px 24px -10px rgba(255,138,0,.8)}',
    '#cst-about .cab-btn-ghost{border-color:rgba(255,255,255,.35);color:#fff}',
    '#cst-about .cab-btn-ghost:hover{border-color:#fff;background:rgba(255,255,255,.08)}',
    '#cst-about .cab-btn-n{background:var(--n);color:#fff}',
    '#cst-about .cab-arrow{display:inline-block;transition:transform .25s}#cst-about .cab-btn:hover .cab-arrow{transform:translateX(4px)}',
    /* hero */
    '#cst-about .cab-hero{background:radial-gradient(1200px 600px at 85% 10%,#2A3580 0%,transparent 60%),var(--n);color:#fff;overflow:hidden;padding:110px 0 150px}',
    '#cst-about .cab-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:56px 56px;mask-image:linear-gradient(to bottom,#000 30%,transparent 95%);-webkit-mask-image:linear-gradient(to bottom,#000 30%,transparent 95%)}',
    '#cst-about .cab-rise{position:absolute;bottom:-40%;width:2px;height:120px;background:linear-gradient(to top,transparent,var(--o));border-radius:2px;opacity:.55;animation:cabRise linear infinite}',
    '@keyframes cabRise{from{transform:translateY(0)}to{transform:translateY(-190vh)}}',
    '#cst-about .cab-hero-in{position:relative;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}',
    '#cst-about .cab-hero h1{color:#fff;font-size:clamp(38px,5.4vw,66px);margin-bottom:22px}',
    '#cst-about .cab-hero h1 em{font-style:normal;color:var(--o)}',
    '#cst-about .cab-hero .cab-lead{color:rgba(255,255,255,.78);margin-bottom:34px}',
    '#cst-about .cab-hero-btns{display:flex;flex-wrap:wrap;gap:14px}',
    '#cst-about .cab-hero-photo{position:relative}',
    '#cst-about .cab-hero-photo .cab-ph{border-radius:28px;overflow:hidden;box-shadow:0 40px 80px -30px rgba(0,0,0,.6);transform:rotate(1.5deg);transition:transform .6s}',
    '#cst-about .cab-hero-photo:hover .cab-ph{transform:rotate(0)}',
    '#cst-about .cab-hero-photo img{width:100%;aspect-ratio:4/3;object-fit:cover}',
    '#cst-about .cab-badge{position:absolute;left:-28px;bottom:-30px;background:#fff;color:var(--n);border-radius:20px;padding:18px 22px;box-shadow:0 24px 50px -20px rgba(0,0,0,.45);display:flex;gap:16px;align-items:center;max-width:320px;animation:cabFloat 5s ease-in-out infinite}',
    '@keyframes cabFloat{50%{transform:translateY(-8px)}}',
    '#cst-about .cab-badge b{font-family:var(--hf);font-weight:400;font-size:44px;line-height:1;color:var(--o)}',
    '#cst-about .cab-badge span{font-weight:700;font-size:15px;line-height:1.3}',
    '#cst-about .cab-badge small{display:block;font-weight:400;font-size:12px;color:var(--m);margin-top:4px}',
    /* stats */
    '#cst-about .cab-stats{position:relative;margin-top:-80px;z-index:2}',
    '#cst-about .cab-stats-in{display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-radius:24px;box-shadow:0 30px 60px -30px rgba(28,37,96,.35);border:1px solid var(--b);overflow:hidden}',
    '#cst-about .cab-stat{padding:30px 26px;border-right:1px solid var(--b)}#cst-about .cab-stat:last-child{border-right:0}',
    '#cst-about .cab-stat b{display:block;font-family:var(--hf);font-weight:400;font-size:clamp(32px,3.6vw,44px);color:var(--n);line-height:1.05}',
    '#cst-about .cab-stat b i{font-style:normal;color:var(--o)}#cst-about .cab-stat b em{font-style:normal}',
    '#cst-about .cab-stat span{display:block;margin-top:6px;font-size:15px;color:var(--m)}',
    /* story */
    '#cst-about .cab-story{display:grid;grid-template-columns:280px 1fr;gap:48px}',
    '#cst-about .cab-tabs{display:flex;flex-direction:column;gap:10px}',
    '#cst-about .cab-tab{text-align:left;padding:18px 20px;border-radius:16px;border:1px solid var(--b);background:#fff;color:var(--n);font-weight:700;font-size:16px;display:flex;gap:14px;align-items:center;transition:all .25s}',
    '#cst-about .cab-tab i{font-style:normal;font-family:var(--hf);color:var(--m);font-size:14px}',
    '#cst-about .cab-tab:hover{border-color:var(--n)}',
    '#cst-about .cab-tab[aria-selected="true"]{background:var(--n);color:#fff;border-color:var(--n);box-shadow:0 16px 30px -16px rgba(28,37,96,.6)}',
    '#cst-about .cab-tab[aria-selected="true"] i{color:var(--o)}',
    '#cst-about .cab-panel{background:var(--s);border-radius:24px;padding:44px;position:relative;overflow:hidden;min-height:330px}',
    '#cst-about .cab-panel[hidden]{display:none}',
    '#cst-about .cab-panel.cab-show{animation:cabIn .5s ease both}',
    '@keyframes cabIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}',
    '#cst-about .cab-panel h3{font-size:clamp(24px,2.6vw,32px);margin-bottom:16px}',
    '#cst-about .cab-panel p+p{margin-top:14px}',
    '#cst-about .cab-panel .cab-big{position:absolute;right:24px;bottom:-30px;font-family:var(--hf);font-size:180px;line-height:1;color:rgba(28,37,96,.05);pointer-events:none}',
    '#cst-about .cab-quote{margin-top:56px;background:var(--n);color:#fff;border-radius:28px;padding:56px;position:relative;overflow:hidden;display:grid;grid-template-columns:auto 1fr;gap:36px;align-items:center}',
    '#cst-about .cab-quote::after{content:"";position:absolute;right:-60px;top:-60px;width:240px;height:240px;border-radius:50%;border:40px solid rgba(255,138,0,.12)}',
    '#cst-about .cab-quote img,#cst-about .cab-quote .cab-qi{width:120px;height:120px;border-radius:50%;object-fit:cover;border:4px solid var(--o);background:#fff}',
    '#cst-about .cab-quote blockquote{margin:0;padding:0;border:0;font-family:var(--hf);font-size:clamp(20px,2.3vw,28px);line-height:1.4;color:#fff;position:relative;z-index:1}',
    '#cst-about .cab-quote blockquote::before{content:"\\201C";color:var(--o);font-size:1.6em;line-height:0;vertical-align:-.35em;margin-right:4px}',
    '#cst-about .cab-quote cite{display:block;margin-top:18px;font-style:normal;font-family:var(--bf);font-size:15px;color:rgba(255,255,255,.7)}',
    '#cst-about .cab-quote cite b{color:#fff}',
    '#cst-about .cab-pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:28px}',
    '#cst-about .cab-pillar{border:1px solid var(--b);border-radius:20px;padding:28px;background:#fff;transition:transform .3s,box-shadow .3s,border-color .3s}',
    '#cst-about .cab-pillar:hover{transform:translateY(-6px);box-shadow:0 24px 40px -24px rgba(28,37,96,.4);border-color:transparent}',
    '#cst-about .cab-pillar .cab-ic{width:48px;height:48px;border-radius:14px;background:#FFF7EC;display:grid;place-items:center;margin-bottom:18px}',
    '#cst-about .cab-pillar h3{font-size:20px;margin-bottom:8px}',
    '#cst-about .cab-pillar p{font-size:15px;color:var(--m)}',
    /* timeline */
    '#cst-about .cab-tl-sec{background:var(--s)}',
    '#cst-about .cab-tl{position:relative;max-width:980px;margin:0 auto}',
    '#cst-about .cab-tl-line{position:absolute;left:50%;top:0;bottom:0;width:4px;margin-left:-2px;background:var(--b);border-radius:4px}',
    '#cst-about .cab-tl-fill{position:absolute;left:0;top:0;width:100%;height:0;background:linear-gradient(var(--n),var(--o));border-radius:4px}',
    '#cst-about .cab-tl-item{position:relative;width:50%;padding:0 48px 56px 0;opacity:0;transform:translateY(30px);transition:opacity .7s,transform .7s}',
    '#cst-about .cab-tl-item:nth-child(odd){margin-left:50%;padding:0 0 56px 48px}',
    '#cst-about .cab-tl-item.cab-on{opacity:1;transform:none}@media(min-width:701px){#cst-about .cab-tl-item+.cab-tl-item{margin-top:-90px}}',
    '#cst-about .cab-tl-dot{position:absolute;top:22px;right:-11px;width:22px;height:22px;border-radius:50%;background:#fff;border:4px solid var(--b);transition:border-color .4s,transform .4s;z-index:1}',
    '#cst-about .cab-tl-item:nth-child(odd) .cab-tl-dot{right:auto;left:-11px}',
    '#cst-about .cab-tl-item.cab-on .cab-tl-dot{border-color:var(--o);transform:scale(1.15)}',
    '#cst-about .cab-tl-card{background:#fff;border-radius:20px;padding:26px 28px;box-shadow:0 20px 40px -28px rgba(28,37,96,.45);border:1px solid var(--b)}',
    '#cst-about .cab-tl-card.cab-hl{background:var(--n);border-color:var(--n)}',
    '#cst-about .cab-tl-card.cab-hl h3{color:#fff}#cst-about .cab-tl-card.cab-hl p{color:rgba(255,255,255,.78)}',
    '#cst-about .cab-tl-date{display:inline-block;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--o);margin-bottom:8px}',
    '#cst-about .cab-tl-card h3{font-size:22px;margin-bottom:8px}',
    '#cst-about .cab-tl-card p{font-size:15.5px}',
    '#cst-about .cab-tl-card img{margin-top:16px;border-radius:14px;width:100%;height:170px;object-fit:cover}',
    /* gallery */
    '#cst-about .cab-gal{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:220px;gap:16px}',
    '#cst-about .cab-gi{position:relative;border-radius:20px;overflow:hidden;cursor:zoom-in;border:0;padding:0;background:var(--s)}',
    '#cst-about .cab-gi.wide{grid-column:span 2}#cst-about .cab-gi.tall{grid-row:span 2}#cst-about .cab-gi.big{grid-column:span 2;grid-row:span 2}#cst-about .cab-gi.logo{background:#ECEAE6}#cst-about .cab-gi.logo img{object-fit:contain}',
    '#cst-about .cab-gi img{width:100%;height:100%;object-fit:cover;transition:transform .7s}',
    '#cst-about .cab-gi:hover img{transform:scale(1.06)}',
    '#cst-about .cab-gi span{position:absolute;left:0;right:0;bottom:0;padding:40px 18px 14px;background:linear-gradient(transparent,rgba(20,27,74,.85));color:#fff;font-size:14px;font-weight:700;text-align:left;transform:translateY(100%);transition:transform .35s}',
    '#cst-about .cab-gi:hover span,#cst-about .cab-gi:focus-visible span{transform:none}',
    '#cst-about .cab-lb{position:fixed;inset:0;background:rgba(14,19,52,.92);display:none;align-items:center;justify-content:center;z-index:99999;padding:30px}',
    '#cst-about .cab-lb.cab-open{display:flex;animation:cabFade .25s}',
    '@keyframes cabFade{from{opacity:0}}',
    '#cst-about .cab-lb img{max-height:82vh;max-width:90vw;border-radius:14px}',
    '#cst-about .cab-lb p{position:absolute;bottom:22px;left:0;right:0;text-align:center;color:#fff;font-size:15px}',
    '#cst-about .cab-lb button{position:absolute;background:rgba(255,255,255,.12);color:#fff;border:0;width:52px;height:52px;border-radius:50%;font-size:24px;line-height:1}',
    '#cst-about .cab-lb button:hover{background:var(--o)}',
    '#cst-about .cab-lb-x{top:20px;right:20px}#cst-about .cab-lb-p{left:20px;top:50%}#cst-about .cab-lb-n{right:20px;top:50%}',
    /* team */
    '#cst-about .cab-team-sec{background:linear-gradient(var(--n),var(--n2));color:#fff;overflow:hidden}',
    '#cst-about .cab-team-sec .cab-h2{color:#fff}#cst-about .cab-team-sec .cab-lead{color:rgba(255,255,255,.72)}',
    '#cst-about .cab-team-top{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-bottom:28px}',
    '#cst-about .cab-search{position:relative;min-width:280px}',
    '#cst-about .cab-search input{width:100%;padding:14px 18px 14px 46px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff;font-family:inherit;font-size:16px;outline:none;transition:border-color .2s,background .2s;margin:0;height:auto;box-shadow:none}',
    '#cst-about .cab-search input::placeholder{color:rgba(255,255,255,.55)}',
    '#cst-about .cab-search input:focus{border-color:var(--o);background:rgba(255,255,255,.12)}',
    '#cst-about .cab-search svg{position:absolute;left:17px;top:50%;transform:translateY(-50%);opacity:.6}',
    '#cst-about .cab-chips{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 14px;scrollbar-width:thin;margin-bottom:26px}',
    '#cst-about .cab-chip{flex:0 0 auto;padding:11px 18px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:transparent;color:#fff;font-weight:700;font-size:15px;display:flex;gap:8px;align-items:center;transition:all .2s;white-space:nowrap}',
    '#cst-about .cab-chip small{font-size:12px;background:rgba(255,255,255,.14);border-radius:999px;padding:2px 8px;font-weight:700}',
    '#cst-about .cab-chip:hover{border-color:#fff}',
    '#cst-about .cab-chip[aria-pressed="true"]{background:var(--o);border-color:var(--o)}',
    '#cst-about .cab-chip[aria-pressed="true"] small{background:rgba(0,0,0,.15)}',
    '#cst-about .cab-sub{font-family:var(--hf);font-size:20px;color:var(--o);margin:10px 0 18px;letter-spacing:.03em}',
    '#cst-about .cab-people{display:grid;grid-template-columns:repeat(auto-fill,minmax(165px,1fr));gap:18px;margin-bottom:30px}',
    '#cst-about .cab-p{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:22px 14px 20px;text-align:center;transition:transform .3s,background .3s,border-color .3s;animation:cabPop .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 25ms)}',
    '@keyframes cabPop{from{opacity:0;transform:translateY(18px) scale(.96)}}',
    '#cst-about .cab-p:hover{transform:translateY(-6px);background:rgba(255,255,255,.1);border-color:rgba(255,138,0,.6)}',
    '#cst-about .cab-av{width:104px;height:104px;margin:0 auto 14px;border-radius:50%;position:relative;padding:4px;background:conic-gradient(var(--o) 0 0,rgba(255,255,255,.15) 0);transition:background .4s}',
    '#cst-about .cab-p:hover .cab-av{background:conic-gradient(var(--o) 0 360deg,rgba(255,255,255,.15) 0)}',
    '#cst-about .cab-av img{width:100%;height:100%;border-radius:50%;object-fit:cover;background:#fff}',
    '#cst-about .cab-av .cab-in{width:100%;height:100%;border-radius:50%;display:none;place-items:center;background:linear-gradient(135deg,#2A3580,var(--n));font-family:var(--hf);font-size:32px;color:#fff}',
    '#cst-about .cab-av.cab-noimg .cab-in{display:grid}',
    '#cst-about .cab-p b{display:block;font-size:16px;color:#fff}',
    '#cst-about .cab-p span{display:block;font-size:13px;line-height:1.35;color:rgba(255,255,255,.65);margin-top:4px}',
    '#cst-about .cab-empty{padding:40px;text-align:center;color:rgba(255,255,255,.7)}',
    '#cst-about .cab-team-note{font-size:15px;color:rgba(255,255,255,.6);text-align:center;margin-top:10px}',
    /* accreditations */
    '#cst-about .cab-acc{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}',
    '#cst-about .cab-acc a{background:#fff;border:1px solid var(--b);border-radius:18px;height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px;position:relative;overflow:hidden;transition:transform .3s,box-shadow .3s,border-color .3s}',
    '#cst-about .cab-acc a:hover{transform:translateY(-5px);border-color:var(--o);box-shadow:0 20px 34px -22px rgba(28,37,96,.45)}',
    '#cst-about .cab-acc img{max-height:62px;width:auto;max-width:100%;object-fit:contain;filter:grayscale(1);opacity:.75;transition:filter .3s,opacity .3s}',
    '#cst-about .cab-acc a:hover img{filter:none;opacity:1}',
    '#cst-about .cab-acc em{font-style:normal;font-size:12px;font-weight:700;color:var(--m);margin-top:8px;letter-spacing:.06em;text-transform:uppercase}',
    '#cst-about .cab-acc a.cab-noimg img{display:none}#cst-about .cab-acc a.cab-noimg em{font-family:var(--hf);font-size:22px;color:var(--n);text-transform:none;margin:0}',
    /* venues */
    '#cst-about .cab-ven-sec{background:var(--s)}',
    '#cst-about .cab-ven{display:grid;grid-template-columns:1fr 1.15fr;gap:28px;align-items:stretch}',
    '#cst-about .cab-vlist{display:flex;flex-direction:column;gap:10px}',
    '#cst-about .cab-v{text-align:left;background:#fff;border:1px solid var(--b);border-radius:16px;padding:16px 18px;display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;color:var(--t);transition:all .25s}',
    '#cst-about .cab-v .cab-pin{width:38px;height:38px;border-radius:12px;background:var(--s);display:grid;place-items:center;transition:background .25s}',
    '#cst-about .cab-v b{display:block;color:var(--n);font-size:16px}',
    '#cst-about .cab-v small{display:block;font-size:13.5px;color:var(--m);line-height:1.4}',
    '#cst-about .cab-v:hover{border-color:var(--n)}',
    '#cst-about .cab-v[aria-pressed="true"]{border-color:var(--o);box-shadow:0 14px 28px -20px rgba(28,37,96,.5)}',
    '#cst-about .cab-v[aria-pressed="true"] .cab-pin{background:var(--o)}#cst-about .cab-v[aria-pressed="true"] .cab-pin svg{stroke:#fff}',
    '#cst-about .cab-map{border-radius:24px;overflow:hidden;background:#dfe5f1;min-height:420px;position:relative;box-shadow:0 30px 60px -36px rgba(28,37,96,.5)}',
    '#cst-about .cab-map iframe{position:absolute;inset:0;width:100%;height:100%;border:0}',
    '#cst-about .cab-map-tag{position:absolute;left:16px;bottom:16px;background:var(--n);color:#fff;padding:10px 16px;border-radius:12px;font-size:14px;font-weight:700;z-index:1;box-shadow:0 10px 20px -10px rgba(0,0,0,.5)}',
    '#cst-about .cab-tag-hq{font-style:normal;display:inline-block;margin-left:6px;font-size:11px;background:var(--o);color:#fff;border-radius:6px;padding:1px 7px;vertical-align:2px}',
    '#cst-about .cab-more{margin-top:16px;font-size:15px;color:var(--m)}',
    /* careers + cta */
    '#cst-about .cab-careers{border-radius:32px;background:var(--n);color:#fff;padding:64px;display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center;position:relative;overflow:hidden}',
    '#cst-about .cab-careers::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:40px 40px}',
    '#cst-about .cab-careers>*{position:relative}',
    '#cst-about .cab-careers h2{color:#fff;font-size:clamp(28px,3.4vw,40px);margin-bottom:14px}',
    '#cst-about .cab-careers p{color:rgba(255,255,255,.78);margin-bottom:26px}',
    '#cst-about .cab-roles{display:flex;flex-wrap:wrap;gap:10px}',
    '#cst-about .cab-roles a{padding:12px 16px;border-radius:14px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;font-weight:700;font-size:15px;transition:all .2s}',
    '#cst-about .cab-roles a:hover{background:var(--o);border-color:var(--o)}',
    '#cst-about .cab-cta{text-align:center;padding:90px 0 100px}',
    '#cst-about .cab-cta h2{text-align:center;font-size:clamp(30px,4vw,48px);margin-bottom:14px}',
    '#cst-about .cab-cta p{text-align:center;max-width:560px;margin:0 auto 30px;color:var(--m)}',
    '#cst-about .cab-foot{font-size:12.5px;color:var(--m);text-align:center;margin-top:36px}',
    /* reveal */
    '#cst-about .cab-rv{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s ease}',
    '#cst-about .cab-rv.cab-on{opacity:1;transform:none}',
    /* responsive */
    '@media(max-width:980px){#cst-about .cab-hero-in,#cst-about .cab-story,#cst-about .cab-ven,#cst-about .cab-careers{grid-template-columns:1fr}#cst-about .cab-tabs{flex-direction:row;overflow-x:auto}#cst-about .cab-tab{flex:0 0 auto}#cst-about .cab-acc{grid-template-columns:repeat(3,1fr)}#cst-about .cab-stats-in{grid-template-columns:repeat(2,1fr)}#cst-about .cab-stat:nth-child(2){border-right:0}#cst-about .cab-stat:nth-child(-n+2){border-bottom:1px solid var(--b)}#cst-about .cab-pillars{grid-template-columns:1fr}#cst-about .cab-gal{grid-template-columns:repeat(2,1fr)}#cst-about .cab-badge{left:12px}}',
    '@media(max-width:700px){#cst-about .cab-sec{padding:70px 0}#cst-about .cab-hero{padding:80px 0 130px}#cst-about .cab-tl-line{left:11px}#cst-about .cab-tl-item,#cst-about .cab-tl-item:nth-child(odd){width:100%;margin-left:0;padding:0 0 36px 44px}#cst-about .cab-tl-dot,#cst-about .cab-tl-item:nth-child(odd) .cab-tl-dot{left:0;right:auto}#cst-about .cab-quote{grid-template-columns:1fr;padding:36px}#cst-about .cab-panel{padding:30px}#cst-about .cab-careers{padding:36px}#cst-about .cab-acc{grid-template-columns:repeat(2,1fr)}#cst-about .cab-gal{grid-auto-rows:160px}#cst-about .cab-people{grid-template-columns:repeat(2,1fr)}#cst-about .cab-map{min-height:320px}#cst-about .cab-search{min-width:100%}}',
    '@media(prefers-reduced-motion:reduce){#cst-about *{animation:none!important;transition:none!important}#cst-about .cab-rv,#cst-about .cab-tl-item{opacity:1;transform:none}#cst-about .cab-rise{display:none}}'
  ].join('\n');

  /* ---------- Helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function initials(n) { var p = n.split(' '); return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase(); }
  var ICON = {
    shield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    star: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
    home: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V21H3z"/><path d="M9 21v-6h6v6"/></svg>',
    pin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C2560" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'
  };
  var IMGERR = 'onerror="this.parentNode.classList.add(\'cab-noimg\');this.remove()"';

  function personHTML(p, i) {
    var img = p[2] ? '<img loading="lazy" src="' + WP + p[2] + '" alt="' + esc(p[0]) + ', ' + esc(p[1]) + '" ' + IMGERR + '>' : '';
    return '<div class="cab-p" style="--i:' + Math.min(i, 30) + '"><div class="cab-av' + (p[2] ? '' : ' cab-noimg') + '">' + img + '<div class="cab-in" aria-hidden="true">' + initials(p[0]) + '</div></div><b>' + esc(p[0]) + '</b><span>' + esc(p[1]) + '</span></div>';
  }
  function deptPeople(d) { return d.groups ? d.groups.reduce(function (a, g) { return a.concat(g.people); }, []) : d.people; }

  /* ---------- Markup ---------- */
  function build() {
    var rises = '';
    for (var r = 0; r < 9; r++) rises += '<span class="cab-rise" style="left:' + (6 + r * 11) + '%;animation-duration:' + (9 + (r * 7) % 9) + 's;animation-delay:-' + (r * 1.7) + 's"></span>';

    var tabs = [
      { t: 'Why we started', h: 'It started with what Cohan saw on site', b: '<p>Cohan Tyler founded CST Training on 14 June 2019. He had seen things on construction sites that he shouldn’t have seen, and he was convinced the people involved wouldn’t have done them if they’d had the right training.</p><p>So he set out to build something different: a quality training provider that exists to make people safer, rather than one more company handing out certificates.</p>', big: '2019' },
      { t: 'Behavioural safety', h: 'Safety is something people do, not something they sign', b: '<p>Behavioural safety is the foundation CST Training was built on. A card in your wallet doesn’t stop a fall from height. The decisions people make on site do.</p><p>That’s why our training is designed to change how people think and act when nobody is checking, so the course is the start of safer work rather than a box ticked for a compliance file.</p>', big: '01' },
      { t: 'Where we are now', h: 'From one idea to the UK’s #1', b: '<p>Seven years on, CST Training is the UK’s #1 provider of CITB courses and construction NVQs, based on CITB’s own figures for the number of people completing with us.</p><p>Nearly 200 people now work across our head office at River House in Bexley, our permanent venues and 30+ training locations around the UK.</p>', big: '#1' }
    ];

    var tl = MILESTONES.map(function (m) {
      return '<div class="cab-tl-item"><span class="cab-tl-dot"></span><div class="cab-tl-card' + (m.highlight ? ' cab-hl' : '') + '"><span class="cab-tl-date">' + esc(m.date) + '</span><h3>' + esc(m.title) + '</h3><p>' + esc(m.text) + '</p>' + (m.img && IMG[m.img] ? '<img loading="lazy" src="' + IMG[m.img] + '" alt="">' : '') + '</div></div>';
    }).join('');

    var gal = GALLERY.map(function (g, i) {
      return '<button class="cab-gi cab-rv ' + g.cls + '" data-i="' + i + '" aria-label="Open photo: ' + esc(g.cap) + '"><img loading="lazy" src="' + IMG[g.k] + '" alt="' + esc(g.cap) + '"><span>' + esc(g.cap) + '</span></button>';
    }).join('');

    var chips = TEAM.map(function (d, i) {
      return '<button class="cab-chip" data-d="' + d.id + '" aria-pressed="' + (i === 0) + '">' + esc(d.label) + '<small>' + deptPeople(d).length + '</small></button>';
    }).join('');

    var acc = ACCREDITATIONS.map(function (a) {
      return '<a href="' + SITE + a[2] + '" class="cab-rv"><img loading="lazy" src="' + WP + a[1] + '" alt="' + esc(a[0]) + ' logo" onerror="this.parentNode.classList.add(\'cab-noimg\');this.remove()"><em>' + esc(a[0]) + '</em></a>';
    }).join('');

    var ven = VENUES.map(function (v, i) {
      return '<button class="cab-v" data-v="' + i + '" aria-pressed="' + (i === 0) + '"><span class="cab-pin">' + ICON.pin + '</span><span><b>' + esc(v.name) + (v.hq ? '<em class="cab-tag-hq">HQ</em>' : '') + '</b><small>' + esc(v.addr) + (v.parking ? ' · Free parking' : '') + '</small></span></button>';
    }).join('');

    var roles = ROLES.map(function (r) { return '<a href="' + VACANCIES_URL + '">' + esc(r) + '</a>'; }).join('');

    return '' +
    /* HERO */
    '<section class="cab-band cab-hero"><div class="cab-grid-bg"></div>' + rises +
      '<div class="cab-wrap cab-hero-in">' +
        '<div class="cab-rv"><span class="cab-eyebrow">About CST Training</span>' +
          '<h1>Training that changes what people <em>do on site</em></h1>' +
          '<p class="cab-lead">CST Training was founded in 2019 on behavioural safety, because a certificate on its own doesn’t keep anyone safe. Today we’re the UK’s #1 provider of CITB courses and construction NVQs.</p>' +
          '<div class="cab-hero-btns"><a class="cab-btn cab-btn-o" href="#cab-story">Read our story <span class="cab-arrow">→</span></a><a class="cab-btn cab-btn-ghost" href="#cab-team">Meet the team</a></div>' +
        '</div>' +
        '<div class="cab-hero-photo cab-rv"><div class="cab-ph"><img src="' + IMG.team + '" alt="CST Training team members at River House"></div>' +
          '<div class="cab-badge"><b>#1</b><span>UK provider of CITB courses and construction NVQs<small>Based on CITB’s own figures, 2026</small></span></div>' +
        '</div>' +
      '</div></section>' +
    /* STATS */
    '<div class="cab-wrap cab-stats"><div class="cab-stats-in cab-rv">' +
      '<div class="cab-stat"><b>2019</b><span>Founded by Cohan Tyler</span></div>' +
      '<div class="cab-stat"><b><i>~</i>200</b><span>People in the team</span></div>' +
      '<div class="cab-stat"><b><em data-count="30">0</em><i>+</i></b><span>UK training locations</span></div>' +
      '<div class="cab-stat"><b data-count="15">0</b><span>Awarding and regulatory approvals</span></div>' +
    '</div></div>' +
    /* STORY */
    '<section class="cab-sec" id="cab-story"><div class="cab-wrap">' +
      '<div class="cab-head cab-rv"><span class="cab-eyebrow">Our story</span><h2 class="cab-h2">Built to make people safer, not to tick a box</h2></div>' +
      '<div class="cab-story cab-rv"><div class="cab-tabs" role="tablist">' +
        tabs.map(function (t, i) { return '<button class="cab-tab" role="tab" id="cab-t' + i + '" aria-controls="cab-p' + i + '" aria-selected="' + (i === 0) + '"><i>0' + (i + 1) + '</i>' + esc(t.t) + '</button>'; }).join('') +
      '</div><div>' +
        tabs.map(function (t, i) { return '<div class="cab-panel' + (i === 0 ? ' cab-show' : '') + '" role="tabpanel" id="cab-p' + i + '" aria-labelledby="cab-t' + i + '"' + (i ? ' hidden' : '') + '><span class="cab-big">' + t.big + '</span><h3>' + t.h + '</h3>' + t.b + '</div>'; }).join('') +
      '</div></div>' +
      '<div class="cab-quote cab-rv"><img src="' + WP + '2026/10/website-meet-the-team-Cohan-Tyler-new.png" alt="Cohan Tyler" onerror="this.style.visibility=\'hidden\'">' +
        '<div><blockquote>I saw things on site that I shouldn’t have seen. Those people wouldn’t have done what they did if they’d had the right training. That’s why CST Training exists: to make people safer, not just to tick a box.</blockquote><cite><b>Cohan Tyler</b>, Founder and Managing Director</cite></div></div>' +
      '<div class="cab-pillars">' +
        '<div class="cab-pillar cab-rv"><div class="cab-ic">' + ICON.shield + '</div><h3>Behaviour first</h3><p>Every course is built around the choices people make on site, not just the rules they need to remember.</p></div>' +
        '<div class="cab-pillar cab-rv"><div class="cab-ic">' + ICON.star + '</div><h3>Quality over box ticking</h3><p>We would rather train you properly than quickly, so what you learn holds up on a real job.</p></div>' +
        '<div class="cab-pillar cab-rv"><div class="cab-ic">' + ICON.home + '</div><h3>Everyone home safe</h3><p>The measure that matters is the people who finish their shift and go home to their families.</p></div>' +
      '</div>' +
    '</div></section>' +
    /* TIMELINE */
    '<section class="cab-band cab-sec cab-tl-sec" id="cab-milestones"><div class="cab-wrap">' +
      '<div class="cab-head cab-rv" style="text-align:center"><span class="cab-eyebrow">Milestones</span><h2 class="cab-h2" style="text-align:center">How we got here</h2></div>' +
      '<div class="cab-tl"><div class="cab-tl-line"><div class="cab-tl-fill"></div></div>' + tl + '</div>' +
    '</div></section>' +
    /* GALLERY */
    '<section class="cab-sec"><div class="cab-wrap">' +
      '<div class="cab-head cab-rv"><span class="cab-eyebrow">Life at CST Training</span><h2 class="cab-h2">Welcome to River House</h2><p class="cab-lead">Our head office on Bexley High Street has been home since June 2026.</p></div>' +
      '<div class="cab-gal">' + gal + '</div>' +
    '</div></section>' +
    /* TEAM */
    '<section class="cab-band cab-sec cab-team-sec" id="cab-team"><div class="cab-wrap">' +
      '<div class="cab-team-top"><div class="cab-rv"><span class="cab-eyebrow">Meet the team</span><h2 class="cab-h2">The people behind your training</h2><p class="cab-lead">Nearly 200 people work at CST Training. Pick a team to meet them.</p></div>' +
        '<label class="cab-search cab-rv">' + ICON.search + '<input type="search" placeholder="Search by name or role" aria-label="Search the team"></label></div>' +
      '<div class="cab-chips" role="group" aria-label="Choose a team">' + chips + '</div>' +
      '<div class="cab-team-out" aria-live="polite"></div>' +
    '</div></section>' +
    /* ACCREDITATIONS */
    '<section class="cab-sec" id="cab-accreditations"><div class="cab-wrap">' +
      '<div class="cab-head cab-rv"><span class="cab-eyebrow">Accreditations</span><h2 class="cab-h2">Approved by the bodies that set the standard</h2><p class="cab-lead">CST Training is approved to deliver courses and qualifications from ' + ACCREDITATIONS.length + ' awarding and regulatory bodies.</p></div>' +
      '<div class="cab-acc">' + acc + '</div>' +
    '</div></section>' +
    /* VENUES */
    '<section class="cab-band cab-sec cab-ven-sec" id="cab-venues"><div class="cab-wrap">' +
      '<div class="cab-head cab-rv"><span class="cab-eyebrow">Where we train</span><h2 class="cab-h2">Training near you</h2><p class="cab-lead">Head office in Bexley, permanent venues across England and courses in 30+ UK locations.</p></div>' +
      '<div class="cab-ven cab-rv"><div><div class="cab-vlist">' + ven + '</div><p class="cab-more">These are our permanent venues. We train in 30+ locations across the UK.</p></div>' +
        '<div class="cab-map"><iframe loading="lazy" title="Venue map" referrerpolicy="no-referrer-when-downgrade"></iframe><span class="cab-map-tag"></span></div></div>' +
    '</div></section>' +
    /* CAREERS + CTA */
    '<section class="cab-sec" id="cab-careers"><div class="cab-wrap">' +
      '<div class="cab-careers cab-rv"><div><span class="cab-eyebrow">Careers</span><h2>Want to help make sites safer?</h2><p>We’re always looking for tutors, assessors and people who care about doing training properly. Join a team of nearly 200 at the UK’s #1 provider of CITB courses and construction NVQs.</p><a class="cab-btn cab-btn-o" href="' + VACANCIES_URL + '">View current vacancies <span class="cab-arrow">→</span></a></div>' +
        '<div class="cab-roles">' + roles + '</div></div>' +
      '<div class="cab-cta cab-rv"><span class="cab-eyebrow">Get started</span><h2>Ready to train with the UK’s #1?</h2><p>Talk to our team about the right course or qualification for you or your workforce.</p><a class="cab-btn cab-btn-n" href="' + CONTACT_URL + '">Enquire now <span class="cab-arrow">→</span></a>' +
        '<p class="cab-foot">#1 claim based on CITB’s own figures for the number of people completing CITB courses and construction NVQs, 2026.</p></div>' +
    '</div></section>' +
    '<div class="cab-lb" role="dialog" aria-modal="true" aria-label="Photo viewer"><button class="cab-lb-x" aria-label="Close">×</button><button class="cab-lb-p" aria-label="Previous">‹</button><img alt=""><button class="cab-lb-n" aria-label="Next">›</button><p></p></div>';
  }

  /* ---------- Behaviour ---------- */
  function init(root) {
    if (!document.getElementById('cab-fonts')) {
      var l = document.createElement('link'); l.id = 'cab-fonts'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Alata&family=Asap:wght@400;700&display=swap';
      document.head.appendChild(l);
    }
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    root.innerHTML = build();
    var $ = function (s, c) { return (c || root).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || root).querySelectorAll(s)); };
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reveal + counters
    function count(el) {
      var end = +el.getAttribute('data-count'), t0 = null;
      if (reduce) { el.textContent = end; return; }
      function step(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('cab-on');
          $$('[data-count]', e.target).forEach(count);
          io.unobserve(e.target);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      $$('.cab-rv,.cab-tl-item').forEach(function (el) { io.observe(el); });
    } else {
      $$('.cab-rv,.cab-tl-item').forEach(function (el) { el.classList.add('cab-on'); });
      $$('[data-count]').forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
    }

    // Story tabs
    var tabBtns = $$('.cab-tab');
    function selectTab(i) {
      tabBtns.forEach(function (b, j) {
        b.setAttribute('aria-selected', i === j);
        b.tabIndex = i === j ? 0 : -1;
        var p = $('#cab-p' + j);
        p.hidden = i !== j;
        p.classList.toggle('cab-show', i === j);
      });
    }
    tabBtns.forEach(function (b, i) {
      b.addEventListener('click', function () { selectTab(i); });
      b.addEventListener('keydown', function (e) {
        var k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); var n = (i + k + tabBtns.length) % tabBtns.length; selectTab(n); tabBtns[n].focus(); }
      });
    });
    selectTab(0);

    // Timeline fill
    var tlBox = $('.cab-tl'), fill = $('.cab-tl-fill');
    function onScroll() {
      var r = tlBox.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.max(0, Math.min(1, (vh * 0.6 - r.top) / r.height));
      fill.style.height = (p * 100) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // Team explorer
    var out = $('.cab-team-out'), chipsEl = $$('.cab-chip'), search = $('.cab-search input'), current = TEAM[0].id;
    function renderDept(id) {
      var d = TEAM.filter(function (x) { return x.id === id; })[0], i = 0, html = '';
      if (d.groups) d.groups.forEach(function (g) { html += '<h3 class="cab-sub">' + esc(g.label) + '</h3><div class="cab-people">' + g.people.map(function (p) { return personHTML(p, i++); }).join('') + '</div>'; });
      else html = '<div class="cab-people">' + d.people.map(function (p) { return personHTML(p, i++); }).join('') + '</div>';
      out.innerHTML = html + '<p class="cab-team-note">And plenty more people working behind the scenes.</p>';
    }
    function renderSearch(q) {
      var seen = {}, res = [];
      TEAM.forEach(function (d) { deptPeople(d).forEach(function (p) { var key = p.join('|'); if (seen[key]) return; if ((p[0] + ' ' + p[1]).toLowerCase().indexOf(q) > -1) { seen[key] = 1; res.push(p); } }); });
      out.innerHTML = res.length ? '<div class="cab-people">' + res.map(personHTML).join('') + '</div>' : '<p class="cab-empty">No one matches “' + esc(q) + '”. Try a first name or a role such as tutor.</p>';
    }
    chipsEl.forEach(function (c) {
      c.addEventListener('click', function () {
        current = c.getAttribute('data-d'); search.value = '';
        chipsEl.forEach(function (x) { x.setAttribute('aria-pressed', x === c); });
        renderDept(current);
      });
    });
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      chipsEl.forEach(function (x) { x.setAttribute('aria-pressed', !q && x.getAttribute('data-d') === current); });
      q ? renderSearch(q) : renderDept(current);
    });
    renderDept(current);

    // Venues map
    var frame = $('.cab-map iframe'), tag = $('.cab-map-tag'), vBtns = $$('.cab-v');
    function showVenue(i) {
      var v = VENUES[i];
      frame.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(v.addr) + '&t=m&z=15&output=embed';
      tag.textContent = v.name;
      vBtns.forEach(function (b, j) { b.setAttribute('aria-pressed', i === j); });
    }
    vBtns.forEach(function (b, i) { b.addEventListener('click', function () { showVenue(i); }); });
    showVenue(0);

    // Lightbox
    var lb = $('.cab-lb'), lbImg = $('img', lb), lbCap = $('p', lb), gi = 0, lastFocus = null;
    function openLb(i) { gi = (i + GALLERY.length) % GALLERY.length; lbImg.src = IMG[GALLERY[gi].k]; lbImg.alt = GALLERY[gi].cap; lbCap.textContent = GALLERY[gi].cap; if (!lb.classList.contains('cab-open')) { lastFocus = document.activeElement; lb.classList.add('cab-open'); $('.cab-lb-x', lb).focus(); } }
    function closeLb() { lb.classList.remove('cab-open'); if (lastFocus) lastFocus.focus(); }
    $$('.cab-gi').forEach(function (b) { b.addEventListener('click', function () { openLb(+b.getAttribute('data-i')); }); });
    $('.cab-lb-x', lb).addEventListener('click', closeLb);
    $('.cab-lb-p', lb).addEventListener('click', function () { openLb(gi - 1); });
    $('.cab-lb-n', lb).addEventListener('click', function () { openLb(gi + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('cab-open')) return;
      if (e.key === 'Escape') closeLb(); else if (e.key === 'ArrowLeft') openLb(gi - 1); else if (e.key === 'ArrowRight') openLb(gi + 1);
    });

    // Smooth in-page links
    $$('a[href^="#cab-"]').forEach(function (a) {
      a.addEventListener('click', function (e) { var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); } });
    });
  }

  function start() { var root = document.getElementById('cst-about'); if (root && !root.getAttribute('data-ready')) { root.setAttribute('data-ready', '1'); init(root); } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
