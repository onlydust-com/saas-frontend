import { Trash } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";

import { EditProjectFormData } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function MoreInfo() {
  const { t } = useTranslation("panels");
  const { control } = useFormContext<EditProjectFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "moreInfos",
  });

  return (
    <Accordion
      defaultSelected={["more-info"]}
      id={"more-info"}
      titleProps={{ translate: { token: "panels:projectUpdate.moreInfo.title" } }}
    >
      <div className={"flex w-full flex-col gap-md"}>
        {fields.map((item, index) => (
          <div key={item.id} className={"flex w-full flex-col gap-md"}>
            <div className={"flex flex-row items-center justify-between gap-2"}>
              <Typo size={"xs"} color={"secondary"} classNames={{ base: "flex-1" }}>
                {item.value || <Translate token={"panels:projectUpdate.moreInfo.emptyLinkLabel"} count={index + 1} />}
              </Typo>
              <Button
                startIcon={{ component: Trash }}
                iconOnly={true}
                variant={"secondary"}
                size={"xs"}
                onClick={() => remove(index)}
              />
            </div>
            <div className={"flex flex-row gap-2"}>
              <Controller
                name={`moreInfos.${index}.url`}
                control={control}
                render={({ field }) => (
                  <Input placeholder={t("projectUpdate.moreInfo.inputs.link.placeholder")} {...field} />
                )}
              />
              <Controller
                name={`moreInfos.${index}.value`}
                control={control}
                render={({ field }) => (
                  <Input placeholder={t("projectUpdate.moreInfo.inputs.label.placeholder")} {...field} />
                )}
              />
            </div>
          </div>
        ))}
        <Button
          iconOnly={true}
          variant={"secondary"}
          size={"md"}
          classNames={{ base: "w-full" }}
          translate={{ token: "panels:projectUpdate.moreInfo.addLink" }}
          onClick={() => append({ value: "", url: "" })}
        />
      </div>
    </Accordion>
  );
}
