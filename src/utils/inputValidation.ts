// Input validation utilities for Islamic app

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitized?: string;
}

// Arabic text validation
const ARABIC_REGEX = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s0-9]+$/;
const ENGLISH_REGEX = /^[a-zA-Z\s0-9\-'".,:;!?()]+$/;

export const validateSearchQuery = (query: string, type: 'arabic' | 'english' | 'mixed' = 'mixed'): ValidationResult => {
  // Basic sanitization
  const trimmed = query.trim();
  
  // Length validation
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Search query cannot be empty' };
  }
  
  if (trimmed.length > 500) {
    return { isValid: false, error: 'Search query is too long (max 500 characters)' };
  }

  // Remove potentially harmful characters
  const sanitized = trimmed.replace(/[<>'"]/g, '');
  
  // Type-specific validation
  switch (type) {
    case 'arabic':
      if (!ARABIC_REGEX.test(sanitized)) {
        return { isValid: false, error: 'Please enter valid Arabic text' };
      }
      break;
    case 'english':
      if (!ENGLISH_REGEX.test(sanitized)) {
        return { isValid: false, error: 'Please enter valid English text' };
      }
      break;
    case 'mixed':
      // Allow mixed content but still sanitize
      break;
  }

  return { isValid: true, sanitized };
};

export const validateVerseNumber = (verseNumber: string | number, maxVerse: number): ValidationResult => {
  const num = typeof verseNumber === 'string' ? parseInt(verseNumber, 10) : verseNumber;
  
  if (isNaN(num)) {
    return { isValid: false, error: 'Please enter a valid verse number' };
  }
  
  if (num < 1 || num > maxVerse) {
    return { isValid: false, error: `Verse number must be between 1 and ${maxVerse}` };
  }
  
  return { isValid: true, sanitized: num.toString() };
};

export const validateSurahNumber = (surahNumber: string | number): ValidationResult => {
  const num = typeof surahNumber === 'string' ? parseInt(surahNumber, 10) : surahNumber;
  
  if (isNaN(num)) {
    return { isValid: false, error: 'Please enter a valid surah number' };
  }
  
  if (num < 1 || num > 114) {
    return { isValid: false, error: 'Surah number must be between 1 and 114' };
  }
  
  return { isValid: true, sanitized: num.toString() };
};

export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const validateDuaText = (text: string): ValidationResult => {
  const trimmed = text.trim();
  
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Dua text cannot be empty' };
  }
  
  if (trimmed.length > 2000) {
    return { isValid: false, error: 'Dua text is too long (max 2000 characters)' };
  }
  
  // Check for potentially harmful content
  const harmfulPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ];
  
  for (const pattern of harmfulPatterns) {
    if (pattern.test(trimmed)) {
      return { isValid: false, error: 'Invalid content detected' };
    }
  }
  
  return { isValid: true, sanitized: sanitizeHtml(trimmed) };
};