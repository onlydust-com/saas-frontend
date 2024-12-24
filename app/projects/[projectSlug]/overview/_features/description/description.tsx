import { CommonBlock } from "../common-block/common-block";
import { DescriptionProps } from "./description.types";

export function Description({ description }: DescriptionProps) {
  if (!description) return null;

  return (
    <CommonBlock
      accordionProps={{
        titleProps: { translate: { token: "project:details.overview.description.title" } },
        id: "description",
        defaultSelected: ["description"],
      }}
    >
      <div className="w-full">{description}</div>
    </CommonBlock>
  );
}
