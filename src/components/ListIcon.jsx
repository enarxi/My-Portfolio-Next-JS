import React from "react";
import { motion, useScroll } from "framer-motion";

const ListIcon = ({ reference }) => {
  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ["center end", "center center"],
  });
  return (
    <figure className="absolute left-0 stroke-fg">
      <svg
        className="-rotate-90 md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]"
        width="75"
        height="75"
        viewBox="0 0 100 100"
      >
        <circle
          className="stroke-accent stroke-1 fill-none"
          cx="75"
          cy="50"
          r="20"
        />
        <motion.circle
          style={{ pathLength: scrollYProgress }}
          className="stroke-[5px] fill-bg"
          cx="75"
          cy="50"
          r="20"
        />
        <circle
          className="animate-pulse stroke-1 fill-accent"
          cx="75"
          cy="50"
          r="10"
        />
      </svg>
    </figure>
  );
};

export default ListIcon;
