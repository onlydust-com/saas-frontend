import { Popover } from "@/design-system/atoms/popover";
import { Tag } from "@/design-system/atoms/tag";
import { AvatarDescription } from "@/design-system/molecules/avatar-description";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";

import { cn } from "@/shared/helpers/cn";

import { SponsorGroupProps } from "./sponsor-group.types";

export function SponsorGroup({
  sponsors,
  maxSponsors,
  maxSponsorsAvatar,
  tagProps = {},
  className,
}: SponsorGroupProps) {
  if (!maxSponsors || sponsors.length <= maxSponsors) {
    return (
      <div className={cn("flex flex-row flex-wrap gap-1", className)}>
        {sponsors?.map(({ logoUrl, name }) => (
          <Tag
            key={name}
            classNames={{
              base: "max-w-full overflow-hidden",
              label: "whitespace-nowrap text-ellipsis overflow-hidden",
            }}
            size={"s"}
            style={"outline"}
            color={"white"}
            {...tagProps}
            avatar={{ src: logoUrl, alt: name }}
          >
            {name}
          </Tag>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-row flex-wrap gap-1", className)}>
      <Popover>
        <Popover.Trigger>
          {() => (
            <div className={"max-w-full cursor-pointer overflow-hidden"}>
              <Tag
                size={"s"}
                style={"outline"}
                color={"white"}
                classNames={{
                  base: "max-w-full overflow-hidden",
                  label: "whitespace-nowrap text-ellipsis overflow-hidden",
                }}
                {...tagProps}
                startContent={
                  <AvatarGroup
                    avatars={
                      sponsors?.map(({ logoUrl, name }) => ({
                        src: logoUrl,
                        name,
                      })) ?? []
                    }
                    size={"xs"}
                    maxAvatars={maxSponsorsAvatar || 3}
                  />
                }
              >
                {sponsors?.map(({ name }) => name).join(", ")}
              </Tag>
            </div>
          )}
        </Popover.Trigger>
        <Popover.Content>
          {() => (
            <div className={"grid gap-3"}>
              {sponsors?.map(({ logoUrl, name }) => (
                <AvatarDescription
                  key={name}
                  avatarProps={{ src: logoUrl, size: "xs" }}
                  labelProps={{ children: name }}
                />
              ))}
            </div>
          )}
        </Popover.Content>
      </Popover>
    </div>
  );
}
