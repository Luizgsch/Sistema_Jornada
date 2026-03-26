import { Search, Bell, User, ChevronDown, HelpCircle, Menu } from "lucide-react";
import { motion } from "framer-motion";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 md:px-8"
    >
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg lg:hidden text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="flex-1 max-w-xl hidden md:block">
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
        <button className="hidden sm:flex p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors relative">
          <HelpCircle size={20} />
        </button>
        <button className="p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center space-x-3 pl-2 md:pl-4 border-l border-border cursor-pointer group">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold leading-none">Luiz Silva</span>
            <span className="text-[10px] font-medium text-muted-foreground">Diretor de RH</span>
          </div>
          <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <User size={18} />
          </div>
          <ChevronDown size={14} className="text-muted-foreground hidden xs:block" />
        </div>
      </div>
    </motion.header>
  );
}

