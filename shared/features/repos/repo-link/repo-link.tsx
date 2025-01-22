import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Github } from "@/shared/icons";

import { RepoLinkProps } from "./repo-link.types";

export function RepoLink({ repo, buttonProps }: RepoLinkProps) {
  const urlKernelPort = bootstrap.getUrlKernelPort();

  if (!repo?.htmlUrl) return null;

  return (
    <Button
      as={BaseLink}
      variant={"secondary"}
      size={"sm"}
      startContent={<Icon component={Github} />}
      htmlProps={{
        href: urlKernelPort.validateUrl(repo?.htmlUrl ?? ""),
      }}
      {...buttonProps}
    >
      {repo?.name}
    </Button>
  );
}
