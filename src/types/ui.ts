export type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface VariantProps {
  variant?: Variant;
}

// We're not using ButtonVariantProps in button.tsx anymore, but we'll keep it here for potential future use
export interface ButtonVariantProps {
  variant?: Variant;
  size?: ButtonSize;
}
