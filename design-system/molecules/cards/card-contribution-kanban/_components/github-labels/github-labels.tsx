import { LabelPopover } from "@/shared/components/label-popover/label-popover";

import { GithubLabelsProps } from "./github-labels.types";

export function GithubLabels({ githubLabels }: GithubLabelsProps) {
  if (!githubLabels?.length) return null;

  return (
    <LabelPopover
      labels={githubLabels.map(({ name }) => name)}
      badgeProps={{
        color: "grey",
        size: "xs",
      }}
    />
  );
}
