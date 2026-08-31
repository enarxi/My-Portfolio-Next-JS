"use client"

import Layout from "@/components/Layout";
import Image from "next/image";
import profilePic from "../../public/images/profile/profile-pic.png";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { LinkArrow } from "@/components/Icons";
import HireMe from "@/components/HireMe";
import TransitionEffect from "@/components/TransitionEffect";
import { Typewriter } from "react-simple-typewriter";
import Hero from "@/components/Hero";

const HomeClient = () => {
  return (
    <>
      <TransitionEffect />
      
      {/* 1. The Modern Gradient Hero Section */}
      <Hero>
        <div className="flex flex-col items-center justify-center text-center max-w-[600px] mx-auto p-8 relative z-10">
          <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fg to-muted drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] md:text-5xl sm:text-4xl">
            Modern Gradient
          </h1>
          <p className="text-xl leading-relaxed text-fg/80 mb-8 md:text-lg sm:text-base">
            A sleek, modern background with soft gradient spheres, subtle movement, and interactive particle effects. Perfect for contemporary web designs.
          </p>
          <button className="bg-gradient-to-r from-accent to-primary text-bg font-semibold text-base py-3 px-8 rounded-full uppercase tracking-wider shadow-[0_4px_20px_rgba(255,91,62,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(255,91,62,0.4)] transition-all duration-300">
            Explore More
          </button>
        </div>
      </Hero>

      {/* 2. The Original Profile Section */}
      <main className="flex items-center w-full min-h-screen pt-16 text-fg">
        <Layout className="pt-0 md:pt-16 sm:pt-8">
          <div className="flex items-center justify-center w-full lg:flex-col">
            <div className="items-center justify-center w-1/2 mb-4 mr-8 md:m-0 md:w-full">
              <Image
                src={profilePic}
                alt="Vencent Domingo"
                className="items-center w-full h-auto lg:hidden md:flex md:w-full"
                priority
                sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 50vw object-fit"
              />
            </div>
            <div className="flex flex-col text-center items-center w-1/2 lg:w-full lg:text-center">
              {/* Animated Text with Typewriter Effect */}
              <h1 className="font-heading font-bold text-center justify-center items-center !text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl">
                <Typewriter
                  words={[
                    "Senior Frontend Web Developer",
                    "Data Analyst",
                    "WordPress & React Specialist",
                  ]}
                  loop={0} // 0 = infinite loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </h1>
              <p className="my-4 !text-left self-center text-base font-medium md:text-sm sm:text-xs">
                Senior Frontend Web Developer with nearly 8 years of experience
                specializing in WordPress architecture, React, and Next.js. I
                have a proven track record of providing end-to-end technical
                ownership and automating frontend workflows to improve team
                efficiency. Let&#39;s build high-performance web applications!
                🚀
              </p>
              <div className="flex flex-wrap items-center self-start mt-2 md:flex-col md:gap-2 lg:self-center">
                <Link
                  href="/Vencent_Domingo_Resume.pdf"
                  target={"_blank"}
                  className="flex items-center bg-fg text-bg p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-bg hover:text-fg border-2 border-solid border-fg md:p-2 md:px-4 md:text-base"
                >
                  Resume <LinkArrow className="w-6 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </Layout>

        <HireMe />
      </main>
    </>
  );
};

export default HomeClient;
