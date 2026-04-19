import { useMemo, useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Search, Filter, FileText, CheckCircle, Eye, UserPlus, Sparkles, History, AlertCircle, CheckCircle2, ThumbsDown } from "lucide-react";
import { FilterChipsBar, type FilterChipModel } from "@/shared/components/filters/FilterChipsBar";
import { cn } from "@/shared/lib/cn";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { motion, AnimatePresence } from "framer-motion";
import { SmartDrop } from "@/shared/components/automation/SmartDrop";
import { SideDrawer } from "@/shared/ui/SideDrawer";
import { Button } from "@/shared/ui/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";
import { useToast } from "@/shared/ui/Toast";

type DocStatus = "aprovado" | "pendente" | "reprovado" | "analise";

type DocItem = {
  id: string;
  nome: string;
  status: DocStatus;
  motivoReprovacao?: string;
  historico: { quando: string; texto: string }[];
};

const mockCandidates = [
  {
    id: "1",
    nome: "Ana Silva",
    cargo: "Desenvolvedora Frontend",
    setor: "Tecnologia",
    cpf: "123.456.789-00",
    status: "pendente",
    inicio: "2026-04-01",
    responsavel: "João Pedro",
  },
  {
    id: "2",
    nome: "Marcos Souza",
    cargo: "Analista de Dados",
    setor: "Tecnologia",
    cpf: "234.567.890-11",
    status: "analise",
    inicio: "2026-04-05",
    responsavel: "Alice Lima",
  },
  {
    id: "3",
    nome: "Juliana Costa",
    cargo: "Gerente de Conta",
    setor: "Vendas",
    cpf: "345.678.901-22",
    status: "completo",
    inicio: "2026-04-10",
    responsavel: "João Pedro",
  },
  {
    id: "4",
    nome: "Ricardo Pereira",
    cargo: "Designer UX",
    setor: "Marketing",
    cpf: "456.789.012-33",
    status: "pendente",
    inicio: "2026-03-25",
    responsavel: "Alice Lima",
  },
];

const checklistPorCandidato: Record<string, DocItem[]> = {
  "1": [
    {
      id: "rg",
      nome: "RG / Identificação",
      status: "reprovado",
      motivoReprovacao:
        "Documento ilegível: bordas cortadas e reflexo excessivo. Solicite novo envio em PDF com resolução mínima de 300 dpi.",
      historico: [
        { quando: "2026-04-02 09:12", texto: "Documento enviado pelo candidato." },
        { quando: "2026-04-02 14:40", texto: "Reprovado na conferência — motivo: ilegibilidade." },
        { quando: "2026-04-03 08:05", texto: "E-mail automático de reenvio disparado." },
      ],
    },
    {
      id: "ctps",
      nome: "CTPS / e-Social",
      status: "pendente",
      historico: [{ quando: "2026-04-01 11:00", texto: "Aguardando upload pelo candidato." }],
    },
    {
      id: "aso",
      nome: "ASO (exame admissional)",
      status: "analise",
      historico: [
        { quando: "2026-04-02 16:20", texto: "PDF recebido e encaminhado à medicina do trabalho." },
        { quando: "2026-04-03 10:00", texto: "Em análise — prazo SLA 48h." },
      ],
    },
  ],
  "2": [
    {
      id: "resid",
      nome: "Comprovante de residência",
      status: "aprovado",
      historico: [{ quando: "2026-04-04 09:00", texto: "Aprovado na conferência." }],
    },
    {
      id: "pis",
      nome: "PIS / PASEP",
      status: "reprovado",
      motivoReprovacao: "Número do PIS divergente do informado na ficha de registro. Corrija e reenvie.",
      historico: [
        { quando: "2026-04-05 11:30", texto: "Conferência RH — inconsistência detectada." },
        { quando: "2026-04-05 11:35", texto: "Reprovação registrada com comentário ao candidato." },
      ],
    },
  ],
  "3": [
    {
      id: "todos",
      nome: "Pacote admissional completo",
      status: "aprovado",
      historico: [{ quando: "2026-04-10 17:00", texto: "Todos os itens validados e arquivados." }],
    },
  ],
  "4": [
    {
      id: "cnh",
      nome: "CNH (categoria exigida)",
      status: "pendente",
      historico: [{ quando: "2026-03-26 08:00", texto: "Pendente de envio." }],
    },
  ],
};

/** Simula fila pessoal do colaborador no portal; vazio = «tudo em dia». */
const mockPendenciasColaboradorPortal: { id: string; titulo: string; prazo: string }[] = [];

type DocListTab = "pendentes" | "validados";

type DocListaFilters = {
  busca: string;
  setor: string;
  responsavel: string;
};

const defaultDocListaFilters: DocListaFilters = {
  busca: "",
  setor: "Todos",
  responsavel: "Todos",
};

function candidatoNaAba(
  c: (typeof mockCandidates)[number],
  tab: DocListTab
): boolean {
  if (tab === "pendentes") return c.status === "pendente" || c.status === "analise";
  return c.status === "completo";
}

export default function DocumentosAdmissionais() {
  const { success } = useToast();
  const [selectedCandidate, setSelectedCandidate] = useState<(typeof mockCandidates)[number] | null>(null);
  const [showSmartDrop, setShowSmartDrop] = useState(true);
  const [statusCandidate, setStatusCandidate] = useState<(typeof mockCandidates)[number] | null>(null);
  const [statusDoc, setStatusDoc] = useState<DocItem | null>(null);
  /** Sub-fluxo dentro do mesmo painel: visualização × justificativa de reprovação (sem segundo modal). */
  const [docReviewPhase, setDocReviewPhase] = useState<"view" | "reprovar">("view");
  const [motivoReprovarDraft, setMotivoReprovarDraft] = useState("");

  const [docListTab, setDocListTab] = useState<DocListTab>("pendentes");
  const [filtersByTab, setFiltersByTab] = useState<Record<DocListTab, DocListaFilters>>({
    pendentes: { ...defaultDocListaFilters },
    validados: { ...defaultDocListaFilters },
  });
  const [filtrosDrawerOpen, setFiltrosDrawerOpen] = useState(false);

  const listaFilters = filtersByTab[docListTab];
  const setListaFilters = useCallback((patch: Partial<DocListaFilters>) => {
    setFiltersByTab((prev) => ({
      ...prev,
      [docListTab]: { ...prev[docListTab], ...patch },
    }));
  }, [docListTab]);

  const clearAllListaFilters = useCallback(() => {
    setListaFilters({ ...defaultDocListaFilters });
  }, [setListaFilters]);

  useEffect(() => {
    setDocReviewPhase("view");
    setMotivoReprovarDraft("");
  }, [statusDoc?.id]);

  const resetStatusDrawer = useCallback(() => {
    setStatusCandidate(null);
    setStatusDoc(null);
    setDocReviewPhase("view");
    setMotivoReprovarDraft("");
  }, []);

  const podeDecidirDoc =
    statusDoc && (statusDoc.status === "pendente" || statusDoc.status === "analise");

  const setoresOpcoes = useMemo(() => {
    const u = [...new Set(mockCandidates.map((c) => c.setor))];
    return ["Todos", ...u];
  }, []);

  const responsaveisOpcoes = useMemo(() => {
    const u = [...new Set(mockCandidates.map((c) => c.responsavel))];
    return ["Todos", ...u];
  }, []);

  const candidatosFiltrados = useMemo(() => {
    const { busca, setor, responsavel } = listaFilters;
    const q = busca.trim().toLowerCase();
    const qDigits = q.replace(/\D/g, "");
    return mockCandidates.filter((c) => {
      if (!candidatoNaAba(c, docListTab)) return false;
      if (setor !== "Todos" && c.setor !== setor) return false;
      if (responsavel !== "Todos" && c.responsavel !== responsavel) return false;
      if (!q) return true;
      return (
        c.nome.toLowerCase().includes(q) ||
        c.cargo.toLowerCase().includes(q) ||
        (qDigits.length > 0 && c.cpf.replace(/\D/g, "").includes(qDigits))
      );
    });
  }, [docListTab, listaFilters]);

  const filterChips: FilterChipModel[] = useMemo(() => {
    const chips: FilterChipModel[] = [];
    const b = listaFilters.busca.trim();
    if (b) {
      chips.push({
        id: "busca",
        label: `Busca: ${b}`,
        onRemove: () => setListaFilters({ busca: "" }),
      });
    }
    if (listaFilters.setor !== "Todos") {
      chips.push({
        id: "setor",
        label: `Setor: ${listaFilters.setor}`,
        onRemove: () => setListaFilters({ setor: "Todos" }),
      });
    }
    if (listaFilters.responsavel !== "Todos") {
      chips.push({
        id: "resp",
        label: `Responsável: ${listaFilters.responsavel}`,
        onRemove: () => setListaFilters({ responsavel: "Todos" }),
      });
    }
    return chips;
  }, [listaFilters, setListaFilters]);

  const docsDoPainel = statusCandidate ? checklistPorCandidato[statusCandidate.id] ?? [] : [];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 overflow-hidden">
        <button
          onClick={() => setShowSmartDrop((v) => !v)}
          className="w-full flex items-center justify-between p-5 hover:bg-primary/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <Sparkles size={20} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#e7e5e4]">Smart Drop — OCR com IA</p>
              <p className="text-xs text-zinc-500">Arraste um documento e o formulário será preenchido automaticamente</p>
            </div>
          </div>
          <span className="text-xs font-bold text-primary border border-primary/30 rounded-full px-3 py-1 flex-shrink-0">
            {showSmartDrop ? "Recolher ▲" : "Expandir ▼"}
          </span>
        </button>
        <AnimatePresence>
          {showSmartDrop && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5">
                <SmartDrop />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentos Admissionais</h1>
          <p className="text-muted-foreground mt-1">Gerencie a coleta e validação de documentos de novos colaboradores.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
            <UserPlus size={18} />
            Novo Processo
          </button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2 px-6 border-b border-[#334155]">
          <h2 className="text-base font-semibold tracking-tight text-[#e7e5e4]">Documentos pendentes (portal do colaborador)</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Prévia do que o colaborador vê na área logada: quando não há itens em aberto, exibimos um estado de sucesso.
          </p>
        </CardHeader>
        <CardContent className="p-6">
          {mockPendenciasColaboradorPortal.length === 0 ? (
            <EmptyState
              variant="success"
              icon={<CheckCircle2 className="h-8 w-8" strokeWidth={1.25} />}
              title="Tudo certo por aqui"
              description="Você não possui pendências no momento. Quando houver documentos a enviar ou corrigir, eles aparecerão nesta área com prazo e orientações."
            />
          ) : (
            <ul className="space-y-2 text-sm">
              {mockPendenciasColaboradorPortal.map((p) => (
                <li key={p.id} className="flex justify-between gap-4 rounded-lg border border-[#334155] px-4 py-3">
                  <span className="font-medium text-[#e7e5e4]">{p.titulo}</span>
                  <span className="text-xs text-zinc-500 shrink-0">Prazo: {p.prazo}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="inline-flex rounded-lg border border-[#334155] bg-[#0f172a]/40 p-1 w-fit"
          role="tablist"
          aria-label="Visão da documentação"
        >
          <button
            type="button"
            role="tab"
            aria-selected={docListTab === "pendentes"}
            onClick={() => setDocListTab("pendentes")}
            className={cn(
              "px-4 py-2 text-sm font-semibold rounded-md transition-colors",
              docListTab === "pendentes"
                ? "bg-primary text-white shadow-sm"
                : "text-zinc-400 hover:text-[#e7e5e4]"
            )}
          >
            Documentos pendentes
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={docListTab === "validados"}
            onClick={() => setDocListTab("validados")}
            className={cn(
              "px-4 py-2 text-sm font-semibold rounded-md transition-colors",
              docListTab === "validados"
                ? "bg-primary text-white shadow-sm"
                : "text-zinc-400 hover:text-[#e7e5e4]"
            )}
          >
            Validados
          </button>
        </div>
        <p className="text-xs text-muted-foreground max-w-xl">
          Cada aba mantém seus próprios filtros: ao mudar de contexto, os campos refletem apenas o que vale para a lista atual.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3 px-6 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={listaFilters.busca}
                onChange={(e) => setListaFilters({ busca: e.target.value })}
                placeholder="Pesquisar por nome ou CPF..."
                className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="doc-filtro-setor" className="sr-only">
                Setor
              </label>
              <select
                id="doc-filtro-setor"
                value={listaFilters.setor}
                onChange={(e) => setListaFilters({ setor: e.target.value })}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm min-w-[10rem] focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {setoresOpcoes.map((s) => (
                  <option key={s} value={s}>
                    {s === "Todos" ? "Todos os setores" : s}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setFiltrosDrawerOpen(true)}
                className="relative inline-flex items-center gap-2 h-10 px-3 border border-input rounded-md text-sm font-medium hover:bg-[#0f172a]"
              >
                <Filter size={16} />
                Filtros
                {!filtrosDrawerOpen && listaFilters.responsavel !== "Todos" ? (
                  <span
                    className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-[#0f172a]"
                    aria-hidden
                  />
                ) : null}
              </button>
            </div>
          </div>
          <FilterChipsBar chips={filterChips} onClearAll={clearAllListaFilters} />
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#0f172a] border-y border-[#334155]">
                <tr className="text-muted-foreground font-medium">
                  <th className="py-3 px-6">Candidato</th>
                  <th className="py-3 px-6">Vaga / Setor</th>
                  <th className="py-3 px-6">CPF</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Data de Início</th>
                  <th className="py-3 px-6">Ações</th>
                </tr>
              </thead>
              <tbody>
                {candidatosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 px-6 text-center text-sm text-muted-foreground">
                      Nenhum registro com os filtros atuais nesta aba. Ajuste a busca ou use{" "}
                      <button
                        type="button"
                        className="font-semibold text-primary underline-offset-2 hover:underline"
                        onClick={clearAllListaFilters}
                      >
                        limpar filtros
                      </button>
                      .
                    </td>
                  </tr>
                ) : null}
                {candidatosFiltrados.map((candidate) => (
                  <tr key={candidate.id} className="border-b hover:bg-zinc-800/20 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#e7e5e4]">{candidate.nome}</span>
                        <span className="text-[11px] text-muted-foreground">Responsável: {candidate.responsavel}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span>{candidate.cargo}</span>
                        <span className="text-[11px] text-muted-foreground">{candidate.setor}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">{candidate.cpf}</td>
                    <td className="py-4 px-6">
                      <StatusBadge status={candidate.status as any} />
                    </td>
                    <td className="py-4 px-6 font-medium">{candidate.inicio}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setStatusCandidate(candidate)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors"
                          title="Ver status e histórico dos documentos"
                        >
                          <History size={14} />
                          Ver status
                        </button>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={() => setSelectedCandidate(candidate)}
                              className="inline-flex items-center justify-center p-2 rounded-lg text-primary hover:bg-primary/5 transition-colors"
                              aria-label="Gerar documentos admissionais"
                            >
                              <FileText size={18} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Gerar documentos admissionais</TooltipContent>
                        </Tooltip>
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
        open={filtrosDrawerOpen}
        onClose={() => setFiltrosDrawerOpen(false)}
        title="Filtros adicionais"
        subtitle="Refine a fila por responsável interno (demonstração)."
        overlay="subtle"
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setListaFilters({ responsavel: "Todos" });
              }}
              className="rounded-xl px-5 py-2.5 font-semibold"
            >
              Redefinir painel
            </Button>
            <Button type="button" onClick={() => setFiltrosDrawerOpen(false)} className="rounded-xl px-5 py-2.5 font-semibold">
              Aplicar e fechar
            </Button>
          </div>
        }
      >
        <div className="space-y-2">
          <label htmlFor="doc-filtro-resp" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Responsável na conferência
          </label>
          <select
            id="doc-filtro-resp"
            value={listaFilters.responsavel}
            onChange={(e) => setListaFilters({ responsavel: e.target.value })}
            className="w-full h-11 rounded-lg border border-[#334155] bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {responsaveisOpcoes.map((r) => (
              <option key={r} value={r}>
                {r === "Todos" ? "Todos os responsáveis" : r}
              </option>
            ))}
          </select>
        </div>
      </SideDrawer>

      <SideDrawer
        open={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        title="Gerador de documentos"
        subtitle={selectedCandidate ? `Colaborador: ${selectedCandidate.nome}` : undefined}
        overlay="subtle"
        footer={
          <Button
            type="button"
            variant="ghost"
            onClick={() => setSelectedCandidate(null)}
            className="w-full rounded-xl px-5 py-2.5 font-semibold sm:ml-auto sm:w-auto"
          >
            Fechar
          </Button>
        }
      >
        {selectedCandidate ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Documentos automáticos</h3>
              <div className="grid gap-3">
                <DocumentAction label="Carta Proposta" onClick={() => alert("Gerando Carta Proposta...")} />
                <DocumentAction label="Declaração de Conta" onClick={() => alert("Gerando Declaração...")} />
                <DocumentAction label="Ficha Cadastral" onClick={() => alert("Gerando Ficha...")} />
                <DocumentAction label="Contrato de Trabalho" onClick={() => alert("Gerando Contrato...")} />
                <DocumentAction label="Termo de Confidencialidade" onClick={() => alert("Gerando Termo...")} />
              </div>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle size={16} />
                <span className="text-sm font-bold">Informações carregadas</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <span className="text-muted-foreground">Salário:</span>
                <span className="font-medium">R$ 8.500,00</span>
                <span className="text-muted-foreground">Gestor:</span>
                <span className="font-medium">Thiago Neves</span>
                <span className="text-muted-foreground">Unidade:</span>
                <span className="font-medium">São Paulo - HQ</span>
              </div>
            </div>
          </div>
        ) : null}
      </SideDrawer>

      <SideDrawer
        open={!!statusCandidate}
        onClose={resetStatusDrawer}
        title={
          statusDoc
            ? docReviewPhase === "reprovar"
              ? `Reprovar: ${statusDoc.nome}`
              : statusDoc.nome
            : "Status da documentação"
        }
        subtitle={
          statusCandidate
            ? statusDoc
              ? docReviewPhase === "reprovar"
                ? `${statusCandidate.nome} · informe o motivo (mesmo painel)`
                : `${statusCandidate.nome} · detalhe do item`
              : `${statusCandidate.nome} — conferência sem sair da lista`
            : undefined
        }
        overlay="transparent"
        footer={
          <div className="flex flex-wrap gap-2 justify-end">
            {statusDoc ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  if (docReviewPhase === "reprovar") {
                    setDocReviewPhase("view");
                    setMotivoReprovarDraft("");
                  } else {
                    setStatusDoc(null);
                  }
                }}
                className="rounded-xl px-5 py-2.5 font-semibold"
              >
                {docReviewPhase === "reprovar" ? "Voltar ao documento" : "Voltar à lista"}
              </Button>
            ) : null}
            <Button type="button" onClick={resetStatusDrawer} className="rounded-xl px-5 py-2.5 font-semibold">
              Fechar
            </Button>
          </div>
        }
      >
        {statusCandidate && !statusDoc ? (
          <div className="space-y-3">
            <p className="text-xs text-zinc-500">
              Clique em um documento para ver o motivo da reprovação (se houver) e o histórico de eventos.
            </p>
            <ul className="space-y-2">
              {docsDoPainel.map((d) => (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => setStatusDoc(d)}
                    className="w-full flex items-center justify-between gap-3 rounded-xl border border-[#334155] px-4 py-3 text-left hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    <span className="text-sm font-medium text-[#e7e5e4]">{d.nome}</span>
                    <span className="flex items-center gap-2 shrink-0">
                      <DocStatusBadge status={d.status} />
                      <Eye size={16} className="text-zinc-500" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {statusDoc ? (
          <AnimatePresence mode="wait">
            {docReviewPhase === "reprovar" ? (
              <motion.div
                key="reprovar"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <p className="text-xs text-zinc-500">
                  Descreva o motivo da reprovação. O candidato receberá esta mensagem por e-mail (demonstração).
                </p>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Justificativa obrigatória
                </label>
                <textarea
                  value={motivoReprovarDraft}
                  onChange={(e) => setMotivoReprovarDraft(e.target.value)}
                  rows={5}
                  placeholder="Ex.: documento ilegível, dados divergentes da ficha de registro..."
                  className="w-full rounded-xl border border-[#334155] bg-[#0f172a] px-3 py-2.5 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y min-h-[120px]"
                />
                <Button
                  type="button"
                  disabled={motivoReprovarDraft.trim().length < 8}
                  onClick={() => {
                    success("Reprovação registrada", "O candidato será notificado com o motivo informado.");
                    setStatusDoc(null);
                    setDocReviewPhase("view");
                    setMotivoReprovarDraft("");
                  }}
                  className="w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-2 rounded-xl bg-rose-600 text-white hover:bg-rose-600/90 disabled:opacity-40"
                >
                  <ThumbsDown size={16} />
                  Confirmar reprovação
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="rounded-xl border border-[#334155] bg-[#0f172a]/50 p-4 flex gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-zinc-800 text-zinc-400">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Pré-visualização</p>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Área reservada ao PDF ou imagem enviada pelo candidato. Na demonstração, apenas o status e o histórico abaixo são exibidos.
                    </p>
                  </div>
                </div>

                {podeDecidirDoc ? (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      onClick={() => {
                        success("Documento aprovado", "O item foi marcado como aprovado na conferência.");
                        setStatusDoc(null);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-600/90"
                    >
                      <CheckCircle size={16} />
                      Aprovar documento
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDocReviewPhase("reprovar")}
                      className="inline-flex items-center gap-2 rounded-xl border-rose-500/40 text-rose-400 hover:bg-rose-500/10"
                    >
                      <ThumbsDown size={16} />
                      Reprovar…
                    </Button>
                  </div>
                ) : null}

                {statusDoc.status === "reprovado" && statusDoc.motivoReprovacao ? (
                  <div className="rounded-xl border border-rose-500/25 bg-rose-500/5 p-4">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-bold mb-2">
                      <AlertCircle size={16} />
                      Motivo da reprovação
                    </div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{statusDoc.motivoReprovacao}</p>
                  </div>
                ) : null}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
                    <History size={14} />
                    Histórico
                  </h3>
                  <ul className="space-y-3 border-l-2 border-[#334155] pl-4 ml-1">
                    {statusDoc.historico.map((h, i) => (
                      <li key={i} className="relative">
                        <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                        <p className="text-[11px] font-mono text-zinc-500">{h.quando}</p>
                        <p className="text-sm text-zinc-300 mt-0.5">{h.texto}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ) : null}
      </SideDrawer>
    </div>
  );
}

function DocumentAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 border rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group border-[#334155]"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-primary/10">
          <FileText size={18} className="text-zinc-400 group-hover:text-primary" />
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <Eye size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

function DocStatusBadge({ status }: { status: DocStatus }) {
  const map: Record<DocStatus, string> = {
    aprovado: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    pendente: "bg-zinc-500/15 text-zinc-400 border-zinc-600/30",
    reprovado: "bg-rose-500/15 text-rose-400 border-rose-500/25",
    analise: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  };
  const label: Record<DocStatus, string> = {
    aprovado: "Aprovado",
    pendente: "Pendente",
    reprovado: "Reprovado",
    analise: "Em análise",
  };
  return (
    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border ${map[status]}`}>{label[status]}</span>
  );
}
