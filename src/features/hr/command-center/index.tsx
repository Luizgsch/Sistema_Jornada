import { CandidateMatchTable } from "@/shared/components/tables/CandidateMatchTable";
import { AlertPanel } from "@/shared/components/alerts/AlertPanel";
import { ConflictFinder } from "@/shared/components/automation/ConflictFinder";
import { BentoKpiGrid } from "@/shared/components/dashboard/BentoKpiGrid";
import { CriticalActionsBar } from "@/shared/components/dashboard/CriticalActionsBar";

import { mockCandidates } from "@/infrastructure/mock/mockCandidatos";
import { mockAlerts } from "@/infrastructure/mock/mockAlertas";

import { usePageNav } from "@/features/navigation/PageNavContext";
import { useAuth } from "@/features/auth/AuthContext";
import HRDashboardView from "./HRDashboardView";
import { buildCommandCenterCriticalActions } from "./criticalActions";
import { CommandCenterOpsBento } from "./CommandCenterOpsBento";
import { BarChart3 } from "lucide-react";

function primeiroNome(nome: string) {
  const p = nome.trim().split(/\s+/)[0];
  return p ?? nome;
}

function HRCommandCenterFull() {
  const { navigateTo } = usePageNav();
  const { usuario } = useAuth();
  const nome = primeiroNome(usuario.nome);
  const acoes = buildCommandCenterCriticalActions(navigateTo);

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
        <div className="min-w-0 space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-500/90">
            Posigraf · HR Core
          </p>
          <h1 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4] sm:text-2xl">
            Início
          </h1>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <p className="text-xs text-zinc-500 dark:text-zinc-500 sm:text-right sm:max-w-md">
            <span className="text-zinc-700 dark:text-zinc-300">{nome}</span>
            {" · "}
            Painel operacional. Use o menu lateral para abrir módulos (R&S, admissões, operações, T&D, Analytics).
          </p>
          <button
            type="button"
            onClick={() => navigateTo("indicadores")}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            <BarChart3 size={12} aria-hidden />
            Abrir Analytics (BI)
          </button>
        </div>
      </div>

      <CriticalActionsBar actions={acoes} />

      <CommandCenterOpsBento onOpenVagas={() => navigateTo("vagas")} />

      <section className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Indicadores · período selecionável
        </p>
        <BentoKpiGrid />
      </section>

      <ConflictFinder />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <AlertPanel alerts={mockAlerts} />
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <CandidateMatchTable candidates={mockCandidates} />
      </div>
    </div>
  );
}

export default function HRCommandCenter() {
  const { usuario } = useAuth();

  if (usuario.tipo === "rh") {
    return <HRDashboardView />;
  }

  return <HRCommandCenterFull />;
}
