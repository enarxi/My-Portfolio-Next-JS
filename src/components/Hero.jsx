"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

const Hero = ({ children }) => {
  const containerRef = useRef(null);
  const particlesContainerRef = useRef(null);
  const spheresRef = useRef([]);

  useEffect(() => {
    if (!particlesContainerRef.current) return;
    
    const particlesContainer = particlesContainerRef.current;
    const particleCount = 40; // reduced count for better performance
    let animationFrameId;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      createParticle(particlesContainer);
    }
    
    function createParticle(container) {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      
      // Random size
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      const pos = resetParticle(particle);
      container.appendChild(particle);
      
      animateParticle(particle, pos);
    }
    
    function resetParticle(particle) {
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = '0';
      
      return { x: posX, y: posY };
    }
    
    function animateParticle(particle, startPos) {
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      
      setTimeout(() => {
        if (!particlesContainerRef.current) return; // check if unmounted
        
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();
        
        const moveX = startPos.x + (Math.random() * 20 - 10);
        const moveY = startPos.y - Math.random() * 30; // Move upwards
        
        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;
        
        setTimeout(() => {
          if (!particlesContainerRef.current) return;
          const newPos = resetParticle(particle);
          particle.style.transition = 'none'; // reset transition instantly
          // small delay before starting next animation to allow CSS to apply
          setTimeout(() => animateParticle(particle, newPos), 50);
        }, duration * 1000);
      }, delay * 1000);
    }

    let lastParticleTime = 0;
    let ticking = false;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const now = Date.now();
      const clientX = e.clientX;
      const clientY = e.clientY;
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;

      // 1. Interactive particles at mouse cursor (throttled to ~20fps)
      if (particlesContainerRef.current && now - lastParticleTime > 50) {
        lastParticleTime = now;
        const rect = containerRef.current.getBoundingClientRect();
        
        const mouseX = ((clientX - rect.left) / rect.width) * 100;
        const mouseY = ((clientY - rect.top) / rect.height) * 100;
        
        const particle = document.createElement('div');
        particle.className = styles.particle;
        
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `calc(${mouseX}% - ${size/2}px)`;
        particle.style.top = `calc(${mouseY}% - ${size/2}px)`;
        particle.style.opacity = '0.5';
        
        particlesContainerRef.current.appendChild(particle);
        
        // Ensure browser paints before applying transition
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!particle.parentNode) return;
            particle.style.transition = 'all 2s ease-out';
            particle.style.left = `calc(${mouseX + (Math.random() * 10 - 5)}% - ${size/2}px)`;
            particle.style.top = `calc(${mouseY + (Math.random() * 10 - 5)}% - ${size/2}px)`;
            particle.style.opacity = '0';
            
            setTimeout(() => {
              if (particle.parentNode) particle.remove();
            }, 2000);
          });
        });
      }

      // 2. Parallax effect on spheres (throttled via requestAnimationFrame)
      if (!ticking) {
        requestAnimationFrame(() => {
          const moveX = (clientX / innerWidth - 0.5) * 20;
          const moveY = (clientY / innerHeight - 0.5) * 20;
          
          spheresRef.current.forEach((sphere, index) => {
            if (sphere) {
              const depth = (index + 1) * 0.5;
              sphere.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (particlesContainerRef.current) {
        particlesContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <section className={styles.heroWrapper} ref={containerRef}>
      <div className={styles.gradientBackground}>
        <div 
          ref={el => spheresRef.current[0] = el} 
          className={`${styles.gradientSphere} ${styles.sphere1}`}
        ></div>
        <div 
          ref={el => spheresRef.current[1] = el} 
          className={`${styles.gradientSphere} ${styles.sphere2}`}
        ></div>
        <div 
          ref={el => spheresRef.current[2] = el} 
          className={`${styles.gradientSphere} ${styles.sphere3}`}
        ></div>
        <div className={styles.glow}></div>
        <div className={styles.gridOverlay}></div>
        <div className={styles.noiseOverlay}></div>
        <div className={styles.particlesContainer} ref={particlesContainerRef}></div>
      </div>
      
      <div className={styles.contentContainer}>
        {children}
      </div>
    </section>
  );
};

export default Hero;
