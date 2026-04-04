# Role: Senior Full-Stack Engineer & UX Expert (Frontend Prototype)
# Context: Enterprise HR/Operations Suite - "Sistema Integrado Posigraf"

## 1. Visão Geral
[cite_start]O objetivo é criar a interface (Frontend Only) de uma plataforma de gestão corporativa que elimina o uso de planilhas manuais[cite: 3, 143]. O sistema deve ser dividido em módulos de acesso restrito (RBAC):
- [cite_start]**DHO & Comunicação Interna:** Gestão de treinamentos, trilhas de aprendizagem e indicadores[cite: 119].
- [cite_start]**Serviços Gerais:** Controle de faturamento (Elo/Attos), benefícios (VT/Estacionamento) e infraestrutura (Armários/Refeitório)[cite: 213, 221, 257, 264].

## 2. Módulo DHO & Comunicação Interna (Requisitos de UI)
[cite_start]Criar telas que resolvam a falta de visibilidade estratégica[cite: 128]:
- [cite_start]**Dashboard de T&D:** Visualização automática do indicador "Hora-Homem de Treinamento" (KPI principal)[cite: 121, 122].
- [cite_start]**Gestão de Treinamentos:** - Lista de presença digital (QR Code/Checklist) para substituir o papel[cite: 131, 133].
    - [cite_start]Fluxo de lançamento em lote para evitar digitação unitária[cite: 135, 137].
- [cite_start]**Trilhas de Carreira Automáticas:** Interface que, ao selecionar um cargo, exibe instantaneamente os cursos obrigatórios e status de reciclagem[cite: 161, 163, 164].
- [cite_start]**Portal do Gestor:** Formulário estruturado para solicitação de treinamentos e consultoria interna, com status de fila e priorização[cite: 180, 206].

## 3. Módulo Serviços Gerais (Requisitos de UI)
[cite_start]Foco em integração de dados e alertas[cite: 215, 236]:
- [cite_start]**Central de Notas Fiscais:** Kanban ou lista com alertas visuais para NFs pendentes ou atrasadas[cite: 216, 218].
- [cite_start]**Conciliação de Acessos (Refeitório/Elo/Attos):** Tela de "Divergências" que destaca automaticamente acessos duplicados e separa faturamento Posigraf/Elo[cite: 222, 235, 240].
- [cite_start]**Cruzamento de Benefícios:** Dashboard que correlaciona a base de Estacionamento + VT para identificar redundâncias[cite: 258, 261].
- [cite_start]**Gestão de Armários:** Mapa visual do vestiário integrado à base de desligados (exibindo armários liberados automaticamente)[cite: 265, 268].
- [cite_start]**Voucher Digital:** Gerador de QR Codes para o Voucher de Natal[cite: 299, 302].

## 4. Guia de Estilo e Stack
- **Tecnologia:** React, TypeScript, Tailwind CSS, Lucide React (Ícones).
- **Design:** Profissional, corporativo, focado em densidade de dados (tabelas limpas, filtros avançados).
- **Navegação:** Sidebar persistente para troca de módulos (conforme cargo do usuário).
- **Componentes:** Utilizar Shadcn/UI (se disponível) para Data Tables, Modais de confirmação e Badges de status.

## 5. Instruções de Agente para o Cursor
- Atue como um arquiteto que executa comandos de terminal para instalar dependências necessárias.
- Crie os arquivos de componentes (`.tsx`) e estilos separadamente.
- Mocke todos os dados (JSON) para que as telas pareçam populadas e funcionais.
- Implemente a lógica de troca de contexto (Tabs ou Routing) entre DHO e Serviços Gerais.
- **IMPORTANTE:** O código deve ser apenas Front-end (Vite/React), simulando as integrações que no futuro serão Back-end.

## 6. RBAC (protótipo implementado)
- **Permissões:** `src/auth/roles.ts` — matriz por `TipoUsuario` (admin, gestor, rh, financeiro, logistica).
- **Estado do usuário:** `src/auth/AuthContext.tsx` + `AuthProvider` após o login em `App.tsx`.
- **Serviços Gerais por área:** `src/features/servicos-gerais/financeiro/` e `src/features/servicos-gerais/logistica/` (painéis e telas específicas); visão completa em `shared/`.
- **DHO transversal (gestor):** rota lógica `dho-gestor` — formulários de solicitação de treinamento e consultoria para perfis financeiro e logística.
- **UI:** sidebar filtra itens por perfil; topbar exibe badge de ambiente (azul = Financeiro, verde = Logística) em Serviços Gerais; acesso indevido mostra `src/pages/AccessDenied.tsx`.

# Role: Senior Software Architect (RBAC & Frontend Security)
# Context: Refactoring Access Levels for "Sistema Integrado Posigraf"

## 1. Objetivo
Implementar uma estrutura de permissões (RBAC) rigorosa no Frontend para garantir que usuários vejam apenas os módulos pertinentes ao seu cargo. A aba "Serviços Gerais" deve ser fragmentada em visões específicas.

## 2. Matriz de Permissões (Mock Permission Logic)
O sistema deve simular os seguintes perfis de usuário:

- **PERFIL: RH/DHO**
  - Acesso: Módulo Recrutamento Completo + Dashboard DHO (Indicadores e Trilhas).
  - Restrição: Não visualiza faturamento de notas fiscais de Serviços Gerais.

- **PERFIL: FINANCEIRO**
  - Acesso: Módulo DHO (apenas para solicitar treinamentos) + Serviços Gerais (Sub-módulos: Notas Fiscais, Faturamento Elo/Attos, Controle de Compras).
  - Restrição: Bloqueado para dados de Recrutamento e Gestão de Armários/Refeitório.

- **PERFIL: LOGÍSTICA/FACILITIES**
  - Acesso: Módulo DHO (apenas para solicitar treinamentos) + Serviços Gerais (Sub-módulos: Refeitório, Armários, Estacionamento/VT, Sociedade do Café, Chamados Manusis).
  - Restrição: Bloqueado para Recrutamento e Faturamento Financeiro.

## 3. Requisitos de UI/UX para o Cursor
- **Sidebar Dinâmica:** Os itens da sidebar devem ser renderizados condicionalmente com base no `user_role`.
- **Dashboard de DHO Transversal:** Criar uma "View de Gestor" simplificada dentro do DHO que esteja disponível para todos os perfis, focada exclusivamente em "Solicitar Treinamento" e "Abrir Chamado de Consultoria".
- **Visual Feedback:** Se um usuário tentar acessar uma rota via URL que não pertence ao seu perfil, exibir uma tela de "Acesso Negado" elegante.

## 4. Instruções de Implementação
- Crie um arquivo `roles.ts` ou um Context Provider (`AuthContext.tsx`) que gerencie o estado global do usuário e suas permissões.
- Refatore a estrutura de pastas para que os componentes de "Financeiro" e "Logística" fiquem em diretórios separados dentro de `features/servicos-gerais/`.
- Utilize badges ou cores de identificação na UI para indicar em qual "Ambiente" o usuário está (Ex: Header Azul para Financeiro, Verde para Logística).