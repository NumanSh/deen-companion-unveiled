import type { Metric } from 'web-vitals'

export interface PerformanceMetrics {
  CLS: number
  FID: number
  FCP: number
  LCP: number
  TTFB: number
  timestamp: number
}

export interface PerformanceEvent {
  type: 'navigation' | 'resource' | 'paint' | 'layout-shift' | 'long-task'
  name: string
  value: number
  timestamp: number
  metadata?: Record<string, any>
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics | null = null
  private events: PerformanceEvent[] = []
  private observers: Map<string, PerformanceObserver> = new Map()
  private isInitialized = false

  constructor() {
    // Fire and forget: dynamically import web-vitals to avoid build-time named export issues
    void this.initializeWebVitals()
    this.initializePerformanceObservers()
  }

  private async initializeWebVitals() {
    try {
      const mod: any = await import('web-vitals')
      const onCLS = mod.onCLS || mod.getCLS
      const onFID = mod.onFID || mod.getFID
      const onFCP = mod.onFCP || mod.getFCP
      const onLCP = mod.onLCP || mod.getLCP
      const onTTFB = mod.onTTFB || mod.getTTFB

      if (onCLS) onCLS(this.handleWebVital.bind(this, 'CLS'))
      if (onFID) onFID(this.handleWebVital.bind(this, 'FID'))
      if (onFCP) onFCP(this.handleWebVital.bind(this, 'FCP'))
      if (onLCP) onLCP(this.handleWebVital.bind(this, 'LCP'))
      if (onTTFB) onTTFB(this.handleWebVital.bind(this, 'TTFB'))
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('web-vitals failed to load:', error)
      }
    }
  }

  private handleWebVital(name: keyof PerformanceMetrics, metric: Metric) {
    if (!this.metrics) {
      this.metrics = {
        CLS: 0,
        FID: 0,
        FCP: 0,
        LCP: 0,
        TTFB: 0,
        timestamp: Date.now()
      }
    }

    this.metrics[name] = metric.value
    this.metrics.timestamp = Date.now()

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Web Vital - ${name}:`, metric.value)
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics('web-vital', { name, value: metric.value })
    }
  }

  private initializePerformanceObservers() {
    if (!window.PerformanceObserver) return

    // Navigation timing
    try {
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming
            this.recordEvent('navigation', 'page-load', navEntry.loadEventEnd - navEntry.loadEventStart, {
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              firstPaint: navEntry.responseStart - navEntry.requestStart,
              totalTime: navEntry.loadEventEnd - navEntry.fetchStart
            })
          }
        })
      })
      navigationObserver.observe({ entryTypes: ['navigation'] })
      this.observers.set('navigation', navigationObserver)
    } catch (error) {
      console.warn('Navigation observer not supported:', error)
    }

    // Resource timing
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming
            this.recordEvent('resource', resourceEntry.name, resourceEntry.duration, {
              size: resourceEntry.transferSize,
              type: resourceEntry.initiatorType,
              protocol: resourceEntry.nextHopProtocol
            })
          }
        })
      })
      resourceObserver.observe({ entryTypes: ['resource'] })
      this.observers.set('resource', resourceObserver)
    } catch (error) {
      console.warn('Resource observer not supported:', error)
    }

    // Layout shifts
    try {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'layout-shift') {
            const layoutEntry = entry as any
            this.recordEvent('layout-shift', 'layout-shift', layoutEntry.value, {
              sources: layoutEntry.sources?.length || 0
            })
          }
        })
      })
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })
      this.observers.set('layout-shift', layoutShiftObserver)
    } catch (error) {
      console.warn('Layout shift observer not supported:', error)
    }

    // Long tasks
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'longtask') {
            const longTaskEntry = entry as any
            this.recordEvent('long-task', 'long-task', longTaskEntry.duration, {
              startTime: longTaskEntry.startTime,
              attribution: longTaskEntry.attribution
            })
          }
        })
      })
      longTaskObserver.observe({ entryTypes: ['longtask'] })
      this.observers.set('longtask', longTaskObserver)
    } catch (error) {
      console.warn('Long task observer not supported:', error)
    }

    this.isInitialized = true
  }

  private recordEvent(type: PerformanceEvent['type'], name: string, value: number, metadata?: Record<string, any>) {
    const event: PerformanceEvent = {
      type,
      name,
      value,
      timestamp: Date.now(),
      metadata
    }

    this.events.push(event)

    // Keep only last 100 events
    if (this.events.length > 100) {
      this.events = this.events.slice(-100)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Event:', event)
    }
  }

  // Public API methods
  public getMetrics(): PerformanceMetrics | null {
    return this.metrics
  }

  public getEvents(): PerformanceEvent[] {
    return [...this.events]
  }

  public recordCustomEvent(name: string, value: number, metadata?: Record<string, any>) {
    this.recordEvent('paint', name, value, metadata)
  }

  public measureTime(name: string, fn: () => void | Promise<void>) {
    const start = performance.now()
    
    const result = fn()
    
    if (result instanceof Promise) {
      return result.finally(() => {
        const duration = performance.now() - start
        this.recordCustomEvent(name, duration)
      })
    } else {
      const duration = performance.now() - start
      this.recordCustomEvent(name, duration)
      return result
    }
  }

  public async measureAsyncTime<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now()
    try {
      const result = await fn()
      const duration = performance.now() - start
      this.recordCustomEvent(name, duration)
      return result
    } catch (error) {
      const duration = performance.now() - start
      this.recordCustomEvent(`${name}-error`, duration)
      throw error
    }
  }

  public getPerformanceReport() {
    const metrics = this.getMetrics()
    const events = this.getEvents()
    
    // Calculate averages
    const eventTypes = events.reduce((acc, event) => {
      if (!acc[event.type]) {
        acc[event.type] = { count: 0, total: 0, average: 0 }
      }
      acc[event.type].count++
      acc[event.type].total += event.value
      acc[event.type].average = acc[event.type].total / acc[event.type].count
      return acc
    }, {} as Record<string, { count: number; total: number; average: number }>)

    return {
      metrics,
      eventSummary: eventTypes,
      totalEvents: events.length,
      timestamp: Date.now()
    }
  }

  private sendToAnalytics(eventType: string, data: any) {
    // In a real app, you would send this to your analytics service
    // For now, we'll just log it
    if (process.env.NODE_ENV === 'production') {
      // Example: send to Google Analytics, Sentry, or custom endpoint
      console.log('Analytics Event:', { eventType, data, timestamp: Date.now() })
    }
  }

  public destroy() {
    // Clean up observers
    this.observers.forEach((observer) => {
      observer.disconnect()
    })
    this.observers.clear()
    
    // Clear data
    this.metrics = null
    this.events = []
    this.isInitialized = false
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Export convenience functions
export const measureTime = performanceMonitor.measureTime.bind(performanceMonitor)
export const measureAsyncTime = performanceMonitor.measureAsyncTime.bind(performanceMonitor)
export const recordCustomEvent = performanceMonitor.recordCustomEvent.bind(performanceMonitor)
export const getPerformanceReport = performanceMonitor.getPerformanceReport.bind(performanceMonitor)
