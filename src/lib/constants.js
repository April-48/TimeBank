// ==================== Status Enums ====================

export const TaskStatus = {
  DRAFT: 'draft',
  OPEN: 'open',
  CONTRACTED: 'contracted',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

export const ProposalStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn'
}

export const ContractStatus = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  DELIVERED: 'delivered',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  DISPUTED: 'disputed'
}

export const PaymentPhase = {
  UNFUNDED: 'unfunded',
  ESCROWED: 'escrowed',
  RELEASED: 'released',
  REFUNDED: 'refunded'
}

export const TransactionType = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  ESCROW_HOLD: 'escrow_hold',
  RELEASE: 'release',
  REFUND: 'refund'
}

export const TransactionStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
}

export const MessageType = {
  TEXT: 'text',
  SYSTEM: 'system',
  FILE: 'file',
  IMAGE: 'image'
}

// ==================== Query Keys ====================

export const QueryKeys = {
  // Tasks
  tasks: (filters) => ['tasks', filters],
  task: (id) => ['task', id],
  myTasks: (filters) => ['myTasks', filters],
  
  // Proposals
  proposals: (taskId) => ['proposals', taskId],
  proposal: (id) => ['proposal', id],
  myProposals: (filters) => ['myProposals', filters],
  proposalInbox: (filters) => ['proposalInbox', filters],
  
  // Contracts
  contracts: (filters) => ['contracts', filters],
  contract: (id) => ['contract', id],
  contractPayment: (contractId) => ['contractPayment', contractId],
  
  // Messages
  threads: (filters) => ['threads', filters],
  thread: (id) => ['thread', id],
  threadMessages: (threadId, pagination) => ['threadMessages', threadId, pagination],
  
  // Wallet & Transactions
  wallet: () => ['wallet'],
  transactions: (filters) => ['transactions', filters],
  
  // Reviews
  reviews: (filters) => ['reviews', filters],
  pendingReviews: () => ['pendingReviews'],
  
  // Profile
  profile: (userId) => ['profile', userId],
  myProfile: () => ['myProfile'],
  skills: (userId) => ['skills', userId],
  
  // Dashboard
  dashboard: () => ['dashboard'],
  stats: () => ['stats']
}

// ==================== UI Constants ====================

export const StatusColors = {
  // Task Status
  [TaskStatus.DRAFT]: 'bg-gray-100 text-gray-800',
  [TaskStatus.OPEN]: 'bg-green-100 text-green-800',
  [TaskStatus.CONTRACTED]: 'bg-blue-100 text-blue-800',
  [TaskStatus.COMPLETED]: 'bg-purple-100 text-purple-800',
  [TaskStatus.CANCELLED]: 'bg-red-100 text-red-800',
  
  // Proposal Status
  [ProposalStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [ProposalStatus.ACCEPTED]: 'bg-green-100 text-green-800',
  [ProposalStatus.REJECTED]: 'bg-red-100 text-red-800',
  [ProposalStatus.WITHDRAWN]: 'bg-gray-100 text-gray-800',
  
  // Contract Status
  [ContractStatus.DRAFT]: 'bg-gray-100 text-gray-800',
  [ContractStatus.ACTIVE]: 'bg-green-100 text-green-800',
  [ContractStatus.DELIVERED]: 'bg-blue-100 text-blue-800',
  [ContractStatus.COMPLETED]: 'bg-purple-100 text-purple-800',
  [ContractStatus.CANCELLED]: 'bg-red-100 text-red-800',
  [ContractStatus.DISPUTED]: 'bg-orange-100 text-orange-800',
  
  // Payment Phase
  [PaymentPhase.UNFUNDED]: 'bg-red-100 text-red-800',
  [PaymentPhase.ESCROWED]: 'bg-yellow-100 text-yellow-800',
  [PaymentPhase.RELEASED]: 'bg-green-100 text-green-800',
  [PaymentPhase.REFUNDED]: 'bg-gray-100 text-gray-800'
}

export const StatusLabels = {
  // Task Status
  [TaskStatus.DRAFT]: 'Draft',
  [TaskStatus.OPEN]: 'Open',
  [TaskStatus.CONTRACTED]: 'Contracted',
  [TaskStatus.COMPLETED]: 'Completed',
  [TaskStatus.CANCELLED]: 'Cancelled',
  
  // Proposal Status
  [ProposalStatus.PENDING]: 'Pending',
  [ProposalStatus.ACCEPTED]: 'Accepted',
  [ProposalStatus.REJECTED]: 'Rejected',
  [ProposalStatus.WITHDRAWN]: 'Withdrawn',
  
  // Contract Status
  [ContractStatus.DRAFT]: 'Draft',
  [ContractStatus.ACTIVE]: 'Active',
  [ContractStatus.DELIVERED]: 'Delivered',
  [ContractStatus.COMPLETED]: 'Completed',
  [ContractStatus.CANCELLED]: 'Cancelled',
  [ContractStatus.DISPUTED]: 'Disputed',
  
  // Payment Phase
  [PaymentPhase.UNFUNDED]: 'Awaiting Escrow',
  [PaymentPhase.ESCROWED]: 'In Escrow',
  [PaymentPhase.RELEASED]: 'Released',
  [PaymentPhase.REFUNDED]: 'Refunded'
}

// ==================== Validation Constants ====================

export const Validation = {
  MIN_TASK_BUDGET: 1,
  MAX_TASK_BUDGET: 10000,
  MIN_TASK_TITLE_LENGTH: 5,
  MAX_TASK_TITLE_LENGTH: 100,
  MIN_TASK_DESCRIPTION_LENGTH: 20,
  MAX_TASK_DESCRIPTION_LENGTH: 2000,
  
  MIN_PROPOSAL_BID: 1,
  MAX_PROPOSAL_BID: 10000,
  MIN_PROPOSAL_HOURS: 1,
  MAX_PROPOSAL_HOURS: 1000,
  
  MAX_SKILLS_PER_USER: 20,
  MAX_SKILLS_PER_TASK: 10,
  
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/zip',
    'text/plain'
  ],
  
  MAX_MESSAGE_LENGTH: 5000,
  MAX_REVIEW_LENGTH: 1000
}

// ==================== Pagination ====================

export const Pagination = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MESSAGES_PAGE_SIZE: 50
}

// ==================== Categories ====================

export const TaskCategories = [
  'Programming',
  'Design',
  'Writing',
  'Marketing',
  'Translation',
  'Academic',
  'Other'
]

export const SkillProficiency = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert'
}

// ==================== Feature Flags ====================

export const features = {
  milestones: false,        // Milestones disabled
  marketPanel: false,       // Market panel disabled
  pricingRecommendation: true, // Pricing recommendation enabled
  floorValidation: true     // Floor validation enabled
}

// ==================== Role Constants ====================

export const Role = {
  REQUESTER: 'requester',
  PROVIDER: 'provider'
}

