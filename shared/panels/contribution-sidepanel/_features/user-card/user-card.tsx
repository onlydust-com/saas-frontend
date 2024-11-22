import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { SocialIconLink } from "@/shared/features/social/social-icon-link/social-icon-link";

import { UserCardProps } from "./user-card.types";

export function UserCard({ title, user }: UserCardProps) {
  if (!user) return null;

  return (
    <Paper
      size={"lg"}
      background={"transparent"}
      border={"primary"}
      classNames={{
        base: "flex flex-col gap-lg",
      }}
    >
      {title ? <Typo size={"sm"} weight={"medium"} color={"primary"} {...title} /> : null}

      <AvatarLabelGroup
        avatars={[
          {
            src: user.avatarUrl,
          },
        ]}
        size={"md"}
        shape={"squared"}
        title={{
          variant: "heading",
          size: "xs",
          weight: "medium",
          children: user.login,
        }}
        withPopover={false}
      />

      {user.contacts ? (
        <ul className={"flex flex-1 flex-row flex-wrap items-center gap-md"}>
          {user.contacts.map(contact => (
            <li key={contact.channel}>
              <Button
                as={"a"}
                htmlProps={{
                  href: contact.contact,
                  target: "_blank",
                  rel: "noreferrer",
                }}
                size={"sm"}
                variant={"secondary"}
                startContent={<SocialIconLink url={contact.contact} />}
                classNames={{
                  base: "capitalize",
                }}
              >
                {contact.channel.toLowerCase()}
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </Paper>
  );
}
