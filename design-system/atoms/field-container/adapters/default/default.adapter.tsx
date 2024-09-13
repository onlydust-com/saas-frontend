import { CircleAlert } from "lucide-react";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { FieldContainerPort } from "../../field-container.types";
import { FieldContainerDefaultVariants } from "./default.variants";

function LabelsContainer({
  label,
  description,
  name,
}: Pick<FieldContainerPort, "label" | "description" | "classNames" | "name">) {
  if (!description && !label) {
    return null;
  }
  return (
    <div className="flex w-full flex-col">
      {label ? (
        <Typo as={"label"} htmlProps={{ htmlFor: name }} size={"sm"} weight={"medium"} color={"secondary"}>
          {label}
        </Typo>
      ) : null}
      {description ? (
        <Typo as={"div"} size={"sm"} color={"secondary"}>
          {description}
        </Typo>
      ) : null}
    </div>
  );
}

function InfoContainer({ error, info, isError }: Pick<FieldContainerPort, "info" | "error" | "isError">) {
  if (isError && error) {
    return (
      <div className="flex w-full flex-row items-center justify-start gap-sm text-foreground-error">
        <Icon size={"sm"} {...(error.icon || {})} component={error.icon?.component || CircleAlert} />
        {error.text ? (
          <Typo as={"div"} size={"sm"} color={"error"}>
            {error.text}
          </Typo>
        ) : null}
      </div>
    );
  }

  if (info) {
    return (
      <div className="flex w-full flex-row items-center justify-start gap-sm text-foreground-secondary">
        {info.icon ? <Icon size={"sm"} {...info.icon} /> : null}
        {info.text ? (
          <Typo as={"div"} size={"sm"} color={"secondary"}>
            {info.text}
          </Typo>
        ) : null}
      </div>
    );
  }

  return null;
}

export function FieldContainerDefaultAdapter({ classNames, children, ...props }: FieldContainerPort) {
  const slots = FieldContainerDefaultVariants();

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <LabelsContainer {...props} />
      {children}
      <InfoContainer {...props} />
    </div>
  );
}
