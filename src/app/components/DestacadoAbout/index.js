"use client";

import gsap from "gsap";
import { useEffect } from "react";
import Image from "next/image";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function DestacadoAbout() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    gsap.fromTo(
      "#mrclean-img",
      {
        y: "100%",
        rotate: "-30deg",
      },
      {
        y: "-10%",
        rotate: "0deg",
        scrollTrigger: {
          trigger: "#destacado-about",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);
  return (
    <section id="destacado-about">
      <article>
        <h2>“Siempre destacan que trabajo de forma rápida y eficaz.”</h2>
      </article>
      <Image
        src="/assets/mrclean.png"
        width={600}
        height={900}
        alt="Imagen de Jaime Hayde Mr.Clean"
        id="mrclean-img"
      />
    </section>
  );
}
