import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { ProjectMoreInfo } from "@/shared/features/social/project-more-info/project-more-info";

import { ProjectDescriptionProps } from "./project-description.types";

export function ProjectDescription({ description, moreInfo }: ProjectDescriptionProps) {
  return (
    <Paper size={"lg"} border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "common:description" }} />

      <Typo as={"p"} size={"xs"} color={"secondary"}>
        {description}
      </Typo>

      <div className={"flex flex-row flex-wrap gap-md"}>
        {moreInfo?.map(moreInfoItem => <ProjectMoreInfo key={moreInfoItem.url} moreInfoItem={moreInfoItem} />)}
      </div>
    </Paper>
  );
}
