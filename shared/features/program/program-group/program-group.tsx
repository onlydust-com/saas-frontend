import { Popover } from "@/design-system/atoms/popover";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { ProgramGroupProps } from "./program-group.types";

export function ProgramGroup({ programs, maxPrograms = 4, avatarProps }: ProgramGroupProps) {
  const programsCount = programs.length;

  if (!programsCount) return null;

  if (programsCount === 1) {
    return (
      <AvatarLabelGroup
        avatars={[
          {
            ...avatarProps,
            src: programs[0].logoUrl,
          },
        ]}
        title={{ children: programs[0].name }}
        truncate
        size={avatarProps?.size}
      />
    );
  }

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div className={"max-w-full cursor-pointer overflow-hidden"}>
            <AvatarGroup
              avatars={programs.map(({ logoUrl, name }) => ({
                src: logoUrl,
                name,
              }))}
              size={avatarProps?.size}
              quantity={maxPrograms}
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
  );
}
