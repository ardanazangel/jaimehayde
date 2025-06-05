"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ImagenesAbout() {
  useEffect(() => {
    gsap.to("#img-jaime", {
      y: "20%",
      scrollTrigger: {
        trigger: "#img-jaime",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to("#img-tomate", {
      y: "-20%",
      scrollTrigger: {
        trigger: "#img-tomate",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);
  return (
    <section id="final-about">
      <Image
        src={"/assets/tomate.svg"}
        width={300}
        height={600}
        alt="Ilustracion Jaime Tomate"
        className="final-img-about"
        id="img-tomate"
      />
      <Image
        src={"/assets/jaime.svg"}
        width={300}
        height={600}
        alt="Ilustracion Jaime Tomate"
        className="final-img-about"
        id="img-jaime"
      />
      <a id="img-carpeta" className="final-img-about">
        <Image
          src={"/assets/carpeta.svg"}
          width={300}
          height={600}
          alt="Ilustracion Jaime Tomate"
        />
        <p style={{ paddingTop: "1vw", paddingLeft: "1vw" }}>Descarga mi CV</p>
      </a>
    </section>
  );
}
