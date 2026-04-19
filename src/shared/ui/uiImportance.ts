import { cn } from '@/shared/lib/cn';

/** Hierarquia visual: `low` recua (engajamento / cultura leve); `default` é o padrão operacional. */
export type UiImportance = 'default' | 'low';

export function cardImportanceClass(importance: UiImportance = 'default') {
  if (importance === 'low') {
    return cn(
      'bg-zinc-50/95 dark:bg-zinc-900/25',
      'border-zinc-200/90 dark:border-zinc-700/35',
      'shadow-none',
      'dark:ring-0'
    );
  }
  return '';
}

export function cardTitleImportanceClass(importance: UiImportance = 'default') {
  if (importance === 'low') {
    return 'text-sm font-medium text-zinc-600 dark:text-zinc-400';
  }
  return '';
}
