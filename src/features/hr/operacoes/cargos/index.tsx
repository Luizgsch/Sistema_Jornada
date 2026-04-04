import { useState } from 'react';
import { Search, Plus, Briefcase, ChevronRight, X, FileText, CheckCircle2, DollarSign, Layers } from 'lucide-react';
import { Card, CardContent } from '@/shared/ui/Card';
import type { Cargo } from '@/infrastructure/mock/mockCargos';
import { mockCargos } from '@/infrastructure/mock/mockCargos';
import { AnimatePresence, motion } from 'framer-motion';

export default function CargosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);

  const filteredCargos = mockCargos.filter(cargo => 
    cargo.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cargo.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Banco de Cargos e Descrições</h1>
          <p className="text-muted-foreground mt-1">Biblioteca centralizada de descrições de cargos (Job Descriptions), requisitos e tetos salariais.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
          <Plus size={18} />
          Novo Cargo
        </button>
      </div>

      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nome do cargo ou departamento..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCargos.map(cargo => (
          <div
            key={cargo.id}
            className="cursor-pointer"
            onClick={() => setSelectedCargo(cargo)}
          >
          <Card 
            className="hover:shadow-md transition-shadow flex flex-col pt-6"
          >
            <CardContent className="flex flex-col flex-1 pb-4">
              <div className="flex-1">
                <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 rounded-full mb-3">
                  {cargo.departamento}
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2">{cargo.nome}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{cargo.descricao}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                  <FileText size={16} /> Detalhes da Vaga
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </div>
            </CardContent>
          </Card>
          </div>
        ))}

        {filteredCargos.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 py-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl">
            Nenhum cargo encontrado na busca.
          </div>
        )}
      </div>

      {/* Modal / Side Panel Animado */}
      <AnimatePresence>
        {selectedCargo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setSelectedCargo(null)}
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl h-full sm:h-[calc(100vh-2rem)] sm:my-4 sm:mr-4 bg-white sm:rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              <div className="flex items-start justify-between p-6 border-b border-slate-100 shrink-0">
                <div>
                  <span className="inline-block px-2.5 py-1 text-xs font-bold uppercase overflow-hidden bg-primary/10 text-primary rounded-full mb-2">
                    {selectedCargo.departamento}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedCargo.nome}</h2>
                </div>
                <button 
                  onClick={() => setSelectedCargo(null)}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                
                <section>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FileText size={16} /> Descrição
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed text-balance">
                    {selectedCargo.descricao}
                  </p>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Responsabilidades
                  </h4>
                  <ul className="space-y-2">
                    {selectedCargo.responsabilidades.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Briefcase size={16} /> Requisitos Técnicos
                  </h4>
                  <ul className="space-y-2">
                    {selectedCargo.requisitosTecnicos.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Layers size={16} /> Competências Comportamentais
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCargo.competenciasComportamentais.map((c, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
                        {c}
                      </span>
                    ))}
                  </div>
                </section>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                       <DollarSign size={20} />
                     </div>
                     <div>
                       <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Faixa Salarial Referência</p>
                       <p className="text-lg font-bold text-emerald-900 leading-tight">{selectedCargo.faixaSalarial}</p>
                     </div>
                   </div>
                </div>

              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0 flex gap-3">
                <button className="flex-1 justify-center inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                  Editar Job Description
                </button>
                <button className="flex-1 justify-center inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
                  Abrir Nova Vaga
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
