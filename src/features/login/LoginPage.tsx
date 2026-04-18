import { useState } from 'react';
import { Card, CardContent } from '@/shared/ui/Card';
import { usuariosMock, getSistemasPorTipo, type Usuario, type TipoUsuario } from '@/infrastructure/mock/mockLogin';
import { LogIn, Users, Shield, LayoutDashboard, Wrench, Building2, Loader2 } from 'lucide-react';
import { delay } from '@/shared/lib/delay';
import { motion } from 'framer-motion';
import { PosigrafLogo } from '@/shared/components/brand/PosigrafLogo';
import { cn } from '@/shared/lib/cn';

const roleConfig: Record<TipoUsuario, { label: string; badgeClass: string; avatarClass: string; description: string }> = {
  admin:      { label: 'Admin',      badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30', avatarClass: 'bg-purple-500/20 text-purple-300',  description: 'Acesso completo a todos os módulos' },
  gestor:     { label: 'Gestor',     badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',       avatarClass: 'bg-blue-500/20 text-blue-300',      description: 'Visão estratégica — todos os módulos' },
  rh:         { label: 'RH',         badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/30',       avatarClass: 'bg-teal-500/20 text-teal-300',      description: 'HR Core + DHO' },
  logistica:  { label: 'Logística',  badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', avatarClass: 'bg-emerald-500/20 text-emerald-300', description: 'Serviços Gerais + DHO' },
  financeiro: { label: 'Financeiro', badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',    avatarClass: 'bg-amber-500/20 text-amber-300',    description: 'Financeiro + DHO' },
};

interface LoginPageProps {
  onLogin: (usuario: Usuario, sistemaInicial: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  /** `u:${id}` entrada direta; `s:${sistemaId}` escolha de módulo */
  const [authBusyKey, setAuthBusyKey] = useState<string | null>(null);

  const handleSelectUser = async (usuario: Usuario) => {
    const sistemasUsuario = getSistemasPorTipo(usuario.tipo);
    if (sistemasUsuario.length === 1) {
      setAuthBusyKey(`u:${usuario.id}`);
      try {
        await delay(720);
        onLogin(usuario, sistemasUsuario[0].id);
      } finally {
        setAuthBusyKey(null);
      }
    } else {
      setSelectedUser(usuario);
    }
  };

  const handleSelectSistema = async (sistemaId: string) => {
    if (!selectedUser) return;
    setAuthBusyKey(`s:${sistemaId}`);
    try {
      await delay(680);
      onLogin(selectedUser, sistemaId);
    } finally {
      setAuthBusyKey(null);
    }
  };

  const sistemas = selectedUser ? getSistemasPorTipo(selectedUser.tipo) : [];

  if (!selectedUser) {
    return (
      <div className="h-full min-h-0 w-full overflow-y-auto overflow-x-hidden bg-zinc-50 dark:bg-[#0f172a] transition-colors duration-300">
        <div className="min-h-full relative flex items-center justify-center p-4">
          <div
            className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-90"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(13,148,136,0.2), transparent 55%), radial-gradient(ellipse 70% 50% at 100% 100%, rgba(15,23,42,0.15), transparent 50%)',
            }}
          />
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <PosigrafLogo variant="compact" className="dark:hidden" />
              <PosigrafLogo variant="compact" inverted className="hidden dark:block" />
            </div>
            <p className="font-extrabold tracking-tight text-lg text-zinc-800 dark:text-white">Posigraf</p>
            <p className="text-teal-600 dark:text-teal-300/90 text-xs font-semibold uppercase tracking-[0.2em] mt-1">Grupo Positivo · Curitiba</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-800 dark:text-white mt-4 tracking-tight">Sistema integrado</h1>
            <p className="text-zinc-500 mt-2 text-sm">RH, DHO e Serviços Gerais — selecione seu perfil para continuar</p>
          </div>

          <Card className="border-zinc-200 dark:border-[#334155]">
            <CardContent className="p-6 pt-6 sm:pt-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-primary" size={20} />
                <span className="font-bold text-zinc-800 dark:text-white">Usuários de demonstração</span>
              </div>

              {usuariosMock.map((usuario, i) => {
                const cfg = roleConfig[usuario.tipo];
                return (
                  <motion.button
                    key={usuario.id}
                    type="button"
                    disabled={authBusyKey !== null}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => handleSelectUser(usuario)}
                    className="w-full flex items-center gap-3.5 p-3.5 bg-zinc-50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 rounded-radius-m transition-all group text-left border border-zinc-100 dark:border-zinc-800/60 hover:border-zinc-200 dark:hover:border-zinc-600 disabled:pointer-events-none disabled:opacity-[0.85]"
                  >
                    <div className={cn('w-11 h-11 rounded-radius-m flex items-center justify-center font-black text-lg shrink-0', cfg.avatarClass)}>
                      {usuario.nome.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-zinc-800 dark:text-white leading-tight truncate">{usuario.nome}</p>
                        <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide shrink-0', cfg.badgeClass)}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5 truncate">{cfg.description}</p>
                    </div>
                    {authBusyKey === `u:${usuario.id}` ? (
                      <Loader2 className="text-primary shrink-0 animate-spin" size={16} aria-hidden />
                    ) : (
                      <LogIn className="text-zinc-400 dark:text-zinc-600 group-hover:text-primary transition-colors shrink-0" size={16} />
                    )}
                  </motion.button>
                );
              })}
            </CardContent>
          </Card>

          <p className="text-center text-zinc-500 text-sm mt-6">
            <Shield className="inline mr-1" size={14} />
            Ambiente de demonstração - Selecione um perfil para testar
          </p>
        </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 w-full overflow-y-auto overflow-x-hidden bg-zinc-50 dark:bg-[#0f172a] transition-colors duration-300">
      <div className="min-h-full relative flex items-center justify-center p-4">
        <div
          className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(13,148,136,0.2), transparent 55%), radial-gradient(ellipse 70% 50% at 100% 100%, rgba(15,23,42,0.15), transparent 50%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
        {(() => {
          const cfg = roleConfig[selectedUser.tipo];
          return (
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className={cn('h-14 w-14 rounded-radius-l flex items-center justify-center text-2xl font-black border', cfg.avatarClass, cfg.badgeClass.replace('bg-', 'border-').split(' ')[0])}>
                  {selectedUser.nome.charAt(0)}
                </div>
              </div>
              <h2 className="text-xl font-bold text-zinc-800 dark:text-white">{selectedUser.nome}</h2>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide', cfg.badgeClass)}>
                  {cfg.label}
                </span>
                <span className="text-zinc-500 text-xs">· {selectedUser.setor}</span>
              </div>
              <p className="text-zinc-400 dark:text-zinc-600 text-xs mt-3">Escolha o módulo de trabalho</p>
            </div>
          );
        })()}

        <Card className="border-zinc-200 dark:border-[#334155]">
          <CardContent className="p-6 pt-6 sm:pt-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-primary" size={20} />
              <span className="font-bold text-zinc-800 dark:text-white">Selecione o Sistema</span>
            </div>

            <div className="space-y-3">
              {sistemas.map((sistema, i) => {
                const isHR = sistema.id === 'hr-core';
                const isDHO = sistema.id === 'dho';
                const SisIcon = isHR ? LayoutDashboard : isDHO ? Building2 : Wrench;
                const iconColor = isHR ? 'text-teal-400' : isDHO ? 'text-blue-400' : 'text-amber-400';
                const bgColor = isHR ? 'bg-teal-500/15' : isDHO ? 'bg-blue-500/15' : 'bg-amber-500/15';
                return (
                  <motion.button
                    key={sistema.id}
                    type="button"
                    disabled={authBusyKey !== null}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleSelectSistema(sistema.id)}
                    className="w-full flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 rounded-radius-m transition-all group text-left border border-zinc-200 dark:border-zinc-800/50 hover:border-primary/40 dark:hover:border-primary/60 disabled:pointer-events-none disabled:opacity-[0.85]"
                  >
                    <div className={cn('w-12 h-12 rounded-radius-m flex items-center justify-center shrink-0', bgColor)}>
                      <SisIcon className={iconColor} size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-zinc-800 dark:text-white">{sistema.label}</p>
                      <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{sistema.descricao}</p>
                    </div>
                    {authBusyKey === `s:${sistema.id}` ? (
                      <Loader2 className="text-primary shrink-0 animate-spin" size={18} aria-hidden />
                    ) : (
                      <LogIn className="text-zinc-400 dark:text-zinc-600 group-hover:text-primary transition-colors shrink-0" size={18} />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <button
          type="button"
          disabled={authBusyKey !== null}
          onClick={() => setSelectedUser(null)}
          className="w-full mt-4 py-3 text-zinc-500 hover:text-zinc-700 dark:hover:text-[#e7e5e4] transition-colors disabled:opacity-50"
        >
          ← Voltar para lista de usuários
        </button>
        </motion.div>
      </div>
    </div>
  );
}
