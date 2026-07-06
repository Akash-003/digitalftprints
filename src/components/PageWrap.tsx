import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/** Wraps a page for enter/exit route transitions. */
export default function PageWrap({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
      animate={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        // 'none' so the lingering filter doesn't break backdrop-blur children
        transitionEnd: { filter: 'none' },
      }}
      exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}
