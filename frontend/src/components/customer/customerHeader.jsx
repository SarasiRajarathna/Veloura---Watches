import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, ChevronDown } from 'lucide-react'

export default function CustomerHeader() {
  return (
    <header className="relative z-50 flex h-20 w-full shrink-0 items-center justify-between border-b border-white/10 bg-[#080808] px-6 lg:px-10">

      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src="/logo.png"
          alt="Veloura Logo"
          className="h-[52px] w-auto"
        />
      </Link>

      {/* Centre — Search */}
      <div className="relative hidden max-w-sm flex-1 mx-10 lg:flex">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search products..."
          className="h-10 w-full rounded-none border border-white/10 bg-white/5 pl-10 pr-4 text-xs text-white placeholder:text-gray-600 outline-none transition focus:border-[#c9a96e]/50 focus:bg-white/8"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-5">

        {/* Notification bell */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-[#c9a96e]/40 hover:text-[#c9a96e]">
          <Bell size={16} strokeWidth={1.5} />
          {/* Indicator */}
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#c9a96e]" />
        </button>

        {/* Divider */}
        <div className="hidden h-5 w-px bg-white/10 sm:block" />

        {/* Customer profile pill */}
        <button className="flex items-center gap-3 rounded-none border border-white/10 px-3 py-2 text-left transition hover:border-[#c9a96e]/30 hover:bg-white/5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9a96e] font-serif text-xs font-semibold text-black">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-white leading-none">Customer</p>
            <p className="mt-0.5 text-[10px] text-gray-500 leading-none tracking-wide">User</p>
          </div>
          <ChevronDown size={12} className="hidden text-gray-500 sm:block" />
        </button>

      </div>
    </header>
  );
}