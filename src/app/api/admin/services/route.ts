import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, description, price, popular, iconName, availableDays, timeSlots } = await request.json();

  if (!name || price == null)
    return NextResponse.json({ error: "Name and price are required." }, { status: 400 });

  const count = await prisma.service.count();
  const service = await prisma.service.create({
    data: {
      name,
      description: description || null,
      price: Number(price),
      popular: Boolean(popular),
      iconName: iconName || null,
      sortOrder: count,
      availableDays: availableDays ?? "1,2,3,4,5,6",
      timeSlots: timeSlots ?? "11:00,12:30,14:00,15:30,17:00,18:30,20:00",
    },
  });

  return NextResponse.json(service, { status: 201 });
}
