import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3,
  Clock,
  Star,
  Plus,
  X,
  Save,
  Globe,
  CheckCircle,
  Briefcase
} from 'lucide-react'

const Profile = () => {
  const { userId } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [skillForm, setSkillForm] = useState({ name: '', proficiency: 'intermediate', years: '' })
  const [editForm, setEditForm] = useState({})
  
  // Mock data - would come from API based on userId
  const isOwnProfile = !userId || userId === 'me'
  
  const userInfo = {
    id: 1,
    name: 'Wang Student',
    email: 'wang@student.edu.cn',
    phone: '138****5678',
    location: 'CS Building, Beijing',
    timezone: 'UTC+8',
    bio: 'Full-stack developer with 3 years of experience. Passionate about web development and teaching programming. Always happy to help others learn!',
    avatar: 'W',
    memberSince: '2023-05',
    rating: 4.9,
    reviewCount: 23,
    completedJobs: 45,
    successRate: 98
  }

  const skills = [
    { id: 1, name: 'JavaScript', proficiency: 'expert', years: 3 },
    { id: 2, name: 'React', proficiency: 'expert', years: 2 },
    { id: 3, name: 'Node.js', proficiency: 'advanced', years: 2 },
    { id: 4, name: 'Python', proficiency: 'intermediate', years: 1 },
    { id: 5, name: 'UI/UX Design', proficiency: 'intermediate', years: 2 }
  ]

  const recentReviews = [
    {
      id: 1,
      reviewer: { name: 'Li Student', avatar: 'L' },
      rating: 5,
      comment: 'Excellent developer! Delivered high-quality work on time. Highly recommend!',
      taskTitle: 'Website Development',
      date: '2024-01-18'
    },
    {
      id: 2,
      reviewer: { name: 'Chen Student', avatar: 'C' },
      rating: 5,
      comment: 'Very professional and responsive. Great communication throughout the project.',
      taskTitle: 'React App Development',
      date: '2024-01-15'
    },
    {
      id: 3,
      reviewer: { name: 'Zhao Student', avatar: 'Z' },
      rating: 4,
      comment: 'Good work overall. Met all requirements and delivered on time.',
      taskTitle: 'API Integration',
      date: '2024-01-10'
    }
  ]

  const completedTasks = [
    { id: 1, title: 'E-commerce Website', role: 'provider', amount: 80, completedAt: '2024-01-18', rating: 5 },
    { id: 2, title: 'Mobile App UI Design', role: 'provider', amount: 60, completedAt: '2024-01-15', rating: 5 },
    { id: 3, title: 'Database Optimization', role: 'provider', amount: 45, completedAt: '2024-01-10', rating: 4 }
  ]

  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case 'expert': return 'bg-green-100 text-green-800'
      case 'advanced': return 'bg-blue-100 text-blue-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAddSkill = () => {
    if (skillForm.name && skillForm.years) {
      console.log('Adding skill:', skillForm)
      setSkillForm({ name: '', proficiency: 'intermediate', years: '' })
      alert('Skill added!')
    }
  }

  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="card">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-3xl font-bold">{userInfo.avatar}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{userInfo.name}</h1>
                <CheckCircle className="w-6 h-6 text-blue-600" title="Verified User" />
              </div>
              <p className="text-gray-700 mb-3">{userInfo.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{userInfo.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>{userInfo.timezone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {userInfo.memberSince}</span>
                </div>
              </div>
            </div>
          </div>
          {isOwnProfile && (
            <button 
              onClick={() => setActiveTab('edit')}
              className="btn-secondary flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <p className="text-2xl font-bold text-gray-900">{userInfo.rating}</p>
            </div>
            <p className="text-sm text-gray-600">{userInfo.reviewCount} reviews</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{userInfo.completedJobs}</p>
            <p className="text-sm text-gray-600">Jobs Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{userInfo.successRate}%</p>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-campus-purple">{skills.length}</p>
            <p className="text-sm text-gray-600">Skills</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'reviews', label: `Reviews (${recentReviews.length})` },
          { id: 'portfolio', label: 'Portfolio' },
          ...(isOwnProfile ? [{ id: 'edit', label: 'Edit Profile' }] : [])
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skills */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <div key={skill.id} className="group">
                    <div className={`px-4 py-2 rounded-lg ${getProficiencyColor(skill.proficiency)} font-medium`}>
                      <div className="flex items-center space-x-2">
                        <span>{skill.name}</span>
                        <span className="text-xs opacity-75">{skill.years}y</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {recentReviews.slice(0, 3).map(review => (
                  <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">{review.reviewer.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{review.reviewer.name}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{review.comment}</p>
                    <p className="text-xs text-gray-500">Task: {review.taskTitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{userInfo.email}</span>
                </div>
                {isOwnProfile && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{userInfo.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Completed Tasks</h3>
              <div className="space-y-3">
                {completedTasks.slice(0, 3).map(task => (
                  <div key={task.id} className="text-sm">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-gray-900">{task.title}</p>
                      {renderStars(task.rating)}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{task.completedAt}</span>
                      <span className="font-medium text-campus-orange">{task.amount} TC</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">All Reviews</h3>
          <div className="space-y-6">
            {recentReviews.map(review => (
              <div key={review.id} className="pb-6 border-b last:border-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{review.reviewer.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.reviewer.name}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <p className="text-sm text-gray-500">Task: {review.taskTitle}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Completed Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedTasks.map(task => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{task.title}</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed: {task.completedAt}</p>
                    <p className="text-sm font-medium text-campus-orange">{task.amount} TC</p>
                  </div>
                  {renderStars(task.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'edit' && isOwnProfile && (
        <div className="space-y-6">
          {/* Edit Basic Info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  defaultValue={userInfo.bio}
                  className="input-field min-h-[100px]"
                  placeholder="Tell others about yourself..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input type="text" defaultValue={userInfo.location} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select defaultValue={userInfo.timezone} className="input-field">
                    <option value="UTC+8">UTC+8 (Beijing)</option>
                    <option value="UTC+0">UTC+0 (London)</option>
                    <option value="UTC-5">UTC-5 (New York)</option>
                  </select>
                </div>
              </div>
              <button className="btn-primary flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          {/* Skills Management */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Skills</h3>
            <div className="space-y-4 mb-6">
              {skills.map(skill => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{skill.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{skill.proficiency} · {skill.years} years</p>
                  </div>
                  <button 
                    onClick={() => console.log('Delete', skill.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Add New Skill</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({...skillForm, name: e.target.value})}
                  placeholder="Skill name"
                  className="input-field"
                />
                <select
                  value={skillForm.proficiency}
                  onChange={(e) => setSkillForm({...skillForm, proficiency: e.target.value})}
                  className="input-field"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                <input
                  type="number"
                  value={skillForm.years}
                  onChange={(e) => setSkillForm({...skillForm, years: e.target.value})}
                  placeholder="Years"
                  className="input-field"
                />
              </div>
              <button 
                onClick={handleAddSkill}
                className="btn-primary mt-3 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
