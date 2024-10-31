import { Github } from "lucide-react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";

import { BaseLink } from "@/shared/components/base-link/base-link";

import { CommentsProps } from "./comments.types";

export function Comments({ applicationId }: CommentsProps) {
  const { data, isLoading } = ApplicationReactQueryAdapter.client.useGetApplicationById({
    pathParams: { applicationId },
    options: {
      enabled: !!applicationId,
    },
  });

  if (isLoading) {
    return <Skeleton className={"h-[170px] w-full"} />;
  }

  if (!data?.githubComment) {
    return null;
  }

  return (
    <Accordion
      id="comments"
      titleProps={{
        translate: { token: "panels:contributor.comments.title" },
      }}
      defaultSelected={["comments"]}
    >
      <div>
        <Paper size="lg" border="primary" classNames={{ base: "flex flex-col gap-lg" }}>
          <div className="flex flex-col gap-md">
            <Typo size="sm" weight="medium">
              {data.issue.title}
            </Typo>

            <Typo
              size="xs"
              color="secondary"
              classNames={{
                base: "line-clamp-6",
              }}
            >
              {data.githubComment}
            </Typo>
          </div>

          <div className="flex justify-between gap-md">
            <div />

            <Button
              size="xs"
              variant="secondary"
              as={BaseLink}
              iconOnly
              htmlProps={{ href: data.issue.htmlUrl, target: "_blank" }}
              startIcon={{
                component: Github,
              }}
            />
          </div>
        </Paper>
      </div>
    </Accordion>
  );
}
