import { Popover } from "@/design-system/atoms/popover";
import { Tag } from "@/design-system/atoms/tag";
import { AvatarDescription } from "@/design-system/molecules/avatar-description";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";

import { cn } from "@/shared/helpers/cn";

import { LanguageGroupProps } from "./language-group.types";

export function LanguageGroup({
  languages,
  maxLanguages,
  maxLanguagesAvatar,
  tagProps = {},
  className,
}: LanguageGroupProps) {
  if (!maxLanguages || languages.length <= maxLanguages) {
    return (
      <div className={cn("flex flex-row flex-wrap gap-1", className)}>
        {languages?.map(({ logoUrl, name }) => (
          <Tag
            key={name}
            size={"s"}
            style={"outline"}
            color={"white"}
            classNames={{
              base: "max-w-full overflow-hidden",
              label: "whitespace-nowrap text-ellipsis overflow-hidden",
            }}
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
            <div className={"max-w-full overflow-hidden"}>
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
                      languages?.map(({ logoUrl, name }) => ({
                        src: logoUrl,
                        name,
                      })) ?? []
                    }
                    size={"xs"}
                    maxAvatars={maxLanguagesAvatar || 3}
                  />
                }
              >
                {languages?.map(({ name }) => name).join(", ")}
              </Tag>
            </div>
          )}
        </Popover.Trigger>
        <Popover.Content>
          {() => (
            <div className={"grid gap-3"}>
              {languages?.map(({ logoUrl, name }) => (
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
