import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw, SendHorizonal } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useEffectOnce } from "react-use";

import { ContributionAs } from "@/core/domain/contribution/models/contribution.types";

import { useIsBreakpoint } from "@/shared/hooks/ui/use-is-breakpoint";
import { useIntercom } from "@/shared/intercom/intercom.context";
import { useContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.hooks";
import { useProjectSidePanel } from "@/shared/panels/project-sidepanel/project-sidepanel.hooks";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { Textarea } from "@/shared/ui/textarea";
import { cn } from "@/shared/utils";

import Message from "./_features/message/message";
import useChat from "./chat.hooks";
import { ChatFormData, formSchema } from "./chat.types";

export default function Chat() {
  const { startNewConversation, sendMessage, messages, isThinking, chatId } = useChat();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const isSmBreakpoint = useIsBreakpoint("sm");
  const { showIntercomLauncher, hideIntercomLauncher } = useIntercom();

  const { open: openContribution } = useContributionsSidepanel();
  const { open: openProject } = useProjectSidePanel();

  function onOpenContribution(id: string) {
    openContribution({ id, as: ContributionAs.CONTRIBUTOR });
  }

  function onOpenProject(id: string) {
    openProject({ projectId: id });
  }

  const form = useForm<ChatFormData>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    hideIntercomLauncher();
    return showIntercomLauncher;
  }, [isThinking]);

  const { handleSubmit } = form;

  useEffect(() => {
    form.setFocus("message");
  }, [form]);

  const onSubmit = ({ message }: ChatFormData) => {
    if (!isThinking) {
      sendMessage(message);
      form.reset({
        message: "",
      });
    }
  };

  useEffectOnce(() => {
    if (!chatId) startNewConversation();
  });

  return (
    <section className="relative mx-auto flex h-full w-full flex-col px-4 lg:w-[720px]">
      <div className="flex flex-1 flex-col gap-8 overflow-y-auto">
        {messages.map(message => (
          <Message
            key={`${message.author.login}-${message.content}-${Date.now()}`}
            {...message}
            onOpenProject={onOpenProject}
            onOpenContribution={onOpenContribution}
          />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="sticky bottom-0 z-20 flex w-full flex-col gap-2 bg-background p-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-row gap-2">
            <Button
              size={isSmBreakpoint ? "default" : "icon"}
              onClick={() => startNewConversation()}
              variant="destructive"
            >
              <RotateCcw />
              <span className="hidden sm:block">Reset conversation</span>
            </Button>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative">
                      <Textarea placeholder="Tell me what you seek" {...field} className="pr-12" />
                      <Button
                        size="icon"
                        type="submit"
                        variant="ghost"
                        className={cn(
                          "absolute right-0 top-0",
                          form.formState.isValid ? "text-primary" : "text-muted-foreground"
                        )}
                        disabled={!form.formState.isValid || isThinking}
                      >
                        <SendHorizonal className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </section>
  );
}
