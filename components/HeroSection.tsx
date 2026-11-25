
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { heroContentData } from "@/data";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[600px] w-full items-center overflow-hidden bg-[#8c5b78] lg:min-h-[580px]"
    >
      {/* BACKGROUND IMAGE */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : { scale: 1.08, opacity: 0.7 }
        }
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src={heroContentData.backgroundImage}
          alt={heroContentData.images.shield.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center max-md:object-[62%_center]"
        />
      </motion.div>

      {/* BURGUNDY LEFT GRADIENT OVERLAY */}
      {/* <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#683b57]/80 via-[#80506e]/55 via-45% to-transparent" /> */}

      {/* SOFT IMAGE OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-[#8c5b78]/10" />

      {/* HERO CONTENT */}
      <div className="mx-auto w-full max-w-[1600px] py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-10">

        <div className="max-w-[620px]">

          {/* EYEBROW TEXT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-[2px] w-7 bg-[#e8a2c1]" />

            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white sm:text-[14px] sm:tracking-[0.4em]">
              {heroContentData.highlight}
            </p>
          </motion.div>

          {/* MAIN HEADING */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="max-w-[620px] text-[42px] font-bold leading-[1.12] tracking-[-1.5px] text-white sm:text-[54px] md:text-[64px] lg:text-[68px] xl:text-[72px]"
          >
            {heroContentData.heading}
            <br />
            <span className="relative inline-block">
              {heroContentData.accent}
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="mt-5 max-w-[490px] text-[15px] font-normal leading-[1.7] text-white/95 sm:text-[17px] md:text-[18px]"
          >
            {heroContentData.descriptionLines[0]}
          </motion.p>

          {/* DECORATIVE ANIMATED LINE */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 74 }}
            transition={{
              delay: 1,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="mt-5 h-[6px] rounded-full bg-[#e6a0bd]"
          />

        </div>
      </div>

      {/* SUBTLE BOTTOM OVERLAY */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#58344d]/15 to-transparent" />
    </section>
  );
}
