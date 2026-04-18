import { Card, CardContent, CardHeader } from '@/shared/ui/Card';
import { mockVouchersNatal } from '@/infrastructure/mock/mockServicosGerais';
import { Ticket, QrCode } from 'lucide-react';
import { useState } from 'react';

export function SGVoucherView() {
  const [sel, setSel] = useState(0);
  const v = mockVouchersNatal[sel];
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
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-radius-m text-sm font-medium"
            >
              <QrCode size={18} />
              Gerar / baixar QR (demo)
            </button>
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
