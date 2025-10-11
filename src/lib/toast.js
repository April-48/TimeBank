/**
 * Simple Toast Notification System
 * Can be replaced with libraries like react-hot-toast or sonner later
 */

class ToastManager {
  constructor() {
    this.listeners = []
    this.toasts = []
    this.nextId = 1
  }

  subscribe(listener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  notify() {
    this.listeners.forEach(listener => listener(this.toasts))
  }

  add(toast) {
    const id = this.nextId++
    const newToast = {
      id,
      ...toast,
      createdAt: Date.now()
    }
    
    this.toasts = [...this.toasts, newToast]
    this.notify()

    // Auto remove after duration
    const duration = toast.duration || 5000
    if (duration > 0) {
      setTimeout(() => this.remove(id), duration)
    }

    return id
  }

  remove(id) {
    this.toasts = this.toasts.filter(t => t.id !== id)
    this.notify()
  }

  success(message, options = {}) {
    return this.add({
      type: 'success',
      message,
      ...options
    })
  }

  error(message, options = {}) {
    return this.add({
      type: 'error',
      message,
      duration: 7000, // Errors stay longer
      ...options
    })
  }

  warning(message, options = {}) {
    return this.add({
      type: 'warning',
      message,
      ...options
    })
  }

  info(message, options = {}) {
    return this.add({
      type: 'info',
      message,
      ...options
    })
  }

  promise(promise, messages) {
    const id = this.add({
      type: 'loading',
      message: messages.loading || 'Loading...',
      duration: 0
    })

    promise
      .then((data) => {
        this.remove(id)
        this.success(messages.success || 'Success!')
        return data
      })
      .catch((error) => {
        this.remove(id)
        this.error(messages.error || 'Something went wrong')
        throw error
      })

    return promise
  }
}

export const toast = new ToastManager()

export default toast

