import type { KpiData } from "@/shared/types";

export const mockKpis: KpiData[] = [
  { label: "Headcount Atual", value: 842, change: 12, trend: "up" },
  { label: "Vagas Abertas", value: 23, change: -2, trend: "down" },
  { label: "Turnover Mensal", value: "3.2%", change: -0.5, trend: "down" },
  { label: "SLA de Contratação", value: "18 dias", change: 2, trend: "up" },
  { label: "Taxa de Desistência", value: "12%", change: 1.5, trend: "up" },
];
