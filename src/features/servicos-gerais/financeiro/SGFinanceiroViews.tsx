import { Card, CardContent, CardHeader } from '@/shared/ui/Card';
import { KpiCard } from '@/shared/components/dashboard/KpiCard';
import {
  mockNotasFiscais,
  mockConciliacaoAcessos,
  mockComprasMensais,
  mockAttosFaturamento,
  type KanbanNfColuna,
} from '@/infrastructure/mock/mockServicosGerais';
import { GitMerge, ShoppingCart, UtensilsCrossed } from 'lucide-react';

const colunasNf: { id: KanbanNfColuna; label: string; alerta?: boolean }[] = [
  { id: 'solicitar', label: 'Solicitar NF' },
  { id: 'aguardando', label: 'Aguardando fornecedor' },
  { id: 'recebida', label: 'Recebida' },
  { id: 'atrasada', label: 'Atrasada / alerta', alerta: true },
];

export function SGDashboardFinanceiroView() {
  const nfPendente = mockNotasFiscais.filter((n) => n.coluna !== 'recebida').length;
  const nfAtrasada = mockNotasFiscais.filter((n) => n.coluna === 'atrasada').length;
  const divAcessos = mockConciliacaoAcessos.filter((a) => a.duplicado || a.refeitorioDuplicado).length;
  const comprasMes = mockComprasMensais.filter((r) => r.mes === '2026-03').reduce((s, r) => s + r.valor, 0);
  const attosPendente = mockAttosFaturamento.filter((r) => !r.integrado).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="NF em aberto"
          value={nfPendente}
          trend={nfAtrasada > 0 ? 'down' : 'neutral'}
        />
        <KpiCard label="NF em atraso" value={nfAtrasada} trend={nfAtrasada > 0 ? 'down' : 'up'} />
        <KpiCard
          label="Linhas Elo/Attos com alerta"
          value={divAcessos}
          trend={divAcessos > 0 ? 'down' : 'up'}
        />
        <KpiCard label="Integrações Attos pendentes" value={attosPendente} trend="neutral" />
      </div>

      <Card className="border-none shadow-sm border-blue-100 bg-blue-50/30">
        <CardHeader className="pb-2">
          <h3 className="font-bold text-lg text-slate-900">Painel Financeiro</h3>
          <p className="text-sm text-muted-foreground">
            Foco em notas fiscais, faturamento Elo/Attos e validação de custos de insumos — sem telas de facilities.
          </p>
        </CardHeader>
        <CardContent className="text-sm text-slate-700">
          <p>
            Consolidado de compras (mês corrente simulado):{' '}
            <span className="font-bold text-blue-800">
              R$ {comprasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function SGNotasFiscaisView() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Kanban com alertas visuais para esquecimento e atraso — objetivo: nenhuma NF fora do prazo sem sinalização.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {colunasNf.map((col) => {
          const itens = mockNotasFiscais.filter((n) => n.coluna === col.id);
          return (
            <div
              key={col.id}
              className={`rounded-xl border-2 min-h-[280px] flex flex-col ${
                col.alerta ? 'border-rose-200 bg-rose-50/40' : 'border-slate-200 bg-white'
              }`}
            >
              <div
                className={`p-3 border-b font-bold text-sm flex items-center justify-between ${
                  col.alerta ? 'bg-rose-100/80 text-rose-900' : 'bg-slate-50 text-slate-800'
                }`}
              >
                {col.label}
                <span className="text-xs font-mono bg-white/80 px-2 py-0.5 rounded">{itens.length}</span>
              </div>
              <div className="p-2 flex-1 space-y-2 overflow-y-auto">
                {itens.map((n) => (
                  <div key={n.id} className="p-3 rounded-lg bg-white border border-slate-200 shadow-sm text-sm">
                    <p className="font-semibold text-slate-900 leading-tight">{n.fornecedor}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {n.id} · {n.competencia}
                    </p>
                    <p className="text-xs mt-2 font-medium text-slate-600">
                      R$ {n.valorRef.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    {n.diasAtraso > 0 && (
                      <p className="text-xs text-rose-600 font-bold mt-2">+{n.diasAtraso} dia(s) atraso</p>
                    )}
                  </div>
                ))}
                {itens.length === 0 && (
                  <p className="text-xs text-slate-400 p-2 text-center">Nenhum item</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SGConciliacaoView() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="border-b">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <GitMerge className="text-amber-600" size={22} />
          Conciliação Elo · Attos · faturamento
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Separação automática Posigraf/Elo para faturamento e detecção de inconsistências cadastrais (visão financeiro).
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b text-xs uppercase text-muted-foreground font-medium">
              <tr>
                <th className="py-3 px-6">Colaborador</th>
                <th className="py-3 px-6">Origem sistema</th>
                <th className="py-3 px-6">Faturamento</th>
                <th className="py-3 px-6 text-center">Dup. cadastro</th>
                <th className="py-3 px-6 text-center">Dup. refeitório</th>
              </tr>
            </thead>
            <tbody>
              {mockConciliacaoAcessos.map((r) => (
                <tr
                  key={r.id}
                  className={`border-b ${r.duplicado || r.refeitorioDuplicado ? 'bg-amber-50/60' : ''}`}
                >
                  <td className="py-3 px-6 font-medium">{r.colaborador}</td>
                  <td className="py-3 px-6">{r.origem}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-md ${
                        r.tipoFaturamento === 'Elo' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {r.tipoFaturamento}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {r.duplicado ? <span className="text-rose-700 font-bold">Sim</span> : '—'}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {r.refeitorioDuplicado ? <span className="text-rose-700 font-bold">Sim</span> : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function SGComprasView() {
  const totais = mockComprasMensais.reduce<Record<string, number>>((acc, r) => {
    acc[r.mes] = (acc[r.mes] || 0) + r.valor;
    return acc;
  }, {});
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="border-b flex flex-row items-center gap-2">
        <ShoppingCart className="text-amber-600" size={22} />
        <div>
          <h3 className="font-bold text-lg">Controle de compras / insumos</h3>
          <p className="text-sm text-muted-foreground">Validação de custos recorrentes e evolução mensal.</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b text-xs uppercase text-muted-foreground">
            <tr>
              <th className="py-3 px-6">Mês</th>
              <th className="py-3 px-6">Categoria</th>
              <th className="py-3 px-6 text-right">Valor (R$)</th>
            </tr>
          </thead>
          <tbody>
            {mockComprasMensais.map((r, i) => (
              <tr key={i} className="border-b hover:bg-slate-50/50">
                <td className="py-3 px-6 font-mono text-xs">{r.mes}</td>
                <td className="py-3 px-6">{r.categoria}</td>
                <td className="py-3 px-6 text-right font-medium">
                  {r.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 bg-slate-50 border-t text-sm">
          <p className="font-bold text-slate-800 mb-2">Totais por mês</p>
          <div className="flex flex-wrap gap-4">
            {Object.entries(totais).map(([mes, v]) => (
              <span key={mes} className="text-slate-700">
                <span className="text-muted-foreground">{mes}:</span>{' '}
                <span className="font-semibold">R$ {v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SGFaturamentoAttosView() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="border-b">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <UtensilsCrossed className="text-orange-600" size={22} />
          Faturamento Attos — integração diária
        </h3>
        <p className="text-sm text-muted-foreground">Reduz cópia manual de PDF/Excel; status de origem indicado por linha.</p>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b text-xs uppercase text-muted-foreground">
            <tr>
              <th className="py-3 px-6">Data</th>
              <th className="py-3 px-6 text-center">Refeições</th>
              <th className="py-3 px-6">Integrado</th>
              <th className="py-3 px-6">Origem</th>
            </tr>
          </thead>
          <tbody>
            {mockAttosFaturamento.map((r) => (
              <tr key={r.data} className="border-b">
                <td className="py-3 px-6 font-mono text-xs">{r.data}</td>
                <td className="py-3 px-6 text-center font-bold">{r.refeicoes}</td>
                <td className="py-3 px-6">
                  {r.integrado ? (
                    <span className="text-emerald-700 font-medium">Sim</span>
                  ) : (
                    <span className="text-amber-700 font-medium">Pendente</span>
                  )}
                </td>
                <td className="py-3 px-6 text-xs text-slate-600">{r.origem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export function SGFechamentoAttosView() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="border-b">
        <h3 className="font-bold text-lg">Fechamento Attos — fonte única</h3>
        <p className="text-sm text-muted-foreground">
          Consolidação em um painel para substituir planilhas paralelas e reduzir divergência.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/80">
          <p className="text-sm text-slate-700">
            <strong>Competência 2026-03</strong> — fechamento validado. Última sincronização: 02/04/2026 06:00. Todas as
            linhas originadas do mesmo conjunto de dados (simulação).
          </p>
        </div>
        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
          <li>Reconciliação automática com acessos Elo/Posigraf</li>
          <li>Trava de edição após aprovação do responsável</li>
          <li>Exportação única para financeiro</li>
        </ul>
      </CardContent>
    </Card>
  );
}
