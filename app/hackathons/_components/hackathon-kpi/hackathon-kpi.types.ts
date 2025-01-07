import { LucideIcon } from "lucide-react";

import { Token } from "@/shared/translation/components/translate/translate.types";

export enum HackathonKpiType {
  Registered = "registered",
  AvailableIssues = "availableIssues",
  Projects = "projects",
  EndsIn = "endsIn",
}

interface Trend {
  direction: "up" | "down" | "stable";
  inverted?: boolean;
  value: number;
}

export interface HackathonKpiProps {
  type: HackathonKpiType;
  nbRegistered?: number;
  nbAvailableIssues?: number;
  totalAvailableIssues?: number;
  nbProjects?: number;
  endsIn?: string;
  trend?: Trend;
}

export interface HackathonKpiMap {
  title: Token;
  icon: {
    component: LucideIcon;
    className: string;
  };
  value: number | string;
  trend?: Trend;
}
