import { Card, CardContent, CardHeader } from '@/shared/ui/Card';
import { KpiCard } from '@/shared/components/dashboard/KpiCard';
import {
  mockKpiTD,
  mockTreinamentosPresenca,
  mockLotePendente,
  mockTrilhasPorCargo,
  mockSolicitacoesTreinamentoGestor,
  mockComunicadosTD,
  mockConsultoriaInterna,
  mockHistoricoTreinamentos,
} from '@/infrastructure/mock/mockDHO';
import { mockMovimentacoes, mockOperacoesColaboradores } from '@/infrastructure/mock/mockOperacoes';
import {
  QrCode,
  ListChecks,
  Upload,
  FileSpreadsheet,
  Route,
  GitBranch,
  Inbox,
  Megaphone,
  Headphones,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Smartphone,
  Download,
} from 'lucide-react';
import { useState, useRef, useCallback, useMemo } from 'react';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import { useDHOContext } from './DHOContext';
import { Button } from '@/shared/ui/Button';
import { Progress } from '@/shared/ui/Common';
import { useToast } from '@/shared/ui/Toast';
import { delay } from '@/shared/lib/delay';

function QrBadge({ ok }: { ok: boolean }) {
  return (
    <span
      className={
        ok
          ? 'inline-flex items-center px-2.5 py-0.5 rounded-radius-m text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          : 'inline-flex items-center px-2.5 py-0.5 rounded-radius-m text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20'
      }
    >
      {ok ? 'OK' : 'Pendente'}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    concluido:                 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'em-andamento':            'bg-blue-500/10 text-blue-400 border-blue-500/20',
    planejado:                 'bg-zinc-800 text-zinc-400 border-zinc-700',
    ok:                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    vencendo:                  'bg-amber-500/10 text-amber-400 border-amber-500/20',
    pendente:                  'bg-red-500/10 text-red-400 border-red-500/20',
    novo:                      'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'em-andamento-consultoria':'bg-amber-500/10 text-amber-400 border-amber-500/20',
    ativo:                     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    encerrado:                 'bg-zinc-800 text-zinc-500 border-zinc-700',
    alta:                      'bg-red-500/10 text-red-400 border-red-500/20',
    media:                     'bg-amber-500/10 text-amber-400 border-amber-500/20',
    baixa:                     'bg-zinc-800 text-zinc-400 border-zinc-700',
  };
  const labels: Record<string, string> = {
    concluido: 'Concluído',
    'em-andamento': 'Em andamento',
    planejado: 'Planejado',
    ok: 'Em dia',
    vencendo: 'Vencendo',
    pendente: 'Pendente',
    novo: 'Novo',
    ativo: 'Ativo',
    encerrado: 'Encerrado',
    alta: 'Alta',
    media: 'Média',
    baixa: 'Baixa',
  };
  const color = map[status] ?? 'bg-zinc-800 text-zinc-400 border-zinc-700';
  const label = labels[status] ?? status;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-radius-m text-xs font-semibold border ${color}`}>
      {label}
    </span>
  );
}

export function DashboardTDView() {
  const { kpiUpdates } = useDHOContext();
  const totalHoras = mockKpiTD.horaHomemMes + kpiUpdates.horaHomemMes;
  const totalParticipantes = mockKpiTD.participantesMes + kpiUpdates.participantesMes;
  const pctMeta = Math.min(100, Math.round((totalHoras / mockKpiTD.horaHomemMeta) * 100));

  return (
    <div className="space-y-8">
      <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        <KpiCard
          label="Hora-homem de treinamento (mês)"
          value={`${totalHoras.toLocaleString('pt-BR')} h`}
          change={mockKpiTD.variacaoVsMesAnterior}
          trend="up"
        />
        <KpiCard
          label="Meta mensal (progresso)"
          value={`${pctMeta}% da meta`}
          change={Math.abs(pctMeta - 100)}
          trend={pctMeta >= 90 ? 'up' : 'neutral'}
        />
        <KpiCard label="Participantes (mês)" value={String(totalParticipantes)} trend="neutral" />
        <KpiCard label="Treinamentos realizados" value={mockKpiTD.treinamentosRealizados} trend="neutral" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4]">Consolidação automática (simulação)</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Indicador calculado a partir de presenças digitais e lançamentos em lote.
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-44 rounded-radius-m bg-[#0f172a] border border-[#334155] flex items-end gap-1.5 p-4">
              {[42, 55, 48, 62, 58, 71, 68, 74, 80, 85, 78, 88].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2">
                  <div
                    className="w-full rounded-t-radius-s transition-all"
                    style={{ height: `${h}%`, backgroundColor: 'rgba(13,148,136,0.6)' }}
                  />
                  <span className="text-[10px] text-zinc-600">{i + 1}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-600 mt-3 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500 shrink-0" size={13} />
              Dados mockados para demonstração — integração futura com folha e LMS.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4]">Alertas T&D</h3>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex gap-3 p-3 rounded-radius-m bg-amber-500/5 border border-amber-500/15">
              <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="font-semibold text-[#e7e5e4] text-sm">Reciclagens vencendo</p>
                <p className="text-zinc-500 text-xs mt-0.5">14 colaboradores com NR-12 a vencer em 45 dias.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 rounded-radius-m bg-blue-500/5 border border-blue-500/15">
              <Inbox className="text-blue-400 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="font-semibold text-[#e7e5e4] text-sm">Fila de solicitações</p>
                <p className="text-zinc-500 text-xs mt-0.5">6 pedidos de gestores aguardando priorização.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function PresencaDigitalView() {
  const { success } = useToast();
  const [qrStates, setQrStates] = useState<Record<string, { dataUrl: string; participants: string[] }>>({});
  const [generating, setGenerating] = useState<string | null>(null);

  const gerarQr = useCallback(async (treinamentoId: string, titulo: string) => {
    setGenerating(treinamentoId);
    try {
      const qrData = `PRESENCE:${treinamentoId}:${new Date().toISOString()}`;
      const dataUrl = await QRCode.toDataURL(qrData, { width: 200, margin: 1 });
      setQrStates((prev) => ({
        ...prev,
        [treinamentoId]: { dataUrl, participants: [] },
      }));
      success(`QR Gerado`, `QR code para "${titulo}" está pronto para scan.`);
    } catch (err) {
      console.error('Erro ao gerar QR:', err);
    } finally {
      setGenerating(null);
    }
  }, [success]);

  const simularScan = useCallback((treinamentoId: string) => {
    setQrStates((prev) => {
      const current = prev[treinamentoId];
      if (!current) return prev;
      const newParticipants = [...current.participants, `Participante ${current.participants.length + 1}`];
      return {
        ...prev,
        [treinamentoId]: { ...current, participants: newParticipants },
      };
    });
  }, []);

  const downloadQrPdf = useCallback((treinamentoId: string) => {
    try {
      const training = mockTreinamentosPresenca.find((t) => t.id === treinamentoId);
      if (!training || !qrStates[treinamentoId]) return;

      const qrDataUrl = qrStates[treinamentoId].dataUrl;
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      let yPosition = margin;

      // Add title
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const titleLines = doc.splitTextToSize(training.titulo, contentWidth) as string[];
      doc.text(titleLines, margin, yPosition);
      yPosition += titleLines.length * 8 + 5;

      // Add date and location
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100);
      const dataStr: string = String((training as any).data ?? '—');
      const localStr: string = String((training as any).local ?? '—');
      doc.text(dataStr, margin, yPosition, { maxWidth: contentWidth });
      yPosition += 7;
      doc.text(localStr, margin, yPosition, { maxWidth: contentWidth });
      yPosition += 15;

      // Reset text color for QR
      doc.setTextColor(0);

      // Add QR code centered
      const qrSize = 120;
      const qrX = (pageWidth - qrSize) / 2;
      doc.addImage(qrDataUrl, 'PNG', qrX, yPosition, qrSize, qrSize);

      // Download
      doc.save(`treinamento-${treinamentoId}-qr.pdf`);
      success('PDF baixado', `QR code de "${training.titulo}" salvo com sucesso.`);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      success('Erro ao gerar PDF', 'Tente novamente.');
    }
  }, [qrStates, success]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="border-b border-[#334155]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4] flex items-center gap-2">
                <QrCode className="text-blue-400" size={20} />
                Presença digital & checklist
              </h3>
              <p className="text-sm text-zinc-500 mt-1">
                Substitui listas em papel: QR no local + conferência rápida no tablet.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0f172a] text-zinc-500 font-medium text-xs uppercase tracking-widest">
                <tr>
                  <th className="py-4 px-6 border-b border-[#334155]">Treinamento</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Data / Local</th>
                  <th className="py-4 px-6 border-b border-[#334155] text-center">Previstos</th>
                  <th className="py-4 px-6 border-b border-[#334155] text-center">Via QR</th>
                  <th className="py-4 px-6 border-b border-[#334155] text-center">Checklist</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Status</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockTreinamentosPresenca.map((t) => (
                  <tr key={t.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <p className="font-semibold text-[#e7e5e4]">{t.titulo}</p>
                      <p className="text-xs text-zinc-600 mt-0.5">{t.id}</p>
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155] text-zinc-400">
                      {t.data}
                      <br />
                      <span className="text-xs text-zinc-600">{t.local}</span>
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155] text-center font-semibold text-[#e7e5e4]">{t.previstos}</td>
                    <td className="py-4 px-6 border-b border-[#334155] text-center">
                      {qrStates[t.id] ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-radius-m text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                          {qrStates[t.id].participants.length}/{t.previstos}
                        </span>
                      ) : (
                        <QrBadge ok={t.confirmadosQr >= t.previstos - 5} />
                      )}
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155] text-center">
                      {t.checklistPendente === 0 ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                          <ListChecks size={13} /> OK
                        </span>
                      ) : (
                        <span className="text-xs font-semibold neon-error-sm">{t.checklistPendente} pend.</span>
                      )}
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <StatusPill status={t.status} />
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <div className="flex gap-2">
                        {!qrStates[t.id] ? (
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            isLoading={generating === t.id}
                            onClick={() => gerarQr(t.id, t.titulo)}
                            className="text-xs"
                          >
                            <QrCode size={13} />
                            Gerar QR
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => simularScan(t.id)}
                            className="text-xs"
                          >
                            <Smartphone size={13} />
                            Scan
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {Object.entries(qrStates).map(([id, state]) => (
        <Card key={id} className="border-blue-500/30 bg-blue-950/20">
          <CardHeader className="pb-3">
            <h3 className="text-sm font-semibold text-blue-300">QR Code Ativo</h3>
          </CardHeader>
          <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <img src={state.dataUrl} alt="QR Code" className="w-48 h-48 border-2 border-blue-500 p-2 bg-white" />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => downloadQrPdf(id)}
                className="text-xs"
              >
                <Download size={13} />
                Baixar PDF
              </Button>
            </div>
            <div className="flex-1">
              <p className="text-sm text-zinc-400 mb-3">Participantes escaneados:</p>
              <div className="space-y-1">
                {state.participants.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic">Nenhum scan ainda. Clique em "Scan" para simular.</p>
                ) : (
                  state.participants.map((p, idx) => (
                    <div key={idx} className="text-xs text-green-400 flex items-center gap-2">
                      <CheckCircle2 size={12} />
                      {p}
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function LancamentoLoteView() {
  const { addKpiUpdate } = useDHOContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { success, error } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleFile = async (file: File) => {
    setFileName(file.name);
    setUploading(true);
    setUploadProgress(0);
    const progressId = window.setInterval(() => {
      setUploadProgress((p) => (p >= 92 ? p : p + 9));
    }, 100);
    try {
      await delay(1100);
      setUploadProgress(100);
      success('Arquivo recebido', `${file.name} foi validado e está pronto para pré-visualização.`);
    } catch {
      error('Falha no envio', 'Não foi possível processar o arquivo. Tente novamente.');
    } finally {
      window.clearInterval(progressId);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const confirmarLote = async () => {
    setConfirmLoading(true);
    try {
      await delay(900);
      // Calculate KPI updates from batch
      const totalHoras = mockLotePendente.reduce((sum, row) => sum + row.horas, 0);
      const totalParticipantes = mockLotePendente.length;

      // Update KPI
      addKpiUpdate(totalHoras, totalParticipantes);

      success('Lote confirmado', `Registros enviados ao histórico de T&D (+${totalHoras}h, +${totalParticipantes} participantes).`);
    } catch {
      error('Erro ao confirmar', 'Não foi possível gravar o lote.');
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
          e.target.value = '';
        }}
      />
      <div className="bg-[#1e293b] rounded-radius-m border border-dashed border-[#334155] p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-radius-l bg-primary/10 flex items-center justify-center shrink-0">
          {uploading ? (
            <Loader2 className="text-primary animate-spin" size={26} aria-hidden />
          ) : (
            <Upload className="text-primary" size={26} />
          )}
        </div>
        <div className="flex-1 text-center md:text-left min-w-0 w-full">
          <h3 className="font-semibold text-[#e7e5e4] tracking-tighter">Importar planilha de conclusões</h3>
          <p className="text-sm text-zinc-500 mt-1">
            Arraste um .xlsx exportado do checklist ou do fornecedor — o sistema valida duplicidades antes do lançamento em lote.
          </p>
          {uploading && (
            <div className="mt-4 max-w-md mx-auto md:mx-0">
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
                <span>Enviando…</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
          {!uploading && fileName && (
            <p className="text-xs text-zinc-600 mt-2 truncate" title={fileName}>
              Último arquivo: <span className="text-zinc-400 font-mono">{fileName}</span>
            </p>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          className="shrink-0"
          isLoading={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          <FileSpreadsheet size={16} />
          Selecionar arquivo
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-[#334155] pb-4">
          <h3 className="font-semibold text-[#e7e5e4] tracking-tighter">Pré-visualização — lançamento em lote</h3>
          <p className="text-sm text-zinc-500">{mockLotePendente.length} registros prontos para confirmar</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#0f172a] border-b border-[#334155] text-xs uppercase text-zinc-500 font-medium tracking-widest">
                <tr>
                  <th className="py-4 px-6">Matrícula</th>
                  <th className="py-4 px-6">Colaborador</th>
                  <th className="py-4 px-6">Curso</th>
                  <th className="py-4 px-6 text-center">Horas</th>
                  <th className="py-4 px-6">Origem</th>
                </tr>
              </thead>
              <tbody>
                {mockLotePendente.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 border-b border-[#334155] font-mono text-xs text-zinc-600">{row.matricula}</td>
                    <td className="py-4 px-6 border-b border-[#334155] font-semibold text-[#e7e5e4]">{row.nome}</td>
                    <td className="py-4 px-6 border-b border-[#334155] text-zinc-400">{row.curso}</td>
                    <td className="py-4 px-6 border-b border-[#334155] text-center font-bold text-[#e7e5e4]">{row.horas}</td>
                    <td className="py-4 px-6 border-b border-[#334155] text-xs text-zinc-600">{row.origem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-[#334155] flex flex-wrap gap-2 justify-end">
            <Button type="button" variant="ghost" disabled={confirmLoading}>
              Descartar
            </Button>
            <Button type="button" isLoading={confirmLoading} onClick={() => void confirmarLote()}>
              Confirmar lote no histórico T&D
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function TrilhasCargoView() {
  const [colaboradorIdx, setColaboradorIdx] = useState(0);
  const colaborador = mockOperacoesColaboradores[colaboradorIdx];
  const trilha = mockTrilhasPorCargo.find((t) => t.cargo === colaborador.cargo);
  const historicoColab = mockHistoricoTreinamentos.find((h) => h.matricula === colaborador.matricula);

  const calcularStatusCurso = (curso: any) => {
    if (!historicoColab) return 'pendente';
    const cursoConcluido = historicoColab.cursos.find((c) => c.codigo === curso.codigo);
    if (!cursoConcluido) return 'pendente';

    const dataConclusao = new Date(cursoConcluido.dataConclusao);
    const diasParaRreciclagem = curso.reciclagemMeses * 30;
    const proxRecadastre = new Date(dataConclusao);
    proxRecadastre.setDate(proxRecadastre.getDate() + diasParaRreciclagem);

    const agora = new Date();
    const diasRestantes = Math.floor((proxRecadastre.getTime() - agora.getTime()) / (1000 * 60 * 60 * 24));

    if (diasRestantes < 0) return 'vencendo';
    if (diasRestantes < 30) return 'vencendo';
    return 'concluido';
  };

  const cursosConcluidosCount = useMemo(() => {
    if (!trilha) return 0;
    return trilha.cursosObrigatorios.filter(
      (c) => calcularStatusCurso(c) === 'concluido'
    ).length;
  }, [trilha, historicoColab]);

  const recentMovements = useMemo(() => {
    if (!trilha) return [];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return mockMovimentacoes.filter(
      (m) =>
        m.novo === trilha.cargo &&
        new Date(m.data) > thirtyDaysAgo
    );
  }, [trilha]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-radius-m bg-blue-500/10 flex items-center justify-center">
              <Route className="text-blue-400" size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-[#e7e5e4] tracking-tighter">Trilhas e desenvolvimento</h3>
              <p className="text-sm text-zinc-500">
                Veja quais cursos cada colaborador precisa realizar e seu progresso.
              </p>
            </div>
          </div>
          <div className="md:ml-auto w-full md:w-72">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Colaborador</label>
            <select
              className="mt-1 w-full h-10 rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:outline-none focus:border-zinc-600"
              value={colaboradorIdx}
              onChange={(e) => setColaboradorIdx(Number(e.target.value))}
            >
              {mockOperacoesColaboradores.map((c, i) => (
                <option key={c.matricula} value={i}>
                  {c.nome} ({c.cargo})
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {trilha ? (
        <>
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
                <div>
                  <p className="text-xs text-zinc-600 uppercase font-medium tracking-widest">Colaborador</p>
                  <p className="font-semibold text-[#e7e5e4] mt-2">{colaborador.nome}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-600 uppercase font-medium tracking-widest">Cargo</p>
                  <p className="font-semibold text-[#e7e5e4] mt-2">{colaborador.cargo}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-600 uppercase font-medium tracking-widest">Setor</p>
                  <p className="font-semibold text-[#e7e5e4] mt-2">{colaborador.setor}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-600 uppercase font-medium tracking-widest">Progresso</p>
                  <p className="font-semibold text-emerald-400 mt-2">{cursosConcluidosCount} de {trilha.cursosObrigatorios.length} cursos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-[#334155] pb-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-[#e7e5e4] tracking-tighter">Trilha de desenvolvimento — {trilha.cargo}</h3>
                <p className="text-sm text-zinc-500 mt-1">
                  Cursos obrigatórios para o cargo. {cursosConcluidosCount === trilha.cursosObrigatorios.length ? '✓ Todos concluídos!' : `Pendentes: ${trilha.cursosObrigatorios.length - cursosConcluidosCount}`}
                </p>
                {recentMovements.length > 0 && (
                  <div className="flex items-start gap-3 p-3 rounded-radius-m bg-orange-500/10 border border-orange-500/30">
                    <AlertCircle size={18} className="text-orange-400 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold text-orange-400">
                        ⚠️ {recentMovements.length} colaborador{recentMovements.length > 1 ? "es" : ""} movimentado{recentMovements.length > 1 ? "s" : ""} recentemente
                      </p>
                      <p className="text-xs text-orange-300 mt-1">
                        {recentMovements.map((m) => m.nome).join(", ")} {recentMovements.length === 1 ? "precisará" : "precisarão"} dessa trilha de treinamento.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead className="bg-[#0f172a] text-zinc-500 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="py-4 px-6 border-b border-[#334155]">Código</th>
                    <th className="py-4 px-6 border-b border-[#334155]">Curso</th>
                    <th className="py-4 px-6 border-b border-[#334155] text-center">CH</th>
                    <th className="py-4 px-6 border-b border-[#334155] text-center">Reciclagem</th>
                    <th className="py-4 px-6 border-b border-[#334155]">Status</th>
                    {historicoColab && (
                      <th className="py-4 px-6 border-b border-[#334155] text-center">Conclusão</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {trilha.cursosObrigatorios.map((c) => {
                    const status = calcularStatusCurso(c);
                    const cursoConcluido = historicoColab?.cursos.find((h) => h.codigo === c.codigo);
                    return (
                      <tr key={c.codigo} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3 px-6 border-b border-[#334155] font-mono text-xs text-zinc-600">{c.codigo}</td>
                        <td className="py-3 px-6 border-b border-[#334155] font-semibold text-[#e7e5e4]">{c.nome}</td>
                        <td className="py-3 px-6 border-b border-[#334155] text-center text-zinc-400">{c.cargaHoraria}h</td>
                        <td className="py-3 px-6 border-b border-[#334155] text-center text-zinc-600 text-xs">{c.reciclagemMeses} meses</td>
                        <td className="py-3 px-6 border-b border-[#334155]">
                          <StatusPill status={status} />
                        </td>
                        {historicoColab && (
                          <td className="py-3 px-6 border-b border-[#334155] text-center text-xs text-zinc-500">
                            {cursoConcluido ? new Date(cursoConcluido.dataConclusao).toLocaleDateString('pt-BR') : '—'}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-zinc-400">
            <AlertCircle className="inline-block mb-3 text-amber-400" size={24} />
            <p>Nenhuma trilha cadastrada para o cargo "{colaborador.cargo}".</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function TrilhasMovimentacoesView() {
  const [trilhasAplicadas, setTrilhasAplicadas] = useState<Set<number>>(new Set());
  const { addKpiUpdate } = useDHOContext();

  const movimentacoesPendentes = useMemo(() => {
    return mockMovimentacoes.filter((_, i) => !trilhasAplicadas.has(i));
  }, [trilhasAplicadas]);

  const handleAplicarTrilha = useCallback(
    (idx: number) => {
      const movimentacao = mockMovimentacoes[idx];
      const trilha = mockTrilhasPorCargo.find((t) => t.cargo === movimentacao.novo);

      if (trilha) {
        setTrilhasAplicadas((prev) => new Set([...prev, idx]));
        const chTotal = trilha.cursosObrigatorios.reduce((sum, c) => sum + c.cargaHoraria, 0);
        addKpiUpdate(chTotal * 0.3, 1);
      }
    },
    [addKpiUpdate]
  );

  const reciclagens = useMemo(() => {
    return mockTrilhasPorCargo
      .flatMap((trilha) =>
        trilha.cursosObrigatorios.map((curso) => ({
          cargo: trilha.cargo,
          curso: curso.nome,
          reciclagemMeses: curso.reciclagemMeses,
          diasProxRecadastre: Math.floor(
            30 * curso.reciclagemMeses - Math.random() * 60
          ),
        }))
      )
      .filter((r) => r.diasProxRecadastre > 0 && r.diasProxRecadastre < 90)
      .sort((a, b) => a.diasProxRecadastre - b.diasProxRecadastre);
  }, []);

  const cargosSemTrilha = useMemo(() => {
    const cargosComTrilha = new Set(mockTrilhasPorCargo.map((t) => t.cargo));
    return [
      ...new Set(
        mockMovimentacoes
          .map((m) => m.novo)
          .filter((cargo) => !cargosComTrilha.has(cargo))
      ),
    ];
  }, []);

  return (
    <div className="space-y-6">
      {/* Resumo dados */}
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-radius-m flex items-center justify-center shrink-0 ${movimentacoesPendentes.length > 0 ? 'bg-amber-500/20' : 'bg-emerald-500/20'}`}>
                <GitBranch className={movimentacoesPendentes.length > 0 ? 'text-amber-400' : 'text-emerald-400'} size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Pendentes</p>
                <p className="text-2xl font-bold text-[#e7e5e4] mt-1">{movimentacoesPendentes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-radius-m bg-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="text-emerald-400" size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Aplicadas</p>
                <p className="text-2xl font-bold text-[#e7e5e4] mt-1">{trilhasAplicadas.size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-radius-m flex items-center justify-center shrink-0 ${reciclagens.length > 5 ? 'bg-amber-500/20' : 'bg-blue-500/20'}`}>
                <AlertCircle className={reciclagens.length > 5 ? 'text-amber-400' : 'text-blue-400'} size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Próx. Reciclagem</p>
                <p className="text-2xl font-bold text-[#e7e5e4] mt-1">{reciclagens.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-radius-m flex items-center justify-center shrink-0 ${cargosSemTrilha.length > 0 ? 'bg-red-500/20' : 'bg-emerald-500/20'}`}>
                <AlertCircle className={cargosSemTrilha.length > 0 ? 'text-red-400' : 'text-emerald-400'} size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Sem Trilha</p>
                <p className="text-2xl font-bold text-[#e7e5e4] mt-1">{cargosSemTrilha.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Movimentações pendentes */}
      <Card>
        <CardHeader className="border-b border-[#334155] pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[#e7e5e4] tracking-tighter">
                Trilhas para Movimentações — Auto-Aplicação ({movimentacoesPendentes.length})
              </h3>
              <p className="text-sm text-zinc-500 mt-1">
                Quando colaborador é movimentado (HR-1.5), sistema dispara automaticamente trilha de treinamento obrigatória para novo cargo.
              </p>
            </div>
            <div className="shrink-0 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-radius-m">
              <p className="text-xs font-semibold text-emerald-400">✓ Integração ativa</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {movimentacoesPendentes.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-[#0f172a] text-zinc-500 text-xs uppercase tracking-widest">
                <tr>
                  <th className="py-4 px-6 border-b border-[#334155]">Colaborador</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Origem → Destino</th>
                  <th className="py-4 px-6 border-b border-[#334155] text-center">Cursos</th>
                  <th className="py-4 px-6 border-b border-[#334155] text-center">CH Total</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Ação</th>
                </tr>
              </thead>
              <tbody>
                {movimentacoesPendentes.map((m) => {
                  const originalIdx = mockMovimentacoes.indexOf(m);
                  const trilha = mockTrilhasPorCargo.find(
                    (t) => t.cargo === m.novo
                  );
                  const chTotal = trilha
                    ? trilha.cursosObrigatorios.reduce(
                        (sum, c) => sum + c.cargaHoraria,
                        0
                      )
                    : 0;

                  return (
                    <tr key={`${m.nome}-${originalIdx}`} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-6 border-b border-[#334155] font-semibold text-[#e7e5e4]">
                        {m.nome}
                      </td>
                      <td className="py-3 px-6 border-b border-[#334155] text-zinc-400 text-xs">
                        {m.anterior} → {m.novo}
                      </td>
                      <td className="py-3 px-6 border-b border-[#334155] text-center text-zinc-400">
                        {trilha ? trilha.cursosObrigatorios.length : 0}
                      </td>
                      <td className="py-3 px-6 border-b border-[#334155] text-center font-mono text-zinc-400">
                        {chTotal}h
                      </td>
                      <td className="py-3 px-6 border-b border-[#334155]">
                        <button
                          onClick={() => handleAplicarTrilha(originalIdx)}
                          className="px-3 py-1.5 rounded-radius-m bg-purple-500/20 text-purple-400 text-xs font-semibold hover:bg-purple-500/30 transition-colors border border-purple-500/30"
                        >
                          Aplicar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-emerald-400">
              ✓ Nenhuma movimentação pendente. Todas têm trilha aplicada.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reciclagens próximas */}
      {reciclagens.length > 0 && (
        <Card>
          <CardHeader className="border-b border-[#334155] pb-4">
            <h3 className="font-semibold text-[#e7e5e4] tracking-tighter">
              Reciclagens próximas (30–90 dias)
            </h3>
            <p className="text-sm text-zinc-500 mt-1">
              Cursos que vão vencer em breve e precisam de atualização.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-[#0f172a] text-zinc-500 text-xs uppercase tracking-widest">
                <tr>
                  <th className="py-4 px-6 border-b border-[#334155]">Cargo</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Curso</th>
                  <th className="py-4 px-6 border-b border-[#334155] text-center">Dias p/ Reciclagem</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Status</th>
                </tr>
              </thead>
              <tbody>
                {reciclagens.map((r, i) => (
                  <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 px-6 border-b border-[#334155] font-semibold text-[#e7e5e4]">
                      {r.cargo}
                    </td>
                    <td className="py-3 px-6 border-b border-[#334155]">{r.curso}</td>
                    <td className="py-3 px-6 border-b border-[#334155] text-center font-mono font-semibold text-amber-400">
                      {r.diasProxRecadastre}d
                    </td>
                    <td className="py-3 px-6 border-b border-[#334155]">
                      <StatusPill
                        status={
                          r.diasProxRecadastre < 30
                            ? 'vencendo'
                            : 'planejado'
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Cargos sem trilha */}
      {cargosSemTrilha.length > 0 && (
        <Card>
          <CardHeader className="border-b border-[#334155] pb-4">
            <div className="flex items-start gap-3 p-3 rounded-radius-m bg-red-500/10 border border-red-500/30">
              <AlertCircle size={20} className="text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-red-400">
                  {cargosSemTrilha.length} cargo(s) sem trilha definida
                </p>
                <p className="text-xs text-red-300 mt-1">
                  Esses cargos receberam movimentação, mas não têm trilha
                  de treinamento obrigatório cadastrada no sistema.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-2">
              {cargosSemTrilha.map((cargo) => (
                <div
                  key={cargo}
                  className="flex items-center justify-between p-3 rounded-radius-m bg-zinc-800/50 border border-zinc-700"
                >
                  <span className="font-semibold text-[#e7e5e4]">{cargo}</span>
                  <span className="text-xs text-zinc-500">
                    Ação: Criar trilha em "Trilhas por cargo"
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function PortalGestorView() {
  return (
    <Card>
      <CardHeader className="border-b border-[#334155] pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4] flex items-center gap-2">
              <Inbox className="text-blue-400" size={20} />
              Solicitações de treinamento (gestores)
            </h3>
            <p className="text-sm text-zinc-500 mt-1">Protocolo, fila, priorização e histórico.</p>
          </div>
          <Button type="button" className="shrink-0 rounded-radius-m px-4 text-sm font-medium">
            Nova solicitação
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#0f172a] border-b border-[#334155] text-xs uppercase text-zinc-500 font-medium tracking-widest">
              <tr>
                <th className="py-4 px-6">Protocolo</th>
                <th className="py-4 px-6">Solicitante / Setor</th>
                <th className="py-4 px-6">Tema</th>
                <th className="py-4 px-6">Prioridade</th>
                <th className="py-4 px-6 text-center">Fila</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockSolicitacoesTreinamentoGestor.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 px-6 border-b border-[#334155]">
                    <span className="font-mono text-xs font-semibold text-zinc-400">{s.protocolo}</span>
                    <p className="text-xs text-zinc-600 mt-0.5">{s.dataAbertura}</p>
                  </td>
                  <td className="py-3 px-6 border-b border-[#334155]">
                    <p className="font-semibold text-[#e7e5e4]">{s.solicitante}</p>
                    <p className="text-xs text-zinc-600">{s.setor}</p>
                  </td>
                  <td className="py-3 px-6 border-b border-[#334155] text-zinc-400 max-w-xs text-sm">{s.tema}</td>
                  <td className="py-3 px-6 border-b border-[#334155]">
                    <StatusPill status={s.prioridade} />
                  </td>
                  <td className="py-3 px-6 border-b border-[#334155] text-center font-bold text-[#e7e5e4]">{s.posicaoFila || '—'}</td>
                  <td className="py-3 px-6 border-b border-[#334155]">
                    <StatusPill status={s.status} />
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
    <Card>
      <CardHeader className="border-b border-[#334155] pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4] flex items-center gap-2">
              <Megaphone className="text-violet-400" size={20} />
              Comunicados & chamadas (T&D)
            </h3>
            <p className="text-sm text-zinc-500 mt-1">Divulgação, confirmação de presença e acompanhamento em um só fluxo.</p>
          </div>
          <Button type="button" variant="outline" className="rounded-radius-m px-4 text-sm font-medium">
            Novo comunicado
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div>
          {mockComunicadosTD.map((c) => (
            <div key={c.id} className="px-6 py-4 border-b border-[#334155] flex flex-col lg:flex-row lg:items-center gap-4 hover:bg-zinc-800/30 transition-colors last:border-b-0">
              <div className="flex-1">
                <p className="font-semibold text-[#e7e5e4]">{c.titulo}</p>
                <p className="text-xs text-zinc-600 mt-0.5">
                  {c.publicoAlvo} · Enviado em {c.enviadoEm}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div>
                  <p className="text-xs text-zinc-600 uppercase font-medium tracking-widest">Confirmações</p>
                  <p className="font-bold text-[#e7e5e4] text-lg">{c.confirmacoes}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-600 uppercase font-medium tracking-widest">Prazo</p>
                  <p className="font-medium text-zinc-400 text-sm">{c.prazoConfirmacao}</p>
                </div>
                <StatusPill status={c.status} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function DHOGestorTransversalView() {
  const { success, error } = useToast();
  const [temaTreino, setTemaTreino] = useState('');
  const [demandaConsultoria, setDemandaConsultoria] = useState('');
  const [treinoLoading, setTreinoLoading] = useState(false);
  const [consultoriaLoading, setConsultoriaLoading] = useState(false);

  const enviarTreino = async () => {
    setTreinoLoading(true);
    try {
      await delay(750);
      success('Solicitação enviada', 'Seu pedido entrou na fila do DHO (demonstração).');
    } catch {
      error('Envio falhou', 'Tente novamente em instantes.');
    } finally {
      setTreinoLoading(false);
    }
  };

  const abrirConsultoria = async () => {
    setConsultoriaLoading(true);
    try {
      await delay(750);
      success('Chamado registrado', 'Consultoria interna acionada (demonstração).');
    } catch {
      error('Envio falhou', 'Tente novamente em instantes.');
    } finally {
      setConsultoriaLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader className="border-b border-[#334155] pb-4">
          <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4] flex items-center gap-2">
            <Inbox className="text-blue-400" size={20} />
            Solicitar treinamento ao DHO
          </h3>
          <p className="text-sm text-zinc-500 mt-1">
            Protocolo único, fila e priorização — substitui pedidos informais.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Tema / necessidade</label>
            <textarea
              className="mt-1.5 w-full min-h-[100px] rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 py-2 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
              placeholder="Ex.: NR-35 para equipe de manutenção, 12 pessoas, preferência noite..."
              value={temaTreino}
              onChange={(e) => setTemaTreino(e.target.value)}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Público-alvo</label>
              <input
                type="text"
                className="mt-1.5 w-full h-10 rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
                placeholder="Setor ou equipe"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Urgência</label>
              <select className="mt-1.5 w-full h-10 rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:outline-none focus:border-zinc-600">
                <option>Normal</option>
                <option>Média</option>
                <option>Alta</option>
              </select>
            </div>
          </div>
          <Button
            type="button"
            className="w-full sm:w-auto rounded-radius-m py-2.5 px-5"
            isLoading={treinoLoading}
            disabled={consultoriaLoading}
            onClick={() => void enviarTreino()}
          >
            Enviar solicitação
          </Button>
          <p className="text-xs text-zinc-600 flex items-start gap-2">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={13} />
            Demonstração: nenhum dado é gravado.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-[#334155] pb-4">
          <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4] flex items-center gap-2">
            <Headphones className="text-teal-400" size={20} />
            Abrir chamado de consultoria
          </h3>
          <p className="text-sm text-zinc-500 mt-1">
            Mediação e demandas comportamentais com responsável definido e prazo.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Resumo da demanda</label>
            <textarea
              className="mt-1.5 w-full min-h-[100px] rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 py-2 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
              placeholder="Descreva o contexto, envolvidos e o que já foi tentado..."
              value={demandaConsultoria}
              onChange={(e) => setDemandaConsultoria(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Canal anterior (se houver)</label>
            <input
              type="text"
              className="mt-1.5 w-full h-10 rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
              placeholder="WhatsApp, e-mail, conversa informal..."
            />
          </div>
          <Button
            type="button"
            className="w-full sm:w-auto rounded-radius-m py-2.5 px-5"
            isLoading={consultoriaLoading}
            disabled={treinoLoading}
            onClick={() => void abrirConsultoria()}
          >
            Abrir chamado
          </Button>
          <div className="rounded-radius-m bg-[#0f172a] border border-[#334155] p-3 text-xs text-zinc-500">
            <p className="font-semibold text-zinc-300 mb-2">Últimas demandas (mock)</p>
            <ul className="space-y-1">
              {mockConsultoriaInterna.slice(0, 2).map((c) => (
                <li key={c.id}>
                  <span className="font-medium text-zinc-400">{c.titulo}</span>
                  <span className="text-zinc-600"> — {c.status === 'novo' ? 'Novo' : 'Em andamento'}</span>
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
    <Card>
      <CardHeader className="border-b border-[#334155] pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4] flex items-center gap-2">
              <Headphones className="text-teal-400" size={20} />
              Consultoria interna & mediação
            </h3>
            <p className="text-sm text-zinc-500 mt-1">
              Registro formal com histórico, responsável e prazo.
            </p>
          </div>
          <Button type="button" className="rounded-radius-m px-4 text-sm font-medium">
            Abrir solicitação
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-[#0f172a] text-zinc-500 text-xs uppercase tracking-widest">
            <tr>
              <th className="py-4 px-6 border-b border-[#334155]">Demanda</th>
              <th className="py-4 px-6 border-b border-[#334155]">Canal anterior</th>
              <th className="py-4 px-6 border-b border-[#334155]">Responsável</th>
              <th className="py-4 px-6 border-b border-[#334155]">Prazo</th>
              <th className="py-4 px-6 border-b border-[#334155]">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockConsultoriaInterna.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="py-4 px-6 border-b border-[#334155]">
                  <p className="font-semibold text-[#e7e5e4]">{c.titulo}</p>
                  <p className="text-xs text-zinc-600 mt-0.5">{c.solicitante}</p>
                </td>
                <td className="py-4 px-6 border-b border-[#334155] text-zinc-600 text-xs">{c.canalAnterior}</td>
                <td className="py-4 px-6 border-b border-[#334155] text-zinc-400">{c.responsavel}</td>
                <td className="py-4 px-6 border-b border-[#334155] font-mono text-xs text-zinc-600">{c.prazo}</td>
                <td className="py-4 px-6 border-b border-[#334155]">
                  <StatusPill status={c.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
