// API error handling utilities with retry mechanisms

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  isNetworkError?: boolean;
  isServerError?: boolean;
  isClientError?: boolean;
}

export interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2
};

export class ApiErrorHandler {
  static parseError(error: any): ApiError {
    // Network error
    if (!error.response && error.request) {
      return {
        message: 'Network connection failed. Please check your internet connection.',
        isNetworkError: true,
        code: 'NETWORK_ERROR'
      };
    }

    // HTTP error response
    if (error.response) {
      const status = error.response.status;
      const isServerError = status >= 500;
      const isClientError = status >= 400 && status < 500;

      let message = 'An unexpected error occurred';
      
      switch (status) {
        case 400:
          message = 'Invalid request. Please check your input.';
          break;
        case 401:
          message = 'Authentication failed. Please try again.';
          break;
        case 403:
          message = 'Access denied. You don\'t have permission for this action.';
          break;
        case 404:
          message = 'The requested resource was not found.';
          break;
        case 429:
          message = 'Too many requests. Please wait a moment and try again.';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          break;
        case 502:
        case 503:
        case 504:
          message = 'Service temporarily unavailable. Please try again later.';
          break;
      }

      return {
        message,
        status,
        isServerError,
        isClientError,
        code: `HTTP_${status}`
      };
    }

    // Generic error
    return {
      message: error.message || 'An unexpected error occurred',
      code: 'GENERIC_ERROR'
    };
  }

  static shouldRetry(error: ApiError, attempt: number, maxRetries: number): boolean {
    if (attempt >= maxRetries) return false;
    
    // Don't retry client errors (4xx) except for specific cases
    if (error.isClientError && error.status !== 429) return false;
    
    // Retry network errors and server errors
    return error.isNetworkError || error.isServerError || error.status === 429;
  }

  static calculateDelay(attempt: number, config: RetryConfig = DEFAULT_RETRY_CONFIG): number {
    const delay = config.initialDelay * Math.pow(config.backoffMultiplier, attempt);
    return Math.min(delay, config.maxDelay);
  }

  static async withRetry<T>(
    fn: () => Promise<T>,
    config: Partial<RetryConfig> = {},
    onRetry?: (attempt: number, error: ApiError) => void
  ): Promise<T> {
    const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
    let lastError: ApiError;

    for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = this.parseError(error);
        
        if (!this.shouldRetry(lastError, attempt, retryConfig.maxRetries)) {
          throw lastError;
        }

        if (attempt < retryConfig.maxRetries) {
          const delay = this.calculateDelay(attempt, retryConfig);
          onRetry?.(attempt + 1, lastError);
          await this.delay(delay);
        }
      }
    }

    throw lastError!;
  }

  static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static getErrorToast(error: ApiError) {
    return {
      title: error.isNetworkError ? 'Connection Error' : 'Error',
      description: error.message,
      variant: 'destructive' as const,
      duration: error.isNetworkError ? 5000 : 4000
    };
  }
}

// Specialized handlers for different API types
export class QuranApiErrorHandler extends ApiErrorHandler {
  static getFallbackMessage(operation: string): string {
    switch (operation) {
      case 'fetchSurahs':
        return 'Unable to load Quran chapters. Using offline content.';
      case 'fetchVerse':
        return 'Unable to load verse. Please try again.';
      case 'search':
        return 'Search service unavailable. Please try again later.';
      default:
        return 'Quran service temporarily unavailable.';
    }
  }
}

export class PrayerApiErrorHandler extends ApiErrorHandler {
  static getFallbackMessage(operation: string): string {
    switch (operation) {
      case 'fetchTimes':
        return 'Unable to get current prayer times. Using approximate times.';
      case 'location':
        return 'Unable to detect location. Please set your location manually.';
      default:
        return 'Prayer times service temporarily unavailable.';
    }
  }
}

export class HadithApiErrorHandler extends ApiErrorHandler {
  static getFallbackMessage(operation: string): string {
    switch (operation) {
      case 'search':
        return 'Hadith search unavailable. Using local hadith collection.';
      case 'fetchCollection':
        return 'Unable to load hadith collection. Please try again.';
      default:
        return 'Hadith service temporarily unavailable.';
    }
  }
}