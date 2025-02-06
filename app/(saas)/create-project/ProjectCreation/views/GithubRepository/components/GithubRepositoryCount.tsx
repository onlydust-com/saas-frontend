import { TypographySmall } from "@/shared/ui/typography";
import { CopyCheck } from "lucide-react";

export const GithubRepositoryCount = ({ selected, total }: { selected: number; total: number }) => {
  return (
    <div className="flex h-auto items-center justify-start gap-1 rounded-full border px-3 py-1">
      <CopyCheck />
      <TypographySmall>{`${selected}/${total} repos selected`}</TypographySmall>
    </div>
  );
};
