export const mockRecrutamentoMetrics = {
  vagasAbertas: 12,
  vagasEmProcesso: 8,
  vagasFechadasMes: 5,
  candidatosTriagem: 45,
  tempoMedioContratacao: "18 dias",
};

/** Métricas de pauta do dia — usadas apenas no dashboard operacional de Recrutamento */
export const mockRecrutamentoOperacaoDia = {
  entrevistasAgendaHoje: 4,
  candidatosPendentesAcao: 12,
};

export const mockEntrevistasHoje = [
  { id: "E1", hora: "09:30", candidato: "Maria Oliveira", vaga: "Analista de Dados Pleno", sala: "Meet · RH" },
  { id: "E2", hora: "11:00", candidato: "João Silva", vaga: "Desenvolvedor Backend Senior", sala: "Presencial · TI" },
  { id: "E3", hora: "14:00", candidato: "Pedro Santos", vaga: "Gerente TI", sala: "Teams · Diretoria" },
  { id: "E4", hora: "16:30", candidato: "Ana Costa", vaga: "Analista de RH", sala: "Meet · RH" },
];

export const mockRecrutamentoVagas = [
  { id: "VAG-001", cargo: "Desenvolvedor Backend Senior", setor: "Tecnologia", gestor: "Ricardo Santos", contrato: "CLT", turno: "Integral", salario: "R$ 15.000", status: "aberta", dataAbertura: "2026-03-10" },
  { id: "VAG-002", cargo: "Analista de Dados Pleno", setor: "Tecnologia", gestor: "Ana Lima", contrato: "CLT", turno: "Integral", salario: "R$ 8.500", status: "processo", dataAbertura: "2026-03-15" },
  { id: "VAG-003", cargo: "Gerente de Marketing", setor: "Marketing", gestor: "Carla Souza", contrato: "PJ", turno: "Flexível", salario: "R$ 12.000", status: "aberta", dataAbertura: "2026-03-18" },
  { id: "VAG-004", cargo: "Analista de RH", setor: "RH", gestor: "Mariana Costa", contrato: "CLT", turno: "Integral", salario: "R$ 6.000", status: "pausada", dataAbertura: "2026-02-28" },
  { id: "VAG-088", cargo: "Analista Fiscal Pleno", setor: "Financeiro", gestor: "Paula Mendes", contrato: "CLT", turno: "Integral", salario: "R$ 9.200", status: "encerrado", dataAbertura: "2025-08-01" },
  { id: "VAG-089", cargo: "Assistente de Logística", setor: "Operações", gestor: "Fernando Reis", contrato: "CLT", turno: "Integral", salario: "R$ 3.400", status: "encerrado", dataAbertura: "2025-05-12" },
];

export const mockPipelineCandidatos = [
  { id: "C-1", nome: "João Silva", experiencia: "5 anos", cargo: "Dev Backend", origem: "LinkedIn", etapa: "triagem" },
  { id: "C-2", nome: "Maria Oliveira", experiencia: "3 anos", cargo: "Analista de Dados", origem: "Indicação", etapa: "entrevista-rh" },
  { id: "C-3", nome: "Pedro Santos", experiencia: "8 anos", cargo: "Gerente TI", origem: "Vagas.com", etapa: "entrevista-gestor" },
  { id: "C-4", nome: "Fernanda Lima", experiencia: "2 anos", cargo: "Designer", origem: "Behance", etapa: "inscritos" },
  { id: "C-5", nome: "Lucas Rocha", experiencia: "6 anos", cargo: "Dev Frontend", origem: "Indeed", etapa: "teste-tecnico" },
];

export const mockBancoCandidatos = [
  {
    id: "B-1",
    nome: "Carlos Magno",
    telefone: "(11) 98888-7777",
    cidade: "São Paulo",
    cargo: "Dev Java",
    experiencia: "10 anos",
    origem: "LinkedIn",
    status: "disponivel",
    email: "carlos.magno@email.com",
    resumo:
      "Especialista em APIs e microsserviços; liderou squads em e-commerce. Busca posição sênior com foco em arquitetura limpa.",
    competencias: ["Java", "Spring Boot", "Kafka", "AWS"],
  },
  {
    id: "B-2",
    nome: "Beatriz Nogueira",
    telefone: "(21) 97777-6666",
    cidade: "Rio de Janeiro",
    cargo: "UX Designer",
    experiencia: "4 anos",
    origem: "Indicação",
    status: "em-processo",
    email: "beatriz.nogueira@email.com",
    resumo:
      "Design de produto B2B, pesquisa com usuários e handoff próximo a engenharia. Portfólio com cases em fintech.",
    competencias: ["Figma", "Pesquisa UX", "Design System", "Prototipação"],
  },
  {
    id: "B-3",
    nome: "Andre Silva",
    telefone: "(31) 96666-5555",
    cidade: "Belo Horizonte",
    cargo: "Product Owner",
    experiencia: "7 anos",
    origem: "Glassdoor",
    status: "disponivel",
    email: "andre.silva@email.com",
    resumo:
      "Discovery contínuo, OKRs e priorização em squads ágeis. Experiência forte em produtos internos de RH e analytics.",
    competencias: ["Scrum", "Métricas", "Roadmap", "Stakeholders"],
  },
  {
    id: "B-4",
    nome: "Fernanda Duarte",
    telefone: "(48) 95555-4444",
    cidade: "Florianópolis",
    cargo: "Analista de RH",
    experiencia: "5 anos",
    origem: "LinkedIn",
    status: "contratado",
    email: "fernanda.duarte@email.com",
    resumo: "BP, folha e recrutamento em indústria; integração com admissão digital.",
    competencias: ["Folha", "LGPD", "Employer branding", "Entrevistas"],
  },
  {
    id: "B-5",
    nome: "Paulo Henrique",
    telefone: "(85) 94444-3333",
    cidade: "Fortaleza",
    cargo: "Dev Frontend",
    experiencia: "2 anos",
    origem: "Vagas.com",
    status: "reprovado",
    email: "paulo.henrique@email.com",
    resumo: "Perfil júnior; não atingiu critério técnico da vaga sênior.",
    competencias: ["React", "TypeScript", "Git"],
  },
  {
    id: "B-6",
    nome: "Larissa Menezes",
    telefone: "(19) 93333-2222",
    cidade: "Campinas",
    cargo: "Analista de Dados",
    experiencia: "3 anos",
    origem: "Indicação",
    status: "triagem",
    email: "larissa.menezes@email.com",
    resumo: "SQL e dashboards; aguardando entrevista com gestor.",
    competencias: ["SQL", "Power BI", "Python"],
  },
  {
    id: "B-7",
    nome: "Otávio Rezende",
    telefone: "(61) 92222-1111",
    cidade: "Brasília",
    cargo: "Coordenador de Logística",
    experiencia: "12 anos",
    origem: "Indeed",
    status: "arquivado",
    email: "otavio.rezende@email.com",
    resumo: "Candidato arquivado após 12 meses sem manifestação de interesse.",
    competencias: ["WMS", "Indicadores", "Equipes"],
  },
];

export const mockIndicacoes = [
  { id: "I-1", candidato: "Roberto Faria", cargo: "Dev Python", quemIndicou: "Lucas Mendes", setor: "Tecnologia", data: "2026-03-20", status: "entrevista" },
  { id: "I-2", candidato: "Camila Luz", cargo: "Analista Financeiro", quemIndicou: "Patrícia Alves", setor: "Financeiro", data: "2026-03-22", status: "triagem" },
  { id: "I-3", candidato: "Eduardo Prado", cargo: "Analista de RH", quemIndicou: "Mariana RH", setor: "Recursos Humanos", data: "2026-04-02", status: "triagem" },
];

export const mockFunnelRecrutamento = [
  { name: "Inscritos", value: 120 },
  { name: "Triagem", value: 80 },
  { name: "Entrevista", value: 30 },
  { name: "Teste", value: 15 },
  { name: "Proposta", value: 5 },
];

/** Distribuição agregada para gráficos — `statusKey` alinha cores com `StatusBadge`. */
export const mockCandidatosPorStatus = [
  { name: "Disponível", value: 42, statusKey: "disponivel" },
  { name: "Em Processo", value: 28, statusKey: "em-processo" },
  { name: "Triagem", value: 18, statusKey: "triagem" },
  { name: "Entrevista", value: 12, statusKey: "entrevista" },
  { name: "Contratado", value: 9, statusKey: "contratado" },
  { name: "Reprovado", value: 14, statusKey: "reprovado" },
  { name: "Arquivado", value: 22, statusKey: "arquivado" },
] as const;
