import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Settings, 
  LayoutDashboard, 
  PieChart,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Command Center", active: true },
  { icon: Users, label: "Recrutamento" },
  { icon: BookOpen, label: "Treinamentos" },
  { icon: BarChart3, label: "Operações" },
  { icon: PieChart, label: "Analytics" },
  { icon: Settings, label: "Configurações" },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
  className?: string;
}

export function Sidebar({ mobile, onClose, className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const handleItemClick = () => {
    if (mobile && onClose) {
      onClose();
    }
  };

  return (
    <motion.aside
      initial={mobile ? { x: 0 } : { x: -250 }}
      animate={{ x: 0 }}
      className={cn(
        "h-full bg-slate-950 text-white transition-all duration-300 z-50 flex flex-col",
        !mobile && "fixed left-0 top-0",
        collapsed && !mobile ? "w-20" : "w-64",
        className
      )}
    >

      <div className="flex items-center justify-between p-6 h-16 border-b border-slate-800">
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-lg">
              R
            </div>
            <span className="font-bold text-xl tracking-tight">HR Core</span>
          </motion.div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-lg mx-auto">
            R
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={handleItemClick}
            className={cn(
              "flex items-center w-full p-3 rounded-lg transition-all group",
              item.active 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            )}
          >
            <item.icon className={cn("w-5 h-5", (!collapsed || mobile) && "mr-3")} />
            {(!collapsed || mobile) && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="font-medium"
              >
                {item.label}
              </motion.span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleItemClick}
          className="flex items-center w-full p-3 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-all"
        >
          <LogOut className={cn("w-5 h-5", (!collapsed || mobile) && "mr-3")} />
          {(!collapsed || mobile) && <span className="font-medium">Sair</span>}
        </button>
      </div>

      {!mobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 bg-slate-900 border border-slate-700 text-slate-400 rounded-full p-1 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      )}
    </motion.aside>

  );
}
