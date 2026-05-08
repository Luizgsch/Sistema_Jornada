import { Card, CardContent, CardHeader } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { mockVouchersNatal } from '@/infrastructure/mock/mockServicosGerais';
import { Ticket, QrCode, Loader } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useToast } from '@/shared/ui/Toast';

export function SGVoucherView() {
  const { success } = useToast();
  const [sel, setSel] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [geradosCount, setGeradosCount] = useState(0);
  const [showBatchResult, setShowBatchResult] = useState(false);

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
  );
}
