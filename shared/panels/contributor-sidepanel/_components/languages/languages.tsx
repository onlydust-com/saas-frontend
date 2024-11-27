import { Paper } from "@/design-system/atoms/paper";
import { Tag } from "@/design-system/atoms/tag";
import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

import { LanguagesProps } from "./languages.types";

export function Languages({ languages }: LanguagesProps) {
  if (!languages?.length) {
    return null;
  }

  return (
    <Paper size={"lg"} border={"primary"} classNames={{ base: "flex flex-col gap-lg overflow-hidden" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:contributor.languages.title" }} />

      <ScrollView direction={"x"}>
        <div className={"flex flex-row gap-md"}>
          {languages?.map(({ logoUrl, name }) => (
            <Tag key={name} size={"md"} avatar={{ src: logoUrl, alt: name }}>
              {name}
            </Tag>
          ))}
        </div>
      </ScrollView>
    </Paper>
  );
}
