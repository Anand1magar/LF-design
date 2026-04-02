import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="text-center">
        <h1 className="font-['Figtree',sans-serif] text-[48px] tracking-[-1.5px] text-[#1a1a1a]">
          Project not found
        </h1>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 font-['Figtree',sans-serif] text-[14px] text-[#888] hover:text-[#1a1a1a] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
