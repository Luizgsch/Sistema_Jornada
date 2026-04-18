import { ShieldX, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/shared/ui/Card';
import type { SistemaAtual } from '@/domain/auth/roles';

type AccessDeniedProps = {
  sistemaAtual: SistemaAtual;
  onGoHome: () => void;
};

export function AccessDenied({ sistemaAtual, onGoHome }: AccessDeniedProps) {
  const modulo =
    sistemaAtual === 'hr-core'
      ? 'HR Core'
      : sistemaAtual === 'dho'
        ? 'DHO'
        : 'Serviços Gerais';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[60vh] items-center justify-center p-4"
    >
      <Card className="max-w-lg w-full overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-rose-500/60 via-amber-500/40 to-zinc-300 dark:to-zinc-700" />
        <CardContent className="p-8 md:p-10 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-radius-l bg-rose-500/10 text-rose-500 dark:text-rose-400">
            <ShieldX size={34} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tighter text-zinc-800 dark:text-[#e7e5e4]">
              Acesso negado
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Seu perfil não tem permissão para abrir esta área do{' '}
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">{modulo}</span>. Se você
              acredita que isso é um erro, fale com o administrador do sistema.
            </p>
          </div>
          <button
            type="button"
            onClick={onGoHome}
            className="inline-flex items-center justify-center gap-2 rounded-radius-m bg-zinc-100 dark:bg-[#334155] px-5 py-2.5 text-sm font-semibold text-zinc-700 dark:text-[#e7e5e4] border border-zinc-200 dark:border-zinc-700 transition hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            <Home size={16} />
            Ir para a página inicial do módulo
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
