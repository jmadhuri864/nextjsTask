import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
            lessons: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      description, 
      price, 
      duration, 
      level, 
      category, 
      instructorId, 
      published = false 
    } = body

    if (!title || !description || !instructorId) {
      return NextResponse.json(
        { error: 'Title, description, and instructorId are required' },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: parseFloat(price) || 0,
        duration: parseInt(duration) || 0,
        level: level || 'BEGINNER',
        category: category || 'General',
        published,
        instructorId: parseInt(instructorId),
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}