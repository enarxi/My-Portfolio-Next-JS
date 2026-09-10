"use client";

import { motion } from "framer-motion";
import { EnvelopeIcon, GlobeAltIcon, MapPinIcon } from "@heroicons/react/24/outline";

const CONTACT_INFO = [
  { icon: EnvelopeIcon, label: "Email",    value: "hello@vencentdomingo.com"  },
  { icon: GlobeAltIcon, label: "Website",  value: "www.vencentdomingo.com"    },
  { icon: MapPinIcon,   label: "Location", value: "Philippines"               },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="px-6 md:px-10 py-20 bg-[#0D0D0D]/40"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[#BEBEBE] text-sm font-semibold tracking-widest uppercase mb-2">
          Let&apos;s Talk
        </p>
        <h2
          id="contact-heading"
          className="text-[#F2F2F2] font-bold mb-4"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          Get In Touch
        </h2>
        <p className="text-[#BEBEBE] text-lg md:text-xl leading-relaxed max-w-xl mb-12">
          Have a project in mind or just want to say hello? I&apos;d love to hear from you.
          Fill out the form below and I&apos;ll get back to you within 24 hours.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-10 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <form
            aria-label="Contact form"
            onSubmit={(e) => { e.preventDefault(); }}
            className="space-y-5"
            noValidate
          >
            <div>
              <label htmlFor="contact-name" className="block text-[#F2F2F2] font-medium text-base mb-2">
                Full Name <span aria-hidden="true" className="text-[#566072]">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                autoComplete="name"
                placeholder="Jane Smith"
                className="w-full px-5 py-4 rounded-xl bg-[#212A3F] border border-[#566072]/30 text-[#F2F2F2] text-base placeholder:text-[#566072] focus:outline-none focus:border-[#566072] focus:ring-2 focus:ring-[#566072]/30 transition-all min-h-[52px]"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-[#F2F2F2] font-medium text-base mb-2">
                Email Address <span aria-hidden="true" className="text-[#566072]">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                autoComplete="email"
                placeholder="jane@example.com"
                className="w-full px-5 py-4 rounded-xl bg-[#212A3F] border border-[#566072]/30 text-[#F2F2F2] text-base placeholder:text-[#566072] focus:outline-none focus:border-[#566072] focus:ring-2 focus:ring-[#566072]/30 transition-all min-h-[52px]"
              />
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-[#F2F2F2] font-medium text-base mb-2">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                placeholder="Project inquiry, collaboration, etc."
                className="w-full px-5 py-4 rounded-xl bg-[#212A3F] border border-[#566072]/30 text-[#F2F2F2] text-base placeholder:text-[#566072] focus:outline-none focus:border-[#566072] focus:ring-2 focus:ring-[#566072]/30 transition-all min-h-[52px]"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-[#F2F2F2] font-medium text-base mb-2">
                Message <span aria-hidden="true" className="text-[#566072]">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="Tell me about your project or idea..."
                className="w-full px-5 py-4 rounded-xl bg-[#212A3F] border border-[#566072]/30 text-[#F2F2F2] text-base placeholder:text-[#566072] focus:outline-none focus:border-[#566072] focus:ring-2 focus:ring-[#566072]/30 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              aria-label="Send message"
              className="w-full py-4 px-8 rounded-xl bg-[#F2F2F2] text-[#0D0D0D] font-semibold text-lg min-h-[56px] hover:bg-white transition-all duration-200 hover:shadow-lg hover:shadow-[#F2F2F2]/10 active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5 lg:pt-2"
        >
          {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-5 p-5 rounded-2xl bg-[#212A3F] border border-[#566072]/20"
            >
              <div className="w-12 h-12 rounded-xl bg-[#566072]/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-[#F2F2F2]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[#BEBEBE] text-sm font-medium">{label}</p>
                <p className="text-[#F2F2F2] text-base md:text-lg font-semibold">{value}</p>
              </div>
            </div>
          ))}

          <div className="pt-4 rounded-2xl bg-[#212A3F] border border-[#566072]/20 p-6">
            <p className="text-[#BEBEBE] text-sm font-semibold tracking-widest uppercase mb-4">
              Connect With Me
            </p>
            <div className="flex gap-3">
              {[
                { label: "LinkedIn", href: "#", abbr: "in" },
                { label: "GitHub",   href: "#", abbr: "gh" },
                { label: "Twitter",  href: "#", abbr: "tw" },
              ].map(({ label, href, abbr }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Visit my ${label} profile`}
                  className="w-12 h-12 rounded-xl bg-[#566072]/20 border border-[#566072]/30 flex items-center justify-center text-[#BEBEBE] font-bold text-sm hover:bg-[#566072]/40 hover:text-[#F2F2F2] transition-all duration-200 min-h-[44px]"
                >
                  {abbr}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


