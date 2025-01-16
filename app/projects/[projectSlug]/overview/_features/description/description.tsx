import { PageDetailCommonBlock } from "@/shared/components/page-detail-common-block/page-detail-common-block";
import { Markdown } from "@/shared/features/markdown/markdown";

import { DescriptionProps } from "./description.types";

export function Description({ description }: DescriptionProps) {
  if (!description) return null;

  return (
    <PageDetailCommonBlock
      accordionProps={{
        titleProps: { translate: { token: "project:details.overview.description.title" } },
        id: "description",
        defaultSelected: ["description"],
      }}
    >
      <div className="w-full">
        <Markdown content={description} />
      </div>
    </PageDetailCommonBlock>
  );
}
