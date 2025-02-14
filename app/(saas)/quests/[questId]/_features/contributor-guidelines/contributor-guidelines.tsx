import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";

export function ContributorGuidelines() {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="space-y-4">
      {/* Main mission */}
      <Alert variant="warning">
        <AlertTitle>Contributors: Be a Team Player, Make an Impact</AlertTitle>
        <AlertDescription>Your mission? Dive in, communicate, and ship awesome work.</AlertDescription>
      </Alert>

      {showMore && (
        <>
          {/* Before starting section */}
          <Alert>
            <AlertTitle>Before You Start</AlertTitle>
            <AlertDescription>
              <ul className="list-inside space-y-2">
                <li>✓ Know your Quest! – Read the description, check the issues, and get the context.</li>
                <li>✓ Set up & explore – Install what you need, scan the docs, and make sure you're ready to go.</li>
                <li>✓ Say hi! – Join the squad chat and introduce yourself. This is a team effort!</li>
                <li>✓ Ask early! – Got questions? Better now than later.</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* During the quest section */}
          <Alert>
            <AlertTitle>During the Quest</AlertTitle>
            <AlertDescription>
              <ul className="list-inside space-y-2">
                <li>
                  ✓ Stay in touch! – Maintain communication with your squad & maintainers. Silence slows things down!
                </li>
                <li>✓ Respect the flow – If you're blocked or delayed, just say so. No stress, just clarity.</li>
                <li>✓ Test your work! – No one likes broken code. Check before you push!</li>
                <li>✓ Be cool! – Respect teammates, give helpful feedback, and embrace collaboration.</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* After the quest section */}
          <Alert variant="warning">
            <AlertTitle>After the Quest</AlertTitle>
            <AlertDescription>
              <ul className="list-inside space-y-2">
                <li>✓ Finish strong – Submit, review, and polish your contribution.</li>
                <li>✓ Leave breadcrumbs – Share any insights or tips for future contributors.</li>
                <li>✓ Stick around? – Enjoyed it? There's always more to explore in the project!</li>
              </ul>
            </AlertDescription>
          </Alert>
        </>
      )}
      <Button variant="outline" onClick={() => setShowMore(!showMore)} className="mt-2 w-full">
        {showMore ? "Show Less" : "Show More Guidelines"}
      </Button>
    </div>
  );
}
