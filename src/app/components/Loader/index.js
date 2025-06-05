"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export default function Loader() {
  const lenis = useLenis();

  gsap.registerPlugin(SplitText);

  useEffect(() => {
    const subtitle = new SplitText(".loader-subtitle", {
      type: "words",
    });

    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, {
        force: true,
        immediate: true,
      });

      const loader = document.getElementById("loader");
      gsap.to(subtitle.words, {
        y: "150%",
        stagger: 0.05,
        ease: "power3.out",
        duration: 0.8,
        onComplete: () => {
          gsap.to(subtitle.words, {
            y: "0%",
            ease: "power3.inOut",
            stagger: 0.05,
            duration: 0.8,
            delay: -0.2,
          });
        },
      });

      gsap.to("#loader", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        delay: 1,
        ease: "power3.inOut",
        onComplete: () => {
          loader.style.userSelect = "none";
          lenis.start();
        },
      });
    }
  }, [lenis]);

  return (
    <div id="loader">
      <article>
        <h1 className="loader-title">Hayde</h1>
        <h2 className="loader-subtitle">
          Illustration <br /> Studio
        </h2>
      </article>
    </div>
  ); // or some loader JSX
}
