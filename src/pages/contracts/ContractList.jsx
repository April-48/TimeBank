import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText,
  Clock,
  DollarSign,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Package,
  Filter
} from 'lucide-react'

const ContractList = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')

  const contracts = [
    {
      id: 1,
      taskTitle: 'Build a responsive website',
      partner: {
        name: 'Li Student',
        avatar: 'L'
      },
      myRole: 'provider',
      amount: 48,
      agreedHours: 40,
      status: 'active',
      paymentPhase: 'escrowed',
      createdAt: '2024-01-18',
      deadline: '2024-02-01',
      lastUpdate: '2024-01-19 10:30'
    },
    {
      id: 2,
      taskTitle: 'Logo design for startup',
      partner: {
        name: 'Wang Student',
        avatar: 'W'
      },
      myRole: 'requester',
      amount: 35,
      agreedHours: 20,
      status: 'delivered',
      paymentPhase: 'escrowed',
      createdAt: '2024-01-16',
      deadline: '2024-01-25',
      lastUpdate: '2024-01-20 15:45'
    },
    {
      id: 3,
      taskTitle: 'Python data analysis',
      partner: {
        name: 'Chen Student',
        avatar: 'C'
      },
      myRole: 'provider',
      amount: 38,
      agreedHours: 30,
      status: 'completed',
      paymentPhase: 'released',
      createdAt: '2024-01-10',
      deadline: '2024-01-20',
      completedAt: '2024-01-19',
      lastUpdate: '2024-01-19 18:00'
    },
    {
      id: 4,
      taskTitle: 'Content writing for blog',
      partner: {
        name: 'Zhao Student',
        avatar: 'Z'
      },
      myRole: 'requester',
      amount: 30,
      agreedHours: 25,
      status: 'draft',
      paymentPhase: 'unfunded',
      createdAt: '2024-01-20',
      deadline: '2024-02-05',
      lastUpdate: '2024-01-20 09:15'
    },
    {
      id: 5,
      taskTitle: 'Math tutoring sessions',
      partner: {
        name: 'Sun Student',
        avatar: 'S'
      },
      myRole: 'provider',
      amount: 25,
      agreedHours: 20,
      status: 'cancelled',
      paymentPhase: 'refunded',
      createdAt: '2024-01-12',
      deadline: '2024-01-30',
      cancelledAt: '2024-01-15',
      lastUpdate: '2024-01-15 14:20'
    }
  ]

  const filteredContracts = contracts.filter(contract => {
    const statusMatch = activeTab === 'all' || contract.status === activeTab
    const roleMatch = roleFilter === 'all' || contract.myRole === roleFilter
    return statusMatch && roleMatch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'delivered':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-purple-100 text-purple-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'disputed':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentPhaseColor = (phase) => {
    switch (phase) {
      case 'unfunded':
        return 'text-red-600'
      case 'escrowed':
        return 'text-yellow-600'
      case 'released':
        return 'text-green-600'
      case 'refunded':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Clock className="w-5 h-5 text-green-600" />
      case 'delivered':
        return <Package className="w-5 h-5 text-blue-600" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-purple-600" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'disputed':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const statuses = ['all', 'draft', 'active', 'delivered', 'completed', 'cancelled', 'disputed']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contracts</h1>
          <p className="text-gray-600">Manage your active and completed contracts</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total</p>
              <p className="text-2xl font-bold text-gray-900">{contracts.length}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {contracts.filter(c => c.status === 'active').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Delivered</p>
              <p className="text-2xl font-bold text-blue-600">
                {contracts.filter(c => c.status === 'delivered').length}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Completed</p>
              <p className="text-2xl font-bold text-purple-600">
                {contracts.filter(c => c.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              My Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Roles</option>
              <option value="requester">As Requester</option>
              <option value="provider">As Provider</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              activeTab === status
                ? 'bg-campus-blue text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {status} ({contracts.filter(c => status === 'all' || c.status === status).length})
          </button>
        ))}
      </div>

      {/* Contracts List */}
      <div className="space-y-4">
        {filteredContracts.map(contract => (
          <Link 
            key={contract.id}
            to={`/contracts/${contract.id}`}
            className="card hover:shadow-lg transition-shadow block border-2 border-gray-200 hover:border-blue-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(contract.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{contract.taskTitle}</h3>
                  <p className="text-sm text-gray-500">
                    Created {contract.createdAt} • Last updated {contract.lastUpdate}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(contract.status)}`}>
                  {contract.status}
                </span>
                <span className={`text-xs font-medium capitalize ${getPaymentPhaseColor(contract.paymentPhase)}`}>
                  ● {contract.paymentPhase}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Partner</p>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{contract.partner.avatar}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{contract.partner.name}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">My Role</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{contract.myRole}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Amount</p>
                <p className="text-sm font-bold text-campus-orange">{contract.amount} TC</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Deadline</p>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{contract.deadline}</span>
                </div>
              </div>
            </div>

            {/* Action needed alerts */}
            {contract.status === 'draft' && contract.myRole === 'requester' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-yellow-800">
                  <AlertCircle className="w-4 h-4" />
                  <span>Action Required: Escrow payment to activate this contract</span>
                </div>
              </div>
            )}

            {contract.status === 'delivered' && contract.myRole === 'requester' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-blue-800">
                  <Package className="w-4 h-4" />
                  <span>Action Required: Review deliverables and release payment</span>
                </div>
              </div>
            )}

            {contract.status === 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>Completed on {contract.completedAt}</span>
                </div>
              </div>
            )}

            {contract.status === 'cancelled' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-red-800">
                  <XCircle className="w-4 h-4" />
                  <span>Cancelled on {contract.cancelledAt}</span>
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredContracts.length === 0 && (
        <div className="card text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
          <p className="text-gray-500 mb-6">
            {activeTab === 'all' 
              ? "You don't have any contracts yet"
              : `No ${activeTab} contracts found`
            }
          </p>
          <Link to="/tasks" className="btn-primary inline-flex items-center space-x-2">
            <span>Browse Tasks</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ContractList

