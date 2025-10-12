import React, { useState } from 'react'
import { 
  Wallet as WalletIcon,
  TrendingUp,
  TrendingDown,
  Download,
  Plus,
  Clock,
  Lock,
  Unlock,
  RefreshCw,
  Calendar,
  FileText
} from 'lucide-react'

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [timeRange, setTimeRange] = useState('all')

  const walletBalance = {
    available: 150,
    escrowed: 45,
    total: 195,
    thisMonthEarned: 85,
    thisMonthSpent: 60
  }

  const transactions = [
    {
      id: 1,
      type: 'escrow_hold',
      amount: -48,
      balance: 150,
      description: 'Escrow for "Build a responsive website"',
      contractId: 101,
      timestamp: '2024-01-20 10:15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'release',
      amount: 48,
      balance: 198,
      description: 'Payment received for "Logo design"',
      contractId: 102,
      timestamp: '2024-01-19 16:30',
      status: 'completed'
    },
    {
      id: 3,
      type: 'service_exchange',
      amount: 32,
      balance: 170,
      description: 'Time exchange for "UX feedback session"',
      timestamp: '2024-01-18 12:00',
      status: 'completed'
    },
    {
      id: 4,
      type: 'escrow_hold',
      amount: -35,
      balance: 50,
      description: 'Escrow for "Python tutoring"',
      contractId: 103,
      timestamp: '2024-01-17 14:20',
      status: 'completed'
    },
    {
      id: 5,
      type: 'release',
      amount: 30,
      balance: 85,
      description: 'Payment received for "Data analysis"',
      contractId: 104,
      timestamp: '2024-01-16 11:45',
      status: 'completed'
    },
    {
      id: 6,
      type: 'refund',
      amount: 30,
      balance: 55,
      description: 'Refund for cancelled "Math tutoring"',
      contractId: 105,
      timestamp: '2024-01-15 16:00',
      status: 'completed'
    }
  ]

  const filteredTransactions = transactions.filter(tx => {
    if (activeTab === 'all') return true
    if (activeTab === 'income') return tx.amount > 0
    if (activeTab === 'expense') return tx.amount < 0
    return true
  })

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'escrow_hold':
        return <Lock className="w-5 h-5 text-yellow-600" />
      case 'release':
        return <Unlock className="w-5 h-5 text-green-600" />
      case 'service_exchange':
        return <Clock className="w-5 h-5 text-indigo-600" />
      case 'refund':
        return <RefreshCw className="w-5 h-5 text-blue-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'escrow_hold':
        return 'Escrow Hold'
      case 'release':
        return 'Payment Release'
      case 'service_exchange':
        return 'Time Exchange'
      case 'refund':
        return 'Refund'
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wallet & Transactions</h1>
          <p className="text-gray-600">Manage your Time Coins and view transaction history</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Funds</span>
          </button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance */}
        <div className="card bg-gradient-to-br from-campus-blue via-campus-purple to-campus-pink text-white col-span-1 md:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Balance</p>
              <p className="text-4xl font-bold mb-4">{walletBalance.total} TC</p>
              <div className="flex items-center space-x-6">
                <div>
                  <p className="text-xs text-blue-100">Available</p>
                  <p className="text-xl font-semibold">{walletBalance.available} TC</p>
                </div>
                <div>
                  <p className="text-xs text-blue-100">In Escrow</p>
                  <p className="text-xl font-semibold">{walletBalance.escrowed} TC</p>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <WalletIcon className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* This Month */}
        <div className="card space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">This Month Earned</p>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-2xl font-bold text-green-600">+{walletBalance.thisMonthEarned} TC</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">This Month Spent</p>
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <p className="text-2xl font-bold text-red-600">-{walletBalance.thisMonthSpent} TC</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <FileText className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-medium text-gray-900">Statements</p>
            <p className="text-xs text-gray-600 mt-1">Download reports</p>
          </button>
          <button className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <Lock className="w-6 h-6 text-orange-600 mb-2" />
            <p className="font-medium text-gray-900">Escrow</p>
            <p className="text-xs text-gray-600 mt-1">View locked funds</p>
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input-field text-sm"
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="week">This Week</option>
              <option value="today">Today</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4 w-fit">
          {['all', 'income', 'expense'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTransactions.map(tx => (
            <div 
              key={tx.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  {getTransactionIcon(tx.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-gray-900">{getTypeLabel(tx.type)}</p>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                      {tx.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{tx.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{tx.timestamp}</span>
                    {tx.contractId && (
                      <>
                        <span>•</span>
                        <span>Contract #{tx.contractId}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right flex-shrink-0 ml-4">
                <p className={`text-lg font-bold ${
                  tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} TC
                </p>
                <p className="text-xs text-gray-500">Balance: {tx.balance} TC</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredTransactions.length > 0 && (
          <div className="text-center mt-6">
            <button className="btn-secondary">
              Load More Transactions
            </button>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">About Time Coins</h4>
            <p className="text-sm text-blue-800">
              Time Coins (TC) are the currency used on our platform. 1 TC represents approximately 1 hour of work.
              When you create a contract, funds are held in escrow until the work is completed and approved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet
