"use client"

import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import React from "react";

const ClientPage = () => {
  return (
    <>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light mt-16">
        <Layout className="pt-16">
          <AnimatedText
            text="Words Can Change The World!"
            className="mb-16 lg:!text-7xl sm:!text-6xl sm:mb-8 xs:!text-4xl"
          />
          <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">
            Coming Soon!
          </h2>
          <p className="w-full text-center text-lg font-medium">
            Stay tuned for my upcoming articles on WordPress, React, and SEO!
          </p>
        </Layout>
      </main>
    </>
  );
};

export default ClientPage;
