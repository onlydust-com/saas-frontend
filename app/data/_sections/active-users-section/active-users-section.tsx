import { ActiveUsersChart } from "@/app/data/_sections/active-users-section/components/active-users-chart/active-users-chart";

import { Typo } from "@/design-system/atoms/typo";

export function ActiveUsersSection() {
  return (
    <div className="flex flex-col gap-4">
      <Typo size={"xs"} weight={"medium"} variant={"heading"} translate={{ token: "data:activeUsers.header.title" }} />
      <ActiveUsersChart />
    </div>
  );
}
