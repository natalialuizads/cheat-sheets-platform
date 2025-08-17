"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Check, Code2, Shield, AlertTriangle, CheckCircle, Info, Eye, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CodeHighlight = ({ code, language = "html" }: { code: string; language?: string; }) => {
  const highlightHTML = (code: string) => {
    return code
      .replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)/g, '<span class="text-blue-600 font-semibold">$1$2</span>')
      .replace(/(\s)([a-zA-Z-]+)(=)/g, '$1<span class="text-green-600">$2</span><span class="text-gray-500">$3</span>')
      .replace(/(=")([^"]*?)(")/g, '=<span class="text-orange-600">"$2"</span>')
      .replace(/(&gt;)([^&<]+?)(&lt;)/g, '$1<span class="text-gray-800">$2</span>$3')
      .replace(/(&lt;!--.*?--&gt;)/g, '<span class="text-gray-400 italic">$1</span>');
  };

  return (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
      <code
        dangerouslySetInnerHTML={{
          __html: language === "html" ? highlightHTML(code.replace(/</g, "&lt;").replace(/>/g, "&gt;")) : code,
        }}
      />
    </pre>
  );
};

const ExampleExplanation = ({ title, description, tips }: { title: string; description: string; tips?: string[]; }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
      <Info className="h-4 w-4" />
      {title}
    </h4>
    <p className="text-blue-700 text-sm mb-2">{description}</p>
    {tips && (
      <ul className="text-blue-600 text-xs space-y-1">
        {tips.map((tip, index) => (
          <li key={index}>💡 {tip}</li>
        ))}
      </ul>
    )}
  </div>
);

const renderInteractiveExample = (tagName: string) => {
  const [inputValues, setInputValues] = useState({
    text: "",
    email: "",
    password: "",
    number: 0,
    range: 50,
    checkbox: false,
    radio: "option1",
    select: "",
    textarea: "",
    color: "#3b82f6",
    date: "",
    time: "",
    file: null as File | null,
    search: "",
    tel: "",
    url: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };

  switch (tagName.toLowerCase()) {
    case "input":
      return (
        <div className="space-y-6">
          <ExampleExplanation
            title="Elemento Input - Tipos e Funcionalidades"
            description="O elemento <input> é fundamental para formulários e possui diversos tipos, cada um otimizado para diferentes dados. Observe como cada tipo oferece validação e interface específica."
            tips={[
              "Cada tipo de input oferece validação automática no navegador",
              "Dispositivos móveis mostram teclados específicos para cada tipo",
              "Use sempre labels associados para acessibilidade",
              "Atributos como required, pattern e min/max adicionam validação",
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="demo-text" className="block text-sm font-medium mb-1">
                Text Input
              </label>
              <input
                id="demo-text"
                type="text"
                value={inputValues.text}
                onChange={(e) => handleInputChange("text", e.target.value)}
                placeholder="Digite algo..."
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-muted-foreground mt-1">Valor: {inputValues.text || "vazio"}</p>
            </div>

            <div>
              <label htmlFor="demo-email" className="block text-sm font-medium mb-1">
                Email (com validação automática)
              </label>
              <input
                id="demo-email"
                type="email"
                value={inputValues.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="email@exemplo.com"
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Válido: {inputValues.email.includes("@") && inputValues.email.includes(".") ? "✅" : "❌"}
              </p>
            </div>

            <div>
              <label htmlFor="demo-password" className="block text-sm font-medium mb-1">
                Password (texto oculto)
              </label>
              <input
                id="demo-password"
                type="password"
                value={inputValues.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Senha segura"
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Força: {inputValues.password.length > 8 ? "Forte" : inputValues.password.length > 4 ? "Média" : "Fraca"}
              </p>
            </div>

            <div>
              <label htmlFor="demo-number" className="block text-sm font-medium mb-1">
                Number (apenas números)
              </label>
              <input
                id="demo-number"
                type="number"
                value={inputValues.number}
                onChange={(e) => handleInputChange("number", Number.parseInt(e.target.value) || 0)}
                min="0"
                max="100"
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-muted-foreground mt-1">Valor: {inputValues.number} (min: 0, max: 100)</p>
            </div>

            <div>
              <label htmlFor="demo-tel" className="block text-sm font-medium mb-1">
                Tel (teclado numérico no mobile)
              </label>
              <input
                id="demo-tel"
                type="tel"
                value={inputValues.tel}
                onChange={(e) => handleInputChange("tel", e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-muted-foreground mt-1">Formato livre para telefones</p>
            </div>

            <div>
              <label htmlFor="demo-url" className="block text-sm font-medium mb-1">
                URL (validação de link)
              </label>
              <input
                id="demo-url"
                type="url"
                value={inputValues.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
                placeholder="https://exemplo.com"
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Válido: {inputValues.url.startsWith("http") ? "✅" : "❌"}
              </p>
            </div>

            <div>
              <label htmlFor="demo-search" className="block text-sm font-medium mb-1">
                Search (com ícone de busca)
              </label>
              <input
                id="demo-search"
                type="search"
                value={inputValues.search}
                onChange={(e) => handleInputChange("search", e.target.value)}
                placeholder="Buscar..."
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-muted-foreground mt-1">Inclui botão "X" para limpar</p>
            </div>

            <div>
              <label htmlFor="demo-date" className="block text-sm font-medium mb-1">
                Date (seletor de data)
              </label>
              <input
                id="demo-date"
                type="date"
                value={inputValues.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-muted-foreground mt-1">Formato: YYYY-MM-DD</p>
            </div>

            <div>
              <label htmlFor="demo-time" className="block text-sm font-medium mb-1">
                Time (seletor de hora)
              </label>
              <input
                id="demo-time"
                type="time"
                value={inputValues.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-muted-foreground mt-1">Formato: HH:MM</p>
            </div>

            <div>
              <label htmlFor="demo-color" className="block text-sm font-medium mb-1">
                Color (seletor de cor)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="demo-color"
                  type="color"
                  value={inputValues.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className="w-16 h-10 border rounded cursor-pointer"
                />
                <span className="text-sm font-mono">{inputValues.color}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Abre seletor de cores nativo</p>
            </div>

            <div>
              <label htmlFor="demo-range" className="block text-sm font-medium mb-1">
                Range: {inputValues.range}
              </label>
              <input
                id="demo-range"
                type="range"
                min="0"
                max="100"
                value={inputValues.range}
                onChange={(e) => handleInputChange("range", Number.parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">Slider para valores numéricos</p>
            </div>

            <div>
              <label htmlFor="demo-file" className="block text-sm font-medium mb-1">
                File (seletor de arquivo)
              </label>
              <input
                id="demo-file"
                type="file"
                onChange={(e) => handleInputChange("file", e.target.files?.[0] || null)}
                accept="image/*,.pdf,.doc,.docx"
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {inputValues.file ? `Arquivo: ${inputValues.file.name}` : "Nenhum arquivo selecionado"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Inputs de Seleção:</h4>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="demo-check1"
                checked={inputValues.checkbox}
                onChange={(e) => handleInputChange("checkbox", e.target.checked)}
                className="rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="demo-check1" className="text-sm">
                Checkbox {inputValues.checkbox ? "(marcado)" : "(desmarcado)"}
              </label>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Radio buttons (apenas uma opção):</p>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="demo-radio1"
                  name="demo-radio"
                  value="option1"
                  checked={inputValues.radio === "option1"}
                  onChange={(e) => handleInputChange("radio", e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="demo-radio1" className="text-sm">
                  Opção 1
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="demo-radio2"
                  name="demo-radio"
                  value="option2"
                  checked={inputValues.radio === "option2"}
                  onChange={(e) => handleInputChange("radio", e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="demo-radio2" className="text-sm">
                  Opção 2
                </label>
              </div>
              <p className="text-xs text-muted-foreground">Selecionado: {inputValues.radio}</p>
            </div>
          </div>
        </div>
      );
    case "button":
      return (
        <div className="space-y-6">
          <ExampleExplanation
            title="Elemento Button - Tipos e Estados"
            description="Botões são elementos interativos fundamentais. Cada tipo tem um comportamento específico em formulários e diferentes estados visuais melhoram a experiência do usuário."
            tips={[
              "type='submit' envia formulários automaticamente",
              "type='reset' limpa todos os campos do formulário",
              "type='button' é neutro, ideal para JavaScript",
              "Estados disabled previnem cliques acidentais",
            ]}
          />

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Tipos de Button:</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => alert("Submit: Enviaria o formulário!")}
                >
                  Submit (Enviar)
                </button>
                <button
                  type="reset"
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  onClick={() => alert("Reset: Limparia os campos!")}
                >
                  Reset (Limpar)
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => alert("Button: Ação personalizada!")}
                >
                  Button (Neutro)
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Estilos Visuais:</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => alert("Botão primário - ação principal!")}
                >
                  Primário
                </button>
                <button
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/90 focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                  onClick={() => alert("Botão secundário!")}
                >
                  Secundário
                </button>
                <button
                  className="border border-border px-4 py-2 rounded hover:bg-accent focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => alert("Botão outline!")}
                >
                  Outline
                </button>
                <button disabled className="bg-muted text-muted-foreground px-4 py-2 rounded cursor-not-allowed">
                  Desabilitado
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Com Ícones:</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
                  onClick={() => alert("Botão com ícone!")}
                >
                  <Play className="h-4 w-4" />
                  Reproduzir
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={() => alert("Botão apenas ícone!")}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    case "select":
      return (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-select" className="block text-sm font-medium mb-1">
              Select Simples
            </label>
            <select
              id="demo-select"
              value={inputValues.select}
              onChange={(e) => handleInputChange("select", e.target.value)}
              className="border rounded px-3 py-2 min-w-[200px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecione uma opção</option>
              <option value="opcao1">Opção 1</option>
              <option value="opcao2">Opção 2</option>
              <option value="opcao3">Opção 3</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">Selecionado: {inputValues.select || "nenhum"}</p>
          </div>
          <div>
            <label htmlFor="demo-select-multiple" className="block text-sm font-medium mb-1">
              Select Múltiplo
            </label>
            <select
              id="demo-select-multiple"
              multiple
              className="border rounded px-3 py-2 min-w-[200px] h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Múltipla seleção 1</option>
              <option>Múltipla seleção 2</option>
              <option>Múltipla seleção 3</option>
              <option>Múltipla seleção 4</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">Segure Ctrl/Cmd para múltipla seleção</p>
          </div>
        </div>
      );
    case "textarea":
      return (
        <div>
          <label htmlFor="demo-textarea" className="block text-sm font-medium mb-1">
            Textarea
          </label>
          <textarea
            id="demo-textarea"
            value={inputValues.textarea}
            onChange={(e) => handleInputChange("textarea", e.target.value)}
            placeholder="Digite sua mensagem aqui..."
            className="border rounded px-3 py-2 w-full h-24 resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-muted-foreground mt-1">Caracteres: {inputValues.textarea.length}</p>
        </div>
      );
    case "progress":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Progresso Determinado</label>
            <progress value="70" max="100" className="w-full h-4">
              70%
            </progress>
            <p className="text-sm text-muted-foreground mt-1">Progresso: 70%</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Progresso Indeterminado</label>
            <progress className="w-full h-4">Carregando...</progress>
            <p className="text-sm text-muted-foreground mt-1">Carregando...</p>
          </div>
        </div>
      );
    case "meter":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Pontuação</label>
            <meter value="6" min="0" max="10" className="w-full">
              6 de 10
            </meter>
            <p className="text-sm text-muted-foreground mt-1">Pontuação: 6/10</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Uso de Disco</label>
            <meter value="0.8" className="w-full">
              80%
            </meter>
            <p className="text-sm text-muted-foreground mt-1">Uso de disco: 80%</p>
          </div>
        </div>
      );
    case "details":
      return (
        <div className="space-y-4">
          <details className="border rounded-lg">
            <summary className="cursor-pointer p-4 hover:bg-muted font-medium">Clique para expandir/recolher</summary>
            <div className="p-4 border-t">
              <p>Este é o conteúdo que fica oculto até o usuário clicar no summary.</p>
              <p className="mt-2">Útil para FAQs, detalhes adicionais, ou qualquer conteúdo que deve ser opcional.</p>
            </div>
          </details>
          <details open className="border rounded-lg">
            <summary className="cursor-pointer p-4 hover:bg-muted font-medium">Este já inicia aberto</summary>
            <div className="p-4 border-t">
              <p>
                Use o atributo <code className="bg-muted px-1 rounded">open</code> para iniciar expandido.
              </p>
            </div>
          </details>
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            <caption className="caption-top text-sm text-muted-foreground mb-2">
              Lista de Usuários - Exemplo de Tabela Acessível
            </caption>
            <thead>
              <tr className="bg-muted">
                <th scope="col" className="border border-border px-4 py-2 text-left">
                  ID
                </th>
                <th scope="col" className="border border-border px-4 py-2 text-left">
                  Nome
                </th>
                <th scope="col" className="border border-border px-4 py-2 text-left">
                  Email
                </th>
                <th scope="col" className="border border-border px-4 py-2 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border border-border px-4 py-2 font-medium">
                  1
                </th>
                <td className="border border-border px-4 py-2">João Silva</td>
                <td className="border border-border px-4 py-2">joao@exemplo.com</td>
                <td className="border border-border px-4 py-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Ativo</span>
                </td>
              </tr>
              <tr>
                <th scope="row" className="border border-border px-4 py-2 font-medium">
                  2
                </th>
                <td className="border border-border px-4 py-2">Maria Santos</td>
                <td className="border border-border px-4 py-2">maria@exemplo.com</td>
                <td className="border border-border px-4 py-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pendente</span>
                </td>
              </tr>
              <tr>
                <th scope="row" className="border border-border px-4 py-2 font-medium">
                  3
                </th>
                <td className="border border-border px-4 py-2">Pedro Costa</td>
                <td className="border border-border px-4 py-2">pedro@exemplo.com</td>
                <td className="border border-border px-4 py-2">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Inativo</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    default:
      return (
        <div className="text-center py-8 text-muted-foreground">
          <Code2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Este elemento não possui exemplo interativo disponível.</p>
          <p className="text-sm mt-1">Consulte a aba "Exemplo" para ver o código.</p>
        </div>
      );
  }
};

const getAccessibilityInfo = (tagName: string) => {
  const accessibilityData: Record<
    string,
    {
      goodPractices: string[];
      avoid: string[];
      wcagGuidelines: string[];
      ariaAttributes?: string[];
      examples?: { good: string; bad: string; };
    }
  > = {
    img: {
      goodPractices: [
        "Sempre inclua o atributo alt com descrição significativa",
        'Use alt="" para imagens decorativas',
        "Considere usar figure/figcaption para imagens com legendas",
        "Forneça texto alternativo que descreva o propósito da imagem",
        'Use loading="lazy" para melhorar performance',
        "Especifique width e height para evitar layout shift",
      ],
      avoid: [
        "Nunca omitir o atributo alt",
        'Não usar "imagem" ou "foto" no alt',
        "Evitar alt muito longo (mais de 125 caracteres)",
        "Não repetir informações já presentes no texto",
      ],
      wcagGuidelines: [
        "WCAG 1.1.1: Conteúdo Não-textual (Nível A)",
        "Forneça alternativas textuais para conteúdo não-textual",
        "Alt deve transmitir o mesmo propósito da imagem",
      ],
      examples: {
        good: '<img src="grafico-vendas.png" alt="Gráfico mostrando aumento de 25% nas vendas em 2024" width="400" height="300">',
        bad: '<img src="grafico-vendas.png" alt="imagem">',
      },
    },
    button: {
      goodPractices: [
        'Use type="button" para botões que não enviam formulários',
        "Inclua aria-label para botões apenas com ícones",
        "Garanta contraste adequado e área de toque mínima (44x44px)",
        "Use disabled ao invés de aria-disabled quando possível",
        "Forneça feedback visual para estados hover/focus/active",
        'Use texto descritivo, evite "clique aqui"',
      ],
      avoid: [
        "Não usar div ou span para criar botões",
        "Evitar botões sem texto ou aria-label",
        "Não remover o outline de foco sem alternativa",
        "Evitar botões muito pequenos (menos de 44x44px)",
      ],
      wcagGuidelines: [
        "WCAG 2.1.1: Teclado (Nível A)",
        "WCAG 2.4.7: Foco Visível (Nível AA)",
        "WCAG 3.2.2: Na Entrada (Nível A)",
        "Contraste mínimo de 3:1 para componentes de interface",
      ],
      ariaAttributes: ["aria-label", "aria-describedby", "aria-expanded", "aria-pressed"],
      examples: {
        good: '<button type="button" aria-label="Fechar modal">×</button>',
        bad: '<div onclick="close()">×</div>',
      },
    },
    input: {
      goodPractices: [
        "Sempre associe com um label usando for/id",
        "Use type apropriado (email, tel, url, etc.)",
        "Inclua required, pattern e aria-describedby quando necessário",
        "Forneça mensagens de erro claras e específicas",
        "Use autocomplete para facilitar preenchimento",
        "Agrupe campos relacionados com fieldset/legend",
      ],
      avoid: [
        "Nunca usar placeholder como substituto de label",
        'Evitar labels genéricos como "campo"',
        "Não omitir validação no servidor",
        "Evitar campos obrigatórios sem indicação visual",
      ],
      wcagGuidelines: [
        "WCAG 1.3.1: Informações e Relacionamentos (Nível A)",
        "WCAG 3.3.1: Identificação de Erro (Nível A)",
        "WCAG 3.3.2: Rótulos ou Instruções (Nível A)",
        "WCAG 4.1.3: Mensagens de Status (Nível AA)",
      ],
      ariaAttributes: ["aria-label", "aria-describedby", "aria-invalid", "aria-required"],
      examples: {
        good: '<label for="email">Email *</label><input type="email" id="email" required aria-describedby="email-error" autocomplete="email">',
        bad: '<input type="text" placeholder="Email">',
      },
    },
    form: {
      goodPractices: [
        "Agrupe campos relacionados com fieldset/legend",
        "Forneça instruções claras antes dos campos",
        "Valide dados no cliente e servidor",
        "Use autocomplete para facilitar preenchimento",
        "Indique campos obrigatórios claramente",
        "Forneça feedback de sucesso após envio",
      ],
      avoid: [
        "Não confiar apenas em validação client-side",
        "Evitar formulários sem labels",
        "Não usar apenas cor para indicar erros",
        "Evitar timeouts muito curtos",
      ],
      wcagGuidelines: [
        "WCAG 3.3.1: Identificação de Erro (Nível A)",
        "WCAG 3.3.3: Sugestão de Erro (Nível AA)",
        "WCAG 3.3.4: Prevenção de Erro (Nível AA)",
      ],
      examples: {
        good: '<form><fieldset><legend>Dados Pessoais</legend><label for="nome">Nome *</label><input type="text" id="nome" required></fieldset></form>',
        bad: '<form><input placeholder="Nome"><input placeholder="Email"></form>',
      },
    },
    table: {
      goodPractices: [
        "Use caption para descrever o propósito da tabela",
        "Use th com scope para cabeçalhos",
        "Associe células de dados com cabeçalhos usando headers/id",
        "Use thead, tbody, tfoot para estruturar",
        "Forneça resumo para tabelas complexas",
      ],
      avoid: [
        "Não usar tabelas para layout",
        "Evitar tabelas sem cabeçalhos",
        "Não omitir caption em tabelas de dados",
        "Evitar células vazias sem explicação",
      ],
      wcagGuidelines: [
        "WCAG 1.3.1: Informações e Relacionamentos (Nível A)",
        "Use elementos semânticos apropriados para estrutura",
      ],
      ariaAttributes: ["aria-label", "aria-describedby", 'role="table"'],
      examples: {
        good: '<table><caption>Vendas por Região</caption><thead><tr><th scope="col">Região</th><th scope="col">Vendas</th></tr></thead></table>',
        bad: "<table><tr><td>Região</td><td>Vendas</td></tr></table>",
      },
    },
    a: {
      goodPractices: [
        "Use texto de link descritivo e único",
        "Indique quando link abre em nova aba",
        "Use aria-label para links com contexto insuficiente",
        "Garanta contraste adequado para links",
        "Mantenha área de toque mínima de 44x44px",
      ],
      avoid: [
        'Evitar "clique aqui" ou "saiba mais"',
        "Não abrir links em nova aba sem aviso",
        "Evitar links que não parecem clicáveis",
        "Não usar apenas cor para indicar links",
      ],
      wcagGuidelines: [
        "WCAG 2.4.4: Propósito do Link (Nível A)",
        "WCAG 2.4.9: Propósito do Link (Apenas Link) (Nível AAA)",
        "WCAG 3.2.5: Mudança a Pedido (Nível AAA)",
      ],
      examples: {
        good: '<a href="/contato" aria-label="Ir para página de contato">Entre em contato</a>',
        bad: '<a href="/contato">clique aqui</a>',
      },
    },
    h1: {
      goodPractices: [
        "Use apenas um h1 por página",
        "Mantenha hierarquia lógica (h1 > h2 > h3...)",
        "Faça cabeçalhos descritivos e únicos",
        "Use cabeçalhos para estruturar conteúdo, não para estilo",
      ],
      avoid: [
        "Não pular níveis de cabeçalho",
        "Evitar múltiplos h1 na mesma página",
        "Não usar cabeçalhos apenas para estilo",
        "Evitar cabeçalhos vazios",
      ],
      wcagGuidelines: [
        "WCAG 1.3.1: Informações e Relacionamentos (Nível A)",
        "WCAG 2.4.6: Cabeçalhos e Rótulos (Nível AA)",
        "WCAG 2.4.10: Cabeçalhos de Seção (Nível AAA)",
      ],
      examples: {
        good: "<h1>Página Principal</h1><h2>Seção</h2><h3>Subseção</h3>",
        bad: "<h1>Título</h1><h3>Pulou o h2</h3>",
      },
    },
  };

  return (
    accessibilityData[tagName] || {
      goodPractices: [
        "Use elementos semânticos apropriados",
        "Mantenha hierarquia lógica de cabeçalhos",
        "Garanta navegação por teclado funcional",
        "Teste com leitores de tela",
        "Forneça alternativas para conteúdo visual/auditivo",
      ],
      avoid: [
        "Usar div/span para elementos interativos",
        "Omitir labels em campos de formulário",
        "Depender apenas de cor para transmitir informação",
        "Criar elementos não acessíveis por teclado",
        "Usar placeholder como substituto de label",
      ],
      wcagGuidelines: [
        "WCAG 1.3.1: Informações e Relacionamentos (Nível A)",
        "WCAG 2.1.1: Teclado (Nível A)",
        "WCAG 2.4.7: Foco Visível (Nível AA)",
        "WCAG 4.1.2: Nome, Função, Valor (Nível A)",
      ],
    }
  );
};

interface TagDetailProps {
  tag: { name: string; description: string; example: string; };
  onBack: () => void;
}

export function TagDetail({ tag, onBack }: TagDetailProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const accessibilityInfo = getAccessibilityInfo(tag.name);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Código copiado!",
        description: "O código foi copiado para sua área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o código.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Voltar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            &lt;{tag.name}&gt;
          </CardTitle>
          <CardDescription>{tag.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="exemplo" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="exemplo">Código</TabsTrigger>
              <TabsTrigger value="interativo">
                <Eye className="h-4 w-4 mr-1" />
                Live Preview
              </TabsTrigger>
              <TabsTrigger value="acessibilidade">Acessibilidade</TabsTrigger>
              <TabsTrigger value="explicacao">Explicação</TabsTrigger>
            </TabsList>

            <TabsContent value="exemplo" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Código de Exemplo</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(tag.example)}
                  className="flex items-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copiado!" : "Copiar"}
                </Button>
              </div>
              <CodeHighlight code={tag.example} language="html" />
            </TabsContent>

            <TabsContent value="interativo" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Play className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">Live Preview - Exemplo Interativo</h3>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white">
                {renderInteractiveExample(tag.name)}
              </div>
            </TabsContent>

            <TabsContent value="explicacao" className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Info className="h-5 w-5" />
                Como Funciona o &lt;{tag.name}&gt;
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-50 border rounded-lg p-4">
                  <h4 className="font-medium mb-2">📝 Descrição Técnica</h4>
                  <p className="text-sm text-gray-700">{tag.description}</p>
                </div>

                {tag.name === "input" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">🎯 Tipos de Input Disponíveis</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <span className="bg-white px-2 py-1 rounded border">text</span>
                      <span className="bg-white px-2 py-1 rounded border">email</span>
                      <span className="bg-white px-2 py-1 rounded border">password</span>
                      <span className="bg-white px-2 py-1 rounded border">number</span>
                      <span className="bg-white px-2 py-1 rounded border">tel</span>
                      <span className="bg-white px-2 py-1 rounded border">url</span>
                      <span className="bg-white px-2 py-1 rounded border">search</span>
                      <span className="bg-white px-2 py-1 rounded border">date</span>
                      <span className="bg-white px-2 py-1 rounded border">time</span>
                      <span className="bg-white px-2 py-1 rounded border">color</span>
                      <span className="bg-white px-2 py-1 rounded border">range</span>
                      <span className="bg-white px-2 py-1 rounded border">file</span>
                      <span className="bg-white px-2 py-1 rounded border">checkbox</span>
                      <span className="bg-white px-2 py-1 rounded border">radio</span>
                      <span className="bg-white px-2 py-1 rounded border">hidden</span>
                    </div>
                  </div>
                )}

                {tag.name === "button" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">🔘 Tipos de Button</h4>
                    <ul className="text-sm space-y-1">
                      <li>
                        <strong>submit:</strong> Envia o formulário automaticamente
                      </li>
                      <li>
                        <strong>reset:</strong> Limpa todos os campos do formulário
                      </li>
                      <li>
                        <strong>button:</strong> Comportamento neutro, ideal para JavaScript
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="acessibilidade" className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Diretrizes de Acessibilidade para &lt;{tag.name}&gt;
              </h3>

              <div className="space-y-6">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <h4 className="font-medium text-green-700 mb-2">✅ Boas Práticas</h4>
                    <ul className="space-y-1 text-sm">
                      {accessibilityInfo.goodPractices.map((practice, index) => (
                        <li key={index}>• {practice}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <h4 className="font-medium text-red-700 mb-2">❌ Evite</h4>
                    <ul className="space-y-1 text-sm">
                      {accessibilityInfo.avoid.map((avoid, index) => (
                        <li key={index}>• {avoid}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <h4 className="font-medium text-blue-700 mb-2">📋 Diretrizes WCAG</h4>
                    <ul className="space-y-1 text-sm">
                      {accessibilityInfo.wcagGuidelines.map((guideline, index) => (
                        <li key={index}>• {guideline}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>

                {accessibilityInfo.ariaAttributes && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">🏷️ Atributos ARIA Relacionados</h4>
                    <div className="flex flex-wrap gap-2">
                      {accessibilityInfo.ariaAttributes.map((attr, index) => (
                        <Badge key={index} variant="secondary" className="font-mono">
                          {attr}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {accessibilityInfo.examples && (
                  <div className="space-y-4">
                    <Separator />
                    <h4 className="font-medium">📝 Exemplos Comparativos</h4>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-700">Correto</span>
                        </div>
                        <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
                          <code>{accessibilityInfo.examples.good}</code>
                        </pre>
                      </div>

                      <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="font-medium text-red-700">Incorreto</span>
                        </div>
                        <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
                          <code>{accessibilityInfo.examples.bad}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
