
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { finSecureBrandData, navbarContentData } from "@/data";

const navLinks = navbarContentData.navLinks;

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Automatically detect active section
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth navigation
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const target = document.querySelector(href);

    if (target) {
      setActiveSection(href.replace("#", ""));
      setMobileOpen(false);

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(null, "", href);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="sticky top-0 left-0 z-[100] w-full bg-white/95 backdrop-blur-xl shadow-[0_3px_20px_rgba(80,20,50,0.04)]"
    >
      <div className="mx-auto flex h-[88px] max-w-[1600px] items-center justify-between lg:h-[112px] px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* LOGO */}
        <Link
          href={navLinks[0].href}
          onClick={(e) => handleNavigation(e, navLinks[0].href)}
          className="relative flex h-full shrink-0 items-center pr-5 lg:pr-7"
          aria-label={navbarContentData.homeAriaLabel}
        >
          <div className="relative h-[65px] w-[230px] sm:w-[260px] lg:h-[90px] lg:w-[310px]">
            <Image
              src={finSecureBrandData.logo}
              alt={finSecureBrandData.logoAlt}
              fill
              priority
              sizes="(max-width: 640px) 230px, 310px"
              className="object-contain object-left"
            />
          </div>

          <span className="absolute right-0 top-1/2 hidden h-[75%] w-[2px] -translate-y-1/2 bg-[#eadce3] lg:block" />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden flex-1 items-center justify-center gap-5 xl:flex xl:gap-7 2xl:gap-9">
          {navLinks.map((link, index) => {
            const isActive =
              activeSection === link.href.replace("#", "");

            return (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + index * 0.07,
                  duration: 0.5,
                }}
                className={`group relative whitespace-nowrap py-3 text-[15px] font-semibold transition-colors duration-300 2xl:text-[16px] ${
                  isActive
                    ? "text-[#872c58]"
                    : "text-[#25232a] hover:text-[#872c58]"
                }`}
              >
                {link.name}

                {/* Animated underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[3px] rounded-full bg-[#872c58] transition-all duration-300 ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </motion.a>
            );
          })}
        </nav>

        {/* CALL US */}
        <motion.a
          href={navbarContentData.phoneHref}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="hidden shrink-0 items-center gap-3 border-l-2 border-[#eadce3] pl-5 lg:flex xl:pl-7"
        >
          <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#87305c] text-white shadow-md transition-all duration-300 hover:bg-[#692143]">
            <Phone size={21} fill="white" strokeWidth={1.5} />
          </span>

          <span className="flex flex-col leading-tight">
            <span className="text-[14px] font-medium text-[#29232a]">
              {navbarContentData.contactLabel}
            </span>
            <span className="mt-1 whitespace-nowrap text-[16px] font-bold text-[#17141a]">
              {navbarContentData.phone}
            </span>
          </span>
        </motion.a>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#87305c] text-white transition-all duration-300 hover:bg-[#692143] xl:hidden"
          aria-label={mobileOpen ? navbarContentData.closeMenuLabel : navbarContentData.openMenuLabel}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileOpen ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              {mobileOpen ? (
                <X size={25} />
              ) : (
                <Menu size={25} />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden border-t border-[#f1e5eb] bg-white shadow-xl xl:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8">
              {navLinks.map((link, index) => {
                const isActive =
                  activeSection === link.href.replace("#", "");

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.3,
                    }}
                    className={`group flex items-center justify-between border-b border-[#f3e9ee] py-3.5 text-[15px] font-semibold transition-colors duration-300 ${
                      isActive
                        ? "text-[#87305c]"
                        : "text-[#29232a] hover:text-[#87305c]"
                    }`}
                  >
                    {link.name}

                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "scale-100 bg-[#87305c]"
                          : "scale-0 bg-transparent group-hover:scale-100 group-hover:bg-[#87305c]"
                      }`}
                    />
                  </motion.a>
                );
              })}

              {/* MOBILE CALL BUTTON */}
              <motion.a
                href={navbarContentData.phoneHref}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-5 flex items-center justify-center gap-3 rounded-xl bg-[#87305c] px-5 py-4 text-white shadow-lg transition-colors hover:bg-[#692143]"
              >
                <Phone size={19} fill="white" />
                <span className="text-sm font-semibold">
                  {navbarContentData.contactLabel}: {navbarContentData.phone}
                </span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
