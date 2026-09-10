"use client";

import ScrollReelTestimonials from "../ui/scroll-reel-testimonials";

const TESTIMONIALS = [
  {
    quote: "Vencent's frontend builds are incredibly fast and pixel-perfect. The performance improvements drove a measurable increase in our conversion rates.",
    author: "Sarah Jenkins, E-Commerce Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    alt: "Sarah Jenkins",
  },
  {
    quote: "The custom WordPress theme he built for us is a breeze to manage. It's fully modular and integrated seamlessly with our existing data stack.",
    author: "Marcus Chen, Lead Editor",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&auto=format&fit=crop&q=80",
    alt: "Marcus Chen",
  },
  {
    quote: "A rare combination of design sense and deep technical SEO knowledge. Vencent helped us recover organic traffic after a major algorithm update.",
    author: "Elena Rodriguez, Marketing VP",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80",
    alt: "Elena Rodriguez",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-6 md:px-10 border-t border-[#566072]/30 bg-[#212A3F]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-[#BEBEBE] text-xs font-semibold tracking-widest uppercase mb-3">
            Client Feedback
          </p>
          <h2 className="text-[#F2F2F2] text-3xl md:text-5xl font-bold mb-4">
            What People Say.
          </h2>
          <p className="text-[#BEBEBE] max-w-2xl text-lg">
            Hear from the agencies, founders, and teams I&apos;ve collaborated with over the years.
          </p>
        </div>

        <div className="flex items-center justify-center">
           <ScrollReelTestimonials testimonials={TESTIMONIALS} />
        </div>
      </div>
    </section>
  );
}
