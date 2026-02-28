"use client";

import { motion } from "framer-motion";

const directionMap = {
  up: { y: 60, x: 0 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
};

export default function ScrollReveal({ children, className = "", delay = 0, direction = "up" }) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
