import React from 'react'
import { Clock, DollarSign, User, FileText, Shield, CheckCircle } from 'lucide-react'
import StatusBadge from './StatusBadge'

const ContractCard = ({ contract, onEscrow, onRelease, onDeliver, onDispute, currentUserId }) => {
  const isRequester = contract.requester_id === currentUserId
  const isProvider = contract.provider_id === currentUserId

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPaymentPhaseColor = (phase) => {
    switch (phase) {
      case 'unfunded': return 'text-gray-600'
      case 'escrowed': return 'text-yellow-600'
      case 'released': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getPaymentPhaseIcon = (phase) => {
    switch (phase) {
      case 'unfunded': return '💰'
      case 'escrowed': return '🔒'
      case 'released': return '✅'
      default: return '💰'
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{contract.task_title}</h3>
          <StatusBadge status={contract.status} type="contract" size="sm" />
        </div>
        <p className="text-sm text-gray-600">Contract #{contract.id}</p>
      </div>

      {/* Contract Details */}
      <div className="p-4 space-y-4">
        {/* Parties */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {contract.requester_name?.charAt(0) || 'R'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Requester</p>
              <p className="text-xs text-gray-500">{contract.requester_name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {contract.provider_name?.charAt(0) || 'P'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Provider</p>
              <p className="text-xs text-gray-500">{contract.provider_name}</p>
            </div>
          </div>
        </div>

        {/* Agreement Details */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Agreed Time</p>
                <p className="font-medium text-gray-900">{contract.agreed_minutes} minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Agreed Cost</p>
                <p className="font-medium text-gray-900">{contract.agreed_timecoin} Time Coins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">Payment Status</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm">{getPaymentPhaseIcon(contract.payment_phase)}</span>
              <span className={`text-sm font-medium ${getPaymentPhaseColor(contract.payment_phase)}`}>
                {contract.payment_phase.charAt(0).toUpperCase() + contract.payment_phase.slice(1)}
              </span>
            </div>
          </div>
          
          {/* Payment Progress */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              contract.payment_phase === 'unfunded' ? 'bg-gray-400' : 'bg-green-500'
            }`} />
            <span className="text-xs text-gray-500">Funded</span>
            
            <div className="flex-1 h-0.5 bg-gray-200 mx-2">
              <div className={`h-full ${
                contract.payment_phase === 'released' ? 'bg-green-500' : 'bg-gray-200'
              }`} style={{ width: contract.payment_phase === 'released' ? '100%' : '50%' }} />
            </div>
            
            <div className={`w-3 h-3 rounded-full ${
              contract.payment_phase === 'released' ? 'bg-green-500' : 'bg-gray-400'
            }`} />
            <span className="text-xs text-gray-500">Released</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span>Contract created {formatTime(contract.created_at)}</span>
          </div>
          
          {contract.payment_phase !== 'unfunded' && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Payment escrowed {formatTime(contract.escrowed_at)}</span>
            </div>
          )}
          
          {contract.payment_phase === 'released' && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4" />
              <span>Payment released {formatTime(contract.released_at)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
          {isRequester && contract.payment_phase === 'unfunded' && (
            <button
              onClick={() => onEscrow(contract.id)}
              className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
            >
              Escrow Payment
            </button>
          )}
          
          {isRequester && contract.payment_phase === 'escrowed' && contract.status === 'delivered' && (
            <button
              onClick={() => onRelease(contract.id)}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Release Payment
            </button>
          )}
          
          {isProvider && contract.payment_phase === 'escrowed' && contract.status === 'active' && (
            <button
              onClick={() => onDeliver(contract.id)}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Mark as Delivered
            </button>
          )}
          
          {(isRequester || isProvider) && contract.status === 'active' && (
            <button
              onClick={() => onDispute(contract.id)}
              className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Dispute
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContractCard
