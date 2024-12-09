import { LucideIcon } from "lucide-react";

export interface ResultProps {
  name?: string;
  description?: string;
  type: "project" | "contributor";
  tags: string[];
  metrics: { icon: LucideIcon; count: number }[];
}
