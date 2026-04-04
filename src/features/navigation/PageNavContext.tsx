import { createContext, useContext, useMemo, type ReactNode } from 'react';

type PageNavContextValue = {
  navigateTo: (pageId: string) => void;
};

const PageNavContext = createContext<PageNavContextValue | null>(null);

export function PageNavProvider({
  children,
  navigateTo,
}: {
  children: ReactNode;
  navigateTo: (pageId: string) => void;
}) {
  const value = useMemo(() => ({ navigateTo }), [navigateTo]);
  return <PageNavContext.Provider value={value}>{children}</PageNavContext.Provider>;
}

export function usePageNav(): PageNavContextValue {
  const ctx = useContext(PageNavContext);
  if (!ctx) {
    throw new Error('usePageNav deve ser usado dentro de PageNavProvider');
  }
  return ctx;
}
