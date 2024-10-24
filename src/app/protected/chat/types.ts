export type Message = {
  id: string;
  text: string;
  sender: string;
  toolCalls?: ToolCall[];
};

export interface ToolCall {
  id: string;
  name: string;
  args: string;
  result?: any /* TODO: Replace with specific type */;
}

export type Model = "gpt-4o-mini" | string; // Add other model options as needed
