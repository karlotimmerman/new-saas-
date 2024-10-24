import { useCopilotChat, UseCopilotChatOptions } from "@copilotkit/react-core";
import { useState, useEffect } from 'react';

export function useCustomCopilotChat(options: UseCopilotChatOptions) {
  const chat = useCopilotChat(options);
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);

  useEffect(() => {
    if (chat.messages) {
      setChatHistory(chat.messages);
    }
  }, [chat.messages]);

  const sendMessage = async (message: string) => {
    await chat.sendMessage(message);
    // You might want to update local state or perform other actions here
  };

  return {
    ...chat,
    chatHistory,
    sendMessage
  };
}
