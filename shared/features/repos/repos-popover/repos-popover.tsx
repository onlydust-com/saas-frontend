import { ChevronDown, GithubIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { CardGithubRepo } from "@/design-system/molecules/cards/card-github-repo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

import { ReposPopoverProps } from "./repos-popover.types";

export function ReposPopover({ repos }: ReposPopoverProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const repoCount = repos.length;

  if (repoCount === 1) {
    const [repo] = repos;

    return (
      <Button as={"div"} variant={"secondary"} size={"sm"} startIcon={{ component: GithubIcon }} canInteract={false}>
        {repo.owner}/{repo.name}
      </Button>
    );
  }

  return (
    <Popover controlled={{ isOpen: isPopoverOpen, setIsOpen: setIsPopoverOpen }}>
      <Popover.Trigger>
        {() => (
          <div>
            <Button
              as={"div"}
              variant={"secondary"}
              size={"sm"}
              startIcon={{ component: GithubIcon }}
              endIcon={{ component: ChevronDown }}
              translate={{
                token: "common:reposCount",
                count: repoCount,
              }}
            />
          </div>
        )}
      </Popover.Trigger>

      <Popover.Content>
        {() => (
          <ScrollView>
            <div className={"flex max-h-lg w-lg flex-col gap-3"}>
              {repos?.map(repo => <CardGithubRepo key={repo.id} name={repo.name} description={repo.description} />)}
            </div>
          </ScrollView>
        )}
      </Popover.Content>
    </Popover>
  );
}
