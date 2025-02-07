import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Badge } from "@/design-system/atoms/badge";
import { Accordion } from "@/design-system/molecules/accordion";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

import { ProjectLeadProps } from "./project-lead.types";

export function ProjectLead({ project, form }: ProjectLeadProps) {
  const { t } = useTranslation("panels");
  const { user } = useAuthUser();
  const { control } = form;

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
        <div className={"justify-s flex flex-row flex-wrap items-center gap-md"}>
          <Controller
            name="projectLeads"
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
        </div>
      </div>
    </Accordion>
  );
}
