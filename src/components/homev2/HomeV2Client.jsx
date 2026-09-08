"use client";

import { useState, useEffect, useRef } from "react";
import SidebarNav    from "./SidebarNav";
import DashboardSection from "./DashboardSection";
import ProjectsGrid  from "./ProjectsGrid";
import ServicesSection from "./ServicesSection";
import AboutSection  from "./AboutSection";
import ContactSection from "./ContactSection";
import TestimonialsSection from "./TestimonialsSection";

const SECTIONS = ["home", "projects", "services", "about", "contact", "testimonials"];

export default function HomeV2Client() {
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer — track which section is in view
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -55% 0px" }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen flex bg-[#212A3F] font-urbanist"
      style={{ color: "#F2F2F2" }}
    >
      {/* ── Sidebar Navigation ── */}
      <SidebarNav activeSection={activeSection} />

      {/* ── Main Content ── */}
      <main
        id="main-content"
        className="flex-1 desktop:ml-64 desktop-xl:ml-72 overflow-x-hidden"
        aria-label="Main content"
      >
        {/* Skip to content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F2F2F2] focus:text-[#0D0D0D] focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>

        <DashboardSection />
        <ProjectsGrid />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
        <TestimonialsSection />

        {/* Footer strip */}
        <footer className="px-6 md:px-10 py-8 border-t border-[#566072]/20 text-center">
          <p className="text-[#BEBEBE] text-sm">
            © {new Date().getFullYear()} Vencent Domingo. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}



