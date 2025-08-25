"use client";

import { useState } from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview as SandpackReactPreview,
  type SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";
import { type SandpackTheme } from "@codesandbox/sandpack-react";
import { LanguageSupport, StreamLanguage } from "@codemirror/language";
import { shell } from "@codemirror/legacy-modes/mode/shell";

import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface SandpackPreviewProps {
  code: string;
  language?: string;
}

type FileExtensionMap = {
  [key: string]: string;
};

const FILE_EXTENSIONS: FileExtensionMap = {
  sql: "/index.sql",
  bash: "/index.sh",
  javascript: "/index.js",
  html: "/index.html",
  css: "/index.css",
  jsx: "/App.js",
  typescript: "/App.ts",
};

const SANDPACK_THEME: SandpackTheme = {
  colors: {
    surface1: "#f5f5f5",
    surface2: "#e5e5e5",
    surface3: "#d4d4d4",
    clickable: "#7a7a7a",
    base: "#333333",
    disabled: "#a3a3a3",
    hover: "#000000",
    accent: "#007bff",
    error: "#ef4444",
    errorSurface: "#fee2e2",
  },
  syntax: {
    plain: "#333333",
    comment: "#7a7a7a",
    keyword: "#007bff",
    tag: "#d73a49",
    punctuation: "#333333",
    definition: "#6f42c1",
    property: "#005cc5",
    static: "#e36209",
    string: "#032f62",
  },
  font: {
    body: '-apple-system, "Segoe UI Symbol"',
    mono: '"Fira Mono", monospace',
    size: "14px",
    lineHeight: "22px",
  },
};

function useCodeCopy() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

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

  return { copied, copyToClipboard };
}

function getSandpackConfig(language: string) {
  const template = language === 'jsx'
    ? 'react'
    : language === 'typescript'
      ? 'react-ts'
      : 'static';

  const customSetup = (template === 'react' || template === 'react-ts')
    ? {
      dependencies: {
        "react": "latest",
        "react-dom": "latest",
        "lucide-react": "latest"
      },
      entry: "/App.js",
    }
    : {};

  return {
    template: template as SandpackPredefinedTemplate,
    customSetup,
    showPreview: language === 'jsx'
  };
}

export function SandpackPreview({ code, language = "bash" }: SandpackPreviewProps) {
  const { copied, copyToClipboard } = useCodeCopy();
  const { template, customSetup, showPreview } = getSandpackConfig(language);

  const getFileName = () => FILE_EXTENSIONS[language] || "/index.js";
  const lineCount = code.split('\n').length;
  const autoHeight = lineCount <= 15;

  return (
    <div className="relative border rounded-lg overflow-hidden">
      <SandpackProvider
        template={template}
        files={{
          [getFileName()]: {
            code,
            active: true,
          },
        }}
        customSetup={customSetup}
        theme={SANDPACK_THEME}
      >
        <SandpackLayout className={cn("overflow-x-auto", autoHeight && "!h-auto")}>
          <SandpackCodeEditor
            showLineNumbers={!autoHeight}
            showInlineErrors
            showTabs={false}
            readOnly
            showReadOnly={false}
            style={{ height: autoHeight ? 'auto' : '400px' }}
            additionalLanguages={[
              {
                name: "shell",
                extensions: ["sh", "bash"],
                language: new LanguageSupport(StreamLanguage.define(shell)),
              },
            ]}
          />
          {showPreview && <SandpackReactPreview />}
        </SandpackLayout>
      </SandpackProvider>

      <CopyButton
        copied={copied}
        onClick={() => copyToClipboard(code)}
      />
    </div>
  );
}

function CopyButton({ copied, onClick }: { copied: boolean; onClick: () => void; }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "absolute top-2 right-2 h-8 w-8 z-10",
        "bg-background/80 hover:bg-muted"
      )}
      onClick={onClick}
    >
      {copied
        ? <Check className="h-4 w-4 text-green-500" />
        : <Copy className="h-4 w-4" />}
    </Button>
  );
}
