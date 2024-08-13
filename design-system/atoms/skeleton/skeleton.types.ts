import { BaseHTMLAttributes } from "react";

interface Variants {
  shape: "square" | "circle";
  container: "1" | "2" | "3" | "4" | "action" | "inverse" | "interactions-black";
}

interface ClassNames {
  base: string;
}

export interface SkeletonPort extends BaseHTMLAttributes<HTMLDivElement>, Partial<Variants> {
  classNames?: Partial<ClassNames>;
}
