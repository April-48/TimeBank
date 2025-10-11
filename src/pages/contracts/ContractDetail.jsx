import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  FileText,
  User,
  DollarSign,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  Upload,
  Download,
  MessageCircle,
  Star,
  Lock,
  Unlock,
  RefreshCw
} from 'lucide-react'
import StateFlow from '../../components/StateFlow'
import { features } from '../../lib/constants'

const ContractDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [deliverableFile, setDeliverableFile] = useState(null)
  
  // Mock data
  const contract = {
    id: 1,
    taskTitle: 'Build a responsive website',
    description: 'Full website development with React and modern design',
    requester: {
      id: 101,
      name: 'Li Student',
      avatar: 'L',
      rating: 4.8
    },
    provider: {
      id: 201,
      name: 'Wang Student',
      avatar: 'W',
      rating: 4.9
    },
    myRole: 'provider', // 'requester' or 'provider'
    agreedMinutes: 2400, // 40 hours * 60
    agreedAmount: 48,
    status: 'active',
    paymentPhase: 'escrowed',
    createdAt: '2024-01-18 10:00',
    deadline: '2024-02-01',
    deliverables: [],
    timeline: [
      {
        event: 'contract_created',
        description: 'Contract was created from accepted proposal',
        timestamp: '2024-01-18 10:00',
        actor: 'System'
      },
      {
        event: 'payment_escrowed',
        description: 'Payment of 48 TC was escrowed',
        timestamp: '2024-01-18 10:15',
        actor: 'Li Student'
      },
      {
        event: 'contract_activated',
        description: 'Contract became active',
        timestamp: '2024-01-18 10:15',
        actor: 'System'
      }
    ]
  }

  const isRequester = contract.myRole === 'requester'
  const isProvider = contract.myRole === 'provider'

  const handleEscrow = () => {
    if (confirm(`Escrow ${contract.agreedAmount} TC to activate this contract?`)) {
      console.log('Escrowing payment')
      alert('Payment escrowed successfully! Contract is now active.')
    }
  }

  const handleRelease = () => {
    if (confirm(`Release ${contract.agreedAmount} TC to provider?`)) {
      console.log('Releasing payment')
      alert('Payment released successfully! Contract completed.')
      navigate('/reviews?contract=' + id)
    }
  }

  const handleRefund = () => {
    if (confirm('Are you sure you want to request a refund? This will cancel the contract.')) {
      console.log('Requesting refund')
      alert('Refund requested. Please contact support.')
    }
  }

  const handleMarkDelivered = () => {
    if (!deliverableFile) {
      alert('Please upload deliverables first')
      return
    }
    console.log('Marking as delivered')
    alert('Marked as delivered! Requester will review.')
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setDeliverableFile(file)
      console.log('File selected:', file.name)
    }
  }

  const contractStates = [
    { id: 'draft', label: 'Draft' },
    { id: 'active', label: 'Active' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'completed', label: 'Completed' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contract Details</h1>
            <p className="text-gray-600">Contract #{id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contract Header */}
          <div className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{contract.taskTitle}</h2>
                <p className="text-gray-600">{contract.description}</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {contract.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Created</p>
                <p className="font-medium text-gray-900">{contract.createdAt}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Deadline</p>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">{contract.deadline}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Flow */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Contract Status</h3>
            <StateFlow 
              states={contractStates}
              currentState={contract.status}
            />
          </div>

          {/* Payment Card */}
          <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                contract.paymentPhase === 'unfunded' ? 'bg-red-100 text-red-800' :
                contract.paymentPhase === 'escrowed' ? 'bg-yellow-100 text-yellow-800' :
                contract.paymentPhase === 'released' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {contract.paymentPhase === 'escrowed' && <Lock className="w-3 h-3 inline mr-1" />}
                {contract.paymentPhase === 'released' && <Unlock className="w-3 h-3 inline mr-1" />}
                {contract.paymentPhase === 'unfunded' ? 'Unfunded' :
                 contract.paymentPhase === 'escrowed' ? 'Escrowed' :
                 contract.paymentPhase === 'released' ? 'Released' : contract.paymentPhase}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">
                  Fixed Price
                </span>
                <span className="text-3xl font-bold text-campus-orange">{contract.agreedAmount} TC</span>
              </div>
              <div className="text-sm text-gray-600">
                Provider receives full amount, no platform commission
              </div>
            </div>

            {/* Payment Actions */}
            {contract.paymentPhase === 'unfunded' && isRequester && (
              <button 
                onClick={handleEscrow}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <Lock className="w-5 h-5" />
                <span>Escrow Payment & Activate Contract</span>
              </button>
            )}

            {contract.paymentPhase === 'escrowed' && isRequester && contract.status === 'delivered' && (
              <div className="space-y-2">
                <button 
                  onClick={handleRelease}
                  className="bg-green-600 hover:bg-green-700 text-white w-full px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Unlock className="w-5 h-5" />
                  <span>Release Payment & Complete</span>
                </button>
                <button 
                  onClick={handleRefund}
                  className="bg-red-100 hover:bg-red-200 text-red-700 w-full px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Request Refund</span>
                </button>
              </div>
            )}

            {contract.paymentPhase === 'escrowed' && (
              <div className="bg-white/50 rounded-lg p-3 mt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    {isRequester && 'Payment is held in escrow until you approve the deliverables'}
                    {isProvider && 'Payment is held in escrow and will be released after requester approval'}
                  </span>
                </div>
              </div>
            )}

            {contract.paymentPhase === 'released' && (
              <div className="bg-green-100 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>Payment has been released to provider</span>
                </div>
              </div>
            )}
          </div>

          {/* Deliverables */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Deliverables</h3>
            
            {isProvider && contract.status === 'active' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Deliverables
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-campus-blue transition-colors cursor-pointer">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="deliverable-upload"
                      multiple
                    />
                    <label htmlFor="deliverable-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {deliverableFile ? deliverableFile.name : 'Click to upload files'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supports: ZIP, PDF, images, documents
                      </p>
                    </label>
                  </div>
                </div>

                <button 
                  onClick={handleMarkDelivered}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Package className="w-5 h-5" />
                  <span>Mark as Delivered</span>
                </button>
              </div>
            )}

            {contract.status === 'delivered' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Deliverables Submitted</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white rounded p-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">website-files.zip</span>
                      </div>
                      <button className="text-campus-blue hover:text-campus-purple flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Download</span>
                      </button>
                    </div>
                  </div>
                </div>

                {isRequester && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-sm text-yellow-800">
                      <AlertCircle className="w-4 h-4" />
                      <span>Please review the deliverables and release payment if satisfied</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {contract.status === 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">Contract completed successfully</span>
                </div>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
            <div className="space-y-4">
              {contract.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-campus-blue rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{event.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <span>{event.timestamp}</span>
                      <span>•</span>
                      <span>{event.actor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Participants */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Participants</h3>
            
            {/* Requester */}
            <div className="mb-4 pb-4 border-b">
              <p className="text-xs text-gray-500 mb-2">REQUESTER</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-campus-blue to-campus-purple rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{contract.requester.avatar}</span>
                </div>
                <div className="flex-1">
                  <Link 
                    to={`/profile/${contract.requester.id}`}
                    className="font-medium text-gray-900 hover:text-campus-blue"
                  >
                    {contract.requester.name}
                  </Link>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-gray-600">{contract.requester.rating}</span>
                  </div>
                </div>
                {isProvider && (
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Provider */}
            <div>
              <p className="text-xs text-gray-500 mb-2">PROVIDER</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-campus-green to-campus-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{contract.provider.avatar}</span>
                </div>
                <div className="flex-1">
                  <Link 
                    to={`/profile/${contract.provider.id}`}
                    className="font-medium text-gray-900 hover:text-campus-blue"
                  >
                    {contract.provider.name}
                  </Link>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-gray-600">{contract.provider.rating}</span>
                  </div>
                </div>
                {isRequester && (
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Contract Details */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Contract Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Time</span>
                <span className="font-medium">{contract.agreedMinutes / 60}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contract Value</span>
                <span className="font-medium">{contract.agreedAmount} TC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">My Role</span>
                <span className="font-medium capitalize">{contract.myRole}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link 
                to={`/messages?contract=${id}`}
                className="btn-secondary w-full flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message</span>
              </Link>
              <Link 
                to={`/tasks/${contract.id}`}
                className="btn-secondary w-full flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>View Original Task</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractDetail

