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
      <CardContent className="flex gap-6 p-5">
        {Icon && (
          <div className={cn(
            "h-24 w-24 shrink-0 rounded-xl bg-gradient-to-br from-blue-100/80 to-blue-100 p-5",
            "shadow-sm ring-1 ring-black/5",
            iconClassName
          )}>
            <Icon className="h-full w-full text-blue-500" strokeWidth={1.5} />
          </div>
        )}
        <div className="flex h-24 flex-grow flex-col justify-between">
          <div className="flex flex-col gap-1.5">
            <h3 className="font-brand text-lg font-medium">{title}</h3>
            <p className="font-main text-sm leading-normal text-muted-foreground line-clamp-2">{description}</p>
          </div>
          {count !== undefined && (
            <Badge 
              variant="outline"
              className="border border-primary/20 text-xs hover:bg-primary/10"
            >
              {count.toLocaleString()} Projects
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 