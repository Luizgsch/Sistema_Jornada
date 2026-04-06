import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Shirt,
  Monitor,
  Send,
  Loader2,
  PartyPopper,
  CreditCard,
  BookOpen,
} from "lucide-react";

interface StepDef {
  icon: React.ElementType;
  label: string;
  delay: number;
}

const AUTOMATION_STEPS: StepDef[] = [
  { icon: Send, label: "Notificando Financeiro — abertura de conta bancária gerada...", delay: 600 },
  { icon: Shirt, label: "Solicitação de Uniforme enviada ao estoque operacional...", delay: 1300 },
  { icon: Monitor, label: "Acesso de TI solicitado para e-mail e sistemas internos...", delay: 2100 },
  { icon: CreditCard, label: "Benefícios (VT / Vale-Refeição) cadastrados automaticamente...", delay: 2900 },
  { icon: BookOpen, label: "Trilha de integração e onboarding agendada no LMS...", delay: 3700 },
];

interface AutomationStepperProps {
  isOpen: boolean;
  onClose: () => void;
  vagaNome?: string;
  candidatoNome?: string;
}

export function AutomationStepper({
  isOpen,
  onClose,
  vagaNome = "Desenvolvedor React",
  candidatoNome = "Carlos Eduardo Mendes",
}: AutomationStepperProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCompletedSteps([]);
      setIsFinished(false);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    AUTOMATION_STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, i]);
        if (i === AUTOMATION_STEPS.length - 1) {
          const finalTimer = setTimeout(() => setIsFinished(true), 500);
          timers.push(finalTimer);
        }
      }, step.delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 24 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative w-full max-w-lg bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
          >
            {/* Header */}
            <div className="p-6 bg-[#09090b] border-b border-[#27272a]">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                  <Loader2 size={10} className={isFinished ? "hidden" : "animate-spin"} />
                  {isFinished ? "✓ Automação concluída" : "Sistema trabalhando…"}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#e7e5e4]">Vaga encerrada: {vagaNome}</h2>
              <p className="text-sm text-zinc-500 mt-1">
                Candidato selecionado:{" "}
                <span className="text-zinc-300 font-semibold">{candidatoNome}</span>
              </p>
            </div>

            {/* Steps */}
            <div className="p-6 space-y-3">
              {AUTOMATION_STEPS.map((step, i) => {
                const isDone = completedSteps.includes(i);
                const isActive =
                  !isDone && completedSteps.length === i;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.25 }}
                    animate={{ opacity: isDone || isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.4 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                      isDone
                        ? "bg-emerald-500/5 border-emerald-500/20"
                        : isActive
                        ? "bg-primary/5 border-primary/20"
                        : "border-[#27272a] bg-transparent"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 p-2 rounded-lg transition-all duration-400 ${
                        isDone
                          ? "bg-emerald-500/10 text-emerald-400"
                          : isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-zinc-800 text-zinc-600"
                      }`}
                    >
                      {isDone ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        >
                          <CheckCircle2 size={18} />
                        </motion.div>
                      ) : isActive ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <step.icon size={18} />
                      )}
                    </div>
                    <p
                      className={`text-sm font-medium transition-colors duration-400 ${
                        isDone
                          ? "text-emerald-400"
                          : isActive
                          ? "text-[#e7e5e4]"
                          : "text-zinc-600"
                      }`}
                    >
                      {step.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Finished CTA */}
            <AnimatePresence>
              {isFinished && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 pb-6"
                >
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 mb-4">
                    <PartyPopper size={20} className="text-emerald-400 flex-shrink-0" />
                    <p className="text-sm font-bold text-emerald-400">
                      Todas as notificações enviadas! Nenhuma ação manual necessária.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
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
  );
}
