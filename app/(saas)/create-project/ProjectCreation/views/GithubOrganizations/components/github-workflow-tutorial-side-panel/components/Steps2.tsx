import { IMAGES } from "@/app/_assets/img";
import { Card } from "@/shared/ui/card";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

export default function TutorialSidePanelSteps2() {
  return (
    <Card className="flex w-full flex-col items-start justify-start gap-6 p-5">
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <TypographyP className="uppercase">
          2. Scroll down to organisation access
        </TypographyP>
        <TypographyMuted>
          <ul className="list-inside list-disc">
            Your Github organisations are all listed in this section:
            <li>
              the one(s) on which permissions are already granted (Organisation 1)
            </li>
            <li>
              the one(s) you need to send a request to organisation owner (Organisation 2)
            </li>
            <li>
              the one(s) you can grant yourself (Organisation 3)
            </li>
          </ul>
        </TypographyMuted>
      </div>
      <img
        src={IMAGES.github.tutorial.step2}
        alt="organization access"
        className="h-auto w-full"
        loading="lazy"
      />
    </Card>
  );
}
