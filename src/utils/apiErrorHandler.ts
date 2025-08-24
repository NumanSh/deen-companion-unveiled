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
}

export const QuranApiErrorHandler = {
  handle: handleApiError
};

export const HadithApiErrorHandler = {
  handle: handleApiError
};