import { CriticalActionsBar } from "@/shared/components/dashboard/CriticalActionsBar";
import { BentoKpiGrid } from "@/shared/components/dashboard/BentoKpiGrid";
import { usePageNav } from "@/features/navigation/PageNavContext";
import { useAuth } from "@/features/auth/AuthContext";
import { buildCommandCenterCriticalActions } from "./criticalActions";
import { CommandCenterOpsBento } from "./CommandCenterOpsBento";
import { CommandCenterWelcome } from "./CommandCenterWelcome";

function primeiroNome(nome: string) {
  const p = nome.trim().split(/\s+/)[0];
  return p ?? nome;
}

export default function HRDashboardView() {
  const { navigateTo } = usePageNav();
  const { usuario } = useAuth();
  const nome = primeiroNome(usuario.nome);
  const acoes = buildCommandCenterCriticalActions(navigateTo);

  return (
    <div className="space-y-5 sm:space-y-6">
      <CommandCenterWelcome
        nome={nome}
        title="Command Center"
        description="Resumo operacional. Navegação pelos módulos permanece no menu lateral."
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
    </div>
  );
}
