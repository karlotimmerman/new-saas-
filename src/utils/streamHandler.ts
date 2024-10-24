import { Message } from '@/types/types';
import { ToolCall } from "../types";
import React from 'react';

export function handleStreamEvent(
  jsonData: { type: string; content?: string },
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): void {
  let currentMessageId: string | undefined;

  if (jsonData.type === "messages/partial") {
    jsonData.content.forEach((dataItem: any /* TODO: Replace with specific type */) => {
      if (
        dataItem.type === "ai" &&
        Array.isArray(dataItem.tool_calls) &&
        dataItem.tool_calls.length > 0
      ) {
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage && lastMessage.sender === "ai") {
            // Merge new tool calls with existing ones
            const mergedToolCalls = [
              ...(lastMessage.toolCalls || []),
              ...dataItem.tool_calls.filter(
                (newTc: ToolCall) =>
                  !lastMessage.toolCalls?.some(
                    (existingTc) => existingTc.id === newTc.id
                  )
              ),
            ].map((tc: ToolCall) => {
              const updatedTc = dataItem.tool_calls.find(
                (newTc: ToolCall) => newTc.id === tc.id
              );
              return updatedTc ? { ...tc, ...updatedTc } : tc;
            });

            return [
              ...prevMessages.slice(0, -1),
              {
                ...lastMessage,
                toolCalls: mergedToolCalls,
              },
            ];
          } else {
            // If the last message was not from AI, add a new message
            return [
              ...prevMessages,
              {
                text: "",
                sender: "ai",
                toolCalls: dataItem.tool_calls,
                id: dataItem.id,
              },
            ];
          }
        });
      } else if (dataItem.content) {
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage && lastMessage.sender === "ai") {
            setIsLoading(false);
            return [
              ...prevMessages.slice(0, -1),
              {
                ...lastMessage,
                text: dataItem.content,
                toolCalls: lastMessage.toolCalls || [],
              },
            ];
          } else {
            return [
              ...prevMessages,
              {
                text: dataItem.content,
                sender: "ai",
                toolCalls: [],
                id: dataItem.id,
              },
            ];
          }
        });
      }
    });
  } else if (jsonData.type === "messages/complete") {
    const dataItem = jsonData.content[jsonData.content.length - 1];
    if (dataItem.type === "tool") {
      // Handle tool call completion
      const toolCall: Partial<ToolCall> = {
        id: dataItem.tool_call_id,
        name: dataItem.name,
        result: dataItem.content,
      };

      // Only set args if it's truthy
      if (dataItem.artifact) {
        toolCall.args = dataItem.artifact;
      }

      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && lastMessage.sender === "ai") {
          return [
            ...prevMessages.slice(0, -1),
            {
              ...lastMessage,
              toolCalls: lastMessage.toolCalls?.map((tc) =>
                tc.id === toolCall.id ? { ...tc, ...toolCall } : tc
              ) || [toolCall as ToolCall],
            },
          ];
        } else {
          return [
            ...prevMessages,
            {
              text: "",
              sender: "ai",
              toolCalls: [toolCall as ToolCall],
              id: dataItem.id,
            },
          ];
        }
      });
    } else if (dataItem.type === "ai" && dataItem.content) {
      if (!currentMessageId) {
        currentMessageId = dataItem.id;
      }

      setMessages((prevMessages) => {
        const messageExists =
          prevMessages.some((msg) => msg.id === dataItem.id) ||
          currentMessageId === dataItem.id;
        if (messageExists) {
          return prevMessages;
        }
        return [
          ...prevMessages,
          { id: dataItem.id, text: dataItem.content, sender: "ai" },
        ];
      });
    }
    setIsLoading(false);
  }
}
