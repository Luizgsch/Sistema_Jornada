import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, BellOff, CheckCheck } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { useAuth } from '@/features/auth/AuthContext';
import type { TipoUsuario } from '@/infrastructure/mock/mockLogin';
import type { SistemaAtual } from '@/domain/auth/roles';
import {
  buildNotificationFeed,
  countUnreadActionable,
  filterFeedByTab,
  isActionableSeverity,
  type NotificationEntry,
  type NotificationFilterTab,
  type NotificationSeverity,
} from '@/features/layout/notificationFeed';

const severityConfig: Record<
  NotificationSeverity,
  {
    ring: string;
    bg: string;
    iconWrap: string;
    label: string;
    actionLink: string;
  }
> = {
  critical: {
    ring: 'border-rose-500/35',
    bg: 'bg-rose-500/[0.07]',
    iconWrap: 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/25',
    label: 'Crítico',
    actionLink: 'text-rose-400 hover:text-rose-300',
  },
  task: {
    ring: 'border-amber-500/35',
    bg: 'bg-amber-500/[0.06]',
    iconWrap: 'bg-sky-500/15 text-sky-400 ring-1 ring-sky-500/25',
    label: 'Tarefa',
    actionLink: 'text-sky-400 hover:text-sky-300',
  },
  social: {
    ring: 'border-zinc-600/40',
    bg: 'bg-zinc-800/35',
    iconWrap: 'bg-emerald-500/12 text-emerald-400/90 ring-1 ring-emerald-500/20',
    label: 'Informativo',
    actionLink: 'text-emerald-400/90 hover:text-emerald-300',
  },
};

const tabs: { id: NotificationFilterTab; label: string }[] = [
  { id: 'all', label: 'Tudo' },
  { id: 'urgent', label: 'Urgente' },
  { id: 'social', label: 'Social' },
];

function NotificationItem({
  entry,
  isRead,
  onDismiss,
  onAction,
}: {
  entry: NotificationEntry;
  isRead: boolean;
  onDismiss: () => void;
  onAction: () => void;
}) {
  const cfg = severityConfig[entry.severity];
  const Icon = entry.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16, height: 0 }}
      className={cn(
        'group flex items-start gap-3 p-3.5 rounded-radius-m border transition-all',
        cfg.ring,
        cfg.bg,
        isRead && 'opacity-65 border-zinc-700/50'
      )}
    >
      <div
        className={cn(
          'shrink-0 mt-0.5 flex h-9 w-9 items-center justify-center rounded-radius-m',
          cfg.iconWrap
        )}
        aria-hidden
      >
        <Icon size={17} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              'text-[9px] font-black uppercase tracking-widest px-1.5 py-px rounded-radius-s',
              entry.severity === 'critical' && 'bg-rose-500/20 text-rose-300',
              entry.severity === 'task' && 'bg-amber-500/15 text-amber-300',
              entry.severity === 'social' && 'bg-zinc-700/80 text-zinc-400'
            )}
          >
            {cfg.label}
          </span>
          {isRead && (
            <span className="text-[9px] font-bold uppercase tracking-wide text-zinc-500">Lida</span>
          )}
        </div>
        <p className="text-[13px] font-semibold text-[#e7e5e4] leading-tight mt-1">{entry.title}</p>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
          {entry.description}
        </p>
        <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-1 tabular-nums">
          {entry.time}
        </p>
        <button
          type="button"
          onClick={onAction}
          className={cn(
            'mt-2 text-[11px] font-bold underline-offset-2 hover:underline',
            cfg.actionLink
          )}
        >
          {entry.actionLabel}
        </button>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 p-1 rounded-radius-s opacity-0 group-hover:opacity-100 sm:opacity-100 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition"
        title="Dispensar"
      >
        <X size={12} />
      </button>
    </motion.div>
  );
}

export function getUnreadActionableCount(
  tipo: TipoUsuario,
  readIds: readonly string[],
  dismissedIds: readonly string[]
): number {
  const feed = buildNotificationFeed(tipo);
  return countUnreadActionable(feed, new Set(readIds), new Set(dismissedIds));
}

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
  readIds: string[];
  dismissedIds: string[];
  onReadIdsChange: (ids: string[]) => void;
  onDismissedIdsChange: (ids: string[]) => void;
  onNavigate: (pageId: string, sistema?: SistemaAtual) => void;
}

export function NotificationDrawer({
  open,
  onClose,
  readIds,
  dismissedIds,
  onReadIdsChange,
  onDismissedIdsChange,
  onNavigate,
}: NotificationDrawerProps) {
  const { usuario } = useAuth();
  const [filterTab, setFilterTab] = useState<NotificationFilterTab>('all');

  const feed = useMemo(() => buildNotificationFeed(usuario.tipo), [usuario.tipo]);
  const readSet = useMemo(() => new Set(readIds), [readIds]);
  const dismissedSet = useMemo(() => new Set(dismissedIds), [dismissedIds]);

  const visible = useMemo(
    () => feed.filter((n) => !dismissedSet.has(n.id)),
    [feed, dismissedSet]
  );

  const filtered = useMemo(() => filterFeedByTab(visible, filterTab), [visible, filterTab]);

  const unreadCritical = useMemo(
    () => visible.filter((n) => n.severity === 'critical' && !readSet.has(n.id)).length,
    [visible, readSet]
  );

  const actionableUnread = countUnreadActionable(feed, readSet, dismissedSet);

  const markAllRead = () => {
    const next = new Set(readIds);
    visible.forEach((n) => next.add(n.id));
    onReadIdsChange([...next]);
  };

  const handleAction = (entry: NotificationEntry) => {
    if (!readSet.has(entry.id)) {
      onReadIdsChange([...readIds, entry.id]);
    }
    onNavigate(entry.targetPageId, entry.targetSistema);
  };

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
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 shrink-0 gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <Bell size={16} className="text-zinc-400 shrink-0" />
                <h2 className="font-bold text-[#e7e5e4] text-base truncate">Notificações</h2>
                {unreadCritical > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-radius-m text-[11px] font-black bg-rose-500 text-white animate-pulse shrink-0">
                    {unreadCritical}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-radius-m text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition"
                  aria-label="Fechar"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="px-3 pt-2 pb-2 border-b border-zinc-800 shrink-0 flex gap-1">
              {tabs.map((t) => {
                const count =
                  t.id === 'all'
                    ? visible.length
                    : t.id === 'urgent'
                      ? visible.filter((n) => isActionableSeverity(n.severity)).length
                      : visible.filter((n) => n.severity === 'social').length;
                const active = filterTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFilterTab(t.id)}
                    className={cn(
                      'flex-1 py-2 px-2 rounded-radius-m text-[11px] font-bold transition border',
                      active
                        ? 'bg-zinc-800 text-[#e7e5e4] border-zinc-600'
                        : 'text-zinc-500 border-transparent hover:bg-zinc-800/60 hover:text-zinc-300'
                    )}
                  >
                    {t.label}
                    <span className="text-zinc-500 font-semibold"> ({count})</span>
                  </button>
                );
              })}
            </div>

            <div className="px-5 py-2 border-b border-zinc-800 bg-zinc-950/50 shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Contexto · <span className="text-teal-500 capitalize">{usuario.tipo}</span>
                {' · '}
                {usuario.nome.split(' ')[0]}
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {actionableUnread > 0
                  ? `${actionableUnread} alerta(s) exigindo atenção (crítico ou tarefa) não lidos.`
                  : 'Nenhum alerta urgente pendente de leitura.'}
              </p>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar py-3 space-y-1.5 px-3 pr-2">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <BellOff size={28} className="text-zinc-700" />
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Nada neste filtro.</p>
                </div>
              ) : (
                filtered.map((n) => (
                  <NotificationItem
                    key={n.id}
                    entry={n}
                    isRead={readSet.has(n.id)}
                    onDismiss={() => onDismissedIdsChange([...dismissedIds, n.id])}
                    onAction={() => handleAction(n)}
                  />
                ))
              )}
            </div>

            <div className="px-5 py-3 border-t border-zinc-800 shrink-0 flex flex-col gap-2">
              {visible.length > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-radius-m text-[12px] font-bold border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition sm:hidden"
                >
                  <CheckCheck size={16} />
                  Marcar todas como lidas
                </button>
              )}
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
                {visible.length} item(ns) na bandeja · contagem no sino: apenas crítico e tarefa não
                lidos ({actionableUnread})
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
