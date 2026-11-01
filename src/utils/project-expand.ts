export interface ProjectMetadata {
  id: string;
  name: string;
  duration: string;
  durationShort: string;
  repoUrl: string;
  techStack: string[];
}

export const PROJECT_DETAILS: Record<string, ProjectMetadata> = {
  sage: {
    id: 'sage',
    name: 'SAGE (Student Academic Guidance Engine)',
    duration: 'Aug 2026 – Oct 2026 · 3 Months (Academic Hackathon & Deployment)',
    durationShort: 'Aug 2026 – Oct 2026 (3 mos)',
    repoUrl: 'https://github.com/PokuriLahari/KLH-CSE-2026-team22-SAGE',
    techStack: [
      'FastAPI (Python 3.11)',
      'PostgreSQL Database',
      'SQLAlchemy 2.0 ORM',
      'Alembic Migrations',
      'Contextual RAG Pipeline',
      'Vector Embeddings & Semantic Search',
      'JWT Authentication & Bcrypt',
      'Pydantic v2 Contracts',
      'Docker Containerization'
    ]
  },
  watchdog: {
    id: 'watchdog',
    name: 'WatchDog — Intelligent Website Change Detection',
    duration: 'Jun 2026 – Oct 2026 · 5 Months (Web Crawler & Diff Engine)',
    durationShort: 'Jun 2026 – Oct 2026 (5 mos)',
    repoUrl: 'https://github.com/PokuriLahari/intelligent-website-change-detection',
    techStack: [
      'Python & FastAPI Backend',
      'Headless Crawler & DOM Content Extractor',
      'Automated DOM & Visual Diffing Engine',
      'Interval Scheduler (30m / 5m Checks)',
      'Alert & Notification Dispatcher',
      'Event Logging & History Tracking',
      'Real-Time Dashboard Analytics (Tailwind CSS)',
      'Docker Containerization'
    ]
  },
  'multi-agent': {
    id: 'multi-agent',
    name: 'Multi-Agent AI Document System',
    duration: 'May 2026 – Oct 2026 · 6 Months (Architecture & Sprint 0)',
    durationShort: 'May 2026 – Oct 2026 (6 mos)',
    repoUrl: 'https://github.com/PokuriLahari/Multi-Agent-AI-Document-System',
    techStack: [
      'FastAPI Backend (Async)',
      'Streamlit Reactive UI',
      'Autonomous Multi-Agent Loop',
      'Vector Memory Lake (FAISS / ChromaDB)',
      'PyMuPDF & Unstructured PDF Parsing',
      'Evidence Synthesizer & Guardrails',
      'SQLite Metadata Storage',
      'Python AsyncIO Processing'
    ]
  },
  'aws-builder': {
    id: 'aws-builder',
    name: 'AWS Builder Center Articles',
    duration: 'Published Oct 2026 · Hands-on Technical Walkthrough',
    durationShort: 'Oct 2026 (Publication)',
    repoUrl: 'https://builder.aws.com/content/3LGJ9OADvLus28lQQiWyhVzuz3X/build-a-serverless-daily-quote-emailer-with-aws-lambda-eventbridge-scheduler-and-amazon-ses',
    techStack: [
      'AWS Lambda (Serverless Compute)',
      'Amazon EventBridge Scheduler',
      'Amazon Simple Email Service (SES)',
      'AWS IAM Least-Privilege Policies',
      'Amazon CloudWatch Logs & Metrics',
      'Node.js & Python Serverless Functions',
      'Architecture Design Flowcharts',
      'AWS Builder Center Community Hub'
    ]
  }
};

export function isExpandableProject(projectId: string): boolean {
  // SAGE and WatchDog have expandable details
  return projectId === 'sage' || projectId === 'watchdog' || projectId === 'multi-agent';
}

export function getProjectDuration(projectId: string): string {
  return PROJECT_DETAILS[projectId]?.duration || '';
}

export function toggleProjectExpansion(
  state: Record<string, boolean>,
  projectId: string
): Record<string, boolean> {
  // Do not allow expanding non-expandable projects
  if (!isExpandableProject(projectId)) {
    return state;
  }
  return {
    ...state,
    [projectId]: !state[projectId]
  };
}

export function isProjectExpanded(
  state: Record<string, boolean>,
  projectId: string
): boolean {
  if (!isExpandableProject(projectId)) {
    return false;
  }
  return Boolean(state[projectId]);
}
