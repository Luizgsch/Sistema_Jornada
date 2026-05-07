/** Mocks alinhados ao documento SENAI – Serviços Gerais (protótipo). */

export type KanbanNfColuna = 'solicitar' | 'aguardando' | 'recebida' | 'atrasada';

export const mockNotasFiscais = [
  { id: 'NF-001', fornecedor: 'Fornecedor Alfa Ltda', valorRef: 12890.0, coluna: 'atrasada' as KanbanNfColuna, diasAtraso: 5, competencia: '2026-03' },
  { id: 'NF-002', fornecedor: 'Serviços Beta ME', valorRef: 3420.5, coluna: 'aguardando' as KanbanNfColuna, diasAtraso: 0, competencia: '2026-03' },
  { id: 'NF-003', fornecedor: 'Insumos Gama', valorRef: 890.2, coluna: 'solicitar' as KanbanNfColuna, diasAtraso: 0, competencia: '2026-04' },
  { id: 'NF-004', fornecedor: 'Limpeza Delta', valorRef: 5600.0, coluna: 'recebida' as KanbanNfColuna, diasAtraso: 0, competencia: '2026-03' },
  { id: 'NF-005', fornecedor: 'Manutenção Epsilon', valorRef: 2100.0, coluna: 'atrasada' as KanbanNfColuna, diasAtraso: 2, competencia: '2026-03' },
];

export const mockConciliacaoAcessos = [
  { id: 'ACC-1001', colaborador: 'Marcos Vieira', origem: 'Elo', tipoFaturamento: 'Elo' as const, duplicado: false, refeitorioDuplicado: false },
  { id: 'ACC-1002', colaborador: 'Juliana Prado', origem: 'Attos', tipoFaturamento: 'Posigraf' as const, duplicado: true, refeitorioDuplicado: false },
  { id: 'ACC-1003', colaborador: 'Eduardo Lima', origem: 'Elo', tipoFaturamento: 'Elo' as const, duplicado: false, refeitorioDuplicado: true },
  { id: 'ACC-1004', colaborador: 'Patrícia Souza', origem: 'Attos', tipoFaturamento: 'Posigraf' as const, duplicado: false, refeitorioDuplicado: false },
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

export const mockComprasMensais = [
  { mes: '2026-01', categoria: 'Higiene/Limpeza', valor: 12450.0 },
  { mes: '2026-01', categoria: 'Copa/Refeitório', valor: 8920.0 },
  { mes: '2026-02', categoria: 'Higiene/Limpeza', valor: 11880.0 },
  { mes: '2026-02', categoria: 'Copa/Refeitório', valor: 9100.0 },
  { mes: '2026-03', categoria: 'Higiene/Limpeza', valor: 13200.0 },
  { mes: '2026-03', categoria: 'Copa/Refeitório', valor: 9450.0 },
];

export const mockAttosFaturamento = [
  { data: '2026-04-01', refeicoes: 412, integrado: true, origem: 'API Attos (simulada)' },
  { data: '2026-03-31', refeicoes: 398, integrado: true, origem: 'API Attos (simulada)' },
  { data: '2026-03-30', refeicoes: 405, integrado: false, origem: 'Planilha (legado)' },
];

export const mockSatisfacaoAttos = {
  indicadorDia: 4.62,
  refeicoesContabilizadas: 412,
  ultimaSincronizacao: '2026-04-03T08:15:00',
  fonte: 'Pesquisa Attos → integração (protótipo)',
};

export const mockChamadosManusis = [
  { id: 'MAN-4401', titulo: 'Vazamento banheiro bloco C', area: 'Facilities', vencimento: '2026-04-01', status: 'vencido' as const },
  { id: 'MAN-4402', titulo: 'Troca de luminárias corredor 2', area: 'Manutenção', vencimento: '2026-04-05', status: 'proximo' as const },
  { id: 'MAN-4403', titulo: 'Ajuste ar-cond. sala reuniões', area: 'Predial', vencimento: '2026-04-12', status: 'ok' as const },
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

export const mockVouchersNatal = [
  { id: 'VCH-2026-001', colaborador: 'Ana Souza', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-001', emitido: false },
  { id: 'VCH-2026-002', colaborador: 'Bruno Rezende', valor: 300, qrPayload: 'POSIGRAF-NATAL-2026-VCH-002', emitido: true },
];
