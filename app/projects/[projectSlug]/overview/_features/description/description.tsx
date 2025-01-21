import { Markdown } from "@/shared/features/markdown/markdown";

import { DescriptionProps } from "./description.types";

export function Description({ description }: DescriptionProps) {
  if (!description) return null;

  return (
    <div className="w-full p-4">
      <Markdown content={description} />
    </div>
  );
}
