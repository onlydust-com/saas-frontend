import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ContributorInterface } from "@/core/domain/user/models/contributor-model";

import { Badge } from "@/design-system/atoms/badge";
import { Accordion } from "@/design-system/molecules/accordion";
import { MenuItemAvatarPort } from "@/design-system/molecules/menu-item";

import { GithubUserAutocomplete } from "@/shared/features/user/github-user-autocomplete/github-user-autocomplete";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

import { ProjectLeadProps } from "./project-lead.types";

type User = Partial<ContributorInterface>;

export function ProjectLead({ project, form }: ProjectLeadProps) {
  const { t } = useTranslation("panels");
  const { user } = useAuthUser();
  const { control } = form;

  function orderByMe(users?: User[]) {
    if (user && users && users.map(u => u?.id).includes(user.id)) {
      return [user, ...users.filter(u => u?.id !== user.id)];
    }
    return users;
  }

  const projectLeads = form.watch("projectLeads");

  return (
    <Accordion
      defaultSelected={["project-lead"]}
      id={"project-lead"}
      titleProps={{ translate: { token: "panels:projectUpdate.projectLeads.title" } }}
    >
      <div className={"flex w-full flex-col gap-md"}>
        <div className={"justify-s flex flex-row flex-wrap items-center gap-md"}>
          <Controller
            name="projectLeads"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <GithubUserAutocomplete
                withInternalUserOnly={true}
                withIsRegistered={true}
                name={name}
                onSelect={(userIds: string[], users: MenuItemAvatarPort<string>[]) => {
                  onChange([...(value || []), ...users]);
                }}
                isMultiple={false}
                closeOnSelect={true}
                selectedUser={projectLeads?.map(u => u.id || "")}
              />
            )}
          />
          <Controller
            name="projectLeads"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                {orderByMe(value)?.map(lead => {
                  const _isMe = user?.isMe(lead?.id || "");

                  return (
                    <Badge
                      as={"span"}
                      isDeletable={!_isMe}
                      avatar={{ src: lead?.avatarUrl }}
                      color={"brand"}
                      size={"xs"}
                      closeProps={{
                        as: "span",
                        onClose: () => {
                          onChange((value || []).filter(u => u.id !== lead?.id));
                        },
                      }}
                      key={lead?.id}
                    >
                      {lead?.login}
                      {_isMe && (
                        <span className={"text-typography-primary"}>
                          &nbsp; {`(${t("projectUpdate.projectLeads.you")})`}
                        </span>
                      )}
                    </Badge>
                  );
                })}
              </>
            )}
          />
        </div>
      </div>
    </Accordion>
  );
}
