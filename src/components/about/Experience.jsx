import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import ListIcon from "./ListIcon";

const experiences = [
  {
    id: 1,
    position: "Senior Frontend Web Developer",
    company: "InGnius Systems Private Limited",
    companyLink: "",
    time: "June 2025 - Present",
    address: "Taguig",
    work: "Engineered and launched complete websites. Managed full project lifecycle, improved SEO frameworks, and developed custom automation tools using WP-CLI and Bash.",
  },
  {
    id: 2,
    position: "Senior Frontend Web Developer",
    company: "Vishay Philippines Inc.",
    companyLink: "",
    time: "May 2018 - September 2024",
    address: "Makati",
    work: "Transitioned backend from a Cocoon-based website to CMS-driven architecture. Developed .NET applications, led SEO enhancements achieving a 12% boost, and documented project processes.",
  },
  {
    id: 3,
    position: "Student Trainee",
    company: "Vishay Philippines Inc.",
    companyLink: "",
    time: "September 2017 - March 2018",
    address: "Makati",
    work: "Gained hands-on experience in JavaScript, CSS, HTML. Assisted engineers by developing calculators for complex computations and applied XML/XSLT skills.",
  },
];

const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col justify-between md:w-[80%]"
    >
      <ListIcon reference={ref} />
      <motion.div>
        <motion.h3
          className="text-2xl font-bold capitalize sm:text-xl xs:text-lg"
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {position}&nbsp;{" "}
          <a
            className="capitalize text-accent"
            href={"#experience"}
          >
            @{company}
          </a>
        </motion.h3>
        <span className="font-medium capitalize text-muted xs:text-sm">
          {time} | {address}
        </span>
        <p className="w-full font-medium md:text-sm">{work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="my-64">
      <h2 className="w-full mb-32 font-bold text-center text-8xl md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>
      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[50%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-fg origin-top md:w-[2px] md:left-[30px] xs:left-[20px]"
        />
        <ul className="flex flex-col items-start justify-between w-full ml-4 xs:ml-2">
          {experiences.map(
            ({ id, position, company, companyLink, time, address, work }) => (
              <Details
                key={id}
                position={position}
                company={company}
                companyLink={companyLink}
                time={time}
                address={address}
                work={work}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Experience;

