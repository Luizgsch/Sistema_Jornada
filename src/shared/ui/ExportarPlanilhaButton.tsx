import { Download } from "lucide-react";
import { useToast } from "@/shared/ui/Toast";

interface ExportarPlanilhaButtonProps {
  label?: string;
  nomeArquivo?: string;
  onExport?: () => void;
}

export function ExportarPlanilhaButton({
  label = "Exportar",
  nomeArquivo = "dados.xlsx",
  onExport,
}: ExportarPlanilhaButtonProps) {
  const { success } = useToast();

  const handleExportar = () => {
    onExport?.();
    success(`Exportando dados... arquivo ${nomeArquivo} será baixado em instantes.`);
  };

  return (
    <button
      type="button"
      onClick={handleExportar}
      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-radius-m font-semibold text-sm hover:bg-emerald-700 transition-all"
    >
      <Download size={16} />
      {label}
    </button>
  );
}
