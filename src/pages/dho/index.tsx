import { Building2 } from 'lucide-react';
import {
  DashboardTDView,
  PresencaDigitalView,
  LancamentoLoteView,
  TrilhasCargoView,
  PortalGestorView,
  ComunicadosTDView,
  ConsultoriaInternaView,
  DHOGestorTransversalView,
} from './DHOViews';
import { DHO_PAGE_GESTOR } from '@/auth/roles';

export type DHOPageId =
  | 'dho-dashboard'
  | 'dho-presenca'
  | 'dho-lancamento-lote'
  | 'dho-trilhas-cargo'
  | 'dho-portal-gestor'
  | 'dho-comunicados'
  | 'dho-consultoria'
  | typeof DHO_PAGE_GESTOR;

const titles: Record<DHOPageId, { title: string; subtitle: string }> = {
  'dho-dashboard': {
    title: 'DHO — Treinamento & Desenvolvimento',
    subtitle: 'Indicadores automáticos, presença digital e trilhas por cargo (protótipo).',
  },
  'dho-presenca': {
    title: 'Presença digital',
    subtitle: 'QR Code e checklist substituem listas em papel e digitação nome a nome.',
  },
  'dho-lancamento-lote': {
    title: 'Lançamento em lote',
    subtitle: 'Importação validada reduz duplicidade e atraso no fechamento mensal.',
  },
  'dho-trilhas-cargo': {
    title: 'Trilhas por cargo / movimentação',
    subtitle: 'Ao mudar de função, o sistema exige cursos obrigatórios e reciclagens.',
  },
  'dho-portal-gestor': {
    title: 'Portal do gestor — treinamentos',
    subtitle: 'Solicitação formal com protocolo, fila e priorização.',
  },
  'dho-comunicados': {
    title: 'Comunicados internos (T&D)',
    subtitle: 'Chamadas, confirmações e divulgação de capacitações.',
  },
  'dho-consultoria': {
    title: 'Consultoria interna',
    subtitle: 'Demandas comportamentais e mediação com rastreio e prazo.',
  },
  [DHO_PAGE_GESTOR]: {
    title: 'DHO — Área do gestor',
    subtitle: 'Solicitar treinamento e abrir chamado de consultoria (acesso transversal).',
  },
};

function isDHOPage(id: string): id is DHOPageId {
  return id in titles;
}

interface DHOPageProps {
  activePage: string;
}

export default function DHOPage({ activePage }: DHOPageProps) {
  const page: DHOPageId = isDHOPage(activePage) ? activePage : 'dho-dashboard';
  const header = titles[page];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Building2 className="text-blue-500" size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{header.title}</h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1">{header.subtitle}</p>
          </div>
        </div>
      </div>

      {page === 'dho-dashboard' && <DashboardTDView />}
      {page === 'dho-presenca' && <PresencaDigitalView />}
      {page === 'dho-lancamento-lote' && <LancamentoLoteView />}
      {page === 'dho-trilhas-cargo' && <TrilhasCargoView />}
      {page === 'dho-portal-gestor' && <PortalGestorView />}
      {page === 'dho-comunicados' && <ComunicadosTDView />}
      {page === 'dho-consultoria' && <ConsultoriaInternaView />}
      {page === DHO_PAGE_GESTOR && <DHOGestorTransversalView />}
    </div>
  );
}
