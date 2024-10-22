import { InView } from "react-intersection-observer";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ShowMoreProps } from "@/shared/components/show-more/show-more.types";
import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ShowMore({ onNext, loading, skip = false, className }: ShowMoreProps) {
  function handleEnterView(inView: boolean) {
    if (inView) onNext();
  }

  return (
    <InView className={cn("flex justify-center", className)} onChange={handleEnterView} skip={skip}>
      <Button variant={"secondary"} isTextButton onClick={onNext} isLoading={loading}>
        <Translate token={"common:showMore"} />
      </Button>
    </InView>
  );
}
