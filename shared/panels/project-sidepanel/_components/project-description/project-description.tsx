import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { SocialLinkTag } from "@/shared/features/social-link/social-link-tag/social-link-tag";

import { ProjectDescriptionProps } from "./project-description.types";

export function ProjectDescription({ description, moreInfo }: ProjectDescriptionProps) {
  return (
    <Paper size={"lg"} border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:projectDetail.description.title" }} />

      <Typo as={"p"} size={"xs"} color={"secondary"}>
        {description}
      </Typo>

      <div className={"flex flex-row flex-wrap gap-md"}>
        {moreInfo?.map(({ url, value }) => <SocialLinkTag key={url} url={url} value={value} />)}
      </div>
    </Paper>
  );
}
