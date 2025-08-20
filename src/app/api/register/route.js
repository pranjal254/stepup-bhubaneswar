import { NextResponse } from "next/server";

// Dynamic import to handle build issues
let prisma = null;

async function getPrisma() {
  if (!prisma) {
    try {
      const { prisma: prismaClient } = await import("@/lib/prisma");
      prisma = prismaClient;
    } catch (error) {
      console.error("Prisma import error:", error);
      return null;
    }
  }
  return prisma;
}

export async function POST(request) {
  try {
    const prismaClient = await getPrisma();
    if (!prismaClient) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const data = await request.json();
    const { name, email, phone, age, experience, songs, selectedSongs } = data;

    // Validate required fields
    if (!name || !email || !phone || !age || !songs) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (songs < 3 && (!selectedSongs || selectedSongs.length !== songs)) {
      return NextResponse.json(
        { error: "Please select the required number of songs" },
        { status: 400 }
      );
    }

    // Check if email or phone already exists
    const existingRegistration = await prismaClient.registration.findFirst({
      where: {
        OR: [{ email: email.toLowerCase() }, { phone: phone }],
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "Email or phone number already registered" },
        { status: 409 }
      );
    }

    // Get current registration count for pricing
    const currentRegistrations = await prismaClient.registration.count();
    const isEarlyBird = currentRegistrations < 30;

    // Calculate pricing
    let price;
    if (songs === 1) {
      price = isEarlyBird ? 899 : 999;
    } else if (songs === 2) {
      price = isEarlyBird ? 1649 : 1799;
    } else if (songs === 3) {
      price = isEarlyBird ? 2449 : 2549;
    } else {
      return NextResponse.json(
        { error: "Invalid song count" },
        { status: 400 }
      );
    }

    // Create new registration
    const newRegistration = await prismaClient.registration.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        age: parseInt(age),
        experience: experience.toUpperCase(),
        songs: parseInt(songs),
        selectedSongs: JSON.stringify(selectedSongs || []),
        price,
        status: "PENDING",
      },
    });

    console.log("New registration created:", newRegistration.id);

    return NextResponse.json(
      {
        message: "Registration successful",
        registration: {
          id: newRegistration.id,
          name: newRegistration.name,
          email: newRegistration.email,
          songs: newRegistration.songs,
          price: newRegistration.price,
          status: newRegistration.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    // Handle Prisma specific errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email or phone number already registered" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const prismaClient = await getPrisma();
    if (!prismaClient) {
      return NextResponse.json({
        registrations: [],
        stats: { total: 0, paid: 0, pending: 0, revenue: 0 },
      });
    }

    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const songs = url.searchParams.get("songs");

    let where = {};

    if (status && status !== "all") {
      where.status = status.toUpperCase();
    }

    if (songs && songs !== "all") {
      where.songs = parseInt(songs);
    }

    // Fetch registrations with filters
    const registrations = await prismaClient.registration.findMany({
      where,
      orderBy: {
        registeredAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        age: true,
        experience: true,
        songs: true,
        selectedSongs: true, // Make sure this is included
        price: true,
        status: true,
        transactionId: true,
        paymentMethod: true,
        paidAt: true,
        registeredAt: true,
        notes: true,
      },
    });

    // Calculate stats
    const [totalCount, paidCount, pendingCount, revenueResult] =
      await Promise.all([
        prismaClient.registration.count(),
        prismaClient.registration.count({ where: { status: "PAID" } }),
        prismaClient.registration.count({ where: { status: "PENDING" } }),
        prismaClient.registration.aggregate({
          where: { status: "PAID" },
          _sum: { price: true },
        }),
      ]);

    const stats = {
      total: totalCount,
      paid: paidCount,
      pending: pendingCount,
      revenue: revenueResult._sum.price || 0,
    };

    // Format registrations for frontend - KEEP selectedSongs as is
    const formattedRegistrations = registrations.map((reg) => ({
      ...reg,
      experience: reg.experience.toLowerCase(),
      status: reg.status.toLowerCase(),
      paymentMethod: reg.paymentMethod?.toLowerCase() || null,
      // Don't modify selectedSongs here - keep it as stored in DB
    }));

    return NextResponse.json({
      registrations: formattedRegistrations,
      stats,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json({
      registrations: [],
      stats: { total: 0, paid: 0, pending: 0, revenue: 0 },
    });
  }
}

// ... rest of PATCH and DELETE methods with same error handling pattern
export async function PATCH(request) {
  try {
    const prismaClient = await getPrisma();
    if (!prismaClient) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const {
      id,
      status,
      transactionId,
      paymentMethod = "UPI",
      notes,
    } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if registration exists
    const existingRegistration = await prismaClient.registration.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingRegistration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData = {
      status: status.toUpperCase(),
      transactionId:
        transactionId ||
        `TXN${Date.now()}${Math.random()
          .toString(36)
          .substr(2, 5)
          .toUpperCase()}`,
      paymentMethod: paymentMethod.toUpperCase(),
      paidAt: status.toLowerCase() === "paid" ? new Date() : null,
    };

    if (notes !== undefined) {
      updateData.notes = notes;
    }

    // Update registration
    const updatedRegistration = await prismaClient.registration.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    console.log(
      "Registration updated:",
      updatedRegistration.id,
      "Status:",
      updatedRegistration.status
    );

    // Format response
    const formattedRegistration = {
      ...updatedRegistration,
      experience: updatedRegistration.experience.toLowerCase(),
      status: updatedRegistration.status.toLowerCase(),
      paymentMethod: updatedRegistration.paymentMethod?.toLowerCase() || null,
    };

    return NextResponse.json({
      message: "Registration updated successfully",
      registration: formattedRegistration,
    });
  } catch (error) {
    console.error("Error updating registration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
