import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Send,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  MessageCircle,
  Calendar,
  DollarSign
} from 'lucide-react'

const ProposalList = () => {
  const [activeTab, setActiveTab] = useState('pending')

  const proposals = [
    {
      id: 1,
      task: {
        id: 101,
        title: 'Build a responsive website',
        budget: 50
      },
      estimatedHours: 40,
      bidAmount: 48,
      message: 'I have 3 years of experience in web development...',
      status: 'pending',
      submittedAt: '2024-01-16 10:30',
      requester: {
        name: 'Li Student',
        avatar: 'L'
      }
    },
    {
      id: 2,
      task: {
        id: 102,
        title: 'Python data analysis project',
        budget: 40
      },
      estimatedHours: 30,
      bidAmount: 38,
      message: 'I specialize in data analysis with Python...',
      status: 'pending',
      submittedAt: '2024-01-17 14:20',
      requester: {
        name: 'Wang Student',
        avatar: 'W'
      }
    },
    {
      id: 3,
      task: {
        id: 103,
        title: 'Logo design for startup',
        budget: 35
      },
      estimatedHours: 20,
      bidAmount: 35,
      message: 'I am a creative designer with portfolio...',
      status: 'accepted',
      submittedAt: '2024-01-15 09:15',
      acceptedAt: '2024-01-18 16:30',
      requester: {
        name: 'Chen Student',
        avatar: 'C'
      }
    },
    {
      id: 4,
      task: {
        id: 104,
        title: 'Content writing for blog',
        budget: 30
      },
      estimatedHours: 25,
      bidAmount: 32,
      message: 'I have written numerous tech blogs...',
      status: 'rejected',
      submittedAt: '2024-01-14 11:00',
      rejectedAt: '2024-01-17 10:20',
      requester: {
        name: 'Zhao Student',
        avatar: 'Z'
      }
    }
  ]

  const filteredProposals = proposals.filter(p => {
    if (activeTab === 'all') return true
    return p.status === activeTab
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleWithdraw = (proposalId) => {
    if (confirm('Are you sure you want to withdraw this proposal?')) {
      console.log('Withdrawing proposal:', proposalId)
      alert('Proposal withdrawn')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
          <p className="text-gray-600">Track all your submitted proposals</p>
        </div>
        <Link to="/tasks" className="btn-primary">
          Browse Tasks
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total</p>
              <p className="text-2xl font-bold text-gray-900">{proposals.length}</p>
            </div>
            <Send className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {proposals.filter(p => p.status === 'pending').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Accepted</p>
              <p className="text-2xl font-bold text-green-600">
                {proposals.filter(p => p.status === 'accepted').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {proposals.filter(p => p.status === 'rejected').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['all', 'pending', 'accepted', 'rejected'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab} ({proposals.filter(p => tab === 'all' || p.status === tab).length})
          </button>
        ))}
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.map(proposal => (
          <div key={proposal.id} className={`card border-2 ${getStatusColor(proposal.status)}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(proposal.status)}
                <div>
                  <Link 
                    to={`/tasks/${proposal.task.id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-campus-blue transition-colors"
                  >
                    {proposal.task.title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    Submitted {proposal.submittedAt}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(proposal.status)}`}>
                {proposal.status}
              </span>
            </div>

            {/* Proposal Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Task Budget</p>
                <p className="text-lg font-semibold text-gray-900">{proposal.task.budget} TC</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Your Bid</p>
                <p className="text-lg font-semibold text-campus-orange">{proposal.bidAmount} TC</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Est. Hours</p>
                <p className="text-lg font-semibold text-gray-900">{proposal.estimatedHours}h</p>
              </div>
            </div>

            {/* Message Preview */}
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700 line-clamp-2">{proposal.message}</p>
            </div>

            {/* Requester Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{proposal.requester.avatar}</span>
                </div>
                <span className="text-sm text-gray-700">Requester: {proposal.requester.name}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {proposal.status === 'pending' && (
                  <>
                    <button className="btn-secondary flex items-center space-x-2 text-sm">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button 
                      onClick={() => handleWithdraw(proposal.id)}
                      className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Withdraw</span>
                    </button>
                  </>
                )}
                {proposal.status === 'accepted' && (
                  <Link 
                    to={`/contracts/${proposal.id}`}
                    className="btn-primary flex items-center space-x-2 text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>View Contract</span>
                  </Link>
                )}
                <button className="btn-secondary flex items-center space-x-2 text-sm">
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </button>
              </div>
            </div>

            {/* Accepted/Rejected Info */}
            {proposal.acceptedAt && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✓ Accepted on {proposal.acceptedAt}. Contract has been created.
                </p>
              </div>
            )}
            {proposal.rejectedAt && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  ✗ Rejected on {proposal.rejectedAt}. The requester chose another provider.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProposals.length === 0 && (
        <div className="card text-center py-12">
          <Send className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals yet</h3>
          <p className="text-gray-500 mb-6">
            {activeTab === 'pending' && "You don't have any pending proposals"}
            {activeTab === 'accepted' && "You don't have any accepted proposals"}
            {activeTab === 'rejected' && "You don't have any rejected proposals"}
            {activeTab === 'all' && "Start by browsing available tasks"}
          </p>
          <Link to="/tasks" className="btn-primary inline-flex items-center space-x-2">
            <span>Browse Tasks</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProposalList

