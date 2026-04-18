import { CriticalActionsBar } from "@/shared/components/dashboard/CriticalActionsBar";
import { BentoKpiGrid } from "@/shared/components/dashboard/BentoKpiGrid";
import { usePageNav } from "@/features/navigation/PageNavContext";
import { useAuth } from "@/features/auth/AuthContext";
import { buildCommandCenterCriticalActions } from "./criticalActions";
import { CommandCenterOpsBento } from "./CommandCenterOpsBento";

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
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
        <div className="min-w-0 space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-500/90">
            Posigraf · HR Core
          </p>
          <h1 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4] sm:text-2xl">
            Command Center
          </h1>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 sm:text-right sm:max-w-md">
          <span className="text-zinc-700 dark:text-zinc-300">{nome}</span>
          {" · "}
          Resumo operacional. Navegação pelos módulos permanece no menu lateral.
        </p>
      </div>

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
