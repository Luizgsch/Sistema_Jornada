import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Briefcase, Users, CheckCircle, Clock, BarChart3 } from "lucide-react";
import {
  mockRecrutamentoMetrics,
  mockRecrutamentoVagas,
} from "@/infrastructure/mock/mockRecrutamento";
import { StatusBadge } from "@/shared/ui/StatusBadge";

export default function RecrutamentoDashboard() {

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter text-[#e7e5e4]">Dashboard de Recrutamento</h1>
        <p className="text-zinc-500 dark:text-slate-400 mt-2 leading-relaxed text-sm">Visão estratégica do pipeline de seleção e abertura de vagas.</p>
      </div>

      <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
        <MetricCard title="Vagas Abertas" value={mockRecrutamentoMetrics.vagasAbertas} icon={Briefcase} trend="+2 este mês" />
        <MetricCard title="Em Processo" value={mockRecrutamentoMetrics.vagasEmProcesso} icon={Clock} />
        <MetricCard title="Fechadas (Mês)" value={mockRecrutamentoMetrics.vagasFechadasMes} icon={CheckCircle} accent="emerald" />
        <MetricCard title="Candidatos Triagem" value={mockRecrutamentoMetrics.candidatosTriagem} icon={Users} accent="blue" />
        <MetricCard title="Tempo Médio" value={mockRecrutamentoMetrics.tempoMedioContratacao} icon={BarChart3} accent="amber" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Vagas Abertas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0f172a] text-slate-500 dark:text-slate-300 text-xs font-semibold uppercase tracking-widest">
                <tr>
                  <th className="py-4 px-6 border-b border-[#334155]">Cargo</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Setor</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Gestor</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Abertura</th>
                  <th className="py-4 px-6 border-b border-[#334155]">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockRecrutamentoVagas.map((vaga) => (
                  <tr key={vaga.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 border-b border-[#334155] font-semibold text-[#e7e5e4]">{vaga.cargo}</td>
                    <td className="py-4 px-6 border-b border-[#334155] text-zinc-400">{vaga.setor}</td>
                    <td className="py-4 px-6 border-b border-[#334155] text-zinc-400">{vaga.gestor}</td>
                    <td className="py-4 px-6 border-b border-[#334155] text-xs text-zinc-600 font-mono">{vaga.dataAbertura}</td>
                    <td className="py-4 px-6 border-b border-[#334155]">
                      <StatusBadge status={vaga.status} />
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

const accentMap: Record<string, { icon: string; bg: string }> = {
  emerald: { icon: "text-emerald-400", bg: "bg-emerald-500/10" },
  blue: { icon: "text-blue-400", bg: "bg-blue-500/10" },
  amber: { icon: "text-amber-400", bg: "bg-amber-500/10" },
  slate: { icon: "text-zinc-400", bg: "bg-zinc-800" },
};

function MetricCard({ title, value, icon: Icon, trend, accent }: {
  title: string;
  value: string | number;
  icon: typeof Briefcase;
  trend?: string;
  accent?: string;
}) {
  const style = accent ? (accentMap[accent] ?? accentMap.slate) : accentMap.slate;
  return (
    <div className="bg-[#1e293b] rounded-radius-l border border-[#334155] hover:border-zinc-600 p-6 sm:p-8 flex flex-col gap-4 transition-colors md:flex-row md:items-center md:justify-between md:gap-6">
      <div className="flex min-w-0 flex-1 items-start gap-4 md:items-center">
        <div className={`p-2 rounded-radius-m shrink-0 ${style.bg}`}>
          <Icon className={`w-4 h-4 ${style.icon}`} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">{title}</p>
          <span className="text-3xl font-bold text-[#e7e5e4] leading-none tracking-tighter">{value}</span>
        </div>
      </div>
      {trend && (
        <span className="inline-flex w-fit shrink-0 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-radius-m border border-emerald-500/20 md:self-center">
          {trend}
        </span>
      )}
    </div>
  );
}

