import { DashboardLayout } from "../../layouts/dashboard-layout/DashboardLayout";
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

export default function HRCommandCenter() {
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


      {/* Footer / Info Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-8 p-6 bg-slate-900 text-white rounded-xl flex items-center justify-between"
      >
        <div>
          <h4 className="font-bold text-lg">Pronto para escalar seu time?</h4>
          <p className="text-slate-400 text-sm">A triagem de IA identificou 12 novos candidatos de alta performance hoje.</p>
        </div>
        <button className="px-6 py-2 bg-primary hover:bg-primary/90 rounded-lg font-bold transition-colors">
          Iniciar Nova Triagem
        </button>
      </motion.div>
    </div>
  );
}

