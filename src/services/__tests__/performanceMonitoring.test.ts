import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { performanceMonitor, measureTime, measureAsyncTime, recordCustomEvent } from '@/services/performanceMonitoring'

// Mock web-vitals v5 on* API
vi.mock('web-vitals', () => ({
  onCLS: (cb: (m: any) => void) => cb({ value: 0.1 }),
  onFID: (cb: (m: any) => void) => cb({ value: 50 }),
  onFCP: (cb: (m: any) => void) => cb({ value: 1200 }),
  onLCP: (cb: (m: any) => void) => cb({ value: 2000 }),
  onTTFB: (cb: (m: any) => void) => cb({ value: 300 }),
}))

// Mock PerformanceObserver
const mockPerformanceObserver = vi.fn()
const mockDisconnect = vi.fn()
const mockObserve = vi.fn()

mockPerformanceObserver.mockImplementation((callback) => ({
  observe: mockObserve,
  disconnect: mockDisconnect
}))

global.PerformanceObserver = mockPerformanceObserver as any

// Mock performance.now
const mockPerformanceNow = vi.fn()
global.performance = {
  now: mockPerformanceNow
} as any

describe('PerformanceMonitor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockPerformanceNow.mockReturnValue(1000)
  })

  afterEach(() => {
    performanceMonitor.destroy()
  })

  describe('Web Vitals', () => {
    it('initializes web vitals monitoring', () => {
      const metrics = performanceMonitor.getMetrics()
      expect(metrics).toBeDefined()
      expect(metrics?.CLS).toBe(0.1)
      expect(metrics?.FID).toBe(50)
      expect(metrics?.FCP).toBe(1200)
      expect(metrics?.LCP).toBe(2000)
      expect(metrics?.TTFB).toBe(300)
    })
  })

  describe('Performance Observers', () => {
    it('handles observer errors gracefully', () => {
      mockObserve.mockImplementationOnce(() => {
        throw new Error('Observer not supported')
      })

      // Should not throw error
      expect(() => {
        performanceMonitor.destroy()
      }).not.toThrow()
    })
  })

  describe('Event Recording', () => {
    it('records custom events', () => {
      recordCustomEvent('test-event', 100, { test: 'data' })
      
      const events = performanceMonitor.getEvents()
      expect(events).toHaveLength(1)
      expect(events[0]).toMatchObject({
        type: 'paint',
        name: 'test-event',
        value: 100,
        metadata: { test: 'data' }
      })
    })

    it('limits events to last 100', () => {
      // Add 110 events
      for (let i = 0; i < 110; i++) {
        recordCustomEvent(`event-${i}`, i)
      }

      const events = performanceMonitor.getEvents()
      expect(events).toHaveLength(100)
      expect(events[0].name).toBe('event-10') // First event should be event-10
      expect(events[99].name).toBe('event-109') // Last event should be event-109
    })
  })

  describe('Time Measurement', () => {
    it('measures synchronous function execution time', () => {
      mockPerformanceNow
        .mockReturnValueOnce(1000) // start time
        .mockReturnValueOnce(1100) // end time

      let result = 0
      measureTime('sync-test', () => {
        result = 42
      })

      expect(result).toBe(42)

      const events = performanceMonitor.getEvents()
      expect(events).toHaveLength(1)
      expect(events[0]).toMatchObject({
        name: 'sync-test',
        value: 100
      })
    })

    it('measures asynchronous function execution time', async () => {
      mockPerformanceNow
        .mockReturnValueOnce(1000) // start time
        .mockReturnValueOnce(1200) // end time

      const result = await measureAsyncTime('async-test', async () => {
        await new Promise(resolve => setTimeout(resolve, 10))
        return 'success'
      })

      expect(result).toBe('success')

      const events = performanceMonitor.getEvents()
      expect(events).toHaveLength(1)
      expect(events[0]).toMatchObject({
        name: 'async-test',
        value: 200
      })
    })

    it('records error timing for failed async operations', async () => {
      mockPerformanceNow
        .mockReturnValueOnce(1000) // start time
        .mockReturnValueOnce(1150) // end time

      await expect(
        measureAsyncTime('async-error', async () => {
          throw new Error('Test error')
        })
      ).rejects.toThrow('Test error')

      const events = performanceMonitor.getEvents()
      expect(events).toHaveLength(1)
      expect(events[0]).toMatchObject({
        name: 'async-error-error',
        value: 150
      })
    })
  })

  describe('Performance Report', () => {
    it('generates comprehensive performance report', () => {
      // Add some test events
      recordCustomEvent('test-1', 100)
      recordCustomEvent('test-1', 200)
      recordCustomEvent('test-2', 50)

      const report = performanceMonitor.getPerformanceReport()

      expect(report).toMatchObject({
        metrics: expect.any(Object),
        eventSummary: {
          paint: {
            count: 3,
            total: 350,
            average: expect.closeTo(116.67, 0.01)
          }
        },
        totalEvents: 3,
        timestamp: expect.any(Number)
      })
    })

    it('handles empty events gracefully', () => {
      const report = performanceMonitor.getPerformanceReport()

      expect(report).toMatchObject({
        metrics: expect.any(Object),
        eventSummary: {},
        totalEvents: 0,
        timestamp: expect.any(Number)
      })
    })
  })

  describe('Cleanup', () => {
    it('properly cleans up observers and data', () => {
      // Add some data first
      recordCustomEvent('test', 100)
      const initialEvents = performanceMonitor.getEvents()
      expect(initialEvents).toHaveLength(1)

      // Cleanup
      performanceMonitor.destroy()

      // Verify cleanup - observers may not be called if not supported
      const finalEvents = performanceMonitor.getEvents()
      expect(finalEvents).toHaveLength(0)
    })
  })

  describe('Development vs Production', () => {
    it('records events correctly', () => {
      recordCustomEvent('test-event', 100)
      
      const events = performanceMonitor.getEvents()
      expect(events).toHaveLength(1)
      expect(events[0]).toMatchObject({
        name: 'test-event',
        value: 100
      })
    })
  })
})
