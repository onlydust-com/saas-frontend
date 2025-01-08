import { Info } from "lucide-react";

import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Textarea } from "@/design-system/atoms/textarea";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";

import { ApplyProps } from "./apply.types";

export function Apply({ issue }: ApplyProps) {
  return (
    <Accordion
      inline={true}
      classNames={{ heading: "after:hidden", base: "p-0", content: "py-4" }}
      id={"summary"}
      titleProps={{ size: "md", weight: "medium", translate: { token: "panels:applyIssue.apply.title" } }}
    >
      <div className="flex w-full flex-col gap-4">
        <Paper background="glass" classNames={{ base: "flex flex-col gap-3" }}>
          <Typo size={"md"} weight={"medium"} translate={{ token: "panels:applyIssue.apply.githubComment" }} />
          <Textarea name="githubComment" placeholder="Write your comment here..." />
          <div className="flex flex-row items-center justify-start gap-1">
            <Icon component={Info} size={"md"} classNames={{ base: "text-typography-tertiary" }} />
            <Typo
              size={"xs"}
              weight={"medium"}
              translate={{ token: "panels:applyIssue.apply.info" }}
              color="tertiary"
            />
          </div>
        </Paper>
      </div>
    </Accordion>
  );
}
