import type { ElementType } from 'react';
import {
  AlertCircle,
  Bell,
  Cake,
  Coffee,
  FileWarning,
  GraduationCap,
  ClipboardList,
  WifiOff,
  Route,
  CheckCircle2,
} from 'lucide-react';
import type { TipoUsuario } from '@/infrastructure/mock/mockLogin';
import type { SistemaAtual } from '@/domain/auth/roles';
import { mockNotasFiscais, mockChamadosManusis } from '@/infrastructure/mock/mockServicosGerais';

/** Crítico | Tarefa/Aviso | Informativo (social) — três níveis de severidade para UX. */
export type NotificationSeverity = 'critical' | 'task' | 'social';

export type NotificationFilterTab = 'all' | 'urgent' | 'social';

export interface NotificationEntry {
  id: string;
  severity: NotificationSeverity;
  icon: ElementType;
  title: string;
  description: string;
  time: string;
  actionLabel: string;
  targetPageId: string;
  targetSistema?: SistemaAtual;
}

const DOC_PENDING_COUNT = 10;

function rhFeed(): NotificationEntry[] {
  return [
    {
      id: 'rh-docs-batch',
      severity: 'task',
      icon: Bell,
      title: `Você tem ${DOC_PENDING_COUNT} novos documentos para validar`,
      description: 'Admissões com checklist pendente na fila de conformidade.',
      time: 'há 8 min',
      actionLabel: 'Abrir validação',
      targetPageId: 'documentos',
      targetSistema: 'hr-core',
    },
    {
      id: 'rh-crit-reject',
      severity: 'critical',
      icon: AlertCircle,
      title: '3 documentos reprovados na última rodada',
      description: 'Colaboradores precisam reenviar RG e comprovante de residência.',
      time: 'há 22 min',
      actionLabel: 'Ver reprovações',
      targetPageId: 'documentos',
      targetSistema: 'hr-core',
    },
    {
      id: 'rh-crit-exp',
      severity: 'critical',
      icon: AlertCircle,
      title: 'Prazo de experiência vence hoje: Ana Paula Souza',
      description: 'Decisão de efetivação ou desligamento deve ser registrada hoje.',
      time: 'há 1 h',
      actionLabel: 'Ir para colaboradores',
      targetPageId: 'colaboradores',
      targetSistema: 'hr-core',
    },
    {
      id: 'rh-task-candidates',
      severity: 'task',
      icon: Bell,
      title: '6 novos candidatos aguardam triagem',
      description: 'Origem: LinkedIn e indicações — priorize perfis com score > 80.',
      time: 'há 2 h',
      actionLabel: 'Abrir triagem IA',
      targetPageId: 'triagem-ia',
      targetSistema: 'hr-core',
    },
    {
      id: 'rh-task-courses',
      severity: 'task',
      icon: GraduationCap,
      title: 'Novo curso obrigatório atribuído ao seu time',
      description: 'LGPD aplicada ao RH — prazo sugerido: 7 dias.',
      time: 'há 3 h',
      actionLabel: 'Ver cursos',
      targetPageId: 'cursos',
      targetSistema: 'hr-core',
    },
    {
      id: 'rh-soc-birthday',
      severity: 'social',
      icon: Cake,
      title: 'Hoje é aniversário de Carlos Mendes',
      description: 'Operações · envie um reconhecimento pelo mural interno.',
      time: 'hoje · 08:00',
      actionLabel: 'Ver aniversariantes',
      targetPageId: 'comunicacao-interna',
      targetSistema: 'hr-core',
    },
    {
      id: 'rh-soc-cafe',
      severity: 'social',
      icon: Coffee,
      title: 'Sociedade do Café: degustação no 3º andar',
      description: 'Quarta 15h — inscrições abertas até amanhã.',
      time: 'há 4 h',
      actionLabel: 'Abrir comunicação',
      targetPageId: 'comunicacao-interna',
      targetSistema: 'hr-core',
    },
    {
      id: 'rh-soc-trail',
      severity: 'social',
      icon: Route,
      title: 'Trilha concluída: Lucas Mendes finalizou “Segurança 101”',
      description: 'Certificado disponível para download.',
      time: 'ontem',
      actionLabel: 'Ver certificados',
      targetPageId: 'certificados',
      targetSistema: 'hr-core',
    },
  ];
}

function financeiroFeed(): NotificationEntry[] {
  const nfAtrasadas = mockNotasFiscais.filter((n) => n.coluna === 'atrasada');
  const diasMax = nfAtrasadas.length ? Math.max(...nfAtrasadas.map((n) => n.diasAtraso)) : 0;
  const entries: NotificationEntry[] = [];

  if (nfAtrasadas.length > 0) {
    entries.push({
      id: 'fin-nf-group',
      severity: 'critical',
      icon: AlertCircle,
      title: `${nfAtrasadas.length} nota(s) fiscal(is) em atraso`,
      description: `Maior atraso: ${diasMax} dias. Risco de multa contratual.`,
      time: 'há 15 min',
      actionLabel: 'Abrir notas em atraso',
      targetPageId: 'sg-notas-fiscais',
      targetSistema: 'servicos-gerais',
    });
  }

  entries.push(
    {
      id: 'fin-integ',
      severity: 'critical',
      icon: WifiOff,
      title: 'Falha de sincronização Attos → Elo',
      description: 'Último payload com erro 502. Reprocessamento automático em fila.',
      time: 'há 40 min',
      actionLabel: 'Ir para faturamento Attos',
      targetPageId: 'sg-faturamento-attos',
      targetSistema: 'servicos-gerais',
    },
    {
      id: 'fin-conc',
      severity: 'task',
      icon: Bell,
      title: 'Divergência Elo/Attos: 2 colaboradores duplicados',
      description: 'Ajuste de vínculo no refeitório pendente de validação.',
      time: 'há 1 h',
      actionLabel: 'Abrir conciliação',
      targetPageId: 'sg-conciliacao-acessos',
      targetSistema: 'servicos-gerais',
    },
    {
      id: 'fin-pend-attos',
      severity: 'task',
      icon: Bell,
      title: '1 integração Attos pendente de conferência',
      description: 'Registro de 30/03 ainda no legado (planilha).',
      time: 'há 2 h',
      actionLabel: 'Abrir fechamento Attos',
      targetPageId: 'sg-fechamento-attos',
      targetSistema: 'servicos-gerais',
    },
    {
      id: 'fin-soc-cafe',
      severity: 'social',
      icon: Coffee,
      title: 'Sociedade do Café: enquete do blend da semana',
      description: 'Participe até sexta — resultado no mural.',
      time: 'há 5 h',
      actionLabel: 'Sociedade do Café',
      targetPageId: 'sg-engajamento-cafe',
      targetSistema: 'servicos-gerais',
    },
    {
      id: 'fin-soc-report',
      severity: 'social',
      icon: CheckCircle2,
      title: 'Relatório mensal consolidado disponível',
      description: 'Compras de março gerado automaticamente.',
      time: 'ontem',
      actionLabel: 'Abrir dashboard SG',
      targetPageId: 'sg-dashboard',
      targetSistema: 'servicos-gerais',
    }
  );

  return entries;
}

function logisticaFeed(): NotificationEntry[] {
  const vencidos = mockChamadosManusis.filter((c) => c.status === 'vencido');
  const proximos = mockChamadosManusis.filter((c) => c.status === 'proximo');
  const entries: NotificationEntry[] = [];

  if (vencidos.length > 0) {
    entries.push({
      id: 'log-manusis-venc',
      severity: 'critical',
      icon: AlertCircle,
      title: `${vencidos.length} chamado(s) Manusis vencido(s)`,
      description: vencidos.map((c) => c.titulo).join(' · '),
      time: 'há 10 min',
      actionLabel: 'Abrir chamados',
      targetPageId: 'sg-chamados-manusis',
      targetSistema: 'servicos-gerais',
    });
  }

  if (proximos.length > 0) {
    entries.push({
      id: 'log-manusis-prox',
      severity: 'task',
      icon: Bell,
      title: `${proximos.length} chamado(s) próximos do vencimento`,
      description: 'Escalone antes que virem críticos.',
      time: 'há 1 h',
      actionLabel: 'Ver chamados',
      targetPageId: 'sg-chamados-manusis',
      targetSistema: 'servicos-gerais',
    });
  }

  entries.push(
    {
      id: 'log-crit-cafe',
      severity: 'critical',
      icon: AlertCircle,
      title: 'Abastecimento crítico: 2 pontos de café sem registro',
      description: 'Bloco B e Recepção — possível ruptura de estoque.',
      time: 'há 2 h',
      actionLabel: 'Compras insumos',
      targetPageId: 'sg-compras-insumos',
      targetSistema: 'servicos-gerais',
    },
    {
      id: 'log-task-arm',
      severity: 'task',
      icon: Bell,
      title: 'Armário 22 liberado para reassinatura',
      description: 'Ex-colaborador desligado em 31/03 — validar nova atribuição.',
      time: 'hoje cedo',
      actionLabel: 'Abrir armários',
      targetPageId: 'sg-armarios',
      targetSistema: 'servicos-gerais',
    },
    {
      id: 'log-soc-birth',
      severity: 'social',
      icon: Cake,
      title: 'Aniversariantes da semana (4 pessoas)',
      description: 'Inclui aniversários de empresa e nascimento.',
      time: 'hoje',
      actionLabel: 'Ver aniversariantes',
      targetPageId: 'sg-engajamento-aniversariantes',
      targetSistema: 'servicos-gerais',
    },
    {
      id: 'log-soc-sat',
      severity: 'social',
      icon: CheckCircle2,
      title: 'Satisfação refeitório: 4,62/5 esta semana',
      description: 'Acima da meta de 4,0.',
      time: 'hoje cedo',
      actionLabel: 'Ver satisfação',
      targetPageId: 'sg-satisfacao-attos',
      targetSistema: 'servicos-gerais',
    }
  );

  return entries;
}

function adminGestorFeed(): NotificationEntry[] {
  const vencidos = mockChamadosManusis.filter((c) => c.status === 'vencido');
  const nfAtrasadas = mockNotasFiscais.filter((n) => n.coluna === 'atrasada');

  return [
    ...(nfAtrasadas.length > 0
      ? [
          {
            id: 'adm-nf',
            severity: 'critical' as const,
            icon: FileWarning,
            title: `${nfAtrasadas.length} NF(s) em atraso (Financeiro)`,
            description: 'Baixa pendente — risco de multa contratual.',
            time: 'há 15 min',
            actionLabel: 'Abrir notas fiscais',
            targetPageId: 'sg-notas-fiscais',
            targetSistema: 'servicos-gerais' as const,
          },
        ]
      : []),
    {
      id: 'adm-manusis',
      severity: 'critical',
      icon: ClipboardList,
      title: `${vencidos.length} chamado(s) Manusis vencidos`,
      description: 'SLA expirado. Escalone ou comunique o fornecedor.',
      time: 'há 20 min',
      actionLabel: 'Abrir chamados',
      targetPageId: 'sg-chamados-manusis',
      targetSistema: 'servicos-gerais',
    },
    {
      id: 'adm-rh-sla',
      severity: 'task',
      icon: Bell,
      title: '3 vagas RH fora do SLA',
      description: 'Abertas há mais de 20 dias sem finalista aprovado.',
      time: 'há 1 h',
      actionLabel: 'Abrir pipeline',
      targetPageId: 'pipeline',
      targetSistema: 'hr-core',
    },
    {
      id: 'adm-docs',
      severity: 'task',
      icon: Bell,
      title: `Você tem ${DOC_PENDING_COUNT} documentos aguardando validação (visão RH)`,
      description: 'Central de admissões — fila única para aprovação.',
      time: 'há 2 h',
      actionLabel: 'Validar documentos',
      targetPageId: 'documentos',
      targetSistema: 'hr-core',
    },
    {
      id: 'adm-dho',
      severity: 'task',
      icon: GraduationCap,
      title: 'Novas trilhas atribuídas a lideranças',
      description: '8 colaboradores com prazo até sexta-feira.',
      time: 'há 3 h',
      actionLabel: 'Abrir trilhas DHO',
      targetPageId: 'dho-trilhas-cargo',
      targetSistema: 'dho',
    },
    {
      id: 'adm-soc',
      severity: 'social',
      icon: Coffee,
      title: 'Sociedade do Café: convite executivo',
      description: 'Degustação especial — quinta 16h.',
      time: 'ontem',
      actionLabel: 'Sociedade do Café',
      targetPageId: 'sg-engajamento-cafe',
      targetSistema: 'servicos-gerais',
    },
  ];
}

export function buildNotificationFeed(tipo: TipoUsuario): NotificationEntry[] {
  if (tipo === 'rh') return rhFeed();
  if (tipo === 'financeiro') return financeiroFeed();
  if (tipo === 'logistica') return logisticaFeed();
  return adminGestorFeed();
}

export function isActionableSeverity(severity: NotificationSeverity): boolean {
  return severity === 'critical' || severity === 'task';
}

export function countUnreadActionable(
  feed: NotificationEntry[],
  readIds: ReadonlySet<string>,
  dismissedIds: ReadonlySet<string>
): number {
  return feed.filter(
    (n) =>
      !dismissedIds.has(n.id) &&
      !readIds.has(n.id) &&
      isActionableSeverity(n.severity)
  ).length;
}

export function filterFeedByTab(
  items: NotificationEntry[],
  tab: NotificationFilterTab
): NotificationEntry[] {
  if (tab === 'all') return items;
  if (tab === 'urgent') return items.filter((n) => isActionableSeverity(n.severity));
  return items.filter((n) => n.severity === 'social');
}
