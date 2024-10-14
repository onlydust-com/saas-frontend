import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/design-system/atoms/input";
import { Tag } from "@/design-system/atoms/tag";
import { Textarea } from "@/design-system/atoms/textarea";
import { Typo } from "@/design-system/atoms/typo";
import { Alert } from "@/design-system/molecules/alert";

import { Translate } from "@/shared/translation/components/translate/translate";

import { ContributionWork, CreateWrapperProps } from "./create-wrapper.types";

// TODO: Ajouter button disabled footer
export function CreateWrapper({}: CreateWrapperProps) {
  const { t } = useTranslation("panels");

  const [work, setWork] = useState<ContributionWork>("DOCUMENTATION");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  function handleTitle(value: string) {
    setTitle(value);
  }

  function handleDescription(value: string) {
    setDescription(value);
  }

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col gap-lg">
        <Typo
          size="xs"
          color="secondary"
          translate={{
            token: "panels:otherWork.create.select.label",
          }}
        />

        <div className="flex flex-wrap gap-md">
          <Tag
            size="xs"
            isSelected={work === "DOCUMENTATION"}
            onSelect={() => setWork("DOCUMENTATION")}
            translate={{
              token: "panels:otherWork.create.select.items.documentation",
            }}
          />

          <Tag
            size="xs"
            isSelected={work === "MEETING"}
            onSelect={() => setWork("MEETING")}
            translate={{
              token: "panels:otherWork.create.select.items.meeting",
            }}
          />

          <Tag
            size="xs"
            isSelected={work === "SUBSCRIPTION"}
            onSelect={() => setWork("SUBSCRIPTION")}
            translate={{
              token: "panels:otherWork.create.select.items.subscription",
            }}
          />

          <Tag
            size="xs"
            isSelected={work === "OTHER"}
            onSelect={() => setWork("OTHER")}
            translate={{
              token: "panels:otherWork.create.select.items.other",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-lg">
        <Typo
          size="xs"
          color="secondary"
          translate={{
            token: "panels:otherWork.create.title.label",
          }}
        />

        <Input
          name="contributionTitle"
          value={title}
          size="sm"
          onChange={e => handleTitle(e.target.value)}
          placeholder={t("otherWork.create.title.placeholder")}
        />
      </div>
      <div className="flex flex-col gap-lg">
        <Typo
          size="xs"
          color="secondary"
          translate={{
            token: "panels:otherWork.create.description.label",
          }}
        />

        <Textarea
          name="contributionDescription"
          value={description}
          onChange={e => handleDescription(e.target.value)}
          placeholder={t("otherWork.create.description.placeholder")}
        />
      </div>

      <Alert
        color="brand"
        title={<Translate token="panels:otherWork.create.information.title" />}
        description={<Translate token="panels:otherWork.create.information.description" />}
      />

      <div className="flex flex-col gap-lg">
        <Typo
          size="xs"
          color="secondary"
          translate={{
            token: "panels:otherWork.create.repository.label",
          }}
        />
      </div>
    </div>
  );
}
