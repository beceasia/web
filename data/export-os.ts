import type { Locale } from "@/data/apps";

export type ExportOsPhase = "phase-1" | "phase-2" | "phase-3";

export type ExportOsFeature = {
  phase: ExportOsPhase;
  name: string;
  tagline: string;
  userFlow: string[];
  database: string[];
  uiUx: string;
  architecture: string;
  api: string[];
  monetization: string;
  scalability: string;
};

export type OpportunityRecommendation = {
  product: string;
  label: string;
  countries: Array<{
    country: string;
    score: number;
    demand: string;
    requirements: string[];
    buyer: string;
    strategy: string;
  }>;
};

export const exportOsCopy = {
  id: {
    nav: "Export OS",
    eyebrow: "BECE Export Operating System",
    title: "Platform kerja ekspor untuk bisnis Indonesia",
    subtitle: "Bukan sekadar website informasi. BECE.asia disiapkan sebagai SaaS yang membantu perusahaan menemukan peluang ekspor, menilai kesiapan, memahami regulasi, mencari buyer, dan mengelola aktivitas ekspor.",
    primaryCta: "Coba readiness score",
    secondaryCta: "Lihat arsitektur",
    workspace: "Workspace SaaS",
    roadmap: "Roadmap produk",
    tools: "Phase 1 tools",
    intelligence: "Intelligence layer",
    operatingSystem: "Operating system layer",
    readiness: "Export Readiness Score",
    opportunity: "Opportunity Finder",
    calculator: "Export Cost Simulator",
    advisor: "AI Export Advisor",
    architecture: "Technical architecture",
    database: "Database foundation",
    monetization: "Monetization model",
    nextBuild: "Prioritas build berikutnya",
  },
  en: {
    nav: "Export OS",
    eyebrow: "BECE Export Operating System",
    title: "The export workspace for Indonesian businesses",
    subtitle: "Not just an information website. BECE.asia is designed as a SaaS platform that helps companies discover export opportunities, assess readiness, understand regulations, find buyers, and manage export activity.",
    primaryCta: "Try readiness score",
    secondaryCta: "View architecture",
    workspace: "SaaS workspace",
    roadmap: "Product roadmap",
    tools: "Phase 1 tools",
    intelligence: "Intelligence layer",
    operatingSystem: "Operating system layer",
    readiness: "Export Readiness Score",
    opportunity: "Opportunity Finder",
    calculator: "Export Cost Simulator",
    advisor: "AI Export Advisor",
    architecture: "Technical architecture",
    database: "Database foundation",
    monetization: "Monetization model",
    nextBuild: "Next build priority",
  },
  zh: {
    nav: "Export OS",
    eyebrow: "BECE Export Operating System",
    title: "\u9762\u5411\u5370\u5c3c\u4f01\u4e1a\u7684\u51fa\u53e3\u5de5\u4f5c\u5e73\u53f0",
    subtitle: "BECE.asia \u4e0d\u53ea\u662f\u4fe1\u606f\u7f51\u7ad9\uff0c\u800c\u662f\u4e00\u4e2a SaaS \u5e73\u53f0\uff0c\u5e2e\u52a9\u4f01\u4e1a\u53d1\u73b0\u51fa\u53e3\u673a\u4f1a\u3001\u8bc4\u4f30\u51c6\u5907\u5ea6\u3001\u7406\u89e3\u6cd5\u89c4\u3001\u5bfb\u627e\u4e70\u5bb6\u5e76\u7ba1\u7406\u51fa\u53e3\u6d3b\u52a8\u3002",
    primaryCta: "\u8bd5\u7528\u51fa\u53e3\u8bc4\u5206",
    secondaryCta: "\u67e5\u770b\u67b6\u6784",
    workspace: "SaaS \u5de5\u4f5c\u53f0",
    roadmap: "\u4ea7\u54c1\u8def\u7ebf\u56fe",
    tools: "\u7b2c\u4e00\u9636\u6bb5\u5de5\u5177",
    intelligence: "\u60c5\u62a5\u5c42",
    operatingSystem: "\u64cd\u4f5c\u7cfb\u7edf\u5c42",
    readiness: "\u51fa\u53e3\u51c6\u5907\u5ea6\u8bc4\u5206",
    opportunity: "\u5e02\u573a\u673a\u4f1a\u5339\u914d",
    calculator: "\u51fa\u53e3\u6210\u672c\u6a21\u62df",
    advisor: "AI \u51fa\u53e3\u987e\u95ee",
    architecture: "\u6280\u672f\u67b6\u6784",
    database: "\u6570\u636e\u5e93\u57fa\u7840",
    monetization: "\u5546\u4e1a\u5316\u6a21\u578b",
    nextBuild: "\u4e0b\u4e00\u6b65\u6784\u5efa\u4f18\u5148\u7ea7",
  },
} satisfies Record<Locale, LocalizedStringMap>;

type LocalizedStringMap = Record<string, string>;

export const exportOsMetrics = [
  { label: "Readiness leads", value: "1,000", detail: "target assessments in 90 days" },
  { label: "Company profiles", value: "500", detail: "qualified exporter records" },
  { label: "AI consultations", value: "2,000", detail: "guided export sessions" },
  { label: "MRR target", value: "Rp100m", detail: "phase 2 premium target" },
];

export const exportOsFeatures: ExportOsFeature[] = [
  {
    phase: "phase-1",
    name: "Export Readiness Assessment",
    tagline: "Diagnose whether a business is ready to export and what to fix first.",
    userFlow: ["Create profile", "Add product and target country", "Answer readiness questions", "Receive score and action plan", "Download report or consult BECE"],
    database: ["users", "companies", "products", "readiness_assessments", "readiness_answers", "score_breakdowns", "recommendations"],
    uiUx: "Duolingo-style guided assessment with progress, score breakdown, missions, and next best actions.",
    architecture: "Client wizard, scoring service, versioned scoring rules, PDF report generator, lead capture.",
    api: ["POST /api/export-os/readiness", "GET /api/assessments/:id", "POST /api/reports/pdf"],
    monetization: "Free basic score, paid detailed report, consultation upsell, team dashboard.",
    scalability: "Question bank and scoring rules are versioned by product, country, and company type.",
  },
  {
    phase: "phase-1",
    name: "Export Opportunity Finder",
    tagline: "Match Indonesian products to the strongest destination markets.",
    userFlow: ["Input product", "Map to HS/category", "Compare countries", "Open market brief", "Save opportunity"],
    database: ["countries", "products", "hs_codes", "market_opportunities", "country_product_fit", "trade_signals"],
    uiUx: "Bloomberg-like opportunity cards with score, demand, requirements, buyer type, and risk.",
    architecture: "Rule-based matching first, AI-enhanced ranking later, market intelligence content as data.",
    api: ["GET /api/export-os/opportunities?product=coffee", "GET /api/countries/:id/products"],
    monetization: "Free limited searches, premium comparison, paid country reports.",
    scalability: "Normalize market data by HS code so new countries and products can be added without redesign.",
  },
  {
    phase: "phase-1",
    name: "AI Export Consultant",
    tagline: "Turn messy export questions into structured 30/60/90 day plans.",
    userFlow: ["Ask a question", "AI reads company/product context", "Receive diagnosis", "Save action plan", "Escalate to WhatsApp consultation"],
    database: ["ai_sessions", "ai_messages", "knowledge_sources", "user_export_context", "action_plans"],
    uiUx: "Chat interface plus structured cards for regulations, risks, market fit, and next actions.",
    architecture: "LLM gateway, retrieval layer over BECE knowledge base, safety guardrails, conversation memory.",
    api: ["POST /api/ai/export-advisor", "GET /api/ai/sessions/:id"],
    monetization: "Free monthly quota, paid advisor credits, human export clinic upsell.",
    scalability: "Cache common answers, index knowledge by product-country-regulation, log gaps for content ops.",
  },
  {
    phase: "phase-1",
    name: "Export Cost Calculator",
    tagline: "Help exporters estimate FOB, CIF, landed cost, and margin.",
    userFlow: ["Choose product and destination", "Enter quantity and costs", "Select incoterm", "Compare scenarios", "Export PDF"],
    database: ["cost_templates", "freight_rates", "incoterms", "duties", "calculator_runs"],
    uiUx: "Shopify-like business tool with clean inputs, scenario cards, and clear profitability signals.",
    architecture: "Calculation service, editable assumptions, future freight and duty provider integrations.",
    api: ["POST /api/calculators/export-cost", "GET /api/cost-rates"],
    monetization: "Free simple calculator, premium saved scenarios and PDF quote builder.",
    scalability: "Separate formula engine from UI, support multiple destination rules and cost libraries.",
  },
  {
    phase: "phase-2",
    name: "Export Intelligence Database",
    tagline: "Structured product-country-regulation intelligence, not articles.",
    userFlow: ["Search product/country", "Review market, regulation, buyer channel", "Save brief", "Set alerts"],
    database: ["market_reports", "regulations", "certifications", "tariff_rules", "buyer_channels", "sources"],
    uiUx: "Bloomberg dashboard with Market, Regulation, Buyers, Risk, and Source tabs.",
    architecture: "Structured CMS, source freshness tracker, internal data editor, SEO static pages.",
    api: ["GET /api/intelligence/:country/:product", "GET /api/regulations"],
    monetization: "Free summaries, paid full reports, subscription intelligence access.",
    scalability: "Modular content model, source citation discipline, scheduled refresh pipeline.",
  },
  {
    phase: "phase-2",
    name: "Exporter Directory",
    tagline: "Make Indonesian suppliers discoverable and credible.",
    userFlow: ["Create company profile", "Add products and capacity", "Upload certificates", "Publish directory page", "Receive inquiries"],
    database: ["exporter_profiles", "company_products", "certifications", "media_assets", "verification_status"],
    uiUx: "LinkedIn profile plus Shopify storefront: trust, product catalog, inquiry CTA.",
    architecture: "Public directory, private profile dashboard, moderation and verification workflow.",
    api: ["POST /api/exporters", "GET /api/exporters", "PATCH /api/exporters/:id"],
    monetization: "Premium listing, verified badge, featured placement, inquiry analytics.",
    scalability: "Search indexing, image optimization, anti-spam inquiry controls.",
  },
  {
    phase: "phase-2",
    name: "Buyer Intelligence Database",
    tagline: "Turn market opportunity into named buyer leads.",
    userFlow: ["Search buyer", "Filter by country/product", "Open lead quality", "Save lead", "Move to CRM"],
    database: ["buyers", "buyer_interests", "buyer_countries", "buyer_sources", "saved_leads"],
    uiUx: "Lead terminal with filters, quality score, buyer detail panel, and save-to-pipeline action.",
    architecture: "Data ingestion, enrichment, admin validation, duplicate detection.",
    api: ["GET /api/buyers", "GET /api/buyers/:id", "POST /api/leads/save"],
    monetization: "Lead credits, premium buyer access, prospecting subscription.",
    scalability: "Source confidence scoring, rate-limited exports, deduplication pipeline.",
  },
  {
    phase: "phase-2",
    name: "Export Learning Path",
    tagline: "A mission-based export journey instead of long passive courses.",
    userFlow: ["Start level", "Complete missions", "Upload proof", "Unlock next level", "Earn badge"],
    database: ["learning_paths", "modules", "lessons", "missions", "user_progress", "badges"],
    uiUx: "Duolingo-style pathway with missions, progress streak, levels, and practical proof tasks.",
    architecture: "Learning engine tied to readiness score and company profile.",
    api: ["GET /api/learning/path", "POST /api/learning/progress"],
    monetization: "Free beginner path, paid cohort, export clinic membership.",
    scalability: "Reusable modules, localization, corporate/team progress dashboards.",
  },
  {
    phase: "phase-3",
    name: "Export Marketplace",
    tagline: "Match verified Indonesian exporters with international demand.",
    userFlow: ["Buyer posts request", "System matches suppliers", "Exporter submits offer", "Buyer starts inquiry", "Deal moves to CRM"],
    database: ["marketplace_requests", "offers", "matches", "inquiries", "transaction_intents"],
    uiUx: "Marketplace request board plus recommended suppliers and trust signals.",
    architecture: "Matching engine, messaging, verification checks, moderation and fraud review.",
    api: ["POST /api/marketplace/requests", "GET /api/matches", "POST /api/offers"],
    monetization: "Commission, qualified lead fee, premium supplier response credits.",
    scalability: "Trust scoring, spam controls, product-country matching indexes.",
  },
  {
    phase: "phase-3",
    name: "Export CRM",
    tagline: "Help exporters manage buyer follow-up and deal activity.",
    userFlow: ["Save buyer", "Create pipeline", "Log activity", "Track sample shipment", "Move deal to negotiation"],
    database: ["crm_contacts", "crm_pipelines", "crm_deals", "activities", "followups"],
    uiUx: "Kanban board: New lead, Contacted, Sample sent, Negotiation, Deal.",
    architecture: "Multi-tenant workspace, role permissions, activity logs, reminders.",
    api: ["GET /api/crm/deals", "POST /api/crm/activities", "PATCH /api/crm/deals/:id"],
    monetization: "Monthly SaaS plan by company seats, premium automation.",
    scalability: "Tenant isolation, audit trails, search across contacts and activities.",
  },
  {
    phase: "phase-3",
    name: "Compliance Automation",
    tagline: "Track documents, requirements, and certificate expiry.",
    userFlow: ["Select product and country", "Generate checklist", "Upload documents", "Receive expiry alerts", "Prepare shipment file"],
    database: ["compliance_checklists", "document_requirements", "company_documents", "expiry_alerts"],
    uiUx: "Document health dashboard with required, missing, expiring, and complete states.",
    architecture: "Rules engine, document storage, notification service, audit history.",
    api: ["GET /api/compliance/:product/:country", "POST /api/documents", "GET /api/alerts"],
    monetization: "Paid compliance workspace, team plan, renewal reminders.",
    scalability: "Versioned rules and country-specific requirements with review workflow.",
  },
  {
    phase: "phase-3",
    name: "BECE Verified Exporter",
    tagline: "A private trust layer for export-ready companies.",
    userFlow: ["Apply verification", "Upload documents", "BECE reviews", "Badge issued", "Annual renewal"],
    database: ["verification_applications", "verification_checks", "review_notes", "badges"],
    uiUx: "Verification checklist, review status, badge preview, public trust mark.",
    architecture: "Admin review queue, badge issuance, expiration and renewal workflow.",
    api: ["POST /api/verification/apply", "PATCH /api/verification/review"],
    monetization: "Verification fee, annual renewal, premium verified placement.",
    scalability: "Reviewer assignment, fraud prevention, immutable verification history.",
  },
];

export const opportunityRecommendations: OpportunityRecommendation[] = [
  {
    product: "coffee",
    label: "Specialty coffee",
    countries: [
      {
        country: "Japan",
        score: 92,
        demand: "Premium specialty coffee, origin story, consistent roast profile.",
        requirements: ["Food safety", "Japanese labeling", "Traceability"],
        buyer: "Roaster, specialty cafe, distributor",
        strategy: "Lead with single-origin Gayo/Toraja and small sample lots.",
      },
      {
        country: "South Korea",
        score: 86,
        demand: "Cafe culture and premium packaged beverages.",
        requirements: ["Food labeling", "Stable packaging", "Shelf-life proof"],
        buyer: "Cafe chain, distributor, online retailer",
        strategy: "Position as premium lifestyle coffee with clean packaging.",
      },
      {
        country: "UAE",
        score: 81,
        demand: "Hospitality, gift packs, and halal-friendly F&B channels.",
        requirements: ["Halal support", "Arabic/English label", "Distributor"],
        buyer: "Hotel supplier, gourmet retail, importer",
        strategy: "Use distributor partnership and premium gift packaging.",
      },
    ],
  },
  {
    product: "spices",
    label: "Indonesian spices",
    countries: [
      {
        country: "Hong Kong",
        score: 88,
        demand: "Natural ingredients, Asian cuisine, and premium retail.",
        requirements: ["Food safety", "Moisture consistency", "English/Chinese label"],
        buyer: "Food importer, restaurant supplier, retail distributor",
        strategy: "Start with cinnamon, nutmeg, clove, ginger, and turmeric bundles.",
      },
      {
        country: "Singapore",
        score: 84,
        demand: "Regional food manufacturing and premium consumer packs.",
        requirements: ["Clear origin", "Food safety", "Retail packaging"],
        buyer: "Food processor, distributor, grocery chain",
        strategy: "Target B2B ingredients first, then retail packs.",
      },
      {
        country: "Malaysia",
        score: 79,
        demand: "Culinary ingredient market with halal-friendly demand.",
        requirements: ["Halal positioning", "Competitive pricing", "Stable supply"],
        buyer: "Distributor, food manufacturer, modern trade",
        strategy: "Differentiate with origin quality and consistent grading.",
      },
    ],
  },
  {
    product: "halal-food",
    label: "Halal packaged food",
    countries: [
      {
        country: "UAE",
        score: 90,
        demand: "Halal snacks, instant seasoning, ready-to-eat meals.",
        requirements: ["Halal certificate", "Shelf life", "Arabic/English label"],
        buyer: "Importer, supermarket, HoReCa supplier",
        strategy: "Use distributor-led entry and focus on shelf-stable SKUs.",
      },
      {
        country: "Hong Kong",
        score: 83,
        demand: "Muslim-friendly tourism and international food retail.",
        requirements: ["Halal claim support", "Food safety", "Bilingual label"],
        buyer: "Halal shop, online retailer, restaurant supplier",
        strategy: "Start with small-batch snacks and seasoning packs.",
      },
      {
        country: "Malaysia",
        score: 80,
        demand: "Large halal consumer base but competitive market.",
        requirements: ["Halal certificate", "Brand differentiation", "Competitive price"],
        buyer: "Modern trade, distributor, online marketplace",
        strategy: "Lead with unique Indonesian taste and premium story.",
      },
    ],
  },
];

export const databaseFoundation = [
  ["users", "Authentication identity, roles, onboarding status"],
  ["companies", "Company profile, legal status, location, team plan"],
  ["products", "Product catalog, HS code, capacity, certification state"],
  ["countries", "Market metadata, currency, region, trade profile"],
  ["market_opportunities", "Product-country opportunity score and signals"],
  ["regulations", "Product-country requirements and source references"],
  ["exporter_profiles", "Public supplier profile and verification state"],
  ["buyers", "Buyer intelligence, product interests, country, source confidence"],
  ["crm_deals", "Buyer pipeline, activity, sample, negotiation, deal state"],
  ["subscriptions", "Plan, usage limits, billing status, feature access"],
];

export const monetizationModel = [
  ["Free", "Readiness score, limited opportunity searches, public country summaries"],
  ["Pro", "Detailed reports, saved scenarios, AI advisor credits, exporter profile"],
  ["Intelligence", "Buyer database, product-country reports, market alerts"],
  ["Operating System", "CRM, compliance automation, team seats, verified exporter workflow"],
  ["Services", "Consultation, custom export research, verification review, report packages"],
];

export function phaseLabel(phase: ExportOsPhase) {
  if (phase === "phase-1") return "Phase 1";
  if (phase === "phase-2") return "Phase 2";
  return "Phase 3";
}

export function getOpportunity(product: string) {
  return opportunityRecommendations.find((item) => item.product === product) ?? opportunityRecommendations[0];
}
