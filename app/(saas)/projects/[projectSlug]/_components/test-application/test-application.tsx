import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyH4, TypographyP } from "@/shared/ui/typography";

export function TestApplication({ projectId }: { projectId?: string }) {
  const { capture } = usePosthog();

  return (
    <Card className="flex flex-col gap-3 p-3">
      <TypographyH4>Test the application</TypographyH4>

      <TypographyP className="text-sm">
        Why not test the application?
        <br />
        Follow our guide to report bugs or suggest improvements.
      </TypographyP>

      <Button
        variant={"outline"}
        asChild
        className="w-fit"
        onClick={() => {
          capture("project_overview_contribute_now_click_faq", { project_id: projectId });
        }}
      >
        {/* TODO @hayden */}
        <a href="" target="_blank" rel="noopener noreferrer">
          Test the application
        </a>
      </Button>
    </Card>
  );
}
