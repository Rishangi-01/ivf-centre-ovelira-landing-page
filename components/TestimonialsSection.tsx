
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { testimonialsContentData } from "@/data";

const testimonials = testimonialsContentData.items
  .filter((item) => item.name)
  .map((item) => ({
    id: item.id,
    name: item.name,
    location: item.role,
    image: item.image,
    rating: item.rating,
    review: item.review,
  }));

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const activeTestimonial = testimonials[activeIndex];

  // NEXT SLIDE
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // PREVIOUS SLIDE
  const prevSlide = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // AUTOMATIC SLIDER
  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, reduceMotion]);

  // SLIDE ANIMATION
  const slideVariants = {
    initial: {
      opacity: 0,
      x: reduceMotion ? 0 : 45,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      x: reduceMotion ? 0 : -45,
      transition: {
        duration: reduceMotion ? 0 : 0.35,
      },
    },
  };

  return (
    <section
      id="testimonial"
      className="relative w-full overflow-hidden bg-white py-8 sm:py-12 lg:py-16"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-[#f9e9f0]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#f9e9f0]/60 blur-3xl" />

      <div className="relative mx-auto max-w-[1150px] px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center sm:mb-14 lg:mb-16"
        >
          {/* EYEBROW */}
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-[2px] w-6 bg-[#873052]" />

            <span className="text-[12px] font-bold uppercase tracking-[0.35em] text-[#873052] sm:text-[15px] sm:tracking-[0.4em]">
              {testimonialsContentData.eyebrow}
            </span>

            <span className="h-[2px] w-6 bg-[#873052]" />
          </div>

          {/* TITLE */}
          <h2 className="text-[34px] font-bold leading-tight tracking-[-1px] text-[#751d3e] sm:text-[43px] md:text-[48px] lg:text-[50px]">
            {testimonialsContentData.heading} {testimonialsContentData.highlight}
          </h2>

          {/* SUBTITLE */}
          <p className="mx-auto mt-4 max-w-[800px] text-[15px] leading-relaxed text-[#55505a] sm:text-[17px] md:text-[18px]">
            {testimonialsContentData.description}
          </p>
        </motion.div>

        {/* SLIDER WRAPPER */}
        <div
          className="relative mx-auto max-w-[1250px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setIsPaused(false);
            }
          }}
        >

          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label={testimonialsContentData.previousLabel}
            className="absolute -left-3 top-1/2 z-20 hidden h-12 w-12 -translate-x-full -translate-y-1/2 items-center justify-center rounded-full bg-[#f8dce7] text-[#751d3e] shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#751d3e] hover:text-white lg:flex xl:-left-5"
          >
            <ChevronLeft size={27} strokeWidth={1.8} />
          </button>

          {/* NEXT BUTTON */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label={testimonialsContentData.nextLabel}
            className="absolute -right-3 top-1/2 z-20 hidden h-12 w-12 translate-x-full -translate-y-1/2 items-center justify-center rounded-full bg-[#751d3e] text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-[#a23c65] lg:flex xl:-right-5"
          >
            <ChevronRight size={27} strokeWidth={1.8} />
          </button>

          
          <div className="relative overflow-hidden rounded-[25px] border border-[#ded9dd] bg-white p-5 shadow-[0_8px_35px_rgba(65,25,45,0.035)] sm:rounded-[30px] sm:p-7 md:px-8 lg:px-9 xl:px-10 md:py-8 lg:py-9 xl:py-9">

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTestimonial.id}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-9 lg:gap-10"
              >

                {/* LEFT IMAGE */}
                <div className="relative mx-auto w-full max-w-[430px] md:max-w-none">

                  {/* PINK DECORATIVE SHAPES */}
                  <div className="absolute -left-2 -top-2 h-[65%] w-[48%] rounded-[28px] bg-[#f8dce7] sm:-left-3 sm:-top-3" />

                  <div className="absolute -bottom-2 -right-2 h-[55%] w-[48%] rounded-[28px] bg-[#f6dce7] sm:-bottom-3 sm:-right-3" />

                  {/* IMAGE */}
                  <div className="relative aspect-[1.32/1] w-full overflow-hidden rounded-[22px] bg-[#f7edf1] sm:rounded-[25px]">
                    <Image
                      src={activeTestimonial.image}
                      alt={testimonialsContentData.imageAltTemplate.replace("{name}", activeTestimonial.name)}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>

                {/* RIGHT TESTIMONIAL CONTENT */}
                <div className="flex flex-col justify-center">

                  {/* QUOTE ICON */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="mb-2"
                  >
                    <Quote
                      size={49}
                      strokeWidth={0}
                      fill="#e99bb8"
                      className="rotate-180 text-[#e99bb8]"
                    />
                  </motion.div>

                  {/* REVIEW */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-[15px] font-medium leading-[1.8] text-[#29232d] sm:text-[17px] md:text-[17px] lg:text-[18px] lg:leading-[1.75]"
                  >
                    {activeTestimonial.review}
                  </motion.p>

                  {/* DECORATIVE LINE */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 65 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-6 h-[2px] rounded-full bg-[#873052]"
                  />

                  {/* NAME AND RATING */}
                  <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    {/* NAME */}
                    <div>
                      <h3 className="text-[19px] font-bold tracking-[-0.4px] text-[#751d3e] sm:text-[21px]">
                        {activeTestimonial.name}
                      </h3>

                      <p className="mt-1 text-[15px] font-medium text-[#69636c] sm:text-[16px]">
                        {activeTestimonial.location}
                      </p>
                    </div>

                    {/* STARS */}
                    <div
                      className="flex items-center gap-1"
                      aria-label={testimonialsContentData.starLabelTemplate.replace("{rating}", String(activeTestimonial.rating))}
                    >
                      {Array.from(
                        { length: activeTestimonial.rating },
                        (_, index) => (
                          <Star
                            key={index}
                            size={23}
                            strokeWidth={1}
                            fill="#f59e0b"
                            className="text-[#f59e0b]"
                          />
                        )
                      )}
                    </div>

                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* MOBILE NAVIGATION ARROWS */}
          <div className="mt-6 flex items-center justify-center gap-5 lg:hidden">
            <button
              type="button"
              onClick={prevSlide}
              aria-label={testimonialsContentData.previousLabel}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8dce7] text-[#751d3e] transition-all duration-300 hover:bg-[#751d3e] hover:text-white"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label={testimonialsContentData.nextLabel}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#751d3e] text-white transition-all duration-300 hover:bg-[#a23c65]"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* PAGINATION DOTS */}
          <div className="mt-7 flex items-center justify-center gap-3">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={testimonialsContentData.paginationLabelTemplate.replace("{number}", String(index + 1))}
                aria-current={activeIndex === index ? "true" : undefined}
                className="group flex h-6 items-center justify-center"
              >
                <motion.span
                  animate={{
                    width: activeIndex === index ? 13 : 12,
                    height: activeIndex === index ? 13 : 12,
                    backgroundColor:
                      activeIndex === index ? "#751d3e" : "#f2b6ca",
                    scale: activeIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="block rounded-full"
                />
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
