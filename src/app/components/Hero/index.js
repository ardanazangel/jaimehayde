"use client";

import gsap from "gsap";
import { useEffect } from "react";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const headlines = document.querySelectorAll(".headline");
    const ilustracionAbout = document.querySelector(".ilustracion");
    const bocadillo = document.querySelector(".bocadillo");

    headlines.forEach((headline) => {
      let splitHeadlines = SplitText.create(headline, {
        type: "words, lines",
        mask: "lines",
      });
      gsap.fromTo(
        splitHeadlines.lines,
        {
          y: "100%",
        },
        {
          y: "",
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
          duration: 0.6,
          scrollTrigger: {
            start: "top bottom",
            end: "bottom top",
            trigger: headline,
            toggleActions: "play none play reset",
          },
        }
      );
    });

    gsap.to("#hero", {
      padding: "4vw",
      ease: "linear",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to("#hero-content", {
      borderRadius: "4vw",
      ease: "linear",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.fromTo(
      ilustracionAbout,
      {
        y: "50%",
      },
      {
        y: "-50%",
        ease: "linear",
        scrollTrigger: {
          trigger: ".ilustracion",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.to(bocadillo, {
      rotate: "15deg",
      scale: 1.25,
      ease: "power2.inOut",
      yoyo: true,
      repeat: Infinity,
    });
  }, []);
  return (
    <>
      <section id="hero">
        <div id="hero-content">
          <Image
            src="/assets/ilustracion-hero.webp"
            alt="Ilustracion principal"
            width={600}
            height={300}
          />
        </div>
      </section>
      <section id="servicios" className="seccion-home">
        <h2 className="headline">
          Desde 2015 ofrezco <strong>servicios</strong> de ilustración para
          proyectos, marcas y <strong>empresas a nivel global.</strong>
        </h2>
        <div className="ilustracion">
          <Image
            src="/assets/soy-jaime-1.svg"
            alt="Ilustración retrato de Jaime"
            className="retrato"
            width={200}
            height={200}
          />
          <Image
            src="/assets/soy-jaime-2.svg"
            alt="Bocadillo de la ilustración"
            className="bocadillo"
            width={200}
            height={200}
          />
        </div>
        <Link href={"/portfolio"} className="button">
          Ver portfolio
        </Link>
      </section>
    </>
  );
}
