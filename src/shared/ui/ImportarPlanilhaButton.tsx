import { useState } from "react";
import { Upload, X } from "lucide-react";
import { useToast } from "@/shared/ui/Toast";

interface ImportarPlanilhaButtonProps {
  label?: string;
  modeloNome?: string;
  onSuccess?: (rowCount: number) => void;
}

export function ImportarPlanilhaButton({
  label = "Importar Planilha",
  modeloNome = "modelo.xlsx",
  onSuccess,
}: ImportarPlanilhaButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { success, error } = useToast();

  const handleFileSelect = async (file: File) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ];

    if (!validTypes.includes(file.type)) {
      error(`Formato inválido. Aceitos: Excel (.xlsx, .xls) ou CSV.`);
      return;
    }

    setIsProcessing(true);
    // Simulação de processamento
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const rowCount = Math.floor(Math.random() * 50) + 5;
    success(`${rowCount} linhas importadas com sucesso. Dados atualizados.`);
    onSuccess?.(rowCount);

    setIsProcessing(false);
    setIsOpen(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-radius-m font-semibold text-sm hover:bg-blue-700 transition-all"
      >
        <Upload size={16} />
        {label}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1e293b] rounded-radius-l max-w-md w-full border border-zinc-200 dark:border-[#334155] shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-[#334155]">
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-[#e7e5e4]">Importar Planilha</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                className={`border-2 border-dashed rounded-radius-m p-6 text-center transition-colors ${
                  isDragOver
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                    : "border-zinc-300 dark:border-[#334155] bg-zinc-50 dark:bg-[#0f172a]"
                }`}
              >
                <Upload className="mx-auto h-8 w-8 text-zinc-400 dark:text-zinc-500 mb-2" />
                <p className="text-sm font-medium text-zinc-800 dark:text-[#e7e5e4]">
                  Arraste o arquivo aqui
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  ou clique para selecionar
                </p>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleInputChange}
                  className="hidden"
                  id="file-input"
                  disabled={isProcessing}
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">
                    Selecionar arquivo
                  </div>
                </label>
              </div>

              <div className="bg-zinc-50 dark:bg-[#0f172a] rounded-radius-m p-3 border border-zinc-200 dark:border-[#334155]">
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  <strong>Formatos aceitos:</strong> Excel (.xlsx, .xls) ou CSV
                </p>
              </div>

              <button
                onClick={() => {
                  window.open(`/templates/${modeloNome}`, "_blank");
                }}
                className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors"
              >
                Baixar modelo ({modeloNome})
              </button>

              {isProcessing && (
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  Processando arquivo...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
