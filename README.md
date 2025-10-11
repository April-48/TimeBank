# TimeBank - Campus Task Marketplace

A campus task delegation and skill trading platform similar to Upwork/Fiverr, built with React + Tailwind CSS.

## 🎯 Platform Overview

**Requester** publishes task → **Provider** submits proposal → Accept proposal → Generate contract → Escrow payment → Deliver & review → Release payment → Mutual reviews

## ✨ Core Features

### 🎫 Task System
- **Post Tasks**: Title, description, budget, deadline, required skills
- **Browse & Filter**: Keywords, skills, budget range, deadline, status
- **Task Details**: Multi-tab view (Overview, Proposals, Messages, Reviews)
- **Status Flow**: Draft → Open → Contracted → Completed/Cancelled

### 📝 Proposal System  
- **Submit Proposals**: Estimated hours, bid amount, cover letter
- **Edit/Withdraw**: Only possible in pending status
- **Inbox**: Requester views all proposals, compare and filter
- **Accept/Reject**: Generate contract or provide rejection reason
- **Restriction**: One valid proposal per person per task

### 📄 Contract System
- **Contract Details**: Party information, agreed amount, timeline
- **Status Management**: Draft → Active → Delivered → Completed
- **Deliverables**: Upload/download/review
- **Cancel/Dispute**: Support cancellation and dispute workflows

### 💰 Payment System (3-Phase)
- **Unfunded**: Contract created, awaiting escrow
- **Escrowed**: Requester escrows payment, provider starts work
- **Released**: Approved delivery, payment released to provider
- **Actions**: Escrow, release, refund

### 💬 Messaging System
- **Thread Management**: Task + two-user one-on-one threads
- **Real-time Chat**: Text, attachments, system messages
- **Unread Count**: Real-time updates
- **Message List**: Sorted by last message time

### 💳 Wallet System
- **Balance Management**: Available balance + escrowed balance
- **Transaction History**: Deposits, escrows, releases, refunds
- **Filter & Export**: Type/status filtering, CSV export
- **Transaction Types**: deposit, escrow_hold, release, refund

### ⭐ Review System
- **Pending Reviews**: Opens after contract completion
- **Mutual Reviews**: Rating (1-5 stars) + comment
- **One-time**: One review per direction
- **Public Display**: Shows on user profile pages

### 👤 User Profile
- **Public Profile**: Avatar, bio, location, timezone
- **Skill Management**: Skill name, proficiency, years of experience
- **Rating Display**: Average score, review count, success rate
- **Completed Projects**: Historical project showcase

### ⚙️ Settings
- **Notification Preferences**: Email/in-app notification toggles
- **Security Settings**: Change password, two-factor authentication
- **Language & Timezone**: Multi-language, timezone selection

---

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: React 18
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS + DaisyUI
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Mock API**: MSW (Mock Service Worker)

### Project Structure
```
TimeBank/
├── src/
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx   # Dashboard
│   │   ├── auth/           # Auth pages (Login, Register)
│   │   ├── tasks/          # Task pages (List, Detail, Create)
│   │   ├── proposals/      # Proposal pages (List, Inbox)
│   │   ├── contracts/      # Contract pages (List, Detail)
│   │   ├── messages/       # Messages page
│   │   ├── wallet/         # Wallet & transactions
│   │   ├── reviews/        # Reviews page
│   │   ├── profile/        # User profile
│   │   └── settings/       # Settings page
│   │
│   ├── components/         # Reusable components
│   │   ├── Layout.jsx      # Main layout with sidebar
│   │   ├── TaskCard.jsx    # Task card component
│   │   ├── ProposalCard.jsx
│   │   ├── ContractCard.jsx
│   │   ├── StateFlow.jsx   # State flow visualization
│   │   ├── ui/             # UI components
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorAlert.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── Toast.jsx
│   │   └── pricing/        # Pricing components
│   │       └── PricingCard.jsx
│   │
│   ├── lib/                # Utilities and config
│   │   ├── api/            # API client
│   │   │   ├── client.js   # HTTP client
│   │   │   └── index.js    # API endpoints
│   │   ├── pricing/        # Pricing utilities
│   │   │   ├── engine.js   # Pricing calculation
│   │   │   └── validation.js
│   │   ├── constants.js    # App constants & enums
│   │   ├── types.js        # JSDoc type definitions
│   │   ├── utils.js        # Utility functions
│   │   ├── schemas.js      # Zod validation schemas
│   │   ├── queryClient.js  # React Query config
│   │   └── toast.js        # Toast notification system
│   │
│   ├── mocks/              # MSW mock data
│   │   ├── browser.js      # MSW setup
│   │   ├── handlers.js     # Request handlers
│   │   └── data.js         # Mock data
│   │
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
│
├── public/                 # Static assets
├── docs/                   # Documentation
└── package.json
```

### Key Design Patterns

#### 1. API Layer
```javascript
// Centralized API client
import api from './lib/api'

// Usage in components
const { data, isLoading } = useQuery({
  queryKey: QueryKeys.tasks(),
  queryFn: () => api.tasks.list()
})
```

#### 2. Form Validation
```javascript
// Zod schema + React Hook Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema } from './lib/schemas'

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(taskSchema)
})
```

#### 3. State Management
```javascript
// TanStack Query for server state
// Query Keys for cache management
export const QueryKeys = {
  tasks: (params) => ['tasks', params],
  task: (id) => ['task', id],
  // ...
}
```

#### 4. Error Handling
```javascript
// Unified error handling
try {
  await api.tasks.create(data)
  toast.success('Task created successfully')
} catch (error) {
  toast.error(getErrorMessage(error))
}
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/TimeBank.git
cd TimeBank

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3001`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 📋 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🎨 UI Components

### Base Components (DaisyUI)
- Buttons, Inputs, Cards, Modals, Tabs, Badges
- Dropdown, Toast, Loading, Avatar

### Custom Components
- **TaskCard**: Task display card
- **ProposalCard**: Proposal display card
- **ContractCard**: Contract summary card
- **StateFlow**: Visual state flow diagram
- **StatusBadge**: Dynamic status badge
- **PricingCard**: Price recommendation card

---

## 🔑 Key Features Implementation

### 1. Pricing System
- **Fixed Pricing**: No negotiation, accept or decline
- **Price Recommendation**: Smart pricing based on category, skills, complexity
- **Floor Price**: Minimum price validation
- **No Platform Fee**: Provider receives full amount

### 2. Mock Backend (MSW)
- Intercepts API requests in development
- Returns realistic mock data
- Simulates network delays and errors
- Easy transition to real backend

### 3. Form Validation
- Zod schemas for type-safe validation
- React Hook Form for form state management
- Real-time field validation
- Detailed error messages

### 4. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Adaptive layouts

---

## 📊 Data Models

### User
```javascript
{
  id, name, email, avatar, bio, 
  location, timezone, rating, reviewCount,
  completedTasks, memberSince, skills[]
}
```

### Task
```javascript
{
  id, title, description, budget, deadline,
  category, skills[], status, requester,
  proposalCount, createdAt, updatedAt
}
```

### Proposal
```javascript
{
  id, taskId, provider, estimatedHours,
  bidAmount, message, status, 
  submittedAt, updatedAt
}
```

### Contract
```javascript
{
  id, taskId, requester, provider,
  agreedAmount, agreedMinutes, status,
  paymentPhase, createdAt, deliverables[]
}
```

### Transaction
```javascript
{
  id, userId, type, amount, status,
  relatedId, metadata, createdAt
}
```

---

## 🎯 Roadmap

### Phase 1 (Current) ✅
- Basic task posting and browsing
- Proposal submission and management
- Contract creation and payment flow
- Messaging system
- User profiles and reviews
- Pricing recommendation system

### Phase 2 (Planned)
- Real-time notifications (WebSocket)
- Advanced search with filters
- Task recommendations
- Dispute resolution system
- Mobile app (React Native)

### Phase 3 (Future)
- AI-powered skill matching
- Milestone-based payments
- Team collaboration features
- Video consultations
- Integration with payment gateways

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [TanStack Query](https://tanstack.com/query)
- [MSW](https://mswjs.io/)
- [Lucide Icons](https://lucide.dev/)

---

**Built with ❤️ for the campus community**
