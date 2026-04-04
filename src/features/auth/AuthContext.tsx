import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import type { Usuario } from '@/infrastructure/mock/mockLogin';
import {
  type SistemaAtual,
  canAccessRoute,
  getFirstAllowedPage,
  getAmbienteBadge,
  isDHOLimitedProfile,
} from '@/domain/auth/roles';

type AuthContextValue = {
  usuario: Usuario;
  canAccessRoute: (sistema: SistemaAtual, page: string) => boolean;
  getFirstAllowedPage: (sistema: SistemaAtual) => string;
  getAmbienteBadge: (sistema: SistemaAtual) => ReturnType<typeof getAmbienteBadge>;
  isDHOLimitedProfile: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  usuario,
  children,
}: {
  usuario: Usuario;
  children: ReactNode;
}) {
  const check = useCallback(
    (sistema: SistemaAtual, page: string) =>
      canAccessRoute(usuario.tipo, sistema, page),
    [usuario.tipo]
  );

  const firstPage = useCallback(
    (sistema: SistemaAtual) => getFirstAllowedPage(usuario.tipo, sistema),
    [usuario.tipo]
  );

  const badge = useCallback(
    (sistema: SistemaAtual) => getAmbienteBadge(sistema, usuario.tipo),
    [usuario.tipo]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      usuario,
      canAccessRoute: check,
      getFirstAllowedPage: firstPage,
      getAmbienteBadge: badge,
      isDHOLimitedProfile: isDHOLimitedProfile(usuario.tipo),
    }),
    [usuario, check, firstPage, badge]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return ctx;
}
