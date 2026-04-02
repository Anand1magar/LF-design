import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * POST /api/snap-config — Saves PortfolioShowcase snap config to source code
 * Dev-only endpoint (migrated from Vite plugin snapConfigWriterPlugin)
 */
export async function POST(request: Request) {
  try {
    const config = await request.json();
    const filePath = join(
      process.cwd(),
      "src/components/sections/PortfolioShowcase.tsx"
    );
    const source = readFileSync(filePath, "utf-8");

    const defaultsBlock = `const DEFAULTS: SnapConfig = ${JSON.stringify(config, null, 2)};`;
    const updated = source.replace(
      /const DEFAULTS: SnapConfig = \{[\s\S]*?\n\};/,
      defaultsBlock
    );

    if (updated === source) {
      return NextResponse.json(
        { success: false, error: "Could not find DEFAULTS block in source" },
        { status: 400 }
      );
    }

    writeFileSync(filePath, updated, "utf-8");
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
