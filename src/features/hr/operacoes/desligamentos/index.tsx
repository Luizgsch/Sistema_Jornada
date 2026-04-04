import { FileUp, UserMinus, Eye } from 'lucide-react';
import { KpiCard } from '@/shared/components/dashboard/KpiCard';
import { TurnoverChart } from '@/shared/components/charts/TurnoverChart';
import { FiltersBar } from '@/shared/ui/FiltersBar';
import { useToast } from '@/shared/ui/Toast';
import { mockDesligamentosKpis, mockDesligamentosList, mockTurnoverChart } from '@/infrastructure/mock/mockDesligamentos';

export default function DesligamentosPage() {
  const { success, info } = useToast();

  const handleExport = () => {
    success("Relatório gerado", "O arquivo do relatório de desligamentos está sendo baixado.");
  }
  const handleRegister = () => {
    info("Novo Desligamento", "Abrindo formulário de offboarding...");
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Desligamentos</h1>
          <p className="text-muted-foreground mt-1">Gestão de offboarding, KPIs de turnover e histórico.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <FileUp size={16} /> Exportar Relatório
          </button>
          <button 
            onClick={handleRegister}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
          >
            <UserMinus size={16} /> Registrar Desligamento
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {mockDesligamentosKpis.map((kpi, index) => (
          <KpiCard key={index} {...kpi} delay={index * 0.1} />
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid gap-6 grid-cols-1">
        <TurnoverChart data={mockTurnoverChart} />
      </div>

      {/* Filters and Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight mt-4">Histórico de Desligamentos</h3>
        <FiltersBar searchPlaceholder="Buscar colaborador por nome, cargo ou setor..." filterLabel="Filtrar Desligamentos" />
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Colaborador</th>
                  <th className="px-6 py-4 font-semibold">Setor</th>
                  <th className="px-6 py-4 font-semibold">Período</th>
                  <th className="px-6 py-4 font-semibold">Tipo</th>
                  <th className="px-6 py-4 font-semibold">Motivo</th>
                  <th className="px-6 py-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockDesligamentosList.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{item.nome}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.cargo}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.setor}</td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">Adm: {item.dataAdmissao}</div>
                      <div className="text-rose-600 text-xs mt-0.5">Fim: {item.dataDesligamento}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${item.tipo === 'Voluntário' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                        {item.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate" title={item.motivo}>
                      {item.motivo}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => info("Histórico", `Abrindo o histórico de ${item.nome}`)}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Visualizar Histórico"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
