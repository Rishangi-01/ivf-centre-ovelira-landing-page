import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TreatmentsSection from "@/components/TreatmentsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <AboutSection />
      <TreatmentsSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
