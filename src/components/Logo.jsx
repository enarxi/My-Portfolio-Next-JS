"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionLink = motion(Link);

const Logo = () => {
  return (
    <div className="flex items-center select-none">
      <MotionLink
        href="/"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="flex items-center"
      >
        <Image
          src="/images/Centi_Portfolio_128x128.png"
          alt="Vencent Domingo Logo"
          width={56}
          height={56}
          className="w-24 h-24 mix-blend-multiply sm:w-12 sm:h-12"
          priority
        />
      </MotionLink>
    </div>
  );
};

export default Logo;
