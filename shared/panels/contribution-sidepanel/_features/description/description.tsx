import dynamic from "next/dynamic";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { Markdown } from "@/shared/features/markdown/markdown";

import { DescriptionProps } from "./description.types";

const Emoji = dynamic(() => import("react-emoji-render"));

export function Description({ description }: DescriptionProps) {
  return (
    <Paper size={"lg"} border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "common:description" }} />

      {description ? (
        <Typo as={"p"} size={"xs"} color={"secondary"}>
          <Emoji>
            <Markdown content={description} />
          </Emoji>
        </Typo>
      ) : (
        <Typo as={"p"} size={"xs"} color={"secondary"} translate={{ token: "panels:contribution.description.empty" }} />
      )}
    </Paper>
  );
}
