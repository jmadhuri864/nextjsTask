'use client'

import { useState, useEffect } from 'react'

interface Enrollment {
  id: number
  status: string
  enrolledAt: string
  progress: number
  learner: {
    id: number
    name: string
    email: string
  }
  course: {
    id: number
    title: string
    price: number
    instructor: {
      name: string
    }
  }
}

interface User {
  id: number
  name: string
  role: string
}

interface Course {
  id: number
  title: string
  published: boolean
}

export default function EnrollmentList() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [learners, setLearners] = useState<User[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newEnrollment, setNewEnrollment] = useState({
    learnerId: '',
    courseId: ''
  })

  const fetchEnrollments = async () => {
    try {
      const response = await fetch('/api/enrollments')
      if (!response.ok) throw new Error('Failed to fetch enrollments')
      const data = await response.json()
      setEnrollments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const fetchData = async () => {
    try {
      // Fetch users (learners)
      const usersResponse = await fetch('/api/users')
      if (usersResponse.ok) {
        const users = await usersResponse.json()
        setLearners(users.filter((user: User) => user.role === 'LEARNER'))
      }

      // Fetch courses
      const coursesResponse = await fetch('/api/courses')
      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json()
        setCourses(coursesData.filter((course: Course) => course.published))
      }
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setLoading(false)
    }
  }

  const createEnrollment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEnrollment.learnerId || !newEnrollment.courseId) return

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEnrollment),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create enrollment')
      }
      
      setNewEnrollment({ learnerId: '', courseId: '' })
      fetchEnrollments()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create enrollment')
    }
  }

  useEffect(() => {
    fetchData()
    fetchEnrollments()
  }, [])

  if (loading) return <div className="text-center py-4">Loading enrollments...</div>
  if (error) return <div className="text-red-500 text-center py-4 text-sm">Error: {error}</div>

  return (
    <div className="max-h-96 overflow-y-auto">
      <form onSubmit={createEnrollment} className="mb-6 space-y-3">
        <select
          value={newEnrollment.learnerId}
          onChange={(e) => setNewEnrollment({ ...newEnrollment, learnerId: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="">Select learner</option>
          {learners.map((learner) => (
            <option key={learner.id} value={learner.id}>
              {learner.name}
            </option>
          ))}
        </select>
        <select
          value={newEnrollment.courseId}
          onChange={(e) => setNewEnrollment({ ...newEnrollment, courseId: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="">Select course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors text-sm"
        >
          Enroll Student
        </button>
      </form>

      <div className="space-y-3">
        {enrollments.length === 0 ? (
          <p className="text-gray-500 text-center text-sm">No enrollments found</p>
        ) : (
          enrollments.map((enrollment) => (
            <div key={enrollment.id} className="border border-gray-200 rounded-md p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{enrollment.learner.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{enrollment.course.title}</p>
                  <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                    <span>By {enrollment.course.instructor.name}</span>
                    <span>•</span>
                    <span>${enrollment.course.price}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </div>
                  {enrollment.progress > 0 && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{enrollment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-purple-500 h-1.5 rounded-full" 
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  enrollment.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : enrollment.status === 'COMPLETED'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {enrollment.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}