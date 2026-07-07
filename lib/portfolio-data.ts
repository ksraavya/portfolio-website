export const siteConfig = {
  name: "Sraavya",
  fullName: "Sraavya Kochhar",
  title: "Pre-final year CS student",
  email: "ksraavya05@gmail.com",
  github: "https://github.com/ksraavya",
  linkedin: "https://linkedin.com/in/sraavya-kochhar",
  cgpa: "9.2",
  college: "Maharaja Agrasen Institute of Technology, GGSIPU",
  degree: "B.Tech Computer Science (Data Science)",
  collegeYears: "Sept 2023 – July 2027",
  currentlyBuilding: "AI that actually knows what it's talking about (harder than it sounds)",
  openToWork: true,
};

export const typewriterLines = [
    "I build AI systems that actually work in production.",
    "I turn messy data into clear insights.",
    "I've worked on real cybercrime data.",
    "Heading deeper into GenAI and making it my thing.",
];

export const experiences = [
  {
    company: "Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs",
    shortName: "I4C, Ministry of Home Affairs",
    role: "Intern",
    period: "Feb 2026 – Apr 2026",
    location: "India 🇮🇳",
    impactNumber: "10K+",
    impactLabel: "records processed",
    highlights: [
      "Processed and standardized 10K+ fragmented NCTC records through entity resolution, metadata normalization, and taxonomy alignment to support a national resource pool of cybersecurity experts.",
      "Developed Python-based investigative pipelines to extract DNS, ASN, ISP, geolocation, and hosting metadata from suspicious domains reported through national cybercrime reporting channels.",
      "Performed digital forensic investigations using FTK Imager and Autopsy, including forensic disk acquisition, artifact analysis, and vehicle forensics in controlled VM-based environments.",
    ],
    govTooltip: "yes, the actual government 🇮🇳",
  },
  {
    company: "SentinelOne",
    shortName: "SentinelOne",
    role: "Solutions Engineer Intern",
    period: "Aug 2025 – Jan 2026",
    location: "Remote",
    impactNumber: "40%",
    impactLabel: "triage time reduction",
    highlights: [
      "Automated IOC enrichment workflows using VirusTotal APIs to integrate contextual threat intelligence into SOC investigation pipelines, reducing manual triage time by ~40%.",
      "Contributed to AI-driven SIEM workflows involving log analysis, alert correlation, anomaly detection, and incident investigation processes.",
    ],
    govTooltip: null,
  },
  {
    company: "Infosys Springboard",
    shortName: "Infosys Springboard",
    role: "AI Intern",
    period: "Aug 2025 – Oct 2025",
    location: "Remote",
    impactNumber: "~85%",
    impactLabel: "ML accuracy",
    highlights: [
      "Built and deployed ScoreSight, a sports analytics platform with 5 ML pipelines achieving ~85% accuracy.",
      "Executed data processing, feature engineering, hyperparameter tuning and model optimization using Python.",
    ],
    govTooltip: null,
  },
];

export const projects = [
  {
    title: "Cost-Efficient RAG + LLM-as-Judge",
    subtitle: "Bias evaluation and mitigation pipeline for LLMs",
    stack: ["Python", "RAG", "Open AI API", "LLM Evaluation"],
    github: "https://github.com/ksraavya/cost-efficient-rag-llm-evaluation",
    demo: null,
    description: "A cost-efficient retrieval-augmented generation system with an LLM-as-judge evaluation framework to detect and mitigate biases in model outputs.",
    highlights: [
      "Built a cost-efficient RAG pipeline optimized for low-latency retrieval",
      "Designed an LLM-as-judge evaluation loop to score and flag biased outputs",
      "Implemented mitigation strategies that feed back into the generation pipeline",
    ],
    visual: "pipeline", // which mini-visual to render
    featured: true,
    image: "/projects/rag.png",
  },
  {
    title: "Content Integrity Investigator",
    subtitle: "RL environment for AI agent training",
    stack: ["Python", "FastAPI", "Pydantic", "Docker", "OpenAI API"],
    github: "https://github.com/ksraavya/meta-hackathon",
    demo: null,
    description: "A multi-step Reinforcement Learning environment to transition AI agents from static one-shot classification to multi-turn reasoning for social media moderation.",
    highlights: [
      "Architected a state-machine framework using Pydantic for schema enforcement and tool-use action space",
      "Integrated an asymmetric reward function to minimize high-stakes false positives",
      "Mitigated strategy degeneracy by engineering adversarial episode pools, achieving average baseline score of 0.52",
    ],
    visual: "rl",
    featured: true,
    image: "/projects/content-integrity.png",
  },
  {
    title: "BlueOrbit",
    subtitle: "Geopolitical intelligence engine",
    stack: ["Python", "FastAPI", "Neo4j", "Pandas", "NetworkX"],
    github: "https://github.com/ksraavya/ontology-blueorbit",
    demo: "https://blueorbit-ontology.vercel.app/",
    description: "A graph-based intelligence platform using Neo4j (140K+ relationships) to model geopolitical, organizational, and cross-domain entity networks.",
    highlights: [
      "Developed agentic data pipelines and analytics APIs using FastAPI",
      "Designed a simulation engine (40+ scenarios) that analyzes multi-hop relationships",
      "Deployed backend on Render with live demo available",
    ],
    visual: "graph",
    featured: true,
    image: "/projects/blueorbit.png",
  },
  {
    title: "StreamSentry",
    subtitle: "Real-time anomaly detection pipeline",
    stack: ["Kafka", "Airflow", "Snowflake", "dbt", "River", "Streamlit"],
    github: "https://github.com/ksraavya/fraud-detection-kafka",
    demo: null,
    description: "Streaming pipeline ingesting PaySim transactions via Kafka with synthetic anomaly injection (~3% adversarial events).",
    highlights: [
      "Consumer persists batches as NDJSON and uploads to Snowflake",
      "dbt models feature marts with Dynamic Tables",
      "Two-layer ML scoring: rule-based classifier + River online learning model orchestrated end-to-end with Airflow",
    ],
    visual: "anomaly",
    featured: false,
    image: "/projects/streamsentry.png",
  },
];

export const achievements = [
  {
    title: "LeetCode Knight",
    detail: "Rating 2000+",
    category: "competitive",
    icon: "⚔️",
  },
  {
    title: "Codeforces Specialist",
    detail: "Rating 1400+",
    category: "competitive",
    icon: "🏆",
  },
  {
    title: "ICPC AlgoQueen 2025",
    detail: "Finalist — Top 400 / 5000+ participants",
    category: "competitive",
    icon: "👑",
  },
  {
    title: "India Innovates Hackathon 2026",
    detail: "Finalist — Top 10 in Digital Democracy domain, shortlisted for ministry evaluation",
    category: "hackathon",
    icon: "🇮🇳",
  },
  {
    title: "Tata Imagination Challenge 2025",
    detail: "Finalist — Top 7000 / 300,000+ participants nationwide",
    category: "hackathon",
    icon: "✨",
  },
  {
    title: "UIDAI Data Hackathon 2025",
    detail: "Developed a district-level risk-prioritization framework across ~916 districts",
    category: "hackathon",
    icon: "🗺️",
  },
];

export const skills = {
  "AI & Agentic Systems": ["PyTorch", "scikit-learn", "Pandas", "NumPy", "Hugging Face Transformers", "RAG", "LLM Evaluation"],
  "Data & Intelligence": ["Neo4j", "PostgreSQL", "MongoDB", "Kafka", "Airflow", "FastAPI", "Snowflake", "dbt"],
  "Programming": ["Python", "Java", "C++", "JavaScript", "TypeScript"],
  "Tools & Platforms": ["Linux", "Docker", "Git", "Tableau", "Streamlit"],
};

// System prompt for the AI twin chat widget
export const chatSystemPrompt = `You are Sraavya's AI twin — a witty, slightly sassy, but always professional portfolio assistant. You only answer questions about Sraavya Kochhar: her projects, skills, experience, education, and achievements. 

Personality: casual and confident, uses light humor, occasionally drops an emoji, speaks like a sharp CS student who knows her stuff. Never pretentious. Honest when something is uncertain.

If asked anything off-topic (sports, news, random facts, other people), respond with a short, personality-forward redirect. Examples:
- "lol that's not really my department — I only know about Sraavya 😄 try asking about her projects!"
- "interesting question, but I'm just here to talk about Sraavya's work 🙃"
- "my knowledge is very specifically Sraavya-shaped 😄 what do you want to know about her?"

After your first response to a user, casually drop this hint once and only once: "oh also... I heard there's a secret somewhere on this page 🤫"

Key facts about Sraavya:
- Pre-final year CS (Data Science) student at MAIT, GGSIPU. CGPA: 9.2/10
- Interned at I4C (Ministry of Home Affairs) — worked on real national cybercrime data
- Interned at SentinelOne — reduced SOC triage time by ~40%
- Interned at Infosys Springboard — built ML sports analytics platform at ~85% accuracy
- LeetCode Knight (2000+), Codeforces Specialist (1400+), ICPC Top 400/5000+
- Projects: Cost-efficient RAG + LLM-as-judge, BlueOrbit (geopolitical graph engine, Neo4j 140K+ relationships), StreamSentry (Kafka anomaly detection), Content Integrity Investigator (RL environment)
- Skills: Python, PyTorch, Neo4j, Kafka, Airflow, Snowflake, FastAPI, Docker, RAG, LLM evaluation
- GitHub: github.com/ksraavya
- Strong inclination toward AI/ML and GenAI

Keep answers concise but substantive. Don't make things up — if you don't know a specific detail, say so honestly.`;