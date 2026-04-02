import type { ReactNode } from "react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { motion, AnimatePresence } from "framer-motion";
import type { Usuario, SistemaAcesso } from "@/data/mock/mockLogin";

type SistemaAtual = 'hr-core' | 'dho' | 'servicos-gerais';

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex overflow-x-hidden">
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
              className="fixed left-0 top-0 bottom-0 w-72 bg-slate-950 z-[70] lg:hidden"
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
      <div className="flex-1 flex flex-col lg:ml-72 w-full transition-all duration-300 min-w-0">
        <Topbar 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
          usuario={usuario}
          onLogout={onLogout}
        />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}