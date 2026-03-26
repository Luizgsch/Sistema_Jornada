export const mockRecrutamentoMetrics = {
  vagasAbertas: 12,
  vagasEmProcesso: 8,
  vagasFechadasMes: 5,
  candidatosTriagem: 45,
  tempoMedioContratacao: "18 dias"
};

export const mockRecrutamentoVagas = [
  { id: "VAG-001", cargo: "Desenvolvedor Backend Senior", setor: "Tecnologia", gestor: "Ricardo Santos", contrato: "CLT", turno: "Integral", salario: "R$ 15.000", status: "aberta", dataAbertura: "2026-03-10" },
  { id: "VAG-002", cargo: "Analista de Dados Pleno", setor: "Tecnologia", gestor: "Ana Lima", contrato: "CLT", turno: "Integral", salario: "R$ 8.500", status: "processo", dataAbertura: "2026-03-15" },
  { id: "VAG-003", cargo: "Gerente de Marketing", setor: "Marketing", gestor: "Carla Souza", contrato: "PJ", turno: "Flexível", salario: "R$ 12.000", status: "aberta", dataAbertura: "2026-03-18" },
  { id: "VAG-004", cargo: "Analista de RH", setor: "RH", gestor: "Mariana Costa", contrato: "CLT", turno: "Integral", salario: "R$ 6.000", status: "pausada", dataAbertura: "2026-02-28" },
];

export const mockPipelineCandidatos = [
  { id: "C-1", nome: "João Silva", experiencia: "5 anos", cargo: "Dev Backend", origem: "LinkedIn", etapa: "triagem" },
  { id: "C-2", nome: "Maria Oliveira", experiencia: "3 anos", cargo: "Analista de Dados", origem: "Indicação", etapa: "entrevista-rh" },
  { id: "C-3", nome: "Pedro Santos", experiencia: "8 anos", cargo: "Gerente TI", origem: "Vagas.com", etapa: "entrevista-gestor" },
  { id: "C-4", nome: "Fernanda Lima", experiencia: "2 anos", cargo: "Designer", origem: "Behance", etapa: "inscritos" },
  { id: "C-5", nome: "Lucas Rocha", experiencia: "6 anos", cargo: "Dev Frontend", origem: "Indeed", etapa: "teste-tecnico" },
];

export const mockBancoCandidatos = [
  { id: "B-1", nome: "Carlos Magno", telefone: "(11) 98888-7777", cidade: "São Paulo", cargo: "Dev Java", experiencia: "10 anos", origem: "LinkedIn", status: "disponivel" },
  { id: "B-2", nome: "Beatriz Nogueira", telefone: "(21) 97777-6666", cidade: "Rio de Janeiro", cargo: "UX Designer", experiencia: "4 anos", origem: "Indicação", status: "em-processo" },
  { id: "B-3", nome: "Andre Silva", telefone: "(31) 96666-5555", cidade: "Belo Horizonte", cargo: "Product Owner", experiencia: "7 anos", origem: "Glassdoor", status: "disponivel" },
];

export const mockIndicacoes = [
  { id: "I-1", candidato: "Roberto Faria", cargo: "Dev Python", quemIndicou: "Lucas Mendes", setor: "Tecnologia", data: "2026-03-20", status: "entrevista" },
  { id: "I-2", candidato: "Camila Luz", cargo: "Analista Financeiro", quemIndicou: "Patrícia Alves", setor: "Financeiro", data: "2026-03-22", status: "triagem" },
];

export const mockFunnelRecrutamento = [
  { name: "Inscritos", value: 120 },
  { name: "Triagem", value: 80 },
  { name: "Entrevista", value: 30 },
  { name: "Teste", value: 15 },
  { name: "Proposta", value: 5 },
];
