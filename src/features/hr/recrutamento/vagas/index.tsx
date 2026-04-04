import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";

import { Search, Filter, Plus, Edit, Archive, Eye } from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { mockRecrutamentoVagas } from "@/infrastructure/mock/mockRecrutamento";
import { motion, AnimatePresence } from "framer-motion";

export default function GestaoVagas() {
  const [showNewVaga, setShowNewVaga] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Vagas</h1>
          <p className="text-muted-foreground mt-1">Controle centralizado de todas as oportunidades em aberto.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowNewVaga(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus size={18} />
            Nova Vaga
          </button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Pesquisar por cargo ou código..." 
                className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
                <Filter size={16} />
                Filtros
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-y border-slate-200">
                <tr className="text-muted-foreground font-medium">
                  <th className="py-3 px-6">Código</th>
                  <th className="py-3 px-6">Cargo</th>
                  <th className="py-3 px-6">Setor</th>
                  <th className="py-3 px-6">Gestor</th>
                  <th className="py-3 px-6">Contrato</th>
                  <th className="py-3 px-6">Salário</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockRecrutamentoVagas.map((vaga) => (
                  <tr key={vaga.id} className="border-b transition-colors hover:bg-slate-50/50 group">
                    <td className="py-4 px-6 font-mono text-xs font-bold text-primary">{vaga.id}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">{vaga.cargo}</td>
                    <td className="py-4 px-6">{vaga.setor}</td>
                    <td className="py-4 px-6 text-[11px] font-medium text-slate-600">{vaga.gestor}</td>
                    <td className="py-4 px-6">{vaga.contrato}</td>
                    <td className="py-4 px-6 text-slate-600 font-medium">{vaga.salario}</td>
                    <td className="py-4 px-6">
                      <StatusBadge status={vaga.status as any} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ActionButton icon={Eye} title="Visualizar Candidatos" />
                        <ActionButton icon={Edit} title="Editar" />
                        <ActionButton icon={Archive} title="Arquivar" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* New Vaga Modal Simulation */}
      <AnimatePresence>
        {showNewVaga && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewVaga(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b flex items-center justify-between bg-slate-50">
                <h2 className="text-xl font-bold">Abertura de Nova Vaga</h2>
                <button onClick={() => setShowNewVaga(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <Plus className="rotate-45" size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Form Sections */}
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

              <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
                <button 
                  onClick={() => setShowNewVaga(false)}
                  className="px-6 py-2 border rounded-xl font-bold hover:bg-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => setShowNewVaga(false)}
                  className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
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

function ActionButton({ icon: Icon, title }: any) {
  return (
    <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors" title={title}>
      <Icon size={16} />
    </button>
  );
}

function FormSection({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-3">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-500 uppercase">{label}</label>
      <input type="text" placeholder={placeholder} className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
    </div>
  );
}

function SelectField({ label, options }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-500 uppercase">{label}</label>
      <select className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white transition-all appearance-none cursor-pointer">
        {options.map((opt: any) => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function TextAreaField({ label, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-500 uppercase">{label}</label>
      <textarea placeholder={placeholder} className="w-full h-24 p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
    </div>
  );
}
