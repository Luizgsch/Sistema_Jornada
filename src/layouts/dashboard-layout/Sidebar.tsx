import { 
  Users, 
  LayoutDashboard, 
  PieChart,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Briefcase,
  GraduationCap,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  id: string;
  icon: any;
  label: string;
  subItems?: { id: string; label: string }[];
}

const menuItems: MenuItem[] = [
  { id: "command-center", icon: LayoutDashboard, label: "Command Center" },
  { 
    id: "recrutamento", 
    icon: Users, 
    label: "Recrutamento",
    subItems: [
      { id: "recrutamento-dashboard", label: "Dashboard" },
      { id: "vagas", label: "Vagas" },
      { id: "pipeline", label: "Pipeline" },
      { id: "candidatos", label: "Banco de Candidatos" },
      { id: "indicacoes", label: "Indicações" },
    ]

  },
  { 
    id: "admissoes", 
    icon: UserPlus, 
    label: "Admissões",
    subItems: [
      { id: "dashboard-admissoes", label: "Dashboard" },
      { id: "documentos", label: "Documentos" },
      { id: "onboarding", label: "Onboarding" },
      { id: "matriculas", label: "Matrículas" },
    ]
  },
  { 
    id: "operacoes", 
    icon: Briefcase, 
    label: "Operações RH",
    subItems: [
      { id: "colaboradores", label: "Colaboradores" },
      { id: "temporarios", label: "Temporários" },
      { id: "uniformes", label: "Uniformes" },
      { id: "movimentacoes", label: "Movimentações" },
    ]
  },
  { 
    id: "treinamentos", 
    icon: GraduationCap, 
    label: "Treinamentos",
    subItems: [
      { id: "trilhas", label: "Trilhas" },
      { id: "cursos", label: "Cursos" },
      { id: "certificados", label: "Certificados" },
    ]
  },
  { 
    id: "analytics", 
    icon: PieChart, 
    label: "Analytics",
    subItems: [
      { id: "indicadores", label: "Indicadores" },
      { id: "relatorios", label: "Relatórios" },
    ]
  },
];

interface SidebarProps {
  activePage?: string;
  onPageChange?: (pageId: string) => void;
  mobile?: boolean;
  onClose?: () => void;
  className?: string;
}

export function Sidebar({ activePage = "command-center", onPageChange, mobile, onClose, className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleItemClick = (id: string) => {
    if (onPageChange) onPageChange(id);
    if (mobile && onClose) onClose();
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
        {(!collapsed || mobile) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-lg">
              R
            </div>
            <span className="font-bold text-xl tracking-tight text-white">HR Core</span>
          </motion.div>
        )}
        {collapsed && !mobile && (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-lg mx-auto">
            R
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
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
                  "flex items-center justify-between w-full p-3 rounded-lg transition-all group",
                  isActive && !item.subItems
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : item.subItems && isActive
                    ? "text-white bg-slate-900"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                )}
              >
                <div className="flex items-center">
                  <item.icon className={cn("w-5 h-5", (!collapsed || mobile) && "mr-3")} />
                  {(!collapsed || mobile) && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </div>
                {item.subItems && (!collapsed || mobile) && (
                  <ChevronDown 
                    size={14} 
                    className={cn("transition-transform duration-200", isExpanded && "rotate-180")} 
                  />
                )}
              </button>

              <AnimatePresence>
                {item.subItems && isExpanded && (!collapsed || mobile) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-11 space-y-1"
                  >
                    {item.subItems.map(subItem => (
                      <button
                        key={subItem.id}
                        onClick={() => handleItemClick(subItem.id)}
                        className={cn(
                          "flex items-center w-full p-2 text-xs font-medium rounded-md transition-all",
                          activePage === subItem.id
                            ? "text-primary bg-primary/10"
                            : "text-slate-400 hover:text-white hover:bg-slate-900"
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

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center w-full p-3 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-all">
          <LogOut className={cn("w-5 h-5", (!collapsed || mobile) && "mr-3")} />
          {(!collapsed || mobile) && <span className="font-medium text-sm">Sair</span>}
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

