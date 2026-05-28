import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip';

interface SENAIProblemBadgeProps {
  problemId: string;
  label?: string;
  variant?: 'compact' | 'medium' | 'large';
}

const problemLabels: Record<string, string> = {
  '1.1': 'Planilha: Vagas',
  '1.2': 'Planilha: Auxiliares',
  '1.3': 'Planilha: Uniformes',
  '1.4': 'Planilha: Matrículas',
  '1.5': 'Planilha: Movimentação',
  '1.6': 'Planilha: Desligamentos',
  '2': 'Quadros manuais',
  '3': 'Temporários',
  '4': 'Indicadores',
  '5': 'Documentos',
  '6': 'Indicações',
  '7': 'Cargos',
  '8': 'Triagem IA',
  '9': 'WhatsApp',
  'dho-1': 'KPI Automáticos',
  'dho-2': 'Presença Digital',
  'dho-3': 'Lançamento Lote',
  'dho-4': 'Planilhas',
  'dho-5': 'Trilhas Auto',
  'dho-6': 'Cursos Faltantes',
  'dho-7': 'Portal Gestor',
  'dho-8': 'Consultoria',
  'sg-1': 'Alertas NF',
  'sg-2': 'Divisão Elo/Posigraf',
  'sg-3': 'Faturamento Attos',
  'sg-4': 'Acessos Duplicados',
  'sg-5': 'Compras Consolidadas',
  'sg-6': 'Fechamento Attos',
  'sg-7': 'VT × Estacionamento',
  'sg-8': 'Armários',
  'sg-9': 'Satisfação Refeição',
  'sg-10': 'Café Abastecimento',
  'sg-11': 'Chamados Manusis',
  'sg-13': 'Voucher Natal',
};

export function SENAIProblemBadge({ problemId, label, variant = 'compact' }: SENAIProblemBadgeProps) {
  const description = label || problemLabels[problemId] || problemId;

  if (variant === 'large') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-2 border-amber-500/40 rounded-lg hover:border-amber-500/60 hover:bg-gradient-to-br hover:from-amber-500/30 hover:to-amber-600/20 transition-all cursor-help">
            <div className="text-center">
              <p className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">
                SENAI
              </p>
              <p className="text-2xl font-black text-amber-700 dark:text-amber-400 font-mono">
                #{problemId}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="text-sm">
            <p className="font-semibold">Problema resolvido:</p>
            <p className="text-xs text-amber-100 mt-1">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  if (variant === 'medium') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-amber-500/15 to-amber-600/10 border border-amber-500/40 rounded-lg hover:border-amber-500/60 hover:bg-gradient-to-r hover:from-amber-500/25 hover:to-amber-600/15 transition-all cursor-help">
            <div className="text-center">
              <p className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wide">
                SENAI
              </p>
              <p className="text-lg font-black text-amber-700 dark:text-amber-400 font-mono leading-none">
                #{problemId}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="text-sm">
            <p className="font-semibold">Problema resolvido:</p>
            <p className="text-xs text-amber-100 mt-1">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded font-mono text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 cursor-help transition-colors">
          SENAI #{problemId}
        </span>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs">
        <div className="text-sm">
          <p className="font-semibold">Problema resolvido:</p>
          <p className="text-xs text-amber-100 mt-1">{description}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
