# 🚀 TimeBank Frontend - 快速开始

## 5 分钟上手指南

### 1. 启动开发服务器

```bash
cd TimeBank
npm install  # 如果还没安装
npm run dev
```

访问：http://localhost:3001

### 2. 测试 Mock API

打开浏览器控制台，尝试登录：

```javascript
// 方式 1: 直接使用 API（推荐）
import api from '/src/lib/api/index.js'

const result = await api.auth.login({
  email: 'zhang@student.edu.cn',
  password: '123456'
})
console.log('Login result:', result)

// 方式 2: 使用 fetch
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email: 'zhang@student.edu.cn', 
    password: '123456' 
  })
})
const data = await response.json()
console.log(data)
```

### 3. 查看 React Query Devtools

点击屏幕左下角的 React Query logo 图标，可以看到：
- ✅ 所有查询的状态
- ✅ 缓存的数据
- ✅ 查询的执行时间
- ✅ 失效和重新获取的历史

---

## 📚 项目文档导航

### 🎯 必读文档（按顺序）：

1. **README.md** - 项目概览和功能说明
2. **FRONTEND_INFRASTRUCTURE.md** - 基础设施详解
3. **USAGE_EXAMPLES.md** - 代码示例（⭐️ 最重要）
4. **PROJECT_STATUS.md** - 当前进度和 TODO

### 📖 快速查找：

需要... | 查看文档 | 文件位置
--- | --- | ---
调用 API | USAGE_EXAMPLES.md § API 调用 | `src/lib/api/`
使用 Query | USAGE_EXAMPLES.md § TanStack Query | 任意页面
表单验证 | USAGE_EXAMPLES.md § 表单验证 | `src/lib/schemas.js`
状态常量 | FRONTEND_INFRASTRUCTURE.md | `src/lib/constants.js`
工具函数 | FRONTEND_INFRASTRUCTURE.md | `src/lib/utils.js`
UI 组件 | USAGE_EXAMPLES.md § UI 组件 | `src/components/ui/`
Mock 数据 | N/A | `src/mocks/data.js`

---

## 🔍 常见任务

### 添加新页面

```javascript
// 1. 创建页面文件
// src/pages/myfeature/MyPage.jsx

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { QueryKeys } from '@/lib/constants'
import { LoadingSpinner, ErrorAlert } from '@/components/ui'

function MyPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: QueryKeys.myFeature(),
    queryFn: () => api.myFeature.list()
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorAlert message={getErrorMessage(error)} />

  return <div>{/* your content */}</div>
}

export default MyPage

// 2. 添加到路由
// src/App.jsx
import MyPage from './pages/myfeature/MyPage'

<Route path="/my-feature" element={<Layout><MyPage /></Layout>} />

// 3. 添加导航链接
// src/components/Layout.jsx
{ name: 'My Feature', href: '/my-feature', icon: Star }
```

### 添加新 API 端点

```javascript
// 1. 在 src/lib/api/index.js 中添加
export const myFeatureApi = {
  list: (filters) => get('/my-feature', filters),
  get: (id) => get(`/my-feature/${id}`),
  create: (data) => post('/my-feature', data),
  update: (id, data) => put(`/my-feature/${id}`, data),
  delete: (id) => del(`/my-feature/${id}`)
}

// 添加到 default export
export default {
  // ...existing
  myFeature: myFeatureApi
}

// 2. 在 src/lib/constants.js 中添加 Query Key
export const QueryKeys = {
  // ...existing
  myFeature: (filters) => ['myFeature', filters],
  myFeatureItem: (id) => ['myFeature', id]
}

// 3. 在 src/mocks/handlers.js 中添加 Mock
http.get(`${API_BASE}/my-feature`, () => {
  return success([/* mock data */])
})
```

### 添加表单验证

```javascript
// 1. 在 src/lib/schemas.js 中添加 schema
import { z } from 'zod'

export const myFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  date: z.string().refine(val => new Date(val) > new Date(), {
    message: 'Date must be in the future'
  })
})

// 2. 在组件中使用
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { myFormSchema } from '@/lib/schemas'

const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm({
  resolver: zodResolver(myFormSchema)
})
```

---

## 🎨 UI 组件使用速查

```javascript
import {
  LoadingSpinner,
  ErrorAlert,
  EmptyState,
  StatusBadge,
  ConfirmDialog,
  Skeleton,
  Toast
} from '@/components/ui'

// 加载
<LoadingSpinner size="md" text="Loading..." />

// 错误
<ErrorAlert message="Something went wrong" onRetry={refetch} />

// 空状态
<EmptyState 
  icon={FileText}
  title="No data"
  description="..."
  action={{ label: 'Add', to: '/new' }}
/>

// 状态徽章
<StatusBadge status={TaskStatus.OPEN} />

// 骨架屏
<Skeleton variant="card" count={3} />

// Toast
import toast from '@/lib/toast'
toast.success('Saved!')
toast.error('Failed')
```

---

## 🔧 开发工具

### VS Code 扩展推荐：
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Error Lens

### 浏览器扩展：
- React Developer Tools
- TanStack Query Devtools（内置）

---

## ⚡ 性能提示

### DO ✅
```javascript
// 使用常量
import { TaskStatus } from '@/lib/constants'
if (task.status === TaskStatus.OPEN) {}

// 使用工具函数
import { formatTimecoin } from '@/lib/utils'
<span>{formatTimecoin(amount)}</span>

// 使用 Query Keys
queryClient.invalidateQueries({ queryKey: QueryKeys.tasks() })
```

### DON'T ❌
```javascript
// 硬编码字符串
if (task.status === 'open') {}

// 内联格式化
<span>{amount.toFixed(2)} TC</span>

// 字符串 query key
queryClient.invalidateQueries({ queryKey: ['tasks'] })
```

---

## 🆘 故障排除

### 问题：页面显示 "Loading..." 永远不结束

**解决**：
1. 打开浏览器控制台查看网络请求
2. 确认 MSW 是否启动（应该看到 `[MSW] Mocking enabled.`）
3. 检查 Query Key 是否正确

### 问题：表单验证不工作

**解决**：
1. 确认使用了 `zodResolver(schema)`
2. 检查 schema 定义是否正确
3. 查看 `errors` 对象内容

### 问题：Mutation 不更新 UI

**解决**：
```javascript
onSuccess: () => {
  // 确保失效相关查询
  queryClient.invalidateQueries({ queryKey: QueryKeys.tasks() })
}
```

---

## 📞 联系方式

有问题？
- 查看文档：`*.md` 文件
- 检查代码示例：`USAGE_EXAMPLES.md`
- 查看 Mock 数据：`src/mocks/data.js`

---

**Happy Coding! 🎉**

