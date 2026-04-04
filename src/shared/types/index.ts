export interface KpiData {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
}

export interface VacancySectorData {
  setor: string;
  vagas: number;
}

export interface HiringTrendData {
  mes: string;
  contratacoes: number;
}

export interface FunnelData {
  stage: string;
  count: number;
}

export interface CandidateData {
  id: string;
  nome: string;
  score: number;
  skills: string[];
  status: string;
  avatar?: string;
}

export interface AlertData {
  id: string;
  message: string;
  priority: "low" | "medium" | "high";
  icon: string;
  date: string;
}
