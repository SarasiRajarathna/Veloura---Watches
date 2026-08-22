import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808] px-6 py-14 sm:px-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <h2 className="font-serif text-2xl tracking-[0.2em]">VELOURA</h2>
              <p className="mt-5 max-w-xs text-sm leading-6 text-gray-500">
                Timeless design. Exceptional craftsmanship.
                Created for those who value every moment.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h3 className="text-xs tracking-[0.2em]">SHOP</h3>
              <div className="mt-5 flex flex-col gap-3 text-sm text-gray-500">
                <a href="/collections" className="hover:text-white">All Watches</a>
                <a href="/collections/men" className="hover:text-white">Men's Collection</a>
                <a href="/collections/women" className="hover:text-white">Women's Collection</a>
                <a href="/new-arrivals" className="hover:text-white">New Arrivals</a>
              </div>
            </div>

            {/* Help */}
            <div>
              <h3 className="text-xs tracking-[0.2em]">INFORMATION</h3>
              <div className="mt-5 flex flex-col gap-3 text-sm text-gray-500">
                <a href="/about" className="hover:text-white">Our Story</a>
                <a href="/contact" className="hover:text-white">Contact</a>
                <a href="/shipping" className="hover:text-white">Shipping & Returns</a>
                <a href="/privacy" className="hover:text-white">Privacy Policy</a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs tracking-[0.2em]">CONTACT</h3>
              <div className="mt-5 flex flex-col gap-3 text-sm text-gray-500">
                <p>hello@veloura.com</p>
                <p>+94 11 234 5678</p>
                <p>Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-14 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 text-xs text-gray-600 sm:flex-row">
            <p>© 2026 VELOURA. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white">INSTAGRAM</a>
              <a href="#" className="hover:text-white">FACEBOOK</a>
              <a href="#" className="hover:text-white">PINTEREST</a>
            </div>
          </div>

        </div>

      </footer>

  );
};

