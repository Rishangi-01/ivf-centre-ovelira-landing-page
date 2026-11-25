
"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { faqContentData } from "@/data";

const faqs = faqContentData.items.filter((faq) => faq.question);

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 30,
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
      id="faqs"
      className="relative w-full overflow-hidden bg-white py-8 sm:py-12 lg:py-16"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#f9eaf0]/50 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-14 px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* LEFT IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : -55,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative w-full"
        >
          <div className="relative aspect-[0.95/1] w-full overflow-hidden rounded-[25px] bg-[#f8e8ef] sm:rounded-[30px]">

            
            <Image
              src={faqContentData.image.src}
              alt={faqContentData.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
            />

            
            <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#741b43]/30 to-transparent" />

            
            <div
              className="absolute -bottom-1 -left-1 flex h-[36%] w-[66%] items-end rounded-tr-[100%] bg-gradient-to-br from-[#9c315f] via-[#831c4bd6] to-[#64163891] px-7 pb-7 pt-10 sm:px-9 sm:pb-9 lg:px-9"
              style={{
                borderTopRightRadius: "70% 105%",
              }}
            >
              <div className="relative z-10">
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
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-[260px] text-[19px] font-bold leading-[1.45] text-white sm:text-[22px] lg:text-[23px]"
                >
                  {faqContentData.contactCard.heading}
                </motion.h3>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 58 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="mt-4 h-[2px] rounded-full bg-white"
                />
              </div>
            </div>
          </div>
        </motion.div>

        
        <div className="flex w-full flex-col">

          {/* FAQ LABEL */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full bg-[#f9e8ef] px-4 py-2 text-[14px] font-bold text-[#751d3e] sm:text-[15px]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#751d3e]" />
              {faqContentData.badge}
            </span>
          </motion.div>

          {/* HEADING */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="max-w-[700px] text-[34px] font-bold leading-[1.18] tracking-[-1px] text-[#751d3e] sm:text-[42px] md:text-[46px] lg:text-[42px] xl:text-[46px]"
          >
            {faqContentData.heading} {faqContentData.highlight}
            <span className="mt-1 block bg-gradient-to-r from-[#b44d78] to-[#df92aa] bg-clip-text text-transparent">
              {faqContentData.highlightSuffix}
            </span>
          </motion.h2>

          {/* FAQ ACCORDION */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.2 }}
            className="mt-7 flex flex-col gap-3.5 sm:mt-8"
          >
            {faqs.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={faq.question}
                  layout={!reduceMotion}
                  className={`overflow-hidden rounded-[22px] transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-[#f9e9ef] to-[#fdf3f6] shadow-[0_8px_25px_rgba(120,31,65,0.05)]"
                      : "bg-[#f5f3f4] hover:bg-[#f9edf2]"
                  }`}
                >
                  {/* QUESTION BUTTON */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(isActive ? -1 : index)
                    }
                    aria-expanded={isActive}
                    aria-controls={`faq-answer-${index}`}
                    className={`flex min-h-[55px] w-full items-center justify-between gap-4 rounded-[22px] px-5 py-3.5 text-left transition-all duration-300 sm:min-h-[57px] sm:px-6 ${
                      isActive
                        ? "bg-gradient-to-r from-[#841c48] to-[#681438] text-white"
                        : "text-[#681b39]"
                    }`}
                  >
                    <span className="text-[14px] font-bold leading-snug sm:text-[16px] lg:text-[17px]">
                      {faq.question}
                    </span>

                    {/* PLUS / MINUS ICON */}
                    <motion.span
                      animate={{
                        rotate: isActive ? 180 : 0,
                        backgroundColor: isActive
                          ? "#ffffff"
                          : "#ffffff",
                        color: isActive
                          ? "#751d3e"
                          : "#29232d",
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm"
                    >
                      {isActive ? (
                        <Minus size={19} strokeWidth={2} />
                      ) : (
                        <Plus size={19} strokeWidth={2} />
                      )}
                    </motion.span>
                  </button>

                  {/* ANSWER */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        key="answer"
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
                        <p className="px-5 py-4 text-[13px] leading-[1.8] text-[#59535b] sm:px-6 sm:py-4 sm:text-[14px] md:text-[15px]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
