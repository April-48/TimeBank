/**
 * Utility functions for TimeBank application
 */

// ==================== Formatting ====================

/**
 * Format timecoin amount with proper precision
 * @param {number} amount
 * @param {boolean} [showSymbol=true]
 * @returns {string}
 */
export function formatTimecoin(amount, showSymbol = true) {
  const formatted = typeof amount === 'number' ? amount.toFixed(2) : '0.00'
  return showSymbol ? `${formatted} TC` : formatted
}

/**
 * Format minutes to hours/minutes display
 * @param {number} minutes
 * @returns {string}
 */
export function formatMinutes(minutes) {
  if (!minutes) return '0m'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

/**
 * Format date with timezone
 * @param {string|Date} date
 * @param {Object} [options]
 * @returns {string}
 */
export function formatDate(date, options = {}) {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  
  const {
    relative = false,
    includeTime = false,
    timezone = 'UTC+8'
  } = options
  
  if (relative) {
    return formatRelativeTime(d)
  }
  
  const dateOptions = includeTime 
    ? { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    : { year: 'numeric', month: 'short', day: 'numeric' }
  
  return d.toLocaleDateString('en-US', dateOptions)
}

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {string|Date} date
 * @returns {string}
 */
export function formatRelativeTime(date) {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now - d) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`
  
  return formatDate(d)
}

/**
 * Calculate days left until deadline
 * @param {string|Date} deadline
 * @returns {number}
 */
export function getDaysLeft(deadline) {
  if (!deadline) return 0
  const d = typeof deadline === 'string' ? new Date(deadline) : deadline
  const now = new Date()
  const diffInDays = Math.ceil((d - now) / (1000 * 60 * 60 * 24))
  return diffInDays
}

// ==================== Validation ====================

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param {string} password
 * @returns {{valid: boolean, message: string}}
 */
export function validatePassword(password) {
  if (!password || password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' }
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain lowercase letters' }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain numbers' }
  }
  return { valid: true, message: '' }
}

/**
 * Validate amount is within range
 * @param {number} amount
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export function isValidAmount(amount, min, max) {
  return typeof amount === 'number' && amount >= min && amount <= max
}

// ==================== String Utilities ====================

/**
 * Truncate text with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Capitalize first letter
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Pluralize word based on count
 * @param {number} count
 * @param {string} singular
 * @param {string} [plural]
 * @returns {string}
 */
export function pluralize(count, singular, plural) {
  const pluralForm = plural || `${singular}s`
  return count === 1 ? singular : pluralForm
}

// ==================== Status Helpers ====================

/**
 * Check if task can receive proposals
 * @param {string} status
 * @returns {boolean}
 */
export function canTaskReceiveProposals(status) {
  return status === 'open'
}

/**
 * Check if proposal can be edited
 * @param {string} status
 * @returns {boolean}
 */
export function canEditProposal(status) {
  return status === 'pending'
}

/**
 * Check if contract payment can be escrowed
 * @param {string} paymentPhase
 * @param {string} contractStatus
 * @returns {boolean}
 */
export function canEscrowPayment(paymentPhase, contractStatus) {
  return paymentPhase === 'unfunded' && contractStatus === 'draft'
}

/**
 * Check if contract payment can be released
 * @param {string} paymentPhase
 * @param {string} contractStatus
 * @returns {boolean}
 */
export function canReleasePayment(paymentPhase, contractStatus) {
  return paymentPhase === 'escrowed' && contractStatus === 'delivered'
}

// ==================== URL/Query Utilities ====================

/**
 * Build query string from object
 * @param {Object} params
 * @returns {string}
 */
export function buildQueryString(params) {
  const filtered = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  return filtered.length > 0 ? `?${filtered.join('&')}` : ''
}

/**
 * Parse query string to object
 * @param {string} queryString
 * @returns {Object}
 */
export function parseQueryString(queryString) {
  if (!queryString) return {}
  const params = new URLSearchParams(queryString)
  const result = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

// ==================== Class Name Utilities ====================

/**
 * Conditionally join class names (similar to clsx)
 * @param  {...any} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes
    .filter(Boolean)
    .map(cls => {
      if (typeof cls === 'string') return cls
      if (typeof cls === 'object') {
        return Object.entries(cls)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ')
      }
      return ''
    })
    .join(' ')
    .trim()
}

// ==================== File Utilities ====================

/**
 * Format file size
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Check if file type is allowed
 * @param {string} mimeType
 * @param {string[]} allowedTypes
 * @returns {boolean}
 */
export function isAllowedFileType(mimeType, allowedTypes) {
  return allowedTypes.includes(mimeType)
}

// ==================== Error Handling ====================

/**
 * Extract error message from various error formats
 * @param {any} error
 * @returns {string}
 */
export function getErrorMessage(error) {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.error?.message) return error.error.message
  if (error?.data?.message) return error.data.message
  return 'An unexpected error occurred'
}

// ==================== Debounce/Throttle ====================

/**
 * Debounce function
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
export function debounce(func, wait = 300) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// ==================== Local Storage ====================

/**
 * Safely get item from localStorage
 * @param {string} key
 * @param {any} defaultValue
 * @returns {any}
 */
export function getLocalStorage(key, defaultValue = null) {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Safely set item to localStorage
 * @param {string} key
 * @param {any} value
 * @returns {boolean}
 */
export function setLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Remove item from localStorage
 * @param {string} key
 * @returns {boolean}
 */
export function removeLocalStorage(key) {
  try {
    window.localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
    return false
  }
}

