import { TypographyP } from "@/shared/ui/typography";
import { Lightbulb } from "lucide-react";


export const GithubRepositoryCountError = () => {
  return (
    <div className="flex h-auto items-center justify-start gap-1 rounded-full border border-card-border-light bg-card-background-light px-3 py-[6px]">
      <Lightbulb className="text-warning" />
      <TypographyP className="text-warning">You must select at least one repository</TypographyP>
    </div>
  );
};
