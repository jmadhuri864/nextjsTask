import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        learner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            price: true,
            instructor: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    })
    return NextResponse.json(enrollments)
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { learnerId, courseId } = body

    if (!learnerId || !courseId) {
      return NextResponse.json(
        { error: 'LearnerId and courseId are required' },
        { status: 400 }
      )
    }

    // Check if enrollment already exists
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        learnerId_courseId: {
          learnerId: parseInt(learnerId),
          courseId: parseInt(courseId),
        },
      },
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'User is already enrolled in this course' },
        { status: 400 }
      )
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        learnerId: parseInt(learnerId),
        courseId: parseInt(courseId),
      },
      include: {
        learner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
      },
    })

    return NextResponse.json(enrollment, { status: 201 })
  } catch (error) {
    console.error('Error creating enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    )
  }
}