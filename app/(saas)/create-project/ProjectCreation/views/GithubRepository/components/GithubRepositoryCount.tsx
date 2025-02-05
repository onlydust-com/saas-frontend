import { Check } from "lucide-react";

export const GithubRepositoryCount = ({ selected, total }: { selected: number; total: number }) => {
  return (
    <div className="flex h-auto items-center justify-start gap-1 rounded-full border border-card-border-light bg-card-background-light px-3 py-[6px]">
      <Check className="flex h-4 w-4 items-center justify-center fill-white" />
      <p className="text-body-s">{`${selected}/${total} repos selected`}</p>
    </div>
  );
};
