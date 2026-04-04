import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { 
  Award, 
  AlertTriangle, 
  XOctagon, 
  Search, 
  Filter,
  Eye,
  Plus,
  X,
  GraduationCap,
  Calendar,
  CheckCircle2,
  ListTree
} from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { mockCertificados, mockTrainingStats, mockCursos, mockTrilhas } from "@/infrastructure/mock/mockTreinamentos";
import { motion, AnimatePresence } from "framer-motion";

export default function CertificadosPage() {
  const [selectedColab, setSelectedColab] = useState<any>(null);

  // Helper to open drawer with mock data
  const handleOpenDrawer = (certificado: any) => {
    setSelectedColab({
      nome: certificado.colaborador,
      matricula: certificado.matricula,
      setor: certificado.setor,
      certificados: mockCertificados.filter(c => c.matricula === certificado.matricula),
      cursos: mockCursos.slice(0, 2), // Mocking completed courses
      trilhas: mockTrilhas.slice(0, 1)  // Mocking active tracks
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Certificados</h1>
          <p className="text-muted-foreground mt-1">Acompanhamento e rastreamento de qualificações profissionais.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
          <Plus size={18} />
          Registrar Certificado
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Certificados Válidos" value={mockTrainingStats.certificadosValidos} icon={Award} color="text-emerald-500" />
        <MetricCard title="Vencendo em breve" value={mockTrainingStats.certificadosVencendo} icon={AlertTriangle} color="text-amber-500" />
        <MetricCard title="Certificados Vencidos" value={mockTrainingStats.certificadosVencidos} icon={XOctagon} color="text-rose-500" />
      </div>

      <Card>
        <CardHeader className="pb-3 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-bold">Rastreamento de Certificados</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Pesquisar certificado..." 
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
                  <th className="py-4 px-6">Colaborador</th>
                  <th className="py-4 px-6">Curso / Certificação</th>
                  <th className="py-4 px-6 text-center">Data de Conclusão</th>
                  <th className="py-4 px-6 text-center">Validade</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockCertificados.map((cert) => (
                  <tr key={cert.id} className="border-b hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{cert.colaborador}</span>
                        <span className="text-[10px] font-mono text-slate-500">{cert.matricula} • {cert.setor}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800">{cert.curso}</td>
                    <td className="py-4 px-6 text-center text-slate-500">{cert.conclusao}</td>
                    <td className="py-4 px-6 text-center">
                       <span className={`font-medium ${cert.status === 'vencendo' ? 'text-amber-600' : cert.status === 'vencido' ? 'text-rose-600' : 'text-slate-600'}`}>
                         {cert.validade}
                       </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                       <StatusBadge status={cert.status as any} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenDrawer(cert)}
                          className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors" 
                          title="Ver Perfil de Treinamento"
                        >
                          <Eye size={16} />
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

      {/* Employee Training Profile Drawer */}
      <AnimatePresence>
        {selectedColab && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedColab(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white shadow-2xl z-[110] flex flex-col"
            >
              <div className="p-8 border-b bg-slate-900 text-white flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <GraduationCap className="text-primary" size={28} />
                    Perfil de Treinamento
                  </h2>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-xl font-bold">
                       {selectedColab.nome.charAt(0)}
                    </div>
                    <div>
                       <p className="font-bold text-lg leading-tight">{selectedColab.nome}</p>
                       <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedColab.matricula} • {selectedColab.setor}</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedColab(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
                <Section title="Certificados Obtidos">
                  <div className="space-y-3">
                    {selectedColab.certificados.map((cert: any, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl border bg-white shadow-sm">
                         <div className={`p-3 rounded-xl flex-shrink-0 ${cert.status === 'vencido' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                           {cert.status === 'vencido' ? <XOctagon size={24} /> : <Award size={24} />}
                         </div>
                         <div className="flex-1">
                            <h4 className="font-bold text-sm text-slate-900">{cert.curso}</h4>
                            <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                               <span className="flex items-center gap-1"><Calendar size={12} /> Concluído: {cert.conclusao}</span>
                               <span className="flex items-center gap-1"><AlertTriangle size={12} /> Validade: {cert.validade}</span>
                            </div>
                         </div>
                         <StatusBadge status={cert.status} />
                      </div>
                    ))}
                  </div>
                </Section>

                <Section title="Trilhas em Andamento">
                  <div className="space-y-3">
                    {selectedColab.trilhas.map((trilha: any, i: number) => (
                      <div key={i} className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                         <div className="flex items-center justify-between mb-2">
                           <h4 className="font-bold text-sm text-primary flex items-center gap-2">
                             <ListTree size={16} /> {trilha.nome}
                           </h4>
                           <span className="text-xs font-bold text-primary">60% Concluído</span>
                         </div>
                         <div className="w-full h-2 bg-primary/20 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full w-[60%]" />
                         </div>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section title="Histórico de Cursos">
                  <div className="space-y-3">
                    {selectedColab.cursos.map((curso: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-100">
                         <div className="flex items-center gap-3">
                            <CheckCircle2 size={16} className="text-emerald-500" />
                            <span className="text-sm font-medium text-slate-700">{curso.nome}</span>
                         </div>
                         <span className="text-xs text-slate-400">{curso.duracao}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="border-none shadow-sm h-full">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
           <div className={`p-3 rounded-2xl bg-slate-50 ${color}`}>
             <Icon size={24} />
           </div>
           <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">{title}</p>
              <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b pb-2">{title}</h3>
      {children}
    </div>
  );
}
