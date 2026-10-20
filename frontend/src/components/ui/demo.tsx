import { TestimonialsColumn, type TestimonialItem } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials: TestimonialItem[] = [
  {
    text: "ASTRRA revolutionized our digital product presence. The spatial fluidity and engineering precision keep our clients thoroughly captivated.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    name: "Briana Patton",
    role: "Operations Director, Arc Spaces",
  },
  {
    text: "Working with ASTRRA was smooth and intuitive. The bespoke interface and typographic clarity elevated our brand standard immediately.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    name: "Bilal Ahmed",
    role: "Design Lead, Mono Labs",
  },
  {
    text: "The engineering team is exceptional, crafting seamless interactions and ensuring performance at 60fps across every device.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80",
    name: "Saman Malik",
    role: "Product VP, Kinetic AI",
  },
  {
    text: "Their architecture and motion design transformed our conversion funnel. Highly recommend their high-conviction digital philosophy.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    name: "Omar Raza",
    role: "Managing Partner, Nova Capital",
  },
  {
    text: "ASTRRA's tactile micro-interactions and fast page execution set a benchmark for the next era of web experiences.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    name: "Zainab Hussain",
    role: "Creative Director, Strata",
  },
  {
    text: "The smooth implementation exceeded expectations. They streamlined complex web systems into an intuitive, sculptural digital journey.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
    name: "Aliza Khan",
    role: "Principal Architect",
  },
  {
    text: "Our brand metrics surged with this aesthetic upgrade. The customer feedback has been overwhelmingly positive across every channel.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
    name: "Farhan Siddiqui",
    role: "Head of Growth, Aether Audio",
  },
  {
    text: "They delivered a digital platform that felt like pure craft — understanding our deep architectural identity and bringing it alive.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
    name: "Sana Sheikh",
    role: "Brand Strategist",
  },
  {
    text: "Interactive 3D and responsive typography harmonized perfectly. Our global audience engagement multiplied in weeks.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80",
    name: "Hassan Ali",
    role: "Founder, Apex Systems",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-white/10 bg-white/5 py-1 px-4 rounded-lg font-mono text-xs text-[var(--gold,#c8a96b)] uppercase tracking-widest">
              Testimonials
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center text-white">
            What our clients say
          </h2>
          <p className="text-center mt-5 opacity-75 text-sm sm:text-base text-[#f4f3ef]/80">
            Digital experiences that leave an unforgettable impression.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
