import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const links = await prisma.socialLink.findMany({ orderBy: { sortOrder: "asc" } });
    return NextResponse.json(links);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { platform, url } = await request.json();
    if (!platform || !url)
      return NextResponse.json({ error: "Platform and URL are required." }, { status: 400 });

    // Upsert: update existing entry for this platform, or create a new one
    const existing = await prisma.socialLink.findFirst({ where: { platform } });
    if (existing) {
      const link = await prisma.socialLink.update({
        where: { id: existing.id },
        data: { url, isActive: true },
      });
      return NextResponse.json(link);
    }

    const count = await prisma.socialLink.count();
    const link = await prisma.socialLink.create({
      data: { platform, url, sortOrder: count },
    });
    return NextResponse.json(link, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { platform } = await request.json();
    await prisma.socialLink.deleteMany({ where: { platform } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
