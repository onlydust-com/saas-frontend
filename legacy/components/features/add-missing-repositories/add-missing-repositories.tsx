import { Button } from "@/legacy/components/ds/button/button";
import { CalloutAlert } from "@/legacy/components/ds/callout-alert/callout-alert";
import { Tooltip } from "@/legacy/components/ds/tooltip/tooltip";
import { Flex } from "@/legacy/components/layout/flex/flex";
import { Icon } from "@/legacy/components/layout/icon/icon";
import { Typography } from "@/legacy/components/layout/typography/typography";

import { TAddMissingRepositories } from "./add-missing-repositories.types";

export function AddMissingRepositories({
  url,
  disabled,
  tooltip,
  backgroundColor,
  className,
}: TAddMissingRepositories.Props) {
  return (
    <CalloutAlert className={className}>
      <Flex className="gap-4" alignItems="center">
        <Flex alignItems="center" justifyContent="center" className="bg-white/8 h-8 w-8 rounded-large p-2">
          <Icon remixName="ri-error-warning-line" size={16} />
        </Flex>

        <Flex direction="col">
          <Typography variant="body-s-bold">Missing repositories?</Typography>

          <Typography variant="body-xs">
            Make sure they are public and the Github app is granted on all of them.
          </Typography>
        </Flex>
      </Flex>

      {disabled ? (
        <Tooltip content={tooltip}>
          <Button size="s" className="whitespace-nowrap" backgroundColor={backgroundColor} disabled>
            Manage on Github
          </Button>
        </Tooltip>
      ) : (
        <Button
          as="a"
          href={url}
          target="_blank"
          rel="noreferrer"
          size="s"
          className="whitespace-nowrap"
          backgroundColor={backgroundColor}
        >
          Manage on Github
        </Button>
      )}
    </CalloutAlert>
  );
}
