# Role: Senior UI/UX Designer (Specialist in Dark Interfaces & Bento Box)
# Strategy: Refactor "Sistema Posigraf" to High-End Tech Aesthetic (Linear/Apple Style)

## 1. Direção Visual & Estética
Transforme a interface atual em um Dashboard Minimalista e Sofisticado. O objetivo é transmitir autoridade tecnológica e clareza absoluta de dados críticos.

## 2. Design System (Dark Mode Específico)
- **Background Principal:** `#09090b` (Zinc-950).
- **Cards (Bento Boxes):** `#18181b` (Zinc-900) com `rounded-xl`.
- **Bordas:** `1px solid #27272a` (Zinc-800) - extremamente sutis.
- **Tipografia:** Use 'Inter' ou 'Geist'. 
    - Títulos: `font-semibold`, `tracking-tighter`, cor `Stone-200` (#e7e5e4).
    - Descrições: `text-sm`, cor `Stone-500`.
- **Minimalismo:** Remova sombras externas (box-shadow) pesadas. O contraste deve vir apenas da variação tonal entre o fundo e os cards.

## 3. Layout Bento Box (Grid System)
Organize as funcionalidades (DHO, RH, Serviços Gerais) em uma grade dinâmica:
- Use `display: grid` com `gap-6` ou `gap-8`.
- Distribua as métricas em tamanhos variados (`col-span-1`, `col-span-2`, `row-span-2`) para criar ritmo visual.
- Cada funcionalidade ou KPI deve ser um card isolado e independente.

## 4. Alertas Neon (Sinalização de Crise)
Para SLAs vencidos ou falhas críticas identificadas no documento SENAI:
- Não utilize blocos de cores sólidas.
- Use **Cores Neon com Glow**: Texto em `#ff0033` (Erro) ou `#39ff14` (Sucesso).
- Aplique uma sombra interna suave ou `drop-shadow` neon apenas no dado crítico para fazê-lo "saltar" do fundo escuro.

## 5. Instruções de Implementação para a IA
- Refatore o Tailwind CSS de todos os componentes existentes para seguir esta paleta de cinzas profundos (Zinc/Stone).
- Elimine divisores de linha desnecessários; use o `gap` do grid para separar as informações.
- Garanta que o "Respiro" (Padding `p-8`) seja mantido dentro de cada Bento Box.
- O resultado final deve ser uma interface escura, elegante e altamente legível.