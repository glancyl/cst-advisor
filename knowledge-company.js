/**
 * CST Training – company facts + remaining course categories
 * knowledge-company.js
 *
 * Load AFTER knowledge-nvq.js / knowledge-citb.js / knowledge-trades.js,
 * BEFORE assistant.js.
 *
 * Adds:
 *   1. Company facts, accreditations, venues, reviews, in-house/bulk
 *   2. URL corrections for the NEBOSH entries inherited from knowledge.js
 *   3. Course entries for the categories the bot had nothing on:
 *      Building Safety Act, 18th Edition, ISEP (x2), Mental Health (x3),
 *      First Aid (x2), EUSR SHEA (x5), PRINCE2 + MSP bundles
 *
 * Sources: CST Training learner handbooks (various, 2024-2026), /accreditations/,
 * /smsts-online-page-locations/, site footer. No prices — the sanitiser in
 * knowledge-nvq.js strips anything that slips through.
 */

(function () {
  'use strict';

  function apply() {
    if (!window.CSTKnowledge || !window.CSTKnowledge.qualifications) return;
    const kb = window.CSTKnowledge;
    if (kb.__companyApplied) return;
    kb.__companyApplied = true;

    /* ═══════════════════════════════════════════════════════
       1. COMPANY FACTS
    ═══════════════════════════════════════════════════════ */
    kb.company = {
      legalName: 'CST Training LTD',
      registeredOffice: 'River House, Bexley High Street, Bexley, Kent, England, DA5 1JX',
      companyNumber: '12052513',
      registeredIn: 'England and Wales',
      vatNumber: '349 5015 92',
      vatRate: 'VAT charged at 20%',
      phone: '020 3488 4472',
      emailSales: 'sales@csttraining.co.uk',
      emailAdmin: 'admin@csttraining.co.uk',
      emailAssessments: 'enquiries@csttraining.co.uk',
      email: 'sales@csttraining.co.uk',
      callsRecorded: 'Calls are recorded for training and monitoring purposes.',
      reviews: 'Over 10,000 five-star reviews. Rated 5 stars on Trustpilot and Google.',
      managingDirector: 'Cohan Tyler',
      inHouse: 'CST Training delivers in-house and on-site training — we can come to you. ' +
               'Bulk discounts are available on orders of 5 or more courses, and content ' +
               'can be tailored to a company\u2019s needs. Bulk order and in-house enquiries ' +
               'go to the team.',
      trademark: 'PRINCE2 is a registered trademark of the PeopleCert group, used under licence.'
    };

    /* Accreditations — exactly as stated on /accreditations/ */
    kb.accreditations = [
      { body: 'CITB',    status: 'CITB approved training organisation' },
      { body: 'CMI',     status: 'CMI approved training organisation' },
      { body: 'EUSR',    status: 'EUSR approved training organisation' },
      { body: 'GQA',     status: 'Approved GQA NVQ assessment centre' },
      { body: 'Highfield', status: 'Highfield approved training organisation' },
      { body: 'ILM',     status: 'ILM approved training organisation' },
      { body: 'IOSH',    status: 'IOSH approved training organisation' },
      { body: 'ISEP',    status: 'ISEP approved training organisation' },
      { body: 'NEBOSH',  status: 'NEBOSH approved training organisation' },
      { body: 'NOCN',    status: 'Approved NOCN NVQ assessment centre' },
      { body: 'Ofqual',  status: 'Approved Ofqual NVQ assessment centre' },
      { body: 'PeopleCert', status: 'PeopleCert Accredited Training Organisation (PRINCE2 and MSP)' },
      { body: 'PRINCE2', status: 'PRINCE2 approved training organisation' },
      { body: 'ProQual', status: 'Approved ProQual NVQ assessment centre' },
      { body: 'Qualifications Scotland Accreditation',
        status: 'Approved Qualifications Scotland Accreditation NVQ assessment centre' },
      { body: 'City & Guilds',
        status: 'Delivers the 18th Edition via City & Guilds (awarding body and exam invigilator)' }
    ];

    /* Classroom venues — from the SMSTS locations page. Availability varies by
       course, so the bot must not promise a specific course at a specific venue. */
    kb.venues = {
      note: 'Classroom venues across the UK, plus online delivery via Google Meet. ' +
            'This list is from the SMSTS locations page — not every course runs at ' +
            'every venue, so always send visitors to the course page to check.',
      regions: {
        'Greater London': ['Dartford','Croydon','North London','Central London','Slough','West London','Watford'],
        'Essex': ['Chelmsford'],
        'Midlands': ['Birmingham','Coventry','Leicester','Lincoln','Nottingham','Northampton','Derby','Stoke'],
        'North East England': ['Newcastle','Middlesbrough'],
        'North West England': ['Carlisle','Manchester','Liverpool'],
        'East of England': ['Chelmsford','Norwich','Ipswich','Peterborough'],
        'Scotland': ['Aberdeen','Glasgow','Edinburgh','Dundee','Inverness'],
        'South East England': ['Ashford','Brighton','Reading','Milton Keynes','Oxford'],
        'South West England': ['Bridgwater','Bristol','Exeter','Gloucester','Swindon','Plymouth'],
        'South England': ['Southampton','Bournemouth','Brighton'],
        'Yorkshire': ['Sheffield','Leeds','Doncaster'],
        'Wales': ['Cardiff']
      },
      finder: 'The SMSTS locations page has a postcode search: https://www.csttraining.co.uk/smsts-online-page-locations/'
    };

    /* ═══════════════════════════════════════════════════════
       2. URL CORRECTIONS
       The NEBOSH URLs in knowledge.js are all wrong — every NEBOSH
       recommendation card was linking to a 404.
    ═══════════════════════════════════════════════════════ */
    const URL_FIX = {
      'nebosh-construction':             'https://www.csttraining.co.uk/nebosh-health-safety-management-construction/',
      'nebosh-general':                  'https://www.csttraining.co.uk/nebosh-general-certificate-health-safety/',
      'nebosh-hse-leadership':           'https://www.csttraining.co.uk/nebosh-hse-certificate-in-leadership-excellence/',
      'nebosh-fire-safety':              'https://www.csttraining.co.uk/nebosh-certificate-in-fire-safety-course/',
      'nebosh-environmental-management':  'https://www.csttraining.co.uk/nebosh-environmental-management-certificate-course/',
      'nebosh-hse-stress':               'https://www.csttraining.co.uk/nebosh-hse-certificate-in-managing-stress-at-work/',
      'nebosh-environmental-awareness':   'https://www.csttraining.co.uk/nebosh-award-environmental-awareness/',
      'nebosh-hse-manual-handling':       'https://www.csttraining.co.uk/nebosh-hse-manual-handling-risk-assessment/',
      'nebosh-process-safety':           'https://www.csttraining.co.uk/nebosh-hse-cert-process-safety-management/',
      'nebosh-hse-managing-risks':        'https://www.csttraining.co.uk/nebosh-hse-managing-risks-at-work/',
      'nebosh-hse-incident-investigation':'https://www.csttraining.co.uk/nebosh-course-incident-investigation/',
      'nebosh-health-safety-work-award':  'https://www.csttraining.co.uk/health-and-safety-nebosh-award/',
      'nebosh-working-with-wellbeing':    'https://www.csttraining.co.uk/working-with-wellbeing-nebosh/',
      'iosh-managing-safely':            'https://www.csttraining.co.uk/iosh-managing-safely/',
      'iosh-working-safely':             'https://www.csttraining.co.uk/iosh-working-safely/'
    };
    let fixed = 0;
    kb.qualifications.forEach(q => {
      if (URL_FIX[q.id] && q.url !== URL_FIX[q.id]) { q.url = URL_FIX[q.id]; fixed++; }
    });

    /* ═══════════════════════════════════════════════════════
       3. MISSING COURSE CATEGORIES
    ═══════════════════════════════════════════════════════ */
    const extra = [

      /* ── BUILDING SAFETY ACT ─────────────────────────── */
      {
        id: 'building-safety-act-elearning',
        title: 'Understanding the Building Safety Act (E-Learning)',
        category: 'Health & Safety', level: 2, minExperience: null,
        roles: ['site manager','supervisor','operative','director','duty holder',
                'principal designer','principal contractor','compliance manager'],
        audience: 'Construction organisations that need their workforce to understand the Building Safety Act and the competence standards it demands. Available in three tiers matched to level of responsibility.',
        description: 'CST Training\u2019s own e-learning course on the Building Safety Act, developed in-house. Delivered in three tiers: Practitioner (2 hours), Supervisor (4 hours) and Manager (6 hours), each pitched at that level of legal accountability. Modules cover why the Act was created, key issues behind systems failures in construction, the consequences of non-compliance, which buildings fall under the Act, the bodies providing oversight, what counts as a competent worker, duty holder roles and responsibilities, the Gateway stages, and the purpose of the Golden Thread. Completed through CST Training\u2019s learner management system with login details issued by email. Assessed by multiple choice exam: 10 questions at Practitioner, 20 at Supervisor, 30 at Manager. Certificate issued by CST Training via the e-learning portal.',
        suitedFor: ['Organisations needing workforce-wide Building Safety Act competence',
                    'Duty holders under the Act',
                    'Employers who want tiered training matched to staff responsibility'],
        notSuitedFor: 'Not a CITB card course and not a replacement for SMSTS, SSSTS or CDM Awareness.',
        progression: ['citb-cdm-awareness'],
        url: 'https://www.csttraining.co.uk/building-safety-act-elearning/',
        benefits: 'CST Training\u2019s own course, built in-house, covering the Golden Thread, the Gateways and the Act\u2019s definition of a competent person. Three tiers so a whole team can be trained at the right depth. Self-paced e-learning with the certificate issued through the portal.'
      },

      /* ── 18th EDITION ────────────────────────────────── */
      {
        id: 'electrical-18th-edition',
        title: '18th Edition City & Guilds \u2013 Level 3 Electrical Installations Award (BS 7671:2018+A4:2026)',
        category: 'Health & Safety', level: 3, minExperience: null,
        roles: ['electrician','electrical installer','maintenance electrician',
                'electrical contractor','electrical engineer','sparky','tradesperson'],
        audience: 'Tradespeople and qualified electricians working in the electrical industry who need to meet the requirements for electrical installations to BS 7671:2018+A4:2026. You should already be working to the latest amendment and have a reasonable knowledge of the BS 7671 Requirements for Electrical Installations.',
        description: 'A City & Guilds approved qualification covering BS 7671:2018+A4:2026, delivered over 20 GUIDED LEARNING HOURS entirely remotely through CST Studio, CST Training\u2019s own e-learning platform. Worked through at your own pace. Concludes with an ONLINE OPEN BOOK multiple choice exam, invigilated remotely by City & Guilds: 60 questions over 2 hours, pass mark 60%. '
                   + 'How it works: sign up online or by invoice, CST Training sets you up on CST Studio and emails your login details, and registers you with City & Guilds as the awarding body. Work through the modules at your own pace, tell CST Training when you are ready, sign a declaration confirming you have completed the course element, and choose an exam time. Exam slots are usually available around 2 to 3 weeks after you finish the guided learning hours, at 08:00, 11:30 or 16:00. City & Guilds email the instructions directly. On passing, the certificate is sent by POST. '
                   + 'AMENDMENT 4: this is the largest update to the 18th Edition since 2018. It brings in requirements for battery energy storage, power over Ethernet and medical locations, changes around earthing, and folds Amendment 3 into the main document. BS 7671 is not law in itself, but it is the recognised UK standard and it is how you demonstrate compliance with the Electricity at Work Regulations and Building Regulations. An existing 2382 certificate does not expire, but most electricians find they need current Amendment 4 evidence when they renew with their competent person scheme or their JIB card. '
                   + 'NOTE: the IET Wiring Regulations book (BS 7671:2018+A4:2026) is NOT included with the course and must be bought separately from a retailer.',
        suitedFor: ['Qualified electricians needing current Amendment 4 evidence',
                    'Those renewing with a competent person scheme or JIB card',
                    'Anyone involved in electrical work to BS 7671'],
        notSuitedFor: 'Not a route into the electrical trade for beginners \u2014 you should already be working in the industry with a reasonable knowledge of BS 7671. Different from the Level 3 Electrotechnical Experienced Worker NVQ, which assesses on-the-job competence rather than regulations knowledge.',
        progression: ['nvq-electrical-level-3'],
        url: 'https://www.csttraining.co.uk/electrical-installations-18th-edition/',
        benefits: 'City & Guilds accredited and completed fully remotely through CST Studio in 20 guided learning hours, with an open book exam. Covers Amendment 4, which is what the industry now works to. Leads on to the City & Guilds Level 3 Award in Inspection & Testing (2392-52) or into employment.'
      },

      /* ── ISEP ────────────────────────────────────────── */
      {
        id: 'isep-foundation-certificate',
        title: 'ISEP Foundation Certificate in Environmental Management',
        category: 'Health & Safety', level: 3, minExperience: null,
        roles: ['environmental manager','sustainability manager','ehs manager',
                'environmental officer','compliance manager','sustainability lead'],
        audience: 'Those working, or looking to work, in an environmental or sustainability role who want a foundation of environmental and sustainability knowledge to build on.',
        description: 'The ISEP Foundation Certificate in Environmental Management is 40 hours of training over 5 full days, Monday to Friday, delivered via Zoom or in a classroom with a live tutor. Run weekly, 08:30 to 17:00 with a lunch break. Up to 12 candidates online. Eleven modules: why we need to be sustainable; environmental principles; principles of sustainable organisations; pollution and pollution control; introduction to policy and legislation; key environmental legislation; environmental tools and assessment; data and reporting; environmental management systems; environmental auditing; and improving sustainability performance. A physical workbook is posted out, so a delivery address is needed. Assessed by a 1 hour OPEN-BOOK multiple choice exam of 30 questions on the final day, pass mark 70% (21 of 30) \u2014 learners can use their manual, notes and internet resources. A resit is included in the exam licence if you score below 70%. No formal prerequisites. ISEP issues the certificate within 12 weeks, and completion makes you eligible for ISEP Associate membership with the AISEP suffix.',
        suitedFor: ['Those new to environmental and sustainability management',
                    'Professionals moving into a sustainability role',
                    'Anyone wanting ISEP Associate membership (AISEP)'],
        notSuitedFor: 'May not be relevant if you do not work, and are not looking to work, in an environmental or sustainability position. Managers wanting a shorter, more strategic course should consider ISEP Environmental Sustainability Skills for Managers.',
        progression: ['nebosh-environmental-management'],
        url: 'https://www.csttraining.co.uk/isep-courses/',
        benefits: 'Open-book exam, a free resit included, and eligibility for ISEP Associate membership (AISEP) on completion. CST Training is an ISEP approved training organisation and an IEMA training centre.'
      },
      {
        id: 'isep-sustainability-skills-managers',
        title: 'ISEP Environmental Sustainability Skills for Managers',
        category: 'Health & Safety', level: 3, minExperience: null,
        roles: ['manager','supervisor','operations manager','department manager',
                'team leader','sustainability lead'],
        audience: 'Managers and supervisors from any industry or business sector who need to understand the strategic and operational implications of environmental sustainability for them, their team and their department.',
        description: 'A shorter ISEP course than the Foundation Certificate: 2 full days via Zoom, run monthly starting on a Monday, 08:30 to 17:00. Up to 12 candidates. Nine modules delivered evenly across the two days: risks and opportunities from environmental sustainability; laws and other compliance obligations; key environmental sustainability issues; improving environmental sustainability performance; drivers for change and barriers; using data for performance improvement; environmental sustainability across the value chain; improving resource efficiency; and employees and sustainability performance. A physical workbook is posted out, so a delivery address is needed. Assessed by a 30 minute exam of 20 questions in mixed formats (multiple choice, true/false and open), pass mark 70% (14 of 20). A resit is included in the exam licence. No formal prerequisites.',
        suitedFor: ['Managers and supervisors who oversee operational objectives',
                    'Employers wanting to upskill a team on sustainability quickly',
                    'Those who need the strategic picture rather than a full environmental qualification'],
        notSuitedFor: 'May not be relevant if you do not work, and are not looking to work, in an environmental or sustainability position. Those wanting the fuller qualification should take the ISEP Foundation Certificate in Environmental Management.',
        progression: ['isep-foundation-certificate'],
        url: 'https://www.csttraining.co.uk/isep-courses/',
        benefits: 'A two-day route to ISEP Associate membership (AISEP), designed to upskill managers rapidly. Free resit included.'
      },

      /* ── MENTAL HEALTH ───────────────────────────────── */
      {
        id: 'mental-health-level-1-wellbeing',
        title: 'Level 1 Award in an Introduction to Mental Health and Wellbeing',
        category: 'Health & Safety', level: 1, minExperience: null,
        roles: ['any employee','operative','worker','team member'],
        audience: 'Anyone who wants to understand their own mental health and how to manage it, and how to support family and friends.',
        description: 'A Highfield-awarded 1 day course, 7 guided learning hours, delivered via Google Meet 08:30 to 17:00. Covers what is meant by mental health and mental ill health, how to take care of your own mental health and wellbeing, how to support family and friends with theirs, and where to find sources of support. Learners must attend all course hours. Assessed by a 15 question multiple choice exam, 30 minutes, pass mark 60% (9 of 15), taken in the afternoon of the final day through Highfield Works. You need a laptop or PC with a camera and microphone and a quiet place to work. Highfield issues a digital certificate by email within 28 working days.',
        suitedFor: ['Anyone wanting an accessible introduction to mental health',
                    'Employees at any level',
                    'Those supporting family or friends'],
        notSuitedFor: 'Not a workplace mental health first aider qualification \u2014 the Level 2 Award in Introduction to First Aid for Mental Health covers that. Not a clinical qualification.',
        progression: ['mental-health-level-2-awareness','mental-health-level-2-first-aid'],
        url: 'https://www.csttraining.co.uk/level-1-mental-wellbeing/',
        benefits: 'Highfield-awarded and completed in a single day online. A practical starting point for personal mental health awareness.'
      },
      {
        id: 'mental-health-level-2-awareness',
        title: 'Level 2 Award in Introduction to Mental Health Awareness',
        category: 'Health & Safety', level: 2, minExperience: null,
        roles: ['manager','supervisor','team leader','hr professional',
                'wellbeing champion','any employee'],
        audience: 'Anyone wanting a broader understanding of mental health and how mental ill health affects individuals.',
        description: 'A Highfield-awarded 1 day course, 4 guided learning hours, delivered via Google Meet 08:30 to 17:00. Covers understanding mental health and wellbeing, how mental ill health affects the experience of individuals, the mental health continuum, and ways to self-manage your own wellbeing. Learners must attend all course hours. Assessed by a 15 question multiple choice exam, 30 minutes, pass mark 60% (9 of 15), through Highfield Works. Certificate issued digitally by Highfield within 28 working days.',
        suitedFor: ['Managers and team leaders wanting mental health awareness',
                    'HR and wellbeing staff',
                    'Anyone wanting more depth than the Level 1 Award'],
        notSuitedFor: 'Not a mental health first aider qualification. Not clinical training.',
        progression: ['mental-health-level-2-first-aid'],
        url: 'https://www.csttraining.co.uk/level-2-mental-health-intro/',
        benefits: 'Highfield-awarded, one day, and covers the mental health continuum \u2014 useful grounding for anyone managing people.'
      },
      {
        id: 'mental-health-level-2-first-aid',
        title: 'Level 2 Award in Introduction to First Aid for Mental Health',
        category: 'Health & Safety', level: 2, minExperience: null,
        roles: ['mental health first aider','manager','supervisor','hr professional',
                'wellbeing champion','health and safety officer'],
        audience: 'Those taking on a mental health first aider or workplace wellbeing role, and managers responsible for promoting a wellness culture.',
        description: 'A Highfield-awarded 2 day course, 12 guided learning hours, delivered via Google Meet 08:30 to 17:00 across two consecutive days. Covers the underpinning principles of first aid for mental health, recognising mental ill health in yourself and others, supporting mental wellbeing in the workplace, promoting a wellness culture, and the importance of resilience and self-care for mental health first aiders. TWO exams must both be passed: Unit 1 (introduction to mental health, mental ill health and wellbeing) is 15 questions in 30 minutes, pass mark 60% (9 of 15); Unit 2 (introduction to first aid for mental health) is 25 questions in 50 minutes, pass mark 60% (15 of 25). Both through Highfield Works. Certificate issued digitally by Highfield within 28 working days.',
        suitedFor: ['Designated workplace mental health first aiders',
                    'Managers building a wellness culture',
                    'H&S and HR staff with wellbeing responsibility'],
        notSuitedFor: 'Not a clinical or therapeutic qualification. Note that BOTH exams must be passed to achieve the qualification.',
        progression: ['nebosh-hse-stress'],
        url: 'https://www.csttraining.co.uk/level-2-first-aid-mental-health/',
        benefits: 'The mental health first aider route, Highfield-awarded, over two days online. Covers recognising mental ill health in others and building a workplace wellness culture.'
      },

      /* ── FIRST AID ───────────────────────────────────── */
      {
        id: 'first-aid-at-work-level-3',
        title: 'Level 3 First Aid at Work (FAW)',
        category: 'Health & Safety', level: 3, minExperience: null,
        roles: ['first aider','appointed person','site manager','supervisor',
                'health and safety officer','facilities manager'],
        audience: 'Those becoming workplace first aiders where a first-aid needs assessment has determined that this level of training is required.',
        description: 'A Highfield-awarded course of 22 learning hours across 3 consecutive days, either Monday to Wednesday or Wednesday to Friday, 08:30 to 17:00. Delivered in a CLASSROOM only, because the assessment is practical. Two units: Emergency First Aid in the Workplace, and Recognition and Management of Illness and Injury in the Workplace. The syllabus covers roles and responsibilities, assessing an emergency safely, unresponsive casualties, choking, external bleeding, shock, minor injuries, secondary survey, suspected bone, muscle and joint injuries, head and spinal injuries, chest injuries, burns and scalds, eye injuries, suspected poisoning, anaphylaxis and major illness. Assessed by ongoing practical assessment throughout plus a 30 question closed-book exam in 45 minutes, pass mark 70% (21 of 30), marked by the tutor. Learners must attend all course hours. IMPORTANT: there is no exam resit \u2014 if the course is not passed on the practical assessment and examination, the full course must be retaken (the tutor can conduct further assessment on the same day only). Highfield issues a digital certificate by email within 28 working days.',
        suitedFor: ['Designated workplace first aiders in higher-risk settings',
                    'Those whose employer\u2019s first-aid needs assessment requires FAW',
                    'Anyone wanting the fuller first aid qualification rather than EFAW'],
        notSuitedFor: 'More than low-risk workplaces such as offices and shops typically need \u2014 Emergency First Aid at Work is the 1 day option for those. Cannot be done online: classroom only.',
        progression: [],
        url: 'https://www.csttraining.co.uk/first-aid-at-work-level-3/',
        benefits: 'The full workplace first aid qualification, Highfield-awarded and regulated, delivered in classrooms across the UK. Be aware there is no exam resit \u2014 the full course must be retaken if not passed.'
      },
      {
        id: 'emergency-first-aid-at-work',
        title: 'Emergency First Aid at Work (EFAW)',
        category: 'Health & Safety', level: 2, minExperience: null,
        roles: ['first aider','appointed person','office manager','retail staff',
                'supervisor','team leader'],
        audience: 'Those becoming certified emergency first aiders, suited to low-risk sectors such as offices and shops.',
        description: 'A Highfield-awarded 1 day course, 08:30 to 17:00, delivered in a CLASSROOM only because the assessment is practical. Covers the mandatory unit Emergency First Aid in the Workplace: roles and responsibilities of a first aider, assessing an incident, recognising signs and symptoms of minor injury and illness, unresponsive casualties, choking, external bleeding, minor injuries and shock. Assessed by ongoing practical assessment plus a 15 question closed-book exam in 25 minutes, pass mark 70% (11 of 15), marked by the tutor. Learners must attend all course hours. IMPORTANT: there is no exam resit \u2014 if not passed, the full course must be retaken (further assessment on the same day only). Brings staff to the safety standards recommended by the HSE and is a regulated qualification. Highfield issues a digital certificate by email within 28 working days.',
        suitedFor: ['Low-risk workplaces such as offices and shops',
                    'Those needing a one-day first aid qualification',
                    'Employers meeting HSE-recommended standards'],
        notSuitedFor: 'Higher-risk workplaces usually need the 3 day Level 3 First Aid at Work instead. Cannot be done online: classroom only.',
        progression: ['first-aid-at-work-level-3'],
        url: 'https://www.csttraining.co.uk/emergency-first-aid-at-work/',
        benefits: 'A regulated, HSE-aligned first aid qualification in a single day. Highfield-awarded with a digital certificate by email.'
      },

      /* ── EUSR SHEA ───────────────────────────────────── */
      {
        id: 'eusr-shea-gas',
        title: 'EUSR SHEA Gas',
        category: 'EUSR', level: 2, minExperience: null,
        roles: ['gas operative','utilities operative','supervisor','manager',
                'contractor','pipeline worker'],
        audience: 'Anyone needing access to operational sites in the gas utilities sector, including supervisors and managers.',
        description: 'Safety, Health and Environmental Awareness (SHEA) for the gas sector. 7.5 hours of training over 1 full day via Google Meet, 08:30 to 17:00, up to 8 candidates. Six core SHEA modules common to all SHEA courses: understanding our workplace responsibilities; understanding the effects of our work on the environment; identifying and controlling risks; common hazards and controls in the workplace; occupational health hazards; and responding to emergencies. Gas-specific modules add highway working and excavations (gas), pressure regulating installations, and safety in premises. Assessed by end-of-module tests via Microsoft Forms, 45 questions in total for Gas. Candidates may get only ONE question wrong per module, which works out at 80% correct overall to pass. A second attempt is permitted per module if the first is failed, and a free module resit is included. Completion results in EUSR registration, which is used for access to CSCS-controlled sites for utility works.',
        suitedFor: ['Gas sector operatives, supervisors and managers',
                    'Contractors needing operational site access',
                    'Those needing EUSR registration for utility works'],
        notSuitedFor: 'May not be relevant if you do not work, and are not looking to work, in the gas utility sector. A SHEA Refresher requires a valid, in-date card.',
        progression: ['eusr-shea-refresher'],
        url: 'https://www.csttraining.co.uk/eusr-shea-gas-course',
        benefits: 'EUSR registration for access to CSCS-controlled sites on utility works. One day online, free module resit included.'
      },
      {
        id: 'eusr-shea-water',
        title: 'EUSR SHEA Water',
        category: 'EUSR', level: 2, minExperience: null,
        roles: ['water operative','utilities operative','supervisor','manager','contractor'],
        audience: 'Anyone needing access to operational sites in the water utilities sector, including supervisors and managers.',
        description: 'SHEA for the water sector. 7.5 hours over 1 full day via Google Meet, 08:30 to 17:00, up to 8 candidates. The six core SHEA modules plus water-specific modules on clean and waste water operations and highway working and excavations (water). Assessed by end-of-module tests via Microsoft Forms, 40 questions in total for Water. Only one question may be wrong per module (80% correct overall to pass), with a second attempt permitted per module and a free module resit included. Completion results in EUSR registration used for access to CSCS-controlled sites for utility works.',
        suitedFor: ['Water sector operatives, supervisors and managers',
                    'Contractors needing operational site access'],
        notSuitedFor: 'May not be relevant outside the water utility sector. Not the same as National Water Hygiene, which is a separate half-day course for clean water operations.',
        progression: ['eusr-national-water-hygiene','eusr-shea-refresher'],
        url: 'https://www.csttraining.co.uk/eusr-shea-water-course',
        benefits: 'EUSR registration for water utility site access, in a single day online. Often taken alongside National Water Hygiene.'
      },
      {
        id: 'eusr-shea-power',
        title: 'EUSR SHEA Power',
        category: 'EUSR', level: 2, minExperience: null,
        roles: ['power operative','utilities operative','electrical operative',
                'supervisor','manager','contractor'],
        audience: 'Anyone needing access to operational sites in the power utilities sector, including supervisors and managers.',
        description: 'SHEA for the power sector. 7.5 hours over 1 full day via Google Meet, 08:30 to 17:00, up to 8 candidates. The six core SHEA modules plus power-specific modules on power generation, transmission and distribution, and power industry hazards. Assessed by end-of-module tests via Microsoft Forms, 40 questions in total for Power. Only one question may be wrong per module (80% correct overall to pass), with a second attempt permitted per module and a free module resit included. Completion results in EUSR registration used for access to CSCS-controlled sites for utility works.',
        suitedFor: ['Power sector operatives, supervisors and managers',
                    'Contractors needing operational site access'],
        notSuitedFor: 'May not be relevant outside the power utility sector.',
        progression: ['eusr-shea-refresher'],
        url: 'https://www.csttraining.co.uk/shea-power-course/',
        benefits: 'EUSR registration for power utility site access, one day online, free module resit included.'
      },
      {
        id: 'eusr-shea-refresher',
        title: 'EUSR SHEA Refresher (Gas, Water or Power)',
        category: 'EUSR', level: 2, minExperience: null,
        roles: ['utilities operative','gas operative','water operative',
                'power operative','supervisor','manager'],
        audience: 'Existing SHEA card holders renewing before their card expires. Available for all three utilities.',
        description: 'The SHEA Refresher covers the same content as the full course in a shortened format, taking prior knowledge into account. 4.5 hours over half a day via Google Meet, running either 08:30 to 13:00 or 13:30 to 18:00. CANDIDATES MUST HOLD A VALID, IN-DATE CARD to sit a refresher \u2014 if it has expired, the full 1 day SHEA course is required instead. Same module test format as the full course.',
        suitedFor: ['SHEA card holders renewing before expiry'],
        notSuitedFor: 'Cannot be taken without a valid, in-date SHEA card. Once expired, the full course is required.',
        progression: [],
        url: 'https://www.csttraining.co.uk/eusr-shea-courses/',
        benefits: 'Renews a SHEA card in half a day rather than a full day. Check your expiry date early \u2014 once it lapses only the full course will do.'
      },
      {
        id: 'eusr-national-water-hygiene',
        title: 'EUSR National Water Hygiene',
        category: 'EUSR', level: 2, minExperience: null,
        roles: ['water operative','contractor','clean water operative',
                'utilities operative','plumber'],
        audience: 'Employees or contractors working for water companies, in restricted water sites, or involved in clean water operations.',
        description: 'Designed by EUSR with all the UK water companies. 4.5 hours over a half day via Google Meet, 08:30 to 13:00, up to 8 candidates. Four modules: the importance of water; water as a carrier of disease; potential contamination and its consequences; and preventing contamination. Learning outcomes cover personal hygiene, the Hygiene Code, contamination risks and waterborne diseases, procedures to reduce contamination risk, cleaning and disinfecting practices, and the legal requirements for working in restricted operations. IMPORTANT: candidates must complete a HEALTH SCREENING QUESTIONNAIRE before the course, declaring whether they have had typhoid, paratyphoid, dysentery, persistent diarrhoea or vomiting, jaundice or hepatitis A or E, or prolonged unexplained fever in the preceding 12 months. If so, written confirmation from a medical practitioner that they are illness and symptom free is required before EUSR registration. Assessed by a 25 question multiple choice end-of-syllabus test via Microsoft Forms. Completion results in EUSR issuing the Blue Card, valid for 3 years. EUSR issues the certificate or card within 28 working days.',
        suitedFor: ['Anyone working on clean water operations or restricted water sites',
                    'Water company employees and contractors',
                    'Those needing the EUSR Blue Card'],
        notSuitedFor: 'May not be relevant outside the water industry. Note the health screening requirement, which can delay registration if a medical letter is needed.',
        progression: ['eusr-shea-water'],
        url: 'https://www.csttraining.co.uk/eusr-national-water-hygiene/',
        benefits: 'The EUSR Blue Card, valid for 3 years, in a half day online. Designed by EUSR with all UK water companies. Remember the pre-course health screening questionnaire.'
      },
      {
        id: 'eusr-shea-cross-country-pipelines',
        title: 'EUSR SHEA Cross-Country Pipelines',
        category: 'EUSR', level: 2, minExperience: null,
        roles: ['pipeline operative','gas transmission operative','contractor',
                'supervisor','plant operator','traffic marshall'],
        audience: 'Anyone needing access to operational sites in gas transmission and distribution, particularly those working on large-scale cross-country pipeline projects.',
        description: 'A SHEA scheme for high-pressure cross-country pipelines. 7 hours over 1 full day via Google Meet, 08:30 to 17:00, up to 8 candidates. Modules cover workplace responsibilities, the effects of work on the environment, identifying and controlling risks, common hazards and controls, occupational health hazards, responding to emergencies, the cross-country environment, cross-country pipeline hazards and traffic management. Learning outcomes span legal and site responsibilities, risk and hazard management, occupational health, environmental protection, cross-country logistics and emergency procedures. Assessed by end-of-module tests via Microsoft Forms, 45 to 50 questions in total depending on the paper, each module test being 4 to 6 questions taking 5 to 10 minutes. Only one question may be wrong per module (80% correct overall to pass), with a second attempt permitted per module. Completion gives the EUSR ID card, recognised with CSCS, for 3 years.',
        suitedFor: ['Cross-country pipeline project workers of any trade',
                    'Gas transmission and distribution site access',
                    'Contractors on major utility assets'],
        notSuitedFor: 'May not be relevant outside the pipelines industry. Different from SHEA Gas, which covers distribution and premises rather than high-pressure cross-country pipelines.',
        progression: [],
        url: 'https://www.csttraining.co.uk/shea-cross-country-pipelines/',
        benefits: 'The EUSR ID card recognised with CSCS for 3 years. Covers the specific hazards of high-pressure cross-country pipelines, whatever your trade.'
      },

      /* ── PRINCE2 AND MSP BUNDLES ─────────────────────── */
      {
        id: 'prince2-7-bundle',
        title: 'PRINCE2 7 Foundation & Practitioner Bundle',
        category: 'Project Management', level: 2, minExperience: null,
        roles: ['project manager','project coordinator','delivery manager',
                'programme manager','aspiring project manager'],
        audience: 'Those who want both PRINCE2 7 qualifications in one go, whether new to PRINCE2 or formalising existing experience.',
        description: 'Both PRINCE2 7 qualifications together. The Virtual Classroom bundle runs as a 4 day block via Google Meet: Foundation over 2.5 days (Monday to Wednesday) and Practitioner over 1.5 days (Wednesday to Thursday), delivered weekly. Also available as self-paced e-learning, or as an All Inclusive Bundle combining e-learning, dedicated one-to-one tutor sessions and the option to join a virtual classroom. The official PRINCE2 manual is included as a digital resource, yours to keep, and a pre-course study notes pack is sent beforehand. Awarding body is Axelos; certification is through PeopleCert. Foundation exam: 60 questions in 60 minutes, closed book, 36/60 to pass (60%). Practitioner exam: 70 questions in 150 minutes, open book (official manual only), 42/70 to pass (60%). Exams are taken online via remote web proctor using a voucher valid for 1 year, booked directly with PeopleCert. You must pass Foundation before moving to Practitioner. A free exam resit is included. PeopleCert issues certificates within 14 working days. You can buy Foundation or Practitioner separately instead of the bundle.',
        suitedFor: ['Those wanting both qualifications in one block',
                    'Project managers formalising their PRINCE2 knowledge',
                    'Anyone who prefers self-paced e-learning with a resit included'],
        notSuitedFor: 'For Practitioner you must hold PRINCE2 7 Foundation, PRINCE2 6th Edition, PMQ, PPQ, PMP, CAPM or IPMA Level A to D. PRINCE2 5th Edition is NO LONGER accepted for the 7th Edition Practitioner.',
        progression: ['msp-foundation'],
        url: 'https://www.csttraining.co.uk/prince2-7bundle-course/',
        benefits: 'Both PRINCE2 7 qualifications in a 4 day block, or self-paced. Official manual included and yours to keep, free exam resit, and an exam voucher valid for a year so you sit it when you are ready. CST Training is a PeopleCert Accredited Training Organisation.'
      },
      {
        id: 'prince2-agile-bundle',
        title: 'PRINCE2 Agile Foundation & Practitioner Bundle',
        category: 'Project Management', level: 3, minExperience: null,
        roles: ['project manager','agile project manager','scrum master',
                'delivery manager','product owner'],
        audience: 'Those in businesses seeking a more agile way of working who want both PRINCE2 Agile qualifications together.',
        description: 'Both PRINCE2 Agile qualifications together. The Virtual Classroom bundle runs as a 4 day block via Google Meet: Foundation over 2.5 days (Monday to Wednesday) and Practitioner over 1.5 days (Wednesday to Thursday), delivered weekly Monday to Thursday. Also available as self-paced e-learning or as an All Inclusive Bundle with one-to-one tutor sessions. The official PRINCE2 Agile manual is included digitally and is yours to keep, plus a pre-course study notes pack. Syllabus covers PRINCE2 principles and themes, PRINCE2 processes, roles and responsibilities, blend and weave (integrating PRINCE2 with Agile), Agile principles, behaviours, themes and processes, key Agile terms and techniques, and focus areas. Awarding body Axelos, certification via PeopleCert. Foundation exam: 50 questions in 60 minutes, closed book, 55% pass mark. Practitioner exam: 50 questions in 150 minutes, open book (official manual only), 60% pass mark. Remote web proctor, voucher valid 1 year. Free exam resit included. Certificates within 14 working days.',
        suitedFor: ['Project managers adding Agile capability',
                    'Agile practitioners needing a governance framework',
                    'Those in IT, digital, finance or technology sectors'],
        notSuitedFor: 'For Practitioner you must hold PRINCE2 Agile Foundation, PRINCE2 5th or 6th Edition, PMQ, CAPM, PMP or IPMA Levels A to D. Note the Agile Foundation pass mark is 55%, not 60%.',
        progression: [],
        url: 'https://www.csttraining.co.uk/prince2-agilebundle-course/',
        benefits: 'Both PRINCE2 Agile qualifications in a 4 day block or self-paced. Official manual included, free resit, exam voucher valid for a year.'
      },
      {
        id: 'msp-bundle',
        title: 'MSP 5th Edition Foundation & Practitioner Bundle',
        category: 'Project Management', level: 4, minExperience: null,
        roles: ['programme manager','programme director','senior project manager',
                'portfolio manager','transformation manager'],
        audience: 'Those managing or moving into programme management who want both MSP qualifications together.',
        description: 'Both MSP 5th Edition qualifications together, delivered by CST Training as self-paced e-learning. An All Inclusive Bundle is also available. Certification is through PeopleCert.',
        suitedFor: ['Senior project managers moving into programme management',
                    'Those overseeing multiple inter-related projects',
                    'Change and transformation leaders'],
        notSuitedFor: 'Requires significant project management experience. Those new to project management should start with PRINCE2 Foundation. Detail beyond the above is not held \u2014 point visitors to the page or the team.',
        progression: [],
        url: 'https://www.csttraining.co.uk/msp-foundation-practitioner-bundle-elearning-5th-edition/',
        benefits: 'Both MSP 5th Edition qualifications via flexible e-learning, certificated by PeopleCert.'
      }

    ];

    const existing = new Set(kb.qualifications.map(q => q.id));
    let added = 0;
    extra.forEach(q => {
      if (!existing.has(q.id)) { kb.qualifications.push(q); added++; }
    });

    console.log('CSTKnowledge: +' + added + ' courses, ' + fixed +
                ' URLs corrected, company facts loaded (' +
                kb.qualifications.length + ' total).');
  }

  window.CSTKnowledgeExtensions = window.CSTKnowledgeExtensions || [];
  window.CSTKnowledgeExtensions.push({ name: 'knowledge-company', apply: apply });
  if (window.CSTKnowledge && window.CSTKnowledge.qualifications) apply();

})();
