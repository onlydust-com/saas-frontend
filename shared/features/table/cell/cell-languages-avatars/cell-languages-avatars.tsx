import { CellAvatar } from "@/shared/features/table/cell/cell-avatar/cell-avatar";

import { CellLanguagesAvatarsProps } from "./cell-languages-avatars.types";

export function CellLanguagesAvatars({ languages, ...props }: CellLanguagesAvatarsProps) {
  return (
    <CellAvatar
      avatars={languages.map(language => ({
        src: language.logoUrl,
        name: language.name,
      }))}
      quantity={3}
      {...props}
    />
  );
}
