import { useMemo } from "react";

import { ContributionActivityStatus } from "@/core/domain/contribution/models/contribution.types";

import { Alert } from "@/design-system/molecules/alert";

import { Translate } from "@/shared/translation/components/translate/translate";

import { HelperProps } from "./helper.types";

export function Helper({ type, open, onClose }: HelperProps) {
  const alertContent = useMemo(() => {
    switch (type) {
      case ContributionActivityStatus.NOT_ASSIGNED:
        return {
          title: <Translate token={`panels:contribution.helper.${type}.title`} />,
          description: <Translate token={`panels:contribution.helper.${type}.description`} />,
        };
      case ContributionActivityStatus.TO_REVIEW:
        return {
          title: <Translate token={`panels:contribution.helper.${type}.title`} />,
          description: <Translate token={`panels:contribution.helper.${type}.description`} />,
        };
      default:
        return null;
    }
  }, [type]);

  if (!open) {
    return null;
  }

  return <Alert color="brand" title={alertContent?.title} description={alertContent?.description} onClose={onClose} />;
}
