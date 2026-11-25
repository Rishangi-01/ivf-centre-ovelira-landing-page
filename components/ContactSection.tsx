
"use client";

import { FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  MessageCircle,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { contactContentData } from "@/data";

const iconByName = {
  location: MapPin,
  phone: Phone,
  email: Mail,
};

const contactDetails = contactContentData.contactInfo.map((item) => ({
  icon: iconByName[item.icon as keyof typeof iconByName] ?? MapPin,
  title: item.title,
  value: item.lines.join(", "),
  href:
    item.icon === "phone"
      ? `tel:${item.lines[0].replace(/\s/g, "")}`
      : item.icon === "email"
        ? `mailto:${item.lines[0]}`
        : "https://www.google.com/maps/search/?api=1&query=742+Evergreen+Terrace,+62704,+United+States",
}));

const services = contactContentData.subjects;

export default function ContactSection() {
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
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const service = formData.get("service")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    const subject = encodeURIComponent(
      contactContentData.enquirySubjectTemplate.replace("{name}", name)
    );

    const body = encodeURIComponent(
      contactContentData.bodyTemplate
        .replace("{name}", name)
        .replace("{email}", email)
        .replace("{phone}", phone)
        .replace("{service}", service)
        .replace("{message}", message)
    );

    window.location.href =
      `mailto:${contactContentData.emailRecipient}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-white py-8 sm:py-12 lg:py-16"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[350px] w-[350px] rounded-full bg-[#f9e9ef]/60 blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#f8e8ef]/50 blur-[110px]" />

      <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10 xl:gap-14 px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* =========================================
            LEFT SIDE - CONTACT INFORMATION
        ========================================== */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex w-full flex-col"
        >
          {/* SECTION LABEL */}
          <motion.div
            variants={fadeUp}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-[2px] w-12 bg-[#873052]" />

            <span className="text-[13px] font-bold uppercase tracking-[0.22em] text-[#751d3e] sm:text-[15px] sm:tracking-[0.25em]">
              {contactContentData.badge}
            </span>
          </motion.div>

          {/* HEADING */}
          <motion.h2
            variants={fadeUp}
            className="text-[43px] font-bold leading-[1.12] tracking-[-1.5px] text-[#751d3e] sm:text-[52px] md:text-[58px] lg:text-[55px] xl:text-[60px]"
          >
            {contactContentData.heading}
            <span className="block bg-gradient-to-r from-[#b34c77] to-[#df91a9] bg-clip-text text-transparent">
              {contactContentData.highlight}
            </span>
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-[470px] text-[16px] leading-[1.8] text-[#55505a] sm:text-[17px] lg:text-[18px]"
          >
            {contactContentData.description}
          </motion.p>

          {/* CONTACT INFORMATION LIST */}
          <div className="mt-7 flex w-full flex-col">

            {contactDetails.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.title}
                  variants={fadeUp}
                  href={item.href}
                  target={index === 0 ? "_blank" : undefined}
                  rel={index === 0 ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 border-b border-[#eee6ea] py-4 transition-all duration-300 first:pt-0 last:border-b-0"
                >
                  {/* ICON BOX */}
                  <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[15px] bg-[#faeaf0] text-[#851f48] transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-[#751d3e] group-hover:text-white group-hover:shadow-[0_10px_25px_rgba(117,29,62,0.2)] sm:h-[66px] sm:w-[66px]">
                    <Icon
                      size={32}
                      strokeWidth={1.65}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* TEXT */}
                  <div className="min-w-0 flex-1">
                    <h3 className="flex items-center gap-2 text-[17px] font-bold text-[#17151a] sm:text-[19px]">
                      {item.title}

                      <ArrowUpRight
                        size={15}
                        className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </h3>

                    <p className="mt-1 break-words text-[14px] leading-relaxed text-[#625d65] sm:text-[16px]">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}

          </div>
        </motion.div>

        {/* =========================================
            RIGHT SIDE - CONTACT FORM
        ========================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : 45,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full"
        >
          <div className="relative overflow-hidden rounded-[25px] border-2 border-[#f5dce6] bg-white p-6 shadow-[0_15px_50px_rgba(117,29,62,0.035)] sm:rounded-[28px] sm:p-8 md:p-9 lg:p-9 xl:p-11">

            {/* SUBTLE CARD DECORATION */}
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#f9eaf0]/50 blur-3xl" />

            <div className="relative">

              {/* FORM HEADING */}
              <motion.h3
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-7 text-[27px] font-bold tracking-[-0.8px] text-[#751d3e] sm:text-[30px] md:text-[32px]"
              >
                {contactContentData.formHeading}
              </motion.h3>

              {/* CONTACT FORM */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:gap-5"
              >

                {/* NAME + EMAIL */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">

                  {/* NAME */}
                  <div className="group relative">
                    <label
                      htmlFor="contact-name"
                      className="sr-only"
                    >
                      {contactContentData.fieldLabels.name}
                    </label>

                    <User
                      size={23}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#851f48] transition-transform duration-300 group-focus-within:scale-110"
                    />

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder={contactContentData.fields.firstName.placeholder}
                      autoComplete="name"
                      required
                      className="h-[54px] w-full rounded-[15px] border-[1.5px] border-[#dedde2] bg-white pl-[65px] pr-4 text-[15px] text-[#28232b] outline-none transition-all duration-300 placeholder:text-[#5e5961] hover:border-[#d5a3b6] focus:border-[#8c3154] focus:ring-4 focus:ring-[#f8e8ef]/70 sm:h-[55px]"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="group relative">
                    <label
                      htmlFor="contact-email"
                      className="sr-only"
                    >
                      {contactContentData.fieldLabels.email}
                    </label>

                    <Mail
                      size={23}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#851f48] transition-transform duration-300 group-focus-within:scale-110"
                    />

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder={contactContentData.fields.email.placeholder}
                      autoComplete="email"
                      required
                      className="h-[54px] w-full rounded-[15px] border-[1.5px] border-[#dedde2] bg-white pl-[65px] pr-4 text-[15px] text-[#28232b] outline-none transition-all duration-300 placeholder:text-[#5e5961] hover:border-[#d5a3b6] focus:border-[#8c3154] focus:ring-4 focus:ring-[#f8e8ef]/70 sm:h-[55px]"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div className="group relative">
                  <label
                    htmlFor="contact-phone"
                    className="sr-only"
                  >
                    {contactContentData.fieldLabels.phone}
                  </label>

                  <Phone
                    size={23}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#851f48] transition-transform duration-300 group-focus-within:scale-110"
                  />

                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder={contactContentData.fields.phone.placeholder}
                    autoComplete="tel"
                    required
                    pattern={contactContentData.phonePattern}
                    title={contactContentData.phonePatternTitle}
                    className="h-[54px] w-full rounded-[15px] border-[1.5px] border-[#dedde2] bg-white pl-[65px] pr-4 text-[15px] text-[#28232b] outline-none transition-all duration-300 placeholder:text-[#5e5961] hover:border-[#d5a3b6] focus:border-[#8c3154] focus:ring-4 focus:ring-[#f8e8ef]/70 sm:h-[55px]"
                  />
                </div>

                {/* SERVICE SELECT */}
                <div className="group relative">
                  <label
                    htmlFor="contact-service"
                    className="sr-only"
                  >
                    {contactContentData.fieldLabels.service}
                  </label>

                  <FileText
                    size={23}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-[#851f48]"
                  />

                  <select
                    id="contact-service"
                    name="service"
                    defaultValue=""
                    required
                    className="h-[54px] w-full cursor-pointer appearance-none rounded-[15px] border-[1.5px] border-[#dedde2] bg-white pl-[65px] pr-12 text-[15px] text-[#5e5961] outline-none transition-all duration-300 hover:border-[#d5a3b6] focus:border-[#8c3154] focus:ring-4 focus:ring-[#f8e8ef]/70 sm:h-[55px]"
                  >
                    <option value="" disabled>
                      {contactContentData.fields.subject.placeholder}
                    </option>

                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>

                  {/* CUSTOM ARROW */}
                  <svg
                    className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#29232d]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>

                {/* MESSAGE */}
                <div className="group relative">
                  <label
                    htmlFor="contact-message"
                    className="sr-only"
                  >
                    {contactContentData.fieldLabels.message}
                  </label>

                  <MessageCircle
                    size={23}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-5 top-5 text-[#851f48] transition-transform duration-300 group-focus-within:scale-110"
                  />

                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder={contactContentData.fields.message.placeholder}
                    rows={4}
                    required
                    className="min-h-[130px] w-full resize-y rounded-[15px] border-[1.5px] border-[#dedde2] bg-white py-5 pl-[65px] pr-4 text-[15px] text-[#28232b] outline-none transition-all duration-300 placeholder:text-[#5e5961] hover:border-[#d5a3b6] focus:border-[#8c3154] focus:ring-4 focus:ring-[#f8e8ef]/70 sm:min-h-[132px]"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <motion.button
                  type="submit"
                  whileHover={reduceMotion ? {} : { scale: 1.02 }}
                  whileTap={reduceMotion ? {} : { scale: 0.98 }}
                  className="group mt-1 flex min-h-[54px] w-full items-center justify-center gap-3 rounded-[14px] bg-gradient-to-r from-[#831e49] to-[#a23d65] px-6 py-3.5 text-[16px] font-semibold text-white shadow-[0_8px_22px_rgba(117,29,62,0.16)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(117,29,62,0.25)]"
                >
                  {contactContentData.submitLabel}

                  <Send
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </motion.button>

              </form>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
