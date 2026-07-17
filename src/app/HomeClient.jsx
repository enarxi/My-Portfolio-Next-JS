"use client"

import Layout from "@/components/Layout";
import Image from "next/image";
import profilePic from "../../public/images/profile/profile-pic.png";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { LinkArrow } from "@/components/Icons";
import HireMe from "@/components/HireMe";
import lightBulb from '../../public/images/svgs/miscellaneous_icons_1.svg';
import TransitionEffect from "@/components/TransitionEffect";
import { Typewriter } from "react-simple-typewriter";

const HomeClient = () => {
  return (
    <>
      <TransitionEffect />
      <main className="flex items-center w-full min-h-screen pt-16 mt-12 text-dark">
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
             <h1 style={{fontFamily: "Fira Sans, sans-serif"}} className="font-bold text-center justify-center items-center !text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl">
                <Typewriter
                  words={[
                    'Senior Frontend Web Developer',
                    'Data Analyst',
                    'WordPress & React Specialist'
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
  Senior Frontend Web Developer with nearly 8 years of experience specializing in WordPress architecture, React, and Next.js. I have a proven track record of providing end-to-end technical ownership and automating frontend workflows to improve team efficiency. Let&#39;s build high-performance web applications! 🚀
</p>
              <div className="flex flex-wrap items-center self-start mt-2 md:flex-col md:gap-2 lg:self-center">
                <Link href="/Vencent_Domingo_Resume.pdf" target={"_blank"}className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:border-light md:p-2 md:px-4 md:text-base">Resume <LinkArrow className="w-6 ml-1" /></Link>
              </div>
            </div>
          </div>
        </Layout>
        <HireMe />
        <div className="absolute inline-block w-24 right-8 bottom-8 md:hidden">
          <Image src={lightBulb} alt="Vencent Domingo" className="w-full h-auto"/>
        </div>
      </main>
    </>
  );
};

export default HomeClient;
