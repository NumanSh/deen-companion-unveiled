export const validateSearchInput = (input: string): boolean => {
  if (!input || input.trim().length === 0) return false;
  if (input.length > 100) return false;
  return true;
};

export const validateSearchQuery = (input: string, type?: string) => {
  const trimmed = input.trim();
  return {
    isValid: trimmed.length > 0 && trimmed.length <= 100,
    sanitized: trimmed,
    error: trimmed.length === 0 ? 'Search query cannot be empty' : trimmed.length > 100 ? 'Search query too long' : null
  };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};