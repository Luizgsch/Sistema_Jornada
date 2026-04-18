import { useState } from "react";
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

  const handleExportColaboradores = () => {
    success("Exportação iniciada", "O arquivo será gerado com os filtros atuais da listagem (demonstração).");
  };

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
        description="Gestão completa do quadro de funcionários. Acompanhe dados cadastrais, cargo, documentação e histórico."
        actionLabel="Novo Colaborador"
        onAction={() => setIsModalOpen(true)}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="Total Ativos" value={stats.total} icon={Users} color="text-primary" />
        <StatCard title="Tecnologia" value={stats.tecnologia} icon={Smartphone} color="text-blue-400" />
        <StatCard title="Temporários" value={stats.temporarios} icon={Calendar} color="text-amber-400" />
        <StatCard title="Efetivos (CLT)" value={stats.clt} icon={ShieldCheck} color="text-emerald-400" />
      </div>

      <FiltersBar
        searchPlaceholder="Buscar colaborador por nome, cargo ou matrícula..."
        showExport
        exportLabel="Exportar"
        onExportClick={handleExportColaboradores}
      />

      <div className="bg-[#1e293b] rounded-radius-l border border-[#334155] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#0f172a] text-slate-500 dark:text-slate-300 text-xs font-semibold uppercase tracking-widest">
              <tr>
                <th className="py-4 px-6 border-b border-[#334155]">Matrícula</th>
                <th className="py-4 px-6 border-b border-[#334155]">Colaborador</th>
                <th className="py-4 px-6 border-b border-[#334155]">Cargo / Setor</th>
                <th className="py-4 px-6 border-b border-[#334155]">Gestor</th>
                <th className="py-4 px-6 border-b border-[#334155]">Contrato</th>
                <th className="py-4 px-6 border-b border-[#334155]">Admissão</th>
                <th className="py-4 px-6 border-b border-[#334155]">Status</th>
                <th className="py-4 px-6 border-b border-[#334155] text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockOperacoesColaboradores.map((colab) => (
                <tr key={colab.matricula} className="group hover:bg-zinc-800/30 transition-colors">
                  <td className="py-4 px-6 border-b border-[#334155] font-mono text-xs text-zinc-600">{colab.matricula}</td>
                  <td className="py-4 px-6 border-b border-[#334155]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-[#e7e5e4] font-bold text-xs shrink-0">
                        {colab.nome.charAt(0)}
                      </div>
                      <span className="font-bold text-[#e7e5e4]">{colab.nome}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b border-[#334155]">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#e7e5e4]">{colab.cargo}</span>
                      <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{colab.setor}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b border-[#334155] text-zinc-500 text-xs">{colab.gestor}</td>
                  <td className="py-4 px-6 border-b border-[#334155]">
                    <span className="text-xs font-medium px-2.5 py-0.5 bg-zinc-800 rounded-radius-m border border-zinc-700 text-zinc-400">
                      {colab.contrato}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-b border-[#334155] text-xs text-zinc-600 font-mono">{colab.admissao}</td>
                  <td className="py-4 px-6 border-b border-[#334155]">
                    <StatusBadge status={colab.status as any} />
                  </td>
                  <td className="py-4 px-6 border-b border-[#334155]">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedColab(colab)}
                        className="p-1.5 hover:bg-primary/10 text-primary rounded-radius-m transition-colors"
                        title="Ver Perfil"
                      >
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 hover:bg-zinc-700 text-zinc-500 rounded-radius-m transition-colors">
                        <MoreHorizontal size={14} />
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[#1e293b] border-l border-[#334155] z-[110] flex flex-col"
            >
              <div className="p-8 border-b border-[#334155] bg-[#0f172a] flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-radius-m bg-primary/20 border border-primary/30 flex items-center justify-center text-3xl font-bold text-primary">
                    {selectedColab.nome.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#e7e5e4] tracking-tighter">{selectedColab.nome}</h2>
                    <p className="text-zinc-500 font-medium text-sm">{selectedColab.cargo}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <StatusBadge status={selectedColab.status} />
                      <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded-radius-m border border-[#334155] text-zinc-500 font-mono">
                        {selectedColab.matricula}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedColab(null)}
                  className="p-2 hover:bg-zinc-800 rounded-radius-m transition-colors text-zinc-400"
                >
                  <X size={20} />
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
                  <div className="grid grid-cols-2 gap-4 bg-[#0f172a] p-4 rounded-radius-m border border-[#334155]">
                    <InfoItem label="Setor" value={selectedColab.setor} />
                    <InfoItem label="Gestor" value={selectedColab.gestor} />
                    <InfoItem label="Contrato" value={selectedColab.contrato} />
                    <InfoItem label="Data Admissão" value={selectedColab.admissao} />
                  </div>
                </Section>

                <Section title="Uniforme Registrado">
                  <div className="flex items-center gap-4 p-4 rounded-radius-m bg-[#0f172a] border border-[#334155]">
                    <div className="flex-1 text-center">
                      <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Camisa</p>
                      <p className="text-lg font-bold text-[#e7e5e4]">{selectedColab.uniforme.camisa}</p>
                    </div>
                    <div className="w-px h-8 bg-[#334155]" />
                    <div className="flex-1 text-center">
                      <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Calça</p>
                      <p className="text-lg font-bold text-[#e7e5e4]">{selectedColab.uniforme.calca}</p>
                    </div>
                    <div className="w-px h-8 bg-[#334155]" />
                    <div className="flex-1 text-center">
                      <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Calçado</p>
                      <p className="text-lg font-bold text-[#e7e5e4]">{selectedColab.uniforme.calcado}</p>
                    </div>
                  </div>
                </Section>

                <Section title="Evolução Corporativa (Treinamentos)">
                  <div className="p-5 border border-[#334155] rounded-radius-m bg-[#0f172a] relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-zinc-800 group-hover:text-zinc-700 transition-colors">
                      <GraduationCap size={90} />
                    </div>
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-[#e7e5e4] flex items-center gap-2 text-sm">
                            <Award size={16} className="text-primary" />
                            Nível de Capacitação: Avançado
                          </h4>
                          <p className="text-xs text-zinc-600 mt-1">Trilha de Liderança 2026</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-[#e7e5e4]">85%</span>
                          <p className="text-[10px] uppercase font-bold text-zinc-600 mt-0.5 tracking-widest">Concluído</p>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '85%' }} />
                      </div>
                      <button
                        onClick={() => info("Redirecionando", `Acessando histórico escolar de ${selectedColab.nome}`)}
                        className="mt-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center justify-center border border-primary/20 bg-primary/5 py-2 rounded-radius-m"
                      >
                        Ver Histórico Completo em Treinamentos
                      </button>
                    </div>
                  </div>
                </Section>

                <Section title="Histórico de Movimentações">
                  <div className="space-y-4">
                    {selectedColab.historico.map((h: any, i: number) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                          {i < selectedColab.historico.length - 1 && (
                            <div className="w-px flex-1 bg-[#334155] my-1" />
                          )}
                        </div>
                        <div className="pb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#e7e5e4]">{h.tipo}</span>
                            <span className="text-[10px] text-zinc-600">{h.data}</span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{h.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>

              <div className="p-6 border-t border-[#334155] bg-[#0f172a] flex items-center gap-3">
                <button
                  onClick={() => info("Modo de Edição", `Editando os dados de ${selectedColab.nome}`)}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 bg-[#1e293b] border border-[#334155] rounded-radius-m font-bold hover:bg-zinc-800 transition-colors text-[#e7e5e4] text-sm"
                >
                  <Edit size={16} />
                  Editar Dados
                </button>
                <button
                  onClick={() => {
                    success("Movimentação Registrada", "A solicitação foi enviada para aprovação do RH.");
                    setSelectedColab(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 bg-primary text-white rounded-radius-m font-bold hover:bg-primary/90 transition-colors text-sm"
                >
                  <ArrowRightLeft size={16} />
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
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-radius-m font-bold text-sm transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                success("Colaborador Registrado", "O perfil foi criado e os acessos liberados.");
                setIsModalOpen(false);
              }}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-radius-m font-bold text-sm transition-colors"
            >
              Salvar Registro
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Nome Completo</label>
            <input
              type="text"
              className="w-full h-10 border border-[#334155] bg-[#0f172a] rounded-radius-m px-3 text-[#e7e5e4] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 text-sm"
              placeholder="Ex: João da Silva"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Cargo</label>
              <input
                type="text"
                className="w-full h-10 border border-[#334155] bg-[#0f172a] rounded-radius-m px-3 text-[#e7e5e4] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 text-sm"
                placeholder="Ex: Desenvolvedor Senior"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Setor</label>
              <input
                type="text"
                className="w-full h-10 border border-[#334155] bg-[#0f172a] rounded-radius-m px-3 text-[#e7e5e4] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 text-sm"
                placeholder="Ex: Tecnologia"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">E-mail Corporativo</label>
            <input
              type="email"
              className="w-full h-10 border border-[#334155] bg-[#0f172a] rounded-radius-m px-3 text-[#e7e5e4] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 text-sm"
              placeholder="nome@empresa.com"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-[#1e293b] rounded-radius-l border border-[#334155] hover:border-zinc-600 p-8 flex flex-col gap-4 transition-colors">
      <div className={`p-2 rounded-radius-m bg-zinc-800 w-fit ${color}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">{title}</p>
        <span className="text-3xl font-bold text-[#e7e5e4] leading-none tracking-tighter">{value}</span>
      </div>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-600 border-b border-[#334155] pb-2">{title}</h3>
      {children}
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: any) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1">
        {Icon && <Icon size={10} />}
        {label}
      </p>
      <p className="text-sm font-bold text-[#e7e5e4]">{value}</p>
    </div>
  );
}
