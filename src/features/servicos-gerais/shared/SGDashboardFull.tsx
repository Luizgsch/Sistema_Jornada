import { Card, CardContent, CardHeader } from '@/shared/ui/Card';
import { KpiCard } from '@/shared/components/dashboard/KpiCard';
import {
  mockNotasFiscais,
  mockConciliacaoAcessos,
  mockCruzamentoBeneficios,
  mockArmariosMapa,
  mockSatisfacaoAttos,
  mockChamadosManusis,
  mockCafeAbastecimento,
  mockVouchersNatal,
  mockProximoCafeRoda,
} from '@/infrastructure/mock/mockServicosGerais';
import { FileWarning, GitMerge, ClipboardList, UsersRound } from 'lucide-react';
import { usePageNav } from '@/features/navigation/PageNavContext';

export function SGDashboardFullView() {
  const { navigateTo } = usePageNav();
  const nfPendente = mockNotasFiscais.filter((n) => n.coluna !== 'recebida').length;
  const nfAtrasada = mockNotasFiscais.filter((n) => n.coluna === 'atrasada').length;
  const divAcessos = mockConciliacaoAcessos.filter((a) => a.duplicado || a.refeitorioDuplicado).length;
  const armariosLivres = mockArmariosMapa.filter(
    (s) => s.status === 'livre' || s.status === 'liberado-desligado'
  ).length;
  const cafeFalha = mockCafeAbastecimento.filter((c) => !c.ok).length;
  const chamadosAlerta = mockChamadosManusis.filter((c) => c.status !== 'ok').length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="NF em aberto (não recebidas)"
          value={nfPendente}
          trend={nfAtrasada > 0 ? 'down' : 'neutral'}
        />
        <KpiCard label="NF em atraso (alerta)" value={nfAtrasada} trend={nfAtrasada > 0 ? 'down' : 'up'} />
        <KpiCard
          label="Divergências Elo/Attos/Refeitório"
          value={divAcessos}
          trend={divAcessos > 0 ? 'down' : 'up'}
        />
        <KpiCard label="Armários livres / liberados" value={armariosLivres} trend="neutral" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-none ">
          <CardHeader className="pb-2">
            <h3 className="font-bold text-lg">Resumo integrado (simulação)</h3>
            <p className="text-sm text-muted-foreground">
              Visão única para finanças e facilities: NFs, Elo/Attos, benefícios e infraestrutura.
            </p>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-3 rounded-radius-m bg-[#0f172a] border border-[#334155]">
              <span className="text-zinc-400">Cruzamento VT × Estacionamento</span>
              <span className="font-bold text-amber-700">
                {mockCruzamentoBeneficios.filter((b) => b.redundancia).length} redundâncias
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-radius-m bg-[#0f172a] border border-[#334155]">
              <span className="text-zinc-400">Satisfação refeição (hoje)</span>
              <span className="font-bold text-emerald-700">{mockSatisfacaoAttos.indicadorDia} / 5</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-radius-m bg-[#0f172a] border border-[#334155]">
              <span className="text-zinc-400">Vouchers Natal emitidos</span>
              <span className="font-bold text-zinc-200">
                {mockVouchersNatal.filter((v) => v.emitido).length} / {mockVouchersNatal.length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none ">
          <CardHeader className="pb-2">
            <h3 className="font-bold text-lg">Próximas ações sugeridas</h3>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-300">
            <p className="flex gap-2">
              <FileWarning className="text-rose-500 shrink-0" size={18} />
              Cobrar {nfAtrasada} nota(s) com fornecedor em atraso.
            </p>
            <p className="flex gap-2">
              <GitMerge className="text-amber-600 shrink-0" size={18} />
              Revisar {divAcessos} linha(s) com duplicidade ou classificação Elo/Posigraf.
            </p>
            <p className="flex gap-2">
              <ClipboardList className="text-rose-600 shrink-0" size={18} />
              {chamadosAlerta} chamado(s) Manusis vencido(s) ou próximo(s) do prazo.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-zinc-200 dark:border-zinc-800">
        <CardContent className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="p-2 rounded-radius-m bg-primary/10 text-primary shrink-0">
              <UsersRound size={18} aria-hidden />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Engajamento</p>
              <p className="font-medium text-zinc-800 dark:text-zinc-100 mt-0.5">
                Próximo café agendado: <span className="text-primary">{mockProximoCafeRoda.quando}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {mockProximoCafeRoda.local} · {mockProximoCafeRoda.tema}
                {cafeFalha > 0 ? ` · ${cafeFalha} ponto(s) de abastecimento pendente(s)` : ''}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('sg-engajamento-cafe')}
            className="shrink-0 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-radius-m bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Abrir painel
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
