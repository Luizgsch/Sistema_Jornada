import { useState } from "react";

import { 
  Search, 
  Plus, 
  MoreVertical, 
  Calendar, 
  Mail, 
  Phone, 
  FileText,
  Clock,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { mockPipelineCandidatos } from "@/data/mock/mockRecrutamento";

const stages = [
  { id: "inscritos", title: "Inscritos" },
  { id: "triagem", title: "Triagem" },
  { id: "entrevista-rh", title: "Entrevista RH" },
  { id: "entrevista-gestor", title: "Entrevista Gestor" },
  { id: "teste-tecnico", title: "Teste Técnico" },
  { id: "aprovado", title: "Aprovado" },
  { id: "reprovado", title: "Reprovado" },
];

export default function RecruitmentPipeline() {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const getCandidatesByStage = (stageId: string) => {
    return mockPipelineCandidatos.filter(c => c.etapa === stageId);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline de Seleção</h1>
          <p className="text-muted-foreground mt-1">Acompanhe a evolução dos candidatos no funil de contratação.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar candidato..." 
              className="pl-10 h-10 w-64 rounded-lg border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="h-10 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus size={18} />
            Novo Candidato
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-6 h-full min-w-max">
          {stages.map((stage) => (
            <div key={stage.id} className="w-72 flex flex-col">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-700">{stage.title}</h3>
                  <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {getCandidatesByStage(stage.id).length}
                  </span>
                </div>
                <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
              </div>
              
              <div className="flex-1 bg-slate-100/50 rounded-xl p-3 space-y-3 min-h-[500px] border border-dashed border-slate-200">
                {getCandidatesByStage(stage.id).map((candidate) => (
                  <motion.div
                    key={candidate.id}
                    layoutId={candidate.id}
                    onClick={() => setSelectedCandidate(candidate)}
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded uppercase tracking-wider">
                        {candidate.cargo}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">{candidate.origem}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{candidate.nome}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Exp: {candidate.experiencia}</p>
                    
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">JS</div>
                        <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary italic">AI</div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock size={10} />
                        <span>2d</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Profile Drawer */}
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
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-[110] flex flex-col"
            >
              <div className="p-8 border-b bg-slate-50 flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-slate-900/20">
                    {selectedCandidate.nome.split(' ').map((n: any) => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedCandidate.nome}</h2>
                    <p className="text-primary font-bold text-sm tracking-wide uppercase">{selectedCandidate.cargo}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>Rio de Janeiro, RJ</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>Candidatou-se há 5 dias</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedCandidate(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <ContactCard icon={Mail} label="E-mail" value="candidato@email.com" />
                  <ContactCard icon={Phone} label="Telefone" value="(21) 98765-4321" />
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Experiência Profissional</h3>
                  <div className="space-y-4">
                    <ExperienceItem title="Senior Software Engineer" company="Tech Solutions Inc." period="2020 - Presente" />
                    <ExperienceItem title="Fullstack Developer" company="Startup Growth" period="2018 - 2020" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Currículo & Documentos</h3>
                  <button className="flex items-center gap-3 w-full p-4 border rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-primary/10">
                      <FileText size={20} className="text-slate-600 group-hover:text-primary" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold">Curriculo_Vite_{selectedCandidate.nome.replace(' ', '_')}.pdf</span>
                      <span className="text-[11px] text-muted-foreground uppercase">PDF • 1.2 MB</span>
                    </div>
                  </button>
                </div>

                <div className="p-6 bg-slate-900 rounded-2xl text-white">
                  <h4 className="font-bold mb-2">Observações do RH</h4>
                  <p className="text-slate-300 text-sm italic mb-4">"Candidato demonstrou forte conhecimento técnico durante a triagem inicial. Boa comunicação e alinhamento cultural."</p>
                  <button className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                    Agendar Entrevista
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactCard({ icon: Icon, label, value }: any) {
  return (
    <div className="p-3 border rounded-xl flex items-center gap-3">
      <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{label}</p>
        <p className="text-xs font-bold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function ExperienceItem({ title, company, period }: any) {
  return (
    <div className="relative pl-6 border-l-2 border-slate-100">
      <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary" />
      <h4 className="text-sm font-bold text-slate-900">{title}</h4>
      <p className="text-xs text-primary font-medium">{company}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{period}</p>
    </div>
  );
}
