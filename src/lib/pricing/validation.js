/**
 * Pricing Validation Utilities
 */

/**
 * Check if budget meets floor requirement
 * @param {number} budget 
 * @param {number} floor 
 * @returns {boolean}
 */
export function canPublish(budget, floor) {
  return budget >= floor
}

/**
 * Check if price is below P25 threshold
 * @param {number} price 
 * @param {number} p25 
 * @returns {boolean}
 */
export function isBelowP25(price, p25) {
  return price < p25
}

/**
 * Get pricing validation message
 * @param {number} budget 
 * @param {Object} recommendation 
 * @returns {string|null}
 */
export function getPricingValidationMessage(budget, recommendation) {
  if (!recommendation) return null
  
  if (!canPublish(budget, recommendation.floor)) {
    return `Price below platform minimum (${recommendation.floor} TC). Please increase to publish.`
  }
  
  if (isBelowP25(budget, recommendation.p25)) {
    return 'Current price is below 25th percentile for similar tasks. Expected acceptance rate may be lower.'
  }
  
  return null
}
