import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Search, Filter, Plus, Mail, Download, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockBancoCandidatos } from "@/data/mock/mockRecrutamento";

export default function BancoCandidatos() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banco de Candidatos</h1>
          <p className="text-muted-foreground mt-1">Acesse sua base de talentos para futuras oportunidades.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
            <Plus size={18} />
            Adicionar Candidato
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
                placeholder="Buscar por cargo, nome ou cidade..." 
                className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
                <Filter size={16} />
                Filtros Avançados
              </button>
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
                <Download size={16} />
                Exportar Dados
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-y border-slate-200">
                <tr className="text-muted-foreground font-medium">
                  <th className="py-3 px-6">Nome</th>
                  <th className="py-3 px-6">Cargo de Interesse</th>
                  <th className="py-3 px-6">Experiência</th>
                  <th className="py-3 px-6">Cidade</th>
                  <th className="py-3 px-6">Origem</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-center">Contato</th>
                </tr>
              </thead>
              <tbody>
                {mockBancoCandidatos.map((candidato) => (
                  <tr key={candidato.id} className="border-b transition-colors hover:bg-slate-50/50 group">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{candidato.nome}</span>
                        <span className="text-[11px] text-muted-foreground">{candidato.telefone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-primary bg-primary/5 px-2 py-0.5 rounded text-xs">{candidato.cargo}</span>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-600">{candidato.experiencia}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-slate-500">
                        <MapPin size={14} />
                        <span>{candidato.cidade}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{candidato.origem}</td>
                    <td className="py-4 px-6">
                      <StatusBadge status={candidato.status as any} />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors border border-primary/20">
                          <Mail size={16} />
                        </button>
                        <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors border">
                          <Plus size={16} />
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
