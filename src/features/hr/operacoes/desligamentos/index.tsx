import { useState } from 'react';
import { UserMinus, Eye } from 'lucide-react';
import { KpiCard } from '@/shared/components/dashboard/KpiCard';
import { TurnoverChart } from '@/shared/components/charts/TurnoverChart';
import { FiltersBar } from '@/shared/ui/FiltersBar';
import { useToast } from '@/shared/ui/Toast';
import { Button } from '@/shared/ui/Button';
import { delay } from '@/shared/lib/delay';
import { mockDesligamentosKpis, mockDesligamentosList, mockTurnoverChart } from '@/infrastructure/mock/mockDesligamentos';

export default function DesligamentosPage() {
  const { success, info, error } = useToast();
  const [exportLoading, setExportLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleExport = async () => {
    setExportLoading(true);
    try {
      await delay(700);
      success("Relatório gerado", "O arquivo do relatório de desligamentos está sendo baixado.");
    } catch {
      error("Falha na exportação", "Tente novamente.");
    } finally {
      setExportLoading(false);
    }
  };
  const handleRegister = async () => {
    setRegisterLoading(true);
    try {
      await delay(500);
      info("Novo Desligamento", "Abrindo formulário de offboarding...");
    } catch {
      error("Ação indisponível", "Tente novamente.");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#e7e5e4] dark:text-white">Desligamentos</h1>
          <p className="text-muted-foreground mt-1">Gestão de offboarding, KPIs de turnover e histórico.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="rounded-radius-m"
            isLoading={registerLoading}
            disabled={exportLoading}
            onClick={() => void handleRegister()}
          >
            <UserMinus size={16} /> Registrar Desligamento
          </Button>
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
        <FiltersBar
          searchPlaceholder="Buscar colaborador por nome, cargo ou setor..."
          filterLabel="Filtrar Desligamentos"
          showExport
          exportLabel="Exportar relatório"
          exportLoading={exportLoading}
          exportDisabled={registerLoading}
          onExportClick={() => void handleExport()}
        />
        
        <div className="bg-[#1e293b] rounded-radius-l  border border-[#334155] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 bg-[#0f172a] uppercase border-b border-[#334155]">
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
                  <tr key={item.id} className="border-b border-[#334155] hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[#e7e5e4]">{item.nome}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{item.cargo}</div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{item.setor}</td>
                    <td className="px-6 py-4">
                      <div className="text-[#e7e5e4]">Adm: {item.dataAdmissao}</div>
                      <div className="text-rose-600 text-xs mt-0.5">Fim: {item.dataDesligamento}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${item.tipo === 'Voluntário' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                        {item.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-500 max-w-[200px] truncate" title={item.motivo}>
                      {item.motivo}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => info("Histórico", `Abrindo o histórico de ${item.nome}`)}
                        className="p-2 text-zinc-600 hover:text-primary hover:bg-primary/10 rounded-radius-m transition-colors"
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
