import { NextResponse } from "next/server";

/**
 * Team data placeholder — add team members to `teamMembers` when ready.
 * GET /api/team
 */
export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Abhash Bikram Thapa",
    role: "Director, Design",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: teamMembers.length,
    data: teamMembers,
  });
}
