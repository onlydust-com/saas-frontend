import { Lightbulb } from "lucide-react";

import { TypographyP } from "@/shared/ui/typography";

export const GithubRepositoryCountError = () => {
  return (
    <div className="border-card-border-light bg-card-background-light flex h-auto items-center justify-start gap-1 rounded-full border px-3 py-[6px]">
      <Lightbulb className="text-warning" />
      <TypographyP className="text-warning">You must select at least one repository</TypographyP>
    </div>
  );
};
