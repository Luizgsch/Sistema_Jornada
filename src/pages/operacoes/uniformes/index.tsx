import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { 
  Shirt, 
  Package, 
  RefreshCw, 
  CheckCircle, 
  Search, 
  Filter,
  PackageCheck,
  Truck,
  Edit
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockOperacoesColaboradores, mockUniformeStats } from "@/data/mock/mockOperacoes";

export default function UniformesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Logística de Uniformes</h1>
        <p className="text-muted-foreground mt-1">Gestão de tamanhos, entregas e reposições periódicas.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <UniformStatCard title="Entregues" value={mockUniformeStats.entregues} icon={PackageCheck} color="text-emerald-500" />
        <UniformStatCard title="Pendentes" value={mockUniformeStats.pendentes} icon={Truck} color="text-amber-500" />
        <UniformStatCard title="Reposições" value={mockUniformeStats.reposicoes} icon={RefreshCw} color="text-primary" />
      </div>

      <Card>
        <CardHeader className="pb-3 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-bold">Grade de Uniformes por Colaborador</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Nome ou matrícula..." 
                className="w-full pl-9 h-9 text-sm rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button className="inline-flex items-center gap-2 h-9 px-3 border rounded-md text-sm font-medium hover:bg-slate-50">
              <Filter size={14} />
              Filtrar
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b">
                <tr className="text-muted-foreground font-medium text-[10px] uppercase tracking-wider">
                  <th className="py-4 px-6">Colaborador</th>
                  <th className="py-4 px-6 text-center">Camisa</th>
                  <th className="py-4 px-6 text-center">Calça</th>
                  <th className="py-4 px-6 text-center">Calçado</th>
                  <th className="py-4 px-6 text-center">Status Entrega</th>
                  <th className="py-4 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockOperacoesColaboradores.map((colab) => (
                  <tr key={colab.matricula} className="border-b hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                          <Shirt size={16} />
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-slate-900">{colab.nome}</span>
                           <span className="text-[10px] text-slate-500">{colab.setor}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-slate-700">{colab.uniforme.camisa}</td>
                    <td className="py-4 px-6 text-center font-bold text-slate-700">{colab.uniforme.calca}</td>
                    <td className="py-4 px-6 text-center font-bold text-slate-700">{colab.uniforme.calcado}</td>
                    <td className="py-4 px-6 text-center">
                       <StatusBadge status={colab.uniforme.status as any} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors" title="Editar Tamanhos">
                          <Edit size={16} />
                        </button>
                        <button className="h-8 px-3 text-xs font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                          Registrar Entrega
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

      <div className="grid gap-6 md:grid-cols-2">
         <Card className="border-dashed border-2 bg-slate-50 hover:bg-slate-100/50 transition-colors cursor-pointer">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Package size={24} />
              </div>
              <h4 className="font-bold">Configurar Grade de Tamanhos</h4>
              <p className="text-sm text-muted-foreground mt-1 max-w-[280px]">
                Defina os tamanhos padrão disponíveis para a empresa e as regras de reposição automática.
              </p>
            </CardContent>
         </Card>
         <Card className="border-dashed border-2 bg-slate-50 hover:bg-slate-100/50 transition-colors cursor-pointer">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle size={24} />
              </div>
              <h4 className="font-bold">Relatório de Conformidade</h4>
              <p className="text-sm text-muted-foreground mt-1 max-w-[280px]">
                Gere um PDF com as assinaturas digitais de recebimento e termos de responsabilidade.
              </p>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

function UniformStatCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="border-none shadow-sm h-full">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-xl bg-slate-50 ${color}`}>
            <Icon size={20} />
          </div>
          <span className="text-xs font-bold text-slate-400">Total</span>
        </div>
        <div className="mt-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
          <span className="text-2xl font-bold text-slate-900">{value} unidades</span>
        </div>
      </CardContent>
    </Card>
  );
}
