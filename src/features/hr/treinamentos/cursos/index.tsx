import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Search, Filter, Plus, Edit, BookOpen, Users, Library } from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { mockCursos } from "@/infrastructure/mock/mockTreinamentos";
import { SideDrawer } from "@/shared/ui/SideDrawer";

const CATEGORIAS_EXTRA = ["Data Science & Analytics", "Saúde e Segurança do Trabalho"] as const;

export default function CursosPage() {
  const [showNewCurso, setShowNewCurso] = useState(false);
  const [detailCurso, setDetailCurso] = useState<(typeof mockCursos)[number] | null>(null);
  const [categoria, setCategoria] = useState<string>("Todas");
  const [busca, setBusca] = useState("");

  const opcoesCategoria = useMemo(() => {
    const fromData = [...new Set(mockCursos.map((c) => c.categoria))];
    return ["Todas", ...fromData, ...CATEGORIAS_EXTRA];
  }, []);

  const cursosFiltrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return mockCursos.filter((c) => {
      const okCat = categoria === "Todas" || c.categoria === categoria;
      const okQ =
        !q ||
        c.nome.toLowerCase().includes(q) ||
        c.categoria.toLowerCase().includes(q) ||
        c.responsavel.toLowerCase().includes(q);
      return okCat && okQ;
    });
  }, [busca, categoria]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogo de Cursos</h1>
          <p className="text-muted-foreground mt-1">Gestão centralizada de treinamentos internos e capacitações.</p>
        </div>
        <button
          onClick={() => setShowNewCurso(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-radius-m font-medium hover:bg-primary/90 transition-colors "
        >
          <Plus size={18} />
          Novo Curso
        </button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-bold">Cursos Disponíveis</CardTitle>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
            <label className="sr-only" htmlFor="filtro-categoria-cursos">
              Categoria
            </label>
            <select
              id="filtro-categoria-cursos"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="h-9 px-3 rounded-radius-s border border-input bg-background text-sm font-medium min-w-[200px] focus:outline-none focus:ring-1 focus:ring-primary/50"
            >
              {opcoesCategoria.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "Todas" ? "Todas as categorias" : cat}
                </option>
              ))}
            </select>
            <div className="relative flex-1 min-w-[12rem] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Pesquisar curso..."
                className="w-full pl-9 h-9 text-sm rounded-radius-s border border-input focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
            <button
              type="button"
              className="h-9 px-3 border rounded-radius-s text-sm font-medium hover:bg-[#0f172a] flex items-center gap-2 shrink-0"
            >
              <Filter size={14} />
              Filtros
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {cursosFiltrados.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={<Library className="h-8 w-8" strokeWidth={1.25} />}
                title="Nenhum curso nesta categoria"
                description={
                  categoria !== "Todas"
                    ? "Monte uma nova trilha ou cadastre cursos para esta linha. Novos conteúdos institucionais também podem ser publicados aqui em breve."
                    : "Ajuste a busca ou cadastre um novo curso para ampliar o catálogo do DHO."
                }
                actionLabel={categoria !== "Todas" ? "Criar curso nesta categoria" : "Novo Curso"}
                onAction={() => setShowNewCurso(true)}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#0f172a] border-b">
                  <tr className="text-muted-foreground font-medium text-[11px] uppercase tracking-wider">
                    <th className="py-4 px-6">Nome do Curso</th>
                    <th className="py-4 px-6">Categoria</th>
                    <th className="py-4 px-6 text-center">Duração</th>
                    <th className="py-4 px-6 text-center">Formato</th>
                    <th className="py-4 px-6 text-center">Obrigatório</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {cursosFiltrados.map((curso) => (
                    <tr key={curso.id} className="border-b hover:bg-zinc-800/20 transition-colors group">
                      <td className="py-4 px-6">
                        <button
                          type="button"
                          onClick={() => setDetailCurso(curso)}
                          className="flex flex-col text-left rounded-radius-s -m-1 p-1 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                          <span className="font-bold text-[#e7e5e4]">{curso.nome}</span>
                          <span className="text-[10px] text-zinc-500">Resp: {curso.responsavel} · clique para detalhes</span>
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-radius-s bg-zinc-800 text-zinc-400 border">
                          {curso.categoria}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center font-mono text-zinc-400 font-medium">{curso.duracao}</td>
                      <td className="py-4 px-6 text-center text-zinc-400">{curso.formato}</td>
                      <td className="py-4 px-6 text-center">
                        {curso.obrigatorio ? (
                          <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2 py-1 rounded-radius-s">
                            Sim
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-zinc-500">Não</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <StatusBadge status={curso.status as any} />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            className="p-2 hover:bg-zinc-700 rounded-radius-m text-zinc-400 transition-colors"
                            title="Associar a Trilha"
                          >
                            <BookOpen size={16} />
                          </button>
                          <button
                            type="button"
                            className="p-2 hover:bg-zinc-700 rounded-radius-m text-zinc-400 transition-colors"
                            title="Visualizar Participantes"
                          >
                            <Users size={16} />
                          </button>
                          <button
                            type="button"
                            className="p-2 hover:bg-zinc-700 rounded-radius-m text-zinc-400 transition-colors"
                            title="Editar Curso"
                          >
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <SideDrawer
        open={!!detailCurso}
        onClose={() => setDetailCurso(null)}
        title={detailCurso?.nome ?? "Curso"}
        subtitle={detailCurso ? `${detailCurso.id} · ${detailCurso.categoria} · ${detailCurso.duracao}` : undefined}
        overlay="subtle"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDetailCurso(null)}
              className="px-5 py-2.5 rounded-radius-m font-semibold text-sm border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-[#334155] dark:bg-[#1e293b] dark:text-[#e7e5e4] dark:hover:bg-zinc-800 transition-colors"
            >
              Fechar
            </button>
          </div>
        }
      >
        {detailCurso ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Descrição</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{detailCurso.descricao}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Aulas / módulos</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                {detailCurso.aulas.map((a, i) => (
                  <li key={i} className="pl-1">
                    {a}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : null}
      </SideDrawer>

      <SideDrawer
        open={showNewCurso}
        onClose={() => setShowNewCurso(false)}
        title="Criar novo curso"
        subtitle="Preencha os dados básicos do treinamento."
        overlay="subtle"
        footer={
          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowNewCurso(false)}
              className="px-6 py-2.5 border rounded-radius-m font-bold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => setShowNewCurso(false)}
              className="px-6 py-2.5 bg-primary text-white rounded-radius-m font-bold text-sm hover:bg-primary/90 transition-all  "
            >
              Salvar curso
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-3">
              Informações gerais
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nome do Curso" placeholder="Ex: Comunicação Não Violenta" />
              <SelectField label="Categoria" options={["Soft Skills", "Técnico", "Compliance", "Institucional"]} />
              <div className="sm:col-span-2">
                <TextAreaField label="Descrição" placeholder="Objetivos e conteúdo abordado no curso..." />
              </div>
              <Field label="Responsável" placeholder="Ex: RH / Instrutor" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-3">Configurações</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Duração (Carga Horária)" placeholder="Ex: 8h" />
              <SelectField label="Formato" options={["Online", "Presencial", "Híbrido"]} />
              <SelectField label="Obrigatoriedade" options={["Opcional", "Obrigatório"]} />
            </div>
          </div>
        </div>
      </SideDrawer>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-zinc-500 uppercase">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-10 px-3 rounded-radius-m border border-[#334155] text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white dark:bg-[#1e293b]"
      />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-zinc-500 uppercase">{label}</label>
      <select className="w-full h-10 px-3 rounded-radius-m border border-[#334155] text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-[#1e293b] appearance-none cursor-pointer">
        {options.map((opt) => (
          <option key={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-zinc-500 uppercase">{label}</label>
      <textarea
        placeholder={placeholder}
        className="w-full min-h-[5rem] p-3 rounded-radius-m border border-[#334155] text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none bg-white dark:bg-[#1e293b]"
      />
    </div>
  );
}
