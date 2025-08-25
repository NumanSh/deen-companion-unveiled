export class ApiErrorHandler {
  static handle(error: any): string {
    if (error?.response?.status === 404) {
      return 'Resource not found';
    }
    if (error?.response?.status >= 500) {
      return 'Server error occurred';
    }
    if (error?.code === 'NETWORK_ERROR') {
      return 'Network connection failed';
    }
    return error?.message || 'An unexpected error occurred';
  }

  static withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
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
      code: error?.code || 'UNKNOWN'
    };
  }

  static getErrorToast(error: any): { title: string; description: string; variant: 'destructive' } {
    const parsed = this.parseError(error);
    return {
      title: 'Error',
      description: parsed.message,
      variant: 'destructive' as const
    };
  }
}

export { ApiErrorHandler };
export default ApiErrorHandler;