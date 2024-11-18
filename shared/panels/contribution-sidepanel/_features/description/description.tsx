import dynamic from "next/dynamic";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { DescriptionProps } from "./description.types";

const Emoji = dynamic(() => import("react-emoji-render"));

export function Description({ description }: DescriptionProps) {
  if (!description) return null;

  return (
    <Paper size={"lg"} border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "common:description" }} />

      <Typo as={"p"} size={"xs"} color={"secondary"}>
        <Emoji>{description}</Emoji>
      </Typo>
    </Paper>
  );
}
