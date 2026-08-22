import { ArrowRight } from 'lucide-react'
import React from 'react'

const watches = [
  {
    id: 1,
    image: '/images/classic-watch.jpg',
    category: 'MEN',
    name: 'Classic Chronograph',
    price: '$250',
  },
  {
    id: 2,
    image: '/images/luxury-watch.jpg',
    category: 'MEN',
    name: 'Luxury Diver',
    price: '$450',
  },
  {
    id: 3,
    image: '/images/modern-watch.jpg',
    category: 'WOMEN',
    name: 'Modern Minimalist',
    price: '$200',
  },
  {
    id: 4,
    image: '/images/classic-watch.jpg',
    category: 'UNISEX',
    name: 'Everyday Classic',
    price: '$180',
  },
]

export default function BestSellers() {
  return (
    <section className="bg-[#f4f1eb] px-6 py-20 text-black sm:px-10 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs tracking-[0.3em] text-[#9c7b3c]">THE COLLECTION</p>
            <h2 className="font-serif text-4xl sm:text-5xl">Best Sellers</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600">
              Discover the timepieces our customers return to,
              chosen for their exceptional craftsmanship and timeless
              design.
            </p>
          </div>
        
        {/* Products */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {watches.map((watch) => (
              <div key={watch.id} className="group">
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e5dc]">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* Wishlist */}
                  <button className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 transition hover:bg-white">
                    ♡
                  </button>

                  {/* Quick View */}
                  <button className="absolute bottom-0 left-0 w-full translate-y-full bg-black py-3 text-[10px] tracking-[0.2em] text-white transition duration-300 group-hover:translate-y-0">
                    QUICK VIEW
                  </button>
                </div>


                {/* Product Info */}
                <div className="pt-5">
                  <p className="text-[10px] tracking-[0.2em] text-gray-500">{watch.category}</p>
                  <h3 className="mt-2 font-serif text-lg sm:text-xl">{watch.name}</h3>
                  <p className="mt-2 text-sm font-medium">{watch.price}</p>
                </div>
              </div>
            ))}

          </div>

          <div className="mt-14 text-center">
            <a
              href="/collections"
              className="inline-flex items-center gap-3 border border-black px-8 py-4 text-xs tracking-[0.2em] transition hover:bg-black hover:text-white"
            >
              SHOP ALL WATCHES
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

      </section>
  )
}
