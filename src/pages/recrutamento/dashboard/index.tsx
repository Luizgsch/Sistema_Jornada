import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Briefcase, Users, CheckCircle, Clock, BarChart3 } from "lucide-react";
import { mockRecrutamentoMetrics, mockRecrutamentoVagas, mockFunnelRecrutamento } from "@/data/mock/mockRecrutamento";
import { StatusBadge } from "@/components/ui/StatusBadge";
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

const COLORS = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"];

export default function RecrutamentoDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Recrutamento</h1>
        <p className="text-muted-foreground mt-2">Visão estratégica do pipeline de seleção e abertura de vagas.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Vagas Abertas" value={mockRecrutamentoMetrics.vagasAbertas} icon={Briefcase} trend="+2 este mês" />
        <MetricCard title="Em Processo" value={mockRecrutamentoMetrics.vagasEmProcesso} icon={Clock} />
        <MetricCard title="Fechadas (Mês)" value={mockRecrutamentoMetrics.vagasFechadasMes} icon={CheckCircle} color="text-emerald-500" />
        <MetricCard title="Candidatos Triagem" value={mockRecrutamentoMetrics.candidatosTriagem} icon={Users} color="text-blue-500" />
        <MetricCard title="Tempo Médio" value={mockRecrutamentoMetrics.tempoMedioContratacao} icon={BarChart3} color="text-amber-500" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Funil de Recrutamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockFunnelRecrutamento} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} className="text-xs" />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={30} />
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
            <div className="h-[300px]">
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
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-8 bg-slate-900 rounded-3xl text-white my-8">
        <h3 className="text-xl font-bold mb-6 text-center">Jornada de Contratação</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <JourneyStep icon={UserPlus} title="1. Atração" desc="Captação e Banco" />
          <div className="hidden md:block h-px bg-slate-700 flex-1 mx-4" />
          <JourneyStep icon={SearchIcon} title="2. Triagem" desc="Fit Cultural e Técnico" active />
          <div className="hidden md:block h-px bg-slate-700 flex-1 mx-4" />
          <JourneyStep icon={UsersIcon} title="3. Entrevistas" desc="Gestor + RH" />
          <div className="hidden md:block h-px bg-slate-700 flex-1 mx-4" />
          <JourneyStep icon={CheckCircle2} title="4. Contratação" desc="Integração Direta" highlight />
        </div>
      </div>


      <Card>
        <CardHeader>
          <CardTitle>Últimas Vagas Abertas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b font-medium text-muted-foreground">
                  <th className="pb-3 px-2">Cargo</th>
                  <th className="pb-3 px-2">Setor</th>
                  <th className="pb-3 px-2">Gestor</th>
                  <th className="pb-3 px-2">Abertura</th>
                  <th className="pb-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockRecrutamentoVagas.map((vaga) => (
                  <tr key={vaga.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-2 font-medium">{vaga.cargo}</td>
                    <td className="py-4 px-2">{vaga.setor}</td>
                    <td className="py-4 px-2">{vaga.gestor}</td>
                    <td className="py-4 px-2">{vaga.dataAbertura}</td>
                    <td className="py-4 px-2">
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

function MetricCard({ title, value, icon: Icon, trend, color }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Icon className={`w-5 h-5 ${color || "text-slate-600"}`} />
          </div>
          {trend && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{trend}</span>}
        </div>
        <div className="mt-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</h3>
          <span className="text-2xl font-bold">{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function JourneyStep({ icon: Icon, title, desc, active, highlight }: any) {
  return (
    <div className="flex flex-col items-center text-center max-w-[140px]">
      <div className={`p-4 rounded-full mb-3 ${highlight ? 'bg-primary text-white shadow-lg shadow-primary/30' : active ? 'bg-slate-800 text-primary' : 'bg-slate-800 text-slate-400'}`}>
        <Icon size={24} />
      </div>
      <h4 className={`font-bold text-sm ${highlight ? 'text-primary' : 'text-slate-200'}`}>{title}</h4>
      <p className="text-[11px] text-slate-500 mt-1">{desc}</p>
    </div>
  );
}
