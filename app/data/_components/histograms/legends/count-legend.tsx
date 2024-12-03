import { Typo } from "@/design-system/atoms/typo";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export function CountLegend({ countSum, label }: { countSum: number; label: TranslateProps }) {
  return (
    <div className="flex gap-1">
      <Typo size={"xs"} color={"primary"}>
        {countSum}
      </Typo>
      <Typo size={"xs"} color={"primary"} translate={label} />
    </div>
  );
}
