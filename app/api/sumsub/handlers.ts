import { SumsubCreateTokenProps } from "./types";

export async function createSumsubToken({ externalId, levelName }: SumsubCreateTokenProps) {
  const response = await fetch("/api/sumsub", {
    method: "POST",
    body: JSON.stringify({ externalId, levelName }),
  });

  if (!response.ok) {
    throw new Error("Failed to create Sumsub token.");
  }

  return await response.json();
}
