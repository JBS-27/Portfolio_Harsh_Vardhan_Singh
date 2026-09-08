/**
 * All site copy and structured content lives here.
 * Swap values, add projects, or tweak links without touching components.
 */

export const site = {
  name: "Harsh Vardhan Singh",
  initials: "HVS",
  role: "Full-stack engineer · AI systems · visual craft",
  tagline:
    "I build products that think — and visuals that have to hold a glance.",
  personality:
    "CSE @ IIIT Surat. I architect like an agent should do real work, then design like the piece has to land at 60 km/h.",
  availability: "Available for internships, freelance, and collaborations",
  currently: "Contractual SDE @ Xelron AI",
  currentRole: {
    label: "Currently building",
    title: "Contractual SDE",
    org: "Xelron AI",
  },
  location: "Surat, India",
  email: "singharshll52@gmail.com",
  phone: "+91 76178 11894",
  resumeUrl: "/resume",
  portrait: {
    src: "/portrait.jpg",
    alt: "Harsh Vardhan Singh",
  },
  url: "https://harshvardhansingh.dev",
  socials: {
    github: "https://github.com/JBS-27",
    linkedin: "https://www.linkedin.com/in/harsh-vardhan-singh-4b6a45282/",
    twitter: "https://x.com/singharshll52",
  },
} as const;

export const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
] as const;

export const telemetry = {
  mission: "ORBIT // 001",
  lat: "21.17 N",
  lng: "72.83 E",
  system: "SYS // ONLINE",
  vehicle: "HVS-01",
} as const;

export const about = {
  lead: "I like systems that hold together — and surfaces that refuse to be ignored.",
  paragraphs: [
    "I’m a Computer Science undergrad at IIIT Surat (2023–2027) with a 9.71 CGPA. I care about the whole stack: the model that forecasts, the API that doesn’t leak, the interface that loads in under two seconds, and the type that still reads from across a street.",
    "Recently I trained physical-AI data at Deccan AI, then joined Xelron AI as a Contractual SDE. In public I write about moving past LLM wrappers toward agents that actually complete a job — resume in, structured profile out, human still in the loop. That thesis is now a product I’m building.",
    "Outside class I design advertisement banners and billboard-style pieces. It’s how I think about attention: one idea, huge type, no second chance. The same instinct shows up in my visual experiments — inverted earth, selective gravity, luminous scenes.",
  ],
  outside:
    "Outside of work: billboard and banner ads, experimental physics viz, and the occasional Scout-honed habit of actually finishing the camp.",
  availability:
    "Open to internships, freelance, full-time conversations, and collaborations — especially AI products, high-craft interfaces, and campaigns that have to work in the real world.",
  facts: [
    { label: "CGPA", value: "9.71" },
    { label: "Dewang Mehta IT Award", value: "3×" },
    { label: "Rajya Puraskar", value: "Scouts" },
    { label: "CBSE XII", value: "98.2%" },
  ],
};

export type ProjectCoverMotif =
  | "blueprint"
  | "wave"
  | "ledger"
  | "agent"
  | "globe"
  | "orbit";

export type ProjectKind = "featured" | "secondary" | "experimental";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  mission: string;
  kind: ProjectKind;
  role: string;
  featured?: boolean;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  cover: {
    from: string;
    to: string;
    motif: ProjectCoverMotif;
  };
  caseStudy: {
    problem: string;
    role: string;
    approach: string[];
    decisions: { title: string; body: string }[];
    results: { label: string; value: string }[];
    tech: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "nirmaan",
    title: "Nirmaan",
    subtitle: "Construction OS",
    year: "2026",
    mission: "01",
    kind: "featured",
    role: "Solo builder",
    featured: true,
    description:
      "A digital twin for Indian residential sites — materials, crew, bills, cash envelope, and a project-aware assistant that answers from the ledger.",
    tags: ["TanStack Start", "React 19", "Postgres", "Better Auth", "AI"],
    liveUrl: "https://nirmaan-the-ultimate-solution.vercel.app/",
    repoUrl: "https://github.com/JBS-27/Nirmaan_The_Ultimate_Solution",
    cover: { from: "#04010a", to: "#14082c", motif: "blueprint" },
    caseStudy: {
      problem:
        "Homeowners and small builders in India still run sites on WhatsApp, notebooks, and memory. Cement leftover, crew attendance, and the cash envelope live in different heads — so overruns show up after the money is gone.",
      role: "Solo builder — product, architecture, auth, data model, and the ‘ask the twin’ assistant.",
      approach: [
        "Modelled the site as a live twin: phases, BOQ, crew, bills, and a cash envelope scoped to the signed-in owner.",
        "India-first defaults — Bengaluru rates, INR, and a marketplace to hire or request quotes.",
        "Assistant reads the ledger first. Without an API key it still answers cement left, budget, crew, and next steps.",
      ],
      decisions: [
        {
          title: "Keep the stack native",
          body: "TanStack Start, React 19, Better Auth cookies, Postgres. Sessions stay on this app — no rewrite into a generic NextAuth template.",
        },
        {
          title: "Ledger before LLM",
          body: "The twin is useful even offline-of-AI. Grok / OpenAI / Gemini are optional layers on top of real project numbers.",
        },
        {
          title: "Auth that survives serverless",
          body: "A stable BETTER_AUTH_SECRET across instances — a random secret per cold start was bouncing people back to login.",
        },
      ],
      results: [
        { label: "Surface", value: "Live twin + marketplace" },
        { label: "Auth", value: "Google, X, email" },
        { label: "Scope", value: "India-first, INR" },
      ],
      tech: [
        "TanStack Start",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Better Auth",
        "Postgres / PGLite",
        "xAI / OpenAI / Gemini",
      ],
    },
  },
  {
    slug: "aqi-forecasting",
    title: "5-Day AQI Forecast",
    subtitle: "CNN-LSTM-GRU + Attention",
    year: "2026",
    mission: "02",
    kind: "featured",
    role: "Group project",
    featured: true,
    description:
      "A ~190k-parameter ensemble that forecasts five-day air quality across 26 Indian cities at 86.6% bucket accuracy — deployed as a sub-second Streamlit dashboard.",
    tags: ["Python", "TensorFlow", "scikit-learn", "Streamlit", "SHAP"],
    repoUrl: "https://github.com/JBS-27/Air_Pollution_monitoring_system",
    cover: { from: "#01040c", to: "#0a1838", motif: "wave" },
    caseStudy: {
      problem:
        "City-level AQI is noisy, gappy, and local. A model that looks good on a national average still fails Patna, and a dashboard that takes ten seconds is useless to a commuter.",
      role: "Group project — architecture, feature pipeline, ablation, and the real-time dashboard.",
      approach: [
        "Engineered a 33-dimensional feature set from 29,531 CPCB records (2015–2020, 26 cities).",
        "Resolved ~40% missing values with KNN imputation and blocked leakage with city-stratified normalisation.",
        "Stacked Conv1D → LSTM → GRU → Bahdanau attention to weight which days actually matter.",
      ],
      decisions: [
        {
          title: "Causal convolutions first",
          body: "Local pollutant patterns (PM spikes, weekend dips) are cheaper to learn in Conv1D before the sequence models spend capacity on long range.",
        },
        {
          title: "Ablation over vibes",
          body: "Seven-model ablation plus SHAP — the ensemble beat baselines by ~60% and we could say why.",
        },
        {
          title: "Latency as a feature",
          body: "Streamlit inference under one second per city. A forecast you wait for is a forecast you don’t use.",
        },
      ],
      results: [
        { label: "Bucket accuracy", value: "86.65%" },
        { label: "Avg MAE", value: "~12.8 AQI" },
        { label: "Best city MAE", value: "7.71 (Bengaluru)" },
        { label: "Parameters", value: "190,309" },
      ],
      tech: [
        "Python",
        "TensorFlow",
        "scikit-learn",
        "Streamlit",
        "SHAP",
        "KNN imputation",
      ],
    },
  },
  {
    slug: "lendflow",
    title: "LendFlow",
    subtitle: "Loan application & verification",
    year: "2026",
    mission: "03",
    kind: "secondary",
    role: "Full-stack",
    description:
      "A full-stack loan platform with RBAC, JWT sessions, and indexed MongoDB queries — verification workflows that cut turnaround by 30%.",
    tags: ["Next.js", "Tailwind", "MongoDB", "JWT", "REST"],
    repoUrl: "https://github.com/JBS-27/Loan_Application_and_Verification",
    cover: { from: "#07060c", to: "#1a1028", motif: "ledger" },
    caseStudy: {
      problem:
        "Loan desks still re-key the same applicant into three tools. Errors compound, sessions get hijacked, and a slow frontend makes the whole desk feel broken.",
      role: "Full-stack engineer — auth, data model, RBAC, and the verification UI.",
      approach: [
        "Role-based access so officers, verifiers, and applicants see only their slice.",
        "JWT + bcrypt to lock sessions; indexed MongoDB queries to keep retrieval honest.",
        "Automated validation on the application path to shrink manual entry.",
      ],
      decisions: [
        {
          title: "Index the questions you actually ask",
          body: "Indexed MongoDB queries dropped retrieval time by ~45% on the paths officers hit every hour.",
        },
        {
          title: "Auth is product, not plumbing",
          body: "JWT + bcrypt against session hijacking. A loan desk that leaks is worse than a loan desk that’s slow.",
        },
        {
          title: "Frontend budget: two seconds",
          body: "Next.js + Tailwind, sub-2s first paint. The desk should feel like a tool, not a waiting room.",
        },
      ],
      results: [
        { label: "Query time", value: "−45%" },
        { label: "Turnaround", value: "−30%" },
        { label: "Load", value: "< 2s" },
      ],
      tech: ["Next.js", "Tailwind CSS", "MongoDB", "JWT", "Bcrypt", "REST APIs"],
    },
  },
  {
    slug: "agentic-applications",
    title: "Agentic Job Platform",
    subtitle: "Beyond LLM wrappers",
    year: "2026",
    mission: "04",
    kind: "secondary",
    role: "Author",
    description:
      "An end-to-end agent that reads a resume, extracts a structured profile, and is being built toward job-fit, tailored answers, and human-reviewed form fill.",
    tags: ["FastAPI", "React", "MongoDB", "LLMs", "Playwright"],
    repoUrl: "https://github.com/JBS-27/agentic-job-application-platform",
    cover: { from: "#080414", to: "#1c1040", motif: "agent" },
    caseStudy: {
      problem:
        "Most ‘AI apply’ tools are a prompt around a chat model. They don’t extract a real profile, they don’t match a job, and they definitely shouldn’t submit anything without a human.",
      role: "Author — architecture, FastAPI backend, provider-agnostic LLM layer, and tests.",
      approach: [
        "Phase 1–2 shipped: resume upload, pypdf extraction, schema-driven LLM profile, 33 offline tests.",
        "Provider interface that works with OpenAI-compatible endpoints (OpenAI, Groq, Together).",
        "Later phases: job analysis, answer generation, Playwright fill under human review.",
      ],
      decisions: [
        {
          title: "Schema or it didn’t happen",
          body: "The model must return a CandidateProfile. One retry, then 502. No free-text ‘summary’ pretending to be structure.",
        },
        {
          title: "Fake LLM in CI",
          body: "All 33 tests run against fixture PDFs and a fake provider. No tokens burned in CI, no flaky vendor.",
        },
        {
          title: "Human still signs",
          body: "Browser automation is Phase 5 and always under review. Autonomy without a kill switch is just a wrapper with confidence.",
        },
      ],
      results: [
        { label: "Status", value: "Phase 2 live" },
        { label: "Tests", value: "33 offline" },
        { label: "Thesis", value: "Agents, not wrappers" },
      ],
      tech: [
        "Python",
        "FastAPI",
        "React",
        "MongoDB / Beanie",
        "pypdf",
        "Playwright (planned)",
      ],
    },
  },
  {
    slug: "inverted-earth",
    title: "Inverted Earth",
    subtitle: "Visual experiment",
    year: "2026",
    mission: "05",
    kind: "experimental",
    role: "Designer-engineer",
    description:
      "A large-canvas visualization that flips the familiar planet — built to practice presence, scale, and the kind of image that works like a poster.",
    tags: ["JavaScript", "WebGL / Canvas", "Vercel"],
    liveUrl: "https://invertedearthvisualization.vercel.app",
    repoUrl: "https://github.com/JBS-27/Inverted_Earth_Visualization",
    cover: { from: "#000208", to: "#0c1830", motif: "globe" },
    caseStudy: {
      problem:
        "I wanted a piece that behaves like a billboard: one strange, confident image, not a dashboard of controls.",
      role: "Designer-engineer — concept, scene, and deployment.",
      approach: [
        "Treat the viewport as a poster, not a settings panel.",
        "Push contrast and scale so the inversion is readable in a second.",
        "Ship it live so the experiment has to perform on a real connection.",
      ],
      decisions: [
        {
          title: "Poster first",
          body: "If it needs a legend to be interesting, it isn’t a billboard. The inversion is the copy.",
        },
        {
          title: "Performance is part of the craft",
          body: "A heavy globe that stutters is a failed ad. Keep the scene light enough to stay smooth.",
        },
      ],
      results: [
        { label: "Live", value: "Vercel" },
        { label: "Intent", value: "One-glance image" },
      ],
      tech: ["JavaScript", "Canvas / WebGL", "Vercel"],
    },
  },
  {
    slug: "selective-gravity",
    title: "Selective Gravity Lab",
    subtitle: "Interactive physics sketch",
    year: "2026",
    mission: "06",
    kind: "experimental",
    role: "Solo",
    description:
      "A lab where gravity isn’t universal — a playground for attention, motion, and the rules you choose to break on a page.",
    tags: ["JavaScript", "Canvas", "Interaction"],
    liveUrl: "https://selective-gravity-lab.vercel.app",
    repoUrl: "https://github.com/JBS-27/Selective-gravity-lab",
    cover: { from: "#08060a", to: "#1a1014", motif: "orbit" },
    caseStudy: {
      problem:
        "Most physics sketches demonstrate a textbook. I wanted one that feels like a rule you can edit — closer to how I think about ads and interfaces.",
      role: "Solo — interaction design and implementation.",
      approach: [
        "Make gravity a material, not a constant.",
        "Keep the lab readable on a phone — thumbs, not a mouse-only toy.",
        "Use motion as copy: you understand the idea by knocking things around.",
      ],
      decisions: [
        {
          title: "Break one law cleanly",
          body: "Selective gravity is the whole joke. Extra features would dilute it.",
        },
        {
          title: "Ship the sketch",
          body: "A lab that only runs on my laptop isn’t a lab. Live on Vercel.",
        },
      ],
      results: [
        { label: "Live", value: "Vercel" },
        { label: "Form", value: "Interactive sketch" },
      ],
      tech: ["JavaScript", "Canvas", "Vercel"],
    },
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML / CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "FastAPI", "Python", "REST APIs", "JWT"],
  },
  {
    title: "Data & AI",
    items: [
      "TensorFlow",
      "scikit-learn",
      "Streamlit",
      "LLMs",
      "CNN–LSTM–GRU",
      "SHAP",
      "RLHF foundations",
    ],
  },
  {
    title: "Databases",
    items: ["MongoDB", "MySQL", "Postgres", "SQL"],
  },
  {
    title: "Languages",
    items: ["C++", "Python", "SQL", "JavaScript", "TypeScript"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Linux"],
  },
  {
    title: "Core CS",
    items: [
      "DSA",
      "Computer Networks",
      "Operating Systems",
      "DBMS",
      "Computer Architecture",
      "Information Security",
    ],
  },
  {
    title: "Design",
    items: [
      "Billboard & banner ads",
      "Visual systems",
      "Typography",
      "Interactive sketches",
    ],
  },
];

export const learningNow = [
  "Agent orchestration & human-reviewed automation",
  "Outdoor advertising systems",
  "Physical-AI data pipelines",
];

export type TimelineItem = {
  kind: "work" | "education" | "award";
  title: string;
  org: string;
  dates: string;
  location?: string;
  bullets: string[];
};

export const timeline: TimelineItem[] = [
  {
    kind: "work",
    title: "Contractual SDE",
    org: "Xelron AI",
    dates: "Aug 2026 — Present",
    location: "Remote",
    bullets: [
      "Contributing as a Contractual SDE at an AI lab focused on automation and enterprise adoption.",
      "Applying full-stack and AI-systems instincts to real product work while staying in the loop on agent design.",
    ],
  },
  {
    kind: "work",
    title: "AI Data Trainer (Freelance)",
    org: "Deccan AI",
    dates: "Jun 2026 — Jul 2026",
    location: "Remote",
    bullets: [
      "Collected and quality-checked video of everyday household tasks for physical AI and robot-learning models.",
      "Completed training on generative AI foundations — LLM architecture, tokenization, attention, and RLHF.",
    ],
  },
  {
    kind: "education",
    title: "B.Tech, Computer Science and Engineering",
    org: "Indian Institute of Information Technology, Surat",
    dates: "2023 — 2027",
    location: "Surat, Gujarat",
    bullets: [
      "CGPA 9.71. Coursework across DSA, networks, OS, DBMS, architecture, ML/AI, and information security.",
      "Three-time consecutive Dewang Mehta IT Award (2024, 2025, 2026) for academic and technical excellence.",
      "Letter of Appreciation in Engineering Physics.",
    ],
  },
  {
    kind: "education",
    title: "CBSE Senior Secondary, Science",
    org: "Kendriya Vidyalaya Amhat, Sultanpur",
    dates: "2021 — 2022",
    location: "Uttar Pradesh",
    bullets: ["98.2% in Class XII Science."],
  },
  {
    kind: "award",
    title: "Rajya Puraskar",
    org: "Bharat Scouts & Guides",
    dates: "School years",
    bullets: [
      "State-level award for leadership, community service, and teamwork.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
