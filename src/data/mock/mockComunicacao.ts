export interface Contato {
  id: string;
  nome: string;
  vaga: string;
  status: "novo" | "triagem" | "entrevista" | "proposta" | "contratado" | "reprovado";
  avatarInitials: string;
  ultimaMensagem: string;
  dataUltimaMensagem: string;
  naoLidas: number;
  documentosEnviados: string[];
}

export const mockContatosComunicacao: Contato[] = [
  {
    id: "c-1",
    nome: "Juliana Santos Alves",
    vaga: "Desenvolvedora Frontend Senior",
    status: "entrevista",
    avatarInitials: "JS",
    ultimaMensagem: "Perfeito, nos vemos na quinta-feira às 14h!",
    dataUltimaMensagem: "10:32 AM",
    naoLidas: 1,
    documentosEnviados: ["Currículo em PDF", "Portfólio.zip"]
  },
  {
    id: "c-2",
    nome: "Marcos Figueiredo",
    vaga: "Analista Financeiro",
    status: "triagem",
    avatarInitials: "MF",
    ultimaMensagem: "Boa tarde, enviei os documentos que faltavam.",
    dataUltimaMensagem: "Ontem",
    naoLidas: 0,
    documentosEnviados: ["Currículo", "Comprovante de Residência"]
  },
  {
    id: "c-3",
    nome: "Beatriz Nogueira",
    vaga: "UX Designer",
    status: "proposta",
    avatarInitials: "BN",
    ultimaMensagem: "Li a proposta e estou de acordo. Quais são os próximos passos?",
    dataUltimaMensagem: "Ontem",
    naoLidas: 2,
    documentosEnviados: ["Currículo", "Behance Link", "Documentos Admissão"]
  },
  {
    id: "c-4",
    nome: "João Guilherme",
    vaga: "SDR Pleno",
    status: "novo",
    avatarInitials: "JG",
    ultimaMensagem: "Olá, me inscrevi para a vaga de SDR",
    dataUltimaMensagem: "Segunda",
    naoLidas: 0,
    documentosEnviados: ["Currículo PDF"]
  }
];

export interface MensagemChat {
  id: string;
  remetente: "rh" | "candidato" | "sistema";
  texto: string;
  horario: string;
  tipo: "texto" | "documento" | "convite";
  anexo?: {
    nome: string;
    icone?: string;
  };
}

export const mockMensagensPorContato: Record<string, MensagemChat[]> = {
  "c-1": [
    { id: "m1", remetente: "rh", tipo: "texto", texto: "Olá Juliana, tudo bem? Sou o recrutador da HR Core. Vimos seu perfil e gostamos muito!", horario: "09:00 AM" },
    { id: "m2", remetente: "candidato", tipo: "texto", texto: "Olá! Tudo ótimo. Fico muito feliz pelo contato.", horario: "09:15 AM" },
    { id: "m3", remetente: "rh", tipo: "texto", texto: "Poderia nos enviar o seu portfólio atualizado?", horario: "09:20 AM" },
    { id: "m4", remetente: "candidato", tipo: "documento", texto: "Segue em anexo.", horario: "09:45 AM", anexo: { nome: "Portfólio.zip" } },
    { id: "m5", remetente: "rh", tipo: "convite", texto: "Convite para Entrevista", horario: "10:00 AM", anexo: { nome: "Google Meet Link - Quinta, 14h" } },
    { id: "m6", remetente: "candidato", tipo: "texto", texto: "Perfeito, nos vemos na quinta-feira às 14h!", horario: "10:32 AM" },
  ],
  "c-3": [
    { id: "b1", remetente: "rh", tipo: "texto", texto: "Beatriz, parabéns! Você foi aprovada no processo seletivo.", horario: "Ontem 14:00" },
    { id: "b2", remetente: "rh", tipo: "documento", texto: "Segue a nossa carta proposta oficial.", horario: "Ontem 14:05", anexo: { nome: "Carta_Proposta_HR_Core.pdf" } },
    { id: "b3", remetente: "candidato", tipo: "texto", texto: "Nossa, muito obrigada! Vou avaliar e já retorno.", horario: "Ontem 15:30" },
    { id: "b4", remetente: "candidato", tipo: "texto", texto: "Li a proposta e estou de acordo. Quais são os próximos passos?", horario: "Ontem 18:45" },
  ]
};
