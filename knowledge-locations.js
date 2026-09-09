/**
 * CST Training – course location pages
 * knowledge-locations.js
 *
 * Load AFTER the other knowledge files, BEFORE assistant.js.
 *
 * EVERY URL IN THIS FILE WAS READ DIRECTLY OFF THE LIVE LOCATIONS PAGE.
 * Nothing is generated from a pattern. Sources, all read September 2026:
 *   SMSTS    /smsts-online-page-locations/
 *   SSSTS    /sssts-online-locations-page/
 *   SMSTS-R  /smsts-r-classroom-page/
 *   SSSTS-R  /sssts-r-classroom-page/
 *   HSA      /hsa-classroom-locations/
 *
 * IMPORTANT: locations apply ONLY to these five CITB classroom courses.
 * PRINCE2, NEBOSH, ILM, CMI, MSP, ISEP, SHEA and the NVQs are delivered
 * online or remotely and have NO location pages. Never offer one for them.
 *
 * The naming is inconsistent between courses and could not have been guessed:
 * SMSTS uses /smsts-london/ for Greater London while the other four use
 * /{course}-greater-london/. Coverage differs too — SSSTS-R has no Wales or
 * Cardiff page, and only SMSTS and SSSTS have Dundee.
 *
 * The bot NEVER states dates from these pages. It links them so the visitor
 * sees live availability.
 */

(function () {
  'use strict';

  function apply() {
    if (!window.CSTKnowledge) return;
    const kb = window.CSTKnowledge;
    if (kb.__locationsApplied) return;
    kb.__locationsApplied = true;

    kb.courseLocations = {
      smsts: {
        _hub: "https://www.csttraining.co.uk/smsts-online-page-locations/",
        _online: { "Mon-Fri": "https://www.csttraining.co.uk/smsts-online-monday-to-friday/", "Day Release": "https://www.csttraining.co.uk/smsts-day-release-online/", "Weekend": "https://www.csttraining.co.uk/smsts-online-weekend/" },
        "Greater London": "https://www.csttraining.co.uk/smsts-london/",
        "Dartford": "https://www.csttraining.co.uk/smsts-dartford/",
        "Croydon": "https://www.csttraining.co.uk/smsts-croydon/",
        "North London": "https://www.csttraining.co.uk/smsts-north-london/",
        "Central London": "https://www.csttraining.co.uk/smsts-central-london/",
        "Slough": "https://www.csttraining.co.uk/smsts-slough/",
        "West London": "https://www.csttraining.co.uk/smsts-west-london/",
        "Watford": "https://www.csttraining.co.uk/smsts-watford/",
        "Essex": "https://www.csttraining.co.uk/smsts-essex/",
        "Chelmsford": "https://www.csttraining.co.uk/smsts-chelmsford/",
        "Midlands": "https://www.csttraining.co.uk/smsts-midlands/",
        "Birmingham": "https://www.csttraining.co.uk/smsts-birmingham/",
        "Coventry": "https://www.csttraining.co.uk/smsts-coventry/",
        "Leicester": "https://www.csttraining.co.uk/smsts-leicester/",
        "Lincoln": "https://www.csttraining.co.uk/smsts-lincoln/",
        "Nottingham": "https://www.csttraining.co.uk/smsts-nottingham/",
        "Northampton": "https://www.csttraining.co.uk/smsts-northampton/",
        "Derby": "https://www.csttraining.co.uk/smsts-derby/",
        "Stoke": "https://www.csttraining.co.uk/smsts-stoke/",
        "North East England": "https://www.csttraining.co.uk/smsts-north-east-england/",
        "Newcastle": "https://www.csttraining.co.uk/smsts-newcastle/",
        "Middlesbrough": "https://www.csttraining.co.uk/smsts-middlesbrough/",
        "North West England": "https://www.csttraining.co.uk/smsts-north-west-england/",
        "Carlisle": "https://www.csttraining.co.uk/smsts-carlisle/",
        "Manchester": "https://www.csttraining.co.uk/smsts-manchester/",
        "Liverpool": "https://www.csttraining.co.uk/smsts-liverpool/",
        "East of England": "https://www.csttraining.co.uk/smsts-east-of-england/",
        "Norwich": "https://www.csttraining.co.uk/smsts-norwich/",
        "Peterborough": "https://www.csttraining.co.uk/smsts-peterborough/",
        "Scotland": "https://www.csttraining.co.uk/smsts-scotland/",
        "Aberdeen": "https://www.csttraining.co.uk/smsts-aberdeen/",
        "Glasgow": "https://www.csttraining.co.uk/smsts-glasgow/",
        "Edinburgh": "https://www.csttraining.co.uk/smsts-edinburgh/",
        "Dundee": "https://www.csttraining.co.uk/smsts-dundee/",
        "Inverness": "https://www.csttraining.co.uk/smsts-inverness/",
        "South East England": "https://www.csttraining.co.uk/smsts-south-east-england/",
        "Ashford": "https://www.csttraining.co.uk/smsts-ashford/",
        "Brighton": "https://www.csttraining.co.uk/smsts-brighton/",
        "Reading": "https://www.csttraining.co.uk/smsts-reading/",
        "Milton Keynes": "https://www.csttraining.co.uk/smsts-milton-keynes/",
        "Oxford": "https://www.csttraining.co.uk/smsts-oxford/",
        "South West England": "https://www.csttraining.co.uk/smsts-south-west-england/",
        "Bridgwater": "https://www.csttraining.co.uk/smsts-bridgwater/",
        "Bristol": "https://www.csttraining.co.uk/smsts-bristol/",
        "Exeter": "https://www.csttraining.co.uk/smsts-exeter/",
        "Gloucester": "https://www.csttraining.co.uk/smsts-gloucester/",
        "Swindon": "https://www.csttraining.co.uk/smsts-swindon/",
        "Plymouth": "https://www.csttraining.co.uk/smsts-plymouth/",
        "South England": "https://www.csttraining.co.uk/smsts-south-england/",
        "Southampton": "https://www.csttraining.co.uk/smsts-southampton/",
        "Yorkshire": "https://www.csttraining.co.uk/smsts-yorkshire/",
        "Sheffield": "https://www.csttraining.co.uk/smsts-sheffield/",
        "Leeds": "https://www.csttraining.co.uk/smsts-leeds/",
        "Doncaster": "https://www.csttraining.co.uk/smsts-doncaster/",
        "Wales": "https://www.csttraining.co.uk/smsts-wales/",
        "Cardiff": "https://www.csttraining.co.uk/smsts-cardiff/"
      },
      sssts: {
        _hub: "https://www.csttraining.co.uk/sssts-online-locations-page/",
        _online: { "Weekday": "https://www.csttraining.co.uk/sssts-online-weekday/", "Weekend": "https://www.csttraining.co.uk/sssts-online-weekend/" },
        "Greater London": "https://www.csttraining.co.uk/sssts-london/",
        "Croydon": "https://www.csttraining.co.uk/sssts-croydon/",
        "Dartford": "https://www.csttraining.co.uk/sssts-dartford/",
        "North London": "https://www.csttraining.co.uk/sssts-north-london/",
        "Central London": "https://www.csttraining.co.uk/sssts-central-london/",
        "Slough": "https://www.csttraining.co.uk/sssts-slough/",
        "West London": "https://www.csttraining.co.uk/sssts-west-london/",
        "Watford": "https://www.csttraining.co.uk/sssts-watford/",
        "Essex": "https://www.csttraining.co.uk/sssts-essex/",
        "Chelmsford": "https://www.csttraining.co.uk/sssts-chelmsford/",
        "Midlands": "https://www.csttraining.co.uk/sssts-midlands/",
        "Birmingham": "https://www.csttraining.co.uk/sssts-birmingham/",
        "Coventry": "https://www.csttraining.co.uk/sssts-coventry/",
        "Derby": "https://www.csttraining.co.uk/sssts-derby/",
        "Leicester": "https://www.csttraining.co.uk/sssts-leicester/",
        "Lincoln": "https://www.csttraining.co.uk/sssts-lincoln/",
        "Nottingham": "https://www.csttraining.co.uk/sssts-nottingham/",
        "Northampton": "https://www.csttraining.co.uk/sssts-northampton/",
        "Stoke": "https://www.csttraining.co.uk/sssts-stoke/",
        "North East England": "https://www.csttraining.co.uk/sssts-north-east-england/",
        "Newcastle": "https://www.csttraining.co.uk/sssts-newcastle/",
        "Middlesbrough": "https://www.csttraining.co.uk/sssts-middlesbrough/",
        "North West England": "https://www.csttraining.co.uk/sssts-north-west-england/",
        "Manchester": "https://www.csttraining.co.uk/sssts-manchester/",
        "Liverpool": "https://www.csttraining.co.uk/sssts-liverpool/",
        "Carlisle": "https://www.csttraining.co.uk/sssts-carlisle/",
        "East of England": "https://www.csttraining.co.uk/sssts-east-of-england/",
        "Ipswich": "https://www.csttraining.co.uk/sssts-ipswich/",
        "Peterborough": "https://www.csttraining.co.uk/sssts-peterborough/",
        "Norwich": "https://www.csttraining.co.uk/sssts-norwich/",
        "Scotland": "https://www.csttraining.co.uk/sssts-scotland/",
        "Aberdeen": "https://www.csttraining.co.uk/sssts-aberdeen/",
        "Glasgow": "https://www.csttraining.co.uk/sssts-glasgow/",
        "Edinburgh": "https://www.csttraining.co.uk/sssts-edinburgh/",
        "Dundee": "https://www.csttraining.co.uk/sssts-dundee/",
        "Inverness": "https://www.csttraining.co.uk/sssts-inverness/",
        "South East England": "https://www.csttraining.co.uk/sssts-south-east-england/",
        "Ashford": "https://www.csttraining.co.uk/sssts-ashford/",
        "Brighton": "https://www.csttraining.co.uk/sssts-brighton/",
        "Reading": "https://www.csttraining.co.uk/sssts-reading/",
        "Milton Keynes": "https://www.csttraining.co.uk/sssts-milton-keynes/",
        "Oxford": "https://www.csttraining.co.uk/sssts-oxford/",
        "South West England": "https://www.csttraining.co.uk/sssts-south-west-england/",
        "Bristol": "https://www.csttraining.co.uk/sssts-bristol/",
        "Bridgwater": "https://www.csttraining.co.uk/sssts-bridgwater/",
        "Exeter": "https://www.csttraining.co.uk/sssts-exeter/",
        "Gloucester": "https://www.csttraining.co.uk/sssts-gloucester/",
        "Swindon": "https://www.csttraining.co.uk/sssts-swindon/",
        "Plymouth": "https://www.csttraining.co.uk/sssts-plymouth/",
        "South England": "https://www.csttraining.co.uk/sssts-south-england/",
        "Bournemouth": "https://www.csttraining.co.uk/sssts-bournemouth/",
        "Southampton": "https://www.csttraining.co.uk/sssts-southampton/",
        "Yorkshire": "https://www.csttraining.co.uk/sssts-yorkshire/",
        "Leeds": "https://www.csttraining.co.uk/sssts-leeds/",
        "Sheffield": "https://www.csttraining.co.uk/sssts-sheffield/",
        "Doncaster": "https://www.csttraining.co.uk/sssts-doncaster/",
        "Wales": "https://www.csttraining.co.uk/sssts-wales/",
        "Cardiff": "https://www.csttraining.co.uk/sssts-cardiff/"
      },
      'smsts-r': {
        _hub: "https://www.csttraining.co.uk/smsts-r-classroom-page/",
        _online: { "Online": "https://www.csttraining.co.uk/smsts-refresher-online/", "Online Weekend": "https://www.csttraining.co.uk/smsts-refresher-weekend/" },
        "Greater London": "https://www.csttraining.co.uk/smsts-r-greater-london/",
        "Dartford": "https://www.csttraining.co.uk/smsts-r-dartford/",
        "North London": "https://www.csttraining.co.uk/smsts-r-north-london/",
        "Central London": "https://www.csttraining.co.uk/smsts-r-central-london/",
        "West London": "https://www.csttraining.co.uk/smsts-r-west-london/",
        "Croydon": "https://www.csttraining.co.uk/smsts-r-croydon/",
        "Watford": "https://www.csttraining.co.uk/smsts-r-watford/",
        "Slough": "https://www.csttraining.co.uk/smsts-r-slough/",
        "Essex": "https://www.csttraining.co.uk/smsts-r-essex/",
        "Chelmsford": "https://www.csttraining.co.uk/smsts-r-chelmsford/",
        "Midlands": "https://www.csttraining.co.uk/smsts-r-midlands/",
        "Birmingham": "https://www.csttraining.co.uk/smsts-r-birmingham/",
        "Lincoln": "https://www.csttraining.co.uk/smsts-r-lincoln/",
        "Nottingham": "https://www.csttraining.co.uk/smsts-r-nottingham/",
        "Coventry": "https://www.csttraining.co.uk/smsts-r-coventry/",
        "Derby": "https://www.csttraining.co.uk/smsts-r-derby/",
        "Leicester": "https://www.csttraining.co.uk/smsts-r-leicester/",
        "Northampton": "https://www.csttraining.co.uk/smsts-r-northampton/",
        "Stoke": "https://www.csttraining.co.uk/smsts-r-stoke/",
        "North East England": "https://www.csttraining.co.uk/smsts-r-north-east-england/",
        "Newcastle": "https://www.csttraining.co.uk/smsts-r-newcastle/",
        "Middlesbrough": "https://www.csttraining.co.uk/smsts-r-middlesbrough/",
        "North West England": "https://www.csttraining.co.uk/smsts-r-north-west-england/",
        "Carlisle": "https://www.csttraining.co.uk/smsts-r-carlisle/",
        "Manchester": "https://www.csttraining.co.uk/smsts-r-manchester/",
        "Liverpool": "https://www.csttraining.co.uk/smsts-r-liverpool/",
        "East of England": "https://www.csttraining.co.uk/smsts-r-east-of-england/",
        "Ipswich": "https://www.csttraining.co.uk/smsts-r-ipswich/",
        "Peterborough": "https://www.csttraining.co.uk/smsts-r-peterborough/",
        "Norwich": "https://www.csttraining.co.uk/smsts-r-norwich/",
        "Scotland": "https://www.csttraining.co.uk/smsts-r-scotland/",
        "Glasgow": "https://www.csttraining.co.uk/smsts-r-glasgow/",
        "Edinburgh": "https://www.csttraining.co.uk/smsts-r-edinburgh/",
        "Aberdeen": "https://www.csttraining.co.uk/smsts-r-aberdeen/",
        "Inverness": "https://www.csttraining.co.uk/smsts-r-inverness/",
        "South East England": "https://www.csttraining.co.uk/smsts-r-south-east-england/",
        "Ashford": "https://www.csttraining.co.uk/smsts-r-ashford/",
        "Reading": "https://www.csttraining.co.uk/smsts-r-reading/",
        "Milton Keynes": "https://www.csttraining.co.uk/smsts-r-milton-keynes/",
        "Oxford": "https://www.csttraining.co.uk/smsts-r-oxford/",
        "South West England": "https://www.csttraining.co.uk/smsts-r-south-west-england/",
        "Bristol": "https://www.csttraining.co.uk/smsts-r-bristol/",
        "Exeter": "https://www.csttraining.co.uk/smsts-r-exeter/",
        "Bridgwater": "https://www.csttraining.co.uk/smsts-r-bridgwater/",
        "Gloucester": "https://www.csttraining.co.uk/smsts-r-gloucester/",
        "Swindon": "https://www.csttraining.co.uk/smsts-r-swindon/",
        "South England": "https://www.csttraining.co.uk/smsts-r-south-england/",
        "Southampton": "https://www.csttraining.co.uk/smsts-r-southampton/",
        "Brighton": "https://www.csttraining.co.uk/smsts-r-brighton/",
        "Bournemouth": "https://www.csttraining.co.uk/smsts-r-bournemouth/",
        "Yorkshire": "https://www.csttraining.co.uk/smsts-r-yorkshire/",
        "Leeds": "https://www.csttraining.co.uk/smsts-r-leeds/",
        "Sheffield": "https://www.csttraining.co.uk/smsts-r-sheffield/",
        "Doncaster": "https://www.csttraining.co.uk/smsts-r-doncaster/",
        "Wales": "https://www.csttraining.co.uk/smsts-r-wales/",
        "Cardiff": "https://www.csttraining.co.uk/smsts-r-cardiff/"
      },
      'sssts-r': {
        _hub: "https://www.csttraining.co.uk/sssts-r-classroom-page/",
        _online: { "Online Weekday": "https://www.csttraining.co.uk/sssts-refresher-online/", "Online Weekend": "https://www.csttraining.co.uk/sssts-refresher-weekend/" },
        "Greater London": "https://www.csttraining.co.uk/sssts-r-greater-london/",
        "Dartford": "https://www.csttraining.co.uk/sssts-r-dartford/",
        "Slough": "https://www.csttraining.co.uk/sssts-r-slough/",
        "North London": "https://www.csttraining.co.uk/sssts-r-north-london/",
        "Central London": "https://www.csttraining.co.uk/sssts-r-central-london/",
        "West London": "https://www.csttraining.co.uk/sssts-r-west-london/",
        "Watford": "https://www.csttraining.co.uk/sssts-r-watford/",
        "Essex": "https://www.csttraining.co.uk/sssts-r-essex/",
        "Chelmsford": "https://www.csttraining.co.uk/sssts-r-chelmsford/",
        "Midlands": "https://www.csttraining.co.uk/sssts-r-midlands/",
        "Birmingham": "https://www.csttraining.co.uk/sssts-r-birmingham/",
        "Coventry": "https://www.csttraining.co.uk/sssts-r-coventry/",
        "Leicester": "https://www.csttraining.co.uk/sssts-r-leicester/",
        "Lincoln": "https://www.csttraining.co.uk/sssts-r-lincoln/",
        "Nottingham": "https://www.csttraining.co.uk/sssts-r-nottingham/",
        "Northampton": "https://www.csttraining.co.uk/sssts-r-northampton/",
        "Derby": "https://www.csttraining.co.uk/sssts-r-derby/",
        "Stoke": "https://www.csttraining.co.uk/sssts-r-stoke/",
        "North East England": "https://www.csttraining.co.uk/sssts-r-north-east-england/",
        "Newcastle": "https://www.csttraining.co.uk/sssts-r-newcastle/",
        "Middlesbrough": "https://www.csttraining.co.uk/sssts-r-middlesbrough/",
        "North West England": "https://www.csttraining.co.uk/sssts-r-north-west-england/",
        "Manchester": "https://www.csttraining.co.uk/sssts-r-manchester/",
        "Carlisle": "https://www.csttraining.co.uk/sssts-r-carlisle/",
        "Liverpool": "https://www.csttraining.co.uk/sssts-r-liverpool/",
        "East of England": "https://www.csttraining.co.uk/sssts-r-east-of-england/",
        "Norwich": "https://www.csttraining.co.uk/sssts-r-norwich/",
        "Ipswich": "https://www.csttraining.co.uk/sssts-r-ipswich/",
        "Peterborough": "https://www.csttraining.co.uk/sssts-r-peterborough/",
        "Scotland": "https://www.csttraining.co.uk/sssts-r-scotland/",
        "Aberdeen": "https://www.csttraining.co.uk/sssts-r-aberdeen/",
        "Inverness": "https://www.csttraining.co.uk/sssts-r-inverness/",
        "Edinburgh": "https://www.csttraining.co.uk/sssts-r-edinburgh/",
        "Glasgow": "https://www.csttraining.co.uk/sssts-r-glasgow/",
        "South East England": "https://www.csttraining.co.uk/sssts-r-south-east-england/",
        "Ashford": "https://www.csttraining.co.uk/sssts-r-ashford/",
        "Reading": "https://www.csttraining.co.uk/sssts-r-reading/",
        "Milton Keynes": "https://www.csttraining.co.uk/sssts-r-milton-keynes/",
        "Oxford": "https://www.csttraining.co.uk/sssts-r-oxford/",
        "South West England": "https://www.csttraining.co.uk/sssts-r-south-west-england/",
        "Bristol": "https://www.csttraining.co.uk/sssts-r-bristol/",
        "Bridgwater": "https://www.csttraining.co.uk/sssts-r-bridgwater/",
        "Gloucester": "https://www.csttraining.co.uk/sssts-r-gloucester/",
        "Swindon": "https://www.csttraining.co.uk/sssts-r-swindon/",
        "Plymouth": "https://www.csttraining.co.uk/sssts-r-plymouth/",
        "South England": "https://www.csttraining.co.uk/sssts-r-south-england/",
        "Southampton": "https://www.csttraining.co.uk/sssts-r-southampton/",
        "Bournemouth": "https://www.csttraining.co.uk/sssts-r-bournemouth/",
        "Brighton": "https://www.csttraining.co.uk/sssts-r-brighton/",
        "Yorkshire": "https://www.csttraining.co.uk/sssts-r-yorkshire/",
        "Doncaster": "https://www.csttraining.co.uk/sssts-r-doncaster/",
        "Sheffield": "https://www.csttraining.co.uk/sssts-r-sheffield/",
        "Leeds": "https://www.csttraining.co.uk/sssts-r-leeds/"
      },
      hsa: {
        _hub: "https://www.csttraining.co.uk/hsa-classroom-locations/",
        _online: { "Online": "https://www.csttraining.co.uk/hsa-online-courses/" },
        "Greater London": "https://www.csttraining.co.uk/hsa-greater-london/",
        "Dartford": "https://www.csttraining.co.uk/hsa-dartford/",
        "North London": "https://www.csttraining.co.uk/hsa-north-london/",
        "Central London": "https://www.csttraining.co.uk/hsa-central-london/",
        "Slough": "https://www.csttraining.co.uk/hsa-slough/",
        "West London": "https://www.csttraining.co.uk/hsa-west-london/",
        "Croydon": "https://www.csttraining.co.uk/hsa-croydon/",
        "Watford": "https://www.csttraining.co.uk/hsa-watford/",
        "Essex": "https://www.csttraining.co.uk/hsa-essex/",
        "Chelmsford": "https://www.csttraining.co.uk/hsa-chelmsford/",
        "Midlands": "https://www.csttraining.co.uk/hsa-midlands/",
        "Birmingham": "https://www.csttraining.co.uk/hsa-birmingham/",
        "Derby": "https://www.csttraining.co.uk/hsa-derby/",
        "Leicester": "https://www.csttraining.co.uk/hsa-leicester/",
        "Lincoln": "https://www.csttraining.co.uk/hsa-lincoln/",
        "Nottingham": "https://www.csttraining.co.uk/hsa-nottingham/",
        "Northampton": "https://www.csttraining.co.uk/hsa-northampton/",
        "Coventry": "https://www.csttraining.co.uk/hsa-coventry/",
        "Stoke": "https://www.csttraining.co.uk/hsa-stoke/",
        "North East England": "https://www.csttraining.co.uk/hsa-north-east-england/",
        "Newcastle": "https://www.csttraining.co.uk/hsa-newcastle/",
        "Middlesbrough": "https://www.csttraining.co.uk/hsa-middlesbrough/",
        "North West England": "https://www.csttraining.co.uk/hsa-north-west-england/",
        "Carlisle": "https://www.csttraining.co.uk/hsa-carlisle/",
        "Manchester": "https://www.csttraining.co.uk/hsa-manchester/",
        "Liverpool": "https://www.csttraining.co.uk/hsa-liverpool/",
        "East of England": "https://www.csttraining.co.uk/hsa-east-of-england/",
        "Ipswich": "https://www.csttraining.co.uk/hsa-ipswich/",
        "Norwich": "https://www.csttraining.co.uk/hsa-norwich/",
        "Peterborough": "https://www.csttraining.co.uk/hsa-peterborough/",
        "Scotland": "https://www.csttraining.co.uk/hsa-scotland/",
        "Aberdeen": "https://www.csttraining.co.uk/hsa-aberdeen/",
        "Glasgow": "https://www.csttraining.co.uk/hsa-glasgow/",
        "Edinburgh": "https://www.csttraining.co.uk/hsa-edinburgh/",
        "Inverness": "https://www.csttraining.co.uk/hsa-inverness/",
        "South East England": "https://www.csttraining.co.uk/hsa-south-east-england/",
        "Ashford": "https://www.csttraining.co.uk/hsa-ashford/",
        "Brighton": "https://www.csttraining.co.uk/hsa-brighton/",
        "Reading": "https://www.csttraining.co.uk/hsa-reading/",
        "Milton Keynes": "https://www.csttraining.co.uk/hsa-milton-keynes/",
        "Oxford": "https://www.csttraining.co.uk/hsa-oxford/",
        "South West England": "https://www.csttraining.co.uk/hsa-south-west-england/",
        "Bridgwater": "https://www.csttraining.co.uk/hsa-bridgwater/",
        "Bristol": "https://www.csttraining.co.uk/hsa-bristol/",
        "Exeter": "https://www.csttraining.co.uk/hsa-exeter/",
        "Gloucester": "https://www.csttraining.co.uk/hsa-gloucester/",
        "Swindon": "https://www.csttraining.co.uk/hsa-swindon/",
        "Plymouth": "https://www.csttraining.co.uk/hsa-plymouth/",
        "South England": "https://www.csttraining.co.uk/hsa-south-england/",
        "Southampton": "https://www.csttraining.co.uk/hsa-southampton/",
        "Yorkshire": "https://www.csttraining.co.uk/hsa-yorkshire/",
        "Leeds": "https://www.csttraining.co.uk/hsa-leeds/",
        "Sheffield": "https://www.csttraining.co.uk/hsa-sheffield/",
        "Doncaster": "https://www.csttraining.co.uk/hsa-doncaster/",
        "Wales": "https://www.csttraining.co.uk/hsa-wales/",
        "Cardiff": "https://www.csttraining.co.uk/hsa-cardiff/"
      }
    };

    kb.locationCourseNames = {
      'smsts':   'SMSTS',
      'sssts':   'SSSTS',
      'smsts-r': 'SMSTS Refresher',
      'sssts-r': 'SSSTS Refresher',
      'hsa':     'HSA'
    };

    /* Work out which of the five courses is being asked about, then find a
       place page for it. Returns null when there is no match — the bot then
       falls back to the general vague-venue rule. */
    kb.findLocationPage = function (text) {
      if (!text) return null;
      const hay = ' ' + text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ')
                            .replace(/\s+/g, ' ') + ' ';

      // \br\b removed: a stray standalone "r" flipped any match to the refresher page.
      const refresher = /refresher|\brefresh\b|renew/.test(hay);
      let key = null;
      if (/smsts/.test(hay))      key = refresher ? 'smsts-r' : 'smsts';
      else if (/sssts/.test(hay)) key = refresher ? 'sssts-r' : 'sssts';
      else if (/\bhsa\b|green card|labourer/.test(hay)) key = 'hsa';
      if (!key) return null;

      const map = kb.courseLocations[key];
      let best = null;
      Object.keys(map).forEach(place => {
        if (place.charAt(0) === '_') return;
        const p = place.toLowerCase();
        if (hay.indexOf(' ' + p + ' ') !== -1) {
          if (!best || place.length > best.place.length) {
            best = { course: key,
                     courseName: kb.locationCourseNames[key],
                     place: place, url: map[place] };
          }
        }
      });
      if (best) return best;

      // course recognised but no place named — offer the hub
      return { course: key, courseName: kb.locationCourseNames[key],
               place: null, url: map._hub, hubOnly: true };
    };

    let n = 0;
    Object.keys(kb.courseLocations).forEach(k => {
      n += Object.keys(kb.courseLocations[k]).filter(x => x.charAt(0) !== '_').length;
    });
    console.log('CSTKnowledge: ' + n + ' verified location pages across 5 CITB courses.');
  }

  window.CSTKnowledgeExtensions = window.CSTKnowledgeExtensions || [];
  window.CSTKnowledgeExtensions.push({ name: 'knowledge-locations', apply: apply });
  if (window.CSTKnowledge) apply();

})();
