import { Brain, Cpu, Database } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  count: number;
}

export const categories: Category[] = [
  {
    id: "ai",
    title: "AI",
    description: "Strapi is the next-gen",
    icon: Brain,
    count: 267827,
  },
  {
    id: "blockchain",
    title: "Blockchain",
    description: "Strapi is the next-gen",
    icon: Cpu,
    count: 267827,
  },
  {
    id: "blockchain-2",
    title: "Blockchain",
    description: "Strapi is the next-gen",
    icon: Database,
    count: 267827,
  },
];
