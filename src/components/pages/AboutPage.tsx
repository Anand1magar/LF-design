"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { imgSrc } from "@/lib/img";
import imgGeminiTeam from "figma:asset/992614c01d1eceb6d9e290868cb625302c323f1f.png";
// import imgTest1 from "src/assets/about/Anand.png";
// import imgTest2 from "figma:asset/091141f21c75218ecd91e4991bd101b8dcc547a5.png";
// import imgTest3 from "figma:asset/091141f21c75218ecd91e4991bd101b8dcc547a5.png";
// import imgTest4 from "figma:asset/091141f21c75218ecd91e4991bd101b8dcc547a5.png";

import imgTest1 from "@/assets/about/Saira_edited.png";
import imgTest2 from "@/assets/about/sid_closeup_stillgrab.png";
import imgTest3 from "@/assets/about/Sid_edited.png";
import imgTest4 from "@/assets/about/Anand.png";
import imgTest5 from "@/assets/about/enhanced.png";



/* ─── Stats data ─── */
const stats = [
  {
    number: "17+",
    label: "Product Launched",
    desc: "Helping brands make their mark online.",
  },
  {
    number: "1.5M+",
    label: "Users Reached",
    desc: "Our designs engage millions globally.",
  },
  {
    number: "98%",
    label: "Client Satisfaction Rate",
    desc: "We build long-term partnerships through proven results.",
  },
  {
    number: "10+",
    label: "Years of Expertise",
    desc: "Decades of experience in delivering impactful digital solutions.",
  },
];

/* ─── Team members grid ─── */
const teamGrid = [
  { name: "Abhash Bikram Thapa", role: "Director of Design, AI CoE" },
  { name: "Abhinab Prasai", role: "Senior Designer, Product Design" },
  { name: "Alish Ratna Tamrakar", role: "Designer, Product Design" },
  { name: "Anand Magar", role: "Product Designer" },
  { name: "Anish Maharjan", role: "Senior Designer, Product Design" },
  { name: "Ankit J. Karki", role: "Designer, Graphic Design" },
  { name: "Bishan Ale", role: "Lead Designer, Graphic Design" },
  { name: "Elish Budhathoki", role: "Senior Designer, Graphic Design" },
  { name: "Grikshmi Manandhar", role: "Senior Designer, Product Design" },
  { name: "Niraj Thapa", role: "Design Architect, Product Design" },
  { name: "Pema Ghising", role: "Lead Designer, Graphic Design" },
  { name: "Prabesh Shakya", role: "Principal Designer, Product Design" },
  { name: "Prajwal Bajracharya", role: "Senior Designer, Product Design" },
  { name: "Raush Acharya", role: "Associate Designer, Graphic Design" },
  { name: "Rujen Shrestha", role: "Designer, Product Design" },
  { name: "Sabina Maharjan", role: "Principal Designer, Product Design" },
  { name: "Saira Khadka", role: "Designer, Product Design" },
  { name: "Sandeep Shrestha", role: "Senior Designer, Product Design" },
  { name: "Saroj Shahi", role: "Design Architect | Design Team Manager" },
  { name: "Shreejit Hora", role: "Designer, Product Design" },
  { name: "Shristi Shrestha", role: "Designer, Product Design" },
  { name: "Shyam Adhikari", role: "Lead Designer, Product Design" },
  { name: "Siddhartha Khadgi", role: "Senior Designer, Product Design" },
  { name: "Supriya Amatya", role: "Senior Designer, Product Design" },
  { name: "Suyesh Tandukar", role: "Senior Designer, Product Design" },
];

const galleryImages = [
  imgSrc(imgTest1),
  imgSrc(imgTest2),
  imgSrc(imgTest3),
  imgSrc(imgTest4),
  imgSrc(imgTest5),
];

export function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO */}
      <section className="bg-white">
        <div className="max-w-[1190px] mx-auto px-5 sm:px-8 md:px-16 lg:px-0 pt-[120px] md:pt-[188px] pb-20 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-[716px] flex flex-col gap-[14px]"
          >
            <h2 className="font-['Syne',sans-serif] font-normal text-display-md sm:text-display-xl md:text-display-3xl leading-[1.1] tracking-[-2.38px] text-(--text-body)">
              We build the products that define the next.
            </h2>
            <p className="font-['Figtree',sans-serif] font-light text-lg md:text-xl leading-[32.5px] tracking-[0.5px] text-(--text-secondary) max-w-[663px]">
              Our team focused on bridging the gap between ambitious concepts
              and technical reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. FULL-WIDTH TEAM PHOTO */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full h-[300px] sm:h-[500px] md:h-[700px] relative overflow-hidden bg-(--color-ink-300)"
      >
        <img
          src={imgSrc(imgGeminiTeam)}
          alt="Our team"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.section>

      {/* 3. STATS SECTION */}
      <section className="bg-(--bg-muted) py-[80px] md:py-[180px]">
        <div className="max-w-[1190px] mx-auto px-6 sm:px-8 md:px-16 lg:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-[13.203px] px-[26.406px] py-[35.208px] h-[246px] md:h-[336px] md:rounded-[13px] md:p-[26px] flex flex-col justify-between"
              >
                <p
                  className="font-['Instrument_Sans',sans-serif] text-(--color-ink-800) text-display-2xl md:text-display-2xl tracking-[-1px]"
                  style={{ lineHeight: 1.2 }}
                >
                  {stat.number}
                </p>
                <div className="flex flex-col gap-[15px]">
                  <p className="font-['Inter',sans-serif] font-medium text-black text-2xl md:text-2xl tracking-[-0.8802px] leading-[28.606px]">
                    {stat.label}
                  </p>
                  <p className="font-['Figtree',sans-serif] text-(--text-secondary) text-base capitalize leading-[normal]">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUILT BY SPECIALISTS */}
      <section className="bg-white pt-20 pb-[40px] md:py-[180px]">
        <div className="max-w-[1190px] mx-auto px-5 sm:px-8 md:px-16 lg:px-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-[871px] flex flex-col gap-[30px]"
          >
            <h2 className="font-['Figtree',sans-serif] text-display-sm md:text-display-xl leading-[1.05] tracking-[-1px] text-black">
              Built by specialists. Validated by millions.
            </h2>
            <p className="font-['Figtree',sans-serif] font-light text-lg md:text-xl leading-[32.5px] tracking-[-0.5px] text-(--text-secondary)">
              We are a product-first collective. We don&apos;t guess we solve. We
              focus on the metrics that matter: conversion, retention, and
              scalability, wrapped in a world-class visual identity.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 lg:gap-x-[87px] gap-y-9 md:gap-y-[47px] pt-[60px]">
            {teamGrid.map((member, i) => (
              <motion.div
                key={`${member.name}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="flex flex-col gap-0.5 min-w-0"
              >
                <p className="font-['Figtree',sans-serif] text-xl md:text-2xl text-black whitespace-normal break-words leading-[1.2]">
                  {member.name}
                </p>
                <p className="font-['Figtree',sans-serif] text-sm md:text-base text-black opacity-40">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MISSION STATEMENT + GALLERY */}
      <section className="bg-white px-0 py-[100px]">
        <div className="max-w-[1190px] mx-auto px-5 sm:px-8 md:px-16 lg:px-0">
          <div className="flex flex-col md:flex-row gap-8 md:gap-0">
            <div className="hidden md:block md:w-[419px] shrink-0" />
            <div className="flex-1 flex flex-col gap-[30px]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-['Figtree',sans-serif] text-display-sm md:text-display-xl leading-[1.1] tracking-[-1px] text-black">
                  At LF Studio, every project is powered by people who bring
                  different skills but share the same commitment to clarity and
                  quality.
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-['Inter',sans-serif] font-medium text-(--color-ink-450) text-base md:text-xl leading-[26px] tracking-[-0.8px] max-w-[771px]"
              >
                Our team is small but highly organized, working seamlessly across
                branding, design, and development. We run projects with precision,
                clear communication, and full transparency, so nothing slips
                through the cracks.
              </motion.p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 md:mt-24 px-5 overflow-hidden"
        >
          <motion.div
            className="flex w-max items-center gap-5 md:gap-[30px]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...galleryImages, ...galleryImages].map((src, i) => (
              <div
                key={`team-gallery-${i}`}
                className="w-[260px] sm:w-[420px] md:w-[1050px] h-[200px] sm:h-[350px] md:h-[520px] shrink-0 overflow-hidden rounded-lg"
              >
                <img
                  src={src}
                  alt={`Team gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
