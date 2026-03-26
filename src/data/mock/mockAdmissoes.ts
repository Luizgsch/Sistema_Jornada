export interface DashboardAdmissoesMetrics {

  totalMes: number;
  pendentes: number;
  documentosFaltantes: number;
  onboardingAtivo: number;
}

export const mockAdmissoesMetrics: DashboardAdmissoesMetrics = {
  totalMes: 24,
  pendentes: 12,
  documentosFaltantes: 8,
  onboardingAtivo: 15
};

export interface RecentAdmissao {
  id: string;
  nome: string;
  cargo: string;
  setor: string;
  dataInicio: string;
  statusDoc: "completo" | "pendente" | "analise";
}

export const mockRecentAdmissoes: RecentAdmissao[] = [
  {
    id: "1",
    nome: "Alice Ferreira",
    cargo: "Desenvolvedora Frontend",
    setor: "Tecnologia",
    dataInicio: "2026-04-01",
    statusDoc: "completo"
  },
  {
    id: "2",
    nome: "Bruno Santos",
    cargo: "Analista de Marketing",
    setor: "Marketing",
    dataInicio: "2026-04-05",
    statusDoc: "pendente"
  },
  {
    id: "3",
    nome: "Carla Oliveira",
    cargo: "Gerente de Projetos",
    setor: "Operações",
    dataInicio: "2026-04-10",
    statusDoc: "analise"
  },
  {
    id: "4",
    nome: "Diego Lima",
    cargo: "Especialista em RH",
    setor: "RH",
    dataInicio: "2026-04-12",
    statusDoc: "pendente"
  }
];
