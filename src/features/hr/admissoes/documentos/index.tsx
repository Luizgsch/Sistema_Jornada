import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Search, Filter, FileText, CheckCircle, Eye, Download, UserPlus } from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";


const mockCandidates = [
  { id: "1", nome: "Ana Silva", cargo: "Desenvolvedora Frontend", setor: "Tecnologia", cpf: "123.456.789-00", status: "pendente", inicio: "2026-04-01", responsavel: "João Pedro" },
  { id: "2", nome: "Marcos Souza", cargo: "Analista de Dados", setor: "Tecnologia", cpf: "234.567.890-11", status: "analise", inicio: "2026-04-05", responsavel: "Alice Lima" },
  { id: "3", nome: "Juliana Costa", cargo: "Gerente de Conta", setor: "Vendas", cpf: "345.678.901-22", status: "completo", inicio: "2026-04-10", responsavel: "João Pedro" },
  { id: "4", nome: "Ricardo Pereira", cargo: "Designer UX", setor: "Marketing", cpf: "456.789.012-33", status: "pendente", inicio: "2026-03-25", responsavel: "Alice Lima" },
];

export default function DocumentosAdmissionais() {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  return (
    <div className="space-y-6">
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
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-md text-sm font-medium hover:bg-slate-50">
                <Filter size={16} />
                Filtros
              </button>
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-md text-sm font-medium hover:bg-slate-50">
                <Download size={16} />
                Exportar
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-y border-slate-200">
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
                  <tr key={candidate.id} className="border-b hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{candidate.nome}</span>
                        <span className="text-[11px] text-muted-foreground">Responsável: {candidate.responsavel}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span>{candidate.cargo}</span>
                        <span className="text-[11px] text-muted-foreground">{candidate.setor}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{candidate.cpf}</td>
                    <td className="py-4 px-6">
                      <StatusBadge status={candidate.status as any} />
                    </td>
                    <td className="py-4 px-6 font-medium">{candidate.inicio}</td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => setSelectedCandidate(candidate)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-primary hover:bg-primary/5 transition-colors"
                        title="Gerar Documentos"
                      >
                        <FileText size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Side Panel Simulation */}
      <AnimatePresence>
        {selectedCandidate && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCandidate(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between bg-slate-50">
                <div>
                  <h2 className="text-xl font-bold">Gerador de Documentos</h2>
                  <p className="text-xs text-muted-foreground">Colaborador: {selectedCandidate.nome}</p>
                </div>
                <button onClick={() => setSelectedCandidate(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <Search className="rotate-45" size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Documentos Automáticos</h3>
                  <div className="grid gap-3">
                    <DocumentAction 
                      label="Carta Proposta" 
                      onClick={() => alert('Gerando Carta Proposta...')} 
                    />
                    <DocumentAction 
                      label="Declaração de Conta" 
                      onClick={() => alert('Gerando Declaração...')} 
                    />
                    <DocumentAction 
                      label="Ficha Cadastral" 
                      onClick={() => alert('Gerando Ficha...')} 
                    />
                    <DocumentAction 
                      label="Contrato de Trabalho" 
                      onClick={() => alert('Gerando Contrato...')} 
                    />
                    <DocumentAction 
                      label="Termo de Confidencialidade" 
                      onClick={() => alert('Gerando Termo...')} 
                    />
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle size={16} />
                    <span className="text-sm font-bold">Informações Carregadas</span>
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function DocumentAction({ label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 border rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-primary/10">
          <FileText size={18} className="text-slate-600 group-hover:text-primary" />
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <Eye size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
