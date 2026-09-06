import Link from 'next/link';
import Image from 'next/image';
import { getFooterContent, FOOTER_DEFAULTS } from '@/lib/footer-db';

// ── Site navigation links ─────────────────────────────────────────────────
const SITE_LINKS = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/services', label: 'SERVICES' },
  { href: '/blogs', label: 'BLOGS' },
  { href: '/contact', label: 'CONTACT' },
];

// ── Check if a URL is external ────────────────────────────────────────────
function isExternal(url) {
  return url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:'));
}

// ── Footer ────────────────────────────────────────────────────────────────
const Footer = async () => {
  // Load footer data from DB; fall back to static defaults if unavailable
  let footerData;
  try {
    const data = await getFooterContent();
    footerData = data ?? FOOTER_DEFAULTS;
  } catch {
    footerData = FOOTER_DEFAULTS;
  }

  const { hire_me_text, hire_me_url, social_links } = footerData;

  const hireMeProps = isExternal(hire_me_url)
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <footer className="w-full border-t border-border mt-auto select-text font-sans">
      <div className="max-w-6xl mx-auto px-16 md:px-10 sm:px-6">

        {/* ── Main Content ─────────────────────────────────────────── */}
        <div className="pt-14 pb-10">

          {/* ── Hire Me Section ───────────────────────────────────── */}
          <div className="mb-12">
            <p className="text-base tracking-[0.2em] text-muted uppercase mb-4 font-medium">
              HIRE ME
            </p>
            <Link
              href={hire_me_url}
              {...hireMeProps}
              className="group inline-flex items-center gap-5 border border-border rounded-xl px-6 py-4 backdrop-blur-md bg-fg/10 hover:bg-fg/20 transition-all duration-300 w-auto"
            >
              <Image
                src="/images/Centi_Portfolio_128x128.png"
                alt="Vencent Domingo Logo"
                width={44}
                height={44}
                className="w-11 h-11 mix-blend-multiply dark:mix-blend-normal opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="text-base tracking-[0.25em] font-semibold text-fg uppercase group-hover:text-accent transition-colors duration-300">
                {hire_me_text}
              </span>
            </Link>
          </div>

          {/* ── Two-Column Grid: SITE + SOCIALS ───────────────────── */}
          {/* Always 2 columns — desktop and mobile */}
          <div className="grid grid-cols-2 gap-10 sm:gap-6 mb-12">

            {/* SITE */}
            <div>
              <p className="text-base tracking-[0.2em] text-muted uppercase mb-5 font-medium">
                SITE
              </p>
              <nav className="flex flex-col gap-3 sm:gap-2.5">
                {SITE_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group inline-flex items-center gap-2 text-base sm:text-base tracking-[0.15em] font-medium text-fg hover:text-accent transition-colors duration-200"
                  >
                    <span className="block w-0 h-[1px] bg-accent group-hover:w-4 transition-all duration-300 shrink-0" />
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* SOCIALS */}
            <div>
              <p className="text-base tracking-[0.2em] text-muted uppercase mb-5 font-medium">
                SOCIALS
              </p>
              <nav className="flex flex-col gap-3 sm:gap-2.5">
                {social_links && social_links.length > 0 ? (
                  social_links.map((link, i) => {
                    const ext = isExternal(link.url);
                    return (
                      <a
                        key={link.id ?? i}
                        href={link.url}
                        {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group inline-flex items-center gap-2 text-base sm:text-base tracking-[0.15em] font-medium text-fg hover:text-accent transition-colors duration-200"
                      >
                        <span className="block w-0 h-[1px] bg-accent group-hover:w-4 transition-all duration-300 shrink-0" />
                        {link.name.toUpperCase()}
                      </a>
                    );
                  })
                ) : (
                  <p className="text-base text-muted italic">No social links configured.</p>
                )}
              </nav>
            </div>
          </div>

          {/* ── Bottom Bar: Logo + Copyright ───────────────────────── */}
          <div className="border-t border-border/40 pt-7 flex items-center justify-between sm:flex-col sm:items-start sm:gap-3">
            <span className="font-heading font-bold text-xl tracking-tight text-fg">
              Vencent<span className="text-accent">.</span>
            </span>
            <p className="text-base tracking-[0.12em] text-muted uppercase">
              © {new Date().getFullYear()} Vencent Domingo. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
