export const handleApiError = (error: any): string => {
  if (error.response?.status === 404) {
    return 'Content not found';
  }
  if (error.response?.status >= 500) {
    return 'Server error. Please try again later.';
  }
  if (error.code === 'NETWORK_ERROR') {
    return 'Network error. Check your connection.';
  }
  return error.message || 'An unexpected error occurred';
};

export class ApiErrorHandler {
  static handle(error: any): string {
    return handleApiError(error);
  }
  
  static withRetry<T>(fn: () => Promise<T>, retries: number = 3): Promise<T> {
    return fn().catch(async (error) => {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.withRetry(fn, retries - 1);
      }
      throw error;
    });
  }
  
  static parseError(error: any): { message: string; code?: string } {
    return {
      message: this.handle(error),
      code: error.code || error.response?.status?.toString()
    };
  }
  
  static getErrorToast(error: any) {
    const parsed = this.parseError(error);
    return {
      title: 'Error',
      description: parsed.message,
      variant: 'destructive' as const
    };
  }
}

export const QuranApiErrorHandler = {
  handle: handleApiError,
  withRetry: ApiErrorHandler.withRetry.bind(ApiErrorHandler),
  parseError: ApiErrorHandler.parseError.bind(ApiErrorHandler),
  getErrorToast: ApiErrorHandler.getErrorToast.bind(ApiErrorHandler)
};

export const HadithApiErrorHandler = {
  handle: handleApiError,
  withRetry: ApiErrorHandler.withRetry.bind(ApiErrorHandler),
  parseError: ApiErrorHandler.parseError.bind(ApiErrorHandler),
  getErrorToast: ApiErrorHandler.getErrorToast.bind(ApiErrorHandler)
};

export default ApiErrorHandler;