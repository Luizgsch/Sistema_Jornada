import { useState } from "react";
import { Card, CardContent } from "@/shared/ui/Card";
import { 
  ArrowRightLeft, 
  TrendingUp, 
  History,
  FileText,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { mockMovimentacoes } from "@/infrastructure/mock/mockOperacoes";
import { PageHeader } from "@/shared/ui/PageHeader";
import { FiltersBar } from "@/shared/ui/FiltersBar";
import { Modal } from "@/shared/ui/Modal";
import { useToast } from "@/shared/ui/Toast";

export default function MovimentacoesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { success } = useToast();

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

      {/* Vertical Timeline UI */}
      <div className="bg-[#18181b] rounded-2xl border border-[#27272a]  p-6 sm:p-10 relative">
         <div className="absolute left-10 sm:left-14 top-10 bottom-10 w-px bg-zinc-700" />
         
         <div className="space-y-12">
            {mockMovimentacoes.map((mov) => (
             <div key={mov.id} className="relative flex items-start gap-6 group">
                <div className="absolute left-2 sm:left-6 w-8 h-8 rounded-full bg-[#18181b] border border-[#27272a]  flex items-center justify-center -translate-x-1/2 mt-1 z-10 group-hover:scale-110 group-hover:border-primary transition-all">
                   <Clock size={14} className="text-zinc-600 group-hover:text-primary transition-colors" />
                </div>
                
                <div className="ml-10 sm:ml-16 flex-1 bg-[#09090b] border border-[#27272a] rounded-2xl p-6 transition-all group-hover: group-hover:border-primary/20">
                   <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      
                      <div className="space-y-4 flex-1">
                         <div className="flex items-center gap-3">
                           <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wider ${
                             mov.tipo === 'Promoção' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                           }`}>
                             {mov.tipo}
                           </span>
                           <span className="text-xs font-bold text-zinc-500">{mov.data}</span>
                         </div>
                         
                         <div>
                           <h3 className="text-lg font-bold text-[#e7e5e4] group-hover:text-primary transition-colors">{mov.nome}</h3>
                           <p className="text-sm font-mono text-zinc-500 mt-1">{mov.matricula}</p>
                         </div>
                         
                         <div className="flex items-center gap-4 bg-[#18181b] p-4 rounded-xl border border-[#27272a] w-fit">
                            <div>
                               <p className="text-[10px] uppercase font-bold text-zinc-600 mb-1">Anterior</p>
                               <span className="text-sm font-medium text-zinc-400 line-through decoration-slate-300">{mov.anterior}</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                               <ArrowUpRight size={16} className="text-primary" />
                            </div>
                            <div>
                               <p className="text-[10px] uppercase font-bold text-zinc-600 mb-1">Novo</p>
                               <span className="text-sm font-bold text-[#e7e5e4]">{mov.novo}</span>
                            </div>
                         </div>
                      </div>
                      
                      <div className="flex flex-col items-start md:items-end gap-3 min-w-[200px]">
                         <div className="text-left md:text-right">
                            <p className="text-[10px] uppercase font-bold text-zinc-600">Responsável (RH)</p>
                            <p className="text-sm font-medium text-zinc-300">{mov.responsavel}</p>
                         </div>
                         <button className="px-4 py-2 mt-2 bg-[#18181b] border border-[#27272a] hover:border-zinc-700 hover:bg-[#09090b] text-zinc-300 rounded-lg text-xs font-bold  flex items-center gap-2 transition-all">
                            <FileText size={14} className="text-primary" />
                            Acessar Aditivo
                         </button>
                      </div>
                   </div>
                </div>
             </div>
           ))}
         </div>
      </div>

      <div className="p-8 bg-[#09090b] rounded-3xl text-white relative overflow-hidden ">
         <div className="absolute top-0 right-0 p-12 -mt-10 opacity-10">
            <TrendingUp size={120} />
         </div>
         <div className="relative max-w-lg">
            <h3 className="text-2xl font-bold">Análise de Headcount e Turnover</h3>
            <p className="text-zinc-600 mt-2 leading-relaxed">
              O sistema detectou que 85% das movimentações deste mês foram promoções internas, indicando um forte índice de retenção e crescimento de talentos.
            </p>
            <button className="mt-6 px-6 py-3 bg-[#18181b] text-[#e7e5e4] rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center gap-2">
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
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-bold text-sm transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={() => {
                success("Movimentação Registrada", "O histórico do colaborador foi atualizado e os aditivos contratuais gerados.");
                setIsModalOpen(false);
              }}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-sm transition-colors  "
            >
              Confirmar Alteração
            </button>
          </>
        }
      >
        <div className="space-y-4">
           <div>
             <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Matrícula do Colaborador</label>
             <input type="text" className="w-full h-10 border border-[#27272a] rounded-lg px-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Ex: MAT-12345" />
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Novo Cargo</label>
               <input type="text" className="w-full h-10 border border-[#27272a] rounded-lg px-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Opcional" />
             </div>
             <div>
               <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Novo Setor</label>
               <input type="text" className="w-full h-10 border border-[#27272a] rounded-lg px-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Opcional" />
             </div>
           </div>
           <div>
             <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Justificativa / Observações</label>
             <textarea className="w-full min-h-[80px] border border-[#27272a] rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none resize-none" placeholder="Motivo da movimentação..."></textarea>
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
           <div className={`p-3 rounded-2xl bg-zinc-800 ${color} `}>
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
