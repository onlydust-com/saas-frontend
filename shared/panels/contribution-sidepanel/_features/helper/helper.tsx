import { Alert } from "@/design-system/molecules/alert";

import { Translate } from "@/shared/translation/components/translate/translate";

import { HelperProps } from "./helper.types";

export function Helper({ type, onClose }: HelperProps) {
  return (
    <Alert
      color="brand"
      title={<Translate token={`panels:contribution.helper.${type}.title`} />}
      description={<Translate token={`panels:contribution.helper.${type}.description`} />}
      onClose={onClose}
    />
  );
}
