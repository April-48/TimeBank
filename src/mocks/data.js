/**
 * Mock data for development
 * This data will be served by MSW until real backend is ready
 */

import { TaskStatus, ProposalStatus, ContractStatus, PaymentPhase } from '../lib/constants'

// ==================== Users ====================

export const users = [
  {
    id: 1,
    name: 'Zhang Student',
    email: 'zhang@student.edu.cn',
    avatar: 'Z',
    bio: 'Full-stack developer passionate about React and Node.js',
    location: 'CS Building, Beijing',
    timezone: 'UTC+8',
    rating: 4.9,
    reviewCount: 23,
    completedJobs: 45,
    successRate: 98,
    memberSince: '2023-05-15',
    createdAt: '2023-05-15T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 2,
    name: 'Li Student',
    email: 'li@student.edu.cn',
    avatar: 'L',
    bio: 'UI/UX designer with focus on modern web applications',
    location: 'Design Building, Beijing',
    timezone: 'UTC+8',
    rating: 4.8,
    reviewCount: 18,
    completedJobs: 32,
    successRate: 96,
    memberSince: '2023-06-20',
    createdAt: '2023-06-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 3,
    name: 'Wang Student',
    email: 'wang@student.edu.cn',
    avatar: 'W',
    bio: 'Data scientist and Python expert',
    location: 'Math Building, Beijing',
    timezone: 'UTC+8',
    rating: 4.7,
    reviewCount: 15,
    completedJobs: 28,
    successRate: 94,
    memberSince: '2023-07-10',
    createdAt: '2023-07-10T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 4,
    name: 'Chen Student',
    email: 'chen@student.edu.cn',
    avatar: 'C',
    bio: 'Content writer and marketing specialist',
    location: 'Journalism Building, Beijing',
    timezone: 'UTC+8',
    rating: 4.6,
    reviewCount: 12,
    completedJobs: 25,
    successRate: 92,
    memberSince: '2023-08-05',
    createdAt: '2023-08-05T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  }
]

// Current logged in user
export const currentUser = users[0]

// ==================== Skills ====================

export const skills = [
  { id: 1, userId: 1, name: 'JavaScript', proficiency: 'expert', years: 3 },
  { id: 2, userId: 1, name: 'React', proficiency: 'expert', years: 2 },
  { id: 3, userId: 1, name: 'Node.js', proficiency: 'advanced', years: 2 },
  { id: 4, userId: 2, name: 'UI/UX Design', proficiency: 'expert', years: 4 },
  { id: 5, userId: 2, name: 'Figma', proficiency: 'expert', years: 3 },
  { id: 6, userId: 3, name: 'Python', proficiency: 'expert', years: 4 },
  { id: 7, userId: 3, name: 'Data Analysis', proficiency: 'advanced', years: 3 }
]

// ==================== Tasks ====================

export const tasks = [
  {
    id: 1,
    title: 'Build a responsive website',
    description: 'Need a modern, responsive website for my small business. Should include home, about, services, and contact pages. Must be mobile-friendly with clean, modern design.',
    budget: 50,
    deadline: '2024-02-01',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    category: 'Programming',
    status: TaskStatus.OPEN,
    requesterId: 2,
    proposalCount: 5,
    viewCount: 45,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Logo design for startup',
    description: 'Looking for creative logo designer to create modern logo for tech startup. Need 3 initial concepts and unlimited revisions.',
    budget: 35,
    deadline: '2024-01-28',
    skills: ['Graphic Design', 'Illustrator', 'Photoshop'],
    category: 'Design',
    status: TaskStatus.OPEN,
    requesterId: 3,
    proposalCount: 8,
    viewCount: 62,
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-14T10:00:00Z'
  },
  {
    id: 3,
    title: 'Python data analysis project',
    description: 'Need help with data analysis using Python. Dataset includes sales data needing cleaning, visualization, and insights.',
    budget: 40,
    deadline: '2024-02-05',
    skills: ['Python', 'Pandas', 'Data Analysis'],
    category: 'Programming',
    status: TaskStatus.CONTRACTED,
    requesterId: 4,
    proposalCount: 12,
    viewCount: 78,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-18T14:00:00Z'
  }
]

// ==================== Proposals ====================

export const proposals = [
  {
    id: 1,
    taskId: 1,
    providerId: 1,
    estimatedHours: 40,
    bidAmount: 48,
    message: 'I have 3 years of experience in web development using React. I can deliver a modern, responsive website within 2 weeks.',
    status: ProposalStatus.PENDING,
    submittedAt: '2024-01-16T10:30:00Z',
    createdAt: '2024-01-16T10:30:00Z',
    updatedAt: '2024-01-16T10:30:00Z'
  },
  {
    id: 2,
    taskId: 1,
    providerId: 3,
    estimatedHours: 35,
    bidAmount: 45,
    message: 'I specialize in responsive design with Tailwind CSS. Check my portfolio for examples.',
    status: ProposalStatus.PENDING,
    submittedAt: '2024-01-16T14:20:00Z',
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z'
  },
  {
    id: 3,
    taskId: 3,
    providerId: 1,
    estimatedHours: 30,
    bidAmount: 40,
    message: 'I have experience with Python data analysis. I can start immediately.',
    status: ProposalStatus.ACCEPTED,
    submittedAt: '2024-01-11T09:00:00Z',
    respondedAt: '2024-01-18T14:00:00Z',
    createdAt: '2024-01-11T09:00:00Z',
    updatedAt: '2024-01-18T14:00:00Z'
  }
]

// ==================== Contracts ====================

export const contracts = [
  {
    id: 1,
    taskId: 3,
    proposalId: 3,
    requesterId: 4,
    providerId: 1,
    agreedMinutes: 1800, // 30 hours
    agreedAmount: 40,
    status: ContractStatus.ACTIVE,
    deadline: '2024-02-05',
    createdAt: '2024-01-18T14:00:00Z',
    updatedAt: '2024-01-18T15:00:00Z'
  }
]

// ==================== Contract Payments ====================

export const contractPayments = [
  {
    id: 1,
    contractId: 1,
    amount: 40,
    phase: PaymentPhase.ESCROWED,
    escrowedAt: '2024-01-18T15:00:00Z',
    createdAt: '2024-01-18T14:00:00Z',
    updatedAt: '2024-01-18T15:00:00Z'
  }
]

// ==================== Transactions ====================

export const transactions = [
  {
    id: 1,
    userId: 1,
    type: 'deposit',
    amount: 100,
    balanceAfter: 150,
    status: 'completed',
    description: 'Account top-up',
    createdAt: '2024-01-18T09:00:00Z'
  },
  {
    id: 2,
    userId: 1,
    type: 'escrow_hold',
    amount: -40,
    balanceAfter: 110,
    status: 'completed',
    description: 'Escrow for "Python data analysis project"',
    contractId: 1,
    createdAt: '2024-01-18T15:00:00Z'
  },
  {
    id: 3,
    userId: 1,
    type: 'release',
    amount: 30,
    balanceAfter: 140,
    status: 'completed',
    description: 'Payment received for "Logo design"',
    contractId: 2,
    createdAt: '2024-01-16T11:45:00Z'
  }
]

// ==================== Message Threads ====================

export const messageThreads = [
  {
    id: 1,
    taskId: 3,
    participantIds: [1, 4],
    unreadCount: 2,
    lastMessageAt: '2024-01-20T10:30:00Z',
    createdAt: '2024-01-18T14:30:00Z',
    updatedAt: '2024-01-20T10:30:00Z'
  }
]

// ==================== Messages ====================

export const messages = [
  {
    id: 1,
    threadId: 1,
    senderId: 4,
    type: 'text',
    content: 'Hi! Thanks for accepting my proposal. When can we start?',
    isRead: true,
    createdAt: '2024-01-18T14:35:00Z'
  },
  {
    id: 2,
    threadId: 1,
    senderId: 1,
    type: 'text',
    content: 'Hello! I can start right away. Do you have the dataset ready?',
    isRead: true,
    createdAt: '2024-01-18T15:00:00Z'
  },
  {
    id: 3,
    threadId: 1,
    senderId: 1,
    type: 'system',
    content: 'Contract has been created and payment is in escrow.',
    isRead: true,
    metadata: { contractId: 1 },
    createdAt: '2024-01-18T15:00:00Z'
  },
  {
    id: 4,
    threadId: 1,
    senderId: 4,
    type: 'text',
    content: 'Yes! I will send you the dataset now.',
    isRead: false,
    createdAt: '2024-01-20T10:30:00Z'
  }
]

// ==================== Reviews ====================

export const reviews = [
  {
    id: 1,
    contractId: 2,
    reviewerId: 2,
    revieweeId: 1,
    rating: 5,
    comment: 'Excellent developer! Delivered high-quality work on time. Highly recommend!',
    createdAt: '2024-01-16T12:00:00Z'
  },
  {
    id: 2,
    contractId: 2,
    reviewerId: 1,
    revieweeId: 2,
    rating: 5,
    comment: 'Great client! Clear requirements and prompt payment.',
    createdAt: '2024-01-16T12:15:00Z'
  }
]

// ==================== Wallet ====================

export const wallets = [
  {
    userId: 1,
    availableBalance: 110,
    escrowedBalance: 40,
    totalBalance: 150
  }
]

// ==================== Helper Functions ====================

export function getUserById(id) {
  return users.find(u => u.id === id)
}

export function getTaskById(id) {
  return tasks.find(t => t.id === id)
}

export function getProposalById(id) {
  return proposals.find(p => p.id === id)
}

export function getContractById(id) {
  return contracts.find(c => c.id === id)
}

export function getThreadById(id) {
  return messageThreads.find(t => t.id === id)
}

// Enrich data with relationships
export function enrichTask(task) {
  return {
    ...task,
    requester: getUserById(task.requesterId)
  }
}

export function enrichProposal(proposal) {
  return {
    ...proposal,
    task: enrichTask(getTaskById(proposal.taskId)),
    provider: getUserById(proposal.providerId)
  }
}

export function enrichContract(contract) {
  return {
    ...contract,
    task: enrichTask(getTaskById(contract.taskId)),
    proposal: enrichProposal(getProposalById(contract.proposalId)),
    requester: getUserById(contract.requesterId),
    provider: getUserById(contract.providerId),
    payment: contractPayments.find(p => p.contractId === contract.id)
  }
}

export function enrichThread(thread) {
  return {
    ...thread,
    task: enrichTask(getTaskById(thread.taskId)),
    participants: thread.participantIds.map(getUserById),
    lastMessage: messages
      .filter(m => m.threadId === thread.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
  }
}

export function enrichMessage(message) {
  return {
    ...message,
    sender: getUserById(message.senderId)
  }
}

export function enrichReview(review) {
  return {
    ...review,
    reviewer: getUserById(review.reviewerId),
    reviewee: getUserById(review.revieweeId)
  }
}

