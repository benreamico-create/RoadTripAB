'use client'

import { motion, type HTMLMotionProps } from 'motion/react'
import { EASE_OUT_EXPO } from '@/lib/utils'

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  children: React.ReactNode
}

export function Reveal({
  delay = 0,
  direction = 'up',
  children,
  ...props
}: RevealProps) {
  const directionOffset = {
    up: { y: 40, x: 0 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
    none: { x: 0, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT_EXPO }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
