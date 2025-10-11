import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Inbox,
  Star,
  MessageCircle,
  CheckCircle,
  XCircle,
  User,
  Clock,
  DollarSign,
  AlertCircle,
  Filter,
  ArrowUpDown
} from 'lucide-react'

const ProposalInbox = () => {
  const [selectedTask, setSelectedTask] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const myTasks = [
    { id: 1, title: 'Build a responsive website', proposalCount: 5, status: 'open' },
    { id: 2, title: 'Logo design for startup', proposalCount: 8, status: 'open' },
    { id: 3, title: 'Python data analysis', proposalCount: 3, status: 'contracted' }
  ]

  const proposals = [
    {
      id: 1,
      taskId: 1,
      taskTitle: 'Build a responsive website',
      provider: {
        id: 201,
        name: 'Wang Student',
        avatar: 'W',
        rating: 4.9,
        completedJobs: 23,
        successRate: 98,
        location: 'CS Building'
      },
      estimatedHours: 40,
      bidAmount: 48,
      message: 'I have 3 years of experience in web development using React and modern frameworks. I\'ve built 15+ similar websites. Check my portfolio for examples. I can start immediately and deliver within 2 weeks.',
      submittedAt: '2024-01-16 10:30',
      status: 'pending'
    },
    {
      id: 2,
      taskId: 1,
      taskTitle: 'Build a responsive website',
      provider: {
        id: 202,
        name: 'Chen Student',
        avatar: 'C',
        rating: 4.7,
        completedJobs: 18,
        successRate: 95,
        location: 'Design Building'
      },
      estimatedHours: 35,
      bidAmount: 45,
      message: 'I specialize in responsive web design with React and Tailwind CSS. I focus on clean code and pixel-perfect designs. Available to start next week.',
      submittedAt: '2024-01-16 14:20',
      status: 'pending'
    },
    {
      id: 3,
      taskId: 2,
      taskTitle: 'Logo design for startup',
      provider: {
        id: 203,
        name: 'Zhao Student',
        avatar: 'Z',
        rating: 4.8,
        completedJobs: 30,
        successRate: 97,
        location: 'Art Building'
      },
      estimatedHours: 20,
      bidAmount: 35,
      message: 'Professional graphic designer with 4 years experience. I will provide 3 initial concepts and unlimited revisions. Portfolio attached.',
      submittedAt: '2024-01-17 09:15',
      status: 'pending'
    }
  ]

  const filteredProposals = proposals.filter(p => 
    selectedTask === 'all' || p.taskId === parseInt(selectedTask)
  )

  const handleAccept = (proposalId) => {
    console.log('Accepting proposal:', proposalId)
    alert('Contract created! Redirecting to contract page...')
  }

  const handleReject = (proposalId) => {
    if (confirm('Are you sure you want to reject this proposal?')) {
      console.log('Rejecting proposal:', proposalId)
      alert('Proposal rejected')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proposal Inbox</h1>
          <p className="text-gray-600">Review and manage proposals for your tasks</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Proposals</p>
              <p className="text-2xl font-bold text-gray-900">{proposals.length}</p>
            </div>
            <Inbox className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending Review</p>
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
              <p className="text-sm text-gray-500 mb-1">Active Tasks</p>
              <p className="text-2xl font-bold text-green-600">
                {myTasks.filter(t => t.status === 'open').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Task
            </label>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="input-field"
            >
              <option value="all">All Tasks</option>
              {myTasks.map(task => (
                <option key={task.id} value={task.id}>
                  {task.title} ({task.proposalCount})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="date">Latest First</option>
              <option value="rating">Highest Rating</option>
              <option value="bid-low">Lowest Bid</option>
              <option value="bid-high">Highest Bid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-6">
        {filteredProposals.map(proposal => (
          <div key={proposal.id} className="card border-2 border-gray-200 hover:border-blue-300 transition-colors">
            {/* Task Title */}
            <div className="mb-4">
              <Link 
                to={`/tasks/${proposal.taskId}`}
                className="text-lg font-semibold text-gray-900 hover:text-campus-blue transition-colors"
              >
                {proposal.taskTitle}
              </Link>
              <p className="text-sm text-gray-500">Received {proposal.submittedAt}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Provider Info */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-4 h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{proposal.provider.avatar}</span>
                    </div>
                    <div>
                      <Link 
                        to={`/profile/${proposal.provider.id}`}
                        className="font-semibold text-gray-900 hover:text-campus-blue transition-colors"
                      >
                        {proposal.provider.name}
                      </Link>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{proposal.provider.rating}</span>
                        <span className="text-xs text-gray-500">({proposal.provider.completedJobs})</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-medium text-green-600">{proposal.provider.successRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-medium">{proposal.provider.completedJobs} jobs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium">{proposal.provider.location}</span>
                    </div>
                  </div>

                  <Link 
                    to={`/profile/${proposal.provider.id}`}
                    className="btn-secondary w-full mt-4 flex items-center justify-center space-x-2 text-sm"
                  >
                    <User className="w-4 h-4" />
                    <span>View Profile</span>
                  </Link>
                </div>
              </div>

              {/* Proposal Details */}
              <div className="lg:col-span-2">
                {/* Bid Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-campus-orange" />
                      <span className="text-sm text-gray-600">Bid Amount</span>
                    </div>
                    <p className="text-2xl font-bold text-campus-orange">{proposal.bidAmount} TC</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Estimated Time</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{proposal.estimatedHours}h</p>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Cover Letter</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{proposal.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => handleAccept(proposal.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Accept & Create Contract</span>
                  </button>
                  <button 
                    onClick={() => handleReject(proposal.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 font-medium px-4 py-3 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>Reject</span>
                  </button>
                  <Link
                    to={`/messages?task=${proposal.taskId}&user=${proposal.provider.id}`}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-4 py-3 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Message</span>
                  </Link>
                </div>

                {/* Warning for contracted tasks */}
                {myTasks.find(t => t.id === proposal.taskId)?.status === 'contracted' && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-sm text-yellow-800">
                      <AlertCircle className="w-4 h-4" />
                      <span>This task already has an active contract. You cannot accept more proposals.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProposals.length === 0 && (
        <div className="card text-center py-12">
          <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals yet</h3>
          <p className="text-gray-500 mb-6">
            {selectedTask === 'all' 
              ? "You haven't received any proposals yet. Post a task to get started!"
              : "No proposals for this task yet. Providers will submit proposals soon."
            }
          </p>
          <Link to="/tasks/new" className="btn-primary inline-flex items-center space-x-2">
            <span>Post a Task</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProposalInbox

