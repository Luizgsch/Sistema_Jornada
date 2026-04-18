import { 
  Users, 
  LayoutDashboard, 
  PieChart,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Briefcase,
  GraduationCap,
  ChevronDown,
  Building2,
  Wrench,
  GitMerge,
  Route,
  Inbox,
  Megaphone,
  FileWarning,
  Car,
  Grid3x3,
  ShoppingCart,
  UtensilsCrossed,
  ClipboardCheck,
  Smile,
  ClipboardList,
  Ticket,
  UsersRound,
  Handshake,
  MessageSquare,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import type { SistemaAcesso } from "@/infrastructure/mock/mockLogin";
import { useAuth } from "@/features/auth/AuthContext";
import {
  DHO_PAGE_GESTOR,
  canAccessSGPage,
  isDHOLimitedProfile,
  type SistemaAtual,
} from "@/domain/auth/roles";
import { PosigrafLogo } from "@/shared/components/brand/PosigrafLogo";

/** Roles that can access HR Core: rh, admin, gestor */
type HRRole = 'rh' | 'admin' | 'gestor';

interface MenuSubItem {
  id: string;
  label: string;
  allowedRoles?: HRRole[];
}

interface MenuItem {
  id: string;
  icon: any;
  label: string;
  allowedRoles?: HRRole[];
  subItems?: MenuSubItem[];
}

const ALL_HR: HRRole[] = ['rh', 'admin', 'gestor'];
const ADMIN_ONLY: HRRole[] = ['admin', 'gestor'];

const menuItemsHRCore: MenuItem[] = [
  { id: "command-center", icon: LayoutDashboard, label: "Início", allowedRoles: ALL_HR },
  { 
    id: "recrutamento", 
    icon: Users, 
    label: "Recrutamento",
    allowedRoles: ALL_HR,
    subItems: [
      { id: "recrutamento-dashboard", label: "Operação hoje" },
      { id: "vagas", label: "Vagas" },
      { id: "pipeline", label: "Pipeline" },
      { id: "triagem-ia", label: "Triagem com IA" },
      { id: "candidatos", label: "Banco de Candidatos" },
      { id: "indicacoes", label: "Indicações" },
      { id: "whatsapp", label: "WhatsApp Bot" },
    ]
  },
  { 
    id: "admissoes", 
    icon: UserPlus, 
    label: "Admissões",
    allowedRoles: ALL_HR,
    subItems: [
      { id: "dashboard-admissoes", label: "Operação hoje" },
      { id: "documentos", label: "Documentos" },
      { id: "onboarding", label: "Onboarding" },
      { id: "matriculas", label: "Matrículas" },
    ]
  },
  { 
    id: "operacoes", 
    icon: Briefcase, 
    label: "Operações RH",
    allowedRoles: ALL_HR,
    subItems: [
      { id: "colaboradores", label: "Colaboradores" },
      { id: "headcount", label: "Headcount & vagas" },
      { id: "quadro-equipes", label: "Quadro de equipes" },
      { id: "temporarios", label: "Temporários" },
      { id: "uniformes", label: "Uniformes" },
      { id: "movimentacoes", label: "Movimentações" },
      { id: "desligamentos", label: "Desligamentos" },
      { id: "descricao-cargos", label: "Descrição de cargos" },
    ]
  },
  { id: "comunicacao-interna", icon: MessageSquare, label: "Comunicação centralizada", allowedRoles: ALL_HR },
  { 
    id: "treinamentos", 
    icon: GraduationCap, 
    label: "Treinamentos",
    allowedRoles: ALL_HR,
    subItems: [
      { id: "trilhas", label: "Trilhas" },
      { id: "cursos", label: "Cursos" },
      { id: "certificados", label: "Certificados" },
    ]
  },
  { 
    id: "analytics", 
    icon: PieChart, 
    label: "Analytics (BI)",
    allowedRoles: ADMIN_ONLY,
    subItems: [
      { id: "indicadores", label: "Painéis por área", allowedRoles: ALL_HR },
      { id: "relatorios", label: "Relatórios exportáveis", allowedRoles: ADMIN_ONLY },
    ]
  },
];

const menuItemsDHO: MenuItem[] = [
  { id: "dho-dashboard", icon: LayoutDashboard, label: "Dashboard T&D" },
  {
    id: DHO_PAGE_GESTOR,
    icon: Handshake,
    label: "Solicitações ao DHO (transversal)",
  },
  {
    id: "dho-treinamentos",
    icon: GraduationCap,
    label: "Treinamentos",
    subItems: [
      { id: "dho-presenca", label: "Presença digital (QR)" },
      { id: "dho-lancamento-lote", label: "Lançamento em lote" },
    ],
  },
  { id: "dho-trilhas-cargo", icon: Route, label: "Trilhas por cargo" },
  { id: "dho-portal-gestor", icon: Inbox, label: "Portal do gestor" },
  {
    id: "dho-com-interna",
    icon: Megaphone,
    label: "Comunicação interna",
    subItems: [
      { id: "dho-comunicados", label: "Comunicados T&D" },
      { id: "dho-consultoria", label: "Consultoria interna" },
    ],
  },
];

const menuItemsServicosGeraisBase: MenuItem[] = [
  { id: "sg-dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "sg-notas-fiscais", icon: FileWarning, label: "Notas fiscais" },
  { id: "sg-conciliacao-acessos", icon: GitMerge, label: "Conciliação (Elo · Attos)" },
  { id: "sg-beneficios", icon: Car, label: "VT × Estacionamento" },
  { id: "sg-armarios", icon: Grid3x3, label: "Armários vestiário" },
  { id: "sg-compras-insumos", icon: ShoppingCart, label: "Compras insumos" },
  { id: "sg-faturamento-attos", icon: UtensilsCrossed, label: "Faturamento Attos" },
  { id: "sg-fechamento-attos", icon: ClipboardCheck, label: "Fechamento Attos" },
  { id: "sg-satisfacao-attos", icon: Smile, label: "Satisfação refeição" },
  { id: "sg-chamados-manusis", icon: ClipboardList, label: "Chamados (Manusis)" },
  { id: "sg-voucher-natal", icon: Ticket, label: "Voucher Natal" },
  {
    id: "sg-engajamento",
    icon: UsersRound,
    label: "Engajamento",
    subItems: [
      { id: "sg-engajamento-cafe", label: "Sociedade do Café" },
      { id: "sg-engajamento-aniversariantes", label: "Aniversariantes" },
      { id: "sg-engajamento-mural", label: "Mural" },
    ],
  },
];

const menuItemsDHOLimited: MenuItem[] = [
  { id: DHO_PAGE_GESTOR, icon: Handshake, label: "Solicitações ao DHO" },
];

interface SidebarProps {
  activePage?: string;
  onPageChange?: (pageId: string) => void;
  mobile?: boolean;
  onClose?: () => void;
  className?: string;
  sistemaAtual?: SistemaAtual;
  onSistemaChange?: (sistema: SistemaAtual) => void;
  sistemasDisponiveis?: SistemaAcesso[];
}

export function Sidebar({ 
  activePage = "command-center", 
  onPageChange, 
  mobile, 
  onClose, 
  className,
  sistemaAtual = 'hr-core',
  onSistemaChange,
  sistemasDisponiveis = []
}: SidebarProps) {
  const { usuario, getFirstAllowedPage } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [menuSeletorAberto, setMenuSeletorAberto] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleItemClick = (id: string) => {
    if (onPageChange) onPageChange(id);
    if (mobile && onClose) onClose();
  };

  const menuServicosGerais = useMemo(() => {
    return menuItemsServicosGeraisBase
      .map((item) => {
        if (item.subItems) {
          const allowedSubs = item.subItems.filter((s) => canAccessSGPage(usuario.tipo, s.id));
          if (allowedSubs.length === 0) return null;
          return { ...item, subItems: allowedSubs };
        }
        return canAccessSGPage(usuario.tipo, item.id) ? item : null;
      })
      .filter((item): item is MenuItem => item !== null);
  }, [usuario.tipo]);

  const menuDHO = useMemo(
    () => (isDHOLimitedProfile(usuario.tipo) ? menuItemsDHOLimited : menuItemsDHO),
    [usuario.tipo]
  );

  const rawMenuItems = useMemo(
    () =>
      sistemaAtual === 'hr-core' ? menuItemsHRCore : sistemaAtual === 'dho' ? menuDHO : menuServicosGerais,
    [sistemaAtual, menuDHO, menuServicosGerais]
  );

  const menuItems = useMemo(() => {
    if (sistemaAtual !== 'hr-core') return rawMenuItems;
    return rawMenuItems
      .filter((item) => !item.allowedRoles || item.allowedRoles.includes(usuario.tipo as HRRole))
      .map((item) => ({
        ...item,
        subItems: item.subItems?.filter(
          (sub) => !sub.allowedRoles || sub.allowedRoles.includes(usuario.tipo as HRRole)
        ),
      }));
  }, [rawMenuItems, sistemaAtual, usuario.tipo]);

  useEffect(() => {
    const parentIds: string[] = [];
    for (const item of menuItems) {
      if (item.subItems?.some((s) => s.id === activePage)) {
        parentIds.push(item.id);
      }
    }
    if (parentIds.length > 0) {
      setExpandedItems((prev) => Array.from(new Set([...prev, ...parentIds])));
    }
  }, [activePage, menuItems]);

  const sistemaLabel = sistemaAtual === 'hr-core' ? 'HR Core' : 
                       sistemaAtual === 'dho' ? 'DHO' : 
                       'Serviços Gerais';

  const toggleSistema = (novoSistema: SistemaAtual) => {
    if (onSistemaChange) {
      onSistemaChange(novoSistema);
    }
    setMenuSeletorAberto(false);
    if (onPageChange) {
      onPageChange(getFirstAllowedPage(novoSistema));
    }
  };

  return (
    <motion.aside
      initial={mobile ? { x: 0 } : { x: -280 }}
      animate={{ x: 0 }}
      className={cn(
        "h-full min-h-0 bg-white dark:bg-[#0f172a] border-r border-zinc-200 dark:border-[#334155] transition-colors duration-300 z-50 flex flex-col",
        !mobile && "fixed left-0 top-0",
        collapsed && !mobile ? "w-20" : "w-72",
        className
      )}
    >
      {/* Seletor de Sistema */}
      <div className="p-4 border-b border-zinc-200 dark:border-[#334155]">
        <div className="relative">
          <button
            onClick={() => setMenuSeletorAberto(!menuSeletorAberto)}
            className="flex items-center justify-between w-full p-3 bg-zinc-100 dark:bg-zinc-800/40 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-radius-m border border-zinc-200 dark:border-zinc-700 transition-all"
          >
            <div className="flex items-center gap-3">
              {sistemaAtual === 'hr-core' && <LayoutDashboard className="text-primary" size={20} />}
              {sistemaAtual === 'dho' && <Building2 className="text-blue-500 dark:text-blue-400" size={20} />}
              {sistemaAtual === 'servicos-gerais' && <Wrench className="text-amber-500 dark:text-amber-400" size={20} />}
              <span className="font-bold text-zinc-800 dark:text-white">{sistemaLabel}</span>
            </div>
            <ChevronDown className={cn("text-zinc-400 dark:text-slate-400 transition-transform", menuSeletorAberto && "rotate-180")} size={18} />
          </button>

          {menuSeletorAberto && sistemasDisponiveis.length > 1 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-radius-m z-50 overflow-hidden shadow-lg">
              <div className="p-3 border-b border-zinc-200 dark:border-zinc-700">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Selecione o Sistema</p>
              </div>
              <div className="p-2">
                {sistemasDisponiveis.map((sistema) => (
                  <button
                    key={sistema.id}
                    onClick={() => toggleSistema(sistema.id as SistemaAtual)}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-2.5 rounded-radius-m text-left transition-colors",
                      sistemaAtual === sistema.id
                        ? "bg-primary/10 text-primary"
                        : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    )}
                  >
                    <sistema.icon size={18} />
                    <div>
                      <p className="font-medium">{sistema.label}</p>
                      <p className="text-xs text-zinc-500 dark:text-slate-400">{sistema.descricao}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Marca + módulo ativo */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 min-h-[4.5rem] border-b border-zinc-200 dark:border-[#334155]">
        {(!collapsed || mobile) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-1.5 min-w-0 w-full"
          >
            <PosigrafLogo variant="full" className="min-w-0 dark:hidden" />
            <PosigrafLogo variant="full" inverted className="min-w-0 hidden dark:block" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400/90 truncate">
              {sistemaLabel}
            </span>
          </motion.div>
        )}
        {collapsed && !mobile && (
          <div className="flex justify-center w-full">
            <PosigrafLogo variant="compact" className="dark:hidden" />
            <PosigrafLogo variant="compact" inverted className="hidden dark:block" />
          </div>
        )}
      </div>

      {/* Menu de navegação */}
      <nav className="flex-1 min-h-0 px-4 py-6 pr-3 space-y-1 overflow-y-auto overscroll-y-contain custom-scrollbar [scrollbar-width:thin]">
        {menuItems.map((item) => {
          const isExpanded = expandedItems.includes(item.id);
          const isActive = activePage === item.id || item.subItems?.some(s => s.id === activePage);

          return (
            <div key={item.id} className="space-y-1">
              <button
                onClick={() => {
                  if (item.subItems) {
                    toggleExpand(item.id);
                  } else {
                    handleItemClick(item.id);
                  }
                }}
                className={cn(
                  "flex items-center justify-between w-full p-3 rounded-radius-m transition-all group",
                  isActive && !item.subItems
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : item.subItems && isActive
                    ? "text-zinc-800 dark:text-white bg-zinc-100 dark:bg-zinc-900/60"
                    : "text-zinc-500 dark:text-slate-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={isActive ? "text-inherit" : "text-zinc-400 dark:text-slate-500"} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.subItems && (
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                )}
              </button>

              <AnimatePresence>
                {item.subItems && isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleItemClick(subItem.id)}
                        className={cn(
                          "flex items-center gap-3 w-full p-2.5 pl-11 rounded-radius-m text-sm transition-all",
                          activePage === subItem.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-zinc-500 dark:text-slate-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                        )}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Botão recolher */}
      {!mobile && (
        <div className="p-4 border-t border-zinc-200 dark:border-[#334155]">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-between w-full p-2 rounded-radius-m text-zinc-500 dark:text-slate-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-all"
          >
            <span className="text-sm font-medium">{collapsed ? "Expandir" : "Recolher"}</span>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      )}
    </motion.aside>
  );
}