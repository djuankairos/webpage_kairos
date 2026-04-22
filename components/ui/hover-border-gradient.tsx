"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, #6FC2A8 0%, rgba(255, 255, 255, 0) 100%)",
  LEFT:
    "radial-gradient(16.6% 43.1% at 0% 50%, #6FC2A8 0%, rgba(255, 255, 255, 0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, #6FC2A8 0%, rgba(255, 255, 255, 0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.2% at 100% 50%, #6FC2A8 0%, rgba(255, 255, 255, 0) 100%)",
};

const highlight =
  "radial-gradient(75% 181.15942028985506% at 50% 50%, #4ADE80 0%, rgba(255, 255, 255, 0) 100%)";

type Props = React.PropsWithChildren<{
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
  shape?: "pill" | "card";
}> &
  React.HTMLAttributes<HTMLElement>;

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Element = "button",
  duration = 1,
  clockwise = true,
  shape = "pill",
  ...props
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("BOTTOM");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  const isCard = shape === "card";

  return (
    <Element
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex h-min w-fit flex-col items-center justify-center overflow-visible border border-kairos-green/30 bg-black/50 p-px backdrop-blur-sm transition duration-500 hover:bg-black/65",
        isCard ? "rounded-2xl" : "rounded-full",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "z-10 w-auto rounded-[inherit] bg-kairos-dark px-5 py-2.5 text-sm font-medium text-kairos-white",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div
        className={cn(
          "absolute inset-0.5 z-[1] bg-kairos-dark",
          isCard ? "rounded-[14px]" : "rounded-[100px]"
        )}
      />
    </Element>
  );
}

export default function HoverBorderDemo() {
  return (
    <HoverBorderGradient>
      <span>Kairos CTA</span>
    </HoverBorderGradient>
  );
}
