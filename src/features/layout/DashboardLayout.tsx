import type { ReactNode } from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { BottomNav } from "./BottomNav";
import { NotificationDrawer } from "./NotificationDrawer";
import { CommandPalette } from "@/shared/components/search/CommandPalette";
import { motion, AnimatePresence } from "framer-motion";
import type { Usuario, SistemaAcesso } from "@/infrastructure/mock/mockLogin";
import type { SistemaAtual } from "@/domain/auth/roles";
import { useToast } from "@/shared/ui/Toast";

const ALERT_COUNT = 6;

const DELAYED_NOTIFICATIONS: Record<string, { title: string; description: string }> = {
  rh: {
    title: "🕐 SLA de Vaga Expirando",
    description: "3 vagas RH abertas há +20 dias sem finalista. Revise o pipeline agora.",
  },
  financeiro: {
    title: "⚠️ Nota Fiscal Vencida",
    description: "NF-001 (Fornecedor Alfa) está atrasada há 5 dias. Abra o Centro de Alertas para validar.",
  },
  logistica: {
    title: "🔴 Chamado Manusis Vencido",
    description: "Chamado MAN-4401 (Vazamento bloco C) expirou há 5 dias. Ação imediata necessária.",
  },
  admin: {
    title: "📊 Resumo Executivo",
    description: "2 NFs atrasadas + 3 vagas fora do SLA + 2 chamados vencidos detectados nos sistemas.",
  },
  gestor: {
    title: "📊 Resumo Executivo",
    description: "2 NFs atrasadas + 3 vagas fora do SLA + 2 chamados vencidos detectados nos sistemas.",
  },
};

interface DashboardLayoutProps {
  children: ReactNode;
  activePage?: string;
  onPageChange?: (pageId: string) => void;
  sistemaAtual?: SistemaAtual;
  onSistemaChange?: (sistema: SistemaAtual) => void;
  sistemasDisponiveis?: SistemaAcesso[];
  usuario?: Usuario | null;
  onLogout?: () => void;
}

export function DashboardLayout({ 
  children, 
  activePage, 
  onPageChange, 
  sistemaAtual, 
  onSistemaChange,
  sistemasDisponiveis,
  usuario,
  onLogout
}: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { warning } = useToast();
  const notificationFired = useRef(false);

  const openCommand = useCallback(() => setIsCommandOpen(true), []);
  const closeCommand = useCallback(() => setIsCommandOpen(false), []);

  // Keyboard shortcut for Command Palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Delayed push notification — fires once, role-specific, safe in StrictMode
  useEffect(() => {
    if (notificationFired.current) return;
    const tipo = usuario?.tipo ?? 'admin';
    const notification = DELAYED_NOTIFICATIONS[tipo] ?? DELAYED_NOTIFICATIONS.admin;
    const timer = setTimeout(() => {
      if (notificationFired.current) return;
      notificationFired.current = true;
      warning(notification.title, notification.description);
    }, 5000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] flex overflow-x-hidden transition-colors duration-300">
      {/* Mobile Sidebar / Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-950 z-[70] lg:hidden transition-colors duration-300"
            >
              <Sidebar 
                mobile 
                activePage={activePage} 
                onPageChange={onPageChange} 
                onClose={() => setIsMobileMenuOpen(false)}
                sistemaAtual={sistemaAtual}
                onSistemaChange={onSistemaChange}
                sistemasDisponiveis={sistemasDisponiveis}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Fixed) */}
      <div className="hidden lg:flex fixed left-0 top-0 bottom-0 pointer-events-none">
        <Sidebar 
          className="pointer-events-auto" 
          activePage={activePage} 
          onPageChange={onPageChange}
          sistemaAtual={sistemaAtual}
          onSistemaChange={onSistemaChange}
          sistemasDisponiveis={sistemasDisponiveis}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-72 w-full transition-[margin] duration-300 min-w-0">
        <Topbar 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
          usuario={usuario}
          onLogout={onLogout}
          sistemaAtual={sistemaAtual}
          onSearchOpen={openCommand}
          onNotificationsOpen={() => setIsNotificationsOpen(true)}
          alertCount={ALERT_COUNT}
        />
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activePage={activePage}
        onPageChange={onPageChange}
        sistemaAtual={sistemaAtual}
        alertCount={ALERT_COUNT}
        onBellClick={() => setIsNotificationsOpen(true)}
      />

      {/* Global Command Palette */}
      <CommandPalette open={isCommandOpen} onClose={closeCommand} />

      {/* Notification Drawer */}
      <NotificationDrawer
        open={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

    </div>
  );
}
