import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Search, Filter, FileText, CheckCircle, Eye, UserPlus, Sparkles, History, AlertCircle, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { motion, AnimatePresence } from "framer-motion";
import { SmartDrop } from "@/shared/components/automation/SmartDrop";
import { SideDrawer } from "@/shared/ui/SideDrawer";

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

export default function DocumentosAdmissionais() {
  const [selectedCandidate, setSelectedCandidate] = useState<(typeof mockCandidates)[number] | null>(null);
  const [showSmartDrop, setShowSmartDrop] = useState(true);
  const [statusCandidate, setStatusCandidate] = useState<(typeof mockCandidates)[number] | null>(null);
  const [statusDoc, setStatusDoc] = useState<DocItem | null>(null);

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

      <Card>
        <CardHeader className="pb-3 px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Pesquisar por nome ou CPF..."
                className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-md text-sm font-medium hover:bg-[#0f172a]">
                <Filter size={16} />
                Filtros
              </button>
            </div>
          </div>
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
                {mockCandidates.map((candidate) => (
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
                        <button
                          type="button"
                          onClick={() => setSelectedCandidate(candidate)}
                          className="inline-flex items-center justify-center p-2 rounded-lg text-primary hover:bg-primary/5 transition-colors"
                          title="Gerar documentos"
                        >
                          <FileText size={18} />
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
        open={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        title="Gerador de documentos"
        subtitle={selectedCandidate ? `Colaborador: ${selectedCandidate.nome}` : undefined}
        overlay="subtle"
        footer={
          <button
            type="button"
            onClick={() => setSelectedCandidate(null)}
            className="w-full sm:w-auto sm:ml-auto px-5 py-2.5 rounded-xl font-semibold text-sm border border-[#334155] text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            Fechar
          </button>
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
        onClose={() => {
          setStatusCandidate(null);
          setStatusDoc(null);
        }}
        title={statusDoc ? statusDoc.nome : "Status da documentação"}
        subtitle={
          statusCandidate
            ? statusDoc
              ? `${statusCandidate.nome} · detalhe do item`
              : `${statusCandidate.nome} — conferência sem sair da lista`
            : undefined
        }
        overlay="transparent"
        footer={
          <div className="flex flex-wrap gap-2 justify-end">
            {statusDoc ? (
              <button
                type="button"
                onClick={() => setStatusDoc(null)}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-[#334155] text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Voltar à lista
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setStatusCandidate(null);
                setStatusDoc(null);
              }}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Fechar
            </button>
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
          <div className="space-y-6">
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
          </div>
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
