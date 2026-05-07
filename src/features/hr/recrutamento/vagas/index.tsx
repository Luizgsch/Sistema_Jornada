import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import type { LucideIcon } from "lucide-react";
import { Search, Filter, Plus, Edit, Archive, Eye, ChevronDown, X, FileText, Stamp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { mockRecrutamentoVagas } from "@/infrastructure/mock/mockRecrutamento";
import { motion, AnimatePresence } from "framer-motion";
import { AutomationStepper } from "@/shared/components/automation/AutomationStepper";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/Button";
import { SideDrawer } from "@/shared/ui/SideDrawer";
import { ImportarPlanilhaButton } from "@/shared/ui/ImportarPlanilhaButton";
import { ExportarPlanilhaButton } from "@/shared/ui/ExportarPlanilhaButton";
import { InlineActionBar } from "@/shared/ui/InlineActionBar";
import { useToast } from "@/shared/ui/Toast";
import { CarimboModal } from "@/shared/ui/CarimboModal";

const COMPETENCIAS_SUGESTOES = [
  "React",
  "TypeScript",
  "Node.js",
  "Product discovery",
  "Inglês avançado",
  "SQL",
  "Liderança",
  "Scrum",
];

export default function GestaoVagas() {
  const { success } = useToast();
  const [showNewVaga, setShowNewVaga] = useState(false);
  const [novaVagaStep, setNovaVagaStep] = useState<"formulario" | "automacao">("formulario");
  const [cargoDraft, setCargoDraft] = useState("");
  const [competenciasSel, setCompetenciasSel] = useState<string[]>([]);
  const [competenciasExpandido, setCompetenciasExpandido] = useState(true);
  const [chipRemoveConfirm, setChipRemoveConfirm] = useState<string | null>(null);
  const [motivoDraft, setMotivoDraft] = useState<"Expansão" | "Substituição">("Expansão");
  const [slaDraft, setSlaDraft] = useState("");
  const [escalaDraft, setEscalaDraft] = useState("");
  const [nomeSubstituidoDraft, setNomeSubstituidoDraft] = useState("");

  const [showStepper, setShowStepper] = useState(false);
  const [stepperVaga, setStepperVaga] = useState("");
  const [abaVagas, setAbaVagas] = useState<"ativas" | "arquivadas">("ativas");
  const [selectedVagas, setSelectedVagas] = useState<string[]>([]);
  const [showCarimboModal, setShowCarimboModal] = useState(false);

  const calcularSLAUrgencia = (sla: string) => {
    const dias = parseInt(sla);
    if (isNaN(dias)) return 'blue';
    if (dias < 3) return 'red';
    if (dias < 7) return 'orange';
    return 'green';
  };

  const closeNovaVagaDrawer = useCallback(() => {
    setShowNewVaga(false);
    setNovaVagaStep("formulario");
    setCargoDraft("");
    setCompetenciasSel([]);
    setChipRemoveConfirm(null);
    setMotivoDraft("Expansão");
    setSlaDraft("");
    setEscalaDraft("");
    setNomeSubstituidoDraft("");
  }, []);

  const toggleCompetencia = useCallback((c: string) => {
    setCompetenciasSel((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
    setChipRemoveConfirm(null);
  }, []);

  const removeCompetencia = useCallback((c: string) => {
    setCompetenciasSel((prev) => prev.filter((x) => x !== c));
    setChipRemoveConfirm(null);
  }, []);

  const vagasVisiveis = useMemo(() => {
    if (abaVagas === "arquivadas") {
      return mockRecrutamentoVagas.filter((v) => v.status === "encerrado");
    }
    return mockRecrutamentoVagas.filter((v) => v.status !== "encerrado");
  }, [abaVagas]);

  const toggleSelectVaga = useCallback((vagaId: string) => {
    setSelectedVagas((prev) =>
      prev.includes(vagaId) ? prev.filter((id) => id !== vagaId) : [...prev, vagaId]
    );
  }, []);

  const toggleSelectAllVagas = useCallback(() => {
    if (selectedVagas.length === vagasVisiveis.length) {
      setSelectedVagas([]);
    } else {
      setSelectedVagas(vagasVisiveis.map((v) => v.id));
    }
  }, [selectedVagas, vagasVisiveis]);

  const handleGerarPropostas = () => {
    success(`Gerando ${selectedVagas.length} Cartas Proposta...`);
    setSelectedVagas([]);
  };

  const handleCarimbarPDFs = () => {
    setShowCarimboModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-1">
            Recrutamento & Seleção
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4]">
            Gestão de Vagas
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            Controle centralizado de todas as oportunidades em aberto.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ImportarPlanilhaButton
            label="Importar Planilha de Vagas"
            modeloNome="modelo_vagas.xlsx"
          />
          <ExportarPlanilhaButton label="Exportar Vagas" nomeArquivo="vagas.xlsx" />
          <button
            type="button"
            onClick={() => {
              setNovaVagaStep("formulario");
              setCargoDraft("");
              setCompetenciasSel([]);
              setChipRemoveConfirm(null);
              setMotivoDraft("Expansão");
              setSlaDraft("");
              setEscalaDraft("");
              setNomeSubstituidoDraft("");
              setShowNewVaga(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-radius-m font-semibold text-sm hover:bg-primary/90 transition-all"
          >
            <Plus size={16} />
            Nova Vaga
          </button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3 space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3 -mb-1">
            <button
              type="button"
              onClick={() => setAbaVagas("ativas")}
              className={cn(
                "px-3 py-1.5 rounded-radius-m text-sm font-semibold transition-colors",
                abaVagas === "ativas"
                  ? "bg-primary text-white"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              Em aberto
            </button>
            <button
              type="button"
              onClick={() => setAbaVagas("arquivadas")}
              className={cn(
                "px-3 py-1.5 rounded-radius-m text-sm font-semibold transition-colors",
                abaVagas === "arquivadas"
                  ? "bg-primary text-white"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              Vagas arquivadas
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Pesquisar por cargo ou código..."
                className="w-full pl-10 h-10 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-zinc-800 dark:text-[#f8fafc] placeholder:text-zinc-400 dark:placeholder:text-slate-500 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-zinc-200 dark:border-zinc-700 rounded-radius-m text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <Filter size={15} />
                Filtros
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-y border-zinc-100 dark:border-zinc-800">
                <tr className="text-zinc-500 dark:text-zinc-400 font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3 px-3 w-10">
                    <input
                      type="checkbox"
                      checked={selectedVagas.length === vagasVisiveis.length && vagasVisiveis.length > 0}
                      onChange={toggleSelectAllVagas}
                      className="w-4 h-4 rounded border-zinc-300 cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-5">Código</th>
                  <th className="py-3 px-5">Cargo</th>
                  <th className="py-3 px-5">Setor</th>
                  <th className="py-3 px-5">Gestor</th>
                  <th className="py-3 px-5">Contrato</th>
                  <th className="py-3 px-5">Salário</th>
                  <th className="py-3 px-5">SLA</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {vagasVisiveis.map((vaga) => {
                  const isSelected = selectedVagas.includes(vaga.id);
                  const slaUrgencia = calcularSLAUrgencia(vaga.sla);
                  const slaColorClass = {
                    red: 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300',
                    orange: 'bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300',
                    green: 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300',
                    blue: 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300',
                  };

                  return (
                    <tr
                      key={vaga.id}
                      className={cn(
                        "border-b border-zinc-100 dark:border-zinc-800 transition-colors group cursor-pointer",
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-950/30'
                          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                      )}
                    >
                      <td className="py-3.5 px-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectVaga(vaga.id)}
                          className="w-4 h-4 rounded border-zinc-300 cursor-pointer"
                        />
                      </td>
                      <td className="py-3.5 px-5 font-mono text-xs font-bold text-primary">{vaga.id}</td>
                      <td className="py-3.5 px-5 font-semibold text-zinc-800 dark:text-[#e7e5e4]">{vaga.cargo}</td>
                      <td className="py-3.5 px-5 text-zinc-600 dark:text-zinc-400">{vaga.setor}</td>
                      <td className="py-3.5 px-5 text-xs font-medium text-zinc-500 dark:text-zinc-500">{vaga.gestor}</td>
                      <td className="py-3.5 px-5 text-zinc-600 dark:text-zinc-400">{vaga.contrato}</td>
                      <td className="py-3.5 px-5 text-zinc-500 dark:text-zinc-400 font-medium">{vaga.salario}</td>
                      <td className="py-3.5 px-5">
                        <span className={cn('text-xs font-bold px-2 py-1 rounded', slaColorClass[slaUrgencia as keyof typeof slaColorClass])}>
                          {vaga.sla}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <StatusBadge status={vaga.status as any} />
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ActionButton icon={Eye} label="Visualizar candidatos da vaga" />
                          <ActionButton icon={Edit} label="Editar vaga" />
                          {vaga.status !== "encerrado" ? (
                            <ActionButton
                              icon={Archive}
                              label="Encerrar vaga e disparar automações"
                              onClick={() => {
                                setStepperVaga(vaga.cargo);
                                setShowStepper(true);
                              }}
                            />
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {selectedVagas.length > 0 && (
            <InlineActionBar
              selectedCount={selectedVagas.length}
              actions={[
                {
                  label: "Gerar Propostas",
                  icon: <FileText size={16} />,
                  onClick: handleGerarPropostas,
                  variant: "blue",
                },
                {
                  label: "Carimbar PDFs",
                  icon: <Stamp size={16} />,
                  onClick: handleCarimbarPDFs,
                  variant: "blue",
                },
              ]}
              onClear={() => setSelectedVagas([])}
            />
          )}
        </CardContent>
      </Card>

      <CarimboModal
        isOpen={showCarimboModal}
        onClose={() => setShowCarimboModal(false)}
        mode="batch"
        batchCount={selectedVagas.length}
      />

      <AutomationStepper
        isOpen={showStepper}
        onClose={() => setShowStepper(false)}
        vagaNome={stepperVaga}
        flow="encerramento"
      />

      <SideDrawer
        open={showNewVaga}
        onClose={closeNovaVagaDrawer}
        title={novaVagaStep === "formulario" ? "Abertura de Nova Vaga" : "Publicação e integrações"}
        subtitle={
          novaVagaStep === "formulario"
            ? "Passo 1 de 2 — dados da vaga (competências no painel expansível abaixo, sem pop-up extra)."
            : "Passo 2 de 2 — automações no mesmo painel lateral."
        }
        zIndex={110}
        className="md:!max-w-[min(44rem,96vw)] md:!w-[min(44rem,96vw)]"
        footer={
          novaVagaStep === "formulario" ? (
            <div className="flex flex-wrap justify-end gap-2">
              <Button type="button" variant="ghost" onClick={closeNovaVagaDrawer} className="rounded-radius-m px-5 font-semibold">
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setStepperVaga(cargoDraft.trim() || "Nova vaga");
                  setNovaVagaStep("automacao");
                }}
                className="rounded-radius-m px-5 font-semibold"
              >
                Criar vaga
              </Button>
            </div>
          ) : (
            <p className="text-xs text-zinc-500 text-center w-full">
              Ao concluir a automação, este painel fecha e você volta à lista.
            </p>
          )
        }
      >
        <AnimatePresence mode="wait">
          {novaVagaStep === "formulario" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex gap-1" aria-hidden>
                <div className="h-1 flex-1 rounded-full bg-primary" />
                <div className="h-1 flex-1 rounded-full bg-zinc-600/80" />
              </div>

              <FormSection title="Informações Gerais">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div className="space-y-1.5 md:col-span-2 xl:col-span-1">
                    <label className="text-[11px] font-bold text-zinc-500 dark:text-slate-400 uppercase tracking-wide">
                      Cargo
                    </label>
                    <input
                      type="text"
                      value={cargoDraft}
                      onChange={(e) => setCargoDraft(e.target.value)}
                      placeholder="Ex: Desenvolvedor React"
                      className="w-full h-10 px-3.5 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-zinc-800 dark:text-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <Field label="Setor" placeholder="Ex: Tecnologia" />
                  <Field label="Gestor Responsável" placeholder="Ex: João Silva" />
                  <div className="md:col-span-2 xl:col-span-3">
                    <label className="text-[11px] font-bold text-zinc-500 dark:text-slate-400 uppercase tracking-wide">Motivo</label>
                    <select
                      value={motivoDraft}
                      onChange={(e) => setMotivoDraft(e.target.value as "Expansão" | "Substituição")}
                      className="w-full h-10 px-3.5 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-zinc-800 dark:text-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="Expansão">Expansão</option>
                      <option value="Substituição">Substituição</option>
                    </select>
                  </div>
                  {motivoDraft === "Substituição" && (
                    <div className="md:col-span-2 xl:col-span-3">
                      <label className="text-[11px] font-bold text-zinc-500 dark:text-slate-400 uppercase tracking-wide">Nome da Pessoa Substituída</label>
                      <input
                        type="text"
                        value={nomeSubstituidoDraft}
                        onChange={(e) => setNomeSubstituidoDraft(e.target.value)}
                        placeholder="Ex: João Silva"
                        className="w-full h-10 px-3.5 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-zinc-800 dark:text-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  )}
                </div>
              </FormSection>

              <FormSection title="Configurações">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <SelectField label="Tipo de Contrato" options={["CLT", "PJ", "Estágio"]} />
                  <Field label="Salário" placeholder="R$ 0.000,00" />
                  <SelectField label="Turno" options={["Integral", "Manhã", "Tarde", "Noite"]} />
                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 dark:text-slate-400 uppercase tracking-wide">SLA</label>
                    <input
                      type="text"
                      value={slaDraft}
                      onChange={(e) => setSlaDraft(e.target.value)}
                      placeholder="Ex: 15 dias"
                      className="w-full h-10 px-3.5 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-zinc-800 dark:text-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 dark:text-slate-400 uppercase tracking-wide">Escala</label>
                    <select
                      value={escalaDraft}
                      onChange={(e) => setEscalaDraft(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-zinc-800 dark:text-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="">Selecione...</option>
                      <option value="5x2">5x2</option>
                      <option value="6x1">6x1</option>
                      <option value="12x36">12x36</option>
                      <option value="5x1">5x1</option>
                      <option value="Administrativo">Administrativo</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 xl:col-span-2">
                    <Field label="Horário" placeholder="09:00 - 18:00" />
                  </div>
                </div>
              </FormSection>

              <FormSection title="Requisitos">
                <Field label="Experiência Mínima" placeholder="Ex: 3 anos" />
              </FormSection>

              <div className="rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-zinc-50/80 dark:bg-[#0f172a]/40 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setCompetenciasExpandido((v) => !v)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <span className="text-sm font-bold text-zinc-800 dark:text-[#e7e5e4]">
                    Competências e requisitos comportamentais
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "text-zinc-500 transition-transform shrink-0",
                      competenciasExpandido ? "rotate-180" : ""
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {competenciasExpandido ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3 border-t border-zinc-200 dark:border-[#334155] pt-3">
                        <p className="text-xs text-zinc-500">
                          Marque itens da biblioteca interna — tudo neste painel, sem segunda janela modal.
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {COMPETENCIAS_SUGESTOES.map((c) => (
                            <li key={c}>
                              <label className="flex items-center gap-2 cursor-pointer text-sm text-zinc-700 dark:text-zinc-300">
                                <input
                                  type="checkbox"
                                  checked={competenciasSel.includes(c)}
                                  onChange={() => toggleCompetencia(c)}
                                  className="rounded border-zinc-400 text-primary focus:ring-primary/30"
                                />
                                {c}
                              </label>
                            </li>
                          ))}
                        </ul>
                        {competenciasSel.length > 0 ? (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {competenciasSel.map((c) => (
                              <span
                                key={c}
                                className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-md bg-primary/10 border border-primary/25 text-xs font-medium text-primary"
                              >
                                {c}
                                {chipRemoveConfirm === c ? (
                                  <span className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => removeCompetencia(c)}
                                      className="text-[10px] font-bold uppercase text-rose-500 px-1 py-0.5 rounded hover:bg-rose-500/10"
                                    >
                                      Sim, remover
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setChipRemoveConfirm(null)}
                                      className="p-0.5 rounded hover:bg-zinc-700 text-zinc-400"
                                      aria-label="Cancelar"
                                    >
                                      <X size={12} />
                                    </button>
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setChipRemoveConfirm(c)}
                                    className="p-0.5 rounded hover:bg-primary/20 text-primary/80"
                                    aria-label={`Remover ${c}`}
                                  >
                                    <X size={14} />
                                  </button>
                                )}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <TextAreaField label="Observações adicionais" placeholder="Detalhes que não couberam nas competências marcadas..." />
            </motion.div>
          ) : (
            <motion.div
              key="auto"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex gap-1" aria-hidden>
                <div className="h-1 flex-1 rounded-full bg-emerald-600" />
                <div className="h-1 flex-1 rounded-full bg-primary" />
              </div>
              <AutomationStepper
                variant="embedded"
                flow="publicacao"
                isOpen={novaVagaStep === "automacao"}
                onClose={closeNovaVagaDrawer}
                vagaNome={stepperVaga}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </SideDrawer>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick?: () => void }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-radius-m text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          onClick={onClick}
          aria-label={label}
        >
          <Icon size={15} />
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function FormSection({ title, children }: any) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-zinc-500 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-10 px-3.5 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-zinc-800 dark:text-[#f8fafc] placeholder:text-zinc-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}

function SelectField({ label, options }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-zinc-500 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </label>
      <select className="w-full h-10 px-3.5 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-zinc-800 dark:text-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
        {options.map((opt: any) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ label, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-zinc-500 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        className="w-full h-24 p-3.5 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-zinc-800 dark:text-[#f8fafc] placeholder:text-zinc-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
      />
    </div>
  );
}
