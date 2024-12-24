import { Accordion } from "@/design-system/molecules/accordion";

import { CommonBlockProps } from "./common-block.types";

export function CommonBlock({ children, accordionProps }: CommonBlockProps) {
  return (
    <div className="flex w-full flex-row items-stretch justify-start gap-4 border-b-1 border-border-primary">
      <Accordion
        inline={true}
        classNames={{ heading: "after:hidden", base: "p-4", content: "py-4" }}
        {...accordionProps}
        id={accordionProps?.id ?? ""}
        titleProps={{ size: "md", weight: "medium", ...(accordionProps?.titleProps ?? {}) }}
      >
        <div className="flex w-full flex-col gap-4">{children}</div>
      </Accordion>
    </div>
  );
}
