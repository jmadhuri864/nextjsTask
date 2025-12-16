'use client'

import { useState, useEffect } from 'react'

interface User {
  id: number
  email: string
  name: string
  role: string
  bio?: string
  createdAt: string
  _count: {
    createdCourses: number
    enrollments: number
  }
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newUser, setNewUser] = useState({ 
    email: '', 
    name: '', 
    password: '', 
    role: 'LEARNER',
    bio: ''
  })

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUser.email || !newUser.name || !newUser.password) return

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create user')
      }
      
      setNewUser({ email: '', name: '', password: '', role: 'LEARNER', bio: '' })
      fetchUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) return <div className="text-center py-4">Loading users...</div>
  if (error) return <div className="text-red-500 text-center py-4 text-sm">Error: {error}</div>

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800'
      case 'INSTRUCTOR': return 'bg-blue-100 text-blue-800'
      case 'LEARNER': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <form onSubmit={createUser} className="mb-6 space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Full Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="LEARNER">Learner</option>
          <option value="INSTRUCTOR">Instructor</option>
          <option value="ADMIN">Admin</option>
        </select>
        <textarea
          placeholder="Bio (optional)"
          value={newUser.bio}
          onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-16 resize-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors text-sm"
        >
          Add User
        </button>
      </form>

      <div className="space-y-3">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center text-sm">No users found</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="border border-gray-200 rounded-md p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-gray-600">{user.email}</div>
                  {user.bio && (
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">{user.bio}</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {user.role === 'INSTRUCTOR' 
                      ? `${user._count.createdCourses} course(s)` 
                      : `${user._count.enrollments} enrollment(s)`
                    } • Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}