/**
 * Pricing Types and Models
 * Type definitions for pricing system
 */

/**
 * @typedef {('simple' | 'medium' | 'complex')} ComplexityLevel
 */

/**
 * @typedef {('low' | 'mid' | 'high')} ConfidenceLevel
 */

/**
 * @typedef {Object} RecommendInput
 * @property {string} category
 * @property {string[]} skills
 * @property {ComplexityLevel} complexity
 * @property {('normal' | 'urgent' | 'rush')} urgency
 * @property {Object} [autoSignals]
 * @property {boolean} [autoSignals.hasIntegration]
 * @property {('clear'|'medium'|'explore')} [autoSignals.specClarity]
 * @property {number} [sampleCount]
 */

/**
 * @typedef {Object} PricingRecommendation
 * @property {number} p25
 * @property {number} p50
 * @property {number} p75
 * @property {ConfidenceLevel} confidence
 * @property {Object} factors
 * @property {number} factors.base
 * @property {number} factors.skill
 * @property {number} factors.complexity
 * @property {number} factors.urgency
 * @property {number} floor
 * @property {number} acceptanceProb
 */

/**
 * @typedef {Object} TaskPricingState
 * @property {number} budget
 * @property {PricingRecommendation} [recommendation]
 * @property {boolean} [pricingOverridden]
 */

/**
 * @typedef {Object} PricingCardProps
 * @property {number} value
 * @property {PricingRecommendation | null} recommendation
 * @property {function(number): void} onApply
 * @property {function(Partial<{complexity: ComplexityLevel, hasIntegration: boolean, spec: 'clear'|'medium'|'explore'}>): void} [onNudge]
 * @property {boolean} [disabled]
 */

// Export empty object to make this a module
export {}
