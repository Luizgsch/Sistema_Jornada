import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import {
  Shirt,
  Package,
  RefreshCw,
  CheckCircle,
  Search,
  Filter,
  PackageCheck,
  Truck,
  Edit,
  ClipboardList,
} from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { mockOperacoesColaboradores, mockUniformeStats } from "@/infrastructure/mock/mockOperacoes";
import { Button } from "@/shared/ui/Button";
import { useToast } from "@/shared/ui/Toast";
import { delay } from "@/shared/lib/delay";

type ColaboradorRow = (typeof mockOperacoesColaboradores)[number];

type PeriodoEntrega = "2026-04" | "2026-05";

const MOCK_ENTREGAS_UNIFORME: {
  id: string;
  periodo: PeriodoEntrega;
  data: string;
  colaborador: string;
  matricula: string;
  itens: string;
}[] = [
  {
    id: "E-1",
    periodo: "2026-04",
    data: "2026-04-02",
    colaborador: "Alice Ferreira",
    matricula: "MAT-101",
    itens: "Camisa P, Calça 38",
  },
  {
    id: "E-2",
    periodo: "2026-04",
    data: "2026-04-08",
    colaborador: "Carla Duarte",
    matricula: "MAT-103",
    itens: "Camisa M, Calçado 37",
  },
];

export default function UniformesPage() {
  const { success, error } = useToast();
  const [periodoEntregas, setPeriodoEntregas] = useState<PeriodoEntrega>("2026-05");
  const [colabList, setColabList] = useState<ColaboradorRow[]>(() =>
    mockOperacoesColaboradores.map((c) => ({
      ...c,
      uniforme: { ...c.uniforme },
    }))
  );
  const [submittingMatricula, setSubmittingMatricula] = useState<string | null>(null);

  const stats = {
    entregues: colabList.filter((c) => c.uniforme.status === "entregue").length,
    pendentes: colabList.filter((c) => c.uniforme.status === "pendente").length,
    reposicoes: mockUniformeStats.reposicoes,
  };

  const entregasNoPeriodo = useMemo(
    () => MOCK_ENTREGAS_UNIFORME.filter((e) => e.periodo === periodoEntregas),
    [periodoEntregas]
  );

  const irParaGradeRegistrar = () => {
    document.getElementById("uniformes-grade")?.scrollIntoView({ behavior: "smooth", block: "start" });
    success("Grade de uniformes", "Use o botão «Registrar Entrega» na linha do colaborador com status pendente.");
  };

  const registrarEntrega = async (matricula: string, nome: string) => {
    setSubmittingMatricula(matricula);
    try {
      await delay(950);
      setColabList((prev) =>
        prev.map((c) =>
          c.matricula === matricula
            ? { ...c, uniforme: { ...c.uniforme, status: "entregue" as const } }
            : c
        )
      );
      success("Entrega registrada", `Uniforme de ${nome} foi marcado como entregue.`);
    } catch {
      error("Falha ao registrar", "Não foi possível concluir o registro. Tente novamente.");
    } finally {
      setSubmittingMatricula(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Logística de Uniformes</h1>
        <p className="text-muted-foreground mt-1">Gestão de tamanhos, entregas e reposições periódicas.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <UniformStatCard title="Entregues" value={stats.entregues} icon={PackageCheck} color="text-emerald-500" />
        <UniformStatCard title="Pendentes" value={stats.pendentes} icon={Truck} color="text-amber-500" />
        <UniformStatCard title="Reposições" value={stats.reposicoes} icon={RefreshCw} color="text-primary" />
      </div>

      <div id="uniformes-grade">
      <Card>
        <CardHeader className="pb-3 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-bold">Grade de Uniformes por Colaborador</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Nome ou matrícula..."
                className="w-full pl-9 h-9 text-sm rounded-radius-s border border-input focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button variant="outline" size="md" className="h-9">
              <Filter size={14} />
              Filtrar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#0f172a] border-b">
                <tr className="text-muted-foreground font-medium text-[10px] uppercase tracking-wider">
                  <th className="py-4 px-6">Colaborador</th>
                  <th className="py-4 px-6 text-center">Camisa</th>
                  <th className="py-4 px-6 text-center">Calça</th>
                  <th className="py-4 px-6 text-center">Calçado</th>
                  <th className="py-4 px-6 text-center">Status Entrega</th>
                  <th className="py-4 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {colabList.map((colab) => {
                  const pendente = colab.uniforme.status === "pendente";
                  return (
                    <tr key={colab.matricula} className="border-b hover:bg-zinc-800/20 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-radius-m bg-zinc-800 flex items-center justify-center text-zinc-600">
                            <Shirt size={16} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-[#e7e5e4]">{colab.nome}</span>
                            <span className="text-[10px] text-zinc-500">{colab.setor}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-zinc-300">{colab.uniforme.camisa}</td>
                      <td className="py-4 px-6 text-center font-bold text-zinc-300">{colab.uniforme.calca}</td>
                      <td className="py-4 px-6 text-center font-bold text-zinc-300">{colab.uniforme.calcado}</td>
                      <td className="py-4 px-6 text-center">
                        <StatusBadge status={colab.uniforme.status} />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            className="p-2 hover:bg-zinc-800 rounded-radius-m text-zinc-600 transition-colors"
                            title="Editar Tamanhos"
                          >
                            <Edit size={16} />
                          </button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs font-bold"
                            isLoading={submittingMatricula === colab.matricula}
                            disabled={!pendente}
                            onClick={() => registrarEntrega(colab.matricula, colab.nome)}
                          >
                            {pendente ? "Registrar Entrega" : "Entregue"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-zinc-500" />
              Entregas registradas
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Histórico consolidado por período (demonstração com dados mockados).
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="periodo-entregas" className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              Período
            </label>
            <select
              id="periodo-entregas"
              value={periodoEntregas}
              onChange={(e) => setPeriodoEntregas(e.target.value as PeriodoEntrega)}
              className="h-9 px-3 rounded-radius-s border border-input bg-background text-sm font-medium min-w-[11rem] focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="2026-04">Abril/2026</option>
              <option value="2026-05">Maio/2026</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {entregasNoPeriodo.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={<Truck className="h-8 w-8" strokeWidth={1.25} />}
                title="Nenhuma movimentação no período"
                description="Não há registros de entrega de uniforme para o período selecionado. Você pode registrar uma nova entrega a partir da grade de colaboradores."
                actionLabel="Registrar Nova Entrega"
                onAction={irParaGradeRegistrar}
                actionIcon={<PackageCheck size={15} className="shrink-0 opacity-90" />}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#0f172a] border-b">
                  <tr className="text-muted-foreground font-medium text-[10px] uppercase tracking-wider">
                    <th className="py-4 px-6">Data</th>
                    <th className="py-4 px-6">Colaborador</th>
                    <th className="py-4 px-6">Matrícula</th>
                    <th className="py-4 px-6">Itens</th>
                  </tr>
                </thead>
                <tbody>
                  {entregasNoPeriodo.map((row) => (
                    <tr key={row.id} className="border-b hover:bg-zinc-800/20 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-zinc-500">{row.data}</td>
                      <td className="py-4 px-6 font-semibold text-[#e7e5e4]">{row.colaborador}</td>
                      <td className="py-4 px-6 text-zinc-500 text-xs">{row.matricula}</td>
                      <td className="py-4 px-6 text-zinc-400">{row.itens}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-dashed border-2 bg-[#0f172a] hover:bg-zinc-800/30 transition-colors cursor-pointer">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Package size={24} />
            </div>
            <h4 className="font-bold">Configurar Grade de Tamanhos</h4>
            <p className="text-sm text-muted-foreground mt-1 max-w-[280px]">
              Defina os tamanhos padrão disponíveis para a empresa e as regras de reposição automática.
            </p>
          </CardContent>
        </Card>
        <Card className="border-dashed border-2 bg-[#0f172a] hover:bg-zinc-800/30 transition-colors cursor-pointer">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle size={24} />
            </div>
            <h4 className="font-bold">Relatório de Conformidade</h4>
            <p className="text-sm text-muted-foreground mt-1 max-w-[280px]">
              Gere um PDF com as assinaturas digitais de recebimento e termos de responsabilidade.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UniformStatCard({ title, value, icon: Icon, color }: { title: string; value: number; icon: typeof Package; color: string }) {
  return (
    <Card className="border-none h-full">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-radius-m bg-[#0f172a] ${color}`}>
            <Icon size={20} />
          </div>
          <span className="text-xs font-bold text-zinc-600">Total</span>
        </div>
        <div className="mt-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
          <span className="text-2xl font-bold text-[#e7e5e4]">{value} unidades</span>
        </div>
      </CardContent>
    </Card>
  );
}
