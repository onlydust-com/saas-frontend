import { Paper } from "@/design-system/atoms/paper";
import { Tag } from "@/design-system/atoms/tag";
import { Typo } from "@/design-system/atoms/typo";

import { ProjectLanguagesProps } from "./project-languages.types";

export function ProjectLanguages({ languages }: ProjectLanguagesProps) {
  if (!languages?.length) return null;

  return (
    <Paper size={"lg"} border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:projectDetail.languages.title" }} />

      <div className={"flex flex-wrap gap-md"}>
        {languages?.map(({ logoUrl, name }) => (
          <Tag
            key={name}
            size={"md"}
            classNames={{
              base: "max-w-full overflow-hidden",
              label: "whitespace-nowrap text-ellipsis overflow-hidden",
            }}
            avatar={{ src: logoUrl, alt: name }}
          >
            {name}
          </Tag>
        ))}
      </div>
    </Paper>
  );
}
