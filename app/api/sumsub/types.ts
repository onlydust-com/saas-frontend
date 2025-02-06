import { SUMSUB_KYB_LEVEL, SUMSUB_KYC_LEVEL } from "./constants";

export interface SumsubConfig {
  baseURL: string;
  method?: string;
  url?: string;
  headers?: Record<string, string>;
}

export type SumsubLevelName = typeof SUMSUB_KYC_LEVEL | typeof SUMSUB_KYB_LEVEL;

export interface SumsubCreateTokenProps {
  externalId: string;
  levelName: SumsubLevelName;
}
