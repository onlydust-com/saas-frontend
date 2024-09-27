import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Accordion } from "@/design-system/molecules/accordion";
import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { UserAutocomplete } from "@/shared/features/user/user-autocomplete/user-autocomplete";
import { EditProjectFormData } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

import { ProjectLeadProps } from "./project-lead.types";

export function ProjectLead({ project }: ProjectLeadProps) {
  const { t } = useTranslation("panels");
  const { control } = useFormContext<EditProjectFormData>();

  const initialUsersItems: MenuItemPort[] = useMemo(
    () => [
      ...project.leaders.map(lead => ({
        id: lead.id || `${lead.githubUserId}`,
        label: lead.login,
        searchValue: lead.login,
        avatar: { src: lead.avatarUrl },
      })),
      ...project.invitedLeaders.map(lead => ({
        id: lead.id || `${lead.githubUserId}`,
        label: lead.login,
        searchValue: lead.login,
        avatar: { src: lead.avatarUrl },
      })),
    ],
    [project]
  );

  return (
    <Accordion
      defaultSelected={["project-lead"]}
      id={"project-lead"}
      titleProps={{ translate: { token: "panels:projectUpdate.projectLeads.title" } }}
    >
      <div className={"flex w-full flex-col gap-md"}>
        <Controller
          name="leads"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <UserAutocomplete
              withInternalUserOnly={true}
              name={name}
              onSelect={onChange}
              selectedUser={value}
              initialtUsers={initialUsersItems}
              isMultiple={true}
            />
          )}
        />
      </div>
    </Accordion>
  );
}
