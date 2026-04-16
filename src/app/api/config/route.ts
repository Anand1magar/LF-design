import { NextResponse } from "next/server";
import { siteConfig, navItems } from "@/data/siteConfig";
import { featureTabs } from "@/data/efficiencyData";
import { processStepsData } from "@/data/processData";

/**
 * GET /api/config — Returns site-wide configuration
 * Useful for server-driven config, content audits, or external integrations.
 * Query params:
 *   ?section=nav       — navigation items only
 *   ?section=brand     — brand/site config only
 *   ?section=process   — process steps content
 *   ?section=efficiency — efficiency feature tabs
 *   (default: all)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  if (section === "nav") {
    return NextResponse.json({ success: true, data: navItems });
  }
  if (section === "brand") {
    return NextResponse.json({ success: true, data: siteConfig });
  }
  if (section === "process") {
    return NextResponse.json({ success: true, count: processStepsData.length, data: processStepsData });
  }
  if (section === "efficiency") {
    return NextResponse.json({ success: true, count: featureTabs.length, data: featureTabs });
  }

  return NextResponse.json({
    success: true,
    data: {
      brand: siteConfig,
      nav: navItems,
      process: processStepsData,
      efficiency: featureTabs,
    },
  });
}
