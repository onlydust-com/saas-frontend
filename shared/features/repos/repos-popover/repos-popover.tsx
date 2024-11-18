import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { CardGithubRepo } from "@/design-system/molecules/cards/card-github-repo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

import { ReposPopoverProps } from "./repos-popover.types";

export function ReposPopover({ repos }: ReposPopoverProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const repoCount = repos.length;

  return (
    <Popover controlled={{ isOpen: isPopoverOpen, setIsOpen: setIsPopoverOpen }}>
      <Popover.Trigger>
        {() => (
          <div>
            <Button
              as={"div"}
              variant={"secondary"}
              size={"md"}
              endIcon={{ component: ChevronDown }}
              classNames={{
                base: "max-w-xs overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
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
