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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      id,
      title, 
      description, 
      price, 
      duration, 
      level, 
      category, 
      published 
    } = body

    if (!id || !title || !description) {
      return NextResponse.json(
        { error: 'ID, title, and description are required' },
        { status: 400 }
      )
    }

    const course = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        price: parseFloat(price) || 0,
        duration: parseInt(duration) || 0,
        level: level || 'BEGINNER',
        category: category || 'General',
        published,
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

    return NextResponse.json(course)
  } catch (error) {
    console.error('Error updating course:', error)
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    await prisma.course.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error('Error deleting course:', error)
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}