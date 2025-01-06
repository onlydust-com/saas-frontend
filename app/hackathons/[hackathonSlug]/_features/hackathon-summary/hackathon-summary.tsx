import { HackathonSummaryProps } from "@/app/hackathons/[hackathonSlug]/_features/hackathon-summary/hackathon-summary.types";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { PaperLoading } from "@/design-system/atoms/paper";
import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { AvatarLabelSingle } from "@/design-system/molecules/avatar-label-single/variants/avatar-label-single-default";

export function HackathonSummary({ hackathonSlug }: HackathonSummaryProps) {
  const {
    data: hackathon,
    isLoading,
    isError,
  } = HackathonReactQueryAdapter.client.useGetHackathonBySlug({
    pathParams: {
      hackathonSlug,
    },
    options: {
      enabled: Boolean(hackathonSlug),
    },
  });

  if (isLoading) {
    return <PaperLoading classNames={{ base: "h-[200px]" }} />;
  }

  if (isError || !hackathon) return null;

  console.log(hackathon);

  return (
    <Paper
      background="glass"
      border="primary"
      classNames={{ base: "flex flex-col divide-y divide-border-primary" }}
      size="none"
    >
      <div className="p-lg">
        <AvatarLabelSingle
          avatar={{
            // src: hackathon.avatar,
            alt: hackathon.title,
          }}
          title={{
            children: hackathon.title,
            variant: "heading",
            size: "xs",
          }}
          size="xl"
          shape="squared"
          truncate={false}
          classNames={{ title: "line-clamp-none" }}
        />
      </div>
      <div className="p-lg">Date</div>
      <div className="p-lg">Location</div>
      <div className="p-lg">Links</div>
    </Paper>
  );
}
