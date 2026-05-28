import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { AlertTriangle } from "lucide-react";
import { mockVagasEstacionamento } from "@/infrastructure/mock/mockServicosGerais";
import { useToast } from "@/shared/ui/Toast";

export function SGEstacionamentoView() {
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [crachaInput, setCrachaInput] = useState("");
  const [selectedVaga, setSelectedVaga] = useState<string | null>(null);
  const { success, warning } = useToast();

  const vagasA = mockVagasEstacionamento.filter((v) => v.setor === "A");
  const vagasB = mockVagasEstacionamento.filter((v) => v.setor === "B");

  const vagasLivresA = vagasA.filter((v) => v.status === "livre").length;
  const vagasLivresB = vagasB.filter((v) => v.status === "livre").length;

  const capacidadeA = vagasA.length;
  const capacidadeB = vagasB.length;

  const percentualLivreA = Math.round((vagasLivresA / capacidadeA) * 100);
  const percentualLivreB = Math.round((vagasLivresB / capacidadeB) * 100);

  const handleVagaClick = (vagaId: string) => {
    const vaga = mockVagasEstacionamento.find((v) => v.id === vagaId);
    if (vaga?.status === "livre") {
      setSelectedVaga(vagaId);
      setShowCheckIn(true);
    }
  };

  const handleCheckIn = () => {
    const vaga = selectedVaga ? mockVagasEstacionamento.find((v) => v.id === selectedVaga) : null;
    if (!vaga) return;

    // Simular busca de colaborador por crachá
    const temVT = Math.random() > 0.7;

    if (temVT) {
      warning(
        "⚠️ ALERTA: Vale Transporte Ativo",
        "Este colaborador possui Vale Transporte registrado. Confirmar check-in mesmo assim?"
      );
    } else {
      success(`Vaga ${vaga.id} ocupada com sucesso.`);
      setShowCheckIn(false);
      setCrachaInput("");
    }
  };

  const getVagaColor = (status: string) => {
    switch (status) {
      case "livre":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "ocupado":
        return "bg-rose-500 cursor-not-allowed";
      case "reservado":
        return "bg-amber-500 cursor-not-allowed";
      default:
        return "bg-zinc-500";
    }
  };

  return (
    <div className="space-y-8">
      {percentualLivreA < 20 && (
        <div className="flex gap-3 p-4 rounded-radius-m bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-200">Setor A com capacidade baixa</p>
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Apenas {percentualLivreA}% de vagas livres. Redirecionar novos para Setor B.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Setor A */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Setor A</CardTitle>
              <div className="text-right">
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {vagasLivresA} vagas livres
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {percentualLivreA}% capacidade
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {vagasA.map((vaga) => (
                <button
                  key={vaga.id}
                  onClick={() => handleVagaClick(vaga.id)}
                  className={`h-12 rounded-radius-m font-semibold text-xs text-white transition-all ${getVagaColor(
                    vaga.status
                  )} ${vaga.status === "livre" ? "cursor-pointer" : "cursor-not-allowed"}`}
                  title={
                    vaga.nomeColaborador ? `${vaga.id}: ${vaga.nomeColaborador}` : `${vaga.id}: Livre`
                  }
                >
                  {vaga.numero}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Setor B */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Setor B</CardTitle>
              <div className="text-right">
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {vagasLivresB} vagas livres
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {percentualLivreB}% capacidade
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-1.5">
              {vagasB.slice(0, 50).map((vaga) => (
                <button
                  key={vaga.id}
                  onClick={() => handleVagaClick(vaga.id)}
                  className={`h-8 rounded text-xs font-semibold text-white transition-all ${getVagaColor(
                    vaga.status
                  )} ${vaga.status === "livre" ? "cursor-pointer" : "cursor-not-allowed"}`}
                  title={`${vaga.id}: ${vaga.nomeColaborador || "Livre"}`}
                >
                  {vaga.numero}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legenda */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500" />
              <span className="text-zinc-700 dark:text-zinc-300">Livre</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-rose-500" />
              <span className="text-zinc-700 dark:text-zinc-300">Ocupado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-500" />
              <span className="text-zinc-700 dark:text-zinc-300">Reservado</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Check-in */}
      {showCheckIn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-sm w-full">
            <CardHeader>
              <CardTitle>Check-in — Vaga {selectedVaga}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wide">
                  Número do Crachá
                </label>
                <input
                  type="text"
                  value={crachaInput}
                  onChange={(e) => setCrachaInput(e.target.value)}
                  placeholder="Ex: 1234"
                  className="w-full h-10 px-3.5 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-zinc-800 dark:text-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all mt-1"
                  autoFocus
                />
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <button
                  onClick={() => {
                    setShowCheckIn(false);
                    setCrachaInput("");
                  }}
                  className="px-4 py-2 rounded-radius-m border border-zinc-200 dark:border-[#334155] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCheckIn}
                  className="px-4 py-2 bg-primary text-white rounded-radius-m hover:bg-primary/90 transition-all font-semibold"
                >
                  Registrar
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
