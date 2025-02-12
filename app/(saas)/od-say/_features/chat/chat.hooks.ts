import { useMemo, useState } from "react";

import { IMAGES } from "@/app/_assets/img";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

import { Author, MessageProps } from "./chat.types";

export const assistant = {
  login: "OD-Say",
  avatarUrl: IMAGES.odSay.avatar,
};

function messageFromAssistant(content: string): MessageProps {
  return {
    author: assistant,
    content,
    timestamp: new Date(),
    variant: "assistant",
  };
}

function messageFromUser(author: Author, content: string): MessageProps {
  return {
    author,
    content,
    timestamp: new Date(),
    variant: "user",
  };
}

export default function useChat() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);

  const { user } = useAuthUser();

  const { mutate: startChat, isPending: isStartChatPending } = MeReactQueryAdapter.client.useStartRecoChat({
    options: {
      onSuccess: data => {
        setMessages([messageFromAssistant(data.assistantMessage)]);
        setChatId(data.chatId);
      },
    },
  });

  const { mutate: continueChat, isPending: isContinueChatPending } = MeReactQueryAdapter.client.useContinueRecoChat({
    pathParams: { chatId: chatId || "" },
    options: {
      onSuccess: data => {
        setMessages(prev => [...prev, messageFromAssistant(data.assistantMessage)]);
      },
    },
  });

  const thinkingMessage: MessageProps = {
    author: assistant,
    timestamp: new Date(),
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
