import React, { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X, Loader2 } from 'lucide-react'
import { toast } from '../../lib/toast'

const Toast = () => {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const unsubscribe = toast.subscribe(setToasts)
    return unsubscribe
  }, [])

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />
      case 'loading':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
      default:
        return null
    }
  }

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'loading':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${getStyles(t.type)} border rounded-lg shadow-lg p-4 animate-fade-in-up`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {getIcon(t.type)}
              <p className="text-sm font-medium flex-1">{t.message}</p>
            </div>
            {t.type !== 'loading' && (
              <button
                onClick={() => toast.remove(t.id)}
                className="text-current opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Toast

