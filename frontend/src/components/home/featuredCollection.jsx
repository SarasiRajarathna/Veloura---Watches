import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const collections = [
  {
    title: "Classic Collection",
    subtitle: "TIMELESS ELEGANCE",
    image: "/images/classic-watch.jpg",
  },
  {
    title: "Luxury Collection",
    subtitle: "CRAFTED FOR EXCELLENCE",
    image: "/images/luxury-watch.jpg",
  },
  {
    title: "Modern Collection",
    subtitle: "BOLD & CONTEMPORARY",
    image: "/images/modern-watch.jpg",
  },
];

export default function FeaturedCollection() {
  return (
    <section
      id="about-us"
      className="bg-[#111111] px-6 py-20 sm:px-10 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>
            <p className="mb-3 text-xs tracking-[0.3em] text-[#c9a96e]">
              DISCOVER
            </p>

            <h2 className="font-serif text-4xl text-white sm:text-5xl">
              Featured Collections
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-400">
              Explore our carefully selected collections of premium timepieces,
              designed for those who appreciate timeless elegance and
              exceptional craftsmanship.
            </p>
          </div>

          {/* View All */}
          <a
            href="/collections"
            className="group flex items-center gap-2 text-xs tracking-[0.2em] text-gray-400 transition hover:text-white"
          >
            VIEW ALL

            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>

        </div>

        {/* Collection Grid */}
        <div className="grid gap-5 md:grid-cols-3">

          {collections.map((collection) => (
            <a
              key={collection.title}
              href="/collections"
              className="group relative h-[430px] overflow-hidden sm:h-[500px]"
            >

              {/* Image */}
              <img
                src={collection.image}
                alt={collection.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-7">

                <p className="mb-2 text-xs tracking-[0.2em] text-[#c9a96e]">
                  {collection.subtitle}
                </p>

                <h3 className="font-serif text-3xl text-white">
                  {collection.title}
                </h3>

                {/* Discover */}
                <div className="mt-5 flex items-center gap-2 text-xs tracking-widest text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  DISCOVER

                  <ArrowUpRight size={15} />
                </div>

              </div>
            </a>
          ))}

        </div>
      </div>
    </section>
  );
}
