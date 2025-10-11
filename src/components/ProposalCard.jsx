import React from 'react'
import { Clock, DollarSign, MessageSquare, Star, User, Calendar } from 'lucide-react'
import StatusBadge from './StatusBadge'

const ProposalCard = ({ proposal, onAccept, onReject, onShortlist, onViewProfile, isRequester = false }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 4.0) return 'text-yellow-600'
    if (rating >= 3.0) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {proposal.applicant_name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{proposal.applicant_name || 'Anonymous'}</h4>
              <p className="text-sm text-gray-500">{proposal.applicant_title || 'Freelancer'}</p>
            </div>
          </div>
          <StatusBadge status={proposal.status} type="proposal" size="sm" />
        </div>
      </div>

      {/* Proposal Details */}
      <div className="p-4 space-y-3">
        {/* Time & Cost */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Proposed Time</p>
              <p className="font-medium text-gray-900">{proposal.proposed_minutes} minutes</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Proposed Cost</p>
              <p className="font-medium text-gray-900">{proposal.proposed_timecoin} Time Coins</p>
            </div>
          </div>
        </div>

        {/* Message */}
        {proposal.message && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
              <p className="text-sm text-gray-700">{proposal.message}</p>
            </div>
          </div>
        )}

        {/* Applicant Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <div>
              <p className="text-xs text-gray-500">Rating</p>
              <p className={`font-medium ${getRatingColor(proposal.applicant_rating)}`}>
                {proposal.applicant_rating || 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Completed Tasks</p>
              <p className="font-medium text-gray-900">{proposal.applicant_completed_tasks || 0}</p>
            </div>
          </div>
        </div>

        {/* Submitted Time */}
        <div className="flex items-center space-x-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Submitted {formatTime(proposal.created_at)}</span>
        </div>

        {/* Actions for Requester */}
        {isRequester && proposal.status === 'submitted' && (
          <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
            <button
              onClick={() => onViewProfile(proposal.applicant_id)}
              className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              View Profile
            </button>
            <button
              onClick={() => onShortlist(proposal.id)}
              className="flex-1 bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors"
            >
              Shortlist
            </button>
            <button
              onClick={() => onAccept(proposal.id)}
              className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => onReject(proposal.id)}
              className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Reject
            </button>
          </div>
        )}

        {/* Actions for Applicant */}
        {!isRequester && proposal.status === 'submitted' && (
          <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
            <button
              onClick={() => {/* Edit proposal */}}
              className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => {/* Withdraw proposal */}}
              className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Withdraw
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProposalCard
