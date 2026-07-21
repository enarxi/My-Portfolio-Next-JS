"use client";

import Link from "next/link";
import React, { useState } from "react";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { LinkedInIcon } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";

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

// ─── NavBar ───────────────────────────────────────────────────────
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

          <motion.a
            href="https://linkedin.com/in/vencent-domingo"
            target="_blank"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-5"
          >
            <LinkedInIcon />
          </motion.a>
        </div>

        {/* Hamburger — hidden on desktop, shown on mobile */}
        <button
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="hidden lg:flex flex-col items-center justify-center gap-[5px] p-1"
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
