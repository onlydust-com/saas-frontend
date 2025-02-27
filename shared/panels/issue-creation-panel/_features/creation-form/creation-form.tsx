import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Markdown } from "@/shared/features/markdown/markdown";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { TypographyP } from "@/shared/ui/typography";

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

function AdditionalQuestions({
  onChangeBody,
  onChangeTitle,
}: {
  onChangeBody: (body: string) => void;
  onChangeTitle: (title: string) => void;
}) {
  const { setIssue, issue, projectId } = useIssueCreationPanel();
  const [additionalQuestions, setAdditionalQuestions] = useState("");

  const { mutateAsync: updateIssue, isPending } = ProjectReactQueryAdapter.client.useProjectIssueComposerUpdate({
    pathParams: {
      projectId,
      issueCompositionId: issue?.issueCompositionId ?? "",
    },
    options: {
      onError: () => {
        toast.error("Failed to generate issue");
      },
    },
  });

  async function handleAdditionalQuestionsChange() {
    const issueResult = await updateIssue({
      additionalInfo: additionalQuestions,
    });

    setIssue({
      title: issueResult.title,
      body: issueResult.body,
      repoId: issue?.repoId ?? 0,
      issueCompositionId: issueResult?.issueCompositionId ?? "",
      additionalQuestions: !!issueResult.additionalQuestions?.trim() ? issueResult.additionalQuestions : undefined,
    });

    onChangeBody(issueResult.body);
    onChangeTitle(issueResult.title);
  }

  if (!issue?.additionalQuestions || issue?.additionalQuestions === "") {
    return null;
  }

  return (
    <Card
      className={
        "relative flex flex-col gap-4 overflow-hidden bg-gradient-to-br from-blue-950 to-transparent to-60% py-4"
      }
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-none px-4">
          <AccordionTrigger className="border-none p-0 !no-underline">
            <header className={"flex w-full flex-col items-start justify-start gap-2"}>
              <div className={"flex items-center gap-2"}>
                <Sparkles className={"text-blue-700"} size={16} />
                <TypographyP className="no-underline">Answer more questions to refine the issue</TypographyP>
              </div>
            </header>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-6">
            <div className={"relative h-fit transition-all"}>
              <FormItem className="w-full">
                <div className="mb-6 flex flex-col">
                  <Markdown content={issue?.additionalQuestions} />
                </div>
                <FormControl>
                  <Textarea
                    value={additionalQuestions}
                    onChange={e => setAdditionalQuestions(e.target.value)}
                    className="max-h-[300px]"
                    onInput={e => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "0px";
                      target.style.height = target.scrollHeight + "px";
                    }}
                  />
                </FormControl>
              </FormItem>
              <Button
                size="lg"
                className="mt-4 w-full"
                type="button"
                onClick={handleAdditionalQuestionsChange}
                loading={isPending}
              >
                Submit
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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

  const { mutateAsync: createIssue, isPending } = ProjectReactQueryAdapter.client.useProjectIssueComposerSubmit({
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

  function onChangeTitle(title: string) {
    form.setValue("title", title, {
      shouldDirty: true,
    });
  }

  function onChangeBody(body: string) {
    form.setValue("body", body, {
      shouldDirty: true,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-between gap-6">
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex flex-col gap-6">
            <AdditionalQuestions onChangeBody={onChangeBody} onChangeTitle={onChangeTitle} />
            <Title form={form} />
            <Body form={form} />
          </div>
        </div>
        <Button size="lg" className="w-full" type="submit" loading={isPending}>
          Create Issue
        </Button>
      </form>
    </Form>
  );
}
