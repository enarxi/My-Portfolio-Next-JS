"use client";

import { useState, useEffect } from "react";
import {
  HomeIcon,
  FolderOpenIcon,
  BriefcaseIcon,
  UserIcon,
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { FaFacebook, FaLinkedinIn, FaGithub } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Home",     icon: HomeIcon,        href: "#home"     },
  { label: "Projects", icon: FolderOpenIcon,  href: "#projects" },
  { label: "Services",     icon: BriefcaseIcon,           href: "#services"     },
  { label: "About",        icon: UserIcon,                href: "#about"        },
  { label: "Contact",      icon: EnvelopeIcon,            href: "#contact"      },
  { label: "Testimonials", icon: ChatBubbleLeftRightIcon, href: "#testimonials" },
];

const SOCIAL_LINKS = [
  { icon: FaFacebook,   label: "Facebook", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
  { icon: FaGithub,     label: "GitHub",   href: "#" },
];

// Blue verified badge — Meta/Facebook style
function VerifiedBadge() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-label="Verified"
      role="img"
      className="w-4 h-4 flex-shrink-0"
    >
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M7 12.5l3.5 3.5 6.5-7"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function SidebarNav({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const NavContent = () => (
    <>
      {/* ── Avatar + Identity ── */}
      <div className="flex flex-col items-center gap-3 pb-7 border-b border-[#566072]/40">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#566072] to-[#212A3F] flex items-center justify-center overflow-hidden ring-2 ring-[#566072]/60 shadow-lg">
          <span className="text-3xl font-bold text-[#F2F2F2] select-none">VD</span>
        </div>

        {/* Name + verified badge */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <p className="text-[#F2F2F2] font-semibold text-lg leading-tight">
              Vencent Domingo
            </p>
            <VerifiedBadge />
          </div>

          {/* Username */}
          <p className="text-[#BEBEBE] text-sm mt-0.5 leading-snug tracking-wide">
            @centiidomingo
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2 mt-1" aria-label="Social media links">
          {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${label} profile`}
              className="w-9 h-9 rounded-full bg-[#566072]/25 border border-[#566072]/30 flex items-center justify-center text-[#BEBEBE] hover:bg-[#566072]/50 hover:text-[#F2F2F2] transition-all duration-200 hover:scale-110 min-h-[36px]"
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* ── Nav Links ── */}
      <nav aria-label="Main navigation" className="flex flex-col gap-1 mt-6 flex-1">
        {NAV_LINKS.map(({ label, icon: Icon, href }) => {
          const sectionId = href.replace("#", "");
          const isActive = activeSection === sectionId;
          return (
            <button
              key={label}
              onClick={() => handleNavClick(href)}
              aria-label={`Navigate to ${label}`}
              aria-current={isActive ? "page" : undefined}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-left w-full
                min-h-[44px] transition-all duration-200 group
                ${isActive
                  ? "bg-[#566072]/50 text-[#F2F2F2]"
                  : "text-[#BEBEBE] hover:bg-[#566072]/30 hover:text-[#F2F2F2]"
                }
              `}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                  isActive ? "text-[#F2F2F2]" : "text-[#BEBEBE] group-hover:text-[#F2F2F2]"
                }`}
              />
              <span className="text-[1.0625rem] font-medium">{label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F2F2F2]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="pt-6 border-t border-[#566072]/40">
        <p className="text-[#BEBEBE] text-xs text-center leading-relaxed">
          © {new Date().getFullYear()} Vencent Domingo
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside
        aria-label="Site sidebar"
        className="hidden desktop:flex flex-col w-64 desktop-xl:w-72 min-h-screen bg-[#212A3F] px-5 py-8 fixed top-0 left-0 z-30"
      >
        <NavContent />
      </aside>

      {/* ── Mobile Top Bar ── */}
      <header className="desktop:hidden fixed top-0 left-0 right-0 z-40 bg-[#212A3F] flex items-center justify-between px-5 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#566072] flex items-center justify-center">
            <span className="text-sm font-bold text-[#F2F2F2]">VD</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[#F2F2F2] font-semibold text-base leading-none">Vencent Domingo</span>
              <VerifiedBadge />
            </div>
            <span className="text-[#BEBEBE] text-xs">@centiidomingo</span>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="text-[#F2F2F2] p-2 rounded-lg hover:bg-[#566072]/40 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
        >
          {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </header>

      {/* ── Mobile Overlay Menu ── */}
      {mobileOpen && (
        <div
          className="desktop:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          <aside
            className="absolute top-0 left-0 w-72 min-h-full bg-[#212A3F] px-5 py-8 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <NavContent />
          </aside>
        </div>
      )}
    </>
  );
}
