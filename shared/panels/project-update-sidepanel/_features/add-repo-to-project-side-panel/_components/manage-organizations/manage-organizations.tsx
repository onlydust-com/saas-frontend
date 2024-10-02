import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { GithubOrganizationInterface } from "@/core/domain/github/models/github-organization-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";
import { CardGithubOrganization } from "@/design-system/molecules/cards/card-github-organization";

import { Github } from "@/shared/icons";
import { Translate } from "@/shared/translation/components/translate/translate";
import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { ManageOrganizationsProps } from "./manage-organizations.types";

function Organization({ organization, search }: { organization: GithubOrganizationInterface; search: string | null }) {
  if (!organization.search(search)) return null;

  const url = organization?.isInstalled()
    ? organization.getGithubManagementUrl()
    : organization.getGithubInstallationUrl();

  const isDisabled = !organization.isCurrentUserAdmin;

  return (
    <Tooltip content={<Translate token={"panels:projectUpdate.addRepoPanel.disabledTooltip"} />} enabled={isDisabled}>
      <CardGithubOrganization
        name={organization.name}
        isNotAllowed={isDisabled}
        avatar={{ src: organization.avatarUrl }}
        action={
          !isDisabled
            ? {
                startIcon: { component: Github },
                variant: "secondary",
                size: "xs",
                translate: { token: "panels:projectUpdate.addRepoPanel.organizations.manage" },
                as: "a",
                htmlProps: {
                  target: "_blank",
                  href: url,
                },
              }
            : {
                startIcon: { component: Github },
                variant: "secondary",
                isDisabled: true,
                size: "xs",
                translate: { token: "panels:projectUpdate.addRepoPanel.organizations.manage" },
              }
        }
      />
    </Tooltip>
  );
}

function Organizations({
  organizations,
  search,
  title,
}: {
  organizations: GithubOrganizationInterface[];
  search: string | null;
  title: TranslateProps;
}) {
  if (!organizations.length) return null;

  return (
    <div className={"flex w-full flex-col gap-md"}>
      <div className={"flex w-full items-center justify-between gap-1 overflow-hidden"}>
        <Typo
          size={"xs"}
          color={"secondary"}
          classNames={{ base: "flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap" }}
          translate={title}
        />
      </div>
      {organizations.map(organization => (
        <Organization key={organization.name} organization={organization} search={search} />
      ))}
    </div>
  );
}

export function ManageOrganizations({ installed, notInstalled, onRefresh }: ManageOrganizationsProps) {
  const { t } = useTranslation("panels");
  const [search, setSearch] = useState<string | null>(null);

  return (
    <Accordion
      defaultSelected={["organizations"]}
      id={"organizations"}
      titleProps={{ translate: { token: "panels:projectUpdate.addRepoPanel.organizations.title" } }}
    >
      <div>
        <Input
          name={"search-available-organizations"}
          onChange={e => setSearch(e.target.value)}
          value={search ?? ""}
          placeholder={t("projectUpdate.addRepoPanel.organizations.search")}
        />
      </div>
      <div>
        <Button
          size={"sm"}
          as={"div"}
          startIcon={{ component: RefreshCcw }}
          variant={"secondary"}
          translate={{ token: "panels:projectUpdate.addRepoPanel.organizations.refresh" }}
          classNames={{ base: "w-full" }}
          onClick={() => {
            onRefresh();
          }}
        />
      </div>
      <Organizations
        organizations={installed}
        search={search}
        title={{ token: "panels:projectUpdate.addRepoPanel.organizations.installed" }}
      />
      <Organizations
        organizations={notInstalled}
        search={search}
        title={{ token: "panels:projectUpdate.addRepoPanel.organizations.available" }}
      />
    </Accordion>
  );
}
