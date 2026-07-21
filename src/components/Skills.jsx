import React from "react";
import { motion } from "framer-motion";

const skills = [
  { id: 1, name: "JavaScript", x: "-20vw", y: "2vw" },
  { id: 2, name: "CSS/SCSS", x: "-5vw", y: "-10vw" },
  { id: 3, name: "ReactJS", x: "20vw", y: "6vw" },
  { id: 4, name: "Next.js", x: "0vw", y: "12vw" },
  { id: 5, name: "WordPress", x: "-20vw", y: "-15vw" },
  { id: 6, name: "PHP", x: "15vw", y: "-12vw" },
  { id: 7, name: ".NET / C#", x: "32vw", y: "-5vw" },
  { id: 8, name: "Tailwind CSS", x: "1vw", y: "-18vw" },
  { id: 9, name: "MySQL / Databases", x: "-25vw", y: "10vw" },
  { id: 10, name: "Technical SEO", x: "18vw", y: "18vw" },
  { id: 11, name: "Linux CLI", x: "-15vw", y: "-4vw" },
  { id: 12, name: "Git", x: "-8vw", y: "18vw" },
  { id: 13, name: "RESTful APIs", x: "-25vw", y: "-9vw" },
  { id: 14, name: "XML/XSLT", x: "32vw", y: "8vw" },
  { id: 15, name: "Performance Tuning", x: "15vw", y: "-2vw" },
];

const Skill = ({ name, x, y }) => {
  return (
    <motion.div
      className="flex items-center justify-center rounded-full font-semibold bg-fg text-bg py-3 px-6 shadow-md cursor-pointer absolute xs:bg-fg xs:text-bg xs:text-bold select-none lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3"
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 1.5 } }}
      viewport={{ once: true }}
    >
      {name}
    </motion.div>
  );
};

const Skills = () => {
  return (
    <>
      <h2 className="w-full mt-64 font-bold text-center text-8xl md:text-6xl md:mt-32 select-none ">
        Skills
      </h2>
      <div className="w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight lg:h-[80vh] sm:h-[60vh] xs:h-[50vh] lg:bg-circularLightLg md:bg-circularLightMd sm:bg-circularLightSm select-none ">
        <motion.div
          className="flex items-center justify-center p-8 font-semibold rounded-full cursor-pointer bg-fg text-bg shadow-md lg:p-6 md:p-4 xs:text-xs xs:p-2 select-none "
          whileHover={{ scale: 1.05 }}
        >
          Web
        </motion.div>
        {skills.map(({ id, name, x, y }) => (
          <Skill key={id} name={name} x={x} y={y} />
        ))}
      </div>
    </>
  );
};

export default Skills;
