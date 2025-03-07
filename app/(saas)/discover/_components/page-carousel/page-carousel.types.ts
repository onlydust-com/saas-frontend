import { ReactNode } from "react";

export interface PageCarouselProps {
  resourceType: "issue" | "project";
  title: string;
  description?: string;
  count?: number;
  children: ReactNode[];
}
