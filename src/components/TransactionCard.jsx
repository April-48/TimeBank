import React from 'react'
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, DollarSign, Clock, AlertCircle } from 'lucide-react'
import StatusBadge from './StatusBadge'

const TransactionCard = ({ transaction, onViewDetails }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-5 h-5 text-green-500" />
      case 'withdrawal':
        return <ArrowUpRight className="w-5 h-5 text-red-500" />
      case 'escrow_hold':
        return <ArrowLeftRight className="w-5 h-5 text-yellow-500" />
      case 'release':
        return <ArrowDownLeft className="w-5 h-5 text-green-500" />
      case 'refund':
        return <ArrowUpRight className="w-5 h-5 text-blue-500" />
      case 'fee':
        return <DollarSign className="w-5 h-5 text-gray-500" />
      default:
        return <ArrowLeftRight className="w-5 h-5 text-gray-500" />
    }
  }

  const getTransactionColor = (type, amount) => {
    const isPositive = amount > 0
    
    switch (type) {
      case 'deposit':
      case 'release':
        return isPositive ? 'text-green-600' : 'text-gray-600'
      case 'withdrawal':
      case 'escrow_hold':
      case 'fee':
        return isPositive ? 'text-gray-600' : 'text-red-600'
      case 'refund':
        return isPositive ? 'text-blue-600' : 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const getTransactionDescription = (type, meta) => {
    switch (type) {
      case 'deposit':
        return `Deposit from ${meta?.source || 'external'}`
      case 'withdrawal':
        return `Withdrawal to ${meta?.destination || 'external'}`
      case 'escrow_hold':
        return `Escrow hold for Contract #${meta?.contract_id || 'N/A'}`
      case 'release':
        return `Payment release for Contract #${meta?.contract_id || 'N/A'}`
      case 'refund':
        return `Refund for Contract #${meta?.contract_id || 'N/A'}`
      case 'fee':
        return `Platform fee for ${meta?.service || 'service'}`
      default:
        return 'Transaction'
    }
  }

  const formatAmount = (amount) => {
    const isPositive = amount > 0
    return `${isPositive ? '+' : ''}${amount.toFixed(2)}`
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {getTransactionIcon(transaction.type)}
            <div>
              <h4 className="font-medium text-gray-900">
                {getTransactionDescription(transaction.type, transaction.meta)}
              </h4>
              <p className="text-sm text-gray-500">
                {formatTime(transaction.created_at)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${getTransactionColor(transaction.type, transaction.amount)}`}>
              {formatAmount(transaction.amount)} Time Coins
            </p>
            <StatusBadge status={transaction.status} type="transaction" size="xs" />
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-2">
          {transaction.meta && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {transaction.meta.contract_id && (
                  <div>
                    <p className="text-gray-500">Contract ID</p>
                    <p className="font-medium text-gray-900">#{transaction.meta.contract_id}</p>
                  </div>
                )}
                {transaction.meta.task_title && (
                  <div>
                    <p className="text-gray-500">Task</p>
                    <p className="font-medium text-gray-900 truncate">{transaction.meta.task_title}</p>
                  </div>
                )}
                {transaction.meta.fee_rate && (
                  <div>
                    <p className="text-gray-500">Fee Rate</p>
                    <p className="font-medium text-gray-900">{transaction.meta.fee_rate}%</p>
                  </div>
                )}
                {transaction.meta.transaction_hash && (
                  <div>
                    <p className="text-gray-500">Hash</p>
                    <p className="font-mono text-xs text-gray-900 truncate">
                      {transaction.meta.transaction_hash}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status-specific information */}
          {transaction.status === 'failed' && transaction.error_message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Transaction Failed</p>
                  <p className="text-sm text-red-600">{transaction.error_message}</p>
                </div>
              </div>
            </div>
          )}

          {transaction.status === 'pending' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-500" />
                <p className="text-sm text-yellow-700">
                  Transaction is being processed. This may take a few minutes.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
          <button
            onClick={() => onViewDetails(transaction.id)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View Details
          </button>
          
          {transaction.status === 'failed' && (
            <button className="text-sm text-red-600 hover:text-red-700 font-medium">
              Retry Transaction
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransactionCard
