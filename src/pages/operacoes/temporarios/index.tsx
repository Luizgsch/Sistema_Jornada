import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter,
  UserCheck,
  RefreshCcw,
  Zap
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockOperacoesColaboradores } from "@/data/mock/mockOperacoes";

export default function TemporariosPage() {
  const temporarios = mockOperacoesColaboradores.filter(c => c.contrato === "Temporário");
  
  const stats = {
    total: temporarios.length,
    vencendo: temporarios.filter(c => c.status === "vencendo").length,
    ativos: temporarios.filter(c => c.status === "ativo").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contratos Temporários</h1>
        <p className="text-muted-foreground mt-1">Monitoramento de períodos contratuais e alertas de vencimento.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Total Temporários" value={stats.total} icon={Clock} color="text-primary" />
        <MetricCard title="Vencendo no Mês" value={stats.vencendo} icon={AlertTriangle} color="text-amber-500" />
        <MetricCard title="Contratos Ativos" value={stats.ativos} icon={CheckCircle2} color="text-emerald-500" />
      </div>

      <Card>
        <CardHeader className="pb-3 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-bold">Listagem de Contratos</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="w-full pl-9 h-9 text-sm rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button className="inline-flex items-center gap-2 h-9 px-3 border rounded-md text-sm font-medium hover:bg-slate-50">
              <Filter size={14} />
              Filtros
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b">
                <tr className="text-muted-foreground font-medium">
                  <th className="py-4 px-6">Colaborador</th>
                  <th className="py-4 px-6">Cargo</th>
                  <th className="py-4 px-6 text-center">Início</th>
                  <th className="py-4 px-6 text-center">Término</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {temporarios.map((colab) => (
                  <tr key={colab.matricula} className="border-b hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{colab.nome}</span>
                        <span className="text-[10px] font-mono text-slate-500">{colab.matricula}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{colab.cargo}</td>
                    <td className="py-4 px-6 text-center text-slate-500">{colab.admissao}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`font-medium ${colab.status === 'vencendo' ? 'text-amber-600' : 'text-slate-600'}`}>
                        {colab.vencimento}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <StatusBadge status={colab.status as any} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button className="h-8 px-2 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1">
                          <Zap size={12} />
                          Efetivar
                        </button>
                        <button className="h-8 px-2 text-xs font-bold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-1">
                          <RefreshCcw size={12} />
                          Renovar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Alert Cards for UX */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-amber-50 border-amber-200">
           <CardContent className="pt-6">
              <div className="flex gap-4">
                 <div className="p-3 bg-white rounded-2xl text-amber-500 shadow-sm flex items-center justify-center">
                    <AlertTriangle size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold text-amber-900">Atenção ao Vencimento</h4>
                    <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                      Você possui 1 contrato temporário que vence nos próximos 15 dias. Lembre-se de iniciar o processo de efetivação ou renovação.
                    </p>
                 </div>
              </div>
           </CardContent>
        </Card>
        <Card className="bg-slate-900 text-white border-none">
           <CardContent className="pt-6">
              <div className="flex gap-4">
                 <div className="p-3 bg-white/10 rounded-2xl text-primary shadow-sm flex items-center justify-center">
                    <UserCheck size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold">Potencial de Efetivação</h4>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                      Com base nas avaliações de desempenho, 3 colaboradores temporários atingiram os requisitos técnicos para efetivação CLT.
                    </p>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="border-none shadow-sm overflow-hidden group">
      <CardContent className="p-6 relative">
        <div className="absolute top-0 right-0 p-8 -mt-4 -mr-4 bg-slate-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
        <div className="relative flex items-center gap-4">
          <div className={`p-3 rounded-2xl bg-slate-50 ${color}`}>
            <Icon size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
