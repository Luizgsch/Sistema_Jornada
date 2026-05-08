import { Download } from "lucide-react";
import { useToast } from "@/shared/ui/Toast";

interface ExportarPlanilhaButtonProps {
  label?: string;
  nomeArquivo?: string;
  onExport?: () => void;
  onExportData?: () => Array<Record<string, any>>;
}

function convertToCSV(data: Array<Record<string, any>>): string {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csvHeaders = headers.map((h) => `"${h}"`).join(",");

  const csvRows = data.map((row) =>
    headers.map((header) => {
      const value = row[header];
      if (value === null || value === undefined) return '""';
      const stringValue = String(value).replace(/"/g, '""');
      return `"${stringValue}"`;
    }).join(",")
  );

  return [csvHeaders, ...csvRows].join("\n");
}

export function ExportarPlanilhaButton({
  label = "Exportar",
  nomeArquivo = "dados.xlsx",
  onExport,
  onExportData,
}: ExportarPlanilhaButtonProps) {
  const { success, error } = useToast();

  const handleExportar = () => {
    try {
      if (onExportData) {
        const data = onExportData();
        if (data.length === 0) {
          error("Nenhum dado para exportar");
          return;
        }

        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", nomeArquivo.replace(".xlsx", ".csv"));
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        success(`${nomeArquivo} exportado com sucesso`);
      } else {
        onExport?.();
        success(`Exportando dados... arquivo ${nomeArquivo} será baixado em instantes.`);
      }
    } catch (err) {
      error("Erro ao exportar dados");
    }
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
