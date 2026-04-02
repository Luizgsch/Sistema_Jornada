export interface Cargo {
  id: string;
  nome: string;
  departamento: string;
  descricao: string;
  responsabilidades: string[];
  requisitosTecnicos: string[];
  competenciasComportamentais: string[];
  faixaSalarial: string;
}

export const mockCargos: Cargo[] = [
  {
    id: "cargo-1",
    nome: "Desenvolvedor Frontend Senior",
    departamento: "Tecnologia",
    descricao: "Responsável por liderar tecnicamente o desenvolvimento das interfaces da aplicação web, garantindo performance, acessibilidade e escalabilidade.",
    responsabilidades: [
      "Desenvolver novas funcionalidades usando React e TypeScript",
      "Revisar código de outros desenvolvedores (Code Review)",
      "Propor melhores arquiteturas focadas em performance UI",
      "Mentoria de desenvolvedores júniores e plenos"
    ],
    requisitosTecnicos: [
      "Sólida experiência em React.js e Next.js",
      "Proficiência em TypeScript e TailwindCSS",
      "Experiência com testes unitários e E2E",
      "Conhecimento de arquitetura micro-frontend é um diferencial"
    ],
    competenciasComportamentais: [
      "Liderança técnica",
      "Comunicação assertiva",
      "Resolução de problemas complexos",
      "Foco em qualidade"
    ],
    faixaSalarial: "R$ 12.000 - R$ 16.000"
  },
  {
    id: "cargo-2",
    nome: "Gerente de Marketing",
    departamento: "Marketing",
    descricao: "Liderar a equipe de marketing estratégico, planejamento de campanhas, branding e estratégias de growth para aquisição de usuários.",
    responsabilidades: [
      "Gerenciar o orçamento de campanhas pagas",
      "Definir estratégia de SEO e Inbound Marketing",
      "Acompanhar métricas de funil (CAC, LTV)",
      "Gestão de time de analistas, designers e redatores"
    ],
    requisitosTecnicos: [
      "Google Analytics, GTM, Meta Ads",
      "Experiência anterior em SaaS",
      "Conhecimento em estratégias de Inbound (Hubspot/RD Station)",
      "Inglês fluente"
    ],
    competenciasComportamentais: [
      "Visão analítica",
      "Criatividade",
      "Gestão de pessoas",
      "Orientação a resultados"
    ],
    faixaSalarial: "R$ 10.000 - R$ 14.500"
  },
  {
    id: "cargo-3",
    nome: "Analista de Suporte Junior",
    departamento: "Atendimento",
    descricao: "Prestar suporte técnico inicial aos clientes da plataforma via chat, e-mail e telefone, resolvendo dúvidas e encaminhando problemas complexos.",
    responsabilidades: [
      "Atendimento ao cliente nível 1 (N1)",
      "Criação e atualização de artigos de ajuda (FAQ)",
      "Acompanhamento de tickets via Zendesk",
      "Identificação de bugs reportados por clientes"
    ],
    requisitosTecnicos: [
      "Conhecimentos básicos de web e tecnologia",
      "Boa escrita e comunicação",
      "Desejável experiência com Zendesk ou Intercom"
    ],
    competenciasComportamentais: [
      "Empatia",
      "Paciência",
      "Organização",
      "Proatividade"
    ],
    faixaSalarial: "R$ 2.500 - R$ 3.500"
  }
];
