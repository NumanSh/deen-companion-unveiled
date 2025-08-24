import { describe, it, expect, vi } from 'vitest'
import { ApiErrorHandler, QuranApiErrorHandler, PrayerApiErrorHandler, HadithApiErrorHandler } from '@/utils/apiErrorHandler'

describe('ApiErrorHandler', () => {
  describe('parseError', () => {
    it('parses network errors', () => {
      const networkError = {
        request: {},
        response: null
      }
      
      const result = ApiErrorHandler.parseError(networkError)
      
      expect(result.isNetworkError).toBe(true)
      expect(result.message).toBe('Network connection failed. Please check your internet connection.')
      expect(result.code).toBe('NETWORK_ERROR')
    })

    it('parses HTTP 400 errors', () => {
      const httpError = {
        response: { status: 400 }
      }
      
      const result = ApiErrorHandler.parseError(httpError)
      
      expect(result.status).toBe(400)
      expect(result.message).toBe('Invalid request. Please check your input.')
      expect(result.isClientError).toBe(true)
      expect(result.code).toBe('HTTP_400')
    })

    it('parses HTTP 404 errors', () => {
      const httpError = {
        response: { status: 404 }
      }
      
      const result = ApiErrorHandler.parseError(httpError)
      
      expect(result.status).toBe(404)
      expect(result.message).toBe('The requested resource was not found.')
      expect(result.isClientError).toBe(true)
    })

    it('parses HTTP 500 errors', () => {
      const httpError = {
        response: { status: 500 }
      }
      
      const result = ApiErrorHandler.parseError(httpError)
      
      expect(result.status).toBe(500)
      expect(result.message).toBe('Server error. Please try again later.')
      expect(result.isServerError).toBe(true)
    })

    it('parses HTTP 429 errors', () => {
      const httpError = {
        response: { status: 429 }
      }
      
      const result = ApiErrorHandler.parseError(httpError)
      
      expect(result.status).toBe(429)
      expect(result.message).toBe('Too many requests. Please wait a moment and try again.')
    })

    it('parses generic errors', () => {
      const genericError = new Error('Something went wrong')
      
      const result = ApiErrorHandler.parseError(genericError)
      
      expect(result.message).toBe('Something went wrong')
      expect(result.code).toBe('GENERIC_ERROR')
    })
  })

  describe('shouldRetry', () => {
    it('should retry network errors', () => {
      const networkError = {
        message: 'Network error',
        isNetworkError: true,
        isServerError: false,
        isClientError: false
      }
      
      const result = ApiErrorHandler.shouldRetry(networkError, 1, 3)
      expect(result).toBe(true)
    })

    it('should retry server errors', () => {
      const serverError = {
        message: 'Server error',
        isNetworkError: false,
        isServerError: true,
        isClientError: false
      }
      
      const result = ApiErrorHandler.shouldRetry(serverError, 1, 3)
      expect(result).toBe(true)
    })

    it('should retry 429 errors', () => {
      const rateLimitError = {
        message: 'Rate limit exceeded',
        isNetworkError: false,
        isServerError: false,
        isClientError: true,
        status: 429
      }
      
      const result = ApiErrorHandler.shouldRetry(rateLimitError, 1, 3)
      expect(result).toBe(true)
    })

    it('should not retry client errors (except 429)', () => {
      const clientError = {
        message: 'Bad request',
        isNetworkError: false,
        isServerError: false,
        isClientError: true,
        status: 400
      }
      
      const result = ApiErrorHandler.shouldRetry(clientError, 1, 3)
      expect(result).toBe(false)
    })

    it('should not retry after max attempts', () => {
      const networkError = {
        message: 'Network error',
        isNetworkError: true,
        isServerError: false,
        isClientError: false
      }
      
      const result = ApiErrorHandler.shouldRetry(networkError, 3, 3)
      expect(result).toBe(false)
    })
  })

  describe('calculateDelay', () => {
    it('calculates exponential backoff delay', () => {
      const delay1 = ApiErrorHandler.calculateDelay(0)
      const delay2 = ApiErrorHandler.calculateDelay(1)
      const delay3 = ApiErrorHandler.calculateDelay(2)
      
      expect(delay1).toBe(1000) // initial delay
      expect(delay2).toBe(2000) // 1000 * 2^1
      expect(delay3).toBe(4000) // 1000 * 2^2
    })

    it('respects maximum delay', () => {
      const delay = ApiErrorHandler.calculateDelay(10) // Should be capped at 10000
      expect(delay).toBe(10000)
    })
  })

  describe('withRetry', () => {
    it('succeeds on first attempt', async () => {
      const mockFn = vi.fn().mockResolvedValue('success')
      
      const result = await ApiErrorHandler.withRetry(mockFn)
      
      expect(result).toBe('success')
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('retries and succeeds on second attempt', async () => {
      const mockFn = vi.fn()
        .mockRejectedValueOnce({ response: { status: 500 } })
        .mockResolvedValueOnce('success')
      
      const result = await ApiErrorHandler.withRetry(mockFn)
      
      expect(result).toBe('success')
      expect(mockFn).toHaveBeenCalledTimes(2)
    })

    it('fails after max retries', async () => {
      const mockFn = vi.fn().mockRejectedValue({ response: { status: 500 } })
      
      await expect(ApiErrorHandler.withRetry(mockFn, { maxRetries: 2 }))
        .rejects.toThrow()
      
      expect(mockFn).toHaveBeenCalledTimes(3) // initial + 2 retries
    })

    it('calls onRetry callback', async () => {
      const mockFn = vi.fn()
        .mockRejectedValueOnce({ response: { status: 500 } })
        .mockResolvedValueOnce('success')
      
      const onRetryMock = vi.fn()
      
      await ApiErrorHandler.withRetry(mockFn, {}, onRetryMock)
      
      expect(onRetryMock).toHaveBeenCalledWith(1, expect.objectContaining({
        isServerError: true,
        status: 500
      }))
    })
  })

  describe('getErrorToast', () => {
    it('returns network error toast', () => {
      const networkError = {
        isNetworkError: true,
        message: 'Network connection failed'
      }
      
      const toast = ApiErrorHandler.getErrorToast(networkError)
      
      expect(toast.title).toBe('Connection Error')
      expect(toast.description).toBe('Network connection failed')
      expect(toast.duration).toBe(5000)
    })

    it('returns generic error toast', () => {
      const genericError = {
        isNetworkError: false,
        message: 'Something went wrong'
      }
      
      const toast = ApiErrorHandler.getErrorToast(genericError)
      
      expect(toast.title).toBe('Error')
      expect(toast.description).toBe('Something went wrong')
      expect(toast.duration).toBe(4000)
    })
  })
})

describe('QuranApiErrorHandler', () => {
  describe('getFallbackMessage', () => {
    it('returns fallback message for fetchSurahs', () => {
      const message = QuranApiErrorHandler.getFallbackMessage('fetchSurahs')
      expect(message).toBe('Unable to load Quran chapters. Using offline content.')
    })

    it('returns fallback message for fetchVerse', () => {
      const message = QuranApiErrorHandler.getFallbackMessage('fetchVerse')
      expect(message).toBe('Unable to load verse. Please try again.')
    })

    it('returns fallback message for search', () => {
      const message = QuranApiErrorHandler.getFallbackMessage('search')
      expect(message).toBe('Search service unavailable. Please try again later.')
    })

    it('returns default fallback message', () => {
      const message = QuranApiErrorHandler.getFallbackMessage('unknown')
      expect(message).toBe('Quran service temporarily unavailable.')
    })
  })
})

describe('PrayerApiErrorHandler', () => {
  describe('getFallbackMessage', () => {
    it('returns fallback message for fetchTimes', () => {
      const message = PrayerApiErrorHandler.getFallbackMessage('fetchTimes')
      expect(message).toBe('Unable to get current prayer times. Using approximate times.')
    })

    it('returns fallback message for location', () => {
      const message = PrayerApiErrorHandler.getFallbackMessage('location')
      expect(message).toBe('Unable to detect location. Please set your location manually.')
    })
  })
})

describe('HadithApiErrorHandler', () => {
  describe('getFallbackMessage', () => {
    it('returns fallback message for search', () => {
      const message = HadithApiErrorHandler.getFallbackMessage('search')
      expect(message).toBe('Hadith search unavailable. Using local hadith collection.')
    })

    it('returns fallback message for fetchCollection', () => {
      const message = HadithApiErrorHandler.getFallbackMessage('fetchCollection')
      expect(message).toBe('Unable to load hadith collection. Please try again.')
    })
  })
})
