import { ActivityGraph as ActivityGraphComponent } from "@/shared/features/contributors/activity-graph/activity-graph";
import { Card } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";

export function ActivityGraph() {
  const mockActivityData = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (364 - i));
    return {
      date,
      count: Math.floor(Math.random() * 10), // Random number of contributions (0-9)
      hasReward: Math.random() > 0.9, // 10% chance of having a reward
    };
  });

  return (
    <Card className={"relative flex flex-col gap-4 p-4"}>
      <TypographyH3>Github Activity</TypographyH3>
      <ActivityGraphComponent data={mockActivityData} />
    </Card>
  );
}
