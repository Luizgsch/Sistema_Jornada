import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import {
  Users,
  Briefcase,
  UserPlus,
  TrendingDown,
  GraduationCap,
  Award,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  mockAnalyticsStats,
  mockRecruitmentFunnel,
  mockCandidateSources,
  mockHeadcountHistory,
  mockContractTypes,
  mockTurnoverReasons,
  mockTurnoverHistory,
  mockTrainingVolumeHistory,
  mockTrainingStatusDistribution,
  mockTrainingModalityMix,
} from "../analyticsData";
import { useTheme } from "@/features/theme/ThemeContext";
import { motion } from "framer-motion";
import { FunnelBarChart } from "@/shared/components/charts/FunnelBarChart";
import { DonutPieChart } from "@/shared/components/charts/DonutPieChart";
import {
  chartAxisColor,
  chartCursorFill,
  chartGridColor,
  getChartTooltipStyle,
} from "@/shared/components/charts/chartTheme";
import { chartColorForFunnelStage } from "@/shared/lib/recrutamentoStatusStyles";
import { cn } from "@/shared/lib/cn";

type AnalyticsTab = "rh" | "recrutamento" | "treinamentos";

const TABS: { id: AnalyticsTab; label: string }[] = [
  { id: "rh", label: "RH / DHO" },
  { id: "recrutamento", label: "Recrutamento" },
  { id: "treinamentos", label: "Treinamentos" },
];

export default function IndicadoresPage() {
  const { isDark } = useTheme();
  const [tab, setTab] = useState<AnalyticsTab>("rh");
  const [periodo, setPeriodo] = useState("12m");

  const gridColor = chartGridColor(isDark);
  const axisColor = chartAxisColor(isDark);
  const tooltipStyle = getChartTooltipStyle(isDark);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
            Analytics · Business Intelligence
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4]">
            Hub de indicadores
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            Relatórios comparativos e visão macro por área. Para tarefas do dia a dia, use cada módulo (ex.: Recrutamento → Operação hoje).
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-radius-m border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-[#0f172a]/60 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">Período</span>
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="h-9 min-w-[11rem] rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#1e293b] px-3 text-sm font-medium text-zinc-800 dark:text-[#e7e5e4] focus:outline-none focus:ring-1 focus:ring-primary/30"
            aria-label="Período dos indicadores"
          >
            <option value="30d">Últimos 30 dias</option>
            <option value="6m">Últimos 6 meses</option>
            <option value="12m">Últimos 12 meses</option>
            <option value="24m">Últimos 24 meses</option>
          </select>
          <span className="text-xs text-zinc-500 dark:text-zinc-500 hidden md:inline">
            A exportação considera o período e a aba ativos.
          </span>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-radius-m border border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-700 dark:text-zinc-200 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors shrink-0"
        >
          <Download size={16} />
          Exportar (PDF)
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard
          title="Total Colaboradores"
          value={mockAnalyticsStats.totalColaboradores}
          icon={Users}
          iconClass="text-indigo-500 dark:text-indigo-400"
          iconBg="bg-indigo-50 dark:bg-indigo-500/10"
          colSpan="xl:col-span-2"
          delay={0}
        />
        <MetricCard
          title="Vagas Abertas"
          value={mockAnalyticsStats.vagasAbertas}
          icon={Briefcase}
          iconClass="text-teal-500 dark:text-teal-400"
          iconBg="bg-teal-50 dark:bg-teal-500/10"
          colSpan="xl:col-span-2"
          delay={0.05}
        />
        <MetricCard
          title="Admissões no Mês"
          value={mockAnalyticsStats.admissoesMes}
          icon={UserPlus}
          iconClass="text-emerald-500 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-500/10"
          colSpan="xl:col-span-2"
          delay={0.1}
        />
        <MetricCard
          title="Turnover (Mês)"
          value={mockAnalyticsStats.turnoverMes}
          icon={TrendingDown}
          iconClass="text-rose-500 dark:text-rose-400"
          iconBg="bg-rose-50 dark:bg-rose-500/10"
          colSpan="xl:col-span-2"
          delay={0.15}
        />
        <MetricCard
          title="Treinamentos Realizados"
          value={mockAnalyticsStats.treinamentosRealizados}
          icon={GraduationCap}
          iconClass="text-blue-500 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-500/10"
          colSpan="xl:col-span-2"
          delay={0.2}
        />
        <MetricCard
          title="Certificados Válidos"
          value={mockAnalyticsStats.certificadosValidos}
          icon={Award}
          iconClass="text-amber-500 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-500/10"
          colSpan="xl:col-span-2"
          delay={0.25}
        />
      </div>

      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="flex flex-wrap gap-1 -mb-px" aria-label="Seções de Analytics">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "px-4 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-colors",
                tab === t.id
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      {tab === "rh" && (
        <div className="grid gap-6 md:grid-cols-2">
          <ChartCard title="Evolução de Headcount" subtitle="Crescimento do quadro no ano" delay={0.1}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockHeadcountHistory} margin={{ top: 5, right: 16, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="headcount"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#10b981", strokeWidth: 2, stroke: isDark ? "#1e293b" : "#fff" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Taxa de Turnover (%)" subtitle="Índice de rotatividade mensal" delay={0.15}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockTurnoverHistory} margin={{ top: 5, right: 16, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="taxa"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#ef4444", strokeWidth: 2, stroke: isDark ? "#1e293b" : "#fff" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Tipos de Contrato" subtitle="Distribuição da força de trabalho (%)" delay={0.2}>
            <DonutPieChart
              data={mockContractTypes}
              isDark={isDark}
              paletteMode="sequential-by-value"
              tooltipStyle={tooltipStyle}
              innerRadius={56}
              outerRadius={104}
              paddingAngle={2}
            />
          </ChartCard>

          <ChartCard title="Motivos de Desligamento" subtitle="Offboarding consolidado (%)" delay={0.25}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockTurnoverReasons} margin={{ top: 20, right: 16, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 11 }} />
                <Tooltip cursor={{ fill: chartCursorFill(isDark) }} contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {tab === "recrutamento" && (
        <div className="grid gap-6 md:grid-cols-2">
          <ChartCard title="Funil de Recrutamento" subtitle="Conversão por etapa no último mês" delay={0.1}>
            <FunnelBarChart
              data={mockRecruitmentFunnel}
              height={300}
              tooltipStyle={tooltipStyle}
              gridColor={gridColor}
              axisColor={axisColor}
              gridHorizontal={false}
              gridVertical
              hideXAxis={false}
              margin={{ top: 5, right: 16, left: 20, bottom: 5 }}
              cellColors={mockRecruitmentFunnel.map((row) => chartColorForFunnelStage(row.name))}
            />
          </ChartCard>

          <ChartCard title="Origem de Candidatos" subtitle="Fontes de atração (%)" delay={0.15}>
            <DonutPieChart
              data={mockCandidateSources}
              isDark={isDark}
              paletteMode="sequential-by-value"
              tooltipStyle={tooltipStyle}
              innerRadius={64}
              outerRadius={104}
              paddingAngle={2}
            />
          </ChartCard>
        </div>
      )}

      {tab === "treinamentos" && (
        <div className="grid gap-6 md:grid-cols-2">
          <ChartCard title="Treinamentos realizados" subtitle="Volume mensal consolidado" delay={0.1}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockTrainingVolumeHistory} margin={{ top: 5, right: 16, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="realizados"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#6366f1", strokeWidth: 2, stroke: isDark ? "#1e293b" : "#fff" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Status das matrículas em T&D" subtitle="Distribuição atual (%)" delay={0.15}>
            <DonutPieChart
              data={mockTrainingStatusDistribution}
              isDark={isDark}
              paletteMode="training-status"
              tooltipStyle={tooltipStyle}
              innerRadius={56}
              outerRadius={96}
              paddingAngle={2}
            />
          </ChartCard>

          <ChartCard title="Modalidade de treinamento" subtitle="Carga horária por formato (%)" delay={0.2}>
            <DonutPieChart
              data={mockTrainingModalityMix}
              isDark={isDark}
              paletteMode="sequential-by-value"
              tooltipStyle={tooltipStyle}
              innerRadius={52}
              outerRadius={100}
              paddingAngle={2}
            />
          </ChartCard>
        </div>
      )}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconClass: string;
  iconBg: string;
  colSpan?: string;
  delay?: number;
}

function MetricCard({ title, value, icon: Icon, iconClass, iconBg, colSpan = "", delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={colSpan}
    >
      <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-md dark:hover:border-zinc-700 cursor-pointer">
        <CardContent className="pt-5">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-radius-l shrink-0 ${iconBg}`}>
              <Icon size={22} className={iconClass} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider truncate">
                {title}
              </p>
              <h4 className="text-3xl font-black text-zinc-800 dark:text-[#e7e5e4] mt-0.5 tracking-tight leading-none">
                {value}
              </h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  delay?: number;
}

function ChartCard({ title, subtitle, children, delay = 0 }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{title}</CardTitle>
          {subtitle && <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500">{subtitle}</p>}
        </CardHeader>
        <CardContent className="pt-2">{children}</CardContent>
      </Card>
    </motion.div>
  );
}
