/** Snapshot operacional do Command Center (demo). */

export const mockCommandCenterHeadcount = {
  totalAtivos: 192,
  variacaoMes: 12,
};

export type UrgenciaVaga = {
  id: string;
  cargo: string;
  setor: string;
  diasAbertos: number;
  motivo: string;
};

export const mockVagasUrgentesCommandCenter: UrgenciaVaga[] = [
  {
    id: "VAG-001",
    cargo: "Desenvolvedor Backend Senior",
    setor: "Tecnologia",
    diasAbertos: 24,
    motivo: "SLA · sem finalista",
  },
  {
    id: "VAG-002",
    cargo: "Analista de Dados Pleno",
    setor: "Tecnologia",
    diasAbertos: 21,
    motivo: "Pipeline estagnado",
  },
  {
    id: "VAG-005",
    cargo: "Técnico de Produção II",
    setor: "Produção",
    diasAbertos: 19,
    motivo: "Alta demanda · triagem",
  },
];

export const mockPendenciasHoje = {
  documentosValidar: 5,
  aniversariantes: 3,
};

export const mockSaudeOperacao: {
  status: "ok" | "atencao" | "critico";
  titulo: string;
  detalhe: string;
} = {
  status: "atencao",
  titulo: "Operação em atenção",
  detalhe: "R&S fora da meta de SLA · admissões no prazo",
};
