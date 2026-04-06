import { cn } from "@/shared/lib/cn";

type StatusKey =
  | "completo"
  | "pendente"
  | "analise"
  | "aprovado"
  | "reprovado"
  | "triagem"
  | "entrevista"
  | "atrasado"
  | "vencido"
  | "concluido"
  | "em-andamento"
  | "planejado"
  | "ativo"
  | "encerrado"
  | "novo"
  | "ok"
  | "proximo"
  | "normal"
  | "alta"
  | "media"
  | "baixa";

interface StatusBadgeProps {
  status: StatusKey | string;
  className?: string;
}

const statusMap: Record<string, { label: string; color: string }> = {
  completo:       { label: "Completo",      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  concluido:      { label: "Concluído",     color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  aprovado:       { label: "Aprovado",      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  ativo:          { label: "Ativo",         color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  ok:             { label: "No prazo",      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  normal:         { label: "Normal",        color: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700" },
  analise:        { label: "Em Análise",    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  "em-andamento": { label: "Em andamento",  color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  proximo:        { label: "Próximo",       color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  media:          { label: "Média",         color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  planejado:      { label: "Planejado",     color: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700" },
  encerrado:      { label: "Encerrado",     color: "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500 border-zinc-300 dark:border-zinc-700" },
  triagem:        { label: "Triagem",       color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  entrevista:     { label: "Entrevista",    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  novo:           { label: "Novo",          color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  baixa:          { label: "Baixa",         color: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700" },
  pendente:       { label: "Pendente",      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  atrasado:       { label: "Atrasado",      color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  vencido:        { label: "Vencido",       color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  reprovado:      { label: "Reprovado",     color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  alta:           { label: "Alta",          color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusMap[status] ?? { label: status, color: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700" };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors duration-300",
        config.color,
        className
      )}
    >
      {config.label}
    </span>
  );
}
