import { Popover } from "@/design-system/atoms/popover";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { cn } from "@/shared/helpers/cn";

import { SponsorGroupProps } from "./sponsor-group.types";

export function SponsorGroup({ sponsors, maxSponsors, avatarProps, className }: SponsorGroupProps) {
  const sponsorsCount = sponsors.length;

  if (!sponsorsCount) return null;

  if (!maxSponsors || sponsorsCount <= maxSponsors) {
    return (
      <AvatarGroup
        avatars={sponsors.map(({ logoUrl, name }) => ({
          src: logoUrl,
          name,
        }))}
      />
    );
  }

  return (
    <div className={cn("flex flex-row flex-wrap gap-1", className)}>
      <Popover>
        <Popover.Trigger>
          {() => (
            <div className={"max-w-full cursor-pointer overflow-hidden"}>
              <AvatarGroup
                avatars={sponsors.map(({ logoUrl, name }) => ({
                  src: logoUrl,
                  name,
                }))}
                quantity={maxSponsors || 4}
                totalAvatarsCount={sponsorsCount}
              />
            </div>
          )}
        </Popover.Trigger>
        <Popover.Content>
          {() => (
            <div className={"grid gap-3"}>
              {sponsors.map(({ logoUrl, name }) => (
                <AvatarLabelGroup key={name} avatars={[{ ...avatarProps, src: logoUrl }]} title={{ children: name }} />
              ))}
            </div>
          )}
        </Popover.Content>
      </Popover>
    </div>
  );
}
