import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Create new registration
export async function POST(request) {
  try {
    const data = await request.json()
    const { name, email, phone, age, experience, songs } = data
    
    // Validate required fields
    if (!name || !email || !phone || !age || !songs) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if email or phone already exists
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { phone: phone }
        ]
      }
    })
    
    if (existingRegistration) {
      return NextResponse.json(
        { error: 'Email or phone number already registered' },
        { status: 409 }
      )
    }

    // Get current registration count for pricing
    const currentRegistrations = await prisma.registration.count()
    const isEarlyBird = currentRegistrations < 30
    
    // Calculate pricing
    let price
    if (songs === 1) {
      price = isEarlyBird ? 899 : 999
    } else if (songs === 2) {
      price = isEarlyBird ? 1649 : 1799
    } else if (songs === 3) {
      price = isEarlyBird ? 2500 : 2599
    } else {
      return NextResponse.json(
        { error: 'Invalid song count' },
        { status: 400 }
      )
    }

    // Create new registration
    const newRegistration = await prisma.registration.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        age: parseInt(age),
        experience: experience.toUpperCase(),
        songs: parseInt(songs),
        price,
        status: 'PENDING'
      }
    })
    
    console.log('New registration created:', newRegistration.id)

    return NextResponse.json(
      { 
        message: 'Registration successful',
        registration: {
          id: newRegistration.id,
          name: newRegistration.name,
          email: newRegistration.email,
          songs: newRegistration.songs,
          price: newRegistration.price,
          status: newRegistration.status
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    
    // Handle Prisma specific errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email or phone number already registered' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET - Fetch all registrations with optional filters
export async function GET(request) {
  try {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const songs = url.searchParams.get('songs')
    
    // Build filter object
    let where = {}
    
    if (status && status !== 'all') {
      where.status = status.toUpperCase()
    }
    
    if (songs && songs !== 'all') {
      where.songs = parseInt(songs)
    }
    
    // Fetch registrations with filters
    const registrations = await prisma.registration.findMany({
      where,
      orderBy: {
        registeredAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        age: true,
        experience: true,
        songs: true,
        price: true,
        status: true,
        transactionId: true,
        paymentMethod: true,
        paidAt: true,
        registeredAt: true,
        notes: true
      }
    })
    
    // Calculate stats
    const [totalCount, paidCount, pendingCount, revenueResult] = await Promise.all([
      prisma.registration.count(),
      prisma.registration.count({ where: { status: 'PAID' } }),
      prisma.registration.count({ where: { status: 'PENDING' } }),
      prisma.registration.aggregate({
        where: { status: 'PAID' },
        _sum: { price: true }
      })
    ])
    
    const stats = {
      total: totalCount,
      paid: paidCount,
      pending: pendingCount,
      revenue: revenueResult._sum.price || 0
    }
    
    // Format registrations for frontend
    const formattedRegistrations = registrations.map(reg => ({
      ...reg,
      experience: reg.experience.toLowerCase(),
      status: reg.status.toLowerCase(),
      paymentMethod: reg.paymentMethod?.toLowerCase() || null
    }))
    
    return NextResponse.json({
      registrations: formattedRegistrations,
      stats
    })
    
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH - Update registration status (mark as paid)
export async function PATCH(request) {
  try {
    const { id, status, transactionId, paymentMethod = 'UPI', notes } = await request.json()
    
    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Check if registration exists
    const existingRegistration = await prisma.registration.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!existingRegistration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      )
    }
    
    // Prepare update data
    const updateData = {
      status: status.toUpperCase(),
      transactionId: transactionId || `TXN${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      paymentMethod: paymentMethod.toUpperCase(),
      paidAt: status.toLowerCase() === 'paid' ? new Date() : null
    }
    
    if (notes !== undefined) {
      updateData.notes = notes
    }
    
    // Update registration
    const updatedRegistration = await prisma.registration.update({
      where: { id: parseInt(id) },
      data: updateData
    })
    
    console.log('Registration updated:', updatedRegistration.id, 'Status:', updatedRegistration.status)
    
    // Format response
    const formattedRegistration = {
      ...updatedRegistration,
      experience: updatedRegistration.experience.toLowerCase(),
      status: updatedRegistration.status.toLowerCase(),
      paymentMethod: updatedRegistration.paymentMethod?.toLowerCase() || null
    }
    
    return NextResponse.json({
      message: 'Registration updated successfully',
      registration: formattedRegistration
    })
    
  } catch (error) {
    console.error('Error updating registration:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a registration (optional, for admin cleanup)
export async function DELETE(request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Registration ID required' },
        { status: 400 }
      )
    }
    
    // Check if registration exists
    const existingRegistration = await prisma.registration.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!existingRegistration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      )
    }
    
    // Delete registration
    await prisma.registration.delete({
      where: { id: parseInt(id) }
    })
    
    console.log('Registration deleted:', id)
    
    return NextResponse.json({
      message: 'Registration deleted successfully'
    })
    
  } catch (error) {
    console.error('Error deleting registration:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}