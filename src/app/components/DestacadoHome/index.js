"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Image from "next/image";

export default function DestacadoHome() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    gsap.to("#destacado-imagen", {
      y: "-100%",
      scrollTrigger: {
        trigger: "#destacado-imagen",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);
  return (
    <section id="destacado">
      <div id="destacado-content">
        <h2 className="headline">
          Mi trabajo ha sido destacado por diferentes medios especializados en
          el sector
        </h2>
        <Image
          src="/assets/destacado.svg"
          alt="Imagen de destacado"
          id="destacado-imagen"
          width={600}
          height={400}
        />
      </div>
    </section>
  );
}
