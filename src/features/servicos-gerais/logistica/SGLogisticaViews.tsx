import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { KpiCard } from '@/components/dashboard/KpiCard';
import {
  mockCruzamentoBeneficios,
  mockArmariosMapa,
  mockSatisfacaoAttos,
  mockChamadosManusis,
  mockCafeAbastecimento,
} from '@/data/mock/mockServicosGerais';
import { Car, Grid3x3, Smile, ClipboardList, Coffee, CheckCircle2 } from 'lucide-react';

export function SGDashboardLogisticaView() {
  const armariosLivres = mockArmariosMapa.filter(
    (s) => s.status === 'livre' || s.status === 'liberado-desligado'
  ).length;
  const cafeFalha = mockCafeAbastecimento.filter((c) => !c.ok).length;
  const chamadosAlerta = mockChamadosManusis.filter((c) => c.status !== 'ok').length;
  const redundancias = mockCruzamentoBeneficios.filter((b) => b.redundancia).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Armários livres / liberados" value={armariosLivres} trend="neutral" />
        <KpiCard
          label="VT × Estacionamento (alertas)"
          value={redundancias}
          trend={redundancias > 0 ? 'down' : 'up'}
        />
        <KpiCard label="Satisfação refeição (hoje)" value={`${mockSatisfacaoAttos.indicadorDia} / 5`} trend="neutral" />
        <KpiCard label="Chamados fora do prazo" value={chamadosAlerta} trend={chamadosAlerta > 0 ? 'down' : 'up'} />
      </div>

      <Card className="border-none shadow-sm border-emerald-100 bg-emerald-50/30">
        <CardHeader className="pb-2">
          <h3 className="font-bold text-lg text-slate-900">Painel Logística & Facilities</h3>
          <p className="text-sm text-muted-foreground">
            Refeitório, armários, benefícios de deslocamento, café e chamados — sem faturamento financeiro.
          </p>
        </CardHeader>
        <CardContent className="text-sm text-slate-700">
          <p className="flex items-center gap-2">
            <Coffee className="text-emerald-700 shrink-0" size={18} />
            Pontos de café pendentes: <span className="font-bold text-emerald-900">{cafeFalha}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function SGBeneficiosView() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="border-b">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Car className="text-slate-700" size={22} />
          Estacionamento × VT
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Cruzamento das bases para identificar automaticamente quem utiliza os dois benefícios.
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b text-xs uppercase text-muted-foreground">
            <tr>
              <th className="py-3 px-6">Matrícula</th>
              <th className="py-3 px-6">Nome</th>
              <th className="py-3 px-6 text-center">VT</th>
              <th className="py-3 px-6 text-center">Estacionamento</th>
              <th className="py-3 px-6 text-center">Ambos</th>
              <th className="py-3 px-6">Observação</th>
            </tr>
          </thead>
          <tbody>
            {mockCruzamentoBeneficios.map((b) => (
              <tr key={b.matricula} className={`border-b ${b.redundancia ? 'bg-amber-50/50' : ''}`}>
                <td className="py-3 px-6 font-mono text-xs">{b.matricula}</td>
                <td className="py-3 px-6 font-medium">{b.nome}</td>
                <td className="py-3 px-6 text-center">
                  {b.vt ? <CheckCircle2 className="inline text-emerald-600" size={18} /> : '—'}
                </td>
                <td className="py-3 px-6 text-center">
                  {b.estacionamento ? <CheckCircle2 className="inline text-emerald-600" size={18} /> : '—'}
                </td>
                <td className="py-3 px-6 text-center font-bold">{b.redundancia ? 'Sim' : 'Não'}</td>
                <td className="py-3 px-6 text-xs text-slate-600">{b.observacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export function SGArmariosView() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Mapa do vestiário vinculado à base de desligados: armários de ex-colaboradores aparecem como liberados automaticamente.
      </p>
      <div className="flex flex-wrap gap-4 text-xs font-medium">
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-slate-200 border" /> Livre
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-primary/80 border" /> Ocupado
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-emerald-400 border" /> Liberado (desligado)
        </span>
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
        {mockArmariosMapa.map((slot) => (
          <div
            key={slot.id}
            title={slot.colaborador || (slot.status === 'livre' ? 'Livre' : 'Liberado')}
            className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-bold border-2 transition-shadow hover:shadow-md ${
              slot.status === 'livre'
                ? 'bg-slate-100 border-slate-200 text-slate-600'
                : slot.status === 'liberado-desligado'
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                  : 'bg-primary/85 border-primary text-primary-foreground'
            }`}
          >
            <Grid3x3 size={14} className="opacity-60 mb-0.5" />
            {slot.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SGSatisfacaoView() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="border-b flex flex-row items-center gap-2">
        <Smile className="text-yellow-600" size={24} />
        <div>
          <h3 className="font-bold text-lg">Refeitório — satisfação (Attos)</h3>
          <p className="text-sm text-muted-foreground">
            Indicador diário alimentado pela pesquisa, com contagem de refeições — visão operacional.
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-3">
        <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-amber-100">
          <p className="text-xs font-bold text-amber-800 uppercase">Média do dia</p>
          <p className="text-4xl font-black text-slate-900 mt-2">{mockSatisfacaoAttos.indicadorDia}</p>
          <p className="text-xs text-slate-600 mt-2">escala 1–5</p>
        </div>
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase">Refeições contabilizadas</p>
          <p className="text-3xl font-black text-slate-900 mt-2">{mockSatisfacaoAttos.refeicoesContabilizadas}</p>
        </div>
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Última sincronização</p>
          <p className="mt-2 font-mono text-xs">{mockSatisfacaoAttos.ultimaSincronizacao}</p>
          <p className="mt-4 text-xs">{mockSatisfacaoAttos.fonte}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function SGChamadosView() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="border-b flex flex-row items-center gap-2">
        <ClipboardList className="text-rose-600" size={22} />
        <div>
          <h3 className="font-bold text-lg">Chamados (Manusis) — prazos</h3>
          <p className="text-sm text-muted-foreground">Alerta automático de vencido ou próximo do vencimento para cobrança da área.</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b text-xs uppercase text-muted-foreground">
            <tr>
              <th className="py-3 px-6">Chamado</th>
              <th className="py-3 px-6">Área</th>
              <th className="py-3 px-6">Vencimento</th>
              <th className="py-3 px-6">Alerta</th>
            </tr>
          </thead>
          <tbody>
            {mockChamadosManusis.map((c) => (
              <tr
                key={c.id}
                className={`border-b ${c.status === 'vencido' ? 'bg-rose-50/50' : c.status === 'proximo' ? 'bg-amber-50/40' : ''}`}
              >
                <td className="py-3 px-6">
                  <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
                  <p className="font-medium text-slate-900">{c.titulo}</p>
                </td>
                <td className="py-3 px-6">{c.area}</td>
                <td className="py-3 px-6 font-mono text-xs">{c.vencimento}</td>
                <td className="py-3 px-6">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-md ${
                      c.status === 'vencido'
                        ? 'bg-rose-200 text-rose-900'
                        : c.status === 'proximo'
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {c.status === 'vencido' ? 'Vencido' : c.status === 'proximo' ? 'Próximo' : 'No prazo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export function SGCafeView() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="border-b flex flex-row items-center gap-2">
        <Coffee className="text-amber-800" size={22} />
        <div>
          <h3 className="font-bold text-lg">Sociedade do Café — abastecimento</h3>
          <p className="text-sm text-muted-foreground">Leitura do Forms: locais sem registro de abastecimento aparecem no mesmo dia.</p>
        </div>
      </CardHeader>
      <CardContent className="divide-y">
        {mockCafeAbastecimento.map((c) => (
          <div key={c.local} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-semibold text-slate-900">{c.local}</p>
              <p className="text-xs text-muted-foreground">Último abastecimento: {c.ultimoAbastecimento ?? '—'}</p>
            </div>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${c.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}
            >
              {c.ok ? 'OK' : 'Falha / pendente'}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
