/**
 * API endpoints - All backend API calls go through here
 * Switch from mock to real backend by updating API_BASE_URL in .env
 */

import { get, post, put, patch, del, upload } from './client'

// ==================== Auth API ====================

export const authApi = {
  login: (credentials) => post('/auth/login', credentials),
  register: (userData) => post('/auth/register', userData),
  logout: () => post('/auth/logout'),
  refreshToken: () => post('/auth/refresh'),
  getCurrentUser: () => get('/auth/me'),
  forgotPassword: (email) => post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => post('/auth/reset-password', { token, password }),
}

// ==================== Tasks API ====================

export const tasksApi = {
  list: (filters) => get('/tasks', filters),
  get: (id) => get(`/tasks/${id}`),
  create: (taskData) => post('/tasks', taskData),
  update: (id, taskData) => put(`/tasks/${id}`, taskData),
  delete: (id) => del(`/tasks/${id}`),
  myTasks: (filters) => get('/tasks/my', filters),
}

// ==================== Proposals API ====================

export const proposalsApi = {
  list: (taskId) => get(`/tasks/${taskId}/proposals`),
  get: (id) => get(`/proposals/${id}`),
  create: (proposalData) => post('/proposals', proposalData),
  update: (id, proposalData) => put(`/proposals/${id}`, proposalData),
  withdraw: (id) => post(`/proposals/${id}/withdraw`),
  accept: (id) => post(`/proposals/${id}/accept`),
  reject: (id) => post(`/proposals/${id}/reject`),
  myProposals: (filters) => get('/proposals/my', filters),
  inbox: (filters) => get('/proposals/inbox', filters),
}

// ==================== Contracts API ====================

export const contractsApi = {
  list: (filters) => get('/contracts', filters),
  get: (id) => get(`/contracts/${id}`),
  markAsDelivered: (id, deliverables) => post(`/contracts/${id}/deliver`, deliverables),
  complete: (id) => post(`/contracts/${id}/complete`),
  cancel: (id) => post(`/contracts/${id}/cancel`),
  dispute: (id, reason) => post(`/contracts/${id}/dispute`, { reason }),
}

// ==================== Payments API ====================

export const paymentsApi = {
  get: (contractId) => get(`/contracts/${contractId}/payment`),
  escrow: (contractId) => post(`/contracts/${contractId}/payment/escrow`),
  release: (contractId) => post(`/contracts/${contractId}/payment/release`),
  refund: (contractId) => post(`/contracts/${contractId}/payment/refund`),
}

// ==================== Messages API ====================

export const messagesApi = {
  listThreads: (filters) => get('/messages/threads', filters),
  getThread: (id) => get(`/messages/threads/${id}`),
  createThread: (data) => post('/messages/threads', data),
  listMessages: (threadId, pagination) => get(`/messages/threads/${threadId}/messages`, pagination),
  sendMessage: (threadId, message) => post(`/messages/threads/${threadId}/messages`, message),
  markAsRead: (threadId) => post(`/messages/threads/${threadId}/read`),
  uploadAttachment: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return upload('/messages/attachments', formData)
  },
}

// ==================== Wallet & Transactions API ====================

export const walletApi = {
  get: () => get('/wallet'),
  deposit: (amount) => post('/wallet/deposit', { amount }),
  withdraw: (amount) => post('/wallet/withdraw', { amount }),
}

export const transactionsApi = {
  list: (filters) => get('/transactions', filters),
  get: (id) => get(`/transactions/${id}`),
  export: (filters) => get('/transactions/export', filters),
}

// ==================== Reviews API ====================

export const reviewsApi = {
  list: (filters) => get('/reviews', filters),
  get: (id) => get(`/reviews/${id}`),
  create: (reviewData) => post('/reviews', reviewData),
  pending: () => get('/reviews/pending'),
  forUser: (userId) => get(`/users/${userId}/reviews`),
}

// ==================== Profile & Skills API ====================

export const profileApi = {
  get: (userId) => get(`/users/${userId}`),
  update: (userId, data) => put(`/users/${userId}`, data),
  updateAvatar: (file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return upload('/users/me/avatar', formData)
  },
}

export const skillsApi = {
  list: (userId) => get(`/users/${userId}/skills`),
  add: (skillData) => post('/users/me/skills', skillData),
  update: (id, skillData) => put(`/skills/${id}`, skillData),
  delete: (id) => del(`/skills/${id}`),
}

// ==================== Dashboard API ====================

export const dashboardApi = {
  get: () => get('/dashboard'),
  stats: () => get('/dashboard/stats'),
}

// ==================== Notifications API ====================

export const notificationsApi = {
  list: (filters) => get('/notifications', filters),
  markAsRead: (id) => post(`/notifications/${id}/read`),
  markAllAsRead: () => post('/notifications/read-all'),
  getUnreadCount: () => get('/notifications/unread-count'),
}

// Export all APIs
export default {
  auth: authApi,
  tasks: tasksApi,
  proposals: proposalsApi,
  contracts: contractsApi,
  payments: paymentsApi,
  messages: messagesApi,
  wallet: walletApi,
  transactions: transactionsApi,
  reviews: reviewsApi,
  profile: profileApi,
  skills: skillsApi,
  dashboard: dashboardApi,
  notifications: notificationsApi,
}

