import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  User,
  Star,
  Send,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MessageCircle,
  Eye,
  FileText
} from 'lucide-react'

const TaskDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [proposalForm, setProposalForm] = useState({
    estimatedHours: '',
    message: ''
  })

  // Mock data - would come from API
  const task = {
    id: 1,
    title: 'Build a responsive website',
    description: 'Need a modern, responsive website for my small business. Should include:\n\n- Home page with hero section\n- About us page\n- Services page with 6-8 service cards\n- Contact page with form and map\n- Mobile responsive design\n- Clean, modern UI\n- SEO optimized\n\nPlease provide examples of similar work in your proposal.',
    budget: 50,
    deadline: '2024-01-25',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    requester: {
      id: 101,
      name: 'Li Student',
      avatar: 'L',
      rating: 4.8,
      reviewCount: 12,
      location: 'CS Building',
      memberSince: '2023-05',
      completedTasks: 15
    },
    status: 'open',
    proposalCount: 5,
    createdAt: '2024-01-15',
    category: 'Programming',
    viewCount: 45
  }

  const proposals = [
    {
      id: 1,
      provider: {
        name: 'Wang Student',
        avatar: 'W',
        rating: 4.9,
        completedJobs: 23
      },
      estimatedHours: 40,
      message: 'I have 3 years of experience in web development. I can deliver a modern, responsive website using React and Tailwind CSS. Please check my portfolio.',
      submittedAt: '2024-01-16 10:30',
      status: 'pending'
    },
    {
      id: 2,
      provider: {
        name: 'Chen Student',
        avatar: 'C',
        rating: 4.7,
        completedJobs: 18
      },
      estimatedHours: 35,
      message: 'I specialize in responsive web design with React. I have built similar websites for small businesses. I can start immediately.',
      submittedAt: '2024-01-16 14:20',
      status: 'pending'
    },
    {
      id: 3,
      provider: {
        name: 'Zhao Student',
        avatar: 'Z',
        rating: 4.6,
        completedJobs: 15
      },
      estimatedHours: 45,
      message: 'Hello! I am a full-stack developer with experience in React, Node.js, and modern web technologies. I would love to work on your project.',
      submittedAt: '2024-01-16 16:45',
      status: 'pending'
    }
  ]

  const myProposal = null // null if user hasn't submitted, otherwise proposal object

  const isMyTask = false // Would check if current user is the requester

  const handleSubmitProposal = () => {
    if (!proposalForm.estimatedHours || !proposalForm.message) {
      alert('Please fill in all required fields')
      return
    }
    console.log('Submitting proposal:', proposalForm)
    alert('Proposal submitted successfully!')
  }

  const handleAcceptProposal = (proposalId) => {
    console.log('Accepting proposal:', proposalId)
    navigate(`/contracts/${proposalId}`)
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FileText },
    { id: 'proposals', name: `Proposals (${proposals.length})`, icon: Send },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'reviews', name: 'Reviews', icon: Star }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task Details</h1>
            <p className="text-gray-600">View complete information about this task</p>
          </div>
        </div>
        {isMyTask && (
          <div className="flex items-center space-x-2">
            <button className="btn-secondary flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Header Card */}
          <div className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Posted {task.createdAt}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{task.viewCount} views</span>
                  </span>
                </div>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {task.status}
              </span>
            </div>

            {/* Key Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-t border-b">
              <div>
                <p className="text-sm text-gray-500 mb-1">Budget</p>
                <p className="text-xl font-bold text-campus-orange">{task.budget} TC</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Deadline</p>
                <p className="text-lg font-semibold text-gray-900">{task.deadline}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Proposals</p>
                <p className="text-lg font-semibold text-gray-900">{task.proposalCount}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {task.skills.map(skill => (
                  <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-primary-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="card">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
                </div>

                {/* Submit Proposal (Provider View) */}
                {!isMyTask && !myProposal && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Submit Your Proposal</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estimated Hours (Optional)
                        </label>
                        <input
                          type="number"
                          value={proposalForm.estimatedHours}
                          onChange={(e) => setProposalForm({...proposalForm, estimatedHours: e.target.value})}
                          placeholder="e.g., 40"
                          className="input-field"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Estimated completion time, for reference only, does not affect payment
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cover Letter
                        </label>
                        <textarea
                          value={proposalForm.message}
                          onChange={(e) => setProposalForm({...proposalForm, message: e.target.value})}
                          placeholder="Explain why you're the best fit for this task..."
                          className="input-field min-h-[120px]"
                        />
                      </div>
                      <button 
                        onClick={handleSubmitProposal}
                        className="btn-primary w-full flex items-center justify-center space-x-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Proposal</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Already Submitted */}
                {!isMyTask && myProposal && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">You have submitted a proposal for this task</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'proposals' && (
              <div className="space-y-4">
                {isMyTask ? (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900">Received Proposals</h3>
                    {proposals.map(proposal => (
                      <div key={proposal.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">{proposal.provider.avatar}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{proposal.provider.name}</h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span>{proposal.provider.rating}</span>
                                <span>•</span>
                                <span>{proposal.provider.completedJobs} jobs</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{proposal.submittedAt}</span>
                        </div>

                        {proposal.estimatedHours && (
                          <div className="mb-3">
                            <div className="bg-gray-50 rounded p-3 inline-block">
                              <p className="text-xs text-gray-500">Estimated Hours</p>
                              <p className="text-lg font-semibold text-gray-900">{proposal.estimatedHours}h</p>
                            </div>
                          </div>
                        )}

                        <p className="text-gray-700 mb-4">{proposal.message}</p>

                        <div className="flex items-center space-x-2">
                          <button className="btn-secondary flex-1 flex items-center justify-center space-x-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>Message</span>
                          </button>
                          <button 
                            onClick={() => handleAcceptProposal(proposal.id)}
                            className="btn-primary flex-1 flex items-center justify-center space-x-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Accept</span>
                          </button>
                          <button className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg font-medium transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Send className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Proposals are only visible to the task requester</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Message threads will appear here</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Reviews will appear after task completion</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Requester Info */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">About the Requester</h3>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-medium">{task.requester.avatar}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{task.requester.name}</h4>
                <div className="flex items-center space-x-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{task.requester.rating}</span>
                  <span className="text-gray-500">({task.requester.reviewCount})</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Location</span>
                <span className="font-medium">{task.requester.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">{task.requester.memberSince}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tasks Posted</span>
                <span className="font-medium">{task.requester.completedTasks}</span>
              </div>
            </div>

            <Link 
              to={`/profile/${task.requester.id}`}
              className="btn-secondary w-full mt-4 flex items-center justify-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>View Profile</span>
            </Link>
          </div>

          {/* Action Button */}
          {!isMyTask && (
            <button className="btn-primary w-full flex items-center justify-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Submit Proposal</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskDetail

