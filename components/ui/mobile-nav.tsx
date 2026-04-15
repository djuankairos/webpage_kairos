"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#solucion", label: "Solución" },
  { href: "#resultados", label: "Resultados" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#geo", label: "Cobertura" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — only visible on mobile */}
      <button
        className="inline-flex items-center justify-center rounded-md p-2 text-kairos-gray-light hover:text-kairos-green md:hidden"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <nav
          className="absolute left-0 right-0 top-full z-40 flex flex-col gap-1 border-b border-kairos-dark/80 bg-black/95 px-4 py-3 backdrop-blur-xl md:hidden"
          aria-label="Navegación móvil"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-3 text-sm text-kairos-gray-light hover:bg-kairos-dark/40 hover:text-kairos-green transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
