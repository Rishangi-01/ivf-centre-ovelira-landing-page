
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronRight,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { finSecureBrandData, footerContentData } from "@/data";

const quickLinks = footerContentData.quickLinks;

const iconByName = {
  phone: Phone,
  email: Mail,
};

const contactInfo = footerContentData.contactDetails
  .filter((item) => item.icon !== "location")
  .map((item) => ({
    icon: iconByName[item.icon as keyof typeof iconByName] ?? Phone,
    value: item.text,
    href: item.href,
  }));

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.15,
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
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <footer className="relative w-full overflow-hidden bg-white">

      {/* =====================================
          MAIN FOOTER CONTENT
      ====================================== */}

      <div className="relative mx-auto max-w-[1600px] pb-32 pt-14 sm:pb-36 sm:pt-16 lg:pb-32 lg:pt-16 px-4 sm:px-6 lg:px-8 xl:px-10">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] lg:gap-0"
        >

          {/* =====================================
              COLUMN 1 - LOGO & DESCRIPTION
          ====================================== */}

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start lg:pr-12"
          >

            {/* LOGO */}
            <Link
              href={footerContentData.brandLinkHref}
              aria-label={footerContentData.brandLinkLabel}
              className="group inline-flex"
            >
              <Image
                src={finSecureBrandData.footerLogo}
                alt={finSecureBrandData.footerLogoAlt}
                width={350}
                height={120}
                priority={false}
                className="h-auto w-[260px] object-contain transition-transform duration-500 group-hover:scale-[1.03] sm:w-[290px] lg:w-[320px]"
              />
            </Link>

            {/* DESCRIPTION */}
            <p className="mt-5 max-w-[370px] text-[15px] leading-[1.8] text-[#29232d] sm:text-[16px] sm:leading-[1.8]">
              {footerContentData.description}
            </p>

          </motion.div>


          {/* =====================================
              COLUMN 2 - QUICK LINKS
          ====================================== */}

          <motion.div
            variants={itemVariants}
            className="border-t border-[#e8d4dd] pt-8 sm:border-t-0 sm:pt-0 lg:border-l lg:border-t-0 lg:px-12"
          >

            {/* HEADING */}
            <div className="mb-5">
              <h3 className="text-[23px] font-bold tracking-[-0.5px] text-[#751d3e] sm:text-[25px]">
                {footerContentData.quickLinksHeading}
              </h3>

              <div className="mt-2.5 h-[3px] w-[70px] rounded-full bg-gradient-to-r from-[#a62c60] to-[#e59ab6]" />
            </div>

            {/* LINKS */}
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex w-fit items-center gap-3 text-[16px] font-medium text-[#211c23] transition-all duration-300 hover:translate-x-1 hover:text-[#851f48] sm:text-[18px]"
                  >
                    <ChevronRight
                      size={21}
                      strokeWidth={2}
                      className="shrink-0 text-[#c62b69] transition-transform duration-300 group-hover:translate-x-1"
                    />

                    <span>{link.name}</span>

                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>

          </motion.div>


          {/* =====================================
              COLUMN 3 - CONTACT INFORMATION
          ====================================== */}

          <motion.div
            variants={itemVariants}
            className="border-t border-[#e8d4dd] pt-8 sm:border-t-0 sm:pt-0 lg:border-l lg:border-t-0 lg:pl-12"
          >

            {/* HEADING */}
            <div className="mb-7">
              <h3 className="text-[23px] font-bold tracking-[-0.5px] text-[#751d3e] sm:text-[25px]">
                {footerContentData.contactHeading}
              </h3>

              <div className="mt-2.5 h-[3px] w-[70px] rounded-full bg-gradient-to-r from-[#a62c60] to-[#e59ab6]" />
            </div>

            {/* CONTACT DETAILS */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.value}
                    href={item.href}
                    whileHover={
                      reduceMotion ? {} : { x: 5 }
                    }
                    className="group flex items-center gap-4"
                  >

                    {/* ICON BOX */}
                    <div className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-[13px] bg-[#faeaf0] text-[#851f48] transition-all duration-500 group-hover:bg-[#751d3e] group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(117,29,62,0.18)]">
                      <Icon
                        size={29}
                        strokeWidth={1.65}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* CONTACT TEXT */}
                    <span className="break-all text-[15px] font-medium text-[#211c23] transition-colors duration-300 group-hover:text-[#851f48] sm:text-[17px] lg:text-[18px]">
                      {item.value}
                    </span>

                  </motion.a>
                );
              })}
            </div>

          </motion.div>

        </motion.div>

      </div>


      {/* =====================================
          BOTTOM PINK WAVE IMAGE
          NO SVG - USING IMAGE
      ====================================== */}

      <div className="pointer-events-none absolute inset-x-0 bottom-[53px] z-0 h-[115px] overflow-hidden sm:bottom-[53px] sm:h-[130px] lg:h-[138px]">

        <Image
          src={footerContentData.waveImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

      </div>


      {/* =====================================
          COPYRIGHT BAR
      ====================================== */}

      <div className="relative z-10 flex min-h-[53px] w-full items-center justify-center bg-gradient-to-r from-[#751d3e] via-[#851b49] to-[#751d3e] px-4 py-4 text-center">

        <motion.p
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[12px] font-medium tracking-wide text-white sm:text-[14px] md:text-[15px]"
        >
          {footerContentData.copyright}
        </motion.p>

      </div>

    </footer>
  );
}
