"use client";

import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  MagnifyingGlassIcon,
  PuzzlePieceIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const SERVICES = [
  {
    icon: CodeBracketIcon,
    title: "Frontend Development",
    description:
      "Building lightning-fast, responsive web interfaces using React, Next.js, and modern CSS. Every pixel is intentional, every interaction is smooth.",
    highlights: ["React & Next.js", "Responsive Design", "Performance Optimization", "Accessibility (WCAG)"],
  },
  {
    icon: MagnifyingGlassIcon,
    title: "SEO Specialization",
    description:
      "Data-driven search engine optimization that goes beyond keywords. From technical audits to content strategy, I help websites rank and convert.",
    highlights: ["Technical SEO Audits", "Core Web Vitals", "Content Strategy", "Schema Markup"],
  },
  {
    icon: PuzzlePieceIcon,
    title: "WordPress Theme Development",
    description:
      "Custom, modular WordPress themes built for speed, flexibility, and ease of use. Fully Gutenberg-compatible and designed to match your brand.",
    highlights: ["Custom Theme Dev", "Gutenberg Blocks", "WooCommerce", "Theme Optimization"],
  },
  {
    icon: ChartBarIcon,
    title: "Data Analysis",
    description:
      "Turning raw data into actionable insights. I analyze web analytics, user behavior, and marketing metrics to inform smarter business decisions.",
    highlights: ["Google Analytics 4", "Data Visualization", "A/B Testing", "Reporting Dashboards"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="px-6 md:px-10 py-20 bg-[#0D0D0D]/40"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[#BEBEBE] text-sm font-semibold tracking-widest uppercase mb-2">
          What I Do
        </p>
        <h2
          id="services-heading"
          className="text-[#F2F2F2] font-bold mb-12"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          Services
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              className="group rounded-2xl p-7 bg-[#212A3F] border border-[#566072]/20 hover:border-[#566072]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
            >
              <div className="w-12 h-12 rounded-xl bg-[#566072]/20 flex items-center justify-center mb-5 group-hover:bg-[#566072]/40 transition-colors">
                <Icon className="w-6 h-6 text-[#F2F2F2]" aria-hidden="true" />
              </div>

              <h3 className="text-[#F2F2F2] font-bold text-xl md:text-2xl mb-3">
                {service.title}
              </h3>

              <p className="text-[#BEBEBE] text-base md:text-lg leading-relaxed mb-6">
                {service.description}
              </p>

              <ul className="space-y-2" aria-label={`${service.title} highlights`}>
                {service.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm md:text-base text-[#BEBEBE]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#566072] flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}


