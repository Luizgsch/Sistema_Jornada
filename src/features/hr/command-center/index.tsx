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
import { CommandCenterWelcome } from "./CommandCenterWelcome";

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
      <CommandCenterWelcome
        nome={nome}
        title="Início"
        description="Painel operacional. Use o menu lateral para abrir módulos (R&S, admissões, operações, T&D, Analytics)."
        navigateTo={navigateTo}
      />

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
