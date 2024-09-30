import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Badge } from "@/design-system/atoms/badge";
import { Accordion } from "@/design-system/molecules/accordion";
import { MenuItemAvatarPort } from "@/design-system/molecules/menu-item";

import { GithubUserAutocomplete } from "@/shared/features/user/github-user-autocomplete/github-user-autocomplete";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { EditProjectFormData } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

import { ProjectLeadProps } from "./project-lead.types";

export function ProjectLead({ project }: ProjectLeadProps) {
  const { t } = useTranslation("panels");
  const { user } = useAuthUser();
  const [invitedUser, setInvitedUser] = useState<MenuItemAvatarPort<number>[]>([]);
  const { control } = useFormContext<EditProjectFormData>();

  function findUserInInvited(githubId: number) {
    const usersItems = project.invitedLeaders.map(user => ({
      id: user.githubUserId,
      label: user.login,
      searchValue: user.login,
      avatar: { src: user.avatarUrl },
    }));

    return usersItems?.find(lead => lead.id === githubId) || invitedUser?.find(lead => lead.id === githubId);
  }

  function orderByMe(ids?: string[]) {
    if (user && ids && ids.includes(user.id)) {
      return [user.id, ...ids.filter(id => id !== user.id)];
    }
    return ids;
  }

  return (
    <Accordion
      defaultSelected={["project-lead"]}
      id={"project-lead"}
      titleProps={{ translate: { token: "panels:projectUpdate.projectLeads.title" } }}
    >
      <div className={"flex w-full flex-col gap-md"}>
        <Controller
          name="inviteGithubUserIdsAsProjectLeads"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <GithubUserAutocomplete
              withInternalUserOnly={true}
              name={name}
              onSelect={(userIds: number[], users: MenuItemAvatarPort<number>[]) => {
                onChange([...(value || []), ...userIds]);
                setInvitedUser([...invitedUser, ...users]);
              }}
              isMultiple={false}
              closeOnSelect={true}
            />
          )}
        />
        <div className={"justify-s flex flex-row flex-wrap items-center gap-md"}>
          <Controller
            name="projectLeadsToKeep"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                {orderByMe(value)?.map(lead => {
                  const findUser = project.findUserInProjectLead(lead);
                  const _isMe = user?.isMe(lead);
                  return (
                    <Badge
                      as={"span"}
                      isDeletable={!_isMe}
                      avatar={{ src: findUser?.avatarUrl }}
                      color={"brand"}
                      size={"xs"}
                      closeProps={{
                        as: "span",
                        onClose: () => {
                          onChange((value || []).filter(id => id !== lead));
                        },
                      }}
                      key={findUser?.id}
                    >
                      {findUser?.login}
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
          <Controller
            name="inviteGithubUserIdsAsProjectLeads"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                {value?.map(invited => {
                  const user = findUserInInvited(invited);
                  return (
                    <Badge
                      as={"span"}
                      isDeletable={true}
                      avatar={user?.avatar}
                      size={"xs"}
                      closeProps={{
                        as: "span",
                        onClose: () => {
                          onChange((value || []).filter(id => id !== invited));
                        },
                      }}
                      key={user?.id}
                    >
                      {user?.label}
                      <span className={"text-typography-primary"}>
                        &nbsp; {`(${t("projectUpdate.projectLeads.invited")})`}
                      </span>
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
