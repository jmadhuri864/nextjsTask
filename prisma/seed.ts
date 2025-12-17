import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  await prisma.user.upsert({
    where: { email: 'admin@edtech.com' },
    update: {},
    create: {
      email: 'admin@edtech.com',
      name: 'Madhuri Jadhav',
      password: await bcrypt.hash('admin123', 12),
      role: 'ADMIN',
      bio: 'Platform Administrator and Full-Stack Developer',
    },
  })

  const instructor1 = await prisma.user.upsert({
    where: { email: 'john.instructor@edtech.com' },
    update: {},
    create: {
      email: 'john.instructor@edtech.com',
      name: 'John Smith',
      password: await bcrypt.hash('instructor123', 12),
      role: 'INSTRUCTOR',
      bio: 'Senior Software Engineer with 10+ years experience in web development',
    },
  })

  const instructor2 = await prisma.user.upsert({
    where: { email: 'sarah.teacher@edtech.com' },
    update: {},
    create: {
      email: 'sarah.teacher@edtech.com',
      name: 'Sarah Johnson',
      password: await bcrypt.hash('instructor123', 12),
      role: 'INSTRUCTOR',
      bio: 'Data Science expert and AI researcher',
    },
  })

  const learner1 = await prisma.user.upsert({
    where: { email: 'alice.student@edtech.com' },
    update: {},
    create: {
      email: 'alice.student@edtech.com',
      name: 'Alice Brown',
      password: await bcrypt.hash('student123', 12),
      role: 'LEARNER',
      bio: 'Computer Science student passionate about web development',
    },
  })

  const learner2 = await prisma.user.upsert({
    where: { email: 'bob.learner@edtech.com' },
    update: {},
    create: {
      email: 'bob.learner@edtech.com',
      name: 'Bob Wilson',
      password: await bcrypt.hash('student123', 12),
      role: 'LEARNER',
      bio: 'Career changer learning programming',
    },
  })

  // Create sample courses
  const course1 = await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Complete Next.js 16 Masterclass',
      description: 'Learn Next.js 16 from scratch with App Router, Server Components, and modern React patterns. Build production-ready applications.',
      price: 99.99,
      duration: 1200, // 20 hours
      level: 'INTERMEDIATE',
      category: 'Web Development',
      published: true,
      instructorId: instructor1.id,
    },
  })

  const course2 = await prisma.course.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'PostgreSQL & Prisma for Beginners',
      description: 'Master database design and management with PostgreSQL and Prisma ORM. Perfect for full-stack developers.',
      price: 79.99,
      duration: 900, // 15 hours
      level: 'BEGINNER',
      category: 'Database',
      published: true,
      instructorId: instructor1.id,
    },
  })

  const course3 = await prisma.course.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Data Science with Python',
      description: 'Comprehensive course covering pandas, numpy, matplotlib, and machine learning fundamentals.',
      price: 149.99,
      duration: 1800, // 30 hours
      level: 'INTERMEDIATE',
      category: 'Data Science',
      published: true,
      instructorId: instructor2.id,
    },
  })

  await prisma.course.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: 'TypeScript Advanced Patterns',
      description: 'Deep dive into advanced TypeScript concepts, generics, and design patterns for enterprise applications.',
      price: 129.99,
      duration: 600,
      level: 'ADVANCED',
      category: 'Programming',
      published: false,
      instructorId: instructor2.id,
    },
  })

  // Check if lessons already exist before creating
  const existingLessons = await prisma.lesson.findMany({
    where: { courseId: course1.id }
  })

  if (existingLessons.length === 0) {
    await prisma.lesson.create({
      data: {
        title: 'Introduction to Next.js 16',
        content: 'Overview of Next.js features and App Router architecture',
        duration: 45,
        orderIndex: 1,
        published: true,
        courseId: course1.id,
      },
    })

    await prisma.lesson.create({
      data: {
        title: 'Server Components Deep Dive',
        content: 'Understanding React Server Components and their benefits',
        duration: 60,
        orderIndex: 2,
        published: true,
        courseId: course1.id,
      },
    })
  }

  await prisma.enrollment.upsert({
    where: {
      learnerId_courseId: {
        learnerId: learner1.id,
        courseId: course1.id,
      },
    },
    update: {},
    create: {
      learnerId: learner1.id,
      courseId: course1.id,
      status: 'ACTIVE',
      progress: 25.5,
    },
  })

  await prisma.enrollment.upsert({
    where: {
      learnerId_courseId: {
        learnerId: learner2.id,
        courseId: course1.id,
      },
    },
    update: {},
    create: {
      learnerId: learner2.id,
      courseId: course1.id,
      status: 'ACTIVE',
      progress: 10.0,
    },
  })

  await prisma.enrollment.upsert({
    where: {
      learnerId_courseId: {
        learnerId: learner1.id,
        courseId: course2.id,
      },
    },
    update: {},
    create: {
      learnerId: learner1.id,
      courseId: course2.id,
      status: 'COMPLETED',
      progress: 100.0,
      completedAt: new Date(),
    },
  })

  await prisma.enrollment.upsert({
    where: {
      learnerId_courseId: {
        learnerId: learner2.id,
        courseId: course3.id,
      },
    },
    update: {},
    create: {
      learnerId: learner2.id,
      courseId: course3.id,
      status: 'ACTIVE',
      progress: 45.0,
    },
  })

  // Add demo users with standard credentials
  await prisma.user.upsert({
    where: { email: 'instructor@edtech.com' },
    update: {},
    create: {
      email: 'instructor@edtech.com',
      name: 'Demo Instructor',
      password: await bcrypt.hash('password123', 12),
      role: 'INSTRUCTOR',
      bio: 'Demo instructor account for testing',
    },
  })

  await prisma.user.upsert({
    where: { email: 'learner@edtech.com' },
    update: {},
    create: {
      email: 'learner@edtech.com',
      name: 'Demo Learner',
      password: await bcrypt.hash('password123', 12),
      role: 'LEARNER',
      bio: 'Demo learner account for testing',
    },
  })

  console.log('Database seeded successfully!')
  console.log('Created: 7 users, 4 courses, 2 lessons, 4 enrollments')
  console.log('\n📋 Demo Login Credentials:')
  console.log('Admin: admin@edtech.com / admin123')
  console.log('Instructor: instructor@edtech.com / password123')
  console.log('Learner: learner@edtech.com / password123')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })