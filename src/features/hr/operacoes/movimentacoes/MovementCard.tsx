import { useId } from "react";
import type { Movimentacao } from "@/infrastructure/mock/mockOperacoes";
import { cn } from "@/shared/lib/cn";
import { ArrowRight, ChevronDown, FileText } from "lucide-react";

function initialsFromName(nome: string) {
  const parts = nome.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDayBadge(isoDate: string) {
  const d = new Date(`${isoDate}T12:00:00`);
  return d.toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
}

type MovementCardProps = {
  mov: Movimentacao;
};

export function MovementCard({ mov }: MovementCardProps) {
  const detailsId = useId();
  const isPromocao = mov.tipo === "Promoção";

  return (
    <div
      className={cn(
        "group/card relative rounded-radius-l border border-[#334155] bg-[#0f172a] p-7 sm:p-8 transition-colors",
        "hover:border-zinc-600/80"
      )}
    >
      <div className="pointer-events-none absolute right-6 top-6 sm:right-8 sm:top-8">
        <span
          className="pointer-events-auto inline-flex items-center rounded-full border border-zinc-700/80 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-zinc-400"
          title={new Date(`${mov.data}T12:00:00`).toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        >
          {formatDayBadge(mov.data)}
        </span>
      </div>

      <div className="flex gap-4 pr-24">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold tracking-tight",
            "bg-zinc-800 text-zinc-100 ring-1 ring-zinc-700/80"
          )}
          aria-hidden
        >
          {initialsFromName(mov.nome)}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 id={detailsId} className="text-base font-semibold leading-snug text-[#e7e5e4]">
              {mov.nome}
            </h3>
            {isPromocao ? (
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-900/60 bg-emerald-950/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400/95"
                title="Promoção interna"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                Promoção
              </span>
            ) : (
              <span className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">Transferência</span>
            )}
          </div>

          <p className="text-[15px] font-semibold leading-snug text-zinc-100 dark:text-white">{mov.novo}</p>

          <div className="hidden lg:block">
            <SecondaryPanel mov={mov} labelledBy={detailsId} />
          </div>

          <details className="lg:hidden [&[open]_summary_svg]:rotate-180">
            <summary className="cursor-pointer list-none text-xs font-medium text-zinc-500 [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-1.5 rounded-md py-1 text-zinc-400 underline-offset-4 hover:text-zinc-300 hover:underline">
                Ver detalhes
                <ChevronDown size={14} className="shrink-0 transition-transform" aria-hidden />
              </span>
            </summary>
            <div className="mt-4 space-y-4 border-t border-[#334155]/80 pt-4">
              <SecondaryBody mov={mov} />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

function SecondaryPanel({ mov, labelledBy }: { mov: Movimentacao; labelledBy: string }) {
  return (
    <div className="relative" role="region" aria-labelledby={labelledBy}>
      <div className="mt-1 grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover/card:grid-rows-[1fr]">
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-[#334155]/60 pt-4">
            <SecondaryBody mov={mov} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondaryBody({ mov }: { mov: Movimentacao }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="max-w-[42%] truncate font-normal text-zinc-400 line-through decoration-zinc-600/80">
          {mov.anterior}
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 font-normal text-zinc-500" aria-hidden />
        <span className="max-w-[42%] truncate font-semibold text-[#e7e5e4] dark:text-white">{mov.novo}</span>
      </div>

      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs text-zinc-500">Aprovador</dt>
          <dd className="mt-0.5 font-medium text-zinc-200">{mov.responsavel}</dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-500">Matrícula</dt>
          <dd className="mt-0.5 font-mono text-xs text-zinc-400">{mov.matricula}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs text-zinc-500">Motivo</dt>
          <dd className="mt-0.5 leading-relaxed text-zinc-300">{mov.motivo}</dd>
        </div>
      </dl>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-radius-m border border-[#334155] bg-[#1e293b] px-3 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-[#0f172a] hover:text-[#e7e5e4]"
      >
        <FileText size={14} className="text-primary" />
        Acessar aditivo
      </button>
    </div>
  );
}
