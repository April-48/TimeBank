import React, { useState } from 'react'
import { 
  TrendingUp, 
  Info, 
  CheckCircle, 
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { formatTimecoin } from '../../lib/utils'
import toast from '../../lib/toast'

/**
 * PricingCard Component - 推荐价格卡
 * @param {Object} props
 * @param {number} props.value - 当前价格
 * @param {Object|null} props.recommendation - 推荐数据
 * @param {function} props.onApply - 应用推荐价格回调
 * @param {function} props.onNudge - 微调回调
 * @param {boolean} props.disabled - 是否禁用
 */
export default function PricingCard({ 
  value, 
  recommendation, 
  onApply, 
  onNudge, 
  disabled = false 
}) {
  const [showDetails, setShowDetails] = useState(false)
  const [showLowConfidenceForm, setShowLowConfidenceForm] = useState(false)

  if (!recommendation) {
    return (
      <div className="card bg-gray-50">
        <div className="flex items-center space-x-2 text-gray-500">
          <Info className="w-4 h-4" />
          <span className="text-sm">Fill in task details to see price recommendation</span>
        </div>
      </div>
    )
  }

  const { p25, p50, p75, confidence, factors, floor, acceptanceProb } = recommendation
  const isBelowFloor = value < floor
  const isBelowP25 = value < p25

  // Confidence color
  const getConfidenceColor = (conf) => {
    switch (conf) {
      case 'high': return 'text-green-600 bg-green-100'
      case 'mid': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Acceptance rate color
  const getAcceptanceColor = (prob) => {
    if (prob >= 0.7) return 'bg-green-500'
    if (prob >= 0.4) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const handleApplyRecommendation = () => {
    onApply(p50)
    toast.success('Recommended price applied')
  }

  const handleApplyFloor = () => {
    onApply(floor)
    toast.success('Adjusted to minimum price')
  }

  const handleLowConfidenceSubmit = (data) => {
    if (onNudge) {
      onNudge(data)
      setShowLowConfidenceForm(false)
      toast.success('Price recommendation updated based on your input')
    }
  }

  return (
    <div className="card">
      <div className="space-y-4">
        {/* Price Recommendation Title */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recommended Price</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(confidence)}`}>
            Confidence: {confidence === 'high' ? 'High' : confidence === 'mid' ? 'Mid' : 'Low'}
          </span>
        </div>

        {/* Main Recommended Price */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {formatTimecoin(p50, false)} TC
            </div>
            <div className="text-sm text-blue-600 mt-1">
              Suggested Price (Range: {formatTimecoin(p25, false)}–{formatTimecoin(p75, false)})
            </div>
          </div>
          
          {/* Acceptance Rate Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Expected Acceptance Rate</span>
              <span>{Math.round(acceptanceProb * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getAcceptanceColor(acceptanceProb)}`}
                style={{ width: `${acceptanceProb * 100}%` }}
              />
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-4 flex space-x-2">
            <button
              onClick={handleApplyRecommendation}
              disabled={disabled}
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Apply Recommended Price</span>
            </button>
          </div>
        </div>

        {/* Floor Price Warning */}
        {isBelowFloor && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <div className="text-red-800 font-medium">
                  Price Below Platform Minimum
                </div>
                <div className="text-red-600 text-sm mt-1">
                  Current price {formatTimecoin(value, false)} TC, minimum required {formatTimecoin(floor, false)} TC
                </div>
                <button
                  onClick={handleApplyFloor}
                  className="mt-2 btn-primary bg-red-600 hover:bg-red-700"
                >
                  Apply Minimum Price
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Below P25 Warning */}
        {!isBelowFloor && isBelowP25 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div className="text-yellow-800 text-sm">
                Current price is below 25th percentile for similar tasks. Expected acceptance rate may be lower.
              </div>
            </div>
          </div>
        )}

        {/* Low Confidence Notice */}
        {confidence === 'low' && !showLowConfidenceForm && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <div className="text-blue-800 text-sm">
                  Low confidence in price recommendation. Answer a few questions for more accurate pricing.
                </div>
                <button
                  onClick={() => setShowLowConfidenceForm(true)}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Improve Recommendation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Low Confidence Form */}
        {showLowConfidenceForm && (
          <LowConfidenceForm 
            onSubmit={handleLowConfidenceSubmit}
            onCancel={() => setShowLowConfidenceForm(false)}
          />
        )}

        {/* Price Breakdown Details */}
        <div className="border-t pt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full text-left text-sm text-gray-600 hover:text-gray-800"
          >
            <span>Price Breakdown</span>
            {showDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showDetails && (
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price</span>
                <span className="font-medium">{formatTimecoin(factors.base, false)} TC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Skill Factor</span>
                <span className="font-medium">{factors.skill}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Complexity Factor</span>
                <span className="font-medium">{factors.complexity}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Urgency Factor</span>
                <span className="font-medium">{factors.urgency}x</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Floor Price</span>
                <span className="font-medium">{formatTimecoin(floor, false)} TC</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Low Confidence Form Component
 */
function LowConfidenceForm({ onSubmit, onCancel }) {
  const [complexity, setComplexity] = useState('medium')
  const [hasIntegration, setHasIntegration] = useState(false)
  const [specClarity, setSpecClarity] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      complexity,
      hasIntegration,
      spec: specClarity
    })
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="text-blue-800 font-medium mb-3">Improve Price Recommendation</h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-blue-800 mb-1">
            Task Complexity
          </label>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="input-field text-sm"
          >
            <option value="simple">Simple</option>
            <option value="medium">Medium</option>
            <option value="complex">Complex</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-800 mb-1">
            Requires Integration
          </label>
          <select
            value={hasIntegration}
            onChange={(e) => setHasIntegration(e.target.value === 'true')}
            className="input-field text-sm"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-800 mb-1">
            Requirements Clarity
          </label>
          <select
            value={specClarity}
            onChange={(e) => setSpecClarity(e.target.value)}
            className="input-field text-sm"
          >
            <option value="clear">Clear</option>
            <option value="medium">Medium</option>
            <option value="explore">Exploratory</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <button type="submit" className="btn-primary text-sm">
            Update Recommendation
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="btn-secondary text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
