import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useRef, useState, useCallback } from "react";
import imgGeminiTeam from "src/assets/about/Anand.png";
import imgTest1 from "src/assets/about/Saira_edited.png";
import imgTest2 from "src/assets/about/sid_closeup_stillgrab.png";
import imgTest3 from "src/assets/about/Sid_edited.png";
import imgTest4 from "src/assets/about/Test2_AI enhanced.png";


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
  { name: "Abhash Bikram Thapa", role: "Director of Design" },
  { name: "Abhinab Prasai", role: "Senior Product Designer" },
  { name: "Alish Ratna Tamrakar", role: "Product Designer" },
  { name: "Anand Magar", role: "Product Designer" },
  { name: "Anish Maharjan", role: "Senior Product Designer" },
  { name: "Ankit J. Karki", role: "Graphic Designer" },
  { name: "Bishan Ale", role: "Lead Graphic Designer" },
  { name: "Elish Budhathoki", role: "Senior Graphic Designer" },
  { name: "Grikshmi Manandhar", role: "Senior Product Designer" },
  { name: "Niraj Thapa", role: "Design Architect" },
  { name: "Pema Ghising", role: "Lead Graphic Designer" },
  { name: "Prabesh Shakya", role: "Principal Product Designer" },
  { name: "Prajwal Bajracharya", role: "Senior Product Designer" },
  { name: "Raush Acharya", role: "Associate Graphic Designer" },
  { name: "Rujen Shrestha", role: "Product Designer" },
  { name: "Sabina Maharjan", role: "Principal Product Designer" },
  { name: "Saira Khadka", role: "Product Designer" },
  { name: "Sandeep Shrestha", role: "Senior Product Designer" },
  { name: "Saroj Shahi", role: "Design Architect " },
  { name: "Shreejit Hora", role: "Product Designer" },
  { name: "Shristi Shrestha", role: "Product Designer" },
  { name: "Shyam Adhikari", role: "Lead Product Designer" },
  { name: "Siddhartha Khadgi", role: "Senior Product Designer" },
  { name: "Supriya Amatya", role: "Senior Product Designer" },
  { name: "Suyesh Tandukar", role: "Senior Product Designer" },
];

/* ═══════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════ */
export function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════
         1. HERO
         ═══════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-[1190px] mx-auto px-5 sm:px-8 md:px-16 lg:px-0 pt-[120px] md:pt-[188px] pb-20 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-[716px] flex flex-col gap-[14px]"
          >
            <h2 className="font-['Syne',sans-serif] font-normal text-[36px] sm:text-[48px] md:text-[64px] leading-[1.1] tracking-[-2.38px] text-[#1a1a1a]">
              We build the products that define the next.
            </h2>
            <p className="font-['Figtree',sans-serif] font-light text-[18px] md:text-[20px] leading-[32.5px] tracking-[0.5px] text-[#555] max-w-[663px]">
              Our team focused on bridging the gap between ambitious concepts
              and technical reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         2. FULL-WIDTH TEAM PHOTO
         ═══════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full h-[300px] sm:h-[500px] md:h-[700px] relative overflow-hidden bg-[#c9c9c9]"
      >
        <img
          src={imgGeminiTeam}
          alt="Our team"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.section>

      {/* ═══════════════════════════════════════════
         3. STATS SECTION
         ═══════════════════════════════════════════ */}
      <section className="bg-[#f5f5f5] py-[80px] md:py-[180px]">
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
                  className="font-['Instrument_Sans',sans-serif] text-[#111] text-[52.812px] md:text-[53px] tracking-[-1px]"
                  style={{ lineHeight: 1.2 }}
                >
                  {stat.number}
                </p>
                <div className="flex flex-col gap-[15px]">
                  <p className="font-['Inter',sans-serif] font-medium text-black text-[22.005px] md:text-[22px] tracking-[-0.8802px] leading-[28.606px]">
                    {stat.label}
                  </p>
                  <p className="font-['Figtree',sans-serif] text-[#595959] text-[15.403px] md:text-[15px] capitalize leading-[normal]">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         4. BUILT BY SPECIALISTS — Team name grid
         ═══════════════════════════════════════════ */}
      <section className="bg-white pt-20 pb-[40px] md:py-[180px]">
        <div className="max-w-[1190px] mx-auto px-5 sm:px-8 md:px-16 lg:px-0">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-[871px] flex flex-col gap-[30px]"
          >
            <h2 className="font-['Figtree',sans-serif] text-[32px] md:text-[48px] leading-[1.05] tracking-[-1px] text-black">
              Built by specialists. Validated by millions.
            </h2>
            <p className="font-['Figtree',sans-serif] font-light text-[18px] md:text-[20px] leading-[32.5px] tracking-[-0.5px] text-[#555]">
              We are a product-first collective. We don't guess we solve. We
              focus on the metrics that matter: conversion, retention, and
              scalability, wrapped in a world-class visual identity.
            </p>
          </motion.div>

          {/* Team grid */}
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
                <p className="font-['Figtree',sans-serif] text-[20px] md:text-[24px] text-black whitespace-normal break-words leading-[1.2]">
                  {member.name}
                </p>
                <p className="font-['Figtree',sans-serif] text-[14px] md:text-[16px] text-black opacity-40">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         5. MISSION STATEMENT + GALLERY
         ═══════════════════════════════════════════ */}
      <section className="bg-white px-0 py-[100px]">
        <div className="max-w-[1190px] mx-auto px-5 sm:px-8 md:px-16 lg:px-0">
          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-0">
            {/* Left spacer (matches Figma) */}
            <div className="hidden md:block md:w-[419px] shrink-0" />

            {/* Right content */}
            <div className="flex-1 flex flex-col gap-[30px]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-['Figtree',sans-serif] text-[32px] md:text-[48px] leading-[1.1] tracking-[-1px] text-black">
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
                className="font-['Inter',sans-serif] font-medium text-[#7a7a7a] text-[17px] md:text-[20px] leading-[26px] tracking-[-0.8px] max-w-[771px]"
              >Our team is small but highly organized, working seamlessly across branding, design, and development. We run projects with precision, clear communication, and full transparency, so nothing slips through the cracks.</motion.p>
            </div>
          </div>
        </div>

        {/* Gallery — 3 images in a row, edge-to-edge overflow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 md:mt-24 flex gap-5 md:gap-[63px] justify-center items-center px-5 overflow-hidden"
        >
          <div className="w-[320px] sm:w-[500px] md:w-[1050px] h-[200px] sm:h-[350px] md:h-[520px] shrink-0 overflow-hidden rounded-lg">
            <img
              src={imgTest1}
              alt="Team gallery 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[320px] sm:w-[500px] md:w-[1050px] h-[200px] sm:h-[350px] md:h-[520px] shrink-0 overflow-hidden rounded-lg">
            <img
              src={imgTest2}
              alt="Team gallery 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[320px] sm:w-[500px] md:w-[1050px] h-[200px] sm:h-[350px] md:h-[520px] shrink-0 overflow-hidden rounded-lg">
            <img
              src={imgTest2}
              alt="Team gallery 3"
              className="w-full h-full object-cover"
            />
          </div>
                <div className="w-[320px] sm:w-[500px] md:w-[1050px] h-[200px] sm:h-[350px] md:h-[520px] shrink-0 overflow-hidden rounded-lg">
            <img
              src={imgTest3}
              alt="Team gallery 3"
              className="w-full h-full object-cover"
            />
          </div>
                <div className="w-[320px] sm:w-[500px] md:w-[1050px] h-[200px] sm:h-[350px] md:h-[520px] shrink-0 overflow-hidden rounded-lg">
            <img
              src={imgTest4}
              alt="Team gallery 4"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
         6. CTA — Ready to Start Your Project?
         ═══════════════════════════════════════════ */}
      

      
    </div>
  );
}