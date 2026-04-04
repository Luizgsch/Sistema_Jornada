import type { TipoUsuario } from '@/data/mock/mockLogin';
import { getSistemasPorTipo } from '@/data/mock/mockLogin';

export type SistemaAtual = 'hr-core' | 'dho' | 'servicos-gerais';

/** Página transversal: somente solicitar treinamento + consultoria (Financeiro / Logística). */
export const DHO_PAGE_GESTOR = 'dho-gestor' as const;

const DHO_FULL_PAGES = [
  'dho-dashboard',
  'dho-presenca',
  'dho-lancamento-lote',
  'dho-trilhas-cargo',
  'dho-portal-gestor',
  'dho-comunicados',
  'dho-consultoria',
] as const;

const SG_FINANCEIRO_PAGES = [
  'sg-dashboard',
  'sg-notas-fiscais',
  'sg-conciliacao-acessos',
  'sg-compras-insumos',
  'sg-faturamento-attos',
  'sg-fechamento-attos',
] as const;

const SG_LOGISTICA_PAGES = [
  'sg-dashboard',
  'sg-beneficios',
  'sg-armarios',
  'sg-satisfacao-attos',
  'sg-chamados-manusis',
  'sg-cafe-abastecimento',
] as const;

const SG_ADMIN_PAGES = [
  'sg-dashboard',
  'sg-notas-fiscais',
  'sg-conciliacao-acessos',
  'sg-beneficios',
  'sg-armarios',
  'sg-compras-insumos',
  'sg-faturamento-attos',
  'sg-fechamento-attos',
  'sg-satisfacao-attos',
  'sg-chamados-manusis',
  'sg-cafe-abastecimento',
  'sg-voucher-natal',
] as const;

export function isDHOLimitedProfile(tipo: TipoUsuario): boolean {
  return tipo === 'financeiro' || tipo === 'logistica';
}

export function canAccessSistema(tipo: TipoUsuario, sistema: SistemaAtual): boolean {
  const ids = getSistemasPorTipo(tipo).map((s) => s.id);
  return ids.includes(sistema);
}

const DHO_PAGES_FULL_SET = new Set<string>([...DHO_FULL_PAGES, DHO_PAGE_GESTOR]);

export function canAccessDHOPage(tipo: TipoUsuario, page: string): boolean {
  if (!isDHOLimitedProfile(tipo)) {
    return DHO_PAGES_FULL_SET.has(page);
  }
  return page === DHO_PAGE_GESTOR;
}

export function canAccessSGPage(tipo: TipoUsuario, page: string): boolean {
  if (tipo === 'admin' || tipo === 'gestor') {
    return (SG_ADMIN_PAGES as readonly string[]).includes(page);
  }
  if (tipo === 'financeiro') {
    return (SG_FINANCEIRO_PAGES as readonly string[]).includes(page);
  }
  if (tipo === 'logistica') {
    return (SG_LOGISTICA_PAGES as readonly string[]).includes(page);
  }
  return false;
}

export function canAccessHRCorePage(_tipo: TipoUsuario, _page: string): boolean {
  return true;
}

export function canAccessRoute(
  tipo: TipoUsuario,
  sistema: SistemaAtual,
  page: string
): boolean {
  if (!canAccessSistema(tipo, sistema)) return false;
  if (sistema === 'hr-core') return canAccessHRCorePage(tipo, page);
  if (sistema === 'dho') return canAccessDHOPage(tipo, page);
  return canAccessSGPage(tipo, page);
}

export function getFirstAllowedPage(tipo: TipoUsuario, sistema: SistemaAtual): string {
  if (sistema === 'hr-core') return 'command-center';
  if (sistema === 'dho') {
    return isDHOLimitedProfile(tipo) ? DHO_PAGE_GESTOR : 'dho-dashboard';
  }
  return 'sg-dashboard';
}

export type AmbienteBadge = {
  label: string;
  className: string;
};

export function getAmbienteBadge(
  sistema: SistemaAtual,
  tipo: TipoUsuario
): AmbienteBadge | null {
  if (sistema !== 'servicos-gerais') return null;
  if (tipo === 'financeiro') {
    return {
      label: 'Ambiente Financeiro',
      className: 'bg-blue-600 text-white border-blue-700 shadow-blue-900/20',
    };
  }
  if (tipo === 'logistica') {
    return {
      label: 'Ambiente Logística & Facilities',
      className: 'bg-emerald-600 text-white border-emerald-700 shadow-emerald-900/20',
    };
  }
  return {
    label: 'Serviços Gerais — visão completa',
    className: 'bg-amber-600 text-white border-amber-700 shadow-amber-900/20',
  };
}
