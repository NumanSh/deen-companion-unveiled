import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Activity, 
  Clock, 
  Zap, 
  AlertTriangle, 
  RefreshCw, 
  Download,
  Eye,
  BarChart3
} from 'lucide-react'
import { 
  performanceMonitor, 
  getPerformanceReport,
  type PerformanceMetrics,
  type PerformanceEvent 
} from '@/services/performanceMonitoring'

interface PerformanceDashboardProps {
  isVisible?: boolean
  onClose?: () => void
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ 
  isVisible = false, 
  onClose 
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [events, setEvents] = useState<PerformanceEvent[]>([])
  const [report, setReport] = useState<any>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    const updateMetrics = () => {
      setMetrics(performanceMonitor.getMetrics())
      setEvents(performanceMonitor.getEvents())
      setReport(getPerformanceReport())
    }

    // Initial update
    updateMetrics()

    // Update every 2 seconds
    const interval = setInterval(updateMetrics, 2000)

    return () => clearInterval(interval)
  }, [isVisible])

  const getWebVitalStatus = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'good'
    if (value <= thresholds.poor) return 'needs-improvement'
    return 'poor'
  }

  const getWebVitalColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500'
      case 'needs-improvement': return 'bg-yellow-500'
      case 'poor': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Performance Monitor
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <Eye className="w-4 h-4" /> : <BarChart3 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMetrics(performanceMonitor.getMetrics())
                  setEvents(performanceMonitor.getEvents())
                  setReport(getPerformanceReport())
                }}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  ×
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Web Vitals */}
          {metrics && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Core Web Vitals
              </h4>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span>LCP</span>
                    <Badge 
                      variant="secondary" 
                      className={`text-white ${getWebVitalColor(
                        getWebVitalStatus(metrics.LCP, { good: 2500, poor: 4000 })
                      )}`}
                    >
                      {formatTime(metrics.LCP)}
                    </Badge>
                  </div>
                  <Progress 
                    value={Math.min((metrics.LCP / 4000) * 100, 100)} 
                    className="h-1"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span>FID</span>
                    <Badge 
                      variant="secondary" 
                      className={`text-white ${getWebVitalColor(
                        getWebVitalStatus(metrics.FID, { good: 100, poor: 300 })
                      )}`}
                    >
                      {formatTime(metrics.FID)}
                    </Badge>
                  </div>
                  <Progress 
                    value={Math.min((metrics.FID / 300) * 100, 100)} 
                    className="h-1"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span>CLS</span>
                    <Badge 
                      variant="secondary" 
                      className={`text-white ${getWebVitalColor(
                        getWebVitalStatus(metrics.CLS, { good: 0.1, poor: 0.25 })
                      )}`}
                    >
                      {metrics.CLS.toFixed(3)}
                    </Badge>
                  </div>
                  <Progress 
                    value={Math.min((metrics.CLS / 0.25) * 100, 100)} 
                    className="h-1"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span>FCP</span>
                    <Badge 
                      variant="secondary" 
                      className={`text-white ${getWebVitalColor(
                        getWebVitalStatus(metrics.FCP, { good: 1800, poor: 3000 })
                      )}`}
                    >
                      {formatTime(metrics.FCP)}
                    </Badge>
                  </div>
                  <Progress 
                    value={Math.min((metrics.FCP / 3000) * 100, 100)} 
                    className="h-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Event Summary */}
          {report && isExpanded && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Performance Events
              </h4>
              
              <div className="space-y-2 text-xs">
                {Object.entries(report.eventSummary).map(([type, data]: [string, any]) => (
                  <div key={type} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="capitalize">{type}</span>
                    <div className="flex items-center gap-2">
                      <span>{data.count} events</span>
                      <Badge variant="outline">
                        {formatTime(data.average)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Events */}
              {events.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-medium text-xs">Recent Events</h5>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {events.slice(-5).reverse().map((event, index) => (
                      <div key={index} className="text-xs p-1 bg-gray-50 rounded">
                        <div className="flex items-center justify-between">
                          <span className="truncate">{event.name}</span>
                          <span>{formatTime(event.value)}</span>
                        </div>
                        <div className="text-gray-500 text-xs">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center p-2 bg-blue-50 rounded">
              <div className="font-semibold">{events.length}</div>
              <div className="text-gray-600">Events</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="font-semibold">
                {metrics ? formatTime(metrics.TTFB) : 'N/A'}
              </div>
              <div className="text-gray-600">TTFB</div>
            </div>
          </div>

          {/* Warnings */}
          {metrics && (
            <div className="space-y-1">
              {metrics.LCP > 4000 && (
                <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                  <AlertTriangle className="w-3 h-3" />
                  LCP is too slow
                </div>
              )}
              {metrics.FID > 300 && (
                <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                  <AlertTriangle className="w-3 h-3" />
                  FID is too high
                </div>
              )}
              {metrics.CLS > 0.25 && (
                <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                  <AlertTriangle className="w-3 h-3" />
                  CLS needs improvement
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PerformanceDashboard
