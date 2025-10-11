/**
 * Type definitions for TimeBank application
 * These will be used across the application and match the backend API contract
 */

// ==================== User Types ====================

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 * @property {string} [bio]
 * @property {string} [location]
 * @property {string} [timezone]
 * @property {number} rating
 * @property {number} reviewCount
 * @property {number} completedJobs
 * @property {string} memberSince
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Skill
 * @property {number} id
 * @property {string} name
 * @property {'beginner'|'intermediate'|'advanced'|'expert'} proficiency
 * @property {number} years
 */

// ==================== Task Types ====================

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {number} budget
 * @property {string} deadline
 * @property {string[]} skills
 * @property {string} category
 * @property {'draft'|'open'|'contracted'|'completed'|'cancelled'} status
 * @property {number} requesterId
 * @property {User} requester
 * @property {number} proposalCount
 * @property {number} viewCount
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} TaskFilters
 * @property {string} [search]
 * @property {string} [category]
 * @property {string} [status]
 * @property {number} [minBudget]
 * @property {number} [maxBudget]
 * @property {string} [sortBy]
 * @property {number} [page]
 * @property {number} [limit]
 */

// ==================== Proposal Types ====================

/**
 * @typedef {Object} Proposal
 * @property {number} id
 * @property {number} taskId
 * @property {Task} task
 * @property {number} providerId
 * @property {User} provider
 * @property {number} estimatedHours
 * @property {number} bidAmount
 * @property {string} message
 * @property {'pending'|'accepted'|'rejected'|'withdrawn'} status
 * @property {string} submittedAt
 * @property {string} [respondedAt]
 * @property {string} createdAt
 * @property {string} updatedAt
 */

// ==================== Contract Types ====================

/**
 * @typedef {Object} Contract
 * @property {number} id
 * @property {number} taskId
 * @property {Task} task
 * @property {number} proposalId
 * @property {Proposal} proposal
 * @property {number} requesterId
 * @property {User} requester
 * @property {number} providerId
 * @property {User} provider
 * @property {number} agreedMinutes
 * @property {number} agreedAmount
 * @property {'draft'|'active'|'delivered'|'completed'|'cancelled'|'disputed'} status
 * @property {string} [deliveredAt]
 * @property {string} [completedAt]
 * @property {string} [cancelledAt]
 * @property {string} deadline
 * @property {ContractPayment} payment
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} ContractPayment
 * @property {number} id
 * @property {number} contractId
 * @property {number} amount
 * @property {'unfunded'|'escrowed'|'released'|'refunded'} phase
 * @property {string} [escrowedAt]
 * @property {string} [releasedAt]
 * @property {string} [refundedAt]
 * @property {string} createdAt
 * @property {string} updatedAt
 */

// ==================== Transaction Types ====================

/**
 * @typedef {Object} Transaction
 * @property {number} id
 * @property {number} userId
 * @property {'deposit'|'withdrawal'|'escrow_hold'|'release'|'refund'} type
 * @property {number} amount
 * @property {number} balanceAfter
 * @property {'pending'|'completed'|'failed'|'cancelled'} status
 * @property {string} description
 * @property {number} [contractId]
 * @property {Object} [meta]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Wallet
 * @property {number} availableBalance
 * @property {number} escrowedBalance
 * @property {number} totalBalance
 */

// ==================== Message Types ====================

/**
 * @typedef {Object} MessageThread
 * @property {number} id
 * @property {number} taskId
 * @property {Task} task
 * @property {number[]} participantIds
 * @property {User[]} participants
 * @property {Message} lastMessage
 * @property {number} unreadCount
 * @property {string} lastMessageAt
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Message
 * @property {number} id
 * @property {number} threadId
 * @property {number} senderId
 * @property {User} sender
 * @property {'text'|'system'|'file'|'image'} type
 * @property {string} content
 * @property {Object} [metadata]
 * @property {boolean} isRead
 * @property {string} createdAt
 */

// ==================== Review Types ====================

/**
 * @typedef {Object} Review
 * @property {number} id
 * @property {number} contractId
 * @property {number} reviewerId
 * @property {User} reviewer
 * @property {number} revieweeId
 * @property {User} reviewee
 * @property {number} rating
 * @property {string} comment
 * @property {string} createdAt
 */

// ==================== API Response Types ====================

/**
 * @typedef {Object} PaginatedResponse
 * @property {any[]} data
 * @property {Object} pagination
 * @property {number} pagination.page
 * @property {number} pagination.limit
 * @property {number} pagination.total
 * @property {number} pagination.totalPages
 * @property {boolean} pagination.hasNext
 * @property {boolean} pagination.hasPrev
 */

/**
 * @typedef {Object} ApiError
 * @property {string} code
 * @property {string} message
 * @property {Object} [details]
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {any} [data]
 * @property {ApiError} [error]
 */

// Export empty object to make this a module
export {}

