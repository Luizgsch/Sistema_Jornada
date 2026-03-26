import type { AlertData } from "../../types";

export const mockAlerts: AlertData[] = [
  {
    id: "1",
    message: "Vaga aberta há mais de 30 dias: Analista de Logística",
    priority: "high",
    icon: "Clock",
    date: "há 2 horas",
  },
  {
    id: "2",
    message: "Contrato temporário próximo do vencimento (5 funcionários)",
    priority: "medium",
    icon: "FileWarning",
    date: "há 5 horas",
  },
  {
    id: "3",
    message: "Turnover elevado no setor Produção (+15% este mês)",
    priority: "high",
    icon: "TrendingUp",
    date: "hoje às 09:00",
  },
  {
    id: "4",
    message: "Entrevista pendente há 5 dias: Candidato João Lima",
    priority: "medium",
    icon: "Calendar",
    date: "ontem",
  },
];
