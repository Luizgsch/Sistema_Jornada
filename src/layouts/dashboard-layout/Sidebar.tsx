import { 
  Users, 
  LayoutDashboard, 
  PieChart,
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
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={isActive ? "text-primary-foreground" : "text-slate-500"} />
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
                          "flex items-center gap-3 w-full p-2.5 pl-11 rounded-lg text-sm transition-all",
                          activePage === subItem.id
                            ? "bg-primary/10 text-primary font-medium"
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

      {!mobile && (
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-between w-full p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
          >
            <span className="text-sm font-medium">{collapsed ? "Expandir" : "Recolher"}</span>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      )}
    </motion.aside>
  );
}