# Implementation Plan — Resolver Todas 40 Problemáticas

**Estratégia**: Usar SGFaturamentoAttosView como template, adaptar para cada aba

---

## WAVE 1: SERVIÇOS GERAIS (SG) — 13 abas

### SG-1: Notas Fiscais
**Gap**: Sem importação, filtros limitados, sem exportação  
**Atual**: Kanban drag-drop funciona  
**Solução**:
- [x] Manter kanban
- [ ] Adicionar ImportarPlanilhaButton (importa NFs de arquivo)
- [ ] Adicionar filtro por fornecedor, período, status
- [ ] Adicionar botão Exportar (NFs atrasadas)
- [ ] Adicionar edição inline (data, valor)

**Arquivo**: `src/features/servicos-gerais/financeiro/SGFinanceiroViews.tsx:123-236`  
**Tempo**: 2h  
**Deps**: ImportarPlanilhaButton (existe)

---

### SG-2/4: Conciliação Acessos
**Gap**: Read-only, sem edição, sem bulk, sem exportação  
**Atual**: Tabela mostra divergências  
**Solução**:
- [ ] Adicionar checkboxes de seleção
- [ ] Adicionar bulk actions: "Marcar como resolvido", "Exportar divergências"
- [ ] Adicionar edição inline (tipo faturamento: Elo/Posigraf)
- [ ] Adicionar filtro por tipo divergência
- [ ] Adicionar rastreamento (quem marcou como resolvido)

**Arquivo**: `src/features/servicos-gerais/financeiro/SGFinanceiroViews.tsx:238-300`  
**Tempo**: 2h  
**Deps**: Edição inline pattern (usar Faturamento como template)

---

### SG-5: Controle de Compras
**Gap**: Read-only, sem CRUD, sem importação  
**Atual**: Tabela com Mês, Categoria, Valor  
**Solução**:
- [ ] Implementar CRUD completo (criar, editar, deletar)
- [ ] Adicionar ImportarPlanilhaButton
- [ ] Adicionar checkboxes + bulk delete
- [ ] Adicionar filtro por categoria, período
- [ ] Adicionar exportação para relatório
- [ ] Adicionar gráfico de evolução mensal

**Arquivo**: `src/features/servicos-gerais/financeiro/SGFinanceiroViews.tsx:302-351`  
**Tempo**: 3h  
**Deps**: Gráfico library (verificar se existe)

---

### SG-6: Fechamento Attos
**Gap**: Read-only, sem importação, sem exportação  
**Atual**: Tabela com períodos, totais, status  
**Solução**:
- [ ] Adicionar ImportarPlanilhaButton
- [ ] Adicionar edição inline (status: pendente → conciliado → divergente)
- [ ] Adicionar checkboxes + bulk mark como "conciliado"
- [ ] Adicionar exportação de fechamento
- [ ] Adicionar filtro por status, período
- [ ] Adicionar rastreamento

**Arquivo**: `src/features/servicos-gerais/financeiro/SGFinanceiroViews.tsx:400-452`  
**Tempo**: 2h

---

### SG-7: Benefícios (VT + Estacionamento)
**Gap**: Detecta duplicatas mas sem edição  
**Atual**: Tabela mostra redundância  
**Solução**:
- [ ] Adicionar checkboxes
- [ ] Adicionar bulk action: "Marcar como revisado"
- [ ] Adicionar edição (desabilitar benefício em massa)
- [ ] Adicionar filtro por tipo benefício
- [ ] Melhorar exportação (já existe parcialmente)

**Arquivo**: `src/features/servicos-gerais/logistica/SGLogisticaViews.tsx:297-407`  
**Tempo**: 1.5h

---

### SG-7b: Estacionamento + VT (GRID)
**Gap**: Sem integração automática  
**Atual**: Mostra lista de vagas  
**Solução**:
- [ ] Adicionar integração com SG-7 (marca automático)
- [ ] Adicionar indicador visual de quem usa ambos
- [ ] Adicionar bulk assign/remove de vaga

**Arquivo**: `src/features/servicos-gerais/logistica/SGEstacionamentoView.tsx`  
**Tempo**: 2h

---

### SG-8: Armários Vestiário
**Gap**: Tem seleção mas sem importação, sem integração automática  
**Atual**: Mapa visual, botão "Liberar todos"  
**Solução**:
- [ ] Adicionar ImportarPlanilhaButton (importa desligados)
- [ ] Adicionar auto-detecção de desligados → armários liberados automático
- [ ] Adicionar histórico de liberações
- [ ] Adicionar filtro por status, setor

**Arquivo**: `src/features/servicos-gerais/logistica/SGLogisticaViews.tsx:408-510`  
**Tempo**: 2h

---

### SG-9: Satisfação Attos
**Gap**: Mock puro, sem integração com Forms  
**Atual**: Card mostra "4.62" (número fixo)  
**Solução**:
- [ ] Adicionar simulação de importação de Forms (resposta simulada)
- [ ] Adicionar histórico diário
- [ ] Adicionar gráfico de evolução
- [ ] Adicionar filtro por período
- [ ] Adicionar exportação de relatório

**Arquivo**: `src/features/servicos-gerais/logistica/SGLogisticaViews.tsx:511-542`  
**Tempo**: 2h

---

### SG-10: Café — Abastecimento
**Gap**: Read-only, sem integração com Forms  
**Atual**: Lista com status ok/fail  
**Solução**:
- [ ] Adicionar botão "Marcar como abastecido"
- [ ] Adicionar filtro por status
- [ ] Adicionar histórico de abastecimentos
- [ ] Simular importação de Forms
- [ ] Adicionar alertas (não abastecido por X dias)

**Arquivo**: `src/features/servicos-gerais/logistica/SGLogisticaViews.tsx:672-750`  
**Tempo**: 1.5h

---

### SG-11: Chamados Manusis
**Gap**: Read-only, sem edição, sem bulk, sem notificação  
**Atual**: Tabela com titulo, vencimento, status  
**Solução**:
- [ ] Adicionar checkboxes + bulk mark como "concluído"
- [ ] Adicionar edição inline (SLA, responsável)
- [ ] Adicionar filtro por status, área
- [ ] Adicionar exportação de atrasados
- [ ] Adicionar rastreamento

**Arquivo**: `src/features/servicos-gerais/logistica/SGLogisticaViews.tsx:543-670`  
**Tempo**: 2h

---

### SG-13: Voucher de Natal
**Gap**: Distribui mas sem rastreamento  
**Atual**: Mostra "Enviado com sucesso"  
**Solução**:
- [ ] Adicionar simulação de QR Code
- [ ] Adicionar histórico de distribuição
- [ ] Adicionar status de resgate
- [ ] Adicionar filtro por status
- [ ] Adicionar exportação de relatório de uso

**Arquivo**: `src/features/servicos-gerais/shared/SGVoucherView.tsx`  
**Tempo**: 2h

---

## WAVE 2: DHO & COMUNICAÇÃO (DHO) — 9 abas

### DHO-1: Indicadores
**Gap**: Tudo é mock, sem cálculo real  
**Atual**: Cards com números fixos  
**Solução**:
- [ ] Implementar cálculo real de Hora-Homem a partir de lançamentos
- [ ] Adicionar histórico mensal
- [ ] Adicionar gráfico de evolução
- [ ] Adicionar exportação de relatório
- [ ] Integrar com DHO-3 (lançamentos)

**Arquivo**: `src/features/dho/DHOViews.tsx:92-168`  
**Tempo**: 3h

---

### DHO-2: Listas de Presença
**Gap**: Captura digital OK, mas sem importação de lista  
**Atual**: Checkboxes para marcar presença  
**Solução**:
- [ ] Adicionar ImportarPlanilhaButton (importa lista de colaboradores)
- [ ] Adicionar auto-export para DHO-3 (lançamento em lote)
- [ ] Adicionar filtro por treinamento
- [ ] Adicionar assinatura digital (simulada)
- [ ] Adicionar rastreamento

**Arquivo**: `src/features/dho/DHOViews.tsx:170-396`  
**Tempo**: 2h

---

### DHO-3: Lançamento em Lote
**Gap**: Grid funciona mas sem importação, sem validação  
**Atual**: Grid colaborador × treinamento com checkboxes  
**Solução**:
- [ ] Integrar auto-import de DHO-2 (presença)
- [ ] Adicionar validação (duplicatas, data inválida)
- [ ] Adicionar bulk mark/unmark por linha/coluna
- [ ] Adicionar undo/redo
- [ ] Adicionar exportação de relatório
- [ ] Integrar com DHO-1 (atualiza indicadores)

**Arquivo**: `src/features/dho/DHOViews.tsx:398-541`  
**Tempo**: 3h

---

### DHO-4: Trilhas para Movimentações
**Gap**: Mostra dados mas sem auto-disparo  
**Atual**: Lista movimentações com trilhas  
**Solução**:
- [ ] Integrar com HR-1.5 (quando cria movimento, dispara automático)
- [ ] Adicionar edição em massa de trilhas
- [ ] Adicionar bulk mark como "iniciado"
- [ ] Adicionar filtro por status
- [ ] Adicionar rastreamento

**Arquivo**: `src/features/dho/DHOViews.tsx:717-978`  
**Tempo**: 3h

---

### DHO-5: Cursos por Colaborador
**Gap**: Lista OK mas sem ações em massa  
**Atual**: Abas "Trilhas por Cargo" e "Trilhas Individuais"  
**Solução**:
- [ ] Adicionar checkboxes (selecionar colaboradores/cursos)
- [ ] Adicionar bulk mark como "concluído"
- [ ] Adicionar bulk assign novo curso
- [ ] Adicionar filtro por status, cargo
- [ ] Adicionar exportação de pendências
- [ ] Adicionar notificação simulada ao colaborador

**Arquivo**: `src/features/dho/DHOViews.tsx:543-715`  
**Tempo**: 2.5h

---

### DHO-6: Portal do Gestor
**Gap**: Mock puro, sem formulário real  
**Atual**: Listinha fake de solicitações  
**Solução**:
- [ ] Implementar formulário real de solicitação
- [ ] Adicionar status workflow (solicitado → aprovado → agendado)
- [ ] Adicionar edição (mudar data, curso)
- [ ] Adicionar integração com calendário
- [ ] Adicionar notificação ao gestor

**Arquivo**: `src/features/dho/DHOViews.tsx:980-1037`  
**Tempo**: 3h

---

### DHO-7: Comunicados T&D
**Gap**: Mock puro, sem publicação  
**Atual**: Listinha fake  
**Solução**:
- [ ] Implementar formulário de criar comunicado
- [ ] Adicionar status (rascunho → publicado → arquivado)
- [ ] Adicionar integração com WhatsApp (simulada)
- [ ] Adicionar confirmação de presença
- [ ] Adicionar histórico de publicação

**Arquivo**: `src/features/dho/DHOViews.tsx:1039-1083`  
**Tempo**: 3h

---

### DHO-8: Consultoria Interna
**Gap**: Mock puro, sem formulário  
**Atual**: Card fake  
**Solução**:
- [ ] Implementar formulário de solicitação
- [ ] Adicionar fila de priorização
- [ ] Adicionar atribuição a consultor
- [ ] Adicionar status (aberta → em andamento → fechada)
- [ ] Adicionar integração com calendário
- [ ] Adicionar histórico de atendimentos

**Arquivo**: `src/features/dho/DHOViews.tsx:1226-1300`  
**Tempo**: 3h

---

## WAVE 3: RECRUTAMENTO & SELEÇÃO (HR) — 18 abas

### HR-1.1: Vagas
**Gap**: CRUD OK mas sem importação em lote  
**Atual**: Formulário + listagem  
**Solução**:
- [ ] Adicionar ImportarPlanilhaButton
- [ ] Adicionar bulk edit (SLA, turno para múltiplas vagas)
- [ ] Adicionar auto-preenchimento (turno → horário automático)
- [ ] Adicionar exportação para template Carta
- [ ] Integrar com HR-1.3 (Uniformes)

**Arquivo**: `src/features/hr/recrutamento/vagas/index.tsx`  
**Tempo**: 2.5h

---

### HR-1.2: Auxiliares
**Gap**: CRUD OK mas sem importação  
**Atual**: Formulário + listagem  
**Solução**:
- [ ] Adicionar ImportarPlanilhaButton
- [ ] Adicionar edição em grid
- [ ] Adicionar bulk delete
- [ ] Integrar com HR-1.3 (Uniformes)

**Arquivo**: `src/features/hr/recrutamento/auxiliares/...`  
**Tempo**: 2h

---

### HR-1.3: Uniformes
**Gap**: CRUD OK mas sem auto-vinculação com Vagas  
**Atual**: Formulário + listagem  
**Solução**:
- [ ] Adicionar ImportarPlanilhaButton
- [ ] Adicionar auto-preenchimento de vaga (dropdown de vagas)
- [ ] Adicionar edição em grid
- [ ] Adicionar filtro por vaga
- [ ] Exportar para confecção

**Arquivo**: `src/features/hr/operacoes/uniformes/index.tsx`  
**Tempo**: 2h

---

### HR-1.4: Matrículas
**Gap**: CRUD OK mas sem auto-preenchimento  
**Atual**: Formulário + listagem  
**Solução**:
- [ ] Adicionar ImportarPlanilhaButton
- [ ] Adicionar auto-preenchimento de matrícula (integração simulada com folha)
- [ ] Adicionar validação de duplicata
- [ ] Adicionar edição em grid
- [ ] Exportar para folha

**Arquivo**: `src/features/hr/admissoes/matriculas/...`  
**Tempo**: 2h

---

### HR-1.5: Movimentação Interna
**Gap**: Formulário OK mas sem importação, sem auto-disparo de trilhas  
**Atual**: Criação + listagem  
**Solução**:
- [ ] Adicionar ImportarPlanilhaButton
- [ ] Auto-disparo de DHO-4 (quando cria movimento)
- [ ] Adicionar validação de dupla movimentação
- [ ] Adicionar filtro por tipo, setor
- [ ] Exportar histórico

**Arquivo**: `src/features/hr/operacoes/movimentacoes/...`  
**Tempo**: 2.5h

---

### HR-1.6: Desligamentos
**Gap**: Listagem OK mas sem auto-sincronização com Pessoal  
**Atual**: Lista desligados  
**Solução**:
- [ ] Simular importação de Pessoal (arquivo automático)
- [ ] Auto-vinculação com SG-8 (liberar armários)
- [ ] Auto-cálculo de turnover por setor
- [ ] Adicionar filtro por motivo, período
- [ ] Exportar consolidado

**Arquivo**: `src/features/hr/operacoes/desligamentos/...`  
**Tempo**: 2h

---

### HR-2: Quadro de Equipes
**Gap**: Visualização OK mas sem edição em grid  
**Atual**: Grid read-only  
**Solução**:
- [ ] Adicionar edição em grid (arrastar, trocar turno)
- [ ] Adicionar ImportarPlanilhaButton
- [ ] Adicionar bulk mudança de turno
- [ ] Integração com HR-1.5 (registra movimento)
- [ ] Adicionar sincronização visual em tempo real

**Arquivo**: `src/features/hr/command-center/quadro-equipes/...`  
**Tempo**: 3h

---

### HR-3: Temporários
**Gap**: Listagem OK mas sem alertas  
**Atual**: Lista com data de contrato  
**Solução**:
- [ ] Adicionar ImportarPlanilhaButton
- [ ] Adicionar edição inline (data de término)
- [ ] Adicionar alertas de renovação (30 dias)
- [ ] Adicionar filtro por status (ativo, vencer em 30d, vencido)
- [ ] Exportar pendências

**Arquivo**: `src/features/hr/operacoes/temporarios/...`  
**Tempo**: 2h

---

### HR-4: Indicadores
**Gap**: Tudo é mock, sem cálculo real  
**Atual**: Cards com números fixos  
**Solução**:
- [ ] Implementar cálculo real de turnover, absenteísmo, etc
- [ ] Integrar com folha de pagamento (simulada)
- [ ] Adicionar filtro por período, setor
- [ ] Adicionar gráfico de evolução
- [ ] Adicionar exportação de relatório

**Arquivo**: `src/features/hr/analytics/indicadores/...`  
**Tempo**: 4h

---

### HR-5: Documentos (Carta + Declaração)
**Gap**: Gera mas sem auto-preenchimento 100%  
**Atual**: Formulário + preview  
**Solução**:
- [ ] Integrar com HR-1.1 (auto-preenche de Vagas)
- [ ] Adicionar geração em lote
- [ ] Adicionar integração com assinatura digital (simulada)
- [ ] Adicionar template customizável
- [ ] Exportar em PDF/DOCX

**Arquivo**: `src/features/hr/admissoes/documentos/...`  
**Tempo**: 3h

---

### HR-6: Banco de Indicações
**Gap**: Não implementado  
**Atual**: Não existe  
**Solução**:
- [ ] Criar novo módulo
- [ ] Formulário de indicação (nome, cargo, referenciador)
- [ ] Listagem com filtro
- [ ] Status (indicado → entrevistado → contratado)
- [ ] Relatório de efetividade

**Arquivo**: `src/features/hr/recrutamento/indicacoes/index.tsx` (novo)  
**Tempo**: 3h

---

### HR-7: Descrição de Cargos
**Gap**: Não implementado  
**Atual**: Não existe  
**Solução**:
- [ ] Criar novo módulo
- [ ] CRUD de cargos (descrição, requisitos, trilhas obrigatórias)
- [ ] ImportarPlanilhaButton
- [ ] Versionamento de descrição
- [ ] Integração com DHO-5 (requisitos de curso)

**Arquivo**: `src/features/hr/operacoes/descricao-cargos/index.tsx` (novo)  
**Tempo**: 3h

---

### HR-8: Triagem com IA
**Gap**: Não implementado  
**Atual**: Não existe  
**Solução**:
- [ ] Criar novo módulo
- [ ] Upload de currículo
- [ ] Análise simulada (requisitos match)
- [ ] Score de candidato
- [ ] Comparação com requisitos de vaga
- [ ] Listagem ordenada por score

**Arquivo**: `src/features/hr/recrutamento/triagem-ia/index.tsx` (novo)  
**Tempo**: 4h

---

### HR-9: WhatsApp Centralizado
**Gap**: Não implementado  
**Atual**: Não existe  
**Solução**:
- [ ] Criar novo módulo
- [ ] Formulário para enviar mensagem
- [ ] Listagem de candidatos/colaboradores
- [ ] Template de mensagens
- [ ] Histórico de mensagens
- [ ] Automações (confirmação presença, etc)

**Arquivo**: `src/features/comunicacao/whatsapp/index.tsx` (novo)  
**Tempo**: 4h

---

## 📊 RESUMO DE ESFORÇO

| Wave | Módulo | Abas | Tempo Total |
|------|--------|------|------------|
| 1 | SG | 13 | 24h |
| 2 | DHO | 9 | 27h |
| 3 | HR | 18 | 39h |
| **TOTAL** | | **40** | **90h** |

---

## 🚀 ESTRATÉGIA DE IMPLEMENTAÇÃO

### Fase 1: Setup (1h)
- Expandir mock data para todas abas
- Criar tipos TypeScript
- Preparar estructura de pastas

### Fase 2: Wave 1 (SG) — 24h
- Implementar em paralelo (3 abas × 2-3h cada)
- Testar cada uma
- Deploy SG completo

### Fase 3: Wave 2 (DHO) — 27h
- Implementar em paralelo
- Integrar com Wave 1 (DHO-4 ← HR-1.5)
- Deploy DHO completo

### Fase 4: Wave 3 (HR) — 39h
- Implementar em paralelo
- Integrar com Wave 1 e 2 (movimento → trilhas, etc)
- Deploy HR completo

### Fase 5: Validação (4h)
- Teste E2E de workflows
- Documentação
- Deploy final

---

## ✅ CHECKLIST

### Por fazer
- [ ] Wave 1: SG (13 abas)
- [ ] Wave 2: DHO (9 abas)
- [ ] Wave 3: HR (18 abas)
- [ ] Testes E2E
- [ ] Deploy

### Próximos passos
1. Começar com Wave 1 (SG) — mais simples
2. Usar padrão SGFaturamentoAttosView como template
3. Implementar em paralelo (máx 3-4 abas simultâneas)
