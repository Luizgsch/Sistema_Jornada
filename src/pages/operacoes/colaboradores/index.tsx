import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  ArrowRightLeft, 
  UserMinus,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  ShieldCheck,
  Smartphone,
  Info,
  X
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockOperacoesColaboradores } from "@/data/mock/mockOperacoes";
import { motion, AnimatePresence } from "framer-motion";

export default function ColaboradoresPage() {
  const [selectedColab, setSelectedColab] = useState<any>(null);

  const stats = {
    total: mockOperacoesColaboradores.length,
    tecnologia: mockOperacoesColaboradores.filter(c => c.setor === "Tecnologia").length,
    temporarios: mockOperacoesColaboradores.filter(c => c.contrato === "Temporário").length,
    clt: mockOperacoesColaboradores.filter(c => c.contrato === "CLT").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Colaboradores</h1>
          <p className="text-muted-foreground mt-1">Controle centralizado de headcount e dados profissionais ativos.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Ativos" value={stats.total} icon={Users} color="text-primary" />
        <StatCard title="Tecnologia" value={stats.tecnologia} icon={Smartphone} color="text-blue-500" />
        <StatCard title="Temporários" value={stats.temporarios} icon={Calendar} color="text-amber-500" />
        <StatCard title="Efetivos (CLT)" value={stats.clt} icon={ShieldCheck} color="text-emerald-500" />
      </div>

      <Card>
        <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar por nome, matrícula ou cargo..." 
              className="w-full pl-10 h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 h-10 px-4 border rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              Filtrar
            </button>
          </div>
        </div>
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
      </Card>

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
                 <button className="flex-1 inline-flex items-center justify-center gap-2 h-12 bg-white border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                    <Edit size={18} />
                    Editar Dados
                 </button>
                 <button className="flex-1 inline-flex items-center justify-center gap-2 h-12 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                    <ArrowRightLeft size={18} />
                    Registrar Movimentação
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
