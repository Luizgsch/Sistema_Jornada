export const mockCursos = [
  {
    id: "C-01",
    nome: "Boas Práticas de Segurança da Informação",
    categoria: "Compliance",
    duracao: "4h",
    formato: "Online",
    obrigatorio: true,
    responsavel: "TI",
    status: "ativo",
    descricao:
      "Capacitação obrigatória sobre classificação de dados, phishing, senhas e uso seguro de e-mail corporativo. Alinhada à política interna de SI e LGPD.",
    aulas: [
      "Introdução e cenário de ameaças",
      "Senhas, MFA e gestão de acessos",
      "Phishing e engenharia social",
      "Dados pessoais e boas práticas LGPD",
      "Quiz final e certificado",
    ],
  },
  {
    id: "C-02",
    nome: "Liderança Inspiradora",
    categoria: "Soft Skills",
    duracao: "16h",
    formato: "Híbrido",
    obrigatorio: false,
    responsavel: "RH",
    status: "ativo",
    descricao:
      "Desenvolvimento de competências de liderança situacional, feedback contínuo e condução de reuniões produtivas com equipes híbridas.",
    aulas: [
      "Autoconhecimento e estilo de liderança",
      "Feedback e conversas difíceis",
      "Metas, priorização e delegação",
      "Engajamento e reconhecimento",
      "Projeto prático e mentoria em grupo",
    ],
  },
  {
    id: "C-03",
    nome: "Integração Novos Colaboradores (Onboarding)",
    categoria: "Institucional",
    duracao: "8h",
    formato: "Presencial",
    obrigatorio: true,
    responsavel: "RH",
    status: "ativo",
    descricao:
      "Jornada de boas-vindas: cultura, benefícios, políticas internas, saúde e segurança no trabalho e canais de suporte ao colaborador.",
    aulas: [
      "Cultura e propósito da empresa",
      "Benefícios e políticas de RH",
      "SSMA e rotas de emergência",
      "Ferramentas digitais e acessos",
      "Tour presencial e encerramento",
    ],
  },
  {
    id: "C-04",
    nome: "Design System Fundamentals",
    categoria: "Técnico",
    duracao: "10h",
    formato: "Online",
    obrigatorio: false,
    responsavel: "Design Team",
    status: "arquivado",
    descricao:
      "Fundamentos de tokens, componentes reutilizáveis e documentação de padrões visuais para produtos digitais (curso arquivado — consulte sucessão).",
    aulas: ["Tokens e temas", "Componentes base", "Acessibilidade em UI", "Handoff com desenvolvimento"],
  },
];

export const mockTrilhas = [
  { id: "T-01", nome: "Formação de Novos Líderes", area: "Todas", cargo: "Coordenadores/Gerentes", qtdCursos: 5, status: "ativa" },
  { id: "T-02", nome: "Onboarding Desenvolvedores", area: "Tecnologia", cargo: "Desenvolvedor(a)", qtdCursos: 8, status: "ativa" },
  { id: "T-03", nome: "Compliance e Ética 2026", area: "Todas", cargo: "Todos", qtdCursos: 3, status: "arquivada" },
];

export const mockCertificados = [
  { id: "CRT-101", colaborador: "Alice Ferreira", matricula: "MAT-101", curso: "Design System Fundamentals", conclusao: "2025-08-10", validade: "Vitalício", status: "valido", setor: "Tecnologia" },
  { id: "CRT-102", colaborador: "Bruno Souza", matricula: "MAT-102", curso: "Boas Práticas de Segurança da Informação", conclusao: "2025-05-20", validade: "2026-05-20", status: "vencendo", setor: "Tecnologia" },
  { id: "CRT-103", colaborador: "Carla Duarte", matricula: "MAT-103", curso: "Liderança Inspiradora", conclusao: "2024-01-15", validade: "2026-01-15", status: "vencido", setor: "RH" },
];

export const mockTrainingStats = {
  certificadosValidos: 145,
  certificadosVencendo: 12,
  certificadosVencidos: 5,
};
