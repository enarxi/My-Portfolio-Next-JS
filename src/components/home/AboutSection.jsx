"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "50+",  label: "Projects Completed" },
  { value: "30+",  label: "Happy Clients"       },
  { value: "5+",   label: "Years Experience"    },
  { value: "100%", label: "Passion for Craft"   },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="px-6 md:px-10 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[#BEBEBE] text-sm font-semibold tracking-widest uppercase mb-2">
          Who I Am
        </p>
        <h2
          id="about-heading"
          className="text-[#F2F2F2] font-bold mb-12"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          About Me
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-12 items-start">
        {/* Avatar & Stats */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Avatar placeholder */}
          <div
            className="w-52 h-52 rounded-3xl bg-gradient-to-br from-[#566072] to-[#212A3F] flex items-center justify-center border border-[#566072]/40 shadow-2xl"
            aria-label="Profile photo placeholder"
          >
            <span className="text-6xl font-extrabold text-[#F2F2F2] select-none">VD</span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 w-full" aria-label="Career statistics">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-[#212A3F] border border-[#566072]/20 p-5 text-center"
              >
                <p className="text-[#F2F2F2] font-extrabold text-3xl">{stat.value}</p>
                <p className="text-[#BEBEBE] text-sm mt-1 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bio text */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <p className="text-[#F2F2F2] text-lg md:text-xl leading-relaxed">
            I&apos;m <strong>Vencent Domingo</strong>, a multi-disciplinary digital professional
            with a deep passion for building things that look great, load fast, and rank well.
          </p>
          <p className="text-[#BEBEBE] text-base md:text-lg leading-relaxed">
            My journey began with a fascination for how the web works — from HTML structures
            to search engine algorithms. Today, I combine frontend engineering precision with
            SEO strategy and data analytics to deliver holistic digital solutions.
          </p>
          <p className="text-[#BEBEBE] text-base md:text-lg leading-relaxed">
            When I&apos;m not writing code or digging into analytics dashboards, I&apos;m exploring
            emerging AI tools, contributing to open source, or brewing the perfect cup of coffee.
          </p>

          <div className="pt-4 space-y-3">
            {[
              { label: "Location",      value: "Philippines"                                           },
              { label: "Availability",  value: "Open to freelance & full-time opportunities"          },
              { label: "Languages",     value: "English · Filipino"                                    },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3 text-base md:text-lg">
                <span className="text-[#566072] font-semibold min-w-[110px]">{label}:</span>
                <span className="text-[#BEBEBE]">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


