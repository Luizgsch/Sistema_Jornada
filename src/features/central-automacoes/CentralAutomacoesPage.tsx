import { useState } from 'react';
import { usePageNav } from '@/features/navigation/PageNavContext';
import { PageHeader } from '@/shared/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { useToast } from '@/shared/ui/Toast';
import { CarimboModal } from '@/shared/ui/CarimboModal';
import { Busca360Modal } from '@/shared/ui/Busca360Modal';
import { AlertCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import {
  mockCentralAlerts,
  mockRecentActivity,
  mockHubStats,
} from '@/infrastructure/mock/mockCentralAutomacoes';

export const CentralAutomacoesPage = () => {
  const { navigateTo } = usePageNav();
  const { success } = useToast();
  const [showCarimboModal, setShowCarimboModal] = useState(false);
  const [showBusca360Modal, setShowBusca360Modal] = useState(false);

  const handleExportarRelatorio = () => {
    success('Relatório de pendências exportado como PDF');
  };

  const variantColor: Record<string, string> = {
    red: 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20',
    amber: 'border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-950/20',
    blue: 'border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/20',
    purple: 'border-purple-200 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-950/20',
    green: 'border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-950/20',
  };

  const variantCount: Record<string, string> = {
    red: 'text-red-600 dark:text-red-400',
    amber: 'text-orange-600 dark:text-orange-400',
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    green: 'text-green-600 dark:text-green-400',
  };

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="⚡ Central de Automações"
          description="Visão cruzada de todos os módulos — pendências, alertas e ações em lote"
        />

        {/* Alert banner */}
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1" size={20} />
          <div>
            <p className="font-bold text-red-900 dark:text-red-100">
              {mockHubStats.totalCriticos} itens críticos precisam de atenção hoje
            </p>
            <p className="text-sm text-red-800 dark:text-red-200 mt-1">
              SLA vencendo, documentos atrasados e reciclagens pendentes.
            </p>
          </div>
        </div>

        {/* Module sections */}
        {[
          { title: '🧑‍💼 RH / Recrutamento', icon: '🧑‍💼', alerts: mockCentralAlerts.rh },
          { title: '🎓 DHO — T&D', icon: '🎓', alerts: mockCentralAlerts.dho },
          { title: '🏢 Serviços Gerais', icon: '🏢', alerts: mockCentralAlerts.sg },
        ].map((section) => (
          <div key={section.title} className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>{section.icon}</span>
              {section.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {section.alerts.map((alert) => (
                <button
                  key={alert.id}
                  onClick={() => navigateTo(alert.actionHref.replace('/hr-', '').replace('/dho-', 'dho-').replace('/sg-', 'sg-'))}
                  className={cn(
                    'p-4 rounded-lg border transition-all hover:shadow-md text-left',
                    variantColor[alert.variant]
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{alert.icon}</span>
                  </div>
                  <div className={cn('text-2xl font-bold mb-1', variantCount[alert.variant])}>
                    {alert.count}
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                    {alert.label}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                    {alert.module}
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {alert.actionLabel}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Batch actions */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Ações em Lote</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="secondary"
              className="w-full justify-center py-3 h-auto"
              onClick={handleExportarRelatorio}
            >
              <span className="text-lg">📋</span>
              <span className="ml-2">Relatório de Pendências (PDF)</span>
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-center py-3 h-auto"
              onClick={() => setShowCarimboModal(true)}
            >
              <span className="text-lg">🔏</span>
              <span className="ml-2">Carimbar Documentos</span>
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-center py-3 h-auto"
              onClick={() => setShowBusca360Modal(true)}
            >
              <span className="text-lg">👤</span>
              <span className="ml-2">Busca 360°</span>
            </Button>
          </div>
        </div>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRecentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 pb-3 border-b border-slate-200 dark:border-slate-700 last:border-0"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-bold">{item.action}</span> <strong>{item.nome}</strong>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {item.time} • {item.module}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {mockHubStats.cartasGeradas}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Cartas Geradas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                  {mockHubStats.documentosCarimbados}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Documentos Carimbados</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {mockHubStats.colaboradoresMovimentados}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Vagas Propagadas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {mockHubStats.totalCriticos}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Itens Críticos</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <CarimboModal
        isOpen={showCarimboModal}
        onClose={() => setShowCarimboModal(false)}
        mode="batch"
      />
      <Busca360Modal isOpen={showBusca360Modal} onClose={() => setShowBusca360Modal(false)} />
    </>
  );
};
