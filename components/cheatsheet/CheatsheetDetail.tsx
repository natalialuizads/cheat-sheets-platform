import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface CheatsheetDetailProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
}

export function CheatsheetDetail(
  { 
    title, 
    description, 
    icon: Icon, 
    iconColor, 
    children 
  }: CheatsheetDetailProps
) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Icon className={cn("h-10 w-10", iconColor)} />
          {title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}