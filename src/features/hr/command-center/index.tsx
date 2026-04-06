import { VagasPorSetorChart } from "@/shared/components/charts/VagasPorSetorChart";
import { ContratacoesChart } from "@/shared/components/charts/ContratacoesChart";
import { RecruitmentFunnel } from "@/shared/components/charts/RecruitmentFunnel";
import { CandidateMatchTable } from "@/shared/components/tables/CandidateMatchTable";
import { AlertPanel } from "@/shared/components/alerts/AlertPanel";
import { ConflictFinder } from "@/shared/components/automation/ConflictFinder";
import { BentoKpiGrid } from "@/shared/components/dashboard/BentoKpiGrid";

import { mockVagasPorSetor, mockHiringTrend } from "@/infrastructure/mock/mockVagas";
import { mockFunnelData } from "@/infrastructure/mock/mockFunil";
import { mockCandidates } from "@/infrastructure/mock/mockCandidatos";
import { mockAlerts } from "@/infrastructure/mock/mockAlertas";

import { motion } from "framer-motion";
import { useToast } from "@/shared/ui/Toast";
import { usePageNav } from "@/features/navigation/PageNavContext";
import { useAuth } from "@/features/auth/AuthContext";
import HRDashboardView from "./HRDashboardView";
import { cn } from "@/shared/lib/cn";
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
  Map,
} from "lucide-react";

interface BlocoItem {
  label: string;
  hint: string;
  page: string;
  icon: typeof Briefcase;
}

interface Bloco {
  id: string;
  titulo: string;
  descricao: string;
  mainIcon: typeof Briefcase;
  accent: {
    topBorder: string;
    iconBg: string;
    iconColor: string;
    itemHover: string;
    itemIconBg: string;
    itemIconColor: string;
    arrow: string;
  };
  itens: BlocoItem[];
}

const blocos: Bloco[] = [
  {
    id: "rs",
    titulo: "Recrutamento & Seleção",
    descricao: "Vagas, pipeline, IA, WhatsApp e indicações",
    mainIcon: Users,
    accent: {
      topBorder: "border-t-2 border-t-teal-500",
      iconBg: "bg-teal-50 dark:bg-teal-500/10",
      iconColor: "text-teal-600 dark:text-teal-400",
      itemHover: "hover:bg-teal-50/70 dark:hover:bg-teal-500/5 hover:border-teal-300/60 dark:hover:border-teal-500/30",
      itemIconBg: "bg-teal-50 dark:bg-teal-500/10",
      itemIconColor: "text-teal-600 dark:text-teal-400",
      arrow: "text-teal-500 dark:text-teal-400",
    },
    itens: [
      { label: "Vagas & SLA", hint: "Planilha de vagas", page: "vagas", icon: Briefcase },
      { label: "Pipeline", hint: "Funil e banco de talentos", page: "pipeline", icon: Users },
      { label: "Triagem com IA", hint: "Currículos em volume", page: "triagem-ia", icon: Sparkles },
      { label: "WhatsApp", hint: "Bot e rastreio unificado", page: "whatsapp", icon: MessageCircle },
      { label: "Indicações", hint: "Origem rastreável", page: "indicacoes", icon: UserPlus },
      { label: "Comunicação", hint: "Mensagens centralizadas", page: "comunicacao-interna", icon: Inbox },
    ],
  },
  {
    id: "ops",
    titulo: "Operações & Headcount",
    descricao: "Quadro, temporários, movimentações e desligamentos",
    mainIcon: Briefcase,
    accent: {
      topBorder: "border-t-2 border-t-blue-500",
      iconBg: "bg-blue-50 dark:bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      itemHover: "hover:bg-blue-50/70 dark:hover:bg-blue-500/5 hover:border-blue-300/60 dark:hover:border-blue-500/30",
      itemIconBg: "bg-blue-50 dark:bg-blue-500/10",
      itemIconColor: "text-blue-600 dark:text-blue-400",
      arrow: "text-blue-500 dark:text-blue-400",
    },
    itens: [
      { label: "Headcount", hint: "Ativos por setor", page: "headcount", icon: PieChart },
      { label: "Quadro de equipes", hint: "Escalas e turnos", page: "quadro-equipes", icon: LayoutGrid },
      { label: "Temporários", hint: "Prazos e renovações", page: "temporarios", icon: Clock },
      { label: "Uniformes", hint: "Pós-encerramento de vaga", page: "uniformes", icon: Shirt },
      { label: "Movimentações", hint: "Promoções e mudanças", page: "movimentacoes", icon: ArrowRightLeft },
      { label: "Desligamentos", hint: "Turnover e DP", page: "desligamentos", icon: UserMinus },
      { label: "Cargos (JD)", hint: "Descrições centralizadas", page: "descricao-cargos", icon: FileText },
    ],
  },
  {
    id: "adm",
    titulo: "Admissão & Documentos",
    descricao: "Carta proposta, matrículas e acessos sem retrabalho",
    mainIcon: FolderOpen,
    accent: {
      topBorder: "border-t-2 border-t-violet-500",
      iconBg: "bg-violet-50 dark:bg-violet-500/10",
      iconColor: "text-violet-600 dark:text-violet-400",
      itemHover: "hover:bg-violet-50/70 dark:hover:bg-violet-500/5 hover:border-violet-300/60 dark:hover:border-violet-500/30",
      itemIconBg: "bg-violet-50 dark:bg-violet-500/10",
      itemIconColor: "text-violet-600 dark:text-violet-400",
      arrow: "text-violet-500 dark:text-violet-400",
    },
    itens: [
      { label: "Documentos admissionais", hint: "Geração assistida por IA", page: "documentos", icon: FolderOpen },
      { label: "Matrículas & acessos", hint: "Folha, TI e chamados", page: "matriculas", icon: KeyRound },
    ],
  },
  {
    id: "analytics",
    titulo: "Analytics & Indicadores",
    descricao: "Absenteísmo, turnover, cotas e desistência consolidados",
    mainIcon: BarChart3,
    accent: {
      topBorder: "border-t-2 border-t-amber-500",
      iconBg: "bg-amber-50 dark:bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
      itemHover: "hover:bg-amber-50/70 dark:hover:bg-amber-500/5 hover:border-amber-300/60 dark:hover:border-amber-500/30",
      itemIconBg: "bg-amber-50 dark:bg-amber-500/10",
      itemIconColor: "text-amber-600 dark:text-amber-400",
      arrow: "text-amber-500 dark:text-amber-400",
    },
    itens: [
      { label: "Analytics RH", hint: "Dashboards consolidados", page: "indicadores", icon: BarChart3 },
    ],
  },
];

function HRCommandCenterFull() {
  const { info, success } = useToast();
  const { navigateTo } = usePageNav();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-700/90">Posigraf · HR Core</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-800 dark:text-[#e7e5e4]">
              Command Center
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              Painel alinhado às problemáticas da jornada (R&S, operações e indicadores). Use os atalhos abaixo ou a
              sidebar. Módulos             <strong className="text-zinc-600 dark:text-zinc-200">DHO</strong> e{" "}
              <strong className="text-zinc-600 dark:text-zinc-200">Serviços Gerais</strong> ficam no seletor do topo da barra lateral.
            </p>
          </div>
        </div>

        {/* ── Mapa Rápido header ──────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <Map size={16} className="text-zinc-500 dark:text-zinc-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-800 dark:text-[#e7e5e4] leading-tight">
                Mapa Rápido
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Cada card abre o módulo correspondente do sistema.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5">
              <Building2 size={11} className="text-teal-500" /> DHO
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5">
              <Wrench size={11} className="text-amber-500" /> Serviços Gerais
            </span>
          </div>
        </div>

        {/* ── 4 Module Cards ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {blocos.map((bloco, i) => (
            <motion.div
              key={bloco.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className={cn(
                "rounded-2xl border border-zinc-100 dark:border-zinc-800",
                "bg-white dark:bg-zinc-900",
                "p-5 flex flex-col gap-4 transition-colors duration-300",
                bloco.accent.topBorder
              )}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", bloco.accent.iconBg)}>
                    <bloco.mainIcon size={20} className={bloco.accent.iconColor} />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-800 dark:text-[#e7e5e4] text-sm leading-tight">
                      {bloco.titulo}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 leading-relaxed">
                      {bloco.descricao}
                    </p>
                  </div>
                </div>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0", bloco.accent.iconBg, bloco.accent.iconColor)}>
                  {bloco.itens.length}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-zinc-100 dark:border-zinc-800" />

              {/* Item grid */}
              <div className={cn(
                "grid gap-2",
                bloco.itens.length === 1 ? "grid-cols-1" :
                bloco.itens.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
                "grid-cols-2"
              )}>
                {bloco.itens.map((item) => (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => navigateTo(item.page)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl border",
                      "border-zinc-100 dark:border-zinc-800",
                      "bg-zinc-50/60 dark:bg-zinc-800/20",
                      "p-3 text-left transition-all duration-200",
                      bloco.accent.itemHover
                    )}
                  >
                    <div className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      bloco.accent.itemIconBg
                    )}>
                      <item.icon size={15} className={bloco.accent.itemIconColor} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-zinc-800 dark:text-[#e7e5e4] leading-tight truncate">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
                        {item.hint}
                      </p>
                    </div>
                    <ArrowRight
                      size={12}
                      className={cn(
                        "shrink-0 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0",
                        bloco.accent.arrow
                      )}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* KPI Bento Grid */}
      <BentoKpiGrid />

      {/* Conflict Finder — Benefício Cruzado */}
      <ConflictFinder />

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
      <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4] mt-10 mb-4">Insights Estratégicos</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-6 bg-rose-50 border border-rose-100/50 rounded-2xl flex items-start gap-4 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 -mt-6 -mr-6 bg-rose-100 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
          <div className="p-3 bg-white dark:bg-[#18181b] text-rose-500 rounded-xl z-10 shrink-0 border border-rose-100 dark:border-transparent">
            <AlertCircle size={24} />
          </div>
          <div className="z-10">
            <h4 className="font-bold text-rose-900 text-lg">Alerta de Turnover</h4>
            <p className="text-rose-700/80 text-sm mt-1 leading-relaxed text-balance">
              Identificamos um aumento de 2.5% no turnover do setor de <strong>Tecnologia</strong> nos últimos 30 dias. O motivo principal reportado foi "Incompatibilidade Cultural".
            </p>
            <button 
              onClick={() => info("Redirecionando", "Análise detalhada de offboarding gerada.")}
              className="mt-4 px-4 py-2 bg-white dark:bg-[#18181b] text-rose-600 border border-rose-200 dark:border-rose-800/40 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
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
          className="p-6 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-[#27272a] rounded-2xl flex items-start gap-4 relative overflow-hidden group transition-colors duration-300"
        >
          <div className="absolute top-0 right-0 p-8 -mt-6 -mr-6 bg-primary/20 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
          <div className="p-3 bg-primary/20 text-primary rounded-xl shrink-0 z-10">
            <CheckCircle2 size={24} />
          </div>
          <div className="z-10">
            <h4 className="font-bold text-lg text-zinc-800 dark:text-white">Pipeline Otimizado</h4>
            <p className="text-zinc-500 text-sm mt-1 leading-relaxed text-balance">
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

export default function HRCommandCenter() {
  const { usuario } = useAuth();

  if (usuario.tipo === 'rh') {
    return <HRDashboardView />;
  }

  return <HRCommandCenterFull />;
}
