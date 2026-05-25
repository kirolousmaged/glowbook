import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";
  const date = searchParams.get("date") ?? "";
  const service = searchParams.get("service") ?? "";
  const status = searchParams.get("status") ?? "";

  const bookings = await prisma.booking.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { clientName: { contains: search } },
                { clientPhone: { contains: search } },
                { clientEmail: { contains: search } },
              ],
            }
          : {},
        date ? { bookingDate: date } : {},
        service ? { serviceType: service } : {},
        status ? { status } : {},
      ],
    },
    orderBy: [{ bookingDate: "desc" }, { bookingTime: "asc" }],
  });

  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { clientName, clientPhone, clientEmail, serviceType, bookingDate, bookingTime, notes, promoCode } = body;

  if (!clientName || !clientPhone || !bookingDate || !bookingTime || !serviceType)
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

  const booking = await prisma.booking.create({
    data: { clientName, clientPhone, clientEmail: clientEmail || null, serviceType, bookingDate, bookingTime, notes: notes || null, promoCode: promoCode || null },
  });

  return NextResponse.json(booking, { status: 201 });
}
