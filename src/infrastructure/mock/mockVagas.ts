import type { VacancySectorData, HiringTrendData } from "@/shared/types";

export const mockVagasPorSetor: VacancySectorData[] = [
  { setor: "Produção", vagas: 12 },
  { setor: "Logística", vagas: 5 },
  { setor: "Administrativo", vagas: 3 },
  { setor: "TI", vagas: 2 },
  { setor: "Comercial", vagas: 1 },
];

export const mockHiringTrend: HiringTrendData[] = [
  { mes: "Jan", contratacoes: 6 },
  { mes: "Fev", contratacoes: 9 },
  { mes: "Mar", contratacoes: 8 },
  { mes: "Abr", contratacoes: 11 },
  { mes: "Mai", contratacoes: 13 },
  { mes: "Jun", contratacoes: 10 },
];
