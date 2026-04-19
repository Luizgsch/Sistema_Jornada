import { useCallback, useMemo, useState, type ComponentType } from "react";
import {
  Users,
  MoreHorizontal,
  Eye,
  Edit,
  ArrowRightLeft,
  MapPin,
  Calendar,
  ShieldCheck,
  Smartphone,
  Info,
  X,
  GraduationCap,
  Award,
  AlertCircle,
} from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { mockOperacoesColaboradores, type CadastroColaboradorStatus } from "@/infrastructure/mock/mockOperacoes";
import {
  getColaboradorComplianceGaps,
  getColaboradorProfileCompletenessPercent,
} from "@/shared/lib/colaboradorCompliance";
import { cn } from "@/shared/lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/shared/ui/Toast";

import { PageHeader } from "@/shared/ui/PageHeader";
import { FiltersBar } from "@/shared/ui/FiltersBar";
import { Modal } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";
import { SearchAutocomplete } from "@/shared/components/search/SearchAutocomplete";
import { highlightMatch } from "@/shared/lib/highlightMatch";
import {
  colaboradorMatchesQuery,
  fetchColaboradorSuggestions,
  type ColaboradorRow,
} from "./colaboradoresSearch";
import { useDrawerContentReady } from "@/shared/hooks/useSimulatedLoading";
import { ColaboradorDrawerHeaderSkeleton, ColaboradorDrawerBodySkeleton } from "@/shared/components/skeletons/pageSkeletons";

export default function ColaboradoresPage() {
  const [selectedColab, setSelectedColab] = useState<ColaboradorRow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const [buscaDebounced, setBuscaDebounced] = useState("");
  const [filtroCadastro, setFiltroCadastro] = useState<"todos" | "incompleto">("todos");
  const [modalTab, setModalTab] = useState<"essencial" | "complementar">("essencial");
  const [extraColaboradores, setExtraColaboradores] = useState<ColaboradorRow[]>([]);
  const [fNome, setFNome] = useState("");
  const [fCargo, setFCargo] = useState("");
  const [fAdmissao, setFAdmissao] = useState("");
  const [fSetor, setFSetor] = useState("");
  const [fGestor, setFGestor] = useState("");
  const [fContrato, setFContrato] = useState("CLT");
  const [fEmail, setFEmail] = useState("");
  const [fCpf, setFCpf] = useState("");
  const [fTelefone, setFTelefone] = useState("");
  const [fEndereco, setFEndereco] = useState("");
  const [fPis, setFPis] = useState("");
  const [fTitulo, setFTitulo] = useState("");

  const { success, info } = useToast();

  const todosColaboradores = useMemo(
    () => [...mockOperacoesColaboradores, ...extraColaboradores],
    [extraColaboradores]
  );

  const podeSalvarNovoColab =
    fNome.trim().length > 0 && fCargo.trim().length > 0 && fAdmissao.trim().length > 0;

  const resetNovoColaboradorForm = useCallback(() => {
    setModalTab("essencial");
    setFNome("");
    setFCargo("");
    setFAdmissao("");
    setFSetor("");
    setFGestor("");
    setFContrato("CLT");
    setFEmail("");
    setFCpf("");
    setFTelefone("");
    setFEndereco("");
    setFPis("");
    setFTitulo("");
  }, []);

  const colaboradoresVisiveis = useMemo(() => {
    let list = todosColaboradores;
    if (filtroCadastro === "incompleto") {
      list = list.filter(
        (c) =>
          getColaboradorComplianceGaps(c).length > 0 || (c as { cadastroStatus?: CadastroColaboradorStatus }).cadastroStatus === "incompleto"
      );
    }
    const q = buscaDebounced.trim();
    if (!q) return list;
    return list.filter((c) => colaboradorMatchesQuery(c, q));
  }, [buscaDebounced, filtroCadastro, todosColaboradores]);

  const fetchColabSuggestions = useCallback(
    (q: string) => fetchColaboradorSuggestions(q, todosColaboradores),
    [todosColaboradores]
  );

  const handleExportColaboradores = () => {
    success("Exportação iniciada", "O arquivo será gerado com os filtros atuais da listagem (demonstração).");
  };

  const stats = {
    total: todosColaboradores.length,
    tecnologia: todosColaboradores.filter((c) => c.setor === "Tecnologia").length,
    temporarios: todosColaboradores.filter((c) => c.contrato === "Temporário").length,
    clt: todosColaboradores.filter((c) => c.contrato === "CLT").length,
  };

  const drawerReady = useDrawerContentReady(!!selectedColab, selectedColab?.matricula ?? null, 400);

  return (
    <div className="h-full flex flex-col space-y-6">
      <PageHeader
        title="Colaboradores"
        description="Gestão completa do quadro de funcionários. Acompanhe dados cadastrais, cargo, documentação e histórico."
        actionLabel="Novo Colaborador"
        onAction={() => {
          setModalTab("essencial");
          setFNome("");
          setFCargo("");
          setFAdmissao("");
          setFSetor("");
          setFGestor("");
          setFContrato("CLT");
          setFEmail("");
          setFCpf("");
          setFTelefone("");
          setFEndereco("");
          setFPis("");
          setFTitulo("");
          setIsModalOpen(true);
        }}
      />

      <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
        <StatCard title="Total Ativos" value={stats.total} icon={Users} color="text-primary" />
        <StatCard title="Tecnologia" value={stats.tecnologia} icon={Smartphone} color="text-blue-400" />
        <StatCard title="Temporários" value={stats.temporarios} icon={Calendar} color="text-amber-400" />
        <StatCard title="Efetivos (CLT)" value={stats.clt} icon={ShieldCheck} color="text-emerald-400" />
      </div>

      <FiltersBar
        searchSlot={
          <SearchAutocomplete<ColaboradorRow>
            value={busca}
            onChange={setBusca}
            onDebouncedQueryChange={setBuscaDebounced}
            fetchSuggestions={fetchColabSuggestions}
            onSelect={(item) => {
              const c = item.data;
              const t = c?.nome ?? item.title;
              setBusca(t);
              setBuscaDebounced(t);
            }}
            placeholder="Buscar por nome, matrícula, CPF, cargo ou setor..."
            maxSuggestions={5}
            debounceMs={300}
            aria-label="Buscar colaboradores"
            renderSuggestion={(item, q) => {
              const c = item.data;
              if (!c) return null;
              return (
                <div className="flex min-w-0 flex-1 items-center gap-3 text-left">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-800 dark:bg-zinc-700 dark:text-[#e7e5e4]">
                    {c.nome.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="min-w-0 truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                        {highlightMatch(c.nome, q)}
                      </span>
                      <span className="shrink-0 rounded-md border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                        {item.matchLabel}
                      </span>
                    </div>
                    <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{highlightMatch(c.setor, q)}</p>
                  </div>
                </div>
              );
            }}
          />
        }
        showExport
        exportLabel="Exportar"
        onExportClick={handleExportColaboradores}
      >
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <label htmlFor="colab-filtro-cadastro" className="sr-only">
            Filtrar por completude do cadastro
          </label>
          <select
            id="colab-filtro-cadastro"
            value={filtroCadastro}
            onChange={(e) => setFiltroCadastro(e.target.value as "todos" | "incompleto")}
            className="h-10 rounded-radius-m border border-zinc-200 bg-zinc-50 px-3 text-sm font-semibold text-zinc-800 dark:border-[#334155] dark:bg-[#0f172a] dark:text-[#e7e5e4] focus:outline-none focus:ring-1 focus:ring-primary/30"
          >
            <option value="todos">Todos os cadastros</option>
            <option value="incompleto">Cadastro incompleto</option>
          </select>
        </div>
      </FiltersBar>

      <div className="bg-[#1e293b] rounded-radius-l border border-[#334155] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#0f172a] text-slate-500 dark:text-slate-300 text-xs font-semibold uppercase tracking-widest">
              <tr>
                <th className="py-4 px-6 border-b border-[#334155]">Matrícula</th>
                <th className="py-4 px-6 border-b border-[#334155]">Colaborador</th>
                <th className="py-4 px-6 border-b border-[#334155]">Cargo / Setor</th>
                <th className="py-4 px-6 border-b border-[#334155]">Gestor</th>
                <th className="py-4 px-6 border-b border-[#334155]">Contrato</th>
                <th className="py-4 px-6 border-b border-[#334155]">Admissão</th>
                <th className="py-4 px-6 border-b border-[#334155]">Status</th>
                <th className="py-4 px-6 border-b border-[#334155] text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {colaboradoresVisiveis.map((colab) => {
                const pendencias = getColaboradorComplianceGaps(colab);
                const temPendencia = pendencias.length > 0;
                return (
                <tr key={colab.matricula} className="group hover:bg-zinc-800/30 transition-colors">
                  <td className="py-4 px-6 border-b border-[#334155] font-mono text-xs text-zinc-600">{colab.matricula}</td>
                  <td className="py-4 px-6 border-b border-[#334155]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-[#e7e5e4] font-bold text-xs shrink-0">
                        {colab.nome.charAt(0)}
                      </div>
                      <span className="font-bold text-[#e7e5e4]">{colab.nome}</span>
                      {temPendencia ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className="inline-flex shrink-0 text-amber-400"
                              aria-label="Há dados de conformidade pendentes"
                            >
                              <AlertCircle size={16} strokeWidth={2.25} />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs text-left">
                            Pendências: {pendencias.map((p) => p.label).join(", ")}
                          </TooltipContent>
                        </Tooltip>
                      ) : null}
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b border-[#334155]">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#e7e5e4]">{colab.cargo}</span>
                      <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{colab.setor}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b border-[#334155] text-zinc-500 text-xs">{colab.gestor}</td>
                  <td className="py-4 px-6 border-b border-[#334155]">
                    <span className="text-xs font-medium px-2.5 py-0.5 bg-zinc-800 rounded-radius-m border border-zinc-700 text-zinc-400">
                      {colab.contrato}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-b border-[#334155] text-xs text-zinc-600 font-mono">{colab.admissao}</td>
                  <td className="py-4 px-6 border-b border-[#334155]">
                    <StatusBadge status={colab.status as any} />
                  </td>
                  <td className="py-4 px-6 border-b border-[#334155]">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => setSelectedColab(colab)}
                            className="p-1.5 hover:bg-primary/10 text-primary rounded-radius-m transition-colors"
                            aria-label="Visualizar perfil completo"
                          >
                            <Eye size={14} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Visualizar perfil completo</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="p-1.5 hover:bg-zinc-700 text-zinc-500 rounded-radius-m transition-colors"
                            aria-label="Mais ações"
                          >
                            <MoreHorizontal size={14} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Mais ações</TooltipContent>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Profile Drawer */}
      <AnimatePresence>
        {selectedColab && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedColab(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 flex w-full max-w-xl flex-col border-l border-[#334155] bg-[#1e293b] z-[110] 2xl:max-w-5xl"
            >
              <div className="flex items-start justify-between border-b border-[#334155] bg-[#0f172a] p-6 sm:p-8">
                {!drawerReady ? (
                  <ColaboradorDrawerHeaderSkeleton />
                ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="flex min-w-0 flex-1 flex-col gap-5 sm:flex-row sm:items-center 2xl:gap-8"
                >
                  <div className="flex min-w-0 items-center gap-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-radius-m border border-primary/30 bg-primary/20 text-3xl font-bold text-primary">
                      {selectedColab.nome.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold tracking-tighter text-[#e7e5e4]">{selectedColab.nome}</h2>
                      <p className="text-sm font-medium text-zinc-500">{selectedColab.cargo}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <StatusBadge status={selectedColab.status} />
                        <span className="rounded-radius-m border border-[#334155] bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-500">
                          {selectedColab.matricula}
                        </span>
                      </div>
                    </div>
                  </div>
                  <dl className="hidden min-w-0 shrink-0 text-right 2xl:block">
                    <dt className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Admissão</dt>
                    <dd className="mt-1 font-mono text-sm text-[#e7e5e4]">{selectedColab.admissao}</dd>
                    <dt className="mt-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Contrato</dt>
                    <dd className="mt-1 text-sm font-semibold text-[#e7e5e4]">{selectedColab.contrato}</dd>
                  </dl>
                </motion.div>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setSelectedColab(null)}
                      className="p-2 hover:bg-zinc-800 rounded-radius-m transition-colors text-zinc-400"
                      aria-label="Fechar painel"
                    >
                      <X size={20} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Fechar</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {!drawerReady ? (
                  <ColaboradorDrawerBodySkeleton />
                ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.28 }}
                  className="space-y-8 2xl:grid 2xl:grid-cols-2 2xl:gap-x-10 2xl:space-y-0"
                >
                <div className="min-w-0 space-y-8">
                <Section title="Completude do cadastro">
                  <div className="rounded-radius-m border border-[#334155] bg-[#0f172a] p-4">
                    <div className="flex flex-wrap items-end justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Perfil cadastral</p>
                        <p className="text-lg font-black text-[#e7e5e4]">
                          {getColaboradorProfileCompletenessPercent(selectedColab)}% completo
                        </p>
                      </div>
                      {getColaboradorComplianceGaps(selectedColab).length > 0 ? (
                        <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-400">
                          Cadastro incompleto
                        </span>
                      ) : (
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-400">
                          Conformidade ok
                        </span>
                      )}
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${getColaboradorProfileCompletenessPercent(selectedColab)}%` }}
                      />
                    </div>
                    {getColaboradorComplianceGaps(selectedColab).length > 0 ? (
                      <ul className="mt-3 list-inside list-disc space-y-1 text-xs text-zinc-400">
                        {getColaboradorComplianceGaps(selectedColab).map((g) => (
                          <li key={g.key}>{g.label}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-xs text-zinc-500">Nenhuma pendência obrigatória no momento.</p>
                    )}
                  </div>
                </Section>

                <Section title="Informações Pessoais">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                    <InfoItem icon={Info} label="CPF" value={selectedColab.cpf} />
                    <InfoItem icon={Smartphone} label="Telefone" value={selectedColab.telefone} />
                    <div className="sm:col-span-2 2xl:col-span-3">
                      <InfoItem icon={MapPin} label="Endereço" value={selectedColab.endereco} />
                    </div>
                  </div>
                </Section>

                <Section title="Documentos (conformidade)">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InfoItem label="PIS/PASEP" value={selectedColab.pisPasep} />
                    <InfoItem label="Título de eleitor" value={selectedColab.tituloEleitor} />
                  </div>
                </Section>

                <Section title="Informações Profissionais">
                  <div className="grid grid-cols-1 gap-4 rounded-radius-m border border-[#334155] bg-[#0f172a] p-4 sm:grid-cols-2 2xl:grid-cols-2">
                    <InfoItem label="Setor" value={selectedColab.setor} />
                    <InfoItem label="Gestor" value={selectedColab.gestor} />
                    <InfoItem label="Contrato" value={selectedColab.contrato} />
                    <InfoItem label="Data Admissão" value={selectedColab.admissao} />
                  </div>
                </Section>
                </div>

                <div className="min-w-0 space-y-8">
                <Section title="Uniforme Registrado">
                  <div className="flex flex-col items-stretch gap-4 rounded-radius-m border border-[#334155] bg-[#0f172a] p-4 sm:flex-row sm:items-center">
                    <div className="flex-1 text-center">
                      <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Camisa</p>
                      <p className="text-lg font-bold text-[#e7e5e4]">{selectedColab.uniforme.camisa}</p>
                    </div>
                    <div className="w-px h-8 bg-[#334155]" />
                    <div className="flex-1 text-center">
                      <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Calça</p>
                      <p className="text-lg font-bold text-[#e7e5e4]">{selectedColab.uniforme.calca}</p>
                    </div>
                    <div className="w-px h-8 bg-[#334155]" />
                    <div className="flex-1 text-center">
                      <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Calçado</p>
                      <p className="text-lg font-bold text-[#e7e5e4]">{selectedColab.uniforme.calcado}</p>
                    </div>
                  </div>
                </Section>

                <Section title="Evolução Corporativa (Treinamentos)">
                  <div className="p-5 border border-[#334155] rounded-radius-m bg-[#0f172a] relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-zinc-800 group-hover:text-zinc-700 transition-colors">
                      <GraduationCap size={90} />
                    </div>
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-[#e7e5e4] flex items-center gap-2 text-sm">
                            <Award size={16} className="text-primary" />
                            Nível de Capacitação: Avançado
                          </h4>
                          <p className="text-xs text-zinc-600 mt-1">Trilha de Liderança 2026</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-[#e7e5e4]">85%</span>
                          <p className="text-[10px] uppercase font-bold text-zinc-600 mt-0.5 tracking-widest">Concluído</p>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '85%' }} />
                      </div>
                      <button
                        onClick={() => info("Redirecionando", `Acessando histórico escolar de ${selectedColab.nome}`)}
                        className="mt-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center justify-center border border-primary/20 bg-primary/5 py-2 rounded-radius-m"
                      >
                        Ver Histórico Completo em Treinamentos
                      </button>
                    </div>
                  </div>
                </Section>

                <Section title="Histórico de Movimentações">
                  <div className="space-y-4">
                    {selectedColab.historico.map((h: any, i: number) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                          {i < selectedColab.historico.length - 1 && (
                            <div className="w-px flex-1 bg-[#334155] my-1" />
                          )}
                        </div>
                        <div className="pb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#e7e5e4]">{h.tipo}</span>
                            <span className="text-[10px] text-zinc-600">{h.data}</span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{h.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
                </div>
                </motion.div>
                )}
              </div>

              <div className="p-6 border-t border-[#334155] bg-[#0f172a] flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => info("Modo de Edição", `Editando os dados de ${selectedColab.nome}`)}
                  className="h-11 flex-1 gap-2 rounded-radius-m font-bold"
                >
                  <Edit size={16} />
                  Editar Dados
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    success("Movimentação Registrada", "A solicitação foi enviada para aprovação do RH.");
                    setSelectedColab(null);
                  }}
                  className="h-11 flex-1 gap-2 rounded-radius-m font-bold"
                >
                  <ArrowRightLeft size={16} />
                  Registrar Movimentação
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetNovoColaboradorForm();
        }}
        maxWidth="xl"
        title="Novo Colaborador"
        description="Cadastro progressivo: nome, cargo e admissão criam o registro. PIS, título e endereço podem ser preenchidos depois (aparecem como pendências)."
        footer={
          <>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsModalOpen(false);
                resetNovoColaboradorForm();
              }}
              className="font-bold rounded-radius-m"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              disabled={!podeSalvarNovoColab}
              onClick={() => {
                const base = {
                  nome: fNome.trim(),
                  cargo: fCargo.trim(),
                  admissao: fAdmissao.trim(),
                  setor: fSetor.trim() || "A definir",
                  gestor: fGestor.trim() || "A definir",
                  contrato: fContrato,
                  cpf: fCpf.trim(),
                  telefone: fTelefone.trim(),
                  endereco: fEndereco.trim(),
                  pisPasep: fPis.trim(),
                  tituloEleitor: fTitulo.trim(),
                };
                const novo: ColaboradorRow = {
                  matricula: `MAT-${String(180 + extraColaboradores.length).padStart(3, "0")}`,
                  nome: base.nome,
                  cargo: base.cargo,
                  setor: base.setor,
                  gestor: base.gestor,
                  contrato: base.contrato as ColaboradorRow["contrato"],
                  admissao: base.admissao,
                  status: "ativo",
                  cadastroStatus: "incompleto" as CadastroColaboradorStatus,
                  cpf: base.cpf,
                  telefone: base.telefone,
                  endereco: base.endereco,
                  pisPasep: base.pisPasep,
                  tituloEleitor: base.tituloEleitor,
                  uniforme: {
                    camisa: "—",
                    calca: "—",
                    calcado: "—",
                    status: "pendente",
                  },
                  historico: [
                    {
                      data: base.admissao,
                      tipo: "Admissão",
                      desc: "Registro criado com cadastro progressivo (dados complementares pendentes).",
                    },
                  ],
                };
                const gaps = getColaboradorComplianceGaps(novo);
                novo.cadastroStatus = (gaps.length === 0 ? "completo" : "incompleto") as CadastroColaboradorStatus;
                setExtraColaboradores((prev) => [...prev, novo]);
                success(
                  "Colaborador registrado",
                  gaps.length
                    ? `Perfil criado com ${gaps.length} pendência(s) de conformidade.`
                    : "Cadastro completo nesta etapa."
                );
                setIsModalOpen(false);
                resetNovoColaboradorForm();
              }}
              className="font-bold rounded-radius-m disabled:opacity-50"
            >
              Salvar registro
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex gap-2 rounded-radius-m border border-[#334155] bg-[#0f172a] p-1">
            <button
              type="button"
              onClick={() => setModalTab("essencial")}
              className={cn(
                "flex-1 rounded-radius-m px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors",
                modalTab === "essencial" ? "bg-primary text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              Dados essenciais
            </button>
            <button
              type="button"
              onClick={() => setModalTab("complementar")}
              className={cn(
                "flex-1 rounded-radius-m px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors",
                modalTab === "complementar" ? "bg-primary text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              Dados complementares
            </button>
          </div>

          {modalTab === "essencial" ? (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Nome completo <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={fNome}
                  onChange={(e) => setFNome(e.target.value)}
                  className="h-10 w-full rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                  placeholder="Ex: João da Silva"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Cargo <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fCargo}
                    onChange={(e) => setFCargo(e.target.value)}
                    className="h-10 w-full rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                    placeholder="Ex: Analista"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Data de admissão <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={fAdmissao}
                    onChange={(e) => setFAdmissao(e.target.value)}
                    className="h-10 w-full rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:border-zinc-600 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">Setor</label>
                  <input
                    type="text"
                    value={fSetor}
                    onChange={(e) => setFSetor(e.target.value)}
                    className="h-10 w-full rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                    placeholder="Opcional nesta etapa"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">Gestor</label>
                  <input
                    type="text"
                    value={fGestor}
                    onChange={(e) => setFGestor(e.target.value)}
                    className="h-10 w-full rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                    placeholder="Opcional"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">Contrato</label>
                  <select
                    value={fContrato}
                    onChange={(e) => setFContrato(e.target.value)}
                    className="h-10 w-full rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] focus:border-zinc-600 focus:outline-none"
                  >
                    <option value="CLT">CLT</option>
                    <option value="Temporário">Temporário</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">E-mail corporativo</label>
                  <input
                    type="email"
                    value={fEmail}
                    onChange={(e) => setFEmail(e.target.value)}
                    className="h-10 w-full rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                    placeholder="Opcional no primeiro save"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-zinc-500">
                Estes campos são opcionais na criação. Enquanto vazios, aparecem como pendências de conformidade no perfil.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">CPF</label>
                  <input
                    type="text"
                    value={fCpf}
                    onChange={(e) => setFCpf(e.target.value)}
                    className="h-10 w-full rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">Telefone</label>
                  <input
                    type="text"
                    value={fTelefone}
                    onChange={(e) => setFTelefone(e.target.value)}
                    className="h-10 w-full rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">Endereço completo</label>
                <input
                  type="text"
                  value={fEndereco}
                  onChange={(e) => setFEndereco(e.target.value)}
                  className="h-10 w-full rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                  placeholder="Logradouro, número, cidade"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">PIS/PASEP</label>
                  <input
                    type="text"
                    value={fPis}
                    onChange={(e) => setFPis(e.target.value)}
                    className="h-10 w-full rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-500">Título de eleitor</label>
                  <input
                    type="text"
                    value={fTitulo}
                    onChange={(e) => setFTitulo(e.target.value)}
                    className="h-10 w-full rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="flex flex-col gap-3 rounded-radius-l border border-[#334155] bg-[#1e293b] p-5 transition-colors hover:border-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-radius-m bg-zinc-800 ${color}`}>
        <Icon size={16} />
      </div>
      <div className="min-w-0 text-left sm:text-right">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">{title}</p>
        <span className="text-2xl font-bold leading-none tracking-tighter text-[#e7e5e4] sm:text-3xl">{value}</span>
      </div>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-600 border-b border-[#334155] pb-2">{title}</h3>
      {children}
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon?: ComponentType<{ size?: number }>; label: string; value?: string }) {
  const empty = value == null || String(value).trim() === "";
  return (
    <div className="space-y-1">
      <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
        {Icon ? <Icon size={10} /> : null}
        {label}
      </p>
      <p className={cn("text-sm font-bold", empty ? "text-amber-500/90" : "text-[#e7e5e4]")}>{empty ? "Pendente" : value}</p>
    </div>
  );
}
