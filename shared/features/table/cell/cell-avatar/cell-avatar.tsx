import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";

import { CellAvatarProps } from "./cell-avatar.types";

export function CellAvatar({ avatars, singleProps = {}, multipleProps = {}, ...props }: CellAvatarProps) {
  if (!avatars.length) {
    return <CellEmpty />;
  }

  if (avatars.length === 1) {
    const avatar = avatars[0];

    return (
      <AvatarLabelGroup
        title={{ children: avatar.name }}
        {...props}
        {...singleProps}
        avatars={[
          {
            src: avatar.src,
          },
        ]}
      />
    );
  }

  return <AvatarLabelGroup {...props} {...multipleProps} avatars={avatars} />;
}
