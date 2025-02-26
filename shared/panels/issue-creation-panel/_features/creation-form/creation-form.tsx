import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { TypographyH3, TypographyMuted, TypographyP } from "@/shared/ui/typography";

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

function AdditionalQuestions() {
  const { setIssue, issue, projectId, closeAndReset } = useIssueCreationPanel();
  const [additionalQuestions, setAdditionalQuestions] = useState(issue?.additionalQuestions ?? "");

  useEffect(() => {
    setAdditionalQuestions(issue?.additionalQuestions ?? "");
  }, [issue]);

  function handleAdditionalQuestionsChange() {
    console.log("additionalQuestions", additionalQuestions);
  }

  return (
    <Card
      className={
        "relative flex flex-col gap-4 overflow-hidden bg-gradient-to-br from-purple-950 to-transparent to-20% p-4"
      }
    >
      <header className={"flex w-full items-center justify-start gap-2"}>
        <div className={"flex items-center gap-2"}>
          <Sparkles className={"text-purple-700"} />
          <TypographyH3>Be More Accurate</TypographyH3>
          <TypographyP>Refine Your Issue for Better Contributions</TypographyP>
        </div>
      </header>

      <div className={"relative h-fit overflow-hidden transition-all"}>
        <FormItem className="w-full">
          <div className="flex flex-col space-y-1">
            <FormLabel>{issue?.additionalQuestions}</FormLabel>
          </div>
          <FormControl>
            <Textarea value={additionalQuestions} onChange={e => setAdditionalQuestions(e.target.value)} />
          </FormControl>
        </FormItem>
        <Button
          variant={"secondary"}
          size="lg"
          className="w-full"
          type="button"
          onClick={handleAdditionalQuestionsChange}
        >
          Submit
        </Button>
      </div>
    </Card>
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
    options: {
      onError: () => {
        toast.error("Failed to create issue");
      },
      onSuccess: () => {
        toast.success("Issue created successfully");
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!issue?.repoId) {
      return;
    }

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
      issueCompositionId: issue?.issueCompositionId ?? "",
      additionalQuestions: issue?.additionalQuestions ?? "",
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
            <AdditionalQuestions />
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
