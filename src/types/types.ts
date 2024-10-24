export type Resource = {
    url: string;
    title: string;
  description: string;
};
export type Message = {
  text: string;
  sender: 'user' | 'assistant';
  id: string;
};

export interface ToolCall {
  id: string;
  name: string;
  args: string;
  result?: any /* TODO: Replace with specific type */;
}

export type Model = "gpt-4o-mini" | string; // Add other model options as needed
