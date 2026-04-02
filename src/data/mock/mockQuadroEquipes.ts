export type FuncionarioScale = {
  id: string;
  nome: string;
  cargo: string;
  turno: "Manhã" | "Tarde" | "Noite" | "Comercial";
  setor: string;
  isVagaAberta?: boolean;
};

export const mockQuadroEquipes: FuncionarioScale[] = [
  // Equipe Tecnologia
  { id: "1", nome: "Ana Clara Silva", cargo: "Tech Lead", turno: "Comercial", setor: "Tecnologia" },
  { id: "2", nome: "Carlos Souza", cargo: "Dev Backend Sr", turno: "Comercial", setor: "Tecnologia" },
  { id: "3", nome: "Pedro Álvares", cargo: "Dev Frontend Jr", turno: "Comercial", setor: "Tecnologia" },
  { id: "v1", nome: "Vaga: Dev Fullstack Pl", cargo: "Dev Fullstack", turno: "Comercial", setor: "Tecnologia", isVagaAberta: true },
  
  // Equipe Atendimento (Turnos Variados)
  { id: "4", nome: "Juliana Martins", cargo: "Supervisora", turno: "Manhã", setor: "Atendimento" },
  { id: "5", nome: "Roberto C.", cargo: "Atendente Jr", turno: "Manhã", setor: "Atendimento" },
  { id: "v2", nome: "Vaga: Atendente", cargo: "Atendente Jr", turno: "Manhã", setor: "Atendimento", isVagaAberta: true },
  
  { id: "6", nome: "Marcos V.", cargo: "Supervisor", turno: "Tarde", setor: "Atendimento" },
  { id: "7", nome: "Letícia B.", cargo: "Atendente Pl", turno: "Tarde", setor: "Atendimento" },
  { id: "8", nome: "João F.", cargo: "Atendente Jr", turno: "Tarde", setor: "Atendimento" },

  { id: "9", nome: "Sandra G.", cargo: "Supervisora", turno: "Noite", setor: "Atendimento" },
  { id: "v3", nome: "Vaga: Atendente Sr", cargo: "Atendente Sr", turno: "Noite", setor: "Atendimento", isVagaAberta: true },
  
  // Vendas
  { id: "10", nome: "Fernanda L.", cargo: "Gerente de Contas", turno: "Comercial", setor: "Vendas" },
  { id: "11", nome: "Diego P.", cargo: "SDR", turno: "Comercial", setor: "Vendas" },
  { id: "v4", nome: "Vaga: BDR", cargo: "SDR", turno: "Comercial", setor: "Vendas", isVagaAberta: true }
];

export const TURNOS = ["Todos", "Comercial", "Manhã", "Tarde", "Noite"];
export const SETORES = ["Todos", "Tecnologia", "Atendimento", "Vendas"];
