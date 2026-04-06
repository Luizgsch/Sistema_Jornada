import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Briefcase, Users, CheckCircle, Clock, BarChart3 } from "lucide-react";
import { mockRecrutamentoMetrics, mockRecrutamentoVagas, mockFunnelRecrutamento } from "@/infrastructure/mock/mockRecrutamento";
import { StatusBadge } from "@/shared/ui/StatusBadge";
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
  Cell
} from "recharts";
import { UserPlus, Search as SearchIcon, Users as UsersIcon, CheckCircle2 } from "lucide-react";

const COLORS = ["#0d9488", "#8b5cf6", "#3b82f6", "#f59e0b", "#ec4899"];

export default function RecrutamentoDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter text-[#e7e5e4]">Dashboard de Recrutamento</h1>
        <p className="text-zinc-500 mt-2 leading-relaxed text-sm">Visão estratégica do pipeline de seleção e abertura de vagas.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Vagas Abertas" value={mockRecrutamentoMetrics.vagasAbertas} icon={Briefcase} trend="+2 este mês" />
        <MetricCard title="Em Processo" value={mockRecrutamentoMetrics.vagasEmProcesso} icon={Clock} />
        <MetricCard title="Fechadas (Mês)" value={mockRecrutamentoMetrics.vagasFechadasMes} icon={CheckCircle} accent="emerald" />
        <MetricCard title="Candidatos Triagem" value={mockRecrutamentoMetrics.candidatosTriagem} icon={Users} accent="blue" />
        <MetricCard title="Tempo Médio" value={mockRecrutamentoMetrics.tempoMedioContratacao} icon={BarChart3} accent="amber" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Funil de Recrutamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockFunnelRecrutamento} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#71717a', fontSize: 11 }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#e7e5e4' }}
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Candidatos por Origem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "LinkedIn", value: 45 },
                      { name: "Indicação", value: 25 },
                      { name: "Vagas.com", value: 15 },
                      { name: "Outros", value: 15 },
                    ]}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#e7e5e4' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journey of Hiring */}
      <div className="p-8 bg-[#18181b] border border-[#27272a] rounded-2xl">
        <h3 className="text-base font-semibold tracking-tighter text-[#e7e5e4] mb-6 text-center">Jornada de Contratação</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <JourneyStep icon={UserPlus} title="1. Atração" desc="Captação e Banco" />
          <div className="hidden md:block h-px bg-[#27272a] flex-1 mx-4" />
          <JourneyStep icon={SearchIcon} title="2. Triagem" desc="Fit Cultural e Técnico" active />
          <div className="hidden md:block h-px bg-[#27272a] flex-1 mx-4" />
          <JourneyStep icon={UsersIcon} title="3. Entrevistas" desc="Gestor + RH" />
          <div className="hidden md:block h-px bg-[#27272a] flex-1 mx-4" />
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
              <thead className="bg-[#09090b] text-zinc-500 text-xs uppercase tracking-widest">
                <tr>
                  <th className="py-4 px-6 border-b border-[#27272a]">Cargo</th>
                  <th className="py-4 px-6 border-b border-[#27272a]">Setor</th>
                  <th className="py-4 px-6 border-b border-[#27272a]">Gestor</th>
                  <th className="py-4 px-6 border-b border-[#27272a]">Abertura</th>
                  <th className="py-4 px-6 border-b border-[#27272a]">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockRecrutamentoVagas.map((vaga) => (
                  <tr key={vaga.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 border-b border-[#27272a] font-semibold text-[#e7e5e4]">{vaga.cargo}</td>
                    <td className="py-4 px-6 border-b border-[#27272a] text-zinc-400">{vaga.setor}</td>
                    <td className="py-4 px-6 border-b border-[#27272a] text-zinc-400">{vaga.gestor}</td>
                    <td className="py-4 px-6 border-b border-[#27272a] text-xs text-zinc-600 font-mono">{vaga.dataAbertura}</td>
                    <td className="py-4 px-6 border-b border-[#27272a]">
                      <StatusBadge status={vaga.status as any} />
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
  blue:    { icon: "text-blue-400",    bg: "bg-blue-500/10" },
  amber:   { icon: "text-amber-400",   bg: "bg-amber-500/10" },
  slate:   { icon: "text-zinc-400",    bg: "bg-zinc-800" },
};

function MetricCard({ title, value, icon: Icon, trend, accent }: any) {
  const style = accent ? (accentMap[accent] ?? accentMap.slate) : accentMap.slate;
  return (
    <div className="bg-[#18181b] rounded-xl border border-[#27272a] hover:border-zinc-600 p-8 flex flex-col gap-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${style.bg}`}>
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
        <span className="text-3xl font-bold text-[#e7e5e4] leading-none tracking-tighter">{value}</span>
      </div>
    </div>
  );
}

function JourneyStep({ icon: Icon, title, desc, active, highlight }: any) {
  return (
    <div className="flex flex-col items-center text-center max-w-[140px]">
      <div
        className={`p-4 rounded-full mb-3 ${
          highlight
            ? 'bg-primary text-white'
            : active
              ? 'bg-zinc-700 text-primary'
              : 'bg-zinc-800 text-zinc-500'
        }`}
      >
        <Icon size={22} />
      </div>
      <h4 className={`font-semibold text-sm tracking-tight ${highlight ? 'text-primary' : 'text-zinc-300'}`}>{title}</h4>
      <p className="text-[11px] text-zinc-600 mt-1">{desc}</p>
    </div>
  );
}
