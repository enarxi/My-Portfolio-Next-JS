import React from "react";
import { motion } from "framer-motion";

const TransitionEffect = () => {
  return (
    <>
      {/* Layer 1 — gradient wipe, z-[70] beats NavBar's z-50 */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-[70] bg-gradient-to-r from-accent via-accent to-accent"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        exit={{ x: ["0%", "100%"], width: ["0%", "100%"] }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Layer 2 — bg-bg trail */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-[60] bg-bg"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
      />

      {/* Layer 3 — bg-fg trail */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-[55] bg-fg"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      />
    </>
  );
};

export default TransitionEffect;
