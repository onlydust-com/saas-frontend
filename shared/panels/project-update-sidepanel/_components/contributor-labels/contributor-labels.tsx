import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Accordion } from "@/design-system/molecules/accordion";

import { EditProjectFormData } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

export function ContributorLabels() {
  const [newLabel, setNewLabel] = useState("");
  const [updateLabel, setUpdateLabel] = useState("");
  const [isEditing, setIsEditing] = useState<number | false>(false);
  const { t } = useTranslation("panels");
  const { control, getValues } = useFormContext<EditProjectFormData>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "labels",
  });

  const showEdit = isEditing !== false;

  function onCreateLabel() {
    if (newLabel) {
      append({ name: newLabel });
      setNewLabel("");
    }
  }

  function onUpdateLabel() {
    if (isEditing !== false) {
      const baseValue = getValues(`labels.${isEditing}`);
      update(isEditing, { ...baseValue, name: updateLabel });
      setUpdateLabel("");
      setIsEditing(false);
    }
  }

  function onCancelUpdate() {
    setUpdateLabel("");
    setIsEditing(false);
  }

  function onEnableEdit(index: number, value: string) {
    setIsEditing(index);
    setUpdateLabel(value);
  }

  return (
    <Accordion
      defaultSelected={["contributor-labels"]}
      id={"contributor-labels"}
      titleProps={{ translate: { token: "panels:projectUpdate.contributorLabels.title" } }}
    >
      {fields.length ? (
        <div className={"flex flex-row flex-wrap gap-md"}>
          {fields.map((item, index) => (
            <Controller
              key={item.id}
              name={`labels.${index}`}
              control={control}
              render={({ field }) => (
                <Badge
                  color={"brand"}
                  as={"div"}
                  size={"xs"}
                  isDeletable
                  classNames={{ base: "w-fit cursor-pointer" }}
                  htmlProps={{
                    onClick: () => onEnableEdit(index, field.value.name),
                  }}
                  closeProps={{
                    as: "span",
                    onClose: e => {
                      e.stopPropagation();
                      remove(index);
                    },
                  }}
                >
                  {field.value.name}
                </Badge>
              )}
            />
          ))}
        </div>
      ) : null}
      {!showEdit ? (
        <div className={"flex w-full flex-col gap-md"}>
          <Input
            name={"new-label-name"}
            classNames={{ base: "w-full" }}
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            placeholder={t("projectUpdate.contributorLabels.addLabelPlaceholder")}
          />
          <Button
            as={"div"}
            startIcon={{ component: Plus }}
            translate={{ token: "panels:projectUpdate.contributorLabels.addLabel" }}
            onClick={onCreateLabel}
            variant={"secondary"}
            size={"sm"}
          />
        </div>
      ) : (
        <div className={"flex w-full flex-col gap-md"}>
          <Input
            name={"new-label-name"}
            classNames={{ base: "w-full" }}
            value={updateLabel}
            onChange={e => setUpdateLabel(e.target.value)}
          />
          <div className={"flex flex-row gap-md"}>
            <Button
              as={"div"}
              startIcon={{ component: Pencil }}
              translate={{ token: "panels:projectUpdate.contributorLabels.updateLabel" }}
              onClick={onUpdateLabel}
              variant={"secondary"}
              size={"sm"}
            />
            <Button
              as={"div"}
              translate={{ token: "panels:projectUpdate.contributorLabels.cancel" }}
              onClick={onCancelUpdate}
              variant={"secondary"}
              size={"sm"}
            />
          </div>
        </div>
      )}
    </Accordion>
  );
}
