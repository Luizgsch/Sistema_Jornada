import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Plus, 
  FileSpreadsheet,
  X,
  Loader2
} from "lucide-react";
import { mockRelatorios } from "@/infrastructure/mock/mockAnalytics";
import { motion, AnimatePresence } from "framer-motion";

export default function RelatoriosPage() {
  const [selectedReport, setSelectedReport] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Central de Relatórios</h1>
          <p className="text-muted-foreground mt-1">Geração e exportação de dados analíticos estruturados.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
          <Plus size={18} />
          Novo Relatório Customizado
        </button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-bold">Relatórios Disponíveis</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Pesquisar relatório..." 
                className="w-full pl-9 h-9 text-sm rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
            <button className="h-9 px-3 border rounded-md text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
              <Filter size={14} />
              Filtrar por Categoria
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b">
                <tr className="text-muted-foreground font-medium text-[11px] uppercase tracking-wider">
                  <th className="py-4 px-6">Nome do Relatório</th>
                  <th className="py-4 px-6">Categoria</th>
                  <th className="py-4 px-6">Período de Análise</th>
                  <th className="py-4 px-6">Última Atualização</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockRelatorios.map((rel) => (
                  <tr key={rel.id} className="border-b hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6 font-bold text-slate-900 border-l-2 border-transparent group-hover:border-primary">
                      {rel.nome}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md bg-slate-100 text-slate-600 border">
                        {rel.categoria}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">{rel.periodo}</td>
                    <td className="py-4 px-6 text-slate-500 text-xs">{rel.ultimaAtualizacao}</td>
                    <td className="py-4 px-6 text-center">
                      {rel.status === "pronto" ? (
                         <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">Pronto</span>
                      ) : (
                         <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1 justify-center w-max mx-auto">
                           <Loader2 size={10} className="animate-spin" /> Gerando
                         </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => rel.status === 'pronto' && setSelectedReport(rel)}
                          disabled={rel.status !== 'pronto'}
                          className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 disabled:opacity-30 transition-colors" 
                          title="Visualizar Relatório"
                        >
                          <Eye size={16} />
                        </button>
                        <button disabled={rel.status !== 'pronto'} className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 disabled:opacity-30 transition-colors" title="Baixar PDF">
                          <FileText size={16} />
                        </button>
                        <button disabled={rel.status !== 'pronto'} className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 disabled:opacity-30 transition-colors" title="Exportar Excel">
                          <FileSpreadsheet size={16} />
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

      {/* Report Preview Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReport(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]"
            >
              <div className="p-6 border-b bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-full bg-primary/20 text-primary border border-primary/30">
                        {selectedReport.categoria}
                     </span>
                     <span className="text-[10px] text-slate-400 font-mono">ID: {selectedReport.id}</span>
                  </div>
                  <h2 className="text-xl font-bold">{selectedReport.nome}</h2>
                  <p className="text-xs text-slate-400 mt-1">Período analisado: {selectedReport.periodo}</p>
                </div>
                <div className="flex items-center gap-3">
                   <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-sm font-bold rounded-lg transition-colors">
                      <Download size={14} /> PDF
                   </button>
                   <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-sm font-bold rounded-lg transition-colors">
                      <FileSpreadsheet size={14} /> Excel
                   </button>
                   <button onClick={() => setSelectedReport(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors ml-2">
                     <X size={20} />
                   </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
                <div className="p-6 border rounded-xl bg-white flex flex-col items-center justify-center min-h-[400px]">
                   <FileText size={48} className="text-slate-200 mb-4" />
                   <h3 className="text-lg font-bold text-slate-700">Visualização do Relatório</h3>
                   <p className="text-slate-500 text-sm max-w-md text-center mt-2 leading-relaxed">
                     Esta é uma pré-visualização simplificada. Os gráficos interativos e tabelas detalhadas estarão disponíveis na versão exportada (PDF ou Excel).
                   </p>
                   <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                      <div className="p-4 border border-dashed rounded-lg bg-slate-50">
                         <div className="h-2 w-1/2 bg-slate-200 rounded mb-2" />
                         <div className="h-10 w-full bg-slate-100 rounded" />
                      </div>
                      <div className="p-4 border border-dashed rounded-lg bg-slate-50">
                         <div className="h-2 w-1/3 bg-slate-200 rounded mb-2" />
                         <div className="h-10 w-full bg-slate-100 rounded" />
                      </div>
                      <div className="p-4 border border-dashed rounded-lg bg-slate-50">
                         <div className="h-2 w-2/3 bg-slate-200 rounded mb-2" />
                         <div className="h-10 w-full bg-slate-100 rounded" />
                      </div>
                      <div className="p-4 border border-dashed rounded-lg bg-slate-50">
                         <div className="h-2 w-1/2 bg-slate-200 rounded mb-2" />
                         <div className="h-10 w-full bg-slate-100 rounded" />
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
