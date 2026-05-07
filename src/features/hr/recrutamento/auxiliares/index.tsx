import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Search } from "lucide-react";
import { mockAuxiliares } from "@/infrastructure/mock/mockRecrutamento";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { ImportarPlanilhaButton } from "@/shared/ui/ImportarPlanilhaButton";
import { ExportarPlanilhaButton } from "@/shared/ui/ExportarPlanilhaButton";

const TURNOS = ["Manhã", "Tarde", "Noite", "Integral"];

export default function AuxiliaresPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [turnoFiltro, setTurnoFiltro] = useState<string>("");

  const auxiliaresFiltrados = useMemo(() => {
    return mockAuxiliares.filter((aux) => {
      const matchNome = aux.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTurno = !turnoFiltro || aux.preferencaTurno === turnoFiltro;
      return matchNome && matchTurno;
    });
  }, [searchTerm, turnoFiltro]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-1">
            Recrutamento & Seleção
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4]">
            Planilha de Auxiliares
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            Gestão de candidatos para processos seletivos operacionais com preferência de turno.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ImportarPlanilhaButton
            label="Importar Planilha de Auxiliares"
            modeloNome="modelo_auxiliares.xlsx"
          />
          <ExportarPlanilhaButton label="Exportar Auxiliares" nomeArquivo="auxiliares.xlsx" />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Pesquisar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 h-10 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-zinc-800 dark:text-[#f8fafc] placeholder:text-zinc-400 dark:placeholder:text-slate-500 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider block mb-1">
                Filtrar por turno
              </label>
              <select
                value={turnoFiltro}
                onChange={(e) => setTurnoFiltro(e.target.value)}
                className="h-10 px-3.5 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-zinc-800 dark:text-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="">Todos os turnos</option>
                {TURNOS.map((turno) => (
                  <option key={turno} value={turno}>
                    {turno}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-y border-zinc-100 dark:border-zinc-800">
                <tr className="text-zinc-500 dark:text-zinc-400 font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3 px-5">Nome</th>
                  <th className="py-3 px-5">CPF</th>
                  <th className="py-3 px-5">Preferência de Turno</th>
                  <th className="py-3 px-5">Vaga Vinculada</th>
                  <th className="py-3 px-5">Status</th>
                </tr>
              </thead>
              <tbody>
                {auxiliaresFiltrados.length > 0 ? (
                  auxiliaresFiltrados.map((aux) => (
                    <tr key={aux.id} className="border-b border-zinc-100 dark:border-zinc-800 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                      <td className="py-3.5 px-5 font-semibold text-zinc-800 dark:text-[#e7e5e4]">{aux.nome}</td>
                      <td className="py-3.5 px-5 font-mono text-xs text-zinc-500 dark:text-zinc-400">{aux.cpf}</td>
                      <td className="py-3.5 px-5 text-zinc-600 dark:text-zinc-400">
                        <span className="inline-flex px-2 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-radius-m">
                          {aux.preferencaTurno}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-zinc-600 dark:text-zinc-400 text-sm">{aux.vagaVinculada}</td>
                      <td className="py-3.5 px-5">
                        <StatusBadge status={aux.status as any} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 px-5 text-center text-zinc-500 dark:text-zinc-400">
                      Nenhum auxiliar encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
