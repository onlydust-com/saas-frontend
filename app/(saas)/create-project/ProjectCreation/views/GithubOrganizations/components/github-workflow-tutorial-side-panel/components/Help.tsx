import { SendHorizonal } from "lucide-react";

import { useIntercom } from "@/shared/intercom/intercom.context";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

export default function TutorialSidePanelHelp({ onClose }: { onClose: () => void }) {
  const { openIntercom } = useIntercom();

  const contactUs = () => {
    onClose();
    openIntercom();
  };

  return (
    <Card className="flex w-full flex-col items-start justify-start gap-6 p-5">
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <TypographyP className="uppercase">What if you can&apos;t grant permissions to all organizations?</TypographyP>
        <TypographyMuted>
          If you encounter an issue while granting permissions, or if you don&apos;t have sufficient access rights (e.g.
          when you can only request for permissions), please contact us so we can help.
        </TypographyMuted>
      </div>
      <Button variant="secondary" size="sm" onClick={() => contactUs()}>
        <SendHorizonal />
        Contact us
      </Button>
    </Card>
  );
}
