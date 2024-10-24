import { useCopilotChatCompletion } from "@copilotkit/react-core";

export function useCustomCopilotChatCompletion(prompt: string) {
  return useCopilotChatCompletion({
    messages: [{ role: "user", content: prompt }],
    // Add any other configuration options here
  });
}
