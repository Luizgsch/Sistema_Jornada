export const mockOperacoesColaboradores = [
  { 
    matricula: "MAT-101", 
    nome: "Alice Ferreira", 
    cargo: "Designer UI/UX", 
    setor: "Tecnologia", 
    gestor: "Ricardo Santos", 
    contrato: "CLT", 
    admissao: "2024-05-12", 
    status: "ativo",
    cpf: "123.456.789-00",
    telefone: "(11) 91234-5678",
    endereco: "Rua das Flores, 123, São Paulo - SP",
    uniforme: { camisa: "P", calca: "38", calcado: "36", status: "entregue" },
    historico: [
      { data: "2024-05-12", tipo: "Admissão", desc: "Contratação inicial como Designer Junior" },
      { data: "2025-01-10", tipo: "Promoção", desc: "Promovida para Designer Pleno" }
    ]
  },
  { 
    matricula: "MAT-102", 
    nome: "Bruno Souza", 
    cargo: "Desenvolvedor Backend", 
    setor: "Tecnologia", 
    gestor: "Ricardo Santos", 
    contrato: "Temporário", 
    admissao: "2025-11-20", 
    vencimento: "2026-05-20",
    status: "ativo",
    cpf: "234.567.890-11",
    telefone: "(11) 92345-6789",
    endereco: "Av. Paulista, 1500, São Paulo - SP",
    uniforme: { camisa: "G", calca: "42", calcado: "41", status: "pendente" },
    historico: [
      { data: "2025-11-20", tipo: "Admissão", desc: "Contrato temporário (Pico Safra)" }
    ]
  },
  { 
    matricula: "MAT-103", 
    nome: "Carla Duarte", 
    cargo: "Analista de RH", 
    setor: "RH", 
    gestor: "Mariana Costa", 
    contrato: "CLT", 
    admissao: "2023-08-15", 
    status: "ativo",
    cpf: "345.678.901-22",
    telefone: "(11) 93456-7890",
    endereco: "Rua Vergueiro, 500, São Paulo - SP",
    uniforme: { camisa: "M", calca: "40", calcado: "37", status: "entregue" },
    historico: [
      { data: "2023-08-15", tipo: "Admissão", desc: "Contratação CLT" }
    ]
  },
  { 
    matricula: "MAT-104", 
    nome: "Daniel Lima", 
    cargo: "Assistente Administrativo", 
    setor: "Administrativo", 
    gestor: "João Silva", 
    contrato: "Temporário", 
    admissao: "2026-01-05", 
    vencimento: "2026-04-05",
    status: "vencendo",
    cpf: "456.789.012-33",
    telefone: "(11) 94567-8901",
    endereco: "Rua Augusta, 900, São Paulo - SP",
    uniforme: { camisa: "GG", calca: "46", calcado: "43", status: "entregue" },
    historico: [
      { data: "2026-01-05", tipo: "Admissão", desc: "Substituição Licença" }
    ]
  }
];

export const mockUniformeStats = {
  entregues: 85,
  pendentes: 12,
  reposicoes: 5
};

export const mockMovimentacoes = [
  { id: "M-1", nome: "Alice Ferreira", matricula: "MAT-101", tipo: "Promoção", anterior: "Junior", novo: "Pleno", data: "2025-01-10", responsavel: "Mariana Costa" },
  { id: "M-2", nome: "Roberto Alves", matricula: "MAT-088", tipo: "Transferência", anterior: "Vendas", novo: "Marketing", data: "2026-03-01", responsavel: "João Silva" },
];
