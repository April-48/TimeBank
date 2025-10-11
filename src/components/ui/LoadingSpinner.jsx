import React from 'react'
import { Loader2 } from 'lucide-react'

/**
 * LoadingSpinner component
 * @param {Object} props
 * @param {string} [props.size='md'] - Size: 'sm', 'md', 'lg'
 * @param {string} [props.text] - Optional loading text
 * @param {boolean} [props.fullScreen] - Show in center of screen
 */
const LoadingSpinner = ({ size = 'md', text, fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-12 h-12'
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-campus-blue`} />
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {spinner}
      </div>
    )
  }

  return spinner
}

export default LoadingSpinner

