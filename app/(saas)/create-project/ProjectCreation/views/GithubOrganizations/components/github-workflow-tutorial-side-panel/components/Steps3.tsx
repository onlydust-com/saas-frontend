import { IMAGES } from "@/app/_assets/img";
import { Card } from "@/shared/ui/card";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";
import { Info } from "lucide-react";

export default function TutorialSidePanelSteps3() {
  return (
    <Card className="flex w-full flex-col items-start justify-start gap-6 p-5">
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <TypographyP className="uppercase">
          3. Grant permissions to OnlyDust
        </TypographyP>
        <TypographyMuted>
          And you're good to go, you can now install the OnlyDust Github app.
        </TypographyMuted>
      </div>
      <img
        src={IMAGES.github.tutorial.step3}
        alt="Grant permissions to OnlyDust"
        className="h-auto w-full rounded-2xl"
        loading="lazy"
      />
      <TypographyMuted className="flex flex-row items-start justify-start gap-2">
        <Info />
        Note you may have to re-authenticate to Github to perform this action.
      </TypographyMuted>
    </Card>
  );
}
