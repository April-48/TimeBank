import React from 'react'
import { AlertCircle, RefreshCw, X } from 'lucide-react'

/**
 * ErrorAlert component
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @param {Function} [props.onRetry] - Optional retry callback
 * @param {Function} [props.onDismiss] - Optional dismiss callback
 * @param {string} [props.variant='error'] - 'error', 'warning', 'info'
 */
const ErrorAlert = ({ message, onRetry, onDismiss, variant = 'error' }) => {
  const variants = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: AlertCircle
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertCircle
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: AlertCircle
    }
  }

  const style = variants[variant]
  const Icon = style.icon

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-4`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <Icon className={`w-5 h-5 ${style.text} flex-shrink-0 mt-0.5`} />
          <div className="flex-1">
            <p className={`${style.text} text-sm`}>{message}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className={`${style.text} mt-2 text-sm font-medium hover:underline flex items-center space-x-1`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            )}
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`${style.text} hover:opacity-70 transition-opacity`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorAlert

