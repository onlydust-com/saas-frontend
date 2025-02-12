import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useEffectOnce } from "react-use";

import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils";

import Message from "./_features/message/message";
import useChat from "./chat.hooks";
import { ChatFormData, formSchema } from "./chat.types";

export default function Chat() {
  const { startChat, sendMessage, messages, isThinking } = useChat();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const form = useForm<ChatFormData>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { handleSubmit, reset } = form;

  const onSubmit = ({ message }: ChatFormData) => {
    if (!isThinking) {
      sendMessage(message);
      reset({
        message: "",
      });
    }
  };

  useEffectOnce(() => {
    startChat();
  });

  return (
    <section className="flex h-full w-full flex-col gap-8 px-4 lg:w-[720px]">
      <div className="flex flex-col gap-8">
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="mb-2 mt-auto flex flex-col gap-2">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Tell me what you seek" {...field} className="pr-12" />
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
