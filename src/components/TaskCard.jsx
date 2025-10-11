import React from 'react'
import { Clock, User, MapPin, DollarSign, Calendar, Users } from 'lucide-react'
import StatusBadge from './StatusBadge'

const TaskCard = ({ task, onViewDetails, onPropose, currentUserId }) => {
  const isOwner = task.requester_id === currentUserId
  const canPropose = !isOwner && task.status === 'open'

  const formatDeadline = (deadline) => {
    const date = new Date(deadline)
    const now = new Date()
    const diffInDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24))
    
    if (diffInDays < 0) return 'Expired'
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Tomorrow'
    return `${diffInDays} days left`
  }

  const getDeadlineColor = (deadline) => {
    const date = new Date(deadline)
    const now = new Date()
    const diffInDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24))
    
    if (diffInDays < 0) return 'text-red-600'
    if (diffInDays <= 1) return 'text-orange-600'
    if (diffInDays <= 3) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {task.title}
          </h3>
          <StatusBadge status={task.status} type="task" size="sm" />
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {task.description}
        </p>
      </div>

      {/* Skills */}
      {task.required_skills && task.required_skills.length > 0 && (
        <div className="px-4 py-2 border-b border-gray-100">
          <div className="flex flex-wrap gap-1">
            {task.required_skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Details */}
      <div className="p-4 space-y-3">
        {/* Budget */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Budget</span>
          </div>
          <span className="font-semibold text-green-600">
            {task.budget} Time Coins
          </span>
        </div>

        {/* Deadline */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Deadline</span>
          </div>
          <span className={`text-sm font-medium ${getDeadlineColor(task.deadline)}`}>
            {formatDeadline(task.deadline)}
          </span>
        </div>

        {/* Requester */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <User className="w-4 h-4" />
            <span className="text-sm">Posted by</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {task.requester_name?.charAt(0) || 'U'}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {task.requester_name || 'Anonymous'}
            </span>
          </div>
        </div>

        {/* Proposals Count */}
        {task.proposals_count > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">Proposals</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {task.proposals_count}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-2">
          <button
            onClick={() => onViewDetails(task.id)}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            View Details
          </button>
          
          {canPropose && (
            <button
              onClick={() => onPropose(task.id)}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Propose
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskCard
