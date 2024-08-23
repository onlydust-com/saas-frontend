import { Code } from "lucide-react";

import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { LanguageGroup } from "@/shared/features/language/language-group/language-group";

import { ProjectLanguagesProps } from "./project-languages.types";

export function ProjectLanguages({ languages }: ProjectLanguagesProps) {
  if (!languages?.length) return null;

  return (
    <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-col gap-2 flex-1 overflow-hidden" }}>
      <div className="flex flex-row gap-1">
        <Icon component={Code} />
        <Typo size={"xs"} weight={"medium"} translate={{ token: "panels:projectDetail.language.title" }} />
      </div>
      <LanguageGroup languages={languages} maxLanguages={1} />
    </Paper>
  );
}
