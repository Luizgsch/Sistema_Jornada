import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Minimize2, Zap, Bell, Send } from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";
import type { TipoUsuario } from "@/infrastructure/mock/mockLogin";
import { cn } from "@/shared/lib/cn";

interface BotMessage {
  id: number;
  text: string;
  time: string;
  tag?: "alerta" | "ok" | "info";
  type?: "bot" | "user";
}

const tagConfig = {
  alerta: "text-amber-400",
  ok: "text-emerald-400",
  info: "text-blue-400",
};

function getMessagesForRole(tipo: TipoUsuario): BotMessage[] {
  const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  if (tipo === 'rh') {
    return [
      { id: 1, text: "Olá! Monitorando recrutamento, admissões e treinamentos em tempo real.", time: "08:41", tag: "info" },
      { id: 2, text: "📎 Comprovante recebido via WhatsApp Bot — vinculado automaticamente à matrícula PG-5501 (Ana Silva).", time: "08:43", tag: "ok" },
      { id: 3, text: "⚠️ SLA em risco: vaga VAG-001 (Dev Backend) com 25 dias sem finalista. Recomendo revisar o pipeline.", time: "09:10", tag: "alerta" },
      { id: 4, text: "✅ Onboarding de Lucas Mendes concluído. Acessos ao AD e sistemas provisionados automaticamente.", time: "09:31", tag: "ok" },
      { id: 5, text: "🤖 Triagem IA processou 14 currículos para Vaga FE-2026-07. Score médio: 78. Top candidata: Mariana Costa (91).", time: "10:02", tag: "info" },
    ];
  }

  if (tipo === 'logistica') {
    return [
      { id: 1, text: "Olá! Monitorando chamados, facilities e abastecimento em tempo real.", time: "08:30", tag: "info" },
      { id: 2, text: "🔴 CRÍTICO: Chamado MAN-4401 (Vazamento bloco C) está vencido há 5 dias. Escalone imediatamente.", time: "08:35", tag: "alerta" },
      { id: 3, text: "🔔 Armário 22 liberado automaticamente. Colaborador Rafael desligado em 31/03. Disponível para reassinação.", time: "09:00", tag: "ok" },
      { id: 4, text: "☕ Bloco B e Recepção sem registro de café hoje. Verificar abastecimento.", time: "09:20", tag: "alerta" },
      { id: 5, text: "✅ Satisfação refeitório: 4.62/5 (meta: 4.0). Ótimo resultado para o dia!", time: "10:15", tag: "ok" },
    ];
  }

  if (tipo === 'financeiro') {
    return [
      { id: 1, text: "Olá! Monitorando notas fiscais, conciliações e integrações Attos em tempo real.", time: "08:38", tag: "info" },
      { id: 2, text: "🔴 NF-001 (Fornecedor Alfa, R$ 12.890) está 5 dias atrasada. Risco de multa contratual.", time: "08:45", tag: "alerta" },
      { id: 3, text: "⚠️ Divergência detectada: Juliana Prado (ACC-1002) aparece nas bases Elo e Posigraf. Conciliação necessária.", time: "09:05", tag: "alerta" },
      { id: 4, text: "✅ Integração Attos de 01/04 sincronizada — 412 refeições processadas com sucesso.", time: "09:30", tag: "ok" },
      { id: 5, text: "📊 Consolidado de compras março: R$ 22.650,00. Relatório disponível em Compras de Insumos.", time: "10:00", tag: "info" },
    ];
  }

  // admin/gestor
  return [
    { id: 1, text: "Monitorando todas as áreas: RH, Financeiro, Logística e DHO.", time: "08:40", tag: "info" },
    { id: 2, text: "🔴 2 NFs em atraso (Financeiro) + 2 chamados Manusis vencidos (Logística). Atenção gerencial necessária.", time: "08:48", tag: "alerta" },
    { id: 3, text: "⚠️ 3 vagas RH fora do SLA (>20 dias). Revisar pipeline com a equipe de recrutamento.", time: "09:12", tag: "alerta" },
    { id: 4, text: "✅ Integração Attos ok. Satisfação 4.62/5. Onboarding de 2 colaboradores concluído.", time: "09:45", tag: "ok" },
    { id: 5, text: "📊 Relatório semanal consolidado gerado e disponível em Analytics.", time: now, tag: "info" },
  ];
}

function getLiveAlertForRole(tipo: TipoUsuario): string {
  if (tipo === 'rh') return '🔔 Novo candidato via WhatsApp — Mariana Costa, Score IA: 91!';
  if (tipo === 'logistica') return '🔴 Chamado MAN-4401 vencido há 5 dias. Ação necessária!';
  if (tipo === 'financeiro') return '⚠️ Conflito de benefício: Fernanda Costa (VT + Estacionamento).';
  return '⚠️ 2 NFs em atraso + 2 chamados vencidos detectados.';
}

export function BotOverlay() {
  const { usuario } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<BotMessage[]>([]);
  const [userMessages, setUserMessages] = useState<BotMessage[]>([]);
  const [hasUnread, setHasUnread] = useState(true);
  const [started, setStarted] = useState(false);
  const [liveAlert, setLiveAlert] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const MOCK_MESSAGES = getMessagesForRole(usuario.tipo);

  useEffect(() => {
    const t = setTimeout(() => {
      setLiveAlert(true);
      if (!isOpen) setHasUnread(true);
    }, 12000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    setHasUnread(false);
    if (started) return;
    setStarted(true);

    const timeoutIds: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    const scheduleNext = () => {
      if (i < MOCK_MESSAGES.length) {
        const delay = i === 0 ? 200 : 650;
        const id = setTimeout(() => {
          setVisibleMessages((prev) => [...prev, MOCK_MESSAGES[i]]);
          i++;
          scheduleNext();
        }, delay);
        timeoutIds.push(id);
      }
    };
    scheduleNext();

    return () => timeoutIds.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [visibleMessages, userMessages]);

  const allMessages = [...visibleMessages, ...userMessages].sort((a, b) => a.id - b.id);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg: BotMessage = { id: Date.now(), text: inputValue.trim(), time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), type: 'user' };
    setUserMessages((p) => [...p, userMsg]);
    setInputValue('');
    setTimeout(() => {
      const replies = [
        "Verificando nos dados do sistema em tempo real...",
        "Encontrei as informações. Posso redirecionar você para a página correspondente.",
        "Alerta registrado. Monitorarei e notificarei sobre qualquer mudança.",
        "Dados atualizados. Deseja que eu gere um resumo do status atual?",
      ];
      setUserMessages((p) => [...p, {
        id: Date.now() + 1,
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        tag: 'info',
      }]);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            style={{ transformOrigin: "bottom right" }}
            className="w-80 bg-white dark:bg-[#1e293b] border border-zinc-200 dark:border-[#334155] rounded-radius-l overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/50 pointer-events-auto transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-[#0f172a] border-b border-zinc-200 dark:border-[#334155]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 bg-primary/15 rounded-full flex items-center justify-center text-primary">
                    <Bot size={17} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0f172a]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-800 dark:text-[#e7e5e4]">Posigraf Bot</p>
                  <p className="text-[10px] text-emerald-400 font-semibold capitalize">● {usuario.tipo} — monitorando</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-radius-m hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                <Minimize2 size={15} />
              </button>
            </div>

            {/* Messages */}
            <div ref={messagesContainerRef} className="h-64 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              <AnimatePresence initial={false}>
                {allMessages.map((msg) => {
                  const isUser = msg.type === 'user';
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={cn("flex gap-2.5 items-start", isUser && "flex-row-reverse")}
                    >
                      {!isUser && (
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                          <Bot size={12} />
                        </div>
                      )}
                      <div className={cn("flex-1", isUser && "flex justify-end")}>
                        <div className={cn(
                          "rounded-radius-l px-3.5 py-2.5 border inline-block max-w-[90%]",
                          isUser
                            ? "bg-teal-600/20 border-teal-500/30 rounded-tr-sm"
                            : cn(
                                "bg-zinc-100 dark:bg-zinc-800/50 border-zinc-200 dark:border-[#334155] rounded-tl-sm",
                                msg.tag && `border-l-2 ${tagConfig[msg.tag].replace("text-", "border-")}`
                              )
                        )}>
                          <p className={cn("text-xs leading-relaxed", isUser ? "text-teal-100" : msg.tag ? tagConfig[msg.tag] : "text-zinc-700 dark:text-zinc-300")}>
                            {msg.text}
                          </p>
                        </div>
                        <p className="text-[10px] text-zinc-600 mt-1 ml-1">{msg.time}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-zinc-200 dark:border-[#334155] flex items-center gap-2">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Perguntar ao assistente..."
                className="flex-1 bg-zinc-100 dark:bg-zinc-800/40 rounded-radius-m px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400 dark:placeholder-zinc-600 outline-none border border-zinc-200 dark:border-zinc-700 focus:border-teal-500/40 transition"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2 rounded-radius-m bg-primary hover:bg-primary/80 text-white disabled:opacity-30 disabled:cursor-not-allowed transition shrink-0"
              >
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle FAB */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen((o) => !o)}
        className="relative w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors pointer-events-auto"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <Bot size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {hasUnread && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-[#0f172a]"
          >
            {MOCK_MESSAGES.length}
          </motion.span>
        )}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-25 pointer-events-none" />
        )}
      </motion.button>

      {/* Live alert toast */}
      <AnimatePresence>
        {liveAlert && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-16 bottom-2 bg-white dark:bg-[#1e293b] border border-amber-500/30 rounded-radius-m px-3 py-2.5 flex items-center gap-2 shadow-xl pointer-events-none whitespace-nowrap max-w-[240px]"
          >
            <Bell size={12} className="text-amber-400 flex-shrink-0" />
            <p className="text-xs font-semibold text-amber-300 leading-snug truncate">{getLiveAlertForRole(usuario.tipo)}</p>
          </motion.div>
        )}
        {!liveAlert && hasUnread && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-16 bottom-2 bg-white dark:bg-[#1e293b] border border-zinc-200 dark:border-[#334155] rounded-radius-m px-3 py-2 flex items-center gap-2 shadow-lg pointer-events-none whitespace-nowrap"
          >
            <Zap size={12} className="text-primary" />
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Bot tem novas notificações</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
