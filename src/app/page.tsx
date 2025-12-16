import UserList from '@/components/UserList'
import CourseList from '@/components/CourseList'
import EnrollmentList from '@/components/EnrollmentList'

export default function Home() {
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
            Setup Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Setup Steps:</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li>1. Install PostgreSQL</li>
                <li>2. Create database: <code className="bg-gray-100 px-2 py-1 rounded">nextjs_postgres_db</code></li>
                <li>3. Update <code className="bg-gray-100 px-2 py-1 rounded">.env</code> with credentials</li>
                <li>4. Run: <code className="bg-gray-100 px-2 py-1 rounded">npm run db:setup</code></li>
                <li>5. Start: <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code></li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Features:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>User management (Learners, Instructors, Admins)</li>
                <li>Course creation and management</li>
                <li>Enrollment system with progress tracking</li>
                <li>Secure authentication</li>
                <li>PostgreSQL database</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-700">
              <strong>Author:</strong> Madhuri Jadhav | 
              <strong> Tech Stack:</strong> Next.js 16, TypeScript, PostgreSQL, Prisma, Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
