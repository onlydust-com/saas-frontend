import { TypographyMuted, TypographySmall } from "@/shared/ui/typography";

export function ProfileItem({ label, value = "-" }: { label: string; value?: string }) {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt>
        <TypographySmall>{label}</TypographySmall>
      </dt>
      <dd className="mt-1 sm:col-span-2 sm:mt-0 sm:self-center">
        <TypographyMuted>{value}</TypographyMuted>
      </dd>
    </div>
  );
}
