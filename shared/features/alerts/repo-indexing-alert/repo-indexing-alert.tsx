import { RefreshCw } from "lucide-react";

import { Alert } from "@/design-system/molecules/alert";

import { Translate } from "@/shared/translation/components/translate/translate";

export function RepoIndexingAlert({ indexingComplete }: { indexingComplete: boolean }) {
  if (indexingComplete) {
    return null;
  }
  return (
    <Alert
      color="brand"
      title={<Translate token="features:repoIndexingAlert.title" />}
      description={<Translate token="features:repoIndexingAlert.description" />}
      icon={{ component: RefreshCw }}
    />
  );
}
