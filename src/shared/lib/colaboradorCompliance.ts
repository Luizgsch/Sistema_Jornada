/** Campos de conformidade cadastral — preenchimento pode ser feito após o registro inicial. */

export type ColaboradorComplianceInput = {
  nome?: string;
  cargo?: string;
  admissao?: string;
  cpf?: string;
  telefone?: string;
  endereco?: string;
  pisPasep?: string;
  tituloEleitor?: string;
};

export type ComplianceGap = { key: string; label: string };

const ESSENTIAL: { key: keyof ColaboradorComplianceInput; label: string }[] = [
  { key: "nome", label: "Nome completo" },
  { key: "cargo", label: "Cargo" },
  { key: "admissao", label: "Data de admissão" },
];

const COMPLIANCE_EXTRA: { key: keyof ColaboradorComplianceInput; label: string }[] = [
  { key: "cpf", label: "CPF" },
  { key: "telefone", label: "Telefone" },
  { key: "endereco", label: "Endereço completo" },
  { key: "pisPasep", label: "PIS/PASEP" },
  { key: "tituloEleitor", label: "Título de eleitor" },
];

function isEmpty(v: unknown): boolean {
  if (v == null) return true;
  return String(v).trim() === "";
}

export function getColaboradorComplianceGaps(colab: ColaboradorComplianceInput): ComplianceGap[] {
  const out: ComplianceGap[] = [];
  for (const { key, label } of [...ESSENTIAL, ...COMPLIANCE_EXTRA]) {
    if (isEmpty(colab[key])) out.push({ key, label });
  }
  return out;
}

/** Percentual 0–100 com base em todos os campos rastreados (essenciais + conformidade). */
export function getColaboradorProfileCompletenessPercent(colab: ColaboradorComplianceInput): number {
  const keys = [...ESSENTIAL, ...COMPLIANCE_EXTRA];
  const filled = keys.filter(({ key }) => !isEmpty(colab[key])).length;
  return Math.round((filled / keys.length) * 100);
}
