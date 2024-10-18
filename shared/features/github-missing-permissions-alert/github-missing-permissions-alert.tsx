import { Github } from "lucide-react";

import { Alert } from "@/design-system/molecules/alert";

import { Translate } from "@/shared/translation/components/translate/translate";

export function GithubMissingPermissionsAlert({ onClose }: { onClose: () => void }) {
  return (
    <Alert
      color="brand"
      title={<Translate token="features:githubMissingPermissionsAlert.title" />}
      description={<Translate token="features:githubMissingPermissionsAlert.description" />}
      onClose={onClose}
      icon={{ component: Github }}
    />
  );
}
