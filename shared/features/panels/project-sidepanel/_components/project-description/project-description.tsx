import { Typo } from "@/design-system/atoms/typo";

import { ProjectDescriptionProps } from "./project-description.types";

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  return (
    <Typo as={"div"} size={"s"} color={"text-2"}>
      {description}
    </Typo>
  );
}
