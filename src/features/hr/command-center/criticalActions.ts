import type { CriticalAction } from "@/shared/components/dashboard/CriticalActionsBar";

const acoesDefs = [
  {
    id: "admissoes-pendentes",
    severity: "critical" as const,
    title: "Admissões pendentes",
    count: 5,
    description: "Documentos aguardando validação — prazo esgota em 48h.",
    label: "Ver admissões",
    page: "dashboard-admissoes",
  },
  {
    id: "sla-vencendo",
    severity: "critical" as const,
    title: "SLA de contratação em risco",
    count: 3,
    description: "Vagas com mais de 20 dias abertas sem candidato finalista.",
    label: "Ver pipeline",
    page: "pipeline",
  },
  {
    id: "onboarding-atrasado",
    severity: "warning" as const,
    title: "Onboarding atrasado",
    count: 2,
    description: "Novos colaboradores sem acesso ao sistema registrado.",
    label: "Ver onboarding",
    page: "onboarding",
  },
  {
    id: "trilha-vencendo",
    severity: "warning" as const,
    title: "Treinamentos com prazo próximo",
    count: 8,
    description: "Colaboradores com trilha obrigatória vencendo esta semana.",
    label: "Ver trilhas",
    page: "trilhas",
  },
  {
    id: "desligamentos-pendentes",
    severity: "info" as const,
    title: "Desligamentos a formalizar",
    count: 1,
    description: "Processo de rescisão iniciado, aguardando documentação.",
    label: "Ver desligamentos",
    page: "desligamentos",
  },
];

export function buildCommandCenterCriticalActions(navigateTo: (page: string) => void): CriticalAction[] {
  return acoesDefs.map((def) => ({
    id: def.id,
    severity: def.severity,
    title: def.title,
    count: def.count,
    description: def.description,
    action: { label: def.label, onClick: () => navigateTo(def.page) },
  }));
}
