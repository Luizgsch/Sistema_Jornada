import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Filter, Plus, Mail, Download, MapPin, User, AlertCircle } from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import {
  mockBancoCandidatos,
  mockRecrutamentoVagas,
  type CadastroCandidatoStatus,
} from "@/infrastructure/mock/mockRecrutamento";
import { SideDrawer } from "@/shared/ui/SideDrawer";
import { Modal } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import { useToast } from "@/shared/ui/Toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";
import { FilterChipsBar, type FilterChipModel } from "@/shared/components/filters/FilterChipsBar";
import { cn } from "@/shared/lib/cn";
import { useInitialSimulatedLoading, useDrawerContentReady } from "@/shared/hooks/useSimulatedLoading";
import { BancoCandidatosTableSkeleton, BancoCandidatoDrawerBodySkeleton } from "@/shared/components/skeletons/pageSkeletons";
import { SearchAutocomplete } from "@/shared/components/search/SearchAutocomplete";
import {
  bancoCandidatoMatchesQuery,
  fetchBancoCandidatoSuggestions,
  type BancoCandidatoRow,
} from "./bancoCandidatosSearch";

type BancoCandidato = BancoCandidatoRow;

const defaultFilters = {
  busca: "",
  cidade: "Todas",
  origem: "Todas",
  status: "Todas",
  cadastro: "Todos" as "Todos" | "Completo" | "Incompleto",
};

export default function BancoCandidatos() {
  const [perfil, setPerfil] = useState<BancoCandidato | null>(null);
  const [fullEditCandidato, setFullEditCandidato] = useState<BancoCandidato | null>(null);
  const [editCompletoOpen, setEditCompletoOpen] = useState(false);
  const [novoCandidatoOpen, setNovoCandidatoOpen] = useState(false);
  const [extraCandidatos, setExtraCandidatos] = useState<BancoCandidato[]>([]);
  const [nNome, setNNome] = useState("");
  const [nEmail, setNEmail] = useState("");
  const [nVagaId, setNVagaId] = useState(mockRecrutamentoVagas[0]?.id ?? "");
  const [nLink, setNLink] = useState("");
  const { success } = useToast();

  const [filtros, setFiltros] = useState(defaultFilters);
  /** Texto de busca debounced (300 ms) — alinhado ao auto-complete e às chamadas simuladas. */
  const [buscaDebounced, setBuscaDebounced] = useState("");
  const [filtrosAvancadosOpen, setFiltrosAvancadosOpen] = useState(false);

  const todosCandidatos = useMemo(() => [...mockBancoCandidatos, ...extraCandidatos], [extraCandidatos]);

  const cidadesOpcoes = useMemo(() => {
    const u = [...new Set(todosCandidatos.map((c) => c.cidade))].sort();
    return ["Todas", ...u];
  }, [todosCandidatos]);

  const origensOpcoes = useMemo(() => {
    const u = [...new Set(todosCandidatos.map((c) => c.origem))].sort();
    return ["Todas", ...u];
  }, [todosCandidatos]);

  const statusOpcoes = useMemo(() => {
    const u = [...new Set(todosCandidatos.map((c) => c.status))].sort();
    return ["Todas", ...u];
  }, [todosCandidatos]);

  const candidatosFiltrados = useMemo(() => {
    const q = buscaDebounced.trim();
    return todosCandidatos.filter((c) => {
      if (filtros.cidade !== "Todas" && c.cidade !== filtros.cidade) return false;
      if (filtros.origem !== "Todas" && c.origem !== filtros.origem) return false;
      if (filtros.status !== "Todas" && c.status !== filtros.status) return false;
      const st = (c.cadastroStatus ?? "completo") as CadastroCandidatoStatus;
      if (filtros.cadastro === "Completo" && st !== "completo") return false;
      if (filtros.cadastro === "Incompleto" && st !== "incompleto") return false;
      if (!q) return true;
      return bancoCandidatoMatchesQuery(c, q);
    });
  }, [filtros, buscaDebounced, todosCandidatos]);

  const clearAllFilters = useCallback(() => {
    setFiltros({ ...defaultFilters });
    setBuscaDebounced("");
  }, []);

  const fetchCandidatoSuggestions = useCallback(
    (q: string) => fetchBancoCandidatoSuggestions(q, todosCandidatos),
    [todosCandidatos]
  );

  const podeSalvarNovoCandidato =
    nNome.trim().length > 0 &&
    nEmail.trim().length > 0 &&
    nVagaId.length > 0 &&
    nLink.trim().length > 0;

  const filtrosAvancadosAtivos =
    filtros.cidade !== "Todas" ||
    filtros.origem !== "Todas" ||
    filtros.status !== "Todas" ||
    filtros.cadastro !== "Todos";

  const showFunnelDot = !filtrosAvancadosOpen && filtrosAvancadosAtivos;

  const listLoading = useInitialSimulatedLoading(480);
  const perfilDrawerReady = useDrawerContentReady(!!perfil, perfil?.id ?? null, 380);

  const filterChips: FilterChipModel[] = useMemo(() => {
    const chips: FilterChipModel[] = [];
    const b = filtros.busca.trim();
    if (b) {
      chips.push({
        id: "busca",
        label: `Busca: ${b}`,
        onRemove: () => {
          setFiltros((p) => ({ ...p, busca: "" }));
          setBuscaDebounced("");
        },
      });
    }
    if (filtros.cidade !== "Todas") {
      chips.push({
        id: "cidade",
        label: `Cidade: ${filtros.cidade}`,
        onRemove: () => setFiltros((p) => ({ ...p, cidade: "Todas" })),
      });
    }
    if (filtros.origem !== "Todas") {
      chips.push({
        id: "origem",
        label: `Origem: ${filtros.origem}`,
        onRemove: () => setFiltros((p) => ({ ...p, origem: "Todas" })),
      });
    }
    if (filtros.status !== "Todas") {
      chips.push({
        id: "status",
        label: `Status: ${filtros.status}`,
        onRemove: () => setFiltros((p) => ({ ...p, status: "Todas" })),
      });
    }
    if (filtros.cadastro !== "Todos") {
      chips.push({
        id: "cadastro",
        label: `Cadastro: ${filtros.cadastro}`,
        onRemove: () => setFiltros((p) => ({ ...p, cadastro: "Todos" })),
      });
    }
    return chips;
  }, [filtros]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#e7e5e4] dark:text-white">Banco de Candidatos</h1>
          <p className="text-zinc-500 dark:text-slate-400 mt-1 leading-relaxed text-sm">Acesse sua base de talentos para futuras oportunidades.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setNNome("");
              setNEmail("");
              setNVagaId(mockRecrutamentoVagas[0]?.id ?? "");
              setNLink("");
              setNovoCandidatoOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
          >
            <Plus size={16} />
            Adicionar Candidato
          </button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4 px-6 border-b border-[#334155] space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <SearchAutocomplete<BancoCandidato>
                value={filtros.busca}
                onChange={(v) => setFiltros((p) => ({ ...p, busca: v }))}
                onDebouncedQueryChange={setBuscaDebounced}
                fetchSuggestions={fetchCandidatoSuggestions}
                onSelect={(item) => {
                  const row = item.data;
                  const t = row?.nome ?? item.title;
                  setFiltros((p) => ({ ...p, busca: t }));
                  setBuscaDebounced(t);
                }}
                placeholder="Buscar por nome, CPF, e-mail, cargo..."
                maxSuggestions={5}
                debounceMs={300}
                inputClassName="!rounded-lg !border-[#334155] !bg-[#0f172a] !text-[#f8fafc] !placeholder:text-slate-500 focus:!ring-0 focus:!border-slate-500"
                aria-label="Buscar candidatos no banco"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltrosAvancadosOpen(true)}
                className="relative inline-flex items-center gap-2 h-10 px-3 border border-[#334155] rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 transition-colors"
              >
                <Filter size={14} />
                Filtros avançados
                {showFunnelDot ? (
                  <span
                    className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-[#0f172a]"
                    title="Há filtros do painel aplicados"
                    aria-label="Há filtros do painel aplicados"
                  />
                ) : null}
              </button>
              <button
                type="button"
                title="Exportar base para planilha ou ATS"
                className="inline-flex items-center gap-2 h-10 px-3 border border-[#334155] rounded-lg text-sm font-medium text-zinc-500 bg-transparent hover:bg-zinc-800/50 hover:text-zinc-300 transition-colors"
              >
                <Download size={14} />
                Exportar
              </button>
            </div>
          </div>
          <FilterChipsBar chips={filterChips} onClearAll={clearAllFilters} />
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {listLoading ? (
              <BancoCandidatosTableSkeleton rows={8} />
            ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#0f172a] text-slate-500 dark:text-slate-300 text-xs font-semibold uppercase tracking-widest">
                <tr>
                  <th className="py-4 px-6 border-b border-[#334155]">Nome</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Cargo de Interesse</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Experiência</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Cidade</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Origem</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Status</th>
                  <th className="py-4 px-6 border-b border-[#334155] text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {candidatosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 px-6 text-center text-sm text-zinc-500">
                      Nenhum candidato encontrado.{" "}
                      <button
                        type="button"
                        onClick={clearAllFilters}
                        className="font-semibold text-primary underline-offset-2 hover:underline"
                      >
                        Limpar filtros
                      </button>
                    </td>
                  </tr>
                ) : null}
                {candidatosFiltrados.map((candidato) => {
                  const incompleto = (candidato.cadastroStatus ?? "completo") === "incompleto";
                  return (
                  <tr key={candidato.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <div className="flex items-start gap-2">
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className="font-semibold text-[#e7e5e4] dark:text-white">{candidato.nome}</span>
                          <span className="text-xs font-normal text-zinc-500 dark:text-slate-400">{candidato.email}</span>
                          <span className="text-xs font-normal font-mono text-zinc-500/90 dark:text-slate-500">
                            {candidato.cpf ?? "CPF pendente"}
                          </span>
                        </div>
                        {incompleto ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="mt-0.5 shrink-0 text-amber-400" aria-label="Cadastro incompleto">
                                <AlertCircle size={16} strokeWidth={2.25} />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>Cadastro incompleto: complete documentos no perfil.</TooltipContent>
                          </Tooltip>
                        ) : null}
                      </div>
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <span className="font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full text-xs border border-primary/20">
                        {candidato.cargo}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155] text-zinc-400 text-sm">{candidato.experiencia}</td>
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <div className="flex items-center gap-1 text-zinc-600 text-xs">
                        <MapPin size={11} />
                        <span>{candidato.cidade}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155] text-zinc-600 text-xs">{candidato.origem}</td>
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <StatusBadge status={candidato.status as any} />
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPerfil(candidato)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-primary border border-primary/25 rounded-lg hover:bg-primary/10 transition-colors"
                          title="Ver perfil resumido"
                        >
                          <User size={14} />
                          Ver perfil
                        </button>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="p-1.5 hover:bg-primary/10 text-primary rounded-lg transition-colors border border-primary/20"
                              aria-label="Enviar e-mail ao candidato"
                            >
                              <Mail size={13} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Enviar e-mail</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="p-1.5 hover:bg-zinc-800 text-zinc-500 rounded-lg transition-colors border border-[#334155]"
                              aria-label="Adicionar à seleção ou pipeline"
                            >
                              <Plus size={13} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Adicionar à seleção</TooltipContent>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
                })}
              </tbody>
            </table>
            )}
          </div>
        </CardContent>
      </Card>

      <SideDrawer
        open={filtrosAvancadosOpen}
        onClose={() => setFiltrosAvancadosOpen(false)}
        title="Filtros avançados"
        subtitle="Cidade, origem, status e completude do cadastro combinam com a busca principal."
        overlay="subtle"
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setFiltros((p) => ({ ...p, cidade: "Todas", origem: "Todas", status: "Todas", cadastro: "Todos" }));
              }}
              className="rounded-xl px-5 py-2.5 font-semibold"
            >
              Limpar painel
            </Button>
            <Button type="button" onClick={() => setFiltrosAvancadosOpen(false)} className="rounded-xl px-5 py-2.5 font-semibold">
              Concluir
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="bc-cidade" className="text-sm font-medium text-zinc-500 dark:text-slate-400">
              Cidade
            </label>
            <select
              id="bc-cidade"
              value={filtros.cidade}
              onChange={(e) => setFiltros((p) => ({ ...p, cidade: e.target.value }))}
              className={cn(
                "w-full h-11 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
                "border-[#334155] bg-[#0f172a] text-[#e7e5e4]"
              )}
            >
              {cidadesOpcoes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="bc-origem" className="text-sm font-medium text-zinc-500 dark:text-slate-400">
              Origem
            </label>
            <select
              id="bc-origem"
              value={filtros.origem}
              onChange={(e) => setFiltros((p) => ({ ...p, origem: e.target.value }))}
              className="w-full h-11 rounded-lg border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {origensOpcoes.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="bc-status" className="text-sm font-medium text-zinc-500 dark:text-slate-400">
              Status na base
            </label>
            <select
              id="bc-status"
              value={filtros.status}
              onChange={(e) => setFiltros((p) => ({ ...p, status: e.target.value }))}
              className="w-full h-11 rounded-lg border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {statusOpcoes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="bc-cadastro" className="text-sm font-medium text-zinc-500 dark:text-slate-400">
              Cadastro
            </label>
            <select
              id="bc-cadastro"
              value={filtros.cadastro}
              onChange={(e) =>
                setFiltros((p) => ({ ...p, cadastro: e.target.value as (typeof filtros)["cadastro"] }))
              }
              className="w-full h-11 rounded-lg border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="Todos">Todos</option>
              <option value="Completo">Completo</option>
              <option value="Incompleto">Incompleto</option>
            </select>
          </div>
        </div>
      </SideDrawer>

      <SideDrawer
        open={!!perfil}
        onClose={() => setPerfil(null)}
        title={perfil?.nome ?? "Perfil"}
        subtitle={perfil ? `${perfil.cargo} · ${perfil.cidade}` : undefined}
        overlay="subtle"
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
            <Button type="button" variant="ghost" onClick={() => setPerfil(null)} className="rounded-xl px-5 py-2.5 font-semibold">
              Fechar
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (perfil) setFullEditCandidato(perfil);
                setPerfil(null);
                setEditCompletoOpen(true);
              }}
              className="rounded-xl px-5 py-2.5 font-semibold"
            >
              Editar perfil completo
            </Button>
          </div>
        }
      >
        {perfil ? (
          !perfilDrawerReady ? (
            <BancoCandidatoDrawerBodySkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="flex flex-wrap gap-2">
                {perfil.competencias.map((c) => (
                  <span key={c} className="text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-[#334155]">
                    {c}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-slate-400 mb-1">E-mail</p>
                <p className="text-sm font-normal text-[#e7e5e4] dark:text-white">{perfil.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-slate-400 mb-1">Resumo</p>
                <p className="text-sm font-normal text-zinc-400 leading-relaxed">{perfil.resumo}</p>
              </div>
            </motion.div>
          )
        ) : null}
      </SideDrawer>

      <Modal
        isOpen={novoCandidatoOpen}
        onClose={() => setNovoCandidatoOpen(false)}
        title="Novo candidato"
        description="Cadastro progressivo: nome, e-mail, vaga e link bastam para criar o registro. CPF e documentos ficam como pendência até o preenchimento."
        maxWidth="lg"
        footer={
          <>
            <Button type="button" variant="ghost" onClick={() => setNovoCandidatoOpen(false)} className="rounded-lg font-bold">
              Cancelar
            </Button>
            <Button
              type="button"
              disabled={!podeSalvarNovoCandidato}
              onClick={() => {
                const vaga = mockRecrutamentoVagas.find((v) => v.id === nVagaId) ?? mockRecrutamentoVagas[0];
                if (!vaga) return;
                const novo: BancoCandidato = {
                  id: `B-${Date.now()}`,
                  nome: nNome.trim(),
                  email: nEmail.trim(),
                  cargo: vaga.cargo,
                  cidade: "A definir",
                  experiencia: "—",
                  origem: "Cadastro manual",
                  status: "disponivel",
                  resumo:
                    "Cadastro progressivo — complete CPF e documentos no perfil quando estiverem disponíveis.",
                  competencias: [],
                  cadastroStatus: "incompleto",
                  linkCurriculoOuLinkedin: nLink.trim(),
                  vagaVinculada: vaga.id,
                };
                setExtraCandidatos((prev) => [...prev, novo]);
                success("Candidato adicionado", "Registro criado. Documentos pessoais podem ser completados depois.");
                setNovoCandidatoOpen(false);
              }}
              className="rounded-lg font-bold disabled:opacity-50"
            >
              Salvar candidato
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">
                Nome completo <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={nNome}
                onChange={(e) => setNNome(e.target.value)}
                className="h-10 w-full rounded-lg border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:border-zinc-600 focus:outline-none"
                placeholder="Nome do candidato"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">
                E-mail <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                value={nEmail}
                onChange={(e) => setNEmail(e.target.value)}
                className="h-10 w-full rounded-lg border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:border-zinc-600 focus:outline-none"
                placeholder="email@exemplo.com"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">
              Vaga <span className="text-rose-400">*</span>
            </label>
            <select
              value={nVagaId}
              onChange={(e) => setNVagaId(e.target.value)}
              className="h-10 w-full rounded-lg border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:border-zinc-600 focus:outline-none"
            >
              {mockRecrutamentoVagas.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.cargo} ({v.id})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">
              LinkedIn ou link do currículo <span className="text-rose-400">*</span>
            </label>
            <input
              type="url"
              value={nLink}
              onChange={(e) => setNLink(e.target.value)}
              className="h-10 w-full rounded-lg border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:border-zinc-600 focus:outline-none"
              placeholder="https://…"
            />
            <p className="mt-1.5 text-xs text-zinc-500">Portfolio, PDF no Drive ou perfil profissional.</p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={editCompletoOpen}
        onClose={() => {
          setEditCompletoOpen(false);
          setFullEditCandidato(null);
        }}
        title="Editar perfil completo"
        description="Formulário completo para atualização cadastral e histórico profissional (demonstração)."
        maxWidth="lg"
        footer={
          <>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setEditCompletoOpen(false);
                setFullEditCandidato(null);
              }}
              className="rounded-lg font-bold"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={() => {
                success("Perfil atualizado", "Alterações salvas na demonstração (sem persistência).");
                setEditCompletoOpen(false);
                setFullEditCandidato(null);
              }}
              className="rounded-lg font-bold"
            >
              Salvar alterações
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Nome completo</label>
              <input
                type="text"
                defaultValue={fullEditCandidato?.nome}
                className="w-full h-10 border border-[#334155] bg-[#0f172a] rounded-lg px-3 text-[#e7e5e4] text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">E-mail</label>
              <input
                type="email"
                defaultValue={fullEditCandidato?.email}
                className="w-full h-10 border border-[#334155] bg-[#0f172a] rounded-lg px-3 text-[#e7e5e4] text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Experiência e formação (texto longo)</label>
            <textarea
              rows={6}
              defaultValue={fullEditCandidato?.resumo}
              className="w-full border border-[#334155] bg-[#0f172a] rounded-lg px-3 py-2 text-[#e7e5e4] text-sm focus:outline-none focus:border-zinc-600 resize-y min-h-[120px]"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
