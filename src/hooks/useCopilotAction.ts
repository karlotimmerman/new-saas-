import { useCopilotAction, CopilotKitProps } from "@copilotkit/react-core";
import { useState, useCallback } from 'react';

export function useCustomCopilotAction(props: CopilotKitProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copilotAction = useCopilotAction(props);

  const executeAction = useCallback(async (...args: any /* TODO: Replace with specific type */[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await copilotAction(...args);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [copilotAction]);

  return {
    executeAction,
    isLoading,
    error
  };
}
