import { type VariantProps, cva } from "class-variance-authority";

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

export interface ChatMessage extends VariantProps<typeof messageVariants> {
  author: Author;
  content?: string;
  projectIds?: string[];
  issueIds?: string[];
}

export interface MessageProps extends ChatMessage {
  onOpenProject: (id: string) => void;
  onOpenContribution: (id: string) => void;
}
