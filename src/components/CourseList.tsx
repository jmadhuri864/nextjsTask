'use client'

import { useState, useEffect } from 'react'

interface Course {
  id: number
  title: string
  description: string
  price: number
  duration: number
  level: string
  category: string
  published: boolean
  createdAt: string
  instructor: {
    id: number
    name: string
    email: string
  }
  _count: {
    enrollments: number
    lessons: number
  }
}

interface User {
  id: number
  name: string
  role: string
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([])
  const [instructors, setInstructors] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    level: 'BEGINNER',
    category: '',
    instructorId: '',
    published: false
  })

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses')
      if (!response.ok) throw new Error('Failed to fetch courses')
      const data = await response.json()
      setCourses(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const fetchInstructors = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setInstructors(data.filter((user: User) => user.role === 'INSTRUCTOR' || user.role === 'ADMIN'))
    } catch (err) {
      console.error('Failed to fetch instructors:', err)
    } finally {
      setLoading(false)
    }
  }

  const createCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCourse.title || !newCourse.description || !newCourse.instructorId) return

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      })

      if (!response.ok) throw new Error('Failed to create course')
      
      setNewCourse({
        title: '',
        description: '',
        price: '',
        duration: '',
        level: 'BEGINNER',
        category: '',
        instructorId: '',
        published: false
      })
      fetchCourses()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course')
    }
  }

  useEffect(() => {
    fetchInstructors()
    fetchCourses()
  }, [])

  if (loading) return <div className="text-center py-4">Loading courses...</div>
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>

  return (
    <div className="max-h-96 overflow-y-auto">
      <form onSubmit={createCourse} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Course title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <textarea
          placeholder="Course description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-16 resize-none"
          required
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Price ($)"
            value={newCourse.price}
            onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Duration (min)"
            value={newCourse.duration}
            onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={newCourse.level}
            onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            value={newCourse.category}
            onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <select
          value={newCourse.instructorId}
          onChange={(e) => setNewCourse({ ...newCourse, instructorId: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select instructor</option>
          {instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.name}
            </option>
          ))}
        </select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={newCourse.published}
            onChange={(e) => setNewCourse({ ...newCourse, published: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm">Published</span>
        </label>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors text-sm"
        >
          Create Course
        </button>
      </form>

      <div className="space-y-3">
        {courses.length === 0 ? (
          <p className="text-gray-500 text-center text-sm">No courses found</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-md p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{course.title}</h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{course.description}</p>
                  <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                    <span>${course.price}</span>
                    <span>•</span>
                    <span>{course.duration}min</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    By {course.instructor.name} • {course._count.enrollments} students
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  course.published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {course.published ? 'Live' : 'Draft'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}