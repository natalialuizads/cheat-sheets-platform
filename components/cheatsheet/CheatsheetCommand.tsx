import { Code, Eye, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { SandpackPreview } from '../sandpack/sandpack';
import { Badge } from "@/components/ui/badge";

interface CheatsheetCommandProps {
  command?: string;
  title?: string;
  description?: string;
  example?: string;
  exampleReact?: string;
  securityTip?: string;
  lang?: string;
}


export function CheatsheetCommand({
  command,
  title,
  description,
  example,
  exampleReact,
  securityTip,
  lang = "shell"
}: CheatsheetCommandProps
) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="space-y-3">
        {command && (
          <div className="overflow-x-auto pb-2">
            <Badge variant="outline" className="font-mono text-sm font-normal whitespace-nowrap">
              {command}
            </Badge>
          </div>
        )}
        {title && <h4 className="font-medium">{title}</h4>}
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      {example && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-1">
            <Code className="h-4 w-4" />
            Exemplo:
          </h4>
          <SandpackPreview code={example} language={lang} />
        </div>
      )}

      {exampleReact && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-1">
            <Eye className="h-4 w-4" />
            Exemplo Interativo (React):
          </h4>
          <SandpackPreview code={exampleReact} language="jsx" />
        </div>
      )}

      {securityTip && (
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Dica:</strong> {securityTip}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
