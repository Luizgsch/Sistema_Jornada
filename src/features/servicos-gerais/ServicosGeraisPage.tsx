import { Wrench } from 'lucide-react';
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
  | 'sg-cafe-abastecimento'
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
  'sg-cafe-abastecimento': {
    title: 'Sociedade do Café',
    subtitle: 'Locais não abastecidos identificados a partir do Forms.',
  },
  'sg-voucher-natal': {
    title: 'Voucher de Natal',
    subtitle: 'Modelo digital com QR Code para validação e distribuição.',
  },
};

function isSGPage(id: string): id is SGPageId {
  return id in titles;
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
          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center shrink-0">
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
      {page === 'sg-cafe-abastecimento' && <SGCafeView />}
      {page === 'sg-voucher-natal' && <SGVoucherView />}
    </div>
  );
}
