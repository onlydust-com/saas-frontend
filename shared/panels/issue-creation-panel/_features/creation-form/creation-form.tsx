import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@nextui-org/react";
import { useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { TypographyMuted } from "@/shared/ui/typography";

import { useIssueCreationPanel } from "../../issue-creation-panel.context";
import { MarkdownEditor } from "../markdown-editor/markdown-editor";

export const formSchema = z.object({
  body: z.string().min(1),
  title: z.string().min(1),
});

function Title({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex flex-col space-y-1">
            <FormLabel>Issue title</FormLabel>
          </div>
          <FormControl>
            <Input placeholder="Issue title" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function Body({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <FormField
      control={form.control}
      name="body"
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex flex-col space-y-1">
            <FormLabel>Issue description</FormLabel>
          </div>
          <FormControl>
            <MarkdownEditor placeholder="issue description" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
export function CreationForm() {
  const { setIssue, issue, projectId, closeAndReset } = useIssueCreationPanel();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: issue?.title ?? "",
      body: issue?.body ?? "",
    },
  });

  const title = form.watch("title");
  const body = form.watch("body");

  const { mutateAsync: createIssue } = ProjectReactQueryAdapter.client.useProjectIssueComposerSubmit({
    pathParams: {
      projectId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit", values);
    await createIssue({
      repoId: issue?.repoId ?? 0,
      body: values.body,
      title: values.title,
    });

    closeAndReset();
  }

  useEffect(() => {
    setIssue({
      title,
      body,
      repoId: issue?.repoId ?? 0,
    });
  }, [title, body]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-between gap-6">
        <div className="flex flex-col gap-6 pt-4">
          <TypographyMuted>
            Provide key details to help contributors understand and address your request efficiently. Fill out the
            fields below, and we'll generate a well-structured issue for your repository.
          </TypographyMuted>
          <div className="flex flex-col gap-6">
            <Title form={form} />
            <Body form={form} />
          </div>
        </div>
        <Button variant={"secondary"} size="lg" className="w-full" type="submit">
          Create Issue
        </Button>
      </form>
    </Form>
  );
}
