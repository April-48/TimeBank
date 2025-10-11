import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Star,
  Send,
  TrendingUp,
  FileText,
  CheckCircle,
  User
} from 'lucide-react'

const Reviews = () => {
  const [activeTab, setActiveTab] = useState('pending')
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  })

  const pendingReviews = [
    {
      id: 1,
      contractId: 101,
      taskTitle: 'Build a responsive website',
      partner: {
        name: 'Li Student',
        avatar: 'L'
      },
      myRole: 'provider',
      completedAt: '2024-01-19',
      amount: 48
    },
    {
      id: 2,
      contractId: 102,
      taskTitle: 'Logo design for startup',
      partner: {
        name: 'Wang Student',
        avatar: 'W'
      },
      myRole: 'requester',
      completedAt: '2024-01-18',
      amount: 35
    }
  ]

  const givenReviews = [
    {
      id: 1,
      contractId: 103,
      taskTitle: 'Python data analysis',
      partner: {
        name: 'Chen Student',
        avatar: 'C'
      },
      myRole: 'requester',
      rating: 5,
      comment: 'Excellent work! Very professional and delivered on time. Highly recommend.',
      createdAt: '2024-01-16'
    },
    {
      id: 2,
      contractId: 104,
      taskTitle: 'Content writing',
      partner: {
        name: 'Zhao Student',
        avatar: 'Z'
      },
      myRole: 'provider',
      rating: 4,
      comment: 'Good collaboration. Clear communication and requirements.',
      createdAt: '2024-01-15'
    }
  ]

  const receivedReviews = [
    {
      id: 1,
      contractId: 103,
      taskTitle: 'Python data analysis',
      partner: {
        name: 'Chen Student',
        avatar: 'C'
      },
      myRole: 'provider',
      rating: 5,
      comment: 'Fast delivery and great quality. Would definitely work with again!',
      createdAt: '2024-01-16'
    },
    {
      id: 2,
      contractId: 105,
      taskTitle: 'Website redesign',
      partner: {
        name: 'Sun Student',
        avatar: 'S'
      },
      myRole: 'provider',
      rating: 5,
      comment: 'Amazing developer! Very responsive and professional.',
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      contractId: 106,
      taskTitle: 'Math tutoring',
      partner: {
        name: 'Zhou Student',
        avatar: 'Z'
      },
      myRole: 'provider',
      rating: 4,
      comment: 'Good tutor with solid knowledge. Helpful and patient.',
      createdAt: '2024-01-12'
    }
  ]

  const stats = {
    averageRating: 4.8,
    totalReviews: 15,
    fiveStars: 12,
    fourStars: 2,
    threeStars: 1,
    twoStars: 0,
    oneStars: 0
  }

  const handleSubmitReview = (contractId) => {
    console.log('Submitting review for contract', contractId, reviewForm)
    alert('Review submitted successfully!')
    setReviewForm({ rating: 5, comment: '' })
  }

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
            disabled={!interactive}
          >
            <Star 
              className={`w-5 h-5 ${
                star <= rating 
                  ? 'text-yellow-500 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600">Manage reviews and feedback</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Rating</p>
              <div className="flex items-center space-x-2">
                <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-400" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingReviews.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="card">
          <h4 className="text-xs text-gray-500 mb-2">Rating Distribution</h4>
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map(star => {
              const count = stats[`${['', '', 'one', 'two', 'three', 'four', 'five'][star]}Stars`]
              const percentage = (count / stats.totalReviews) * 100
              return (
                <div key={star} className="flex items-center space-x-2 text-xs">
                  <span className="w-2">{star}</span>
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-yellow-500 rounded-full h-1.5"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-600 w-6">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'pending', label: `Pending (${pendingReviews.length})` },
          { id: 'given', label: `Given (${givenReviews.length})` },
          { id: 'received', label: `Received (${receivedReviews.length})` }
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

      {/* Content */}
      <div className="space-y-4">
        {/* Pending Reviews */}
        {activeTab === 'pending' && (
          <>
            {pendingReviews.length === 0 ? (
              <div className="card text-center py-12">
                <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-500">No pending reviews at the moment</p>
              </div>
            ) : (
              pendingReviews.map(review => (
                <div key={review.id} className="card border-2 border-yellow-200 bg-yellow-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Link 
                        to={`/contracts/${review.contractId}`}
                        className="text-lg font-semibold text-gray-900 hover:text-campus-blue"
                      >
                        {review.taskTitle}
                      </Link>
                      <p className="text-sm text-gray-600">Completed on {review.completedAt}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Pending Review
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{review.partner.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{review.partner.name}</p>
                      <p className="text-sm text-gray-600 capitalize">
                        Your role: {review.myRole}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      {renderStars(
                        reviewForm.rating, 
                        true, 
                        (rating) => setReviewForm({...reviewForm, rating})
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                      </label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                        placeholder="Share your experience working with this person..."
                        className="input-field min-h-[100px]"
                      />
                    </div>

                    <button 
                      onClick={() => handleSubmitReview(review.contractId)}
                      className="btn-primary w-full flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Review</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* Given Reviews */}
        {activeTab === 'given' && (
          <>
            {givenReviews.map(review => (
              <div key={review.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Link 
                      to={`/contracts/${review.contractId}`}
                      className="font-semibold text-gray-900 hover:text-campus-blue"
                    >
                      {review.taskTitle}
                    </Link>
                    <p className="text-sm text-gray-500">{review.createdAt}</p>
                  </div>
                  {renderStars(review.rating)}
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{review.partner.avatar}</span>
                  </div>
                  <span className="font-medium text-gray-700">To: {review.partner.name}</span>
                </div>

                <p className="text-gray-700 bg-gray-50 rounded-lg p-3">{review.comment}</p>
              </div>
            ))}
          </>
        )}

        {/* Received Reviews */}
        {activeTab === 'received' && (
          <>
            {receivedReviews.map(review => (
              <div key={review.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Link 
                      to={`/contracts/${review.contractId}`}
                      className="font-semibold text-gray-900 hover:text-campus-blue"
                    >
                      {review.taskTitle}
                    </Link>
                    <p className="text-sm text-gray-500">{review.createdAt}</p>
                  </div>
                  {renderStars(review.rating)}
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-campus-green to-campus-blue rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{review.partner.avatar}</span>
                  </div>
                  <span className="font-medium text-gray-700">From: {review.partner.name}</span>
                </div>

                <p className="text-gray-700 bg-blue-50 rounded-lg p-3">{review.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Reviews

