import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { UserPlus, FileWarning, Clock, Rocket } from "lucide-react";
import { mockAdmissoesMetrics, mockRecentAdmissoes } from "@/infrastructure/mock/mockAdmissoes";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { cn } from "@/shared/lib/cn";
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

const sectorData = [
  { name: "Tecnologia", value: 8 },
  { name: "Marketing", value: 5 },
  { name: "Operações", value: 7 },
  { name: "Vendas", value: 4 },
];

const COLORS = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"];

export default function AdmissoesDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Admissões</h1>
        <p className="text-muted-foreground mt-2">Visão geral do fluxo de entrada de novos colaboradores.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Admissões no Mês" 
          value={mockAdmissoesMetrics.totalMes} 
          icon={UserPlus} 
          trend="+12%" 
        />
        <MetricCard 
          title="Pendentes" 
          value={mockAdmissoesMetrics.pendentes} 
          icon={Clock} 
          subtitle="Aguardando início"
        />
        <MetricCard 
          title="Docs Pendentes" 
          value={mockAdmissoesMetrics.documentosFaltantes} 
          icon={FileWarning} 
          color="text-rose-500"
        />
        <MetricCard 
          title="Onboarding" 
          value={mockAdmissoesMetrics.onboardingAtivo} 
          icon={Rocket} 
          color="text-emerald-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Admissões por Setor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs" />
                  <YAxis axisLine={false} tickLine={false} className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
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
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "CLT", value: 15 },
                      { name: "PJ", value: 5 },
                      { name: "Estágio", value: 4 },
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

      <Card>
        <CardHeader>
          <CardTitle>Novas Admissões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b font-medium text-muted-foreground">
                  <th className="pb-3 px-2">Nome</th>
                  <th className="pb-3 px-2">Cargo</th>
                  <th className="pb-3 px-2">Setor</th>
                  <th className="pb-3 px-2">Início</th>
                  <th className="pb-3 px-2">Documentação</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentAdmissoes.map((item) => (
                  <tr key={item.id} className="border-b group hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-2 font-medium">{item.nome}</td>
                    <td className="py-4 px-2">{item.cargo}</td>
                    <td className="py-4 px-2">{item.setor}</td>
                    <td className="py-4 px-2">{item.dataInicio}</td>
                    <td className="py-4 px-2">
                      <StatusBadge status={item.statusDoc} />
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

function MetricCard({ title, value, icon: Icon, trend, subtitle, color }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Icon className={cn("w-5 h-5", color || "text-slate-600")} />
          </div>
          {trend && <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{trend}</span>}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">{value}</span>
            {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
