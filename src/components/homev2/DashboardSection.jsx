"use client";

import { motion } from "framer-motion";
import {
  FolderOpenIcon,
  UserIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  ArrowUpRightIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import ToolsMarquee from "./ToolsMarquee";

// ── Data ────────────────────────────────────────────────────────────
const ROLES = ["Frontend Developer", "SEO Specialist", "WP Developer", "Data Analyst"];

// ── Animation variants ───────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ── Base Card Wrapper ────────────────────────────────────────────────
function BentoCard({ href, className, children, glowColor = "rgba(86,96,114,0.15)" }) {
  const scrollTo = () => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      variants={cardVariants}
      onClick={scrollTo}
      className={`
        group relative rounded-2xl p-5 text-left w-full h-full
        bg-white/5 backdrop-blur-md border border-white/10
        hover:bg-white/10 hover:border-[#566072]/60
        hover:shadow-xl hover:shadow-black/30
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-[#566072]/60
        overflow-hidden flex flex-col
        ${className}
      `}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 30% 30%, ${glowColor} 0%, transparent 70%)` }}
        aria-hidden="true"
      />
      {children}
    </motion.button>
  );
}

function CardHeader({ icon: Icon, eyebrow, title }) {
  return (
    <div className="flex items-start justify-between mb-2 relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-[#566072]/30 flex items-center justify-center border border-[#566072]/20 group-hover:bg-[#566072]/50 transition-colors shrink-0">
          <Icon className="w-4 h-4 text-[#F2F2F2]" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[#BEBEBE] text-[0.6rem] font-semibold tracking-widest uppercase leading-none">
            {eyebrow}
          </p>
          <p className="text-[#F2F2F2] font-bold text-sm leading-tight mt-0.5">
            {title}
          </p>
        </div>
      </div>
      <ArrowUpRightIcon
        className="w-3.5 h-3.5 text-[#566072] group-hover:text-[#F2F2F2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 mt-1"
        aria-hidden="true"
      />
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────
export default function DashboardSection() {
  return (
    <section id="home" aria-label="Portfolio dashboard" className="min-h-screen flex flex-col justify-start md:justify-center px-6 md:px-10 pt-24 md:pt-16 pb-12 md:pb-8">
      
      {/* ── Compact Header ── */}
      <motion.div variants={headerVariants} initial="hidden" animate="visible" className="mb-4">
        <p className="text-[#BEBEBE] text-xs font-semibold tracking-widest uppercase mb-1.5">Hello, I&apos;m</p>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
          <h1 className="text-[#F2F2F2] font-extrabold leading-none tracking-tight" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Vencent Domingo
          </h1>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Professional roles">
          {ROLES.map((role) => (
            <span key={role} className="px-2.5 py-1 rounded-full bg-[#566072]/25 border border-[#566072]/40 text-[#F2F2F2] text-[0.65rem] font-medium">
              {role}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Tools Marquee Widget ── */}
      <motion.div variants={headerVariants} initial="hidden" animate="visible">
        <ToolsMarquee />
      </motion.div>

      {/* ── Bento Widget Grid ── */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 desktop:grid-cols-3 gap-3 flex-1">
        
        {/* ROW 1 */}
        <BentoCard href="#projects" className="desktop:col-span-2 min-h-[320px]">
          <div className="flex flex-col md:flex-row gap-4 h-full relative z-10">
            <div className="flex-1 flex flex-col">
              <CardHeader icon={FolderOpenIcon} eyebrow="My Work" title="Projects" />
              <p className="text-[#BEBEBE] text-xs leading-relaxed mb-4 max-w-sm">
                Funnels, workflows and apps built to solve real problems. Frontend builds, SEO wins & WordPress themes that ship results.
              </p>
              <div className="mt-auto space-y-2">
                {[
                  { dot: "bg-[#F2F2F2]", text: "E-Commerce Storefront Redesign" },
                  { dot: "bg-[#BEBEBE]", text: "WordPress Theme Suite" },
                  { dot: "bg-[#566072]", text: "Analytics Dashboard" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
                    <span className="text-[#F2F2F2]/80 text-xs font-medium truncate">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Mock image window */}
            <div className="hidden md:flex w-5/12 shrink-0 rounded-xl bg-[#0D0D0D] border border-white/10 overflow-hidden relative items-center justify-center">
               <div className="absolute top-2.5 left-2.5 flex gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#566072]" />
                 <div className="w-1.5 h-1.5 rounded-full bg-[#566072]" />
                 <div className="w-1.5 h-1.5 rounded-full bg-[#566072]" />
               </div>
               <div className="text-center px-4">
                 <p className="text-white/40 font-serif italic text-lg mb-1.5">Seven days to remember</p>
                 <div className="w-16 h-1 bg-white/10 mx-auto rounded-full" />
               </div>
            </div>
          </div>
        </BentoCard>

        {/* 2 & 3) About & Contact stacked */}
        <div className="flex flex-col gap-3">
          <BentoCard href="#about">
            <CardHeader icon={UserIcon} eyebrow="Who I Am" title="About" />
            <p className="text-[#BEBEBE] text-xs leading-relaxed relative z-10">
              Who I am and how I work. 5+ years crafting digital experiences across web, search & data.
            </p>
          </BentoCard>

          <BentoCard href="#contact" className="flex-1 min-h-[160px]">
            <CardHeader icon={EnvelopeIcon} eyebrow="Let's Talk" title="Contact Me" />
            <p className="text-[#BEBEBE] text-xs leading-relaxed relative z-10 mb-3">
              Open to freelance, full-time & collaboration opportunities.
            </p>
            <div className="mt-auto relative z-10">
              <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold text-[#F2F2F2]/60 group-hover:text-[#F2F2F2] transition-colors border border-white/10 group-hover:border-white/25 rounded-full px-2.5 py-0.5">
                <EnvelopeIcon className="w-3 h-3" />
                hello@vencentdomingo.com
              </span>
            </div>
          </BentoCard>
        </div>

        {/* ROW 2 */}
        {/* 4) Certificates */}
        <BentoCard href="#about">
          <CardHeader icon={AcademicCapIcon} eyebrow="Credentials" title="Certificates" />
          <p className="text-[#BEBEBE] text-[0.65rem] leading-relaxed mb-2 relative z-10">
            Certified Specialist. Aspiring AI Engineer.
          </p>
          <div className="flex items-center justify-center mt-auto py-1 relative z-10">
             <div className="flex flex-col items-center">
               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center mb-1.5">
                 <AcademicCapIcon className="w-6 h-6 text-blue-400" />
               </div>
               <span className="text-[0.6rem] font-bold text-[#F2F2F2] bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30">
                 Certified Pro
               </span>
             </div>
          </div>
        </BentoCard>

        {/* 5) Services */}
        <BentoCard href="#services">
          <CardHeader icon={BriefcaseIcon} eyebrow="What I Build" title="Services" />
          <p className="text-[#BEBEBE] text-[0.65rem] leading-relaxed mb-2 relative z-10">
            What I build for coaches and agencies.
          </p>
          <div className="space-y-1 mt-auto relative z-10">
            {["Coded Funnels", "Custom Automation", "CRM Setup", "Websites"].map((svc, i) => (
              <div key={svc} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                <span className="text-[#F2F2F2]/90 text-[0.7rem] font-medium">{svc}</span>
                <span className="text-[#BEBEBE]/40 text-[0.6rem] font-mono">0{i+1}</span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* 6) Testimonials */}
        <BentoCard href="#testimonials">
          <CardHeader icon={ChatBubbleLeftRightIcon} eyebrow="Feedback" title="Testimonials" />
          <p className="text-[#BEBEBE] text-[0.65rem] leading-relaxed mb-2 relative z-10">
            What the people I build for say about the work.
          </p>
          <div className="space-y-2.5 mt-auto relative z-10">
            {[
              { role: "E-Commerce Director", desc: "Performance & Conversion" },
              { role: "Lead Editor", desc: "CMS Architecture" },
            ].map((t, i) => (
              <div key={i} className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-[#566072]/40 shrink-0 border border-white/10" />
                <div>
                  <p className="text-[#F2F2F2]/90 text-[0.65rem] font-semibold">{t.role}</p>
                  <p className="text-[#BEBEBE]/60 text-[0.6rem]">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

      </motion.div>
    </section>
  );
}
