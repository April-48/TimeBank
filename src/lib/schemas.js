/**
 * Validation Schemas using Zod
 * Use with React Hook Form for type-safe form validation
 */

import { z } from 'zod'
import { Validation } from './constants'

// ==================== Auth Schemas ====================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional()
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain lowercase letters')
    .regex(/[0-9]/, 'Password must contain numbers'),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions'
  })
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain lowercase letters')
    .regex(/[0-9]/, 'Password must contain numbers'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

// ==================== Task Schemas ====================

export const taskSchema = z.object({
  title: z
    .string()
    .min(Validation.MIN_TASK_TITLE_LENGTH, `Title must be at least ${Validation.MIN_TASK_TITLE_LENGTH} characters`)
    .max(Validation.MAX_TASK_TITLE_LENGTH, `Title must not exceed ${Validation.MAX_TASK_TITLE_LENGTH} characters`),
  description: z
    .string()
    .min(Validation.MIN_TASK_DESCRIPTION_LENGTH, `Description must be at least ${Validation.MIN_TASK_DESCRIPTION_LENGTH} characters`)
    .max(Validation.MAX_TASK_DESCRIPTION_LENGTH, `Description must not exceed ${Validation.MAX_TASK_DESCRIPTION_LENGTH} characters`),
  budget: z
    .number()
    .min(Validation.MIN_TASK_BUDGET, `Budget must be at least ${Validation.MIN_TASK_BUDGET} TC`)
    .max(Validation.MAX_TASK_BUDGET, `Budget must not exceed ${Validation.MAX_TASK_BUDGET} TC`)
    .or(z.string().transform(val => parseFloat(val))),
  deadline: z
    .string()
    .refine(val => {
      const deadline = new Date(val)
      const now = new Date()
      return deadline > now
    }, 'Deadline must be in the future'),
  skills: z
    .array(z.string())
    .min(1, 'At least one skill is required')
    .max(Validation.MAX_SKILLS_PER_TASK, `Maximum ${Validation.MAX_SKILLS_PER_TASK} skills allowed`),
  category: z.string().min(1, 'Category is required')
})

// ==================== Proposal Schemas ====================

export const proposalSchema = z.object({
  estimatedHours: z
    .number()
    .min(Validation.MIN_PROPOSAL_HOURS, `Estimated hours must be at least ${Validation.MIN_PROPOSAL_HOURS}`)
    .max(Validation.MAX_PROPOSAL_HOURS, `Estimated hours must not exceed ${Validation.MAX_PROPOSAL_HOURS}`)
    .or(z.string().transform(val => parseFloat(val))),
  bidAmount: z
    .number()
    .min(Validation.MIN_PROPOSAL_BID, `Bid must be at least ${Validation.MIN_PROPOSAL_BID} TC`)
    .max(Validation.MAX_PROPOSAL_BID, `Bid must not exceed ${Validation.MAX_PROPOSAL_BID} TC`)
    .or(z.string().transform(val => parseFloat(val))),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must not exceed 2000 characters')
})

// ==================== Review Schemas ====================

export const reviewSchema = z.object({
  contractId: z.number(),
  revieweeId: z.number(),
  rating: z
    .number()
    .min(1, 'Rating is required')
    .max(5, 'Rating must be between 1 and 5'),
  comment: z
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(Validation.MAX_REVIEW_LENGTH, `Review must not exceed ${Validation.MAX_REVIEW_LENGTH} characters`)
})

// ==================== Profile Schemas ====================

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .optional(),
  bio: z
    .string()
    .max(500, 'Bio must not exceed 500 characters')
    .optional(),
  location: z
    .string()
    .max(100, 'Location must not exceed 100 characters')
    .optional(),
  timezone: z.string().optional()
})

export const skillSchema = z.object({
  name: z
    .string()
    .min(1, 'Skill name is required')
    .max(50, 'Skill name must not exceed 50 characters'),
  proficiency: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  years: z
    .number()
    .min(0, 'Years cannot be negative')
    .max(50, 'Years must not exceed 50')
    .or(z.string().transform(val => parseFloat(val)))
})

// ==================== Message Schemas ====================

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(Validation.MAX_MESSAGE_LENGTH, `Message must not exceed ${Validation.MAX_MESSAGE_LENGTH} characters`),
  type: z.enum(['text', 'system', 'file', 'image']).optional().default('text')
})

// ==================== Settings Schemas ====================

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain lowercase letters')
    .regex(/[0-9]/, 'Password must contain numbers'),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

// ==================== Export Types for TypeScript ====================

export const schemas = {
  login: loginSchema,
  register: registerSchema,
  forgotPassword: forgotPasswordSchema,
  resetPassword: resetPasswordSchema,
  task: taskSchema,
  proposal: proposalSchema,
  review: reviewSchema,
  profile: profileSchema,
  skill: skillSchema,
  message: messageSchema,
  changePassword: changePasswordSchema
}

export default schemas

