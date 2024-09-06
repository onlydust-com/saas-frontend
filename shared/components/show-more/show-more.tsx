import { InView } from "react-intersection-observer";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ShowMoreProps } from "@/shared/components/show-more/show-more.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ShowMore({ onNext, loading, skip = false }: ShowMoreProps) {
  function handleEnterView(inView: boolean) {
    if (inView) onNext();
  }

  return (
    <InView className={"flex justify-center"} onChange={handleEnterView} skip={skip}>
      <Button variant={"secondary"} isTextButton onClick={onNext} isDisabled={loading}>
        <Translate token={"common:showMore"} />
      </Button>
    </InView>
  );
}
