export type TechCategory = "backend" | "ai" | "data" | "infra" | "test" | "docs";
export type DecisionOwnership = "direct" | "team" | "analyzed";

export interface TechItem {
  name: string;
  category: TechCategory;
  reason?: string;
}

export interface ProjectMetric {
  label: string;
  before?: string;
  after?: string;
  value?: string;
  note: string;
}

export interface ProjectProblem {
  title: string;
  problem: string;
  approach: string;
  cause: string;
  solution: string;
  result: string;
}

export interface StarStory {
  title: string;
  situation: string;
  action: string;
  result: string;
  learning: string;
}

export interface AiPortfolioDetail {
  model: string;
  inputData: string;
  outputData: string;
  preprocessing: string[];
  dataCharacteristics: string[];
  selectedModelReason: string;
  resultDrivenImprovements: string[];
}

export interface ProjectVisualAsset {
  kind: "architecture" | "erd" | "flowchart" | "ai-chart" | "performance" | "screenshot";
  title: string;
  src: string;
  caption: string;
  highlight?: string;
}

export interface RecruiterSummary {
  role: string;
  impact: string;
  proof: string;
}

export interface PortfolioProject {
  slug: string;
  name: string;
  label: string;
  priority: number;
  period: string;
  team: string;
  status: "active" | "completed";
  summary: string;
  recruiterSummary: RecruiterSummary;
  common: {
    purpose: string;
    goal: string;
    developmentIssue: string;
    results: string[];
  };
  role: {
    title: string;
    contribution: string;
    implementedFeatures: string[];
    achievements: string[];
  };
  tech: TechItem[];
  decisions: {
    title: string;
    decision: string;
    reason: string;
    alternatives: string[];
    tradeOff: string;
    verification: string;
    ownership: DecisionOwnership;
    ownershipNote?: string;
  }[];
  problems: ProjectProblem[];
  ai?: AiPortfolioDetail;
  metrics: ProjectMetric[];
  visuals: ProjectVisualAsset[];
  retrospective: {
    learned: string[];
    regrets: string[];
    improvements: string[];
    collaboration: string;
  };
  star: StarStory[];
  links: { label: string; url: string; external: boolean }[];
}
