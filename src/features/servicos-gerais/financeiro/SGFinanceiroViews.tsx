import { Card, CardContent, CardHeader } from '@/shared/ui/Card';
import { KpiCard } from '@/shared/components/dashboard/KpiCard';
import { CriticalActionsBar, type CriticalAction } from '@/shared/components/dashboard/CriticalActionsBar';
import {
  mockNotasFiscais,
  mockConciliacaoAcessos,
  mockComprasMensais,
  mockAttosFaturamento,
  type KanbanNfColuna,
} from '@/infrastructure/mock/mockServicosGerais';
import { GitMerge, ShoppingCart, UtensilsCrossed } from 'lucide-react';

function FatBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${color}`}>
      {label}
    </span>
  );
}

const colunasNf: { id: KanbanNfColuna; label: string; alerta?: boolean }[] = [
  { id: 'solicitar',   label: 'Solicitar NF' },
  { id: 'aguardando',  label: 'Aguardando fornecedor' },
  { id: 'recebida',    label: 'Recebida' },
  { id: 'atrasada',    label: 'Atrasada / alerta', alerta: true },
];

export function SGDashboardFinanceiroView() {
  const nfPendente   = mockNotasFiscais.filter((n) => n.coluna !== 'recebida').length;
  const nfAtrasada   = mockNotasFiscais.filter((n) => n.coluna === 'atrasada').length;
  const divAcessos   = mockConciliacaoAcessos.filter((a) => a.duplicado || a.refeitorioDuplicado).length;
  const comprasMes   = mockComprasMensais.filter((r) => r.mes === '2026-03').reduce((s, r) => s + r.valor, 0);
  const attosPendente = mockAttosFaturamento.filter((r) => !r.integrado).length;

  const acoesFinanceiro: CriticalAction[] = [
    ...(nfAtrasada > 0 ? [{
      id: 'nf-atrasada',
      severity: 'critical' as const,
      title: 'Notas fiscais atrasadas',
      count: nfAtrasada,
      description: 'NFs vencidas aguardam baixa — risco de multa contratual.',
      action: { label: 'Ver NFs', onClick: () => {} },
    }] : []),
    ...(divAcessos > 0 ? [{
      id: 'divergencias-elo',
      severity: 'warning' as const,
      title: 'Divergências Elo / Attos',
      count: divAcessos,
      description: 'Linhas com acesso duplicado ou refeitório divergente identificadas.',
      action: { label: 'Ver conciliação', onClick: () => {} },
    }] : []),
    ...(attosPendente > 0 ? [{
      id: 'attos-integracao',
      severity: 'warning' as const,
      title: 'Integrações Attos pendentes',
      count: attosPendente,
      description: 'Registros Attos ainda não integrados ao sistema financeiro.',
      action: { label: 'Ver faturamento', onClick: () => {} },
    }] : []),
    {
      id: 'compras-mes',
      severity: 'info' as const,
      title: 'Compras do mês registradas',
      description: `Consolidado março: R$ ${comprasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    },
  ];

  return (
    <div className="space-y-8">
      <CriticalActionsBar actions={acoesFinanceiro} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="NF em aberto"
          value={nfPendente}
          trend={nfAtrasada > 0 ? 'down' : 'neutral'}
          urgency={nfPendente > 0 ? 'warning' : 'normal'}
        />
        <KpiCard
          label="NF em atraso"
          value={nfAtrasada}
          trend={nfAtrasada > 0 ? 'down' : 'up'}
          urgency={nfAtrasada > 0 ? 'critical' : 'normal'}
        />
        <KpiCard
          label="Linhas Elo/Attos com alerta"
          value={divAcessos}
          trend={divAcessos > 0 ? 'down' : 'up'}
          urgency={divAcessos > 0 ? 'warning' : 'normal'}
        />
        <KpiCard
          label="Integrações Attos pendentes"
          value={attosPendente}
          trend="neutral"
          urgency={attosPendente > 0 ? 'warning' : 'normal'}
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4]">Painel Financeiro</h3>
          <p className="text-sm text-zinc-500">
            Notas fiscais, faturamento Elo/Attos e validação de custos de insumos.
          </p>
        </CardHeader>
        <CardContent className="text-sm text-zinc-400">
          <p>
            Consolidado de compras (mês corrente simulado):{' '}
            <span className="font-bold text-[#e7e5e4]">
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
    <div className="space-y-6">
      <p className="text-sm text-zinc-500 leading-relaxed">
        Kanban com alertas visuais para esquecimento e atraso — objetivo: nenhuma NF fora do prazo sem sinalização.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {colunasNf.map((col) => {
          const itens = mockNotasFiscais.filter((n) => n.coluna === col.id);
          return (
            <div
              key={col.id}
              className={`bg-[#1e293b] rounded-radius-m min-h-[280px] flex flex-col ${
                col.alerta
                  ? 'border border-[#334155] border-l-4 border-l-red-600/70'
                  : 'border border-[#334155]'
              }`}
            >
              <div
                className={`px-4 py-3 border-b border-[#334155] font-semibold text-sm flex items-center justify-between ${
                  col.alerta ? 'text-red-400' : 'text-[#e7e5e4]'
                }`}
              >
                {col.label}
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                    col.alerta ? 'bg-red-500/10 text-red-400' : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {itens.length}
                </span>
              </div>
              <div className="p-3 flex-1 space-y-2 overflow-y-auto">
                {itens.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-radius-m text-sm ${
                      n.diasAtraso > 0
                        ? 'bg-red-500/5 border border-red-500/15'
                        : 'bg-[#0f172a] border border-[#334155]'
                    }`}
                  >
                    <p className="font-semibold text-[#e7e5e4] leading-tight">{n.fornecedor}</p>
                    <p className="text-xs text-zinc-600 mt-1">
                      {n.id} · {n.competencia}
                    </p>
                    <p className="text-xs mt-2 font-bold text-zinc-400">
                      R$ {n.valorRef.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    {n.diasAtraso > 0 && (
                      <p className="text-xs font-bold mt-2 neon-error-sm">+{n.diasAtraso} dia(s) em atraso</p>
                    )}
                  </div>
                ))}
                {itens.length === 0 && (
                  <p className="text-xs text-zinc-600 p-2 text-center">Nenhum item</p>
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
    <Card>
      <CardHeader className="border-b border-[#334155] pb-4">
        <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4] flex items-center gap-2">
          <GitMerge className="text-amber-400" size={20} />
          Conciliação Elo · Attos · faturamento
        </h3>
        <p className="text-sm text-zinc-500 mt-1">
          Separação automática Posigraf/Elo para faturamento e detecção de inconsistências cadastrais.
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#0f172a] text-zinc-500 text-xs uppercase tracking-widest">
              <tr>
                <th className="py-4 px-6 border-b border-[#334155]">Colaborador</th>
                <th className="py-4 px-6 border-b border-[#334155]">Origem sistema</th>
                <th className="py-4 px-6 border-b border-[#334155]">Faturamento</th>
                <th className="py-4 px-6 border-b border-[#334155] text-center">Dup. cadastro</th>
                <th className="py-4 px-6 border-b border-[#334155] text-center">Dup. refeitório</th>
              </tr>
            </thead>
            <tbody>
              {mockConciliacaoAcessos.map((r) => (
                <tr
                  key={r.id}
                  className={`hover:bg-zinc-800/30 transition-colors ${
                    r.duplicado || r.refeitorioDuplicado ? 'border-l-4 border-l-amber-500/60 border-[#334155]' : ''
                  }`}
                >
                  <td className="py-4 px-6 border-b border-[#334155] font-semibold text-[#e7e5e4]">{r.colaborador}</td>
                  <td className="py-4 px-6 border-b border-[#334155] text-zinc-600 text-xs">{r.origem}</td>
                  <td className="py-4 px-6 border-b border-[#334155]">
                    <FatBadge
                      label={r.tipoFaturamento}
                      color={
                        r.tipoFaturamento === 'Elo'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }
                    />
                  </td>
                  <td className="py-4 px-6 border-b border-[#334155] text-center">
                    {r.duplicado
                      ? <span className="text-xs font-bold neon-warning">Sim</span>
                      : <span className="text-zinc-700">—</span>}
                  </td>
                  <td className="py-4 px-6 border-b border-[#334155] text-center">
                    {r.refeitorioDuplicado
                      ? <span className="text-xs font-bold neon-warning">Sim</span>
                      : <span className="text-zinc-700">—</span>}
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
    <Card>
      <CardHeader className="border-b border-[#334155] pb-4 flex flex-row items-center gap-2">
        <ShoppingCart className="text-amber-400" size={20} />
        <div>
          <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4]">Controle de compras / insumos</h3>
          <p className="text-sm text-zinc-500">Validação de custos recorrentes e evolução mensal.</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-[#0f172a] text-zinc-500 text-xs uppercase tracking-widest">
            <tr>
              <th className="py-4 px-6 border-b border-[#334155]">Mês</th>
              <th className="py-4 px-6 border-b border-[#334155]">Categoria</th>
              <th className="py-4 px-6 border-b border-[#334155] text-right">Valor (R$)</th>
            </tr>
          </thead>
          <tbody>
            {mockComprasMensais.map((r, i) => (
              <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                <td className="py-4 px-6 border-b border-[#334155] font-mono text-xs text-zinc-600">{r.mes}</td>
                <td className="py-4 px-6 border-b border-[#334155] text-zinc-400">{r.categoria}</td>
                <td className="py-4 px-6 border-b border-[#334155] text-right font-bold text-[#e7e5e4]">
                  R$ {r.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 bg-[#0f172a] border-t border-[#334155] text-sm">
          <p className="font-semibold text-zinc-400 mb-2">Totais por mês</p>
          <div className="flex flex-wrap gap-4">
            {Object.entries(totais).map(([mes, v]) => (
              <span key={mes} className="text-zinc-500">
                <span className="text-zinc-600">{mes}:</span>{' '}
                <span className="font-semibold text-[#e7e5e4]">R$ {v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
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
    <Card>
      <CardHeader className="border-b border-[#334155] pb-4">
        <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4] flex items-center gap-2">
          <UtensilsCrossed className="text-orange-400" size={20} />
          Faturamento Attos — integração diária
        </h3>
        <p className="text-sm text-zinc-500">Reduz cópia manual de PDF/Excel; status de origem indicado por linha.</p>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-[#0f172a] text-zinc-500 text-xs uppercase tracking-widest">
            <tr>
              <th className="py-4 px-6 border-b border-[#334155]">Data</th>
              <th className="py-4 px-6 border-b border-[#334155] text-center">Refeições</th>
              <th className="py-4 px-6 border-b border-[#334155]">Integrado</th>
              <th className="py-4 px-6 border-b border-[#334155]">Origem</th>
            </tr>
          </thead>
          <tbody>
            {mockAttosFaturamento.map((r) => (
              <tr
                key={r.data}
                className={`hover:bg-zinc-800/30 transition-colors ${
                  !r.integrado ? 'border-l-4 border-l-amber-500/60 border-[#334155]' : ''
                }`}
              >
                <td className="py-4 px-6 border-b border-[#334155] font-mono text-xs text-zinc-600">{r.data}</td>
                <td className="py-4 px-6 border-b border-[#334155] text-center font-bold text-[#e7e5e4]">{r.refeicoes}</td>
                <td className="py-4 px-6 border-b border-[#334155]">
                  {r.integrado ? (
                    <FatBadge label="Integrado" color="bg-emerald-500/10 text-emerald-400 border-emerald-500/20" />
                  ) : (
                    <FatBadge label="Pendente" color="bg-amber-500/10 text-amber-400 border-amber-500/20" />
                  )}
                </td>
                <td className="py-4 px-6 border-b border-[#334155] text-xs text-zinc-600">{r.origem}</td>
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
    <Card>
      <CardHeader className="border-b border-[#334155] pb-4">
        <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4]">Fechamento Attos — fonte única</h3>
        <p className="text-sm text-zinc-500">
          Consolidação em um painel para substituir planilhas paralelas e reduzir divergência.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-radius-m border border-dashed border-[#334155] bg-[#0f172a]">
          <p className="text-sm text-zinc-400">
            <strong className="text-[#e7e5e4]">Competência 2026-03</strong> — fechamento validado. Última sincronização: 02/04/2026 06:00.
            Todas as linhas originadas do mesmo conjunto de dados (simulação).
          </p>
        </div>
        <ul className="text-sm text-zinc-500 space-y-2 list-disc list-inside">
          <li>Reconciliação automática com acessos Elo/Posigraf</li>
          <li>Trava de edição após aprovação do responsável</li>
          <li>Exportação única para financeiro</li>
        </ul>
      </CardContent>
    </Card>
  );
}
