import { useMemo, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Search, Filter, Plus, Edit, ListTree, UserPlus, ChevronRight, BookOpen } from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { mockTrilhas } from "@/infrastructure/mock/mockTreinamentos";
import { motion, AnimatePresence } from "framer-motion";
import { SideDrawer } from "@/shared/ui/SideDrawer";
import { Button } from "@/shared/ui/Button";
import { FilterChipsBar, type FilterChipModel } from "@/shared/components/filters/FilterChipsBar";
import { cn } from "@/shared/lib/cn";

const ALL = "__ALL__";

export default function TrilhasPage() {
  const [showNewTrilha, setShowNewTrilha] = useState(false);
  const [trilhaDetalhe, setTrilhaDetalhe] = useState<(typeof mockTrilhas)[number] | null>(null);
  /** Módulo com linha expandida para ver aulas (drill-down no mesmo painel). */
  const [moduloExpandido, setModuloExpandido] = useState<number | null>(null);
  const [busca, setBusca] = useState("");
  const [filtrosPainel, setFiltrosPainel] = useState({ area: ALL, status: ALL });
  const [filtrosOpen, setFiltrosOpen] = useState(false);

  const areasOpcoes = useMemo(() => {
    const u = [...new Set(mockTrilhas.map((t) => t.area))];
    return [ALL, ...u];
  }, []);

  const trilhasFiltradas = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return mockTrilhas.filter((t) => {
      if (filtrosPainel.area !== ALL && t.area !== filtrosPainel.area) return false;
      if (filtrosPainel.status !== ALL && t.status !== filtrosPainel.status) return false;
      if (!q) return true;
      return (
        t.nome.toLowerCase().includes(q) ||
        t.area.toLowerCase().includes(q) ||
        t.cargo.toLowerCase().includes(q)
      );
    });
  }, [busca, filtrosPainel]);

  const clearAllFilters = useCallback(() => {
    setBusca("");
    setFiltrosPainel({ area: ALL, status: ALL });
  }, []);

  const painelAtivo = filtrosPainel.area !== ALL || filtrosPainel.status !== ALL;
  const showFunnelDot = !filtrosOpen && painelAtivo;

  const filterChips: FilterChipModel[] = useMemo(() => {
    const chips: FilterChipModel[] = [];
    const b = busca.trim();
    if (b) {
      chips.push({
        id: "busca",
        label: `Busca: ${b}`,
        onRemove: () => setBusca(""),
      });
    }
    if (filtrosPainel.area !== ALL) {
      chips.push({
        id: "area",
        label: `Área: ${filtrosPainel.area}`,
        onRemove: () => setFiltrosPainel((p) => ({ ...p, area: ALL })),
      });
    }
    if (filtrosPainel.status !== ALL) {
      chips.push({
        id: "status",
        label: `Status: ${filtrosPainel.status}`,
        onRemove: () => setFiltrosPainel((p) => ({ ...p, status: ALL })),
      });
    }
    return chips;
  }, [busca, filtrosPainel]);

  const modulosTrilha = useMemo(() => {
    if (!trilhaDetalhe) return [];
    return Array.from({ length: trilhaDetalhe.qtdCursos }, (_, i) => ({
      ordem: i + 1,
      titulo: `Módulo ${i + 1} — ${trilhaDetalhe.nome}`,
      aulas: [
        `Boas-vindas e objetivos (${i + 1}.1)`,
        `Conteúdo principal e exercício (${i + 1}.2)`,
        `Checkpoint e materiais extras (${i + 1}.3)`,
      ],
    }));
  }, [trilhaDetalhe]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trilhas de Aprendizado</h1>
          <p className="text-muted-foreground mt-1">Planos de capacitação estruturados por cargo ou área.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFiltrosOpen(false);
            setShowNewTrilha(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-radius-m font-medium hover:bg-primary/90 transition-colors "
        >
          <Plus size={18} />
          Nova Trilha
        </button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-bold">Listagem de Trilhas</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64 max-w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Pesquisar trilha..."
                  className="w-full pl-9 h-9 text-sm rounded-radius-s border border-input focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <button
                type="button"
                onClick={() => setFiltrosOpen(true)}
                className="relative h-9 px-3 border rounded-radius-s text-sm font-medium hover:bg-[#0f172a] flex items-center gap-2"
              >
                <Filter size={14} />
                Filtros
                {showFunnelDot ? (
                  <span
                    className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-[#1e293b]"
                    aria-label="Há filtros do painel aplicados"
                  />
                ) : null}
              </button>
            </div>
          </div>
          <FilterChipsBar chips={filterChips} onClearAll={clearAllFilters} />
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#0f172a] border-b">
                <tr className="text-muted-foreground font-medium text-[11px] uppercase tracking-wider">
                  <th className="py-4 px-6">Trilha de Aprendizado</th>
                  <th className="py-4 px-6">Área Responsável</th>
                  <th className="py-4 px-6">Cargo Alvo</th>
                  <th className="py-4 px-6 text-center">Nº de Cursos</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {trilhasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 px-6 text-center text-sm text-muted-foreground">
                      Nenhuma trilha encontrada.{" "}
                      <button type="button" className="font-semibold text-primary underline-offset-2 hover:underline" onClick={clearAllFilters}>
                        Limpar filtros
                      </button>
                    </td>
                  </tr>
                ) : null}
                {trilhasFiltradas.map((trilha) => (
                  <tr key={trilha.id} className="border-b hover:bg-zinc-800/20 transition-colors group">
                    <td className="py-4 px-6 font-bold text-[#e7e5e4] border-l-2 border-transparent group-hover:border-primary">
                      {trilha.nome}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-radius-s bg-zinc-800 text-zinc-400 border">
                        {trilha.area}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-zinc-400 font-medium">{trilha.cargo}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-zinc-800 font-bold text-xs text-zinc-300">
                        {trilha.qtdCursos}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                       <StatusBadge status={trilha.status as any} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => {
                            setModuloExpandido(null);
                            setTrilhaDetalhe(trilha);
                          }}
                          className="p-2 hover:bg-zinc-700 rounded-radius-m text-zinc-400 transition-colors"
                          title="Ver módulos da trilha"
                        >
                          <ListTree size={16} />
                        </button>
                        <button className="p-2 hover:bg-zinc-700 rounded-radius-m text-zinc-400 transition-colors" title="Associar Colaboradores">
                          <UserPlus size={16} />
                        </button>
                        <button className="p-2 hover:bg-zinc-700 rounded-radius-m text-zinc-400 transition-colors" title="Editar Trilha">
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <SideDrawer
        open={showNewTrilha}
        onClose={() => setShowNewTrilha(false)}
        title="Criar Nova Trilha de Aprendizado"
        subtitle="Formulário e conteúdo no mesmo painel lateral — sem modal centralizado por cima."
        zIndex={110}
        className="md:!max-w-[min(40rem,96vw)] md:!w-[min(40rem,96vw)]"
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setShowNewTrilha(false)} className="rounded-radius-m font-bold">
              Cancelar
            </Button>
            <Button type="button" onClick={() => setShowNewTrilha(false)} className="rounded-radius-m font-bold">
              Salvar trilha
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-3">Informações Gerais</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nome da Trilha" placeholder="Ex: Formação Liderança" />
              <SelectField label="Área Responsável" options={["Todas", "Tecnologia", "Vendas", "RH"]} />
              <SelectField label="Cargo Relacionado" options={["Todos", "Coordenadores/Gerentes", "Analistas", "Desenvolvedor(a)"]} />
              <div className="sm:col-span-2">
                <TextAreaField label="Descrição" placeholder="Objetivo de aprendizado desta trilha..." />
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-radius-m border border-[#334155] bg-[#0f172a]/30 p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-3">
                Conteúdo da trilha
              </h3>
              <span className="text-[10px] font-semibold uppercase text-zinc-500">Fluxo único</span>
            </div>
            <p className="text-xs text-zinc-500">
              Adicione cursos neste painel — sem segunda janela modal.
            </p>
            <div className="p-6 border-2 border-dashed rounded-radius-m bg-[#0f172a] flex flex-col items-center justify-center text-center">
              <ListTree className="text-zinc-400 mb-2" size={32} />
              <p className="text-sm text-zinc-500 font-medium">Nenhum curso adicionado à trilha.</p>
              <p className="text-xs text-zinc-600 mt-1">Use o catálogo de cursos ou importe do DHO neste mesmo fluxo (demo).</p>
              <Button type="button" variant="outline" className="mt-4 rounded-radius-m text-xs font-bold">
                Adicionar curso à trilha
              </Button>
            </div>
          </div>
        </div>
      </SideDrawer>

      <SideDrawer
        open={filtrosOpen}
        onClose={() => setFiltrosOpen(false)}
        title="Filtros da listagem"
        subtitle="Estes critérios são exclusivos da página Trilhas e não afetam o catálogo de Cursos."
        overlay="subtle"
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setFiltrosPainel({ area: ALL, status: ALL })}
              className="rounded-radius-m px-5 py-2.5 font-semibold"
            >
              Limpar painel
            </Button>
            <Button type="button" onClick={() => setFiltrosOpen(false)} className="rounded-radius-m px-5 py-2.5 font-semibold">
              Concluir
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="trilha-area" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Área responsável
            </label>
            <select
              id="trilha-area"
              value={filtrosPainel.area}
              onChange={(e) => setFiltrosPainel((p) => ({ ...p, area: e.target.value }))}
              className={cn(
                "w-full h-11 rounded-radius-m border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
                "border-[#334155] bg-[#0f172a] text-[#e7e5e4]"
              )}
            >
              {areasOpcoes.map((a) => (
                <option key={a} value={a}>
                  {a === ALL ? "Todas as áreas" : a}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="trilha-status" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Status da trilha
            </label>
            <select
              id="trilha-status"
              value={filtrosPainel.status}
              onChange={(e) => setFiltrosPainel((p) => ({ ...p, status: e.target.value }))}
              className="w-full h-11 rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value={ALL}>Todos os status</option>
              <option value="ativa">Ativa</option>
              <option value="arquivada">Arquivada</option>
            </select>
          </div>
        </div>
      </SideDrawer>

      <SideDrawer
        open={!!trilhaDetalhe}
        onClose={() => {
          setTrilhaDetalhe(null);
          setModuloExpandido(null);
        }}
        title={trilhaDetalhe?.nome ?? "Trilha"}
        subtitle={
          trilhaDetalhe
            ? `${trilhaDetalhe.area} · cargo-alvo: ${trilhaDetalhe.cargo} · ${trilhaDetalhe.qtdCursos} módulos`
            : undefined
        }
        overlay="subtle"
        footer={
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setTrilhaDetalhe(null);
                setModuloExpandido(null);
              }}
              className="rounded-radius-m font-semibold"
            >
              Fechar
            </Button>
          </div>
        }
      >
        {trilhaDetalhe ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ordem sugerida de conclusão. Expanda um módulo para ver as aulas — mesmo painel, sem modal empilhado.
            </p>
            <ol className="space-y-2">
              {modulosTrilha.map((m) => {
                const aberto = moduloExpandido === m.ordem;
                return (
                  <li key={m.ordem} className="rounded-radius-m border border-[#334155] bg-[#0f172a]/40 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setModuloExpandido((v) => (v === m.ordem ? null : m.ordem))}
                      className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-[#0f172a]/80 transition-colors"
                    >
                      <span className="font-mono text-xs font-bold text-primary shrink-0 pt-0.5">{m.ordem}</span>
                      <span className="text-[#e7e5e4] font-medium leading-snug flex-1">{m.titulo}</span>
                      <ChevronRight
                        size={18}
                        className={cn("text-zinc-500 shrink-0 transition-transform", aberto ? "rotate-90" : "")}
                        aria-hidden
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {aberto ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-[#334155]"
                        >
                          <ul className="px-4 py-3 space-y-2 pl-12">
                            {m.aulas.map((a) => (
                              <li key={a} className="flex items-center gap-2 text-sm text-zinc-400">
                                <BookOpen size={14} className="text-primary shrink-0" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : null}
      </SideDrawer>
    </div>
  );
}

// Reusing form components
function Field({ label, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-zinc-500 uppercase">{label}</label>
      <input type="text" placeholder={placeholder} className="w-full h-10 px-3 rounded-radius-m border border-[#334155] text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
    </div>
  );
}

function SelectField({ label, options }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-zinc-500 uppercase">{label}</label>
      <select className="w-full h-10 px-3 rounded-radius-m border border-[#334155] text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-[#1e293b] appearance-none cursor-pointer">
        {options.map((opt: any) => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function TextAreaField({ label, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-zinc-500 uppercase">{label}</label>
      <textarea placeholder={placeholder} className="w-full h-20 p-3 rounded-radius-m border border-[#334155] text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
    </div>
  );
}
