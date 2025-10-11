/**
 * TanStack Query Client Configuration
 */

import { QueryClient } from '@tanstack/react-query'
import { getErrorMessage } from './utils'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      onError: (error) => {
        console.error('Query error:', getErrorMessage(error))
      },
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        console.error('Mutation error:', getErrorMessage(error))
      },
    },
  },
})

export default queryClient

