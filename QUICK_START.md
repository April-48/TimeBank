# 🚀 TimeBank - Quick Start Guide

A comprehensive guide to get you up and running with the TimeBank platform quickly.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Key Concepts](#key-concepts)
6. [API Usage](#api-usage)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 16.0.0
- **npm** >= 7.0.0 or **yarn** >= 1.22.0
- **Git**
- A modern code editor (VS Code recommended)

### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

---

## 📦 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/TimeBank.git
cd TimeBank
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- React 18
- React Router DOM
- Tailwind CSS + DaisyUI
- TanStack Query
- React Hook Form + Zod
- MSW (Mock Service Worker)
- Lucide React icons
- And more...

### Step 3: Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3001`

### Step 4: Verify Installation

Open your browser and navigate to `http://localhost:3001`. You should see the TimeBank dashboard.

---

## 📁 Project Structure

```
TimeBank/
├── src/
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx
│   │   ├── auth/           # Authentication pages
│   │   ├── tasks/          # Task-related pages
│   │   ├── contracts/      # Contract pages
│   │   ├── messages/       # Messaging
│   │   └── ...
│   │
│   ├── components/         # Reusable components
│   │   ├── Layout.jsx      # Main layout
│   │   ├── ui/             # UI components
│   │   ├── pricing/        # Pricing components
│   │   └── ...
│   │
│   ├── lib/                # Utilities & configuration
│   │   ├── api/            # API client
│   │   ├── pricing/        # Pricing utilities
│   │   ├── constants.js    # Constants & enums
│   │   ├── utils.js        # Utility functions
│   │   ├── schemas.js      # Validation schemas
│   │   └── ...
│   │
│   ├── mocks/              # Mock data (MSW)
│   │   ├── handlers.js     # API handlers
│   │   └── data.js         # Mock data
│   │
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
│
├── public/                 # Static assets
├── package.json
├── vite.config.js          # Vite configuration
└── tailwind.config.js      # Tailwind configuration
```

---

## 🔄 Development Workflow

### Running the Development Server

```bash
npm run dev
```

- Hot Module Replacement (HMR) enabled
- Runs on port 3001 by default
- Mock API enabled via MSW

### Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 🎯 Key Concepts

### 1. Routing

The app uses React Router DOM v6 for routing:

```javascript
// src/App.jsx
<Routes>
  <Route path="/" element={<Layout><Dashboard /></Layout>} />
  <Route path="/tasks" element={<Layout><TaskList /></Layout>} />
  <Route path="/tasks/:id" element={<Layout><TaskDetail /></Layout>} />
  // ...
</Routes>
```

### 2. Data Fetching with TanStack Query

```javascript
import { useQuery } from '@tanstack/react-query'
import api from './lib/api'
import { QueryKeys } from './lib/constants'

// In your component
const { data, isLoading, error } = useQuery({
  queryKey: QueryKeys.tasks(),
  queryFn: () => api.tasks.list()
})
```

### 3. Form Validation with Zod

```javascript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema } from './lib/schemas'

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(taskSchema)
})
```

### 4. Mock API with MSW

All API calls are intercepted by MSW in development:

```javascript
// src/mocks/handlers.js
export const handlers = [
  http.get('/api/tasks', () => {
    return HttpResponse.json({
      success: true,
      data: mockTasks
    })
  }),
  // More handlers...
]
```

### 5. Styling with Tailwind CSS

```javascript
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Task Title</h2>
    <p>Task description...</p>
    <button className="btn btn-primary">Apply</button>
  </div>
</div>
```

---

## 🔌 API Usage

### API Client Structure

```javascript
// src/lib/api/client.js
export async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  })
  return response.json()
}
```

### API Endpoints

```javascript
// src/lib/api/index.js
const api = {
  tasks: {
    list: (params) => get('/tasks', params),
    get: (id) => get(`/tasks/${id}`),
    create: (data) => post('/tasks', data),
    update: (id, data) => put(`/tasks/${id}`, data),
  },
  proposals: {
    submit: (data) => post('/proposals', data),
    list: (params) => get('/proposals', params),
  },
  // More endpoints...
}
```

### Using APIs in Components

```javascript
import api from '../lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function TaskCreate() {
  const queryClient = useQueryClient()
  
  const createMutation = useMutation({
    mutationFn: api.tasks.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.tasks() })
      toast.success('Task created successfully')
    }
  })
  
  const handleSubmit = (data) => {
    createMutation.mutate(data)
  }
}
```

---

## 📝 Common Tasks

### Creating a New Page

1. Create the page component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Add navigation link in `src/components/Layout.jsx`

```javascript
// 1. src/pages/MyPage.jsx
export default function MyPage() {
  return <div>My Page Content</div>
}

// 2. src/App.jsx
import MyPage from './pages/MyPage'
<Route path="/my-page" element={<Layout><MyPage /></Layout>} />

// 3. src/components/Layout.jsx
const navigation = [
  // ...
  { name: 'My Page', href: '/my-page', icon: Icon }
]
```

### Adding a New API Endpoint

```javascript
// src/lib/api/index.js
const api = {
  // Existing endpoints...
  myResource: {
    list: (params) => get('/my-resource', params),
    get: (id) => get(`/my-resource/${id}`),
    create: (data) => post('/my-resource', data),
  }
}

// src/mocks/handlers.js
http.get('/api/my-resource', () => {
  return HttpResponse.json({
    success: true,
    data: mockData
  })
})
```

### Creating a Reusable Component

```javascript
// src/components/MyComponent.jsx
export default function MyComponent({ title, description, onAction }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onAction} className="btn-primary">
        Action
      </button>
    </div>
  )
}

// Usage in pages
import MyComponent from '../components/MyComponent'

<MyComponent 
  title="Hello"
  description="World"
  onAction={() => console.log('Clicked')}
/>
```

### Adding Form Validation

```javascript
// 1. Define Zod schema in src/lib/schemas.js
export const myFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old')
})

// 2. Use in component
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { myFormSchema } from './lib/schemas'

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(myFormSchema)
})

const onSubmit = (data) => {
  // Handle form submission
}

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('name')} />
    {errors.name && <p>{errors.name.message}</p>}
    
    <input {...register('email')} />
    {errors.email && <p>{errors.email.message}</p>}
    
    <input {...register('age', { valueAsNumber: true })} />
    {errors.age && <p>{errors.age.message}</p>}
    
    <button type="submit">Submit</button>
  </form>
)
```

---

## 🐛 Troubleshooting

### Port Already in Use

If port 3001 is already in use:

```bash
# Kill process on port 3001
npx kill-port 3001

# Or change port in vite.config.js
export default defineConfig({
  server: {
    port: 3002
  }
})
```

### Mock Service Worker Not Working

```bash
# Reinstall MSW
npm install msw --save-dev

# Copy service worker to public directory
npx msw init public/ --save
```

### Styling Not Applied

Make sure Tailwind is configured correctly:

```bash
# Rebuild Tailwind
npm run dev
```

Check `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

---

## 📚 Next Steps

- Read [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md) for detailed code examples
- Check [FINAL_DELIVERY.md](./FINAL_DELIVERY.md) for completed features
- Explore [TC_PRICING_GUIDE.md](./TC_PRICING_GUIDE.md) for pricing system details

---

## 🤝 Need Help?

- Check the [documentation](./README.md)
- Open an issue on GitHub
- Contact the development team

---

**Happy coding! 🚀**
