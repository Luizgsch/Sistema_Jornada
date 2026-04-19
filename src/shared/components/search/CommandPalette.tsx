import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  Users,
  Briefcase,
  FileText,
  ArrowRight,
  X,
  Zap,
  Hash,
  ClipboardList,
  Settings,
} from 'lucide-react';
import { mockCandidates } from '@/infrastructure/mock/mockCandidatos';
import { mockNotasFiscais, mockChamadosManusis } from '@/infrastructure/mock/mockServicosGerais';
import { mockRecrutamentoVagas } from '@/infrastructure/mock/mockRecrutamento';
import { mockOperacoesColaboradores } from '@/infrastructure/mock/mockOperacoes';
import { getStatusPresentation } from '@/shared/lib/recrutamentoStatusStyles';
import { useAuth } from '@/features/auth/AuthContext';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { highlightMatch } from '@/shared/lib/highlightMatch';

type ResultCategory =
  | 'pessoas-candidatos'
  | 'pessoas-colaboradores'
  | 'vagas'
  | 'configuracoes'
  | 'notas-fiscais'
  | 'chamados';

interface SearchResult {
  id: string;
  category: ResultCategory;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  pinned?: boolean;
}

const CATEGORY_META: Record<ResultCategory, { label: string; icon: React.ElementType; color: string; dot: string }> = {
  'pessoas-candidatos':      { label: 'Pessoas · Candidatos',     icon: User,          color: 'text-blue-400',    dot: 'bg-blue-500/60' },
  'pessoas-colaboradores':   { label: 'Pessoas · Colaboradores',  icon: Users,         color: 'text-sky-400',     dot: 'bg-sky-500/60' },
  vagas:                     { label: 'Vagas',                    icon: Briefcase,     color: 'text-amber-400',   dot: 'bg-amber-500/60' },
  configuracoes:             { label: 'Configurações',            icon: Settings,      color: 'text-violet-400',  dot: 'bg-violet-500/60' },
  'notas-fiscais':           { label: 'Notas fiscais',            icon: FileText,      color: 'text-emerald-400', dot: 'bg-emerald-500/60' },
  chamados:                  { label: 'Chamados',                 icon: ClipboardList, color: 'text-rose-400',    dot: 'bg-rose-500/60' },
};

const CATEGORY_ORDER: ResultCategory[] = [
  'pessoas-candidatos',
  'pessoas-colaboradores',
  'vagas',
  'configuracoes',
  'notas-fiscais',
  'chamados',
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { usuario } = useAuth();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  const tipo = usuario.tipo;

  const ALL_RESULTS = useMemo((): SearchResult[] => {
    const results: SearchResult[] = [];

    if (tipo === 'rh' || tipo === 'admin' || tipo === 'gestor') {
      mockCandidates.forEach((c) => {
        results.push({
          id: `cand-${c.id}`,
          category: 'pessoas-candidatos',
          title: c.nome,
          subtitle: c.skills.join(', ') || 'Sem habilidades cadastradas',
          badge: getStatusPresentation(c.status).label,
          badgeColor: getStatusPresentation(c.status).badgeClass,
          pinned: c.status === 'Alta prioridade',
        });
      });
      mockOperacoesColaboradores.forEach((colab) => {
        results.push({
          id: `colab-${colab.matricula}`,
          category: 'pessoas-colaboradores',
          title: colab.nome,
          subtitle: `${colab.cargo} · ${colab.setor} · ${colab.matricula}`,
          badge: colab.contrato,
          badgeColor: 'bg-zinc-800 text-zinc-400 border-zinc-700',
          pinned: colab.status === 'vencendo',
        });
      });
      mockRecrutamentoVagas.forEach((v) => {
        results.push({
          id: `vaga-${v.id}`,
          category: 'vagas',
          title: v.cargo,
          subtitle: `${v.setor} · ${v.contrato} · ${v.salario}`,
          badge: getStatusPresentation(v.status).label,
          badgeColor: getStatusPresentation(v.status).badgeClass,
          pinned: v.status === 'aberta',
        });
      });
      const configItens: Omit<SearchResult, 'category'>[] = [
        { id: 'cfg-cc', title: 'Início (Command Center)', subtitle: 'Painel principal do RH' },
        { id: 'cfg-colab', title: 'Colaboradores', subtitle: 'Operações RH · cadastro e perfil' },
        { id: 'cfg-banco', title: 'Banco de Candidatos', subtitle: 'Recrutamento · base de talentos' },
        { id: 'cfg-cursos', title: 'Catálogo de Cursos', subtitle: 'Treinamentos · catálogo DHO' },
        { id: 'cfg-vagas', title: 'Vagas', subtitle: 'Recrutamento · posições abertas' },
        { id: 'cfg-pipeline', title: 'Pipeline', subtitle: 'Recrutamento · funil de seleção' },
      ];
      configItens.forEach((row) => {
        results.push({
          ...row,
          category: 'configuracoes',
          pinned: false,
        });
      });
    }

    if (tipo === 'financeiro' || tipo === 'admin' || tipo === 'gestor') {
      mockNotasFiscais.forEach((nf) => {
        results.push({
          id: `nf-${nf.id}`,
          category: 'notas-fiscais',
          title: `${nf.id} — ${nf.fornecedor}`,
          subtitle: `R$ ${nf.valorRef.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} · ${nf.competencia}`,
          badge: nf.coluna === 'atrasada' ? 'Atrasada' : nf.coluna === 'aguardando' ? 'Aguardando' : nf.coluna === 'solicitar' ? 'Solicitar' : 'Recebida',
          badgeColor: nf.coluna === 'atrasada' ? 'bg-red-500/15 text-red-400 border-red-500/20' : nf.coluna === 'aguardando' ? 'bg-amber-500/15 text-amber-400 border-amber-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700',
          pinned: nf.coluna === 'atrasada',
        });
      });
    }

    if (tipo === 'logistica' || tipo === 'admin' || tipo === 'gestor') {
      mockChamadosManusis.forEach((c) => {
        results.push({
          id: `chamado-${c.id}`,
          category: 'chamados',
          title: c.titulo,
          subtitle: `${c.id} · ${c.area} · vence ${c.vencimento}`,
          badge: c.status,
          badgeColor: c.status === 'vencido' ? 'bg-rose-500/15 text-rose-400 border-rose-500/20' : c.status === 'proximo' ? 'bg-amber-500/15 text-amber-400 border-amber-500/20' : 'bg-teal-500/15 text-teal-400 border-teal-500/20',
          pinned: c.status === 'vencido',
        });
      });
    }

    return results;
  }, [tipo]);

  const DEFAULT_RESULTS = useMemo(
    () => [...ALL_RESULTS].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)).slice(0, 8),
    [ALL_RESULTS]
  );

  const debouncedQuery = useDebouncedValue(query, 300);
  const isSearching = debouncedQuery.trim().length > 0;
  const qLower = debouncedQuery.trim().toLowerCase();

  const filtered = isSearching
    ? ALL_RESULTS.filter(
        (r) =>
          r.title.toLowerCase().includes(qLower) ||
          r.subtitle.toLowerCase().includes(qLower) ||
          (r.badge && r.badge.toLowerCase().includes(qLower))
      )
    : DEFAULT_RESULTS;

  const grouped = filtered.reduce<Record<string, SearchResult[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const orderedGroups = useMemo(
    () => CATEGORY_ORDER.map((key) => [key, grouped[key] ?? []] as const).filter(([, items]) => items.length > 0),
    [grouped]
  );

  const flatList = orderedGroups.flatMap(([, items]) => items);

  const handleClose = useCallback(() => {
    setQuery('');
    setActiveIndex(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [debouncedQuery]);

  // Scroll active item into view
  useEffect(() => {
    activeItemRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') { e.preventDefault(); handleClose(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, flatList.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && flatList[activeIndex]) handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, flatList, activeIndex, handleClose]);

  let globalIdx = 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-[12vh] left-1/2 -translate-x-1/2 w-full max-w-xl z-[201] px-4"
          >
            <div className="bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-radius-l shadow-2xl shadow-black/50 overflow-hidden">

              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800">
                <Search size={17} className="text-zinc-500 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pessoas, vagas, configurações, notas fiscais..."
                  className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 outline-none"
                />
                <div className="flex items-center gap-2 shrink-0">
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="text-zinc-600 hover:text-zinc-400 transition-colors p-0.5"
                    >
                      <X size={14} />
                    </button>
                  )}
                  <kbd className="hidden sm:flex items-center text-[10px] text-zinc-700 bg-zinc-800 px-1.5 py-0.5 rounded-radius-s border border-zinc-700 font-mono">
                    ESC
                  </kbd>
                </div>
              </div>

              {/* Section label */}
              {!isSearching && (
                <div className="flex items-center gap-1.5 px-4 pt-3 pb-1">
                  <Zap size={11} className="text-amber-400 shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                    Acesso Rápido — Urgências detectadas
                  </span>
                </div>
              )}

              {/* Results list */}
              <div ref={listRef} className="max-h-[380px] overflow-y-auto py-2 scroll-smooth">
                {flatList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-zinc-700 select-none">
                    <Hash size={28} className="mb-3 opacity-30" />
                    <p className="text-sm">Nenhum resultado para</p>
                    <p className="text-sm font-semibold text-zinc-500 mt-0.5">"{debouncedQuery.trim()}"</p>
                  </div>
                ) : (
                  orderedGroups.map(([category, items]) => {
                    const meta = CATEGORY_META[category as ResultCategory];
                    const Icon = meta.icon;

                    return (
                      <div key={category} className="mb-1">
                        {isSearching && (
                          <div className="flex items-center gap-2 px-4 py-1.5">
                            <Icon size={11} className={`${meta.color} shrink-0`} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                              {meta.label}
                            </span>
                          </div>
                        )}

                        {items.map((item) => {
                          const isActive = globalIdx === activeIndex;
                          const currentIdx = globalIdx++;
                          return (
                            <button
                              key={item.id}
                              ref={isActive ? activeItemRef : null}
                              onMouseEnter={() => setActiveIndex(currentIdx)}
                              onClick={handleClose}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors group ${
                                isActive ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'
                              }`}
                            >
                              {/* Category icon dot */}
                              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${CATEGORY_META[category as ResultCategory]?.dot ?? 'bg-zinc-500/60'}`} />

                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${item.pinned ? 'text-zinc-100' : 'text-zinc-300'}`}>
                                  {isSearching ? highlightMatch(item.title, debouncedQuery.trim()) : item.title}
                                </p>
                                <p className="text-xs text-zinc-600 truncate mt-0.5">
                                  {isSearching ? highlightMatch(item.subtitle, debouncedQuery.trim()) : item.subtitle}
                                </p>
                              </div>

                              {item.badge && (
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${item.badgeColor}`}>
                                  {item.badge}
                                </span>
                              )}
                              <ArrowRight
                                size={12}
                                className={`shrink-0 transition-opacity ${isActive ? 'opacity-50' : 'opacity-0 group-hover:opacity-30'}`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-zinc-800/80 text-[10px] text-zinc-700">
                <span className="flex items-center gap-1.5">
                  <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded-radius-s border border-zinc-700/70 font-mono">↑↓</kbd>
                  Navegar
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded-radius-s border border-zinc-700/70 font-mono">↵</kbd>
                  Abrir
                </span>
                <span className="ml-auto font-medium capitalize">
                  {isSearching
                    ? `${flatList.length} resultado${flatList.length !== 1 ? 's' : ''}`
                    : `${ALL_RESULTS.length} itens · perfil ${tipo}`}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
