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
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={sel}
              onChange={(e) => setSel(Number(e.target.value))}
            >
              {mockVouchersNatal.map((x, i) => (
                <option key={x.id} value={i}>
                  {x.colaborador} — R$ {x.valor}
                </option>
              ))}
            </select>
            <div className="p-4 rounded-xl bg-[#09090b] text-white">
              <p className="text-xs text-zinc-600 uppercase">Payload (simulado)</p>
              <p className="font-mono text-xs break-all mt-2 text-zinc-300">{v.qrPayload}</p>
              <p className="text-xs mt-4 text-zinc-600">Status: {v.emitido ? 'Emitido' : 'Pré-visualização'}</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
            >
              <QrCode size={18} />
              Gerar / baixar QR (demo)
            </button>
          </div>
          <div className="w-full max-w-xs mx-auto lg:mx-0 p-8 rounded-2xl border-4 border-dashed border-red-200 bg-gradient-to-b from-red-50 to-white flex flex-col items-center text-center ">
            <p className="text-xs font-bold text-red-800 uppercase tracking-widest">Posigraf</p>
            <p className="text-lg font-black text-[#e7e5e4] mt-2">Voucher Natal 2026</p>
            <p className="text-3xl font-black text-red-700 mt-4">R$ {v.valor}</p>
            <div className="mt-6 w-36 h-36 bg-[#18181b] border-2 border-[#27272a] rounded-xl flex items-center justify-center">
              <QrCode className="text-zinc-200" size={96} strokeWidth={1} />
            </div>
            <p className="text-[10px] text-zinc-500 mt-4">{v.colaborador}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
