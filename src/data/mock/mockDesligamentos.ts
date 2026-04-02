export const mockDesligamentosKpis = [
  {
    label: "Desligamentos no Mês",
    value: "14",
    change: 12.5,
    trend: "up" as const, // Increased offboarding is usually bad, so let's just use up/down
  },
  {
    label: "Turnover Mensal",
    value: "2.1%",
    change: 0.3,
    trend: "up" as const,
  },
  {
    label: "Turnover Anual",
    value: "14.8%",
    change: 1.2,
    trend: "down" as const,
  },
  {
    label: "Média de Permanência",
    value: "2.8 Anos",
    change: 5.0,
    trend: "up" as const,
  }
];

export const mockTurnoverChart = [
  { month: "Jan", turnover: 1.2, voluntario: 0.8, involuntario: 0.4 },
  { month: "Fev", turnover: 1.5, voluntario: 1.0, involuntario: 0.5 },
  { month: "Mar", turnover: 2.1, voluntario: 1.5, involuntario: 0.6 },
  { month: "Abr", turnover: 1.8, voluntario: 1.2, involuntario: 0.6 },
  { month: "Mai", turnover: 2.3, voluntario: 1.8, involuntario: 0.5 },
  { month: "Jun", turnover: 1.9, voluntario: 1.0, involuntario: 0.9 },
  { month: "Jul", turnover: 2.5, voluntario: 1.5, involuntario: 1.0 },
];

export const mockDesligamentosList = [
  {
    id: "1",
    nome: "Ana Clara Silva",
    cargo: "Desenvolvedora Frontend Senior",
    setor: "Tecnologia",
    dataAdmissao: "2021-03-15",
    dataDesligamento: "2024-03-10",
    tipo: "Voluntário",
    motivo: "Nova oportunidade de carreira",
  },
  {
    id: "2",
    nome: "Carlos Eduardo Santos",
    cargo: "Analista de Suporte",
    setor: "Atendimento",
    dataAdmissao: "2023-01-20",
    dataDesligamento: "2024-03-05",
    tipo: "Involuntário",
    motivo: "Baixa performance",
  },
  {
    id: "3",
    nome: "Mariana Costa",
    cargo: "Gerente de Marketing",
    setor: "Marketing",
    dataAdmissao: "2019-08-10",
    dataDesligamento: "2024-02-28",
    tipo: "Voluntário",
    motivo: "Mudança de cidade",
  },
  {
    id: "4",
    nome: "Roberto Alves",
    cargo: "Assistente Administrativo",
    setor: "Financeiro",
    dataAdmissao: "2023-09-01",
    dataDesligamento: "2024-02-15",
    tipo: "Involuntário",
    motivo: "Reestruturação do setor",
  },
];
