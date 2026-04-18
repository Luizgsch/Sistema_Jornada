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
