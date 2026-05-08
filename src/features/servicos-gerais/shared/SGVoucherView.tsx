import { Card, CardContent, CardHeader } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { mockVouchersNatal } from '@/infrastructure/mock/mockServicosGerais';
import { Ticket, QrCode, Loader, MessageCircle, CheckSquare2, Square } from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import { useToast } from '@/shared/ui/Toast';
import { cn } from '@/shared/lib/cn';

function EnviarVoucherModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { success } = useToast();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filtroArea, setFiltroArea] = useState<string>('todas');
  const [enviando, setEnviando] = useState(false);

  const areas = useMemo(
    () => ['todas', ...Array.from(new Set(mockVouchersNatal.map((v) => v.setor)))],
    []
  );

  const colaboradoresFiltrados = useMemo(
    () =>
      filtroArea === 'todas'
        ? mockVouchersNatal
        : mockVouchersNatal.filter((v) => v.setor === filtroArea),
    [filtroArea]
  );

  const todosSelecAarea = useMemo(
    () =>
      selectedIds.length === colaboradoresFiltrados.length &&
      colaboradoresFiltrados.length > 0,
    [selectedIds, colaboradoresFiltrados]
  );

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (todosSelecAarea) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !colaboradoresFiltrados.map((c) => c.id).includes(id)
        )
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([
          ...prev,
          ...colaboradoresFiltrados.map((c) => c.id),
        ]),
      ]);
    }
  }, [todosSelecAarea, colaboradoresFiltrados]);

  const handleEnviar = useCallback(async () => {
    if (selectedIds.length === 0) return;
    setEnviando(true);
    await new Promise((r) => setTimeout(r, 1500));
    setEnviando(false);
    success(
      'Vouchers enviados!',
      `${selectedIds.length} vouchers enviados por WhatsApp.`
    );
    setSelectedIds([]);
    setFiltroArea('todas');
    onClose();
  }, [selectedIds.length, success, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enviar Vouchers de Natal por WhatsApp"
      description="Selecione os colaboradores para receber o voucher digital por WhatsApp"
      maxWidth="lg"
      footer={
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {selectedIds.length} colaborador(es) selecionado(s)
          </p>
          <Button
            onClick={handleEnviar}
            disabled={selectedIds.length === 0 || enviando}
            variant="primary"
          >
            {enviando ? (
              <>
                <Loader size={16} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <MessageCircle size={16} />
                Enviar por WhatsApp
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Filtro por Área */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">
            Filtrar por Área
          </label>
          <div className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setFiltroArea(area)}
                className={cn(
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  filtroArea === area
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600'
                )}
              >
                {area === 'todas' ? 'Todas' : area}
              </button>
            ))}
          </div>
        </div>

        {/* Select All Header */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
          <button
            onClick={toggleSelectAll}
            className="transition-colors hover:opacity-75"
          >
            {todosSelecAarea ? (
              <CheckSquare2 size={20} className="text-blue-600" />
            ) : (
              <Square size={20} className="text-zinc-400" />
            )}
          </button>
          <label className="flex-1 cursor-pointer select-none">
            <p className="font-medium text-sm">
              Selecionar todos{' '}
              {filtroArea === 'todas'
                ? `(${colaboradoresFiltrados.length})`
                : `da área (${colaboradoresFiltrados.length})`}
            </p>
          </label>
        </div>

        {/* Lista de Colaboradores */}
        <div className="max-h-80 overflow-y-auto space-y-1 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2">
          {colaboradoresFiltrados.map((v) => {
            const isSelected = selectedIds.includes(v.id);
            const initials = v.colaborador
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <button
                key={v.id}
                onClick={() => toggleSelect(v.id)}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer',
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/30'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                )}
              >
                {isSelected ? (
                  <CheckSquare2 size={18} className="text-blue-600 flex-shrink-0" />
                ) : (
                  <Square size={18} className="text-zinc-300 dark:text-zinc-600 flex-shrink-0" />
                )}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {initials}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{v.colaborador}</p>
                  <p className="text-xs text-muted-foreground">
                    {v.setor} • {v.telefone}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {colaboradoresFiltrados.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            Nenhum colaborador nesta área
          </p>
        )}
      </div>
    </Modal>
  );
}

export function SGVoucherView() {
  const { success } = useToast();
  const [sel, setSel] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [geradosCount, setGeradosCount] = useState(0);
  const [showBatchResult, setShowBatchResult] = useState(false);
  const [showEnviarModal, setShowEnviarModal] = useState(false);

  const v = mockVouchersNatal[sel];
  const totalVouchers = mockVouchersNatal.length;
  const progress = Math.round((geradosCount / totalVouchers) * 100);

  const handleGerarTodos = useCallback(async () => {
    setIsGenerating(true);
    setGeradosCount(0);
    setShowBatchResult(false);

    for (let i = 0; i < totalVouchers; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setGeradosCount(i + 1);
    }

    setIsGenerating(false);
    setShowBatchResult(true);
    success(`✓ ${totalVouchers} vouchers gerados com sucesso!`);
  }, [totalVouchers, success]);

  const handleBaixarPdf = () => {
    const csv = [
      ['Colaborador', 'Valor', 'ID'].join(','),
      ...mockVouchersNatal.map((v) => [v.colaborador, v.valor, v.id].join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'vouchers-natal-2026.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success(`📥 Vouchers baixados!`);
  };

  return (
    <>
      <EnviarVoucherModal
        isOpen={showEnviarModal}
        onClose={() => setShowEnviarModal(false)}
      />
      <div className="space-y-6">
      <Card className="border-none ">
        <CardHeader className="border-b">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Ticket className="text-red-600" size={22} />
            Voucher digital de Natal
          </h3>
          <p className="text-sm text-muted-foreground">
            Modelo com QR Code para validação segura e distribuição padronizada (protótipo visual).
          </p>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4 w-full max-w-md">
            <label className="text-xs font-bold text-zinc-500 uppercase">Colaborador</label>
            <select
              className="w-full h-10 rounded-radius-s border border-input bg-background px-3 text-sm"
              value={sel}
              onChange={(e) => setSel(Number(e.target.value))}
              disabled={isGenerating}
            >
              {mockVouchersNatal.map((x, i) => (
                <option key={x.id} value={i}>
                  {x.colaborador} — R$ {x.valor}
                </option>
              ))}
            </select>
            <div className="p-4 rounded-radius-m bg-[#0f172a] text-white border border-[#334155]">
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Payload (simulado)</p>
              <p className="font-mono text-xs break-all mt-2 text-slate-200">{v.qrPayload}</p>
              <p className="text-xs mt-4 text-slate-500 dark:text-slate-400">Status: {v.emitido ? 'Emitido' : 'Pré-visualização'}</p>
            </div>
            <div className="space-y-2">
              <Button className="w-full" disabled={isGenerating}>
                <QrCode size={18} />
                Gerar / baixar QR (demo)
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleGerarTodos}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Gerando... {geradosCount}/{totalVouchers}
                  </>
                ) : (
                  <>📦 Gerar todos em lote</>
                )}
              </Button>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => setShowEnviarModal(true)}
              >
                <MessageCircle size={18} />
                Enviar por WhatsApp
              </Button>
            </div>

            {isGenerating && (
              <div className="space-y-2">
                <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-400 text-center">
                  {geradosCount}/{totalVouchers} vouchers processados ({progress}%)
                </p>
              </div>
            )}

            {showBatchResult && (
              <Button
                variant="primary"
                className="w-full animate-pulse"
                onClick={handleBaixarPdf}
              >
                📥 Baixar PDF com todos os vouchers
              </Button>
            )}
          </div>
          <div className="w-full max-w-xs mx-auto lg:mx-0 p-8 rounded-radius-l border-4 border-dashed border-red-200 dark:border-red-900/55 bg-gradient-to-b from-red-50 to-white dark:from-[#1e293b] dark:to-[#0f172a] flex flex-col items-center text-center">
            <p className="text-xs font-bold text-red-800 dark:text-red-300 uppercase tracking-widest">Posigraf</p>
            <p className="text-lg font-black text-zinc-900 dark:text-[#f8fafc] mt-2">Voucher Natal 2026</p>
            <p className="text-3xl font-black text-red-700 dark:text-red-400 mt-4">R$ {v.valor}</p>
            <div className="mt-6 w-36 h-36 bg-[#1e293b] border-2 border-[#334155] rounded-radius-m flex items-center justify-center">
              <QrCode className="text-slate-200" size={96} strokeWidth={1} />
            </div>
            <p className="text-[10px] text-zinc-600 dark:text-slate-300 font-medium mt-4">{v.colaborador}</p>
          </div>
        </CardContent>
      </Card>
    </div>
      </>
  );
}
