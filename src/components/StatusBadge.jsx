import React from 'react'

const StatusBadge = ({ status, type, size = 'sm' }) => {
  const getStatusConfig = (status, type) => {
    const configs = {
      // Task states: draft → open → contracted → completed/cancelled/expired
      task: {
        draft: { color: 'bg-gray-100 text-gray-800', label: 'Draft', icon: '📝' },
        open: { color: 'bg-green-100 text-green-800', label: 'Open', icon: '🟢' },
        contracted: { color: 'bg-blue-100 text-blue-800', label: 'Contracted', icon: '📋' },
        completed: { color: 'bg-emerald-100 text-emerald-800', label: 'Completed', icon: '✅' },
        cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled', icon: '❌' },
        expired: { color: 'bg-orange-100 text-orange-800', label: 'Expired', icon: '⏰' }
      },
      // Proposal states: submitted → shortlisted → accepted/rejected/withdrawn/expired
      proposal: {
        submitted: { color: 'bg-yellow-100 text-yellow-800', label: 'Submitted', icon: '📤' },
        shortlisted: { color: 'bg-purple-100 text-purple-800', label: 'Shortlisted', icon: '⭐' },
        accepted: { color: 'bg-green-100 text-green-800', label: 'Accepted', icon: '✅' },
        rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected', icon: '❌' },
        withdrawn: { color: 'bg-gray-100 text-gray-800', label: 'Withdrawn', icon: '↩️' },
        expired: { color: 'bg-orange-100 text-orange-800', label: 'Expired', icon: '⏰' }
      },
      // Contract states: draft → active → delivered → completed/cancelled/disputed
      contract: {
        draft: { color: 'bg-gray-100 text-gray-800', label: 'Draft', icon: '📝' },
        active: { color: 'bg-blue-100 text-blue-800', label: 'Active', icon: '🔄' },
        delivered: { color: 'bg-purple-100 text-purple-800', label: 'Delivered', icon: '📦' },
        completed: { color: 'bg-emerald-100 text-emerald-800', label: 'Completed', icon: '✅' },
        cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled', icon: '❌' },
        disputed: { color: 'bg-orange-100 text-orange-800', label: 'Disputed', icon: '⚠️' }
      },
      // Payment phases: unfunded → escrowed → released
      payment: {
        unfunded: { color: 'bg-gray-100 text-gray-800', label: 'Unfunded', icon: '💰' },
        escrowed: { color: 'bg-yellow-100 text-yellow-800', label: 'Escrowed', icon: '🔒' },
        released: { color: 'bg-green-100 text-green-800', label: 'Released', icon: '✅' }
      },
      // Transaction states: pending/completed/failed/reversed
      transaction: {
        pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending', icon: '⏳' },
        completed: { color: 'bg-green-100 text-green-800', label: 'Completed', icon: '✅' },
        failed: { color: 'bg-red-100 text-red-800', label: 'Failed', icon: '❌' },
        reversed: { color: 'bg-orange-100 text-orange-800', label: 'Reversed', icon: '↩️' }
      },
      // Review states: pending → posted
      review: {
        pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending', icon: '⏳' },
        posted: { color: 'bg-green-100 text-green-800', label: 'Posted', icon: '✅' }
      }
    }

    return configs[type]?.[status] || { color: 'bg-gray-100 text-gray-800', label: status, icon: '❓' }
  }

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-2.5 text-lg'
  }

  const config = getStatusConfig(status, type)

  return (
    <span className={`
      inline-flex items-center space-x-1 rounded-full font-medium
      ${config.color} ${sizeClasses[size]}
      transition-all duration-200 hover:scale-105
    `}>
      <span className="text-xs">{config.icon}</span>
      <span>{config.label}</span>
    </span>
  )
}

export default StatusBadge
