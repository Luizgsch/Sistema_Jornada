import { Users, ClipboardList } from "lucide-react";
import { StatCard } from "@/shared/components/dashboard/StatCard";
import { MiniListWidget, type MiniListItem } from "@/shared/components/dashboard/MiniListWidget";
import { OperationHealthWidget } from "@/shared/components/dashboard/OperationHealthWidget";
import {
  mockCommandCenterHeadcount,
  mockPendenciasHoje,
  mockSaudeOperacao,
  mockVagasUrgentesCommandCenter,
} from "@/infrastructure/mock/mockCommandCenterOps";

type CommandCenterOpsBentoProps = {
  onOpenVagas?: () => void;
};

export function CommandCenterOpsBento({ onOpenVagas }: CommandCenterOpsBentoProps) {
  const { totalAtivos, variacaoMes } = mockCommandCenterHeadcount;
  const pendenciasTotal =
    mockPendenciasHoje.documentosValidar + mockPendenciasHoje.aniversariantes;

  const urgentItems: MiniListItem[] = mockVagasUrgentesCommandCenter.map((v) => ({
    id: v.id,
    title: v.cargo,
    subtitle: `${v.setor} · ${v.diasAbertos}d · ${v.motivo}`,
    onClick: onOpenVagas,
  }));

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
      <div className="sm:col-span-1 lg:col-span-3">
        <StatCard
          label="Headcount ativo"
          value={totalAtivos}
          delta={{
            text: `+${variacaoMes} no mês`,
            positive: true,
          }}
          hint="Colaboradores com vínculo ativo — consolidado por setor."
          icon={Users}
          delay={0.04}
        />
      </div>
      <div className="sm:col-span-1 lg:col-span-5">
        <MiniListWidget
          label="Vagas urgentes"
          items={urgentItems}
          maxItems={3}
          delay={0.08}
          className="min-h-[200px] lg:min-h-0"
        />
      </div>
      <div className="sm:col-span-2 lg:col-span-2">
        <StatCard
          label="Pendências hoje"
          value={pendenciasTotal}
          hint={`${mockPendenciasHoje.documentosValidar} docs a validar · ${mockPendenciasHoje.aniversariantes} aniversariantes`}
          icon={ClipboardList}
          delay={0.12}
        />
      </div>
      <div className="sm:col-span-2 lg:col-span-2">
        <OperationHealthWidget
          status={mockSaudeOperacao.status}
          titulo={mockSaudeOperacao.titulo}
          detalhe={mockSaudeOperacao.detalhe}
          delay={0.16}
          className="h-full"
        />
      </div>
    </div>
  );
}
