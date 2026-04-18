import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Search, Filter, Download, Hash, UserCheck, ShieldCheck } from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Loader2, Hash as HashIcon, CreditCard, Mail, Shirt, KeyRound, PartyPopper,
} from "lucide-react";

const mockMatriculas = [
  { id: "MAT-2026-001", nome: "Eduardo Rocha", cargo: "Suporte TI", setor: "TI", contrato: "CLT", admissao: "20/03/2026", status: "completo" },
  { id: "MAT-2026-002", nome: "Mariana Costa", cargo: "Analista Financeiro", setor: "Financeiro", contrato: "CLT", admissao: "15/03/2026", status: "completo" },
  { id: "MAT-2026-003", nome: "Roberto Almeida", cargo: "Auxiliar Admin", setor: "Operações", contrato: "Temporário", admissao: "10/03/2026", status: "completo" },
];

const MAT_STEPS = [
  { icon: HashIcon, label: "Gerando código de matrícula único (MAT-2026-004)...", delay: 500 },
  { icon: CreditCard, label: "Solicitando abertura de conta-salário ao Financeiro...", delay: 1200 },
  { icon: Mail, label: "E-mail corporativo criado e credenciais enviadas...", delay: 2000 },
  { icon: Shirt, label: "Kit de boas-vindas e uniforme solicitado ao estoque...", delay: 2700 },
  { icon: KeyRound, label: "Acessos aos sistemas liberados via TI...", delay: 3400 },
];

export default function MatriculasPage() {
  const [showStepper, setShowStepper] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const triggerGeneration = () => {
    setCompletedSteps([]);
    setIsFinished(false);
    setShowStepper(true);

    const timers: ReturnType<typeof setTimeout>[] = [];
    MAT_STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, i]);
        if (i === MAT_STEPS.length - 1) {
          const ft = setTimeout(() => setIsFinished(true), 500);
          timers.push(ft);
        }
      }, step.delay);
      timers.push(t);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matrículas e Registros</h1>
          <p className="text-muted-foreground mt-1">Consulta formal de colaboradores registrados no sistema.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={triggerGeneration}
            className="h-10 px-4 bg-primary text-white rounded-radius-m font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Hash size={18} />
            Gerar Matrícula Automática
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Registrados" value="158" icon={UserCheck} />
        <StatCard title="Ativos" value="152" icon={ShieldCheck} />
        <StatCard title="Em Processamento" value="6" icon={Hash} />
      </div>

      <Card>
        <CardHeader className="pb-3 px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar por matrícula ou nome..." 
                className="w-full pl-10 h-10 rounded-radius-s border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-radius-s text-sm font-medium hover:bg-[#0f172a]">
                <Filter size={16} />
                Filtrar
              </button>
              <button
                type="button"
                title="Integração com folha e sistemas externos"
                className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-radius-s text-sm font-medium text-muted-foreground bg-transparent hover:bg-[#0f172a] hover:text-foreground transition-colors"
              >
                <Download size={16} />
                Exportar Folha
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#0f172a] border-y border-[#334155]">
                <tr className="text-muted-foreground font-medium">
                  <th className="py-3 px-6">Matrícula</th>
                  <th className="py-3 px-6">Colaborador</th>
                  <th className="py-3 px-6">Cargo / Setor</th>
                  <th className="py-3 px-6">Tipo Contrato</th>
                  <th className="py-3 px-6">Data Admissão</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockMatriculas.map((m) => (
                  <tr key={m.id} className="border-b hover:bg-zinc-800/20 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs font-bold text-primary">{m.id}</td>
                    <td className="py-4 px-6 font-bold text-[#e7e5e4]">{m.nome}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span>{m.cargo}</span>
                        <span className="text-[11px] text-muted-foreground">{m.setor}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{m.contrato}</td>
                    <td className="py-4 px-6 font-medium">{m.admissao}</td>
                    <td className="py-4 px-6">
                      <StatusBadge status={m.status as any} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Generation Stepper Modal */}
      <AnimatePresence>
        {showStepper && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              className="relative w-full max-w-md bg-[#1e293b] border border-[#334155] rounded-radius-l overflow-hidden shadow-2xl"
            >
              <div className="p-6 bg-[#0f172a] border-b border-[#334155]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                    <Loader2 size={10} className={isFinished ? "hidden" : "animate-spin"} />
                    {isFinished ? "✓ Geração concluída" : "Sistema gerando matrícula…"}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#e7e5e4]">Nova Matrícula: Carlos E. Mendes</h2>
                <p className="text-sm text-zinc-500 mt-1">Cargo: Analista de Sistemas · CLT</p>
              </div>

              <div className="p-6 space-y-3">
                {MAT_STEPS.map((step, i) => {
                  const isDone = completedSteps.includes(i);
                  const isActive = !isDone && completedSteps.length === i;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.25 }}
                      animate={{ opacity: isDone || isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.4 }}
                      className={`flex items-center gap-4 p-4 rounded-radius-m border transition-all duration-500 ${
                        isDone
                          ? "bg-emerald-500/5 border-emerald-500/20"
                          : isActive
                          ? "bg-primary/5 border-primary/20"
                          : "border-[#334155]"
                      }`}
                    >
                      <div className={`flex-shrink-0 p-2 rounded-radius-m transition-all duration-400 ${
                        isDone ? "bg-emerald-500/10 text-emerald-400"
                          : isActive ? "bg-primary/10 text-primary"
                          : "bg-zinc-800 text-zinc-600"
                      }`}>
                        {isDone ? (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500 }}>
                            <CheckCircle2 size={18} />
                          </motion.div>
                        ) : isActive ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <step.icon size={18} />
                        )}
                      </div>
                      <p className={`text-sm font-medium transition-colors duration-400 ${
                        isDone ? "text-emerald-400" : isActive ? "text-[#e7e5e4]" : "text-zinc-600"
                      }`}>
                        {step.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence>
                {isFinished && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-6 pb-6"
                  >
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-radius-m flex items-center gap-3 mb-4">
                      <PartyPopper size={20} className="text-emerald-400 flex-shrink-0" />
                      <p className="text-sm font-bold text-emerald-400">
                        Matrícula <span className="font-mono">MAT-2026-004</span> gerada! Todos os sistemas notificados.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowStepper(false)}
                      className="w-full py-3 bg-primary text-white rounded-radius-m font-bold hover:bg-primary/90 transition-colors"
                    >
                      Concluir
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
          </div>
          <div className="p-3 bg-primary/10 rounded-radius-m text-primary">
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
