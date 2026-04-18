# Role: Frontend Engineer & UX Designer (Accessibility Specialist)
# Strategy: Dynamic Theme Switching & Visual Ergonomics - "Sistema Posigraf"

## 1. O Conceito: Conforto em Turnos 24h
O sistema deve oferecer um alternador de tema (Light/Dark) para se adaptar à luminosidade do ambiente de trabalho (escritório vs. chão de fábrica). A transição deve ser fluida, profissional e persistente, garantindo que a escolha do usuário seja respeitada em cada acesso.

## 2. Especificações Técnicas (React + Tailwind CSS)

### A. Lógica de Estado e Persistência
- Implemente um `ThemeContext` ou utilize um Hook que controle a classe `.dark` no elemento `<html>`.
- **LocalStorage:** Salve a preferência do usuário (`theme: 'dark' | 'light'`) para que o tema seja mantido após o refresh da página ou novo login.

### B. Interface e Micro-interações (Header Component)
- **Localização:** O botão de alternância deve ser posicionado no canto direito do Header, ao lado do Centro de Alertas (Sino).
- **Estilo:** Use um 'Ghost Button' arredondado com `hover:bg-zinc-100` (Light) e `dark:hover:bg-zinc-800` (Dark).
- **Ícones Animados:** Utilize a biblioteca `lucide-react` para os ícones `Sun` e `Moon`. 
- **Animação:** Use `framer-motion` para criar um efeito de rotação (90deg) e escala (0 a 1) ao trocar entre os ícones, tornando a interação visualmente satisfatória.

### C. Design System Dual (Paleta de Cores)
- **Modo Escuro (Dark):** Background `#09090b` (Zinc-950), Cards `#18181b` (Zinc-900), Textos `Stone-200`.
- **Modo Claro (Light):** Background `White` puro, Cards com bordas `Zinc-200`, Textos `Zinc-900`.
- **Suavização Global:** Aplique `transition-all duration-300` nas classes de layout para que a mudança de cores em cards, tabelas e menus seja um fade elegante, não um corte abrupto.

## 3. Instruções de Execução para a IA (Agente de UI)
- Refatore o componente de Header para incluir o `ThemeToggle`.
- Garanta que todos os componentes desenvolvidos anteriormente (Bento Boxes, Tabelas, Dashboards) possuam variantes `dark:` para todas as cores de fundo, bordas e textos.
- **Foco em Ergonomia:** O Modo Claro deve ser nítido e limpo; o Modo Escuro deve ser profundo e sofisticado (estilo Apple/Linear).
- O objetivo é demonstrar domínio técnico sobre manipulação de DOM e persistência de dados no Frontend.