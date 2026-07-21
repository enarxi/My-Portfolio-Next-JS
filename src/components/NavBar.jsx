"use client";

import Link from "next/link";
import React, { useState } from "react";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { LinkedInIcon } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";
import useThemeSwitcher from "./hooks/useThemeSwitcher";

// ─── Desktop link ───────────────────────────────────────────────
const CustomLink = ({ href, title, className }) => {
  const pathname = usePathname();
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1.5px] inline-block bg-accent absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          pathname === href ? "w-full" : "w-0"
        }`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

// ─── Mobile link ─────────────────────────────────────────────────
const MobileLink = ({ href, title, toggle }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    toggle();
    router.push(href);
  };

  const isActive = pathname === href;

  return (
    <button
      onClick={handleClick}
      className="group flex items-center gap-3 w-full py-3 border-b border-border/20 last:border-0"
    >
      {/* Active / hover accent bar */}
      <span
        className={`block h-5 w-[2px] rounded-full bg-accent transition-all duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
      <span
        className={`uppercase tracking-widest text-sm font-medium transition-colors duration-200 ${
          isActive ? "text-accent" : "text-fg group-hover:text-accent"
        }`}
      >
        {title}
      </span>
    </button>
  );
};

// ─── Nav items list ───────────────────────────────────────────────
const NAV_ITEMS = [
  { href: "/", title: "Home" },
  { href: "/about", title: "About" },
  { href: "/projects", title: "Projects" },
  { href: "/services", title: "Services" },
  { href: "/blogs", title: "Blogs" },
  { href: "/contact", title: "Contact" },
];

// ─── Dark Mode Toggle Button ──────────────────────────────────────
const DarkModeButton = ({ mode, setMode, className = "" }) => {
  const isDark = mode === "dark";
  return (
    <motion.button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setMode(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`w-8 h-8 flex items-center justify-center rounded-full border border-border/40 bg-bg/60 text-fg transition-colors duration-300 hover:bg-accent/10 ${className}`}
    >
      {isDark ? (
        // Sun icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      ) : (
        // Moon icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-700">
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>
      )}
    </motion.button>
  );
};

// ─── NavBar ───────────────────────────────────────────────────────
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useThemeSwitcher();

  const handleClick = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* ── Header bar ────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 flex items-center justify-between w-full px-32 py-4 font-medium bg-bg/80 backdrop-blur-md border-b border-border/40 lg:px-16 md:px-12 sm:px-8">
        {/* Logo — always left */}
        <Logo />

        {/* Desktop nav — hidden on mobile */}
        <div className="flex items-center gap-8 lg:hidden select-none">
          <nav className="flex items-center gap-6">
            {NAV_ITEMS.map(({ href, title }) => (
              <CustomLink
                key={href}
                href={href}
                title={title}
                className="uppercase tracking-widest text-base"
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.a
              href="https://linkedin.com/in/vencent-domingo"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-5"
            >
              <LinkedInIcon />
            </motion.a>

            <DarkModeButton mode={mode} setMode={setMode} />
          </div>
        </div>

        {/* Hamburger + Dark mode — hidden on desktop, shown on mobile */}
        <div className="hidden lg:flex items-center gap-3">
          <DarkModeButton mode={mode} setMode={setMode} />

          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex flex-col items-center justify-center gap-[5px] p-1"
            onClick={handleClick}
          >
            <span
              className={`bg-fg transition-all duration-300 ease-out block h-0.5 w-6 rounded-full ${
                isOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`bg-fg transition-all duration-300 ease-out block h-0.5 w-6 rounded-full ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`bg-fg transition-all duration-300 ease-out block h-0.5 w-6 rounded-full ${
                isOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer — outside <header> for correct z-index ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[48] bg-fg/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
            />

            {/* Drawer panel — slides in from the right, sits below header (z-49) */}
            <motion.div
              key="drawer"
              className="fixed top-0 right-0 h-screen w-[75vw] max-w-xs z-[49] bg-bg/95 backdrop-blur-xl border-l border-border/30 flex flex-col pt-24 pb-10 px-7 select-none"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              {/* Nav links — staggered */}
              <nav className="flex flex-col">
                {NAV_ITEMS.map(({ href, title }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                  >
                    <MobileLink href={href} title={title} toggle={handleClose} />
                  </motion.div>
                ))}
              </nav>

              {/* Social icons — pinned to bottom */}
              <div className="mt-auto pt-6 border-t border-border/30">
                <p className="uppercase tracking-widest text-[10px] text-muted mb-4">
                  Connect
                </p>
                <motion.a
                    href="https://linkedin.com/in/vencent-domingo"
                    target="_blank"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-6 inline-block"
                    onClick={handleClose}
                  >
                    <LinkedInIcon />
                  </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
