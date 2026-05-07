export const mockAnalyticsStats = {
  totalColaboradores: 485,
  vagasAbertas: 24,
  admissoesMes: 15,
  turnoverMes: "2.5%",
  treinamentosRealizados: 120,
  certificadosValidos: 450,
};

export const mockRecruitmentFunnel = [
  { name: 'Inscritos', value: 350 },
  { name: 'Triagem', value: 120 },
  { name: 'Entrevistas', value: 45 },
  { name: 'Aprovados', value: 15 },
];

export const mockCandidateSources = [
  { name: 'LinkedIn', value: 45 },
  { name: 'Indicações', value: 30 },
  { name: 'Gupy', value: 15 },
  { name: 'Site Empresa', value: 10 },
];

export const mockHeadcountHistory = [
  { mes: 'Jan', headcount: 420 },
  { mes: 'Fev', headcount: 435 },
  { mes: 'Mar', headcount: 450 },
  { mes: 'Abr', headcount: 485 },
];

export const mockContractTypes = [
  { name: 'CLT/Efetivos', value: 80 },
  { name: 'Temporários', value: 15 },
  { name: 'Estagiários', value: 5 },
];

export const mockTurnoverReasons = [
  { name: 'Melhor oportunidade', value: 40 },
  { name: 'Incompatibilidade cultural', value: 25 },
  { name: 'Término de Contrato', value: 20 },
  { name: 'Baixo Desempenho', value: 15 },
];

export const mockTurnoverHistory = [
  { mes: 'Jan', taxa: 1.2 },
  { mes: 'Fev', taxa: 1.5 },
  { mes: 'Mar', taxa: 3.1 },
  { mes: 'Abr', taxa: 2.5 },
];

export const mockRelatorios = [
  { id: "REL-001", nome: "Efetividade do Funil de Recrutamento", categoria: "Recrutamento", periodo: "Últimos 30 dias", ultimaAtualizacao: "Hoje", status: "pronto" },
  { id: "REL-002", nome: "Headcount e Custos por Setor", categoria: "Colaboradores", periodo: "Ano atual", ultimaAtualizacao: "Ontem", status: "pronto" },
  { id: "REL-003", nome: "Análise de Desligamentos (Offboarding)", categoria: "Turnover", periodo: "Últimos 6 meses", ultimaAtualizacao: "2 dias atrás", status: "pronto" },
  { id: "REL-004", nome: "Status de Certificações Obrigatórias", categoria: "Treinamentos", periodo: "Mês atual", ultimaAtualizacao: "Hoje", status: "gerando" },
  { id: "REL-005", nome: "Indicadores de Diversidade", categoria: "Colaboradores", periodo: "Ano atual", ultimaAtualizacao: "1 semana atrás", status: "pronto" },
];
