"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { fadeInUp } from "@/lib/animations";

type RevealOnViewProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function RevealOnView({
  children,
  delay = 0,
  className,
  ...rest
}: RevealOnViewProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
