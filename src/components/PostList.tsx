'use client'

import { useState, useEffect } from 'react'

interface Post {
  id: number
  title: string
  content: string | null
  published: boolean
  createdAt: string
  author: {
    id: number
    name: string | null
    email: string
  }
}

interface User {
  id: number
  email: string
  name: string | null
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    authorId: '',
    published: false
  })

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      console.error('Failed to fetch users:', err)
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.title || !newPost.authorId) return

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      })

      if (!response.ok) throw new Error('Failed to create post')
      
      setNewPost({ title: '', content: '', authorId: '', published: false })
      fetchPosts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchPosts()
  }, [])

  if (loading) return <div className="text-center py-4">Loading posts...</div>
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>

  return (
    <div>
      <form onSubmit={createPost} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Post title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Post content (optional)"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
        />
        <select
          value={newPost.authorId}
          onChange={(e) => setNewPost({ ...newPost, authorId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select author</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name || user.email}
            </option>
          ))}
        </select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={newPost.published}
            onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm">Published</span>
        </label>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Add Post
        </button>
      </form>

      <div className="space-y-3">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts found</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-md p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium">{post.title}</h3>
                  {post.content && (
                    <p className="text-sm text-gray-600 mt-1">{post.content}</p>
                  )}
                  <div className="text-xs text-gray-500 mt-2">
                    By {post.author.name || post.author.email} • {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  post.published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}