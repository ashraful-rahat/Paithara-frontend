"use client"; // this wrapper needs to be client-side for Framer Motion

import { motion } from "framer-motion";

import React from "react";
import { fadeUp } from "../lib/animations";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
}

const FadeUp: React.FC<FadeUpProps> = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
