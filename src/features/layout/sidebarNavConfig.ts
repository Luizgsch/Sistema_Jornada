import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  PieChart,
  Users,
  Briefcase,
  UserPlus,
  GraduationCap,
  MessageSquare,
  GitBranch,
  FileText,
  Shirt,
  Gift,
  Building2,
  Handshake,
  Route,
  Inbox,
  Megaphone,
  FileWarning,
  GitMerge,
  Car,
  Grid3x3,
  ShoppingCart,
  UtensilsCrossed,
  ClipboardCheck,
  Smile,
  ClipboardList,
  Ticket,
  Coffee,
  ScrollText,
} from "lucide-react";
import { DHO_PAGE_GESTOR } from "@/domain/auth/roles";

/** Roles that can access HR Core: rh, admin, gestor */
export type HRRole = "rh" | "admin" | "gestor";

export interface MenuSubItem {
  id: string;
  label: string;
  allowedRoles?: HRRole[];
}

export type NavEntry =
  | {
      kind: "leaf";
      pageId: string;
      label: string;
      icon: LucideIcon;
      allowedRoles?: HRRole[];
    }
  | {
      kind: "group";
      id: string;
      label: string;
      icon: LucideIcon;
      subItems: MenuSubItem[];
      allowedRoles?: HRRole[];
    };

export interface NavCategory {
  id: string;
  title: string;
  /** Tailwind classes applied to entry icons inside this category */
  iconTint: string;
  entries: NavEntry[];
}

const ALL_HR: HRRole[] = ["rh", "admin", "gestor"];
const ADMIN_ONLY: HRRole[] = ["admin", "gestor"];

export const HR_CORE_NAV: NavCategory[] = [
  {
    id: "cat-visao-geral",
    title: "Visão geral",
    iconTint: "text-primary dark:text-teal-400",
    entries: [
      { kind: "leaf", pageId: "command-center", label: "Início", icon: LayoutDashboard, allowedRoles: ALL_HR },
      {
        kind: "group",
        id: "nav-analytics",
        label: "Analytics (BI)",
        icon: PieChart,
        allowedRoles: ADMIN_ONLY,
        subItems: [
          { id: "indicadores", label: "Painéis por área", allowedRoles: ALL_HR },
          { id: "relatorios", label: "Relatórios exportáveis", allowedRoles: ADMIN_ONLY },
        ],
      },
    ],
  },
  {
    id: "cat-aquisicao",
    title: "Talent acquisition",
    iconTint: "text-sky-600 dark:text-sky-400",
    entries: [
      { kind: "leaf", pageId: "vagas", label: "Vagas", icon: Briefcase, allowedRoles: ALL_HR },
      { kind: "leaf", pageId: "candidatos", label: "Banco de candidatos", icon: Users, allowedRoles: ALL_HR },
      {
        kind: "group",
        id: "nav-processos-seletivos",
        label: "Processos seletivos",
        icon: GitBranch,
        allowedRoles: ALL_HR,
        subItems: [
          { id: "recrutamento-dashboard", label: "Operação hoje" },
          { id: "pipeline", label: "Pipeline" },
          { id: "triagem-ia", label: "Triagem com IA" },
          { id: "whatsapp", label: "WhatsApp Bot" },
          { id: "indicacoes", label: "Indicações" },
        ],
      },
    ],
  },
  {
    id: "cat-gestao-pessoas",
    title: "Gestão de pessoas",
    iconTint: "text-violet-600 dark:text-violet-400",
    entries: [
      { kind: "leaf", pageId: "colaboradores", label: "Colaboradores", icon: Users, allowedRoles: ALL_HR },
      { kind: "leaf", pageId: "movimentacoes", label: "Movimentações", icon: Briefcase, allowedRoles: ALL_HR },
      { kind: "leaf", pageId: "documentos", label: "Documentos admissionais", icon: FileText, allowedRoles: ALL_HR },
      {
        kind: "group",
        id: "nav-admissoes",
        label: "Admissões e integração",
        icon: UserPlus,
        allowedRoles: ALL_HR,
        subItems: [
          { id: "dashboard-admissoes", label: "Operação hoje" },
          { id: "onboarding", label: "Onboarding" },
          { id: "matriculas", label: "Matrículas" },
        ],
      },
      {
        kind: "group",
        id: "nav-operacoes-rh",
        label: "Equipes e cargos",
        icon: Building2,
        allowedRoles: ALL_HR,
        subItems: [
          { id: "headcount", label: "Headcount & vagas" },
          { id: "quadro-equipes", label: "Quadro de equipes" },
          { id: "temporarios", label: "Temporários" },
          { id: "desligamentos", label: "Desligamentos" },
          { id: "descricao-cargos", label: "Descrição de cargos" },
        ],
      },
    ],
  },
  {
    id: "cat-desenvolvimento",
    title: "DHO · desenvolvimento",
    iconTint: "text-emerald-600 dark:text-emerald-400",
    entries: [
      { kind: "leaf", pageId: "trilhas", label: "Trilhas de aprendizado", icon: Route, allowedRoles: ALL_HR },
      { kind: "leaf", pageId: "cursos", label: "Catálogo de cursos", icon: GraduationCap, allowedRoles: ALL_HR },
      {
        kind: "leaf",
        pageId: "certificados",
        label: "Avaliações e certificados",
        icon: ScrollText,
        allowedRoles: ALL_HR,
      },
    ],
  },
  {
    id: "cat-administrativo",
    title: "Administrativo",
    iconTint: "text-amber-600 dark:text-amber-400",
    entries: [
      {
        kind: "group",
        id: "nav-logistica-uniformes",
        label: "Logística de uniformes",
        icon: Shirt,
        allowedRoles: ALL_HR,
        subItems: [
          { id: "uniformes", label: "Lista de uniformes" },
          { id: "operacoes-epis", label: "EPIs" },
        ],
      },
      {
        kind: "leaf",
        pageId: "beneficios-operacionais",
        label: "Benefícios",
        icon: Gift,
        allowedRoles: ALL_HR,
      },
    ],
  },
  {
    id: "cat-cultura",
    title: "Cultura e social",
    iconTint: "text-rose-600 dark:text-rose-400",
    entries: [
      {
        kind: "leaf",
        pageId: "comunicacao-interna",
        label: "Comunicação centralizada",
        icon: MessageSquare,
        allowedRoles: ALL_HR,
      },
    ],
  },
];

export function filterHRCategories(categories: NavCategory[], role: HRRole): NavCategory[] {
  return categories
    .map((cat) => {
      const entries = cat.entries
        .map((e) => {
          if (e.kind === "leaf") {
            if (e.allowedRoles && !e.allowedRoles.includes(role)) return null;
            return e;
          }
          const subs = e.subItems.filter(
            (s) => !s.allowedRoles || s.allowedRoles.includes(role)
          );
          if (e.allowedRoles && !e.allowedRoles.includes(role)) return null;
          if (subs.length === 0) return null;
          return { ...e, subItems: subs };
        })
        .filter((e): e is NavEntry => e !== null);
      return { ...cat, entries };
    })
    .filter((cat) => cat.entries.length > 0);
}

export function filterSGCategories(
  categories: NavCategory[],
  canAccess: (pageId: string) => boolean
): NavCategory[] {
  return categories
    .map((cat) => {
      const entries = cat.entries
        .map((e) => {
          if (e.kind === "leaf") {
            return canAccess(e.pageId) ? e : null;
          }
          const subs = e.subItems.filter((s) => canAccess(s.id));
          if (subs.length === 0) return null;
          return { ...e, subItems: subs };
        })
        .filter((e): e is NavEntry => e !== null);
      return { ...cat, entries };
    })
    .filter((cat) => cat.entries.length > 0);
}

export function getCategoryIdForPage(
  categories: NavCategory[],
  activePage: string
): string | undefined {
  for (const cat of categories) {
    for (const e of cat.entries) {
      if (e.kind === "leaf" && e.pageId === activePage) return cat.id;
      if (e.kind === "group" && e.subItems.some((s) => s.id === activePage)) return cat.id;
    }
  }
  return undefined;
}

export function getInnerGroupIdsForPage(
  categories: NavCategory[],
  activePage: string
): string[] {
  const ids: string[] = [];
  for (const cat of categories) {
    for (const e of cat.entries) {
      if (e.kind === "group" && e.subItems.some((s) => s.id === activePage)) {
        ids.push(e.id);
      }
    }
  }
  return ids;
}

export function flattenNavForCollapsed(categories: NavCategory[]): {
  pageId: string;
  label: string;
  icon: LucideIcon;
}[] {
  const out: { pageId: string; label: string; icon: LucideIcon }[] = [];
  for (const cat of categories) {
    for (const e of cat.entries) {
      if (e.kind === "leaf") {
        out.push({ pageId: e.pageId, label: e.label, icon: e.icon });
      } else {
        for (const s of e.subItems) {
          out.push({ pageId: s.id, label: `${e.label}: ${s.label}`, icon: e.icon });
        }
      }
    }
  }
  return out;
}

export const DHO_NAV_FULL: NavCategory[] = [
  {
    id: "cat-dho-visao",
    title: "Visão geral",
    iconTint: "text-blue-600 dark:text-blue-400",
    entries: [
      { kind: "leaf", pageId: "dho-dashboard", label: "Dashboard T&D", icon: LayoutDashboard },
      {
        kind: "leaf",
        pageId: DHO_PAGE_GESTOR,
        label: "Solicitações ao DHO (transversal)",
        icon: Handshake,
      },
    ],
  },
  {
    id: "cat-dho-treino",
    title: "Treinamentos",
    iconTint: "text-emerald-600 dark:text-emerald-400",
    entries: [
      {
        kind: "group",
        id: "dho-grp-treinamentos",
        label: "Operações de treinamento",
        icon: GraduationCap,
        subItems: [
          { id: "dho-presenca", label: "Presença digital (QR)" },
          { id: "dho-lancamento-lote", label: "Lançamento em lote" },
        ],
      },
      { kind: "leaf", pageId: "dho-trilhas-cargo", label: "Trilhas por cargo", icon: Route },
      { kind: "leaf", pageId: "dho-portal-gestor", label: "Portal do gestor", icon: Inbox },
    ],
  },
  {
    id: "cat-dho-com",
    title: "Comunicação",
    iconTint: "text-violet-600 dark:text-violet-400",
    entries: [
      {
        kind: "group",
        id: "dho-grp-com",
        label: "Comunicação interna",
        icon: Megaphone,
        subItems: [
          { id: "dho-comunicados", label: "Comunicados T&D" },
          { id: "dho-consultoria", label: "Consultoria interna" },
        ],
      },
    ],
  },
];

export const DHO_NAV_LIMITED: NavCategory[] = [
  {
    id: "cat-dho-transversal",
    title: "Transversal",
    iconTint: "text-blue-600 dark:text-blue-400",
    entries: [
      { kind: "leaf", pageId: DHO_PAGE_GESTOR, label: "Solicitações ao DHO", icon: Handshake },
    ],
  },
];

export const SG_NAV: NavCategory[] = [
  {
    id: "cat-sg-painel",
    title: "Painel",
    iconTint: "text-primary dark:text-teal-400",
    entries: [{ kind: "leaf", pageId: "sg-dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    id: "cat-sg-fiscal",
    title: "Fiscal e contratos",
    iconTint: "text-sky-600 dark:text-sky-400",
    entries: [
      { kind: "leaf", pageId: "sg-notas-fiscais", label: "Notas fiscais", icon: FileWarning },
      { kind: "leaf", pageId: "sg-conciliacao-acessos", label: "Conciliação (Elo · Attos)", icon: GitMerge },
      { kind: "leaf", pageId: "sg-compras-insumos", label: "Compras insumos", icon: ShoppingCart },
      { kind: "leaf", pageId: "sg-faturamento-attos", label: "Faturamento Attos", icon: UtensilsCrossed },
      { kind: "leaf", pageId: "sg-fechamento-attos", label: "Fechamento Attos", icon: ClipboardCheck },
    ],
  },
  {
    id: "cat-sg-logistica",
    title: "Logística e facilities",
    iconTint: "text-emerald-600 dark:text-emerald-400",
    entries: [
      { kind: "leaf", pageId: "sg-beneficios", label: "VT × Estacionamento", icon: Car },
      { kind: "leaf", pageId: "sg-armarios", label: "Armários vestiário", icon: Grid3x3 },
      { kind: "leaf", pageId: "sg-satisfacao-attos", label: "Satisfação refeição", icon: Smile },
      { kind: "leaf", pageId: "sg-chamados-manusis", label: "Chamados (Manusis)", icon: ClipboardList },
    ],
  },
  {
    id: "cat-sg-programas",
    title: "Programas",
    iconTint: "text-amber-600 dark:text-amber-400",
    entries: [{ kind: "leaf", pageId: "sg-voucher-natal", label: "Voucher Natal", icon: Ticket }],
  },
  {
    id: "cat-sg-cultura",
    title: "Cultura e social",
    iconTint: "text-rose-600 dark:text-rose-400",
    entries: [
      {
        kind: "group",
        id: "sg-grp-engajamento",
        label: "Engajamento",
        icon: Coffee,
        subItems: [
          { id: "sg-engajamento-cafe", label: "Sociedade do Café" },
          { id: "sg-engajamento-aniversariantes", label: "Aniversariantes" },
          { id: "sg-engajamento-mural", label: "Mural" },
        ],
      },
    ],
  },
];
