import { Badge } from "@/design-system/atoms/badge";

import { LangaugesProps } from "./languages.types";

export function Languages({ languages }: LangaugesProps) {
  if (!languages?.length) return null;

  return languages.map(({ name, logoUrl }) => (
    <Badge
      key={name}
      size="xxs"
      shape="squared"
      avatar={{
        src: logoUrl,
        alt: name,
      }}
    >
      {name}
    </Badge>
  ));
}
