# TimeBank - 校园任务委托平台

一个类似 Upwork/Fiverr 的校园任务委托和技能交易平台，使用 React + Tailwind CSS 构建。

## 🎯 平台定位

**Requester（请求者）** 发布任务 → **Provider（应征者）** 提交报名 → 选择接受 → 生成合同 → 托管支付 → 交付验收 → 放款 → 双向评价

## ✨ 核心功能

### 🎫 任务系统
- **发布任务**: 标题、描述、预算、截止时间、所需技能
- **浏览筛选**: 关键词、技能、预算区间、截止时间、状态
- **任务详情**: 多标签页（概览、报名、消息、评价）
- **状态流转**: Draft → Open → Contracted → Completed/Cancelled

### 📝 报名系统  
- **提交报名**: 估算时长、报价、留言
- **编辑/撤回**: 仅 pending 状态可编辑
- **收件箱**: 请求者查看所有报名，对比筛选
- **接受/拒绝**: 生成合同或拒绝理由
- **限制规则**: 同任务单人仅 1 条有效报名

### 📄 合同系统
- **合同详情**: 双方信息、协议金额、时间线
- **状态管理**: Draft → Active → Delivered → Completed
- **交付物**: 上传/下载/审核
- **取消/争议**: 支持取消和争议流程

### 💰 支付系统（三段式）
- **Unfunded**: 合同创建，等待托管
- **Escrowed**: 请求者托管款项，Provider 开始工作
- **Released**: 验收通过，放款给 Provider
- **操作**: 托管、放款、退款

### 💬 消息系统
- **线程管理**: Task + 两个用户的一对一线程
- **实时聊天**: 文字、附件、系统消息
- **未读计数**: 实时更新
- **消息列表**: 按最后消息时间排序

### 💳 钱包系统
- **余额管理**: 可用余额 + 托管余额
- **交易记录**: 充值、托管、放款、退款
- **筛选导出**: 类型/状态筛选，CSV 导出
- **交易类型**: deposit, escrow_hold, release, refund

### ⭐ 评价系统
- **待评价列表**: 合同完成后开放
- **双向评价**: 评分（1-5星）+ 评语
- **一次性**: 每方向仅 1 条评价
- **公开展示**: 显示在用户资料页

### 👤 个人资料
- **公开资料**: 头像、简介、位置、时区
- **技能管理**: 技能名称、熟练度、年限
- **评分展示**: 平均分、评价数、成功率
- **完成项目**: 历史项目展示

### ⚙️ 设置
- **通知偏好**: 邮件/站内通知开关
- **安全设置**: 修改密码、两步验证
- **语言时区**: 多语言、时区选择

---

## 🏗️ 技术架构

### 前端技术栈
- **框架**: React 18
- **路由**: React Router DOM v6
- **样式**: Tailwind CSS + DaisyUI
- **图标**: Lucide React
- **构建**: Vite
- **数据获取**: TanStack Query (React Query)
- **表单**: React Hook Form + Zod
- **Mock API**: MSW (Mock Service Worker)

### 项目结构
```
TimeBank/
├── src/
│   ├── components/
│   │   ├── ui/              # 通用 UI 组件
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorAlert.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── Toast.jsx
│   │   ├── features/        # 领域组件（待添加）
│   │   ├── Layout.jsx       # 主布局
│   │   ├── StateFlow.jsx    # 状态流可视化
│   │   └── ...
│   │
│   ├── pages/               # 页面（按功能分组）
│   │   ├── Dashboard.jsx
│   │   ├── tasks/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskCreate.jsx
│   │   │   └── TaskDetail.jsx
│   │   ├── proposals/
│   │   │   ├── ProposalList.jsx
│   │   │   └── ProposalInbox.jsx
│   │   ├── contracts/
│   │   │   ├── ContractList.jsx
│   │   │   └── ContractDetail.jsx
│   │   ├── messages/
│   │   │   └── Messages.jsx
│   │   ├── wallet/
│   │   │   └── Wallet.jsx
│   │   ├── reviews/
│   │   │   └── Reviews.jsx
│   │   ├── profile/
│   │   │   └── Profile.jsx
│   │   ├── settings/
│   │   │   └── Settings.jsx
│   │   └── auth/
│   │       ├── Login.jsx
│   │       └── Register.jsx
│   │
│   ├── lib/                 # 核心库
│   │   ├── api/
│   │   │   ├── client.js    # HTTP 客户端
│   │   │   └── index.js     # API 端点定义
│   │   ├── constants.js     # 常量和枚举
│   │   ├── types.js         # 类型定义
│   │   ├── schemas.js       # 表单验证
│   │   ├── utils.js         # 工具函数
│   │   ├── toast.js         # Toast 系统
│   │   └── queryClient.js   # Query 配置
│   │
│   ├── mocks/               # Mock API
│   │   ├── data.js          # 种子数据
│   │   ├── handlers.js      # API 处理器
│   │   └── browser.js       # MSW 配置
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
│   └── mockServiceWorker.js # MSW Service Worker
│
├── QUICK_START.md           # 快速开始
├── FRONTEND_INFRASTRUCTURE.md
├── USAGE_EXAMPLES.md
├── PROJECT_STATUS.md
└── README.md
```

---

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

访问：http://localhost:3001

### 3. 查看文档
- **快速上手**: 阅读 [QUICK_START.md](./QUICK_START.md)
- **代码示例**: 阅读 [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md)
- **基础设施**: 阅读 [FRONTEND_INFRASTRUCTURE.md](./FRONTEND_INFRASTRUCTURE.md)
- **项目进度**: 阅读 [PROJECT_STATUS.md](./PROJECT_STATUS.md)

---

## 💻 开发指南

### API 调用
```javascript
import api from '@/lib/api'
import { TaskStatus } from '@/lib/constants'

// 获取任务列表
const tasks = await api.tasks.list({ status: TaskStatus.OPEN })

// 创建任务
const newTask = await api.tasks.create({
  title: 'Build a website',
  description: 'Need a modern responsive website...',
  budget: 50,
  deadline: '2024-02-01',
  skills: ['React', 'Tailwind'],
  category: 'Programming'
})
```

### 使用 Query
```javascript
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/lib/constants'

const { data, isLoading, error } = useQuery({
  queryKey: QueryKeys.tasks({ status: 'open' }),
  queryFn: () => api.tasks.list({ status: 'open' })
})
```

### 表单验证
```javascript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema } from '@/lib/schemas'

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(taskSchema)
})
```

### Toast 通知
```javascript
import toast from '@/lib/toast'

toast.success('Task created successfully!')
toast.error('Failed to save')
```

---

## 🎨 UI 组件

### 通用组件
```javascript
import {
  LoadingSpinner,
  ErrorAlert,
  EmptyState,
  StatusBadge,
  ConfirmDialog,
  Skeleton
} from '@/components/ui'

<LoadingSpinner size="md" text="Loading..." />
<ErrorAlert message="Error message" onRetry={refetch} />
<StatusBadge status={TaskStatus.OPEN} />
```

查看完整示例：[USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md)

---

## 🔧 配置

### 环境变量

**.env.development** (开发环境，使用 Mock)
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK=true
```

**.env.production** (生产环境，真实后端)
```
VITE_API_BASE_URL=https://api.timebank.com
VITE_USE_MOCK=false
```

---

## 🧪 测试 Mock API

打开浏览器控制台：

```javascript
// 登录
const result = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email: 'zhang@student.edu.cn', 
    password: '123456' 
  })
}).then(r => r.json())

// 获取任务
const tasks = await fetch('/api/tasks?status=open').then(r => r.json())
console.log(tasks)
```

---

## 📦 构建和部署

### 构建
```bash
npm run build
```

### 预览
```bash
npm run preview
```

### 部署
构建产物在 `dist/` 文件夹，可部署到：
- Vercel
- Netlify
- GitHub Pages
- 任何静态托管服务

---

## 🎯 开发路线图

### ✅ Phase 1: 基础设施（已完成）
- [x] 类型系统和常量
- [x] API 层和 Mock
- [x] TanStack Query 配置
- [x] UI 组件库
- [x] 表单验证

### 🔄 Phase 2: 核心功能（进行中）
- [x] Dashboard
- [x] TaskList
- [x] Login with validation
- [ ] 其他页面集成 API

### ⏳ Phase 3: 增强功能
- [ ] WebSocket 实时消息
- [ ] 文件上传
- [ ] 虚拟列表
- [ ] 暗黑模式

### ⏳ Phase 4: 生产就绪
- [ ] 后端对接
- [ ] E2E 测试
- [ ] 性能优化
- [ ] 安全加固

---

## 🤝 团队协作

### 前端开发
- 使用 Mock API 独立开发
- 遵循代码规范
- 提交前运行 lint
- 为新功能添加文档

### 后端对接
- 参考 `src/lib/types.js` 了解数据结构
- 参考 `src/mocks/handlers.js` 了解 API 行为
- 保持响应格式一致
- 提供 API 文档

---

## 📚 文档导航

| 文档 | 内容 | 适合人群 |
|------|------|----------|
| [QUICK_START.md](./QUICK_START.md) | 5分钟上手指南 | 新手 |
| [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md) | 代码示例和最佳实践 | 开发者 ⭐️ |
| [FRONTEND_INFRASTRUCTURE.md](./FRONTEND_INFRASTRUCTURE.md) | 架构详解 | 架构师 |
| [PROJECT_STATUS.md](./PROJECT_STATUS.md) | 进度和 TODO | 项目经理 |

---

## 🐛 故障排除

### 页面显示错误？
1. 检查浏览器控制台
2. 确认 MSW 已启动（应看到 `[MSW] Mocking enabled.`）
3. 查看 React Query Devtools

### API 调用失败？
1. 检查网络标签页
2. 确认 Mock handlers 已定义
3. 查看控制台错误信息

### 更多问题？
查看 [QUICK_START.md](./QUICK_START.md) 的故障排除部分

---

## 📊 特性对比

| 特性 | 当前状态 | 后端对接后 |
|------|----------|-----------|
| 任务 CRUD | ✅ Mock | ✅ 真实 |
| 报名提交 | ✅ Mock | ✅ 真实 |
| 合同管理 | ✅ Mock | ✅ 真实 |
| 支付流程 | ✅ UI 完整 | ✅ 真实支付 |
| 消息系统 | ✅ Mock | ✅ WebSocket |
| 文件上传 | ⏳ 待完成 | ✅ 真实上传 |
| 实时通知 | ⏳ 待完成 | ✅ WebSocket |

---

## 🌟 亮点特性

### 1. 🎯 **完全独立开发**
使用 MSW Mock，前端可以不依赖后端完全独立开发和测试。

### 2. 🔄 **无缝后端切换**
只需修改一个环境变量，从 Mock 切换到真实后端。

### 3. 🎨 **企业级 UI**
- 现代化设计
- 一致的状态指示
- 完善的加载/错误状态
- Toast 通知系统

### 4. 📝 **类型安全**
- 完整的 JSDoc 类型定义
- Zod schema 验证
- 易于迁移到 TypeScript

### 5. 🚀 **性能优化**
- TanStack Query 自动缓存
- 智能缓存失效
- 乐观更新支持

### 6. 🧪 **易于测试**
- Mock API 随时可用
- 组件隔离良好
- 易于编写单元测试

---

## 📞 联系和支持

- **文档**: 查看项目 `*.md` 文件
- **示例**: USAGE_EXAMPLES.md
- **问题**: 创建 GitHub Issue
- **讨论**: GitHub Discussions

---

## 📝 许可证

MIT License

---

**TimeBank** - 让技能有价，让时间有值！ 🎓✨

Made with ❤️ by the TimeBank Team
