"use client";

const TOOLS = [
  "HTML5", "CSS3", "JavaScript", "SASS", "Gulp", 
  "ReactJS", "NextJS", "WordPress", "Github", "Gemini", "Antigravity",
  "HTML5", "CSS3", "JavaScript", "SASS", "Gulp", 
  "ReactJS", "NextJS", "WordPress", "Github", "Gemini", "Antigravity"
];

export default function ToolsMarquee() {
  return (
    <div aria-label="Tools and technologies" className="flex flex-col items-center overflow-hidden w-full mb-6">
      {/* Centered Label */}
      <div className="flex flex-col items-center mb-3">
        <p className="text-[#566072] text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-0.5">
          Daily Drivers
        </p>
        <p className="text-[#F2F2F2] text-sm font-bold tracking-wide uppercase">
          Tools I Work With
        </p>
      </div>

      {/* Marquee Track */}
      <div className="relative flex overflow-hidden w-full" aria-hidden="true" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        {/* Track 1 */}
        <ul className="flex gap-3 shrink-0 animate-marquee motion-reduce:animate-none items-center">
          {TOOLS.map((tool, i) => (
            <li
              key={`a-${i}`}
              className="px-4 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] whitespace-nowrap select-none text-[#BEBEBE] font-medium text-xs transition-colors hover:text-[#F2F2F2] hover:bg-white/[0.08]"
            >
              {tool}
            </li>
          ))}
        </ul>
        {/* Track 2 */}
        <ul className="flex gap-3 shrink-0 animate-marquee2 motion-reduce:animate-none absolute left-0 items-center">
          {TOOLS.map((tool, i) => (
            <li
              key={`b-${i}`}
              className="px-4 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] whitespace-nowrap select-none text-[#BEBEBE] font-medium text-xs transition-colors hover:text-[#F2F2F2] hover:bg-white/[0.08]"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
