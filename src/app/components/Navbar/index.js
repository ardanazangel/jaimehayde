"use client";

import TransitionLink from "../TransitionLink";
import Link from "next/link";
import { useEffect, useState } from "react";

// Debounce function
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

export default function Navbar() {
  const [logoText, setLogoText] = useState("Jaime Hayde");

  useEffect(() => {
    const updateLogo = () => {
      if (window.innerWidth < 768) {
        setLogoText("JH");
      } else {
        setLogoText("Jaime Hayde");
      }
    };

    updateLogo(); // Initial update

    const handleResize = debounce(() => {
      updateLogo();
    }, 250); // Debounce delay of 250ms

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav id="navbar">
      <TransitionLink href={"/"}>
        <div id="logo" className="u-text-style-">
          {logoText}
        </div>
      </TransitionLink>
      <ul>
        <li className="u-text-style-">
          <TransitionLink href={"/"}>Home</TransitionLink>
        </li>
        <li className="u-text-style-">
          <TransitionLink href={"/portfolio"}>Portfolio</TransitionLink>
        </li>
        <li className="u-text-style-">
          <Link href={"https://shop.jaimehayde.com/"}>Shop</Link>
        </li>
        <li className="u-text-style-">
          <TransitionLink href={"/about"}>About</TransitionLink>
        </li>
      </ul>
    </nav>
  );
}
