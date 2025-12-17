'use client'

import { useAuth } from '@/contexts/AuthContext'
import UserList from '@/components/UserList'
import CourseList from '@/components/CourseList'
import EnrollmentList from '@/components/EnrollmentList'
import LoginForm from '@/components/LoginForm'

export default function Home() {
  const { user, login, logout, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              House of EdTech
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Learning Management System
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span>Next.js 16</span>
              <span>•</span>
              <span>PostgreSQL</span>
              <span>•</span>
              <span>Prisma</span>
              <span>•</span>
              <span>TypeScript</span>
            </div>
          </header>
          
          <div className="max-w-md mx-auto">
            <LoginForm onLogin={login} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-12">
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                House of EdTech
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                Learning Management System
              </p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span>Next.js 16</span>
                <span>•</span>
                <span>PostgreSQL</span>
                <span>•</span>
                <span>Prisma</span>
                <span>•</span>
                <span>TypeScript</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
            </div>
            <UserList />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Courses</h2>
            </div>
            <CourseList />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Enrollments</h2>
            </div>
            <EnrollmentList />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            🚀 Project Setup & Development Guide
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</span>
                Initial Setup:
              </h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Install PostgreSQL database server
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Create database: <code className="bg-gray-100 px-2 py-1 rounded text-xs">nextjs_postgres_db</code>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Configure <code className="bg-gray-100 px-2 py-1 rounded text-xs">.env</code> with database URL
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Install dependencies: <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm install</code>
                </li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</span>
                Database Setup:
              </h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Generate Prisma client: <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm run db:generate</code>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Run migrations: <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm run db:migrate</code>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Seed demo data: <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm run db:seed</code>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">ℹ</span>
                  Or run all: <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm run db:setup</code>
                </li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">3</span>
                Development:
              </h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Start dev server: <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm run dev</code>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">🌐</span>
                  Access at: <code className="bg-gray-100 px-2 py-1 rounded text-xs">localhost:3000</code>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">🔧</span>
                  Database GUI: <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm run db:studio</code>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">🧪</span>
                  Run tests: <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm test</code>
                </li>
              </ol>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-blue-600 mr-2">🎯</span>
                Core Features Implemented:
              </h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span>JWT Authentication & Authorization</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span>Role-based Access Control (Admin/Instructor/Learner)</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span>Complete CRUD Operations for all entities</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span>User Management with password hashing</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span>Course Creation & Management System</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span>Student Enrollment & Progress Tracking</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span>Responsive UI with Tailwind CSS</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-green-600 mr-2">🛠️</span>
                Technology Stack:
              </h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-center"><span className="text-blue-500 mr-2">⚛️</span>Next.js 16 with App Router & Server Components</li>
                <li className="flex items-center"><span className="text-blue-600 mr-2">📘</span>TypeScript for type safety</li>
                <li className="flex items-center"><span className="text-blue-700 mr-2">🐘</span>PostgreSQL database</li>
                <li className="flex items-center"><span className="text-purple-600 mr-2">🔺</span>Prisma ORM for database management</li>
                <li className="flex items-center"><span className="text-cyan-500 mr-2">🎨</span>Tailwind CSS for styling</li>
                <li className="flex items-center"><span className="text-green-600 mr-2">🔐</span>bcrypt for password hashing</li>
                <li className="flex items-center"><span className="text-orange-500 mr-2">🎫</span>JWT for authentication tokens</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-700 mb-2">
                  <strong>👨‍💻 Developer:</strong> Madhuri Jadhav| 
                  <strong>📧 Contact:</strong> jmadhuri417@gmail.com
                </p>
                <p className="text-sm text-indigo-600">
                  <strong>🔗 GitHub:</strong> <a href="https://github.com/jmadhuri864" className="underline hover:text-indigo-800">github.com/jmadhuri864</a> | 
                  <strong>💼 LinkedIn:</strong> <a href="https://linkedin.com/in/madhurijadhav" className="underline hover:text-indigo-800">linkedin.com/in/madhurijadhav</a>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-indigo-500">Built for</p>
                <p className="text-sm font-semibold text-indigo-700">House of EdTech</p>
                <p className="text-xs text-indigo-500">Fullstack Assignment 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">House of EdTech</h3>
              <p className="text-gray-300 text-sm">
                A comprehensive Learning Management System built with modern web technologies.
                Showcasing full-stack development capabilities with Next.js 16, TypeScript, and PostgreSQL.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Complete CRUD Operations</li>
                <li>• User Role Management</li>
                <li>• Course Management System</li>
                <li>• Enrollment Tracking</li>
                <li>• Progress Monitoring</li>
                <li>• Responsive Design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Developer</h3>
              <div className="text-gray-300 text-sm space-y-2">
                <p><strong>Name:</strong> Madhuri Jadhav</p>
                <p><strong>GitHub:</strong> 
                  <a href="https://github.com/jmadhuri864" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-400 hover:text-blue-300 ml-1">
                    github.com/jmadhuri864
                  </a>
                </p>
                <p><strong>LinkedIn:</strong> 
                  <a href="https://linkedin.com/in/madhurijadhav" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-400 hover:text-blue-300 ml-1">
                    linkedin.com/in/madhurijadhav
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 House of EdTech. Built for Fullstack Developer Assignment.
              <br />
              <span className="text-xs">
                Next.js 16 • TypeScript • PostgreSQL • Prisma • Tailwind CSS
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
