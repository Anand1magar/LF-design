import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the team behind LF Studio. We build brands, products, and experiences powered by AI.",
  alternates: { canonical: "https://www.lftechnology.com/lfdesign/about" },
  openGraph: { url: "https://www.lftechnology.com/lfdesign/about" },
  twitter: { card: "summary_large_image" },
};

export default function About() {
  return <AboutPage />;
}
