import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";

export function ApplyIssueGuideline() {
  return (
    <Alert variant="info">
      <AlertTitle className="mb-4 text-lg">Heads up, builders! Application limits & best practices</AlertTitle>
      <AlertDescription>
        <ul className="list-inside space-y-2">
          <li className="font-bold text-foreground">
            ✓ To keep things fair and spam-free, we’re limiting applications to 10 issues at a time.
          </li>
          <li className="text-foreground">
            ✓ <strong>Pick wisely</strong> – Only apply if you can actually solve it.
          </li>
          <li className="text-foreground">
            ✓ <strong>Add a personal touch</strong> – A quick comment on why you’re interested makes a difference. It
            helps maintainers see you&apos;re the right fit.
          </li>
          <li className="text-foreground">
            ✓ <strong>You get credits back</strong> – If an issue is assigned to someone else or you make a PR, your
            counter drops. Sent 10 applications? If 1 issue is taken, boom—you’re back at 9/10, meaning you can apply
            for another.
          </li>
          <li className="text-foreground">
            ✓ <strong>TL;DR</strong>: Be thoughtful, show your motivation, and keep an eye on your application count.
            Let’s keep it clean and high-quality.
          </li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}
