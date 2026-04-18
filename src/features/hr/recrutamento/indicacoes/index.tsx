import { useMemo, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Search, Filter, Share2, Award, UserCheck, TrendingUp, Users } from "lucide-react";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { mockIndicacoes } from "@/infrastructure/mock/mockRecrutamento";
import { useAuth } from "@/features/auth/AuthContext";

export default function IndicacoesPage() {
  const { usuario } = useAuth();
  const novaIndicacaoRef = useRef<HTMLButtonElement>(null);

  const minhasIndicacoes = useMemo(
    () => mockIndicacoes.filter((i) => i.quemIndicou === usuario.nome),
    [usuario.nome]
  );

  const abrirNovaIndicacao = () => {
    novaIndicacaoRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Indicações Internas</h1>
          <p className="text-muted-foreground mt-1">Gerencie e recompense talentos indicados pelo seu próprio time.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            ref={novaIndicacaoRef}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-radius-m font-medium hover:bg-primary/90 transition-colors"
          >
            <Share2 size={18} />
            Nova Indicação
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Indicados" value="42" icon={Users} />
        <StatCard title="Contratações" value="8" icon={UserCheck} color="text-emerald-500" />
        <StatCard title="Taxa de Sucesso" value="19%" icon={TrendingUp} color="text-blue-500" />
      </div>

      <Card>
        <CardHeader className="pb-3 px-6">
          <div className="flex flex-col gap-1 mb-3">
            <h2 className="text-base font-semibold tracking-tight text-[#e7e5e4]">Minhas indicações</h2>
            <p className="text-xs text-muted-foreground">
              Lista apenas candidatos que você indicou. Gestores veem o quadro completo em relatórios consolidados.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por candidato ou colaborador..."
                className="w-full pl-10 h-10 rounded-radius-s border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-3 border border-input rounded-radius-s text-sm font-medium hover:bg-[#0f172a] transition-colors">
                <Filter size={16} />
                Filtrar
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {minhasIndicacoes.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={<Share2 className="h-8 w-8" strokeWidth={1.25} />}
                title="Você ainda não possui indicações"
                description="Indique talentos da sua rede e acompanhe o status por aqui. Sua primeira indicação pode abrir uma nova vaga para o time."
                actionLabel="Fazer minha primeira indicação"
                onAction={abrirNovaIndicacao}
                actionIcon={<Share2 size={15} className="shrink-0 opacity-90" />}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#0f172a] border-y border-[#334155]">
                  <tr className="text-muted-foreground font-medium">
                    <th className="py-3 px-6">Candidato</th>
                    <th className="py-3 px-6">Vaga Indicada</th>
                    <th className="py-3 px-6">Colaborador (Autor)</th>
                    <th className="py-3 px-6">Setor</th>
                    <th className="py-3 px-6">Data</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-center">Bonificação</th>
                  </tr>
                </thead>
                <tbody>
                  {minhasIndicacoes.map((ind) => (
                    <tr key={ind.id} className="border-b transition-colors hover:bg-zinc-800/20">
                      <td className="py-4 px-6 font-bold text-[#e7e5e4]">{ind.candidato}</td>
                      <td className="py-4 px-6 font-medium text-primary">{ind.cargo}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] font-bold">
                            {ind.quemIndicou.charAt(0)}
                          </div>
                          <span>{ind.quemIndicou}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-zinc-400">{ind.setor}</td>
                      <td className="py-4 px-6 text-zinc-500">{ind.data}</td>
                      <td className="py-4 px-6">
                        <StatusBadge status={ind.status as any} />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1 text-amber-600 font-bold">
                          <Award size={14} />
                          <span className="text-xs">Pendente</span>
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
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
          </div>
          <div className={`p-3 bg-zinc-800 rounded-radius-m ${color || "text-zinc-400"}`}>
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
