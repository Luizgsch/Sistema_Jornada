import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, RefreshCw, CheckCircle2, Users, Car, Bus } from "lucide-react";

interface BenefitRecord {
  matricula: string;
  nome: string;
  setor?: string;
}

const lista_estacionamento: BenefitRecord[] = [
  { matricula: "PG-77210", nome: "Fernanda Costa", setor: "Financeiro" },
  { matricula: "PG-77213", nome: "Igor Martins", setor: "TI" },
  { matricula: "PG-77215", nome: "Lucas Ferreira", setor: "Operações" },
  { matricula: "PG-77218", nome: "Roberta Campos", setor: "RH" },
  { matricula: "PG-77224", nome: "Thiago Neves", setor: "Comercial" },
];

const lista_vt: BenefitRecord[] = [
  { matricula: "PG-77210", nome: "Fernanda Costa", setor: "Financeiro" },
  { matricula: "PG-77211", nome: "Gustavo Pires", setor: "Logística" },
  { matricula: "PG-77213", nome: "Igor Martins", setor: "TI" },
  { matricula: "PG-77220", nome: "Camila Ramos", setor: "Marketing" },
  { matricula: "PG-77218", nome: "Roberta Campos", setor: "RH" },
];

export function ConflictFinder() {
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");

  const conflicts = lista_estacionamento.filter((item) =>
    lista_vt.some((vt) => vt.matricula === item.matricula)
  );

  const runAnalysis = () => {
    setStatus("running");
    setTimeout(() => setStatus("done"), 1600);
  };

  const reset = () => setStatus("idle");

  return (
    <div className="rounded-radius-l border border-[#334155] bg-[#1e293b] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 rounded-radius-m">
            <AlertTriangle size={20} className="text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-[#e7e5e4]">Conflict Finder</h3>
            <p className="text-xs text-zinc-500">Cruzamento automático: Vale-Transporte × Estacionamento</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === "done" && (
            <button
              onClick={reset}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-3 py-1.5 rounded-radius-m border border-[#334155] hover:border-zinc-600"
            >
              Redefinir
            </button>
          )}
          <button
            onClick={runAnalysis}
            disabled={status === "running"}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-radius-m text-sm font-bold hover:bg-amber-500/20 transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={status === "running" ? "animate-spin" : ""} />
            {status === "running" ? "Analisando..." : "Rodar Cruzamento"}
          </button>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-[#334155] border-b border-zinc-200 dark:border-[#334155]">
        <div className="flex items-center gap-3 p-4">
          <div className="p-2 bg-zinc-800 rounded-radius-m">
            <Car size={16} className="text-zinc-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Estacionamento</p>
            <p className="font-bold text-[#e7e5e4]">{lista_estacionamento.length} registros</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4">
          <div className="p-2 bg-zinc-800 rounded-radius-m">
            <Bus size={16} className="text-zinc-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Vale-Transporte</p>
            <p className="font-bold text-[#e7e5e4]">{lista_vt.length} registros</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4">
          <div className={`p-2 rounded-radius-m ${status === "done" ? "bg-amber-500/10" : "bg-zinc-800"}`}>
            <Users size={16} className={status === "done" ? "text-amber-400" : "text-zinc-600"} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Conflitos</p>
            <p className={`font-bold ${status === "done" ? "text-amber-400" : "text-zinc-600"}`}>
              {status === "done" ? `${conflicts.length} alertas` : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 gap-3 text-zinc-600"
            >
              <AlertTriangle size={36} className="opacity-20" />
              <p className="text-sm text-center max-w-xs">
                Clique em <strong className="text-zinc-500">"Rodar Cruzamento"</strong> para detectar colaboradores recebendo VT e Estacionamento simultaneamente.
              </p>
            </motion.div>
          )}

          {status === "running" && (
            <motion.div
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 gap-4"
            >
              <div className="relative w-14 h-14">
                <motion.div
                  className="absolute inset-0 rounded-full border-3 border-t-amber-400 border-transparent"
                  style={{ borderWidth: 3 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-zinc-300">Comparando listas...</p>
                <p className="text-xs text-zinc-600 mt-1">
                  {lista_estacionamento.length + lista_vt.length} registros em análise
                </p>
              </div>
            </motion.div>
          )}

          {status === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  {conflicts.length} Alerta{conflicts.length !== 1 ? "s" : ""} de Duplicidade de Benefício
                </p>
                <p className="text-[11px] text-zinc-600">
                  {((conflicts.length / lista_estacionamento.length) * 100).toFixed(0)}% da base
                </p>
              </div>

              {conflicts.length === 0 ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-radius-m">
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <p className="text-sm text-emerald-400 font-medium">Nenhuma inconsistência encontrada</p>
                </div>
              ) : (
                conflicts.map((item, i) => (
                  <motion.div
                    key={item.matricula}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 p-4 bg-amber-500/5 border border-amber-500/20 rounded-radius-m"
                  >
                    <div className="p-2 bg-amber-500/10 rounded-radius-m text-amber-400 flex-shrink-0">
                      <AlertTriangle size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#e7e5e4] text-sm truncate">{item.nome}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[11px] text-zinc-500 font-mono">{item.matricula}</p>
                        {item.setor && (
                          <span className="text-[10px] text-zinc-600">• {item.setor}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="inline-flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-2.5 py-0.5 font-semibold">
                        <Car size={9} /> Est.
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-2.5 py-0.5 font-semibold">
                        <Bus size={9} /> VT
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
