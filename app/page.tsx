"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Code2,
  BookOpen,
  FileText,
  ImageIcon,
  Table,
  Play,
  Settings,
  List,
  Link,
  Type,
  CheckCircle,
  Palette,
  Lock,
  Home,
  ArrowRight,
  Eye,
  Globe,
  Database,
  Container,
  Server,
} from "lucide-react";
import { htmlTags } from "@/data/htmlTags";
import { TagDetail } from "@/components/TagDetail";
import { AccessibilitySection } from "@/components/AccessibilitySection";
import { CSS3Section } from "@/components/CSS3Section";
import { WebSecuritySection } from "@/components/WebSecuritySection";
import { WebAPISection } from "@/components/WebAPISection";
import { DockerSection } from "@/components/DockerSection";
import { SQLSection } from "@/components/SQLSection";
import { NodeJSSection } from "@/components/NodeJSSection";

function HomeScreen({ onSelectCheatsheet }: { onSelectCheatsheet: (sheet: string) => void; }) {
  const cheatsheets = [
    {
      id: "html",
      title: "HTML5",
      description: "Guia completo com 110+ tags HTML5, exemplos interativos e boas práticas",
      icon: Code2,
      color: "bg-orange-500",
      features: ["110+ Tags HTML5", "Exemplos Interativos", "Elementos Semânticos", "Boas Práticas"],
    },
    {
      id: "accessibility",
      title: "Acessibilidade Web",
      description: "Diretrizes WCAG 2.1 completas com exemplos práticos e implementações",
      icon: Eye,
      color: "bg-green-500",
      features: ["WCAG 2.1 Completo", "Níveis A, AA, AAA", "ARIA Roles", "Testes de Acessibilidade"],
    },
    {
      id: "css",
      title: "CSS3 Completo",
      description: "Propriedades CSS3, layouts modernos, animações e o que evitar",
      icon: Palette,
      color: "bg-blue-500",
      features: ["Propriedades CSS3", "Flexbox & Grid", "Animações", "Anti-patterns"],
    },
    {
      id: "security",
      title: "Web Application Security",
      description: "Guia de segurança para aplicações web, vulnerabilidades e proteções",
      icon: Lock,
      color: "bg-red-500",
      features: ["OWASP Top 10", "Vulnerabilidades", "Proteções", "Exemplos Práticos"],
    },
    {
      id: "webapi",
      title: "WebAPI & WebAssembly",
      description: "APIs modernas do navegador e WebAssembly com exemplos práticos",
      icon: Globe,
      color: "bg-purple-500",
      features: ["Web APIs Modernas", "WebAssembly", "Performance", "Exemplos Práticos"],
    },
    {
      id: "docker",
      title: "Docker",
      description: "Comandos essenciais, Dockerfile, Docker Compose e boas práticas de segurança",
      icon: Container,
      color: "bg-blue-600",
      features: ["Comandos Docker", "Dockerfile Avançado", "Docker Compose", "Segurança"],
    },
    {
      id: "sql",
      title: "SQL",
      description: "SQL completo com JOINs, funções, procedures e práticas de segurança",
      icon: Database,
      color: "bg-green-600",
      features: ["SQL Básico/Avançado", "JOINs Completos", "Functions & Procedures", "Segurança"],
    },
    {
      id: "nodejs",
      title: "Node.js",
      description: "Guia completo de Node.js com fundamentos, web development, database e segurança",
      icon: Server,
      color: "bg-green-700",
      features: ["Event Loop & Async", "Express.js", "Database Integration", "Testes & Performance"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-foreground">Cheatsheets Completos</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Guias completos para desenvolvimento web moderno com exemplos práticos e boas práticas
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cheatsheets.map((sheet) => {
            const IconComponent = sheet.icon;
            return (
              <Card
                key={sheet.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                onClick={() => onSelectCheatsheet(sheet.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${sheet.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{sheet.title}</CardTitle>
                  <CardDescription className="text-base">{sheet.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground">Inclui:</h4>
                    <ul className="space-y-2">
                      {sheet.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4 group-hover:bg-primary/90">
                      Acessar Cheatsheet
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default function HTMLCheatsheet() {
  const [currentCheatsheet, setCurrentCheatsheet] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<{ name: string; description: string; example: string; } | null>(null);

  const filteredTags = useMemo(() => {
    if (!searchTerm && !selectedCategory) return htmlTags;

    const filtered: typeof htmlTags = {};

    Object.entries(htmlTags).forEach(([category, tags]) => {
      if (selectedCategory && category !== selectedCategory) return;

      const matchingTags = tags.filter(
        (tag) =>
          tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tag.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      if (matchingTags.length > 0) {
        filtered[category] = matchingTags;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory]);

  const totalTags = Object.values(htmlTags).flat().length;

  if (!currentCheatsheet) {
    return <HomeScreen onSelectCheatsheet={setCurrentCheatsheet} />;
  }

  if (currentCheatsheet === "accessibility") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" onClick={() => setCurrentCheatsheet(null)} className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Voltar ao Início
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <AccessibilitySection />
        </main>
      </div>
    );
  }

  if (currentCheatsheet === "css") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" onClick={() => setCurrentCheatsheet(null)} className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Voltar ao Início
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <CSS3Section />
        </main>
      </div>
    );
  }

  if (currentCheatsheet === "security") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" onClick={() => setCurrentCheatsheet(null)} className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Voltar ao Início
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <WebSecuritySection />
        </main>
      </div>
    );
  }

  if (currentCheatsheet === "webapi") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" onClick={() => setCurrentCheatsheet(null)} className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Voltar ao Início
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <WebAPISection />
        </main>
      </div>
    );
  }

  if (currentCheatsheet === "docker") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" onClick={() => setCurrentCheatsheet(null)} className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Voltar ao Início
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <DockerSection />
        </main>
      </div>
    );
  }

  if (currentCheatsheet === "sql") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" onClick={() => setCurrentCheatsheet(null)} className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Voltar ao Início
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <SQLSection />
        </main>
      </div>
    );
  }

  if (currentCheatsheet === "nodejs") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" onClick={() => setCurrentCheatsheet(null)} className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Voltar ao Início
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <NodeJSSection />
        </main>
      </div>
    );
  }

  if (selectedTag) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <TagDetail tag={selectedTag} onBack={() => setSelectedTag(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={() => setCurrentCheatsheet(null)} className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Voltar ao Início
            </Button>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
              <Code2 className="h-10 w-10" />
              HTML5
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Guia completo com {totalTags} tags HTML5, exemplos interativos e boas práticas
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar tags HTML..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant={selectedCategory ? "default" : "outline"} onClick={() => setSelectedCategory(null)}>
                Todas as Categorias
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {Object.keys(htmlTags).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className="flex items-center gap-2"
            >
              {category === "Estrutura do Documento" && <FileText className="h-4 w-4" />}
              {category === "Elementos Semânticos" && <BookOpen className="h-4 w-4" />}
              {category === "Texto e Formatação" && <Type className="h-4 w-4" />}
              {category === "Listas" && <List className="h-4 w-4" />}
              {category === "Links e Navegação" && <Link className="h-4 w-4" />}
              {category === "Formulários" && <Settings className="h-4 w-4" />}
              {category === "Tabelas" && <Table className="h-4 w-4" />}
              {category === "Mídia" && <ImageIcon className="h-4 w-4" />}
              {category === "Elementos Interativos" && <Play className="h-4 w-4" />}
              {![
                "Estrutura do Documento",
                "Elementos Semânticos",
                "Texto e Formatação",
                "Listas",
                "Links e Navegação",
                "Formulários",
                "Tabelas",
                "Mídia",
                "Elementos Interativos",
              ].includes(category) && <Code2 className="h-4 w-4" />}
              {category}
            </Button>
          ))}
        </div>

        <div className="space-y-8">
          {Object.entries(filteredTags).map(([category, tags]) => (
            <section key={category}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                {category === "Estrutura do Documento" && <FileText className="h-6 w-6" />}
                {category === "Elementos Semânticos" && <BookOpen className="h-6 w-6" />}
                {category === "Texto e Formatação" && <Type className="h-6 w-6" />}
                {category === "Listas" && <List className="h-6 w-6" />}
                {category === "Links e Navegação" && <Link className="h-6 w-6" />}
                {category === "Formulários" && <Settings className="h-6 w-6" />}
                {category === "Tabelas" && <Table className="h-6 w-6" />}
                {category === "Mídia" && <ImageIcon className="h-6 w-6" />}
                {category === "Elementos Interativos" && <Play className="h-6 w-6" />}
                {![
                  "Estrutura do Documento",
                  "Elementos Semânticos",
                  "Texto e Formatação",
                  "Listas",
                  "Links e Navegação",
                  "Formulários",
                  "Tabelas",
                  "Mídia",
                  "Elementos Interativos",
                ].includes(category) && <Code2 className="h-6 w-6" />}
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tags.map((tag) => (
                  <Card
                    key={tag.name}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedTag(tag)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Badge variant={tag.name.includes("⚠️") ? "destructive" : "outline"} className="font-mono">
                          &lt;{tag.name}&gt;
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">{tag.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {Object.keys(filteredTags).length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhuma tag encontrada para "{searchTerm}"</p>
            <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">
              Limpar busca
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
