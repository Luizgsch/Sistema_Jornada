import { ShieldX, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import type { SistemaAtual } from '@/auth/roles';

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
      <Card className="max-w-lg w-full border-slate-200 shadow-lg overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-amber-500 to-slate-400" />
        <CardContent className="p-8 md:p-10 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600">
            <ShieldX size={36} strokeWidth={1.75} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Acesso negado
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Seu perfil não tem permissão para abrir esta área do{' '}
              <span className="font-semibold text-slate-700">{modulo}</span>. Se você
              acredita que isso é um erro, fale com o administrador do sistema.
            </p>
          </div>
          <button
            type="button"
            onClick={onGoHome}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
          >
            <Home size={18} />
            Ir para a página inicial do módulo
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
