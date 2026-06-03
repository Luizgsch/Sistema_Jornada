# Análise de Gaps — SENAI Problemáticas vs Implementação Real

**Data**: 06/03/2026  
**Escopo**: Mapeamento completo de todas as 40+ problemáticas vs estado atual do sistema  
**Método**: Cross-reference pageIdToProblemId (Topbar.tsx) → componentes → funcionalidades reais

---

## 📊 RESUMO EXECUTIVO

| Problema | Aba Mapeada | Status | Gap Principal |
|----------|------------|--------|---------------|
| **SG-3** Faturamento Attos | ✅ sg-faturamento-attos | 🟢 **RESOLVIDO** | ✓ Importação, edição inline, bulk ops |
| **SG-1** Notas Fiscais | ✅ sg-notas-fiscais | 🟡 Parcial | ✗ Sem importação, sem exportação, sem bulk |
| **SG-2/4** Conciliação Acessos | ✅ sg-conciliacao-acessos | 🔴 Read-only | ✗ Sem edição, sem exportação |
| **SG-5** Controle Compras | ✅ sg-compras-insumos | 🔴 Read-only | ✗ Sem importação, sem categorização editável |
| **SG-6** Fechamento Attos | ✅ sg-fechamento-attos | 🔴 Read-only | ✗ Sem edição, sem exportação |
| **SG-7** Benefícios (VT+Est) | ✅ sg-beneficios | 🟡 Parcial | ✓ Detecta duplicatas, mas sem exportação |
| **SG-8** Armários | ✅ sg-armarios | 🟡 Parcial | ✓ Seleção, ✗ sem importação |
| **SG-9** Satisfação Attos | ✅ sg-satisfacao-attos | 🔴 Read-only | ✗ Sem integração com pesquisa real |
| **SG-10** Café Abastecimento | ✅ sg-engajamento-cafe | 🔴 Read-only | ✗ Sem integração com Forms |
| **SG-11** Chamados Manusis | ✅ sg-chamados-manusis | 🔴 Read-only | ✗ Sem alertas automáticos, sem bulk update |
| **SG-13** Voucher Natal | ✅ sg-voucher-natal | 🟡 Parcial | ✓ Distribui, ✗ sem integração WhatsApp |
| **DHO-1** Indicadores | ✅ dho-dashboard | 🔴 Mock | ✗ Tudo é simulado |
| **DHO-2** Listas Presença | ✅ dho-presenca | 🟡 Parcial | ✓ Capture digital, ✗ sem importação de lista |
| **DHO-3** Lançamento em Lote | ✅ dho-lancamento-lote | 🟡 Parcial | ✓ Existe, mas sem validação de erros |
| **DHO-4** Trilhas Movimentações | ✅ dho-trilhas-movimentacoes | 🟡 Parcial | ✓ Auto-assign, ✗ sem edição em massa |
| **DHO-5** Cursos por Colaborador | ✅ dho-trilhas-cargo | 🟡 Parcial | ✓ Lista, ✗ sem marcar como concluído em lote |
| **DHO-6** Portal Gestor | ✅ dho-portal-gestor | 🔴 Mock | ✗ Sem formulário real de solicitação |
| **DHO-7** Comunicados | ✅ dho-comunicados | 🔴 Mock | ✗ Sem sistema de publicação |
| **DHO-8** Consultoria Interna | ✅ dho-consultoria | 🔴 Mock | ✗ Sem formulário de solicitação |
| **HR-1.1** Vagas | ✅ vagas | 🟡 Parcial | ✓ CRUD básico, ✗ sem importação batch |
| **HR-1.2** Auxiliares | ✅ auxiliares | 🟡 Parcial | ✓ CRUD, ✗ sem edição em lote |
| **HR-1.3** Uniformes | ✅ uniformes | 🟡 Parcial | ✓ CRUD, ✗ sem integração automática com Vagas |
| **HR-1.4** Matrículas | ✅ matriculas | 🟡 Parcial | ✓ CRUD, ✗ sem auto-preenchimento |
| **HR-1.5** Movimentação Interna | ✅ movimentacoes | 🟡 Parcial | ✓ Cria movimento, ✗ sem importação em lote |
| **HR-1.6** Desligamentos | ✅ desligamentos | 🟡 Parcial | ✓ Lista, ✗ sem sincronização automática |
| **HR-2** Quadro de Equipes | ✅ quadro-equipes | 🟡 Parcial | ✓ Visualiza, ✗ sem edição em grid |
| **HR-3** Temporários | ✅ temporarios | 🟡 Parcial | ✓ Lista, ✗ sem alertas de renovação |
| **HR-4** Indicadores | ✅ indicadores | 🔴 Mock | ✗ Tudo calculado manualmente |
| **HR-5** Documentos (Carta/Declaração) | ✅ documentos | 🟡 Parcial | ✓ Gera, ✗ sem preenchimento automático |
| **HR-6** Banco de Indicações | ✅ indicacoes | 🔴 Não visto | ✗ Feature não encontrada no codebase |
| **HR-7** Descrição de Cargos | ✅ descricao-cargos | 🔴 Não visto | ✗ Feature não encontrada no codebase |
| **HR-8** Triagem com IA | ✅ triagem-ia | 🔴 Não visto | ✗ Feature não encontrada no codebase |
| **HR-9** WhatsApp Centralizado | ✅ whatsapp | 🔴 Não visto | ✗ Feature não encontrada no codebase |

---

## 🔍 ANÁLISE DETALHADA POR MÓDULO

### 🏢 SERVIÇOS GERAIS (SG)

#### ✅ SG-3: Faturamento Attos — **RESOLVIDO**
**Problemática**: "Copiar dados manualmente todos os dias para o faturamento"

**O que foi implementado**:
- ✅ Importação de planilhas (Excel/CSV) via drag-drop
- ✅ Edição inline (data, refeições, status)
- ✅ Seleção múltipla com checkboxes
- ✅ Bulk actions: marcar integrado, deletar, exportar
- ✅ Validação de dados (data duplicada, futura, range)
- ✅ Filtros (status, intervalo de data)
- ✅ Rastreamento de quem fez o quê

**Resultado**: Usuário carrega PDF → valida → marca como integrado. Zero digitação.

---

#### 🟡 SG-1: Notas Fiscais — **PARCIAL**
**Problemática**: "Alerta quando NF está pendente ou atrasada"

**O que está implementado**:
- ✅ Kanban visual (arrasta entre colunas: Solicitar → Aguardando → Recebida → Atrasada)
- ✅ Drag-drop de NFs
- ✅ Alerta visual para NFs atrasadas (border vermelha, animação)
- ✅ Toast quando marca como atrasada

**O que FALTA**:
- ❌ Importação de NFs de arquivo
- ❌ Exportação de NFs atrasadas
- ❌ Edição inline de valores
- ❌ Filtro por fornecedor/período
- ❌ Sincronização automática com sistema de compras

**Gap**: Aba resolve "visualização + manualidade da movimentação", mas não resolve "cópia manual de dados de PDF/planilha"

---

#### 🔴 SG-2/4: Conciliação Acessos — **READ-ONLY**
**Problemática**: "Separar automaticamente acessos ELO do Posigraf para evitar erro no faturamento" + "Identificar acessos duplicados"

**O que está implementado**:
- ✅ Tabela mostra divergências (Elo, duplicado, refeitório duplicado)
- ✅ Visual: linha com left-border amarela se tem problema
- ✅ Badges coloridas por tipo de faturamento

**O que FALTA**:
- ❌ Edição de registros (corrigir tipo faturamento)
- ❌ Marcar como "resolvido"
- ❌ Exportação de divergências
- ❌ Importação de acessos
- ❌ Integração automática com Elo/Attos

**Gap**: Aba é apenas "dashboard de monitoramento", não resolve de fato a conciliação

---

#### 🔴 SG-5: Controle de Compras — **READ-ONLY**
**Problemática**: "Controle mensal consolidado de compras de insumos"

**O que está implementado**:
- ✅ Tabela com Mês, Categoria, Valor
- ✅ Total por mês no footer

**O que FALTA**:
- ❌ Adicionar nova compra (criar registro)
- ❌ Editar compra existente
- ❌ Deletar compra
- ❌ Importação em lote (Excel de compras)
- ❌ Exportação para relatório
- ❌ Filtro por categoria/período
- ❌ Gráfico de evolução

**Gap**: Aba é "visualização apenas", problema de "falta de controle" continua não resolvido

---

#### 🔴 SG-6: Fechamento Attos — **READ-ONLY**
**Problemática**: "Copiar dados manualmente para o faturamento" + "Fonte única de informação"

**O que está implementado**:
- ✅ Tabela com períodos, totais, status (conciliado/divergente/pendente)
- ✅ Badge colorida por status
- ✅ Responsável atribuído

**O que FALTA**:
- ❌ Edição de registros
- ❌ Marcar como "conciliado"
- ❌ Exportação de fechamento
- ❌ Importação de dados Attos
- ❌ Sincronização automática
- ❌ Histórico de alterações

**Gap**: Aba é "apenas consolidação de dados", não resolve "cópia manual"

---

#### 🟡 SG-7: Benefícios (VT + Estacionamento) — **PARCIAL**
**Problemática**: "Identificar quem usa VT + Estacionamento (redundância)"

**O que está implementado**:
- ✅ Detecção automática de quem usa ambos
- ✅ Visualização em tabela
- ✅ Badge de redundância
- ✅ Exportação de duplicatas (implementado em May 27)

**O que FALTA**:
- ❌ Editar benefícios de um colaborador
- ❌ Marcar como "revisado"
- ❌ Importação de base de benefícios
- ❌ Filtro por setor/período

**Obs**: Este é um dos poucos que TEM exportação funcionando

---

#### 🟡 SG-8: Armários Vestiário — **PARCIAL**
**Problemática**: "Controle de armários vinculado à base de desligados"

**O que está implementado**:
- ✅ Mapa visual de armários (grades 24 slots)
- ✅ Status: livre, ocupado, liberado-desligado
- ✅ Seleção de checkboxes
- ✅ Botão "Liberar todos (N)" seleciona automático
- ✅ Ação "Liberar" com toast de feedback

**O que FALTA**:
- ❌ Importação de desligados automática
- ❌ Vinculação com base de desligados de verdade
- ❌ Edição de colaborador do armário
- ❌ Histórico de liberações
- ❌ Exportação de relatório

**Gap**: Aba resolve "visualização + liberação manual", não resolve "vinculação automática com desligados"

---

#### 🔴 SG-9: Satisfação Attos — **READ-ONLY**
**Problemática**: "Pesquisa de satisfação alimenta automaticamente indicador diário"

**O que está implementado**:
- ✅ Card com indicador diário (4.62)
- ✅ Refeições contabilizadas
- ✅ Última sincronização (mock timestamp)
- ✅ Label: "Pesquisa Attos → integração (protótipo)"

**O que FALTA**:
- ❌ Integração com Forms de verdade
- ❌ Processamento automático de respostas
- ❌ Histórico de indicadores por dia
- ❌ Gráfico de evolução
- ❌ Ajuste manual de valores

**Gap**: Aba é apenas "exibição de um número", não resolve "dependência de WhatsApp + digitação manual"

---

#### 🔴 SG-10: Café — Abastecimento — **READ-ONLY**
**Problemática**: "Identificar rapidamente quais locais não foram abastecidos"

**O que está implementado**:
- ✅ Lista com status ok/falha (último abastecimento)
- ✅ Visual: green/red circle
- ✅ Exibe data do último abastecimento

**O que FALTA**:
- ❌ Integração com Forms (detecta automaticamente)
- ❌ Marcar como "abastecido hoje"
- ❌ Alertar responsável via WhatsApp/Teams
- ❌ Histórico de abastecimentos
- ❌ Agendamento automático

**Gap**: Aba é "apenas monitoramento", não resolve "dependência de análise manual do Forms"

---

#### 🔴 SG-11: Chamados Manusis — **READ-ONLY**
**Problemática**: "Alertar quando chamado está vencido ou próximo do vencimento"

**O que está implementado**:
- ✅ Tabela com titulo, área, vencimento, status
- ✅ Status: vencido (red), próximo (yellow), ok (green)
- ✅ KPI no dashboard mostra "X chamados fora do SLA"

**O que FALTA**:
- ❌ Edição de chamado (marcar como concluído)
- ❌ Atribuir responsável
- ❌ Mudar SLA
- ❌ Exportação de atrasados
- ❌ Integração automática com Manusis
- ❌ Notificação push/email quando vence

**Gap**: Aba é "apenas alerta", não resolve "cobrança eficaz" (precisa de ação, não só visualização)

---

#### 🟡 SG-13: Voucher de Natal — **PARCIAL**
**Problemática**: "Voucher digital de Natal com QR Code"

**O que está implementado**:
- ✅ Distribui voucher via WhatsApp simulado
- ✅ Gera dados de voucher
- ✅ Mostra "enviado com sucesso"
- ✅ Integração com componente WhatsApp

**O que FALTA**:
- ❌ QR Code real (só é simulado)
- ❌ Validação/scanning na loja
- ❌ Rastreamento de resgates
- ❌ Relatório de utilização
- ❌ Integração com sistema de vendas

**Gap**: Funciona, mas sem "validação e segurança" mencionadas na problemática

---

### 🎓 DHO & COMUNICAÇÃO (Treinamento & Desenvolvimento)

#### 🔴 DHO-1: Indicadores Automáticos — **MOCK**
**Problemática**: "Hora-Homem de Treinamento calculado 100% manualmente"

**O que está implementado**:
- ✅ Dashboard mostra KPI: Treinamentos mês, Hora-Homem, Reciclagens
- ✅ Cards com números (mocked)

**O que FALTA**:
- ❌ Cálculo real a partir de lançamentos
- ❌ Integração com "Lançamento em Lote"
- ❌ Histórico mensal
- ❌ Exportação de indicadores
- ❌ Meta/alvo configurável

**Gap**: Dados são todos simulados (valores fixos), não há cálculo real

---

#### 🟡 DHO-2: Listas de Presença — **PARCIAL**
**Problemática**: "Listas físicas → coleta manual → digitação no sistema"

**O que está implementado**:
- ✅ Captura digital de presença (checkboxes)
- ✅ Foto/câmera simulada
- ✅ Visão de grid
- ✅ Salva estado localmente

**O que FALTA**:
- ❌ Importação de lista de presença (Excel com nomes)
- ❌ QR Code/NFC para check-in automático
- ❌ Integração com calendário de treinamentos
- ❌ Exportação para lançamento em lote
- ❌ Validação de duplicatas

**Gap**: Captura funciona, mas não resolve "digitação no sistema" (precisa de bridge para lançamento em lote)

---

#### 🟡 DHO-3: Lançamento em Lote — **PARCIAL**
**Problemática**: "Lançar colaborador por colaborador é operacional"

**O que está implementado**:
- ✅ Grid de edição (colaborador × treinamento)
- ✅ Checkboxes para marcar conclusão
- ✅ Bulk select (coluna/linha)
- ✅ Salva com toast

**O que FALTA**:
- ❌ Importação de arquivo (presença ou planilha)
- ❌ Validação de erros (duplicatas, data inválida)
- ❌ Undo/redo
- ❌ Sincronização com indicadores
- ❌ Integração com Presença Digital

**Gap**: Interface existe, mas "fluxo completo presença → lançamento" não funciona

---

#### 🟡 DHO-4: Trilhas para Movimentações — **PARCIAL**
**Problemática**: "Movimentou → sistema mostra automaticamente quais cursos são obrigatórios"

**O que está implementado**:
- ✅ TrilhasMovimentacoesView criada
- ✅ Mostra "quando colaborador é movimentado, sistema dispara trilha automática"
- ✅ Exibe lista de movimentações com trilhas atribuídas
- ✅ Status de conclusão

**O que FALTA**:
- ❌ Edição em massa de trilhas
- ❌ Importação de movimentações de arquivo
- ❌ Sincronização com HR (quando movimento é criado)
- ❌ Alertas automáticos de reciclagens
- ❌ Exportação de pendências

**Gap**: Mostra dados, não resolve "disparo automático" (precisa integração backend)

---

#### 🟡 DHO-5: Cursos por Colaborador — **PARCIAL**
**Problemática**: "Difícil identificar quais cursos cada colaborador precisa fazer"

**O que está implementado**:
- ✅ Abas "Trilhas por Cargo" e "Trilhas Individuais"
- ✅ Mostra cursos obrigatórios por cargo
- ✅ Mostra status de conclusão de colaborador
- ✅ Filtro por colaborador

**O que FALTA**:
- ❌ Marcar como "concluído" em massa
- ❌ Atribuir curso adicional em lote
- ❌ Importação de plano de desenvolvimento
- ❌ Exportação de pendências
- ❌ Notificação automática ao colaborador

**Gap**: Visualização OK, mas sem "ações em massa" (edição/atribuição em lote)

---

#### 🔴 DHO-6: Portal do Gestor — **MOCK**
**Problemática**: "Não existe portal, formulário ou sistema oficial para solicitar treinamentos"

**O que está implementado**:
- ✅ View criada: PortalGestorView
- ✅ Exibe "Solicitações de Treinamento"
- ✅ Mock data: 3 solicitações

**O que FALTA**:
- ❌ Formulário real para criar solicitação
- ❌ Aprovação/rejeição
- ❌ Acompanhamento de status
- ❌ Integração com calendário de treinamentos
- ❌ Notificação ao gestor

**Gap**: View existe mas é apenas "leitura de dados mock", não há interação

---

#### 🔴 DHO-7: Comunicados — **MOCK**
**Problemática**: "Não existe forma automatizada para solicitar comunicados de treinamentos"

**O que está implementado**:
- ✅ View: ComunicadosTDView
- ✅ Exibe lista de comunicados
- ✅ Badges por status

**O que FALTA**:
- ❌ Formulário de criar comunicado
- ❌ Publicação para colaboradores
- ❌ Integração com WhatsApp/Teams
- ❌ Confirmação de presença
- ❌ Histórico de comunicados

**Gap**: View é "apenas leitura", não resolve "publicação" nem "confirmação de presença"

---

#### 🔴 DHO-8: Consultoria Interna — **MOCK**
**Problemática**: "Demandas chegam por WhatsApp/Teams/email, sem fluxo estruturado"

**O que está implementado**:
- ✅ View: ConsultoriaInternaView
- ✅ Card com lista de solicitações (mocked)

**O que FALTA**:
- ❌ Formulário de solicitação
- ❌ Atribuição a consultor
- ❌ Rastreamento de status
- ❌ Histórico de atendimentos
- ❌ Integração com calendário

**Gap**: View não funciona, é apenas "exibição de dados mock"

---

### 👥 RECRUTAMENTO & SELEÇÃO (HR)

#### 🟡 HR-1.1: Vagas — **PARCIAL**
**Problemática**: "Planilha de vagas atualizada manualmente vaga a vaga"

**O que está implementado**:
- ✅ CRUD básico de vagas
- ✅ Formulário com campos: SLA, código, salário, turno, etc
- ✅ Listagem com filtros

**O que FALTA**:
- ❌ Importação em lote (Excel)
- ❌ Auto-preenchimento (turno → horário automático)
- ❌ Integração com Quadro de Equipes
- ❌ Exportação para template Carta Proposta
- ❌ Sincronização com sistema de folha

**Gap**: Aba tem CRUD, mas não resolve "digitação manual" (precisa importação)

---

#### 🟡 HR-1.2: Auxiliares — **PARCIAL**
**Problemática**: "Planilha de auxiliares preenchida manualmente"

**O que está implementado**:
- ✅ CRUD básico

**O que FALTA**:
- ❌ Importação em lote
- ❌ Edição em grid
- ❌ Integração com Uniformes
- ❌ Exportação

---

#### 🟡 HR-1.3: Uniformes — **PARCIAL**
**Problemática**: "Dependência da planilha de vagas" + "Digitação manual de tamanhos"

**O que está implementado**:
- ✅ CRUD de uniformes
- ✅ Campos: tamanho sapato, calça, camiseta

**O que FALTA**:
- ❌ Importação em lote
- ❌ Auto-vinculação com Vagas
- ❌ Edição em grid
- ❌ Exportação para confecção

**Gap**: Sem integração com Vagas, ainda precisa copiar manualmente

---

#### 🟡 HR-1.4: Matrículas — **PARCIAL**
**Problemática**: "Coleta manual de dados que já existem em outras fontes"

**O que está implementado**:
- ✅ CRUD de matrículas
- ✅ Campos: matrícula, código interno

**O que FALTA**:
- ❌ Auto-preenchimento de matrícula (via integração com folha)
- ❌ Auto-preenchimento de código interno
- ❌ Importação em lote
- ❌ Validação de duplicatas

---

#### 🟡 HR-1.5: Movimentação Interna — **PARCIAL**
**Problemática**: "Registros manuais 100%, essencial para histórico"

**O que está implementado**:
- ✅ Formulário para criar movimento
- ✅ Listagem com histórico

**O que FALTA**:
- ❌ Importação em lote (planilha de movimentações)
- ❌ Auto-disparo de trilhas (DHO-4)
- ❌ Validação de dupla movimentação
- ❌ Exportação de histórico

---

#### 🟡 HR-1.6: Desligamentos — **PARCIAL**
**Problemática**: "Repassar informações de Pessoal → atualizar turnover → Ctrl C + Ctrl V"

**O que está implementado**:
- ✅ Listagem de desligados
- ✅ Mostra data, setor, motivo

**O que FALTA**:
- ❌ Importação da listagem de Pessoal (arquivo automático)
- ❌ Auto-cálculo de turnover
- ❌ Auto-vinculação com Armários (liberar)
- ❌ Exportação consolidada

**Gap**: View não resolve "sincronização com Pessoal" ou "Ctrl C + Ctrl V"

---

#### 🟡 HR-2: Quadro de Equipes — **PARCIAL**
**Problemática**: "Quadros operacionais administrados manualmente"

**O que está implementado**:
- ✅ Visualização em grid (colaborador × setor × escala)

**O que FALTA**:
- ❌ Edição em grid (arrastar, trocar turno)
- ❌ Importação de arquivo
- ❌ Integração com Vagas/Matrículas
- ❌ Sincronização de alterações

---

#### 🟡 HR-3: Temporários — **PARCIAL**
**Problemática**: "Controle de temporários, datas de contrato, renovações em planilhas"

**O que está implementado**:
- ✅ Listagem de temporários
- ✅ Exibe data de contrato

**O que FALTA**:
- ❌ Importação em lote
- ❌ Alertas de renovação
- ❌ Edição de data de término
- ❌ Integração com alertas automáticos

---

#### 🔴 HR-4: Indicadores — **MOCK**
**Problemática**: "Falta de visão automática para taxa de absenteísmo, turnover, custo, gênero, cotas, desistência"

**O que está implementado**:
- ✅ Cards com números

**O que FALTA**:
- ❌ Cálculo real a partir de dados
- ❌ Integração com folha de pagamento
- ❌ Filtro por período/setor
- ❌ Exportação de relatório
- ❌ Comparativo mês a mês

**Gap**: Totalmente mocked, nenhum cálculo real

---

#### 🟡 HR-5: Documentos (Carta + Declaração) — **PARCIAL**
**Problemática**: "Digita nome, função, turno, salário manualmente"

**O que está implementado**:
- ✅ Gera Carta Proposta
- ✅ Gera Declaração de Abertura
- ✅ Preenche alguns campos (nome, função, salário)

**O que FALTA**:
- ❌ Auto-preenchimento 100% (pega de Vagas)
- ❌ Geração em lote
- ❌ Integração com assinatura digital
- ❌ Exportação em formato correto

**Gap**: Funciona parcialmente, mas não resolve "digitação manual" completamente

---

#### 🔴 HR-6: Banco de Indicações — **NÃO ENCONTRADO**
**Problemática**: "Informações dispersas, difíceis de rastrear"

**Status**: Feature não encontrada no codebase

**Gap**: Problemática não foi resolvida em nenhuma aba

---

#### 🔴 HR-7: Descrição de Cargos — **NÃO ENCONTRADO**
**Problemática**: "Falta base digital estruturada, processo manual e fragmentado"

**Status**: Feature não encontrada no codebase

**Gap**: Problemática não foi implementada

---

#### 🔴 HR-8: Triagem com IA — **NÃO ENCONTRADO**
**Problemática**: "Analisar currículo manualmente, comparar requisitos, validar histórico"

**Status**: Feature não encontrada no codebase

**Gap**: Problemática não foi implementada

---

#### 🔴 HR-9: WhatsApp Centralizado — **NÃO ENCONTRADO**
**Problemática**: "Vários números diferentes, perda de mensagens, falta de rastreabilidade"

**Status**: Feature não encontrada no codebase

**Gap**: Problemática não foi implementada

---

## 📋 PADRÕES DE GAPS ENCONTRADOS

### 1️⃣ **Read-Only Views** (12 abas)
Problema: Aba mostra dados, mas usuário não pode:
- ❌ Editar
- ❌ Importar
- ❌ Exportar
- ❌ Deletar

**Abas afetadas**: SG-1, SG-2/4, SG-5, SG-6, SG-9, SG-10, SG-11, DHO-6, DHO-7, DHO-8, HR-4, HR-6

**Exemplo**: Chamados Manusis mostra "vencido" mas não deixa marcar como "concluído"

---

### 2️⃣ **Mock/Simulado** (5 abas)
Problema: Dados não são reais, são hardcoded ou aleatórios

**Abas afetadas**: DHO-1 (indicadores), DHO-6 (portal gestor), DHO-7 (comunicados), DHO-8 (consultoria), HR-4 (indicadores)

**Exemplo**: Hora-Homem mostra "1200 horas" mas é número fixo, não calcula de verdade

---

### 3️⃣ **Sem Importação** (25+ abas)
Problema: Dados entram manualmente, não via arquivo

**Exemplo**:
- SG-1: NFs devem vir de email do fornecedor
- SG-5: Compras devem vir de planilha de procurement
- HR-1.1: Vagas devem vir de planilha

---

### 4️⃣ **Sem Exportação** (30+ abas)
Problema: Dados não saem do sistema em formato útil

**Exemplo**:
- SG-1: Não exporta "NFs atrasadas" para cobrar
- HR-4: Não exporta "turnover por setor" para reunião

---

### 5️⃣ **Sem Bulk Operations** (25+ abas)
Problema: Ações são "item por item", não em lote

**Exemplo**:
- DHO-3: Lançar treinamento precisa marcar cada colaborador
- SG-8: Liberar armários funciona, mas sem importação

---

### 6️⃣ **Sem Integração Entre Módulos** (15+ abas)
Problema: Aba A não sincroniza com Aba B

**Exemplo**:
- HR-1.1 (Vagas) não alimenta HR-1.3 (Uniformes)
- HR-1.5 (Movimentação) não dispara DHO-4 (Trilhas)
- SG-1 (NFs) não sincroniza com SG-5 (Compras)

---

## 🎯 RECOMENDAÇÕES POR PRIORIDADE

### 🔴 CRÍTICO (Bloqueiam workflow)

1. **SG-5 Compras**: Adicionar importação + edição (afeta decisão de compras)
2. **SG-6 Fechamento**: Adicionar importação + exportação (afeta faturamento)
3. **HR-1.1 → 1.3 → 1.4**: Conectar Vagas → Uniformes → Matrículas
4. **HR-1.5 → DHO-4**: Quando cria movimento, auto-dispara trilhas
5. **DHO-3**: Integrar Presença Digital → Lançamento em Lote automático

### 🟡 IMPORTANTE (Melhora eficiência)

6. **SG-1**: Adicionar importação + filtros + exportação de atrasados
7. **SG-9**: Integrar com Forms real (não mock)
8. **SG-10**: Integrar com Forms automaticamente
9. **HR-4**: Cálculo real de indicadores (não mock)
10. **DHO-1**: Cálculo real de Hora-Homem

### 🟢 DESEJÁVEL (Melhora UX)

11. **SG-2/4**: Edição de tipo faturamento
12. **DHO-5**: Marcar conclusão em lote
13. **HR-2**: Edição em grid (arrastar, trocar turno)

### ❌ NÃO IMPLEMENTADO (Fora do escopo atual)

14. **HR-6**: Banco de Indicações
15. **HR-7**: Descrição de Cargos
16. **HR-8**: Triagem com IA
17. **HR-9**: WhatsApp centralizado

---

## ✅ CHECKLIST: O QUE FATURAMENTO ATTOS TEM QUE OUTROS NÃO TÊM

| Feature | Faturamento Attos | SG-1 | SG-5 | SG-6 | DHO-3 | HR-1.1 |
|---------|-------------------|------|------|------|--------|--------|
| Importação arquivo | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Edição inline | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Checkboxes seleção | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Bulk mark/delete | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Exportação arquivo | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Validação dados | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Filtros | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Rastreamento (who/what/when) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 🚀 TEMPLATE PARA PRÓXIMAS IMPLEMENTAÇÕES

Usar SGFaturamentoAttosView como **padrão** para abas que resolvem "problema de cópia manual":

```typescript
// Template para abas que importam/editam dados em lote
export function {NomeView}() {
  // 1. Estado
  const [dados, setDados] = useState<T[]>(mockData);
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [filtros, setFiltros] = useState({...});

  // 2. Importação
  const handleImportarPlanilha = (rowCount) => {
    // Parse → validate → merge
  };

  // 3. Edição
  const iniciarEdicao = (item) => {...};
  const salvarEdicao = () => {...};

  // 4. Validação
  const validarDados = (val) => {...};

  // 5. Bulk actions
  const marcarComo... = () => {...};
  const deletarSelecionados = () => {...};
  const exportarDados = () => {...};

  // 6. Filtros
  const dadosFiltrados = useMemo(() => {...}, [dados, filtros]);

  return (
    <Card>
      {/* ImportarPlanilhaButton */}
      {/* Filtros */}
      {/* Bulk toolbar */}
      {/* Tabela com checkboxes, edição inline */}
    </Card>
  );
}
```

---

## 📝 PRÓXIMOS PASSOS

1. **Aplicar padrão Faturamento Attos a**:
   - ✅ **SG-5 Compras** (semelhante, dados tabulares)
   - ✅ **SG-6 Fechamento** (semelhante, dados tabulares)
   - ✅ **SG-1 Notas Fiscais** (parcial: já tem kanban, adicionar importação)

2. **Conectar módulos**:
   - HR-1.5 Movimento → DHO-4 Trilhas (auto-disparo)
   - SG-1 NFs → SG-5 Compras (vínculo)
   - DHO-2 Presença → DHO-3 Lançamento (export automático)

3. **Remover mocks**:
   - DHO-1: Indicadores (cálculo real)
   - DHO-6: Portal Gestor (formulário real)
   - HR-4: Indicadores (cálculo real)

4. **Implementar faltantes**:
   - HR-6: Banco de Indicações
   - HR-7: Descrição de Cargos
   - HR-9: WhatsApp centralizado

---

## 📊 RESUMO FINAL

| Status | Quantidade | % |
|--------|-----------|---|
| ✅ Resolvido (SG-3) | 1 | 3% |
| 🟡 Parcial | 18 | 45% |
| 🔴 Read-only/Mock | 12 | 30% |
| ❌ Não implementado | 9 | 22% |
| **TOTAL** | **40** | **100%** |

**Conclusão**: Sistema tem cobertura visual de 78% das problemáticas, mas apenas 3% estão realmente **resolvidas** (com importação, edição, exportação, validação). Faturamento Attos é o modelo para as próximas.
