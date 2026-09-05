"use client"

import AnimatedText from "@/components/common/AnimatedText";

import HireMe from "@/components/common/HireMe";
import Layout from "@/components/common/Layout";
import TransitionEffect from "@/components/common/TransitionEffect";
import React from "react";
import {
  MdDesignServices,
  MdDeveloperMode,
  MdWeb,
  MdMobileFriendly,
  MdSocialDistance,
  MdWork,
} from "react-icons/md";

const ClientPage = () => {
  return (
    <>
      <TransitionEffect />
      <main className="items-center w-full min-h-screen select-text">
        <Layout>
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center w-full text-center align-center">
              {/* Heading */}
              <AnimatedText
                text="The Services We Offer!"
                className="mb-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              />

              {/* Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-4">
                {[
                  {
                    icon: <MdWeb className="text-5xl text-blue-500" />,
                    title: "Front-End Development",
                    description:
                      "Creating blazing fast and responsive user interfaces using modern frameworks like React and Next.js.",
                  },
                  {
                    icon: (
                      <MdDeveloperMode className="text-5xl text-green-500" />
                    ),
                    title: "WordPress Architecture",
                    description:
                      "Building custom themes, developing plugins, and migrating legacy CMS applications to modern WordPress architectures.",
                  },
                  {
                    icon: (
                      <MdSocialDistance className="text-5xl text-yellow-500" />
                    ),
                    title: "Technical SEO & Performance",
                    description:
                      "Auditing and optimizing websites for search engines and performance using tools like SEMRush and Dynatrace.",
                  },
                  {
                    icon: (
                      <MdDesignServices className="text-5xl text-purple-500" />
                    ),
                    title: "UI/UX Implementation",
                    description:
                      "Collaborating closely with designers to ensure pixel-perfect and accessible user interfaces.",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center justify-center p-6 border rounded-2xl border-solid border-border bg-bg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative w-full h-full rounded-[2rem] bg-border" />

                    <div className="flex justify-center mb-4">
                      {service.icon}
                    </div>

                    <h3 className="text-xl font-semibold text-center mb-2 text-fg">
                      {service.title}
                    </h3>
                    <p className="text-muted text-center mb-2">
                      {service.description}
                    </p>
                    <a
                      href="/contact"
                      className="mt-auto px-6 py-2 text-fg underline underline-offset-4 decoration-wavy decoration-accent hover:decoration-accent/70 transition duration-300"
                    >
                      Get a Quote
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout>

        <HireMe />
      </main>
    </>
  );
};

export default ClientPage;
