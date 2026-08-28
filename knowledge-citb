/**
 * CST Training – CITB course knowledge module
 * knowledge-citb.js
 *
 * Load AFTER knowledge.js (and knowledge-nvq.js), BEFORE assistant.js.
 *
 * Built from CST's own learner handbooks (SMSTS v1.3, SSSTS v1.2, HSA v1.2,
 * SEATS v1.2, DRHS v1.2, Temporary Works v1.2, CDM Awareness v1.1,
 * CITB Leadership & Management v1) plus the live site navigation.
 *
 * NOTE ON PASS MARKS: pass marks and exam formats are included only where the
 * source handbook was internally consistent. The SEATS and DRHS handbooks both
 * carry copy-paste errors (they quote the SSSTS pass mark), so no pass mark is
 * stated for those two — the bot will say it doesn't have the detail rather
 * than repeat a wrong figure. Fix the handbooks, then add them here.
 *
 * No prices. knowledge-nvq.js sanitises anything that slips through.
 */

(function () {
  'use strict';

  function apply() {
    if (!window.CSTKnowledge || !window.CSTKnowledge.qualifications) return;
    if (window.CSTKnowledge.__citbApplied) return;
    window.CSTKnowledge.__citbApplied = true;


  if (!window.CSTKnowledge || !window.CSTKnowledge.qualifications) {
    console.error('knowledge-citb.js: knowledge.js must load first.');
    return;
  }

  /* Shared delivery facts — true of all CITB courses at CST */
  const CITB_DELIVERY =
    ' Delivered by CITB-approved tutors either in a virtual classroom via Google Meet or in ' +
    'a physical classroom at CST venues across the UK. Remote courses run with up to 12 ' +
    'candidates, classroom courses with up to 20. Courses run 08:30 to 17:00.';

  const citb = [

    /* ── SMSTS ───────────────────────────────────────────── */
    {
      id:            'citb-smsts',
      title:         'CITB SMSTS (Site Management Safety Training Scheme)',
      category:      'CITB',
      level:         3,
      minExperience: null,
      roles:         ['site manager','project manager','construction manager','site agent',
                      'general foreman','contracts manager','senior supervisor'],
      audience:      'Site managers and anyone who plans, organises, monitors, controls or administers groups of staff on construction sites — or is about to take on that responsibility.',
      description:   'The CITB Site Management Safety Training Scheme is the standard site management health and safety course in UK construction. 37.5 hours of training over 5 days: 4 days of training and exercises, with the exam on the final day. Four modules: Legal and Management (Health and Safety at Work Act, risk assessment, inductions); Health and Welfare (welfare facilities, managing stress and mental health at work); General Safety (site organisation, temporary works, lifting operations); and High Risk Activities (working at height, excavations, confined spaces). Available as a 5-day block Monday to Friday, day release one day a week for 5 weeks, or across 3 weekends.' + CITB_DELIVERY,
      suitedFor:     [
        'Site managers and site agents on construction sites',
        'Those about to step up into a site management role',
        'Anyone responsible for planning, organising or monitoring groups of site staff',
        'Managers whose main contractor or client requires SMSTS'
      ],
      notSuitedFor:  'Not for site supervisors — SSSTS is the correct course for supervisory level. Not for operatives, who need HSA. Anyone holding an in-date SMSTS certificate should take the 2-day SMSTS Refresher rather than the full course.',
      progression:   ['citb-smsts-refresher','nvq-l6-site-management','nebosh-construction'],
      url:           'https://www.csttraining.co.uk/smsts/',
      benefits:      'The recognised site management safety qualification across UK construction, widely required for site management roles and career progression. Exam is 25 questions (18 multiple choice, 7 short answer) in 35 minutes, pass mark 81%. Score 72% or above and you can sit a free resit the same day on a different paper. Certificate is issued by CITB and emailed on completion.'
    },

    {
      id:            'citb-smsts-refresher',
      title:         'CITB SMSTS Refresher',
      category:      'CITB',
      level:         3,
      minExperience: null,
      roles:         ['site manager','project manager','construction manager','site agent',
                      'contracts manager'],
      audience:      'Existing SMSTS certificate holders who need to renew before their certificate expires.',
      description:   'The 2-day SMSTS Refresher renews an existing SMSTS certificate. 15 hours of training over 2 full days, with the exam on the second day. Candidates MUST hold an in-date SMSTS certificate to sit the refresher — if it has expired, the full 5-day SMSTS course is required instead. Available on weekdays and weekends.' + CITB_DELIVERY,
      suitedFor:     [
        'Site managers holding a current, in-date SMSTS certificate',
        'Those renewing before their certificate expires'
      ],
      notSuitedFor:  'Cannot be taken if your SMSTS certificate has already expired — you must sit the full 5-day SMSTS again. Not for anyone who has never held SMSTS.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/smsts-r-classroom-page/',
      benefits:      'Renews your SMSTS in 2 days rather than 5. Certificate issued by CITB and emailed on completion. Check your expiry date early — once it lapses, only the full course will do.'
    },

    /* ── SSSTS ───────────────────────────────────────────── */
    {
      id:            'citb-sssts',
      title:         'CITB SSSTS (Site Supervision Safety Training Scheme)',
      category:      'CITB',
      level:         2,
      minExperience: null,
      roles:         ['site supervisor','supervisor','foreman','chargehand','gang leader',
                      'leading hand','team leader on site'],
      audience:      'Site supervisors, foremen and anyone with supervisory responsibility on a construction site, or about to take it on.',
      description:   'The CITB Site Supervision Safety Training Scheme is the standard supervisory health and safety course in UK construction. 15 hours of training over 2 full days, with the exam on the second day. Topics include working at height, manual handling and other core site risks, delivered through case studies, videos, group discussions and question and answer sessions. Three modules: Legal and Management (Health and Safety at Work Act, risk assessment, reporting accidents, leadership in the workplace); Health and Welfare (first aid, hazardous substances, asbestos, toolbox talks, noise, manual handling); and General Safety (site set-up, fire, electricity, plant and lifting operations). By the end candidates understand how health and safety law applies to supervisors, their supervisory responsibilities, risk assessments and method statements, and how to plan and deliver site inductions and toolbox talks.' + CITB_DELIVERY,
      suitedFor:     [
        'Site supervisors, foremen and chargehands',
        'Tradespeople stepping up to supervise a gang or team',
        'Anyone whose employer or main contractor requires SSSTS'
      ],
      notSuitedFor:  'Not enough for site managers, who need SMSTS. More than operatives need — HSA is the operative-level course. Anyone with an in-date SSSTS should take the 1-day SSSTS Refresher.',
      progression:   ['citb-smsts','citb-sssts-refresher','nvq-l3-occupational-work-supervisor'],
      url:           'https://www.csttraining.co.uk/sssts/',
      benefits:      'The recognised supervisory safety qualification in UK construction and usually the first step toward SMSTS. Exam is 25 questions (22 multiple choice, 3 short answer) in 30 minutes, pass mark 80%. The exam includes 4 safety critical questions which must be answered correctly. Certificate issued by CITB and emailed on completion.'
    },

    {
      id:            'citb-sssts-refresher',
      title:         'CITB SSSTS Refresher',
      category:      'CITB',
      level:         2,
      minExperience: null,
      roles:         ['site supervisor','supervisor','foreman','chargehand'],
      audience:      'Existing SSSTS certificate holders who need to renew before expiry.',
      description:   'The 1-day SSSTS Refresher renews an existing SSSTS certificate. 7.5 hours of training over 1 full day with the exam on the same day. Candidates MUST hold an in-date SSSTS certificate to sit the refresher.' + CITB_DELIVERY,
      suitedFor:     [
        'Supervisors holding a current, in-date SSSTS certificate',
        'Those renewing before their certificate expires'
      ],
      notSuitedFor:  'Cannot be taken if your SSSTS has expired — the full 2-day SSSTS is required instead.',
      progression:   ['citb-smsts'],
      url:           'https://www.csttraining.co.uk/sssts-r-classroom-page/',
      benefits:      'Renews your SSSTS in a single day. Certificate issued by CITB and emailed on completion.'
    },

    /* ── HSA ─────────────────────────────────────────────── */
    {
      id:            'citb-hsa',
      title:         'CITB Health & Safety Awareness (HSA)',
      category:      'CITB',
      level:         1,
      minExperience: null,
      roles:         ['labourer','operative','general operative','new starter',
                      'construction worker','site operative'],
      audience:      'Construction operatives and anyone new to site who needs basic health and safety awareness — most commonly to support a Green CSCS Labourer Card application.',
      description:   'The CITB Health and Safety Awareness course is the entry-level site safety course. Available two ways: as a 1-day virtual or physical classroom course (7.5 hours of training with the exam on the day), or as self-paced e-learning, which is the Level 1 Award in Health and Safety in the Construction Environment (equivalent to the HSA course, 3 hours of learning followed by an online proctored exam). Five modules: Legal and Management (legal and general responsibilities, accident reporting and recording); Health and Welfare (identifying and reducing risks, first aid and emergency procedures, PPE, asbestos, respiratory hazards, noise and vibration, hazardous substances, manual handling); General Safety (safety signs, fire prevention and control, electrical safety, work equipment and hand tools); High Risk Activity (working at height, excavations, confined spaces); and Environment (environmental awareness, pollution, waste materials and nuisance). For the Green CSCS Labourer Card the HSA certificate must be paired with an in-date CITB Health, Safety and Environment (HS&E) test.' + CITB_DELIVERY,
      suitedFor:     [
        'Operatives and labourers new to construction sites',
        'Anyone applying for a Green CSCS Labourer Card',
        'Workers whose site requires basic H&S awareness',
        'Those who want a flexible self-paced option via e-learning'
      ],
      notSuitedFor:  'Not sufficient for supervisors, who need SSSTS, or for managers, who need SMSTS. It is an awareness course, not a competence qualification.',
      progression:   ['citb-sssts','nvq-trade-level-2'],
      url:           'https://www.csttraining.co.uk/hsa-courses/',
      benefits:      'The standard route to the Green CSCS Labourer Card and the usual first safety qualification in construction. Classroom exam is 25 multiple choice questions in 30 minutes, pass mark 83%. Certificate issued by CITB and emailed on completion.'
    },

    /* ── TEMPORARY WORKS ─────────────────────────────────── */
    {
      id:            'citb-twc',
      title:         'CITB Temporary Works Coordinator (TWC)',
      category:      'CITB',
      level:         3,
      minExperience: null,
      roles:         ['temporary works coordinator','site manager','project manager',
                      'engineer','construction manager','site agent'],
      audience:      'Those appointed as, or preparing to be, a Temporary Works Coordinator responsible for coordinating temporary works on site.',
      description:   'The CITB Temporary Works Coordinator course covers the coordination of temporary works and the responsibilities that come with the role. Modules cover what temporary works are and the different types and solutions; the history of temporary works including the legislative framework, causes and consequences of failure and how failure is avoided; who is involved, covering stakeholder and duty holder responsibilities and accountabilities; and planning temporary works. Candidates come away understanding the need for and duties of a temporary works coordinator, the role of others, and a detailed knowledge of BS 5975 in respect of the role. Conducted over 2 full days, with the exam and course completion in the afternoon of the second day.' + CITB_DELIVERY,
      suitedFor:     [
        'Anyone appointed as a Temporary Works Coordinator',
        'Site and project managers with temporary works responsibility',
        'Engineers coordinating temporary works on site'
      ],
      notSuitedFor:  'More than a Temporary Works Supervisor needs — the 1-day TWS course covers that role. Not a general site safety course.',
      progression:   ['citb-twc-refresher'],
      url:           'https://www.csttraining.co.uk/temporary-works-coordinator-course/',
      benefits:      'The recognised qualification for the Temporary Works Coordinator role. Exam is 22 questions (18 multiple choice plus short answer) in 45 minutes, pass mark 78%. Certificate issued by CITB and emailed on completion.'
    },

    {
      id:            'citb-tws',
      title:         'CITB Temporary Works Supervisor (TWS)',
      category:      'CITB',
      level:         2,
      minExperience: null,
      roles:         ['temporary works supervisor','site supervisor','foreman',
                      'section supervisor'],
      audience:      'Those supervising temporary works on site under the direction of a Temporary Works Coordinator.',
      description:   'The CITB Temporary Works Supervisor course covers the supervisory role in temporary works. Modules mirror the TWC course — what temporary works are, the history and legislative framework, causes and consequences of failure, and who is involved — but at supervisor rather than coordinator level. 7 hours 45 minutes of training over 1 full day, with the exam in the afternoon.' + CITB_DELIVERY,
      suitedFor:     [
        'Anyone appointed as a Temporary Works Supervisor',
        'Site supervisors with temporary works duties',
        'Those working under a Temporary Works Coordinator'
      ],
      notSuitedFor:  'Not sufficient for the Temporary Works Coordinator role, which requires the 2-day TWC course.',
      progression:   ['citb-twc'],
      url:           'https://www.csttraining.co.uk/tws/',
      benefits:      'Covers the Temporary Works Supervisor role in a single day. Pass mark for Temporary Works courses is 78%. Certificate issued by CITB and emailed on completion.'
    },

    {
      id:            'citb-twc-refresher',
      title:         'CITB Temporary Works Coordinator Refresher',
      category:      'CITB',
      level:         3,
      minExperience: null,
      roles:         ['temporary works coordinator','site manager','engineer'],
      audience:      'Existing Temporary Works Coordinator certificate holders renewing before expiry.',
      description:   'The 1-day TWC Refresher renews an existing Temporary Works Coordinator certificate. 7 hours 45 minutes of training over 1 full day. Candidates MUST hold an in-date TWC certificate to sit the refresher — and the certificate must still be in date even if a resit is needed.' + CITB_DELIVERY,
      suitedFor:     [
        'TWC certificate holders renewing before expiry'
      ],
      notSuitedFor:  'Cannot be taken once your TWC certificate has expired — the full 2-day course is then required. Note that if you need to resit the refresher, your existing certificate must still be in date at that point too.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/temporary-works-refresher-remote-course/',
      benefits:      'Renews TWC in a single day. Watch the expiry date carefully — it must be in date both to sit the refresher and to resit it if needed.'
    },

    /* ── SEATS ───────────────────────────────────────────── */
    {
      id:            'citb-seats',
      title:         'CITB SEATS (Site Environmental Awareness Training Scheme)',
      category:      'CITB',
      level:         2,
      minExperience: null,
      roles:         ['site manager','site supervisor','environmental coordinator',
                      'project manager','foreman'],
      audience:      'Site managers, supervisors and anyone with environmental responsibilities on a construction site.',
      description:   'The CITB Site Environmental Awareness Training Scheme covers environmental responsibilities and good practice on construction sites. 7 hours of training over 1 full day, delivered as an online virtual classroom with up to 12 candidates. Modules cover sustainable construction and the environment (what sustainable development is, regulations and stakeholders); environmental management systems and their benefits; water management and pollution control (pollution prevention, incident response plans, de-watering versus abstraction); and resource management including efficiency and timber chain of custody. Candidates work in groups on environmental planning exercises using site drawings, in breakout rooms. Exam is 25 questions (22 multiple choice, 3 short answer) in 30 minutes. SEATS works well alongside an SMSTS or SSSTS qualification rather than as a replacement for either.',
      suitedFor:     [
        'Site managers and supervisors with environmental duties',
        'Those whose contractor or client requires environmental awareness training',
        'Anyone coordinating environmental compliance on site'
      ],
      notSuitedFor:  'Not a general site safety course — SMSTS or SSSTS cover that. Not a full environmental management qualification; the NEBOSH Environmental Management Certificate goes considerably deeper.',
      progression:   ['nebosh-environmental-management'],
      url:           'https://www.csttraining.co.uk/seats/',
      benefits:      'The CITB environmental awareness scheme for construction sites, completed in a single day. Certificate issued by CITB and emailed on completion.'
    },

    /* ── DRHS ────────────────────────────────────────────── */
    {
      id:            'citb-drhs',
      title:         "CITB Director's Role for Health & Safety (DRHS)",
      category:      'CITB',
      level:         3,
      minExperience: null,
      roles:         ['director','managing director','business owner','board member',
                      'senior manager','company owner'],
      audience:      'Directors, business owners and board members who need to understand their legal health and safety responsibilities at company level.',
      description:   "The CITB Director's Role for Health and Safety course covers directors' legal duties and the leadership role in health and safety. Modules cover leadership and worker engagement and how they aid risk management; the purpose of health and safety law; and the Plan, Do, Check, Act cycle — implementing a health and safety plan and the key actions for leaders, managers and workers, then monitoring it. Candidates come away recognising the moral, economic and legal implications of boardroom decisions that may make the business liable, and the significance of strategic risk management. 7.5 hours of training over 1 full day, with additional pre-course e-learning content to be completed beforehand. Exam is 20 questions (16 multiple choice, 4 short answer) in 35 minutes.",
      suitedFor:     [
        'Directors and business owners in construction',
        'Board members with health and safety accountability',
        'Senior leaders who need to understand their legal duties'
      ],
      notSuitedFor:  'Not an operational site safety course — SMSTS or SSSTS suit those managing or supervising site work. Directors wanting a broader leadership qualification may also consider the NEBOSH HSE Certificate in Health & Safety Leadership Excellence.',
      progression:   ['nebosh-hse-leadership'],
      url:           'https://www.csttraining.co.uk/drhs-course-remote/',
      benefits:      "Covers directors' legal health and safety duties in a single day, with pre-course e-learning to complete first. Certificate issued by CITB and emailed on completion."
    },

    /* ── CDM AWARENESS ───────────────────────────────────── */
    {
      id:            'citb-cdm-awareness',
      title:         'CITB CDM Awareness',
      category:      'CITB',
      level:         2,
      minExperience: null,
      roles:         ['site manager','site supervisor','designer','principal designer',
                      'project manager','client representative','contracts manager'],
      audience:      'Site supervisors, managers and anyone with duties under the Construction (Design and Management) Regulations.',
      description:   'The CITB CDM Awareness course covers the Construction (Design and Management) Regulations and the duties they place on the various duty holders. Syllabus: CDM 2015 overview; duty holder responsibilities and appointments (clients, principal designers, designers, principal contractors and contractors); notification of projects; the elimination, reduction and control of risks through design; construction phase plan requirements; planning, managing and monitoring construction work; and the application of CDM Part 4. Candidates come away understanding their legal position under CDM, able to identify the roles of each duty holder, and aware of why knowledge, skills, experience and resources must be assessed when appointing duty holders. Conducted over 1 full day, with the exam in the afternoon. Exam is 20 multiple choice questions, pass mark 60%.' + CITB_DELIVERY,
      suitedFor:     [
        'Site managers and supervisors with CDM duties',
        'Designers and principal designer representatives',
        'Clients and client representatives who need to understand their CDM obligations'
      ],
      notSuitedFor:  'Not a general site safety course. Those needing full site management safety training should take SMSTS.',
      progression:   ['citb-smsts','nebosh-construction'],
      url:           'https://www.csttraining.co.uk/cdm-awareness/',
      benefits:      'Covers CDM duty holder responsibilities in one day. Pass mark 60%. Certificate issued by CITB and emailed on completion.'
    },

    /* ── CITB LEADERSHIP & MANAGEMENT ────────────────────── */
    {
      id:            'citb-leadership-management',
      title:         'CITB Leadership & Management',
      category:      'CITB',
      level:         3,
      minExperience: null,
      roles:         ['site manager','supervisor','foreman','contracts manager',
                      'project manager','team leader on site'],
      audience:      'Construction supervisors and managers who want to develop leadership and people management skills within a construction context. Often bought by employers as a tailored in-house programme for a team.',
      description:   'The CITB Leadership and Management programme develops leadership and people management skills for construction supervisors and managers, built from 12 modules that can be combined and tailored to what a company needs. Courses are usually built from a selection of 4 modules up to all 12, and the length of the course depends on which modules are chosen. All candidates on a given course sit the same units. Delivered remotely or at the employer\'s own premises. The 12 modules are: understanding the induction and on-boarding of new staff in construction; understanding recruitment and selection of new staff in construction; achieving performance through people; developing yourself as a team leader; handling difficult situations; understanding training and coaching in construction; delivery of site operations and logistics; leadership and management practice in construction; planning and monitoring work in construction; solving problems and making decisions; understanding organising and delegating in construction; and understanding commercial awareness. Each module carries its own guided learning hours. Pass marks range between 75% and 80% depending on the module.' + CITB_DELIVERY,
      suitedFor:     [
        'Site managers and supervisors developing people management skills',
        'Those who want construction-specific leadership training',
        'Managers whose employer uses CITB training and may claim grant support',
        'Employers wanting a tailored in-house leadership programme delivered at their own premises'
      ],
      notSuitedFor:  'Not a health and safety course. Those wanting a nationally recognised management qualification with a professional body behind it should consider ILM or CMI instead.',
      progression:   ['ilm-level-3','cmi-level-3-management'],
      url:           'https://www.csttraining.co.uk/citb-leadership-management-course/',
      benefits:      'Construction-specific leadership and management training from CITB. Pass marks range from 75% to 80% depending on the module.'
    }

  ];

  /* ── MERGE ───────────────────────────────────────────────── */
  const kb = window.CSTKnowledge;
  const existing = new Set(kb.qualifications.map(q => q.id));
  let added = 0;

  citb.forEach(q => {
    if (!existing.has(q.id)) { kb.qualifications.push(q); added++; }
  });

  console.log('CSTKnowledge: +' + added + ' CITB courses (' + kb.qualifications.length + ' total).');


  }

  /* ── LOAD-ORDER SAFETY ────────────────────────────────────
     knowledge.js replaces window.CSTKnowledge wholesale whenever it
     runs. If it loads after this file, everything added here is lost.
     So instead of applying once, we register the work and let
     assistant.js re-apply it whenever it notices the object has been
     swapped. Applying twice is harmless — every add is guarded.
  ─────────────────────────────────────────────────────────── */
  window.CSTKnowledgeExtensions = window.CSTKnowledgeExtensions || [];
  window.CSTKnowledgeExtensions.push({ name: 'knowledge-citb', apply: apply });
  if (window.CSTKnowledge && window.CSTKnowledge.qualifications) apply();

})();
