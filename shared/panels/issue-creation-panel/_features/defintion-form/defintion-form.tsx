import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { TypographyMuted } from "@/shared/ui/typography";

import { useIssueCreationPanel } from "../../issue-creation-panel.context";
import { MarkdownEditor } from "../markdown-editor/markdown-editor";

export const formSchema = z.object({
  context: z.string().min(1),
  requirements: z.string().min(1),
  type: z.string().min(1),
  repoId: z.number().min(1),
});

function TypeField({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex flex-col space-y-1">
            <FormLabel>Type</FormLabel>
            <FormDescription>Select the type of issue</FormDescription>
          </div>
          <FormControl>
            <Select {...field} onValueChange={value => field.onChange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select the type" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectItem value="FEATURE">Feature</SelectItem>
                <SelectItem value="BUG">Bug</SelectItem>
                <SelectItem value="IMPROVEMENT">Improvement</SelectItem>
                <SelectItem value="DOCUMENTATION">Documentation</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function RepoField({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  const { project } = useIssueCreationPanel();
  const repo = project?.repos.map(repo => ({
    label: repo.name,
    value: repo.id,
  }));

  return (
    <FormField
      control={form.control}
      name="repoId"
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex flex-col space-y-1">
            <FormLabel>Repositories</FormLabel>
            <FormDescription>Select the related project or repository.</FormDescription>
          </div>
          <FormControl>
            <Select
              {...field}
              value={field.value ? field.value.toString() : undefined}
              onValueChange={value => field.onChange(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the repository" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                {repo?.map(repo => (
                  <SelectItem key={repo.value} value={repo.value.toString()}>
                    {repo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function ContextField({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <FormField
      control={form.control}
      name="context"
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex flex-col space-y-1">
            <FormLabel>Context</FormLabel>
            <FormDescription>Briefly describe the problem or need.</FormDescription>
          </div>
          <FormControl>
            <Textarea placeholder="Briefly describe the problem or need." {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function RequirementsField({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <FormField
      control={form.control}
      name="requirements"
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex flex-col space-y-1">
            <FormLabel>What Needs to be Done</FormLabel>
            <FormDescription>What should happen once the issue is resolved?</FormDescription>
          </div>
          <FormControl>
            <Textarea placeholder="Describe the specific requirements for the issue." {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
export function DefintionForm() {
  const { setStep, projectId, setIssue } = useIssueCreationPanel();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: composeIssue, isPending } = ProjectReactQueryAdapter.client.useProjectIssueComposerCompose({
    pathParams: {
      projectId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit", values);
    const issue = await composeIssue({
      repoId: values.repoId,
      requirements: values.requirements,
      context: values.context,
      type: values.type as "FEATURE" | "BUG" | "IMPROVEMENT" | "DOCUMENTATION" | "OTHER",
    });

    setIssue({
      title: issue.title,
      body: issue.body,
      repoId: values.repoId,
    });

    setStep("creation");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-between gap-6">
        <div className="flex flex-col gap-6 pt-4">
          <TypographyMuted>
            Provide key details to help contributors understand and address your request efficiently. Fill out the
            fields below, and we'll generate a well-structured issue for your repository.
          </TypographyMuted>
          <div className="flex flex-col gap-4">
            <RepoField form={form} />
            <TypeField form={form} />
            <ContextField form={form} />
            <RequirementsField form={form} />
          </div>
        </div>
        <Button variant={"secondary"} size="lg" className="w-full" type="submit" loading={isPending}>
          Generate Issue
        </Button>
      </form>
    </Form>
  );
}
