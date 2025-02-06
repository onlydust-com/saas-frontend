import { CardDescription } from "@/shared/ui/card";
import { CardHeader } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";

export function SettingsHeader({ title, description }: { title: string; description: string }) {
  return (
    <CardHeader className="p-0">
      <TypographyH3>{title}</TypographyH3>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
}
