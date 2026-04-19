import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Building2,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import { cn } from "@/shared/lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import type { SistemaAcesso } from "@/infrastructure/mock/mockLogin";
import { useAuth } from "@/features/auth/AuthContext";
import {
  canAccessSGPage,
  isDHOLimitedProfile,
  type SistemaAtual,
} from "@/domain/auth/roles";
import { PosigrafLogo } from "@/shared/components/brand/PosigrafLogo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/Accordion";
import {
  DHO_NAV_FULL,
  DHO_NAV_LIMITED,
  HR_CORE_NAV,
  SG_NAV,
  filterHRCategories,
  filterSGCategories,
  flattenNavForCollapsed,
  getCategoryIdForPage,
  getInnerGroupIdsForPage,
  type NavCategory,
  type NavEntry,
} from "@/features/layout/sidebarNavConfig";

/** Roles that can access HR Core: rh, admin, gestor */
type HRRole = "rh" | "admin" | "gestor";

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

function NavGroupRow({
  entry,
  categoryTint,
  collapsed,
  mobile,
  showLabels,
  isInnerOpen,
  isGroupActive,
  activePage,
  onToggleInner,
  onLeafClick,
}: {
  entry: Extract<NavEntry, { kind: "group" }>;
  categoryTint: string;
  collapsed: boolean;
  mobile?: boolean;
  showLabels: boolean;
  isInnerOpen: boolean;
  isGroupActive: boolean;
  activePage: string;
  onToggleInner: () => void;
  onLeafClick: (id: string) => void;
}) {
  const Icon = entry.icon;
  const button = (
    <button
      type="button"
      onClick={() => {
        if (!collapsed || mobile) onToggleInner();
      }}
      className={cn(
        "flex items-center w-full rounded-radius-m p-2.5 text-sm transition-all",
        showLabels ? "justify-between gap-2" : "justify-center p-3",
        isGroupActive
          ? "bg-zinc-100 text-zinc-800 dark:bg-zinc-900/60 dark:text-white"
          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-slate-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
      )}
    >
      <span className={cn("flex min-w-0 items-center gap-3", showLabels ? "flex-1" : "")}>
        <Icon size={18} className={cn("shrink-0", categoryTint)} />
        {showLabels ? (
          <span
            className={cn(
              "truncate text-left",
              isGroupActive
                ? "font-semibold text-zinc-800 dark:text-white"
                : "font-normal text-zinc-500 dark:text-slate-400"
            )}
          >
            {entry.label}
          </span>
        ) : null}
      </span>
      {showLabels ? (
        <motion.div animate={{ rotate: isInnerOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
          <ChevronDown size={14} className="text-zinc-400 dark:text-slate-500" />
        </motion.div>
      ) : null}
    </button>
  );

  const wrapped =
    collapsed && !mobile ? (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="top">{entry.label}</TooltipContent>
      </Tooltip>
    ) : (
      button
    );

  return (
    <div className="space-y-0.5">
      {wrapped}
      <AnimatePresence>
        {showLabels && isInnerOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5 border-l border-zinc-200 pl-3 ml-3 dark:border-zinc-700">
              {entry.subItems.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => onLeafClick(sub.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-radius-m py-2 pl-3 pr-2 text-left text-sm transition-all",
                    activePage === sub.id
                      ? "bg-primary/10 font-semibold text-primary"
                      : "font-normal text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-slate-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
                  )}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavLeafRow({
  label,
  Icon,
  categoryTint,
  collapsed,
  mobile,
  showLabels,
  active,
  onClick,
}: {
  label: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  categoryTint: string;
  collapsed: boolean;
  mobile?: boolean;
  showLabels: boolean;
  active: boolean;
  onClick: () => void;
}) {
  const button = (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center rounded-radius-m p-2.5 text-sm transition-all",
        showLabels ? "gap-3" : "justify-center p-3",
        active
          ? "bg-primary font-semibold text-white shadow-lg shadow-primary/20"
          : "font-normal text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-slate-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
      )}
    >
      <Icon size={18} className={cn("shrink-0", active ? "text-inherit" : categoryTint)} />
      {showLabels ? (
        <span className={cn("truncate text-left", active ? "font-semibold" : "font-normal")}>{label}</span>
      ) : null}
    </button>
  );

  if (collapsed && !mobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="top">{label}</TooltipContent>
      </Tooltip>
    );
  }

  return button;
}

function renderCategoryEntries(
  cat: NavCategory,
  opts: {
    collapsed: boolean;
    mobile?: boolean;
    showLabels: boolean;
    activePage: string;
    expandedInner: string[];
    toggleInner: (id: string) => void;
    handleLeafClick: (id: string) => void;
  }
) {
  const { collapsed, mobile, showLabels, activePage, expandedInner, toggleInner, handleLeafClick } = opts;

  return (
    <div className="flex flex-col gap-1.5 pt-1">
      {cat.entries.map((entry) => {
        if (entry.kind === "leaf") {
          const Icon = entry.icon;
          return (
            <NavLeafRow
              key={entry.pageId}
              label={entry.label}
              Icon={Icon}
              categoryTint={cat.iconTint}
              collapsed={collapsed}
              mobile={mobile}
              showLabels={showLabels}
              active={activePage === entry.pageId}
              onClick={() => handleLeafClick(entry.pageId)}
            />
          );
        }
        const isInnerOpen = expandedInner.includes(entry.id);
        const isGroupActive = entry.subItems.some((s) => s.id === activePage);
        return (
          <NavGroupRow
            key={entry.id}
            entry={entry}
            categoryTint={cat.iconTint}
            collapsed={collapsed}
            mobile={mobile}
            showLabels={showLabels}
            isInnerOpen={isInnerOpen}
            isGroupActive={isGroupActive}
            activePage={activePage}
            onToggleInner={() => toggleInner(entry.id)}
            onLeafClick={handleLeafClick}
          />
        );
      })}
    </div>
  );
}

export function Sidebar({
  activePage = "command-center",
  onPageChange,
  mobile,
  onClose,
  className,
  sistemaAtual = "hr-core",
  onSistemaChange,
  sistemasDisponiveis = [],
}: SidebarProps) {
  const { usuario, getFirstAllowedPage } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedInner, setExpandedInner] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [menuSeletorAberto, setMenuSeletorAberto] = useState(false);

  const visibleCategories = useMemo((): NavCategory[] => {
    if (sistemaAtual === "hr-core") {
      return filterHRCategories(HR_CORE_NAV, usuario.tipo as HRRole);
    }
    if (sistemaAtual === "dho") {
      return isDHOLimitedProfile(usuario.tipo) ? DHO_NAV_LIMITED : DHO_NAV_FULL;
    }
    return filterSGCategories(SG_NAV, (id) => canAccessSGPage(usuario.tipo, id));
  }, [sistemaAtual, usuario.tipo]);

  const collapsedTargets = useMemo(() => flattenNavForCollapsed(visibleCategories), [visibleCategories]);

  useEffect(() => {
    const first = visibleCategories[0]?.id;
    if (first) setOpenCategories([first]);
  }, [sistemaAtual]);

  useEffect(() => {
    const cid = getCategoryIdForPage(visibleCategories, activePage);
    if (cid) {
      setOpenCategories((prev) => (prev.includes(cid) ? prev : [...prev, cid]));
    }
  }, [activePage, visibleCategories]);

  useEffect(() => {
    const ids = getInnerGroupIdsForPage(visibleCategories, activePage);
    if (ids.length > 0) {
      setExpandedInner((prev) => Array.from(new Set([...prev, ...ids])));
    }
  }, [activePage, visibleCategories]);

  const toggleInner = (id: string) => {
    setExpandedInner((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleLeafClick = (id: string) => {
    if (onPageChange) onPageChange(id);
    if (mobile && onClose) onClose();
  };

  const sistemaLabel =
    sistemaAtual === "hr-core" ? "HR Core" : sistemaAtual === "dho" ? "DHO" : "Serviços Gerais";

  const toggleSistema = (novoSistema: SistemaAtual) => {
    if (onSistemaChange) {
      onSistemaChange(novoSistema);
    }
    setMenuSeletorAberto(false);
    if (onPageChange) {
      onPageChange(getFirstAllowedPage(novoSistema));
    }
  };

  const showLabels = !collapsed || Boolean(mobile);

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
      <div className="border-b border-zinc-200 p-4 dark:border-[#334155]">
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuSeletorAberto(!menuSeletorAberto)}
            className="flex w-full items-center justify-between rounded-radius-m border border-zinc-200 bg-zinc-100 p-3 transition-all hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800/40 dark:hover:bg-zinc-800"
          >
            <div className="flex items-center gap-3">
              {sistemaAtual === "hr-core" && <LayoutDashboard className="text-primary" size={20} />}
              {sistemaAtual === "dho" && <Building2 className="text-blue-500 dark:text-blue-400" size={20} />}
              {sistemaAtual === "servicos-gerais" && <Wrench className="text-amber-500 dark:text-amber-400" size={20} />}
              <span className="font-bold text-zinc-800 dark:text-white">{sistemaLabel}</span>
            </div>
            <ChevronDown
              className={cn("text-zinc-400 transition-transform dark:text-slate-400", menuSeletorAberto && "rotate-180")}
              size={18}
            />
          </button>

          {menuSeletorAberto && sistemasDisponiveis.length > 1 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-radius-m border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
              <div className="border-b border-zinc-200 p-3 dark:border-zinc-700">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Selecione o Sistema</p>
              </div>
              <div className="p-2">
                {sistemasDisponiveis.map((sistema) => (
                  <button
                    key={sistema.id}
                    type="button"
                    onClick={() => toggleSistema(sistema.id as SistemaAtual)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-radius-m px-3 py-2.5 text-left transition-colors",
                      sistemaAtual === sistema.id
                        ? "bg-primary/10 text-primary"
                        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
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

      <div className="flex min-h-[4.5rem] items-center justify-between border-b border-zinc-200 px-4 py-4 sm:px-6 dark:border-[#334155]">
        {(!collapsed || mobile) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-w-0 w-full flex-col gap-1.5">
            <PosigrafLogo variant="full" className="min-w-0 dark:hidden" />
            <PosigrafLogo variant="full" inverted className="hidden min-w-0 dark:block" />
            <span className="truncate text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400/90">
              {sistemaLabel}
            </span>
          </motion.div>
        )}
        {collapsed && !mobile && (
          <div className="flex w-full justify-center">
            <PosigrafLogo variant="compact" className="dark:hidden" />
            <PosigrafLogo variant="compact" inverted className="hidden dark:block" />
          </div>
        )}
      </div>

      <nav className="custom-scrollbar min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-y-contain px-4 py-6 pr-3 [scrollbar-width:thin]">
        {collapsed && !mobile ? (
          <div className="flex flex-col gap-1 space-y-1">
            {collapsedTargets.map((t) => {
              const Icon = t.icon;
              const active = activePage === t.pageId;
              const btn = (
                <button
                  key={t.pageId}
                  type="button"
                  onClick={() => handleLeafClick(t.pageId)}
                  className={cn(
                    "flex w-full items-center justify-center rounded-radius-m p-3 transition-all",
                    active
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-slate-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
                  )}
                >
                  <Icon size={20} className={cn("shrink-0", active ? "text-inherit" : "text-zinc-400 dark:text-slate-500")} />
                </button>
              );
              return (
                <Tooltip key={t.pageId}>
                  <TooltipTrigger asChild>{btn}</TooltipTrigger>
                  <TooltipContent side="top">{t.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-5" value={openCategories} onValueChange={setOpenCategories}>
            {visibleCategories.map((cat) => (
              <AccordionItem key={cat.id} value={cat.id} className="border-b-0">
                <AccordionTrigger className="px-1 py-0 hover:no-underline [&[data-state=open]]:pb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-slate-500">
                    {cat.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {renderCategoryEntries(cat, {
                    collapsed,
                    mobile,
                    showLabels,
                    activePage,
                    expandedInner,
                    toggleInner,
                    handleLeafClick,
                  })}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </nav>

      {!mobile && (
        <div className="border-t border-zinc-200 p-4 dark:border-[#334155]">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-between rounded-radius-m p-2 text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-800 dark:text-slate-400 dark:hover:bg-zinc-900/60 dark:hover:text-white"
          >
            <span className="text-sm font-medium">{collapsed ? "Expandir" : "Recolher"}</span>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      )}
    </motion.aside>
  );
}
