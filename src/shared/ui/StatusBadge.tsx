import { cn } from "@/shared/lib/cn";

interface StatusBadgeProps {
  status: "completo" | "pendente" | "analise" | "aprovado" | "reprovado" | "triagem" | "entrevista";
  className?: string;
}

const statusMap = {
  completo: { label: "Completo", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  pendente: { label: "Pendente", color: "bg-rose-100 text-rose-700 border-rose-200" },
  analise: { label: "Em Análise", color: "bg-amber-100 text-amber-700 border-amber-200" },
  aprovado: { label: "Aprovado", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  reprovado: { label: "Reprovado", color: "bg-slate-100 text-slate-700 border-slate-200" },
  triagem: { label: "Triagem", color: "bg-blue-100 text-blue-700 border-blue-200" },
  entrevista: { label: "Entrevista", color: "bg-purple-100 text-purple-700 border-purple-200" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusMap[status] || { label: status, color: "bg-slate-100 text-slate-700 border-slate-200" };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
      config.color,
      className
    )}>
      {config.label}
    </span>
  );
}
