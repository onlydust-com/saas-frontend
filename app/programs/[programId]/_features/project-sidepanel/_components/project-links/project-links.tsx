import { Typo } from "@/design-system/atoms/typo";

import { SocialLinkTag } from "@/shared/features/social-link/social-link-tag/social-link-tag";

import { ProjectLinksProps } from "./project-links.types";

export function ProjectLinks({ moreInfo }: ProjectLinksProps) {
  if (!moreInfo?.length) return null;

  return (
    <div className={"flex flex-col gap-1"}>
      <Typo as={"div"} size={"xs"} color={"text-2"} translate={{ token: "programs:projectDetail.link.title" }} />
      <div className={"flex flex-row flex-wrap gap-1"}>
        {moreInfo?.map(({ url, value }) => <SocialLinkTag key={url} url={url} value={value} />)}
      </div>
    </div>
  );
}
