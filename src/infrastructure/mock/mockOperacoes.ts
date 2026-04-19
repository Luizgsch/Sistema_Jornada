export type CadastroColaboradorStatus = "completo" | "incompleto";

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
    cadastroStatus: "completo" as CadastroColaboradorStatus,
    cpf: "123.456.789-00",
    telefone: "(11) 91234-5678",
    endereco: "Rua das Flores, 123, São Paulo - SP",
    pisPasep: "123.45678.90-1",
    tituloEleitor: "1234 5678 9012",
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
    cadastroStatus: "incompleto" as CadastroColaboradorStatus,
    cpf: "234.567.890-11",
    telefone: "(11) 92345-6789",
    endereco: "Av. Paulista, 1500, São Paulo - SP",
    pisPasep: "",
    tituloEleitor: "",
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
    cadastroStatus: "completo" as CadastroColaboradorStatus,
    cpf: "345.678.901-22",
    telefone: "(11) 93456-7890",
    endereco: "Rua Vergueiro, 500, São Paulo - SP",
    pisPasep: "234.56789.01-2",
    tituloEleitor: "9876 5432 1098",
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
    cadastroStatus: "completo" as CadastroColaboradorStatus,
    cpf: "456.789.012-33",
    telefone: "(11) 94567-8901",
    endereco: "Rua Augusta, 900, São Paulo - SP",
    pisPasep: "345.67890.12-3",
    tituloEleitor: "1122 3344 5566",
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

export type Movimentacao = {
  id: string;
  nome: string;
  matricula: string;
  tipo: "Promoção" | "Transferência";
  anterior: string;
  novo: string;
  data: string;
  responsavel: string;
  motivo: string;
};

export const mockMovimentacoes: Movimentacao[] = [
  {
    id: "M-1",
    nome: "Alice Ferreira",
    matricula: "MAT-101",
    tipo: "Promoção",
    anterior: "Designer UI/UX Júnior",
    novo: "Designer UI/UX Pleno",
    data: "2025-01-10",
    responsavel: "Mariana Costa",
    motivo: "Desempenho consistente e conclusão do plano de desenvolvimento individual.",
  },
  {
    id: "M-2",
    nome: "Roberto Alves",
    matricula: "MAT-088",
    tipo: "Transferência",
    anterior: "Vendas — Inside Sales",
    novo: "Marketing — Growth",
    data: "2026-03-01",
    responsavel: "João Silva",
    motivo: "Realocação alinhada à expansão digital e perfil analítico do colaborador.",
  },
  {
    id: "M-3",
    nome: "Carla Duarte",
    matricula: "MAT-103",
    tipo: "Promoção",
    anterior: "Analista de RH",
    novo: "Coordenadora de RH",
    data: "2026-03-15",
    responsavel: "Mariana Costa",
    motivo: "Sucessão interna e vacância na coordenação; histórico de liderança informal.",
  },
  {
    id: "M-4",
    nome: "Daniel Lima",
    matricula: "MAT-104",
    tipo: "Transferência",
    anterior: "Administrativo — SP",
    novo: "Operações — Matriz",
    data: "2026-03-18",
    responsavel: "Fernanda Reis",
    motivo: "Proximidade da nova unidade logística e redução de deslocamento.",
  },
];
