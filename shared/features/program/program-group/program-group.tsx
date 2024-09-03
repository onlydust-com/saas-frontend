import { Popover } from "@/design-system/atoms/popover";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { cn } from "@/shared/helpers/cn";

import { ProgramGroupProps } from "./program-group.types";

export function ProgramGroup({ programs, maxPrograms, avatarProps, className }: ProgramGroupProps) {
  const programsCount = programs.length;

  if (!programsCount) return null;

  if (!maxPrograms || programsCount <= maxPrograms) {
    return (
      <AvatarGroup
        avatars={programs.map(({ logoUrl, name }) => ({
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
                avatars={programs.map(({ logoUrl, name }) => ({
                  src: logoUrl,
                  name,
                }))}
                quantity={maxPrograms || 4}
                totalAvatarsCount={programsCount}
              />
            </div>
          )}
        </Popover.Trigger>
        <Popover.Content>
          {() => (
            <div className={"grid gap-3"}>
              {programs.map(({ logoUrl, name }) => (
                <AvatarLabelGroup key={name} avatars={[{ ...avatarProps, src: logoUrl }]} title={{ children: name }} />
              ))}
            </div>
          )}
        </Popover.Content>
      </Popover>
    </div>
  );
}
