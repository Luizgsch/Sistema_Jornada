import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";

import { 
  CheckCircle2, 
  Circle, 
  MoreVertical, 
  Plus, 
  Calendar, 
  User, 
  ChevronRight,
  Search
} from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const initialColumns = [
  {
    id: "docs",
    title: "Documentação",
    tasks: [
      { id: "1", name: "Alice Ferreira", role: "Dev Frontend", date: "01 Abr", progress: 80 },
      { id: "2", name: "Bruno Santos", role: "Analista Mkt", date: "05 Abr", progress: 20 },
    ]
  },
  {
    id: "bank",
    title: "Conta Bancária",
    tasks: [
      { id: "3", name: "Carla Oliveira", role: "Gerente Proj", date: "10 Abr", progress: 60 },
    ]
  },
  {
    id: "systems",
    title: "Acessos",
    tasks: [
      { id: "4", name: "Diego Lima", role: "Especialista RH", date: "12 Abr", progress: 0 },
    ]
  },
  {
    id: "uniform",
    title: "Kit / Uniforme",
    tasks: []
  },
  {
    id: "done",
    title: "Pronto para Início",
    tasks: [
      { id: "5", name: "Eduardo Rocha", role: "Suporte TI", date: "20 Mar", progress: 100 },
    ]
  }
];

export default function OnboardingPage() {
  const [columns] = useState(initialColumns);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Onboarding</h1>
          <p className="text-muted-foreground mt-1">Acompanhe a jornada de entrada dos novos talentos.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar colaborador..." 
              className="pl-10 h-10 w-64 rounded-lg border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="h-10 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus size={18} />
            Adicionar
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map((column) => (
            <div key={column.id} className="w-72 flex flex-col">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-700">{column.title}</h3>
                  <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {column.tasks.length}
                  </span>
                </div>
                <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
              </div>
              
              <div className="flex-1 bg-slate-100/50 rounded-xl p-3 space-y-3 min-h-[500px] border border-dashed border-slate-200">
                {column.tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layoutId={task.id}
                    onClick={() => setSelectedTask(task)}
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">
                        {task.role}
                      </span>
                      <MoreVertical size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{task.name}</h4>
                    
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>Início: {task.date}</span>
                        </div>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            task.progress === 100 ? "bg-emerald-500" : "bg-primary"
                          )} 
                          style={{ width: `${task.progress}%` }} 
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
                <button className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-slate-400 text-xs font-medium hover:bg-white hover:text-slate-600 transition-all flex items-center justify-center gap-1">
                  <Plus size={14} />
                  Adicionar Card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Details Drawer */}
      <AnimatePresence>
        {selectedTask && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTask(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
            >
              <div className="p-8 border-b bg-slate-50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <User size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedTask.name}</h2>
                    <p className="text-primary font-medium">{selectedTask.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Início: {selectedTask.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Status: Em progresso</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Checklist de Entrada</h3>
                  <div className="space-y-3">
                    <CheckItem label="Entrega de Documentos CL" checked={selectedTask.progress > 20} />
                    <CheckItem label="Abertura de Conta Salário" checked={selectedTask.progress > 40} />
                    <CheckItem label="Criação de e-mail corporativo" checked={selectedTask.progress > 60} />
                    <CheckItem label="Acesso ao Slack e Notion" checked={selectedTask.progress > 70} />
                    <CheckItem label="Solicitação de Equipamento" checked={selectedTask.progress > 80} />
                    <CheckItem label="Entrega do Welcome Kit" checked={selectedTask.progress === 100} />
                  </div>
                </div>

                <div className="p-6 bg-slate-900 rounded-2xl text-white">
                  <h4 className="font-bold mb-2">Próximo Passo</h4>
                  <p className="text-slate-300 text-sm mb-4">Realizar treinamento de integração com o gestor direto em 02/04.</p>
                  <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                    Notificar Gestor
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckItem({ label, checked }: { label: string, checked?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-primary/20 transition-all cursor-pointer group">
      <div className="flex items-center gap-3">
        {checked ? (
          <CheckCircle2 size={20} className="text-emerald-500" />
        ) : (
          <Circle size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
        )}
        <span className={cn("text-sm font-medium", checked ? "text-slate-400 line-through" : "text-slate-700")}>
          {label}
        </span>
      </div>
      <ChevronRight size={14} className="text-slate-300" />
    </div>
  );
}
