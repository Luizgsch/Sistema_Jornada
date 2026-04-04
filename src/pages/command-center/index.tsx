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
import { usePageNav } from "@/context/PageNavContext";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Briefcase,
  Users,
  Sparkles,
  MessageCircle,
  UserPlus,
  PieChart,
  LayoutGrid,
  Clock,
  Shirt,
  ArrowRightLeft,
  UserMinus,
  FileText,
  FolderOpen,
  KeyRound,
  BarChart3,
  ArrowRight,
  Building2,
  Wrench,
  Inbox,
} from "lucide-react";

const atalhosPorBloco: {
  titulo: string;
  subtitulo?: string;
  itens: { label: string; hint: string; page: string; icon: typeof Briefcase }[];
}[] = [
  {
    titulo: "Recrutamento & seleção",
    subtitulo: "Substitui planilhas de vagas, auxiliares, triagem manual e WhatsApp descentralizado.",
    itens: [
      { label: "Vagas & SLA", hint: "Planilha de vagas", page: "vagas", icon: Briefcase },
      { label: "Pipeline & talentos", hint: "Funil e banco", page: "pipeline", icon: Users },
      { label: "Triagem com IA", hint: "Currículos em volume", page: "triagem-ia", icon: Sparkles },
      { label: "WhatsApp unificado", hint: "Bot e rastreio", page: "whatsapp", icon: MessageCircle },
      { label: "Indicações", hint: "Origem rastreável", page: "indicacoes", icon: UserPlus },
      { label: "Comunicação centralizada", hint: "Menos WhatsApps soltos", page: "comunicacao-interna", icon: Inbox },
    ],
  },
  {
    titulo: "Operações, headcount e quadros",
    subtitulo: "Headcount automático, quadro operacional, temporários, uniformes, movimentação e desligamentos.",
    itens: [
      { label: "Headcount", hint: "Ativos por setor", page: "headcount", icon: PieChart },
      { label: "Quadro de equipes", hint: "Escalas e turnos", page: "quadro-equipes", icon: LayoutGrid },
      { label: "Temporários", hint: "Prazos e renovações", page: "temporarios", icon: Clock },
      { label: "Uniformes", hint: "Pós-encerramento de vaga", page: "uniformes", icon: Shirt },
      { label: "Movimentações", hint: "Promoções e mudanças", page: "movimentacoes", icon: ArrowRightLeft },
      { label: "Desligamentos", hint: "Turnover e DP", page: "desligamentos", icon: UserMinus },
      { label: "Descrição de cargos", hint: "JD centralizado", page: "descricao-cargos", icon: FileText },
    ],
  },
  {
    titulo: "Admissão, matrículas e documentos",
    subtitulo: "Carta proposta, declarações e liberação de acessos sem retrabalho.",
    itens: [
      { label: "Documentos admissionais", hint: "Geração assistida", page: "documentos", icon: FolderOpen },
      { label: "Matrículas & acessos", hint: "Folha e chamados", page: "matriculas", icon: KeyRound },
    ],
  },
  {
    titulo: "Indicadores",
    subtitulo: "Absenteísmo, turnover, cotas, desistência — visão consolidada.",
    itens: [{ label: "Analytics RH", hint: "Dashboards", page: "indicadores", icon: BarChart3 }],
  },
];

export default function HRCommandCenter() {
  const { info, success } = useToast();
  const { navigateTo } = usePageNav();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-700/90">Posigraf · HR Core</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Command Center
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              Painel alinhado às problemáticas da jornada (R&S, operações e indicadores). Use os atalhos abaixo ou a
              sidebar. Módulos <strong className="text-slate-800">DHO</strong> e{" "}
              <strong className="text-slate-800">Serviços Gerais</strong> ficam no seletor do topo da barra lateral.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm p-5 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Mapa rápido — diagnóstico → tela</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Baseado no documento de problemáticas; cada cartão abre a área correspondente neste protótipo.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
                <Building2 size={12} className="text-teal-600" /> DHO
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
                <Wrench size={12} className="text-amber-600" /> Serviços Gerais
              </span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {atalhosPorBloco.map((bloco) => (
              <div key={bloco.titulo} className="space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900">{bloco.titulo}</h3>
                  {bloco.subtitulo && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{bloco.subtitulo}</p>}
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {bloco.itens.map((item) => (
                    <button
                      key={item.page}
                      type="button"
                      onClick={() => navigateTo(item.page)}
                      className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-left transition hover:border-teal-300 hover:bg-teal-50/40 hover:shadow-sm"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-teal-700 shadow-sm ring-1 ring-slate-200/80 group-hover:ring-teal-200">
                        <item.icon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-teal-900 flex items-center gap-1">
                          {item.label}
                          <ArrowRight
                            size={14}
                            className="opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0 text-teal-600"
                          />
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{item.hint}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
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


