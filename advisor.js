/**
 * CST Training – Qualification Advisor
 * js/advisor.js
 *
 * Core widget logic: rendering, conversation management, API calls.
 * Depends on: js/knowledge.js
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
     CONSTANTS
  ───────────────────────────────────────────────────────────── */

  const API_URL   = 'https://www.csttraining.co.uk/?cst_advisor_proxy=1';
  const API_MODEL = 'claude-sonnet-4-6';

  /* ─────────────────────────────────────────────────────────────
     SVG ICONS (inline, lightweight)
  ───────────────────────────────────────────────────────────── */

  const ICONS = {
advisor: `<img src="https://www.csttraining.co.uk/wp-content/uploads/2026/06/Screenshot-28.png" style="width:22px;height:22px;object-fit:contain" alt="CST Adviser" />`,
    user: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
    </svg>`,
    send: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>`,
    check: `<path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>`,
    infoHigh: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="cst-confidence__icon" aria-hidden="true">
      <path d="M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm0 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm0 5v7h2v-7h-2z"/>
    </svg>`,
    external: `<svg viewBox="0 0 24 24" width="12" height="12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="margin-left:3px;vertical-align:-1px"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>`
  };

  /* ─────────────────────────────────────────────────────────────
     SYSTEM PROMPT FACTORY
     Builds the system prompt from the static knowledge base +
     the page configuration set by the host page.
  ───────────────────────────────────────────────────────────── */

  function buildSystemPrompt(pageConfig) {
    const kb = window.CSTKnowledge;

    const qualList = kb.qualifications.map(q =>
      `- ${q.title} (id: ${q.id}, category: ${q.category}, level: ${q.level}, minExperience: ${q.minExperience} years)
   Audience: ${q.audience}
   Suited for: ${q.suitedFor.join('; ')}
   Not suited for: ${q.notSuitedFor}
   Progression: ${q.progression.length ? q.progression.join(', ') : 'terminal qualification'}
   Benefits: ${q.benefits}`
    ).join('\n\n');

    const pageCtx = pageConfig
      ? `The visitor is currently on the page for: ${pageConfig.currentCourse || 'unknown'}.
Category context: ${pageConfig.category || 'unknown'}.
Other courses listed on this page: ${(pageConfig.alternatives || []).join(', ') || 'none'}.
IMPORTANT: Use this only as context. Do NOT automatically recommend the current page's course — recommend whichever qualification is genuinely most appropriate for the visitor after conversation.`
      : 'No specific page context provided.';

    return `You are the Qualification Advisor for CST Training — a UK training provider specialising in professional qualifications including Project Management, Leadership & Management, and Health & Safety.

Your role is to have a natural, helpful conversation to understand the visitor's current role, experience, and career goals, then recommend the most appropriate qualification.

${pageCtx}

AVAILABLE QUALIFICATIONS:
${qualList}

CONVERSATION GUIDELINES:
- Begin by acknowledging what the user has shared and asking one or two clarifying questions where needed.
- Do NOT ask multiple questions at once — keep the conversation natural, one question at a time.
- Be conversational and warm, like a knowledgeable adviser, not a form or a salesperson.
- Once you have enough information, provide a recommendation.
- NEVER recommend a qualification simply because the visitor is on that page.
- If someone describes a level that doesn't match an advanced qualification, recommend the correct starting point.
- Be honest: if ILM Level 3 is right for a first-line supervisor even if they asked about Level 7, say so kindly.

WHEN YOU HAVE ENOUGH INFORMATION TO RECOMMEND:
Reply with a JSON block (and ONLY this JSON, no surrounding text) in exactly this format:

<RECOMMENDATION>
{
  "type": "recommendation",
  "qualificationId": "the-id-from-knowledge-base",
  "confidence": "high|medium|low",
  "reason": "One or two sentences explaining why this qualification is right for them",
  "personalBenefit": "One sentence specific to what they told you about their goals",
  "alsoConsider": ["id1", "id2"],
  "confidenceMessage": "The message to show based on confidence level"
}
</RECOMMENDATION>

For high confidence use: "Based on everything you've told me, I'm confident this is the right qualification for you."
For medium confidence use: "There are a couple of good options here. I'd recommend speaking with our advisers before booking to make sure you choose the best fit."
For low confidence use: "I'd recommend speaking with our team directly so we can make sure you choose the right qualification for your situation."

IMPORTANT: Only output the <RECOMMENDATION>...</RECOMMENDATION> block when you are ready to make a firm recommendation. Before that, respond in plain conversational text only — no JSON, no tags.

If the visitor asks for help contacting a person or wants to speak to someone, acknowledge this and indicate you can capture their details.

If a visitor seems to want to capture their details for follow-up, respond with exactly:
<LEAD_CAPTURE>
{"type": "lead_capture"}
</LEAD_CAPTURE>

ILM vs CMI GUIDANCE:
When a visitor asks about the difference between ILM and CMI, or is undecided between the two, use this guidance:

ILM (The Practical Route):
- More practical and work-based — focuses on "how do I do this in my role?"
- Uses a credit system with flexible unit selection — great for targeting specific skill gaps
- Assessment is evidence-based, drawing on real workplace situations
- Widely recognised, particularly strong with supervisors and first-line managers
- If a candidate says they don't like writing essays or want something practical, steer toward ILM

CMI (The Strategic Route):
- More academic and reflective — focuses on "why does this work and what is the impact?"
- Leads to Chartered Manager (CMgr) status — the highest professional recognition for managers in the UK, equivalent to Chartered Engineer or Chartered Accountant
- Chartered Managers earn on average £13,000 more within the first few years of achieving status
- CMgr candidates get to put CMgr MCMI after their name — a major differentiator in interviews and tenders
- Access to ManagementDirect — widely considered the best management resource portal in the UK
- More prestigious brand within the management and leadership sector
- If a candidate wants to reach Director, Senior Management or board level, steer toward CMI
- The CMI Level 5 Diploma or above unlocks the fast-track route to Chartered Manager status (requires 3+ years management experience)

AWARD vs CERTIFICATE vs DIPLOMA:
- Award (1-2 units, weeks to complete): Best for solving one specific skill gap quickly. "A surgical strike."
- Certificate (3-5 units, 3-6 months): Good all-round CV boost without the full commitment of a Diploma.
- Diploma (6+ units, 6-12 months): The comprehensive qualification. Only the Diploma opens the door to Chartered Manager status. If someone's goal is Director level or Chartered status, recommend the Diploma.

When someone asks about ILM vs CMI, ask one clarifying question: do they prefer a practical, evidence-based approach (ILM) or do they want the academic weight and Chartered Manager pathway (CMI)? Also consider their seniority — CMI is generally more suited to middle and senior management, ILM is more commonly used by supervisors and first-line managers.

Keep responses concise. This is a chat interface, not an essay.`;
  }

  /* ─────────────────────────────────────────────────────────────
     API CALL
  ───────────────────────────────────────────────────────────── */

  async function callAdvisorAPI(messages, pageConfig) {
    const systemPrompt = buildSystemPrompt(pageConfig);

    const body = {
      model: API_MODEL,
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content }))
    };

const res = await fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
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
     Extracts structured recommendation or lead capture trigger
     from the AI response text.
  ───────────────────────────────────────────────────────────── */

  function parseResponse(text) {
    // Check for recommendation
    const recMatch = text.match(/<RECOMMENDATION>([\s\S]*?)<\/RECOMMENDATION>/);
    if (recMatch) {
      try {
        const data = JSON.parse(recMatch[1].trim());
        return { type: 'recommendation', data };
      } catch (e) {
        console.warn('CSTAdvisor: Failed to parse recommendation JSON', e);
      }
    }

    // Check for lead capture trigger
    const leadMatch = text.match(/<LEAD_CAPTURE>([\s\S]*?)<\/LEAD_CAPTURE>/);
    if (leadMatch) {
      return { type: 'lead_capture' };
    }

    return { type: 'text', text: text.trim() };
  }

  /* ─────────────────────────────────────────────────────────────
     WIDGET CLASS
  ───────────────────────────────────────────────────────────── */

  class QualificationAdvisor {

    constructor(container, pageConfig) {
      this.container  = container;
      this.pageConfig = pageConfig || {};
      this.messages   = [];       // conversation history for API
      this.isTyping   = false;
      this.chips      = [ ];

      this._render();
      this._bindEvents();
      this._sendWelcome();
    }

    /* ── BUILD THE WIDGET DOM ──────────────────────────────── */
    _render() {
      this.container.innerHTML = `
        <div class="cst-advisor" role="region" aria-label="Qualification Adviser">

          <div class="cst-advisor__card">

            <!-- Header bar -->
            <div class="cst-advisor__bar" role="banner">
              <div class="cst-advisor__bar-avatar" aria-hidden="true">
                ${ICONS.advisor}
              </div>
              <div>
                <div class="cst-advisor__bar-title">Qualification Adviser</div>
                <div class="cst-advisor__bar-subtitle">CST Training</div>
              </div>
              <div class="cst-advisor__bar-status" aria-label="Adviser online">
                <div class="cst-advisor__bar-dot"></div>
                Online
              </div>
            </div>

            <!-- Message area -->
            <div class="cst-advisor__messages"
                 id="cst-messages"
                 role="log"
                 aria-live="polite"
                 aria-label="Conversation">
            </div>

            <!-- Prompt chips -->
            <div class="cst-advisor__chips" id="cst-chips" aria-label="Suggested questions">
              ${this.chips.map(c =>
                `<button class="cst-chip" type="button" aria-label="Send: ${c}">${c}</button>`
              ).join('')}
            </div>

            <!-- Input row -->
            <div class="cst-advisor__input-row">
              <label class="sr-only" for="cst-input">Your message</label>
              <textarea
                id="cst-input"
                class="cst-advisor__input"
                placeholder="Describe your role or ask which qualification is right for you…"
                rows="1"
                aria-multiline="true"
              ></textarea>
              <button
                class="cst-advisor__send"
                id="cst-send"
                type="button"
                aria-label="Send message"
                disabled
              >
                ${ICONS.send}
              </button>
            </div>
 <!-- Footer -->
            <div class="cst-advisor__footer">
              <button class="cst-advisor__reset" id="cst-reset" type="button">
                Start a new conversation
              </button>
            </div>
          </div>
        </div>`;

      // Cache DOM refs
      this.msgEl    = this.container.querySelector('#cst-messages');
      this.inputEl  = this.container.querySelector('#cst-input');
      this.sendBtn  = this.container.querySelector('#cst-send');
      this.chipsEl  = this.container.querySelector('#cst-chips');
      this.resetBtn = this.container.querySelector('#cst-reset');
    }

    /* ── BIND EVENTS ──────────────────────────────────────── */
    _bindEvents() {
      // Send on button click
      this.sendBtn.addEventListener('click', () => this._handleSend());

      // Send on Enter (not Shift+Enter)
      this.inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this._handleSend();
        }
      });

      // Enable/disable send button
      this.inputEl.addEventListener('input', () => {
        const hasText = this.inputEl.value.trim().length > 0;
        this.sendBtn.disabled = !hasText;
        // Auto-resize textarea
        this.inputEl.style.height = 'auto';
        this.inputEl.style.height = this.inputEl.scrollHeight + 'px';
      });

      // Chip clicks
      this.chipsEl.addEventListener('click', (e) => {
        const chip = e.target.closest('.cst-chip');
        if (chip) {
          this.inputEl.value = chip.textContent.trim();
          this.sendBtn.disabled = false;
          this._handleSend();
        }
      });

// Reset
this.resetBtn.addEventListener('click', () => this._reset());
    }

    /* ── WELCOME MESSAGE ──────────────────────────────────── */
    _sendWelcome() {
      const course = this.pageConfig.currentCourse;
      let welcome;

      if (course) {
        welcome = `Hello! I'm the CST Training Qualification Adviser. I can see you're looking at the <strong>${course}</strong> — I'm here to help you decide whether it's the right qualification for you, or whether another option might suit you better.\n\nTell me a bit about your current role and what you're hoping to achieve, and I'll give you an honest recommendation.`;
      } else {
        welcome = `Hello! I'm the CST Training Qualification Adviser.\n\nI'm here to help you find the right professional qualification — whether that's in project management, leadership and management, or health and safety.\n\nTell me about your current role and what you're looking to achieve, and I'll point you in the right direction.`;
      }

      this._addAdvisorMessage(welcome);
    }

    /* ── HANDLE USER SEND ─────────────────────────────────── */
    async _handleSend() {
      const text = this.inputEl.value.trim();
      if (!text || this.isTyping) return;

      // Clear input
      this.inputEl.value = '';
      this.inputEl.style.height = 'auto';
      this.sendBtn.disabled = true;

      // Hide chips after first user message
      this.chipsEl.style.display = 'none';

      // Show user message
      this._addUserMessage(text);

      // Add to conversation history
      this.messages.push({ role: 'user', content: text });

      // Show typing
      this._showTyping();
      this.isTyping = true;
      this.sendBtn.disabled = true;

      try {
        const rawResponse = await callAdvisorAPI(this.messages, this.pageConfig);
        this._hideTyping();
        this.isTyping = false;

        // Parse and handle
        const parsed = parseResponse(rawResponse);

        if (parsed.type === 'recommendation') {
          // Add assistant response to history (store raw so context is preserved)
          this.messages.push({ role: 'assistant', content: rawResponse });
          this._showRecommendation(parsed.data);
        } else if (parsed.type === 'lead_capture') {
  this.messages.push({ role: 'assistant', content: rawResponse });
  this._addAdvisorMessage("Of course — please use the <a href='/contact/' style='color:var(--cst-navy);font-weight:600'>Enquire Now</a> button above and one of our team will be in touch.");;
        } else {
          // Normal conversational response
          this.messages.push({ role: 'assistant', content: rawResponse });
          this._addAdvisorMessage(parsed.text);
        }

      } catch (err) {
        this._hideTyping();
        this.isTyping = false;
        console.error('CSTAdvisor API error:', err);
        this._addAdvisorMessage(
          "I'm sorry, I'm having a little trouble connecting at the moment. Please try again, or <a href='/contact/' style='color:var(--cst-navy);font-weight:600'>contact our team directly</a>."
        );
      }

      this.sendBtn.disabled = false;
    }

    /* ── RENDER MESSAGES ──────────────────────────────────── */

_addAdvisorMessage(html) {

  console.log("Adding advisor message:", html);

  // Convert markdown bold (**text**) to HTML <strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert markdown italic (*text*) to HTML <em>
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Convert newlines to line breaks
  html = html.replace(/\n/g, '<br>');

  const el = document.createElement('div');
  el.className = 'cst-msg cst-msg--advisor';
  el.innerHTML = `
    <div class="cst-msg__avatar" aria-hidden="true">${ICONS.advisor}</div>
    <div class="cst-msg__bubble">${html}</div>`;
  this.msgEl.appendChild(el);
  this._scrollToBottom();
}

    _addUserMessage(text) {
      const el = document.createElement('div');
      el.className = 'cst-msg cst-msg--user';
      // Sanitise user text (prevent XSS)
      const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      el.innerHTML = `
        <div class="cst-msg__avatar" aria-hidden="true">${ICONS.user}</div>
        <div class="cst-msg__bubble">${safe}</div>`;
      this.msgEl.appendChild(el);
      this._scrollToBottom();
    }

    _showTyping() {
      if (this.typingEl) return;
      this.typingEl = document.createElement('div');
      this.typingEl.className = 'cst-typing';
      this.typingEl.setAttribute('aria-label', 'Adviser is typing');
      this.typingEl.innerHTML = `
        <div class="cst-msg__avatar" aria-hidden="true">${ICONS.advisor}</div>
        <div class="cst-typing__bubble">
          <div class="cst-typing__dot"></div>
          <div class="cst-typing__dot"></div>
          <div class="cst-typing__dot"></div>
        </div>`;
      this.msgEl.appendChild(this.typingEl);
      this._scrollToBottom();
    }

    _hideTyping() {
      if (this.typingEl) {
        this.typingEl.remove();
        this.typingEl = null;
      }
    }

    _scrollToBottom() {
      requestAnimationFrame(() => {
        this.msgEl.scrollTop = this.msgEl.scrollHeight;
      });
    }

    /* ── RECOMMENDATION CARD ──────────────────────────────── */
    _showRecommendation(data) {
      const kb     = window.CSTKnowledge;
      const qual   = kb.getById(data.qualificationId);

      // Log conversation to Google Sheet
try {
  const conversationLog = this.messages
    .map(m => (m.role === 'user' ? 'Visitor: ' : 'Adviser: ') + m.content.substring(0, 2000))
    .join('\n\n');

  fetch('https://script.google.com/macros/s/AKfycbxoMWrFcuDLAqV-BhDbI-QrrmUYtKnfarYJbh_MnUrBqBIXMqWjDHq6LdfJVRxRYg4/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timestamp:      new Date().toLocaleString('en-GB'),
      page:           this.pageConfig.currentCourse || window.location.href,
      recommendation: qual ? qual.title : data.qualificationId,
      confidence:     data.confidence || 'unknown',
      alsoConsidered: (data.alsoConsider || []).join(', '),
      conversation:   conversationLog
    })
  });
} catch(e) {
  console.warn('CSTAdvisor: logging failed', e);
}

      if (!qual) {
        // Fallback: show as plain text
        this._addAdvisorMessage(data.reason || "I'd recommend speaking to our team for a personalised recommendation.");
        return;
      }

      // Brief intro message
      this._addAdvisorMessage(`Based on what you've told me, here's my recommendation:`);

      // Build "also consider" list
      const alsoConsider = (data.alsoConsider || [])
        .map(id => kb.getById(id))
        .filter(Boolean)
        .slice(0, 3);

      // Confidence icon
      const level = data.confidence || 'medium';
      const confClass = `cst-confidence--${level}`;

      const recEl = document.createElement('div');
      recEl.className = 'cst-msg cst-msg--advisor';
      recEl.style.display = 'block'; // override flex for full-width card

      const card = document.createElement('div');
      card.className = 'cst-rec';
      card.setAttribute('role', 'region');
      card.setAttribute('aria-label', `Recommended qualification: ${qual.title}`);
      card.innerHTML = `
        <div class="cst-rec__label">Recommended Qualification</div>
        <div class="cst-rec__title">${qual.title}</div>
        <div class="cst-rec__reason">${data.reason}</div>
        <div class="cst-rec__benefits">
          <strong>Why this suits you</strong>
          ${data.personalBenefit}
        </div>
        <div class="cst-rec__benefits" style="margin-top:-6px;">
          <strong>Career benefits</strong>
          ${qual.benefits}
        </div>

        <div class="cst-rec__ctas">
          <a href="${qual.url}" class="cst-btn cst-btn--primary" target="_blank" rel="noopener">
            View Course ${ICONS.external}
          </a>
          <a href="/contact/?course=${encodeURIComponent(qual.title)}" class="cst-btn cst-btn--orange" target="_blank" rel="noopener">
            Enquire Now
          </a>
        </div>

        <div class="cst-confidence ${confClass}">
          ${ICONS.infoHigh}
          <span>${data.confidenceMessage}</span>
        </div>

        ${alsoConsider.length ? `
        <div class="cst-also">
          <div class="cst-also__label">You may also wish to consider</div>
          <div class="cst-also__items">
            ${alsoConsider.map(q => `
              <button class="cst-also__item" type="button" data-qual-id="${q.id}">
                ${q.title}
              </button>`).join('')}
          </div>
        </div>` : ''}
      `;

      recEl.appendChild(card);
      this.msgEl.appendChild(recEl);
      this._scrollToBottom();

      // Bind "Speak to an Adviser" button
      const speakBtn = card.querySelector('#cst-speak-adviser');
      if (speakBtn) {
        speakBtn.addEventListener('click', () => {
          this._addAdvisorMessage("No problem at all — let me take a few details and one of our advisers will be in touch.");
          setTimeout(() => this._showLeadCapture(qual), 400);
        });
      }

      // Bind "also consider" buttons
      card.querySelectorAll('.cst-also__item').forEach(btn => {
        btn.addEventListener('click', () => {
          const altQual = kb.getById(btn.dataset.qualId);
          if (altQual) {
            const msg = `Tell me more about the ${altQual.title}.`;
            this.inputEl.value = msg;
            this.sendBtn.disabled = false;
            this._handleSend();
          }
        });
      });
    }

    /* ── LEAD CAPTURE FORM ────────────────────────────────── */
    _showLeadCapture(contextQual) {
      const qualTitle = contextQual
        ? contextQual.title
        : (this.pageConfig.currentCourse || '');

      const leadEl = document.createElement('div');
      leadEl.className = 'cst-msg cst-msg--advisor';
      leadEl.style.display = 'block';

      const form = document.createElement('div');
      form.className = 'cst-lead';
      form.innerHTML = `
        <div class="cst-lead__title">Get in touch with our team</div>
        <div class="cst-lead__sub">We'll reach out to discuss the best qualification for you.</div>

        <div class="cst-lead__grid">
          <div class="cst-lead__field">
            <label class="cst-lead__label" for="cst-lead-name">Your name</label>
            <input id="cst-lead-name" class="cst-lead__input" type="text" placeholder="Jane Smith" autocomplete="name" />
          </div>
          <div class="cst-lead__field">
            <label class="cst-lead__label" for="cst-lead-company">Company</label>
            <input id="cst-lead-company" class="cst-lead__input" type="text" placeholder="Your organisation" autocomplete="organization" />
          </div>
          <div class="cst-lead__field">
            <label class="cst-lead__label" for="cst-lead-email">Email</label>
            <input id="cst-lead-email" class="cst-lead__input" type="email" placeholder="jane@company.co.uk" autocomplete="email" />
          </div>
          <div class="cst-lead__field">
            <label class="cst-lead__label" for="cst-lead-phone">Telephone</label>
            <input id="cst-lead-phone" class="cst-lead__input" type="tel" placeholder="07700 000000" autocomplete="tel" />
          </div>
          <div class="cst-lead__field cst-lead__field--full">
            <label class="cst-lead__label" for="cst-lead-qual">Qualification discussed</label>
            <input id="cst-lead-qual" class="cst-lead__input" type="text" value="${qualTitle}" />
          </div>
        </div>

        <div class="cst-lead__actions">
          <button class="cst-btn cst-btn--primary" id="cst-lead-submit" type="button">
            Send My Details
          </button>
          <button class="cst-btn cst-btn--ghost" id="cst-lead-cancel" type="button">
            Cancel
          </button>
        </div>
        <p style="font-size:0.72rem;color:var(--cst-muted);margin:8px 0 0">
          Your information is handled in accordance with our <a href="/privacy-policy/" style="color:var(--cst-navy)">Privacy Policy</a>.
        </p>
      `;

      leadEl.appendChild(form);
      this.msgEl.appendChild(leadEl);
      this._scrollToBottom();

      // Focus first field
      setTimeout(() => form.querySelector('#cst-lead-name')?.focus(), 100);

      // Submit
      form.querySelector('#cst-lead-submit').addEventListener('click', async () => {
        const leadData = this._collectLeadData(form, qualTitle);
        if (!leadData.name || !leadData.email) {
          alert('Please enter at least your name and email address.');
          return;
        }

        // Build conversation summary
        leadData.conversationSummary = this.messages
          .filter(m => m.role !== 'system')
          .map(m => `${m.role === 'user' ? 'Visitor' : 'Adviser'}: ${m.content.substring(0, 200)}`)
          .join('\n');

        await this._submitLead(leadData, form);
      });

      // Cancel
      form.querySelector('#cst-lead-cancel').addEventListener('click', () => {
        leadEl.remove();
        this._addAdvisorMessage("No problem — feel free to continue browsing or ask me anything else about our qualifications.");
      });
    }

    _collectLeadData(formEl, qualTitle) {
      return {
        name:    formEl.querySelector('#cst-lead-name')?.value.trim()    || '',
        company: formEl.querySelector('#cst-lead-company')?.value.trim() || '',
        email:   formEl.querySelector('#cst-lead-email')?.value.trim()   || '',
        phone:   formEl.querySelector('#cst-lead-phone')?.value.trim()   || '',
        qualification: formEl.querySelector('#cst-lead-qual')?.value.trim() || qualTitle || ''
      };
    }

    async _submitLead(data, formEl) {
      /**
       * HubSpot integration hook.
       *
       * Replace the body of this method with your HubSpot Forms API call.
       * The data object contains: name, email, phone, company,
       * qualification, conversationSummary.
       *
       * Example HubSpot Forms v3 submission:
       *
       * const PORTAL_ID = 'YOUR_PORTAL_ID';
       * const FORM_ID   = 'YOUR_FORM_GUID';
       * await fetch(
       *   `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
       *   {
       *     method: 'POST',
       *     headers: { 'Content-Type': 'application/json' },
       *     body: JSON.stringify({
       *       fields: [
       *         { name: 'firstname', value: data.name },
       *         { name: 'email',     value: data.email },
       *         { name: 'phone',     value: data.phone },
       *         { name: 'company',   value: data.company },
       *         { name: 'qualification_discussed', value: data.qualification },
       *         { name: 'conversation_summary',    value: data.conversationSummary }
       *       ]
       *     })
       *   }
       * );
       */

      // For now: log and show success state
      console.log('CSTAdvisor lead capture:', data);

      // Show success
      formEl.innerHTML = `
        <div class="cst-lead__success">
          <div class="cst-lead__success-icon">
            <svg viewBox="0 0 24 24"><path ${ICONS.check}/></svg>
          </div>
          <h4>Thank you, ${data.name.split(' ')[0]}!</h4>
          <p>One of our advisers will be in touch shortly to discuss ${data.qualification || 'your qualification options'}.</p>
        </div>`;
      this._scrollToBottom();
    }

    /* ── RESET ────────────────────────────────────────────── */
    _reset() {
      this.messages  = [];
      this.isTyping  = false;
      this.msgEl.innerHTML = '';
      this.chipsEl.style.display = '';
      this.inputEl.value = '';
      this.inputEl.style.height = 'auto';
      this.sendBtn.disabled = true;
      this._sendWelcome();
    }

  } // end class QualificationAdvisor

  /* ─────────────────────────────────────────────────────────────
     AUTO-INIT
     Finds all [data-cst-advisor] containers and initialises one
     widget per container, using the nearest window.QualificationAdvisor
     config (or data attributes).
  ───────────────────────────────────────────────────────────── */

  function init() {
    const containers = document.querySelectorAll('[data-cst-advisor]');
    containers.forEach(container => {
      // Read page config
      const pageConfig = window.QualificationAdvisor || null;
      new QualificationAdvisor(container, pageConfig);
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for manual init (e.g. after WordPress dynamic load)
  window.CSTAdvisor = { init, QualificationAdvisor };

})();
