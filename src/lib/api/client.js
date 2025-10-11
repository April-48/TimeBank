/**
 * API Client - Type-safe fetch wrapper
 * Will be easy to switch from mock to real backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

/**
 * API Error class
 */
export class ApiError extends Error {
  constructor(code, message, details = null, status = 500) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.details = details
    this.status = status
  }
}

/**
 * Make HTTP request with proper error handling
 * @param {string} endpoint
 * @param {RequestInit} options
 * @returns {Promise<any>}
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Include cookies for auth
  }

  try {
    const response = await fetch(url, config)
    
    // Handle different response types
    const contentType = response.headers.get('content-type')
    const isJson = contentType?.includes('application/json')
    
    let data
    if (isJson) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    // Handle error responses
    if (!response.ok) {
      const error = data?.error || {}
      throw new ApiError(
        error.code || 'UNKNOWN_ERROR',
        error.message || `HTTP ${response.status}: ${response.statusText}`,
        error.details || null,
        response.status
      )
    }

    return data.data || data
  } catch (error) {
    // Network or parsing errors
    if (error instanceof ApiError) {
      throw error
    }
    
    throw new ApiError(
      'NETWORK_ERROR',
      error.message || 'Network request failed',
      null,
      0
    )
  }
}

/**
 * GET request
 */
export async function get(endpoint, params = {}) {
  const queryString = new URLSearchParams(
    Object.entries(params).filter(([_, v]) => v != null)
  ).toString()
  
  const url = queryString ? `${endpoint}?${queryString}` : endpoint
  return request(url, { method: 'GET' })
}

/**
 * POST request
 */
export async function post(endpoint, data = {}) {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * PUT request
 */
export async function put(endpoint, data = {}) {
  return request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/**
 * PATCH request
 */
export async function patch(endpoint, data = {}) {
  return request(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

/**
 * DELETE request
 */
export async function del(endpoint) {
  return request(endpoint, { method: 'DELETE' })
}

/**
 * Upload file
 */
export async function upload(endpoint, formData) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    // Don't set Content-Type, let browser set it with boundary
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new ApiError(
      error.code || 'UPLOAD_ERROR',
      error.message || 'File upload failed',
      error.details,
      response.status
    )
  }

  return response.json()
}

export default {
  get,
  post,
  put,
  patch,
  delete: del,
  upload
}

