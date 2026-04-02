import { NextResponse } from "next/server";
import { portfolioItems } from "@/data/portfolioData";

/**
 * GET /api/portfolio — Returns all portfolio items
 * Query params:
 *   ?slug=xxx  — filter by slug
 *   ?category=xxx — filter by category
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");

  let items = portfolioItems;

  if (slug) {
    items = items.filter((item) => item.slug === slug);
  }

  if (category) {
    items = items.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  return NextResponse.json({
    success: true,
    count: items.length,
    data: items,
  });
}
