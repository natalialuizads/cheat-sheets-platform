"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Palette, Layout, Type, Zap, CheckCircle, AlertTriangle, Grid3X3, Sparkles } from "lucide-react"

interface CodeExampleProps {
  code: string
  language: string
}

function CodeExample({ code, language }: CodeExampleProps) {
  return (
    <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export function CSS3Section() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const cssCategories = {
    Fundamentals: {
      icon: Type,
      color: "text-blue-600",
      topics: [
        {
          name: "Box Model",
          description: "Modelo de caixa CSS: content, padding, border, margin",
          example: `/* ✅ Box Model Completo */
.box {
  width: 300px;           /* Content width */
  height: 200px;          /* Content height */
  padding: 20px;          /* Espaço interno */
  border: 2px solid #333; /* Borda */
  margin: 10px;           /* Espaço externo */
  box-sizing: border-box; /* Inclui padding e border na largura */
}

/* ❌ Sem box-sizing pode quebrar layout */
.box-ruim {
  width: 300px;
  padding: 20px; /* Largura total será 340px */
}`,
          goodPractice: "Use box-sizing: border-box para controle preciso de dimensões",
          avoid: "Esquecer do box-sizing pode causar layouts quebrados",
        },
        {
          name: "Display Types",
          description: "Tipos de display: block, inline, inline-block, none",
          example: `/* ✅ Display Types */
/* Elemento */
h1 { color: blue; }

/* Classe */
.destaque { background: yellow; }

/* ID */
#header { position: fixed; }

/* Universal */
* { box-sizing: border-box; }

/* Atributo */
input[type="email"] { border: 2px solid blue; }
input[required] { border-left: 3px solid red; }

/* ❌ Seletores muito específicos */
div#content .sidebar ul li a.link { /* Muito específico */ }`,
          goodPractice: "Use seletores simples e reutilizáveis, evite especificidade excessiva",
          avoid: "Seletores muito longos e específicos que são difíceis de sobrescrever",
        },
        {
          name: "Display Property - Todos os Valores",
          description: "Propriedade display completa com todos os valores possíveis do CSS conforme MDN",
          example: `/* ✅ OUTSIDE VALUES - Como o elemento participa no flow layout */

.block-element {
  display: block;        /* Gera quebra de linha antes e depois */
  width: 100%;
  background: lightblue;
  margin: 10px 0;
}

.inline-element {
  display: inline;       /* Não gera quebras de linha */
  padding: 5px 10px;     /* Apenas padding horizontal funciona */
  background: lightgreen;
}

.run-in-element {
  display: run-in;       /* Comportamento especial (raramente usado) */
}

/* ✅ INSIDE VALUES - Como o conteúdo interno é organizado */

.flow-container {
  display: flow;         /* Layout de fluxo normal (padrão) */
}

.flow-root-container {
  display: flow-root;    /* Cria novo contexto de formatação */
  background: lightyellow;
  padding: 1rem;
}

.table-container {
  display: table;        /* Comporta-se como <table> */
  width: 100%;
  border-collapse: collapse;
}

.flex-container {
  display: flex;         /* Layout flexível */
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: lightcyan;
}

.grid-container {
  display: grid;         /* Layout em grade */
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
  background: lavender;
}

.ruby-container {
  display: ruby;         /* Para anotações ruby (textos asiáticos) */
  ruby-align: center;
}

.subgrid-container {
  display: subgrid;      /* Herda grid do pai */
  grid-template-columns: subgrid;
}

/* ✅ LIST ITEM */
.custom-list-item {
  display: list-item;    /* Gera marcador de lista */
  list-style-type: disc;
  margin-left: 2rem;
  padding: 0.5rem;
}

/* ✅ INTERNAL VALUES - Para layouts table e ruby */

/* Table internals */
.table-row-group { display: table-row-group; }      /* <tbody> */
.table-header-group { display: table-header-group; } /* <thead> */
.table-footer-group { display: table-footer-group; } /* <tfoot> */
.table-row { display: table-row; }                  /* <tr> */
.table-cell { 
  display: table-cell;                               /* <td> */
  padding: 8px;
  border: 1px solid #ddd;
}
.table-column-group { display: table-column-group; } /* <colgroup> */
.table-column { display: table-column; }            /* <col> */
.table-caption { 
  display: table-caption;                            /* <caption> */
  caption-side: top;
  font-weight: bold;
}

/* Ruby internals */
.ruby-base { display: ruby-base; }                  /* <rb> */
.ruby-text { 
  display: ruby-text;                                /* <rt> */
  font-size: 0.7em;
}
.ruby-base-container { display: ruby-base-container; }
.ruby-text-container { display: ruby-text-container; } /* <rtc> */

/* ✅ BOX VALUES - Controle de geração de caixa */

.contents-element {
  display: contents;     /* Remove a caixa, mantém filhos no layout */
  /* Útil para quebrar hierarquia sem afetar layout */
  border: 2px solid red; /* Esta borda não aparecerá */
}

.hidden-element {
  display: none;         /* Remove completamente do layout e renderização */
  /* Diferente de visibility: hidden que mantém espaço */
}

/* ✅ PRECOMPOSED VALUES - Valores compostos legados */

.inline-block-element {
  display: inline-block; /* = inline flow-root */
  width: 150px;
  height: 100px;
  background: lightcoral;
  vertical-align: top;
}

.inline-table-element {
  display: inline-table;  /* = inline table */
  border: 1px solid #ccc;
  margin: 0 10px;
}

.inline-flex-element {
  display: inline-flex;   /* = inline flex */
  gap: 0.5rem;
  padding: 0.5rem;
  background: lightpink;
}

.inline-grid-element {
  display: inline-grid;   /* = inline grid */
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
  background: lightsteelblue;
}

/* ✅ MULTI-KEYWORD SYNTAX - Sintaxe moderna (CSS Display Level 3) */

.modern-block-flex {
  display: block flex;    /* outside: block + inside: flex */
  gap: 1rem;
}

.modern-inline-flex {
  display: inline flex;   /* outside: inline + inside: flex */
  gap: 0.5rem;
}

.modern-block-grid {
  display: block grid;    /* outside: block + inside: grid */
  grid-template-columns: repeat(2, 1fr);
}

.modern-inline-grid {
  display: inline grid;   /* outside: inline + inside: grid */
  grid-template-columns: 1fr 1fr;
}

.modern-block-flow-root {
  display: block flow-root; /* outside: block + inside: flow-root */
}

.modern-inline-flow-root {
  display: inline flow-root; /* outside: inline + inside: flow-root */
}

/* ✅ GLOBAL VALUES */
.inherit-display {
  display: inherit;       /* Herda do elemento pai */
}

.initial-display {
  display: initial;       /* Valor inicial (inline para a maioria) */
}

.revert-display {
  display: revert;        /* Reverte para valor do user agent stylesheet */
}

.revert-layer-display {
  display: revert-layer;  /* Reverte para camada anterior */
}

.unset-display {
  display: unset;         /* Remove valor definido (= inherit ou initial) */
}

/* ✅ EXEMPLOS PRÁTICOS DE USO */

/* Exemplo: Card layout com diferentes displays */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

.card {
  display: block;         /* Cada card é um bloco */
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  min-width: 200px;
  flex: 1;
}

.card-header {
  display: flex;          /* Header flexível */
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  display: block;         /* Título como bloco */
  font-size: 1.2em;
  font-weight: bold;
}

.card-badge {
  display: inline-block;  /* Badge inline-block para dimensões */
  padding: 0.25rem 0.5rem;
  background: #007bff;
  color: white;
  border-radius: 4px;
  font-size: 0.8em;
}

.card-content {
  display: flow-root;     /* Conteúdo com contexto próprio */
  margin-bottom: 1rem;
}

.card-actions {
  display: flex;          /* Ações em linha */
  gap: 0.5rem;
  justify-content: flex-end;
}

.hidden-details {
  display: none;          /* Detalhes ocultos inicialmente */
}

.show-details .hidden-details {
  display: block;         /* Mostrar quando classe ativa */
}

/* ❌ ERROS COMUNS E COMO EVITAR */

/* ERRO: Tentar definir width/height em inline */
.bad-inline {
  display: inline;
  width: 200px;          /* ❌ Não funciona em inline */
  height: 100px;         /* ❌ Não funciona em inline */
}

/* CORREÇÃO: Use inline-block */
.good-inline-block {
  display: inline-block;
  width: 200px;          /* ✅ Funciona */
  height: 100px;         /* ✅ Funciona */
}

/* ERRO: Usar display: none para acessibilidade */
.bad-hidden {
  display: none;         /* ❌ Remove do screen reader também */
}

/* CORREÇÃO: Use outras técnicas */
.good-hidden {
  position: absolute;
  left: -9999px;         /* ✅ Oculta visualmente, mantém acessível */
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ERRO: Confundir display: contents */
.bad-contents {
  display: contents;
  padding: 1rem;        /* ❌ Padding não será aplicado */
  border: 1px solid;    /* ❌ Border não será aplicado */
}

/* CORREÇÃO: Entender que contents remove a caixa */
.good-contents-parent {
  padding: 1rem;        /* ✅ Aplicar estilos no pai */
  border: 1px solid;
}
.good-contents-child {
  display: contents;    /* ✅ Remove apenas a caixa intermediária */
}

/* ✅ DICAS DE PERFORMANCE */

/* Use display: contents com cuidado - pode afetar performance */
.performance-tip {
  /* Prefira reestruturar HTML a usar contents excessivamente */
  display: flex;        /* Mais performático que contents aninhados */
}

/* ✅ RESPONSIVIDADE COM DISPLAY */
@media (max-width: 768px) {
  .responsive-grid {
    display: block;     /* Grid vira bloco em mobile */
  }
  
  .responsive-flex {
    display: flex;
    flex-direction: column; /* Flex vira coluna */
  }
  
  .desktop-only {
    display: none;      /* Oculta em mobile */
  }
}

@media (min-width: 769px) {
  .mobile-only {
    display: none;      /* Oculta em desktop */
  }
  
  .desktop-grid {
    display: grid;      /* Grid apenas em desktop */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}`,
          goodPractice:
            "Entenda a diferença entre outside (como participa no layout) e inside (como organiza filhos). Use multi-keyword syntax para maior clareza.",
          avoid:
            "Aplicar width/height em elementos inline, ou usar display sem entender o contexto de formatação criado.",
        },
        {
          name: "Display Examples - Comparação Visual",
          description: "Exemplos visuais comparando diferentes valores de display",
          example: `/* ✅ EXEMPLO PRÁTICO - Comparação Visual */

/* Container para demonstração */
.display-demo {
  border: 2px dashed #ccc;
  padding: 10px;
  margin: 10px 0;
  background: #f9f9f9;
}

/* Elementos filhos para teste */
.demo-child {
  background: #007bff;
  color: white;
  padding: 8px 12px;
  margin: 4px;
  border-radius: 4px;
}

/* ✅ BLOCK vs INLINE vs INLINE-BLOCK */
.block-demo .demo-child {
  display: block;        /* Cada um em sua linha */
  width: 200px;
}

.inline-demo .demo-child {
  display: inline;       /* Todos na mesma linha */
  /* width e height ignorados */
}

.inline-block-demo .demo-child {
  display: inline-block; /* Na mesma linha, mas aceita dimensões */
  width: 100px;
  height: 60px;
}

/* ✅ FLEX vs GRID Comparison */
.flex-demo {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.flex-demo .demo-child {
  flex: 1;               /* Crescem igualmente */
  min-width: 100px;
}

.grid-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
}

/* ✅ TABLE Display Values */
.table-demo {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.table-demo .table-header {
  display: table-header-group;
  background: #f0f0f0;
  font-weight: bold;
}

.table-demo .table-body {
  display: table-row-group;
}

.table-demo .table-row {
  display: table-row;
}

.table-demo .table-cell {
  display: table-cell;
  padding: 8px;
  border: 1px solid #ddd;
}

/* ✅ CONTENTS vs NONE */
.contents-demo {
  display: contents;     /* Remove este container */
  /* Filhos se comportam como se fossem filhos do avô */
}

.none-demo {
  display: none;         /* Remove completamente */
  /* Não ocupa espaço, não é renderizado */
}

/* ✅ RESPONSIVE Display */
.responsive-display {
  display: block;
}

@media (min-width: 768px) {
  .responsive-display {
    display: flex;
    justify-content: space-between;
  }
}

@media (min-width: 1024px) {
  .responsive-display {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ✅ MODERN CONTAINER QUERIES */
.container-display {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .container-display .content {
    display: flex;
    gap: 1rem;
  }
}

@container (min-width: 600px) {
  .container-display .content {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}`,
          goodPractice:
            "Use display responsivamente e entenda como cada valor afeta o layout dos elementos filhos e a participação no flow layout.",
          avoid: "Mudar display sem considerar o impacto nos elementos filhos e no layout geral da página.",
        },
      ],
    },
    Selectors: {
      icon: Grid3X3,
      color: "text-green-600",
      topics: [
        {
          name: "Basic Selectors",
          description: "Seletores básicos: elemento, classe, ID, universal",
          example: `/* ✅ Seletores Básicos */
/* Elemento */
h1 { color: blue; }

/* Classe */
.destaque { background: yellow; }

/* ID */
#header { position: fixed; }

/* Universal */
* { box-sizing: border-box; }

/* Atributo */
input[type="email"] { border: 2px solid blue; }
input[required] { border-left: 3px solid red; }

/* ❌ Seletores muito específicos */
div#content .sidebar ul li a.link { /* Muito específico */ }`,
          goodPractice: "Use seletores simples e reutilizáveis, evite especificidade excessiva",
          avoid: "Seletores muito longos e específicos que são difíceis de sobrescrever",
        },
        {
          name: "Combinators",
          description: "Combinadores: descendente, filho, irmão adjacente, irmão geral",
          example: `/* ✅ Combinadores */
/* Descendente (espaço) */
.container p { margin-bottom: 1rem; }

/* Filho direto (>) */
.menu > li { display: inline-block; }

/* Irmão adjacente (+) */
h2 + p { margin-top: 0; }

/* Irmão geral (~) */
h2 ~ p { color: #666; }

/* ❌ Combinadores desnecessários */
div > div > div > p { /* Muito aninhado */ }`,
          goodPractice: "Use combinadores para criar relações específicas entre elementos",
          avoid: "Aninhamento excessivo que torna CSS difícil de manter",
        },
      ],
    },
    Layout: {
      icon: Layout,
      color: "text-purple-600",
      topics: [
        {
          name: "Flexbox",
          description: "Layout flexível unidimensional",
          example: `/* ✅ Flexbox Container */
.flex-container {
  display: flex;
  flex-direction: row;    /* row | column */
  justify-content: space-between; /* main axis */
  align-items: center;    /* cross axis */
  gap: 1rem;             /* Espaçamento entre itens */
  flex-wrap: wrap;       /* Permite quebra de linha */
}

/* Flex Items */
.flex-item {
  flex: 1;               /* flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
  flex-basis: 200px;     /* Tamanho base */
  align-self: flex-start; /* Alinhamento individual */
}

/* ❌ Flexbox mal usado */
.flex-ruim {
  display: flex;
  height: 100vh;         /* Sem align-items pode não centralizar */
}`,
          goodPractice: "Use flexbox para layouts unidimensionais e alinhamento de itens",
          avoid: "Usar flexbox para layouts complexos bidimensionais (use Grid)",
        },
        {
          name: "CSS Grid",
          description: "Layout bidimensional com linhas e colunas",
          example: `/* ✅ CSS Grid */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colunas iguais */
  grid-template-rows: auto 1fr auto;     /* Header, main, footer */
  gap: 2rem;
  min-height: 100vh;
}

/* Grid Areas */
.grid-layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }

/* ❌ Grid desnecessário */
.simple-row {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Use flexbox para casos simples */
}`,
          goodPractice: "Use Grid para layouts bidimensionais complexos",
          avoid: "Grid para layouts simples que flexbox resolve melhor",
        },
      ],
    },
    Styling: {
      icon: Palette,
      color: "text-pink-600",
      topics: [
        {
          name: "Colors & Backgrounds",
          description: "Cores, gradientes e backgrounds",
          example: `/* ✅ Cores e Backgrounds */
.color-examples {
  /* Cores sólidas */
  color: #333333;
  background-color: hsl(210, 100%, 95%);
  
  /* Gradientes */
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  background: radial-gradient(circle, #fff, #f0f0f0);
  
  /* Background images */
  background-image: url('pattern.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* CSS Custom Properties */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --border-radius: 8px;
}

.component {
  background: var(--primary-color);
  border-radius: var(--border-radius);
}

/* ❌ Cores hardcoded */
.bad-colors {
  color: #ff0000; /* Sem variáveis CSS */
  background: red; /* Cores nomeadas limitadas */
}`,
          goodPractice: "Use variáveis CSS para consistência e HSL para melhor controle",
          avoid: "Cores hardcoded e sem sistema de design consistente",
        },
        {
          name: "Typography",
          description: "Tipografia: fontes, tamanhos, espaçamento",
          example: `/* ✅ Tipografia */
/* Importar fontes */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --font-family-base: 'Inter', system-ui, sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;
  --font-scale: 1.25; /* Escala tipográfica */
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}

/* Hierarquia tipográfica */
h1 { font-size: 2.5rem; font-weight: 700; line-height: 1.2; }
h2 { font-size: 2rem; font-weight: 600; line-height: 1.3; }
h3 { font-size: 1.5rem; font-weight: 500; line-height: 1.4; }

/* ❌ Tipografia inconsistente */
.bad-typography {
  font-size: 14px;    /* Tamanhos aleatórios */
  line-height: 1.1;   /* Muito apertado */
  font-family: Arial; /* Fonte não otimizada */
}`,
          goodPractice: "Use escala tipográfica consistente e line-height adequado",
          avoid: "Tamanhos de fonte aleatórios e line-height muito apertado",
        },
      ],
    },
    Animations: {
      icon: Zap,
      color: "text-orange-600",
      topics: [
        {
          name: "Transitions",
          description: "Transições suaves entre estados",
          example: `/* ✅ Transitions */
.button {
  background: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  
  /* Transição suave */
  transition: all 0.3s ease;
  /* Ou específico: */
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.button:active {
  transform: translateY(0);
  transition-duration: 0.1s; /* Mais rápido no clique */
}

/* ❌ Transições ruins */
.bad-transition {
  transition: all 2s linear; /* Muito lenta e linear */
}`,
          goodPractice: "Use transições sutis (0.2-0.3s) com easing natural",
          avoid: "Transições muito longas ou com timing linear",
        },
        {
          name: "Keyframe Animations",
          description: "Animações complexas com keyframes",
          example: `/* ✅ Keyframe Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.fade-in {
  animation: fadeInUp 0.6s ease-out;
}

.loading {
  animation: pulse 2s infinite;
}

/* Controle de animação */
.animation-paused {
  animation-play-state: paused;
}

/* ❌ Animações excessivas */
.bad-animation {
  animation: spin 0.5s linear infinite; /* Muito rápida e irritante */
}`,
          goodPractice: "Use animações para melhorar UX, não apenas decoração",
          avoid: "Animações muito rápidas, infinitas desnecessárias ou que causam enjoo",
        },
      ],
    },
    Advanced: {
      icon: Sparkles,
      color: "text-indigo-600",
      topics: [
        {
          name: "CSS Custom Properties",
          description: "Variáveis CSS nativas",
          example: `/* ✅ CSS Custom Properties */
:root {
  /* Design tokens */
  --color-primary: #007bff;
  --color-primary-dark: #0056b3;
  --color-primary-light: #66b3ff;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  
  --border-radius: 6px;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Tema escuro */
[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-text: #ffffff;
}

.component {
  background: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  
  /* Fallback */
  color: var(--color-text, #333);
}

/* ❌ Sem variáveis */
.hardcoded {
  background: #007bff; /* Repetido em vários lugares */
  padding: 16px;       /* Magic numbers */
}`,
          goodPractice: "Use custom properties para design system consistente",
          avoid: "Valores hardcoded repetidos e magic numbers",
        },
        {
          name: "Modern CSS Features",
          description: "Recursos CSS modernos: container queries, :has(), etc.",
          example: `/* ✅ Modern CSS Features */

/* Container Queries */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    gap: 1rem;
  }
}

/* :has() selector */
.form:has(input:invalid) {
  border: 2px solid red;
}

.card:has(img) {
  padding-top: 0;
}

/* Logical Properties */
.text {
  margin-inline: auto;     /* margin-left + margin-right */
  padding-block: 1rem;     /* padding-top + padding-bottom */
  border-inline-start: 2px solid blue; /* border-left em LTR */
}

/* CSS Nesting */
.component {
  background: white;
  
  & .title {
    font-size: 1.5rem;
    
    &:hover {
      color: blue;
    }
  }
  
  &:has(.error) {
    border-color: red;
  }
}`,
          goodPractice: "Use recursos modernos com fallbacks quando necessário",
          avoid: "Usar recursos muito novos sem verificar suporte do navegador",
        },
      ],
    },
  }

  const filteredCategories = selectedCategory
    ? { [selectedCategory]: cssCategories[selectedCategory as keyof typeof cssCategories] }
    : cssCategories

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
          <Palette className="h-10 w-10" />
          CSS3 Completo
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Guia completo de CSS3 moderno com exemplos práticos, boas práticas e recursos avançados
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <Button variant={selectedCategory === null ? "default" : "outline"} onClick={() => setSelectedCategory(null)}>
          Todas as Categorias
        </Button>
        {Object.entries(cssCategories).map(([category, data]) => {
          const Icon = data.icon
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-2"
            >
              <Icon className={`h-4 w-4 ${data.color}`} />
              {category}
            </Button>
          )
        })}
      </div>

      <div className="space-y-8">
        {Object.entries(filteredCategories).map(([category, data]) => {
          const Icon = data.icon
          return (
            <section key={category}>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Icon className={`h-8 w-8 ${data.color}`} />
                {category}
              </h2>

              <div className="grid gap-6">
                {data.topics.map((topic) => (
                  <Card key={topic.name} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">{topic.name}</CardTitle>
                      <CardDescription className="text-base">{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">Exemplo de Implementação:</h4>
                        <CodeExample code={topic.example} language="css" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong className="text-green-700">✅ Boa Prática:</strong>
                            <p className="text-sm mt-1">{topic.goodPractice}</p>
                          </AlertDescription>
                        </Alert>

                        <Alert variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <strong className="text-red-700">❌ Evite:</strong>
                            <p className="text-sm mt-1">{topic.avoid}</p>
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="properties">Propriedades</TabsTrigger>
          <TabsTrigger value="units">Unidades</TabsTrigger>
          <TabsTrigger value="functions">Funções</TabsTrigger>
          <TabsTrigger value="at-rules">At-Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Propriedades CSS Essenciais</CardTitle>
              <CardDescription>Propriedades mais utilizadas organizadas por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-blue-700">Layout</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <strong>display</strong>: block | inline | flex | grid
                    </div>
                    <div className="p-2 border rounded">
                      <strong>position</strong>: static | relative | absolute | fixed | sticky
                    </div>
                    <div className="p-2 border rounded">
                      <strong>z-index</strong>: número inteiro
                    </div>
                    <div className="p-2 border rounded">
                      <strong>overflow</strong>: visible | hidden | scroll | auto
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-green-700">Dimensões</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <strong>width</strong> / <strong>height</strong>: auto | length | %
                    </div>
                    <div className="p-2 border rounded">
                      <strong>min-width</strong> / <strong>max-width</strong>
                    </div>
                    <div className="p-2 border rounded">
                      <strong>padding</strong>: length | %
                    </div>
                    <div className="p-2 border rounded">
                      <strong>margin</strong>: length | % | auto
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-purple-700">Visual</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <strong>color</strong>: cor do texto
                    </div>
                    <div className="p-2 border rounded">
                      <strong>background</strong>: cor | imagem | gradiente
                    </div>
                    <div className="p-2 border rounded">
                      <strong>border</strong>: width style color
                    </div>
                    <div className="p-2 border rounded">
                      <strong>box-shadow</strong>: x y blur spread color
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="units">
          <Card>
            <CardHeader>
              <CardTitle>Unidades CSS</CardTitle>
              <CardDescription>Diferentes tipos de unidades e quando usar cada uma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-blue-700">Unidades Absolutas</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <strong>px</strong> - Pixels (mais comum para detalhes)
                    </div>
                    <div className="p-2 border rounded">
                      <strong>pt</strong> - Points (impressão)
                    </div>
                    <div className="p-2 border rounded">
                      <strong>cm, mm, in</strong> - Unidades físicas
                    </div>
                  </div>

                  <h4 className="font-medium mb-3 mt-6 text-green-700">Unidades Relativas</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <strong>rem</strong> - Relativo ao font-size do root
                    </div>
                    <div className="p-2 border rounded">
                      <strong>em</strong> - Relativo ao font-size do elemento pai
                    </div>
                    <div className="p-2 border rounded">
                      <strong>%</strong> - Porcentagem do elemento pai
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-purple-700">Viewport Units</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <strong>vw</strong> - 1% da largura da viewport
                    </div>
                    <div className="p-2 border rounded">
                      <strong>vh</strong> - 1% da altura da viewport
                    </div>
                    <div className="p-2 border rounded">
                      <strong>vmin</strong> - 1% da menor dimensão
                    </div>
                    <div className="p-2 border rounded">
                      <strong>vmax</strong> - 1% da maior dimensão
                    </div>
                  </div>

                  <h4 className="font-medium mb-3 mt-6 text-orange-700">Unidades Modernas</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <strong>ch</strong> - Largura do caractere "0"
                    </div>
                    <div className="p-2 border rounded">
                      <strong>ex</strong> - Altura do "x" minúsculo
                    </div>
                    <div className="p-2 border rounded">
                      <strong>fr</strong> - Fração do espaço disponível (Grid)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="functions">
          <Card>
            <CardHeader>
              <CardTitle>Funções CSS</CardTitle>
              <CardDescription>Funções úteis para cálculos e transformações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded">
                    <h5 className="font-medium mb-2">calc()</h5>
                    <p className="text-sm text-muted-foreground mb-2">Cálculos matemáticos</p>
                    <CodeExample
                      code={`width: calc(100% - 20px);
height: calc(100vh - 60px);
margin: calc(1rem + 2px);`}
                      language="css"
                    />
                  </div>

                  <div className="p-4 border rounded">
                    <h5 className="font-medium mb-2">clamp()</h5>
                    <p className="text-sm text-muted-foreground mb-2">Valor entre mín e máx</p>
                    <CodeExample
                      code={`font-size: clamp(1rem, 4vw, 2rem);
width: clamp(200px, 50%, 800px);`}
                      language="css"
                    />
                  </div>

                  <div className="p-4 border rounded">
                    <h5 className="font-medium mb-2">min() / max()</h5>
                    <p className="text-sm text-muted-foreground mb-2">Menor/maior valor</p>
                    <CodeExample
                      code={`width: min(500px, 100%);
height: max(200px, 50vh);`}
                      language="css"
                    />
                  </div>

                  <div className="p-4 border rounded">
                    <h5 className="font-medium mb-2">var()</h5>
                    <p className="text-sm text-muted-foreground mb-2">Variáveis CSS</p>
                    <CodeExample
                      code={`color: var(--primary-color);
margin: var(--spacing, 1rem);`}
                      language="css"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="at-rules">
          <Card>
            <CardHeader>
              <CardTitle>At-Rules CSS</CardTitle>
              <CardDescription>Regras especiais que começam com @</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded">
                    <h5 className="font-medium mb-2">@media</h5>
                    <p className="text-sm text-muted-foreground mb-2">Media queries responsivas</p>
                    <CodeExample
                      code={`@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: white;
  }
}`}
                      language="css"
                    />
                  </div>

                  <div className="p-4 border rounded">
                    <h5 className="font-medium mb-2">@container</h5>
                    <p className="text-sm text-muted-foreground mb-2">Container queries</p>
                    <CodeExample
                      code={`.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
  }
}`}
                      language="css"
                    />
                  </div>

                  <div className="p-4 border rounded">
                    <h5 className="font-medium mb-2">@keyframes</h5>
                    <p className="text-sm text-muted-foreground mb-2">Definir animações</p>
                    <CodeExample
                      code={`@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}`}
                      language="css"
                    />
                  </div>

                  <div className="p-4 border rounded">
                    <h5 className="font-medium mb-2">@import</h5>
                    <p className="text-sm text-muted-foreground mb-2">Importar CSS externo</p>
                    <CodeExample
                      code={`@import url('fonts.css');
@import url('components.css') screen;`}
                      language="css"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
