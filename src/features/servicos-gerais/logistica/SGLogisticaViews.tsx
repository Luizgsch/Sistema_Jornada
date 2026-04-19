import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { KpiCard } from '@/shared/components/dashboard/KpiCard';
import { CriticalActionsBar, type CriticalAction } from '@/shared/components/dashboard/CriticalActionsBar';
import {
  mockCruzamentoBeneficios,
  mockArmariosMapa,
  mockSatisfacaoAttos,
  mockChamadosManusis,
  mockCafeAbastecimento,
  mockProximoCafeRoda,
} from '@/infrastructure/mock/mockServicosGerais';
import { Car, Grid3x3, Smile, ClipboardList, UsersRound, CheckCircle2, AlertTriangle, Droplets, DoorOpen, Wrench, ChevronRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { PulseBadge } from '@/shared/ui/PulseBadge';
import { usePageNav } from '@/features/navigation/PageNavContext';
function LogBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${color}`}>
      {label}
    </span>
  );
}

/** Mobile-first touch card for Logística fieldwork (shows only on mobile) */
export function SGLogisticaMobileView() {
  const { navigateTo } = usePageNav();
  const cafeFalha = mockCafeAbastecimento.filter((c) => !c.ok).length;
  const chamadosAlerta = mockChamadosManusis.filter((c) => c.status !== 'ok').length;
  const armariosLivres = mockArmariosMapa.filter((s) => s.status === 'livre' || s.status === 'liberado-desligado').length;

  const quickActions = [
    {
      id: 'cafe',
      icon: UsersRound,
      label: 'Engajamento — Café',
      sublabel: `${cafeFalha} ponto${cafeFalha !== 1 ? 's' : ''} pendente${cafeFalha !== 1 ? 's' : ''}`,
      color:
        cafeFalha > 0
          ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
          : 'bg-zinc-500/5 border-zinc-600/25 text-zinc-400',
      urgent: cafeFalha > 0,
    },
    {
      id: 'armario',
      icon: DoorOpen,
      label: 'Liberar Armário',
      sublabel: `${armariosLivres} armário${armariosLivres !== 1 ? 's' : ''} disponível${armariosLivres !== 1 ? 'eis' : ''}`,
      color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      urgent: false,
    },
    {
      id: 'chamado',
      icon: Wrench,
      label: 'Ver Chamados Manusis',
      sublabel: `${chamadosAlerta} fora do prazo SLA`,
      color: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
      urgent: chamadosAlerta > 0,
    },
    {
      id: 'insumos',
      icon: Droplets,
      label: 'Solicitar Insumos',
      sublabel: 'Copa, Higiene & Limpeza',
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      urgent: false,
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 20, stiffness: 260 } },
  };

  return (
    <div className="md:hidden space-y-4 px-1">
      {/* Status header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between py-2"
      >
        <div>
          <h2 className="text-lg font-bold text-zinc-100 tracking-tight">Operações Logística</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Chão de fábrica · Toque para agir</p>
        </div>
        {(cafeFalha > 0 || chamadosAlerta > 0) && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring' }}
            className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-full"
          >
            <AlertTriangle size={12} className="text-rose-400" />
            <span className="text-xs font-bold text-rose-400">
              {cafeFalha + chamadosAlerta} urgente{cafeFalha + chamadosAlerta !== 1 ? 's' : ''}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Quick action buttons — full-width, touch-friendly, staggered */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {quickActions.map((action) => {
          const Icon = action.icon;
          const go =
            action.id === 'cafe'
              ? () => navigateTo('sg-engajamento-cafe')
              : action.id === 'armario'
                ? () => navigateTo('sg-armarios')
                : action.id === 'chamado'
                  ? () => navigateTo('sg-chamados-manusis')
                  : () => navigateTo('sg-compras-insumos');
          return (
            <motion.button
              key={action.id}
              type="button"
              variants={itemVariants}
              whileTap={{ scale: 0.975 }}
              onClick={go}
              className={`w-full flex items-center gap-4 p-5 rounded-radius-l border transition-colors ${action.color} ${
                action.urgent ? 'ring-1 ring-current ring-offset-1 ring-offset-[#0f172a]' : ''
              }`}
            >
              <div className="p-2.5 rounded-radius-m bg-current/10 shrink-0">
                <Icon size={22} />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-base leading-tight text-zinc-100">{action.label}</p>
                <p className="text-xs mt-0.5 opacity-70">{action.sublabel}</p>
              </div>
              {action.urgent && (
                <span className="w-2 h-2 rounded-full bg-current animate-pulse shrink-0" />
              )}
              <ChevronRight size={18} className="opacity-30 shrink-0" />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Mini status cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3 pt-1"
      >
        <motion.div variants={itemVariants} className="bg-zinc-900 border border-zinc-800 rounded-radius-l p-4">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Café OK</p>
          <p className="text-3xl font-black text-emerald-400 mt-1 tracking-tighter">
            {mockCafeAbastecimento.filter((c) => c.ok).length}
            <span className="text-base font-medium text-zinc-600">/{mockCafeAbastecimento.length}</span>
          </p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-zinc-900 border border-zinc-800 rounded-radius-l p-4">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Satisfação</p>
          <p className="text-3xl font-black text-amber-400 mt-1 tracking-tighter">
            {mockSatisfacaoAttos.indicadorDia}
            <span className="text-base font-medium text-zinc-600">/5</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function SGDashboardLogisticaView() {
  const { navigateTo } = usePageNav();
  const armariosLivres  = mockArmariosMapa.filter((s) => s.status === 'livre' || s.status === 'liberado-desligado').length;
  const cafeFalha       = mockCafeAbastecimento.filter((c) => !c.ok).length;
  const chamadosAlerta  = mockChamadosManusis.filter((c) => c.status !== 'ok').length;
  const redundancias    = mockCruzamentoBeneficios.filter((b) => b.redundancia).length;

  const acoesLogistica: CriticalAction[] = [
    ...(chamadosAlerta > 0 ? [{
      id: 'chamados-vencidos',
      severity: 'critical' as const,
      title: 'Chamados Manusis vencidos',
      count: chamadosAlerta,
      description: 'Chamados fora do prazo SLA — escalone ou acione o fornecedor.',
      action: { label: 'Ver chamados', onClick: () => navigateTo('sg-chamados-manusis') },
    }] : []),
    ...(cafeFalha > 0 ? [{
      id: 'cafe-pendente',
      severity: 'muted' as const,
      title: 'Pontos de café não abastecidos',
      count: cafeFalha,
      description: 'Locais identificados pelo Forms sem abastecimento confirmado.',
      action: { label: 'Ver abastecimento', onClick: () => navigateTo('sg-engajamento-cafe') },
    }] : []),
    ...(redundancias > 0 ? [{
      id: 'beneficios-redundantes',
      severity: 'warning' as const,
      title: 'Redundâncias VT × Estacionamento',
      count: redundancias,
      description: 'Colaboradores com ambos os benefícios ativos simultaneamente.',
      action: { label: 'Ver benefícios', onClick: () => navigateTo('sg-beneficios') },
    }] : []),
    {
      id: 'armarios-livres',
      severity: 'info' as const,
      title: 'Armários disponíveis',
      count: armariosLivres,
      description: 'Armários livres ou liberados por desligamento — prontos para reassinação.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Mobile touch-first view (hidden on desktop) */}
      <SGLogisticaMobileView />

      {/* Desktop view */}
      <div className="hidden md:block">
      <CriticalActionsBar actions={acoesLogistica} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Armários livres / liberados" value={armariosLivres} trend="neutral" urgency="normal" />
        <KpiCard
          label="VT × Estacionamento (alertas)"
          value={redundancias}
          trend={redundancias > 0 ? 'down' : 'up'}
          urgency={redundancias > 0 ? 'warning' : 'normal'}
        />
        <KpiCard label="Satisfação refeição (hoje)" value={`${mockSatisfacaoAttos.indicadorDia} / 5`} trend="neutral" urgency="normal" />
        <KpiCard
          label="Chamados fora do prazo"
          value={chamadosAlerta}
          trend={chamadosAlerta > 0 ? 'down' : 'up'}
          urgency={chamadosAlerta > 0 ? 'critical' : 'normal'}
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4]">Painel Logística & Facilities</h3>
          <p className="text-sm text-zinc-500">
            Refeitório, armários, benefícios de deslocamento, café e chamados.
          </p>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <UsersRound className="text-zinc-500 dark:text-zinc-500 shrink-0" size={16} strokeWidth={1.5} aria-hidden />
            Pontos de café pendentes:{' '}
            <span className="font-bold text-zinc-800 dark:text-zinc-100">{cafeFalha}</span>
            <span className="text-zinc-500">· detalhe em Engajamento</span>
          </p>
        </CardContent>
      </Card>

      <Card importance="low" className="border-zinc-200/90 dark:border-zinc-700/40">
        <CardContent className="pt-5 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="p-2 rounded-radius-m bg-zinc-200/70 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 shrink-0">
              <UsersRound size={18} strokeWidth={1.5} aria-hidden />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">Engajamento</p>
              <p className="font-medium text-zinc-800 dark:text-zinc-100 mt-0.5">
                Próximo café agendado: <span className="text-zinc-600 dark:text-zinc-400">{mockProximoCafeRoda.quando}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {mockProximoCafeRoda.local} · {mockProximoCafeRoda.tema}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            importance="low"
            size="sm"
            className="shrink-0"
            onClick={() => navigateTo('sg-engajamento-cafe')}
          >
            Abrir painel
          </Button>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}

export function SGBeneficiosView() {
  return (
    <Card>
      <CardHeader className="border-b border-[#334155] pb-4">
        <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4] flex items-center gap-2">
          <Car className="text-zinc-400" size={20} />
          Estacionamento × VT
        </h3>
        <p className="text-sm text-zinc-500 dark:text-slate-400 mt-1">
          Cruzamento das bases para identificar automaticamente quem utiliza os dois benefícios.
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-[#0f172a] text-slate-500 dark:text-slate-300 text-xs font-semibold uppercase tracking-widest">
            <tr>
              <th className="py-4 px-6 border-b border-[#334155]">Matrícula</th>
              <th className="py-4 px-6 border-b border-[#334155]">Nome</th>
              <th className="py-4 px-6 border-b border-[#334155] text-center">VT</th>
              <th className="py-4 px-6 border-b border-[#334155] text-center">Estacionamento</th>
              <th className="py-4 px-6 border-b border-[#334155] text-center">Ambos</th>
              <th className="py-4 px-6 border-b border-[#334155]">Observação</th>
            </tr>
          </thead>
          <tbody>
            {mockCruzamentoBeneficios.map((b) => (
              <tr
                key={b.matricula}
                className={`hover:bg-zinc-800/30 transition-colors ${
                  b.redundancia ? 'border-l-4 border-l-amber-500/60 border-[#334155]' : ''
                }`}
              >
                <td className="py-4 px-6 border-b border-[#334155] font-mono text-xs text-zinc-600">{b.matricula}</td>
                <td className="py-4 px-6 border-b border-[#334155] font-semibold text-[#e7e5e4]">{b.nome}</td>
                <td className="py-4 px-6 border-b border-[#334155] text-center">
                  {b.vt
                    ? <CheckCircle2 className="inline text-emerald-400" size={15} />
                    : <span className="text-zinc-700">—</span>}
                </td>
                <td className="py-4 px-6 border-b border-[#334155] text-center">
                  {b.estacionamento
                    ? <CheckCircle2 className="inline text-emerald-400" size={15} />
                    : <span className="text-zinc-700">—</span>}
                </td>
                <td className="py-4 px-6 border-b border-[#334155] text-center">
                  {b.redundancia
                    ? <LogBadge label="Sim" color="bg-amber-500/10 text-amber-400 border-amber-500/20" />
                    : <span className="text-zinc-600 text-xs">Não</span>}
                </td>
                <td className="py-4 px-6 border-b border-[#334155] text-xs text-zinc-600">{b.observacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export function SGArmariosView() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-zinc-500 leading-relaxed">
        Mapa do vestiário vinculado à base de desligados: armários de ex-colaboradores aparecem como liberados automaticamente.
      </p>
      <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-radius-s bg-zinc-800 border border-zinc-700" /> Livre
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-radius-s bg-primary/30 border border-primary/40" /> Ocupado
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-radius-s bg-emerald-500/20 border border-emerald-500/30" /> Liberado (desligado)
        </span>
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
        {mockArmariosMapa.map((slot) => (
          <div
            key={slot.id}
            title={slot.colaborador || (slot.status === 'livre' ? 'Livre' : 'Liberado')}
            className={`aspect-square rounded-radius-m flex flex-col items-center justify-center text-xs font-bold border transition-all hover:scale-105 ${
              slot.status === 'livre'
                ? 'bg-zinc-800 border-zinc-700 text-zinc-500'
                : slot.status === 'liberado-desligado'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : 'bg-primary/20 border-primary/40 text-primary'
            }`}
          >
            <Grid3x3 size={12} className="opacity-50 mb-0.5" />
            {slot.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SGSatisfacaoView() {
  return (
    <Card>
      <CardHeader className="border-b border-[#334155] pb-4 flex flex-row items-center gap-2">
        <Smile className="text-yellow-400" size={22} />
        <div>
          <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4]">Refeitório — satisfação (Attos)</h3>
          <p className="text-sm text-zinc-500">
            Indicador diário alimentado pela pesquisa, com contagem de refeições.
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 md:grid-cols-3 pt-6">
        <div className="p-6 rounded-radius-m bg-amber-500/5 border border-amber-500/15">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Média do dia</p>
          <p className="text-4xl font-black text-[#e7e5e4] mt-2 tracking-tighter">{mockSatisfacaoAttos.indicadorDia}</p>
          <p className="text-xs text-zinc-600 mt-2">escala 1–5</p>
        </div>
        <div className="p-6 rounded-radius-m bg-[#0f172a] border border-[#334155]">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Refeições contabilizadas</p>
          <p className="text-3xl font-black text-[#e7e5e4] mt-2 tracking-tighter">{mockSatisfacaoAttos.refeicoesContabilizadas}</p>
        </div>
        <div className="p-6 rounded-radius-m bg-[#0f172a] border border-[#334155] text-sm text-zinc-500">
          <p className="font-semibold text-zinc-400">Última sincronização</p>
          <p className="mt-2 font-mono text-xs text-zinc-600">{mockSatisfacaoAttos.ultimaSincronizacao}</p>
          <p className="mt-4 text-xs text-zinc-600">{mockSatisfacaoAttos.fonte}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function SGChamadosView() {
  return (
    <Card>
      <CardHeader className="border-b border-[#334155] pb-4 flex flex-row items-center gap-2">
        <ClipboardList className="text-rose-400" size={20} />
        <div>
          <h3 className="font-semibold text-base tracking-tighter text-[#e7e5e4]">Chamados (Manusis) — prazos</h3>
          <p className="text-sm text-zinc-500">Alerta automático de vencido ou próximo do vencimento.</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead className="bg-[#0f172a] text-slate-500 dark:text-slate-300 text-xs font-semibold uppercase tracking-widest">
            <tr>
              <th className="py-4 px-6 border-b border-[#334155]">Chamado</th>
              <th className="py-4 px-6 border-b border-[#334155]">Área</th>
              <th className="py-4 px-6 border-b border-[#334155]">Vencimento</th>
              <th className="py-4 px-6 border-b border-[#334155]">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockChamadosManusis.map((c) => (
              <tr
                key={c.id}
                className={`hover:bg-zinc-800/30 transition-colors ${
                  c.status === 'vencido'
                    ? 'border-l-4 border-l-red-600/70 border-[#334155]'
                    : c.status === 'proximo'
                      ? 'border-l-4 border-l-amber-500/60 border-[#334155]'
                      : ''
                }`}
              >
                <td className="py-4 px-6 border-b border-[#334155]">
                  <span className="font-mono text-xs text-zinc-600">{c.id}</span>
                  <p className={`font-semibold mt-0.5 ${c.status === 'vencido' ? 'neon-error-sm' : 'text-[#e7e5e4]'}`}>
                    {c.titulo}
                  </p>
                </td>
                <td className="py-4 px-6 border-b border-[#334155] text-zinc-400">{c.area}</td>
                <td className="py-4 px-6 border-b border-[#334155] font-mono text-xs text-zinc-600">{c.vencimento}</td>
                <td className="py-4 px-6 border-b border-[#334155]">
                  <PulseBadge dueDate={c.vencimento} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export function SGCafeView() {
  return (
    <Card importance="low">
      <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4 flex flex-row items-start gap-3 sm:p-5">
        <div className="p-2 rounded-radius-m bg-zinc-200/80 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 shrink-0">
          <UsersRound size={20} strokeWidth={1.5} aria-hidden />
        </div>
        <div className="min-w-0">
          <CardTitle importance="low">Sociedade do Café — abastecimento</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Leitura do Forms: locais sem registro de abastecimento aparecem no mesmo dia.
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0 sm:p-0">
        {mockCafeAbastecimento.map((c) => (
          <div
            key={c.local}
            className={[
              'px-5 sm:px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 last:border-b-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors',
              !c.ok ? 'border-l-4 border-l-red-600/70' : '',
            ].join(' ')}
          >
            <div>
              <p
                className={`font-semibold ${!c.ok ? 'text-red-600 dark:text-red-400' : 'text-zinc-800 dark:text-zinc-100'}`}
              >
                {c.local}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Último abastecimento: {c.ultimoAbastecimento ?? '—'}
              </p>
            </div>
            <LogBadge
              label={c.ok ? 'OK' : 'Falha / pendente'}
              color={
                c.ok
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
