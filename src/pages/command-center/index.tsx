import { KpiCard } from "../../components/dashboard/KpiCard";
import { VagasPorSetorChart } from "../../components/charts/VagasPorSetorChart";
import { ContratacoesChart } from "../../components/charts/ContratacoesChart";
import { RecruitmentFunnel } from "../../components/charts/RecruitmentFunnel";
import { CandidateMatchTable } from "../../components/tables/CandidateMatchTable";
import { AlertPanel } from "../../components/alerts/AlertPanel";

import { mockKpis } from "../../data/mock/mockKpis";
import { mockVagasPorSetor, mockHiringTrend } from "../../data/mock/mockVagas";
import { mockFunnelData } from "../../data/mock/mockFunil";
import { mockCandidates } from "../../data/mock/mockCandidatos";
import { mockAlerts } from "../../data/mock/mockAlertas";

import { motion } from "framer-motion";
import { useToast } from "@/components/ui/Toast";
import { AlertCircle, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function HRCommandCenter() {
  const { info, success } = useToast();
  return (
    <div className="space-y-8">
      {/* Header Section */}


      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">RH Command Center</h1>
        <p className="text-muted-foreground">Painel estratégico de recrutamento e indicadores de headcount.</p>
      </div>

      {/* KPI Section */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {mockKpis.map((kpi, index) => (
          <KpiCard key={index} {...kpi} delay={index * 0.1} />
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <VagasPorSetorChart data={mockVagasPorSetor} />
        <ContratacoesChart data={mockHiringTrend} />
      </div>

      {/* Mid Section: Funnel and Alertas */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecruitmentFunnel data={mockFunnelData} />
        </div>
        <div className="lg:col-span-1">
          <AlertPanel alerts={mockAlerts} />
        </div>
      </div>

      {/* Bottom Section: Candidate Table */}
      <div className="w-full overflow-hidden">
        <CandidateMatchTable candidates={mockCandidates} />
      </div>


      {/* Strategic Insights Section */}
      <h3 className="text-xl font-bold tracking-tight mt-10 mb-4">Insights Estratégicos</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-6 bg-rose-50 border border-rose-100/50 rounded-2xl flex items-start gap-4 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 -mt-6 -mr-6 bg-rose-100 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
          <div className="p-3 bg-white text-rose-500 rounded-xl shadow-sm z-10 shrink-0">
            <AlertCircle size={24} />
          </div>
          <div className="z-10">
            <h4 className="font-bold text-rose-900 text-lg">Alerta de Turnover</h4>
            <p className="text-rose-700/80 text-sm mt-1 leading-relaxed text-balance">
              Identificamos um aumento de 2.5% no turnover do setor de <strong>Tecnologia</strong> nos últimos 30 dias. O motivo principal reportado foi "Incompatibilidade Cultural".
            </p>
            <button 
              onClick={() => info("Redirecionando", "Análise detalhada de offboarding gerada.")}
              className="mt-4 px-4 py-2 bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
            >
              Verificar Análise Detalhada
              <ArrowUpRight size={16} />
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-start gap-4 relative overflow-hidden group text-white"
        >
          <div className="absolute top-0 right-0 p-8 -mt-6 -mr-6 bg-primary/20 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
          <div className="p-3 bg-primary/20 text-primary rounded-xl shrink-0 z-10">
            <CheckCircle2 size={24} />
          </div>
          <div className="z-10">
            <h4 className="font-bold text-lg">Pipeline Otimizado</h4>
            <p className="text-slate-400 text-sm mt-1 leading-relaxed text-balance">
              A triagem de IA identificou 12 novos candidatos de alta performance para a vaga de <strong>Senior Frontend</strong>. O SLA de contratação está 15% mais rápido este mês.
            </p>
            <button 
              onClick={() => success("Triagem Iniciada", "Convites automáticos para entrevista enviados com sucesso.")}
              className="mt-4 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
            >
              Aprovar Convites Automatically
              <ArrowUpRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


