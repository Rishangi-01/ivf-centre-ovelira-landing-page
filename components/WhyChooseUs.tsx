
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Check,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { whyChooseUsContentData } from "@/data";

const reasons = whyChooseUsContentData.features
  .filter((feature) => feature.title)
  .map((feature, index) => ({
    number: `${String(index + 1).padStart(2, "0")}.`,
    title: feature.title,
    description: feature.description,
  }));

const treatments = whyChooseUsContentData.treatmentChecklist;

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="why-choose-us"
      className="relative w-full overflow-hidden bg-white py-8 sm:py-12 lg:py-16"
    >
      {/* SUBTLE BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#f9edf2]/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 xl:gap-14 px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* LEFT CONTENT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex w-full flex-col"
        >
          {/* SECTION LABEL */}
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#f8e8ef] px-5 py-2.5"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#781b40]" />

            <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#741d3e] sm:text-[15px]">
              {whyChooseUsContentData.badge}
            </span>
          </motion.div>

          {/* HEADING */}
          <motion.h2
            variants={itemVariants}
            className="text-[36px] font-bold leading-[1.15] tracking-[-1.2px] text-[#751d3e] sm:text-[44px] md:text-[48px] xl:text-[50px]"
          >
            {whyChooseUsContentData.heading} {whyChooseUsContentData.highlight}
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-[650px] text-[15px] leading-[1.8] text-[#4b444b] sm:text-[16px] md:text-[16px]"
          >
            {whyChooseUsContentData.description}
          </motion.p>

          {/* ACCORDION */}
          <motion.div
            variants={itemVariants}
            className="mt-7 w-full"
          >
            {reasons.map((reason, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={reason.number}
                  className={`relative border-b border-[#e9dfe4] transition-colors duration-300 ${
                    isActive
                      ? "border-b-[#ead1dc]"
                      : ""
                  }`}
                >
                  {/* ACTIVE LEFT ACCENT */}
                  <motion.div
                    initial={false}
                    animate={{
                      scaleY: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-5 left-0 top-5 w-[4px] origin-top rounded-full bg-[#e9a7c0]"
                  />

                  {/* ACCORDION BUTTON */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(isActive ? -1 : index)
                    }
                    aria-expanded={isActive}
                    className={`flex w-full items-center justify-between gap-4 py-6 pl-3 pr-2 text-left transition-colors duration-300 sm:py-6 ${
                      isActive
                        ? "text-[#751d3e]"
                        : "text-[#291d27] hover:text-[#873052]"
                    }`}
                  >
                    <span className="text-[17px] font-bold leading-snug tracking-[-0.4px] sm:text-[19px] lg:text-[20px]">
                      {reason.number} {reason.title}
                    </span>

                    <motion.span
                      animate={{
                        rotate: isActive ? 90 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex shrink-0 items-center justify-center"
                    >
                      {isActive ? (
                        <ChevronDown
                          size={25}
                          strokeWidth={1.8}
                        />
                      ) : (
                        <ArrowRight
                          size={25}
                          strokeWidth={1.8}
                        />
                      )}
                    </motion.span>
                  </button>

                  {/* ACCORDION DESCRIPTION */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="content"
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          height: {
                            duration: reduceMotion ? 0 : 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                            duration: reduceMotion ? 0 : 0.25,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[570px] pb-7 pl-[52px] pr-3 text-[14px] leading-[1.8] text-[#68616a] sm:text-[15px]">
                          {reason.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE CARD */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : 55,
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
          <div className="relative min-h-[460px] w-full overflow-hidden rounded-[25px] shadow-[0_15px_45px_rgba(91,26,54,0.10)] sm:min-h-[510px] lg:min-h-[540px] xl:min-h-[550px]">

            {/* BACKGROUND IMAGE */}
            <Image
              src={whyChooseUsContentData.image.src}
              alt={whyChooseUsContentData.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
            />


            {/* BOTTOM CONTENT */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-9 xl:p-9">

              {/* IMAGE HEADING */}
              <motion.h3
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mb-5 max-w-[520px] text-[21px] font-bold leading-[1.35] tracking-[-0.4px] text-white sm:text-[24px] lg:text-[25px] xl:text-[26px]"
              >
                {whyChooseUsContentData.imageHeading}
              </motion.h3>

              {/* TREATMENT CHECKLIST */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-0"
              >
                {treatments.map((treatment, index) => (
                  <motion.div
                    key={treatment}
                    variants={itemVariants}
                    className={`flex min-w-0 py-1 items-center gap-3 text-[13px] text-white sm:text-[14px] lg:text-[15px] ${
                      index === 1
                        ? "sm:border-l sm:border-white/30 sm:pl-5"
                        : ""
                    } ${
                      index === 3
                        ? "sm:border-l sm:border-white/30 sm:pl-5"
                        : ""
                    } ${
                      index === 5
                        ? "sm:border-l sm:border-white/30 sm:pl-5"
                        : ""
                    }`}
                  >
                    <Check
                      size={23}
                      strokeWidth={2.6}
                      className="shrink-0 text-white"
                    />

                    <span>{treatment}</span>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
