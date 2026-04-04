import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Search, Upload, FileText, CheckCircle, XCircle, Brain, Zap, Eye, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockCurriculos = [
  {
    id: "cur-1",
    nome: "Marcos Vinícius Santos",
    email: "marcos.santos@email.com",
    telefone: "(11) 99876-5432",
    cargo: "Desenvolvedor Backend",
    vaga: "Dev Backend Senior",
    vagaId: "VAG-001",
    score: 92,
    status: " Match",
    uploadedAt: "2026-04-01 14:30",
    competenciasEncontradas: ["Python", "Django", "PostgreSQL", "AWS", "Docker", "Git"],
    competenciasFaltantes: [],
    experiencia: "6 anos",
    formacao: "Ciência da Computação - USP",
  },
  {
    id: "cur-2",
    nome: "Juliana Costa Oliveira",
    email: "juliana.costa@email.com",
    telefone: "(21) 99765-4321",
    cargo: "Desenvolvedora Frontend",
    vaga: "Dev Backend Senior",
    vagaId: "VAG-001",
    score: 68,
    status: "Parcial",
    uploadedAt: "2026-04-01 15:45",
    competenciasEncontradas: ["JavaScript", "React", "CSS"],
    competenciasFaltantes: ["Python", "Django", "PostgreSQL", "AWS"],
    experiencia: "4 anos",
    formacao: "Sistemas de Informação - UFRJ",
  },
  {
    id: "cur-3",
    nome: "Roberto Alves Ferreira",
    email: "roberto.ferreira@email.com",
    telefone: "(31) 99654-3210",
    cargo: "Engenheiro de Software",
    vaga: "Dev Backend Senior",
    vagaId: "VAG-001",
    score: 45,
    status: "Baixa",
    uploadedAt: "2026-04-01 16:20",
    competenciasEncontradas: ["Java", "Spring"],
    competenciasFaltantes: ["Python", "Django", "PostgreSQL", "AWS", "Docker"],
    experiencia: "8 anos",
    formacao: "Engenharia de Software - PUC",
  },
  {
    id: "cur-4",
    nome: "Camila Rodrigues Lima",
    email: "camila.lima@email.com",
    telefone: "(41) 99543-2109",
    cargo: "Desenvolvedora Fullstack",
    vaga: "Dev Backend Senior",
    vagaId: "VAG-001",
    score: 88,
    status: "Alta",
    uploadedAt: "2026-04-02 09:15",
    competenciasEncontradas: ["Python", "Django", "PostgreSQL", "Git", "REST API"],
    competenciasFaltantes: ["AWS", "Docker"],
    experiencia: "5 anos",
    formacao: "Análise de Sistemas - UNICAMP",
  },
];

export default function TriagemIAPage() {
  const [selectedCurriculo, setSelectedCurriculo] = useState<any>(null);
  const [vagaSelecionada, setVagaSelecionada] = useState("VAG-001");
  const [showUpload, setShowUpload] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Triagem com Inteligência Artificial</h1>
          <p className="text-muted-foreground mt-1">
            Análise automática de currículos com matching de competências.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowUpload(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Upload size={18} />
            Enviar Currículos
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 text-primary">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Recebidos</p>
                <h4 className="text-2xl font-black">{mockCurriculos.length}</h4>
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
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alta Compatibilidade</p>
                <h4 className="text-2xl font-black">{mockCurriculos.filter(c => c.score >= 80).length}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 text-amber-500">
                <Brain size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Parciais</p>
                <h4 className="text-2xl font-black">{mockCurriculos.filter(c => c.score >= 60 && c.score < 80).length}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 text-rose-500">
                <XCircle size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Baixa Compatibilidade</p>
                <h4 className="text-2xl font-black">{mockCurriculos.filter(c => c.score < 60).length}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <div className="flex items-center gap-2 shrink-0">
          <Brain size={18} className="text-primary" />
          <span className="text-sm font-medium whitespace-nowrap">Analisando para:</span>
        </div>
        <select 
          value={vagaSelecionada}
          onChange={(e) => setVagaSelecionada(e.target.value)}
          className="h-10 px-4 rounded-lg border border-input bg-white font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-auto min-w-[200px]"
        >
          <option value="VAG-001">Dev Backend Senior - VAG-001</option>
          <option value="VAG-002">Analista de Dados Pleno - VAG-002</option>
          <option value="VAG-003">Gerente de Marketing - VAG-003</option>
        </select>
      </div>

      <Card>
        <CardHeader className="pb-3 px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar por nome ou cargo..." 
                className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-md text-sm font-medium hover:bg-slate-50">
                <Zap size={16} />
                Processar Todos
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
                  <th className="py-3 px-6">Candidato</th>
                  <th className="py-3 px-6">Currículo</th>
                  <th className="py-3 px-6">Vaga</th>
                  <th className="py-3 px-6 text-center">Score IA</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Enviado em</th>
                  <th className="py-3 px-6 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockCurriculos.map((curriculo) => (
                  <tr key={curriculo.id} className="border-b transition-colors hover:bg-slate-50/50 group">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{curriculo.nome}</span>
                        <span className="text-[11px] text-muted-foreground">{curriculo.experiencia} • {curriculo.formacao}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FileText size={14} className="text-slate-400" />
                        <span className="text-xs">{curriculo.cargo}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-primary">{curriculo.vagaId}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className={`w-12 h-2 rounded-full bg-slate-200 overflow-hidden`}>
                          <div 
                            className={`h-full ${getScoreBg(curriculo.score)}`} 
                            style={{ width: `${curriculo.score}%` }}
                          />
                        </div>
                        <span className={`font-bold text-sm ${getScoreColor(curriculo.score)}`}>
                          {curriculo.score}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        curriculo.score >= 80 
                          ? "bg-emerald-100 text-emerald-700"
                          : curriculo.score >= 60
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}>
                        {curriculo.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-muted-foreground">{curriculo.uploadedAt}</td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => setSelectedCurriculo(curriculo)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                        title="Ver Detalhes"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {selectedCurriculo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCurriculo(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {selectedCurriculo.nome.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedCurriculo.nome}</h2>
                    <p className="text-sm text-muted-foreground">{selectedCurriculo.cargo}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedCurriculo(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors self-end sm:self-auto">
                  <Upload className="rotate-45" size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Brain size={24} className="text-primary" />
                    <div>
                      <p className="text-sm font-bold text-slate-600">Score de Compatibilidade</p>
                      <p className="text-xs text-muted-foreground">Baseado em competências e requisitos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-3xl font-black ${getScoreColor(selectedCurriculo.score)}`}>
                      {selectedCurriculo.score}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-xl">
                    <h4 className="text-sm font-bold text-emerald-600 mb-3 flex items-center gap-2">
                      <CheckCircle size={16} />
                      Competências Encontradas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCurriculo.competenciasEncontradas.map((comp: string) => (
                        <span key={comp} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border rounded-xl">
                    <h4 className="text-sm font-bold text-rose-600 mb-3 flex items-center gap-2">
                      <XCircle size={16} />
                      Competências Faltantes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCurriculo.competenciasFaltantes.length > 0 ? (
                        selectedCurriculo.competenciasFaltantes.map((comp: string) => (
                          <span key={comp} className="px-2 py-1 bg-rose-100 text-rose-700 text-xs font-medium rounded">
                            {comp}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">Nenhuma competência crítica faltando</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl overflow-x-auto">
                  <h4 className="text-sm font-bold text-slate-700 mb-3">Informações do Candidato</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm min-w-[200px]">
                    <div>
                      <span className="text-muted-foreground">E-mail:</span>
                      <span className="ml-2 font-medium">{selectedCurriculo.email}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Telefone:</span>
                      <span className="ml-2 font-medium">{selectedCurriculo.telefone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Experiência:</span>
                      <span className="ml-2 font-medium">{selectedCurriculo.experiencia}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Formação:</span>
                      <span className="ml-2 font-medium">{selectedCurriculo.formacao}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedCurriculo(null)}
                  className="px-6 py-2 border rounded-xl font-bold hover:bg-white transition-colors"
                >
                  Fechar
                </button>
                <button className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  Avançar para Entrevista
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUpload && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpload(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b bg-slate-50">
                <h2 className="text-xl font-bold">Enviar Currículos</h2>
                <p className="text-sm text-muted-foreground">Selecione uma vaga para análise</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Vaga Target</label>
                  <select className="w-full mt-1 h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                    <option>Dev Backend Senior - VAG-001</option>
                    <option>Analista de Dados Pleno - VAG-002</option>
                  </select>
                </div>
                
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload size={40} className="mx-auto text-slate-400 mb-4" />
                  <p className="font-medium text-slate-700">Clique ou arraste arquivos aqui</p>
                  <p className="text-sm text-muted-foreground mt-1">PDF, DOC ou DOCX (max 5MB)</p>
                </div>

                <div className="text-sm text-muted-foreground bg-slate-50 p-3 rounded-lg">
                  <Brain size={14} className="inline mr-2" />
                  A IA analisará automaticamente competências, experiência e formação.
                </div>
              </div>

              <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
                <button 
                  onClick={() => setShowUpload(false)}
                  className="px-6 py-2 border rounded-xl font-bold hover:bg-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    alert('Upload simulado! A IA está processando os currículos...');
                    setShowUpload(false);
                  }}
                  className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all"
                >
                  Processar com IA
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}