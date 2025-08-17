"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Settings, Type, CheckCircle, AlertTriangle, Eye, Hand, Brain, Wrench } from "lucide-react"

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

export function AccessibilitySection() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  const wcagGuidelines = {
    "Nível A": [
      {
        id: "1.1.1",
        name: "Conteúdo Não Textual",
        principle: "Perceptível",
        description: "Todo conteúdo não textual deve ter uma alternativa textual que serve ao mesmo propósito.",
        example: `<!-- ✅ Correto -->
<img src="grafico-vendas.png" alt="Gráfico mostrando aumento de 25% nas vendas em 2024">

<!-- ✅ Imagem decorativa -->
<img src="decoracao.png" alt="" role="presentation">

<!-- ❌ Incorreto -->
<img src="grafico-vendas.png" alt="grafico">
<img src="importante.png">`,
        goodPractice: "Use alt text descritivo que transmita o mesmo significado da imagem",
        avoid: "Alt text genérico como 'imagem', 'foto' ou vazio para imagens informativas",
      },
      {
        id: "1.3.1",
        name: "Informações e Relacionamentos",
        principle: "Perceptível",
        description:
          "Informações, estrutura e relacionamentos transmitidos pela apresentação podem ser determinados programaticamente.",
        example: `<!-- ✅ Correto - Estrutura semântica -->
<form>
  <fieldset>
    <legend>Informações Pessoais</legend>
    <label for="nome">Nome:</label>
    <input type="text" id="nome" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" required>
  </fieldset>
</form>

<!-- ❌ Incorreto - Sem estrutura -->
<div>
  <div>Nome:</div>
  <input type="text">
  <div>Email:</div>
  <input type="text">
</div>`,
        goodPractice: "Use elementos semânticos (headings, labels, fieldsets) para estruturar conteúdo",
        avoid: "Depender apenas de formatação visual para transmitir estrutura",
      },
      {
        id: "1.3.2",
        name: "Sequência com Significado",
        principle: "Perceptível",
        description:
          "Quando a sequência de apresentação afeta o significado, a sequência de leitura correta pode ser determinada programaticamente.",
        example: `<!-- ✅ Correto - Ordem lógica no HTML -->
<article>
  <h2>Título do Artigo</h2>
  <p>Primeiro parágrafo...</p>
  <p>Segundo parágrafo...</p>
  <aside>Informação relacionada</aside>
</article>

<!-- ❌ Incorreto - Ordem visual diferente da lógica -->
<div style="display: flex; flex-direction: column-reverse;">
  <p>Este parágrafo aparece primeiro visualmente</p>
  <h2>Mas o título vem depois no HTML</h2>
</div>`,
        goodPractice: "Mantenha a ordem lógica no HTML mesmo quando usar CSS para reordenar visualmente",
        avoid: "Usar CSS para criar ordem visual que contradiz a ordem lógica do conteúdo",
      },
      {
        id: "2.1.1",
        name: "Teclado",
        principle: "Operável",
        description: "Toda funcionalidade deve estar disponível via teclado.",
        example: `<!-- ✅ Correto - Elementos focáveis -->
<button onclick="abrirModal()">Abrir Modal</button>
<a href="#secao1">Ir para Seção 1</a>

<div role="button" tabindex="0" 
     onclick="executarAcao()"
     onkeydown="handleKeyDown(event)">
  Botão Customizado
</div>

<script>
function handleKeyDown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    executarAcao();
  }
}
</script>

<!-- ❌ Incorreto - Apenas mouse -->
<div onclick="executarAcao()">Clique aqui</div>`,
        goodPractice: "Todos os elementos interativos devem ser acessíveis via teclado",
        avoid: "Funcionalidades que dependem exclusivamente de mouse ou touch",
      },
      {
        id: "2.1.2",
        name: "Sem Armadilha de Teclado",
        principle: "Operável",
        description: "O foco do teclado não deve ficar preso em nenhum componente da página.",
        example: `<!-- ✅ Correto - Modal com escape -->
<div role="dialog" aria-modal="true">
  <h2>Modal Title</h2>
  <button onclick="fecharModal()">Fechar</button>
  <button onclick="confirmar()">Confirmar</button>
</div>

<script>
// Gerenciar foco no modal
function abrirModal() {
  modal.style.display = 'block';
  modal.querySelector('button').focus();
  document.addEventListener('keydown', handleEscape);
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    fecharModal();
  }
}
</script>`,
        goodPractice: "Sempre forneça uma forma de sair de componentes que capturam foco",
        avoid: "Modais ou componentes que prendem o foco sem possibilidade de escape",
      },
      {
        id: "3.1.1",
        name: "Idioma da Página",
        principle: "Compreensível",
        description: "O idioma padrão de cada página web pode ser determinado programaticamente.",
        example: `<!-- ✅ Correto -->
<html lang="pt-BR">
  <head>
    <title>Minha Página</title>
  </head>
  <body>
    <p>Conteúdo em português</p>
    <p lang="en">Content in English</p>
  </body>
</html>

<!-- ❌ Incorreto -->
<html>
  <body>
    <p>Conteúdo sem idioma definido</p>
  </body>
</html>`,
        goodPractice: "Sempre defina o idioma principal da página e idiomas específicos quando necessário",
        avoid: "Páginas sem atributo lang ou com idioma incorreto",
      },
      {
        id: "4.1.1",
        name: "Análise",
        principle: "Robusto",
        description: "O conteúdo deve usar markup válido que pode ser analisado de forma confiável.",
        example: `<!-- ✅ Correto - HTML válido -->
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Enviar</button>
</form>

<!-- ❌ Incorreto - HTML inválido -->
<form>
  <label>Email:</label>
  <input type="email" required>
  <button>Enviar
</form>`,
        goodPractice: "Use HTML válido com elementos fechados corretamente e atributos únicos",
        avoid: "Tags não fechadas, IDs duplicados, atributos inválidos",
      },
    ],
    "Nível AA": [
      {
        id: "1.2.4",
        name: "Legendas (Ao Vivo)",
        principle: "Perceptível",
        description: "Legendas são fornecidas para todo conteúdo de áudio ao vivo em mídia sincronizada.",
        example: `<!-- ✅ Correto - Vídeo com legendas -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="legendas-pt.vtt" srclang="pt" label="Português">
  <track kind="captions" src="legendas-en.vtt" srclang="en" label="English">
</video>

<!-- Para transmissões ao vivo -->
<div id="live-captions" aria-live="polite" aria-label="Legendas ao vivo">
  <!-- Legendas inseridas dinamicamente -->
</div>`,
        goodPractice: "Forneça legendas precisas e sincronizadas para todo conteúdo de áudio",
        avoid: "Vídeos ou transmissões ao vivo sem opção de legendas",
      },
      {
        id: "1.4.3",
        name: "Contraste (Mínimo)",
        principle: "Perceptível",
        description:
          "A apresentação visual de texto e imagens de texto tem uma relação de contraste de pelo menos 4.5:1.",
        example: `/* ✅ Correto - Contraste adequado */
.texto-normal {
  color: #333333; /* Contraste 12.6:1 com fundo branco */
  background-color: #ffffff;
}

.texto-grande {
  color: #666666; /* Contraste 5.7:1 - OK para texto grande */
  background-color: #ffffff;
  font-size: 18px;
  font-weight: bold;
}

/* ❌ Incorreto - Contraste insuficiente */
.texto-ruim {
  color: #cccccc; /* Contraste 1.6:1 - muito baixo */
  background-color: #ffffff;
}`,
        goodPractice: "Use ferramentas para verificar contraste: 4.5:1 para texto normal, 3:1 para texto grande",
        avoid: "Cores com contraste insuficiente, especialmente cinzas claros",
      },
      {
        id: "1.4.4",
        name: "Redimensionar Texto",
        principle: "Perceptível",
        description:
          "O texto pode ser redimensionado até 200% sem tecnologia assistiva e sem perda de conteúdo ou funcionalidade.",
        example: `/* ✅ Correto - Unidades relativas */
body {
  font-size: 16px; /* Base */
}

h1 {
  font-size: 2rem; /* 32px, escala com zoom */
}

.container {
  max-width: 60rem; /* Escala com texto */
  padding: 1rem;
}

/* ❌ Incorreto - Unidades fixas */
.texto-fixo {
  font-size: 14px;
  width: 300px; /* Não escala */
  height: 200px; /* Pode causar overflow */
}`,
        goodPractice: "Use unidades relativas (rem, em, %) para permitir zoom adequado",
        avoid: "Unidades fixas (px) para texto e containers que podem quebrar com zoom",
      },
      {
        id: "2.4.1",
        name: "Ignorar Blocos",
        principle: "Operável",
        description:
          "Um mecanismo está disponível para ignorar blocos de conteúdo que se repetem em múltiplas páginas.",
        example: `<!-- ✅ Correto - Skip links -->
<body>
  <a href="#main-content" class="skip-link">Pular para conteúdo principal</a>
  <a href="#navigation" class="skip-link">Pular para navegação</a>
  
  <header>
    <nav id="navigation">
      <!-- Menu de navegação -->
    </nav>
  </header>
  
  <main id="main-content">
    <h1>Conteúdo Principal</h1>
    <!-- Conteúdo da página -->
  </main>
</body>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
</style>`,
        goodPractice: "Forneça skip links visíveis no foco para pular navegação repetitiva",
        avoid: "Páginas sem mecanismo para pular blocos repetitivos de conteúdo",
      },
      {
        id: "2.4.2",
        name: "Título da Página",
        principle: "Operável",
        description: "As páginas web têm títulos que descrevem tópico ou propósito.",
        example: `<!-- ✅ Correto - Títulos descritivos -->
<title>Contato - Empresa XYZ</title>
<title>Carrinho de Compras (3 itens) - Loja Online</title>
<title>Erro 404: Página não encontrada - Site Principal</title>

<!-- ❌ Incorreto - Títulos genéricos -->
<title>Página</title>
<title>Site</title>
<title>Untitled Document</title>`,
        goodPractice: "Use títulos únicos e descritivos que identifiquem claramente cada página",
        avoid: "Títulos genéricos, vazios ou idênticos em páginas diferentes",
      },
      {
        id: "3.1.2",
        name: "Idioma de Partes",
        principle: "Compreensível",
        description: "O idioma de cada passagem ou frase no conteúdo pode ser determinado programaticamente.",
        example: `<!-- ✅ Correto - Idiomas específicos -->
<p>Este parágrafo está em português.</p>
<p lang="en">This paragraph is in English.</p>
<p>Voltamos ao português, mas temos uma palavra em 
   <span lang="fr">français</span> aqui.</p>

<blockquote lang="es">
  <p>Esta cita está completamente en español.</p>
</blockquote>`,
        goodPractice: "Marque mudanças de idioma com atributo lang para leitores de tela",
        avoid: "Texto em idiomas diferentes sem marcação adequada",
      },
      {
        id: "4.1.2",
        name: "Nome, Função, Valor",
        principle: "Robusto",
        description: "Para todos os componentes de interface, nome e função podem ser determinados programaticamente.",
        example: `<!-- ✅ Correto - Componentes acessíveis -->
<button aria-label="Fechar modal" onclick="fecharModal()">×</button>

<input type="checkbox" id="aceito" aria-describedby="aceito-desc">
<label for="aceito">Aceito os termos</label>
<div id="aceito-desc">Você deve aceitar para continuar</div>

<div role="slider" 
     aria-valuemin="0" 
     aria-valuemax="100" 
     aria-valuenow="50"
     aria-label="Volume"
     tabindex="0">
  <div class="slider-thumb"></div>
</div>

<!-- ❌ Incorreto - Sem informações acessíveis -->
<div onclick="fecharModal()">×</div>
<input type="checkbox">
<div class="slider"></div>`,
        goodPractice: "Todos os componentes devem ter nome, função e estado acessíveis",
        avoid: "Componentes customizados sem informações adequadas para tecnologias assistivas",
      },
    ],
    "Nível AAA": [
      {
        id: "1.2.6",
        name: "Linguagem de Sinais (Pré-gravada)",
        principle: "Perceptível",
        description:
          "Interpretação em linguagem de sinais é fornecida para todo conteúdo de áudio pré-gravado em mídia sincronizada.",
        example: `<!-- ✅ Implementação de linguagem de sinais -->
<video controls>
  <source src="video-principal.mp4" type="video/mp4">
  <source src="video-com-libras.mp4" type="video/mp4" data-sign-language="true">
  <track kind="captions" src="legendas.vtt" srclang="pt" label="Português">
</video>

<button onclick="toggleSignLanguage()">
  Alternar Interpretação em Libras
</button>`,
        goodPractice: "Forneça interpretação em linguagem de sinais para conteúdo importante",
        avoid: "Vídeos importantes sem opção de linguagem de sinais",
      },
      {
        id: "1.4.6",
        name: "Contraste (Melhorado)",
        principle: "Perceptível",
        description:
          "A apresentação visual de texto e imagens de texto tem uma relação de contraste de pelo menos 7:1.",
        example: `/* ✅ Correto - Contraste melhorado */
.texto-aaa {
  color: #000000; /* Contraste 21:1 com fundo branco */
  background-color: #ffffff;
}

.texto-escuro {
  color: #ffffff; /* Contraste 21:1 com fundo escuro */
  background-color: #000000;
}

/* ❌ Apenas AA - Insuficiente para AAA */
.texto-aa {
  color: #666666; /* Contraste 5.7:1 - OK para AA, não AAA */
  background-color: #ffffff;
}`,
        goodPractice: "Use contraste de 7:1 para texto normal e 4.5:1 para texto grande no nível AAA",
        avoid: "Contrastes que atendem apenas AA quando AAA é necessário",
      },
      {
        id: "1.4.8",
        name: "Apresentação Visual",
        principle: "Perceptível",
        description:
          "Para a apresentação visual de blocos de texto, um mecanismo está disponível para conseguir o seguinte: largura não superior a 80 caracteres, texto não justificado, espaçamento de linha de pelo menos 1.5x o tamanho da fonte.",
        example: `/* ✅ Correto - Formatação legível */
.texto-legivel {
  max-width: 80ch; /* Máximo 80 caracteres por linha */
  line-height: 1.6; /* 1.5x ou mais */
  text-align: left; /* Não justificado */
  margin-bottom: 1.5em; /* Espaçamento entre parágrafos */
}

.configuracoes-usuario {
  /* Permitir que usuário ajuste */
  font-size: var(--user-font-size, 1rem);
  line-height: var(--user-line-height, 1.6);
  letter-spacing: var(--user-letter-spacing, normal);
}

/* ❌ Incorreto - Formatação difícil */
.texto-dificil {
  width: 100%; /* Linhas muito longas */
  line-height: 1.2; /* Muito apertado */
  text-align: justify; /* Espaçamento irregular */
}`,
        goodPractice: "Limite largura de texto, use espaçamento adequado e evite justificação",
        avoid: "Linhas muito longas, espaçamento apertado ou texto justificado",
      },
      {
        id: "2.1.3",
        name: "Teclado (Sem Exceção)",
        principle: "Operável",
        description: "Toda funcionalidade do conteúdo é operável através de uma interface de teclado sem exceções.",
        example: `<!-- ✅ Correto - Funcionalidade completa via teclado -->
<div class="drawing-canvas" 
     role="application"
     aria-label="Canvas de desenho"
     tabindex="0"
     onkeydown="handleCanvasKeyboard(event)">
  <!-- Canvas acessível via teclado -->
</div>

<script>
function handleCanvasKeyboard(event) {
  switch(event.key) {
    case 'ArrowUp':
      moveCursor(0, -1);
      break;
    case 'ArrowDown':
      moveCursor(0, 1);
      break;
    case ' ':
      drawPixel();
      break;
    case 'Enter':
      confirmDrawing();
      break;
  }
}
</script>`,
        goodPractice: "Mesmo funcionalidades complexas devem ter alternativas de teclado",
        avoid: "Qualquer funcionalidade que seja impossível de usar apenas com teclado",
      },
      {
        id: "2.4.8",
        name: "Localização",
        principle: "Operável",
        description: "Informação sobre a localização do usuário dentro de um conjunto de páginas web está disponível.",
        example: `<!-- ✅ Correto - Breadcrumbs e indicadores -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Início</a></li>
    <li><a href="/produtos">Produtos</a></li>
    <li><a href="/produtos/eletronicos">Eletrônicos</a></li>
    <li aria-current="page">Smartphones</li>
  </ol>
</nav>

<nav aria-label="Navegação principal">
  <ul>
    <li><a href="/">Início</a></li>
    <li><a href="/produtos" aria-current="page">Produtos</a></li>
    <li><a href="/sobre">Sobre</a></li>
  </ul>
</nav>`,
        goodPractice: "Use breadcrumbs, indicadores de página atual e navegação clara",
        avoid: "Páginas sem indicação de localização no site",
      },
      {
        id: "3.1.3",
        name: "Palavras Incomuns",
        principle: "Compreensível",
        description:
          "Um mecanismo está disponível para identificar definições específicas de palavras ou frases usadas de forma incomum.",
        example: `<!-- ✅ Correto - Definições disponíveis -->
<p>O processo de <dfn title="Transformação digital de documentos físicos">digitalização</dfn> 
   será concluído em breve.</p>

<p>Utilizamos <abbr title="Application Programming Interface">API</abbr> 
   para integração entre sistemas.</p>

<dl>
  <dt>Heurística</dt>
  <dd>Método de resolução de problemas baseado em experiência prática</dd>
</dl>

<!-- Glossário linkado -->
<p>O termo <a href="#glossario-ux">UX</a> é fundamental no design.</p>`,
        goodPractice: "Forneça definições para jargões, abreviações e termos técnicos",
        avoid: "Uso de termos especializados sem explicação ou definição",
      },
    ],
  }

  const filteredGuidelines = selectedLevel
    ? { [selectedLevel]: wcagGuidelines[selectedLevel as keyof typeof wcagGuidelines] }
    : wcagGuidelines

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
          <Shield className="h-10 w-10" />
          Acessibilidade Web - WCAG 2.1
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Guia completo das Diretrizes de Acessibilidade para Conteúdo Web (WCAG 2.1) com exemplos práticos
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <Button variant={selectedLevel === null ? "default" : "outline"} onClick={() => setSelectedLevel(null)}>
          Todos os Níveis
        </Button>
        {Object.keys(wcagGuidelines).map((level) => (
          <Button
            key={level}
            variant={selectedLevel === level ? "default" : "outline"}
            onClick={() => setSelectedLevel(level)}
            className="flex items-center gap-2"
          >
            {level === "Nível A" && <Badge variant="secondary">A</Badge>}
            {level === "Nível AA" && <Badge variant="default">AA</Badge>}
            {level === "Nível AAA" && <Badge variant="destructive">AAA</Badge>}
            {level}
          </Button>
        ))}
      </div>

      <div className="space-y-8">
        {Object.entries(filteredGuidelines).map(([level, guidelines]) => (
          <section key={level}>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              {level === "Nível A" && <Eye className="h-8 w-8 text-green-600" />}
              {level === "Nível AA" && <Hand className="h-8 w-8 text-blue-600" />}
              {level === "Nível AAA" && <Brain className="h-8 w-8 text-purple-600" />}
              {level}
              <Badge variant={level === "Nível A" ? "secondary" : level === "Nível AA" ? "default" : "destructive"}>
                {level.split(" ")[1]}
              </Badge>
            </h2>

            <div className="grid gap-6">
              {guidelines.map((guideline) => (
                <Card key={guideline.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono">
                            {guideline.id}
                          </Badge>
                          {guideline.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{guideline.principle}</Badge>
                          {guideline.principle === "Perceptível" && <Eye className="h-4 w-4" />}
                          {guideline.principle === "Operável" && <Hand className="h-4 w-4" />}
                          {guideline.principle === "Compreensível" && <Brain className="h-4 w-4" />}
                          {guideline.principle === "Robusto" && <Wrench className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base">{guideline.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Exemplo de Implementação:</h4>
                      <CodeExample code={guideline.example} language="html" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong className="text-green-700">✅ Boa Prática:</strong>
                          <p className="text-sm mt-1">{guideline.goodPractice}</p>
                        </AlertDescription>
                      </Alert>

                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong className="text-red-700">❌ Evite:</strong>
                          <p className="text-sm mt-1">{guideline.avoid}</p>
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Tabs defaultValue="aria-roles" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="aria-roles">ARIA Roles</TabsTrigger>
          <TabsTrigger value="aria-attributes">Atributos ARIA</TabsTrigger>
          <TabsTrigger value="principles">Princípios</TabsTrigger>
          <TabsTrigger value="testing">Testes</TabsTrigger>
        </TabsList>

        <TabsContent value="aria-roles">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                ARIA Roles
              </CardTitle>
              <CardDescription>Roles definem o que um elemento é ou faz na interface</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="landmark" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="landmark">Landmark</TabsTrigger>
                  <TabsTrigger value="widget">Widget</TabsTrigger>
                  <TabsTrigger value="document">Document</TabsTrigger>
                  <TabsTrigger value="live">Live Region</TabsTrigger>
                </TabsList>

                {/* ... existing TabsContent sections ... */}
                <TabsContent value="landmark" className="space-y-4">
                  <h4 className="font-medium">Landmark Roles - Estrutura da Página</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">banner</h5>
                        <p className="text-xs text-muted-foreground">Cabeçalho principal da página</p>
                        <CodeExample
                          code={`<header role="banner">
  <h1>Site Principal</h1>
  <nav>...</nav>
</header>`}
                          language="html"
                        />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">navigation</h5>
                        <p className="text-xs text-muted-foreground">Menu de navegação</p>
                        <CodeExample
                          code={`<nav role="navigation" aria-label="Menu principal">
  <ul>
    <li><a href="/">Início</a></li>
    <li><a href="/sobre">Sobre</a></li>
  </ul>
</nav>`}
                          language="html"
                        />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">main</h5>
                        <p className="text-xs text-muted-foreground">Conteúdo principal</p>
                        <CodeExample
                          code={`<main role="main">
  <h1>Título da Página</h1>
  <article>Conteúdo principal...</article>
</main>`}
                          language="html"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">complementary</h5>
                        <p className="text-xs text-muted-foreground">Conteúdo complementar (sidebar)</p>
                        <CodeExample
                          code={`<aside role="complementary" aria-label="Artigos relacionados">
  <h2>Leia também</h2>
  <ul>...</ul>
</aside>`}
                          language="html"
                        />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">contentinfo</h5>
                        <p className="text-xs text-muted-foreground">Rodapé da página</p>
                        <CodeExample
                          code={`<footer role="contentinfo">
  <p>&copy; 2024 Empresa</p>
  <nav aria-label="Links do rodapé">...</nav>
</footer>`}
                          language="html"
                        />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">search</h5>
                        <p className="text-xs text-muted-foreground">Funcionalidade de busca</p>
                        <CodeExample
                          code={`<form role="search" aria-label="Buscar no site">
  <label for="busca">Buscar:</label>
  <input type="search" id="busca">
  <button type="submit">Buscar</button>
</form>`}
                          language="html"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="widget" className="space-y-4">
                  <h4 className="font-medium">Widget Roles - Componentes Interativos</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">button</h5>
                        <p className="text-xs text-muted-foreground">Elemento clicável</p>
                        <CodeExample
                          code={`<div role="button" tabindex="0" 
     aria-pressed="false"
     onKeyDown={handleKeyDown}>
  Botão Customizado
</div>`}
                          language="html"
                        />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">tab / tablist / tabpanel</h5>
                        <p className="text-xs text-muted-foreground">Sistema de abas</p>
                        <CodeExample
                          code={`<div role="tablist" aria-label="Configurações">
  <button role="tab" aria-selected="true" 
          aria-controls="panel1">Geral</button>
  <button role="tab" aria-selected="false" 
          aria-controls="panel2">Avançado</button>
</div>
<div role="tabpanel" id="panel1">...</div>`}
                          language="html"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">dialog</h5>
                        <p className="text-xs text-muted-foreground">Modal ou diálogo</p>
                        <CodeExample
                          code={`<div role="dialog" aria-modal="true" 
     aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirmar ação</h2>
  <p>Tem certeza?</p>
  <button>Sim</button>
  <button>Cancelar</button>
</div>`}
                          language="html"
                        />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">combobox</h5>
                        <p className="text-xs text-muted-foreground">Campo com lista de opções</p>
                        <CodeExample
                          code={`<input role="combobox" 
       aria-expanded="false"
       aria-haspopup="listbox"
       aria-controls="options">
<ul role="listbox" id="options">
  <li role="option">Opção 1</li>
</ul>`}
                          language="html"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="document" className="space-y-4">
                  <h4 className="font-medium">Document Structure Roles</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">article</h5>
                        <p className="text-xs text-muted-foreground">Conteúdo independente</p>
                        <CodeExample
                          code={`<div role="article" aria-labelledby="art-title">
  <h2 id="art-title">Título do Artigo</h2>
  <p>Conteúdo do artigo...</p>
</div>`}
                          language="html"
                        />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">heading</h5>
                        <p className="text-xs text-muted-foreground">Cabeçalho com nível específico</p>
                        <CodeExample
                          code={`<div role="heading" aria-level="2">
  Título de Nível 2
</div>`}
                          language="html"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">list / listitem</h5>
                        <p className="text-xs text-muted-foreground">Lista e itens de lista</p>
                        <CodeExample
                          code={`<div role="list">
  <div role="listitem">Item 1</div>
  <div role="listitem">Item 2</div>
  <div role="listitem">Item 3</div>
</div>`}
                          language="html"
                        />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">table / row / cell</h5>
                        <p className="text-xs text-muted-foreground">Estrutura de tabela</p>
                        <CodeExample
                          code={`<div role="table" aria-label="Vendas">
  <div role="row">
    <div role="columnheader">Produto</div>
    <div role="columnheader">Valor</div>
  </div>
  <div role="row">
    <div role="cell">Produto A</div>
    <div role="cell">R$ 100</div>
  </div>
</div>`}
                          language="html"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="live" className="space-y-4">
                  <h4 className="font-medium">Live Regions - Atualizações Dinâmicas</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">alert</h5>
                        <p className="text-xs text-muted-foreground">Mensagem importante e urgente</p>
                        <CodeExample
                          code={`<div role="alert" aria-live="assertive">
  Erro: Preencha todos os campos obrigatórios
</div>`}
                          language="html"
                        />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">status</h5>
                        <p className="text-xs text-muted-foreground">Informação de status</p>
                        <CodeExample
                          code={`<div role="status" aria-live="polite">
  Salvando... 3 de 5 itens processados
</div>`}
                          language="html"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">log</h5>
                        <p className="text-xs text-muted-foreground">Registro de atividades</p>
                        <CodeExample
                          code={`<div role="log" aria-live="polite" aria-label="Log de atividades">
  <p>10:30 - Usuário fez login</p>
  <p>10:32 - Documento salvo</p>
</div>`}
                          language="html"
                        />
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">progressbar</h5>
                        <p className="text-xs text-muted-foreground">Barra de progresso</p>
                        <CodeExample
                          code={`<div role="progressbar" 
     aria-valuenow="32" 
     aria-valuemin="0" 
     aria-valuemax="100"
     aria-label="Progresso do upload">
  32% completo
</div>`}
                          language="html"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aria-attributes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-green-600" />
                Atributos ARIA Essenciais
              </CardTitle>
              <CardDescription>
                Atributos que fornecem informações adicionais para tecnologias assistivas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-700">Labeling</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <strong>aria-label</strong>
                      <p className="text-muted-foreground">Rótulo acessível</p>
                      <CodeExample code={`<button aria-label="Fechar modal">×</button>`} language="html" />
                    </div>
                    <div className="p-2 border rounded">
                      <strong>aria-labelledby</strong>
                      <p className="text-muted-foreground">Referencia elemento que rotula</p>
                      <CodeExample
                        code={`<h2 id="billing">Cobrança</h2>
<div aria-labelledby="billing">...</div>`}
                        language="html"
                      />
                    </div>
                    <div className="p-2 border rounded">
                      <strong>aria-describedby</strong>
                      <p className="text-muted-foreground">Referencia descrição adicional</p>
                      <CodeExample
                        code={`<input aria-describedby="pwd-help">
<div id="pwd-help">Mín. 8 caracteres</div>`}
                        language="html"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-700">Estados</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <strong>aria-expanded</strong>
                      <p className="text-muted-foreground">Indica se está expandido</p>
                      <CodeExample
                        code={`<button aria-expanded="false" 
        aria-controls="menu">Menu</button>`}
                        language="html"
                      />
                    </div>
                    <div className="p-2 border rounded">
                      <strong>aria-selected</strong>
                      <p className="text-muted-foreground">Item selecionado</p>
                      <CodeExample
                        code={`<li role="option" aria-selected="true">
  Opção selecionada
</li>`}
                        language="html"
                      />
                    </div>
                    <div className="p-2 border rounded">
                      <strong>aria-checked</strong>
                      <p className="text-muted-foreground">Estado de checkbox/radio</p>
                      <CodeExample
                        code={`<div role="checkbox" aria-checked="true">
  Opção marcada
</div>`}
                        language="html"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-orange-700">Relacionamentos</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <strong>aria-controls</strong>
                      <p className="text-muted-foreground">Elemento que controla</p>
                      <CodeExample
                        code={`<button aria-controls="panel1">
  Abrir Painel
</button>
<div id="panel1">...</div>`}
                        language="html"
                      />
                    </div>
                    <div className="p-2 border rounded">
                      <strong>aria-owns</strong>
                      <p className="text-muted-foreground">Elementos filhos lógicos</p>
                      <CodeExample
                        code={`<div aria-owns="item1 item2">
  <div id="item1">Item 1</div>
</div>
<div id="item2">Item 2</div>`}
                        language="html"
                      />
                    </div>
                    <div className="p-2 border rounded">
                      <strong>aria-haspopup</strong>
                      <p className="text-muted-foreground">Indica tipo de popup</p>
                      <CodeExample
                        code={`<button aria-haspopup="menu">
  Opções
</button>`}
                        language="html"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="principles">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-green-600" />
                  Perceptível
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Informações devem ser apresentadas de forma que usuários possam percebê-las
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Alternativas textuais</li>
                  <li>• Legendas e transcrições</li>
                  <li>• Contraste adequado</li>
                  <li>• Redimensionamento</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hand className="h-5 w-5 text-blue-600" />
                  Operável
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Interface deve ser operável por todos os usuários</p>
                <ul className="text-sm space-y-1">
                  <li>• Acessível via teclado</li>
                  <li>• Tempo suficiente</li>
                  <li>• Sem convulsões</li>
                  <li>• Navegação clara</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Compreensível
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Informações e operação da interface devem ser compreensíveis
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Texto legível</li>
                  <li>• Conteúdo previsível</li>
                  <li>• Assistência na entrada</li>
                  <li>• Idioma identificado</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-orange-600" />
                  Robusto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Conteúdo deve ser robusto o suficiente para diferentes tecnologias assistivas
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Markup válido</li>
                  <li>• Compatibilidade</li>
                  <li>• Nome, função, valor</li>
                  <li>• Mudanças de estado</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="testing">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Ferramentas de Teste
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Ferramentas Automáticas</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• axe DevTools (extensão do navegador)</li>
                      <li>• WAVE Web Accessibility Evaluator</li>
                      <li>• Lighthouse (auditoria de acessibilidade)</li>
                      <li>• Pa11y (linha de comando)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Testes Manuais</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Navegação apenas com teclado</li>
                      <li>• Teste com leitor de tela</li>
                      <li>• Verificação de contraste</li>
                      <li>• Zoom até 200%</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Checklist de Acessibilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Básico (Nível A)</h4>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Todas as imagens têm alt text apropriado
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Estrutura de headings é lógica (h1, h2, h3...)
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Todos os links têm texto descritivo
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Formulários têm labels associados
                      </label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Avançado (Nível AA)</h4>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Contraste mínimo de 4.5:1 para texto normal
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Site funciona com zoom de 200%
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Skip links estão disponíveis
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Foco do teclado é sempre visível
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
