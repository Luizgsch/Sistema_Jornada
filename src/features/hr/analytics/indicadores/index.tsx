import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { 
  Users, 
  Briefcase, 
  UserPlus, 
  TrendingDown, 
  GraduationCap, 
  Award,
  Download
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
  Legend
} from 'recharts';
import { 
  mockAnalyticsStats, 
  mockRecruitmentFunnel, 
  mockCandidateSources, 
  mockHeadcountHistory,
  mockContractTypes,
  mockTurnoverReasons,
  mockTurnoverHistory
} from "@/infrastructure/mock/mockAnalytics";

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function IndicadoresPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel de Indicadores</h1>
          <p className="text-muted-foreground mt-1">Visão estratégica e métricas em tempo real.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm">
          <Download size={18} />
          Exportar Dashboard (PDF)
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <MetricCard title="Total Colaboradores" value={mockAnalyticsStats.totalColaboradores} icon={Users} color="text-slate-900" colSpan="md:col-span-1 lg:col-span-2" />
        <MetricCard title="Vagas Abertas" value={mockAnalyticsStats.vagasAbertas} icon={Briefcase} color="text-primary" colSpan="md:col-span-1 lg:col-span-2" />
        <MetricCard title="Admissões no Mês" value={mockAnalyticsStats.admissoesMes} icon={UserPlus} color="text-emerald-500" colSpan="md:col-span-1 lg:col-span-2" />
        <MetricCard title="Turnover (Mês)" value={mockAnalyticsStats.turnoverMes} icon={TrendingDown} color="text-rose-500" colSpan="md:col-span-1 lg:col-span-2" />
        <MetricCard title="Treinamentos Realizados" value={mockAnalyticsStats.treinamentosRealizados} icon={GraduationCap} color="text-blue-500" colSpan="md:col-span-1 lg:col-span-2" />
        <MetricCard title="Certificados Válidos" value={mockAnalyticsStats.certificadosValidos} icon={Award} color="text-emerald-600" colSpan="md:col-span-1 lg:col-span-2" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recruitment Section */}
        <ChartCard title="Funil de Recrutamento" subtitle="Conversão de candidatos por etapa no último mês">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockRecruitmentFunnel} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Origem de Candidatos (%)" subtitle="Fontes de atração de talentos">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={mockCandidateSources} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {mockCandidateSources.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Headcount Section */}
        <ChartCard title="Evolução de Headcount" subtitle="Crescimento do quadro de funcionários no ano">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockHeadcountHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="headcount" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tipos de Contrato (%)" subtitle="Distribuição da força de trabalho">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={mockContractTypes} cx="50%" cy="50%" innerRadius={0} outerRadius={100} dataKey="value">
                {mockContractTypes.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Turnover Section */}
        <ChartCard title="Taxa de Turnover (%)" subtitle="Índice de rotatividade mensal">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockTurnoverHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="taxa" stroke="#ef4444" strokeWidth={4} dot={{ r: 6, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Motivos de Desligamento (%)" subtitle="Análise das entrevistas de offboarding">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockTurnoverReasons} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color, colSpan = "col-span-1" }: any) {
  return (
    <Card className={`border-none shadow-sm h-full ${colSpan}`}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
           <div className={`p-3 rounded-2xl bg-slate-50 ${color}`}>
             <Icon size={24} />
           </div>
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
              <h4 className="text-3xl font-black text-slate-900 mt-1">{value}</h4>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartCard({ title, subtitle, children }: any) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-slate-800">{title}</CardTitle>
        {subtitle && <p className="text-xs font-medium text-slate-400">{subtitle}</p>}
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
    </Card>
  );
}
