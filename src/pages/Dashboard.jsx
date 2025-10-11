import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { 
  Plus,
  Clock,
  FileText,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageCircle,
  Star,
  TrendingUp,
  Calendar,
  ArrowRight,
  DollarSign
} from 'lucide-react'
import api from '../lib/api'
import { QueryKeys } from '../lib/constants'
import { formatTimecoin, getErrorMessage } from '../lib/utils'

const Dashboard = () => {
  // Fetch dashboard data
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: QueryKeys.dashboard(),
    queryFn: () => api.dashboard.get()
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card bg-red-50 border border-red-200">
        <div className="flex items-center space-x-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <span>Error loading dashboard: {getErrorMessage(error)}</span>
        </div>
      </div>
    )
  }

  const { stats, recentContracts } = dashboardData

  const pendingActions = [
    { 
      id: 1, 
      type: 'proposal', 
      title: 'New proposal for "Website Design"',
      time: '10 minutes ago',
      icon: Send,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    { 
      id: 2, 
      type: 'message', 
      title: 'Unread message from Li Student',
      time: '1 hour ago',
      icon: MessageCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    { 
      id: 3, 
      type: 'review', 
      title: 'Contract "Python Tutoring" needs review',
      time: '2 hours ago',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    { 
      id: 4, 
      type: 'payment', 
      title: 'Contract "Logo Design" awaiting escrow',
      time: '3 hours ago',
      icon: AlertCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'delivered':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening.</p>
        </div>
        <Link to="/tasks/new" className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Post New Task</span>
        </Link>
      </div>

      {/* Wallet Overview */}
      <div className="card bg-gradient-to-br from-campus-blue via-campus-purple to-campus-pink text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm mb-1">Total Balance</p>
            <p className="text-4xl font-bold mb-4">{formatTimecoin(stats.balance.totalBalance, false)} TC</p>
              <div className="flex items-center space-x-6">
                <div>
                  <p className="text-xs text-blue-100">Available</p>
                  <p className="text-xl font-semibold">{formatTimecoin(stats.balance.availableBalance, false)} TC</p>
                </div>
                <div>
                  <p className="text-xs text-blue-100">In Escrow</p>
                  <p className="text-xl font-semibold">{formatTimecoin(stats.balance.escrowedBalance, false)} TC</p>
                </div>
              </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Link to="/wallet" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors text-center">
              View Wallet
            </Link>
            <button className="bg-white text-campus-blue hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors">
              Add Funds
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* My Tasks */}
        <div className="card">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-campus-blue" />
            </div>
            <Link to="/tasks?filter=mine" className="text-sm text-campus-blue hover:underline">View All</Link>
          </div>
          <h3 className="font-semibold text-gray-900 mb-3">My Tasks</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Draft</span>
              <span className="font-medium">{stats.myTasks.draft}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Open</span>
              <span className="font-medium">{stats.myTasks.open}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Contracted</span>
              <span className="font-medium">{stats.myTasks.contracted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Needs Review</span>
              <span className="font-medium text-orange-600">{stats.myTasks.needsReview}</span>
            </div>
          </div>
        </div>

        {/* My Proposals */}
        <div className="card">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-campus-green" />
            </div>
            <Link to="/proposals/mine" className="text-sm text-campus-blue hover:underline">View All</Link>
          </div>
          <h3 className="font-semibold text-gray-900 mb-3">My Proposals</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Pending</span>
              <span className="font-medium text-yellow-600">{stats.myProposals.pending}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Accepted</span>
              <span className="font-medium text-green-600">{stats.myProposals.accepted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rejected</span>
              <span className="font-medium">{stats.myProposals.rejected}</span>
            </div>
          </div>
        </div>

        {/* Contracts */}
        <div className="card">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-campus-purple" />
            </div>
            <Link to="/contracts" className="text-sm text-campus-blue hover:underline">View All</Link>
          </div>
          <h3 className="font-semibold text-gray-900 mb-3">Contracts</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Awaiting Escrow</span>
              <span className="font-medium text-orange-600">{stats.contracts.unfunded}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active</span>
              <span className="font-medium text-green-600">{stats.contracts.active}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivered</span>
              <span className="font-medium text-blue-600">{stats.contracts.delivered}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-gradient-to-br from-gray-50 to-blue-50">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/tasks/new" className="flex items-center justify-between p-2 bg-white rounded-lg hover:shadow-md transition-shadow">
              <span className="text-sm font-medium text-gray-700">Post Task</span>
              <Plus className="w-4 h-4 text-gray-400" />
            </Link>
            <Link to="/tasks" className="flex items-center justify-between p-2 bg-white rounded-lg hover:shadow-md transition-shadow">
              <span className="text-sm font-medium text-gray-700">Browse Tasks</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link to="/messages" className="flex items-center justify-between p-2 bg-white rounded-lg hover:shadow-md transition-shadow">
              <span className="text-sm font-medium text-gray-700">Messages</span>
              <MessageCircle className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Pending Actions</h3>
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
            {pendingActions.length} items
          </span>
        </div>
        <div className="space-y-3">
          {pendingActions.map(action => {
            const Icon = action.icon
            return (
              <div key={action.id} className={`${action.bgColor} rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${action.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{action.title}</p>
                    <p className="text-sm text-gray-500">{action.time}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Contracts */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Contracts</h3>
          <Link to="/contracts" className="text-sm text-campus-blue hover:underline flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentContracts.map(contract => (
            <Link 
              key={contract.id} 
              to={`/contracts/${contract.id}`}
              className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{contract.taskTitle}</h4>
                  <p className="text-sm text-gray-500">with {contract.partner}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                  {contract.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    Role: <span className="font-medium text-gray-900">{contract.role}</span>
                  </span>
                  <span className="text-gray-600">
                    Amount: <span className="font-medium text-campus-orange">{contract.amount} TC</span>
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{contract.deadline}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

