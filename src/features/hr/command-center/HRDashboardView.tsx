import { motion } from 'framer-motion';
import {
  Briefcase,
  Users,
  Clock,
  TrendingUp,
  UserPlus,
  UserMinus,
  GraduationCap,
  Target,
  ArrowRight,
  CheckCircle2,
  BarChart3,
} from 'lucide-react';
import { CriticalActionsBar, type CriticalAction } from '@/shared/components/dashboard/CriticalActionsBar';
import { BentoKpiGrid } from '@/shared/components/dashboard/BentoKpiGrid';
import { usePageNav } from '@/features/navigation/PageNavContext';
import { mockVagasPorSetor } from '@/infrastructure/mock/mockVagas';
import { cn } from '@/shared/lib/cn';

const acoesDefs = [
  { id: 'admissoes-pendentes',  severity: 'critical' as const, title: 'Admissões pendentes',           count: 5, description: 'Documentos aguardando validação — prazo esgota em 48h.',                label: 'Ver admissões',    page: 'dashboard-admissoes' },
  { id: 'sla-vencendo',         severity: 'critical' as const, title: 'SLA de contratação em risco',   count: 3, description: 'Vagas com mais de 20 dias abertas sem candidato finalista.',          label: 'Ver pipeline',     page: 'pipeline'            },
  { id: 'onboarding-atrasado',  severity: 'warning'  as const, title: 'Onboarding atrasado',           count: 2, description: 'Novos colaboradores sem acesso ao sistema registrado.',               label: 'Ver onboarding',   page: 'onboarding'          },
  { id: 'trilha-vencendo',      severity: 'warning'  as const, title: 'Treinamentos com prazo próximo',count: 8, description: 'Colaboradores com trilha obrigatória vencendo esta semana.',          label: 'Ver trilhas',      page: 'trilhas'             },
  { id: 'desligamentos-pendentes', severity: 'info'  as const, title: 'Desligamentos a formalizar',    count: 1, description: 'Processo de rescisão iniciado, aguardando documentação.',             label: 'Ver desligamentos',page: 'desligamentos'      },
];

const atalhosPrincipais = [
  { label: 'Pipeline ativo', hint: 'Candidatos em triagem', page: 'pipeline', icon: Users, cor: 'teal' },
  { label: 'Vagas & SLA', hint: '23 vagas abertas', page: 'vagas', icon: Briefcase, cor: 'teal' },
  { label: 'Admissões', hint: '5 pendentes hoje', page: 'dashboard-admissoes', icon: UserPlus, cor: 'rose' },
  { label: 'Desligamentos', hint: '1 para formalizar', page: 'desligamentos', icon: UserMinus, cor: 'zinc' },
  { label: 'Trilhas T&D', hint: '8 vencendo em breve', page: 'trilhas', icon: GraduationCap, cor: 'amber' },
  { label: 'Indicadores RH', hint: 'Turnover e absenteísmo', page: 'indicadores', icon: BarChart3, cor: 'blue' },
];

const corConfig: Record<string, { icon: string; card: string; arrow: string }> = {
  teal: { icon: 'text-teal-500 dark:text-teal-400', card: 'hover:border-teal-500/50 hover:bg-teal-500/5', arrow: 'text-teal-500 dark:text-teal-400' },
  rose: { icon: 'text-rose-500 dark:text-rose-400', card: 'hover:border-rose-500/50 hover:bg-rose-500/5', arrow: 'text-rose-500 dark:text-rose-400' },
  amber: { icon: 'text-amber-500 dark:text-amber-400', card: 'hover:border-amber-500/50 hover:bg-amber-500/5', arrow: 'text-amber-500 dark:text-amber-400' },
  blue: { icon: 'text-blue-500 dark:text-blue-400', card: 'hover:border-blue-500/50 hover:bg-blue-500/5', arrow: 'text-blue-500 dark:text-blue-400' },
  zinc: { icon: 'text-zinc-500 dark:text-zinc-400', card: 'hover:border-zinc-400/50 hover:bg-zinc-500/5', arrow: 'text-zinc-500 dark:text-zinc-400' },
};

const slaVagas = mockVagasPorSetor.map((v) => ({
  setor: v.setor,
  vagas: v.vagas,
  emRisco: v.vagas >= 5,
}));

export default function HRDashboardView() {
  const { navigateTo } = usePageNav();

  const acoes: CriticalAction[] = acoesDefs.map((def) => ({
    id: def.id,
    severity: def.severity,
    title: def.title,
    count: def.count,
    description: def.description,
    action: { label: def.label, onClick: () => navigateTo(def.page) },
  }));

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-600/90">
          Posigraf · HR Core — Perfil RH
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-800 dark:text-[#e7e5e4]">
          Painel de Recursos Humanos
        </h1>
        <p className="text-zinc-500 text-sm">
          Visão consolidada das suas prioridades do dia — admissões, pipeline, treinamentos e indicadores.
        </p>
      </div>

      {/* Ações Necessárias */}
      <CriticalActionsBar actions={acoes} />

      {/* KPI Bento Grid */}
      <BentoKpiGrid />

      {/* Atalhos principais */}
      <div className="rounded-2xl border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#18181b]/80 backdrop-blur-sm p-5 sm:p-6 space-y-4 transition-colors duration-300">
        <div>
          <h2 className="text-base font-bold text-zinc-800 dark:text-[#e7e5e4] flex items-center gap-2">
            <Target size={16} className="text-teal-500" />
            Acesso rápido — suas áreas
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Módulos disponíveis para o perfil RH.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {atalhosPrincipais.map((item) => {
            const cfg = corConfig[item.cor] ?? corConfig.zinc;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => navigateTo(item.page)}
                className={cn(
                  'group flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-[#27272a] bg-zinc-50 dark:bg-zinc-800/20 p-3.5 text-left transition-all',
                  cfg.card
                )}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-[#18181b] ring-1 ring-zinc-200 dark:ring-zinc-700 group-hover:ring-current transition">
                  <item.icon size={17} className={cfg.icon} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-[#e7e5e4] leading-tight">{item.label}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{item.hint}</p>
                </div>
                <ArrowRight
                  size={14}
                  className={cn('opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0', cfg.arrow)}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Vagas por setor + SLA visual */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#18181b]/80 p-5 space-y-4 transition-colors duration-300"
        >
          <div>
            <h3 className="font-bold text-zinc-800 dark:text-[#e7e5e4] flex items-center gap-2">
              <Briefcase size={15} className="text-teal-500" />
              Vagas abertas por setor
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Setores em vermelho excedem capacidade de triagem.</p>
          </div>
          <div className="space-y-2.5">
            {slaVagas.map((v) => (
              <div key={v.setor} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className={cn('font-medium', v.emRisco ? 'text-rose-600 dark:text-rose-300' : 'text-zinc-600 dark:text-zinc-300')}>
                    {v.setor}
                  </span>
                  <span className={cn('font-bold', v.emRisco ? 'text-rose-500 dark:text-rose-400' : 'text-zinc-500 dark:text-zinc-400')}>
                    {v.vagas} vaga{v.vagas !== 1 ? 's' : ''}
                    {v.emRisco && ' ⚠'}
                  </span>
                </div>
                <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', v.emRisco ? 'bg-rose-500' : 'bg-teal-500')}
                    style={{ width: `${Math.min((v.vagas / 15) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#18181b]/80 p-5 space-y-4 transition-colors duration-300"
        >
          <div>
            <h3 className="font-bold text-zinc-800 dark:text-[#e7e5e4] flex items-center gap-2">
              <Clock size={15} className="text-amber-500" />
              SLA de Contratação
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Meta: até 15 dias úteis por vaga.</p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'No prazo (≤ 15 dias)', value: 17, total: 23, cor: 'bg-teal-500', text: 'text-teal-600 dark:text-teal-400' },
              { label: 'Em risco (16–20 dias)', value: 3, total: 23, cor: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
              { label: 'Vencido (> 20 dias)', value: 3, total: 23, cor: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={cn('h-2 w-2 rounded-full shrink-0', item.cor)} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-500 dark:text-zinc-400">{item.label}</span>
                    <span className={cn('font-bold', item.text)}>{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', item.cor)}
                      style={{ width: `${(item.value / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-zinc-200 dark:border-[#27272a]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500">Média atual</span>
              <span className="font-bold text-amber-600 dark:text-amber-300">18 dias</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progresso de treinamentos */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-2xl border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#18181b]/80 p-5 space-y-4 transition-colors duration-300"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-zinc-800 dark:text-[#e7e5e4] flex items-center gap-2">
              <GraduationCap size={15} className="text-blue-500 dark:text-blue-400" />
              KPIs de Treinamento — Mês Atual
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Trilhas obrigatórias e % de conclusão por setor.</p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('trilhas')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1 transition"
          >
            Ver trilhas <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Produção', pct: 72, meta: 80 },
            { label: 'Logística', pct: 88, meta: 80 },
            { label: 'Administrativo', pct: 91, meta: 80 },
            { label: 'TI', pct: 65, meta: 80 },
          ].map((s) => (
            <div key={s.label} className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">{s.label}</span>
                <span className={cn('font-bold', s.pct >= s.meta ? 'text-teal-600 dark:text-teal-400' : 'text-rose-600 dark:text-rose-400')}>
                  {s.pct}%
                </span>
              </div>
              <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full', s.pct >= s.meta ? 'bg-teal-500' : 'bg-rose-500')}
                  style={{ width: `${s.pct}%` }}
                />
              </div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-600">Meta: {s.meta}%</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-zinc-200 dark:border-[#27272a]">
          <CheckCircle2 size={14} className="text-teal-500 dark:text-teal-400 shrink-0" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            <span className="text-teal-600 dark:text-teal-300 font-semibold">2 setores</span> atingiram a meta de 80% de conclusão este mês.
          </p>
        </div>
      </motion.div>

      {/* Tendência de contratações */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#18181b]/80 p-5 space-y-4 transition-colors duration-300"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-zinc-800 dark:text-[#e7e5e4] flex items-center gap-2">
              <TrendingUp size={15} className="text-teal-500" />
              Tendência de contratações
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Histórico dos últimos 6 meses.</p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('indicadores')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1 transition"
          >
            Analytics completo <ArrowRight size={12} />
          </button>
        </div>
        <div className="flex items-end gap-2 h-24">
          {[
            { mes: 'Jan', n: 6 },
            { mes: 'Fev', n: 9 },
            { mes: 'Mar', n: 8 },
            { mes: 'Abr', n: 11 },
            { mes: 'Mai', n: 13 },
            { mes: 'Jun', n: 10 },
          ].map((d, i) => {
            const max = 13;
            const pct = (d.n / max) * 100;
            return (
              <div key={d.mes} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-zinc-500 font-medium">{d.n}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ delay: i * 0.05 + 0.3, duration: 0.4 }}
                  className={cn(
                    'w-full rounded-t-md',
                    i === 4 ? 'bg-teal-500' : 'bg-zinc-300 dark:bg-zinc-700'
                  )}
                  style={{ minHeight: 4 }}
                />
                <span className="text-[10px] text-zinc-400 dark:text-zinc-600">{d.mes}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
