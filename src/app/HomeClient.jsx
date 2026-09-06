"use client"

import Image from "next/image";
import profilePic from "../../public/images/profile/profile-pic.png";
import AnimatedText from "@/components/common/AnimatedText";
import Link from "next/link";
import { LinkArrow } from "@/components/common/Icons";

import TransitionEffect from "@/components/common/TransitionEffect";
import { Typewriter } from "react-simple-typewriter";
import Hero from "@/components/home/Hero";

const HomeClient = ({ heroData }) => {

  // Parse roles array safely (handles DB strings vs JSON)
  let parsedRoles = ["Software Engineer"]; // fallback
  if (heroData?.roles) {
    try {
      parsedRoles = JSON.parse(heroData.roles);
      if (!Array.isArray(parsedRoles)) {
        parsedRoles = [heroData.roles];
      }
    } catch (e) {
      // If it's just a comma-separated string, split it
      parsedRoles = heroData.roles.split(',').map(r => r.trim());
    }
  }

  // Fallback to local image if DB image_url is missing
  const imageSrc = heroData?.image_url ? heroData.image_url : profilePic;
  const isExternalImage = typeof imageSrc === 'string';

  return (
    <>
      <TransitionEffect />
      
      {/* 1. The Profile Section inside Hero */}
      {heroData ? (
        <Hero>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-16 lg:px-8 md:px-6 sm:px-4 py-0 text-fg">
            <div className="flex items-center justify-center w-full lg:flex-col gap-16 lg:gap-8">
              <div className="items-center justify-center w-1/2 mb-4 md:m-0 md:w-full">
                {isExternalImage ? (
                  <img
                    src={imageSrc}
                    alt={heroData.name}
                    className="items-center w-full h-auto lg:hidden md:flex md:w-full"
                  />
                ) : (
                  <Image
                    src={imageSrc}
                    alt={heroData.name}
                    className="items-center w-full h-auto lg:hidden md:flex md:w-full"
                    priority
                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 50vw object-fit"
                  />
                )}
              </div>
              <div className="flex flex-col items-start text-left justify-center w-1/2 lg:w-full lg:items-center lg:text-center">
                <p className="text-accent font-mono mb-4 md:text-lg">{heroData.greeting}</p>
                <h1 className="font-heading font-extrabold text-8xl xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-fg tracking-tight mb-4">
                  {heroData.name}
                </h1>
                {/* Animated Text with Typewriter Effect */}
                <h2 className="font-heading font-bold text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-muted tracking-tight mb-8 min-h-[1.5em]">
                  <Typewriter
                    words={parsedRoles}
                    loop={0} // 0 = infinite loop
                    cursor
                    cursorStyle="|"
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </h2>
                <p className="text-fg/80 max-w-xl text-lg leading-relaxed mb-10">
                  {heroData.description}
                </p>
                <div className="flex flex-wrap items-center mt-2">
                  <Link
                    href="/Vencent_Domingo_Resume.pdf"
                    target={"_blank"}
                    className="flex items-center justify-center border-2 border-accent text-accent px-8 py-3 rounded bg-transparent hover:bg-accent/10 transition-colors font-mono font-semibold"
                  >
                    Resume <LinkArrow className="w-6 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Hero>
      ) : null}

    </>
  );
};

export default HomeClient;
