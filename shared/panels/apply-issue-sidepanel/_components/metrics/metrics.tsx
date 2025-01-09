import { Clock, MessageSquare, User } from "lucide-react";
import { ReactNode } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Icon, IconPort } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { Translate } from "@/shared/translation/components/translate/translate";
import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { MetricsProps } from "./metrics.types";

type MetricItemProps = {
  label: TranslateProps;
  value: ReactNode;
  icon: IconPort;
};

function MetricItem({ label, value, icon }: MetricItemProps) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <Typo size="xs" color="tertiary" translate={label} />
      <div className="flex items-center justify-start gap-1">
        <Icon {...icon} />
        <Typo size="lg" color="primary">
          {value}
        </Typo>
      </div>
    </div>
  );
}

export function Metrics({ issue }: MetricsProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const openedSince = parseInt(dateKernelPort.formatDistanceToNow(new Date(issue.createdAt), { unit: "day" }));

  return (
    <div className="flex w-full flex-row gap-4 border-b border-border-primary pb-3">
      <MetricItem
        label={{ token: "panels:applyIssue.metrics.applicants" }}
        value={issue.applicants.length}
        icon={{ component: User, color: "yellow" }}
      />
      <div className="h-full w-px bg-border-primary" />
      <MetricItem
        label={{ token: "panels:applyIssue.metrics.commentary" }}
        value={issue.commentCount}
        icon={{ component: MessageSquare, color: "pink" }}
      />
      <div className="h-full w-px bg-border-primary" />
      <MetricItem
        label={{ token: "panels:applyIssue.metrics.openedSince" }}
        value={<Translate token="panels:applyIssue.metrics.days" values={{ count: openedSince }} />}
        icon={{ component: Clock, color: "blue" }}
      />
    </div>
  );
}
