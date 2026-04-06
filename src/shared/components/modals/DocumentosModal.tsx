import { AnimatePresence, motion } from 'framer-motion';
import { X, FileText, Download, Printer, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/shared/ui/Toast';

interface Candidato {
  nome: string;
  cargo: string;
  vagaAlvo?: string;
}

interface DocumentosModalProps {
  candidato: Candidato | null;
  onClose: () => void;
}

const TABS = [
  { id: 'proposta', label: 'Carta Proposta', icon: FileText },
  { id: 'conta', label: 'Declaração de Conta', icon: FileText },
  { id: 'contrato', label: 'Contrato de Admissão', icon: FileText },
];

const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

export function DocumentosModal({ candidato, onClose }: DocumentosModalProps) {
  const [activeTab, setActiveTab] = useState('proposta');
  const { success } = useToast();

  if (!candidato) return null;

  const nome = candidato.nome;
  const cargo = candidato.cargo;

  const handleDownload = () => {
    success('Documento gerado', `${TABS.find(t => t.id === activeTab)?.label} de ${nome} foi gerado com sucesso.`);
  };
  const handlePrint = () => {
    success('Enviado para impressão', `Imprimindo ${TABS.find(t => t.id === activeTab)?.label}...`);
  };

  const renderPreview = () => {
    switch (activeTab) {
      case 'proposta':
        return (
          <div className="space-y-4 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
            <div className="text-right text-xs text-zinc-400 dark:text-zinc-600">São Paulo, {today}</div>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-[#e7e5e4] text-center">CARTA PROPOSTA</h3>
            <p>Prezado(a) <strong className="text-primary">{nome}</strong>,</p>
            <p>
              É com enorme satisfação que a <strong>HR Core Soluções Ltda.</strong> formalizamos nossa proposta
              de contratação para o cargo de <strong className="text-primary">{cargo}</strong>, conforme
              detalhado a seguir:
            </p>
            <div className="bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-[#27272a] rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-xs"><span className="font-semibold text-zinc-500 uppercase">Cargo</span><span className="font-bold text-zinc-700 dark:text-zinc-200">{cargo}</span></div>
              <div className="flex justify-between text-xs"><span className="font-semibold text-zinc-500 uppercase">Regime</span><span className="font-bold text-zinc-700 dark:text-zinc-200">CLT — Integral</span></div>
              <div className="flex justify-between text-xs"><span className="font-semibold text-zinc-500 uppercase">Salário</span><span className="font-bold text-emerald-600 dark:text-emerald-400">A combinar</span></div>
              <div className="flex justify-between text-xs"><span className="font-semibold text-zinc-500 uppercase">Início Previsto</span><span className="font-bold text-zinc-700 dark:text-zinc-200">A combinar</span></div>
              <div className="flex justify-between text-xs"><span className="font-semibold text-zinc-500 uppercase">Benefícios</span><span className="font-bold text-zinc-700 dark:text-zinc-200">VT · VR · Plano de Saúde</span></div>
            </div>
            <p>Esta proposta tem validade de <strong>5 dias úteis</strong> a partir desta data.</p>
            <p>Aguardamos seu retorno com entusiasmo!</p>
            <div className="mt-8 border-t border-zinc-200 dark:border-zinc-700 pt-4 space-y-1">
              <div className="h-px w-48 bg-zinc-400 mx-auto mb-2" />
              <p className="text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">Departamento de Recursos Humanos</p>
              <p className="text-center text-xs text-zinc-400 dark:text-zinc-600">HR Core Soluções Ltda.</p>
            </div>
          </div>
        );

      case 'conta':
        return (
          <div className="space-y-4 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
            <div className="text-right text-xs text-zinc-400 dark:text-zinc-600">São Paulo, {today}</div>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-[#e7e5e4] text-center">DECLARAÇÃO DE ABERTURA DE CONTA</h3>
            <p>
              Declaramos para os devidos fins que <strong className="text-primary">{nome}</strong>,
              portador(a) do CPF número <strong>XXX.XXX.XXX-XX</strong>, foi admitido(a) para o cargo de
              <strong className="text-primary"> {cargo}</strong>, e deverá providenciar a abertura de
              conta-corrente em seu nome para recebimento de salário.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 space-y-2">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">Bancos Conveniados</p>
              <div className="flex gap-3 flex-wrap">
                {['Bradesco', 'Itaú', 'Banco do Brasil', 'Caixa Econômica', 'Santander'].map(b => (
                  <span key={b} className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-semibold">{b}</span>
                ))}
              </div>
            </div>
            <p>
              O comprovante de abertura deverá ser entregue ao setor de RH no prazo máximo de
              <strong> 3 dias úteis</strong> após o início das atividades.
            </p>
            <div className="mt-8 border-t border-zinc-200 dark:border-zinc-700 pt-4">
              <div className="h-px w-48 bg-zinc-400 mx-auto mb-2" />
              <p className="text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">Departamento de Recursos Humanos</p>
              <p className="text-center text-xs text-zinc-400 dark:text-zinc-600">HR Core Soluções Ltda.</p>
            </div>
          </div>
        );

      case 'contrato':
        return (
          <div className="space-y-4 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
            <h3 className="text-lg font-bold text-zinc-800 dark:text-[#e7e5e4] text-center">CONTRATO DE ADMISSÃO</h3>
            <h4 className="text-sm font-bold text-center text-zinc-500">Via Contratação — Regime CLT</h4>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center">São Paulo, {today}</p>

            <div className="space-y-3">
              <div className="bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-600 uppercase">Contratante</p>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">HR Core Soluções Ltda.</p>
                <p className="text-xs text-zinc-500">CNPJ: XX.XXX.XXX/0001-XX | São Paulo - SP</p>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-primary uppercase">Contratado(a)</p>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">{nome}</p>
                <p className="text-xs text-zinc-500">CPF: XXX.XXX.XXX-XX | RG: XX.XXX.XXX-X</p>
                <p className="text-xs text-zinc-500">Cargo: <strong className="text-zinc-700 dark:text-zinc-300">{cargo}</strong></p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-600 uppercase mb-2">Cláusulas Principais</p>
              <ul className="space-y-1.5">
                {[
                  'O contratado exercerá suas funções em regime CLT, jornada de 44 horas semanais.',
                  'O salário será pago até o 5º dia útil de cada mês.',
                  'O período de experiência será de 45+45 dias, conforme art. 443 CLT.',
                  'Benefícios incluem VT, VR e plano de saúde coletivo.',
                  'Ambas as partes acordam com a Política de Confidencialidade da empresa.',
                ].map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <div className="text-center">
                <div className="h-px bg-zinc-400 mb-2" />
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Contratante</p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-600">HR Core Soluções Ltda.</p>
              </div>
              <div className="text-center">
                <div className="h-px bg-zinc-400 mb-2" />
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{nome}</p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-600">Contratado(a)</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#18181b] rounded-2xl flex flex-col z-10 overflow-hidden border border-zinc-200 dark:border-[#27272a] transition-colors duration-300"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-[#27272a] shrink-0">
            <div>
              <h2 className="text-xl font-bold text-zinc-800 dark:text-[#e7e5e4]">Geração de Documentos</h2>
              <p className="text-sm text-zinc-500 mt-0.5">Candidato: <span className="font-semibold text-primary">{nome}</span></p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 dark:text-zinc-600 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-full transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-6 pt-4 shrink-0 border-b border-zinc-200 dark:border-[#27272a]">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'text-primary border-primary bg-primary/5'
                    : 'text-zinc-500 border-transparent hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/40'
                }`}
              >
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Document Preview */}
          <div className="flex-1 overflow-y-auto p-6 bg-zinc-50 dark:bg-zinc-800/20 custom-scrollbar">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-[#27272a] rounded-xl p-8 min-h-[400px]">
              {renderPreview()}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-zinc-200 dark:border-[#27272a] bg-zinc-50 dark:bg-[#18181b] shrink-0 flex gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-[#27272a] text-zinc-600 dark:text-zinc-400 rounded-xl font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Printer size={16} /> Imprimir
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Download size={16} /> Baixar PDF
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
