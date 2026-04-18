import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Bell,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Briefcase,
  FileWarning,
  ClipboardList,
  UserPlus,
  GraduationCap,
  BellOff,
} from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { useAuth } from '@/features/auth/AuthContext';
import type { TipoUsuario } from '@/infrastructure/mock/mockLogin';
import { mockNotasFiscais, mockChamadosManusis } from '@/infrastructure/mock/mockServicosGerais';

type NotifSeverity = 'critical' | 'warning' | 'info' | 'success';

interface Notification {
  id: string;
  severity: NotifSeverity;
  icon: React.ElementType;
  title: string;
  description: string;
  time: string;
}

const severityConfig: Record<NotifSeverity, {
  ring: string; bg: string; text: string; badge: string; icon: React.ElementType;
}> = {
  critical: { ring: 'border-rose-500/30', bg: 'bg-rose-500/8', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30', icon: AlertCircle },
  warning:  { ring: 'border-amber-500/30', bg: 'bg-amber-500/8', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30', icon: AlertTriangle },
  info:     { ring: 'border-blue-500/30', bg: 'bg-blue-500/8', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: Info },
  success:  { ring: 'border-teal-500/30', bg: 'bg-teal-500/8', text: 'text-teal-400', badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30', icon: CheckCircle2 },
};

function buildNotifications(tipo: TipoUsuario): Notification[] {
  if (tipo === 'rh') {
    return [
      { id: 'n1', severity: 'critical', icon: UserPlus, title: '5 admissões pendentes de validação', description: 'Prazo de submissão encerra em 48 horas.', time: 'há 12 min' },
      { id: 'n2', severity: 'warning', icon: Briefcase, title: 'SLA em risco: 3 vagas sem finalista', description: 'Vagas com +20 dias abertas sem candidato aprovado.', time: 'há 1h' },
      { id: 'n3', severity: 'warning', icon: GraduationCap, title: '8 trilhas obrigatórias vencendo', description: 'Colaboradores sem conclusão até sexta-feira.', time: 'há 2h' },
      { id: 'n4', severity: 'info', icon: Bell, title: 'Novo candidato via WhatsApp Bot', description: 'Mariana Costa – Frontend Developer. Score IA: 91.', time: 'há 3h' },
      { id: 'n5', severity: 'success', icon: CheckCircle2, title: 'Onboarding concluído: Lucas Mendes', description: 'Todos os acessos configurados automaticamente.', time: 'hoje cedo' },
    ];
  }

  if (tipo === 'financeiro') {
    const nfAtrasadas = mockNotasFiscais.filter((n) => n.coluna === 'atrasada');
    const diasMax = Math.max(...nfAtrasadas.map((n) => n.diasAtraso));
    return [
      ...(nfAtrasadas.length > 0 ? [{
        id: 'f1', severity: 'critical' as NotifSeverity, icon: FileWarning,
        title: `${nfAtrasadas.length} NF(s) em atraso`,
        description: `Maior atraso: ${diasMax} dias. Risco de multa contratual.`,
        time: 'há 15 min',
      }] : []),
      { id: 'f2', severity: 'warning' as NotifSeverity, icon: AlertTriangle, title: 'Divergência Elo/Attos detectada', description: '2 colaboradores com acesso duplicado no refeitório.', time: 'há 45 min' },
      { id: 'f3', severity: 'warning' as NotifSeverity, icon: FileWarning, title: '1 integração Attos pendente', description: 'Registro de 30/03 ainda no legado (planilha).', time: 'há 2h' },
      { id: 'f4', severity: 'info' as NotifSeverity, icon: Bell, title: 'Relatório mensal disponível', description: 'Consolidado de compras de março gerado automaticamente.', time: 'ontem' },
    ];
  }

  if (tipo === 'logistica') {
    const vencidos = mockChamadosManusis.filter((c) => c.status === 'vencido');
    const proximos = mockChamadosManusis.filter((c) => c.status === 'proximo');
    return [
      ...(vencidos.length > 0 ? [{
        id: 'l1', severity: 'critical' as NotifSeverity, icon: ClipboardList,
        title: `${vencidos.length} chamado(s) Manusis vencido(s)`,
        description: vencidos.map((c) => c.titulo).join(', '),
        time: 'há 10 min',
      }] : []),
      ...(proximos.length > 0 ? [{
        id: 'l2', severity: 'warning' as NotifSeverity, icon: ClipboardList,
        title: `${proximos.length} chamado(s) próximos do vencimento`,
        description: 'Escalone antes que virem críticos.',
        time: 'há 1h',
      }] : []),
      { id: 'l3', severity: 'warning' as NotifSeverity, icon: AlertTriangle, title: '2 pontos de café não abastecidos', description: 'Bloco B e Recepção sem registro hoje.', time: 'há 2h' },
      { id: 'l4', severity: 'info' as NotifSeverity, icon: Bell, title: 'Armário 22 liberado automaticamente', description: 'Ex-colaborador desligado em 31/03. Disponível para reassinação.', time: 'hoje cedo' },
      { id: 'l5', severity: 'success' as NotifSeverity, icon: CheckCircle2, title: 'Satisfação refeitório: 4.62/5', description: 'Acima da meta de 4.0. Ótimo indicador do dia!', time: 'hoje cedo' },
    ];
  }

  // admin / gestor — visão cruzada
  return [
    { id: 'a1', severity: 'critical', icon: FileWarning, title: '2 NFs em atraso (Financeiro)', description: 'NF-001 e NF-005 aguardam baixa. Risco de multa.', time: 'há 15 min' },
    { id: 'a2', severity: 'critical', icon: ClipboardList, title: `${mockChamadosManusis.filter(c => c.status === 'vencido').length} chamados Manusis vencidos`, description: 'SLA expirado. Escalone ou comunique o fornecedor.', time: 'há 20 min' },
    { id: 'a3', severity: 'warning', icon: Briefcase, title: '3 vagas RH fora do SLA', description: 'Abertas há mais de 20 dias sem finalista aprovado.', time: 'há 1h' },
    { id: 'a4', severity: 'warning', icon: GraduationCap, title: '8 trilhas vencendo esta semana', description: 'Colaboradores precisam concluir os treinamentos obrigatórios.', time: 'há 2h' },
    { id: 'a5', severity: 'info', icon: Bell, title: 'Relatório consolidado gerado', description: 'Visão completa de RH + Serviços Gerais disponível.', time: 'ontem' },
  ];
}

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationDrawer({ open, onClose }: NotificationDrawerProps) {
  const { usuario } = useAuth();
  const [dismissed, setDismissed] = useState<string[]>([]);

  const notifications = buildNotifications(usuario.tipo).filter((n) => !dismissed.includes(n.id));
  const criticalCount = notifications.filter((n) => n.severity === 'critical').length;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[90]"
          />

          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-zinc-900 border-l border-zinc-800 z-[91] flex flex-col min-h-0 shadow-2xl rounded-tl-radius-l rounded-bl-radius-l"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <Bell size={16} className="text-zinc-400" />
                <h2 className="font-bold text-[#e7e5e4] text-base">Alertas ativos</h2>
                {criticalCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-radius-m text-[11px] font-black bg-rose-500 text-white animate-pulse">
                    {criticalCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-radius-m text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Role tag */}
            <div className="px-5 py-2.5 border-b border-zinc-800 bg-zinc-950/50 shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                Filtrado para ·{' '}
                <span className="text-teal-500 capitalize">{usuario.tipo}</span>
                {' '}· {usuario.nome.split(' ')[0]}
              </p>
            </div>

            {/* List */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar py-3 space-y-1.5 px-3 pr-2">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <BellOff size={28} className="text-zinc-700" />
                  <p className="text-sm text-zinc-600">Nenhum alerta pendente.</p>
                </div>
              ) : (
                notifications.map((n, i) => {
                  const cfg = severityConfig[n.severity];
                  const SevIcon = cfg.icon;
                  const NIcon = n.icon;
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16, height: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={cn(
                        'group flex items-start gap-3 p-3.5 rounded-radius-m border transition-all',
                        cfg.ring, cfg.bg
                      )}
                    >
                      <div className="shrink-0 mt-0.5 relative">
                        <NIcon size={15} className={cfg.text} />
                        <SevIcon size={9} className={cn('absolute -bottom-1 -right-1 opacity-80', cfg.text)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#e7e5e4] leading-tight">{n.title}</p>
                        <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{n.description}</p>
                        <p className="text-[10px] text-zinc-600 mt-1">{n.time}</p>
                      </div>
                      <button
                        onClick={() => setDismissed((d) => [...d, n.id])}
                        className="shrink-0 p-1 rounded-radius-s opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800 transition"
                        title="Dispensar"
                      >
                        <X size={12} />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            <div className="px-5 py-3.5 border-t border-zinc-800 shrink-0">
              <p className="text-[10px] text-zinc-700 text-center">
                {notifications.length} alerta{notifications.length !== 1 ? 's' : ''} · gerado automaticamente pelos dados do sistema
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
