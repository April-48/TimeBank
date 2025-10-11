/**
 * Pricing Engine - Frontend placeholder implementation
 * Will be replaced with backend integration
 */

/**
 * Round to nearest unit
 * @param {number} x 
 * @param {number} unit 
 * @returns {number}
 */
export function roundUnit(x, unit = 1) {
  return Math.round(x / unit) * unit
}

/**
 * Calculate skill factor based on skills
 * @param {string[]} skills 
 * @returns {number}
 */
const skillFactor = (skills) => {
  const premium = ['AI/ML', 'Blockchain', 'React', 'Rust']
  const hit = skills.some(s => premium.includes(s))
  return hit ? 1.2 : 1.0
}

/**
 * Calculate complexity factor
 * @param {('simple'|'medium'|'complex')} complexity 
 * @returns {number}
 */
const complexityFactor = (complexity) => {
  const factors = { simple: 0.9, medium: 1.0, complex: 1.5 }
  return factors[complexity] || 1.0
}

/**
 * Calculate urgency factor
 * @param {('normal'|'urgent'|'rush')} urgency 
 * @returns {number}
 */
const urgencyFactor = (urgency) => {
  const factors = { normal: 1.0, urgent: 1.2, rush: 1.4 }
  return factors[urgency] || 1.0
}

/**
 * Mock pricing recommendation (placeholder for backend)
 * @param {Object} input 
 * @returns {Object}
 */
export function mockRecommend(input) {
  // Placeholder: category mean table + factor synthesis (backend integration later)
  const categoryBase = {
    Programming: { median: 80, iqr: 40, floor: 30 },
    Design: { median: 60, iqr: 30, floor: 20 },
    Writing: { median: 40, iqr: 20, floor: 15 },
    Translation: { median: 50, iqr: 30, floor: 20 },
    Marketing: { median: 60, iqr: 30, floor: 25 },
    Academic: { median: 80, iqr: 40, floor: 30 },
    Other: { median: 50, iqr: 30, floor: 20 },
  }
  
  const base = categoryBase[input.category] || categoryBase.Other
  const fSkill = skillFactor(input.skills)
  const fComplex = complexityFactor(input.complexity)
  const fUrgency = urgencyFactor(input.urgency)
  const factor = fSkill * fComplex * fUrgency

  const p50 = roundUnit(base.median * factor, 1)
  const p25 = roundUnit((base.median - 0.5 * base.iqr) * factor, 1)
  const p75 = roundUnit((base.median + 0.5 * base.iqr) * factor, 1)
  const floor = roundUnit(base.floor * fComplex, 1)
  const acceptanceProb = Math.max(0.05, Math.min(0.95, (p50 - floor) / (p75 - floor + 1e-6)))

  const n = input.sampleCount || 0
  const confidence = n < 10 ? 'low' : n < 30 ? 'mid' : 'high'

  return {
    p25,
    p50,
    p75,
    confidence,
    factors: { 
      base: base.median, 
      skill: fSkill, 
      complexity: fComplex, 
      urgency: fUrgency 
    },
    floor,
    acceptanceProb
  }
}
