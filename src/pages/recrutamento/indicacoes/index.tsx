import { Card, CardContent, CardHeader } from "@/components/ui/Card";

import { Search, Filter, Share2, Award, UserCheck, TrendingUp } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockIndicacoes } from "@/data/mock/mockRecrutamento";

export default function IndicacoesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Indicações Internas</h1>
          <p className="text-muted-foreground mt-1">Gerencie e recompense talentos indicados pelo seu próprio time.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
            <Share2 size={18} />
            Nova Indicação
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Indicados" value="42" icon={Users} />
        <StatCard title="Contratações" value="8" icon={UserCheck} color="text-emerald-500" />
        <StatCard title="Taxa de Sucesso" value="19%" icon={TrendingUp} color="text-blue-500" />
      </div>

      <Card>
        <CardHeader className="pb-3 px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar por candidato ou colaborador..." 
                className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
                <Filter size={16} />
                Filtrar
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-y border-slate-200">
                <tr className="text-muted-foreground font-medium">
                  <th className="py-3 px-6">Candidato</th>
                  <th className="py-3 px-6">Vaga Indicada</th>
                  <th className="py-3 px-6">Colaborador (Autor)</th>
                  <th className="py-3 px-6">Setor</th>
                  <th className="py-3 px-6">Data</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-center">Bonificação</th>
                </tr>
              </thead>
              <tbody>
                {mockIndicacoes.map((ind) => (
                  <tr key={ind.id} className="border-b transition-colors hover:bg-slate-50/50">
                    <td className="py-4 px-6 font-bold text-slate-900">{ind.candidato}</td>
                    <td className="py-4 px-6 font-medium text-primary">{ind.cargo}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">{ind.quemIndicou.charAt(0)}</div>
                        <span>{ind.quemIndicou}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{ind.setor}</td>
                    <td className="py-4 px-6 text-slate-500">{ind.data}</td>
                    <td className="py-4 px-6">
                      <StatusBadge status={ind.status as any} />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1 text-amber-600 font-bold">
                        <Award size={14} />
                        <span className="text-xs">Pendente</span>
                      </div>
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

import { Users } from "lucide-react";

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
          </div>
          <div className={`p-3 bg-slate-100 rounded-xl ${color || "text-slate-600"}`}>
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
