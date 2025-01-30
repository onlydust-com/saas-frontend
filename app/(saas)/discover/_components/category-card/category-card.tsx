import { Blocks, Code2, Wallet, Gem, Cpu, Network, Lock, Boxes } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/helpers/cn";
import { CategoryCardProps } from "./category-card.types";

const ICON_MAP = {
  Blocks,
  Code2,
  Wallet,
  Gem,
  Cpu,
  Network,
  Lock,
  Boxes,
};

export function CategoryCard({ title, description, icon: Icon, count, className, iconClassName }: CategoryCardProps) {
  return (
    <Card className={cn("group transition-colors hover:border-primary/50", className)}>
      <CardContent className="flex gap-6 p-6">
        {Icon && (
          <div className={cn(
            "h-32 w-32 shrink-0 rounded-xl bg-gradient-to-br from-blue-100/80 to-blue-100 p-7",
            "shadow-sm ring-1 ring-black/5",
            iconClassName
          )}>
            <Icon className="h-full w-full text-blue-500" strokeWidth={1.5} />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h3 className="font-brand text-xl font-medium">{title}</h3>
          <p className="font-main text-sm leading-normal text-muted-foreground">{description}</p>
          {count !== undefined && (
            <Badge variant="secondary" className="w-fit">
              {count.toLocaleString()} Projects
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 