import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Search, Filter, Plus, Edit, ListTree, UserPlus } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockTrilhas } from "@/data/mock/mockTreinamentos";
import { motion, AnimatePresence } from "framer-motion";

export default function TrilhasPage() {
  const [showNewTrilha, setShowNewTrilha] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trilhas de Aprendizado</h1>
          <p className="text-muted-foreground mt-1">Planos de capacitação estruturados por cargo ou área.</p>
        </div>
        <button 
          onClick={() => setShowNewTrilha(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Nova Trilha
        </button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-bold">Listagem de Trilhas</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Pesquisar trilha..." 
                className="w-full pl-9 h-9 text-sm rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
            <button className="h-9 px-3 border rounded-md text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
              <Filter size={14} />
              Filtros
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b">
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
                {mockTrilhas.map((trilha) => (
                  <tr key={trilha.id} className="border-b hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6 font-bold text-slate-900 border-l-2 border-transparent group-hover:border-primary">
                      {trilha.nome}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md bg-slate-100 text-slate-600 border">
                        {trilha.area}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium">{trilha.cargo}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-slate-100 font-bold text-xs text-slate-700">
                        {trilha.qtdCursos}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                       <StatusBadge status={trilha.status as any} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors" title="Ver Cursos da Trilha">
                          <ListTree size={16} />
                        </button>
                        <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors" title="Associar Colaboradores">
                          <UserPlus size={16} />
                        </button>
                        <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors" title="Editar Trilha">
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

      {/* New Trilha Modal */}
      <AnimatePresence>
        {showNewTrilha && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewTrilha(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b bg-slate-50 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Criar Nova Trilha de Aprendizado</h2>
                  <p className="text-xs text-muted-foreground mt-1">Crie um caminho de capacitação estruturado.</p>
                </div>
                <button onClick={() => setShowNewTrilha(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <Plus className="rotate-45 text-slate-500" size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-3">Informações Gerais</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Nome da Trilha" placeholder="Ex: Formação Liderança" />
                    <SelectField label="Área Responsável" options={["Todas", "Tecnologia", "Vendas", "RH"]} />
                    <SelectField label="Cargo Relacionado" options={["Todos", "Coordenadores/Gerentes", "Analistas", "Desenvolvedor(a)"]} />
                    <div className="col-span-2">
                       <TextAreaField label="Descrição" placeholder="Objetivo de aprendizado desta trilha..." />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-3">Conteúdo da Trilha</h3>
                     <button className="text-xs font-bold text-primary hover:underline">Adicionar Curso +</button>
                  </div>
                  <div className="p-8 border-2 border-dashed rounded-xl bg-slate-50 flex flex-col items-center justify-center text-center">
                     <ListTree className="text-slate-300 mb-2" size={32} />
                     <p className="text-sm text-slate-500 font-medium">Nenhum curso adicionado à trilha.</p>
                     <p className="text-xs text-slate-400">Clique em "Adicionar Curso" para construir o plano de aprendizado.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
                <button 
                  onClick={() => setShowNewTrilha(false)}
                  className="px-6 py-2 border rounded-xl font-bold hover:bg-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => setShowNewTrilha(false)}
                  className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Salvar Trilha
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusing form components
function Field({ label, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-500 uppercase">{label}</label>
      <input type="text" placeholder={placeholder} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
    </div>
  );
}

function SelectField({ label, options }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-500 uppercase">{label}</label>
      <select className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white appearance-none cursor-pointer">
        {options.map((opt: any) => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function TextAreaField({ label, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-500 uppercase">{label}</label>
      <textarea placeholder={placeholder} className="w-full h-20 p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
    </div>
  );
}
