import { InView } from "react-intersection-observer";

import { cn } from "../utils";
import { Button } from "./button";

export interface ShowMoreProps {
  onNext: () => void;
  hasNextPage: boolean;
  loading: boolean;
  skip?: boolean;
  className?: string;
  label?: string;
}

export function ShowMore({ onNext, loading, skip = false, className, label, hasNextPage }: ShowMoreProps) {
  function handleEnterView(inView: boolean) {
    if (inView) onNext();
  }

  if (!hasNextPage) return null;

  return (
    <InView className={cn("flex justify-center", className)} onChange={handleEnterView} skip={skip}>
      <Button variant={"link"} onClick={onNext} loading={loading}>
        {label || "Show more"}
      </Button>
    </InView>
  );
}
