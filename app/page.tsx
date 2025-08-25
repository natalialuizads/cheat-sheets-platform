"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Container,
  GitBranch,
} from "lucide-react";

type Cheatsheet = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
};

const cheatsheets: Cheatsheet[] = [
  {
    id: "git",
    title: "Git",
    description: "Comandos essenciais, branching, merging, e boas práticas para controle de versão",
    icon: GitBranch,
    color: "bg-orange-600",
  },
  {
    id: "docker",
    title: "Docker",
    description: "Comandos essenciais, Dockerfile, Docker Compose e boas práticas de segurança",
    icon: Container,
    color: "bg-blue-600",
  },
];

type CheatsheetCardProps = {
  sheet: Cheatsheet;
};

const CheatsheetCard: React.FC<CheatsheetCardProps> = ({ sheet }) => {
  const IconComponent = sheet.icon;
  return (
    <Card
      key={sheet.id}
      className="hover:shadow-lg transition-all duration-300 hover:scale-105 group flex flex-col"
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
      <CardContent className="mt-auto">
        <Link href={`/${sheet.id}`} className="block w-full">
          <Button className="w-full group-hover:bg-primary/90">
            acessar guia
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-foreground">Guias de Desenvolvimento</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Guias completos para desenvolvimento web moderno com exemplos práticos e boas práticas
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cheatsheets.map((sheet) => (
            <CheatsheetCard key={sheet.id} sheet={sheet} />
          ))}
        </div>
      </main>
    </div>
  );
}