import { Badge } from "@/design-system/atoms/badge";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";

import { CellBadgeProps } from "./cell-badge.types";

export function CellBadge({ items, badgeProps = {}, popOverAvatars }: CellBadgeProps) {
  if (!items?.length) {
    return <CellEmpty />;
  }

  const badgeContent = items[0];
  const additionalBadges = items?.length > 1 ? items.length - 1 : undefined;

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div className={"flex flex-row gap-1"}>
            <Badge
              {...badgeProps}
              classNames={{
                base: "w-fit",
              }}
              endContent={
                additionalBadges ? (
                  <Badge
                    variant={"solid"}
                    size={"xxs"}
                    color={"grey"}
                    classNames={{
                      base: "bg-components-badge-grey-backgroundoutline-border",
                    }}
                  >
                    + {additionalBadges}
                  </Badge>
                ) : null
              }
            >
              {badgeContent}
            </Badge>
          </div>
        )}
      </Popover.Trigger>

      <Popover.Content>
        {() => (
          <div className="h-fit w-fit overflow-hidden">
            <ScrollView className={"max-h-[300px]"}>
              <div className="flex w-fit flex-col gap-2">
                {popOverAvatars
                  ? popOverAvatars?.map((avatar, index) => (
                      <AvatarLabelGroup
                        shape={"rounded"}
                        avatars={[avatar]}
                        key={index}
                        title={{ children: avatar?.name }}
                      />
                    ))
                  : items.map((item, index) => (
                      <Typo key={index} size={"xs"} color={"secondary"}>
                        {item}
                      </Typo>
                    ))}
              </div>
            </ScrollView>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
