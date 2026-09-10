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

export default function HomeClient() {
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Create a trigger line 100px down the screen to accommodate short sections
      const scrollPos = window.scrollY + 100;
      let currentSection = "home";

      // Find which section is currently active
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          currentSection = id;
        }
      });

      // Special case: if we're at the absolute bottom of the page,
      // force the last section to be active (Testimonials).
      // Use a 10px buffer to account for minor rounding/zoom discrepancies.
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 10) {
        currentSection = "testimonials";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
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



