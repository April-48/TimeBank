import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  Save,
  Eye,
  ArrowLeft,
  Plus,
  X,
  Calendar,
  DollarSign,
  FileText,
  Tag,
  AlertCircle
} from 'lucide-react'
import { taskSchema } from '../../lib/schemas'
import api from '../../lib/api'
import { QueryKeys, TaskCategories, features } from '../../lib/constants'
import toast from '../../lib/toast'
import { getErrorMessage } from '../../lib/utils'
import { mockRecommend } from '../../lib/pricing/engine'
import { getPricingValidationMessage } from '../../lib/pricing/validation'
import PricingCard from '../../components/pricing/PricingCard'

const TaskCreate = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [skillInput, setSkillInput] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [recommendation, setRecommendation] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      budget: '',
      deadline: '',
      skills: [],
      category: 'Programming'
    }
  })

  const formData = watch()

  // 计算推荐价格
  const calculateRecommendation = () => {
    if (!formData.category || !formData.skills || formData.skills.length === 0) {
      setRecommendation(null)
      return
    }

    const input = {
      category: formData.category,
      skills: formData.skills,
      complexity: 'medium', // 默认中等复杂度
      urgency: 'normal',    // 默认普通紧急度
      sampleCount: 0        // 占位数据
    }

    const rec = mockRecommend(input)
    setRecommendation(rec)
  }

  // 监听表单变化，重新计算推荐价格
  React.useEffect(() => {
    calculateRecommendation()
  }, [formData.category, formData.skills])

  const categories = TaskCategories

  const suggestedSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'HTML', 'CSS',
    'Graphic Design', 'UI/UX', 'Photoshop', 'Illustrator',
    'Content Writing', 'Copywriting', 'SEO', 'Marketing',
    'Data Analysis', 'Excel', 'Math', 'Physics'
  ]

  const handleAddSkill = (skill) => {
    const currentSkills = getValues('skills')
    if (skill && !currentSkills.includes(skill)) {
      setValue('skills', [...currentSkills, skill])
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    const currentSkills = getValues('skills')
    setValue('skills', currentSkills.filter(skill => skill !== skillToRemove))
  }

  // Create task mutation
  const createMutation = useMutation({
    mutationFn: (taskData) => api.tasks.create(taskData),
    onSuccess: (newTask) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.tasks() })
      queryClient.invalidateQueries({ queryKey: QueryKeys.dashboard() })
      toast.success('Task published successfully!')
      navigate(`/tasks/${newTask.id}`)
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })

  const handleSaveDraft = () => {
    const data = getValues()
    // Save to localStorage as draft
    localStorage.setItem('task-draft', JSON.stringify(data))
    toast.success('Draft saved!')
  }

  const onSubmit = (data) => {
    // 价格验证
    if (recommendation && features.floorValidation) {
      const validationMessage = getPricingValidationMessage(parseInt(data.budget), recommendation)
      if (validationMessage) {
        toast.error(validationMessage)
        return
      }
    }

    console.log('Publishing task:', data)
    createMutation.mutate(data)
  }

  const handleApplyRecommendation = (price) => {
    setValue('budget', price)
  }

  const handleNudgeRecommendation = (patch) => {
    // 重新计算推荐价格（这里可以调用后端API）
    calculateRecommendation()
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
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
            <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
            <p className="text-gray-600">Post a task and receive proposals from providers</p>
          </div>
        </div>
        <button 
          onClick={() => setShowPreview(!showPreview)}
          className="btn-secondary flex items-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>{showPreview ? 'Edit' : 'Preview'}</span>
        </button>
      </div>

      {!showPreview ? (
        /* Main Content */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-campus-blue" />
              <span>Basic Information</span>
            </h3>
            
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('title')}
                  placeholder="e.g., Build a responsive website"
                  className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                  maxLength={100}
                />
                {errors.title && (
                  <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">{formData.title?.length || 0}/100 characters</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('description')}
                  placeholder="Describe your task in detail. Include requirements, deliverables, and any specific instructions..."
                  className={`input-field min-h-[200px] ${errors.description ? 'border-red-500' : ''}`}
                  maxLength={2000}
                />
                {errors.description && (
                  <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">{formData.description?.length || 0}/2000 characters</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  {...register('category')}
                  className="input-field"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Budget & Deadline */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-campus-orange" />
              <span>Budget & Timeline</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (Time Coins) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    {...register('budget', { valueAsNumber: true })}
                    placeholder="Enter amount"
                    className={`input-field pr-12 ${errors.budget ? 'border-red-500' : ''}`}
                    min="1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">TC</span>
                </div>
                {errors.budget && (
                  <p className="text-xs text-red-600 mt-1">{errors.budget.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Fixed price. Provider receives full amount. No platform commission.
                </p>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register('deadline')}
                  className={`input-field ${errors.deadline ? 'border-red-500' : ''}`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.deadline && (
                  <p className="text-xs text-red-600 mt-1">{errors.deadline.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">When do you need this completed?</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Tag className="w-5 h-5 text-campus-purple" />
              <span>Required Skills</span>
            </h3>
            
            {/* Skill Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Skills
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddSkill(skillInput)
                    }
                  }}
                  placeholder="Type skill and press Enter"
                  className="input-field flex-1"
                />
                <button 
                  onClick={() => handleAddSkill(skillInput)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Selected Skills */}
              {formData.skills && formData.skills.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Selected Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map(skill => (
                    <span 
                      key={skill}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2"
                    >
                      <span>{skill}</span>
                      <button 
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Skills */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Suggested Skills:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills.filter(skill => !(formData.skills || []).includes(skill)).map(skill => (
                  <button
                    key={skill}
                    onClick={() => handleAddSkill(skill)}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="card bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <AlertCircle className="w-4 h-4" />
                <span>Once published, you'll start receiving proposals</span>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  type="button"
                  onClick={handleSaveDraft}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Draft</span>
                </button>
                <button 
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={createMutation.isPending}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>{createMutation.isPending ? 'Publishing...' : 'Publish Task'}</span>
                </button>
              </div>
            </div>
          </div>
          </div>

          {/* Right Column - Pricing Card */}
          {features.pricingRecommendation && (
            <div className="lg:col-span-1">
              <PricingCard
                value={parseInt(formData.budget) || 0}
                recommendation={recommendation}
                onApply={handleApplyRecommendation}
                onNudge={handleNudgeRecommendation}
                disabled={createMutation.isPending}
              />
            </div>
          )}
        </div>
      ) : (
        /* Preview */
        <div className="card">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>This is how your task will appear to providers</span>
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{formData.title || 'Task Title'}</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Open
                </span>
              </div>
              <p className="text-gray-600 whitespace-pre-wrap">{formData.description || 'Task description will appear here...'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-t border-b">
              <div>
                <p className="text-sm text-gray-500 mb-1">Budget</p>
                <p className="text-2xl font-bold text-campus-orange">{formData.budget || '0'} TC</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Deadline</p>
                <p className="text-lg font-semibold text-gray-900">{formData.deadline || 'Not set'}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {formData.skills.length > 0 ? (
                  formData.skills.map(skill => (
                    <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">No skills added</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskCreate

