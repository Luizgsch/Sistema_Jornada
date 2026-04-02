import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { FileText, FolderOpen, CheckCircle, Clock, Search, Filter, Plus, Upload, Download, Eye, Edit, Building2, Users, Calendar, Shield } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

const mockDocumentos = [
  { id: "DOC-001", nome: "Contrato de Prestação de Serviços - Alpha Corp", tipo: "Contrato", categoria: "Jurídico", status: "pendente", responsavel: "Maria Silva", dataUpload: "2026-04-01", tamanho: "2.4 MB" },
  { id: "DOC-002", nome: "Política de Vacações 2026", tipo: "Política", categoria: "RH", status: "aprovado", responsável: "João Santos", dataUpload: "2026-03-28", tamanho: "1.1 MB" },
  { id: "DOC-003", nome: "Aditivo Contractual - Beta LTDA", tipo: "Aditivo", categoria: "Jurídico", status: "em-revisao", responsavel: "Ana Costa", dataUpload: "2026-03-25", tamanho: "856 KB" },
  { id: "DOC-004", nome: "Regulamento Interno", tipo: "Regulamento", categoria: "Geral", status: "aprovado", responsavel: "Carlos Lima", dataUpload: "2026-03-20", tamanho: "3.2 MB" },
];

const mockWorkflows = [
  { id: "WF-001", titulo: "Aprovação de Contrato - Alpha Corp", etapa: "Aprovação Gestor", progress: 60, responsavel: "João Santos", prazo: "2026-04-05" },
  { id: "WF-002", titulo: "Renovação de Licença", etapa: "Análise Legal", progress: 40, responsavel: "Ana Costa", prazo: "2026-04-10" },
  { id: "WF-003", titulo: "Nova política de remote work", etapa: "Revisão RH", progress: 80, responsavel: "Maria Silva", prazo: "2026-04-03" },
];

export default function DHOPage() {
  const [activeTab, setActiveTab] = useState<'documentos' | 'workflows' | 'modelos'>('documentos');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Building2 className="text-blue-500" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">DHO - Gestão Documental</h1>
              <p className="text-muted-foreground">Central de documentos, workflows e approvals</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Upload size={18} />
            Importar
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
            <Plus size={18} />
            Novo Documento
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 text-blue-500">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Documentos</p>
                <h4 className="text-2xl font-black">1.247</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 text-amber-500">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pendentes</p>
                <h4 className="text-2xl font-black">23</h4>
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
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aprovados</p>
                <h4 className="text-2xl font-black">892</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 text-purple-500">
                <FolderOpen size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pastas</p>
                <h4 className="text-2xl font-black">156</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('documentos')}
          className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'documentos' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500"
          }`}
        >
          <FileText size={18} className="inline mr-2" />
          Documentos
        </button>
        <button
          onClick={() => setActiveTab('workflows')}
          className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'workflows' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500"
          }`}
        >
          <Calendar size={18} className="inline mr-2" />
          Workflows
        </button>
        <button
          onClick={() => setActiveTab('modelos')}
          className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'modelos' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500"
          }`}
        >
          <Shield size={18} className="inline mr-2" />
          Modelos
        </button>
      </div>

      {activeTab === 'documentos' && (
        <Card>
          <CardHeader className="pb-3 px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Buscar documentos..." 
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
                    <th className="py-3 px-6">Nome</th>
                    <th className="py-3 px-6">Tipo</th>
                    <th className="py-3 px-6">Categoria</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Responsável</th>
                    <th className="py-3 px-6">Data</th>
                    <th className="py-3 px-6 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDocumentos.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText size={14} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{doc.nome}</p>
                            <p className="text-xs text-muted-foreground">{doc.tamanho}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600">{doc.tipo}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">{doc.categoria}</span>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={doc.status as any} />
                      </td>
                      <td className="py-4 px-6 text-slate-600">{doc.responsavel}</td>
                      <td className="py-4 px-6 text-slate-500 text-xs">{doc.dataUpload}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400" title="Visualizar">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400" title="Editar">
                            <Edit size={16} />
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
      )}

      {activeTab === 'workflows' && (
        <div className="grid gap-4">
          {mockWorkflows.map((workflow) => (
            <Card key={workflow.id} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Calendar className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{workflow.titulo}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {workflow.responsavel}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          Prazo: {workflow.prazo}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Progresso</p>
                      <p className="font-bold text-blue-600">{workflow.progress}%</p>
                    </div>
                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${workflow.progress}%` }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'modelos' && (
        <div className="grid gap-4 md:grid-cols-3">
          {['Contrato de Prestação', 'Acordo de Confidencialidade', 'Termo de Admissão', 'Carta de Offer', 'Política de Férias', 'Regulamento'].map((nome, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Shield className="text-purple-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{nome}</h4>
                  <p className="text-xs text-muted-foreground mt-1">Clique para usar como base</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}