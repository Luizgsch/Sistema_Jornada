import { useMemo, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { delay } from "@/shared/lib/delay";
import { useToast } from "@/shared/ui/Toast";
import { Card, CardContent } from "@/shared/ui/Card";
import {
  ArrowRightLeft,
  TrendingUp,
  History,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import type { Movimentacao } from "@/infrastructure/mock/mockOperacoes";
import { mockMovimentacoes } from "@/infrastructure/mock/mockOperacoes";
import { PageHeader } from "@/shared/ui/PageHeader";
import { FiltersBar } from "@/shared/ui/FiltersBar";
import { Modal } from "@/shared/ui/Modal";
import { MovementCard } from "./MovementCard";

function monthSectionTitle(isoDate: string) {
  const d = new Date(`${isoDate}T12:00:00`);
  const raw = d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function groupMovimentacoesByMonth(movs: Movimentacao[]) {
  const sorted = [...movs].sort((a, b) => b.data.localeCompare(a.data));
  const chunks: { key: string; title: string; items: Movimentacao[] }[] = [];
  for (const m of sorted) {
    const key = m.data.slice(0, 7);
    const last = chunks[chunks.length - 1];
    if (last?.key === key) {
      last.items.push(m);
    } else {
      chunks.push({ key, title: monthSectionTitle(m.data), items: [m] });
    }
  }
  return chunks;
}

export default function MovimentacoesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { success, error } = useToast();

  const groupedMovimentacoes = useMemo(() => groupMovimentacoesByMonth(mockMovimentacoes), []);

  const stats = {
    total: mockMovimentacoes.length,
    promocoes: mockMovimentacoes.filter(m => m.tipo === "Promoção").length,
    transferencias: mockMovimentacoes.filter(m => m.tipo === "Transferência").length,
  };


  return (
    <div className="h-full flex flex-col space-y-6">
      <PageHeader 
        title="Movimentações Internas" 
        description="Histórico cronológico de mudanças de cargo, transferências e promoções estruturais da empresa."
        actionLabel="Registrar Alteração"
        onAction={() => setIsModalOpen(true)}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MovMetricCard title="Total no Mês" value={stats.total} icon={History} color="text-[#e7e5e4]" />
        <MovMetricCard title="Promoções" value={stats.promocoes} icon={TrendingUp} color="text-emerald-500" />
        <MovMetricCard title="Transferências" value={stats.transferencias} icon={ArrowRightLeft} color="text-blue-500" />
      </div>

      <FiltersBar searchPlaceholder="Buscar no histórico de movimentações..." />

      {/* Vertical Timeline UI — cards com divulgação progressiva */}
      <div className="relative rounded-radius-l border border-[#334155] bg-[#1e293b] p-8 sm:p-11">
        <div className="absolute bottom-10 left-10 top-10 w-px bg-zinc-700 sm:left-14" />

        <div className="space-y-14">
          {groupedMovimentacoes.map((group) => (
            <section key={group.key} aria-labelledby={`mov-month-${group.key}`}>
              <h2
                id={`mov-month-${group.key}`}
                className="mb-6 ml-10 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:ml-16"
              >
                {group.title}
              </h2>
              <div className="space-y-8">
                {group.items.map((mov) => (
                  <div key={mov.id} className="group/timeline relative flex items-start gap-6">
                    <div className="absolute left-2 top-5 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-[#334155] bg-[#1e293b] transition-all group-hover/timeline:scale-110 group-hover/timeline:border-primary sm:left-6">
                      <Clock
                        size={14}
                        className="text-zinc-600 transition-colors group-hover/timeline:text-primary"
                      />
                    </div>
                    <div className="ml-10 min-w-0 flex-1 sm:ml-16">
                      <MovementCard mov={mov} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="p-8 bg-[#0f172a] rounded-radius-l text-white relative overflow-hidden ">
         <div className="absolute top-0 right-0 p-12 -mt-10 opacity-10">
            <TrendingUp size={120} />
         </div>
         <div className="relative max-w-lg">
            <h3 className="text-2xl font-bold">Análise de Headcount e Turnover</h3>
            <p className="text-zinc-600 mt-2 leading-relaxed">
              O sistema detectou que 85% das movimentações deste mês foram promoções internas, indicando um forte índice de retenção e crescimento de talentos.
            </p>
            <button className="mt-6 px-6 py-3 bg-[#1e293b] text-[#e7e5e4] rounded-radius-m font-bold hover:bg-zinc-800 transition-all flex items-center gap-2">
               Ver Relatório Completo
               <ArrowUpRight size={18} />
            </button>
         </div>
      </div>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Registrar Movimentação"
        description="Atualize o cargo, setor ou salário de um colaborador ativo."
        footer={
          <>
            <Button
              variant="ghost"
              type="button"
              disabled={confirmLoading}
              onClick={() => setIsModalOpen(false)}
              className="font-bold rounded-radius-m"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="font-bold rounded-radius-m"
              isLoading={confirmLoading}
              onClick={async () => {
                setConfirmLoading(true);
                try {
                  await delay(800);
                  success("Movimentação Registrada", "O histórico do colaborador foi atualizado e os aditivos contratuais gerados.");
                  setIsModalOpen(false);
                } catch {
                  error("Erro", "Não foi possível registrar a movimentação.");
                } finally {
                  setConfirmLoading(false);
                }
              }}
            >
              Confirmar Alteração
            </Button>
          </>
        }
      >
        <div className="space-y-4">
           <div>
             <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Matrícula do Colaborador</label>
             <input type="text" className="w-full h-10 border border-[#334155] rounded-radius-m px-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Ex: MAT-12345" />
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Novo Cargo</label>
               <input type="text" className="w-full h-10 border border-[#334155] rounded-radius-m px-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Opcional" />
             </div>
             <div>
               <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Novo Setor</label>
               <input type="text" className="w-full h-10 border border-[#334155] rounded-radius-m px-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Opcional" />
             </div>
           </div>
           <div>
             <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Justificativa / Observações</label>
             <textarea className="w-full min-h-[80px] border border-[#334155] rounded-radius-m p-3 focus:ring-2 focus:ring-primary/20 outline-none resize-none" placeholder="Motivo da movimentação..."></textarea>
           </div>
        </div>
      </Modal>
    </div>
  );
}

function MovMetricCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="border-none  h-full hover: transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
           <div className={`p-3 rounded-radius-l bg-zinc-800 ${color} `}>
             <Icon size={24} />
           </div>
           <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">{title}</p>
              <h4 className="text-3xl font-black text-[#e7e5e4]">{value}</h4>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
