/**
 * Paleta semântica única para status de recrutamento / banco de candidatos.
 * Cores alinhadas entre badges, filtros e gráficos (chartColor em hex).
 */

export type StatusSemanticTone = "success" | "warning" | "info" | "danger" | "neutral";

export interface StatusPresentation {
  label: string;
  /** Classes Tailwind: fundo suave + borda + texto (light e dark). */
  badgeClass: string;
  chartColor: string;
  tone: StatusSemanticTone;
}

const TONE_BADGE: Record<StatusSemanticTone, string> = {
  success:
    "bg-emerald-500/15 text-emerald-800 border-emerald-500/35 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/45",
  warning:
    "bg-amber-500/15 text-amber-950 border-amber-500/40 dark:bg-amber-500/20 dark:text-amber-200 dark:border-amber-500/50",
  info: "bg-indigo-500/15 text-indigo-950 border-indigo-400/35 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/45",
  danger:
    "bg-red-500/15 text-red-900 border-red-500/35 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/45",
  neutral:
    "bg-zinc-200/80 text-zinc-800 border-zinc-400/50 dark:bg-slate-600/35 dark:text-slate-100 dark:border-slate-500/65",
};

const TONE_CHART: Record<StatusSemanticTone, string> = {
  success: "#10b981",
  warning: "#f59e0b",
  info: "#6366f1",
  danger: "#ef4444",
  neutral: "#94a3b8",
};

/** Chaves canônicas (já normalizadas) → apresentação */
const CANONICAL: Record<string, Omit<StatusPresentation, "badgeClass"> & { tone: StatusSemanticTone }> = {
  // —— Banco de candidatos / pipeline RH ——
  disponivel: { label: "Disponível", tone: "info", chartColor: TONE_CHART.info },
  novo: { label: "Novo", tone: "info", chartColor: TONE_CHART.info },
  "banco-de-talentos": { label: "Banco de Talentos", tone: "info", chartColor: TONE_CHART.info },
  "em-processo": { label: "Em Processo", tone: "warning", chartColor: TONE_CHART.warning },
  processo: { label: "Em Processo", tone: "warning", chartColor: TONE_CHART.warning },
  triagem: { label: "Triagem", tone: "warning", chartColor: TONE_CHART.warning },
  entrevista: { label: "Entrevista", tone: "warning", chartColor: TONE_CHART.warning },
  "entrevista-agendada": { label: "Entrevista Agendada", tone: "warning", chartColor: TONE_CHART.warning },
  "teste-tecnico": { label: "Teste Técnico", tone: "warning", chartColor: TONE_CHART.warning },
  proposta: { label: "Proposta", tone: "warning", chartColor: TONE_CHART.warning },
  analise: { label: "Em Análise", tone: "warning", chartColor: TONE_CHART.warning },
  pendente: { label: "Pendente", tone: "warning", chartColor: TONE_CHART.warning },
  proximo: { label: "Próximo", tone: "warning", chartColor: TONE_CHART.warning },
  media: { label: "Média", tone: "warning", chartColor: TONE_CHART.warning },
  "em-andamento": { label: "Em andamento", tone: "warning", chartColor: TONE_CHART.warning },
  contratado: { label: "Contratado", tone: "success", chartColor: TONE_CHART.success },
  aprovado: { label: "Aprovado", tone: "success", chartColor: TONE_CHART.success },
  concluido: { label: "Concluído", tone: "success", chartColor: TONE_CHART.success },
  completo: { label: "Completo", tone: "success", chartColor: TONE_CHART.success },
  ativo: { label: "Ativo", tone: "success", chartColor: TONE_CHART.success },
  ok: { label: "No prazo", tone: "success", chartColor: TONE_CHART.success },
  reprovado: { label: "Reprovado", tone: "danger", chartColor: TONE_CHART.danger },
  desistiu: { label: "Desistiu", tone: "danger", chartColor: TONE_CHART.danger },
  "vaga-cancelada": { label: "Vaga Cancelada", tone: "danger", chartColor: TONE_CHART.danger },
  atrasado: { label: "Atrasado", tone: "danger", chartColor: TONE_CHART.danger },
  vencido: { label: "Vencido", tone: "danger", chartColor: TONE_CHART.danger },
  arquivado: { label: "Arquivado", tone: "neutral", chartColor: TONE_CHART.neutral },
  encerrado: { label: "Encerrado", tone: "neutral", chartColor: TONE_CHART.neutral },
  planejado: { label: "Planejado", tone: "neutral", chartColor: TONE_CHART.neutral },
  normal: { label: "Normal", tone: "neutral", chartColor: TONE_CHART.neutral },
  baixa: { label: "Baixa", tone: "neutral", chartColor: TONE_CHART.neutral },
  pausada: { label: "Pausada", tone: "neutral", chartColor: TONE_CHART.neutral },
  aberta: { label: "Aberta", tone: "info", chartColor: TONE_CHART.info },
  inscritos: { label: "Inscritos", tone: "info", chartColor: TONE_CHART.info },
  "alta-prioridade": { label: "Alta prioridade", tone: "warning", chartColor: TONE_CHART.warning },
  alta: { label: "Alta", tone: "warning", chartColor: TONE_CHART.warning },
  /* Operacionais / admissões / treinamentos (legado StatusBadge) */
  entregue: { label: "Entregue", tone: "success", chartColor: TONE_CHART.success },
  vencendo: { label: "Vencendo", tone: "warning", chartColor: TONE_CHART.warning },
  fila: { label: "Fila", tone: "neutral", chartColor: TONE_CHART.neutral },
  "em-analise": { label: "Em análise", tone: "warning", chartColor: TONE_CHART.warning },
  ativa: { label: "Ativa", tone: "success", chartColor: TONE_CHART.success },
  arquivada: { label: "Arquivada", tone: "neutral", chartColor: TONE_CHART.neutral },
  valido: { label: "Válido", tone: "success", chartColor: TONE_CHART.success },
  gerando: { label: "Gerando", tone: "warning", chartColor: TONE_CHART.warning },
  pronto: { label: "Pronto", tone: "success", chartColor: TONE_CHART.success },
};

/** Sinônimos → chave canônica */
const ALIASES: Record<string, string> = {
  emprocesso: "em-processo",
  "banco-de-talento": "banco-de-talentos",
  triage: "triagem",
  interview: "entrevista",
  hired: "contratado",
  rejected: "reprovado",
  available: "disponivel",
  teste: "teste-tecnico",
};

export function normalizeStatusKey(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");
}

function resolveCanonicalKey(raw: string): string | null {
  const n = normalizeStatusKey(raw);
  const key = ALIASES[n] ?? n;
  if (CANONICAL[key]) return key;
  return null;
}

/** Compara status bruto (slug, label ou mistura) pela chave canônica. */
export function areStatusesEquivalent(a: string, b: string): boolean {
  const ka = resolveCanonicalKey(a) ?? normalizeStatusKey(a);
  const kb = resolveCanonicalKey(b) ?? normalizeStatusKey(b);
  return ka === kb;
}

export function getStatusPresentation(raw: string): StatusPresentation {
  const key = resolveCanonicalKey(raw);
  if (key) {
    const row = CANONICAL[key];
    return {
      label: row.label,
      tone: row.tone,
      chartColor: row.chartColor,
      badgeClass: TONE_BADGE[row.tone],
    };
  }

  const pretty =
    raw.trim().length > 0
      ? raw
          .trim()
          .split(/[\s_-]+/)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ")
      : raw;

  return {
    label: pretty,
    tone: "neutral",
    chartColor: TONE_CHART.neutral,
    badgeClass: TONE_BADGE.neutral,
  };
}

/** Filtros do Banco de Candidatos: mesma ordem visual sugerida no produto */
export const BANCO_CANDIDATO_FILTER_KEYS = [
  "disponivel",
  "em-processo",
  "triagem",
  "entrevista-agendada",
  "contratado",
  "reprovado",
  "arquivado",
] as const;

export function getBancoCandidatoFilterPresentation(key: string): StatusPresentation {
  return getStatusPresentation(key);
}

/** Estágios do funil (gráficos): nome exibido → chave para cor */
export const FUNNEL_STAGE_STATUS_KEYS: Record<string, string> = {
  Inscritos: "inscritos",
  Triagem: "triagem",
  Entrevista: "entrevista",
  Entrevistas: "entrevista",
  Teste: "teste-tecnico",
  Proposta: "proposta",
  Aprovados: "aprovado",
};

export function chartColorForFunnelStage(stageName: string): string {
  const key = FUNNEL_STAGE_STATUS_KEYS[stageName] ?? normalizeStatusKey(stageName);
  return getStatusPresentation(key).chartColor;
}
