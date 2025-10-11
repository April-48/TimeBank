/**
 * Pricing Internationalization
 * 定价相关文案
 */

export const i18nPricing = {
  noFee: '平台不收取佣金；可能存在通道/网络手续费。',
  
  recTitle: '推荐价格',
  recLine: (p50, p25, p75) => `建议 ${p50} TC（区间 ${p25}–${p75}）`,
  
  confidence: {
    low: '置信度 低',
    mid: '置信度 中', 
    high: '置信度 高'
  },
  
  adopt: '采用推荐价格',
  
  belowP25: '当前价格低于同类任务 25% 分位，预计接受率较低。',
  belowFloor: (floor) => `价格低于平台最低标准（${floor} TC），请调高后发布。`,
  
  improved: '已根据你的回答调整推荐价格',
  
  // 任务类型
  categories: {
    Programming: '编程开发',
    Design: '设计',
    Writing: '写作',
    Translation: '翻译',
    Marketing: '营销',
    Academic: '学术',
    Other: '其他'
  },
  
  // 复杂度
  complexity: {
    simple: '简单',
    medium: '标准',
    complex: '复杂'
  },
  
  // 紧急度
  urgency: {
    normal: '普通',
    urgent: '紧急',
    rush: '加急'
  },
  
  // 技能溢价
  skillPremium: {
    title: '高需求技能',
    skills: ['AI/ML', 'Blockchain', 'React', 'Rust'],
    multiplier: '1.2x'
  }
}
