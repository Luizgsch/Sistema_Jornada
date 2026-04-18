import { Search, Bell, User, ChevronDown, HelpCircle, Menu, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import type { Usuario } from "@/infrastructure/mock/mockLogin";
import type { SistemaAtual } from "@/domain/auth/roles";
import { getAmbienteBadge } from "@/domain/auth/roles";
import { PosigrafLogo } from "@/shared/components/brand/PosigrafLogo";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

interface TopbarProps {
  onMenuClick: () => void;
  usuario?: Usuario | null;
  onLogout?: () => void;
  sistemaAtual?: SistemaAtual;
  onSearchOpen?: () => void;
  onNotificationsOpen?: () => void;
  /** Abre edição rápida de perfil (painel lateral), ex.: ao clicar no avatar. */
  onProfileClick?: () => void;
  alertCount?: number;
}

export function Topbar({ onMenuClick, usuario, onLogout, sistemaAtual = 'hr-core', onSearchOpen, onNotificationsOpen, onProfileClick, alertCount = 0 }: TopbarProps) {
  const currentDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date());

  const ambiente =
    usuario && sistemaAtual ? getAmbienteBadge(sistemaAtual, usuario.tipo) : null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 shrink-0 border-b border-zinc-200 dark:border-[#334155] bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md z-40 flex items-center justify-between px-4 md:px-8 transition-colors duration-300"
    >
      <div className="flex items-center space-x-4 min-w-0">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-radius-m lg:hidden text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <Menu size={22} />
        </button>

        <div className="hidden lg:flex items-center pr-4 mr-1 border-r border-zinc-200 dark:border-[#334155] shrink-0">
          <PosigrafLogo variant="compact" className="opacity-80" />
        </div>

        {/* Desktop search bar */}
        <div className="flex-1 max-w-xl hidden md:block min-w-0">
          <button
            onClick={onSearchOpen}
            className="relative group w-full flex items-center h-9 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-zinc-50 dark:bg-zinc-900 px-3 text-sm text-zinc-400 dark:text-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            <Search className="h-4 w-4 mr-2 shrink-0 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-500 transition-colors" />
            <span className="flex-1 text-left">Pesquisar...</span>
          </button>
        </div>

        {/* Mobile search icon — hidden on desktop */}
        <button
          onClick={onSearchOpen}
          className="md:hidden p-2 rounded-radius-m text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Buscar"
        >
          <Search size={20} />
        </button>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3">
        {ambiente && (
          <span
            className={`hidden md:inline-flex items-center rounded-radius-m border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${ambiente.className}`}
          >
            {ambiente.label}
          </span>
        )}
        <button className="hidden sm:flex p-2 rounded-full text-zinc-500 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <HelpCircle size={18} />
        </button>

        {/* Theme Toggle — ao lado do sino */}
        <ThemeToggle />

        <button
          onClick={onNotificationsOpen}
          className="p-2 rounded-full text-zinc-500 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative"
        >
          <Bell size={18} />
          {alertCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#0f172a]" />
          )}
        </button>

        <div className="hidden lg:flex items-center text-xs font-medium text-zinc-500 dark:text-zinc-600 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-[#334155] px-3 py-1.5 rounded-radius-m capitalize">
          {currentDate}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 pl-2 md:pl-4 border-l border-zinc-200 dark:border-[#334155]">
          <button
            type="button"
            onClick={onProfileClick}
            disabled={!onProfileClick}
            className="flex items-center space-x-3 rounded-lg px-1 py-1 -mr-1 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/80 group disabled:cursor-default disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
            aria-label={onProfileClick ? "Abrir perfil e edição rápida" : undefined}
          >
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold leading-none text-zinc-800 dark:text-[#e7e5e4]">{usuario?.nome || 'Usuário'}</span>
              <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 capitalize mt-0.5">{usuario?.tipo || 'Guest'}</span>
            </div>
            <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors">
              <User size={16} />
            </div>
            <ChevronDown size={13} className="text-zinc-400 dark:text-zinc-600 hidden xs:block shrink-0" />
          </button>
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="p-2 text-zinc-400 dark:text-zinc-600 hover:text-rose-500 dark:hover:text-rose-400 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
              title="Sair"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
