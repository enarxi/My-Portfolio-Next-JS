"use client"

import AnimatedText from "@/components/common/AnimatedText";
import Layout from "@/components/common/Layout";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import profilePic from "../../../public/images/profile/profile-pic-1.jpg";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Skills from "@/components/about/Skills";
import Experience from "@/components/about/Experience";
import Education from "@/components/about/Education";
import TransitionEffect from "@/components/common/TransitionEffect";
import Link from "next/link";

const stats = [
  {
    id: 1,
    value: 8,
    name: "Years of Experience",
  },
];

const AnimateNumbers = ({ value }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, value]);

  return <span ref={ref}></span>;
};

const ClientPage = () => {
  return (
    <>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center mt-16">
        <Layout className="pt-16">
          <AnimatedText text="Passion Fuels Purpose!" className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8" />
          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8">
              <h2 className="mb-4 text-lg font-bold uppercase text-muted">
                Biography
              </h2>
              <p className="font-medium">
  👋 Hello, I&apos;m Vencent Domingo, a Senior Frontend Web Developer with nearly 8 years of experience. I specialize in WordPress architecture, React, and Next.js 💻. My expertise lies in building high-performance web applications and custom WordPress themes from scratch.
</p>
<p className="my-4 font-medium">
  🌟 Throughout my career, I have taken end-to-end technical ownership of numerous client projects. Whether it&apos;s transitioning a legacy CMS to a modern architecture, developing complex RESTful APIs, or collaborating closely with designers to achieve pixel-perfect UI/UX, I am deeply committed to crafting seamless digital experiences.
</p>
<p className="my-4 font-medium">
  🚀 Beyond standard development, I am highly skilled in technical SEO and performance optimization. Using tools like SEMRush and Dynatrace, I have successfully improved website visibility and reduced load times, ensuring that the applications I build are not only beautiful but also blazing fast and search-engine friendly 🎯.
</p>
<p className="font-medium">
  🔍 I&apos;m currently exploring exciting opportunities as a Senior Frontend Developer where I can leverage my strong problem-solving skills and technical background. Let&apos;s connect and explore how I can add value to your team! 🤝
</p>

            </div>
            <div className="col-span-3 relative h-max rounded-2xl border-2 border-solid border-fg bg-bg p-8 xl:col-span-4 md:order-1 md:col-span-8">
              <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-fg" />
              <Image
                src={profilePic}
                alt="Vencent Domingo"
                className="w-full h-auto rounded-2xl"
                priority
                sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="col-span-2 flex flex-col flex-wrap items-center xl:col-span-8 xl:items-center md:order-3">
              {stats.map(({ id, value, name }) => (
                <div
                  key={id}
                  className="flex flex-col flex-wrap items-center justify-center xl:items-center xl:my-3"
                >
                  <p className="inline-block text-7xl font-bold">
                    <AnimateNumbers value={value} />+
                  </p>
                  <h2 className="text-xl text-center font-medium capitalize text-muted xl:text-center md:text-lg sm:text-base xs:text-sm">
                    {name}
                  </h2>
                </div>
              ))}
              <Link href="/projects" className="flex items-center bg-fg text-bg mt-5 p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-bg hover:text-fg border-2 border-solid border-fg md:p-2 md:px-4 md:text-base">View Projects </Link>
            </div>
          </div>
          <Skills />
          <Experience />
          <Education />
        </Layout>
      </main>
    </>
  );
};

export default ClientPage;
