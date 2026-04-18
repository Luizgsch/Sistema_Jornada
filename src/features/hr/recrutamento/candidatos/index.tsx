import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Search, Filter, Plus, Mail, Download, MapPin, User } from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { mockBancoCandidatos } from "@/infrastructure/mock/mockRecrutamento";
import { SideDrawer } from "@/shared/ui/SideDrawer";
import { Modal } from "@/shared/ui/Modal";
import { useToast } from "@/shared/ui/Toast";

type BancoCandidato = (typeof mockBancoCandidatos)[number];

export default function BancoCandidatos() {
  const [perfil, setPerfil] = useState<BancoCandidato | null>(null);
  const [fullEditCandidato, setFullEditCandidato] = useState<BancoCandidato | null>(null);
  const [editCompletoOpen, setEditCompletoOpen] = useState(false);
  const { success } = useToast();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter text-[#e7e5e4]">Banco de Candidatos</h1>
          <p className="text-zinc-500 dark:text-slate-400 mt-1 leading-relaxed text-sm">Acesse sua base de talentos para futuras oportunidades.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
            <Plus size={16} />
            Adicionar Candidato
          </button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4 px-6 border-b border-[#334155]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
              <input
                type="text"
                placeholder="Buscar por cargo, nome ou cidade..."
                className="w-full pl-10 h-10 rounded-lg border border-[#334155] bg-[#0f172a] px-3 py-2 text-sm text-[#f8fafc] placeholder:text-slate-500 focus:outline-none focus:border-slate-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-[#334155] rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 transition-colors">
                <Filter size={14} />
                Filtros
              </button>
              <button
                type="button"
                title="Exportar base para planilha ou ATS"
                className="inline-flex items-center gap-2 h-10 px-3 border border-[#334155] rounded-lg text-sm font-medium text-zinc-500 bg-transparent hover:bg-zinc-800/50 hover:text-zinc-300 transition-colors"
              >
                <Download size={14} />
                Exportar
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#0f172a] text-slate-500 dark:text-slate-300 text-xs font-semibold uppercase tracking-widest">
                <tr>
                  <th className="py-4 px-6 border-b border-[#334155]">Nome</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Cargo de Interesse</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Experiência</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Cidade</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Origem</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Status</th>
                  <th className="py-4 px-6 border-b border-[#334155] text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockBancoCandidatos.map((candidato) => (
                  <tr key={candidato.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#e7e5e4]">{candidato.nome}</span>
                        <span className="text-xs text-zinc-600 mt-0.5">{candidato.telefone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <span className="font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full text-xs border border-primary/20">
                        {candidato.cargo}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155] text-zinc-400 text-sm">{candidato.experiencia}</td>
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <div className="flex items-center gap-1 text-zinc-600 text-xs">
                        <MapPin size={11} />
                        <span>{candidato.cidade}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155] text-zinc-600 text-xs">{candidato.origem}</td>
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <StatusBadge status={candidato.status as any} />
                    </td>
                    <td className="py-4 px-6 border-b border-[#334155] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPerfil(candidato)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-primary border border-primary/25 rounded-lg hover:bg-primary/10 transition-colors"
                          title="Ver perfil resumido"
                        >
                          <User size={14} />
                          Ver perfil
                        </button>
                        <button className="p-1.5 hover:bg-primary/10 text-primary rounded-lg transition-colors border border-primary/20">
                          <Mail size={13} />
                        </button>
                        <button className="p-1.5 hover:bg-zinc-800 text-zinc-500 rounded-lg transition-colors border border-[#334155]">
                          <Plus size={13} />
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

      <SideDrawer
        open={!!perfil}
        onClose={() => setPerfil(null)}
        title={perfil?.nome ?? "Perfil"}
        subtitle={perfil ? `${perfil.cargo} · ${perfil.cidade}` : undefined}
        overlay="subtle"
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={() => setPerfil(null)}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-[#334155] text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={() => {
                if (perfil) setFullEditCandidato(perfil);
                setPerfil(null);
                setEditCompletoOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Editar perfil completo
            </button>
          </div>
        }
      >
        {perfil ? (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {perfil.competencias.map((c) => (
                <span key={c} className="text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-[#334155]">
                  {c}
                </span>
              ))}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">E-mail</p>
              <p className="text-sm font-medium text-[#e7e5e4]">{perfil.email}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Resumo</p>
              <p className="text-sm text-zinc-400 leading-relaxed">{perfil.resumo}</p>
            </div>
          </div>
        ) : null}
      </SideDrawer>

      <Modal
        isOpen={editCompletoOpen}
        onClose={() => {
          setEditCompletoOpen(false);
          setFullEditCandidato(null);
        }}
        title="Editar perfil completo"
        description="Formulário completo para atualização cadastral e histórico profissional (demonstração)."
        maxWidth="lg"
        footer={
          <>
            <button
              type="button"
              onClick={() => {
                setEditCompletoOpen(false);
                setFullEditCandidato(null);
              }}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-bold text-sm transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => {
                success("Perfil atualizado", "Alterações salvas na demonstração (sem persistência).");
                setEditCompletoOpen(false);
                setFullEditCandidato(null);
              }}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-sm transition-colors"
            >
              Salvar alterações
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Nome completo</label>
              <input
                type="text"
                defaultValue={fullEditCandidato?.nome}
                className="w-full h-10 border border-[#334155] bg-[#0f172a] rounded-lg px-3 text-[#e7e5e4] text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">E-mail</label>
              <input
                type="email"
                defaultValue={fullEditCandidato?.email}
                className="w-full h-10 border border-[#334155] bg-[#0f172a] rounded-lg px-3 text-[#e7e5e4] text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Experiência e formação (texto longo)</label>
            <textarea
              rows={6}
              defaultValue={fullEditCandidato?.resumo}
              className="w-full border border-[#334155] bg-[#0f172a] rounded-lg px-3 py-2 text-[#e7e5e4] text-sm focus:outline-none focus:border-zinc-600 resize-y min-h-[120px]"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
