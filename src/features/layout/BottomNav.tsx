import {
  LayoutDashboard,
  Users,
  FileWarning,
  Wrench,
  Bell,
  Briefcase,
  UserCheck,
  Coffee,
  GraduationCap,
  Inbox,
  Search,
  ClipboardList,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/cn';
import type { SistemaAtual } from '@/domain/auth/roles';
import { useAuth } from '@/features/auth/AuthContext';

interface BottomNavItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

const navItemsHRAll: BottomNavItem[] = [
  { id: 'command-center', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'vagas', icon: Briefcase, label: 'Vagas' },
  { id: 'candidatos', icon: Users, label: 'Candidatos' },
  { id: 'colaboradores', icon: UserCheck, label: 'Equipe' },
];

const navItemsSGLogistica: BottomNavItem[] = [
  { id: 'sg-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'sg-chamados-manusis', icon: ClipboardList, label: 'Chamados' },
  { id: 'sg-cafe-abastecimento', icon: Coffee, label: 'Café' },
  { id: 'sg-armarios', icon: Wrench, label: 'Armários' },
];

const navItemsSGFinanceiro: BottomNavItem[] = [
  { id: 'sg-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'sg-notas-fiscais', icon: FileWarning, label: 'Notas' },
  { id: 'sg-conciliacao-acessos', icon: Wrench, label: 'Conciliação' },
  { id: 'sg-faturamento-attos', icon: Briefcase, label: 'Attos' },
];

const navItemsDHO: BottomNavItem[] = [
  { id: 'dho-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'dho-treinamentos', icon: GraduationCap, label: 'Treins.' },
  { id: 'dho-portal-gestor', icon: Inbox, label: 'Gestor' },
];

interface BottomNavProps {
  activePage?: string;
  onPageChange?: (pageId: string) => void;
  sistemaAtual?: SistemaAtual;
  alertCount?: number;
  onBellClick?: () => void;
  onSearchClick?: () => void;
}

export function BottomNav({
  activePage,
  onPageChange,
  sistemaAtual = 'hr-core',
  alertCount = 0,
  onBellClick,
  onSearchClick,
}: BottomNavProps) {
  const { usuario } = useAuth();

  const items = (() => {
    if (sistemaAtual === 'servicos-gerais') {
      return usuario.tipo === 'logistica' ? navItemsSGLogistica : navItemsSGFinanceiro;
    }
    if (sistemaAtual === 'dho') return navItemsDHO;
    return navItemsHRAll;
  })();

  return (
    <motion.nav
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.1 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300"
    >
      <div className="flex items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange?.(item.id)}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors relative',
                isActive ? 'text-primary' : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-b-full"
                />
              )}
              <Icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Search button */}
        <button
          onClick={onSearchClick}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
        >
          <Search size={20} />
          <span className="text-[10px] font-medium">Buscar</span>
        </button>

        {/* Bell button */}
        <button
          onClick={onBellClick}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors relative"
        >
          <div className="relative">
            <Bell size={20} />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
                {alertCount > 9 ? '9+' : alertCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Alertas</span>
        </button>
      </div>
    </motion.nav>
  );
}
