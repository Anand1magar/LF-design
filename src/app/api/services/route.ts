import { NextResponse } from "next/server";
import { serviceDetails } from "@/data/servicesData";

/**
 * GET /api/services — Returns all service detail cards
 * Query params:
 *   ?title=xxx — filter by title (case-insensitive)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  let items = serviceDetails;

  if (title) {
    items = items.filter((s) =>
      s.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  return NextResponse.json({
    success: true,
    count: items.length,
    data: items,
  });
}
