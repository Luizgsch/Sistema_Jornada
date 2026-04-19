import { Skeleton } from "@/shared/ui/Skeleton";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";

export function HeadcountMetricCardsSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="border-l-4 border-l-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1 min-w-0">
                <Skeleton className="h-3.5 w-40" />
                <Skeleton className="h-9 w-20" />
              </div>
              <Skeleton className="h-12 w-12 rounded-full shrink-0" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function HeadcountDonutCardSkeleton({ tall }: { tall?: boolean }) {
  const h = tall ? "h-[350px]" : "h-[300px]";
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-radius-s" />
          <Skeleton className="h-5 w-48" />
        </div>
      </CardHeader>
      <CardContent className={`${h} flex flex-col items-center justify-center gap-4`}>
        <Skeleton className="rounded-full w-[200px] h-[200px]" />
        <div className="flex flex-wrap justify-center gap-3 px-4 w-full max-w-md">
          {Array.from({ length: 4 }).map((_, j) => (
            <Skeleton key={j} className="h-3 w-16 rounded-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function HeadcountOrgChartCardSkeleton() {
  return (
    <Card className="flex flex-col h-full overflow-hidden bg-zinc-800/20">
      <CardHeader className="bg-[#1e293b] border-b border-[#334155] pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-radius-s" />
          <Skeleton className="h-5 w-44" />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col items-center justify-center gap-6 min-h-[320px]">
        <Skeleton className="h-16 w-64 rounded-radius-l" />
        <Skeleton className="h-0.5 w-[80%] max-w-[800px]" />
        <div className="flex w-full justify-between max-w-[900px] gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-[22%] sm:w-[23%] rounded-radius-l" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function HeadcountVagasTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      <Skeleton className="h-7 w-72 max-w-full" />
      <div className="bg-[#1e293b] rounded-radius-l border border-[#334155] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 bg-[#0f172a] uppercase border-b border-[#334155]">
              <tr>
                {["Setor", "Ativos", "Aprovadas", "Ocupadas", "Disponíveis", "Status"].map((label) => (
                  <th key={label} className="px-6 py-4 font-semibold">
                    <Skeleton className="h-3 w-16" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, idx) => (
                <tr key={idx} className="border-b border-[#334155]">
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-36" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton className="h-4 w-8 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton className="h-4 w-8 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton className="h-4 w-8 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton className="h-4 w-8 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton className="h-6 w-24 mx-auto rounded-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function HeadcountPageSkeleton() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="space-y-2 w-full max-w-xl">
          <Skeleton className="h-9 w-72 max-w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <HeadcountMetricCardsSkeleton />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <HeadcountDonutCardSkeleton />
        <HeadcountDonutCardSkeleton />
      </div>
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <HeadcountDonutCardSkeleton tall />
        <HeadcountOrgChartCardSkeleton />
      </div>
      <HeadcountVagasTableSkeleton />
    </div>
  );
}

export function BancoCandidatosTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <table className="w-full text-left text-sm whitespace-nowrap">
      <thead className="bg-[#0f172a] text-slate-500 dark:text-slate-300 text-xs font-semibold uppercase tracking-widest">
        <tr>
          {["Nome", "Cargo", "Exp.", "Cidade", "Origem", "Status", "Ações"].map((h) => (
            <th key={h} className="py-4 px-6 border-b border-[#334155]">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i} className="border-b border-[#334155]">
            <td className="py-4 px-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-28" />
              </div>
            </td>
            <td className="py-4 px-6">
              <Skeleton className="h-6 w-32 rounded-full" />
            </td>
            <td className="py-4 px-6">
              <Skeleton className="h-4 w-24" />
            </td>
            <td className="py-4 px-6">
              <Skeleton className="h-3 w-20" />
            </td>
            <td className="py-4 px-6">
              <Skeleton className="h-3 w-16" />
            </td>
            <td className="py-4 px-6">
              <Skeleton className="h-6 w-20 rounded-full" />
            </td>
            <td className="py-4 px-6 text-center">
              <div className="flex justify-center gap-2">
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Catálogo DHO: grid de cards com “capa”, título e barra de progresso (percebido). */
export function CursosCatalogCardGridSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: cards }).map((_, i) => (
        <div
          key={i}
          className="rounded-radius-l border border-[#334155] bg-[#0f172a]/40 overflow-hidden flex flex-col"
        >
          <Skeleton className="h-32 w-full rounded-none rounded-t-radius-l" />
          <div className="p-4 space-y-3 flex-1 flex flex-col">
            <Skeleton className="h-4 w-3/4 max-w-[90%]" />
            <Skeleton className="h-3 w-1/2 max-w-[60%]" />
            <div className="pt-2 space-y-2 mt-auto">
              <div className="flex justify-between">
                <Skeleton className="h-2.5 w-16" />
                <Skeleton className="h-2.5 w-10" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CursosTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <table className="w-full text-left text-sm whitespace-nowrap">
      <thead className="bg-[#0f172a] border-b">
        <tr className="text-muted-foreground font-medium text-[11px] uppercase tracking-wider">
          {["Curso", "Categoria", "Duração", "Formato", "Obrig.", "Status", "Ações"].map((h) => (
            <th key={h} className="py-4 px-6">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i} className="border-b border-[#334155]">
            <td className="py-4 px-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-2.5 w-36" />
              </div>
            </td>
            <td className="py-4 px-6">
              <Skeleton className="h-6 w-28 rounded-radius-s" />
            </td>
            <td className="py-4 px-6 text-center">
              <Skeleton className="h-4 w-12 mx-auto" />
            </td>
            <td className="py-4 px-6 text-center">
              <Skeleton className="h-4 w-16 mx-auto" />
            </td>
            <td className="py-4 px-6 text-center">
              <Skeleton className="h-6 w-10 mx-auto rounded-radius-s" />
            </td>
            <td className="py-4 px-6 text-center">
              <Skeleton className="h-6 w-20 mx-auto rounded-full" />
            </td>
            <td className="py-4 px-6 text-right">
              <div className="flex justify-end gap-1">
                <Skeleton className="h-9 w-9 rounded-radius-m" />
                <Skeleton className="h-9 w-9 rounded-radius-m" />
                <Skeleton className="h-9 w-9 rounded-radius-m" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ColaboradorDrawerHeaderSkeleton() {
  return (
    <div className="flex items-center gap-5 w-full">
      <Skeleton className="w-20 h-20 rounded-radius-m shrink-0" />
      <div className="space-y-2 flex-1 min-w-0">
        <Skeleton className="h-6 w-48 max-w-full" />
        <Skeleton className="h-4 w-36 max-w-full" />
        <div className="flex gap-2 mt-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-radius-m" />
        </div>
      </div>
    </div>
  );
}

export function ColaboradorDrawerBodySkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 4 }).map((_, s) => (
        <div key={s} className="space-y-4">
          <Skeleton className="h-3 w-40" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-14 rounded-radius-m" />
            <Skeleton className="h-14 rounded-radius-m" />
            <Skeleton className="h-14 rounded-radius-m col-span-2" />
          </div>
        </div>
      ))}
      <Skeleton className="h-32 w-full rounded-radius-m" />
    </div>
  );
}

export function BancoCandidatoDrawerBodySkeleton() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-md" />
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="h-4 w-full max-w-sm" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-2.5 w-20" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[80%]" />
      </div>
    </div>
  );
}

export function CursoDetailDrawerSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-3 w-36" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-full max-w-md" />
        ))}
      </div>
    </div>
  );
}

export function PipelineCandidateDrawerHeaderSkeleton() {
  return (
    <div className="flex items-center gap-5 w-full">
      <Skeleton className="w-20 h-20 rounded-radius-l shrink-0" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-7 w-56 max-w-full" />
        <Skeleton className="h-4 w-40" />
        <div className="flex gap-3 mt-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-36" />
        </div>
      </div>
    </div>
  );
}

export function PipelineCandidateDrawerBodySkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-20 rounded-radius-m" />
        <Skeleton className="h-20 rounded-radius-m" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-16 w-full rounded-radius-m" />
        <Skeleton className="h-16 w-full rounded-radius-m" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-3 w-44" />
        <Skeleton className="h-20 w-full rounded-radius-m" />
      </div>
      <Skeleton className="h-36 w-full rounded-radius-l" />
    </div>
  );
}

/** Área de gráfico de barras horizontais (funil). */
export function RecrutamentoBarChartSkeleton() {
  return (
    <div className="h-full flex flex-col justify-center gap-3 px-2 py-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-4 w-24 shrink-0" />
          <Skeleton className={`h-6 rounded-radius-s flex-1`} style={{ maxWidth: `${40 + i * 10}%` }} />
        </div>
      ))}
    </div>
  );
}

export function RecrutamentoDonutChartSkeleton() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <Skeleton className="w-[172px] h-[172px] rounded-full" />
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-sm">
        {Array.from({ length: 5 }).map((_, j) => (
          <Skeleton key={j} className="h-3 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}
