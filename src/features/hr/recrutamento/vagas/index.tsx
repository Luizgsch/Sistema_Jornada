import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Search, Filter, Plus, Edit, Archive, Eye } from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { mockRecrutamentoVagas } from "@/infrastructure/mock/mockRecrutamento";
import { motion, AnimatePresence } from "framer-motion";
import { AutomationStepper } from "@/shared/components/automation/AutomationStepper";

export default function GestaoVagas() {
  const [showNewVaga, setShowNewVaga] = useState(false);
  const [showStepper, setShowStepper] = useState(false);
  const [stepperVaga, setStepperVaga] = useState("");

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
          <button
            onClick={() => setShowNewVaga(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all"
          >
            <Plus size={16} />
            Nova Vaga
          </button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Pesquisar por cargo ou código..."
                className="w-full pl-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
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
                  <th className="py-3 px-5">Código</th>
                  <th className="py-3 px-5">Cargo</th>
                  <th className="py-3 px-5">Setor</th>
                  <th className="py-3 px-5">Gestor</th>
                  <th className="py-3 px-5">Contrato</th>
                  <th className="py-3 px-5">Salário</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockRecrutamentoVagas.map((vaga) => (
                  <tr
                    key={vaga.id}
                    className="border-b border-zinc-100 dark:border-zinc-800 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40 group"
                  >
                    <td className="py-3.5 px-5 font-mono text-xs font-bold text-primary">{vaga.id}</td>
                    <td className="py-3.5 px-5 font-semibold text-zinc-800 dark:text-[#e7e5e4]">{vaga.cargo}</td>
                    <td className="py-3.5 px-5 text-zinc-600 dark:text-zinc-400">{vaga.setor}</td>
                    <td className="py-3.5 px-5 text-xs font-medium text-zinc-500 dark:text-zinc-500">{vaga.gestor}</td>
                    <td className="py-3.5 px-5 text-zinc-600 dark:text-zinc-400">{vaga.contrato}</td>
                    <td className="py-3.5 px-5 text-zinc-500 dark:text-zinc-400 font-medium">{vaga.salario}</td>
                    <td className="py-3.5 px-5">
                      <StatusBadge status={vaga.status as any} />
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ActionButton icon={Eye} title="Visualizar Candidatos" />
                        <ActionButton icon={Edit} title="Editar" />
                        <ActionButton
                          icon={Archive}
                          title="Encerrar Vaga (dispara automações)"
                          onClick={() => {
                            setStepperVaga(vaga.cargo);
                            setShowStepper(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Automation Stepper */}
      <AutomationStepper
        isOpen={showStepper}
        onClose={() => setShowStepper(false)}
        vagaNome={stepperVaga}
      />

      {/* New Vaga Modal */}
      <AnimatePresence>
        {showNewVaga && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewVaga(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl"
            >
              <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/80">
                <h2 className="text-lg font-bold text-zinc-800 dark:text-[#e7e5e4]">Abertura de Nova Vaga</h2>
                <button
                  onClick={() => setShowNewVaga(false)}
                  className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors text-zinc-500 dark:text-zinc-400"
                >
                  <Plus className="rotate-45" size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <FormSection title="Informações Gerais">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Cargo" placeholder="Ex: Desenvolvedor React" />
                    <Field label="Setor" placeholder="Ex: Tecnologia" />
                    <Field label="Gestor Responsável" placeholder="Ex: João Silva" />
                    <SelectField label="Motivo" options={["Expansão", "Substituição"]} />
                  </div>
                </FormSection>

                <FormSection title="Configurações">
                  <div className="grid grid-cols-2 gap-4">
                    <SelectField label="Tipo de Contrato" options={["CLT", "PJ", "Estágio"]} />
                    <Field label="Salário" placeholder="R$ 0.000,00" />
                    <SelectField label="Turno" options={["Integral", "Manhã", "Tarde", "Noite"]} />
                    <Field label="Horário" placeholder="09:00 - 18:00" />
                  </div>
                </FormSection>

                <FormSection title="Requisitos">
                  <div className="space-y-4">
                    <Field label="Experiência Mínima" placeholder="Ex: 3 anos" />
                    <TextAreaField label="Requisitos Técnicos" placeholder="Liste as competências..." />
                  </div>
                </FormSection>
              </div>

              <div className="p-5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 flex justify-end gap-3">
                <button
                  onClick={() => setShowNewVaga(false)}
                  className="px-5 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl font-semibold text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowNewVaga(false);
                    setStepperVaga("Nova Vaga");
                    setShowStepper(true);
                  }}
                  className="px-5 py-2 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all"
                >
                  Criar Vaga
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionButton({ icon: Icon, title, onClick }: any) {
  return (
    <button
      className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
      title={title}
      onClick={onClick}
    >
      <Icon size={15} />
    </button>
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
      <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wide">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}

function SelectField({ label, options }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wide">
        {label}
      </label>
      <select className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
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
      <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wide">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        className="w-full h-24 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
      />
    </div>
  );
}
