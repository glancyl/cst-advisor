/**
 * CST Training – NVQ knowledge module
 * knowledge-nvq.js
 *
 * MUST be loaded AFTER knowledge.js and BEFORE assistant.js.
 *
 * Does three things:
 *   1. Strips prices, finance and discount language out of the TEXT of every
 *      entry in window.CSTKnowledge (descriptions, benefits and so on),
 *      including the existing ones. Figures buried in course text are not
 *      trusted, so none of them reach the prompt.
 *   2. Adds construction, OH&S and business NVQ entries.
 *   3. Adds kb.nvqPrices, the ONLY prices the assistant is allowed to quote.
 *      Every price and Buy Now link in it was checked against the live NVQ
 *      page on 29 Sep 2026. When a price changes, edit it here, then bump
 *      ?v= on this file and on assistant.js. NEVER add a Buy Now link that
 *      has not been copied from the live page.
 *
 * The Qualification Advisor does not load this file, so advisor.js is
 * unaffected by any of this.
 *
 * Built from csttraining.co.uk, August 2026. Course facts (durations, card
 * outcomes, pathways) are taken from the live pages — check them against
 * what admin/ops say before going live.
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     VERIFIED NVQ PRICES AND BUY NOW LINKS
     Prices are ex VAT. Monthly is 0% finance over 10 months, ex VAT.
     Checked against the live pages 29 Sep 2026.
  ═══════════════════════════════════════════════════════════ */
  const NVQ_PRICES_CHECKED = '29 Sep 2026';
  const NVQ_PRICES = [
    {"name": "Access Flooring L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/access-flooring-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-access-flooring-nvq-eligibility-form/"},
    {"name": "Access & Rigging L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/accessing-operations-and-rigging-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-accessing-operations-and-rigging-nvq-eligibility-form/"},
    {"name": "Bricklaying L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/bricklaying-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-bricklaying-nvq-eligibility-form/"},
    {"name": "Access & Rigging (Offshore) L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/accessing-operations-and-rigging-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-accessing-operations-and-rigging-nvq-eligibility-form/"},
    {"name": "Architectural Metalwork L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/architectural-metalwork-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-architectural-metalwork-nvq-eligibility-form/"},
    {"name": "Bricklaying L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/bricklaying-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-bricklaying-nvq-eligibility-form/"},
    {"name": "Occupational Work Supervisor L3", "hub": "supervision", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/occupational-work-supervisor-level-3-nvq/", "buyNow": "https://www.csttraining.co.uk/level-3-ows-nvq-eligibility-form/"},
    {"name": "L6 Construction Site Management", "hub": "management", "price": 1750, "monthly": 175, "page": "https://www.csttraining.co.uk/construction-site-management-level-6/", "buyNow": "https://www.csttraining.co.uk/level-6-management-eligibility-form/?product_id=149674"},
    {"name": "Crane Supervisor L4", "hub": "crane", "price": 1400, "monthly": 140, "page": "https://www.csttraining.co.uk/crane-supervisor-level-4-nvq/", "buyNow": "https://www.csttraining.co.uk/level-4-crane-supervisor-nvq-eligibility-form/"},
    {"name": "Brickwork Technicians L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/brickwork-technicians-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-brickwork-technicians-nvq-eligibility-form/"},
    {"name": "Carpentry L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/carpentry-level-2/", "buyNow": "https://www.csttraining.co.uk/eligibility-carpentry-nvq/"},
    {"name": "Carpentry L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/carpentry-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-carpentry-nvq-eligibility-form/"},
    {"name": "Cladding L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/cladding-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-cladding-nvq-eligibility-form/"},
    {"name": "Cladding L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/cladding-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-cladding-nvq-eligibility-form/"},
    {"name": "Concrete Finishing L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/concrete-finishing-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-concrete-finishing-nvq-eligibility-form/"},
    {"name": "Curtain Wall Installation L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/curtain-wall-installation-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-curtain-wall-installation-nvq-eligibility-form/"},
    {"name": "Demolition L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/demolition-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-demolition-nvq-eligibility-form/"},
    {"name": "Demolition L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/demolition-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-demolition-nvq-eligibility-form/"},
    {"name": "Diamond Drilling L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/diamond-drilling-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-diamond-drilling-nvq-eligibility-form/"},
    {"name": "Dry-Lining Finishing L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/dry-lining-finishing-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-dry-lining-finishing-nvq-eligibility-form/"},
    {"name": "Dry-Lining Fixing L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/dry-lining-fixing-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-dry-lining-fixing-nvq-eligibility-form/"},
    {"name": "Dry-Lining Boarder L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/dry-lining-boarder-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-dry-lining-boarder-nvq-eligibility-form/"},
    {"name": "Engineering Surveying L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/engineering-surveying-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-engineering-surveying-nvq-eligibility-form/"},
    {"name": "Fenestration Installation L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/fenestration-installation-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-fenestration-installation-nvq-eligibility-form/"},
    {"name": "Fenestration Installation L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/fenestration-installation-level-3-nvq/", "buyNow": "https://www.csttraining.co.uk/level-3-fenestration-installation-nvq-eligibility-form/"},
    {"name": "Fenestration Surveying L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/fenestration-surveying-level-3-nvq/", "buyNow": "https://www.csttraining.co.uk/level-3-fenestration-surveying-nvq-eligibility-form/"},
    {"name": "Fire Stopping L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/fire-stopping-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-fire-stopping-nvq-eligibility-form/"},
    {"name": "Floorcoverings L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/floor-coverings-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-floor-coverings-nvq-eligibility-form/"},
    {"name": "Acoustic Flooring L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/acoustic-flooring-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-acoustic-flooring-nvq-eligibility-form/"},
    {"name": "Formwork L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/formwork-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-formwork-nvq-eligibility-form/"},
    {"name": "Formwork L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/formwork-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-formwork-nvq-eligibility-form/"},
    {"name": "Fitted Interiors L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/fitted-interiors-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-fitted-interiors-nvq-eligibility-form/"},
    {"name": "Glass Related Occupations L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/glass-related-occupations-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-glass-related-occupations-nvq-eligibility-form/"},
    {"name": "Glazing L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/glazing-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-glazing-nvq-eligibility-form/"},
    {"name": "Glazing L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/glazing-level-3-nvq/", "buyNow": "https://www.csttraining.co.uk/level-3-glazing-nvq-eligibility-form/"},
    {"name": "Groundworks L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/groundworks-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-groundworks-nvq-eligibility-form/"},
    {"name": "Heritage Architectural Joinery L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/heritage-architectural-joinery-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-heritage-architectural-joinery-nvq-eligibility-form/"},
    {"name": "Insulation & Building Treatments L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/nvq-level-2-insulation-building-treatments/", "buyNow": "https://www.csttraining.co.uk/level-2-insulation-and-building-treatments-nvq-eligibility-form/"},
    {"name": "Insulation & Building Treatments L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/level-3-insulation/", "buyNow": "https://www.csttraining.co.uk/level-3-insulation-and-building-treatments-nvq-eligibility-form/"},
    {"name": "Interior Systems L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/interior-systems-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-interior-systems-nvq-eligibility-form/"},
    {"name": "Land Drilling L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/land-drilling-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-land-drilling-nvq-eligibility-form/"},
    {"name": "Mastic L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/mastic-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-mastic-nvq-eligibility-form/"},
    {"name": "Modular Building L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/modular-building-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-modular-building-nvq-eligibility-form/"},
    {"name": "Multi-trade L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/multitrade-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-multi-trade-nvq-eligibility-form/"},
    {"name": "Plastering L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/plastering-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-plastering-nvq-eligibility-form/"},
    {"name": "Plastering L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/plastering-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-plastering-nvq-eligibility-form/"},
    {"name": "Painting & Decorating L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/painting-decorating-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-painting-nvq-eligibility-form/"},
    {"name": "Painting & Decorating L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/painting-decorating-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-painting-decorating-nvq-eligibility-form/"},
    {"name": "Precast Concrete L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/precast-concrete-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-precast-concrete-nvq-eligibility-form/"},
    {"name": "Piling L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/piling-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-piling-nvq-eligibility-form/"},
    {"name": "Rendering L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/rendering-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-rendering-nvq-eligibility-form/"},
    {"name": "Road Building L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/road-building-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-road-building-nvq-eligibility-form/"},
    {"name": "Roofing L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/roofing-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-roofing-nvq-eligibility-form/"},
    {"name": "Roofing L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/roofing-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-roofing-nvq-eligibility-form/"},
    {"name": "Scaffolding L2 (Blue CISRS)", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/scaffolding-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-scaffolding-nvq-eligibility-form/"},
    {"name": "Scaffolding L3 (Gold CISRS)", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/scaffolding-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-scaffolding-nvq-eligibility-form/"},
    {"name": "Shopfitting L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/shopfitting-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-shopfitting-nvq-eligibility-form/"},
    {"name": "Shopfitting L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/shopfitting-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-shopfitting-nvq-eligibility-form/"},
    {"name": "Solar Panels L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/solar-panels-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-solar-panels-nvq-eligibility-form/"},
    {"name": "Specialist Installation Occupations L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/level-2-specialist-installations-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-specialist-installation-occupations-nvq-eligibility-form/"},
    {"name": "Steel Fixing L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/steel-fixing-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-steel-fixing-nvq-eligibility-form/"},
    {"name": "Steel Fixing L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/steel-fixing-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-steel-fixing-nvq-eligibility-form/"},
    {"name": "Site Logistics L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/site-logistics-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-site-logistics-nvq-eligibility-form/"},
    {"name": "Stonemason L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/stonemason-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-stonemason-nvq-eligibility-form/"},
    {"name": "SFS L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/sfs-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-sfs-nvq-eligibility-form/"},
    {"name": "Tiling L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/tiling-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-tiling-nvq-eligibility-form/"},
    {"name": "Tiling L3", "hub": "trade", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/tiling-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-tiling-nvq-eligibility-form/"},
    {"name": "Flat Roof L2", "hub": "trade", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/waterproofing-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-flat-roof-single-ply-nvq-eligibility-form/"},
    {"name": "Construction Contracting Operations L3", "hub": "supervision", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/cco-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-cco-nvq-eligibility-form/"},
    {"name": "Site Supervision L4", "hub": "supervision", "price": 1400, "monthly": 140, "page": "https://www.csttraining.co.uk/site-supervision-level-4/", "buyNow": "https://www.csttraining.co.uk/supervision-nvq-eligibility-form/?product_id=149661"},
    {"name": "L7 Construction Senior Management", "hub": "management", "price": 1995, "monthly": 200, "page": "https://www.csttraining.co.uk/senior-construction-management-level-7-nvq/", "buyNow": "https://www.csttraining.co.uk/level-7-construction-management-nvq-eligibility-form/"},
    {"name": "L6 CCO General", "hub": "management", "price": 1750, "monthly": 175, "page": "https://www.csttraining.co.uk/level-6-cco/", "buyNow": "https://www.csttraining.co.uk/level-6-cco-nvq-eligibility-form/"},
    {"name": "L6 CCO Specialist", "hub": "management", "price": 1750, "monthly": 175, "page": "https://www.csttraining.co.uk/construction-contracting-operations-level-6-nvq-specialist/", "buyNow": "https://www.csttraining.co.uk/level-6-cco-nvq-specialist-eligibility-form/"},
    {"name": "L6 Senior Site Inspection (Diploma)", "hub": "management", "price": 1800, "monthly": 180, "page": "https://www.csttraining.co.uk/senior-site-inspection-level-6-nvq/", "buyNow": "https://www.csttraining.co.uk/level-6-senior-site-inspection-nvq-eligibility-form/"},
    {"name": "Slinger Signaller L2", "hub": "crane", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/slinger-signaller-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-slinger-signaller-nvq-eligibility-form/"},
    {"name": "Appointed Person L5", "hub": "crane", "price": 1450, "monthly": 145, "page": "https://www.csttraining.co.uk/appointed-person-level-5-nvq/", "buyNow": "https://www.csttraining.co.uk/level-5-appointed-person-nvq-eligibility-form/"},
    {"name": "Tower Crane L2", "hub": "crane", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/tower-crane-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-tower-crane-nvq-eligibility-form/"},
    {"name": "Crawler Crane L2", "hub": "crane", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/crawler-crane-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-crawler-crane-nvq-eligibility-form/"},
    {"name": "Pedestrian Crane L2", "hub": "crane", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/pedestrian-crane-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-pedestrian-crane-nvq-eligibility-form/"},
    {"name": "Spider Crane L2", "hub": "crane", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/spider-crane-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-spider-crane-nvq-eligibility-form/"},
    {"name": "Mobile Crane L2", "hub": "crane", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/mobile-crane/", "buyNow": "https://www.csttraining.co.uk/level-2-mobile-crane-nvq-eligibility-form/"},
    {"name": "Gantry Crane L2", "hub": "crane", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/gantry-crane-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-gantry-crane-nvq-eligibility-form/"},
    {"name": "180 Excavator L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/180-excavator-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-180-degree-excavator-nvq-eligibility-form/"},
    {"name": "360 Excavator L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/360-excavator-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-360-excavator-nvq-eligibility-form/"},
    {"name": "ADT L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/adt-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-adt-nvq-eligibility-form/"},
    {"name": "Concrete Pump L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/concrete-pump-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-concrete-pump-nvq-eligibility-form/"},
    {"name": "Hoist Operator L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/hoist-operator-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-hoist-operator-nvq-eligibility-form/"},
    {"name": "Forklift L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/forklift-level-2/", "buyNow": "https://www.csttraining.co.uk/level-2-forklift-nvq-eligibility-form/"},
    {"name": "Forward Tipping Dumper L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/forward-tipping-dumper-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-forward-tipping-dumper-nvq-eligibility-form/"},
    {"name": "Lorry Loaders L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/lorry-loaders-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-lorry-loaders-nvq-eligibility-form/"},
    {"name": "Loading Shovel L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/loading-shovel-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-loading-shovel-nvq-eligibility-form/"},
    {"name": "Plant Maintenance L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/plant-maintenance-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-plant-maintenance-nvq-eligibility-form/"},
    {"name": "Rear Tipping Dumper L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/rear-tipping-dumper-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-rear-tipping-dumper-nvq-eligibility-form/"},
    {"name": "Ride On Roller L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/ride-on-roller-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-ride-on-roller-nvq-eligibility-form/"},
    {"name": "Scissor MEWP L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/level-2-mewp-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-mewp-nvq-eligibility-form/"},
    {"name": "Skid Steer Loaders L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/skid-steer-loaders-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-skid-steer-loaders-nvq-eligibility-form/"},
    {"name": "Static Concrete Boom L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/static-concrete-boom-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-static-concrete-boom-nvq-eligibility-form/"},
    {"name": "Telehandler L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/telehandler-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-telehandler-nvq-eligibility-form/"},
    {"name": "Tractor L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/tractor-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-tractor-nvq-eligibility-form/"},
    {"name": "Traffic Marshall L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/traffic-marshall-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-traffic-marshall-nvq-eligibility-form/"},
    {"name": "Plant Installation L2", "hub": "plant", "price": 895, "monthly": 90, "page": "https://www.csttraining.co.uk/plant-installations-level-2-nvq/", "buyNow": "https://www.csttraining.co.uk/level-2-plant-installations-nvq-eligibility-form/"},
    {"name": "Plant Installation L3", "hub": "plant", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/plant-installations-level-3-nvq/", "buyNow": "https://www.csttraining.co.uk/level-3-plant-installations-nvq-eligibility-form/"},
    {"name": "Plant Maintenance Diploma L3 (not an NVQ)", "hub": "plant", "price": 1100, "monthly": 110, "page": "https://www.csttraining.co.uk/plant-maintenance-level-3/", "buyNow": "https://www.csttraining.co.uk/level-3-plant-maintenance-nvq-eligibility-form/"}
  ];

  function apply() {
    if (!window.CSTKnowledge || !window.CSTKnowledge.qualifications) return;
    if (window.CSTKnowledge.__nvqApplied) return;
    window.CSTKnowledge.__nvqApplied = true;


  if (!window.CSTKnowledge || !window.CSTKnowledge.qualifications) {
    console.error('knowledge-nvq.js: knowledge.js must load first.');
    return;
  }

  /* ═══════════════════════════════════════════════════════════
     1. PRICE SANITISER
     Removes anything that reads as a price, instalment, discount
     or finance offer from the fields that reach the prompt or
     the recommendation card.
  ═══════════════════════════════════════════════════════════ */

  // Any sentence containing one of these is dropped whole, rather than
  // gutted mid-clause and left reading like broken English.
  const PRICE_SENTENCE = /(£|\bVAT\b|0%\s*finance|payment plan|instal?ment|\bdiscount)/i;

  function stripPrices(text) {
    if (typeof text !== 'string') return text;

    // 1. Remove parentheticals that carry a price: "(4–8 weeks, £529+VAT)" → "(4–8 weeks)"
    let out = text.replace(/\(([^()]*)\)/g, (match, inner) => {
      if (!PRICE_SENTENCE.test(inner)) return match;
      const kept = inner
        .split(/\s*,\s*/)
        .filter(part => !PRICE_SENTENCE.test(part))
        .join(', ')
        .trim();
      return kept ? '(' + kept + ')' : '';
    });

    // 2. Drop any remaining sentence that mentions money
    out = out
      .split(/(?<=[.!?])\s+/)
      .filter(s => !PRICE_SENTENCE.test(s))
      .join(' ');

    return out
      .replace(/\s+([.,;])/g, '$1')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  function sanitiseEntry(q) {
    ['description', 'benefits', 'audience', 'notSuitedFor'].forEach(f => {
      if (q[f]) q[f] = stripPrices(q[f]);
    });
    if (Array.isArray(q.suitedFor)) q.suitedFor = q.suitedFor.map(stripPrices);
    return q;
  }

  /* ═══════════════════════════════════════════════════════════
     2. SHARED NVQ FACTS
     Appended to every NVQ entry's description so the bot always
     has the process context without repeating it per entry.
  ═══════════════════════════════════════════════════════════ */

  const NVQ_PROCESS =
    ' Completed remotely through a purpose-built online portfolio with a dedicated assessor. ' +
    'The process is: induction with your assessor, gathering site evidence such as RAMS, toolbox talks ' +
    'and programmes, a witness testimony from a competent person, knowledge questions, then a ' +
    'professional discussion with your assessor. CST Training covers the whole of the UK and is CITB approved. ' +
    'NVQs are CITB and Ofqual approved, awarded through NOCN, ProQual, GQA or Qualifications Scotland ' +
    'Accreditation — an awarding body is assigned, but you can request a specific one.';

  /* Trade list — the 75 Level 2 trade NVQs CST Training publishes handbooks for.
     Kept as one list rather than 75 knowledge base entries: the process is
     identical for all of them, so separate entries would repeat the same
     text 75 times in every system prompt for no benefit. */
  const TRADES = [
    'Access and Rigging','Access Flooring','Acoustic Flooring',
    'Acoustic Packages and Frames Installer','Architectural Joinery',
    'Architectural Joinery (Heritage)','Architectural Metalwork','Bench Joinery',
    'Blinds and Solar Installation','Bricklaying','Brickwork Technicians','Carpentry',
    'Ceiling Fixing','Cladding','Concrete Finishing','Concrete Repair','Cranes',
    'Curtain Wall Installation','Demolition','Diamond Drilling','Dry Lining Boarder',
    'Dry Lining Finishing','Dry Lining Fixing','Facade Preservation',
    'Fenestration Installation','Fire Stopping','Fitted Interiors','Flat Roof',
    'Flat Roof (Green Roof Installer)','Floor Coverings','Formwork',
    'Glass Related Occupations','Glazing','Groundworks','Highway Maintenance',
    'Industrial Storage Systems Installation','Insulated Enclosures',
    'Insulation and Building Treatments','Land Drilling','Land Drilling Support Operative',
    'Mastic','Modular Buildings','Multi-Trade','Painting and Decorating',
    'Painting and Decorating (Heritage)','Painting and Decorating (Industrial)',
    'Performing Engineering Operations','Photovoltaic Panels','Piling',
    'Plant Installation','Plant Maintenance','Plastering','Plastering (Heritage Solid)',
    'Point of Purchase Installation','Precast Concrete','Protective Components',
    'Removal of Non-Hazardous Waste','Rendering','Road Building','Roofing',
    'Scaffolding','Screed Flooring','SFS (Structural Framing Systems)',
    'Shopfitting Bench Work','Shopfitting Site Work','Site Logistics','Steel Fixing',
    'Stonemasonry (External)','Stonemasonry (Heritage)','Stonemasonry (Internal)',
    'Sub-Structure Grouting','Sweeping and Cleaning','Tiling','Timber Frame Erection',
    'Traffic Marshall'
  ];


  /* The 31 Level 3 trade NVQs. Same process as Level 2, but for advanced
     craft experience with supervisory responsibility. */
  const TRADES_L3 = [
    'Access and Rigging','Architectural Joinery','Bench Joinery','Bricklaying',
    'Carpentry','Carpentry (Shopfitting)','Cladding (Rainscreen)',
    'Cladding (Roof and Wall Sheeting and Cladding)','Demolition','Fenestration',
    'Fenestration Surveying','Floor Coverings','Formwork','Glazing',
    'Heritage Skills (Roof Slating and Tiling)','Heritage Skills (Stonemasonry)',
    'Heritage Skills (Wood Occupations)','Insulation','Interior Systems',
    'Moving Loads','Painting','Plant Installation','Plant Maintenance',
    'Plastering','Plastering (Fibrous)','Roofing (Slater)','Roofing (Tiler)',
    'Scaffolding','Steel Fixing','Stonemasonry (Banker Masonry)','Tiling'
  ];

  /* Entry requirements — as stated on the CST Training course pages (checked 25 Aug 2026).
     NOTE: none of the NVQ course pages state a minimum number of years of
     experience. Eligibility is judged on your current role and your access to
     site evidence, via CST Training's eligibility form. Do not assert a years figure. */
  const NVQ_ENTRY =
    ' ENTRY REQUIREMENTS: CST Training does not publish a minimum number of years of experience for this NVQ. ' +
    'What matters is that you are currently working in the role and have access to the site evidence needed ' +
    'to demonstrate competence. To start you complete a registration form and, as a minimum, provide a copy ' +
    'of photo ID. The NVQ can be started on any day. Purchase goes through an eligibility form so CST Training can ' +
    'confirm the NVQ is right for your role before you commit. If someone asks whether they have enough ' +
    'experience, do NOT give a number — explain that it depends on their role and evidence, and point them ' +
    'to the eligibility form or the team.';

  /* Portfolio and registration detail — from the Level 2 trade NVQ handbooks.
     True of the NVQ portfolio process generally. */
  const NVQ_PORTFOLIO =
    ' Evidence is submitted through an e-portfolio system called Quals Direct — you get login ' +
    'details by email once registered. An induction with your assessor is booked through the ' +
    'online booking system and usually happens within 7 working days of registration. At the ' +
    'induction the assessor discusses your job role and helps you choose the optional units that ' +
    'best fit the work you actually do. Uploading an up-to-date CV is a mandatory part of the NVQ. ' +
    'Knowledge questions can be completed either in writing or as a discussion with your assessor, ' +
    'and there are no right or wrong answers — they are based on your own experience. Your ' +
    'portfolio then goes for internal and, in some cases, external quality assurance before the ' +
    'awarding body issues the certificate. You need basic IT skills such as sending email and ' +
    'uploading documents. The portfolio stays open for 1 year; longer is possible but additional ' +
    'fees may apply beyond 1 year from registration. An NVQ is not a training course — it ' +
    'accredits competence you already have.';

  /* ═══════════════════════════════════════════════════════════
     3. NVQ ENTRIES
  ═══════════════════════════════════════════════════════════ */

  const nvqs = [

    /* ── TRADE (Level 2 & 3) ─────────────────────────────── */
    {
      id:            'nvq-trade-level-2',
      title:         'Level 2 Construction NVQ (Trade)',
      category:      'Construction NVQ',
      level:         2,
      minExperience: null,
      roles:         ['bricklayer','carpenter','joiner','plasterer','painter','decorator',
                      'groundworker','roofer','tiler','plumber','labourer','dryliner',
                      'steel fixer','scaffolder','general operative'],
      audience:      'Experienced tradespeople who are already doing the work on site but have no formal qualification for it, and need one to get a Blue CSCS Card.',
      description:   'A trade-specific Level 2 NVQ that formally recognises the skills you already use on site. Assessment is of your actual work, not classroom study or exams — you evidence what you already do. ' +
                     'CST Training offers Level 2 trade NVQs in: ' + TRADES.join(', ') + '.' + NVQ_PROCESS + NVQ_PORTFOLIO + NVQ_ENTRY,
      suitedFor:     [
        'Experienced tradespeople with no formal qualification in their trade',
        'Anyone who needs a Blue CSCS Card and does not yet hold a relevant Level 2 NVQ',
        'Workers whose employer or main contractor requires proof of competence',
        'Those who learned on the job rather than through an apprenticeship'
      ],
      notSuitedFor:  'Not a course that teaches you a trade from scratch — you must already be working in the role, with access to a site and to evidence. Those supervising others should look at Level 3 or 4 supervision NVQs instead.',
      progression:   ['nvq-trade-level-3','nvq-l3-occupational-work-supervisor'],
      url:           'https://www.csttraining.co.uk/trade/',
      benefits:      'A Level 2 NVQ is what evidences your competence for a Blue CSCS Card — without a relevant Level 2 NVQ you cannot get one. Assessed on the work you already do, completed remotely.'
    },

    {
      id:            'nvq-trade-level-3',
      title:         'Level 3 Construction NVQ (Trade)',
      category:      'Construction NVQ',
      level:         3,
      minExperience: null,
      roles:         ['advanced craft operative','chargehand','leading hand','experienced tradesperson',
                      'gang leader','specialist trade operative'],
      audience:      'Tradespeople with advanced experience in their trade who also carry some supervisory responsibility, and need a Level 3 qualification — typically to move toward a Gold CSCS Card.',
      description:   'A trade-specific Level 3 NVQ recognising advanced craft competence. Level 3 is designed for those with advanced experience in their trade who also have supervisory responsibility, which is the main thing that separates it from Level 2. ' +
                     'CST Training offers Level 3 trade NVQs in: ' + TRADES_L3.join(', ') + '.' + NVQ_PROCESS + NVQ_PORTFOLIO + NVQ_ENTRY,
      suitedFor:     [
        'Advanced craft operatives who also supervise or direct others',
        'Those who already hold a Level 2 NVQ and want to progress',
        'Workers needing a Level 3 or 4 NVQ for a Gold CSCS Card'
      ],
      notSuitedFor:  'Not for those new to a trade — Level 2 is the correct starting point. Those whose role is primarily supervising others may be better suited to the Level 3 Occupational Work Supervisor NVQ.',
      progression:   ['nvq-l3-occupational-work-supervisor','nvq-l4-site-supervision'],
      url:           'https://www.csttraining.co.uk/trade/',
      benefits:      'Recognises advanced craft competence and supports a Gold CSCS Card application. Assessed on real site work, completed remotely alongside the day job.'
    },

    /* ── SUPERVISION (Level 3 & 4) ───────────────────────── */
    {
      id:            'nvq-l3-occupational-work-supervisor',
      title:         'Level 3 NVQ Occupational Work Supervision',
      category:      'Construction NVQ',
      level:         3,
      minExperience: null,
      roles:         ['supervisor','chargehand','foreman','gang leader','leading hand',
                      'working supervisor','site supervisor'],
      audience:      'Tradespeople who have stepped up to supervise a small team or gang on site and need a supervisory qualification for a Gold CSCS Card.',
      description:   'The Level 3 NVQ in Occupational Work Supervision recognises competence in supervising construction work and teams on site. Typically takes 4 to 8 weeks from start to finish. CITB approved and completed fully remotely.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'Working supervisors, chargehands and foremen',
        'Tradespeople who now supervise a gang or small team',
        'Those needing a Gold CSCS Card via the supervisory route',
        'Anyone whose role has moved from doing the work to overseeing it'
      ],
      notSuitedFor:  'Not for those who do not supervise anyone — a trade NVQ is the right route for operatives. Those supervising a whole site or larger operation should consider the Level 4 Site Supervision NVQ.',
      progression:   ['nvq-l4-site-supervision','nvq-l6-site-management'],
      url:           'https://www.csttraining.co.uk/occupational-work-supervisor-level-3-nvq/',
      benefits:      'Supports a Gold CSCS Card application. Typically completed in 4 to 8 weeks, fully remotely, with a dedicated assessor. The Gold card also requires an in-date CITB Health, Safety and Environment (HS&E) test.'
    },

    {
      id:            'nvq-l3-cco',
      title:         'Level 3 NVQ Construction Contracting Operations',
      category:      'Construction NVQ',
      level:         3,
      minExperience: null,
      roles:         ['assistant site manager','trainee quantity surveyor','estimator',
                      'buyer','planner','contracts assistant','site administrator'],
      audience:      'Experienced on-site technical staff — estimating, buying, planning, surveying, site technical support or design co-ordination — rather than those in a trade or on the tools.',
      description:   'The Level 3 NVQ in Construction Contracting Operations recognises competence in the technical and contracting side of construction. Typically takes 4 to 12 weeks. You choose from 7 pathways: General, Estimating, Buying, Planning, Surveying, Site Technical Support and Design Co-ordinator. Evidence gathered relates to the pathway chosen. A written case study may be required, and the assessor may visit site or hold a video call. CITB approved and completed remotely.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'On-site technical staff in estimating, buying, planning or surveying',
        'Site technical support and design co-ordination roles',
        'Anyone in a construction office role needing a Gold CSCS Card'
      ],
      notSuitedFor:  'Not for trade operatives or those supervising site work directly — the Occupational Work Supervision NVQ suits those roles better.',
      progression:   ['nvq-l4-site-supervision','nvq-l6-cco-general'],
      url:           'https://www.csttraining.co.uk/cco-level-3/',
      benefits:      'Supports a Gold CSCS Card application for technical and contracting roles, alongside an in-date CITB HS&E test. Seven pathways so the NVQ matches the work you actually do. Typically 4 to 12 weeks, completed remotely.'
    },

    {
      id:            'nvq-l4-site-supervision',
      title:         'Level 4 NVQ Construction Site Supervision',
      category:      'Construction NVQ',
      level:         4,
      minExperience: null,
      roles:         ['site supervisor','section supervisor','general foreman',
                      'assistant site manager','sub-agent'],
      audience:      'Experienced site supervisors responsible for supervising site operations, who need a Level 4 qualification for a Gold CSCS Card.',
      description:   'The Level 4 NVQ in Construction Site Supervision recognises competence in supervising site operations at a higher level than Level 3. Typically takes 4 to 8 weeks. CITB approved and completed fully remotely. Eligible for ELCAS funding for current and ex-military personnel.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'Site supervisors and general foremen with real site responsibility',
        'Those progressing beyond a Level 3 supervisory NVQ',
        'Anyone needing a Gold CSCS Card via the Level 4 route',
        'Ex-forces personnel who may be eligible for ELCAS funding'
      ],
      notSuitedFor:  'Not for those managing a whole site or project — the Level 6 Site Management NVQ is the Black CSCS Card route. Not for operatives without supervisory responsibility.',
      progression:   ['nvq-l6-site-management','nvq-l6-cco-general'],
      url:           'https://www.csttraining.co.uk/site-supervision-level-4/',
      benefits:      'Supports a Gold CSCS Card application. Typically 4 to 8 weeks, fully remote. One of CST Training\'s ELCAS-eligible NVQs for service leavers and veterans.'
    },

    /* ── MANAGEMENT (Level 6 & 7) ────────────────────────── */
    {
      id:            'nvq-l6-site-management',
      title:         'Level 6 NVQ Construction Site Management',
      category:      'Construction NVQ',
      level:         6,
      minExperience: null,
      roles:         ['site manager','project manager','construction manager','site agent',
                      'contracts manager','general foreman moving into management'],
      audience:      'Experienced site managers running sites or projects who need a Level 6 qualification to apply for a Black CSCS Card.',
      description:   'The Level 6 NVQ in Construction Site Management is the main route to a Black CSCS Card for site managers. Typically takes 8 to 12 weeks. Assessed by CIOB chartered assessors.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'Site managers and site agents running their own sites',
        'Construction and contracts managers without a Level 6 qualification',
        'Those needing a Black CSCS Card',
        'Experienced supervisors who have moved fully into site management',
        'Ex-forces personnel who may be eligible for ELCAS funding'
      ],
      notSuitedFor:  'Not for supervisors who do not manage a site — Level 3 or 4 supervision NVQs are the correct route. Those in commercial or contracting roles rather than site management should look at the Level 6 Construction Contracting Operations NVQ.',
      progression:   ['nvq-l7-senior-management'],
      url:           'https://www.csttraining.co.uk/construction-site-management-level-6/',
      benefits:      'The recognised route to a Black CSCS Card for site managers. Assessed by CIOB chartered assessors. Typically 8 to 12 weeks, completed remotely alongside the job. You can apply for a temporary CSCS card once enrolled. The Black card also requires the CITB MAP test.'
    },

    {
      id:            'nvq-l7-senior-management',
      title:         'Level 7 NVQ Construction Senior Management',
      category:      'Construction NVQ',
      level:         7,
      minExperience: null,
      roles:         ['senior site manager','project director','construction director',
                      'operations manager','senior contracts manager','managing director'],
      audience:      'Senior construction professionals operating above individual site level who want the highest-level construction management NVQ.',
      description:   'The Level 7 NVQ in Construction Senior Management is the most senior construction management NVQ. Typically takes 8 to 12 weeks. Assessed by CIOB assessors and offers a short route to MCIOB membership. 6 units are mandatory and a further 13 are optional. The mandatory units are: manage project processes in construction; manage teams in construction; provide advice, judgement and service ethically in construction; develop self and others in construction; control projects in construction; and plan a construction organisation workforce. Approved by Ofqual, CITB, CSCS and CIOB, awarded through NOCN. IMPORTANT: this NVQ is NO LONGER ELIGIBLE for CITB grant funding — do not tell visitors they can claim a CITB grant for it. ELCAS funding for service personnel and service leavers is still available.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'Senior managers responsible for multiple sites or projects',
        'Construction and project directors',
        'Those pursuing MCIOB membership via the short route',
        'Level 6 NVQ holders progressing to the highest level',
        'Ex-forces personnel who may be eligible for ELCAS funding'
      ],
      notSuitedFor:  'Not appropriate for site managers running a single site — the Level 6 Site Management NVQ is the right level. Not for supervisors.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/senior-construction-management-level-7-nvq/',
      benefits:      'The highest-level construction management NVQ, supporting a Black CSCS Card and offering a short route to MCIOB membership. Assessed by CIOB assessors, typically 8 to 12 weeks.'
    },

    {
      id:            'nvq-l6-cco-general',
      title:         'Level 6 NVQ Construction Contracting Operations – General',
      category:      'Construction NVQ',
      level:         6,
      minExperience: null,
      roles:         ['technical site manager','operations manager','contracts manager',
                      'sub-contractor site manager','owner','director','construction manager'],
      audience:      'Technical site managers, operations managers, specialist sub-contractor site managers, owners and directors who need a Level 6 qualification for a Black CSCS Card.',
      description:   'The Level 6 NVQ in Construction Contracting Operations (General) covers the commercial and contracting side of construction at a management level. Typically takes 8 to 12 weeks. Assessed by CIOB assessors.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'Technical site managers and operations managers',
        'Specialist sub-contractor site managers',
        'Owners and directors of construction businesses',
        'Ex-forces personnel who may be eligible for ELCAS funding'
      ],
      notSuitedFor:  'Those working in one commercial specialism — estimating, buying, surveying or planning — should take the Specialist pathway version instead. Those running traditional main-contractor sites may be better suited to the Level 6 Site Management NVQ.',
      progression:   ['nvq-l7-senior-management'],
      url:           'https://www.csttraining.co.uk/level-6-cco/',
      benefits:      'Route to a Black CSCS Card for commercial and contracting professionals. Assessed by CIOB assessors, typically 8 to 12 weeks, completed remotely.'
    },

    {
      id:            'nvq-l6-cco-specialist',
      title:         'Level 6 NVQ Construction Contracting Operations – Specialist',
      category:      'Construction NVQ',
      level:         6,
      minExperience: null,
      roles:         ['quantity surveyor','estimator','planner','buyer','commercial manager',
                      'procurement manager'],
      audience:      'Senior professionals working in one specific commercial discipline — planning, estimating, surveying or buying — who need a Level 6 qualification in their specialism.',
      description:   'The Specialist version of the Level 6 Construction Contracting Operations NVQ, with 4 pathways: Estimating, Buying, Surveying and Planning. Typically takes 8 to 12 weeks. Assessed by CIOB assessors.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'Quantity surveyors, estimators, planners and buyers',
        'Those whose role sits within one commercial discipline rather than across all of them',
        'Professionals needing a Black CSCS Card in a specialist commercial role'
      ],
      notSuitedFor:  'Not for those working across the full range of contracting operations — the General pathway is a better fit. Not for site managers.',
      progression:   ['nvq-l7-senior-management'],
      url:           'https://www.csttraining.co.uk/construction-contracting-operations-level-6-nvq-specialist/',
      benefits:      'Recognises competence in a specific commercial discipline and supports a Black CSCS Card. Choose from planning, estimating, surveying or buying pathways.'
    },

    {
      id:            'nvq-l6-senior-site-inspection',
      title:         'Level 6 NVQ Diploma in Senior Site Inspection',
      category:      'Construction NVQ',
      level:         6,
      minExperience: null,
      roles:         ['clerk of works','site inspector','quality inspector',
                      'architectural inspector','senior site inspector','building inspector'],
      audience:      'Site inspectors, quality inspectors, architectural inspectors, clerks of works and other inspection-based roles.',
      description:   'The Level 6 NVQ Diploma in Senior Site Inspection recognises competence in inspecting construction work and managing quality on site. Typically takes 8 to 12 weeks. Assessed by CIOB assessors.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'Site inspectors, quality inspectors and architectural inspectors',
        'Clerks of works and other inspection-based roles',
        'Inspection professionals needing a Black CSCS Card'
      ],
      notSuitedFor:  'Not for site or contracts managers — the Site Management or Contracting Operations NVQs are more appropriate for those roles.',
      progression:   ['nvq-l7-senior-management'],
      url:           'https://www.csttraining.co.uk/senior-site-inspection-level-6-nvq/',
      benefits:      'The senior qualification for site inspection and clerk of works roles. Supports a Black CSCS Card application alongside the CITB MAP test. ProQual and CITB approved. Typically 8 to 12 weeks, completed remotely.'
    },

    /* ── PLANT, CRANE & ELECTRICAL ───────────────────────── */
    {
      id:            'nvq-plant',
      title:         'Plant and Machine Operations NVQs (Level 2 & 3)',
      category:      'Construction NVQ',
      level:         2,
      minExperience: null,
      roles:         ['plant operator','excavator operator','dumper driver','roller operator',
                      'telehandler operator','forklift operator','machine operator'],
      audience:      'Plant and machine operators who hold a red trainee CPCS or NPORS card and need an NVQ to upgrade to a blue competence card.',
      description:   'CST Training offers a wide range of plant and machine operations NVQs at Levels 2 and 3, covering the main categories of construction plant. These are the qualification route from a red CPCS or NPORS trainee card to a blue competence card.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'Plant operators holding a red trainee CPCS or NPORS card',
        'Machine operators needing formal recognition of competence',
        'Operators whose employer requires a blue card'
      ],
      notSuitedFor:  'Not for those who do not operate plant. The specific NVQ depends on the machine category you operate — check the plant NVQ page or ask the team which applies to you.',
      progression:   ['nvq-l3-occupational-work-supervisor'],
      url:           'https://www.csttraining.co.uk/plant-nvqs/',
      benefits:      'The route from a red trainee CPCS or NPORS card to a blue competence card. Assessed on the machines you already operate, completed remotely.'
    },

    {
      id:            'nvq-crane',
      title:         'Crane NVQs (Level 2, 4 & 5)',
      category:      'Construction NVQ',
      level:         2,
      minExperience: null,
      roles:         ['crane operator','slinger signaller','crane supervisor','appointed person',
                      'lifting supervisor','tower crane operator','mobile crane operator'],
      audience:      'Those working in lifting operations — crane operators, slinger signallers, crane supervisors and appointed persons — who need an NVQ for a blue CPCS card.',
      description:   'CST Training offers NVQs across lifting operations at Levels 2, 4 and 5, covering crane operators, slinger signallers, crane supervisors and appointed persons. These support blue CPCS card applications.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'Crane operators and slinger signallers',
        'Crane supervisors and appointed persons',
        'Anyone in lifting operations needing a blue CPCS card'
      ],
      notSuitedFor:  'Not for general construction operatives. The right level depends on your specific lifting role — ask the team which NVQ matches what you do.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/crane-nvqs/',
      benefits:      'Covers the full range of lifting roles and supports a blue CPCS card. Assessed on your actual lifting work, completed remotely.'
    },

    {
      id:            'nvq-electrical-level-3',
      title:         'Level 3 Electrotechnical Experienced Worker NVQ',
      category:      'Construction NVQ',
      level:         3,
      minExperience: null,
      roles:         ['electrician','electrical installer','maintenance electrician',
                      'experienced electrical worker'],
      audience:      'Experienced electricians working without a full formal qualification who need to evidence competence through the experienced worker route.',
      description:   'The Level 3 Electrotechnical Experienced Worker qualification is the assessment route for electricians with substantial industry experience but no full qualification. It recognises the work you already do rather than teaching from scratch.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'Practising electricians with several years of experience',
        'Those who learned on the job and have no formal electrotechnical qualification',
        'Electricians who need to evidence competence for card or scheme purposes'
      ],
      notSuitedFor:  'Not a route into the electrical trade for beginners — it requires substantial existing experience and access to work to evidence.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/level-3-electrotechnical-experienced-worker/',
      benefits:      'The recognised experienced worker assessment route for electricians. Recognises existing competence without returning to college.'
    },

    /* ── OCCUPATIONAL HEALTH & SAFETY NVQs ───────────────── */
    {
      id:            'ohs-nvq-level-3',
      title:         'Level 3 NVQ Occupational Health & Safety',
      category:      'Health & Safety',
      level:         3,
      minExperience: null,
      roles:         ['health and safety officer','h&s advisor','safety coordinator',
                      'site safety officer','h&s administrator','ohs','hse','sheq','shequ',
                      'nebosh holder','iosh holder'],
      audience:      'Those working in a health and safety role who want a competence-based NVQ assessed on their actual work rather than an exam-based certificate.',
      description:   'The Level 3 NVQ in Occupational Health and Safety recognises competence in an H&S role through workplace evidence rather than examination. It is the NVQ alternative to certificate-based routes such as NEBOSH.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'H&S officers and advisors already doing the role',
        'Those who prefer evidence-based assessment to exams',
        'People who need a recognised H&S qualification without classroom study'
      ],
      notSuitedFor:  'Not for those new to health and safety with no H&S duties to evidence — NEBOSH or IOSH courses teach the knowledge first. Senior practitioners should consider the Level 6 NVQ.',
      progression:   ['ohs-nvq-level-6','nebosh-general'],
      url:           'https://www.csttraining.co.uk/ohs-level-3/',
      benefits:      'Competence-based H&S qualification assessed on the work you already do, with no exams. Completed remotely with a dedicated assessor.'
    },

    {
      id:            'ohs-nvq-level-6',
      title:         'Level 6 NVQ Occupational Health & Safety',
      category:      'Health & Safety',
      level:         6,
      minExperience: null,
      roles:         ['health and safety manager','shequ manager','hse manager',
                      'safety manager','head of health and safety','ohs','sheq','ehs'],
      audience:      'Experienced health and safety practitioners who want a degree-level qualification assessed through workplace competence, often as a route toward professional IOSH membership.',
      description:   'The Level 6 NVQ Diploma in Occupational Health and Safety is a degree-level competence qualification for practising H&S professionals. Widely used as a route toward Graduate IOSH and onward Chartered membership. Eligible for ELCAS funding.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'Practising H&S managers and practitioners',
        'Those working toward Graduate or Chartered IOSH membership',
        'NEBOSH General or Construction Certificate holders progressing further',
        'Ex-forces personnel who may be eligible for ELCAS funding'
      ],
      notSuitedFor:  'Not for those new to health and safety — requires a substantial H&S role to evidence. The Level 3 NVQ or NEBOSH Certificates are better starting points.',
      progression:   ['ohs-nvq-level-7'],
      url:           'https://www.csttraining.co.uk/ohs-level-6/',
      benefits:      'Degree-level H&S qualification assessed on real work rather than exams. Commonly used as a route toward professional IOSH membership. One of CST Training\'s ELCAS-eligible NVQs.'
    },

    {
      id:            'ohs-nvq-level-7',
      title:         'Level 7 Diploma Occupational Health & Safety',
      category:      'Health & Safety',
      level:         7,
      minExperience: null,
      roles:         ['head of health and safety','hse director','shequ director',
                      'senior h&s manager','group safety manager','ohs','sheq','ehs'],
      audience:      'Senior health and safety professionals operating at a strategic level who want the highest-level H&S qualification.',
      description:   'The Level 7 Diploma in Occupational Health and Safety is a postgraduate-level qualification for senior H&S professionals with strategic responsibility.' + NVQ_PROCESS + NVQ_ENTRY,
      suitedFor:     [
        'Heads of health and safety and HSE directors',
        'Senior practitioners with strategic organisational responsibility',
        'Level 6 holders progressing to the highest level'
      ],
      notSuitedFor:  'Not appropriate without substantial senior H&S experience. Level 6 is the correct level for most practising H&S managers.',
      progression:   [],
      url:           'https://www.csttraining.co.uk/occupational-health-and-safety-level-7/',
      benefits:      'The most senior H&S qualification CST Training offers, recognising strategic health and safety leadership.'
    },

    /* ── BUSINESS NVQs ───────────────────────────────────── */
    {
      id:            'business-nvqs',
      title:         'Business NVQs (Management, Administration & Customer Service)',
      category:      'Leadership & Management',
      level:         3,
      minExperience: null,
      roles:         ['office manager','administrator','team leader','customer service advisor',
                      'operations coordinator','business support','contact centre manager'],
      audience:      'People working in business, administration or customer service roles who want a work-based qualification assessed on the job rather than through study and exams.',
      description:   'CST Training offers business NVQs across management, business administration and customer service, plus an OTHM Level 4 Diploma in Business Management. Like construction NVQs, these are assessed on evidence from your actual role through an online portfolio.',
      suitedFor:     [
        'Administrators and office managers wanting formal recognition',
        'Customer service staff and team leaders',
        'Those who prefer work-based assessment to classroom study',
        'Employers qualifying office-based teams'
      ],
      notSuitedFor:  'Not for those wanting a taught management course with a professional body behind it — ILM or CMI qualifications suit that better. Not for construction site roles.',
      progression:   ['ilm-level-3','cmi-level-3-management'],
      url:           'https://www.csttraining.co.uk/business-nvqs-courses/',
      benefits:      'Work-based qualifications for office and customer-facing roles, assessed on evidence from the job. Covers management, business administration and customer service pathways.'
    }

  ];

  /* ═══════════════════════════════════════════════════════════
     4. MERGE
  ═══════════════════════════════════════════════════════════ */

  const kb = window.CSTKnowledge;

  // Sanitise the existing entries (advisor.js is untouched — it never loads this file)
  kb.qualifications.forEach(sanitiseEntry);

  // Add the NVQs, skipping any id that already exists
  const existing = new Set(kb.qualifications.map(q => q.id));
  nvqs.forEach(q => {
    if (!existing.has(q.id)) kb.qualifications.push(sanitiseEntry(q));
  });

  // Verified NVQ prices. Kept OUT of the qualification entries on purpose, so
  // the sanitiser above never touches them and they reach the prompt only
  // through the NVQ PRICE LIST in assistant.js.
  kb.nvqPrices = NVQ_PRICES.slice();
  kb.nvqPricesChecked = NVQ_PRICES_CHECKED;

  console.log('CSTKnowledge: ' + kb.qualifications.length + ' qualifications loaded, prices stripped, ' +
              kb.nvqPrices.length + ' verified NVQ prices added.');


  }

  /* ── LOAD-ORDER SAFETY ────────────────────────────────────
     knowledge.js replaces window.CSTKnowledge wholesale whenever it
     runs. If it loads after this file, everything added here is lost.
     So instead of applying once, we register the work and let
     assistant.js re-apply it whenever it notices the object has been
     swapped. Applying twice is harmless — every add is guarded.
  ─────────────────────────────────────────────────────────── */
  window.CSTKnowledgeExtensions = window.CSTKnowledgeExtensions || [];
  window.CSTKnowledgeExtensions.push({ name: 'knowledge-nvq', apply: apply });
  if (window.CSTKnowledge && window.CSTKnowledge.qualifications) apply();

})();
