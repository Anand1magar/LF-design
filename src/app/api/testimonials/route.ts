import { NextResponse } from "next/server";
import { carouselTestimonials, featuredTestimonials } from "@/data/testimonialsData";

/**
 * GET /api/testimonials — Returns testimonial data
 * Query params:
 *   ?type=carousel   — only carousel testimonials
 *   ?type=featured   — only featured testimonials
 *   (default: all)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (type === "carousel") {
    return NextResponse.json({ success: true, count: carouselTestimonials.length, data: carouselTestimonials });
  }

  if (type === "featured") {
    return NextResponse.json({ success: true, count: featuredTestimonials.length, data: featuredTestimonials });
  }

  return NextResponse.json({
    success: true,
    data: {
      carousel: carouselTestimonials,
      featured: featuredTestimonials,
    },
  });
}
