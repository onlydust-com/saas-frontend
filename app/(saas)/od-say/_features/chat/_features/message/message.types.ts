export interface Author {
  login: string;
  avatarUrl: string;
}

export interface ChatMessage {
  author: Author;
  content?: string;
  projectIds?: string[];
  issueIds?: string[];
  followUpMessage?: string;
  variant: "user" | "assistant";
}

export interface MessageProps extends ChatMessage {
  onOpenProject: (id: string) => void;
  onOpenIssue: (issueId: string, projectId: string) => void;
}
