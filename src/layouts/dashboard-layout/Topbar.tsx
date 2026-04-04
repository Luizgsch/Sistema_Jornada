import { Search, Bell, User, ChevronDown, HelpCircle, Menu, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import type { Usuario } from "@/data/mock/mockLogin";
import type { SistemaAtual } from "@/auth/roles";
import { getAmbienteBadge } from "@/auth/roles";
import { PosigrafLogo } from "@/components/brand/PosigrafLogo";

interface TopbarProps {
  onMenuClick: () => void;
  usuario?: Usuario | null;
  onLogout?: () => void;
  sistemaAtual?: SistemaAtual;
}

export function Topbar({ onMenuClick, usuario, onLogout, sistemaAtual = 'hr-core' }: TopbarProps) {
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
      className="h-16 border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 md:px-8"
    >

      <div className="flex items-center space-x-4 min-w-0">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg lg:hidden text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="hidden lg:flex items-center pr-4 mr-1 border-r border-border shrink-0">
          <PosigrafLogo variant="compact" className="opacity-95" />
        </div>
        
        <div className="flex-1 max-w-xl hidden md:block min-w-0">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 h-10 rounded-full border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary group-hover:bg-white"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-6">
        {ambiente && (
          <span
            className={`hidden md:inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm ${ambiente.className}`}
          >
            {ambiente.label}
          </span>
        )}
        <button className="hidden sm:flex p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors relative">
          <HelpCircle size={20} />
        </button>
        <button className="p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="hidden lg:flex items-center text-[13px] font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full capitalize">
          {currentDate}
        </div>
        
        <div className="flex items-center space-x-3 pl-2 md:pl-4 border-l border-border cursor-pointer group">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold leading-none">{usuario?.nome || 'Usuário'}</span>
            <span className="text-[10px] font-medium text-muted-foreground capitalize">{usuario?.tipo || 'Guest'}</span>
          </div>
          <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <User size={18} />
          </div>
          {onLogout && (
            <button 
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          )}
          <ChevronDown size={14} className="text-muted-foreground hidden xs:block" />
        </div>
      </div>
    </motion.header>
  );
}