import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { IMAGES } from "@/app/_assets/img";

import { bootstrap } from "@/core/bootstrap";

import { Markdown } from "@/shared/features/markdown/markdown";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { TypographyMuted, TypographySmall } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { ChatFormData, MessageProps, formSchema, messageVariants } from "./chat.types";

const assistant = {
  login: "OD-Say",
  avatarUrl: IMAGES.odSay.avatar,
};

function Message({ author, content, timestamp, variant }: MessageProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  return (
    <div className="flex w-full flex-col gap-2">
      <div className={`flex items-center gap-2 ${variant === "user" ? "flex-row-reverse" : "flex-row"}`}>
        <Avatar>
          <AvatarImage src={author.avatarUrl} />
          <AvatarFallback>{author.login}</AvatarFallback>
        </Avatar>
        <TypographySmall>{author.login}</TypographySmall>
        <TypographyMuted className={variant === "user" ? "mr-auto" : "ml-auto"}>
          {dateKernelPort.formatDistanceToNow(timestamp)}
        </TypographyMuted>
      </div>
      <div className={cn(messageVariants({ variant }))}>
        <Markdown content={content} />
      </div>
    </div>
  );
}

export default function Chat() {
  const { user } = useAuthUser();

  const messages = useMemo(
    () =>
      user
        ? [
            {
              timestamp: new Date(),
              author: assistant,
              content:
                "Hello! What type of open-source project are you interested in contributing to? Are there any specific programming languages or domains you're keen on? Let me know so I can guide you towards finding the right project.",
            },
            {
              timestamp: new Date(),
              author: user,
              content: "We are done here. I'd like to provide feedback",
            },
            {
              timestamp: new Date(),
              author: assistant,
              content: "To provide feedback, please use the button below.",
            },
            {
              timestamp: new Date(),
              author: user,
              content: "I want you to list all the projects in Rust",
            },
            {
              timestamp: new Date(),
              author: assistant,
              content:
                "Here are some open-source projects in Rust that you might be interested in:\n\n1. **Starknet in Rust**\n   - **Description:** A transaction execution library that implements key elements of Starknet using the Cairo virtual machine.\n   - **Languages:** Rust, Cairo, Python, Shell\n   - **URL:** [Starknet in Rust](https://app.onlydust.com/projects/starknet-in-rust)\n\n2. **starknet-rs**\n   - **Description:** A comprehensive Rust library designed to streamline interaction with the Starknet ecosystem.\n   - **Languages:** Rust, Cairo, JavaScript, Python, Shell\n   - **URL:** [starknet-rs](https://app.onlydust.com/projects/starknet-rs)\n\n3. **Scarb**\n   - **Description:** A project management tool designed for the Cairo programming language, managing dependencies and compiling projects.\n   - **Languages:** Rust, Cairo, JavaScript\n   - **URL:** [Scarb](https://app.onlydust.com/projects/scarb)\n\nIf any of these projects sound interesting to you, let me know, and I can help you find specific issues to contribute to!",
            },
            {
              timestamp: new Date(),
              author: user,
              content: "With good first issues",
            },
            {
              timestamp: new Date(),
              author: assistant,
              content:
                "Here are some \"good first issues\" in Rust projects that you might find interesting:\n\n1. **Starknet in Rust**\n   - **Issue:** [Fix typo in comments](https://github.com/eqlabs/pathfinder/issues/1154)\n   - **Description:** There are some typos in the comments within the codebase that need correction. This is a straightforward issue suitable for someone new to the project.\n\n2. **starknet-rs**\n   - **Issue:** [Improve documentation for module X](https://github.com/xJonathanLEI/starknet-rs/issues/20)\n   - **Description:** The documentation for a specific module needs enhancement. This could involve adding examples or clarifying existing content.\n\n3. **Scarb**\n   - **Issue:** [Add tests for CLI options](https://github.com/software-mansion/scarb/issues/25)\n   - **Description:** This issue involves writing tests for the command-line interface options to ensure they work as expected. It's a great way to get familiar with the project's functionality.\n\nIf any of these issues catch your attention, feel free to dive in! Let me know if you need more information or assistance.",
            },
            {
              timestamp: new Date(),
              author: user,
              content: "Are they recent?",
            },
            {
              timestamp: new Date(),
              author: user,
              content: "What are the dates?",
            },
          ]
        : [],
    [user]
  );

  const form = useForm<ChatFormData>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = (values: ChatFormData) => {
    console.log(values);
  };

  return (
    <section className="flex flex-col gap-8 px-4">
      <div className="flex flex-col gap-8">
        {messages.map((message, index) => (
          <Message key={index} {...message} variant={message.author === assistant ? "assistant" : "user"} />
        ))}
      </div>
      <div className="mb-2 flex flex-col gap-2">
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
                        disabled={!form.formState.isValid}
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
