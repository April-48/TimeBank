# TimeBank Frontend - Usage Examples

这份文档展示如何使用新的基础设施。

---

## 📦 导入和使用

### 1. API 调用

```javascript
import api from '@/lib/api'
import { TaskStatus } from '@/lib/constants'

// 获取任务列表
const tasks = await api.tasks.list({ 
  status: TaskStatus.OPEN,
  category: 'Programming' 
})

// 创建任务
const newTask = await api.tasks.create({
  title: 'Build a website',
  description: 'Need a modern website...',
  budget: 50,
  deadline: '2024-02-01',
  skills: ['React', 'Tailwind'],
  category: 'Programming'
})

// 提交报名
const proposal = await api.proposals.create({
  taskId: 123,
  estimatedHours: 40,
  bidAmount: 48,
  message: 'I can help...'
})

// 托管支付
await api.payments.escrow(contractId)
```

---

## 🎣 使用 TanStack Query

### 基础查询

```javascript
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { QueryKeys } from '@/lib/constants'
import { LoadingSpinner, ErrorAlert } from '@/components/ui'

function TaskList() {
  const { data, isLoading, error } = useQuery({
    queryKey: QueryKeys.tasks({ status: 'open' }),
    queryFn: () => api.tasks.list({ status: 'open' })
  })

  if (isLoading) return <LoadingSpinner text="Loading tasks..." />
  if (error) return <ErrorAlert message={getErrorMessage(error)} />

  return (
    <div>
      {data.data.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}
```

### Mutation 示例

```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { QueryKeys } from '@/lib/constants'
import toast from '@/lib/toast'

function TaskCreateForm() {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (taskData) => api.tasks.create(taskData),
    onSuccess: (newTask) => {
      // 失效相关查询缓存
      queryClient.invalidateQueries({ queryKey: QueryKeys.tasks() })
      queryClient.invalidateQueries({ queryKey: QueryKeys.dashboard() })
      
      // 显示成功提示
      toast.success('Task created successfully!')
      
      // 导航到新任务
      navigate(`/tasks/${newTask.id}`)
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })

  const onSubmit = (data) => {
    createMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
      <button 
        type="submit" 
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  )
}
```

### 乐观更新示例

```javascript
const sendMessageMutation = useMutation({
  mutationFn: ({ threadId, content }) => 
    api.messages.sendMessage(threadId, { content }),
  
  // 乐观更新
  onMutate: async ({ threadId, content }) => {
    // 取消正在进行的查询
    await queryClient.cancelQueries({ 
      queryKey: QueryKeys.threadMessages(threadId) 
    })

    // 获取当前数据快照
    const previousMessages = queryClient.getQueryData(
      QueryKeys.threadMessages(threadId)
    )

    // 乐观更新 UI
    queryClient.setQueryData(
      QueryKeys.threadMessages(threadId),
      (old) => [
        ...old,
        {
          id: 'temp-' + Date.now(),
          threadId,
          senderId: currentUser.id,
          content,
          type: 'text',
          isRead: false,
          createdAt: new Date().toISOString(),
          sender: currentUser
        }
      ]
    )

    // 返回上下文用于回滚
    return { previousMessages }
  },

  onError: (error, variables, context) => {
    // 回滚到之前的状态
    queryClient.setQueryData(
      QueryKeys.threadMessages(variables.threadId),
      context.previousMessages
    )
    toast.error('Failed to send message')
  },

  onSettled: (data, error, variables) => {
    // 无论成功失败，重新获取数据确保同步
    queryClient.invalidateQueries({ 
      queryKey: QueryKeys.threadMessages(variables.threadId) 
    })
  }
})
```

---

## 📝 表单验证

### 使用 React Hook Form + Zod

```javascript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema } from '@/lib/schemas'

function TaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      budget: '',
      deadline: '',
      skills: [],
      category: 'programming'
    }
  })

  const onSubmit = (data) => {
    console.log('Valid data:', data)
    // data is fully validated and type-safe
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <div>
        <label>Task Title</label>
        <input
          type="text"
          {...register('title')}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <span className="text-red-600 text-sm">
            {errors.title.message}
          </span>
        )}
      </div>

      {/* Budget (auto-converts string to number) */}
      <div>
        <label>Budget</label>
        <input
          type="number"
          {...register('budget', { valueAsNumber: true })}
          className={errors.budget ? 'border-red-500' : ''}
        />
        {errors.budget && (
          <span className="text-red-600 text-sm">
            {errors.budget.message}
          </span>
        )}
      </div>

      {/* Skills (array field) */}
      <div>
        <label>Skills</label>
        <SkillSelector
          value={watch('skills')}
          onChange={(skills) => setValue('skills', skills)}
        />
        {errors.skills && (
          <span className="text-red-600 text-sm">
            {errors.skills.message}
          </span>
        )}
      </div>

      <button type="submit">Create Task</button>
    </form>
  )
}
```

---

## 🎨 使用 UI 组件

### StatusBadge

```javascript
import { StatusBadge } from '@/components/ui'
import { TaskStatus } from '@/lib/constants'

<StatusBadge status={TaskStatus.OPEN} size="md" />
<StatusBadge status={PaymentPhase.ESCROWED} size="sm" />
```

### LoadingSpinner

```javascript
import { LoadingSpinner } from '@/components/ui'

// Inline
<LoadingSpinner size="md" text="Loading tasks..." />

// Full screen
<LoadingSpinner size="lg" text="Loading..." fullScreen />
```

### ErrorAlert

```javascript
import { ErrorAlert } from '@/components/ui'

<ErrorAlert 
  message="Failed to load tasks" 
  onRetry={() => refetch()}
  variant="error"
/>
```

### EmptyState

```javascript
import { EmptyState } from '@/components/ui'
import { FileText } from 'lucide-react'

<EmptyState
  icon={FileText}
  title="No tasks found"
  description="You haven't created any tasks yet. Create your first task to get started!"
  action={{
    label: 'Create Task',
    to: '/tasks/new'
  }}
/>
```

### Toast Notifications

```javascript
import toast from '@/lib/toast'

// Simple messages
toast.success('Task created successfully!')
toast.error('Failed to save')
toast.warning('This action cannot be undone')
toast.info('New message received')

// With promise
toast.promise(
  api.tasks.create(taskData),
  {
    loading: 'Creating task...',
    success: 'Task created!',
    error: 'Failed to create task'
  }
)

// Manual control
const toastId = toast.success('Processing...', { duration: 0 })
// Later...
toast.remove(toastId)
```

### ConfirmDialog

```javascript
import { useState } from 'react'
import { ConfirmDialog } from '@/components/ui'

function DeleteButton({ taskId }) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    await api.tasks.delete(taskId)
    toast.success('Task deleted')
  }

  return (
    <>
      <button onClick={() => setShowConfirm(true)}>
        Delete
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        description="Are you sure? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </>
  )
}
```

---

## 🔧 工具函数使用

### 格式化

```javascript
import { 
  formatTimecoin, 
  formatMinutes, 
  formatDate,
  formatRelativeTime,
  getDaysLeft 
} from '@/lib/utils'

// 金额
formatTimecoin(50)  // "50.00 TC"
formatTimecoin(50, false)  // "50.00"

// 时间
formatMinutes(150)  // "2h 30m"
formatMinutes(45)   // "45m"

// 日期
formatDate(new Date())  // "Jan 20, 2024"
formatDate(new Date(), { includeTime: true })  // "Jan 20, 2024, 10:30 AM"
formatDate(new Date(), { relative: true })  // "2 hours ago"

// 截止时间
const daysLeft = getDaysLeft('2024-02-01')  // 12
```

### 验证

```javascript
import { isValidEmail, validatePassword, isValidAmount } from '@/lib/utils'

isValidEmail('test@example.com')  // true
isValidEmail('invalid')  // false

const pwdCheck = validatePassword('weak')
// { valid: false, message: 'Password must be at least 8 characters' }

isValidAmount(50, 1, 100)  // true
```

### 状态检查

```javascript
import { 
  canTaskReceiveProposals,
  canEscrowPayment,
  canReleasePayment 
} from '@/lib/utils'

// 根据状态控制 UI
const canSubmit = canTaskReceiveProposals(task.status)

<button disabled={!canSubmit}>
  Submit Proposal
</button>

// 支付按钮控制
{canEscrowPayment(payment.phase, contract.status) && (
  <button onClick={handleEscrow}>
    Escrow Payment
  </button>
)}

{canReleasePayment(payment.phase, contract.status) && (
  <button onClick={handleRelease}>
    Release Payment
  </button>
)}
```

---

## 🎯 完整示例：创建任务页面

```javascript
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskSchema } from '@/lib/schemas'
import api from '@/lib/api'
import { QueryKeys } from '@/lib/constants'
import toast from '@/lib/toast'
import { getErrorMessage } from '@/lib/utils'
import { LoadingSpinner } from '@/components/ui'

function TaskCreate() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(taskSchema)
  })

  const createMutation = useMutation({
    mutationFn: (taskData) => api.tasks.create(taskData),
    onSuccess: (newTask) => {
      // 失效缓存
      queryClient.invalidateQueries({ queryKey: QueryKeys.tasks() })
      queryClient.invalidateQueries({ queryKey: QueryKeys.dashboard() })
      
      // 显示成功提示
      toast.success('Task created successfully!')
      
      // 跳转到任务详情
      navigate(`/tasks/${newTask.id}`)
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })

  const onSubmit = (data) => {
    createMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input
          {...register('title')}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && <span className="text-red-600">{errors.title.message}</span>}
      </div>

      <div>
        <label>Budget (TC)</label>
        <input
          type="number"
          {...register('budget', { valueAsNumber: true })}
          className={errors.budget ? 'border-red-500' : ''}
        />
        {errors.budget && <span className="text-red-600">{errors.budget.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={createMutation.isPending}
        className="btn-primary"
      >
        {createMutation.isPending ? (
          <>
            <LoadingSpinner size="sm" />
            Creating...
          </>
        ) : (
          'Create Task'
        )}
      </button>
    </form>
  )
}
```

---

## 🔄 完整流程示例：提交报名

```javascript
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '@/lib/api'
import { QueryKeys } from '@/lib/constants'
import { proposalSchema } from '@/lib/schemas'
import toast from '@/lib/toast'
import { LoadingSpinner, ErrorAlert, EmptyState, ConfirmDialog } from '@/components/ui'
import { canTaskReceiveProposals, getErrorMessage } from '@/lib/utils'

function TaskDetailWithProposal() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false)

  // 获取任务详情
  const { data: task, isLoading, error } = useQuery({
    queryKey: QueryKeys.task(id),
    queryFn: () => api.tasks.get(id)
  })

  // 获取我的报名
  const { data: myProposals } = useQuery({
    queryKey: QueryKeys.myProposals({ taskId: id }),
    queryFn: () => api.proposals.myProposals({ taskId: id })
  })

  const myProposal = myProposals?.find(p => p.status === 'pending')

  // 表单
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(proposalSchema)
  })

  // 提交报名
  const submitMutation = useMutation({
    mutationFn: (data) => api.proposals.create({ ...data, taskId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.myProposals() })
      queryClient.invalidateQueries({ queryKey: QueryKeys.task(id) })
      toast.success('Proposal submitted successfully!')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })

  // 撤回报名
  const withdrawMutation = useMutation({
    mutationFn: () => api.proposals.withdraw(myProposal.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.myProposals() })
      toast.success('Proposal withdrawn')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })

  if (isLoading) return <LoadingSpinner fullScreen text="Loading task..." />
  if (error) return <ErrorAlert message={getErrorMessage(error)} />

  const canSubmit = canTaskReceiveProposals(task.status) && !myProposal

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>

      {/* 提交报名 */}
      {canSubmit && (
        <form onSubmit={handleSubmit((data) => submitMutation.mutate(data))}>
          <input
            type="number"
            {...register('estimatedHours', { valueAsNumber: true })}
            placeholder="Estimated hours"
          />
          {errors.estimatedHours && (
            <span className="text-red-600">{errors.estimatedHours.message}</span>
          )}

          <input
            type="number"
            {...register('bidAmount', { valueAsNumber: true })}
            placeholder="Your bid (TC)"
          />
          {errors.bidAmount && (
            <span className="text-red-600">{errors.bidAmount.message}</span>
          )}

          <textarea {...register('message')} placeholder="Cover letter" />
          {errors.message && (
            <span className="text-red-600">{errors.message.message}</span>
          )}

          <button type="submit" disabled={submitMutation.isPending}>
            {submitMutation.isPending ? 'Submitting...' : 'Submit Proposal'}
          </button>
        </form>
      )}

      {/* 已提交 - 显示编辑/撤回 */}
      {myProposal && (
        <div className="bg-green-50 p-4 rounded">
          <p>You have submitted a proposal</p>
          <button onClick={() => setShowWithdrawConfirm(true)}>
            Withdraw
          </button>
        </div>
      )}

      {/* 确认对话框 */}
      <ConfirmDialog
        isOpen={showWithdrawConfirm}
        onClose={() => setShowWithdrawConfirm(false)}
        onConfirm={() => withdrawMutation.mutate()}
        title="Withdraw Proposal"
        description="Are you sure you want to withdraw your proposal?"
        confirmText="Withdraw"
        variant="danger"
      />
    </div>
  )
}
```

---

## 🎭 测试你的 Mock API

在浏览器控制台试试：

```javascript
import api from '@/lib/api'

// 登录
const result = await api.auth.login({ 
  email: 'zhang@student.edu.cn', 
  password: '123456' 
})
console.log('Login result:', result)

// 获取任务
const tasks = await api.tasks.list({ status: 'open' })
console.log('Tasks:', tasks)

// 创建任务
const newTask = await api.tasks.create({
  title: 'Test Task',
  description: 'This is a test task with enough characters',
  budget: 50,
  deadline: '2024-03-01',
  skills: ['JavaScript', 'React'],
  category: 'Programming'
})
console.log('New task:', newTask)
```

---

## 🚀 切换到真实后端

**Step 1: 创建 `.env.development` 和 `.env.production`**

```bash
# .env.development (使用 Mock)
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK=true

# .env.production (真实后端)
VITE_API_BASE_URL=https://api.timebank.com
VITE_USE_MOCK=false
```

**Step 2: 更新 `main.jsx`**

```javascript
async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const { worker } = await import('./mocks/browser')
    return worker.start()
  }
}
```

**Step 3: 部署时环境变量设置为生产模式**

完成！所有 API 调用会自动切换到真实后端。

---

## 📚 更多资源

- [TanStack Query文档](https://tanstack.com/query/latest)
- [React Hook Form文档](https://react-hook-form.com/)
- [Zod文档](https://zod.dev/)
- [MSW文档](https://mswjs.io/)

---

需要帮助？查看 `FRONTEND_INFRASTRUCTURE.md` 或询问开发团队！

