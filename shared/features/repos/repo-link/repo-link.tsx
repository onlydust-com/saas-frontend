import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";

import { Github } from "@/shared/icons";

import { RepoLinkProps } from "./repo-link.types";

export function RepoLink({ repo, buttonProps }: RepoLinkProps) {
  const urlKernelPort = bootstrap.getUrlKernelPort();
  return (
    <Button
      as={"a"}
      variant={"secondary"}
      size={"sm"}
      startContent={<Icon component={Github} />}
      {...buttonProps}
      htmlProps={{ href: urlKernelPort.validateUrl(repo?.htmlUrl ?? ""), target: "_blank" }}
    >
      {repo?.name}
    </Button>
  );
}
