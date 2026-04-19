import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Filter, Plus, Edit, BookOpen, Users, Library } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { mockCursos } from "@/infrastructure/mock/mockTreinamentos";
import { SideDrawer } from "@/shared/ui/SideDrawer";
import { Button } from "@/shared/ui/Button";
import { useToast } from "@/shared/ui/Toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/Accordion";
import { FilterChipsBar, type FilterChipModel } from "@/shared/components/filters/FilterChipsBar";
import { cn } from "@/shared/lib/cn";
import { SearchAutocomplete } from "@/shared/components/search/SearchAutocomplete";
import { fetchCatalogoCursosSuggestions, type CatalogoPick } from "./catalogoCursosSearch";
import { useInitialSimulatedLoading, useDrawerContentReady } from "@/shared/hooks/useSimulatedLoading";
import { CursosCatalogCardGridSkeleton, CursoDetailDrawerSkeleton } from "@/shared/components/skeletons/pageSkeletons";

const CATEGORIAS_EXTRA = ["Data Science & Analytics", "Saúde e Segurança do Trabalho"] as const;

const ALL = "__ALL__";

const NOVO_CURSO_CATEGORIAS = ["Soft Skills", "Técnico", "Compliance", "Institucional"] as const;

export default function CursosPage() {
  const { success } = useToast();
  const [showNewCurso, setShowNewCurso] = useState(false);
  const [ncTitulo, setNcTitulo] = useState("");
  const [ncCategoria, setNcCategoria] = useState<string>(NOVO_CURSO_CATEGORIAS[0]);
  const [ncDescricao, setNcDescricao] = useState("");
  const [ncResponsavel, setNcResponsavel] = useState("");
  const [ncModulos, setNcModulos] = useState("");
  const [ncDuracao, setNcDuracao] = useState("");
  const [ncFormato, setNcFormato] = useState("Online");
  const [ncObrigatoriedade, setNcObrigatoriedade] = useState("Opcional");
  const [detailCurso, setDetailCurso] = useState<(typeof mockCursos)[number] | null>(null);
  const [categoria, setCategoria] = useState<string>("Todas");
  const [busca, setBusca] = useState("");
  const [buscaDebounced, setBuscaDebounced] = useState("");
  const [filtrosPainel, setFiltrosPainel] = useState<{ formato: string; obrigatoriedade: string }>({
    formato: ALL,
    obrigatoriedade: ALL,
  });
  const [filtrosOpen, setFiltrosOpen] = useState(false);

  const catalogLoading = useInitialSimulatedLoading(500);
  const detailDrawerReady = useDrawerContentReady(!!detailCurso, detailCurso?.id ?? null, 360);

  const opcoesCategoria = useMemo(() => {
    const fromData = [...new Set(mockCursos.map((c) => c.categoria))];
    return ["Todas", ...fromData, ...CATEGORIAS_EXTRA];
  }, []);

  const cursosFiltrados = useMemo(() => {
    const q = buscaDebounced.trim().toLowerCase();
    return mockCursos.filter((c) => {
      const okCat = categoria === "Todas" || c.categoria === categoria;
      const okQ =
        !q ||
        c.nome.toLowerCase().includes(q) ||
        c.categoria.toLowerCase().includes(q) ||
        c.responsavel.toLowerCase().includes(q);
      const okFmt =
        filtrosPainel.formato === ALL ||
        c.formato.toLowerCase() === filtrosPainel.formato.toLowerCase();
      const okObr =
        filtrosPainel.obrigatoriedade === ALL ||
        (filtrosPainel.obrigatoriedade === "obrigatorio" && c.obrigatorio) ||
        (filtrosPainel.obrigatoriedade === "opcional" && !c.obrigatorio);
      return okCat && okQ && okFmt && okObr;
    });
  }, [buscaDebounced, categoria, filtrosPainel]);

  const clearAllFilters = useCallback(() => {
    setCategoria("Todas");
    setBusca("");
    setBuscaDebounced("");
    setFiltrosPainel({ formato: ALL, obrigatoriedade: ALL });
  }, []);

  const painelAtivo = filtrosPainel.formato !== ALL || filtrosPainel.obrigatoriedade !== ALL;
  const showFunnelDot = !filtrosOpen && painelAtivo;

  const filterChips: FilterChipModel[] = useMemo(() => {
    const chips: FilterChipModel[] = [];
    const b = busca.trim();
    if (b) {
      chips.push({
        id: "busca",
        label: `Busca: ${b}`,
        onRemove: () => {
          setBusca("");
          setBuscaDebounced("");
        },
      });
    }
    if (categoria !== "Todas") {
      chips.push({
        id: "cat",
        label: `Categoria: ${categoria}`,
        onRemove: () => setCategoria("Todas"),
      });
    }
    if (filtrosPainel.formato !== ALL) {
      chips.push({
        id: "fmt",
        label: `Formato: ${filtrosPainel.formato}`,
        onRemove: () => setFiltrosPainel((p) => ({ ...p, formato: ALL })),
      });
    }
    if (filtrosPainel.obrigatoriedade !== ALL) {
      chips.push({
        id: "obr",
        label: `Obrigatoriedade: ${filtrosPainel.obrigatoriedade === "obrigatorio" ? "Obrigatório" : "Opcional"}`,
        onRemove: () => setFiltrosPainel((p) => ({ ...p, obrigatoriedade: ALL })),
      });
    }
    return chips;
  }, [busca, categoria, filtrosPainel]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogo de Cursos</h1>
          <p className="text-muted-foreground mt-1">Gestão centralizada de treinamentos internos e capacitações.</p>
        </div>
        <button
          onClick={() => {
            setNcTitulo("");
            setNcCategoria(NOVO_CURSO_CATEGORIAS[0]);
            setNcDescricao("");
            setNcResponsavel("");
            setNcModulos("");
            setNcDuracao("");
            setNcFormato("Online");
            setNcObrigatoriedade("Opcional");
            setShowNewCurso(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-radius-m font-medium hover:bg-primary/90 transition-colors "
        >
          <Plus size={18} />
          Novo Curso
        </button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-bold">Cursos Disponíveis</CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
              <label className="sr-only" htmlFor="filtro-categoria-cursos">
                Categoria
              </label>
              <select
                id="filtro-categoria-cursos"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="h-9 px-3 rounded-radius-s border border-input bg-background text-sm font-medium min-w-[200px] focus:outline-none focus:ring-1 focus:ring-primary/50"
              >
                {opcoesCategoria.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "Todas" ? "Todas as categorias" : cat}
                  </option>
                ))}
              </select>
              <div className="relative flex-1 min-w-[12rem] max-w-xs">
                <SearchAutocomplete<CatalogoPick>
                  value={busca}
                  onChange={setBusca}
                  onDebouncedQueryChange={setBuscaDebounced}
                  fetchSuggestions={fetchCatalogoCursosSuggestions}
                  onSelect={(item) => {
                    const d = item.data;
                    const t = d?.applyText ?? item.title;
                    setBusca(t);
                    setBuscaDebounced(t);
                  }}
                  placeholder="Trilhas, cursos ou competências..."
                  maxSuggestions={5}
                  debounceMs={300}
                  inputClassName="!h-9 !rounded-radius-s !text-sm"
                  aria-label="Buscar no catálogo de cursos"
                />
              </div>
              <button
                type="button"
                onClick={() => setFiltrosOpen(true)}
                className="relative h-9 px-3 border rounded-radius-s text-sm font-medium hover:bg-[#0f172a] flex items-center gap-2 shrink-0"
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
          {catalogLoading ? (
            <CursosCatalogCardGridSkeleton cards={6} />
          ) : cursosFiltrados.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={<Library className="h-8 w-8" strokeWidth={1.25} />}
                title="Nenhum curso nesta categoria"
                description={
                  categoria !== "Todas" || busca.trim() || painelAtivo
                    ? "Nenhum curso corresponde à combinação atual. Limpe os filtros ou amplie os critérios."
                    : "Ajuste a busca ou cadastre um novo curso para ampliar o catálogo do DHO."
                }
                actionLabel={categoria !== "Todas" || busca.trim() || painelAtivo ? "Limpar filtros" : "Novo Curso"}
                onAction={
                  categoria !== "Todas" || busca.trim() || painelAtivo
                    ? clearAllFilters
                    : () => {
                        setNcTitulo("");
                        setNcCategoria(NOVO_CURSO_CATEGORIAS[0]);
                        setNcDescricao("");
                        setNcResponsavel("");
                        setNcModulos("");
                        setNcDuracao("");
                        setNcFormato("Online");
                        setNcObrigatoriedade("Opcional");
                        setShowNewCurso(true);
                      }
                }
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.28 }}
              className="p-4 sm:p-6"
            >
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {cursosFiltrados.map((curso) => (
                  <li key={curso.id}>
                    <article className="group flex h-full flex-col rounded-radius-l border border-[#334155] bg-[#0f172a]/50 transition-colors hover:border-zinc-600 hover:bg-[#0f172a]/80">
                      <button
                        type="button"
                        onClick={() => setDetailCurso(curso)}
                        className="flex flex-1 flex-col rounded-t-radius-l p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-inset"
                      >
                        <span className="inline-flex w-fit px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-radius-s bg-zinc-800 text-zinc-400 border border-zinc-700">
                          {curso.categoria}
                        </span>
                        <h3 className="mt-3 line-clamp-2 text-sm font-bold leading-snug text-[#e7e5e4]">{curso.nome}</h3>
                        <p className="mt-2 text-[11px] text-zinc-500">Resp: {curso.responsavel}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
                          <span className="font-mono">{curso.duracao}</span>
                          <span className="text-zinc-600">·</span>
                          <span>{curso.formato}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {curso.obrigatorio ? (
                            <span className="text-[10px] font-bold text-rose-600 bg-rose-950/40 px-2 py-0.5 rounded-radius-s">
                              Obrigatório
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium text-zinc-500">Opcional</span>
                          )}
                          <StatusBadge status={curso.status as any} />
                        </div>
                      </button>
                      <div className="flex items-center justify-end gap-0.5 border-t border-[#334155] px-2 py-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="p-2 hover:bg-zinc-700 rounded-radius-m text-zinc-400 transition-colors"
                              aria-label="Associar a trilha"
                            >
                              <BookOpen size={16} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Associar a trilha</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="p-2 hover:bg-zinc-700 rounded-radius-m text-zinc-400 transition-colors"
                              aria-label="Visualizar participantes"
                            >
                              <Users size={16} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Visualizar participantes</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="p-2 hover:bg-zinc-700 rounded-radius-m text-zinc-400 transition-colors"
                              aria-label="Editar curso"
                            >
                              <Edit size={16} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Editar curso</TooltipContent>
                        </Tooltip>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <SideDrawer
        open={filtrosOpen}
        onClose={() => setFiltrosOpen(false)}
        title="Filtros adicionais (Cursos)"
        subtitle="Separados da página Trilhas — não se misturam ao navegar entre os menus."
        overlay="subtle"
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setFiltrosPainel({ formato: ALL, obrigatoriedade: ALL })}
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
            <label htmlFor="curso-formato" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Formato
            </label>
            <select
              id="curso-formato"
              value={filtrosPainel.formato}
              onChange={(e) => setFiltrosPainel((p) => ({ ...p, formato: e.target.value }))}
              className={cn(
                "w-full h-11 rounded-radius-m border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
                "border-[#334155] bg-[#0f172a] text-[#e7e5e4]"
              )}
            >
              <option value={ALL}>Todos os formatos</option>
              <option value="Online">Online</option>
              <option value="Presencial">Presencial</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="curso-obr" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Obrigatoriedade
            </label>
            <select
              id="curso-obr"
              value={filtrosPainel.obrigatoriedade}
              onChange={(e) => setFiltrosPainel((p) => ({ ...p, obrigatoriedade: e.target.value }))}
              className="w-full h-11 rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value={ALL}>Todas</option>
              <option value="obrigatorio">Somente obrigatórios</option>
              <option value="opcional">Somente opcionais</option>
            </select>
          </div>
        </div>
      </SideDrawer>

      <SideDrawer
        open={!!detailCurso}
        onClose={() => setDetailCurso(null)}
        title={detailCurso?.nome ?? "Curso"}
        subtitle={detailCurso ? `${detailCurso.id} · ${detailCurso.categoria} · ${detailCurso.duracao}` : undefined}
        overlay="subtle"
        footer={
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setDetailCurso(null)} className="rounded-radius-m px-5 py-2.5 font-semibold">
              Fechar
            </Button>
          </div>
        }
      >
        {detailCurso ? (
          !detailDrawerReady ? (
            <CursoDetailDrawerSkeleton />
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Descrição</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{detailCurso.descricao}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Aulas / módulos</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {detailCurso.aulas.map((a, i) => (
                    <li key={i} className="pl-1">
                      {a}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )
        ) : null}
      </SideDrawer>

      <SideDrawer
        open={showNewCurso}
        onClose={() => setShowNewCurso(false)}
        title="Criar novo curso"
        subtitle="Cadastro progressivo: título e categoria bastam. Descrição, módulos e mídia podem ser adicionados depois."
        overlay="subtle"
        footer={
          <div className="flex flex-wrap justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setShowNewCurso(false)} className="rounded-radius-m px-6 font-bold">
              Cancelar
            </Button>
            <Button
              type="button"
              disabled={!ncTitulo.trim() || !ncCategoria.trim()}
              onClick={() => {
                success(
                  "Curso criado (demonstração)",
                  `Rascunho "${ncTitulo.trim()}" salvo na categoria ${ncCategoria}. Você pode completar descrição e módulos depois.`
                );
                setShowNewCurso(false);
              }}
              className="rounded-radius-m px-6 font-bold disabled:opacity-50"
            >
              Salvar curso
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="border-l-4 border-primary pl-3 text-sm font-bold uppercase tracking-widest text-primary">
              Etapa 1 — obrigatório
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Título do curso"
                requiredMark
                value={ncTitulo}
                onChange={setNcTitulo}
                placeholder="Ex: Comunicação não violenta"
              />
              <SelectField
                label="Categoria"
                requiredMark
                value={ncCategoria}
                onChange={setNcCategoria}
                options={[...NOVO_CURSO_CATEGORIAS]}
              />
            </div>
            <p className="text-xs text-zinc-500">
              Com título e categoria o catálogo já pode registrar o curso; demais campos entram como pendência de conteúdo.
            </p>
          </div>

          <Accordion type="single" collapsible className="rounded-radius-m border border-[#334155] px-3 dark:bg-[#0f172a]/60">
            <AccordionItem value="opcional" className="border-0">
              <AccordionTrigger className="text-sm font-bold uppercase tracking-widest text-primary">
                Conteúdo e configurações (opcional)
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <TextAreaField
                    label="Descrição longa"
                    value={ncDescricao}
                    onChange={setNcDescricao}
                    placeholder="Objetivos, público-alvo e conteúdo…"
                  />
                  <Field
                    label="Responsável"
                    value={ncResponsavel}
                    onChange={setNcResponsavel}
                    placeholder="Ex: RH / Instrutor"
                  />
                  <TextAreaField
                    label="Módulos / aulas (uma por linha)"
                    value={ncModulos}
                    onChange={setNcModulos}
                    placeholder={"Ex: Módulo 1 — Introdução\nMódulo 2 — Prática"}
                  />
                  <p className="text-[11px] text-zinc-500">
                    Arquivos de mídia e edição fina podem ser feitos na tela de edição completa do curso.
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Duração (carga horária)"
                      value={ncDuracao}
                      onChange={setNcDuracao}
                      placeholder="Ex: 8h"
                    />
                    <SelectField
                      label="Formato"
                      value={ncFormato}
                      onChange={setNcFormato}
                      options={["Online", "Presencial", "Híbrido"]}
                    />
                    <div className="sm:col-span-2">
                      <SelectField
                        label="Obrigatoriedade"
                        value={ncObrigatoriedade}
                        onChange={setNcObrigatoriedade}
                        options={["Opcional", "Obrigatório"]}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SideDrawer>
    </div>
  );
}

function Field({
  label,
  placeholder,
  value = "",
  onChange,
  requiredMark,
}: {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
  requiredMark?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold uppercase text-zinc-500">
        {label}
        {requiredMark ? <span className="text-rose-500"> *</span> : null}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-radius-m border border-[#334155] bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:bg-[#1e293b]"
      />
    </div>
  );
}

function SelectField({
  label,
  options,
  value = "",
  onChange,
  requiredMark,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
  requiredMark?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold uppercase text-zinc-500">
        {label}
        {requiredMark ? <span className="text-rose-500"> *</span> : null}
      </label>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-10 w-full cursor-pointer appearance-none rounded-radius-m border border-[#334155] bg-[#1e293b] px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  label,
  placeholder,
  value = "",
  onChange,
}: {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold uppercase text-zinc-500">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="min-h-[5rem] w-full resize-y rounded-radius-m border border-[#334155] bg-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:bg-[#1e293b]"
      />
    </div>
  );
}
