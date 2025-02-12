import { useMemo, useState } from "react";

import { IMAGES } from "@/app/_assets/img";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { ContinueChatResponse, StartChatResponse } from "@/core/domain/me/me-contract.types";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

import { Author, ChatMessage } from "./_features/message/message.types";

export const assistant = {
  login: "OD-Say",
  avatarUrl: IMAGES.odSay.avatar,
};

function messageFromAssistant({
  assistantMessage,
  suggestedProjects,
  suggestedIssues,
}: Partial<ContinueChatResponse & StartChatResponse>): ChatMessage {
  return {
    author: assistant,
    content: assistantMessage,
    variant: "assistant",
    projectIds: suggestedProjects,
    issueIds: suggestedIssues,
  };
}

function messageFromUser(author: Author, content: string): ChatMessage {
  return {
    author,
    content,
    variant: "user",
  };
}

const issuesMock = {
  suggestedIssues: [
    "ded8827c-04b2-3a61-841f-143a16c79220",
    "e86fcd8d-ce83-3c7a-bd74-a619be65417c",
    "79b9afb7-6079-399e-ad2e-2b03ef59a691",
    "ea8c83b5-90f8-3ed1-8909-abc8fe52687e",
  ],
};

const projectsMock = {
  suggestedProjects: [
    "e00ea16f-8a65-4790-8c3a-faed6abf8e8f",
    "f758f2c0-d3bb-4fba-8b17-f2a7c3f2eee9",
    "9aa04b25-614b-4cb8-af6d-d15ca08f18e9",
    "e55c5843-66b9-4e6c-b5dc-eef8729b286b",
  ],
};

export default function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);

  const { user } = useAuthUser();

  const { mutate: startChat, isPending: isStartChatPending } = MeReactQueryAdapter.client.useStartRecoChat({
    options: {
      onSuccess: data => {
        setMessages([messageFromAssistant(data)]);
        setChatId(data.chatId);
      },
    },
  });

  const { mutate: continueChat, isPending: isContinueChatPending } = MeReactQueryAdapter.client.useContinueRecoChat({
    pathParams: { chatId: chatId || "" },
    options: {
      onSuccess: data => {
        setMessages(prev => [
          ...prev,
          messageFromAssistant(
            data.assistantMessage.includes("projects")
              ? { ...data, ...projectsMock }
              : data.assistantMessage.includes("issues")
                ? { ...data, ...issuesMock }
                : data
          ),
        ]);
      },
    },
  });

  const thinkingMessage: ChatMessage = {
    author: assistant,
    variant: "assistant",
  };

  const isThinking = isStartChatPending || isContinueChatPending;

  const allMessages = useMemo(() => (isThinking ? [...messages, thinkingMessage] : messages), [isThinking, messages]);

  const sendMessage = (message: string) => {
    if (!user) return;
    setMessages(prev => [...prev, messageFromUser(user, message)]);
    continueChat({ userMessage: message });
  };

  return {
    messages: allMessages,
    startChat: () => startChat({}),
    sendMessage,
    isThinking,
  };
}
