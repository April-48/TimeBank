import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { 
  Search, 
  Filter, 
  Plus,
  Clock,
  DollarSign,
  Calendar,
  User,
  MapPin,
  Tag,
  TrendingUp,
  AlertCircle,
  Loader2
} from 'lucide-react'
import api from '../../lib/api'
import { QueryKeys, TaskStatus, StatusColors } from '../../lib/constants'
import { formatTimecoin, formatDate, getDaysLeft, getErrorMessage } from '../../lib/utils'

const TaskList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [budgetRange, setBudgetRange] = useState([0, 200])
  const [activeTab, setActiveTab] = useState('all')
  const [hideLowPrice, setHideLowPrice] = useState(true) // Hide low-price tasks by default

  // Fetch tasks
  const { data: tasksResponse, isLoading, error } = useQuery({
    queryKey: QueryKeys.tasks({ 
      status: activeTab === 'all' ? undefined : activeTab,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sortBy 
    }),
    queryFn: () => api.tasks.list({ 
      status: activeTab === 'all' ? undefined : activeTab,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sortBy 
    })
  })

  const categories = [
    'All',
    'Programming',
    'Design',
    'Writing',
    'Marketing',
    'Translation',
    'Academic',
    'Other'
  ]

  const tasks = tasksResponse?.data || []

  // Filter low-price tasks
  const filteredTasks = hideLowPrice 
    ? tasks.filter(task => {
        // TODO: Calculate P25 threshold based on task category
        // Simplified version: assume tasks below 30 TC are low-price
        const lowPriceThreshold = 30
        return task.budget >= lowPriceThreshold
      })
    : tasks

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-campus-blue" />
          <span className="text-gray-600">Loading tasks...</span>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Browse Tasks</h1>
          <Link to="/tasks/new" className="btn-primary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Post Task</span>
          </Link>
        </div>
        <div className="card bg-red-50 border border-red-200">
          <div className="flex items-center space-x-2 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <span>Error loading tasks: {getErrorMessage(error)}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Browse Tasks</h1>
          <p className="text-gray-600">Find opportunities to earn Time Coins</p>
        </div>
        <Link to="/tasks/new" className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Post Task</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks, skills, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="latest">Latest First</option>
              <option value="budget-high">Highest Budget</option>
              <option value="budget-low">Lowest Budget</option>
              <option value="deadline">Deadline Soon</option>
            </select>

            {/* Low-price task filter */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hideLowPrice"
                checked={hideLowPrice}
                onChange={(e) => setHideLowPrice(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="hideLowPrice" className="text-sm text-gray-700">
                Hide low-price tasks (below 25th percentile)
              </label>
            </div>

            <button className="btn-secondary flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>

          {/* Budget Range */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Budget Range:</span>
            <input
              type="number"
              placeholder="Min"
              className="input-field w-24"
              value={budgetRange[0]}
              onChange={(e) => setBudgetRange([parseInt(e.target.value) || 0, budgetRange[1]])}
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              className="input-field w-24"
              value={budgetRange[1]}
              onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value) || 200])}
            />
            <span className="text-sm text-gray-600">TC</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All Tasks ({tasks.length})
        </button>
        <button
          onClick={() => setActiveTab('my-tasks')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'my-tasks'
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          My Tasks (3)
        </button>
      </div>

      {/* Tasks Grid */}
      <div className="space-y-4">
        {filteredTasks.map(task => {
          const daysLeft = getDaysLeft(task.deadline)
          return (
            <Link 
              key={task.id}
              to={`/tasks/${task.id}`}
              className="card hover:shadow-lg transition-shadow block"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-campus-blue transition-colors">
                      {task.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${StatusColors[task.status]}`}>
                      {task.status}
                    </span>
                    {!hideLowPrice && task.budget < 30 && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Below 25th percentile
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {task.skills.map(skill => (
                  <span key={skill} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Task Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Budget */}
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-campus-orange" />
                    <span className="text-sm font-medium text-campus-orange">{formatTimecoin(task.budget)}</span>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center space-x-2">
                    <Calendar className={`w-4 h-4 ${daysLeft <= 3 ? 'text-red-500' : 'text-gray-400'}`} />
                    <span className={`text-sm ${daysLeft <= 3 ? 'text-red-500 font-medium' : 'text-gray-600'}`}>
                      {daysLeft} days left
                    </span>
                  </div>

                  {/* Proposals */}
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{task.proposalCount} proposals</span>
                  </div>
                </div>

                {/* Requester Info */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{task.requester.avatar}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{task.requester.name}</p>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-gray-500">{task.requester.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="btn-secondary">
          Load More Tasks
        </button>
      </div>
    </div>
  )
}

export default TaskList

