import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { ProjectProps } from "./project.types";

export function Project({ project }: ProjectProps) {
  if (!project) return null;

  return (
    <AvatarLabelGroup
      size="sm"
      avatars={[
        {
          src: project.logoUrl,
        },
      ]}
      title={{
        size: "xs",
        weight: "regular",
        color: "tertiary",
        children: project.name,
      }}
      withPopover={false}
    />
  );
}
