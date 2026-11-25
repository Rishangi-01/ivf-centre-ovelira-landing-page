
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { financialServicesContentData, treatmentSectionData } from "@/data";

const treatments = financialServicesContentData.items
  .filter((item) => item.title)
  .slice(0, 3)
  .map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.description,
    icon: item.image,
    href: "#contact",
    featured: index === 1,
  }));

export default function TreatmentsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="treatment"
      className="relative isolate w-full overflow-hidden bg-white py-8 sm:py-12 lg:py-16"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -bottom-16 -right-10 -z-10 h-52 w-52 opacity-60 sm:h-64 sm:w-64">
        <Image
          src={treatmentSectionData.decorationImage}
          alt=""
            fill
            sizes="(max-width: 640px) 200px, 400px"
            className="object-contain object-center"
        />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* SECTION HEADING */}
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
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 sm:mb-14 lg:mb-16"
        >
          {/* EYEBROW */}
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-10 rounded-full bg-[#873052]" />
            <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#873052] sm:text-[15px]">
              {treatmentSectionData.eyebrow}
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-[36px] font-bold leading-tight tracking-[-1px] text-[#751d3e] sm:text-[44px] md:text-[50px] lg:text-[54px]">
            {treatmentSectionData.title}
          </h2>
        </motion.div>

        {/* TREATMENT CARDS */}
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-5">

          {treatments.map((treatment, index) => {
            const isFeatured = treatment.featured;

            return (
              <motion.div
                key={treatment.id}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 55,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduceMotion
                    ? {}
                    : {
                        y: -10,
                        transition: { duration: 0.3 },
                      }
                }
                className={`group relative isolate flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[25px] border p-8 transition-all duration-500 sm:min-h-[350px] sm:p-9 lg:min-h-[348px] lg:p-8 xl:min-h-[350px] ${
                  isFeatured
                    ? "border-[#7a1740] text-white shadow-[0_18px_45px_rgba(112,29,62,0.18)] lg:min-h-[390px] lg:-translate-y-5"
                    : "border-[#e8dfe4] bg-white text-[#29232d] shadow-[0_5px_25px_rgba(75,30,50,0.025)] hover:border-[#b87994] hover:shadow-[0_18px_45px_rgba(112,29,62,0.10)]"
                }`}
              >

                {/* FEATURED CARD BACKGROUND IMAGE */}
                {isFeatured && (
                  <>
                    <div className="absolute inset-0 -z-20">
                      <Image
                        src={treatmentSectionData.featuredImage}
                        alt={treatmentSectionData.featuredImageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover object-center transition-transform duration-1000 scale-105 group-hover:scale-110"
                      />
                    </div>

                    {/* BURGUNDY OVERLAY */}
                  </>
                )}

                {/* CARD CONTENT */}
                <div className="relative z-10">

                  {/* ICON */}
                  <div
                    className={`mb-5 flex h-[66px] w-[66px] lg:h-[86px] lg:w-[86px] items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110 bg-white ${
                      isFeatured
                        ? "border border-white/70 text-white"
                        : "text-[#821d43]"
                    }`}
                  >
                    <Image
                      src={treatment.icon}
                        alt={`${treatment.title} icon`}
                        width={83}
                        height={83}
                        className="object-contain h-53 w-[53px] sm:h-[100%] sm:w-[72px]"
                    />
                  </div>

                  {/* TITLE */}
                  <h3
                    className={`max-w-[370px] text-[22px] font-bold leading-[1.3] tracking-[-0.5px] sm:text-[23px] xl:text-[24px] ${
                      isFeatured
                        ? "text-white"
                        : "text-[#751d3e]"
                    }`}
                  >
                    {treatment.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p
                    className={`mt-4 max-w-[370px] text-[15px] leading-[1.7] sm:text-[16px] ${
                      isFeatured
                        ? "text-white/95"
                        : "text-[#49424c]"
                    }`}
                  >
                    {treatment.description}
                  </p>
                </div>

                {/* ARROW LINK */}
                <Link
                  href={treatment.href}
                  aria-label={financialServicesContentData.viewServiceLabelTemplate.replace("{title}", treatment.title)}
                  className={`relative z-10 mt-7 flex h-10 w-12 items-center transition-all duration-300 ${
                    isFeatured
                      ? "text-white"
                      : "text-[#821d43]"
                  }`}
                >
                  <ArrowRight
                    size={33}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </Link>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
