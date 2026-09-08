"use client";

import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const PROJECTS = [
  {
    title: "E-Commerce Storefront Redesign",
    description:
      "Led a full frontend overhaul for a high-traffic online retailer. Improved Core Web Vitals scores by 40%, resulting in a 22% lift in organic traffic.",
    tags: ["NextJS", "Tailwind CSS", "SEO", "Performance"],
    featured: true,
  },
  {
    title: "Custom WordPress Theme Suite",
    description:
      "Designed and developed a modular, Gutenberg-compatible WordPress theme for a media company with 50k+ monthly readers.",
    tags: ["WordPress", "PHP", "SASS", "ACF"],
    featured: false,
  },
  {
    title: "Marketing Analytics Dashboard",
    description:
      "Built an internal data visualization tool that consolidates Google Analytics, Search Console, and ad spend data into a unified real-time dashboard.",
    tags: ["ReactJS", "Data Analysis", "Chart.js", "API"],
    featured: false,
  },
  {
    title: "SEO Audit & Content Strategy",
    description:
      "Executed a comprehensive technical SEO audit and content gap analysis for a SaaS brand, driving a 3x increase in keyword rankings within 6 months.",
    tags: ["SEO", "Analytics", "Content Strategy", "Technical SEO"],
    featured: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProjectsGrid() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="px-6 md:px-10 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[#BEBEBE] text-sm font-semibold tracking-widest uppercase mb-2">
          My Work
        </p>
        <h2
          id="projects-heading"
          className="text-[#F2F2F2] font-bold mb-12"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          Selected Projects
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <motion.article
            key={project.title}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={i}
            className={`
              group relative rounded-2xl p-7 border transition-all duration-300 cursor-pointer
              hover:border-[#566072] hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20
              ${project.featured
                ? "bg-[#566072]/20 border-[#566072]/50 col-span-1 desktop:col-span-2"
                : "bg-[#0D0D0D] border-[#566072]/20"
              }
            `}
            aria-label={`Project: ${project.title}`}
          >
            {project.featured && (
              <span className="absolute top-5 right-5 text-xs font-semibold px-3 py-1 rounded-full bg-[#F2F2F2]/10 text-[#BEBEBE] border border-[#566072]/30">
                Featured
              </span>
            )}

            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-[#F2F2F2] font-bold text-xl md:text-2xl leading-snug">
                {project.title}
              </h3>
              <ArrowTopRightOnSquareIcon
                className="w-5 h-5 text-[#566072] flex-shrink-0 mt-1 group-hover:text-[#F2F2F2] transition-colors"
                aria-hidden="true"
              />
            </div>

            <p className="text-[#BEBEBE] text-base md:text-lg leading-relaxed mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-[#212A3F] text-[#BEBEBE] border border-[#566072]/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}


