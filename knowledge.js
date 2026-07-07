/**
 * CST Training – Qualification Advisor
 * js/knowledge.js  (rebuilt June 2026 from live site csttraining.co.uk)
 *
 * Covers every qualification the advisor should understand:
 *   - PRINCE2 7th Edition (Foundation, Practitioner)
 *   - PRINCE2 Agile (Foundation, Practitioner)
 *   - MSP 5th Edition (Foundation, Practitioner)
 *   - ILM Levels 2, 3, 4, 5, 6, 7  (Award / Certificate / Diploma variants)
 *   - CMI Management & Leadership (Levels 3, 5, 7)
 *   - CMI Coaching & Mentoring (Levels 3, 7)
 *   - CMI Professional Consulting (Level 5, 7)
 *   - CMI Project Management (Levels 3, 5)
 *   - IOSH Working Safely
 *   - IOSH Managing Safely
 *   - NEBOSH General Certificate
 *   - NEBOSH Construction Certificate
 *   - NEBOSH Fire Safety Certificate
 *   - NEBOSH Environmental Management Certificate
 *   - NEBOSH Process Safety Certificate
 *   - NEBOSH HSE Certificate in H&S Leadership Excellence
 *   - NEBOSH HSE Certificate in Managing Stress at Work
 *   - NEBOSH HSE Certificate in Manual Handling Risk Assessment
 *   - NEBOSH HSE Award in Managing Risks & Risk Assessment
 *   - NEBOSH Award in Environmental Awareness
 *   - NEBOSH Award in Health & Safety at Work
 *   - NEBOSH Working With Wellbeing
 *   - NEBOSH HSE Introduction to Incident Investigation
 *
 * NOT included (out of scope per brief):
 *   SMSTS, SSSTS, CITB, SHEA, First Aid, Mental Health, ISEP, NVQs, E-Learning
 *
 * To edit a qualification: find it by id and update the fields.
 * To add a new qualification: append an entry following the same schema.
 * URLs point to the live csttraining.co.uk pages.
 */

window.CSTKnowledge = (function () {

  const qualifications = [

    /* ═══════════════════════════════════════════════════════════
       PROJECT MANAGEMENT
    ═══════════════════════════════════════════════════════════ */

    {
      id:            'prince2-7-foundation',
      title:         'PRINCE2® 7th Edition Foundation',
      category:      'Project Management',
      level:         1,
      minExperience: 0,
      roles:         [
        'project coordinator', 'project support', 'project administrator',
        'junior project manager', 'team member', 'project manager',
        'aspiring project manager', 'project board member', 'team manager',
        'project assurance', 'operational line manager'
      ],
      audience:      'Anyone new to structured project management, or those wanting to formalise their knowledge with the UK\'s most widely recognised project management qualification.',
      description:   'PRINCE2® 7th Edition Foundation introduces the updated PRINCE2 methodology — the UK\'s leading project management framework. It covers the seven principles, practices and processes of the 7th Edition and is the essential first step before Practitioner. Delivered by CST Training via virtual classroom, day release or e-learning, with exam and free resit included.',
      suitedFor:     [
        'New or aspiring project managers with no prior PRINCE2 qualification',
        'Those in project support, coordination or administration roles',
        'Project board members, team managers or project assurance staff',
        'Operational managers who work within projects',
        'A prerequisite for PRINCE2 7th Edition Practitioner'
      ],
      notSuitedFor:  'Not suitable for those already holding a current PRINCE2 Foundation certificate — they should proceed directly to Practitioner. Not suitable for those wanting an Agile-focused qualification.',
      progression:   ['prince2-7-practitioner', 'prince2-agile-foundation'],
      url:           'https://www.csttraining.co.uk/prince2-7foundation-course/',
      benefits:      'The UK\'s most widely used project management qualification, now updated to the 7th Edition. Provides a common language and methodology recognised by employers across all sectors. CST delivers this with exam, free resit and official manual included. 0% finance available over 10 months.'
    },

    {
      id:            'prince2-7-practitioner',
      title:         'PRINCE2® 7th Edition Practitioner',
      category:      'Project Management',
      level:         2,
      minExperience: 1,
      roles:         [
        'project manager', 'senior project manager', 'project lead',
        'programme manager', 'delivery manager'
      ],
      audience:      'Practising project managers who already hold PRINCE2 Foundation (or an equivalent accepted qualification) and want to apply PRINCE2 in a real-world project environment.',
      description:   'PRINCE2® 7th Edition Practitioner demonstrates the ability to apply and adapt the PRINCE2 methodology to manage real projects. Practitioners can manage PRINCE2 projects with appropriate direction and independently lead project teams. Delivered by CST via virtual classroom or day release, with exam and free resit included.',
      suitedFor:     [
        'Existing PRINCE2 Foundation holders ready for the next step',
        'Practising project managers wanting full PRINCE2 certification',
        'Those managing complex, multi-workstream or larger projects',
        'PMs working in organisations that use the PRINCE2 framework'
      ],
      notSuitedFor:  'Requires prior PRINCE2 Foundation (7th, 6th, or accepted equivalent such as PMP, CAPM, IPMA, APM PMQ). Not an entry-level qualification — candidates without Foundation should start there.',
      progression:   ['prince2-agile-practitioner', 'msp-foundation'],
      url:           'https://www.csttraining.co.uk/prince2-7practitioner-course/',
      benefits:      'Full PRINCE2® 7th Edition certification — the most current and employer-recognised version. Qualifies you to independently lead and manage PRINCE2 projects. CST includes exam, free resit and official manual. 0% finance available over 10 months.'
    },

    {
      id:            'prince2-agile-foundation',
      title:         'PRINCE2 Agile® Foundation',
      category:      'Project Management',
      level:         2,
      minExperience: 1,
      roles:         [
        'project manager', 'agile project manager', 'scrum master',
        'delivery manager', 'product owner', 'it project manager',
        'digital project manager', 'team lead'
      ],
      audience:      'Project managers or Agile practitioners who want to understand how PRINCE2 governance and Agile delivery methods work together.',
      description:   'PRINCE2 Agile® Foundation introduces the combination of PRINCE2 project governance with Agile delivery techniques such as Scrum, Kanban and Lean. It suits those moving into organisations that use hybrid delivery approaches. Delivered by CST via virtual classroom with exam included.',
      suitedFor:     [
        'Project managers wanting to add Agile skills to their PRINCE2 knowledge',
        'Agile practitioners needing a governance framework',
        'Those working in IT, digital, finance or technology sectors',
        'Teams adopting hybrid project delivery methods',
        'A foundation for PRINCE2 Agile Practitioner'
      ],
      notSuitedFor:  'Not suitable for those with no project management background. Less suited to those working in purely traditional, non-Agile project environments.',
      progression:   ['prince2-agile-practitioner'],
      url:           'https://www.csttraining.co.uk/prince2-agilefoundation-course/',
      benefits:      'Combines the structure of PRINCE2 with the flexibility of Agile. Increasingly sought after as organisations adopt hybrid delivery. Recognised internationally by PeopleCert.'
    },

    {
      id:            'prince2-agile-practitioner',
      title:         'PRINCE2 Agile® Practitioner',
      category:      'Project Management',
      level:         3,
      minExperience: 2,
      roles:         [
        'project manager', 'agile project manager', 'scrum master',
        'delivery manager', 'product owner', 'programme manager'
      ],
      audience:      'PRINCE2 Agile Foundation holders, or PRINCE2 Practitioners, who want to demonstrate they can apply Agile techniques within a PRINCE2 governance framework on real projects.',
      description:   'PRINCE2 Agile® Practitioner is the advanced qualification demonstrating the ability to apply PRINCE2 Agile in practice. It requires PRINCE2 Agile Foundation (or PRINCE2 Foundation/Practitioner) as a prerequisite. Delivered by CST with exam and free resit included.',
      suitedFor:     [
        'PRINCE2 Agile Foundation holders progressing to Practitioner',
        'PRINCE2 Practitioners adding Agile capability',
        'PMs leading hybrid Agile/waterfall project teams',
        'Those in technology, digital or product delivery roles'
      ],
      notSuitedFor:  'Requires PRINCE2 Agile Foundation or PRINCE2 Foundation/Practitioner as a prerequisite. Not suitable for complete beginners to project management.',
      progression:   ['msp-foundation'],
      url:           'https://www.csttraining.co.uk/prince2-agilepractitioner-course/',
      benefits:      'Full PRINCE2 Agile® certification demonstrating advanced hybrid delivery skills. Highly valued in technology-focused and digitally transforming organisations.'
    },

    {
      id:            'msp-foundation',
      title:         'MSP® Foundation 5th Edition',
      category:      'Project Management',
      level:         3,
      minExperience: 4,
      roles:         [
        'programme manager', 'senior project manager', 'programme director',
        'change manager', 'portfolio manager', 'business change manager',
        'transformation manager'
      ],
      audience:      'Experienced project managers or senior leaders who are responsible for, or moving into, managing a programme of related projects aligned to strategic goals.',
      description:   'MSP® (Managing Successful Programmes) Foundation 5th Edition introduces the MSP programme management framework. It provides a grounding in how to manage transformational change through a coordinated portfolio of related projects. Delivered by CST via e-learning.',
      suitedFor:     [
        'Senior project managers moving into programme management',
        'Those overseeing multiple inter-related projects',
        'Change and business transformation leaders',
        'Those preparing for the MSP Practitioner qualification'
      ],
      notSuitedFor:  'Requires significant project management experience. Not appropriate for those managing individual projects only. Those new to project management should start with PRINCE2 Foundation.',
      progression:   ['msp-practitioner'],
      url:           'https://www.csttraining.co.uk/msp-foundation-elearning-5th-edition/',
      benefits:      'The benchmark entry point into programme management. Globally recognised framework used by government and large organisations. CST delivers via flexible e-learning.'
    },

    {
      id:            'msp-practitioner',
      title:         'MSP® Practitioner 5th Edition',
      category:      'Project Management',
      level:         4,
      minExperience: 5,
      roles:         [
        'programme manager', 'programme director', 'senior project manager',
        'portfolio manager', 'transformation director', 'change director'
      ],
      audience:      'MSP Foundation holders who want to demonstrate they can apply the MSP framework to manage real programmes of change.',
      description:   'MSP® Practitioner 5th Edition demonstrates the ability to apply the MSP methodology in a programme environment. It is the full programme management certification and requires MSP Foundation as a prerequisite. Delivered by CST via e-learning.',
      suitedFor:     [
        'MSP Foundation holders ready for full certification',
        'Programme managers wanting recognised professional qualification',
        'Senior leaders overseeing complex organisational change',
        'Directors of large-scale transformation programmes'
      ],
      notSuitedFor:  'Requires MSP Foundation as a prerequisite. Not appropriate for project managers who do not manage programmes of multiple related projects.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/msp-practitioner-elearning-5th-edition/',
      benefits:      'Full MSP® certification — the gold standard for programme managers. Recognised by government, NHS, large corporations and major infrastructure organisations.'
    },


    /* ═══════════════════════════════════════════════════════════
       ILM LEADERSHIP & MANAGEMENT
       Note: Each level has Award, Certificate and Diploma variants.
       The advisor recommends at the LEVEL — the adviser or enquiry
       process helps the visitor choose Award/Certificate/Diploma
       based on depth of study required.
    ═══════════════════════════════════════════════════════════ */

    {
      id:            'ilm-level-2',
      title:         'ILM Level 2 Award in Developing Leadership and Team Skills',
      category:      'Leadership & Management',
      level:         2,
      minExperience: 0,
      roles:         [
        'team leader', 'aspiring team leader', 'new team leader',
        'junior supervisor', 'emerging leader', 'apprentice manager'
      ],
      audience:      'New or aspiring team leaders taking their first step into leadership, wanting to develop fundamental skills for managing a small team.',
      description:   'ILM Level 2 qualifications develop the basic leadership and team skills needed to be an effective team leader. Available as an Award (4–8 weeks, £399+VAT) or Certificate (4–8 weeks, £795+VAT). Delivered entirely online by CST Training with a dedicated tutor.',
      suitedFor:     [
        'Brand new team leaders with no prior management qualification',
        'Those who have just stepped up to lead a small team',
        'Individuals wanting a short, accessible entry into leadership qualifications',
        'Those who want to build confidence before progressing to Level 3'
      ],
      notSuitedFor:  'Not appropriate for those with existing management experience or a supervisory role of any substance — ILM Level 3 is more appropriate for them.',
      progression:   ['ilm-level-3', 'cmi-level-3'],
      url:           'https://www.csttraining.co.uk/ilm-courses-nvqs/#ILM-L2',
      benefits:      'A recognised first step into leadership development. Builds confidence and provides practical tools for leading a team from day one. CST delivers online with flexible payment plans including 0% finance.'
    },

    {
      id:            'ilm-level-3',
      title:         'ILM Level 3 Award in Leadership and Management Skills',
      category:      'Leadership & Management',
      level:         3,
      minExperience: 0,
      roles:         [
        'supervisor', 'team leader', 'first-line manager', 'foreman',
        'junior manager', 'section leader', 'shift leader', 'site supervisor',
        'crew leader', 'assistant manager'
      ],
      audience:      'First-line managers, supervisors and team leaders who want a nationally recognised qualification to validate and develop their management skills at an operational level.',
      description:   'ILM Level 3 develops core leadership and management skills for first-line managers. Covers motivating teams, communicating effectively, managing performance and solving operational problems. Available as Award (4–8 weeks, £529+VAT), Certificate (4–8 weeks, £949+VAT) or Diploma (12–16 weeks, £1,295+VAT). Delivered online by CST with a dedicated tutor.',
      suitedFor:     [
        'Supervisors and team leaders in any sector',
        'Those recently promoted into a first management role',
        'First-line managers without a formal management qualification',
        'Those wanting a stepping stone toward ILM Level 5'
      ],
      notSuitedFor:  'Not appropriate for experienced middle managers or senior leaders — ILM Level 5 or Level 7 are more suitable for those with substantial management experience.',
      progression:   ['ilm-level-4', 'ilm-level-5', 'cmi-level-3'],
      url:           'https://www.csttraining.co.uk/ilm-courses-nvqs/#ILM-L3',
      benefits:      'Nationally recognised ILM qualification that validates first-line management skills. Builds practical confidence for day-to-day people management. CST delivers fully online with 0% finance available over 10 months.'
    },

    {
      id:            'ilm-level-4',
      title:         'ILM Level 4 Award in Leadership & Management',
      category:      'Leadership & Management',
      level:         4,
      minExperience: 2,
      roles:         [
        'team manager', 'junior middle manager', 'aspiring operations manager',
        'department coordinator', 'project team leader', 'senior supervisor'
      ],
      audience:      'Those bridging the gap between first-line supervision and middle management, wanting to develop core leadership skills for a more senior role.',
      description:   'ILM Level 4 builds on Level 3 and prepares managers for middle management responsibilities. Covers planning, resource management, developing teams and improving performance. Available as Award (4–8 weeks, £629+VAT), Certificate (4–8 weeks, £999+VAT) or Diploma (12–16 weeks, £1,329+VAT). Delivered online by CST.',
      suitedFor:     [
        'Managers progressing from Level 3 or a supervisory background',
        'Those moving into a middle management or operations role',
        'Managers wanting to build on existing Level 3 knowledge',
        'Aspiring department heads or team managers'
      ],
      notSuitedFor:  'Less commonly the starting point for those without prior management experience — Level 3 is a better entry point. Those with significant middle management experience may be better suited to Level 5.',
      progression:   ['ilm-level-5'],
      url:           'https://www.csttraining.co.uk/ilm-courses-nvqs/#ILM-L4',
      benefits:      'Bridges the gap between supervisory and middle management. Develops the planning and leadership skills required for operational management roles. Flexible online delivery with 0% finance from CST Training.'
    },

    {
      id:            'ilm-level-5',
      title:         'ILM Level 5 Award in Operational Leadership and Management Skills',
      category:      'Leadership & Management',
      level:         5,
      minExperience: 3,
      roles:         [
        'middle manager', 'operations manager', 'department manager',
        'team manager', 'general manager', 'production manager',
        'regional manager', 'area manager', 'contracts manager'
      ],
      audience:      'Middle managers with experience who want to develop strategic thinking and improve performance across teams, departments or business units.',
      description:   'ILM Level 5 develops strategic management capabilities at an operational level. Covers change management, performance management, operational planning and leading high-performing teams. Available as Award (4–8 weeks, £695+VAT), Certificate (4–8 weeks, £1,095+VAT) or Diploma (12–16 weeks, £1,395+VAT). Delivered online by CST.',
      suitedFor:     [
        'Middle managers with at least 2–3 years management experience',
        'Those progressing from first-line to more strategic management',
        'Managers responsible for multiple teams or a department',
        'Those wanting to progress toward ILM Level 7'
      ],
      notSuitedFor:  'Not the best starting point for first-line supervisors or those new to management — Level 3 is the right entry point. Not appropriate for very senior executives — Level 7 is more suitable.',
      progression:   ['ilm-level-6', 'ilm-level-7', 'cmi-level-5'],
      url:           'https://www.csttraining.co.uk/ilm-courses-nvqs/#ILM-L5',
      benefits:      'Develops strategic management thinking and builds leadership influence across an organisation. Widely respected by employers in all sectors. CST delivers online with flexible payment plans and 0% finance.'
    },

    {
      id:            'ilm-level-6',
      title:         'ILM Level 6 Award in Leadership and Management',
      category:      'Leadership & Management',
      level:         6,
      minExperience: 5,
      roles:         [
        'senior manager', 'head of department', 'regional director',
        'operations director', 'senior operations manager', 'general manager'
      ],
      audience:      'Mid-to-senior managers preparing for or already operating at a senior management level, wanting a qualification between Level 5 and the Masters-level Level 7.',
      description:   'ILM Level 6 is a senior management qualification sitting between Level 5 and Level 7. It develops advanced leadership, strategic thinking and organisational management skills. Available as Award (4–8 weeks, £1,195+VAT), Certificate (4–8 weeks, £1,295+VAT) or Diploma (12–16 weeks, £1,495+VAT). Delivered online by CST.',
      suitedFor:     [
        'Senior managers who have completed Level 5 and want to progress',
        'Experienced managers preparing for a director-level role',
        'Those wanting advanced leadership credentials below Masters level',
        'Mid-level leaders moving into strategic senior roles'
      ],
      notSuitedFor:  'Not typically the starting point — most candidates come via Level 5. Very senior executives at director level may be better served by Level 7.',
      progression:   ['ilm-level-7'],
      url:           'https://www.csttraining.co.uk/ilm-courses-nvqs/#ILM-L6',
      benefits:      'Develops advanced strategic leadership skills for senior management roles. A strong stepping stone to Level 7 or to director-level positions. CST delivers online with 0% finance available.'
    },

    {
      id:            'ilm-level-7',
      title:         'ILM Level 7 Award in Strategic Leadership & Management',
      category:      'Leadership & Management',
      level:         7,
      minExperience: 7,
      roles:         [
        'senior manager', 'director', 'head of department', 'chief executive',
        'operations director', 'managing director', 'executive', 'ceo', 'cfo',
        'business owner', 'partner'
      ],
      audience:      'Senior leaders, directors and executives who want a postgraduate Masters-equivalent qualification to develop strategic leadership capability at the highest level.',
      description:   'ILM Level 7 operates at postgraduate level (Masters equivalent) and develops executive-level strategic leadership. Covers organisational strategy, culture change and complex leadership at the highest level. Available as Award (4–8 weeks, £995+VAT), Certificate (4–8 weeks, £1,495+VAT), Diploma (5–6 months, £1,795+VAT) or Extended Diploma (12–18 months, £2,495+VAT). Delivered online by CST.',
      suitedFor:     [
        'Senior leaders, directors and executives with substantial experience',
        'Those with typically 7+ years of management experience',
        'CEOs, CFOs, MDs and business owners seeking a Masters-equivalent qualification',
        'Leaders driving organisational strategy and long-term change'
      ],
      notSuitedFor:  'Not appropriate for first-line managers, supervisors or those with limited management experience. ILM Level 3 is the correct starting point for most new managers. Level 5 suits middle managers.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/ilm-courses-nvqs/#ILM-L7',
      benefits:      'Masters-equivalent qualification recognised by employers nationally. Demonstrates executive leadership capability and supports movement into board-level roles. CST delivers fully online with a dedicated industry expert tutor and 0% finance over 10 months.'
    },


    /* ═══════════════════════════════════════════════════════════
       CMI MANAGEMENT & LEADERSHIP
    ═══════════════════════════════════════════════════════════ */

    {
      id:            'cmi-level-3-management',
      title:         'CMI Level 3 Diploma in Principles of Management & Leadership',
      category:      'Leadership & Management',
      level:         3,
      minExperience: 0,
      roles:         [
        'supervisor', 'team leader', 'first-line manager', 'junior manager',
        'site supervisor', 'practicing manager', 'aspiring manager'
      ],
      audience:      'Practicing or aspiring first-line managers who want a CMI-accredited qualification and a clear pathway toward Chartered Manager status.',
      description:   'CMI Level 3 builds core management skills at a supervisory level, accredited by the Chartered Management Institute. Typical units include: Principles of Management & Leadership; Managing a Team to Achieve Results; Building Stakeholder Relationships Using Effective Communication; Contributing to the Delivery of a Project; Managing Daily Activities to Achieve Results; and Managing Budgets & Resources. 3–6 months online delivery. £1,799+VAT with 0% finance over 10 months. CMI membership included for the duration of the course.',      suitedFor:     [
        'First-line managers and supervisors wanting CMI accreditation',
        'Those who prefer CMI as their professional body over ILM',
        'Those wanting a pathway to Chartered Manager (CMgr) status',
        'Practicing or aspiring managers at an operational level'
      ],
      notSuitedFor:  'Not appropriate for experienced middle or senior managers — CMI Level 5 or 7 would be more suitable.',
      progression:   ['cmi-level-5-management', 'ilm-level-5'],
      url:           'https://www.csttraining.co.uk/cmi-management-leadership-courses/',
      benefits:      'CMI-accredited qualification with a pathway to Chartered Manager status. CMI membership included throughout. Respected by employers across public and private sectors. CST delivers online with 0% finance.'
    },

    {
      id:            'cmi-level-5-management',
      title:         'CMI Level 5 Diploma in Management & Leadership',
      category:      'Leadership & Management',
      level:         5,
      minExperience: 3,
      roles:         [
        'middle manager', 'operations manager', 'department manager',
        'project manager', 'general manager', 'contracts manager',
        'commercial manager', 'aspiring senior manager'
      ],
      audience:      'Middle managers with experience who want CMI-accredited recognition at an operational and strategic level, with a pathway to Chartered Manager status.',
description:   'CMI Level 5 develops management and leadership skills at an operational and strategic level. Typical units include: Principles of Management & Leadership in an Organisational Context; Principles of Developing, Managing & Leading Individuals and Teams to Achieve Success; Managing Performance; Managing Stakeholder Relationships; Managing Change; and Creating & Delivering Operational Plans. 6–12 months online delivery. £1,680+VAT with 0% finance over 10 months. CMI membership included. Provides a pathway to Chartered Manager (CMgr) status for those with 3+ years management experience.',      suitedFor:     [
        'Middle managers with 2–4 years management experience',
        'Those wanting CMI accreditation rather than ILM',
        'Managers pursuing Chartered Manager (CMgr) status',
        'Those in commercial, operations, construction or project management environments'
      ],
      notSuitedFor:  'Not suitable for first-line supervisors without management experience, or for very senior executives — Level 3 and Level 7 are more appropriate for those groups.',
      progression:   ['cmi-level-7-management'],
      url:           'https://www.csttraining.co.uk/cmi-management-leadership-courses/',
      benefits:      'CMI-accredited qualification supporting Chartered Manager status. Respected by employers nationally. CST delivers online with a dedicated tutor and 0% finance available.'
    },

    {
      id:            'cmi-level-7-management',
      title:         'CMI Level 7 Diploma in Strategic Management & Leadership Practice',
      category:      'Leadership & Management',
      level:         7,
      minExperience: 7,
      roles:         [
        'director', 'senior manager', 'managing director', 'chief executive',
        'head of department', 'partner', 'business owner', 'executive'
      ],
      audience:      'Senior leaders and directors who want a postgraduate-equivalent CMI qualification to develop strategic leadership at the highest organisational level.',
description:   'CMI Level 7 is a postgraduate-equivalent qualification developing senior leaders\' ability to drive organisational strategy, culture and transformation. Typical units include: Strategic Leadership; Developing Organisational Strategy; Strategic Risk Management; Collaboration & Partnerships; Entrepreneurial Practice; and Personal & Professional Development for Strategic Leaders. 6–12 months online delivery. £1,900+VAT with 0% finance over 10 months. CMI membership included. Provides a pathway to Chartered Manager (CMgr) status for those with 3+ years management experience.',      suitedFor:     [
        'Senior managers and directors with 7+ years experience',
        'Executives wanting a Masters-level management qualification via CMI',
        'Those seeking Chartered Manager (CMgr) or Fellow CMI status',
        'Leaders driving long-term strategy and organisational change'
      ],
      notSuitedFor:  'Not appropriate for those without substantial senior management experience. CMI Level 5 is the correct starting point for most middle managers.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/cmi-management-leadership-courses/',
      benefits:      'Postgraduate-level CMI accreditation supporting Chartered Manager and Fellow CMI status. Demonstrates boardroom-level strategic leadership. CST delivers online with expert tutor support and 0% finance.'
    },


    /* ═══════════════════════════════════════════════════════════
       CMI COACHING & MENTORING
    ═══════════════════════════════════════════════════════════ */

    {
      id:            'cmi-level-3-coaching',
      title:         'CMI Level 3 Diploma in Coaching & Mentoring',
      category:      'Leadership & Management',
      level:         3,
      minExperience: 0,
      roles:         [
        'supervisor', 'first-line manager', 'team leader', 'hr professional',
        'learning and development professional', 'aspiring coach'
      ],
      audience:      'Supervisors and first-line managers who want to develop formal coaching and mentoring skills to better support their teams.',
description:   'CMI Level 3 Coaching & Mentoring develops practical coaching and mentoring skills for supervisors and first-line managers. Typical units include: Principles, Skills and Impact of Coaching and Mentoring; Coaching and Mentoring for Individual and Team Needs; Coaching and Mentoring Processes; Coaching and Mentoring Relationships; Understanding Organisational Culture, Values and Behaviour; Promoting Equality and Diversity; and Understanding Team Dynamics. 3–6 months online delivery. £1,340+VAT with 0% finance over 10 months.',      suitedFor:     [
        'Supervisors and team leaders wanting coaching skills',
        'First-line managers who support team development',
        'HR or L&D professionals at an operational level',
        'Those wanting CMI accreditation in coaching specifically'
      ],
      notSuitedFor:  'Not a general management qualification — specifically for those whose role involves coaching or mentoring others. For general management skills, CMI Level 3 Management & Leadership is more appropriate.',
      progression:   ['cmi-level-7-coaching'],
      url:           'https://www.csttraining.co.uk/cmi-coaching-mentoring-courses/',
      benefits:      'CMI-accredited coaching qualification. Practical skills for developing people within your team. Supports progression into L&D or people development roles. CST delivers online with 0% finance.'
    },

    {
      id:            'cmi-level-7-coaching',
      title:         'CMI Level 7 Diploma in Leadership Coaching & Mentoring',
      category:      'Leadership & Management',
      level:         7,
      minExperience: 5,
      roles:         [
        'senior manager', 'director', 'executive coach', 'leadership coach',
        'hr director', 'l&d manager', 'organisational development manager',
        'people director'
      ],
      audience:      'Senior leaders, managers and coaches who want to develop advanced coaching and mentoring capability at a strategic level.',
description:   'CMI Level 7 Coaching & Mentoring develops advanced coaching and leadership mentoring skills at a postgraduate level. Typical units include: Coaching and Mentoring Within Organisational Culture; Coaching and Mentoring Policies; Strategic Impact of Coaching and Mentoring; Leadership Coaching and Mentoring Skills; Leading Equality and Diversity; and Embedding Coaching and Mentoring in the Organisation. 6–12 months online delivery. £1,500+VAT with 0% finance over 10 months.',      suitedFor:     [
        'Senior leaders wanting to develop as executive coaches',
        'HR, L&D or OD professionals operating at a strategic level',
        'Those building a professional coaching practice',
        'Leaders who coach directors or senior management teams'
      ],
      notSuitedFor:  'Not appropriate for those new to coaching or management. CMI Level 3 Coaching is a better starting point for first-line managers.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/cmi-coaching-mentoring-courses/',
      benefits:      'Postgraduate-level CMI coaching qualification. Highly valued for executive coaching and leadership development roles. CST delivers online with expert tutor support.'
    },


    /* ═══════════════════════════════════════════════════════════
       CMI PROFESSIONAL CONSULTING
    ═══════════════════════════════════════════════════════════ */

    {
      id:            'cmi-level-5-consulting',
      title:         'CMI Level 5 in Management Consulting Practice',
      category:      'Leadership & Management',
      level:         5,
      minExperience: 2,
      roles:         [
        'management consultant', 'business consultant', 'change consultant',
        'advisor', 'strategy consultant', 'internal consultant',
        'project manager moving into consulting'
      ],
      audience:      'Professionals working in or moving into a consulting role who want a recognised CMI qualification in management consulting practice.',
      description:   'CMI Level 5 Professional Consulting develops the skills and frameworks needed to work effectively as a management consultant. Available as Award (£320+VAT), Certificate (£550+VAT) or Diploma (£1,100+VAT). Delivered online by CST.',
      suitedFor:     [
        'Practicing management consultants wanting formal accreditation',
        'Professionals moving into a consulting or advisory role',
        'Internal consultants within larger organisations',
        'Project managers wanting to develop consulting skills'
      ],
      notSuitedFor:  'Not a general management qualification. Not suitable for those wanting leadership and management skills — CMI Level 5 Management & Leadership is more appropriate.',
      progression:   ['cmi-level-7-consulting'],
      url:           'https://www.csttraining.co.uk/cmi-professional-consulting-courses/',
      benefits:      'CMI-accredited consulting qualification. Builds credibility as a professional consultant. Recognised framework for consulting practice. CST delivers online with 0% finance available.'
    },

    {
      id:            'cmi-level-7-consulting',
      title:         'CMI Level 7 Diploma in Professional Consulting',
      category:      'Leadership & Management',
      level:         7,
      minExperience: 5,
      roles:         [
        'senior management consultant', 'principal consultant', 'partner',
        'head of consulting', 'strategy director', 'executive advisor'
      ],
      audience:      'Experienced consultants and senior advisors who want a postgraduate-level CMI qualification in professional consulting.',
      description:   'CMI Level 7 Professional Consulting is a postgraduate-level qualification for experienced consultants wanting advanced accreditation. 6–12 months online delivery. £1,100+VAT with 0% finance over 10 months.',
      suitedFor:     [
        'Senior or experienced management consultants',
        'Those building or leading a consulting practice',
        'Advisors wanting postgraduate-level CMI recognition',
        'Those progressing from CMI Level 5 Consulting'
      ],
      notSuitedFor:  'Not suitable for those new to consulting. CMI Level 5 Consulting is the appropriate starting point.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/cmi-professional-consulting-courses/',
      benefits:      'Postgraduate CMI accreditation in professional consulting. Strengthens credibility and professional standing as a senior consultant or advisor.'
    },


    /* ═══════════════════════════════════════════════════════════
       CMI PROJECT MANAGEMENT
    ═══════════════════════════════════════════════════════════ */

    {
      id:            'cmi-level-3-project-management',
      title:         'CMI Level 3 Award in Project Management',
      category:      'Project Management',
      level:         3,
      minExperience: 0,
      roles:         [
        'junior project manager', 'project coordinator', 'project support',
        'aspiring project manager', 'team leader managing small projects'
      ],
      audience:      'Those new to project management or in a junior project role who want a CMI-accredited introduction to project management principles.',
      description:   'CMI Level 3 Project Management provides an introduction to project management principles and practice, awarded by CMI. 8–16 weeks online delivery. £300+VAT with 0% finance.',
      suitedFor:     [
        'Those new to managing projects',
        'Junior project coordinators wanting a recognised qualification',
        'Those who prefer a CMI-accredited route into project management',
        'Team leaders who manage small internal projects'
      ],
      notSuitedFor:  'Those wanting the most widely recognised project management methodology should consider PRINCE2 7th Edition Foundation instead, which is more universally recognised by employers.',
      progression:   ['cmi-level-5-project-management', 'prince2-7-foundation'],
      url:           'https://www.csttraining.co.uk/cmi-project-management-courses/',
      benefits:      'CMI-accredited introduction to project management. Good foundation for those in organisations that use CMI qualifications. Flexible online delivery from CST.'
    },

    {
      id:            'cmi-level-5-project-management',
      title:         'CMI Level 5 Certificate in Project Management',
      category:      'Project Management',
      level:         5,
      minExperience: 2,
      roles:         [
        'project manager', 'project leader', 'programme coordinator',
        'delivery manager', 'operations manager managing projects'
      ],
      audience:      'Project managers and leaders with experience who want a CMI-accredited qualification at a practitioner level.',
      description:   'CMI Level 5 Project Management develops project management knowledge and skills at a practitioner level. 3–5 months online delivery. £600+VAT with 0% finance.',
      suitedFor:     [
        'Experienced project managers wanting CMI accreditation',
        'Those progressing from CMI Level 3 Project Management',
        'Project leaders in CMI-focused organisations',
        'Managers who run projects as part of a broader role'
      ],
      notSuitedFor:  'Those wanting the industry-standard methodology qualification should consider PRINCE2 7th Edition Practitioner, which is more widely recognised across sectors.',
      progression:   ['prince2-7-practitioner', 'msp-foundation'],
      url:           'https://www.csttraining.co.uk/cmi-project-management-courses/',
      benefits:      'CMI-accredited project management qualification at practitioner level. Good for those in CMI-aligned organisations or wanting to combine with management and leadership qualifications.'
    },


    /* ═══════════════════════════════════════════════════════════
       IOSH
    ═══════════════════════════════════════════════════════════ */

    {
      id:            'iosh-working-safely',
      title:         'IOSH Working Safely',
      category:      'Health & Safety',
      level:         1,
      minExperience: 0,
      roles:         [
        'worker', 'operative', 'employee', 'labourer', 'technician',
        'general staff', 'new starter', 'office worker', 'warehouse operative'
      ],
      audience:      'Any employee at any level who needs a basic awareness of workplace health and safety. This is not a management qualification.',
      description:   'IOSH Working Safely is a short introductory health and safety awareness course for workers across all sectors and industries. It covers why safety matters, common hazards, risks and how to work safely. Available from CST Training via bulk order.',
      suitedFor:     [
        'Workers and operatives with no prior H&S qualification',
        'New starters needing basic safety induction training',
        'Any employee regardless of sector',
        'Those who do not have management responsibility for others'
      ],
      notSuitedFor:  'Not suitable for managers or supervisors who have responsibility for other people\'s safety — IOSH Managing Safely is more appropriate for them.',
      progression:   ['iosh-managing-safely'],
      url:           'https://www.csttraining.co.uk/iosh-working-safely/',
      benefits:      'Quick, accessible introduction to workplace safety. Widely recognised by employers. Demonstrates basic safety awareness and helps reduce workplace incidents.'
    },

    {
      id:            'iosh-managing-safely',
      title:         'IOSH Managing Safely',
      category:      'Health & Safety',
      level:         2,
      minExperience: 0,
      roles:         [
        'manager', 'supervisor', 'team leader', 'site manager',
        'line manager', 'operations manager', 'facilities manager',
        'office manager', 'construction supervisor'
      ],
      audience:      'Managers and supervisors in any sector who need a practical, working knowledge of health and safety management and their legal responsibilities.',
      description:   'IOSH Managing Safely is one of the most popular health and safety qualifications in the UK. It gives managers and supervisors the tools to manage risks, meet legal responsibilities and protect their teams. Delivered by CST Training with bulk order discounts available.',
      suitedFor:     [
        'Managers and supervisors in any industry',
        'Those with direct responsibility for a team\'s safety',
        'Managers who are new to health and safety',
        'Those wanting a practical H&S qualification without the depth of NEBOSH'
      ],
      notSuitedFor:  'Not the right qualification for those wanting a dedicated H&S career or a technical NEBOSH-level qualification. Not a substitute for the NEBOSH General Certificate for H&S professionals.',
      progression:   ['nebosh-general', 'nebosh-construction'],
      url:           'https://www.csttraining.co.uk/iosh-managing-safely',
      benefits:      'One of the UK\'s most widely recognised management H&S qualifications. Practical and workplace-focused. Supports legal compliance and reduces risk. CST offers bulk order discounts for teams.'
    },


    /* ═══════════════════════════════════════════════════════════
       NEBOSH — CORE CERTIFICATES
    ═══════════════════════════════════════════════════════════ */

 {
      id:            'nebosh-general',
      title:         'NEBOSH National General Certificate in Occupational Health & Safety',
      category:      'Health & Safety',
      level:         3,
      minExperience: 0,
      roles:         [
        'health and safety officer', 'h&s manager', 'safety manager',
        'compliance manager', 'facilities manager', 'operations manager',
        'hr manager', 'h&s advisor', 'h&s coordinator'
      ],
      audience:      'Anyone responsible for health and safety in a general workplace environment — offices, warehouses, manufacturing, retail, logistics and similar non-specialist settings.',
      description:   'The NEBOSH National General Certificate is the most widely held H&S qualification in the UK. It consists of two units: NG1 (Management of Health and Safety, assessed via an open book exam) and NG2 (Risk Assessment, assessed via a practical workplace risk assessment plus an interview with CST Training). Covers 11 elements including health and safety management systems, risk assessment, physical and psychological health, musculoskeletal health, chemical and biological agents, work equipment, fire and electricity. Delivered over 10 days via classroom or virtual classroom, with flexible scheduling options including block, day release and 2-day release formats.',
      suitedFor:     [
        'H&S officers and managers in any general sector',
        'Those with H&S management responsibilities in a non-specialist workplace',
        'People moving into a dedicated health and safety role',
        'Managers wanting a comprehensive H&S qualification',
        'A pathway to CMIOSH (Chartered Member of IOSH)'
      ],
      notSuitedFor:  'Not the best fit for construction-specific roles (NEBOSH Construction Certificate is more appropriate) or process/chemical industries (NEBOSH Process Safety). Not required for workers without H&S management responsibilities — IOSH Managing Safely covers those needs.',
      progression:   ['nebosh-construction', 'nebosh-fire-safety', 'nebosh-environmental-management'],
      url:           'https://www.csttraining.co.uk/nebosh-general-certificate-health-safety/',
      benefits:      'The benchmark H&S qualification recognised globally as the gold standard for health and safety. Significantly improves career prospects in health and safety. Accepted as a pathway to CMIOSH membership. CST delivers with flexible formats, a dedicated candidate support portal and ongoing tutor feedback throughout.'
    },
   {
      id:            'nebosh-construction',
      title:         'NEBOSH Health & Safety Management for Construction (UK)',
      category:      'Health & Safety',
      level:         3,
      minExperience: 0,
      roles:         [
        'construction manager', 'site manager', 'project manager',
        'health and safety advisor', 'cdm coordinator', 'contracts manager',
        'quantity surveyor', 'construction h&s officer', 'site agent'
      ],
      audience:      'Those working in the construction industry who need a specialist H&S qualification covering construction-specific risks, CDM regulations and site safety legislation.',
      description:   'The NEBOSH Construction Certificate covers 13 elements specific to construction including excavation, demolition, mobile plant and vehicles, working at height, musculoskeletal health and load handling, work equipment, electricity, fire, and chemical and biological agents. Assessed via a single practical digital assessment with NEBOSH, where candidates carry out a series of tasks to demonstrate both knowledge and practical competence. Delivered over 10 days via classroom or virtual classroom, with flexible scheduling options including block, day release and 2-day release formats.',
      suitedFor:     [
        'Construction site managers and supervisors',
        'H&S professionals working in construction',
        'CDM coordinators and principal designer representatives',
        'Contractors and site agents needing a construction-specific qualification'
      ],
      notSuitedFor:  'Not appropriate for those who work in a general office, retail, manufacturing or non-construction environment — NEBOSH General Certificate is better suited. Not for workers without H&S management responsibilities.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/nebosh-health-safety-management-construction/',
      benefits:      'The specialist qualification for construction H&S professionals, recognised by top construction companies globally for ensuring optimum site safety. Gives candidates the technical knowledge, practical skills and confidence to comply with legislation, implement best practice and influence safer work habits. CST delivers with flexible formats, a dedicated candidate support portal and ongoing tutor feedback throughout.'
    },

    {
      id:            'nebosh-fire-safety',
      title:         'NEBOSH Certificate in Fire Safety',
      category:      'Health & Safety',
      level:         3,
      minExperience: 0,
      roles:         [
        'fire safety manager', 'fire safety officer', 'facilities manager',
        'building manager', 'h&s manager', 'compliance manager',
        'responsible person for fire safety'
      ],
      audience:      'Anyone responsible for managing fire-related risks in the workplace, including fire safety officers, facilities managers and those with the legal role of Responsible Person.',
      description:   'The NEBOSH Certificate in Fire Safety provides a comprehensive understanding of fire safety management. Course learning completed online in 4 days. Official NEBOSH exam included. Delivered by CST Training.',
      suitedFor:     [
        'Fire safety officers and managers',
        'Facilities managers with fire safety responsibilities',
        'Those who hold the legal role of Responsible Person for fire safety',
        'H&S professionals wanting to add fire safety specialism'
      ],
      notSuitedFor:  'Not a general H&S qualification — specifically for those with fire safety management responsibilities. For general H&S, NEBOSH General Certificate is more appropriate.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/nebosh-certificate-fire-safety/',
      benefits:      'Specialist fire safety qualification recognised across all sectors. Demonstrates legal competence as Responsible Person. CST delivers with exam included.'
    },

    {
      id:            'nebosh-environmental-management',
      title:         'NEBOSH Environmental Management Certificate',
      category:      'Health & Safety',
      level:         3,
      minExperience: 0,
      roles:         [
        'environmental manager', 'sustainability manager', 'facilities manager',
        'operations manager', 'h&s manager', 'environmental officer',
        'compliance manager', 'ehs manager'
      ],
      audience:      'Supervisors, managers and staff in any sector who want to introduce or improve environmental management systems within their workplace.',
      description:   'The NEBOSH Environmental Management Certificate covers the principles and practice of environmental management. Course learning completed online in 5 days. Official NEBOSH exam included. Delivered by CST Training.',
      suitedFor:     [
        'Environmental and sustainability managers',
        'EHS (Environment, Health & Safety) professionals',
        'Operations and facilities managers with environmental responsibilities',
        'Those implementing ISO 14001 or environmental management systems'
      ],
      notSuitedFor:  'Not a general H&S qualification. For general workplace H&S, NEBOSH General Certificate is more appropriate.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/nebosh-environmental-management-certificate/',
      benefits:      'Specialist environmental management qualification. Valued by organisations committed to sustainability and ISO 14001 compliance. CST delivers with exam included.'
    },

    {
      id:            'nebosh-process-safety',
      title:         'NEBOSH Certificate in Process Safety Management',
      category:      'Health & Safety',
      level:         3,
      minExperience: 1,
      roles:         [
        'process safety manager', 'h&s manager', 'chemical plant manager',
        'oil and gas professional', 'process engineer', 'safety manager',
        'comah site manager', 'manufacturing safety manager'
      ],
      audience:      'H&S professionals, managers and supervisors working in high-hazard industries such as oil and gas, chemicals, pharmaceuticals, utilities or manufacturing where process safety is a key risk.',
      description:   'The NEBOSH Certificate in Process Safety Management covers major accident hazards, process safety systems and safety management in high-hazard industries. Course learning completed online in 4 days. Delivered by CST Training.',
      suitedFor:     [
        'H&S professionals in oil, gas, chemical or pharmaceutical sectors',
        'Process engineers with safety management responsibilities',
        'Those working on COMAH-regulated sites',
        'Safety managers in high-hazard or major hazard industries'
      ],
      notSuitedFor:  'Not relevant to general workplaces, construction or office environments. Highly specialised — for most organisations, NEBOSH General Certificate is more appropriate.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/nebosh-hse-process-safety-management/',
      benefits:      'Specialist qualification for high-hazard industry H&S professionals. Valued by major employers in oil, gas, chemicals and utilities. Demonstrates advanced process safety expertise.'
    },


    /* ═══════════════════════════════════════════════════════════
       NEBOSH — HSE CERTIFICATES (focused, shorter qualifications
       co-developed with the Health & Safety Executive)
    ═══════════════════════════════════════════════════════════ */

    {
      id:            'nebosh-hse-leadership',
      title:         'NEBOSH HSE Certificate in Health & Safety Leadership Excellence',
      category:      'Health & Safety',
      level:         2,
      minExperience: 0,
      roles:         [
        'senior leader', 'director', 'business owner', 'manager',
        'ceo', 'managing director', 'board member', 'senior manager'
      ],
      audience:      'Senior leaders, directors and business owners who want to strengthen their health and safety leadership skills and understand their responsibilities at a strategic level.',
      description:   'The NEBOSH HSE Certificate in H&S Leadership Excellence is a short one-day online qualification co-developed with the HSE, specifically designed for senior leaders and directors. It focuses on leadership behaviours that drive a positive safety culture. Course learning completed online in 1 day. Delivered by CST Training.',
      suitedFor:     [
        'Directors and senior leaders with overall H&S responsibility',
        'Business owners wanting to lead a better safety culture',
        'CEOs and MDs who need to understand their H&S legal duties',
        'Board members wanting to demonstrate safety leadership'
      ],
      notSuitedFor:  'Not a replacement for a full NEBOSH qualification for H&S professionals. Designed specifically for senior leaders, not front-line managers or safety practitioners.',
      progression:   ['nebosh-general'],
      url:           'https://www.csttraining.co.uk/nebosh-hse-certificate-leadership/',
      benefits:      'Specifically designed for senior leaders by NEBOSH and the HSE. Short, accessible format ideal for busy directors. Demonstrates board-level commitment to safety culture.'
    },

    {
      id:            'nebosh-hse-stress',
      title:         'NEBOSH HSE Certificate in Managing Stress at Work',
      category:      'Health & Safety',
      level:         2,
      minExperience: 0,
      roles:         [
        'h&s practitioner', 'hr manager', 'line manager', 'supervisor',
        'occupational health professional', 'wellbeing manager',
        'people manager'
      ],
      audience:      'Anyone involved in managing workplace stress, particularly H&S practitioners, HR teams, line managers and health professionals.',
      description:   'The NEBOSH HSE Certificate in Managing Stress at Work is a focused one-day qualification covering workplace stress risk management. Co-developed with the HSE. Course learning completed online in 1 day. Delivered by CST Training.',
      suitedFor:     [
        'HR managers and wellbeing professionals',
        'Line managers and supervisors dealing with stress in teams',
        'H&S practitioners wanting a stress-specific qualification',
        'Occupational health professionals'
      ],
      notSuitedFor:  'Not a general H&S qualification. For broad H&S management skills, IOSH Managing Safely or NEBOSH General Certificate are more appropriate.',
      progression:   ['nebosh-general'],
      url:           'https://www.csttraining.co.uk/nebosh-hse-certificate-stress-at-work/',
      benefits:      'Targeted qualification addressing one of the most significant workplace health issues. Co-developed with the HSE, adding credibility. Short format suitable for busy professionals.'
    },

    {
      id:            'nebosh-hse-manual-handling',
      title:         'NEBOSH HSE Certificate in Manual Handling Risk Assessment',
      category:      'Health & Safety',
      level:         2,
      minExperience: 0,
      roles:         [
        'h&s officer', 'manual handling trainer', 'warehouse manager',
        'logistics manager', 'operations manager', 'nurse', 'care worker',
        'facilities manager'
      ],
      audience:      'Individuals across any sector who need the knowledge and confidence to assess manual handling tasks and reduce the risk of musculoskeletal injury.',
      description:   'The NEBOSH HSE Certificate in Manual Handling Risk Assessment is a focused one-day qualification covering manual handling risk assessment methodology. Co-developed with the HSE. Course learning completed online in 1 day. Official NEBOSH exam included. Delivered by CST Training.',
      suitedFor:     [
        'Those responsible for manual handling risk assessments',
        'H&S officers in warehousing, logistics, healthcare or manufacturing',
        'Managers in sectors with significant manual handling risks',
        'Workplace assessors and trainers covering manual handling'
      ],
      notSuitedFor:  'Not a general H&S qualification. Topic-specific — for broad H&S skills, IOSH Managing Safely or NEBOSH General Certificate are more appropriate.',
      progression:   ['nebosh-general', 'iosh-managing-safely'],
      url:           'https://www.csttraining.co.uk/nebosh-hse-manual-risk-handling/',
      benefits:      'Targeted qualification addressing one of the most common causes of workplace injury. Co-developed with the HSE. Short online format with exam included.'
    },

    {
      id:            'nebosh-hse-incident-investigation',
      title:         'NEBOSH HSE Introduction to Incident Investigation',
      category:      'Health & Safety',
      level:         2,
      minExperience: 0,
      roles:         [
        'h&s officer', 'h&s manager', 'line manager', 'supervisor',
        'operations manager', 'quality manager', 'safety representative'
      ],
      audience:      'Anyone responsible for investigating workplace incidents who wants the skills to gather evidence, identify root causes and prevent recurrence.',
      description:   'The NEBOSH HSE Introduction to Incident Investigation is a focused one-day qualification covering incident investigation methodology. Co-developed with the HSE. Course learning completed online in 1 day. Delivered by CST Training.',
      suitedFor:     [
        'H&S officers and managers who investigate workplace incidents',
        'Line managers and supervisors with incident investigation duties',
        'Safety representatives wanting a structured investigation framework',
        'Operations managers with responsibility for near-miss reporting'
      ],
      notSuitedFor:  'Not a general H&S qualification. Specifically for those with incident investigation responsibilities.',
      progression:   ['nebosh-general'],
      url:           'https://www.csttraining.co.uk/nebosh-incident-investigation/',
      benefits:      'Structured methodology for workplace incident investigation. Co-developed with the HSE. Helps organisations prevent repeat incidents and demonstrate due diligence.'
    },


    /* ═══════════════════════════════════════════════════════════
       NEBOSH — AWARDS (shorter awareness-level qualifications)
    ═══════════════════════════════════════════════════════════ */

    {
      id:            'nebosh-hse-managing-risks',
      title:         'NEBOSH HSE Award in Managing Risks & Risk Assessment at Work',
      category:      'Health & Safety',
      level:         2,
      minExperience: 0,
      roles:         [
        'manager', 'supervisor', 'team leader', 'h&s officer',
        'facilities manager', 'operations manager'
      ],
      audience:      'Anyone who has a responsibility for managing health and safety risks or carries out risk assessments as part of their role.',
      description:   'The NEBOSH HSE Award in Managing Risks & Risk Assessment at Work covers risk assessment methodology and risk management principles. Course learning completed online in 1 day. Official NEBOSH exam included. Delivered by CST Training.',
      suitedFor:     [
        'Those who carry out or oversee workplace risk assessments',
        'Managers and supervisors with H&S risk management duties',
        'H&S officers wanting a focused risk assessment qualification',
        'Those wanting NEBOSH accreditation in a short format'
      ],
      notSuitedFor:  'Not a comprehensive H&S qualification. For full H&S management skills, NEBOSH General Certificate or IOSH Managing Safely are more appropriate.',
      progression:   ['nebosh-general', 'iosh-managing-safely'],
      url:           'https://www.csttraining.co.uk/nebosh-managing-risks-assessment/',
      benefits:      'NEBOSH-accredited risk assessment qualification completed in one day. Practical focus on one of the most important H&S skills. Exam included.'
    },

    {
      id:            'nebosh-health-safety-work-award',
      title:         'NEBOSH Award in Health & Safety at Work',
      category:      'Health & Safety',
      level:         2,
      minExperience: 0,
      roles:         [
        'team leader', 'supervisor', 'hr professional', 'facilities staff',
        'employee with h&s responsibilities', 'line manager'
      ],
      audience:      'Anyone who needs a basic understanding of health and safety as part of their role, including team leaders, supervisors, HR and facilities staff.',
      description:   'The NEBOSH Award in Health & Safety at Work is a short introductory NEBOSH qualification covering fundamental H&S principles. Course learning completed online in 3 days. Official NEBOSH exam included. A stepping stone toward the NEBOSH General Certificate.',
      suitedFor:     [
        'Those wanting a short NEBOSH qualification',
        'Team leaders and supervisors needing basic H&S knowledge',
        'HR and facilities staff with H&S responsibilities',
        'Those who may progress to the NEBOSH General Certificate'
      ],
      notSuitedFor:  'Not appropriate for dedicated H&S professionals or those who need a comprehensive qualification. NEBOSH General Certificate provides significantly more depth.',
      progression:   ['nebosh-general'],
      url:           'https://www.csttraining.co.uk/nebosh-health-safety-work/',
      benefits:      'NEBOSH-accredited qualification completed in 3 days. A recognised first step into formal H&S qualification. Exam included. Demonstrates basic H&S competence to employers.'
    },

    {
      id:            'nebosh-environmental-awareness',
      title:         'NEBOSH Award in Environmental Awareness at Work',
      category:      'Health & Safety',
      level:         1,
      minExperience: 0,
      roles:         [
        'team leader', 'supervisor', 'facilities staff', 'warehouse operative',
        'office manager', 'employee with environmental responsibilities'
      ],
      audience:      'Team leaders, supervisors, facilities staff and anyone who wants to play a more positive role in supporting environmental performance at work.',
      description:   'The NEBOSH Award in Environmental Awareness at Work is a short one-day qualification raising awareness of environmental responsibilities in the workplace. Official NEBOSH exam included. Delivered by CST Training.',
      suitedFor:     [
        'Anyone wanting basic environmental awareness training',
        'Team leaders and supervisors with minor environmental duties',
        'Those wanting a NEBOSH-accredited environmental qualification in a day',
        'Facilities and site staff needing environmental awareness'
      ],
      notSuitedFor:  'Not appropriate for dedicated environmental managers or those with significant environmental management responsibilities — NEBOSH Environmental Management Certificate is more suitable.',
      progression:   ['nebosh-environmental-management'],
      url:           'https://www.csttraining.co.uk/nebosh-environmental-awareness/',
      benefits:      'Quick, accessible NEBOSH environmental awareness qualification. Exam included. Helps organisations demonstrate environmental awareness at all levels of the workforce.'
    },

    {
      id:            'nebosh-working-with-wellbeing',
      title:         'NEBOSH Working With Wellbeing',
      category:      'Health & Safety',
      level:         1,
      minExperience: 0,
      roles:         [
        'any employee', 'manager', 'supervisor', 'hr professional',
        'team leader', 'wellbeing champion'
      ],
      audience:      'Anyone in any sector who wants to understand and support wellbeing in the workplace. Suitable for all employees and managers.',
      description:   'NEBOSH Working With Wellbeing is a short one-day qualification covering workplace wellbeing principles and how to support positive wellbeing at work. Official NEBOSH exam included. Delivered by CST Training.',
      suitedFor:     [
        'Anyone wanting to understand workplace wellbeing',
        'Managers and team leaders who support employee wellbeing',
        'HR professionals and wellbeing champions',
        'Organisations wanting to raise wellbeing awareness at all levels'
      ],
      notSuitedFor:  'Not a clinical mental health qualification. For clinical or therapeutic mental health training, a different course is more appropriate.',
      progression:   ['nebosh-hse-stress'],
      url:           'https://www.csttraining.co.uk/nebosh-working-with-wellbeing/',
      benefits:      'Short, accessible wellbeing qualification from NEBOSH. Helps build a positive wellbeing culture. Exam included. Suitable for any employee at any level.'
    }

  ]; // end qualifications array


  /* ─────────────────────────────────────────────────────────────
     HELPER FUNCTIONS
  ───────────────────────────────────────────────────────────── */

  /** Find a single qualification by its id */
  function getById(id) {
    return qualifications.find(q => q.id === id) || null;
  }

  /** Get all qualifications in a category */
  function getByCategory(category) {
    return qualifications.filter(q => q.category === category);
  }

  /** Get all qualifications at a specific level */
  function getByLevel(level) {
    return qualifications.filter(q => q.level === level);
  }

  /* ─────────────────────────────────────────────────────────────
     PUBLIC API
  ───────────────────────────────────────────────────────────── */

  return {
    qualifications,
    getById,
    getByCategory,
    getByLevel
  };

})();
