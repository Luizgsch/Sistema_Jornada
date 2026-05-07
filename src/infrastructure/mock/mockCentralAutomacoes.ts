// Central de Automações — Agregação de alertas de todos os módulos
// Dados mock apenas para demonstração — refletem estado das outras mocks

export interface AlertCard {
  id: string;
  icon: string;
  count: number;
  label: string;
  module: string;
  variant: 'red' | 'amber' | 'blue' | 'purple' | 'green';
  actionLabel: string;
  actionHref: string;
  description: string;
}

export const mockCentralAlerts = {
  rh: [
    {
      id: 'rh-sla-vencendo',
      icon: '⏰',
      count: 2,
      label: 'Vagas com SLA vencendo',
      module: 'Recrutamento',
      variant: 'red' as const,
      actionLabel: 'Ver vagas →',
      actionHref: '/hr-vagas',
      description: 'Auxiliar de Produção I e Técnico de Manutenção estão fora do SLA',
    },
    {
      id: 'rh-cartas-pendentes',
      icon: '📄',
      count: 8,
      label: 'Cartas Proposta pendentes',
      module: 'Recrutamento',
      variant: 'amber' as const,
      actionLabel: 'Gerar em lote →',
      actionHref: '/hr-vagas',
      description: 'Candidatos aprovados aguardando geração de propostas',
    },
    {
      id: 'rh-uniformes-sem-dados',
      icon: '📋',
      count: 3,
      label: 'Uniformes sem dados',
      module: 'Operações',
      variant: 'amber' as const,
      actionLabel: 'Preencher pipeline →',
      actionHref: '/hr-uniformes',
      description: 'Colaboradores com vaga aprovada mas uniforme não preenchido',
    },
    {
      id: 'rh-matches-auxiliares',
      icon: '🤝',
      count: 5,
      label: 'Matches de auxiliares',
      module: 'Recrutamento',
      variant: 'blue' as const,
      actionLabel: 'Ver sugestões →',
      actionHref: '/hr-auxiliares',
      description: 'Candidatos com turno compatível para vagas abertas',
    },
  ] as AlertCard[],

  dho: [
    {
      id: 'dho-reciclagens-vencendo',
      icon: '🔄',
      count: 14,
      label: 'Reciclagens vencendo',
      module: 'DHO',
      variant: 'red' as const,
      actionLabel: 'Ver colaboradores →',
      actionHref: '/dho-trilhas-cargo',
      description: 'NR-12 está vencendo para 14 colaboradores nos próximos 30 dias',
    },
    {
      id: 'dho-trilhas-pos-movimentacao',
      icon: '🔔',
      count: 2,
      label: 'Trilhas pós-movimentação',
      module: 'DHO',
      variant: 'purple' as const,
      actionLabel: 'Ver pendentes →',
      actionHref: '/dho-trilhas-cargo',
      description: '2 colaboradores foram promovidos e precisam de cursos obrigatórios',
    },
    {
      id: 'dho-treinamento-hoje-qr',
      icon: '📱',
      count: 1,
      label: 'Treinamento hoje — QR ativo',
      module: 'Presença Digital',
      variant: 'blue' as const,
      actionLabel: 'Abrir QR →',
      actionHref: '/dho-presenca',
      description: 'NR-12 começa às 14h — QR code pronto para scan',
    },
    {
      id: 'dho-meta-hora-homem',
      icon: '📊',
      count: 94,
      label: '% meta hora-homem no mês',
      module: 'Dashboard T&D',
      variant: 'green' as const,
      actionLabel: 'Ver detalhes →',
      actionHref: '/dho-dashboard',
      description: '1842.5h de 2100h — 94% da meta atingida',
    },
  ] as AlertCard[],

  sg: [
    {
      id: 'sg-nfs-atrasadas',
      icon: '🧾',
      count: 3,
      label: 'Notas Fiscais atrasadas',
      module: 'Financeiro',
      variant: 'red' as const,
      actionLabel: 'Abrir kanban →',
      actionHref: '/sg-notas-fiscais',
      description: 'NFs com mais de 30 dias em coluna "Atrasada"',
    },
    {
      id: 'sg-armarios-desligados',
      icon: '🗄️',
      count: 4,
      label: 'Armários com desligados',
      module: 'Logística',
      variant: 'amber' as const,
      actionLabel: 'Liberar todos →',
      actionHref: '/sg-armarios',
      description: '4 armários ainda vinculados a ex-colaboradores',
    },
    {
      id: 'sg-vt-estac-duplicados',
      icon: '🚗',
      count: 7,
      label: 'VT + Estac. duplicados',
      module: 'Benefícios',
      variant: 'amber' as const,
      actionLabel: 'Ver lista →',
      actionHref: '/sg-beneficios',
      description: 'Colaboradores usando ambos benefícios simultaneamente',
    },
    {
      id: 'sg-chamados-vencidos',
      icon: '🔧',
      count: 2,
      label: 'Chamados vencidos',
      module: 'Manusis',
      variant: 'red' as const,
      actionLabel: 'Cobrar área →',
      actionHref: '/sg-chamados-manusis',
      description: 'Chamados ultrapassaram o prazo de vencimento',
    },
  ] as AlertCard[],
};

export interface RecentActivity {
  id: string;
  icon: string;
  action: string;
  nome: string;
  time: string;
  module: string;
}

export const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    icon: '📄',
    action: 'gerou Carta Proposta para',
    nome: 'João Silva',
    time: 'há 2 horas',
    module: 'RH',
  },
  {
    id: '2',
    icon: '🔏',
    action: 'carimbou documento de',
    nome: 'Maria Santos',
    time: 'há 4 horas',
    module: 'RH',
  },
  {
    id: '3',
    icon: '⚡',
    action: 'propagou dados de vaga para',
    nome: 'Pedro Costa',
    time: 'há 6 horas',
    module: 'RH',
  },
  {
    id: '4',
    icon: '🗄️',
    action: 'liberou armário de',
    nome: 'Ana Ferreira',
    time: 'há 8 horas',
    module: 'SG',
  },
  {
    id: '5',
    icon: '🎓',
    action: 'confirmou lote de treinamentos para',
    nome: 'Turma NR-12',
    time: 'há 10 horas',
    module: 'DHO',
  },
];

// Contadores para cards principais do hub
export interface HubStats {
  totalCriticos: number;
  cartasGeradas: number;
  documentosCarimbados: number;
  colaboradoresMovimentados: number;
}

export const mockHubStats: HubStats = {
  totalCriticos: 5, // Soma de alertas vermelhos
  cartasGeradas: 8, // Cartas Proposta
  documentosCarimbados: 0, // Incrementa ao carimbar
  colaboradoresMovimentados: 3, // Vagas propagadas
};
