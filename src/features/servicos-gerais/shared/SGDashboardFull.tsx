import { Card, CardContent, CardHeader } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
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
import { FileWarning, GitMerge, ClipboardList, UsersRound, Cake, LayoutGrid } from 'lucide-react';
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

      <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
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
        </div>

        <aside className="lg:col-span-4 space-y-3 lg:max-w-none">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 px-0.5">
            Acontece na empresa
          </p>
          <Card importance="low" className="border-zinc-200/90 dark:border-zinc-700/40">
            <CardContent className="pt-4 pb-4 space-y-3">
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="p-1.5 rounded-radius-m bg-zinc-200/70 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 shrink-0">
                  <UsersRound size={16} strokeWidth={1.5} aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
                    Café
                  </p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100 leading-snug mt-0.5">
                    Próximo: <span className="text-zinc-600 dark:text-zinc-400">{mockProximoCafeRoda.quando}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                    {mockProximoCafeRoda.local} · {mockProximoCafeRoda.tema}
                    {cafeFalha > 0 ? ` · ${cafeFalha} pendente(s)` : ''}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                importance="low"
                size="sm"
                className="w-full"
                onClick={() => navigateTo('sg-engajamento-cafe')}
              >
                Abrir painel do café
              </Button>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="ghost"
              importance="low"
              size="sm"
              className="justify-start gap-1.5 h-auto py-2 px-2.5 font-normal text-xs"
              onClick={() => navigateTo('sg-engajamento-aniversariantes')}
            >
              <Cake size={14} strokeWidth={1.5} className="shrink-0 text-zinc-500" aria-hidden />
              Aniversariantes
            </Button>
            <Button
              type="button"
              variant="ghost"
              importance="low"
              size="sm"
              className="justify-start gap-1.5 h-auto py-2 px-2.5 font-normal text-xs"
              onClick={() => navigateTo('sg-engajamento-mural')}
            >
              <LayoutGrid size={14} strokeWidth={1.5} className="shrink-0 text-zinc-500" aria-hidden />
              Mural
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
