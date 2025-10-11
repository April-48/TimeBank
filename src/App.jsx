import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Toast from './components/ui/Toast'

// Pages
import Dashboard from './pages/Dashboard'
import { TaskList, TaskDetail, TaskCreate } from './pages/tasks'
import { ProposalList, ProposalInbox } from './pages/proposals'
import { ContractList, ContractDetail } from './pages/contracts'
import Messages from './pages/messages/Messages'
import Wallet from './pages/wallet/Wallet'
import Reviews from './pages/reviews/Reviews'
import Profile from './pages/profile/Profile'
import Settings from './pages/settings/Settings'
import { Login, Register } from './pages/auth'

function App() {
  return (
    <Router>
      <Toast />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Main App Routes */}
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        
        {/* Tasks */}
        <Route path="/tasks" element={<Layout><TaskList /></Layout>} />
        <Route path="/tasks/new" element={<Layout><TaskCreate /></Layout>} />
        <Route path="/tasks/:id" element={<Layout><TaskDetail /></Layout>} />
        <Route path="/tasks/:id/edit" element={<Layout><TaskCreate /></Layout>} />
        
        {/* Proposals */}
        <Route path="/proposals/mine" element={<Layout><ProposalList /></Layout>} />
        <Route path="/proposals/inbox" element={<Layout><ProposalInbox /></Layout>} />
        
        {/* Contracts */}
        <Route path="/contracts" element={<Layout><ContractList /></Layout>} />
        <Route path="/contracts/:id" element={<Layout><ContractDetail /></Layout>} />
        
        {/* Messages */}
        <Route path="/messages" element={<Layout><Messages /></Layout>} />
        <Route path="/messages/:threadId" element={<Layout><Messages /></Layout>} />
        
        {/* Wallet & Transactions */}
        <Route path="/wallet" element={<Layout><Wallet /></Layout>} />
        
        {/* Reviews */}
        <Route path="/reviews" element={<Layout><Reviews /></Layout>} />
        
        {/* Profile & Settings */}
        <Route path="/profile/:userId" element={<Layout><Profile /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App
