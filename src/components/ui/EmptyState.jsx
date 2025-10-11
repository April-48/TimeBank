import React from 'react'
import { Link } from 'react-router-dom'

/**
 * EmptyState component
 * @param {Object} props
 * @param {React.ComponentType} props.icon - Lucide icon component
 * @param {string} props.title - Main title
 * @param {string} props.description - Description text
 * @param {Object} [props.action] - Optional action button
 * @param {string} props.action.label - Button label
 * @param {string} [props.action.to] - Link destination
 * @param {Function} [props.action.onClick] - Click handler
 */
const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="card text-center py-12">
      {Icon && <Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        action.to ? (
          <Link to={action.to} className="btn-primary inline-flex items-center space-x-2">
            <span>{action.label}</span>
          </Link>
        ) : (
          <button onClick={action.onClick} className="btn-primary inline-flex items-center space-x-2">
            <span>{action.label}</span>
          </button>
        )
      )}
    </div>
  )
}

export default EmptyState

