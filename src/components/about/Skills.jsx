import React from "react";
import { motion } from "framer-motion";

const Skills = ({ data }) => {
  // Use data from DB if available, otherwise fallback to empty arrays
  const usingNow = data?.usingNow || [];
  const learning = data?.learning || [];
  const otherSkills = data?.otherSkills || [];

  return (
    <>
      <h2 className="w-full mt-64 font-bold text-center text-8xl md:text-6xl md:mt-32 select-none mb-16">
        Skills
      </h2>
      
      <div className="w-full flex flex-col gap-16 px-4 md:px-8">
        
        {/* Using Now */}
        <section>
          <h3 className="text-2xl font-bold uppercase tracking-wider mb-8 select-none">
            Using Now:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 gap-y-12 place-items-center">
            {usingNow.map((skill, idx) => (
              <motion.div 
                key={idx} 
                className="flex flex-col items-center justify-center gap-4 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }}
                viewport={{ once: true }}
              >
                {skill.iconUrl && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center">
                    <img src={skill.iconUrl} alt={skill.name} className="object-contain w-full h-full" />
                  </div>
                )}
                <span className="text-sm font-semibold uppercase tracking-widest text-muted select-none text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Learning */}
        <section>
          <h3 className="text-2xl font-bold uppercase tracking-wider mb-8 select-none">
            Learning:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 gap-y-12 place-items-center">
            {learning.map((skill, idx) => (
              <motion.div 
                key={idx} 
                className="flex flex-col items-center justify-center gap-4 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }}
                viewport={{ once: true }}
              >
                {skill.iconUrl && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center">
                    <img src={skill.iconUrl} alt={skill.name} className="object-contain w-full h-full" />
                  </div>
                )}
                <span className="text-sm font-semibold uppercase tracking-widest text-muted select-none text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Other Skills */}
        <section>
          <h3 className="text-2xl font-bold uppercase tracking-wider mb-8 select-none">
            Other Skills:
          </h3>
          <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-lg font-medium pl-4">
            {otherSkills.map((skill, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: idx * 0.1 } }}
                viewport={{ once: true }}
                className="text-fg/80"
              >
                {skill.name}
              </motion.li>
            ))}
          </ul>
        </section>

      </div>
    </>
  );
};

export default Skills;
