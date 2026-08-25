/**
 * CST Training – Sitewide Assistant
 * assistant.js
 *
 * Forked from advisor.js. Differences:
 *  - Floating launcher bubble instead of an inline [data-cst-advisor] container
 *  - Self-contained CSS (injected, "cst-asst" prefix) — no shared styles with advisor.js
 *  - Page context derived automatically from the URL and page title
 *  - Hard guardrails: never states prices, dates or availability
 *  - Escalation path for anything about a specific booking
 *
 * Depends on: knowledge.js (window.CSTKnowledge)
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
     CONSTANTS
     >>> LOG_URL: replace with a NEW Apps Script deployment so the
     sitewide traffic does not land in the advisor's sheet. <<<
  ───────────────────────────────────────────────────────────── */

  const API_URL   = 'https://www.csttraining.co.uk/?cst_advisor_proxy=1';
  const API_MODEL = 'claude-sonnet-4-6';
  const LOG_URL   = 'REPLACE_WITH_NEW_APPS_SCRIPT_URL';

  const PHONE = '020 3488 4472';
  const EMAIL = 'enquiries@csttraining.co.uk';

  // Pages where the Qualification Advisor already runs.
  // The assistant will not load on these, so you never get two bots.
  const EXCLUDE_PATHS = [
    // '/ilm-vs-cmi/',
    // '/qualification-advisor/'
  ];

  const CHIPS = [
    'Which course do I need?',
    'Do you run courses near me?',
    "What's the difference between ILM and CMI?",
    'How do I get in touch?'
  ];

  /* ─────────────────────────────────────────────────────────────
     SVG ICONS
  ───────────────────────────────────────────────────────────── */

  const ICONS = {
    bot: `<img src="https://www.csttraining.co.uk/wp-content/uploads/2026/06/Screenshot-28.png" style="width:22px;height:22px;object-fit:contain" alt="CST Assistant" />`,
    user: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>`,
    send: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4v4l4-4h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>`,
    close: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
    info: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm0 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm0 5v7h2v-7h-2z"/></svg>`,
    external: `<svg viewBox="0 0 24 24" width="12" height="12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="margin-left:3px;vertical-align:-1px"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>`
  };

  /* ─────────────────────────────────────────────────────────────
     STYLES (injected — self-contained, no dependency on site CSS)
  ───────────────────────────────────────────────────────────── */

  const STYLES = `
  .cst-asst { --navy:#1C2560; --orange:#FF8A00; --surface:#F4F6FA;
    --border:#DDE3F0; --body:#3D4665; --muted:#6B7394;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }

  .cst-asst__launcher { position:fixed; bottom:24px; right:24px; z-index:99998;
    width:60px; height:60px; border-radius:50%; border:none; cursor:pointer;
    background:var(--navy); color:#fff; box-shadow:0 4px 20px rgba(28,37,96,.35);
    display:flex; align-items:center; justify-content:center;
    transition:transform .18s ease, box-shadow .18s ease; }
  .cst-asst__launcher:hover { transform:scale(1.06); box-shadow:0 6px 26px rgba(28,37,96,.45); }
  .cst-asst__launcher svg { width:26px; height:26px; fill:#fff; }
  .cst-asst__launcher::after { content:''; position:absolute; top:6px; right:6px;
    width:11px; height:11px; border-radius:50%; background:var(--orange);
    border:2px solid var(--navy); }
  .cst-asst__launcher--open::after { display:none; }

  .cst-asst__panel { position:fixed; bottom:96px; right:24px; z-index:99999;
    width:390px; max-width:calc(100vw - 32px); height:600px; max-height:calc(100vh - 130px);
    background:#fff; border-radius:14px; box-shadow:0 12px 48px rgba(28,37,96,.28);
    display:none; flex-direction:column; overflow:hidden; border:1px solid var(--border); }
  .cst-asst__panel--open { display:flex; }

  .cst-asst__bar { background:var(--navy); color:#fff; padding:14px 16px;
    display:flex; align-items:center; gap:11px; flex-shrink:0; }
  .cst-asst__bar-avatar { width:36px; height:36px; border-radius:50%; background:#fff;
    display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .cst-asst__bar-title { font-weight:700; font-size:.92rem; line-height:1.25; }
  .cst-asst__bar-sub { font-size:.72rem; opacity:.75; }
  .cst-asst__bar-close { margin-left:auto; background:none; border:none; cursor:pointer;
    padding:5px; border-radius:6px; display:flex; }
  .cst-asst__bar-close svg { width:19px; height:19px; fill:#fff; opacity:.8; }
  .cst-asst__bar-close:hover svg { opacity:1; }

  .cst-asst__messages { flex:1; overflow-y:auto; padding:16px; background:var(--surface); }

  .cst-asst__msg { display:flex; gap:9px; margin-bottom:13px; align-items:flex-start; }
  .cst-asst__msg--user { flex-direction:row-reverse; }
  .cst-asst__avatar { width:29px; height:29px; border-radius:50%; background:#fff;
    border:1px solid var(--border); display:flex; align-items:center; justify-content:center;
    flex-shrink:0; }
  .cst-asst__avatar svg { width:16px; height:16px; fill:var(--muted); }
  .cst-asst__bubble { background:#fff; border:1px solid var(--border); border-radius:12px;
    padding:10px 13px; font-size:.86rem; line-height:1.5; color:var(--body); max-width:82%; }
  .cst-asst__msg--user .cst-asst__bubble { background:var(--navy); color:#fff; border-color:var(--navy); }
  .cst-asst__bubble a { color:var(--navy); font-weight:600; }
  .cst-asst__msg--user .cst-asst__bubble a { color:#fff; }

  .cst-asst__typing { display:flex; gap:9px; margin-bottom:13px; }
  .cst-asst__typing-bubble { background:#fff; border:1px solid var(--border);
    border-radius:12px; padding:13px; display:flex; gap:4px; align-items:center; }
  .cst-asst__dot { width:7px; height:7px; border-radius:50%; background:var(--muted);
    animation:cstAsstBounce 1.3s infinite; }
  .cst-asst__dot:nth-child(2) { animation-delay:.18s; }
  .cst-asst__dot:nth-child(3) { animation-delay:.36s; }
  @keyframes cstAsstBounce { 0%,60%,100%{opacity:.3;transform:translateY(0)}
    30%{opacity:1;transform:translateY(-4px)} }

  .cst-asst__chips { padding:0 16px 10px; display:flex; flex-wrap:wrap; gap:6px;
    background:var(--surface); flex-shrink:0; }
  .cst-asst__chip { background:#fff; border:1px solid var(--border); border-radius:16px;
    padding:6px 11px; font-size:.76rem; color:var(--navy); cursor:pointer; font-weight:600; }
  .cst-asst__chip:hover { border-color:var(--navy); }

  .cst-asst__input-row { display:flex; gap:8px; padding:11px 12px; border-top:1px solid var(--border);
    background:#fff; align-items:flex-end; flex-shrink:0; }
  .cst-asst__input { flex:1; border:1px solid var(--border); border-radius:10px;
    padding:9px 11px; font-size:.86rem; font-family:inherit; resize:none; max-height:96px;
    line-height:1.45; color:var(--body); outline:none; }
  .cst-asst__input:focus { border-color:var(--navy); }
  .cst-asst__send { width:38px; height:38px; border-radius:9px; border:none; cursor:pointer;
    background:var(--navy); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .cst-asst__send svg { width:17px; height:17px; fill:#fff; }
  .cst-asst__send:disabled { opacity:.35; cursor:not-allowed; }

  .cst-asst__footer { padding:0 12px 10px; background:#fff; text-align:center; flex-shrink:0; }
  .cst-asst__reset { background:none; border:none; font-size:.7rem; color:var(--muted);
    cursor:pointer; text-decoration:underline; }

  .cst-asst__card { background:#fff; border:1px solid var(--border); border-left:3px solid var(--orange);
    border-radius:10px; padding:14px; margin-bottom:13px; }
  .cst-asst__card-label { font-size:.66rem; text-transform:uppercase; letter-spacing:.07em;
    color:var(--orange); font-weight:700; margin-bottom:5px; }
  .cst-asst__card-title { font-size:1rem; font-weight:700; color:var(--navy); margin-bottom:7px; }
  .cst-asst__card-text { font-size:.82rem; line-height:1.5; color:var(--body); margin-bottom:9px; }
  .cst-asst__card-block { background:var(--surface); border-radius:7px; padding:9px 11px;
    font-size:.79rem; line-height:1.45; color:var(--body); margin-bottom:9px; }
  .cst-asst__card-block strong { display:block; color:var(--navy); font-size:.72rem;
    text-transform:uppercase; letter-spacing:.04em; margin-bottom:3px; }

  .cst-asst__ctas { display:flex; gap:7px; flex-wrap:wrap; margin-top:11px; }
  .cst-asst__btn { padding:8px 15px; border-radius:7px; font-size:.8rem; font-weight:600;
    text-decoration:none; border:none; cursor:pointer; display:inline-flex; align-items:center; }
  .cst-asst__btn--primary { background:var(--navy); color:#fff; }
  .cst-asst__btn--orange { background:var(--orange); color:#fff; }
  .cst-asst__btn svg { fill:currentColor; }

  .cst-asst__note { display:flex; gap:7px; align-items:flex-start; background:#FFF7EC;
    border:1px solid #FFC77F; border-radius:7px; padding:8px 10px; font-size:.75rem;
    line-height:1.4; color:var(--body); margin-top:11px; }
  .cst-asst__note svg { width:14px; height:14px; fill:var(--orange); flex-shrink:0; margin-top:1px; }

  .cst-asst__also { margin-top:13px; padding-top:11px; border-top:1px solid var(--border); }
  .cst-asst__also-label { font-size:.7rem; color:var(--muted); margin-bottom:6px; }
  .cst-asst__also-item { display:block; width:100%; text-align:left; background:var(--surface);
    border:1px solid var(--border); border-radius:7px; padding:7px 10px; font-size:.78rem;
    color:var(--navy); cursor:pointer; margin-bottom:5px; font-weight:600; }
  .cst-asst__also-item:hover { border-color:var(--navy); }

  @media (max-width:600px) {
    .cst-asst__panel { bottom:0; right:0; left:0; width:100%; max-width:100%;
      height:100dvh; max-height:100dvh; border-radius:0; border:none; }
    .cst-asst__launcher { bottom:18px; right:18px; width:54px; height:54px; }
    .cst-asst__launcher--open { display:none; }
  }`;

  /* ─────────────────────────────────────────────────────────────
     PAGE CONTEXT — derived automatically, no per-page config needed
  ───────────────────────────────────────────────────────────── */

  function getPageContext() {
    // If a page has set the advisor's config object, use it.
    const cfg = window.QualificationAdvisor || window.CSTAssistantConfig || null;
    return {
      currentCourse: cfg && cfg.currentCourse ? cfg.currentCourse : null,
      category:      cfg && cfg.category ? cfg.category : null,
      title:         document.title || '',
      path:          window.location.pathname || '',
      url:           window.location.href || ''
    };
  }

  /* ─────────────────────────────────────────────────────────────
     SYSTEM PROMPT
  ───────────────────────────────────────────────────────────── */

  function buildSystemPrompt(ctx) {
    const kb = window.CSTKnowledge;

    const qualList = (kb && kb.qualifications ? kb.qualifications : []).map(q =>
      `- ${q.title} (id: ${q.id}, category: ${q.category}, level: ${q.level}, minExperience: ${q.minExperience} years)
   Audience: ${q.audience}
   Suited for: ${q.suitedFor.join('; ')}
   Not suited for: ${q.notSuitedFor}
   Progression: ${q.progression.length ? q.progression.join(', ') : 'terminal qualification'}
   Benefits: ${q.benefits}`
    ).join('\n\n');

    const pageCtx = `The visitor is currently on: "${ctx.title}" (${ctx.path}).
${ctx.currentCourse ? `This page is about the ${ctx.currentCourse}.` : 'Infer from the page title what they are looking at, but do not assume it is what they need.'}
Use this as context only. Never recommend a course simply because they are on its page.`;

    return `You are the CST Training website assistant. You help visitors anywhere on csttraining.co.uk understand our courses, choose the right qualification, and find the right page.

CST Training is a UK construction, health & safety and professional qualifications training provider with 30+ locations nationwide. We deliver CITB courses (SMSTS, SSSTS, HSA, Temporary Works, SEATS, DRHS), construction NVQs, NEBOSH, IOSH, ILM, CMI, PRINCE2, first aid and EUSR SHEA — online via Google Meet and in classrooms nationwide.

CURRENT PAGE
${pageCtx}

════════════════════════════════════════
PRICING AND AVAILABILITY — HARD RULES
════════════════════════════════════════
You must NEVER state, estimate, imply or compare:
- Prices, fees, deposits, instalments or any payment amount
- Discounts, promotions, offers, sale periods, or the ABSENCE of an offer
- Course dates, start dates, next available sessions, or seats remaining
- Whether a course is sold out, filling up, or has space

This applies even if the visitor insists, says they saw a price elsewhere, or asks for a rough idea or a ballpark. Never say a price is "typically" or "usually" anything. Never say "we don't currently have any offers".

Instead: direct them to the relevant course page, where pricing and dates are shown live and are always current. Explain that these change, so the page is the only accurate source.

If asked how CST compares on price with another provider, decline to comment on price and redirect to what the course includes.

════════════════════════════════════════
SPECIFIC BOOKINGS — HARD RULES
════════════════════════════════════════
You have NO access to customer records, orders, bookings or certificates, and must never imply otherwise.

You MAY explain how a CST process works in general.
You MAY NOT answer anything about a specific person's booking, order, certificate, refund, invoice or account.

If the question is about their particular case, say plainly that you cannot look up bookings, then emit an ESCALATE block (format below). Never speculate about what has happened with their booking.

Refunds and complaints: escalate immediately, however they are phrased. Do not discuss refund policy.

HOW OUR PROCESSES WORK (general answers you may give):
<<< TO BE COMPLETED — ask admin for the stable answer to each. Until an
answer is added below, escalate the question instead of guessing. >>>
- Joining instructions: [when they are sent, and to which address]
- Certificates after passing: [turnaround, and who issues them]
- What to bring on the day: [ID requirements, PPE, equipment]
- Rescheduling or transferring a delegate: [the process, not the fee]
- Venue access and parking: [general guidance]
- Resits: [how the process works]

If a process question is not covered above, say you would rather have the team confirm it than give you the wrong answer, and escalate.

AVAILABLE QUALIFICATIONS:
${qualList || '(Knowledge base not loaded — do not invent course detail. Direct visitors to the website or the team.)'}

CITB COURSES: CST is a leading UK provider of CITB-accredited courses — never say we don't offer these. SMSTS (5 days) for site managers. SSSTS (2 days) for site supervisors, free same-day resit included. HSA (Health & Safety Awareness, 1 day) is required for the CSCS Green Labourer's Card. Temporary Works for both Supervisors and Coordinators. SMSTS Refresher (2 days) and SSSTS Refresher (1 day) for renewals. All available online via Google Meet or in person at 30+ UK locations. CITB Levy payers can claim grants — explain that grants exist, but never state grant amounts.

ILM vs CMI GUIDANCE:
ILM (the practical route): work-based, focuses on "how do I do this in my role?" Credit system with flexible unit selection, good for targeting specific skill gaps. Evidence-based assessment drawing on real workplace situations. Strong with supervisors and first-line managers. If someone says they don't like essays or want something practical, steer toward ILM.

CMI (the strategic route): more academic and reflective, focuses on "why does this work and what is the impact?" Leads to Chartered Manager (CMgr) status, the highest professional recognition for managers in the UK. CMgr MCMI after their name. Access to ManagementDirect. More prestigious within the management sector. If someone wants Director, senior management or board level, steer toward CMI. The CMI Level 5 Diploma or above unlocks the fast-track route to Chartered Manager (requires 3+ years management experience).

When someone asks ILM vs CMI, ask one clarifying question: do they prefer a practical, evidence-based approach (ILM) or the academic weight and Chartered Manager pathway (CMI)? Also weigh seniority — CMI suits middle and senior management, ILM suits supervisors and first-line managers.

AWARD vs CERTIFICATE vs DIPLOMA:
- Award (1-2 units, weeks): solves one specific skill gap quickly.
- Certificate (3-5 units, 3-6 months): all-round CV boost without full Diploma commitment.
- Diploma (6+ units, 6-12 months): comprehensive. Only the Diploma opens the door to Chartered Manager status.

════════════════════════════════════════
STYLE
════════════════════════════════════════
- Plain UK English. Direct, warm, no sales pressure.
- Short answers — two or three sentences unless they've asked for detail.
- Ask ONE question at a time, never several at once.
- Be honest. If ILM Level 3 is right for someone asking about Level 7, say so kindly.
- Never invent unit names, course content lists, accreditation claims, exam dates or awarding body rules. If you don't have the detail, say so and offer to pass it on.
- Never guarantee an exam pass.
- This is a chat window, not an essay.

Contact details you may always give: ${PHONE} or ${EMAIL}.

════════════════════════════════════════
STRUCTURED OUTPUTS
════════════════════════════════════════
When you are ready to make a firm course recommendation, reply with ONLY this block and no surrounding text:

<RECOMMENDATION>
{
  "type": "recommendation",
  "qualificationId": "the-id-from-knowledge-base",
  "confidence": "high|medium|low",
  "reason": "One or two sentences on why this is right for them",
  "personalBenefit": "One sentence specific to what they told you",
  "alsoConsider": ["id1", "id2"],
  "confidenceMessage": "The message for that confidence level"
}
</RECOMMENDATION>

high: "Based on everything you've told me, I'm confident this is the right qualification for you."
medium: "There are a couple of good options here. I'd recommend speaking with our advisers before booking to make sure you choose the best fit."
low: "I'd recommend speaking with our team directly so we can make sure you choose the right qualification for your situation."

Only output this when ready to recommend. Before that, plain conversational text only — no JSON, no tags.

When the visitor asks about a specific booking, order, certificate, refund, invoice or complaint, reply with a short plain sentence explaining you can't look that up, then exactly:

<ESCALATE>
{"type":"escalate","topic":"short description of what they need, e.g. missing joining instructions"}
</ESCALATE>

When someone wants to speak to a person or is ready to enquire, reply with your message then exactly:

<LEAD_CAPTURE>
{"type": "lead_capture"}
</LEAD_CAPTURE>`;
  }

  /* ─────────────────────────────────────────────────────────────
     API CALL
  ───────────────────────────────────────────────────────────── */

  async function callAPI(messages, ctx) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: API_MODEL,
        max_tokens: 1000,
        system: buildSystemPrompt(ctx),
        messages: messages.map(m => ({ role: m.role, content: m.content }))
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error ${res.status}`);
    }

    const data = await res.json();
    return data.content?.map(b => b.text || '').join('') || '';
  }

  /* ─────────────────────────────────────────────────────────────
     PARSE RESPONSE
  ───────────────────────────────────────────────────────────── */

  function parseResponse(text) {
    const rec = text.match(/<RECOMMENDATION>([\s\S]*?)<\/RECOMMENDATION>/);
    if (rec) {
      try { return { type: 'recommendation', data: JSON.parse(rec[1].trim()) }; }
      catch (e) { console.warn('CSTAssistant: bad recommendation JSON', e); }
    }

    const esc = text.match(/<ESCALATE>([\s\S]*?)<\/ESCALATE>/);
    if (esc) {
      let topic = '';
      try { topic = (JSON.parse(esc[1].trim()) || {}).topic || ''; } catch (e) {}
      return {
        type: 'escalate',
        topic,
        text: text.replace(/<ESCALATE>[\s\S]*?<\/ESCALATE>/, '').trim()
      };
    }

    if (/<LEAD_CAPTURE>/.test(text)) {
      return {
        type: 'lead_capture',
        text: text.replace(/<LEAD_CAPTURE>[\s\S]*?<\/LEAD_CAPTURE>/, '').trim()
      };
    }

    return { type: 'text', text: text.trim() };
  }

  /* ─────────────────────────────────────────────────────────────
     WIDGET
  ───────────────────────────────────────────────────────────── */

  class CSTAssistant {

    constructor() {
      this.ctx      = getPageContext();
      this.messages = [];
      this.isTyping = false;
      this.isOpen   = false;
      this.started  = false;
      this.conversationId = 'asst_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

      this._injectStyles();
      this._render();
      this._bindEvents();
    }

    _injectStyles() {
      if (document.getElementById('cst-asst-styles')) return;
      const s = document.createElement('style');
      s.id = 'cst-asst-styles';
      s.textContent = STYLES;
      document.head.appendChild(s);
    }

    /* ── DOM ──────────────────────────────────────────────── */
    _render() {
      const root = document.createElement('div');
      root.className = 'cst-asst';
      root.innerHTML = `
        <button class="cst-asst__launcher" id="cst-asst-launcher" type="button"
                aria-label="Open the CST assistant">${ICONS.chat}</button>

        <div class="cst-asst__panel" id="cst-asst-panel" role="dialog"
             aria-label="CST Training assistant">

          <div class="cst-asst__bar">
            <div class="cst-asst__bar-avatar" aria-hidden="true">${ICONS.bot}</div>
            <div>
              <div class="cst-asst__bar-title">CST Assistant</div>
              <div class="cst-asst__bar-sub">Here to help you find the right course</div>
            </div>
            <button class="cst-asst__bar-close" id="cst-asst-close" type="button"
                    aria-label="Close">${ICONS.close}</button>
          </div>

          <div class="cst-asst__messages" id="cst-asst-messages"
               role="log" aria-live="polite"></div>

          <div class="cst-asst__chips" id="cst-asst-chips">
            ${CHIPS.map(c => `<button class="cst-asst__chip" type="button">${c}</button>`).join('')}
          </div>

          <div class="cst-asst__input-row">
            <textarea id="cst-asst-input" class="cst-asst__input" rows="1"
                      placeholder="Ask me anything about CST courses…"></textarea>
            <button class="cst-asst__send" id="cst-asst-send" type="button"
                    aria-label="Send" disabled>${ICONS.send}</button>
          </div>

          <div class="cst-asst__footer">
            <button class="cst-asst__reset" id="cst-asst-reset" type="button">
              Start a new conversation
            </button>
          </div>
        </div>`;

      document.body.appendChild(root);

      this.root       = root;
      this.launcherEl = root.querySelector('#cst-asst-launcher');
      this.panelEl    = root.querySelector('#cst-asst-panel');
      this.msgEl      = root.querySelector('#cst-asst-messages');
      this.inputEl    = root.querySelector('#cst-asst-input');
      this.sendBtn    = root.querySelector('#cst-asst-send');
      this.chipsEl    = root.querySelector('#cst-asst-chips');
      this.resetBtn   = root.querySelector('#cst-asst-reset');
      this.closeBtn   = root.querySelector('#cst-asst-close');
    }

    _bindEvents() {
      this.launcherEl.addEventListener('click', () => this._toggle());
      this.closeBtn.addEventListener('click', () => this._toggle(false));

      this.sendBtn.addEventListener('click', () => this._handleSend());

      this.inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this._handleSend(); }
      });

      this.inputEl.addEventListener('input', () => {
        this.sendBtn.disabled = this.inputEl.value.trim().length === 0;
        this.inputEl.style.height = 'auto';
        this.inputEl.style.height = this.inputEl.scrollHeight + 'px';
      });

      this.chipsEl.addEventListener('click', (e) => {
        const chip = e.target.closest('.cst-asst__chip');
        if (chip) {
          this.inputEl.value = chip.textContent.trim();
          this.sendBtn.disabled = false;
          this._handleSend();
        }
      });

      this.resetBtn.addEventListener('click', () => this._reset());

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) this._toggle(false);
      });
    }

    _toggle(force) {
      this.isOpen = (typeof force === 'boolean') ? force : !this.isOpen;
      this.panelEl.classList.toggle('cst-asst__panel--open', this.isOpen);
      this.launcherEl.classList.toggle('cst-asst__launcher--open', this.isOpen);
      this.launcherEl.setAttribute('aria-label',
        this.isOpen ? 'Close the CST assistant' : 'Open the CST assistant');

      if (this.isOpen) {
        if (!this.started) { this.started = true; this._sendWelcome(); }
        setTimeout(() => this.inputEl.focus(), 120);
      }
    }

    /* ── WELCOME ──────────────────────────────────────────── */
    _sendWelcome() {
      const course = this.ctx.currentCourse;
      const isMobile = window.innerWidth < 768;

      let welcome;
      if (course) {
        welcome = isMobile
          ? `Hi! I'm the CST assistant. You're looking at the <strong>${course}</strong> — ask me anything about it, or about any of our other courses.`
          : `Hello! I'm the CST Training assistant.\n\nI can see you're looking at the <strong>${course}</strong>. Ask me anything about it, or tell me about your role and I'll point you toward the right qualification.`;
      } else {
        welcome = isMobile
          ? `Hi! I'm the CST assistant. Ask me about our courses or tell me what you're looking to achieve.`
          : `Hello! I'm the CST Training assistant.\n\nI can help you understand our courses, work out which qualification is right for you, and find the right page on the site.\n\nWhat are you looking for?`;
      }

      this._addBotMessage(welcome);
    }

    /* ── SEND ─────────────────────────────────────────────── */
    async _handleSend() {
      const text = this.inputEl.value.trim();
      if (!text || this.isTyping) return;

      this.inputEl.value = '';
      this.inputEl.style.height = 'auto';
      this.sendBtn.disabled = true;
      this.chipsEl.style.display = 'none';

      this._addUserMessage(text);
      this.messages.push({ role: 'user', content: text });

      this._showTyping();
      this.isTyping = true;

      try {
        const raw = await callAPI(this.messages, this.ctx);
        this._hideTyping();
        this.isTyping = false;

        this.messages.push({ role: 'assistant', content: raw });
        const parsed = parseResponse(raw);

        if (parsed.type === 'recommendation') {
          this._showRecommendation(parsed.data);
          const kb = window.CSTKnowledge;
          const qual = kb && kb.getById ? kb.getById(parsed.data.qualificationId) : null;
          this._log({
            outcome: 'recommendation',
            detail: qual ? qual.title : parsed.data.qualificationId,
            confidence: parsed.data.confidence || 'unknown'
          });

        } else if (parsed.type === 'escalate') {
          if (parsed.text) this._addBotMessage(parsed.text);
          this._showEscalate(parsed.topic);
          this._log({ outcome: 'escalated', detail: parsed.topic });

        } else if (parsed.type === 'lead_capture') {
          if (parsed.text) this._addBotMessage(parsed.text);
          this._showLeadCapture();
          this._log({ outcome: 'lead_capture' });

        } else {
          this._addBotMessage(parsed.text);
          this._log({ outcome: 'conversation' });
        }

      } catch (err) {
        this._hideTyping();
        this.isTyping = false;
        console.error('CSTAssistant API error:', err);
        this._addBotMessage(
          `I'm having trouble connecting at the moment. Please try again, or contact our team on <strong>${PHONE}</strong>.`
        );
      }

      this.sendBtn.disabled = this.inputEl.value.trim().length === 0;
    }

    /* ── MESSAGES ─────────────────────────────────────────── */

    _addBotMessage(html) {
      html = html
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');

      const el = document.createElement('div');
      el.className = 'cst-asst__msg';
      el.innerHTML = `
        <div class="cst-asst__avatar" aria-hidden="true">${ICONS.bot}</div>
        <div class="cst-asst__bubble">${html}</div>`;
      this.msgEl.appendChild(el);
      this._scroll();
    }

    _addUserMessage(text) {
      const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const el = document.createElement('div');
      el.className = 'cst-asst__msg cst-asst__msg--user';
      el.innerHTML = `
        <div class="cst-asst__avatar" aria-hidden="true">${ICONS.user}</div>
        <div class="cst-asst__bubble">${safe}</div>`;
      this.msgEl.appendChild(el);
      this._scroll();
    }

    _showTyping() {
      if (this.typingEl) return;
      this.typingEl = document.createElement('div');
      this.typingEl.className = 'cst-asst__typing';
      this.typingEl.innerHTML = `
        <div class="cst-asst__avatar" aria-hidden="true">${ICONS.bot}</div>
        <div class="cst-asst__typing-bubble">
          <div class="cst-asst__dot"></div>
          <div class="cst-asst__dot"></div>
          <div class="cst-asst__dot"></div>
        </div>`;
      this.msgEl.appendChild(this.typingEl);
      this._scroll();
    }

    _hideTyping() {
      if (this.typingEl) { this.typingEl.remove(); this.typingEl = null; }
    }

    _scroll() {
      requestAnimationFrame(() => { this.msgEl.scrollTop = this.msgEl.scrollHeight; });
    }

    /* ── LOGGING ──────────────────────────────────────────── */
    _log(extra) {
      if (!LOG_URL || LOG_URL.indexOf('REPLACE_WITH') === 0) return;
      try {
        const transcript = this.messages
          .map(m => (m.role === 'user' ? 'Visitor: ' : 'Assistant: ') + m.content.substring(0, 5000))
          .join('\n\n');

        fetch(LOG_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversationId: this.conversationId,
            timestamp:      new Date().toLocaleString('en-GB'),
            page:           this.ctx.url,
            pageTitle:      this.ctx.title,
            outcome:        extra?.outcome || 'conversation',
            detail:         extra?.detail || '',
            confidence:     extra?.confidence || 'n/a',
            conversation:   transcript
          })
        });
      } catch (e) {
        console.warn('CSTAssistant: logging failed', e);
      }
    }

    /* ── RECOMMENDATION CARD ──────────────────────────────── */
    _showRecommendation(data) {
      const kb   = window.CSTKnowledge;
      const qual = kb && kb.getById ? kb.getById(data.qualificationId) : null;

      if (!qual) {
        this._addBotMessage(data.reason || "I'd suggest speaking to our team for a personalised recommendation.");
        return;
      }

      this._addBotMessage("Based on what you've told me, here's my recommendation:");

      const alsoConsider = (data.alsoConsider || [])
        .map(id => (kb.getById ? kb.getById(id) : null))
        .filter(Boolean)
        .slice(0, 3);

      const card = document.createElement('div');
      card.className = 'cst-asst__card';
      card.innerHTML = `
        <div class="cst-asst__card-label">Recommended qualification</div>
        <div class="cst-asst__card-title">${qual.title}</div>
        <div class="cst-asst__card-text">${data.reason || ''}</div>
        <div class="cst-asst__card-block">
          <strong>Why this suits you</strong>${data.personalBenefit || ''}
        </div>
        <div class="cst-asst__card-block">
          <strong>Career benefits</strong>${qual.benefits || ''}
        </div>
        <div class="cst-asst__ctas">
          <a href="${qual.url}" class="cst-asst__btn cst-asst__btn--primary">
            View course and dates ${ICONS.external}
          </a>
          <button class="cst-asst__btn cst-asst__btn--orange" type="button" data-enquire>
            Enquire now
          </button>
        </div>
        <div class="cst-asst__note">
          ${ICONS.info}<span>${data.confidenceMessage || ''}</span>
        </div>
        ${alsoConsider.length ? `
          <div class="cst-asst__also">
            <div class="cst-asst__also-label">You may also wish to consider</div>
            ${alsoConsider.map(q =>
              `<button class="cst-asst__also-item" type="button" data-qual-id="${q.id}">${q.title}</button>`
            ).join('')}
          </div>` : ''}`;

      this.msgEl.appendChild(card);
      this._scroll();

      const enquire = card.querySelector('[data-enquire]');
      if (enquire) enquire.addEventListener('click', () => this._showLeadCapture());

      card.querySelectorAll('.cst-asst__also-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const alt = kb.getById(btn.dataset.qualId);
          if (alt) {
            this.inputEl.value = `Tell me more about the ${alt.title}.`;
            this.sendBtn.disabled = false;
            this._handleSend();
          }
        });
      });
    }

    /* ── ESCALATION CARD ──────────────────────────────────── */
    _showEscalate(topic) {
      const subject = encodeURIComponent(topic ? `Website enquiry: ${topic}` : 'Website enquiry');
      const card = document.createElement('div');
      card.className = 'cst-asst__card';
      card.innerHTML = `
        <div class="cst-asst__card-label">Our team can help with this</div>
        <div class="cst-asst__card-title">Speak to the CST team</div>
        <div class="cst-asst__card-text">
          I can't look up individual bookings, but our team can sort this out quickly.
        </div>
        <div class="cst-asst__card-block">
          <strong>Please have ready</strong>
          Your name, the email address used to book, and your booking or order reference if you have one.
        </div>
        <div class="cst-asst__ctas">
          <a href="tel:${PHONE.replace(/\s/g, '')}" class="cst-asst__btn cst-asst__btn--primary">
            Call ${PHONE}
          </a>
          <a href="mailto:${EMAIL}?subject=${subject}" class="cst-asst__btn cst-asst__btn--orange">
            Email the team
          </a>
        </div>`;
      this.msgEl.appendChild(card);
      this._scroll();
    }

    /* ── LEAD CAPTURE ─────────────────────────────────────── */
    _showLeadCapture() {
      const card = document.createElement('div');
      card.className = 'cst-asst__card';
      card.innerHTML = `
        <div class="cst-asst__card-label">Get in touch</div>
        <div class="cst-asst__card-title">Ready to enquire?</div>
        <div class="cst-asst__card-text">
          Our team will help you get booked onto the right course.
        </div>
        <div class="cst-asst__ctas">
          <a href="/contact/" class="cst-asst__btn cst-asst__btn--orange">Enquire now</a>
          <a href="tel:${PHONE.replace(/\s/g, '')}" class="cst-asst__btn cst-asst__btn--primary">
            Call ${PHONE}
          </a>
        </div>`;
      this.msgEl.appendChild(card);
      this._scroll();
    }

    /* ── RESET ────────────────────────────────────────────── */
    _reset() {
      this.messages = [];
      this.isTyping = false;
      this.msgEl.innerHTML = '';
      this.chipsEl.style.display = '';
      this.inputEl.value = '';
      this.inputEl.style.height = 'auto';
      this.sendBtn.disabled = true;
      this.conversationId = 'asst_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
      this._sendWelcome();
    }
  }

  /* ─────────────────────────────────────────────────────────────
     AUTO-INIT
  ───────────────────────────────────────────────────────────── */

  function shouldLoad() {
    // Don't run where the Qualification Advisor is already embedded
    if (document.querySelector('[data-cst-advisor]')) return false;

    const path = window.location.pathname;
    if (EXCLUDE_PATHS.some(p => p && path.indexOf(p) === 0)) return false;

    // Don't double-mount
    if (document.querySelector('.cst-asst__launcher')) return false;

    return true;
  }

  function init() {
    if (!shouldLoad()) return;
    window.CSTAssistantInstance = new CSTAssistant();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.CSTAssistant = { init, CSTAssistant };

})();
