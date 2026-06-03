/** Mocks alinhados ao documento SENAI – DHO e Comunicação Interna (protótipo). */

export const mockKpiTD = {
  horaHomemMes: 1842.5,
  horaHomemMeta: 2100,
  participantesMes: 312,
  treinamentosRealizados: 28,
  variacaoVsMesAnterior: 12.4,
};

export const mockTreinamentosPresenca = [
  {
    id: 'TRE-2401',
    titulo: 'NR-12 Segurança em Máquinas',
    data: '2026-04-02',
    local: 'Auditório A',
    previstos: 45,
    confirmadosQr: 41,
    checklistPendente: 4,
    status: 'em-andamento' as const,
  },
  {
    id: 'TRE-2402',
    titulo: 'Excelência no Atendimento Interno',
    data: '2026-04-05',
    local: 'Sala 3 – Bloco B',
    previstos: 22,
    confirmadosQr: 22,
    checklistPendente: 0,
    status: 'concluido' as const,
  },
  {
    id: 'TRE-2403',
    titulo: 'LGPD para Gestores',
    data: '2026-04-08',
    local: 'Online – Teams',
    previstos: 60,
    confirmadosQr: 38,
    checklistPendente: 22,
    status: 'planejado' as const,
  },
];

export const mockLotePendente = [
  { matricula: 'PG-88421', nome: 'Ana Paula Ferreira', curso: 'Integração Operacional', horas: 8, origem: 'Importação planilha' },
  { matricula: 'PG-88456', nome: 'Bruno Costa', curso: 'Integração Operacional', horas: 8, origem: 'Importação planilha' },
  { matricula: 'PG-88501', nome: 'Carla Mendes', curso: 'NR-35', horas: 4, origem: 'Importação planilha' },
];

export const mockTrilhasPorCargo = [
  {
    cargo: 'Auxiliar de Produção I',
    cursosObrigatorios: [
      { codigo: 'INT-OP-01', nome: 'Integração Operacional', cargaHoraria: 8, reciclagemMeses: 24, status: 'ok' as const },
      { codigo: 'NR12-BASE', nome: 'NR-12 Básico', cargaHoraria: 4, reciclagemMeses: 12, status: 'vencendo' as const },
    ],
    pendentesPosMovimentacao: 1,
  },
  {
    cargo: 'Líder de Turno',
    cursosObrigatorios: [
      { codigo: 'LID-01', nome: 'Liderança Situacional', cargaHoraria: 16, reciclagemMeses: 36, status: 'pendente' as const },
      { codigo: 'NR12-ADV', nome: 'NR-12 Avançado', cargaHoraria: 8, reciclagemMeses: 12, status: 'ok' as const },
      { codigo: '5S-GEST', nome: '5S na Gestão de Equipes', cargaHoraria: 4, reciclagemMeses: 24, status: 'ok' as const },
    ],
    pendentesPosMovimentacao: 2,
  },
  {
    cargo: 'Designer UI/UX Pleno',
    cursosObrigatorios: [
      { codigo: 'DES-ADV', nome: 'Design Avançado - Responsive', cargaHoraria: 20, reciclagemMeses: 24, status: 'novo' as const },
      { codigo: 'FIG-PRO', nome: 'Figma Profissional', cargaHoraria: 12, reciclagemMeses: 12, status: 'novo' as const },
      { codigo: 'ACC-WEB', nome: 'Acessibilidade Web (WCAG)', cargaHoraria: 8, reciclagemMeses: 36, status: 'novo' as const },
    ],
    pendentesPosMovimentacao: 3,
  },
  {
    cargo: 'Marketing — Growth',
    cursosObrigatorios: [
      { codigo: 'GROW-01', nome: 'Growth Marketing Fundamentos', cargaHoraria: 16, reciclagemMeses: 12, status: 'novo' as const },
      { codigo: 'AB-TEST', nome: 'A/B Testing e Métricas', cargaHoraria: 12, reciclagemMeses: 6, status: 'novo' as const },
      { codigo: 'ANA-DATA', nome: 'Analytics Avançada', cargaHoraria: 16, reciclagemMeses: 12, status: 'novo' as const },
    ],
    pendentesPosMovimentacao: 3,
  },
  {
    cargo: 'Coordenadora de RH',
    cursosObrigatorios: [
      { codigo: 'COORD-RH', nome: 'Coordenação de RH - Gestão Estratégica', cargaHoraria: 24, reciclagemMeses: 36, status: 'novo' as const },
      { codigo: 'CLT-ADV', nome: 'CLT Avançada - Rotinas Jurídicas', cargaHoraria: 16, reciclagemMeses: 24, status: 'novo' as const },
      { codigo: 'COM-EXEC', nome: 'Comunicação Executiva', cargaHoraria: 12, reciclagemMeses: 24, status: 'novo' as const },
    ],
    pendentesPosMovimentacao: 3,
  },
  {
    cargo: 'Operações — Matriz',
    cursosObrigatorios: [
      { codigo: 'OP-MAT', nome: 'Operações na Matriz', cargaHoraria: 12, reciclagemMeses: 24, status: 'novo' as const },
      { codigo: 'SGSO', nome: 'Segurança e Saúde Ocupacional', cargaHoraria: 8, reciclagemMeses: 12, status: 'novo' as const },
      { codigo: 'PROC-OPS', nome: 'Processos Operacionais', cargaHoraria: 16, reciclagemMeses: 12, status: 'novo' as const },
    ],
    pendentesPosMovimentacao: 3,
  },
];

export const mockSolicitacoesTreinamentoGestor = [
  {
    id: 'SOL-TD-1092',
    protocolo: '2026-TD-00412',
    solicitante: 'Ricardo Almeida',
    setor: 'Expedição',
    tema: 'Comunicação não violenta para líderes',
    prioridade: 'alta' as const,
    status: 'fila' as const,
    dataAbertura: '2026-03-28',
    posicaoFila: 2,
  },
  {
    id: 'SOL-TD-1093',
    protocolo: '2026-TD-00413',
    solicitante: 'Fernanda Rocha',
    setor: 'Qualidade',
    tema: 'Metrologia básica – reciclagem',
    prioridade: 'media' as const,
    status: 'em-analise' as const,
    dataAbertura: '2026-03-30',
    posicaoFila: 5,
  },
  {
    id: 'SOL-TD-1094',
    protocolo: '2026-TD-00414',
    solicitante: 'Paulo Nunes',
    setor: 'Manutenção',
    tema: 'Lockout/Tagout',
    prioridade: 'baixa' as const,
    status: 'aprovado' as const,
    dataAbertura: '2026-03-22',
    posicaoFila: 0,
  },
];

export const mockComunicadosTD = [
  {
    id: 'COM-501',
    titulo: 'Inscrições abertas: NR-35 abril/2026',
    tipo: 'chamada-curso' as const,
    publicoAlvo: 'Colaboradores com função em altura',
    enviadoEm: '2026-04-01',
    confirmacoes: 34,
    prazoConfirmacao: '2026-04-10',
    status: 'ativo' as const,
  },
  {
    id: 'COM-502',
    titulo: 'Lembrete: treinamento de integração – novos admitidos',
    tipo: 'comunicado' as const,
    publicoAlvo: 'Novos admitidos março',
    enviadoEm: '2026-03-29',
    confirmacoes: 12,
    prazoConfirmacao: '2026-04-02',
    status: 'encerrado' as const,
  },
];

export const mockConsultoriaInterna = [
  {
    id: 'CONS-088',
    titulo: 'Mediação – conflito escala B x turno noturno',
    solicitante: 'Gestão Operacional',
    canalAnterior: 'WhatsApp',
    responsavel: 'DHO – Psic. Organizacional',
    prazo: '2026-04-06',
    status: 'em-andamento' as const,
    prioridade: 'alta' as const,
  },
  {
    id: 'CONS-089',
    titulo: 'Alinhamento de feedback com liderança',
    solicitante: 'Produção – Setor 2',
    canalAnterior: 'E-mail',
    responsavel: 'DHO – T&D',
    prazo: '2026-04-12',
    status: 'novo' as const,
    prioridade: 'media' as const,
  },
];

export const mockHistoricoTreinamentos = [
  {
    matricula: 'MAT-101',
    nome: 'Alice Ferreira',
    cursos: [
      { codigo: 'DES-ADV', nome: 'Design Avançado - Responsive', dataConclusao: '2025-11-15', cargaHoraria: 20, reciclagemMeses: 24 },
      { codigo: 'FIG-PRO', nome: 'Figma Profissional', dataConclusao: '2025-12-20', cargaHoraria: 12, reciclagemMeses: 12 },
      { codigo: 'ACC-WEB', nome: 'Acessibilidade Web (WCAG)', dataConclusao: '2026-02-10', cargaHoraria: 8, reciclagemMeses: 36 },
    ],
  },
  {
    matricula: 'MAT-102',
    nome: 'Bruno Souza',
    cursos: [
      { codigo: 'INT-OP-01', nome: 'Integração Operacional', dataConclusao: '2025-12-10', cargaHoraria: 8, reciclagemMeses: 24 },
      { codigo: 'NR12-BASE', nome: 'NR-12 Básico', dataConclusao: '2024-06-15', cargaHoraria: 4, reciclagemMeses: 12 },
    ],
  },
  {
    matricula: 'MAT-103',
    nome: 'Carla Duarte',
    cursos: [
      { codigo: 'COORD-RH', nome: 'Coordenação de RH - Gestão Estratégica', dataConclusao: '2025-10-05', cargaHoraria: 24, reciclagemMeses: 36 },
      { codigo: 'CLT-ADV', nome: 'CLT Avançada - Rotinas Jurídicas', dataConclusao: '2025-11-30', cargaHoraria: 16, reciclagemMeses: 24 },
      { codigo: 'COM-EXEC', nome: 'Comunicação Executiva', dataConclusao: '2026-01-15', cargaHoraria: 12, reciclagemMeses: 24 },
    ],
  },
  {
    matricula: 'MAT-104',
    nome: 'Daniel Lima',
    cursos: [
      { codigo: 'INT-OP-01', nome: 'Integração Operacional', dataConclusao: '2026-02-20', cargaHoraria: 8, reciclagemMeses: 24 },
      { codigo: 'NR12-BASE', nome: 'NR-12 Básico', dataConclusao: '2025-03-15', cargaHoraria: 4, reciclagemMeses: 12 },
    ],
  },
  {
    matricula: 'MAT-105',
    nome: 'Eduardo Costa',
    cursos: [
      { codigo: 'GROW-01', nome: 'Growth Marketing Fundamentos', dataConclusao: '2025-09-20', cargaHoraria: 16, reciclagemMeses: 12 },
      { codigo: 'AB-TEST', nome: 'A/B Testing e Métricas', dataConclusao: '2025-10-10', cargaHoraria: 12, reciclagemMeses: 6 },
      { codigo: 'ANA-DATA', nome: 'Analytics Avançada', dataConclusao: '2026-03-05', cargaHoraria: 16, reciclagemMeses: 12 },
    ],
  },
  {
    matricula: 'MAT-106',
    nome: 'Fernanda Rocha',
    cursos: [
      { codigo: 'LID-01', nome: 'Liderança Situacional', dataConclusao: '2025-08-15', cargaHoraria: 16, reciclagemMeses: 36 },
      { codigo: 'NR12-ADV', nome: 'NR-12 Avançado', dataConclusao: '2024-11-20', cargaHoraria: 8, reciclagemMeses: 12 },
      { codigo: '5S-GEST', nome: '5S na Gestão de Equipes', dataConclusao: '2025-12-05', cargaHoraria: 4, reciclagemMeses: 24 },
    ],
  },
  {
    matricula: 'MAT-107',
    nome: 'Gabriel Santos',
    cursos: [
      { codigo: 'OP-MAT', nome: 'Operações na Matriz', dataConclusao: '2025-07-10', cargaHoraria: 12, reciclagemMeses: 24 },
      { codigo: 'SGSO', nome: 'Segurança e Saúde Ocupacional', dataConclusao: '2024-05-20', cargaHoraria: 8, reciclagemMeses: 12 },
      { codigo: 'PROC-OPS', nome: 'Processos Operacionais', dataConclusao: '2025-09-12', cargaHoraria: 16, reciclagemMeses: 12 },
    ],
  },
  {
    matricula: 'MAT-108',
    nome: 'Helena Oliveira',
    cursos: [
      { codigo: 'DES-ADV', nome: 'Design Avançado - Responsive', dataConclusao: '2024-03-15', cargaHoraria: 20, reciclagemMeses: 24 },
      { codigo: 'FIG-PRO', nome: 'Figma Profissional', dataConclusao: '2024-05-20', cargaHoraria: 12, reciclagemMeses: 12 },
    ],
  },
];
