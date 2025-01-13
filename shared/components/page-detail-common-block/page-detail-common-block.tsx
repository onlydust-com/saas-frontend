import { Accordion } from "@/design-system/molecules/accordion";

import { PageDetailCommonBlockProps } from "./page-detail-common-block.types";

export function PageDetailCommonBlock({ children, accordionProps }: PageDetailCommonBlockProps) {
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
