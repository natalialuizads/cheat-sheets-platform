import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

interface CheatsheetCardProps {
  title: string;
  icon: LucideIcon;
  variant?: "default" | "destructive";
  children: React.ReactNode;
}

export function CheatsheetCard(
  { 
    title, 
    icon: Icon, 
    variant, 
    children 
  }: CheatsheetCardProps
) {
  return (
    <Card className={cn(variant === "destructive" && "border-destructive/50 bg-destructive/5")}>
      <CardHeader>
        <CardTitle className={cn(
          "flex items-center gap-2",
          variant === "destructive" && "text-destructive"
        )}>
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}