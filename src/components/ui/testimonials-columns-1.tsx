"use client";
import React from "react";
import { motion } from "motion/react";

export type TestimonialItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-6 rounded-3xl border border-black/10 bg-white/90 shadow-md shadow-black/[0.04] max-w-xs w-full transition-all duration-300 hover:border-[var(--gold,#c8a96b)] hover:shadow-xl hover:-translate-y-1"
                  key={i}
                >
                  <div className="text-[11px] leading-relaxed text-[#1a1a18] font-normal break-words">
                    {text}
                  </div>
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-black/5">
                    <img
                      width={42}
                      height={42}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-black/10"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-sm tracking-tight text-[#0a0a09] leading-5">
                        {name}
                      </div>
                      <div className="text-xs leading-5 text-[#8a6f3c] font-medium tracking-tight">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export default TestimonialsColumn;
