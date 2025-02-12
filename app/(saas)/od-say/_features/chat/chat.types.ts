import { type VariantProps, cva } from "class-variance-authority";
import { z } from "zod";

export const messageVariants = cva("rounded-lg p-2 shadow w-fit", {
  variants: {
    variant: {
      user: "bg-purple-800 text-accent-foreground rounded-tr-none mr-12 ml-auto",
      assistant: "bg-secondary text-secondary-foreground rounded-tl-none ml-12 mr-auto",
    },
    loading: {
      true: "text-transparent hover:text-transparent",
    },
  },
});

export interface Author {
  login: string;
  avatarUrl: string;
}

export interface MessageProps extends VariantProps<typeof messageVariants> {
  author: Author;
  content?: string;
  timestamp: Date;
}

export const formSchema = z.object({
  message: z.string().min(1),
});

export type ChatFormData = z.infer<typeof formSchema>;
