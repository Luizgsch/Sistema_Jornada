# SG-3 Faturamento Attos — Análise de Gaps Funcionais

## Status Atual
Aba **SGFaturamentoAttosView** é **visualização apenas**. Tabela mostra:
- Data
- Refeições (number)
- Status integrado (badge)
- Origem (texto)

**Sem**: edição, importação, exportação, bulk operations, automação, sincronização.

---

## Problema Mapeado
**Usuário copia manualmente PDF/Excel → Sistema diariamente**
- Digitação repetitiva e propensa a erros
- Sem validação em tempo real
- Sem histórico de mudanças
- Sem rastreabilidade de quem fez o quê
- Sem pipeline automático de sincronização

---

## 1️⃣ GAPS FUNCIONAIS CRÍTICOS

### 1.1 **Seleção e Bulk Edit (Preenchimento em Massa)**
**Atual**: Nenhuma operação em massa possível
**Necessário**:
- Checkbox em cada linha
- "Selecionar todos" / "Desselecionar todos"
- Ações bulk na seleção:
  - Marcar como "Integrado"
  - Alterar "Origem" em massa
  - Deletar selecionados
  - Exportar selecionados
- Feedback visual: "X linhas selecionadas"

**Padrão existente**: Kanban de NFs (`mockNotasFiscais`) usa drag-drop. Pode inspirar UX.

---

### 1.2 **Importação de Planilhas (Excel/CSV)**
**Atual**: Não existe
**Necessário**:
- Componente **ImportarPlanilhaButton** já existe (reusável)
- Aceita: `.xlsx`, `.xls`, `.csv`
- Modal drag-drop com validação
- **Mapeamento de colunas**:
  - Usuário carrega arquivo → sistema detecta colunas (data, refeições, origem)
  - Confirmação antes de inserir
  - Validação por linha: datas válidas, números inteiros, origem conhecida
- **Importação inteligente**:
  - Detectar duplicatas por data
  - Pergunta: sobrescrever ou manter?
  - Preview das linhas antes de confirmar
- **Resultado**: Toast com `X linhas importadas` / `Y conflitos detectados`

---

### 1.3 **Exportação de Dados**
**Atual**: Não existe
**Necessário**:
- Botão **Exportar**
- Opções:
  - Exportar selecionados / Todos
  - Formato: Excel (`.xlsx`) ou CSV
  - Incluir: Data, Refeições, Status, Origem, Timestamp da última atualização
- Atalho: ⬇️ Download icon no header ou bulk toolbar

---

### 1.4 **Edição Inline de Registros**
**Atual**: Impossível; tabela é read-only
**Necessário**:
- Clique em célula → modo edição
- Campos editáveis:
  - **Data**: Date picker (validar formato)
  - **Refeições**: Number input (inteiro ≥ 0)
  - **Integrado**: Toggle ou dropdown (Integrado/Pendente)
  - **Origem**: Dropdown (API Attos / Planilha / Manual)
- Validação em tempo real:
  - Refeições > 0?
  - Data válida? (não futura, não duplicada)
- Salvar: Click fora / Enter
- Cancelar: Escape / Click fora sem mudanças

---

### 1.5 **Validação e Regras de Negócio**
**Atual**: Nenhuma validação
**Necessário**:
- **Na importação**:
  - Data: formato YYYY-MM-DD, não futura
  - Refeições: número inteiro > 0
  - Origem: um dos valores pré-definidos
  - Detectar duplicatas (mesmo data)
- **Na edição**:
  - Avisar se data já existe
  - Limitar refeições a faixa válida (ex: 0-2000?)
- **Visual**: Linha/célula vermelha se inválida
- **Ação**: Impedir salvar dados inválidos

---

### 1.6 **Histórico de Mudanças (Auditoria)**
**Atual**: Nenhum rastreamento
**Necessário**:
- Registrar cada edição:
  - Quem mudou (usuário)
  - O quê mudou (campo anterior → novo)
  - Quando mudou (timestamp)
  - De onde veio (importação/edição manual/API)
- **UI**: Botão "Ver histórico" por linha → modal com timeline
- **Dados**: Adicionar a mock data:
  ```typescript
  type AudiFaturamento = {
    dataId: string;
    timestamp: Date;
    usuario: string;
    operacao: 'criado' | 'editado' | 'deletado' | 'importado';
    camposAlterados: { campo: string; de: any; para: any }[];
  }
  ```

---

### 1.7 **Sincronização Automática (API Integration)**
**Atual**: Manual 100%
**Necessário**:
- **Endpoint** que recebe dados Attos diariamente (via webhook ou pull)
- **Mapeamento**: PDF/Excel Attos → formato interno
- **Agendamento**: Ex: sincronizar 2x por dia (9h, 17h) automaticamente
- **UI para config**:
  - Toggle: "Sincronização automática ativada?"
  - Horário de sincronização (ajustável)
  - Último sync bem-sucedido
  - Logs de sincronização (modal)
- **Fallback**: Se API falha, alertar usuário

---

### 1.8 **Filtros e Busca**
**Atual**: Tabela mostra tudo, sem filtros
**Necessário**:
- **Filtro por intervalo de datas** (data picker)
- **Filtro por status**: Integrado / Pendente / Todos
- **Filtro por origem**: API / Planilha / Manual
- **Busca**: Campo de texto (busca por data)
- **Reset filters** button
- **Persist**: Salvar últimos filtros usados (localStorage)

---

### 1.9 **Ordenação de Colunas**
**Atual**: Ordem fixa
**Necessário**:
- Clique em header → ordem crescente/decrescente
- Visual: ↑ ↓ ícone no header
- Default: Ordem por data DESC (mais recentes primeiro)

---

### 1.10 **Paginação e Performance**
**Atual**: Assume <20 linhas (mock data)
**Necessário**:
- Se > 50 linhas:
  - Paginação: 10/25/50 linhas por página
  - OU Virtual scroll (se muitos dados)
- Botão "Carregar mais"
- Info: "Mostrando X-Y de Z registros"

---

## 2️⃣ COMPONENTES NOVOS A CRIAR

| Componente | Responsabilidade | Reuso |
|-----------|------------------|-------|
| **FatSelectCheckbox** | Row-level checkbox + select-all | Tables em geral |
| **FatBulkToolbar** | Ações em massa (mark, delete, export) | Tables em geral |
| **FatImportModal** | Wrapper de ImportarPlanilhaButton + mapping | Financeiro |
| **FatExportButton** | Excel/CSV export | Financeiro |
| **FatEditableCell** | Inline edit para data/number/select | Tables em geral |
| **FatAuditModal** | Timeline de mudanças | Qualquer auditado |
| **FatSyncConfig** | Settings de sincronização automática | Integrações |
| **FatValidationToast** | Feedback de validação por linha | Forms |

---

## 3️⃣ MUDANÇAS NO MOCK DATA

**Arquivo**: `src/infrastructure/mock/mockServicosGerais.ts`

```typescript
// Expandir mockAttosFaturamento
export const mockAttosFaturamento = [
  { 
    id: 'FAT-001',  // Add ID
    data: '2026-04-01', 
    refeicoes: 412, 
    integrado: true, 
    origem: 'API Attos',
    ultimaAlteracao: '2026-04-03T08:15:00',
    alteradoPor: 'sistema',
  },
  // ... mais registros
];

// Nova tabela para auditoria
export const mockFaturamentoAudit: AudiFaturamento[] = [
  {
    fatId: 'FAT-001',
    timestamp: '2026-04-03T08:15:00',
    usuario: 'Sistema',
    operacao: 'importado',
    camposAlterados: [{ campo: 'refeicoes', de: null, para: 412 }],
  },
];

// Config de sincronização
export const mockFaturamentoSyncConfig = {
  enabled: true,
  horariosSync: ['09:00', '17:00'],
  ultimoSync: '2026-04-03T08:15:00',
  proxSync: '2026-04-03T17:00:00',
  status: 'ok' as const, // 'ok' | 'falha' | 'em-progresso'
};
```

---

## 4️⃣ PRIORIZAÇÃO POR IMPACTO

### 🔴 MUST-HAVE (Resolve o problema core)
1. **Importação de Planilhas** — 50% da automação
2. **Edição Inline** — Corrige dados entrados errado
3. **Seleção + Bulk Marca Como Integrado** — Workflow diário
4. **Validação** — Evita erros de entrada

### 🟡 SHOULD-HAVE (Melhora a confiabilidade)
5. **Histórico de Mudanças** — Rastreabilidade
6. **Exportação** — Relatórios/backup
7. **Filtros e Ordenação** — Usabilidade

### 🟢 NICE-TO-HAVE (Automação total)
8. **Sincronização Automática** — Elimina manual 100%
9. **Paginação** — Se dados crescem muito

---

## 5️⃣ PADRÕES REUTILIZÁVEIS EXISTENTES

| Padrão | Localização | Reutilizar para |
|--------|------------|-----------------|
| **ImportarPlanilhaButton** | `@/shared/ui/ImportarPlanilhaButton` | Modal + drag-drop de arquivos |
| **Toast notifs** | `@/shared/ui/Toast` | Feedback de ações |
| **Card layout** | `@/shared/ui/Card` | Container |
| **Button variants** | `@/shared/ui/Button` | CTA, bulk actions |
| **Kanban drag-drop** | `SGNotasFiscaisView` | Inspiração para UX de seleção |

---

## 6️⃣ FLUXO DE TRABALHO APÓS IMPLEMENTAÇÃO

```
Dia 1: Usuário recebe PDF/Excel Attos
  ↓
1. Abre aba Faturamento Attos
2. Clica "Importar Planilha" → Seleciona arquivo
3. Sistema mapeia colunas (data, refeições, origem)
4. Preview mostra linhas a importar + validação
5. Clica "Confirmar" → 15 linhas importadas
6. Revisa: 1 linha com erro de data
7. Clica na linha → edita data inline → salva
8. Seleciona todas as 15 → "Marcar como Integrado"
9. Pronto! Dados enviados para faturamento automaticamente
10. Sistema log: quem fez, quando, o quê mudou

Resultado: 0 digitação manual, 100% auditável.
```

---

## 7️⃣ ESTIMATIVA DE ESFORÇO

| Feature | Esforço | Deps |
|---------|---------|------|
| Importação (c/ validação) | 4h | ImportarPlanilhaButton (existe) |
| Edição inline | 3h | Form validation (utils) |
| Seleção + bulk toolbar | 2h | — |
| Validação + regras | 2h | — |
| Exportação | 2h | — |
| Histórico/Auditoria | 3h | — |
| Filtros + ordenação | 2h | — |
| Sincronização automática | 4h | Backend (fora escopo) |
| **TOTAL (must-have)** | **~13h** | — |
| **TOTAL (all features)** | **~22h** | — |

---

## 📋 Checklist de Implementação

### Phase 1: Core Editing (4h)
- [ ] Seleção com checkboxes
- [ ] Edição inline (data, refeições, origem)
- [ ] Validação em tempo real
- [ ] Salvar mudanças em mock data

### Phase 2: Import/Export (4h)
- [ ] Modal de importação com mapping
- [ ] Validação de linhas importadas
- [ ] Preview antes de confirmar
- [ ] Exportação Excel/CSV

### Phase 3: Usability (3h)
- [ ] Filtros (data range, status, origem)
- [ ] Ordenação por coluna
- [ ] Bulk toolbar com ações (marcar, deletar, exportar)

### Phase 4: Auditoria (3h)
- [ ] Registro de mudanças (quem, o quê, quando)
- [ ] Modal de histórico por linha
- [ ] Indicador visual de linhas editadas

### Phase 5: Automação (4h)
- [ ] Config de sincronização automática
- [ ] Agendamento de horários
- [ ] Logs e status de sync
- [ ] (Requer backend)

---

## Referência: Documentação do Problema Original

**SG-3 / Desafio 3 — Serviços Gerais**
- **Problema**: Copiar dados manualmente todos os dias para o faturamento
- **Dados**: PDF/Excel diários com refeições, datas, etc.
- **Objetivo**: Integração automática e confiável
- **Validação**: Redução significativa de digitação manual
- **Impacto**: Ganho de tempo + menos erros
