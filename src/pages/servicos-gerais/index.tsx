import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Wrench, Search, Filter, Plus, MapPin, Clock, CheckCircle, AlertTriangle, Truck, Package, HardHat, ClipboardList } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

const mockSolicitacoes = [
  { id: "SG-001", titulo: "Manutenção ar-condicionado - Sala 201", tipo: "Manutenção", prioridade: "alta", status: "em-andamento", local: "Edifício A - 2º Andar", solicitante: "Maria Silva", data: "2026-04-01" },
  { id: "SG-002", titulo: "Troca de lâmpadas - Corredor B", tipo: "Manutenção", prioridade: "media", status: "pendente", local: "Edifício B - Térreo", solicitante: "João Santos", data: "2026-03-31" },
  { id: "SG-003", titulo: "Limpeza extra - Auditório", tipo: "Serviço", prioridade: "baixa", status: "concluido", local: "Edifício A - Térreo", solicitante: "Ana Costa", data: "2026-03-30" },
  { id: "SG-004", titulo: "Reparo porta - Almoxarifado", tipo: "Manutenção", prioridade: "alta", status: "pendente", local: "Edifício C", solicitante: "Carlos Lima", data: "2026-03-29" },
];

const mockHistorico = [
  { mes: "Jan", solicitacoes: 45, resolvidas: 42 },
  { mes: "Fev", solicitacoes: 52, resolvidas: 48 },
  { mes: "Mar", solicitacoes: 38, resolvidas: 36 },
  { mes: "Abr", solicitacoes: 31, resolvidas: 28 },
];

export default function ServicosGeraisPage() {
  const [activeTab, setActiveTab] = useState<'solicitacoes' | 'agenda' | 'relatorios'>('solicitacoes');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Wrench className="text-amber-500" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Serviços Gerais</h1>
              <p className="text-muted-foreground">Gestão de manutenção, facilities e suprimentos</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
            <Plus size={18} />
            Nova Solicitação
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 text-amber-500">
                <ClipboardList size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Solicitações</p>
                <h4 className="text-2xl font-black">156</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 text-rose-500">
                <AlertTriangle size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pendentes</p>
                <h4 className="text-2xl font-black">12</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 text-emerald-500">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Concluídas (Mês)</p>
                <h4 className="text-2xl font-black">89</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 text-blue-500">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tempo Médio</p>
                <h4 className="text-2xl font-black">2.3 dias</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('solicitacoes')}
          className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'solicitacoes' ? "border-amber-500 text-amber-600" : "border-transparent text-slate-500"
          }`}
        >
          <Wrench size={18} className="inline mr-2" />
          Solicitações
        </button>
        <button
          onClick={() => setActiveTab('agenda')}
          className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'agenda' ? "border-amber-500 text-amber-600" : "border-transparent text-slate-500"
          }`}
        >
          <Truck size={18} className="inline mr-2" />
          Agenda Serviços
        </button>
        <button
          onClick={() => setActiveTab('relatorios')}
          className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'relatorios' ? "border-amber-500 text-amber-600" : "border-transparent text-slate-500"
          }`}
        >
          <Package size={18} className="inline mr-2" />
          Relatórios
        </button>
      </div>

      {activeTab === 'solicitacoes' && (
        <Card>
          <CardHeader className="pb-3 px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Buscar solicitações..." 
                  className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-md text-sm font-medium hover:bg-slate-50">
                  <Filter size={16} />
                  Filtros
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 border-y border-slate-200">
                  <tr className="text-muted-foreground font-medium">
                    <th className="py-3 px-6">Solicitação</th>
                    <th className="py-3 px-6">Tipo</th>
                    <th className="py-3 px-6">Prioridade</th>
                    <th className="py-3 px-6">Local</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Solicitante</th>
                    <th className="py-3 px-6">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSolicitacoes.map((sol) => (
                    <tr key={sol.id} className="border-b hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-slate-900">{sol.titulo}</p>
                          <p className="text-xs text-muted-foreground">{sol.id}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded flex items-center gap-1 w-fit">
                          <Wrench size={12} />
                          {sol.tipo}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs rounded font-medium ${
                          sol.prioridade === 'alta' ? "bg-rose-100 text-rose-700" :
                          sol.prioridade === 'media' ? "bg-amber-100 text-amber-700" :
                          "bg-slate-100 text-slate-600"
                        }`}>
                          {sol.prioridade}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-slate-600">
                          <MapPin size={14} />
                          {sol.local}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={sol.status as any} />
                      </td>
                      <td className="py-4 px-6 text-slate-600">{sol.solicitante}</td>
                      <td className="py-4 px-6 text-slate-500 text-xs">{sol.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'agenda' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { dia: "Segunda", data: "07/04", servico: "Manutenção ar-condicionado", local: "Salas 201-205", status: "agendado" },
            { dia: "Terça", data: "08/04", servico: "Limpeza geral", local: "Auditório", status: "agendado" },
            { dia: "Quarta", data: "09/04", servico: "Troca de filtros", local: "Sistema HVAC", status: "pendente" },
            { dia: "Quinta", data: "10/04", servico: "Revisão elétrica", local: "Estacionamento", status: "agendado" },
            { dia: "Sexta", data: "11/04", servico: "Manutenção elevador", local: "Bloco B", status: "agendado" },
          ].map((item, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <HardHat className="text-amber-600" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{item.dia}</p>
                      <p className="text-sm text-muted-foreground">{item.data}</p>
                    </div>
                  </div>
                  <StatusBadge status={item.status as any} />
                </div>
                <h4 className="font-medium text-slate-800 mb-2">{item.servico}</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={14} />
                  {item.local}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'relatorios' && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <h3 className="font-bold text-lg">Tipo de Serviço</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { tipo: "Manutenção Predial", quantidade: 78 },
                { tipo: "Limpeza", quantidade: 45 },
                { tipo: "Elétrica", quantidade: 23 },
                { tipo: "Hidrática", quantidade: 18 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{item.tipo}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(item.quantidade / 78) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold">{item.quantidade}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <h3 className="font-bold text-lg">Evolução de Solicitações</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHistorico.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">{item.mes}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-500">{item.solicitacoes} solicitadas</span>
                      <span className="text-sm text-emerald-600">{item.resolvidas} resolvidas</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}