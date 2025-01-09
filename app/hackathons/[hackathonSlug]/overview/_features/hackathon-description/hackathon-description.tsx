import { PageDetailCommonBlock } from "@/shared/components/page-detail-common-block/page-detail-common-block";
import { Markdown } from "@/shared/features/markdown/markdown";

import { HackathonDescriptionProps } from "./hackathon-description.types";

export function HackathonDescription({ description = "" }: HackathonDescriptionProps) {
  return (
    <PageDetailCommonBlock
      accordionProps={{
        titleProps: { translate: { token: "hackathon:details.overview.description.title" } },
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
