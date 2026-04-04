import { useState } from "react";
import { Card, CardContent } from "@/shared/ui/Card";
import { 
  Users, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  ArrowRightLeft, 
  MapPin,
  Calendar,
  ShieldCheck,
  Smartphone,
  Info,
  X,
  GraduationCap, 
  Award
} from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { mockOperacoesColaboradores } from "@/infrastructure/mock/mockOperacoes";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/shared/ui/Toast";

import { PageHeader } from "@/shared/ui/PageHeader";
import { FiltersBar } from "@/shared/ui/FiltersBar";
import { Modal } from "@/shared/ui/Modal";

export default function ColaboradoresPage() {
  const [selectedColab, setSelectedColab] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { success, info } = useToast();

  const stats = {
    total: mockOperacoesColaboradores.length,
    tecnologia: mockOperacoesColaboradores.filter(c => c.setor === "Tecnologia").length,
    temporarios: mockOperacoesColaboradores.filter(c => c.contrato === "Temporário").length,
    clt: mockOperacoesColaboradores.filter(c => c.contrato === "CLT").length,
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <PageHeader
        title="Colaboradores"
        description="Gestão completa do quadro de funcionários. Acompanhe dados cadastrais, cargo, documentação e histórico dentro da empresa."
        actionLabel="Novo Colaborador"
        onAction={() => setIsModalOpen(true)}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Ativos" value={stats.total} icon={Users} color="text-primary" />
        <StatCard title="Tecnologia" value={stats.tecnologia} icon={Smartphone} color="text-blue-500" />
        <StatCard title="Temporários" value={stats.temporarios} icon={Calendar} color="text-amber-500" />
        <StatCard title="Efetivos (CLT)" value={stats.clt} icon={ShieldCheck} color="text-emerald-500" />
      </div>

      <FiltersBar searchPlaceholder="Buscar colaborador por nome, cargo ou matrícula..." />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b">
              <tr className="text-muted-foreground font-medium">
                <th className="py-4 px-6">Matrícula</th>
                <th className="py-4 px-6">Colaborador</th>
                <th className="py-4 px-6">Cargo / Setor</th>
                <th className="py-4 px-6">Gestor</th>
                <th className="py-4 px-6">Contrato</th>
                <th className="py-4 px-6">Admissão</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockOperacoesColaboradores.map((colab) => (
                <tr key={colab.matricula} className="border-b hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6 font-mono text-xs font-bold text-slate-500">{colab.matricula}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs ring-2 ring-slate-100">
                        {colab.nome.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900">{colab.nome}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-medium">{colab.cargo}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{colab.setor}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{colab.gestor}</td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded-md border border-slate-200">{colab.contrato}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{colab.admissao}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={colab.status as any} />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setSelectedColab(colab)} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors" title="Ver Perfil">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Profile Drawer */}
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
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center text-3xl font-bold shadow-2xl shadow-primary/20 border-4 border-slate-800">
                    {selectedColab.nome.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedColab.nome}</h2>
                    <p className="text-primary-foreground/70 font-medium">{selectedColab.cargo}</p>
                    <div className="mt-3 flex items-center gap-2">
                       <StatusBadge status={selectedColab.status} />
                       <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full border border-white/5">{selectedColab.matricula}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedColab(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <Section title="Informações Pessoais">
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem icon={Info} label="CPF" value={selectedColab.cpf} />
                    <InfoItem icon={Smartphone} label="Telefone" value={selectedColab.telefone} />
                    <div className="col-span-2">
                      <InfoItem icon={MapPin} label="Endereço" value={selectedColab.endereco} />
                    </div>
                  </div>
                </Section>

                <Section title="Informações Profissionais">
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <InfoItem label="Setor" value={selectedColab.setor} />
                    <InfoItem label="Gestor" value={selectedColab.gestor} />
                    <InfoItem label="Contrato" value={selectedColab.contrato} />
                    <InfoItem label="Data Admissão" value={selectedColab.admissao} />
                  </div>
                </Section>

                <Section title="Uniforme Registrado">
                   <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 text-white">
                      <div className="flex-1 text-center">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Camisa</p>
                        <p className="text-lg font-bold">{selectedColab.uniforme.camisa}</p>
                      </div>
                      <div className="w-px h-8 bg-slate-800" />
                      <div className="flex-1 text-center">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Calça</p>
                        <p className="text-lg font-bold">{selectedColab.uniforme.calca}</p>
                      </div>
                      <div className="w-px h-8 bg-slate-800" />
                      <div className="flex-1 text-center">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Calçado</p>
                        <p className="text-lg font-bold">{selectedColab.uniforme.calcado}</p>
                      </div>
                   </div>
                </Section>

                <Section title="Evolução Corporativa (Treinamentos)">
                  <div className="p-5 border rounded-2xl bg-slate-50 relative overflow-hidden group">
                     <div className="absolute -right-4 -top-4 text-slate-200 group-hover:text-primary/10 transition-colors">
                        <GraduationCap size={100} />
                     </div>
                     <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                           <div>
                              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <Award size={18} className="text-primary" />
                                Nível de Capacitação: Avançado
                              </h4>
                              <p className="text-xs text-slate-500 mt-1">Trilha de Liderança 2026</p>
                           </div>
                           <div className="text-right">
                              <span className="text-2xl font-black text-slate-900">85%</span>
                              <p className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">Concluído</p>
                           </div>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                           <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '85%' }} />
                        </div>
                        <button 
                          onClick={() => info("Redirecionando", `Acessando histórico escolar de ${selectedColab.nome}`)}
                          className="mt-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center justify-center border border-primary/20 bg-primary/5 py-2 rounded-lg"
                        >
                          Ver Histórico Completo em Treinamentos
                        </button>
                     </div>
                  </div>
                </Section>

                <Section title="Histórico de Movimentações">
                  <div className="space-y-4">
                    {selectedColab.historico.map((h: any, i: number) => (
                      <div key={i} className="flex gap-4 group">
                         <div className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                            {i < selectedColab.historico.length - 1 && <div className="w-0.5 flex-1 bg-slate-100 my-1" />}
                         </div>
                         <div className="pb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-950">{h.tipo}</span>
                              <span className="text-[10px] text-muted-foreground">{h.data}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{h.desc}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>

              <div className="p-6 border-t bg-slate-50 flex items-center gap-3">
                 <button 
                  onClick={() => info("Modo de Edição", `Editando os dados de ${selectedColab.nome}`)}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 bg-white border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                 >
                    <Edit size={18} />
                    Editar Dados
                 </button>
                 <button 
                  onClick={() => {
                    success("Movimentação Registrada", "A solicitação foi enviada para aprovação do RH.");
                    setSelectedColab(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                 >
                    <ArrowRightLeft size={18} />
                    Registrar Movimentação
                 </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Novo Colaborador"
        description="Preencha as informações básicas para registrar um novo colaborador."
        footer={
          <>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-sm transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={() => {
                success("Colaborador Registrado", "O perfil foi criado e os acessos liberados.");
                setIsModalOpen(false);
              }}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-sm transition-colors shadow-lg shadow-primary/20"
            >
              Salvar Registro
            </button>
          </>
        }
      >
        <div className="space-y-4">
           <div>
             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome Completo</label>
             <input type="text" className="w-full h-10 border border-slate-200 rounded-lg px-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Ex: João da Silva" />
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cargo</label>
               <input type="text" className="w-full h-10 border border-slate-200 rounded-lg px-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Ex: Desenvolvedor Senior" />
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Setor</label>
               <input type="text" className="w-full h-10 border border-slate-200 rounded-lg px-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Ex: Tecnologia" />
             </div>
           </div>
           <div>
             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">E-mail Corporativo</label>
             <input type="email" className="w-full h-10 border border-slate-200 rounded-lg px-3 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="nome@empresa.com" />
           </div>
        </div>
      </Modal>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="border-none shadow-sm h-full">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-xl bg-slate-50 ${color}`}>
            <Icon size={20} />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
          <span className="text-2xl font-bold text-slate-900">{value}</span>
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

function InfoItem({ icon: Icon, label, value }: any) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
        {Icon && <Icon size={10} />}
        {label}
      </p>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}
