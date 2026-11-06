/* CST Training · Construction NVQs hub (/nvqs/) · v4 · 6 Nov 2026
   Wires the Myself / My team toggle, the card + trade finder and the team builder on the /nvqs/ page.
   The page copy lives in the WordPress page HTML; this file only adds behaviour and loads nvq-hub.css.
   v3: every interaction uses one delegated listener on the document, because another script on the site
   rewrites the page after load and drops listeners attached to individual elements.
   Catalogue: 107 NVQs from WooCommerce (5 Nov 2026). Update prices or URLs in NVQ_CAT below. */
(function () {
  var BASE = (document.currentScript && document.currentScript.src.replace(/[^/]*$/, "")) || "https://glancyl.github.io/cst-advisor/";
  var VER = (document.currentScript && (document.currentScript.src.match(/\?v=\w+/) || [""])[0]) || "";
  if (!document.querySelector('link[data-nvqh]')) {
    var l = document.createElement("link"); l.rel = "stylesheet"; l.href = BASE + "nvq-hub.css" + VER; l.setAttribute("data-nvqh", "1"); document.head.appendChild(l);
  }

  /* Team rates: CONFIRM with Cohan. Leave empty until decided; the builder then says "ask an adviser".
     Proposed in the audit: [{min:3,pct:5},{min:10,pct:10}] */
  var TEAM_BANDS = [];
  var SITE_VISIT = 450, GRANT = 600, PHONE = "020 3488 4472", EMAIL = "sales@csttraining.co.uk";

  var NVQ_CAT = [{"key":"level-2-access-flooring","h1":"Level 2 Access Flooring NVQ","level":2,"family":"trade","core":"Access Flooring","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/access-flooring-level-2/","eurl":"/level-2-access-flooring-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-accessing-operations-rigging","h1":"Level 2 Accessing Operations & Rigging NVQ","level":2,"family":"trade","core":"Accessing Operations & Rigging","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/accessing-operations-and-rigging-level-2/","eurl":"/level-2-accessing-operations-and-rigging-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-acoustic-flooring","h1":"Level 2 Acoustic Flooring NVQ","level":2,"family":"trade","core":"Acoustic Flooring","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/acoustic-flooring-level-2/","eurl":"/level-2-acoustic-flooring-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-architectural-metalwork","h1":"Level 2 Architectural Metalwork NVQ","level":2,"family":"trade","core":"Architectural Metalwork","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/architectural-metalwork-level-2/","eurl":"/level-2-architectural-metalwork-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-bricklaying","h1":"Level 2 Bricklaying NVQ","level":2,"family":"trade","core":"Bricklaying","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/bricklaying-level-2/","eurl":"/level-2-bricklaying-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-brickwork-technicians","h1":"Level 2 Brickwork Technicians NVQ","level":2,"family":"trade","core":"Brickwork Technicians","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/brickwork-technicians-level-2/","eurl":"/level-2-brickwork-technicians-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-carpentry","h1":"Level 2 Carpentry NVQ","level":2,"family":"trade","core":"Carpentry","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/carpentry-level-2/","eurl":"/eligibility-carpentry-nvq/","dur":"4 to 8 weeks"},{"key":"level-2-cladding","h1":"Level 2 Cladding NVQ","level":2,"family":"trade","core":"Cladding","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/cladding-level-2/","eurl":"/level-2-cladding-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-concrete-finishing","h1":"Level 2 Concrete Finishing NVQ","level":2,"family":"trade","core":"Concrete Finishing","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/concrete-finishing-level-2/","eurl":"/level-2-concrete-finishing-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-curtain-wall-installation","h1":"Level 2 Curtain Wall Installation NVQ","level":2,"family":"trade","core":"Curtain Wall Installation","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/curtain-wall-installation-level-2-nvq/","eurl":"/level-2-curtain-wall-installation-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-demolition","h1":"Level 2 Demolition NVQ","level":2,"family":"trade","core":"Demolition","card":"CCDO card (demolition)","price":895,"monthly":90,"url":"/demolition-level-2/","eurl":"/level-2-demolition-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-diamond-drilling","h1":"Level 2 Diamond Drilling NVQ","level":2,"family":"trade","core":"Diamond Drilling","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/diamond-drilling-level-2-nvq/","eurl":"/level-2-diamond-drilling-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-dry-lining-fixing","h1":"Level 2 Dry Lining Fixing NVQ","level":2,"family":"trade","core":"Dry Lining Fixing","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/dry-lining-fixing-level-2/","eurl":"/level-2-dry-lining-fixing-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-dry-lining-boarder","h1":"Level 2 Dry-Lining Boarder NVQ","level":2,"family":"trade","core":"Dry-Lining Boarder","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/dry-lining-boarder-level-2/","eurl":"/level-2-dry-lining-boarder-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-dry-lining-finishing","h1":"Level 2 Dry-Lining Finishing NVQ","level":2,"family":"trade","core":"Dry-Lining Finishing","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/dry-lining-finishing-level-2/","eurl":"/level-2-dry-lining-finishing-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-fenestration-installation","h1":"Level 2 Fenestration Installation NVQ","level":2,"family":"trade","core":"Fenestration Installation","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/fenestration-installation-level-2-nvq/","eurl":"/level-2-fenestration-installation-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-fire-stopping","h1":"Level 2 Fire Stopping NVQ","level":2,"family":"trade","core":"Fire Stopping","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/fire-stopping-level-2-nvq/","eurl":"/level-2-fire-stopping-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-fitted-interiors","h1":"Level 2 Fitted Interiors NVQ","level":2,"family":"trade","core":"Fitted Interiors","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/fitted-interiors-level-2/","eurl":"/level-2-fitted-interiors-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-flat-roof-single-ply","h1":"Level 2 Flat Roof/Single Ply NVQ","level":2,"family":"trade","core":"Flat Roof/Single Ply","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/waterproofing-level-2/","eurl":"/level-2-flat-roof-single-ply-nvq-eligibility-form/","dur":"2 to 4 weeks"},{"key":"level-2-floor-coverings","h1":"Level 2 Floor Coverings NVQ","level":2,"family":"trade","core":"Floor Coverings","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/floor-coverings-level-2/","eurl":"/level-2-floor-coverings-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-formwork","h1":"Level 2 Formwork NVQ","level":2,"family":"trade","core":"Formwork","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/formwork-level-2/","eurl":"/level-2-formwork-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-glass-related-occupations","h1":"Level 2 Glass Related Occupations NVQ","level":2,"family":"trade","core":"Glass Related Occupations","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/glass-related-occupations-level-2-nvq/","eurl":"/level-2-glass-related-occupations-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-glazing","h1":"Level 2 Glazing NVQ","level":2,"family":"trade","core":"Glazing","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/glazing-level-2-nvq/","eurl":"/level-2-glazing-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-groundworks","h1":"Level 2 Groundworks NVQ","level":2,"family":"trade","core":"Groundworks","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/groundworks-level-2/","eurl":"/level-2-groundworks-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-heritage-architectural-joinery","h1":"Level 2 Heritage Architectural Joinery NVQ","level":2,"family":"trade","core":"Heritage Architectural Joinery","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/heritage-architectural-joinery-level-2/","eurl":"/level-2-heritage-architectural-joinery-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-insulation-building-treatments","h1":"Level 2 Insulation & Building Treatments NVQ","level":2,"family":"trade","core":"Insulation & Building Treatments","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/nvq-level-2-insulation-building-treatments/","eurl":"/level-2-insulation-and-building-treatments-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-land-drilling","h1":"Level 2 Land Drilling NVQ","level":2,"family":"trade","core":"Land Drilling","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/land-drilling-level-2/","eurl":"/level-2-land-drilling-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-mastic","h1":"Level 2 Mastic NVQ","level":2,"family":"trade","core":"Mastic","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/mastic-level-2/","eurl":"/level-2-mastic-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-modular-building","h1":"Level 2 Modular Building NVQ","level":2,"family":"trade","core":"Modular Building","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/modular-building-level-2/","eurl":"/level-2-modular-building-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-multi-trade","h1":"Level 2 Multi-Trade NVQ","level":2,"family":"trade","core":"Multi-Trade","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/multitrade-level-2/","eurl":"/level-2-multi-trade-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-painting-decorating","h1":"Level 2 Painting & Decorating NVQ","level":2,"family":"trade","core":"Painting & Decorating","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/painting-decorating-level-2/","eurl":"/level-2-painting-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-piling","h1":"Level 2 Piling NVQ","level":2,"family":"trade","core":"Piling","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/piling-level-2/","eurl":"/level-2-piling-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-plastering","h1":"Level 2 Plastering NVQ","level":2,"family":"trade","core":"Plastering","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/plastering-level-2/","eurl":"/level-2-plastering-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-precast-concrete","h1":"Level 2 Precast Concrete NVQ","level":2,"family":"trade","core":"Precast Concrete","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/precast-concrete-level-2/","eurl":"/level-2-precast-concrete-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-rendering","h1":"Level 2 Rendering NVQ","level":2,"family":"trade","core":"Rendering","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/rendering-level-2/","eurl":"/level-2-rendering-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-road-building","h1":"Level 2 Road Building NVQ","level":2,"family":"trade","core":"Road Building","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/road-building-level-2/","eurl":"/level-2-road-building-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-roofing","h1":"Level 2 Roofing NVQ","level":2,"family":"trade","core":"Roofing","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/roofing-level-2/","eurl":"/level-2-roofing-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-sfs","h1":"Level 2 SFS NVQ","level":2,"family":"trade","core":"SFS","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/sfs-level-2/","eurl":"/level-2-sfs-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-scaffolding","h1":"Level 2 Scaffolding NVQ","level":2,"family":"trade","core":"Scaffolding","card":"CISRS Scaffolder card","price":895,"monthly":90,"url":"/scaffolding-level-2/","eurl":"/level-2-scaffolding-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-shopfitting","h1":"Level 2 Shopfitting NVQ","level":2,"family":"trade","core":"Shopfitting","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/shopfitting-level-2/","eurl":"/level-2-shopfitting-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-site-logistics","h1":"Level 2 Site Logistics NVQ","level":2,"family":"trade","core":"Site Logistics","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/site-logistics-level-2/","eurl":"/level-2-site-logistics-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-solar-panels","h1":"Level 2 Solar Panels NVQ","level":2,"family":"trade","core":"Solar Panels","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/solar-panels-level-2/","eurl":"/level-2-solar-panels-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-specialist-installation-occupations-insulated-enclosures","h1":"Level 2 Specialist Installation Occupations (Insulated Enclosures) NVQ","level":2,"family":"trade","core":"Specialist Installation Occupations (Insulated Enclosures)","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/level-2-specialist-installations-nvq/","eurl":"/level-2-specialist-installation-occupations-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-steel-fixing","h1":"Level 2 Steel Fixing NVQ","level":2,"family":"trade","core":"Steel Fixing","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/steel-fixing-level-2/","eurl":"/level-2-steel-fixing-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-stonemason","h1":"Level 2 Stonemason NVQ","level":2,"family":"trade","core":"Stonemason","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/stonemason-level-2/","eurl":"/level-2-stonemason-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-tiling","h1":"Level 2 Tiling NVQ","level":2,"family":"trade","core":"Tiling","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/tiling-level-2/","eurl":"/level-2-tiling-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-accessing-operations-rigging","h1":"Level 3 Accessing Operations & Rigging NVQ","level":3,"family":"trade","core":"Accessing Operations & Rigging","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/accessing-operations-and-rigging-level-3/","eurl":"/level-3-accessing-operations-and-rigging-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-bricklaying","h1":"Level 3 Bricklaying NVQ","level":3,"family":"trade","core":"Bricklaying","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/bricklaying-level-3/","eurl":"/level-3-bricklaying-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-carpentry","h1":"Level 3 Carpentry NVQ","level":3,"family":"trade","core":"Carpentry","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/carpentry-level-3/","eurl":"/level-3-carpentry-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-cladding","h1":"Level 3 Cladding NVQ","level":3,"family":"trade","core":"Cladding","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/cladding-level-3/","eurl":"/level-3-cladding-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-demolition","h1":"Level 3 Demolition NVQ","level":3,"family":"trade","core":"Demolition","card":"CCDO card (demolition)","price":1100,"monthly":110,"url":"/demolition-level-3/","eurl":"/level-3-demolition-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-engineering-surveying","h1":"Level 3 Engineering Surveying NVQ","level":3,"family":"trade","core":"Engineering Surveying","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/engineering-surveying-level-3/","eurl":"/level-3-engineering-surveying-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-fenestration-installation","h1":"Level 3 Fenestration Installation NVQ","level":3,"family":"trade","core":"Fenestration Installation","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/fenestration-installation-level-3-nvq/","eurl":"/level-3-fenestration-installation-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-fenestration-surveying","h1":"Level 3 Fenestration Surveying NVQ","level":3,"family":"trade","core":"Fenestration Surveying","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/fenestration-surveying-level-3-nvq/","eurl":"/level-3-fenestration-surveying-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-floor-coverings","h1":"Level 3 Floor Coverings NVQ","level":3,"family":"trade","core":"Floor Coverings","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/floor-coverings-level-3/","eurl":"/level-3-floor-coverings-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-formwork","h1":"Level 3 Formwork NVQ","level":3,"family":"trade","core":"Formwork","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/formwork-level-3/","eurl":"/level-3-formwork-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-glazing","h1":"Level 3 Glazing NVQ","level":3,"family":"trade","core":"Glazing","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/glazing-level-3-nvq/","eurl":"/level-3-glazing-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-insulation-building-treatments","h1":"Level 3 Insulation & Building Treatments NVQ","level":3,"family":"trade","core":"Insulation & Building Treatments","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/level-3-insulation/","eurl":"/level-3-insulation-and-building-treatments-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-interior-systems","h1":"Level 3 Interior Systems NVQ","level":3,"family":"trade","core":"Interior Systems","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/interior-systems-level-3/","eurl":"/level-3-interior-systems-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-painting-decorating","h1":"Level 3 Painting & Decorating NVQ","level":3,"family":"trade","core":"Painting & Decorating","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/painting-decorating-level-3/","eurl":"/level-3-painting-and-decorating-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-plastering","h1":"Level 3 Plastering NVQ","level":3,"family":"trade","core":"Plastering","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/plastering-level-3/","eurl":"/level-3-plastering-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-roofing","h1":"Level 3 Roofing NVQ","level":3,"family":"trade","core":"Roofing","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/roofing-level-3/","eurl":"/level-3-roofing-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-scaffolding","h1":"Level 3 Scaffolding NVQ","level":3,"family":"trade","core":"Scaffolding","card":"CISRS Advanced Scaffolder card","price":1100,"monthly":110,"url":"/scaffolding-level-3/","eurl":"/level-3-scaffolding-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-shopfitting","h1":"Level 3 Shopfitting NVQ","level":3,"family":"trade","core":"Shopfitting","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/shopfitting-level-3/","eurl":"/level-3-shopfitting-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-steel-fixing","h1":"Level 3 Steel Fixing NVQ","level":3,"family":"trade","core":"Steel Fixing","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/steel-fixing-level-3/","eurl":"/level-3-steel-fixing-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-tiling","h1":"Level 3 Tiling NVQ","level":3,"family":"trade","core":"Tiling","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/tiling-level-3/","eurl":"/level-3-tiling-nvq-eligibility-form/","dur":"6 to 10 weeks"},{"key":"level-2-180-degree-excavator","h1":"Level 2 180 Degree Excavator NVQ","level":2,"family":"plant","core":"180 Degree Excavator","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/180-excavator-level-2-nvq/","eurl":"/level-2-180-degree-excavator-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-360-excavator","h1":"Level 2 360 Excavator NVQ","level":2,"family":"plant","core":"360 Excavator","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/360-excavator-level-2-nvq/","eurl":"/level-2-360-excavator-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-adt","h1":"Level 2 ADT NVQ","level":2,"family":"plant","core":"ADT","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/adt-level-2-nvq/","eurl":"/level-2-adt-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-concrete-pump","h1":"Level 2 Concrete Pump NVQ","level":2,"family":"plant","core":"Concrete Pump","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/concrete-pump-level-2-nvq/","eurl":"/level-2-concrete-pump-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-forklift","h1":"Level 2 Forklift NVQ","level":2,"family":"plant","core":"Forklift","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/forklift-level-2/","eurl":"/level-2-forklift-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-forward-tipping-dumper","h1":"Level 2 Forward Tipping Dumper NVQ","level":2,"family":"plant","core":"Forward Tipping Dumper","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/forward-tipping-dumper-level-2-nvq/","eurl":"/level-2-forward-tipping-dumper-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-hoist-operator","h1":"Level 2 Hoist Operator NVQ","level":2,"family":"plant","core":"Hoist Operator","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/hoist-operator-level-2-nvq/","eurl":"/level-2-hoist-operator-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-loading-shovel","h1":"Level 2 Loading Shovel NVQ","level":2,"family":"plant","core":"Loading Shovel","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/loading-shovel-level-2-nvq/","eurl":"/level-2-loading-shovel-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-lorry-loaders","h1":"Level 2 Lorry Loaders NVQ","level":2,"family":"plant","core":"Lorry Loaders","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/lorry-loaders-level-2-nvq/","eurl":"/level-2-lorry-loaders-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-mewp","h1":"Level 2 MEWP NVQ","level":2,"family":"plant","core":"MEWP","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/level-2-mewp-nvq/","eurl":"/level-2-mewp-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-plant-installations","h1":"Level 2 Plant Installations NVQ","level":2,"family":"plant","core":"Plant Installations","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/plant-installations-level-2-nvq/","eurl":"/level-2-plant-installations-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-plant-maintenance","h1":"Level 2 Plant Maintenance NVQ","level":2,"family":"plant","core":"Plant Maintenance","card":"Blue CSCS Skilled Worker card","price":895,"monthly":90,"url":"/plant-maintenance-level-2-nvq/","eurl":"/level-2-plant-maintenance-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-rear-tipping-dumper","h1":"Level 2 Rear Tipping Dumper NVQ","level":2,"family":"plant","core":"Rear Tipping Dumper","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/rear-tipping-dumper-level-2-nvq/","eurl":"/level-2-rear-tipping-dumper-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-ride-on-roller","h1":"Level 2 Ride-On Roller NVQ","level":2,"family":"plant","core":"Ride-On Roller","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/ride-on-roller-level-2-nvq/","eurl":"/level-2-ride-on-roller-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-skid-steer-loaders","h1":"Level 2 Skid Steer Loaders NVQ","level":2,"family":"plant","core":"Skid Steer Loaders","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/skid-steer-loaders-level-2-nvq/","eurl":"/level-2-skid-steer-loaders-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-static-concrete-boom","h1":"Level 2 Static Concrete Boom NVQ","level":2,"family":"plant","core":"Static Concrete Boom","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/static-concrete-boom-level-2-nvq/","eurl":"/level-2-static-concrete-boom-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-telehandler","h1":"Level 2 Telehandler NVQ","level":2,"family":"plant","core":"Telehandler","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/telehandler-level-2-nvq/","eurl":"/level-2-telehandler-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-tractor","h1":"Level 2 Tractor NVQ","level":2,"family":"plant","core":"Tractor","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/tractor-level-2-nvq/","eurl":"/level-2-tractor-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-traffic-marshall","h1":"Level 2 Traffic Marshall NVQ","level":2,"family":"plant","core":"Traffic Marshall","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/traffic-marshall-level-2-nvq/","eurl":"/level-2-traffic-marshall-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-plant-installations","h1":"Level 3 Plant Installations NVQ","level":3,"family":"plant","core":"Plant Installations","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/plant-installations-level-3-nvq/","eurl":"/level-3-plant-installations-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-plant-maintenance","h1":"Level 3 Plant Maintenance NVQ","level":3,"family":"plant","core":"Plant Maintenance","card":"Gold CSCS Advanced Craft card","price":1100,"monthly":110,"url":"/plant-maintenance-level-3/","eurl":"/level-3-plant-maintenance-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-crawler-crane","h1":"Level 2 Crawler Crane NVQ","level":2,"family":"cranes","core":"Crawler Crane","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/crawler-crane-level-2-nvq/","eurl":"/level-2-crawler-crane-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-gantry-crane","h1":"Level 2 Gantry Crane NVQ","level":2,"family":"cranes","core":"Gantry Crane","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/gantry-crane-level-2-nvq/","eurl":"/level-2-gantry-crane-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-mobile-crane","h1":"Level 2 Mobile Crane NVQ","level":2,"family":"cranes","core":"Mobile Crane","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/mobile-crane/","eurl":"/level-2-mobile-crane-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-pedestrian-crane","h1":"Level 2 Pedestrian Crane NVQ","level":2,"family":"cranes","core":"Pedestrian Crane","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/pedestrian-crane-level-2-nvq/","eurl":"/level-2-pedestrian-crane-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-slinger-signaller","h1":"Level 2 Slinger Signaller NVQ","level":2,"family":"cranes","core":"Slinger Signaller","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/slinger-signaller-level-2-nvq/","eurl":"/level-2-slinger-signaller-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-spider-crane","h1":"Level 2 Spider Crane NVQ","level":2,"family":"cranes","core":"Spider Crane","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/spider-crane-level-2-nvq/","eurl":"/level-2-spider-crane-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-2-tower-crane","h1":"Level 2 Tower Crane NVQ","level":2,"family":"cranes","core":"Tower Crane","card":"Blue CPCS or NPORS Competent Operator card","price":895,"monthly":90,"url":"/tower-crane-level-2-nvq/","eurl":"/level-2-tower-crane-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-4-crane-supervisor","h1":"Level 4 Crane Supervisor NVQ","level":4,"family":"cranes","core":"Crane Supervisor","card":"Blue CPCS card for the supervisory category","price":1400,"monthly":140,"url":"/crane-supervisor-level-4-nvq/","eurl":"/level-4-crane-supervisor-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-5-appointed-person","h1":"Level 5 Appointed Person NVQ","level":5,"family":"cranes","core":"Appointed Person","card":"Blue CPCS card for the supervisory category","price":1450,"monthly":145,"url":"/appointed-person-level-5-nvq/","eurl":"/level-5-appointed-person-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-construction-contracting-operations","h1":"Level 3 Construction Contracting Operations NVQ","level":3,"family":"supervision","core":"Construction Contracting Operations","card":"Gold CSCS Supervisor card","price":1100,"monthly":110,"url":"/cco-level-3/","eurl":"/level-3-cco-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-3-occupational-work-supervisor","h1":"Level 3 Occupational Work Supervision NVQ","level":3,"family":"supervision","core":"Occupational Work Supervisor","card":"Gold CSCS Supervisor card","price":1100,"monthly":110,"url":"/occupational-work-supervisor-level-3-nvq/","eurl":"/level-3-ows-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-4-site-supervision","h1":"Level 4 Construction Site Supervision NVQ","level":4,"family":"supervision","core":"Site Supervision","card":"Gold CSCS Supervisor card","price":1400,"monthly":140,"url":"/site-supervision-level-4/","eurl":"/supervision-nvq-eligibility-form/","dur":"4 to 8 weeks"},{"key":"level-6-construction-management","h1":"Level 6 Construction Site Management NVQ","level":6,"family":"management","core":"Construction Management","card":"Black CSCS Manager card","price":1750,"monthly":175,"url":"/construction-site-management-level-6/","eurl":"/level-6-management-eligibility-form/","dur":"8 to 12 weeks"},{"key":"level-6-contracting-operations-general","h1":"Level 6 Construction Contracting Operations Management NVQ (General)","level":6,"family":"management","core":"Contracting Operations - General","card":"Black CSCS Manager card","price":1750,"monthly":175,"url":"/level-6-cco/","eurl":"/level-6-cco-nvq-eligibility-form/","dur":"8 to 12 weeks"},{"key":"level-6-contracting-operations-specialist","h1":"Level 6 Construction Contracting Operations Management NVQ (Specialist)","level":6,"family":"management","core":"Contracting Operations - Specialist","card":"Black CSCS Manager card","price":1750,"monthly":175,"url":"/construction-contracting-operations-level-6-nvq-specialist/","eurl":"/level-6-cco-nvq-specialist-eligibility-form/","dur":"8 to 12 weeks"},{"key":"level-6-senior-site-inspection","h1":"Level 6 Senior Site Inspection NVQ","level":6,"family":"management","core":"Senior Site Inspection","card":"Black CSCS Manager card","price":1800,"monthly":180,"url":"/senior-site-inspection-level-6-nvq/","eurl":"/level-6-senior-site-inspection-nvq-eligibility-form/","dur":"8 to 12 weeks"},{"key":"level-7-construction-management","h1":"Level 7 Construction Senior Management NVQ","level":7,"family":"management","core":"Construction Management","card":"Black CSCS Manager card","price":1995,"monthly":200,"url":"/senior-construction-management-level-7-nvq/","eurl":"/level-7-construction-management-nvq-eligibility-form/","dur":"8 to 12 weeks"},{"key":"level-3-ohs","h1":"Level 3 Occupational Health and Safety NVQ","level":3,"family":"ohs","core":"OHS","card":null,"price":null,"monthly":null,"url":"/ohs-level-3/","eurl":null,"dur":"4 to 8 weeks"},{"key":"level-6-ohs","h1":"Level 6 Occupational Health and Safety NVQ","level":6,"family":"ohs","core":"OHS","card":null,"price":1750,"monthly":175,"url":"/ohs-level-6/","eurl":"/level-6-ohs-nvq-eligibility-form/","dur":"8 to 12 weeks"},{"key":"level-7-ohs-diploma","h1":"Level 7 Diploma in Strategic Health and Safety Leadership and Management","level":7,"family":"ohs","core":"OHS Diploma","card":null,"price":1995,"monthly":200,"url":"/occupational-health-and-safety-level-7/","eurl":"/level-7-ohs-nvq-eligibility-form/","dur":"8 to 16 weeks"}];

  var CARDS = [
    { id: "blue", label: "Blue CSCS", sub: "Skilled Worker", colour: "#1f5fbf", levels: [2], fams: ["trade", "plant"], note: "a Level 2 NVQ in your trade" },
    { id: "gold", label: "Gold CSCS", sub: "Advanced Craft or Supervisor", colour: "#c9a227", levels: [3, 4], fams: ["trade", "supervision", "plant"], note: "Level 3 in your trade, or a supervisor NVQ" },
    { id: "black", label: "Black CSCS", sub: "Manager", colour: "#111111", levels: [6, 7], fams: ["management"], note: "a Level 6 or 7 management NVQ" },
    { id: "cpcs", label: "Blue CPCS or NPORS", sub: "Competent Operator", colour: "#0b7a75", levels: [2, 4, 5], fams: ["plant", "cranes"], note: "a Level 2 NVQ for your machine, or a lifting NVQ" },
    { id: "cisrs", label: "CISRS", sub: "Scaffolder", colour: "#6b4fa0", levels: [2, 3], fams: ["trade"], note: "a scaffolding NVQ" },
    { id: "hs", label: "Health & safety", sub: "No card needed", colour: "#b3261e", levels: [3, 6, 7], fams: ["ohs"], note: "an occupational health and safety NVQ" },
    { id: "unsure", label: "Not sure", sub: "", colour: "#6B7394", levels: [2, 3, 4, 5, 6, 7], fams: ["trade", "plant", "cranes", "supervision", "management", "ohs"], note: "We'll match you from your job" }
  ];

  /* Words people type, matched to the catalogue `core`. Qualification names are matched too. */
  var ALIASES = {
    "Carpentry": ["chippy", "chippie", "carpenter", "joiner", "joinery", "first fix", "second fix", "site carpenter", "kitchen fitter"],
    "Bricklaying": ["brickie", "brickies", "bricky", "bricklayer", "brick layer", "blocklayer", "block layer", "brickwork"],
    "Painting & Decorating": ["painter", "decorator", "painting", "decorating", "p&d"],
    "Groundworks": ["groundworker", "ground worker", "drainage", "drain layer", "pipelayer", "kerbs", "civils", "general operative", "concrete gang"],
    "Plastering": ["plasterer", "spread", "skimming", "skimmer"],
    "Dry Lining Fixing": ["dryliner", "dry liner", "drylining", "partitions", "ceiling fixer", "metal stud", "boarder", "taper", "jointer"],
    "Tiling": ["tiler", "wall tiler", "floor tiler"],
    "Roofing": ["roofer", "slater", "roof tiler", "slate"],
    "Flat Roof/Single Ply": ["flat roofer", "single ply", "waterproofing", "waterproofer", "felt roofer", "asphalt roofer"],
    "Scaffolding": ["scaffolder", "scaff", "scaffolding"],
    "Steel Fixing": ["steel fixer", "steelfixer", "rebar", "reinforcement fixer"],
    "Formwork": ["formworker", "shuttering", "shutterer", "shuttering carpenter"],
    "Fenestration Installation": ["window fitter", "door fitter", "window installer", "upvc fitter", "glazing fitter"],
    "Glazing": ["glazier"],
    "Floor Coverings": ["floor layer", "flooring", "carpet fitter", "vinyl fitter", "floorer"],
    "Fire Stopping": ["fire stopper", "firestopping", "passive fire", "fire protection"],
    "Cladding": ["cladder", "rainscreen", "cladding fitter"],
    "Demolition": ["demolition operative", "demo", "strip out"],
    "Stonemason": ["mason", "stonemasonry", "stone mason"],
    "Shopfitting": ["shopfitter", "shop fitter"],
    "Multi-Trade": ["handyman", "maintenance operative", "multi trade", "multitrade", "property maintenance"],
    "Plant Maintenance": ["plant fitter", "plant mechanic", "fitter mechanic", "plant engineer"],
    "360 Excavator": ["digger", "digger driver", "excavator", "360", "machine driver", "plant operator"],
    "180 Degree Excavator": ["backhoe", "jcb", "180", "back actor"],
    "Forward Tipping Dumper": ["dumper", "dumper driver", "forward tipping"],
    "ADT": ["articulated dump truck", "moxy", "dump truck"],
    "Telehandler": ["telehandler", "telly handler", "teleporter", "loadall", "manitou"],
    "Ride-On Roller": ["roller", "roller driver"],
    "Forklift": ["forklift", "fork lift", "fork truck"],
    "Traffic Marshall": ["banksman", "traffic marshal", "vehicle marshal", "gateman"],
    "MEWP": ["cherry picker", "boom lift", "scissor lift", "mewp", "ipaf"],
    "Hoist Operator": ["hoist", "hoist driver"],
    "Slinger Signaller": ["slinger", "signaller", "slinger signaller", "crane banksman", "lifting operative"],
    "Tower Crane": ["tower crane", "crane driver", "crane operator"],
    "Mobile Crane": ["mobile crane"],
    "Crane Supervisor": ["lift supervisor", "lifting supervisor", "crane supervisor"],
    "Appointed Person": ["appointed person", "lift planner", "lifting coordinator"],
    "Occupational Work Supervisor": ["supervisor", "foreman", "chargehand", "charge hand", "ganger", "gang leader", "working foreman", "team leader"],
    "Site Supervision": ["site supervisor", "assistant site manager", "asm", "general foreman"],
    "Construction Contracting Operations": ["quantity surveyor", "qs", "estimator", "site engineer", "buyer", "planner"],
    "Construction Management": ["site manager", "construction manager", "senior manager", "director"],
    "Contracting Operations - General": ["contracts manager", "project manager", "commercial manager"],
    "OHS": ["health and safety", "h&s", "safety advisor", "safety adviser", "hse manager", "sheq", "safety officer", "health and safety manager"],
    "OHS Diploma": ["head of health and safety", "health and safety director", "hse director"],
    "Senior Site Inspection": ["clerk of works", "site inspector", "quality inspector"]
  };
  var NO_NVQ = { words: ["labourer", "labouring", "new to construction", "apprentice", "trainee", "student", "green card"],
    msg: "NVQs check skills you already use at work, so they're not the starting point if you're new to the industry. The route to a Green CSCS Labourer card is the Level 1 Health &amp; Safety in a Construction Environment course. Come back for an NVQ once you're working in a trade." };

  /* ---------- helpers ---------- */
  var BY = {}; NVQ_CAT.forEach(function (c) { BY[c.key] = c; });
  var $ = function (id) { return document.getElementById(id); };
  if (!document.querySelector(".nvqh")) return;
  function money(n) { return n == null ? "" : "£" + Math.round(n).toLocaleString("en-GB"); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }
  function norm(s) { return String(s || "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim(); }
  function lev(a, b) { var m = a.length, n = b.length, d = [], i, j; if (!m || !n) return Math.max(m, n);
    for (i = 0; i <= m; i++) d[i] = [i]; for (j = 1; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; }
  function coreList(core) { return NVQ_CAT.filter(function (c) { return c.core === core; }).sort(function (a, b) { return a.level - b.level; }); }
  function coreLabel(core) { var c = coreList(core)[0]; return c ? c.h1.replace(/^Level \d /, "").replace(/ NVQ.*$/, "").replace(/\(.*\)/, "").trim() : core; }
  function track(ev, data) { try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: ev }, data || {})); } catch (e) {} }

  var CORES = []; NVQ_CAT.forEach(function (c) { if (CORES.indexOf(c.core) < 0) CORES.push(c.core); });
  var TERMS = CORES.map(function (core) { return { core: core, terms: [core, coreLabel(core)].concat(ALIASES[core] || []).map(norm) }; });

  function matchTrade(q) {
    var n = norm(q); if (n.length < 2) return [];
    var words = n.split(" ");
    var out = TERMS.map(function (o) {
      var best = 0;
      o.terms.forEach(function (tm) {
        if (tm === n) best = Math.max(best, 100);
        else if (n.length >= 3 && (tm.indexOf(n) === 0 || (n.indexOf(tm) >= 0 && tm.length >= 3))) best = Math.max(best, 70 + Math.min(tm.length, 20));
        else if (n.length >= 3 && tm.indexOf(n) >= 0) best = Math.max(best, 60);
        var tw = tm.split(" ");
        var hit = words.filter(function (w) { return w.length > 2 && tw.some(function (x) { return x === w || (w.length > 4 && lev(w, x) <= 1); }); }).length;
        if (hit) best = Math.max(best, 40 + 40 * hit / Math.max(tw.length, words.length));
        if (n.length >= 4 && tw.length === 1) { var sim = 1 - lev(n, tm) / Math.max(n.length, tm.length); if (sim >= 0.7) best = Math.max(best, 55 * sim); }
      });
      return { core: o.core, score: best };
    }).filter(function (x) { return x.score >= 35; }).sort(function (a, b) { return b.score - a.score; });
    return out.filter(function (x) { return x.score >= out[0].score * 0.65; }).slice(0, 4);
  }
  function noNVQ(q) { var n = norm(q); return NO_NVQ.words.some(function (w) { return n.indexOf(w) >= 0; }); }

  /* card + trade -> qualification(s) */
  function recommend(cardId, core) {
    var card = CARDS.filter(function (c) { return c.id === cardId; })[0] || CARDS[CARDS.length - 1];
    var list = coreList(core), note = "", fam = list.length ? list[0].family : "";
    var pick = list.filter(function (c) { return card.levels.indexOf(c.level) >= 0 && card.fams.indexOf(c.family) >= 0; });
    if (cardId === "cisrs" && core !== "Scaffolding") {
      note = "CISRS cards are for scaffolders. For your trade the card is CSCS, so here's the NVQ for your job."; pick = list.slice(0, 1);
    } else if (!pick.length && list.length) {
      if (cardId === "black") { pick = [BY["level-6-construction-management"]]; note = "A Black card needs a management NVQ. If you run a site, it's Level 6 Site Management. If you're on the tools, the Gold card through Level 3 is your next step."; var l3 = list.filter(function (c) { return c.level === 3; })[0]; if (l3) pick.push(l3); }
      else if (cardId === "gold" && fam !== "supervision") { pick = [BY["level-3-occupational-work-supervisor"]]; note = "There isn't a Level 3 " + coreLabel(core) + " NVQ, so the Gold card comes through supervising: Level 3 Occupational Work Supervision if you run a gang or a job."; }
      else if (cardId === "blue" && (fam === "supervision" || fam === "management")) { pick = list; note = "Supervisor and manager NVQs lead to the Gold and Black cards rather than Blue, so here's the one for your job."; }
      else if (cardId === "cpcs" && fam !== "plant" && fam !== "cranes") { pick = list.filter(function (c) { return c.level === 2; }).slice(0, 1); if (!pick.length) pick = list.slice(0, 1); note = "CPCS and NPORS cards are for plant and lifting. For your trade the card is CSCS, so here's the NVQ."; }
      else if (cardId === "hs") { pick = [BY["level-6-ohs"]]; note = "Health and safety NVQs are for people whose job is health and safety. If that's you, Level 6 is the usual one."; }
      else pick = list;
    }
    if (cardId === "unsure" || !cardId) pick = list.slice(0, 2);
    return { pick: pick.filter(Boolean).slice(0, 2), note: note };
  }

  /* ---------- Myself / My team ---------- */
  var who = /[?&]who=team\b/.test(location.search) || location.hash === "#team" ? "team" : "self";
  function setWho(w) {
    who = w; document.body.setAttribute("data-nvqh-who", w);
    document.querySelectorAll(".nvqh-tog button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-who") === w)); });
    if (w === "team") drawTeam();
  }

  /* ---------- shared trade input ---------- */
  function suggest(inp) {
    var box = $(inp.id + "-s"); if (!box) return;
    var q = inp.value;
    if (noNVQ(q)) { box.innerHTML = '<div class="none">' + NO_NVQ.msg + "</div>"; return; }
    var m = matchTrade(q);
    box.innerHTML = m.length ? m.map(function (x, i) { return '<button type="button" role="option" data-for="' + inp.id + '" data-core="' + esc(x.core) + '">' + esc(coreLabel(x.core)) + (i === 0 ? "<em>Closest match</em>" : "") + "</button>"; }).join("")
      : q.trim().length > 2 ? '<div class="none">No close match. Try another word, or call us on <a href="tel:' + PHONE.replace(/\s/g, "") + '">' + PHONE + "</a>.</div>" : "";
  }
  function pickTrade(inputId, core) {
    var inp = $(inputId), box = $(inputId + "-s");
    if (inp) inp.value = coreLabel(core); if (box) box.innerHTML = "";
    track("nvqh_trade", { core: core });
    if (inputId === "nvqh-q") { st.core = core; showReco(); return; }
    var i = +inputId.replace("nvqh-tt", ""), r = team[i]; if (!r) return;
    r.core = core; r.key = coreList(core)[0].key; drawTeam();
  }
  function isTradeInput(el) { return el && el.id && (el.id === "nvqh-q" || /^nvqh-tt\d+$/.test(el.id)); }
  document.addEventListener("input", function (e) { if (isTradeInput(e.target)) suggest(e.target); });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" || !isTradeInput(e.target)) return;
    e.preventDefault(); var f = $(e.target.id + "-s") && $(e.target.id + "-s").querySelector("button"); if (f) pickTrade(e.target.id, f.getAttribute("data-core"));
  });
  document.addEventListener("change", function (e) {
    var m = e.target.id && e.target.id.match(/^nvqh-tl(\d+)$/); if (!m) return;
    var r = team[+m[1]]; if (r) { r.key = e.target.value; teamSum(); }
  });

  /* ---------- Enquire Now: carry the chosen NVQ into the enquiry section ---------- */
  /* The HubSpot form's hidden field which_nvq_are_you_interested_in_ gets the chosen NVQ.
     Buttons with an empty data-enq keep whatever was chosen in the finder, or "Not sure yet". */
  var interest = "";
  function applyInterest() {
    var f = window.nvqhForm, v = interest || "Not sure yet";
    if (!f || !f.querySelector) return;
    var el = f.querySelector('[name="which_nvq_are_you_interested_in_"]'); if (!el) return;
    el.value = v;
    ["input", "change"].forEach(function (t) { try { el.dispatchEvent(new Event(t, { bubbles: true })); } catch (e) {} });
    if (window.jQuery) try { window.jQuery(el).val(v).change(); } catch (e) {}
  }
  window.nvqhApplyInterest = applyInterest;
  function setEnquiry(text) {
    if (text) interest = text;
    var el = $("nvqh-chosen");
    if (el) { if (interest) { el.textContent = "You're asking about: " + interest; el.hidden = false; } else el.hidden = true; }
    applyInterest();
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-enq]"); if (!a) return;
    setEnquiry(a.getAttribute("data-enq")); track("nvqh_enquire", { nvq: a.getAttribute("data-enq") });
  });

  /* ---------- finder (Myself) ---------- */
  var st = { card: null, core: null };
  function renderCards() {
    var el = $("nvqh-cards"); if (!el) return;
    el.innerHTML = CARDS.map(function (c) { return '<button type="button" role="radio" aria-checked="' + (st.card === c.id) + '" class="nvqh-chip" data-card="' + c.id + '"><i style="background:' + c.colour + '"></i>' + esc(c.label) + "</button>"; }).join("");
  }
  function pickCard(id) {
    st.card = id;
    document.querySelectorAll("#nvqh-cards .nvqh-chip").forEach(function (x) { x.setAttribute("aria-checked", String(x.getAttribute("data-card") === id)); });
    var c = CARDS.filter(function (x) { return x.id === id; })[0], note = $("nvqh-cardnote");
    if (note) note.innerHTML = c.id === "unsure" ? "<b>No problem.</b> Tell us your job and we'll match you." : "<b>" + esc(c.label) + (c.sub ? " (" + esc(c.sub) + ")" : "") + ":</b> usually " + esc(c.note) + ".";
    showReco(); track("nvqh_card", { card: id });
    if (!st.core && $("nvqh-q")) $("nvqh-q").focus();
  }
  renderCards();

  function pickHTML(c, i) {
    var price = c.price ? money(c.price) + " + VAT, or 10 × " + money(c.monthly) + " + VAT" : "Price on request";
    return '<div class="nvqh-pick' + (i ? " alt" : "") + '"><div><span class="tag">' + (i ? "Also consider" : "You need") + "</span><h4>" + esc(c.h1) + '</h4><div class="meta">' +
      (c.card ? "Leads to the " + esc(c.card) + ". " : "") + "Typically " + esc(c.dur) + '. <span class="cost">' + price + "</span></div></div>" +
      '<div class="btns"><a class="nvqh-btn pri" href="' + c.url + '">More Info</a><a class="nvqh-btn out" href="#enquire" data-enq="' + esc(c.h1) + '">Enquire Now</a></div></div>';
  }
  function showReco() {
    var box = $("nvqh-reco"); if (!box) return;
    if (!st.core) { box.innerHTML = st.card ? '<p class="small muted">Now type your trade or job above.</p>' : ""; return; }
    var r = recommend(st.card, st.core);
    box.innerHTML = (r.note ? '<p class="why">' + r.note + "</p>" : "") + r.pick.map(pickHTML).join("") +
      (st.card ? "" : '<p class="small muted">Pick the card you\'re after above to narrow this down.</p>');
    if (r.pick[0]) interest = r.pick[0].h1;
    track("nvqh_reco", { card: st.card || "none", core: st.core, keys: r.pick.map(function (c) { return c.key; }).join(",") });
  }

  /* ---------- team builder (My team) ---------- */
  var team = [{ core: null, key: null, n: 1 }], drawn = false;
  function teamPct(n) { var b = TEAM_BANDS.slice().sort(function (a, b) { return b.min - a.min; }).filter(function (x) { return n >= x.min; })[0]; return b ? b.pct : 0; }
  function drawTeam() {
    var wrap = $("nvqh-trows"); if (!wrap) return; drawn = true;
    wrap.innerHTML = team.map(function (r, i) {
      var opts = r.core ? coreList(r.core).map(function (c) { return '<option value="' + c.key + '"' + (c.key === r.key ? " selected" : "") + ">Level " + c.level + (c.card ? ", " + esc(c.card) : "") + "</option>"; }).join("") : "<option>Type a trade first</option>";
      return '<div class="nvqh-trow"><div class="nvqh-field"><label for="nvqh-tt' + i + '">Trade or job</label><input type="text" id="nvqh-tt' + i + '" autocomplete="off" value="' + (r.core ? esc(coreLabel(r.core)) : "") + '" placeholder="e.g. groundworker"><div class="nvqh-sugg" id="nvqh-tt' + i + '-s"></div></div>' +
        '<div class="nvqh-field"><label for="nvqh-tl' + i + '">NVQ</label><select id="nvqh-tl' + i + '"' + (r.core ? "" : " disabled") + ">" + opts + "</select></div>" +
        '<div class="nvqh-field"><label>People</label><div class="nvqh-seats"><button type="button" data-i="' + i + '" data-d="-1" aria-label="Fewer people">−</button><span>' + r.n + '</span><button type="button" data-i="' + i + '" data-d="1" aria-label="More people">+</button></div></div>' +
        (team.length > 1 ? '<button type="button" class="nvqh-x" data-x="' + i + '" aria-label="Remove this trade">×</button>' : "<span></span>") + "</div>";
    }).join("");
    teamSum();
  }
  function teamSum() {
    var box = $("nvqh-tsum"), rows = team.filter(function (r) { return r.key; });
    if (!rows.length) { box.innerHTML = ""; return; }
    var n = 0, list = 0, grant = 0, priced = true;
    rows.forEach(function (r) { var c = BY[r.key]; n += r.n; if (c.price) list += c.price * r.n; else priced = false; if (c.level <= 6 && c.family !== "ohs") grant += GRANT * r.n; });
    var pct = teamPct(n), net = list * (1 - pct / 100);
    var lines = rows.map(function (r) { var c = BY[r.key]; return r.n + " × " + c.h1 + (c.price ? " at " + money(c.price) : " (price on request)"); });
    var rateLine = pct ? "Includes your " + pct + "% team rate." : n >= 3 ? "Team rates apply from 3 learners, so ask an adviser for yours." : "Team rates apply from 3 learners.";
    var body = encodeURIComponent("Hello CST Training,\n\nPlease price the following NVQs for my team:\n\n" + lines.join("\n") + "\n\nTotal learners: " + n + "\nCompany:\nPhone:\n");
    box.innerHTML = '<div class="nvqh-tsum"><div class="total">' + n + " learner" + (n > 1 ? "s" : "") + ", " + money(net) + " + VAT" + (priced ? "" : " plus items on request") + "</div>" +
      "<ul>" + lines.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul><p class=\"small\">" + rateLine + "</p>" +
      (grant ? '<div class="grant"><b>CITB grant back: up to ' + money(grant) + "</b><br><span class=\"small\">£600 per achievement at Levels 2 to 6, if you're CITB-registered and up to date with levy returns.</span></div>" : "") +
      '<a class="nvqh-btn pri" href="#enquire" data-enq="' + esc(n + " learners: " + rows.map(function (r) { return r.n + " × " + BY[r.key].h1; }).join(", ")) + '">Enquire Now</a> ' +
      '<a class="nvqh-btn out" href="mailto:' + EMAIL + "?subject=" + encodeURIComponent("NVQ team quote (" + n + " learners)") + "&body=" + body + '">Email the list</a></div>';
  }

  /* ---------- one click listener for everything ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target : null; if (!t) return;
    var b;
    if ((b = t.closest(".nvqh-tog button[data-who]"))) { setWho(b.getAttribute("data-who")); track("nvqh_toggle", { who: who }); return; }
    if ((b = t.closest("#nvqh-cards .nvqh-chip"))) { pickCard(b.getAttribute("data-card")); return; }
    if ((b = t.closest(".nvqh-sugg button[data-core]"))) { pickTrade(b.getAttribute("data-for"), b.getAttribute("data-core")); return; }
    if ((b = t.closest(".nvqh-seats button[data-i]"))) { var r = team[+b.getAttribute("data-i")]; if (r) { r.n = Math.max(1, Math.min(200, r.n + +b.getAttribute("data-d"))); drawTeam(); } return; }
    if ((b = t.closest(".nvqh-x[data-x]"))) { team.splice(+b.getAttribute("data-x"), 1); drawTeam(); return; }
    if ((b = t.closest("#nvqh-tadd"))) { team.push({ core: null, key: null, n: 1 }); drawTeam(); var inp = $("nvqh-tt" + (team.length - 1)); if (inp) inp.focus(); return; }
  });

  /* If the page is rewritten after load, put the card chips and team rows back. */
  setInterval(function () {
    var c = $("nvqh-cards"); if (c && !c.querySelector(".nvqh-chip")) renderCards();
    var w = $("nvqh-trows"); if (w && !w.querySelector(".nvqh-trow")) drawTeam();
    if (document.body.getAttribute("data-nvqh-who") !== who) setWho(who);
  }, 1500);

  setWho(who);
  if (!drawn) drawTeam();
})();
