"use client";

import { motion } from "framer-motion";
import { ArrowDownIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const ROLES = [
  "Frontend Developer",
  "SEO Specialist",
  "WordPress Theme Developer",
  "Data Analyst",
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroSection() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-20 desktop:pt-0 pb-16"
    >
      {/* Eyebrow */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="text-[#BEBEBE] text-base md:text-lg font-medium tracking-widest uppercase mb-4"
      >
        Hello, I&apos;m
      </motion.p>

      {/* Name */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
        className="text-[#F2F2F2] font-extrabold leading-none tracking-tight"
        style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
      >
        Vencent
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2F2F2] via-[#BEBEBE] to-[#566072]">
          Domingo
        </span>
      </motion.h1>

      {/* Roles pill list */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
        className="flex flex-wrap gap-2 mt-6"
        aria-label="Professional roles"
      >
        {ROLES.map((role) => (
          <span
            key={role}
            className="px-4 py-2 rounded-full bg-[#566072]/30 border border-[#566072]/50 text-[#F2F2F2] text-sm md:text-base font-medium"
          >
            {role}
          </span>
        ))}
      </motion.div>

      {/* Bio */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
        className="text-[#BEBEBE] text-lg md:text-xl leading-relaxed mt-8 max-w-2xl"
      >
        I craft fast, accessible, and beautifully designed digital experiences.
        From pixel-perfect frontends and SEO-optimized content to custom WordPress
        themes and data-driven insights — I bridge the gap between design, code,
        and analytics.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
        className="flex flex-wrap gap-4 mt-10"
      >
        <button
          onClick={scrollToProjects}
          aria-label="View my projects"
          className="flex items-center gap-2 px-7 py-4 rounded-xl bg-[#F2F2F2] text-[#0D0D0D] font-semibold text-lg min-h-[52px] hover:bg-white transition-all duration-200 hover:shadow-lg hover:shadow-[#F2F2F2]/10 active:scale-95"
        >
          View Projects
          <ArrowDownIcon className="w-5 h-5" />
        </button>
        <button
          onClick={scrollToContact}
          aria-label="Get in touch with me"
          className="flex items-center gap-2 px-7 py-4 rounded-xl border border-[#566072] text-[#F2F2F2] font-semibold text-lg min-h-[52px] hover:bg-[#566072]/20 transition-all duration-200 active:scale-95"
        >
          Get In Touch
          <EnvelopeIcon className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={5}
        className="mt-16 flex items-center gap-3 text-[#BEBEBE]/60"
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#566072]" />
        <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
      </motion.div>
    </section>
  );
}


