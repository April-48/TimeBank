import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { 
  Home, 
  User, 
  BookOpen, 
  RefreshCw, 
  History,
  Clock,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  MessageCircle
} from 'lucide-react'
import api from '../lib/api'
import { QueryKeys } from '../lib/constants'
import { formatTimecoin } from '../lib/utils'

const Layout = ({ children }) => {
  const location = useLocation()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { data: dashboardData, isLoading: isBalanceLoading } = useQuery({
    queryKey: QueryKeys.dashboard(),
    queryFn: () => api.dashboard.get(),
    staleTime: 5 * 60 * 1000
  })
  const totalBalance = dashboardData?.stats?.balance?.totalBalance
  const timeCoinLabel = isBalanceLoading
    ? 'Loading...'
    : typeof totalBalance === 'number'
      ? `${formatTimecoin(totalBalance, false)} Time Coins`
      : '-- Time Coins'
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Browse Tasks', href: '/tasks', icon: BookOpen },
    { name: 'My Proposals', href: '/proposals/mine', icon: RefreshCw },
    { name: 'Contracts', href: '/contracts', icon: History },
    { name: 'Messages', href: '/messages', icon: Bell },
    { name: 'Wallet', href: '/wallet', icon: Clock },
  ]

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileMenuOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileMenuOpen])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <div className="w-10 h-10 bg-gradient-to-r from-campus-blue to-campus-purple rounded-xl flex items-center justify-center hover-scale animate-bounce-in">
                <Clock className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TimeBank</h1>
                <p className="text-xs text-gray-500">Task Marketplace</p>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4 animate-slide-in-right">
              {/* Time Coin Balance */}
              <div className="flex items-center space-x-2 bg-campus-green/10 px-3 py-2 rounded-lg hover-scale animate-pulse-glow">
                <Clock className="w-4 h-4 text-campus-green animate-pulse" />
                <span className="text-sm font-medium text-campus-green">{timeCoinLabel}</span>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-all duration-300 hover-scale">
                <Bell className="w-5 h-5 animate-bounce" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* User Avatar with Dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-campus-orange to-campus-pink rounded-full flex items-center justify-center hover-scale">
                    <span className="text-white text-sm font-medium">Z</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in-up">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Zhang</p>
                      <p className="text-xs text-gray-500">zhang@student.edu.cn</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Profile</span>
                    </Link>
                    
                    <Link
                      to="/demo"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">State Demo</span>
                    </Link>
                    
                    <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                      <Settings className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Settings</span>
                    </button>
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-red-600">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen animate-slide-in-left">
          <div className="p-4">
            <ul className="space-y-2">
              {navigation.map((item, index) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover-scale ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700 shadow-md'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                      }`}
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : 'hover:scale-110 transition-transform'}`} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
