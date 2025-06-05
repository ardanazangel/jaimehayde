"use client";

import gsap from "gsap";
import { useEffect } from "react";
import SplitText from "gsap/SplitText";
import Image from "next/image";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function HomeCarrusel() {
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    let headlineEstilo = SplitText.create(".headline-estilo", {
      type: "words",
    });

    gsap.fromTo(
      "#carrusel-content",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: "#carrusel",
          start: "top top",
          end: "top -25%",
          scrub: true,
        },
        onComplete: () => {
          gsap.fromTo(
            "#carrusel-content",
            { opacity: 1 },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: "#carrusel",
                start: "bottom 125%",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );
        },
      }
    );

    const carruselTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#carrusel",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    carruselTl.to("main", {
      backgroundColor: "#74c2e3",
    });
    carruselTl.to("main", {
      backgroundColor: "#e06794",
    });
    carruselTl.to("main", {
      backgroundColor: "#e28a4b",
    });
    carruselTl.to("main", {
      backgroundColor: "#6edc68",
    });
    carruselTl.to("main", {
      backgroundColor: "#ffffff",
    });

    gsap.fromTo(
      headlineEstilo.words,
      {
        opacity: 0.4,
      },
      {
        opacity: 1,
        stagger: 0.25,
        scrollTrigger: {
          trigger: "#carrusel-imagenes",
          start: "top top",
          end: "bottom 125%",
          scrub: true,
        },
      }
    );

    const handleScrollTriggerRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleScrollTriggerRefresh);
    window.addEventListener("onload", handleScrollTriggerRefresh);

    if (window.innerWidth < 768) {
      window.removeEventListener("resize", handleScrollTriggerRefresh);
    }

    return;
  }, []);

  return (
    <section id="carrusel">
      <div id="carrusel-content">
        <article>
          <h2 className="headline-estilo">
            Tengo mi propio lenguaje visual, aunque soy capaz de adaptarme a
            diferentes estilos.
          </h2>
        </article>
      </div>
      <div id="carrusel-imagenes">
        <div className="carrusel-imagen derecha">
          <Image
            width={300}
            height={600}
            alt="Imagen de carrusel"
            src={"/assets/carrusel-hero/1.png"}
          />
        </div>
        <div className="carrusel-imagen izquierda">
          <Image
            width={300}
            height={600}
            alt="Imagen de carrusel"
            src={"/assets/carrusel-hero/2.png"}
          />
        </div>
        <div className="carrusel-imagen derecha">
          <Image
            width={300}
            height={600}
            alt="Imagen de carrusel"
            src={"/assets/carrusel-hero/4.png"}
          />
        </div>
        <div className="carrusel-imagen izquierda">
          <Image
            width={300}
            height={600}
            alt="Imagen de carrusel"
            src={"/assets/carrusel-hero/6.png"}
          />
        </div>
        <div className="carrusel-imagen derecha">
          <Image
            width={300}
            height={600}
            alt="Imagen de carrusel"
            src={"/assets/carrusel-hero/15.png"}
          />
        </div>
      </div>
    </section>
  );
}
