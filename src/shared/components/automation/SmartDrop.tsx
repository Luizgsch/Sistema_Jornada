import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Sparkles, CheckCircle2, FileText, Brain, RefreshCw } from "lucide-react";

const mockExtractedData: Record<string, string> = {
  nome: "Carlos Eduardo Mendes",
  cpf: "987.654.321-00",
  rg: "12.345.678-9",
  dataNascimento: "15/06/1992",
  email: "carlos.mendes@email.com",
  telefone: "(11) 98877-6655",
  endereco: "Av. Paulista, 1578 — São Paulo / SP",
  cargo: "Analista de Sistemas",
  salario: "R$ 7.200,00",
  gestor: "Thiago Neves",
};

const loadingStepTexts = [
  "Lendo metadados do arquivo...",
  "Detectando campos de texto...",
  "Validando CPF e data de nascimento...",
  "Cruzando com base interna...",
  "Preenchendo formulário automaticamente...",
];

type DropState = "idle" | "loading" | "done";

interface SmartDropProps {
  onComplete?: (data: Record<string, string>) => void;
}

export function SmartDrop({ onComplete }: SmartDropProps) {
  const [state, setState] = useState<DropState>("idle");
  const [isDragging, setIsDragging] = useState(false);
  const [extractedData, setExtractedData] = useState<Record<string, string> | null>(null);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const simulateProcessing = useCallback((name: string) => {
    setFileName(name);
    setState("loading");
    setTimeout(() => {
      setState("done");
      setExtractedData(mockExtractedData);
      onComplete?.(mockExtractedData);
    }, 2200);
  }, [onComplete]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) simulateProcessing(file.name);
  }, [simulateProcessing]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) simulateProcessing(file.name);
  };

  const reset = () => {
    setState("idle");
    setExtractedData(null);
    setFileName("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const fieldLabels: Record<string, string> = {
    nome: "Nome Completo",
    cpf: "CPF",
    rg: "RG",
    dataNascimento: "Data de Nascimento",
    email: "E-mail",
    telefone: "Telefone",
    endereco: "Endereço",
    cargo: "Cargo Pretendido",
    salario: "Salário Combinado",
    gestor: "Gestor Responsável",
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`relative flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
              isDragging
                ? "border-primary bg-primary/10 scale-[1.02]"
                : "border-[#27272a] bg-zinc-800/10 hover:border-primary/40 hover:bg-zinc-800/30"
            }`}
          >
            <input ref={fileRef} type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
            <motion.div
              animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
              className="p-5 bg-primary/10 rounded-2xl text-primary"
            >
              <Upload size={32} />
            </motion.div>
            <div className="text-center">
              <p className="font-bold text-[#e7e5e4] text-lg">Arraste um documento aqui</p>
              <p className="text-sm text-zinc-500 mt-1.5">ou clique para selecionar • RG, CPF, CNH, Holerite</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-primary font-semibold bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
              <Sparkles size={13} />
              IA extrai e preenche o formulário automaticamente
            </div>
          </motion.div>
        )}

        {state === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-6 p-12 rounded-2xl border border-[#27272a] bg-zinc-800/10"
          >
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-t-primary border-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain size={28} className="text-primary" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-bold text-[#e7e5e4] text-lg">IA extraindo dados e validando campos...</p>
              <p className="text-sm text-zinc-500 mt-1">Aguarde, processamento em andamento</p>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-500 font-mono bg-zinc-900 px-4 py-2.5 rounded-xl border border-[#27272a]">
              <FileText size={12} />
              {fileName}
            </div>
            <LoadingStepsDisplay />
          </motion.div>
        )}

        {state === "done" && extractedData && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-emerald-500/15">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  <CheckCircle2 size={20} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-bold text-emerald-400">Extração concluída!</p>
                  <p className="text-[11px] text-zinc-500">
                    {Object.keys(extractedData).length} campos preenchidos automaticamente a partir de <span className="text-zinc-400">{fileName || "documento"}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-3 py-1.5 rounded-lg border border-[#27272a] hover:border-zinc-600"
              >
                <RefreshCw size={12} />
                Novo upload
              </button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-x-8 gap-y-4">
              {Object.entries(extractedData).map(([key, value], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="space-y-1"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    {fieldLabels[key] ?? key}
                  </p>
                  <p className="text-sm font-semibold text-[#e7e5e4]">{value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LoadingStepsDisplay() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % loadingStepTexts.length);
    }, 420);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-5 flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-primary font-mono"
        >
          {loadingStepTexts[step]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
