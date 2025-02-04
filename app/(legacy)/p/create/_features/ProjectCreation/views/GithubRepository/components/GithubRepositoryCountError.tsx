import Lightbulb from "@/legacy/src/icons/Lightbulb";

export const GithubRepositoryCountError = () => {
  return (
    <div className="border-card-border-light bg-card-background-light flex h-auto items-center justify-start gap-1 rounded-full border px-3 py-[6px]">
      <Lightbulb className="h-4 w-4 fill-orange-500" />
      <p className="text-body-s text-orange-500">Please select at least one repo.</p>
    </div>
  );
};
