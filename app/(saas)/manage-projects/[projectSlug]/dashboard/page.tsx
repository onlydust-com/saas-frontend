import { ActionableTips } from "./_features/actionable-tips/actionable-tips";

export default function DashboardPage({ params }: { params: { projectSlug: string } }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">Left content</div>
      <div className="lg:col-span-1">
        <ActionableTips projectSlug={params.projectSlug} />
      </div>
    </div>
  );
}
