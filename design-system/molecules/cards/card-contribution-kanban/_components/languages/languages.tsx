import { Badge } from "@/design-system/atoms/badge";
import { Popover } from "@/design-system/atoms/popover";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { LangaugesProps } from "@/design-system/molecules/cards/card-contribution-kanban/_components/languages/languages.types";

export function Languages({ languages }: LangaugesProps) {
  if (!languages?.length) return null;

  const languagesCount = languages.length;
  const [{ name, logoUrl }] = languages;

  if (languagesCount === 1) {
    return <Badge avatar={{ src: logoUrl }}>{name}</Badge>;
  }

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div>
            <Badge
              classNames={{ base: "cursor-pointer" }}
              avatar={{
                size: "xxs",
                src: logoUrl,
              }}
            >
              {name} +{languagesCount - 1}
            </Badge>
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {() => (
          <ul className={"grid gap-3"}>
            {languages.map(language => (
              <AvatarLabelGroup
                key={language.name}
                as={"li"}
                size={"sm"}
                avatars={[{ src: language.logoUrl, alt: language.name }]}
                title={{
                  size: "sm",
                  children: language.name,
                }}
                withPopover={false}
              />
            ))}
          </ul>
        )}
      </Popover.Content>
    </Popover>
  );
}
