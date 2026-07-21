"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode='wait'>
      <div key={pathname}>
        {/* Full-viewport overlay — z-[100] beats NavBar's z-50 */}
        <motion.div
          className="fixed inset-0 z-[100] bg-fg origin-left pointer-events-none"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {children}
      </div>
    </AnimatePresence>
  )
}
