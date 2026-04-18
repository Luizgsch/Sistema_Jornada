import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { UserPlus, FileWarning, Clock, Rocket, Zap } from "lucide-react";
import { mockAdmissoesMetrics, mockRecentAdmissoes } from "@/infrastructure/mock/mockAdmissoes";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { PulseBadge } from "@/shared/ui/PulseBadge";
import { cn } from "@/shared/lib/cn";
import { motion } from "framer-motion";

const activityFeed = [
  { icon: "✅", text: "Contrato de Alice Ferreira gerado automaticamente.", time: "há 2min", color: "text-emerald-400" },
  { icon: "📎", text: "Documento recebido via WhatsApp — vinculado a Bruno Santos.", time: "há 8min", color: "text-primary" },
  { icon: "⚠️", text: "8 docs pendentes sem envio há mais de 24h.", time: "há 15min", color: "text-amber-400" },
  { icon: "🤖", text: "Triagem IA priorizou 3 candidatos para Carla Oliveira.", time: "há 31min", color: "text-blue-400" },
];
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DonutPieChart } from "@/shared/components/charts/DonutPieChart";
import { useChartTheme } from "@/shared/components/charts/chartTheme";

const sectorData = [
  { name: "Tecnologia", value: 8 },
  { name: "Marketing", value: 5 },
  { name: "Operações", value: 7 },
  { name: "Vendas", value: 4 },
];

const tipoContratoPie = [
  { name: "CLT", value: 15 },
  { name: "PJ", value: 5 },
  { name: "Estágio", value: 4 },
];

export default function AdmissoesDashboard() {
  const { isDark, tooltipStyle, gridStroke, axisTickFill, cursorFill } = useChartTheme();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter text-[#e7e5e4]">Dashboard de Admissões</h1>
        <p className="text-zinc-500 dark:text-slate-400 mt-2 leading-relaxed text-sm">Visão geral do fluxo de entrada de novos colaboradores.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Admissões no Mês"
          value={mockAdmissoesMetrics.totalMes}
          icon={UserPlus}
          trend="+12%"
          accent="teal"
        />
        <MetricCard
          title="Pendentes"
          value={mockAdmissoesMetrics.pendentes}
          icon={Clock}
          subtitle="Aguardando início"
          accent="amber"
        />
        <MetricCard
          title="Docs Pendentes"
          value={mockAdmissoesMetrics.documentosFaltantes}
          icon={FileWarning}
          accent="red"
          urgency={mockAdmissoesMetrics.documentosFaltantes > 0}
        />
        <MetricCard
          title="Onboarding"
          value={mockAdmissoesMetrics.onboardingAtivo}
          icon={Rocket}
          accent="emerald"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Admissões por Setor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: axisTickFill, fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: axisTickFill, fontSize: 11 }}
                  />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: cursorFill }} />
                  <Bar dataKey="value" fill="#0d9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tipo de Contrato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <DonutPieChart
                data={tipoContratoPie}
                isDark={isDark}
                paletteMode="sequential-by-value"
                tooltipStyle={tooltipStyle}
                height={260}
                innerRadius={58}
                outerRadius={82}
                paddingAngle={2}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Novas Admissões</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0f172a] text-slate-500 dark:text-slate-300 text-xs font-semibold uppercase tracking-widest">
                <tr>
                  <th className="py-4 px-6 border-b border-[#334155]">Nome</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Cargo</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Setor</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Início</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Documentação</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentAdmissoes.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 border-b border-[#334155] font-semibold text-[#e7e5e4]">{item.nome}</td>
                    <td className="py-4 px-6 border-b border-[#334155] text-zinc-400">{item.cargo}</td>
                    <td className="py-4 px-6 border-b border-[#334155] text-zinc-400">{item.setor}</td>
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <PulseBadge dueDate={item.dataInicio} label={item.dataInicio.split('-').reverse().join('/')} />
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <StatusBadge status={item.statusDoc} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      {/* Automation Activity Feed */}
      <div className="rounded-radius-l border border-[#334155] bg-[#1e293b] overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-[#334155]">
          <div className="p-2 bg-primary/10 rounded-radius-m">
            <Zap size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-[#e7e5e4] text-sm">Feed de Automações Recentes</h3>
            <p className="text-[11px] text-zinc-500">Ações executadas pelo sistema sem intervenção manual</p>
          </div>
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-[#334155]">
          {activityFeed.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-4 p-4 hover:bg-zinc-800/20 transition-colors"
            >
              <span className="text-lg leading-none mt-0.5">{item.icon}</span>
              <div className="flex-1">
                <p className={`text-sm font-medium ${item.color}`}>{item.text}</p>
              </div>
              <span className="text-[11px] text-zinc-600 whitespace-nowrap flex-shrink-0">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const accentStyleMap: Record<string, { icon: string; bg: string }> = {
  emerald: { icon: "text-emerald-400", bg: "bg-emerald-500/10" },
  teal:    { icon: "text-teal-400",    bg: "bg-teal-500/10" },
  blue:    { icon: "text-blue-400",    bg: "bg-blue-500/10" },
  amber:   { icon: "text-amber-400",   bg: "bg-amber-500/10" },
  red:     { icon: "text-red-400",     bg: "bg-red-500/10" },
  slate:   { icon: "text-zinc-400",    bg: "bg-zinc-800" },
};

function MetricCard({ title, value, icon: Icon, trend, subtitle, accent, urgency }: any) {
  const style = accent ? (accentStyleMap[accent] ?? accentStyleMap.slate) : accentStyleMap.slate;
  return (
    <div
      className={cn(
        "bg-[#1e293b] rounded-radius-m border p-8 flex flex-col gap-4",
        urgency
          ? "border-[#334155] border-l-4 border-l-red-600/70"
          : "border-[#334155] hover:border-zinc-600 transition-colors"
      )}
    >
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-radius-m ${style.bg}`}>
          <Icon className={`w-4 h-4 ${style.icon}`} />
        </div>
        {trend && (
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">{title}</p>
        <div className="flex items-baseline gap-2">
          <span className={cn("text-3xl font-bold leading-none tracking-tighter", urgency ? "neon-error" : "text-[#e7e5e4]")}>
            {value}
          </span>
          {subtitle && <span className="text-xs text-zinc-600">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}
