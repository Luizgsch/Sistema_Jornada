import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Search, Filter, Download, Hash, UserCheck, ShieldCheck } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";


const mockMatriculas = [
  { id: "MAT-2026-001", nome: "Eduardo Rocha", cargo: "Suporte TI", setor: "TI", contrato: "CLT", admissao: "20/03/2026", status: "completo" },
  { id: "MAT-2026-002", nome: "Mariana Costa", cargo: "Analista Financeiro", setor: "Financeiro", contrato: "CLT", admissao: "15/03/2026", status: "completo" },
  { id: "MAT-2026-003", nome: "Roberto Almeida", cargo: "Auxiliar Admin", setor: "Operações", contrato: "Temporário", admissao: "10/03/2026", status: "completo" },
];

export default function MatriculasPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matrículas e Registros</h1>
          <p className="text-muted-foreground mt-1">Consulta formal de colaboradores registrados no sistema.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-10 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Hash size={18} />
            Gerar Matrícula Automática
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Registrados" value="158" icon={UserCheck} />
        <StatCard title="Ativos" value="152" icon={ShieldCheck} />
        <StatCard title="Em Processamento" value="6" icon={Hash} />
      </div>

      <Card>
        <CardHeader className="pb-3 px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar por matrícula ou nome..." 
                className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-md text-sm font-medium hover:bg-slate-50">
                <Filter size={16} />
                Filtrar
              </button>
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-md text-sm font-medium hover:bg-slate-50">
                <Download size={16} />
                Exportar Folha
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-y border-slate-200">
                <tr className="text-muted-foreground font-medium">
                  <th className="py-3 px-6">Matrícula</th>
                  <th className="py-3 px-6">Colaborador</th>
                  <th className="py-3 px-6">Cargo / Setor</th>
                  <th className="py-3 px-6">Tipo Contrato</th>
                  <th className="py-3 px-6">Data Admissão</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockMatriculas.map((m) => (
                  <tr key={m.id} className="border-b hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs font-bold text-primary">{m.id}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">{m.nome}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span>{m.cargo}</span>
                        <span className="text-[11px] text-muted-foreground">{m.setor}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{m.contrato}</td>
                    <td className="py-4 px-6 font-medium">{m.admissao}</td>
                    <td className="py-4 px-6">
                      <StatusBadge status={m.status as any} />
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

function StatCard({ title, value, icon: Icon }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
          </div>
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
