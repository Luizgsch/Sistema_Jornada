# 🏷️ Integração de Badges SENAI em Todas as Abas

> **Status:** Componente criado + exemplo implementado em Vagas. Abaixo: instruções para completar todos os 31.

---

## Componente Criado

**Arquivo:** `src/shared/components/SENAIProblemBadge.tsx`

```tsx
<SENAIProblemBadge problemId="1.1" />
```

- Mostra badge com fundo âmbar
- Exibe `SENAI #1.1` (ou número correspondente)
- Hover mostra tooltip com descrição do problema
- Automático torna-se dark-mode aware

---

## ✅ Já Implementado

- [x] **Vagas** (`src/features/hr/recrutamento/vagas/index.tsx`)
  - Badge: `1.1`
  - Localização: Ao lado do título "Gestão de Vagas"

---

## 📝 Próximos: 30 Componentes Restantes

### **RECRUTAMENTO (8 faltando)**

| Arquivo | Componente | Badge | Instruções |
|---------|-----------|-------|-----------|
| `src/features/hr/recrutamento/auxiliares/index.tsx` | Auxiliares | `1.2` | Adicionar import + badge ao lado título |
| `src/features/hr/operacoes/uniformes/index.tsx` | Uniformes | `1.3` | Adicionar import + badge ao lado título |
| `src/features/hr/admissoes/matriculas/index.tsx` | Matrículas | `1.4` | Adicionar import + badge ao lado título |
| `src/features/hr/operacoes/movimentacoes/index.tsx` | Movimentações | `1.5` | Adicionar import + badge ao lado título |
| `src/features/hr/operacoes/desligamentos/index.tsx` | Desligamentos | `1.6` | Adicionar import + badge ao lado título |
| `src/features/hr/operacoes/quadro-equipes/index.tsx` | Quadro Equipes | `2` | Adicionar import + badge ao lado título |
| `src/features/hr/operacoes/temporarios/index.tsx` | Temporários | `3` | Adicionar import + badge ao lado título |
| `src/features/hr/recrutamento/indicacoes/index.tsx` | Indicações | `6` | Adicionar import + badge ao lado título |
| `src/features/hr/recrutamento/triagem-ia/index.tsx` | Triagem IA | `8` | Adicionar import + badge ao lado título |
| `src/features/hr/recrutamento/whatsapp/index.tsx` | WhatsApp Bot | `9` | Adicionar import + badge ao lado título |

### **HR Operações/Analytics (3 faltando)**

| Arquivo | Componente | Badge | Instruções |
|---------|-----------|-------|-----------|
| `src/features/hr/analytics/indicadores/index.tsx` | Indicadores | `4` | Adicionar import + badge |
| `src/features/hr/admissoes/documentos/index.tsx` | Documentos Admissionais | `5` | Adicionar import + badge |
| `src/features/hr/operacoes/cargos/index.tsx` | Descrição Cargos | `7` | Adicionar import + badge |

### **DHO (8 componentes)**

| Arquivo | View | Badge | Instruções |
|---------|------|-------|-----------|
| `src/features/dho/DHOViews.tsx` | DashboardTDView() | `dho-1` | Adicionar badge após título "Dashboard T&D" |
| `src/features/dho/DHOViews.tsx` | PresencaDigitalView() | `dho-2` | Adicionar badge após título "Presença digital" |
| `src/features/dho/DHOViews.tsx` | LancamentoLoteView() | `dho-3` | Adicionar badge após título "Lançamento em lote" |
| `src/features/dho/DHOViews.tsx` | TrilhasCargoView() | `dho-5` | Adicionar badge após título "Trilhas por cargo" |
| `src/features/dho/DHOViews.tsx` | PortalGestorView() | `dho-7` | Adicionar badge após título "Portal do gestor" |
| `src/features/dho/DHOViews.tsx` | ComunicadosTDView() | `dho-6` | Adicionar badge após título "Comunicados T&D" |
| `src/features/dho/DHOViews.tsx` | ConsultoriaInternaView() | `dho-8` | Adicionar badge após título "Consultoria interna" |
| `src/features/dho/DHOViews.tsx` | DHOGestorTransversalView() | `dho-4` | Adicionar badge após título |

### **SERVIÇOS GERAIS (12 componentes)**

| Arquivo | View/Componente | Badge | Instruções |
|---------|-----------------|-------|-----------|
| `src/features/servicos-gerais/financeiro/SGFinanceiroViews.tsx` | SGNotasFiscaisView() | `sg-1` | Adicionar badge |
| `src/features/servicos-gerais/financeiro/SGFinanceiroViews.tsx` | SGConciliacaoView() | `sg-2,sg-4` | Badges duplas |
| `src/features/servicos-gerais/financeiro/SGFinanceiroViews.tsx` | SGComprasView() | `sg-5` | Adicionar badge |
| `src/features/servicos-gerais/financeiro/SGFinanceiroViews.tsx` | SGFaturamentoAttosView() | `sg-3` | Adicionar badge |
| `src/features/servicos-gerais/financeiro/SGFinanceiroViews.tsx` | SGFechamentoAttosView() | `sg-6` | Adicionar badge |
| `src/features/servicos-gerais/logistica/SGLogisticaViews.tsx` | SGBeneficiosView() | `sg-7` | Adicionar badge |
| `src/features/servicos-gerais/logistica/SGLogisticaViews.tsx` | SGArmariosView() | `sg-8` | Adicionar badge |
| `src/features/servicos-gerais/logistica/SGLogisticaViews.tsx` | SGSatisfacaoView() | `sg-9` | Adicionar badge |
| `src/features/servicos-gerais/logistica/SGLogisticaViews.tsx` | SGCafeView() | `sg-10` | Adicionar badge |
| `src/features/servicos-gerais/logistica/SGLogisticaViews.tsx` | SGChamadosView() | `sg-11` | Adicionar badge |
| `src/features/servicos-gerais/logistica/SGEstacionamentoView.tsx` | SGEstacionamentoView() | `sg-7b` | Adicionar badge |
| `src/features/servicos-gerais/shared/SGVoucherView.tsx` | SGVoucherView() | `sg-13` | Adicionar badge |

---

## 🔧 Como Adicionar em Cada Componente

### **Passo 1: Adicionar Import**

```tsx
import { SENAIProblemBadge } from '@/shared/components/SENAIProblemBadge';
```

### **Passo 2: Localizar Header/Título**

Procure por `<h1>`, `<h2>`, ou estrutura similar.

Exemplo atual (Vagas):
```tsx
<div className="flex items-center gap-3">
  <h1 className="...">Gestão de Vagas</h1>
  <SENAIProblemBadge problemId="1.1" />
</div>
```

### **Passo 3: Adicionar Badge**

Envolver título em `<div className="flex items-center gap-3">` se necessário.

**Padrão para DHO Views** (em DHOViews.tsx, já tem headers):
```tsx
<div className="flex items-center gap-2">
  <h2 className="text-xl font-bold">Presença digital</h2>
  <SENAIProblemBadge problemId="dho-2" />
</div>
```

---

## 📊 Mapeamento Completo de Problem IDs

```
RECRUTAMENTO:
  1.1 → Vagas ✅
  1.2 → Auxiliares
  1.3 → Uniformes
  1.4 → Matrículas
  1.5 → Movimentações
  1.6 → Desligamentos
  2   → Quadro Equipes
  3   → Temporários
  4   → Indicadores
  5   → Documentos
  6   → Indicações
  7   → Cargos
  8   → Triagem IA
  9   → WhatsApp

DHO:
  dho-1 → KPI Automáticos
  dho-2 → Presença Digital
  dho-3 → Lançamento Lote
  dho-4 → Planilhas
  dho-5 → Trilhas Auto
  dho-6 → Comunicados
  dho-7 → Portal Gestor
  dho-8 → Consultoria

SG FINANCEIRO:
  sg-1  → Notas Fiscais
  sg-2  → Conciliação Elo
  sg-3  → Faturamento Attos
  sg-4  → Acessos Duplicados
  sg-5  → Compras
  sg-6  → Fechamento Attos

SG LOGÍSTICA:
  sg-7  → VT × Estacionamento
  sg-7b → Pátio Estacionamento
  sg-8  → Armários
  sg-9  → Satisfação
  sg-10 → Café
  sg-11 → Chamados
  sg-13 → Voucher Natal
```

---

## ✨ Resultado Visual

Quando pronto, cada aba mostrará algo assim:

```
┌─────────────────────────────────────────────────┐
│ 🏢 Recrutamento & Seleção                      │
│ Gestão de Vagas [SENAI #1.1] ← Badge           │
│ Controle centralizado de todas oportunidades   │
└─────────────────────────────────────────────────┘
```

Ao passar mouse no badge → tooltip:
```
┌──────────────────┐
│ Problema resolvido:
│ Planilha: Vagas  │
└──────────────────┘
```

---

## 🚀 Next Steps

1. Implementar em DHOViews.tsx (8 views)
2. Implementar em SGFinanceiroViews.tsx (5 views)
3. Implementar em SGLogisticaViews.tsx (5 views)
4. Implementar em componentes HR restantes (8)
5. Testar modo dark/light
6. Verificar alinhamento visual

---

## 💡 Pro Tips

- Badges aparecem com `flex items-center gap-3` para alinhamento perfeito
- Tooltip automático com `<Tooltip>` existente
- Cor âmbar mantém consistência visual (não compete com outros elementos)
- Problem IDs concatenados com `sg-7b` se necessário (estacionamento é extensão de VT)

---

**Arquivo:** `SENAI-BADGE-INTEGRATION.md`  
**Atualizado:** 2026-05-27  
**Status:** 1/31 implementado ✅
