import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { KpiCard } from '@/components/dashboard/KpiCard';
import {
  mockKpiTD,
  mockTreinamentosPresenca,
  mockLotePendente,
  mockTrilhasPorCargo,
  mockSolicitacoesTreinamentoGestor,
  mockComunicadosTD,
  mockConsultoriaInterna,
} from '@/data/mock/mockDHO';
import {
  QrCode,
  ListChecks,
  Upload,
  FileSpreadsheet,
  Route,
  Inbox,
  Megaphone,
  Headphones,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';

function badgeClass(ok: boolean) {
  return ok
    ? 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800'
    : 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800';
}

export function DashboardTDView() {
  const pctMeta = Math.min(100, Math.round((mockKpiTD.horaHomemMes / mockKpiTD.horaHomemMeta) * 100));
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Hora-homem de treinamento (mês)"
          value={`${mockKpiTD.horaHomemMes.toLocaleString('pt-BR')} h`}
          change={mockKpiTD.variacaoVsMesAnterior}
          trend="up"
        />
        <KpiCard
          label="Meta mensal (progresso)"
          value={`${pctMeta}% da meta`}
          change={Math.abs(pctMeta - 100)}
          trend={pctMeta >= 90 ? 'up' : 'neutral'}
        />
        <KpiCard label="Participantes (mês)" value={mockKpiTD.participantesMes} trend="neutral" />
        <KpiCard label="Treinamentos realizados" value={mockKpiTD.treinamentosRealizados} trend="neutral" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-none shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <h3 className="font-bold text-lg text-slate-900">Consolidação automática (simulação)</h3>
            <p className="text-sm text-muted-foreground">
              Indicador calculado a partir de presenças digitais e lançamentos em lote — elimina somas manuais em planilhas.
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-48 rounded-xl bg-gradient-to-br from-blue-50 to-slate-50 border border-slate-200 flex items-end gap-2 p-4">
              {[42, 55, 48, 62, 58, 71, 68, 74, 80, 85, 78, 88].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2">
                  <div className="w-full bg-primary/80 rounded-t-md transition-all" style={{ height: `${h}%` }} />
                  <span className="text-[10px] text-slate-400">{i + 1}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500 shrink-0" size={14} />
              Dados mockados para demonstração — integração futura com folha e LMS.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <h3 className="font-bold text-lg text-slate-900">Alertas T&D</h3>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
              <AlertCircle className="text-amber-600 shrink-0" size={18} />
              <div>
                <p className="font-semibold text-slate-800">Reciclagens vencendo</p>
                <p className="text-slate-600 text-xs mt-0.5">14 colaboradores com NR-12 a vencer em 45 dias.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <Inbox className="text-blue-600 shrink-0" size={18} />
              <div>
                <p className="font-semibold text-slate-800">Fila de solicitações</p>
                <p className="text-slate-600 text-xs mt-0.5">6 pedidos de gestores aguardando priorização.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function PresencaDigitalView() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              <QrCode className="text-blue-500" size={22} />
              Presença digital & checklist
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Substitui listas em papel: QR no local + conferência rápida no tablet.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium shadow-sm"
          >
            <QrCode size={16} />
            Gerar QR do treinamento
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-y border-slate-200 text-muted-foreground font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Treinamento</th>
                <th className="py-3 px-6">Data / Local</th>
                <th className="py-3 px-6 text-center">Previstos</th>
                <th className="py-3 px-6 text-center">Via QR</th>
                <th className="py-3 px-6 text-center">Checklist</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTreinamentosPresenca.map((t) => (
                <tr key={t.id} className="border-b hover:bg-slate-50/60">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-slate-900">{t.titulo}</p>
                    <p className="text-xs text-muted-foreground">{t.id}</p>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    {t.data}
                    <br />
                    <span className="text-xs text-muted-foreground">{t.local}</span>
                  </td>
                  <td className="py-4 px-6 text-center font-medium">{t.previstos}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={badgeClass(t.confirmadosQr >= t.previstos - 5)}>{t.confirmadosQr}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {t.checklistPendente === 0 ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-medium">
                        <ListChecks size={14} /> OK
                      </span>
                    ) : (
                      <span className="text-rose-700 text-xs font-medium">{t.checklistPendente} pend.</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-md ${
                        t.status === 'concluido'
                          ? 'bg-emerald-100 text-emerald-800'
                          : t.status === 'em-andamento'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {t.status === 'concluido' ? 'Concluído' : t.status === 'em-andamento' ? 'Em andamento' : 'Planejado'}
                    </span>
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

export function LancamentoLoteView() {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm border-dashed border-2 border-slate-200">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Upload className="text-primary" size={28} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-lg text-slate-900">Importar planilha de conclusões</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Arraste um .xlsx exportado do checklist ou do fornecedor — o sistema valida duplicidades antes do lançamento em lote.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium"
          >
            <FileSpreadsheet size={18} />
            Selecionar arquivo
          </button>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="border-b">
          <h3 className="font-bold text-lg">Pré-visualização — lançamento em lote</h3>
          <p className="text-sm text-muted-foreground">{mockLotePendente.length} registros prontos para confirmar</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b text-xs uppercase text-muted-foreground font-medium">
                <tr>
                  <th className="py-3 px-6">Matrícula</th>
                  <th className="py-3 px-6">Colaborador</th>
                  <th className="py-3 px-6">Curso</th>
                  <th className="py-3 px-6 text-center">Horas</th>
                  <th className="py-3 px-6">Origem</th>
                </tr>
              </thead>
              <tbody>
                {mockLotePendente.map((row, i) => (
                  <tr key={i} className="border-b hover:bg-slate-50/50">
                    <td className="py-3 px-6 font-mono text-xs">{row.matricula}</td>
                    <td className="py-3 px-6 font-medium">{row.nome}</td>
                    <td className="py-3 px-6 text-slate-600">{row.curso}</td>
                    <td className="py-3 px-6 text-center">{row.horas}</td>
                    <td className="py-3 px-6 text-xs text-muted-foreground">{row.origem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t flex flex-wrap gap-2 justify-end">
            <button type="button" className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50">
              Descartar
            </button>
            <button type="button" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
              Confirmar lote no histórico T&D
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function TrilhasCargoView() {
  const [cargoIdx, setCargoIdx] = useState(0);
  const row = mockTrilhasPorCargo[cargoIdx];
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center">
              <Route className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Trilha automática por cargo</h3>
              <p className="text-sm text-muted-foreground">
                Simula “movimentou → sistema exige cursos obrigatórios e reciclagens”.
              </p>
            </div>
          </div>
          <div className="md:ml-auto w-full md:w-72">
            <label className="text-xs font-bold text-slate-500 uppercase">Cargo alvo</label>
            <select
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={cargoIdx}
              onChange={(e) => setCargoIdx(Number(e.target.value))}
            >
              {mockTrilhasPorCargo.map((c, i) => (
                <option key={c.cargo} value={i}>
                  {c.cargo}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="border-b flex flex-row items-center justify-between">
          <div>
            <h3 className="font-bold">Cursos obrigatórios — {row.cargo}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Pendentes pós-movimentação interna:{' '}
              <span className="font-semibold text-amber-700">{row.pendentesPosMovimentacao}</span>
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-3 px-6">Código</th>
                <th className="py-3 px-6">Curso</th>
                <th className="py-3 px-6 text-center">CH</th>
                <th className="py-3 px-6 text-center">Reciclagem</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {row.cursosObrigatorios.map((c) => (
                <tr key={c.codigo} className="border-b hover:bg-slate-50/50">
                  <td className="py-3 px-6 font-mono text-xs">{c.codigo}</td>
                  <td className="py-3 px-6 font-medium">{c.nome}</td>
                  <td className="py-3 px-6 text-center">{c.cargaHoraria}h</td>
                  <td className="py-3 px-6 text-center text-muted-foreground">{c.reciclagemMeses} meses</td>
                  <td className="py-3 px-6">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-md ${
                        c.status === 'ok'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.status === 'vencendo'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {c.status === 'ok' ? 'Em dia' : c.status === 'vencendo' ? 'Vencendo' : 'Pendente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

export function PortalGestorView() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Inbox className="text-blue-500" size={22} />
            Solicitações de treinamento (gestores)
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Protocolo, fila, priorização e histórico — fim do pedido por WhatsApp solto.</p>
        </div>
        <button type="button" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium shrink-0">
          Nova solicitação (gestor)
        </button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b text-xs uppercase text-muted-foreground font-medium">
              <tr>
                <th className="py-3 px-6">Protocolo</th>
                <th className="py-3 px-6">Solicitante / Setor</th>
                <th className="py-3 px-6">Tema</th>
                <th className="py-3 px-6">Prioridade</th>
                <th className="py-3 px-6 text-center">Fila</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockSolicitacoesTreinamentoGestor.map((s) => (
                <tr key={s.id} className="border-b hover:bg-slate-50/50">
                  <td className="py-3 px-6">
                    <span className="font-mono text-xs font-semibold">{s.protocolo}</span>
                    <p className="text-xs text-muted-foreground">{s.dataAbertura}</p>
                  </td>
                  <td className="py-3 px-6">
                    <p className="font-medium">{s.solicitante}</p>
                    <p className="text-xs text-slate-500">{s.setor}</p>
                  </td>
                  <td className="py-3 px-6 text-slate-700 max-w-xs">{s.tema}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-md ${
                        s.prioridade === 'alta'
                          ? 'bg-rose-100 text-rose-800'
                          : s.prioridade === 'media'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {s.prioridade}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center font-bold text-slate-800">{s.posicaoFila || '—'}</td>
                  <td className="py-3 px-6">
                    <span className="text-xs font-medium px-2 py-1 rounded-md bg-blue-50 text-blue-800 capitalize">{s.status.replace('-', ' ')}</span>
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

export function ComunicadosTDView() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Megaphone className="text-violet-500" size={22} />
            Comunicados & chamadas (T&D)
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Divulgação, confirmação de presença e acompanhamento em um só fluxo.</p>
        </div>
        <button type="button" className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50">
          Novo comunicado
        </button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {mockComunicadosTD.map((c) => (
            <div key={c.id} className="p-6 flex flex-col lg:flex-row lg:items-center gap-4 hover:bg-slate-50/40">
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{c.titulo}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {c.publicoAlvo} · Enviado em {c.enviadoEm}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Confirmações</p>
                  <p className="font-bold text-slate-800">{c.confirmacoes}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Prazo</p>
                  <p className="font-medium text-slate-700">{c.prazoConfirmacao}</p>
                </div>
                <div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-md ${
                      c.status === 'ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {c.status === 'ativo' ? 'Ativo' : 'Encerrado'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/** Visão transversal para Financeiro e Logística: apenas solicitar treinamento e abrir consultoria. */
export function DHOGestorTransversalView() {
  const [temaTreino, setTemaTreino] = useState('');
  const [demandaConsultoria, setDemandaConsultoria] = useState('');

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-none shadow-sm border-blue-200/60 bg-gradient-to-br from-blue-50/80 to-white">
        <CardHeader className="border-b border-blue-100">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Inbox className="text-blue-600" size={22} />
            Solicitar treinamento ao DHO
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Protocolo único, fila e priorização — substitui pedidos informais por canais paralelos.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Tema / necessidade</label>
            <textarea
              className="mt-1.5 w-full min-h-[100px] rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
              placeholder="Ex.: NR-35 para equipe de manutenção, 12 pessoas, preferência noite..."
              value={temaTreino}
              onChange={(e) => setTemaTreino(e.target.value)}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Público-alvo</label>
              <input
                type="text"
                className="mt-1.5 w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                placeholder="Setor ou equipe"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Urgência</label>
              <select className="mt-1.5 w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                <option>Normal</option>
                <option>Média</option>
                <option>Alta</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold shadow-sm"
          >
            Enviar solicitação
          </button>
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={14} />
            Demonstração: nenhum dado é gravado. Em produção, o protocolo apareceria na fila do DHO.
          </p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm border-teal-200/60 bg-gradient-to-br from-teal-50/80 to-white">
        <CardHeader className="border-b border-teal-100">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Headphones className="text-teal-600" size={22} />
            Abrir chamado de consultoria
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Mediação e demandas comportamentais com responsável definido e prazo — rastreio centralizado.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Resumo da demanda</label>
            <textarea
              className="mt-1.5 w-full min-h-[100px] rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
              placeholder="Descreva o contexto, envolvidos e o que já foi tentado..."
              value={demandaConsultoria}
              onChange={(e) => setDemandaConsultoria(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Canal anterior (se houver)</label>
            <input
              type="text"
              className="mt-1.5 w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
              placeholder="WhatsApp, e-mail, conversa informal..."
            />
          </div>
          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-700 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-teal-800 transition-colors"
          >
            Abrir chamado
          </button>
          <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 text-xs text-slate-600">
            <p className="font-semibold text-slate-800 mb-2">Últimas demandas (mock)</p>
            <ul className="space-y-1">
              {mockConsultoriaInterna.slice(0, 2).map((c) => (
                <li key={c.id}>
                  <span className="font-medium text-slate-800">{c.titulo}</span>
                  <span className="text-muted-foreground"> — {c.status === 'novo' ? 'Novo' : 'Em andamento'}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ConsultoriaInternaView() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Headphones className="text-teal-600" size={22} />
            Consultoria interna & mediação
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Registro formal com histórico, responsável e prazo — substitui filas em WhatsApp/Teams soltos.
          </p>
        </div>
        <button type="button" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
          Abrir solicitação
        </button>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b text-xs uppercase text-muted-foreground">
            <tr>
              <th className="py-3 px-6">Demanda</th>
              <th className="py-3 px-6">Canal anterior</th>
              <th className="py-3 px-6">Responsável</th>
              <th className="py-3 px-6">Prazo</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockConsultoriaInterna.map((c) => (
              <tr key={c.id} className="border-b hover:bg-slate-50/50">
                <td className="py-4 px-6">
                  <p className="font-medium text-slate-900">{c.titulo}</p>
                  <p className="text-xs text-muted-foreground">{c.solicitante}</p>
                </td>
                <td className="py-4 px-6 text-slate-600">{c.canalAnterior}</td>
                <td className="py-4 px-6 text-slate-700">{c.responsavel}</td>
                <td className="py-4 px-6 font-mono text-xs">{c.prazo}</td>
                <td className="py-4 px-6">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-md ${
                      c.status === 'novo' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {c.status === 'novo' ? 'Novo' : 'Em andamento'}
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
