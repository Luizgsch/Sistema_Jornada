import type { LucideIcon } from 'lucide-react';
import { Wrench, Cake, LayoutGrid } from 'lucide-react';
import {
  SGDashboardFinanceiroView,
  SGNotasFiscaisView,
  SGConciliacaoView,
  SGComprasView,
  SGFaturamentoAttosView,
  SGFechamentoAttosView,
} from '@/features/servicos-gerais/financeiro/SGFinanceiroViews';
import {
  SGDashboardLogisticaView,
  SGBeneficiosView,
  SGArmariosView,
  SGSatisfacaoView,
  SGChamadosView,
  SGCafeView,
} from '@/features/servicos-gerais/logistica/SGLogisticaViews';
import { SGDashboardFullView } from '@/features/servicos-gerais/shared/SGDashboardFull';
import { SGVoucherView } from '@/features/servicos-gerais/shared/SGVoucherView';
import { useAuth } from '@/features/auth/AuthContext';
import type { TipoUsuario } from '@/infrastructure/mock/mockLogin';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';

export type SGPageId =
  | 'sg-dashboard'
  | 'sg-notas-fiscais'
  | 'sg-conciliacao-acessos'
  | 'sg-beneficios'
  | 'sg-armarios'
  | 'sg-compras-insumos'
  | 'sg-faturamento-attos'
  | 'sg-fechamento-attos'
  | 'sg-satisfacao-attos'
  | 'sg-chamados-manusis'
  | 'sg-engajamento-cafe'
  | 'sg-engajamento-aniversariantes'
  | 'sg-engajamento-mural'
  | 'sg-voucher-natal';

const titles: Record<SGPageId, { title: string; subtitle: string }> = {
  'sg-dashboard': {
    title: 'Serviços Gerais — Painel',
    subtitle: 'Visão filtrada conforme seu perfil (protótipo RBAC).',
  },
  'sg-notas-fiscais': {
    title: 'Central de notas fiscais',
    subtitle: 'Alertas de pendência e atraso; objetivo: nenhuma NF esquecida.',
  },
  'sg-conciliacao-acessos': {
    title: 'Conciliação de acessos',
    subtitle: 'Elo × Posigraf e duplicidades — visão financeiro/faturamento.',
  },
  'sg-beneficios': {
    title: 'Benefícios — VT × Estacionamento',
    subtitle: 'Cruzamento automático das bases para identificar uso duplo.',
  },
  'sg-armarios': {
    title: 'Armários do vestiário',
    subtitle: 'Mapa de ocupação integrado a desligados — liberação automática.',
  },
  'sg-compras-insumos': {
    title: 'Compras de insumos',
    subtitle: 'Consolidado mensal para custos recorrentes e apresentação.',
  },
  'sg-faturamento-attos': {
    title: 'Faturamento Attos',
    subtitle: 'Integração diária no lugar de cópia manual de PDF/Excel.',
  },
  'sg-fechamento-attos': {
    title: 'Fechamento Attos',
    subtitle: 'Fonte única de informação; menos planilhas paralelas.',
  },
  'sg-satisfacao-attos': {
    title: 'Satisfação — refeição',
    subtitle: 'Indicador diário e refeições a partir da pesquisa, sem digitação via WhatsApp.',
  },
  'sg-chamados-manusis': {
    title: 'Chamados Manusis',
    subtitle: 'Monitoramento de prazos vencidos e próximos ao vencimento.',
  },
  'sg-engajamento-cafe': {
    title: 'Sociedade do Café',
    subtitle: 'Locais não abastecidos identificados a partir do Forms.',
  },
  'sg-engajamento-aniversariantes': {
    title: 'Aniversariantes',
    subtitle: 'Calendário de aniversários e lembretes para o time (protótipo).',
  },
  'sg-engajamento-mural': {
    title: 'Mural',
    subtitle: 'Recados e conteúdo social entre equipes (protótipo).',
  },
  'sg-voucher-natal': {
    title: 'Voucher de Natal',
    subtitle: 'Modelo digital com QR Code para validação e distribuição.',
  },
};

function isSGPage(id: string): id is SGPageId {
  return id in titles;
}

function SGEngajamentoPlaceholderView({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) {
  return (
    <Card importance="low">
      <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <CardTitle importance="low" className="flex items-center gap-2">
          <Icon className="text-zinc-500 dark:text-zinc-500 shrink-0" size={20} strokeWidth={1.5} aria-hidden />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Módulo em definição. Quando ativo, ficará alinhado ao mesmo padrão visual do restante do Jornada (cards,
          tipografia e botões).
        </p>
      </CardContent>
    </Card>
  );
}

interface ServicosGeraisPageProps {
  activePage: string;
}

function DashboardForRole({ tipo }: { tipo: TipoUsuario }) {
  if (tipo === 'financeiro') return <SGDashboardFinanceiroView />;
  if (tipo === 'logistica') return <SGDashboardLogisticaView />;
  return <SGDashboardFullView />;
}

export default function ServicosGeraisPage({ activePage }: ServicosGeraisPageProps) {
  const { usuario } = useAuth();
  const page: SGPageId = isSGPage(activePage) ? activePage : 'sg-dashboard';
  const header = titles[page];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-500/20 rounded-radius-m flex items-center justify-center shrink-0">
            <Wrench className="text-amber-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{header.title}</h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1">{header.subtitle}</p>
          </div>
        </div>
      </div>

      {page === 'sg-dashboard' && <DashboardForRole tipo={usuario.tipo} />}
      {page === 'sg-notas-fiscais' && <SGNotasFiscaisView />}
      {page === 'sg-conciliacao-acessos' && <SGConciliacaoView />}
      {page === 'sg-beneficios' && <SGBeneficiosView />}
      {page === 'sg-armarios' && <SGArmariosView />}
      {page === 'sg-compras-insumos' && <SGComprasView />}
      {page === 'sg-faturamento-attos' && <SGFaturamentoAttosView />}
      {page === 'sg-fechamento-attos' && <SGFechamentoAttosView />}
      {page === 'sg-satisfacao-attos' && <SGSatisfacaoView />}
      {page === 'sg-chamados-manusis' && <SGChamadosView />}
      {page === 'sg-engajamento-cafe' && <SGCafeView />}
      {page === 'sg-engajamento-aniversariantes' && (
        <SGEngajamentoPlaceholderView
          title="Aniversariantes"
          description="Reconhecimento leve do calendário do time, sem competir com fluxos críticos de RH."
          Icon={Cake}
        />
      )}
      {page === 'sg-engajamento-mural' && (
        <SGEngajamentoPlaceholderView
          title="Mural"
          description="Espaço colaborativo para avisos informais e cultura."
          Icon={LayoutGrid}
        />
      )}
      {page === 'sg-voucher-natal' && <SGVoucherView />}
    </div>
  );
}
