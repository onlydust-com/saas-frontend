import { LucideIcon } from "lucide-react";

export interface CategoryCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  count?: number;
  className?: string;
  iconClassName?: string;
}

// Predefined category icons mapping
export const CATEGORY_ICONS = {
  blockchain: "Blocks",
  development: "Code2",
  wallet: "Wallet",
  defi: "Gem",
  infrastructure: "Cpu",
  network: "Network",
  security: "Lock",
  other: "Boxes",
} as const; 