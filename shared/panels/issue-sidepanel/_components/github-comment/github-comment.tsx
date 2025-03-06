import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Textarea } from "@/shared/ui/textarea";

import { IssueSidepanelFormSchema } from "../../issue-sidepanel.types";

export function GithubComment({ hasCurrentUserApplication }: { hasCurrentUserApplication: boolean }) {
  const { control } = useFormContext<IssueSidepanelFormSchema>();

  return (
    <FormField
      control={control}
      name="githubComment"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Github comment</FormLabel>
          <FormControl>
            <Textarea id="githubComment" {...field} disabled={hasCurrentUserApplication} autoFocus />
          </FormControl>
          <FormDescription className="flex items-center gap-1">
            <Info className="size-4 text-muted-foreground" />
            Your application will be publicly visible on GitHub.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
