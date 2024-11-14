import { CellBadge } from "@/shared/features/table/cell/cell-badge/cell-badge";
import { CellLanguagesProps } from "@/shared/features/table/cell/cell-languages/cell-languages.types";

export function CellLanguages({ languages }: CellLanguagesProps) {
  return (
    <CellBadge
      items={languages.map(language => ({
        content: language.name,
        badgeProps: {
          avatar: {
            src: language?.logoUrl,
            alt: language.name,
          },
        },
      }))}
    />
  );
}
