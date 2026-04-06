import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Search, Filter, Plus, Mail, Download, MapPin } from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { mockBancoCandidatos } from "@/infrastructure/mock/mockRecrutamento";

export default function BancoCandidatos() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter text-[#e7e5e4]">Banco de Candidatos</h1>
          <p className="text-zinc-500 mt-1 leading-relaxed text-sm">Acesse sua base de talentos para futuras oportunidades.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
            <Plus size={16} />
            Adicionar Candidato
          </button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4 px-6 border-b border-[#27272a]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
              <input
                type="text"
                placeholder="Buscar por cargo, nome ou cidade..."
                className="w-full pl-10 h-10 rounded-lg border border-[#27272a] bg-[#09090b] px-3 py-2 text-sm text-[#e7e5e4] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-[#27272a] rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 transition-colors">
                <Filter size={14} />
                Filtros
              </button>
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-[#27272a] rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 transition-colors">
                <Download size={14} />
                Exportar
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#09090b] text-zinc-500 text-xs uppercase tracking-widest">
                <tr>
                  <th className="py-4 px-6 border-b border-[#27272a]">Nome</th>
                  <th className="py-4 px-6 border-b border-[#27272a]">Cargo de Interesse</th>
                  <th className="py-4 px-6 border-b border-[#27272a]">Experiência</th>
                  <th className="py-4 px-6 border-b border-[#27272a]">Cidade</th>
                  <th className="py-4 px-6 border-b border-[#27272a]">Origem</th>
                  <th className="py-4 px-6 border-b border-[#27272a]">Status</th>
                  <th className="py-4 px-6 border-b border-[#27272a] text-center">Contato</th>
                </tr>
              </thead>
              <tbody>
                {mockBancoCandidatos.map((candidato) => (
                  <tr key={candidato.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 border-b border-[#27272a]">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#e7e5e4]">{candidato.nome}</span>
                        <span className="text-xs text-zinc-600 mt-0.5">{candidato.telefone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 border-b border-[#27272a]">
                      <span className="font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full text-xs border border-primary/20">
                        {candidato.cargo}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b border-[#27272a] text-zinc-400 text-sm">{candidato.experiencia}</td>
                    <td className="py-4 px-6 border-b border-[#27272a]">
                      <div className="flex items-center gap-1 text-zinc-600 text-xs">
                        <MapPin size={11} />
                        <span>{candidato.cidade}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 border-b border-[#27272a] text-zinc-600 text-xs">{candidato.origem}</td>
                    <td className="py-4 px-6 border-b border-[#27272a]">
                      <StatusBadge status={candidato.status as any} />
                    </td>
                    <td className="py-4 px-6 border-b border-[#27272a] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 hover:bg-primary/10 text-primary rounded-lg transition-colors border border-primary/20">
                          <Mail size={13} />
                        </button>
                        <button className="p-1.5 hover:bg-zinc-800 text-zinc-500 rounded-lg transition-colors border border-[#27272a]">
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
    </div>
  );
}
