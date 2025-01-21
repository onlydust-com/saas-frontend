import { Markdown } from "@/shared/features/markdown/markdown";

import { HackathonDescriptionProps } from "./hackathon-description.types";

export function HackathonDescription({ description }: HackathonDescriptionProps) {
  if (!description) return null;

  return (
    <div className="w-full p-4">
      <Markdown content={description} />
    </div>
  );
}
