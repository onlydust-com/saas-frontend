import { CellAvatar } from "@/shared/features/table/cell/cell-avatar/cell-avatar";
import { CellLanguagesProps } from "@/shared/features/table/cell/cell-languages/cell-languages.types";

export function CellLanguages({ languages, ...props }: CellLanguagesProps) {
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
