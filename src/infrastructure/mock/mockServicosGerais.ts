/** Mocks alinhados ao documento SENAI – Serviços Gerais (protótipo). */

export type KanbanNfColuna = 'solicitar' | 'aguardando' | 'recebida' | 'atrasada';

export type NotaFiscal = {
  id: string;
  fornecedor: string;
  valorRef: number;
  coluna: KanbanNfColuna;
  diasAtraso: number;
  competencia: string;
  dataEmissao?: string | null;
  dataSolicitacao?: string | null;
  condicaoPagamento?: string;
};

export const mockNotasFiscais: NotaFiscal[] = [
  { id: 'NF-001', fornecedor: 'Fornecedor Alfa Ltda', valorRef: 12890.0, coluna: 'atrasada', diasAtraso: 5, competencia: '2026-03', dataEmissao: '2026-02-28', dataSolicitacao: '2026-03-01', condicaoPagamento: '30 dias' },
  { id: 'NF-002', fornecedor: 'Serviços Beta ME', valorRef: 3420.5, coluna: 'aguardando', diasAtraso: 0, competencia: '2026-03', dataEmissao: '2026-03-15', dataSolicitacao: '2026-03-20', condicaoPagamento: '15 dias' },
  { id: 'NF-003', fornecedor: 'Insumos Gama', valorRef: 890.2, coluna: 'solicitar', diasAtraso: 0, competencia: '2026-04', dataEmissao: '2026-04-01', dataSolicitacao: null, condicaoPagamento: '30 dias' },
  { id: 'NF-004', fornecedor: 'Limpeza Delta', valorRef: 5600.0, coluna: 'recebida', diasAtraso: 0, competencia: '2026-03', dataEmissao: '2026-03-05', dataSolicitacao: '2026-03-10', condicaoPagamento: '7 dias' },
  { id: 'NF-005', fornecedor: 'Manutenção Epsilon', valorRef: 2100.0, coluna: 'atrasada', diasAtraso: 2, competencia: '2026-03', dataEmissao: '2026-03-10', dataSolicitacao: '2026-03-15', condicaoPagamento: '30 dias' },
  { id: 'NF-006', fornecedor: 'Suprimentos Zeta', valorRef: 1450.8, coluna: 'recebida', diasAtraso: 0, competencia: '2026-03', dataEmissao: '2026-03-22', dataSolicitacao: '2026-03-25', condicaoPagamento: '15 dias' },
  { id: 'NF-007', fornecedor: 'Transportes Eta', valorRef: 8900.0, coluna: 'aguardando', diasAtraso: 0, competencia: '2026-04', dataEmissao: '2026-04-02', dataSolicitacao: '2026-04-03', condicaoPagamento: '30 dias' },
  { id: 'NF-008', fornecedor: 'Fornecedor Theta', valorRef: 4200.0, coluna: 'solicitar', diasAtraso: 0, competencia: '2026-04', dataEmissao: null, dataSolicitacao: null, condicaoPagamento: 'A confirmar' },
  { id: 'NF-009', fornecedor: 'Facilities Iota', valorRef: 6700.5, coluna: 'atrasada', diasAtraso: 8, competencia: '2026-02', dataEmissao: '2026-02-15', dataSolicitacao: '2026-02-20', condicaoPagamento: '30 dias' },
  { id: 'NF-010', fornecedor: 'Alimentos Kappa', valorRef: 11200.0, coluna: 'recebida', diasAtraso: 0, competencia: '2026-03', dataEmissao: '2026-03-18', dataSolicitacao: '2026-03-20', condicaoPagamento: '20 dias' },
];

export type ConciliacaoAcesso = {
  id: string;
  colaborador: string;
  origem: string;
  tipoFaturamento: 'Elo' | 'Posigraf';
  duplicado: boolean;
  refeitorioDuplicado: boolean;
  resolvido?: boolean;
  dataResolucao?: string;
};

export const mockConciliacaoAcessos: ConciliacaoAcesso[] = [
  { id: 'ACC-1001', colaborador: 'Marcos Vieira', origem: 'Elo', tipoFaturamento: 'Elo', duplicado: false, refeitorioDuplicado: false, resolvido: false },
  { id: 'ACC-1002', colaborador: 'Juliana Prado', origem: 'Attos', tipoFaturamento: 'Posigraf', duplicado: true, refeitorioDuplicado: false, resolvido: false },
  { id: 'ACC-1003', colaborador: 'Eduardo Lima', origem: 'Elo', tipoFaturamento: 'Elo', duplicado: false, refeitorioDuplicado: true, resolvido: false },
  { id: 'ACC-1004', colaborador: 'Patrícia Souza', origem: 'Attos', tipoFaturamento: 'Posigraf', duplicado: false, refeitorioDuplicado: false, resolvido: false },
  { id: 'ACC-1005', colaborador: 'Roberto Silva', origem: 'Elo', tipoFaturamento: 'Elo', duplicado: true, refeitorioDuplicado: true, resolvido: false },
  { id: 'ACC-1006', colaborador: 'Fernanda Costa', origem: 'Attos', tipoFaturamento: 'Posigraf', duplicado: false, refeitorioDuplicado: false, resolvido: false },
  { id: 'ACC-1007', colaborador: 'Carlos Mendes', origem: 'Elo', tipoFaturamento: 'Elo', duplicado: true, refeitorioDuplicado: false, resolvido: false },
];

export const mockCruzamentoBeneficios = [
  { matricula: 'PG-77210', nome: 'Fernanda Costa', vt: true, estacionamento: true, redundancia: true, observacao: 'Uso duplo de benefício mob.' },
  { matricula: 'PG-77211', nome: 'Gustavo Pires', vt: true, estacionamento: false, redundancia: false, observacao: '—' },
  { matricula: 'PG-77212', nome: 'Helena Dias', vt: false, estacionamento: true, redundancia: false, observacao: '—' },
  { matricula: 'PG-77213', nome: 'Igor Martins', vt: true, estacionamento: true, redundancia: true, observacao: 'Auditoria sugerida' },
];

export type SlotArmario = 'livre' | 'ocupado' | 'liberado-desligado';

export const mockArmariosMapa = Array.from({ length: 24 }, (_, i) => {
  const n = i + 1;
  let status: SlotArmario = 'ocupado';
  if ([3, 7, 15, 18].includes(n)) status = 'livre';
  if ([11, 22].includes(n)) status = 'liberado-desligado';
  return { id: n, status, colaborador: status === 'ocupado' ? `Colab. ${n}` : null };
});

export type Compra = {
  id?: string;
  mes: string;
  categoria: string;
  valor: number;
  descricao?: string;
  fornecedor?: string;
  dataCompra?: string | null;
};

export const mockComprasMensais: Compra[] = [
  { id: 'CMP-001', mes: '2026-01', categoria: 'Higiene/Limpeza', valor: 12450.0, descricao: 'Produtos limpeza estoque', fornecedor: 'Limpeza Delta', dataCompra: '2026-01-05' },
  { id: 'CMP-002', mes: '2026-01', categoria: 'Copa/Refeitório', valor: 8920.0, descricao: 'Alimentos congelados', fornecedor: 'Alimentos Kappa', dataCompra: '2026-01-10' },
  { id: 'CMP-003', mes: '2026-01', categoria: 'EPI', valor: 5600.0, descricao: 'Uniformes e luvas', fornecedor: 'Suprimentos Zeta', dataCompra: '2026-01-15' },
  { id: 'CMP-004', mes: '2026-02', categoria: 'Higiene/Limpeza', valor: 11880.0, descricao: 'Produtos limpeza estoque', fornecedor: 'Limpeza Delta', dataCompra: '2026-02-05' },
  { id: 'CMP-005', mes: '2026-02', categoria: 'Copa/Refeitório', valor: 9100.0, descricao: 'Alimentos congelados', fornecedor: 'Alimentos Kappa', dataCompra: '2026-02-10' },
  { id: 'CMP-006', mes: '2026-02', categoria: 'Manutenção', valor: 4200.0, descricao: 'Peças reposição', fornecedor: 'Manutenção Epsilon', dataCompra: '2026-02-20' },
  { id: 'CMP-007', mes: '2026-03', categoria: 'Higiene/Limpeza', valor: 13200.0, descricao: 'Produtos limpeza estoque', fornecedor: 'Limpeza Delta', dataCompra: '2026-03-05' },
  { id: 'CMP-008', mes: '2026-03', categoria: 'Copa/Refeitório', valor: 9450.0, descricao: 'Alimentos congelados', fornecedor: 'Alimentos Kappa', dataCompra: '2026-03-10' },
  { id: 'CMP-009', mes: '2026-03', categoria: 'EPI', valor: 6800.0, descricao: 'Botas segurança', fornecedor: 'Suprimentos Zeta', dataCompra: '2026-03-15' },
  { id: 'CMP-010', mes: '2026-03', categoria: 'Outros', valor: 2300.0, descricao: 'Materiais diversos', fornecedor: 'Fornecedor Alfa Ltda', dataCompra: '2026-03-25' },
];

export type FaturamentoAttos = {
  id: string;
  data: string;
  refeicoes: number;
  integrado: boolean;
  origem: 'API Attos' | 'Planilha' | 'Manual' | 'Importação';
  ultimaAlteracao: string;
  alteradoPor: string;
};

export const mockAttosFaturamento: FaturamentoAttos[] = [
  { id: 'FAT-001', data: '2026-04-01', refeicoes: 412, integrado: true, origem: 'API Attos', ultimaAlteracao: '2026-04-03T08:15:00', alteradoPor: 'Sistema' },
  { id: 'FAT-002', data: '2026-03-31', refeicoes: 398, integrado: true, origem: 'API Attos', ultimaAlteracao: '2026-04-02T08:10:00', alteradoPor: 'Sistema' },
  { id: 'FAT-003', data: '2026-03-30', refeicoes: 405, integrado: false, origem: 'Planilha', ultimaAlteracao: '2026-03-30T14:30:00', alteradoPor: 'João Silva' },
  { id: 'FAT-004', data: '2026-03-29', refeicoes: 418, integrado: true, origem: 'API Attos', ultimaAlteracao: '2026-03-29T08:12:00', alteradoPor: 'Sistema' },
  { id: 'FAT-005', data: '2026-03-28', refeicoes: 391, integrado: false, origem: 'Planilha', ultimaAlteracao: '2026-03-28T15:45:00', alteradoPor: 'Maria Santos' },
];

export type SatisfacaoHistorico = {
  data: string;
  indicador: number;
  refeicoes: number;
  fonte: string;
};

export const mockSatisfacaoHistorico: SatisfacaoHistorico[] = [
  { data: '2026-04-03', indicador: 4.62, refeicoes: 412, fonte: 'Forms Attos' },
  { data: '2026-04-02', indicador: 4.45, refeicoes: 398, fonte: 'Forms Attos' },
  { data: '2026-04-01', indicador: 4.78, refeicoes: 405, fonte: 'Forms Attos' },
  { data: '2026-03-31', indicador: 4.55, refeicoes: 418, fonte: 'Forms Attos' },
  { data: '2026-03-30', indicador: 4.68, refeicoes: 391, fonte: 'Forms Attos' },
];

export const mockSatisfacaoAttos = {
  indicadorDia: 4.62,
  refeicoesContabilizadas: 412,
  ultimaSincronizacao: '2026-04-03T08:15:00',
  fonte: 'Pesquisa Attos → integração (protótipo)',
  historico: mockSatisfacaoHistorico,
};

export type Chamado = {
  id: string;
  titulo: string;
  area: string;
  vencimento: string;
  status: 'vencido' | 'proximo' | 'ok';
  responsavel?: string;
  dataAbertura?: string;
  dataConclusao?: string | null;
};

export const mockChamadosManusis: Chamado[] = [
  { id: 'MAN-4401', titulo: 'Vazamento banheiro bloco C', area: 'Facilities', vencimento: '2026-04-01', status: 'vencido', responsavel: 'João Silva', dataAbertura: '2026-03-20', dataConclusao: null },
  { id: 'MAN-4402', titulo: 'Troca de luminárias corredor 2', area: 'Manutenção', vencimento: '2026-04-05', status: 'proximo', responsavel: 'Carlos Mendes', dataAbertura: '2026-03-25', dataConclusao: null },
  { id: 'MAN-4403', titulo: 'Ajuste ar-cond. sala reuniões', area: 'Predial', vencimento: '2026-04-12', status: 'ok', responsavel: 'Pedro Costa', dataAbertura: '2026-03-28', dataConclusao: null },
  { id: 'MAN-4404', titulo: 'Limpeza caixa d\'água', area: 'Facilities', vencimento: '2026-03-31', status: 'vencido', responsavel: 'João Silva', dataAbertura: '2026-03-15', dataConclusao: null },
  { id: 'MAN-4405', titulo: 'Reparo porta entrada bloco A', area: 'Manutenção', vencimento: '2026-04-08', status: 'ok', responsavel: 'Carlos Mendes', dataAbertura: '2026-03-30', dataConclusao: null },
  { id: 'MAN-4406', titulo: 'Manutenção sistema elétrico', area: 'Predial', vencimento: '2026-04-10', status: 'proximo', responsavel: 'Pedro Costa', dataAbertura: '2026-03-28', dataConclusao: null },
];

export type FechamentoAttos = {
  id: string;
  periodo: string;
  totalAcessos: number;
  totalRefeicoes: number;
  valorTotal: string;
  status: 'pendente' | 'conciliado' | 'divergente';
  responsavel: string;
};

export const mockFechamentosAttos: FechamentoAttos[] = [
  { id: 'FECH-001', periodo: 'Abril/2026', totalAcessos: 1247, totalRefeicoes: 3891, valorTotal: 'R$ 87.450,00', status: 'conciliado', responsavel: 'Ana Paula' },
  { id: 'FECH-002', periodo: 'Março/2026', totalAcessos: 1189, totalRefeicoes: 3721, valorTotal: 'R$ 83.720,00', status: 'conciliado', responsavel: 'Carlos Mendes' },
  { id: 'FECH-003', periodo: 'Fevereiro/2026', totalAcessos: 1156, totalRefeicoes: 3614, valorTotal: 'R$ 81.315,00', status: 'divergente', responsavel: 'Mariana Costa' },
  { id: 'FECH-004', periodo: 'Janeiro/2026', totalAcessos: 1312, totalRefeicoes: 4105, valorTotal: 'R$ 92.362,50', status: 'pendente', responsavel: 'Roberto Alves' },
  { id: 'FECH-005', periodo: 'Dezembro/2025', totalAcessos: 1401, totalRefeicoes: 4380, valorTotal: 'R$ 98.550,00', status: 'conciliado', responsavel: 'Patricia Gomes' },
];

export type VagaEstacionamento = {
  id: string;
  setor: 'A' | 'B';
  numero: number;
  status: 'livre' | 'ocupado' | 'reservado';
  crachaVinculado: string | null;
  nomeColaborador: string | null;
  temVT: boolean;
  horaEntrada: string | null;
};

export const mockVagasEstacionamento: VagaEstacionamento[] = [
  // Setor A: 20 vagas
  { id: 'A01', setor: 'A', numero: 1, status: 'ocupado', crachaVinculado: '1047', nomeColaborador: 'Carlos Motta', temVT: false, horaEntrada: '07:32' },
  { id: 'A02', setor: 'A', numero: 2, status: 'ocupado', crachaVinculado: '0892', nomeColaborador: 'Fernanda Lima', temVT: true, horaEntrada: '07:45' },
  { id: 'A03', setor: 'A', numero: 3, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'A04', setor: 'A', numero: 4, status: 'ocupado', crachaVinculado: '2103', nomeColaborador: 'Diego Santos', temVT: false, horaEntrada: '06:15' },
  { id: 'A05', setor: 'A', numero: 5, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'A06', setor: 'A', numero: 6, status: 'ocupado', crachaVinculado: '1834', nomeColaborador: 'Juliana Rocha', temVT: true, horaEntrada: '07:18' },
  { id: 'A07', setor: 'A', numero: 7, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'A08', setor: 'A', numero: 8, status: 'ocupado', crachaVinculado: '0445', nomeColaborador: 'Roberto Silva', temVT: false, horaEntrada: '07:22' },
  { id: 'A09', setor: 'A', numero: 9, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'A10', setor: 'A', numero: 10, status: 'ocupado', crachaVinculado: '1956', nomeColaborador: 'Patricia Gomes', temVT: false, horaEntrada: '07:40' },
  { id: 'A11', setor: 'A', numero: 11, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'A12', setor: 'A', numero: 12, status: 'ocupado', crachaVinculado: '0721', nomeColaborador: 'Marcos Oliveira', temVT: true, horaEntrada: '07:25' },
  { id: 'A13', setor: 'A', numero: 13, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'A14', setor: 'A', numero: 14, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'A15', setor: 'A', numero: 15, status: 'ocupado', crachaVinculado: '2481', nomeColaborador: 'Amanda Costa', temVT: false, horaEntrada: '07:35' },
  { id: 'A16', setor: 'A', numero: 16, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'A17', setor: 'A', numero: 17, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'A18', setor: 'A', numero: 18, status: 'reservado', crachaVinculado: null, nomeColaborador: 'Bruno Mendes (reservado)', temVT: false, horaEntrada: null },
  { id: 'A19', setor: 'A', numero: 19, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'A20', setor: 'A', numero: 20, status: 'ocupado', crachaVinculado: '1623', nomeColaborador: 'Veronica Alves', temVT: false, horaEntrada: '07:50' },
  // Setor B: 50 vagas
  { id: 'B01', setor: 'B', numero: 1, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'B02', setor: 'B', numero: 2, status: 'ocupado', crachaVinculado: '1745', nomeColaborador: 'Gustavo Pires', temVT: false, horaEntrada: '07:10' },
  { id: 'B03', setor: 'B', numero: 3, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'B04', setor: 'B', numero: 4, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'B05', setor: 'B', numero: 5, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'B06', setor: 'B', numero: 6, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'B07', setor: 'B', numero: 7, status: 'livre', crachaVinculado: null, nomeColaborador: null, temVT: false, horaEntrada: null },
  { id: 'B08', setor: 'B', numero: 8, status: 'ocupado', crachaVinculado: '2067', nomeColaborador: 'Helena Dias', temVT: true, horaEntrada: '07:55' },
  // Fill remaining spots with libre
  ...Array.from({ length: 42 }, (_, i) => ({
    id: `B${String(i + 9).padStart(2, '0')}`,
    setor: 'B' as const,
    numero: i + 9,
    status: 'livre' as const,
    crachaVinculado: null,
    nomeColaborador: null,
    temVT: false,
    horaEntrada: null,
  })),
];

export const mockCafeAbastecimento = [
  { local: 'Copa Produção – Setor 1', ultimoAbastecimento: '2026-04-02', ok: true },
  { local: 'Copa Administrativo', ultimoAbastecimento: '2026-04-01', ok: true },
  { local: 'Área Logística – doca B', ultimoAbastecimento: null, ok: false },
  { local: 'Sala de treinamento', ultimoAbastecimento: '2026-03-28', ok: false },
];

/** Próxima roda de café (comunidade) — exibido no dashboard como lembrete leve. */
export const mockProximoCafeRoda = {
  quando: 'Amanhã às 15h',
  local: 'Copa Administrativo',
  tema: 'Boas-vindas aos novos estagiários',
} as const;

export type VoucherNatal = {
  id: string;
  colaborador: string;
  matricula: string;
  setor: 'Logística' | 'Produção' | 'TI' | 'RH' | 'Administrativo' | 'Serviços Gerais';
  telefone: string;
  valor: number;
  qrPayload: string;
  emitido: boolean;
};

export const mockVouchersNatal: VoucherNatal[] = [
  { id: 'VCH-2026-001', colaborador: 'Ana Souza', matricula: 'MAT-001', setor: 'Logística', telefone: '(11) 98765-4321', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-001', emitido: false },
  { id: 'VCH-2026-002', colaborador: 'Bruno Rezende', matricula: 'MAT-002', setor: 'Produção', telefone: '(11) 97654-3210', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-002', emitido: true },
  { id: 'VCH-2026-003', colaborador: 'Carla Mendes', matricula: 'MAT-003', setor: 'TI', telefone: '(11) 96543-2109', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-003', emitido: false },
  { id: 'VCH-2026-004', colaborador: 'Daniel Costa', matricula: 'MAT-004', setor: 'RH', telefone: '(11) 95432-1098', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-004', emitido: false },
  { id: 'VCH-2026-005', colaborador: 'Ernesto Silva', matricula: 'MAT-005', setor: 'Administrativo', telefone: '(11) 94321-0987', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-005', emitido: false },
  { id: 'VCH-2026-006', colaborador: 'Fernanda Oliveira', matricula: 'MAT-006', setor: 'Serviços Gerais', telefone: '(11) 93210-9876', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-006', emitido: false },
  { id: 'VCH-2026-007', colaborador: 'Gustavo Pereira', matricula: 'MAT-007', setor: 'Logística', telefone: '(11) 92109-8765', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-007', emitido: false },
  { id: 'VCH-2026-008', colaborador: 'Helena Rocha', matricula: 'MAT-008', setor: 'Produção', telefone: '(11) 91098-7654', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-008', emitido: false },
  { id: 'VCH-2026-009', colaborador: 'Igor Martins', matricula: 'MAT-009', setor: 'TI', telefone: '(11) 90987-6543', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-009', emitido: false },
  { id: 'VCH-2026-010', colaborador: 'Janaína Lima', matricula: 'MAT-010', setor: 'RH', telefone: '(11) 89876-5432', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-010', emitido: false },
  { id: 'VCH-2026-011', colaborador: 'Kevin Alves', matricula: 'MAT-011', setor: 'Administrativo', telefone: '(11) 88765-4321', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-011', emitido: false },
  { id: 'VCH-2026-012', colaborador: 'Larissa Santos', matricula: 'MAT-012', setor: 'Serviços Gerais', telefone: '(11) 87654-3210', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-012', emitido: false },
  { id: 'VCH-2026-013', colaborador: 'Marcelo Gomes', matricula: 'MAT-013', setor: 'Logística', telefone: '(11) 86543-2109', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-013', emitido: false },
  { id: 'VCH-2026-014', colaborador: 'Natália Ferreira', matricula: 'MAT-014', setor: 'Produção', telefone: '(11) 85432-1098', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-014', emitido: false },
  { id: 'VCH-2026-015', colaborador: 'Otávio Barbosa', matricula: 'MAT-015', setor: 'TI', telefone: '(11) 84321-0987', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-015', emitido: false },
];
