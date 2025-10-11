import React from 'react'
import { StatusColors, StatusLabels } from '../../lib/constants'

/**
 * StatusBadge component
 * Displays status with consistent styling
 * @param {Object} props
 * @param {string} props.status - Status value (must exist in StatusColors/StatusLabels)
 * @param {string} [props.size='md'] - Size: 'sm', 'md', 'lg'
 * @param {boolean} [props.capitalize=true] - Whether to capitalize label
 */
const StatusBadge = ({ status, size = 'md', capitalize = true }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  }

  const colorClass = StatusColors[status] || 'bg-gray-100 text-gray-800'
  const label = StatusLabels[status] || status
  
  return (
    <span className={`${colorClass} ${sizeClasses[size]} rounded-full font-medium ${capitalize ? 'capitalize' : ''}`}>
      {label}
    </span>
  )
}

export default StatusBadge

