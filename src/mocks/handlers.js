/**
 * MSW Request Handlers
 * Mock all API endpoints
 */

import { http, HttpResponse } from 'msw'
import {
  users,
  currentUser,
  tasks,
  proposals,
  contracts,
  contractPayments,
  transactions,
  messageThreads,
  messages,
  reviews,
  wallets,
  skills,
  enrichTask,
  enrichProposal,
  enrichContract,
  enrichThread,
  enrichMessage,
  enrichReview,
  getUserById
} from './data'

const API_BASE = '/api'

// Helper to create success response
const success = (data) => HttpResponse.json({ success: true, data })

// Helper to create error response
const error = (code, message, status = 400) => 
  HttpResponse.json({ success: false, error: { code, message } }, { status })

export const handlers = [
  // ==================== Auth ====================
  
  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    const { email, password } = await request.json()
    const user = users.find(u => u.email === email)
    
    if (!user) {
      return error('INVALID_CREDENTIALS', 'Invalid email or password', 401)
    }
    
    // In real app, validate password
    return success({ user, token: 'mock-jwt-token' })
  }),

  http.post(`${API_BASE}/auth/register`, async ({ request }) => {
    const userData = await request.json()
    
    // Check if email exists
    if (users.find(u => u.email === userData.email)) {
      return error('EMAIL_EXISTS', 'Email already registered', 400)
    }
    
    const newUser = {
      id: users.length + 1,
      ...userData,
      avatar: userData.name[0].toUpperCase(),
      rating: 0,
      reviewCount: 0,
      completedJobs: 0,
      successRate: 0,
      memberSince: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    users.push(newUser)
    return success({ user: newUser, token: 'mock-jwt-token' })
  }),

  http.get(`${API_BASE}/auth/me`, () => {
    return success(currentUser)
  }),

  http.post(`${API_BASE}/auth/logout`, () => {
    return success({ message: 'Logged out successfully' })
  }),

  // ==================== Tasks ====================
  
  http.get(`${API_BASE}/tasks`, ({ request }) => {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const category = url.searchParams.get('category')
    const page = parseInt(url.searchParams.get('page')) || 1
    const limit = parseInt(url.searchParams.get('limit')) || 20
    
    let filtered = tasks.map(enrichTask)
    
    if (status && status !== 'all') {
      filtered = filtered.filter(t => t.status === status)
    }
    
    if (category && category !== 'all') {
      filtered = filtered.filter(t => t.category.toLowerCase() === category.toLowerCase())
    }
    
    const total = filtered.length
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedData = filtered.slice(start, end)
    
    return success({
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: end < total,
        hasPrev: page > 1
      }
    })
  }),

  http.get(`${API_BASE}/tasks/:id`, ({ params }) => {
    const task = tasks.find(t => t.id === parseInt(params.id))
    if (!task) {
      return error('NOT_FOUND', 'Task not found', 404)
    }
    return success(enrichTask(task))
  }),

  http.post(`${API_BASE}/tasks`, async ({ request }) => {
    const taskData = await request.json()
    const newTask = {
      id: tasks.length + 1,
      ...taskData,
      status: 'draft',
      requesterId: currentUser.id,
      proposalCount: 0,
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    tasks.push(newTask)
    return success(enrichTask(newTask))
  }),

  http.put(`${API_BASE}/tasks/:id`, async ({ params, request }) => {
    const taskData = await request.json()
    const taskIndex = tasks.findIndex(t => t.id === parseInt(params.id))
    
    if (taskIndex === -1) {
      return error('NOT_FOUND', 'Task not found', 404)
    }
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString()
    }
    
    return success(enrichTask(tasks[taskIndex]))
  }),

  // ==================== Proposals ====================
  
  http.get(`${API_BASE}/tasks/:taskId/proposals`, ({ params }) => {
    const taskProposals = proposals
      .filter(p => p.taskId === parseInt(params.taskId))
      .map(enrichProposal)
    return success(taskProposals)
  }),

  http.get(`${API_BASE}/proposals/my`, () => {
    const myProposals = proposals
      .filter(p => p.providerId === currentUser.id)
      .map(enrichProposal)
    return success(myProposals)
  }),

  http.get(`${API_BASE}/proposals/inbox`, () => {
    const myTaskIds = tasks.filter(t => t.requesterId === currentUser.id).map(t => t.id)
    const inboxProposals = proposals
      .filter(p => myTaskIds.includes(p.taskId))
      .map(enrichProposal)
    return success(inboxProposals)
  }),

  http.post(`${API_BASE}/proposals`, async ({ request }) => {
    const proposalData = await request.json()
    
    // Check if already submitted
    const existing = proposals.find(
      p => p.taskId === proposalData.taskId && p.providerId === currentUser.id && p.status === 'pending'
    )
    
    if (existing) {
      return error('ALREADY_SUBMITTED', 'You have already submitted a proposal for this task', 400)
    }
    
    const newProposal = {
      id: proposals.length + 1,
      ...proposalData,
      providerId: currentUser.id,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    proposals.push(newProposal)
    
    // Update task proposal count
    const task = tasks.find(t => t.id === proposalData.taskId)
    if (task) task.proposalCount++
    
    return success(enrichProposal(newProposal))
  }),

  http.post(`${API_BASE}/proposals/:id/accept`, ({ params }) => {
    const proposalIndex = proposals.findIndex(p => p.id === parseInt(params.id))
    
    if (proposalIndex === -1) {
      return error('NOT_FOUND', 'Proposal not found', 404)
    }
    
    const proposal = proposals[proposalIndex]
    
    // Update proposal status
    proposal.status = 'accepted'
    proposal.respondedAt = new Date().toISOString()
    proposal.updatedAt = new Date().toISOString()
    
    // Update task status
    const task = tasks.find(t => t.id === proposal.taskId)
    if (task) {
      task.status = 'contracted'
      task.updatedAt = new Date().toISOString()
    }
    
    // Create contract
    const newContract = {
      id: contracts.length + 1,
      taskId: proposal.taskId,
      proposalId: proposal.id,
      requesterId: task.requesterId,
      providerId: proposal.providerId,
      agreedMinutes: proposal.estimatedHours * 60,
      agreedAmount: proposal.bidAmount,
      status: 'draft',
      deadline: task.deadline,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    contracts.push(newContract)
    
    // Create contract payment
    contractPayments.push({
      id: contractPayments.length + 1,
      contractId: newContract.id,
      amount: newContract.agreedAmount,
      phase: 'unfunded',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    
    return success({ proposal: enrichProposal(proposal), contract: enrichContract(newContract) })
  }),

  // ==================== Contracts ====================
  
  http.get(`${API_BASE}/contracts`, ({ request }) => {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const role = url.searchParams.get('role')
    
    let filtered = contracts.map(enrichContract)
    
    // Filter by user role
    if (role === 'requester') {
      filtered = filtered.filter(c => c.requesterId === currentUser.id)
    } else if (role === 'provider') {
      filtered = filtered.filter(c => c.providerId === currentUser.id)
    } else {
      // All contracts where user is involved
      filtered = filtered.filter(c => 
        c.requesterId === currentUser.id || c.providerId === currentUser.id
      )
    }
    
    if (status && status !== 'all') {
      filtered = filtered.filter(c => c.status === status)
    }
    
    return success(filtered)
  }),

  http.get(`${API_BASE}/contracts/:id`, ({ params }) => {
    const contract = contracts.find(c => c.id === parseInt(params.id))
    if (!contract) {
      return error('NOT_FOUND', 'Contract not found', 404)
    }
    return success(enrichContract(contract))
  }),

  // ==================== Payments ====================
  
  http.post(`${API_BASE}/contracts/:contractId/payment/escrow`, ({ params }) => {
    const payment = contractPayments.find(p => p.contractId === parseInt(params.contractId))
    const contract = contracts.find(c => c.id === parseInt(params.contractId))
    
    if (!payment) {
      return error('NOT_FOUND', 'Payment not found', 404)
    }
    
    if (payment.phase !== 'unfunded') {
      return error('INVALID_STATE', 'Payment already escrowed', 400)
    }
    
    // Update payment
    payment.phase = 'escrowed'
    payment.escrowedAt = new Date().toISOString()
    payment.updatedAt = new Date().toISOString()
    
    // Update contract
    if (contract) {
      contract.status = 'active'
      contract.updatedAt = new Date().toISOString()
    }
    
    // Create transaction
    transactions.push({
      id: transactions.length + 1,
      userId: currentUser.id,
      type: 'escrow_hold',
      amount: -payment.amount,
      balanceAfter: wallets[0].availableBalance - payment.amount,
      status: 'completed',
      description: `Escrow for "${contract.task.title}"`,
      contractId: contract.id,
      createdAt: new Date().toISOString()
    })
    
    // Update wallet
    wallets[0].availableBalance -= payment.amount
    wallets[0].escrowedBalance += payment.amount
    
    return success(payment)
  }),

  http.post(`${API_BASE}/contracts/:contractId/payment/release`, ({ params }) => {
    const payment = contractPayments.find(p => p.contractId === parseInt(params.contractId))
    const contract = contracts.find(c => c.id === parseInt(params.contractId))
    
    if (!payment) {
      return error('NOT_FOUND', 'Payment not found', 404)
    }
    
    if (payment.phase !== 'escrowed') {
      return error('INVALID_STATE', 'Payment not in escrow', 400)
    }
    
    // Update payment
    payment.phase = 'released'
    payment.releasedAt = new Date().toISOString()
    payment.updatedAt = new Date().toISOString()
    
    // Update contract
    if (contract) {
      contract.status = 'completed'
      contract.completedAt = new Date().toISOString()
      contract.updatedAt = new Date().toISOString()
    }
    
    return success(payment)
  }),

  // ==================== Messages ====================
  
  http.get(`${API_BASE}/messages/threads`, () => {
    const userThreads = messageThreads
      .filter(t => t.participantIds.includes(currentUser.id))
      .map(enrichThread)
      .sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt))
    
    return success(userThreads)
  }),

  http.get(`${API_BASE}/messages/threads/:id/messages`, ({ params }) => {
    const threadMessages = messages
      .filter(m => m.threadId === parseInt(params.id))
      .map(enrichMessage)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    
    return success(threadMessages)
  }),

  http.post(`${API_BASE}/messages/threads/:id/messages`, async ({ params, request }) => {
    const { content, type = 'text' } = await request.json()
    
    const newMessage = {
      id: messages.length + 1,
      threadId: parseInt(params.id),
      senderId: currentUser.id,
      type,
      content,
      isRead: false,
      createdAt: new Date().toISOString()
    }
    
    messages.push(newMessage)
    
    // Update thread last message time
    const thread = messageThreads.find(t => t.id === parseInt(params.id))
    if (thread) {
      thread.lastMessageAt = newMessage.createdAt
      thread.updatedAt = newMessage.createdAt
    }
    
    return success(enrichMessage(newMessage))
  }),

  // ==================== Wallet ====================
  
  http.get(`${API_BASE}/wallet`, () => {
    return success(wallets[0])
  }),

  http.get(`${API_BASE}/transactions`, ({ request }) => {
    const url = new URL(request.url)
    const type = url.searchParams.get('type')
    
    let filtered = transactions.filter(t => t.userId === currentUser.id)
    
    if (type && type !== 'all') {
      if (type === 'income') {
        filtered = filtered.filter(t => t.amount > 0)
      } else if (type === 'expense') {
        filtered = filtered.filter(t => t.amount < 0)
      }
    }
    
    return success(filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  }),

  // ==================== Reviews ====================
  
  http.get(`${API_BASE}/reviews/pending`, () => {
    // Find completed contracts without reviews
    const completedContracts = contracts.filter(c => 
      c.status === 'completed' &&
      (c.requesterId === currentUser.id || c.providerId === currentUser.id)
    )
    
    const pending = completedContracts
      .filter(contract => {
        const hasReviewed = reviews.some(r => 
          r.contractId === contract.id && r.reviewerId === currentUser.id
        )
        return !hasReviewed
      })
      .map(enrichContract)
    
    return success(pending)
  }),

  http.post(`${API_BASE}/reviews`, async ({ request }) => {
    const reviewData = await request.json()
    
    // Check if already reviewed
    const existing = reviews.find(
      r => r.contractId === reviewData.contractId && r.reviewerId === currentUser.id
    )
    
    if (existing) {
      return error('ALREADY_REVIEWED', 'You have already reviewed this contract', 400)
    }
    
    const newReview = {
      id: reviews.length + 1,
      ...reviewData,
      reviewerId: currentUser.id,
      createdAt: new Date().toISOString()
    }
    
    reviews.push(newReview)
    return success(enrichReview(newReview))
  }),

  http.get(`${API_BASE}/users/:userId/reviews`, ({ params }) => {
    const userReviews = reviews
      .filter(r => r.revieweeId === parseInt(params.userId))
      .map(enrichReview)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    return success(userReviews)
  }),

  // ==================== Profile ====================
  
  http.get(`${API_BASE}/users/:userId`, ({ params }) => {
    const user = getUserById(parseInt(params.userId))
    if (!user) {
      return error('NOT_FOUND', 'User not found', 404)
    }
    return success(user)
  }),

  http.get(`${API_BASE}/users/:userId/skills`, ({ params }) => {
    const userSkills = skills.filter(s => s.userId === parseInt(params.userId))
    return success(userSkills)
  }),

  http.post(`${API_BASE}/users/me/skills`, async ({ request }) => {
    const skillData = await request.json()
    const newSkill = {
      id: skills.length + 1,
      userId: currentUser.id,
      ...skillData
    }
    skills.push(newSkill)
    return success(newSkill)
  }),

  // ==================== Dashboard ====================
  
  http.get(`${API_BASE}/dashboard`, () => {
    const myTasks = tasks.filter(t => t.requesterId === currentUser.id)
    const myProposals = proposals.filter(p => p.providerId === currentUser.id)
    const myContracts = contracts.filter(c => 
      c.requesterId === currentUser.id || c.providerId === currentUser.id
    )
    
    return success({
      stats: {
        myTasks: {
          draft: myTasks.filter(t => t.status === 'draft').length,
          open: myTasks.filter(t => t.status === 'open').length,
          contracted: myTasks.filter(t => t.status === 'contracted').length,
          needsReview: 0 // Would calculate from completed contracts
        },
        myProposals: {
          pending: myProposals.filter(p => p.status === 'pending').length,
          accepted: myProposals.filter(p => p.status === 'accepted').length,
          rejected: myProposals.filter(p => p.status === 'rejected').length
        },
        contracts: {
          unfunded: myContracts.filter(c => {
            const payment = contractPayments.find(p => p.contractId === c.id)
            return payment?.phase === 'unfunded'
          }).length,
          active: myContracts.filter(c => c.status === 'active').length,
          delivered: myContracts.filter(c => c.status === 'delivered').length
        },
        balance: wallets[0]
      },
      recentContracts: myContracts.slice(0, 3).map(enrichContract),
      pendingActions: [] // Would calculate from various entities
    })
  })
]

