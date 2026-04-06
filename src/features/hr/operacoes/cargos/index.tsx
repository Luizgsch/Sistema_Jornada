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
          <h1 className="text-3xl font-bold tracking-tight text-[#e7e5e4] dark:text-white">Banco de Cargos e Descrições</h1>
          <p className="text-muted-foreground mt-1">Biblioteca centralizada de descrições de cargos (Job Descriptions), requisitos e tetos salariais.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors ">
          <Plus size={18} />
          Novo Cargo
        </button>
      </div>

      <div className="bg-[#18181b] p-4 border border-[#27272a] rounded-xl ">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
          <input 
            type="text" 
            placeholder="Buscar por nome do cargo ou departamento..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 h-10 rounded-lg border border-[#27272a] bg-[#09090b] px-3 py-2 text-[14px] font-medium text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
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
            className="hover: transition-shadow flex flex-col pt-6"
          >
            <CardContent className="flex flex-col flex-1 pb-4">
              <div className="flex-1">
                <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-500 rounded-full mb-3">
                  {cargo.departamento}
                </span>
                <h3 className="text-lg font-bold text-[#e7e5e4] leading-tight mb-2">{cargo.nome}</h3>
                <p className="text-sm text-zinc-500 line-clamp-2">{cargo.descricao}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#27272a] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                  <FileText size={16} /> Detalhes da Vaga
                </div>
                <ChevronRight size={18} className="text-zinc-600" />
              </div>
            </CardContent>
          </Card>
          </div>
        ))}

        {filteredCargos.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 py-12 text-center text-zinc-500 border-2 border-dashed border-[#27272a] rounded-2xl">
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
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedCargo(null)}
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl h-full sm:h-[calc(100vh-2rem)] sm:my-4 sm:mr-4 bg-[#18181b] sm:rounded-2xl  flex flex-col z-10 overflow-hidden"
            >
              <div className="flex items-start justify-between p-6 border-b border-[#27272a] shrink-0">
                <div>
                  <span className="inline-block px-2.5 py-1 text-xs font-bold uppercase overflow-hidden bg-primary/10 text-primary rounded-full mb-2">
                    {selectedCargo.departamento}
                  </span>
                  <h2 className="text-2xl font-bold text-[#e7e5e4] leading-tight">{selectedCargo.nome}</h2>
                </div>
                <button 
                  onClick={() => setSelectedCargo(null)}
                  className="p-2 text-zinc-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                
                <section>
                  <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FileText size={16} /> Descrição
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed text-balance">
                    {selectedCargo.descricao}
                  </p>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Responsabilidades
                  </h4>
                  <ul className="space-y-2">
                    {selectedCargo.responsabilidades.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Briefcase size={16} /> Requisitos Técnicos
                  </h4>
                  <ul className="space-y-2">
                    {selectedCargo.requisitosTecnicos.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Layers size={16} /> Competências Comportamentais
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCargo.competenciasComportamentais.map((c, idx) => (
                      <span key={idx} className="bg-zinc-800 text-zinc-300 border border-[#27272a] px-3 py-1.5 rounded-lg text-xs font-semibold">
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

              <div className="p-6 border-t border-[#27272a] bg-[#09090b] shrink-0 flex gap-3">
                <button className="flex-1 justify-center inline-flex items-center gap-2 px-4 py-2.5 bg-[#18181b] border border-zinc-700 text-zinc-300 rounded-xl text-sm font-semibold hover:bg-[#09090b] transition-colors ">
                  Editar Job Description
                </button>
                <button className="flex-1 justify-center inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors ">
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
