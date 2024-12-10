import { LucideIcon } from "lucide-react";

export interface ResultTemplateProps {
  name?: string;
  description?: string;
  type: "project" | "contributor";
  tags?: string[];
  metrics?: { icon: LucideIcon; count: number | string }[];
}
