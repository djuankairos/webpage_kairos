"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type TestimonialItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export function TestimonialsColumn(props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) {
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
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <article
                  className={cn(
                    "kairos-hover-card max-w-xs rounded-3xl border border-kairos-dark bg-kairos-panel/95 p-8 shadow-lg shadow-kairos-green/10"
                  )}
                  key={i}
                >
                  <p className="text-sm leading-relaxed text-kairos-gray-light">{text}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="text-sm font-medium leading-5 tracking-tight text-kairos-white">
                        {name}
                      </div>
                      <div className="text-xs leading-5 tracking-tight text-kairos-gray-mid">
                        {role}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
}
