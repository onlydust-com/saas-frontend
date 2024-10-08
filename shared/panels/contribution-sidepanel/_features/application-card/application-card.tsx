import { CircleCheck, CircleX, GitPullRequest, Medal } from "lucide-react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { ApplicationCardProps } from "./application-card.types";

export function ApplicationCard({ children }: ApplicationCardProps) {
  return (
    <Paper background="transparent" border="none" classNames={{ base: "flex gap-md justify-between" }}>
      <div className="flex gap-lg">
        <Avatar size="sm" shape="squared" src="" />

        <div className="flex flex-col gap-md">
          <div className="flex flex-col">
            <Typo size="sm" weight="medium">
              RobertoRust
            </Typo>

            <Typo size="xs" color="secondary">
              Diamond • 14th • Top 1%
            </Typo>
          </div>

          <div className="flex flex-wrap gap-md">
            <Badge
              size="xs"
              icon={{
                component: Medal,
              }}
            >
              895
            </Badge>

            <Badge
              size="xs"
              icon={{
                component: GitPullRequest,
              }}
            >
              344
            </Badge>

            <Badge size="xs">24.09.2024</Badge>
          </div>
        </div>
      </div>

      <div className="flex gap-md">
        <Button
          variant="secondary"
          size="xs"
          iconOnly
          startIcon={{
            component: CircleX,
          }}
        />

        <Button
          variant="secondary"
          size="xs"
          iconOnly
          startIcon={{
            component: CircleCheck,
          }}
        />
      </div>
    </Paper>
  );
}
