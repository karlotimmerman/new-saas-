import { useCopilotChatSuggestions, UseCopilotChatSuggestionsProps } from "@copilotkit/react-core";
import { useState, useEffect } from 'react';

export function useCustomCopilotChatSuggestions(props: UseCopilotChatSuggestionsProps, dependencies: React.DependencyList = []) {
  const suggestions = useCopilotChatSuggestions(props, dependencies);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Filter out any inappropriate suggestions or apply custom logic
    const filtered = suggestions.filter(suggestion => 
      !suggestion.toLowerCase().includes('inappropriate') &&
      suggestion.length <= 100 // Example: limit suggestion length
    );
    setFilteredSuggestions(filtered);
  }, [suggestions]);

  return filteredSuggestions;
}
