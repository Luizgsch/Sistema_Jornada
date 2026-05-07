import { useState, useMemo } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { useToast } from '@/shared/ui/Toast';
import { Search, User, FileText, Briefcase, Award, Gift } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

interface Busca360ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ColaboradorData {
  matricula: string;
  nome: string;
  cpf: string;
  vaga?: {
    cargo: string;
    setor: string;
    salario: number;
    status: string;
  };
  uniforme?: {
    camisa: string;
    calca: string;
    calcado: string;
    status: string;
  };
  movimentacoes: Array<{
    data: string;
    tipo: string;
    novo: string;
  }>;
  treinamentos: Array<{
    curso: string;
    data: string;
    status: string;
  }>;
  beneficios: {
    vt: boolean;
    estacionamento: boolean;
    armario?: string;
  };
}

// Mock data base de colaboradores
const mockColaboradores: Record<string, ColaboradorData> = {
  '12345': {
    matricula: '12345',
    nome: 'João Silva',
    cpf: '123.456.789-00',
    vaga: {
      cargo: 'Auxiliar de Produção I',
      setor: 'Operações',
      salario: 2500,
      status: 'Ativo',
    },
    uniforme: {
      camisa: 'G',
      calca: '40',
      calcado: '43',
      status: 'Entregue',
    },
    movimentacoes: [
      { data: '2026-04-15', tipo: 'Contratação', novo: 'Auxiliar de Produção I' },
    ],
    treinamentos: [
      { curso: 'NR-12', data: '2026-03-10', status: 'Concluído' },
      { curso: 'Segurança', data: '2026-04-20', status: 'Pendente' },
    ],
    beneficios: {
      vt: true,
      estacionamento: false,
      armario: 'A-05',
    },
  },
  '12346': {
    matricula: '12346',
    nome: 'Maria Santos',
    cpf: '987.654.321-00',
    vaga: {
      cargo: 'Operador de Máquinas',
      setor: 'Produção',
      salario: 3200,
      status: 'Ativo',
    },
    uniforme: {
      camisa: 'M',
      calca: '38',
      calcado: '41',
      status: 'Entregue',
    },
    movimentacoes: [
      { data: '2026-02-01', tipo: 'Promoção', novo: 'Operador de Máquinas' },
    ],
    treinamentos: [
      { curso: 'NR-12', data: '2026-01-15', status: 'Concluído' },
      { curso: 'LGPD', data: '2026-03-05', status: 'Concluído' },
    ],
    beneficios: {
      vt: true,
      estacionamento: true,
      armario: 'B-12',
    },
  },
};

export const Busca360Modal = ({ isOpen, onClose }: Busca360ModalProps) => {
  const { success } = useToast();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'vaga' | 'uniforme' | 'movimentacoes' | 'treinamentos' | 'beneficios'>('vaga');

  const resultados = useMemo(() => {
    if (!search.trim()) return null;

    const termo = search.toLowerCase().replace(/\D/g, '');
    const found = Object.values(mockColaboradores).find(
      (c) =>
        c.matricula.includes(termo) ||
        c.cpf.replace(/\D/g, '').includes(termo) ||
        c.nome.toLowerCase().includes(search.toLowerCase())
    );

    return found || null;
  }, [search]);

  const handleExportar = () => {
    if (!resultados) return;
    success(`Dados de ${resultados.nome} exportados`);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="👤 Busca 360° — Visão Unificada do Colaborador"
        description="Busque por matrícula, CPF ou nome"
        maxWidth="lg"
      >
        <div className="space-y-6">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Matrícula, CPF ou nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500"
              autoFocus
            />
          </div>

          {/* Results */}
          {!resultados && search && (
            <div className="text-center py-8">
              <User size={40} className="mx-auto text-slate-400 mb-2" />
              <p className="text-slate-600 dark:text-slate-400">Colaborador não encontrado</p>
            </div>
          )}

          {resultados && (
            <>
              {/* Header info */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {resultados.nome}
                </h3>
                <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                  <div>
                    <span className="text-slate-500">Matrícula</span>
                    <p className="font-mono font-bold text-slate-900 dark:text-slate-100">
                      {resultados.matricula}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">CPF</span>
                    <p className="font-mono font-bold text-slate-900 dark:text-slate-100">
                      {resultados.cpf}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Status</span>
                    <p className="font-bold text-green-600 dark:text-green-400">Ativo</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
                {[
                  { id: 'vaga' as const, label: '📋 Vaga', icon: Briefcase },
                  { id: 'uniforme' as const, label: '👕 Uniforme', icon: FileText },
                  { id: 'movimentacoes' as const, label: '🔄 Movimentações', icon: Award },
                  { id: 'treinamentos' as const, label: '🎓 Treinamentos', icon: Award },
                  { id: 'beneficios' as const, label: '🎁 Benefícios', icon: Gift },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'px-3 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors',
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="space-y-4">
                {activeTab === 'vaga' && resultados.vaga && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Cargo</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {resultados.vaga.cargo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Setor</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {resultados.vaga.setor}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Salário</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        R$ {resultados.vaga.salario.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Status</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded text-sm font-bold">
                        {resultados.vaga.status}
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 'uniforme' && resultados.uniforme && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Camisa</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {resultados.uniforme.camisa}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Calça</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {resultados.uniforme.calca}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Calçado</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {resultados.uniforme.calcado}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Status entrega</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded text-sm font-bold">
                        {resultados.uniforme.status}
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 'movimentacoes' && (
                  <div className="space-y-2">
                    {resultados.movimentacoes.map((mov, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700"
                      >
                        <div className="flex justify-between mb-1">
                          <span className="font-bold text-slate-900 dark:text-slate-100">
                            {mov.tipo}
                          </span>
                          <span className="text-sm text-slate-500">{mov.data}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          → {mov.novo}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'treinamentos' && (
                  <div className="space-y-2">
                    {resultados.treinamentos.map((trei, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700"
                      >
                        <div className="flex justify-between mb-1">
                          <span className="font-bold text-slate-900 dark:text-slate-100">
                            {trei.curso}
                          </span>
                          <span
                            className={cn(
                              'text-xs px-2 py-1 rounded font-bold',
                              trei.status === 'Concluído'
                                ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                                : 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400'
                            )}
                          >
                            {trei.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{trei.data}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'beneficios' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Vale Transporte</span>
                      <span
                        className={cn(
                          'px-2 py-1 rounded font-bold text-sm',
                          resultados.beneficios.vt
                            ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                        )}
                      >
                        {resultados.beneficios.vt ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Estacionamento</span>
                      <span
                        className={cn(
                          'px-2 py-1 rounded font-bold text-sm',
                          resultados.beneficios.estacionamento
                            ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                        )}
                      >
                        {resultados.beneficios.estacionamento ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    {resultados.beneficios.armario && (
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Armário</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {resultados.beneficios.armario}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex gap-2 justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button variant="ghost" onClick={onClose}>
                  Fechar
                </Button>
                <Button variant="primary" onClick={handleExportar}>
                  Exportar dados
                </Button>
              </div>
            </>
          )}

          {!search && (
            <div className="text-center py-8 text-slate-500">
              <Search size={32} className="mx-auto mb-2 opacity-50" />
              <p>Digite matrícula, CPF ou nome para buscar</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
