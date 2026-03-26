import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { 
  ArrowRightLeft, 
  TrendingUp, 
  UserPlus, 
  MapPin, 
  Search, 
  Filter,
  ArrowUpRight,
  MoreVertical,
  History,
  FileText
} from "lucide-react";
import { mockMovimentacoes } from "@/data/mock/mockOperacoes";

export default function MovimentacoesPage() {
  const stats = {
    total: mockMovimentacoes.length,
    promocoes: mockMovimentacoes.filter(m => m.tipo === "Promoção").length,
    transferencias: mockMovimentacoes.filter(m => m.tipo === "Transferência").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Movimentações Internas</h1>
          <p className="text-muted-foreground mt-1">Histórico de mudanças de cargo, transferências e promoções.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <UserPlus size={18} />
          Registrar Alteração
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MovMetricCard title="Total no Mês" value={stats.total} icon={History} color="text-slate-900" />
        <MovMetricCard title="Promoções" value={stats.promocoes} icon={TrendingUp} color="text-emerald-500" />
        <MovMetricCard title="Transferências" value={stats.transferencias} icon={ArrowRightLeft} color="text-blue-500" />
      </div>

      <Card>
        <CardHeader className="pb-3 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-bold">Log de Alterações</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Pesquisar histórico..." 
                className="w-full pl-9 h-9 text-sm rounded-md border border-input"
              />
            </div>
            <button className="h-9 px-3 border rounded-md text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
              <Filter size={14} />
              Filtros
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b">
                <tr className="text-muted-foreground font-medium text-[10px] uppercase">
                  <th className="py-4 px-6">Data</th>
                  <th className="py-4 px-6">Colaborador</th>
                  <th className="py-4 px-6">Tipo</th>
                  <th className="py-4 px-6">De / Para</th>
                  <th className="py-4 px-6">Responsável</th>
                  <th className="py-4 px-6 text-right">Documento</th>
                </tr>
              </thead>
              <tbody>
                {mockMovimentacoes.map((mov) => (
                  <tr key={mov.id} className="border-b hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6 text-slate-500 font-mono text-xs">{mov.data}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{mov.nome}</span>
                        <span className="text-[10px] text-slate-500">{mov.matricula}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        mov.tipo === 'Promoção' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}>
                        {mov.tipo}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                       <div className="flex items-center gap-2">
                          <span className="text-slate-400 line-through text-xs">{mov.anterior}</span>
                          <ArrowUpRight size={14} className="text-primary" />
                          <span className="font-bold text-slate-800">{mov.novo}</span>
                       </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{mov.responsavel}</td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end">
                        <button className="p-2 hover:bg-primary/5 text-primary rounded-lg transition-colors flex items-center gap-2 font-bold text-xs">
                          <FileText size={16} />
                          ADITIVO
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

      <div className="p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-12 -mt-10 opacity-10">
            <TrendingUp size={120} />
         </div>
         <div className="relative max-w-lg">
            <h3 className="text-2xl font-bold">Análise de Headcount e Turnover</h3>
            <p className="text-slate-400 mt-2 leading-relaxed">
              O sistema detectou que 85% das movimentações deste mês foram promoções internas, indicando um forte índice de retenção e crescimento de talentos.
            </p>
            <button className="mt-6 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center gap-2">
               Ver Relatório Completo
               <ArrowUpRight size={18} />
            </button>
         </div>
      </div>
    </div>
  );
}

function MovMetricCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="border-none shadow-sm h-full hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
           <div className={`p-3 rounded-2xl bg-slate-100 ${color} shadow-inner`}>
             <Icon size={24} />
           </div>
           <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">{title}</p>
              <h4 className="text-3xl font-black text-slate-900">{value}</h4>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
