import React from "react";
import Link from "next/link";

const HireMe = () => {
  return (
    <div className="fixed flex items-center justify-center left-4 bottom-4 select-none md:right-8 md:left-auto md:top-0 md:bottom-auto md:absolute sm:right-0 md:hidden">
      <Link
        href="mailto:shjz.dev@gmail.com"
        className="flex items-center justify-center bg-fg text-bg shadow-md border border-solid border-fg w-20 h-20 rounded-full font-semibold hover:bg-bg hover:text-fg hover:border-fg"
      >
        Hire Me
      </Link>
    </div>
  );
};

export default HireMe;
