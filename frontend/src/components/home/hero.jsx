import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=2000&q=90"
        alt="Luxury Veloura watch"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-8">
        
        <div className="max-w-2xl">
          
          <p className="mb-5 text-xs font-medium tracking-[0.4em] text-[#c9a96e] sm:text-sm">
            THE ART OF TIME
          </p>

          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Time,
            <br />
            <span className="italic text-[#d6b878]">
              Refined.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-sm leading-7 text-gray-300 sm:text-base">
            Discover exceptional timepieces crafted for those who
            appreciate precision, elegance, and the beauty of every
            passing moment.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            
            <a
              href="/collections"
              className="group flex items-center justify-center gap-3 bg-[#c9a96e] px-7 py-4 text-xs font-semibold tracking-[0.2em] text-black transition duration-300 hover:bg-[#e0c58c]"
            >
              EXPLORE COLLECTION

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="/about"
              className="flex items-center justify-center border border-white/40 px-7 py-4 text-xs font-semibold tracking-[0.2em] text-white transition duration-300 hover:border-white hover:bg-white/10"
            >
              OUR STORY
            </a>

          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[9px] tracking-[0.3em] text-gray-400">
          SCROLL TO DISCOVER
        </span>

        <div className="h-10 w-px bg-gradient-to-b from-[#c9a96e] to-transparent" />
      </div>

    </section>
  );
}
