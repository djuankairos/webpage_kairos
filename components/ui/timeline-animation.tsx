"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

interface TimelineContentProps {
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children: React.ReactNode;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: index * 0.08 },
  }),
};

export function TimelineContent({
  animationNum = 0,
  customVariants,
  className,
  children,
}: TimelineContentProps) {
  return (
    <motion.div
      className={className}
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={customVariants ?? defaultVariants}
    >
      {children}
    </motion.div>
  );
}
