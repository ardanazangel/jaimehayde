"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function ContactHome() {
  useEffect(() => {
    gsap.to("#contacto-imagen", {
      y: "-75%",
      scrollTrigger: {
        trigger: "#contacto-imagen",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);
  return (
    <section id="contacto">
      <h2 className="headline">
        Me encanta el trato cercano. Si estás dudando, hablemos para poder
        resolver las cuestiones que tengas. Estoy deseando saber de ti
      </h2>
      <Image
        src="/assets/jaime-ilustrando.svg"
        alt="Imagen de contacto"
        id="contacto-imagen"
        width={600}
        height={400}
      />
      <ul>
        <li>
          <h2>
            <a>+34 687 07 20 98</a>
          </h2>
        </li>
        <li>
          <h2>
            <a>info@jaimehayde.com</a>
          </h2>
        </li>
      </ul>
    </section>
  );
}
