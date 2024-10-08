import { Avatar } from "@/design-system/atoms/avatar";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { SocialIconLink } from "@/shared/features/social-link/social-icon-link/social-icon-link";
import { SocialLinkTranslate } from "@/shared/features/social-link/social-translate/social-translate";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ProfileProps } from "./profile.types";

export function Profile({ user }: ProfileProps) {
  const showRankPercentile = !!user.statsSummary?.rankPercentile && user.statsSummary?.rankPercentile !== 100;
  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <div className={"flex flex-row items-center justify-start gap-lg"}>
        <Avatar size={"2xl"} shape={"squared"} src={user.avatarUrl} />
        <div className={"flex flex-col gap-sm"}>
          <Typo variant={"heading"} size={"xs"} weight={"medium"}>
            {user.login}
          </Typo>
          <Typo as={"div"} size={"sm"} color={"tertiary"}>
            {user.getTitle().wording} • {user.getRank()}
            {showRankPercentile ? (
              <>
                {" • "}
                <Translate token={"panels:contributor.rank"} count={user.statsSummary?.rankPercentile} />
              </>
            ) : null}
          </Typo>
        </div>
      </div>
      {user.bio && (
        <Typo size={"xs"} color={"secondary"}>
          {user.bio}
        </Typo>
      )}
      <div className={"flex w-full flex-row flex-wrap gap-md"}>
        {user.contacts?.map(contact => (
          <Button
            key={contact.contact}
            as={"a"}
            size={"sm"}
            variant={"secondary"}
            htmlProps={{
              href: contact.contact,
              target: "_blank",
              rel: "noreferrer",
            }}
            startContent={<SocialIconLink url={contact.contact} />}
          >
            <SocialLinkTranslate url={contact.contact} />
          </Button>
        ))}
      </div>
    </Paper>
  );
}
