export const mockCursos = [
  { id: "C-01", nome: "Boas Práticas de Segurança da Informação", categoria: "Compliance", duracao: "4h", formato: "Online", obrigatorio: true, responsavel: "TI", status: "ativo" },
  { id: "C-02", nome: "Liderança Inspiradora", categoria: "Soft Skills", duracao: "16h", formato: "Híbrido", obrigatorio: false, responsavel: "RH", status: "ativo" },
  { id: "C-03", nome: "Integração Novos Colaboradores (Onboarding)", categoria: "Institucional", duracao: "8h", formato: "Presencial", obrigatorio: true, responsavel: "RH", status: "ativo" },
  { id: "C-04", nome: "Design System Fundamentals", categoria: "Técnico", duracao: "10h", formato: "Online", obrigatorio: false, responsavel: "Design Team", status: "arquivado" },
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
