
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { aboutContentData } from "@/data";

const stats = aboutContentData.stats;

export default function AboutSection() {
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
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-white py-8 sm:py-12 lg:py-16"
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-[#f8edf2]/50 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16 px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* LEFT IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : -60,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative w-full"
        >
          {/* Image container */}
          <div className="relative aspect-[1.15/1] w-full overflow-hidden rounded-[20px] sm:rounded-[24px] lg:aspect-[1.12/1]">
            <Image
              src={aboutContentData.images.main.src}
              alt={aboutContentData.images.main.alt}
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
            />

            {/* Soft image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#5d2442]/10 to-transparent opacity-60" />
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <div className="flex w-full flex-col">

          {/* ABOUT LABEL */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-[2px] w-8 rounded-full bg-[#a65b7d]" />

            <span className="text-[15px] font-semibold tracking-wide text-[#702442] sm:text-[17px]">
              {aboutContentData.badge}
            </span>
          </motion.div>

          {/* HEADING */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="max-w-[650px] text-[36px] font-semibold leading-[1.13] tracking-[-1.2px] text-[#702442] sm:text-[44px] md:text-[48px] lg:text-[46px] xl:text-[54px]"
          >
            {aboutContentData.heading}
            <br className="hidden sm:block" />
            {aboutContentData.highlight}
            <br className="hidden sm:block" />
            {aboutContentData.highlightSuffix}
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-[590px] text-[15px] leading-[1.8] font-[500] text-[#39323b] sm:text-[16px] md:text-[17px]"
          >
            {aboutContentData.description}
          </motion.p>

          {/* STATISTICS */}
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
            }}
            className="mt-10 flex flex-col gap-7 sm:mt-12 sm:flex-row sm:items-center sm:gap-8 lg:mt-12 xl:gap-10"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col ${
                  index === 1
                    ? "sm:border-l-2 sm:border-[#f0dfe7] sm:pl-8 xl:pl-10"
                    : ""
                }`}
              >
                {/* Number */}
                <div className="flex items-center">
                  <motion.span
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.5 + index * 0.15,
                    }}
                    className="text-[48px] font-bold leading-none tracking-[-2px] text-[#873052] sm:text-[54px] lg:text-[52px] xl:text-[58px]"
                  >
                    {stat.value.toLocaleString("en-IN")}
                    {stat.suffix}
                  </motion.span>
                </div>

                {/* Label */}
                <p className="mt-2 text-[15px] font-medium text-[#29232d] sm:text-[16px] md:text-[17px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
