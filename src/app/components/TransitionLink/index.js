"use client";

import { useRouter } from "next/navigation";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function TransitionLink({ href, children, className }) {
  const router = useRouter();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // Escucha cuando cambia la ruta para ejecutar la animación de salida
  useEffect(() => {
    const handleRouteChange = () => {
      const transitionWrapper = document.getElementById("transition");
      if (transitionWrapper) {
        transitionWrapper.style.transformOrigin = "top";

        gsap.to(transitionWrapper, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(transitionWrapper, {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });
          },
        });
      }
    };

    // Verifica si la ruta realmente cambió (no solo al montar el componente)
    if (pathname !== previousPathname.current) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(handleRouteChange, 100);
      previousPathname.current = pathname;
    }
  }, [pathname]);

  const handleClick = (e) => {
    e.preventDefault();

    const transitionWrapper = document.getElementById("transition");

    // Define colores por ruta (incluyendo patrones para rutas dinámicas)
    const getColorForRoute = (route) => {
      const colorMap = {
        "/portfolio": "#a6e0ff",
        "/shop": "#ffa161",
        "/about": "#8fff85",
        "/": "#f2f2f2",
      };

      // Verifica rutas exactas primero
      if (colorMap[route]) {
        return colorMap[route];
      }

      // Verifica patrones para rutas dinámicas
      if (route.startsWith("/portfolio")) return "#a6e0ff";
      if (route.startsWith("/shop")) return "#ffa161";
      if (route.startsWith("/about")) return "#8fff85";

      return "#000"; // Color por defecto
    };

    const bgColor = getColorForRoute(href);

    // Aplica el color de fondo antes de animar
    transitionWrapper.style.backgroundColor = bgColor;
    transitionWrapper.style.transformOrigin = "bottom";

    if (pathname !== href) {
      // Animación de entrada
      gsap.to(transitionWrapper, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          router.push(href); // Navega
        },
      });
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
