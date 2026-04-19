import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Briefcase, Users, CheckCircle, Clock, BarChart3 } from "lucide-react";
import {
  mockRecrutamentoMetrics,
  mockRecrutamentoVagas,
  mockFunnelRecrutamento,
  mockCandidatosPorStatus,
} from "@/infrastructure/mock/mockRecrutamento";
import { chartColorForFunnelStage, getStatusPresentation } from "@/shared/lib/recrutamentoStatusStyles";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { UserPlus, Search as SearchIcon, Users as UsersIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { delay } from "@/shared/lib/delay";
import { cn } from "@/shared/lib/cn";
import { RecrutamentoBarChartSkeleton, RecrutamentoDonutChartSkeleton } from "@/shared/components/skeletons/pageSkeletons";
import { useChartTheme } from "@/shared/components/charts/chartTheme";
import { DonutPieChart } from "@/shared/components/charts/DonutPieChart";

const ORIGEM_BASE = [
  { name: "LinkedIn", value: 45 },
  { name: "Indicação", value: 25 },
  { name: "Vagas.com", value: 15 },
  { name: "Outros", value: 15 },
];

/** Paleta só para origem (não confundir com status semânticos do RH). */
const ORIGEM_CHART_COLORS = ["#6366f1", "#0ea5e9", "#f97316", "#64748b"];

type StatusDistribRow = { name: string; value: number; statusKey: string };

type PeriodoId = "30d" | "90d";

export default function RecrutamentoDashboard() {
  const { isDark, tooltipStyle, gridStroke, axisTickFill, cursorFill } = useChartTheme();
  const [periodo, setPeriodo] = useState<PeriodoId>("30d");
  const [chartPending, setChartPending] = useState(true);
  const [funnelData, setFunnelData] = useState(mockFunnelRecrutamento);
  const [origemData, setOrigemData] = useState(ORIGEM_BASE);
  const [statusDistribData, setStatusDistribData] = useState<StatusDistribRow[]>(() =>
    mockCandidatosPorStatus.map((s) => ({ name: s.name, value: s.value, statusKey: s.statusKey }))
  );
  useEffect(() => {
    let cancelled = false;
    setChartPending(true);
    (async () => {
      try {
        await delay(420);
        if (cancelled) return;
        const mult = periodo === "30d" ? 1 : 1.12;
        setFunnelData(mockFunnelRecrutamento.map((d) => ({ ...d, value: Math.round(d.value * mult) })));
        setOrigemData(
          ORIGEM_BASE.map((d) => ({
            ...d,
            value: Math.max(5, Math.round(d.value * (periodo === "30d" ? 1 : 0.92))),
          }))
        );
        setStatusDistribData(
          mockCandidatosPorStatus.map((s) => ({
            name: s.name,
            statusKey: s.statusKey,
            value: Math.max(1, Math.round(s.value * (periodo === "30d" ? 1 : 1.08))),
          }))
        );
      } finally {
        if (!cancelled) setChartPending(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [periodo]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter text-[#e7e5e4]">Dashboard de Recrutamento</h1>
        <p className="text-zinc-500 dark:text-slate-400 mt-2 leading-relaxed text-sm">Visão estratégica do pipeline de seleção e abertura de vagas.</p>
      </div>

      <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
        <MetricCard title="Vagas Abertas" value={mockRecrutamentoMetrics.vagasAbertas} icon={Briefcase} trend="+2 este mês" />
        <MetricCard title="Em Processo" value={mockRecrutamentoMetrics.vagasEmProcesso} icon={Clock} />
        <MetricCard title="Fechadas (Mês)" value={mockRecrutamentoMetrics.vagasFechadasMes} icon={CheckCircle} accent="emerald" />
        <MetricCard title="Candidatos Triagem" value={mockRecrutamentoMetrics.candidatosTriagem} icon={Users} accent="blue" />
        <MetricCard title="Tempo Médio" value={mockRecrutamentoMetrics.tempoMedioContratacao} icon={BarChart3} accent="amber" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-radius-l border border-[#334155] bg-[#0f172a]/50 px-4 py-3">
        <p className="text-sm font-medium text-zinc-400">Período dos gráficos (simula carregamento ao trocar o filtro)</p>
        <div className="flex gap-2">
          {(
            [
              { id: "30d" as const, label: "Últimos 30 dias" },
              { id: "90d" as const, label: "Últimos 90 dias" },
            ] as const
          ).map((p) => (
            <Button
              key={p.id}
              type="button"
              variant={periodo === p.id ? "primary" : "outline"}
              size="sm"
              disabled={chartPending}
              onClick={() => setPeriodo(p.id)}
            >
              {p.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Funil de Recrutamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-[260px]">
              {chartPending && (
                <div
                  className="absolute inset-0 z-10 rounded-radius-m bg-[#0f172a]/80 backdrop-blur-[1px] px-2"
                  aria-busy
                  aria-label="Carregando gráfico"
                >
                  <RecrutamentoBarChartSkeleton />
                </div>
              )}
              <div className={cn("h-full", chartPending && "opacity-35 pointer-events-none")}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} horizontal={true} vertical={false} />
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: axisTickFill, fontSize: 11 }}
                      width={100}
                    />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: cursorFill }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                      {funnelData.map((entry) => (
                        <Cell key={entry.name} fill={chartColorForFunnelStage(entry.name)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Candidatos por status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-[260px]">
              {chartPending && (
                <div
                  className="absolute inset-0 z-10 rounded-radius-m bg-[#0f172a]/80 backdrop-blur-[1px]"
                  aria-busy
                  aria-label="Carregando gráfico"
                >
                  <RecrutamentoDonutChartSkeleton />
                </div>
              )}
              <div className={cn("h-full", chartPending && "opacity-35 pointer-events-none")}>
                <DonutPieChart
                  data={statusDistribData.map(({ name, value }) => ({ name, value }))}
                  isDark={isDark}
                  paletteMode="custom"
                  colors={statusDistribData.map((s) => getStatusPresentation(s.statusKey).chartColor)}
                  tooltipStyle={tooltipStyle}
                  legendTextColor={axisTickFill}
                  height={260}
                  innerRadius={54}
                  outerRadius={86}
                  paddingAngle={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Candidatos por origem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative max-w-lg mx-auto h-[260px]">
              {chartPending && (
                <div
                  className="absolute inset-0 z-10 rounded-radius-m bg-[#0f172a]/80 backdrop-blur-[1px]"
                  aria-busy
                  aria-label="Carregando gráfico"
                >
                  <RecrutamentoDonutChartSkeleton />
                </div>
              )}
              <div className={cn("h-full", chartPending && "opacity-35 pointer-events-none")}>
                <DonutPieChart
                  data={origemData}
                  isDark={isDark}
                  paletteMode="custom"
                  colors={ORIGEM_CHART_COLORS}
                  tooltipStyle={tooltipStyle}
                  legendTextColor={axisTickFill}
                  height={260}
                  innerRadius={56}
                  outerRadius={84}
                  paddingAngle={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-8 bg-[#1e293b] border border-[#334155] rounded-radius-l">
        <h3 className="text-base font-semibold tracking-tighter text-[#e7e5e4] mb-6 text-center">Jornada de Contratação</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <JourneyStep icon={UserPlus} title="1. Atração" desc="Captação e Banco" />
          <div className="hidden md:block h-px bg-[#334155] flex-1 mx-4" />
          <JourneyStep icon={SearchIcon} title="2. Triagem" desc="Fit Cultural e Técnico" active />
          <div className="hidden md:block h-px bg-[#334155] flex-1 mx-4" />
          <JourneyStep icon={UsersIcon} title="3. Entrevistas" desc="Gestor + RH" />
          <div className="hidden md:block h-px bg-[#334155] flex-1 mx-4" />
          <JourneyStep icon={CheckCircle2} title="4. Contratação" desc="Integração Direta" highlight />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Vagas Abertas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0f172a] text-slate-500 dark:text-slate-300 text-xs font-semibold uppercase tracking-widest">
                <tr>
                  <th className="py-4 px-6 border-b border-[#334155]">Cargo</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Setor</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Gestor</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Abertura</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockRecrutamentoVagas.map((vaga) => (
                  <tr key={vaga.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 border-b border-[#334155] font-semibold text-[#e7e5e4]">{vaga.cargo}</td>
                    <td className="py-4 px-6 border-b border-[#334155] text-zinc-400">{vaga.setor}</td>
                    <td className="py-4 px-6 border-b border-[#334155] text-zinc-400">{vaga.gestor}</td>
                    <td className="py-4 px-6 border-b border-[#334155] text-xs text-zinc-600 font-mono">{vaga.dataAbertura}</td>
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <StatusBadge status={vaga.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const accentMap: Record<string, { icon: string; bg: string }> = {
  emerald: { icon: "text-emerald-400", bg: "bg-emerald-500/10" },
  blue: { icon: "text-blue-400", bg: "bg-blue-500/10" },
  amber: { icon: "text-amber-400", bg: "bg-amber-500/10" },
  slate: { icon: "text-zinc-400", bg: "bg-zinc-800" },
};

function MetricCard({ title, value, icon: Icon, trend, accent }: {
  title: string;
  value: string | number;
  icon: typeof Briefcase;
  trend?: string;
  accent?: string;
}) {
  const style = accent ? (accentMap[accent] ?? accentMap.slate) : accentMap.slate;
  return (
    <div className="bg-[#1e293b] rounded-radius-l border border-[#334155] hover:border-zinc-600 p-6 sm:p-8 flex flex-col gap-4 transition-colors md:flex-row md:items-center md:justify-between md:gap-6">
      <div className="flex min-w-0 flex-1 items-start gap-4 md:items-center">
        <div className={`p-2 rounded-radius-m shrink-0 ${style.bg}`}>
          <Icon className={`w-4 h-4 ${style.icon}`} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">{title}</p>
          <span className="text-3xl font-bold text-[#e7e5e4] leading-none tracking-tighter">{value}</span>
        </div>
      </div>
      {trend && (
        <span className="inline-flex w-fit shrink-0 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-radius-m border border-emerald-500/20 md:self-center">
          {trend}
        </span>
      )}
    </div>
  );
}

function JourneyStep({
  icon: Icon,
  title,
  desc,
  active,
  highlight,
}: {
  icon: typeof UserPlus;
  title: string;
  desc: string;
  active?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center max-w-[140px]">
      <div
        className={`p-4 rounded-full mb-3 ${
          highlight ? "bg-primary text-white" : active ? "bg-zinc-700 text-primary" : "bg-zinc-800 text-zinc-500"
        }`}
      >
        <Icon size={22} />
      </div>
      <h4 className={`font-semibold text-sm tracking-tight ${highlight ? "text-primary" : "text-zinc-300"}`}>{title}</h4>
      <p className="text-[11px] text-zinc-600 mt-1">{desc}</p>
    </div>
  );
}
