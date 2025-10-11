import React, { useState } from 'react'
import { 
  User,
  Bell,
  Lock,
  Globe,
  Mail,
  Shield,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications')
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    // Notifications
    emailProposals: true,
    emailMessages: true,
    emailPayments: true,
    emailReviews: true,
    inAppProposals: true,
    inAppMessages: true,
    inAppPayments: true,
    inAppReviews: true,
    
    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    
    // Preferences
    language: 'en',
    timezone: 'UTC+8',
    emailDigest: 'daily'
  })

  const handleSave = (section) => {
    console.log('Saving settings:', section, settings)
    alert('Settings saved successfully!')
  }

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="card space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-campus-blue text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
              <p className="text-sm text-gray-600 mb-6">
                Choose how you want to be notified about activities on your account
              </p>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  </div>
                  <div className="space-y-3 ml-7">
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">New proposals on my tasks</span>
                      <input
                        type="checkbox"
                        checked={settings.emailProposals}
                        onChange={(e) => handleInputChange('emailProposals', e.target.checked)}
                        className="w-4 h-4 text-campus-blue focus:ring-campus-blue border-gray-300 rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">New messages</span>
                      <input
                        type="checkbox"
                        checked={settings.emailMessages}
                        onChange={(e) => handleInputChange('emailMessages', e.target.checked)}
                        className="w-4 h-4 text-campus-blue focus:ring-campus-blue border-gray-300 rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Payment updates (escrow, release)</span>
                      <input
                        type="checkbox"
                        checked={settings.emailPayments}
                        onChange={(e) => handleInputChange('emailPayments', e.target.checked)}
                        className="w-4 h-4 text-campus-blue focus:ring-campus-blue border-gray-300 rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Reviews and ratings</span>
                      <input
                        type="checkbox"
                        checked={settings.emailReviews}
                        onChange={(e) => handleInputChange('emailReviews', e.target.checked)}
                        className="w-4 h-4 text-campus-blue focus:ring-campus-blue border-gray-300 rounded"
                      />
                    </label>
                  </div>
                </div>

                {/* In-App Notifications */}
                <div className="border-t pt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <h4 className="font-medium text-gray-900">In-App Notifications</h4>
                  </div>
                  <div className="space-y-3 ml-7">
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">New proposals on my tasks</span>
                      <input
                        type="checkbox"
                        checked={settings.inAppProposals}
                        onChange={(e) => handleInputChange('inAppProposals', e.target.checked)}
                        className="w-4 h-4 text-campus-blue focus:ring-campus-blue border-gray-300 rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">New messages</span>
                      <input
                        type="checkbox"
                        checked={settings.inAppMessages}
                        onChange={(e) => handleInputChange('inAppMessages', e.target.checked)}
                        className="w-4 h-4 text-campus-blue focus:ring-campus-blue border-gray-300 rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Payment updates</span>
                      <input
                        type="checkbox"
                        checked={settings.inAppPayments}
                        onChange={(e) => handleInputChange('inAppPayments', e.target.checked)}
                        className="w-4 h-4 text-campus-blue focus:ring-campus-blue border-gray-300 rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Reviews and ratings</span>
                      <input
                        type="checkbox"
                        checked={settings.inAppReviews}
                        onChange={(e) => handleInputChange('inAppReviews', e.target.checked)}
                        className="w-4 h-4 text-campus-blue focus:ring-campus-blue border-gray-300 rounded"
                      />
                    </label>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <button 
                    onClick={() => handleSave('notifications')}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Notification Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Change Password */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={settings.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        className="input-field pr-10"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={settings.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      className="input-field"
                      placeholder="Enter new password"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 8 characters with letters and numbers
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={settings.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="input-field"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button 
                    onClick={() => handleSave('password')}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Update Password</span>
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="card">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-campus-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-campus-blue"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="input-field"
                  >
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="input-field"
                  >
                    <option value="UTC+8">UTC+8 (Beijing)</option>
                    <option value="UTC+0">UTC+0 (London)</option>
                    <option value="UTC-5">UTC-5 (New York)</option>
                    <option value="UTC-8">UTC-8 (Los Angeles)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Used for displaying deadlines and message timestamps
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Digest
                  </label>
                  <select
                    value={settings.emailDigest}
                    onChange={(e) => handleInputChange('emailDigest', e.target.value)}
                    className="input-field"
                  >
                    <option value="realtime">Real-time</option>
                    <option value="daily">Daily Summary</option>
                    <option value="weekly">Weekly Summary</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <div className="border-t pt-6">
                  <button 
                    onClick={() => handleSave('preferences')}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings

