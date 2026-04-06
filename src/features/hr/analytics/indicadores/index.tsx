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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  mockAnalyticsStats,
  mockRecruitmentFunnel,
  mockCandidateSources,
  mockHeadcountHistory,
  mockContractTypes,
  mockTurnoverReasons,
  mockTurnoverHistory,
} from "@/infrastructure/mock/mockAnalytics";
import { useTheme } from "@/features/theme/ThemeContext";
import { motion } from "framer-motion";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function IndicadoresPage() {
  const { isDark } = useTheme();

  const gridColor = isDark ? "#27272a" : "#e4e4e7";
  const axisColor = isDark ? "#52525b" : "#a1a1aa";
  const tooltipStyle: React.CSSProperties = isDark
    ? {
        background: "#18181b",
        border: "1px solid #27272a",
        borderRadius: "10px",
        color: "#e7e5e4",
        boxShadow: "0 4px 24px rgb(0 0 0 / 0.4)",
      }
    : {
        background: "#ffffff",
        border: "1px solid #e4e4e7",
        borderRadius: "10px",
        color: "#18181b",
        boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
      };

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
            Analytics · RH
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4]">
            Painel de Indicadores
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            Visão estratégica e métricas em tempo real.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all">
          <Download size={16} />
          Exportar (PDF)
        </button>
      </div>

      {/* ── KPI Metric Cards ─────────────────────────────────── */}
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

      {/* ── Charts ─────────────────────────────────────────────── */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Funil de Recrutamento"
          subtitle="Conversão por etapa no último mês"
          delay={0.1}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mockRecruitmentFunnel}
              layout="vertical"
              margin={{ top: 5, right: 16, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridColor} />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 11 }}
              />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 11 }}
              />
              <Tooltip cursor={{ fill: isDark ? "#27272a60" : "#f4f4f560" }} contentStyle={tooltipStyle} />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Origem de Candidatos"
          subtitle="Fontes de atração de talentos (%)"
          delay={0.15}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockCandidateSources}
                cx="50%"
                cy="50%"
                innerRadius={64}
                outerRadius={104}
                paddingAngle={3}
                dataKey="value"
              >
                {mockCandidateSources.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ color: axisColor, fontSize: 11 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Evolução de Headcount"
          subtitle="Crescimento do quadro no ano"
          delay={0.2}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={mockHeadcountHistory}
              margin={{ top: 5, right: 16, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis
                dataKey="mes"
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 11 }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="headcount"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 5, fill: "#10b981", strokeWidth: 2, stroke: isDark ? "#18181b" : "#fff" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Tipos de Contrato"
          subtitle="Distribuição da força de trabalho (%)"
          delay={0.25}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockContractTypes}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={104}
                dataKey="value"
                paddingAngle={2}
              >
                {mockContractTypes.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ color: axisColor, fontSize: 11 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Taxa de Turnover (%)"
          subtitle="Índice de rotatividade mensal"
          delay={0.3}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={mockTurnoverHistory}
              margin={{ top: 5, right: 16, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis
                dataKey="mes"
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 11 }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="taxa"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ r: 5, fill: "#ef4444", strokeWidth: 2, stroke: isDark ? "#18181b" : "#fff" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Motivos de Desligamento"
          subtitle="Análise das entrevistas de offboarding (%)"
          delay={0.35}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mockTurnoverReasons}
              margin={{ top: 20, right: 16, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 11 }}
              />
              <Tooltip cursor={{ fill: isDark ? "#27272a60" : "#f4f4f560" }} contentStyle={tooltipStyle} />
              <Bar dataKey="value" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

/* ─── Internal sub-components ───────────────────────────────────────── */

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
            <div className={`p-3 rounded-2xl shrink-0 ${iconBg}`}>
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
          {subtitle && (
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500">{subtitle}</p>
          )}
        </CardHeader>
        <CardContent className="pt-2">{children}</CardContent>
      </Card>
    </motion.div>
  );
}
