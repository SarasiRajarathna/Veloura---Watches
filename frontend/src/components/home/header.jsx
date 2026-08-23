import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="relative z-50 flex h-20 w-full items-center justify-between border-b border-white/10 bg-[#080808] px-6 lg:px-10">

      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src="/logo.png"
          alt="Veloura Logo"
          className="h-[60px] w-auto"
        />
      </Link>

      {/* Navigation */}
      <div className="hidden lg:flex items-center gap-10">
        <Link
          to="/"
          className="text-amber-400 text-md font-semibold"
        >
          Home
        </Link>

        <Link
          to="/about-us"
          className="text-amber-400 text-md font-semibold"
        >
          About Us
        </Link>

        <Link
          to="/contact-us"
          className="text-amber-400 text-md font-semibold"
        >
          Contact Us
        </Link>
      </div>

      {/* Login / Sign Up */}
      <div className="flex items-center gap-5">
        <Link
          to="/login"
          className="text-amber-400 text-md font-semibold"
        >
          Login
        </Link>

        <Link
          to="/sign-up"
          className="text-amber-400 text-md font-semibold"
        >
          Sign Up
        </Link>
      </div>

    </header>
  );
}