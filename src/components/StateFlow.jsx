import React from 'react'
import StatusBadge from './StatusBadge'

const StateFlow = ({ type, currentState, showFlow = true }) => {
  const getStateFlow = (type) => {
    const flows = {
      task: {
        states: ['draft', 'open', 'contracted', 'completed'],
        alternativeStates: ['cancelled', 'expired'],
        title: 'Task Flow'
      },
      proposal: {
        states: ['submitted', 'shortlisted', 'accepted'],
        alternativeStates: ['rejected', 'withdrawn', 'expired'],
        title: 'Proposal Flow'
      },
      contract: {
        states: ['draft', 'active', 'delivered', 'completed'],
        alternativeStates: ['cancelled', 'disputed'],
        title: 'Contract Flow'
      },
      payment: {
        states: ['unfunded', 'escrowed', 'released'],
        alternativeStates: [],
        title: 'Payment Flow'
      },
      transaction: {
        states: ['pending', 'completed'],
        alternativeStates: ['failed', 'reversed'],
        title: 'Transaction Flow'
      },
      review: {
        states: ['pending', 'posted'],
        alternativeStates: [],
        title: 'Review Flow'
      }
    }

    return flows[type] || { states: [], alternativeStates: [], title: 'Unknown Flow' }
  }

  const flow = getStateFlow(type)
  const currentIndex = flow.states.indexOf(currentState)

  if (!showFlow) {
    return <StatusBadge status={currentState} type={type} />
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">{flow.title}</h4>
      <div className="flex flex-wrap items-center gap-2">
        {flow.states.map((state, index) => {
          const isCurrent = state === currentState
          const isPast = currentIndex > index
          const isFuture = currentIndex < index

          return (
            <div key={state} className="flex items-center">
              <StatusBadge 
                status={state} 
                type={type}
                size={isCurrent ? 'md' : 'sm'}
              />
              {index < flow.states.length - 1 && (
                <div className={`mx-2 w-4 h-0.5 ${
                  isPast ? 'bg-green-300' : 'bg-gray-300'
                }`} />
              )}
            </div>
          )
        })}
        
        {flow.alternativeStates.length > 0 && (
          <div className="flex items-center space-x-2 ml-4">
            <span className="text-xs text-gray-500">or</span>
            {flow.alternativeStates.map((state) => (
              <StatusBadge 
                key={state}
                status={state} 
                type={type}
                size="sm"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StateFlow
