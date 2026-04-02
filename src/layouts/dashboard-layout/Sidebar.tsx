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
  FileText,
  GitBranch,
  FileSignature,
  CheckSquare,
  ClipboardList,
  Hammer,
  Calendar,
  Package,
  BarChart2
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import type { SistemaAcesso } from "@/data/mock/mockLogin";

interface MenuItem {
  id: string;
  icon: any;
  label: string;
  subItems?: { id: string; label: string }[];
}

const menuItemsHRCore: MenuItem[] = [
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

const menuItemsDHO: MenuItem[] = [
  { id: "dho-dashboard", icon: Building2, label: "Dashboard" },
  { 
    id: "dho-documentos", 
    icon: FileText, 
    label: "Documentos",
    subItems: [
      { id: "todos-documentos", label: "Todos os Documentos" },
      { id: "pendentes", label: "Pendentes" },
      { id: "aprovados", label: "Aprovados" },
    ]
  },
  { 
    id: "dho-workflows", 
    icon: GitBranch, 
    label: "Workflows",
    subItems: [
      { id: "em-andamento", label: "Em Andamento" },
      { id: "concluidos", label: "Concluídos" },
    ]
  },
  { 
    id: "dho-templates", 
    icon: FileSignature, 
    label: "Modelos",
    subItems: [
      { id: "contratos", label: "Contratos" },
      { id: "politicas", label: "Políticas" },
    ]
  },
  { 
    id: "dho-aprovacoes", 
    icon: CheckSquare, 
    label: "Aprovações",
    subItems: [
      { id: "minhas-aprovacoes", label: "Minhas Aprovações" },
      { id: "historico", label: "Histórico" },
    ]
  },
];

const menuItemsServicosGerais: MenuItem[] = [
  { id: "sg-dashboard", icon: Wrench, label: "Dashboard" },
  { 
    id: "sg-solicitacoes", 
    icon: ClipboardList, 
    label: "Solicitações",
    subItems: [
      { id: "nova-solicitacao", label: "Nova Solicitação" },
      { id: "todas-solicitacoes", label: "Todas" },
      { id: "minhas-solicitacoes", label: "Minhas" },
    ]
  },
  { 
    id: "sg-manutencao", 
    icon: Hammer, 
    label: "Manutenção",
    subItems: [
      { id: "predial", label: "Predial" },
      { id: "eletrica", label: "Elétrica" },
      { id: "ar-condicionado", label: "Ar Condicionado" },
    ]
  },
  { 
    id: "sg-agenda", 
    icon: Calendar, 
    label: "Agenda Serviços",
    subItems: [
      { id: "semanal", label: "Semanal" },
      { id: "mensal", label: "Mensal" },
    ]
  },
  { 
    id: "sg-estoque", 
    icon: Package, 
    label: "Estoque",
    subItems: [
      { id: "itens", label: "Itens" },
      { id: "solicitacoes-reposicao", label: "Reposição" },
    ]
  },
  { 
    id: "sg-relatorios", 
    icon: BarChart2, 
    label: "Relatórios",
    subItems: [
      { id: "custos", label: "Custos" },
      { id: "tempo-medio", label: "Tempo Médio" },
    ]
  },
];

type SistemaAtual = 'hr-core' | 'dho' | 'servicos-gerais';

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

  const menuItems = sistemaAtual === 'hr-core' ? menuItemsHRCore : 
                    sistemaAtual === 'dho' ? menuItemsDHO : 
                    menuItemsServicosGerais;

  const sistemaLabel = sistemaAtual === 'hr-core' ? 'HR Core' : 
                       sistemaAtual === 'dho' ? 'DHO' : 
                       'Serviços Gerais';

  const toggleSistema = (novoSistema: SistemaAtual) => {
    if (onSistemaChange) {
      onSistemaChange(novoSistema);
    }
    setMenuSeletorAberto(false);
    if (onPageChange) {
      onPageChange(sistemaAtual === 'hr-core' ? 'command-center' : 
                   sistemaAtual === 'dho' ? 'dho-dashboard' : 'sg-dashboard');
    }
  };

  return (
    <motion.aside
      initial={mobile ? { x: 0 } : { x: -280 }}
      animate={{ x: 0 }}
      className={cn(
        "h-full bg-slate-950 text-white transition-all duration-300 z-50 flex flex-col",
        !mobile && "fixed left-0 top-0",
        collapsed && !mobile ? "w-20" : "w-72",
        className
      )}
    >
      {/* Seletor de Sistema */}
      <div className="p-4 border-b border-slate-800">
        <div className="relative">
          <button 
            onClick={() => setMenuSeletorAberto(!menuSeletorAberto)}
            className="flex items-center justify-between w-full p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700 transition-all"
          >
            <div className="flex items-center gap-3">
              {sistemaAtual === 'hr-core' && <LayoutDashboard className="text-primary" size={20} />}
              {sistemaAtual === 'dho' && <Building2 className="text-blue-400" size={20} />}
              {sistemaAtual === 'servicos-gerais' && <Wrench className="text-amber-400" size={20} />}
              <span className="font-bold text-white">{sistemaLabel}</span>
            </div>
            <ChevronDown className={cn("text-slate-400 transition-transform", menuSeletorAberto && "rotate-180")} size={18} />
          </button>
          
          {menuSeletorAberto && sistemasDisponiveis.length > 1 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="p-3 border-b border-slate-700">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Selecione o Sistema</p>
              </div>
              <div className="p-2">
                {sistemasDisponiveis.map((sistema) => (
                  <button
                    key={sistema.id}
                    onClick={() => toggleSistema(sistema.id as SistemaAtual)}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors",
                      sistemaAtual === sistema.id 
                        ? "bg-primary/20 text-primary" 
                        : "text-slate-300 hover:bg-slate-700"
                    )}
                  >
                    <sistema.icon size={18} />
                    <div>
                      <p className="font-medium">{sistema.label}</p>
                      <p className="text-xs text-slate-500">{sistema.descricao}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logo e título */}
      <div className="flex items-center justify-between px-6 py-4 h-16 border-b border-slate-800">
        {(!collapsed || mobile) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-lg">
              R
            </div>
            <span className="font-bold text-xl tracking-tight text-white">{sistemaLabel}</span>
          </motion.div>
        )}
        {collapsed && !mobile && (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-lg mx-auto">
            R
          </div>
        )}
      </div>

      {/* Menu de navegação */}
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
                  <item.icon size={20} className={isActive ? "text-inherit" : "text-slate-500"} />
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

      {/* Botão recolher */}
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