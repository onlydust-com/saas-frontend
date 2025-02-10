"use client";

import { ActivityGraph } from "@/shared/features/contributors/activity-graph/activity-graph";
import { Card } from "@/shared/ui/card";

export function ContributionGraph() {
  // Generate mock activity data for the last year
  const mockActivityData = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (364 - i));
    return {
      date,
      count: Math.floor(Math.random() * 10), // Random number of contributions (0-9)
      hasReward: Math.random() > 0.9, // 10% chance of having a reward
    };
  });

  // This is a placeholder for the actual graph implementation
  // You would typically use a library like recharts or react-calendar-heatmap
  return (
    <Card className="p-6">
      <div className="text-left text-sm text-muted-foreground">945 contributions last year</div>
      <ActivityGraph data={mockActivityData} />
    </Card>
  );
}
