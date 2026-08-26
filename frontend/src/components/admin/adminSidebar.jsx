import React, { useState } from "react";
import { NavLink, useMatch, Link } from "react-router-dom";
import {
  LayoutDashboard, Package, Tags, Boxes, FolderOpen, ShoppingCart,
  Users, Star, Home, Tag, Image, ShieldCheck, Settings, Activity,
  LogOut, ChevronDown, Menu, X,
} from "lucide-react";

/* ─── Individual nav item ────────────────────────────────────────── */
function SidebarNavItem({ item, onClose }) {
  const isActive = useMatch(
    item.path === "/admin" ? "/admin" : `${item.path}/*`
  );
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={item.path === "/admin"}
      onClick={onClose}
      className={`group relative flex items-center gap-3 rounded-none px-3 py-2.5 text-xs transition-all duration-200 tracking-wide ${
        isActive
          ? "bg-[#c9a96e]/8 text-[#c9a96e]"
          : "text-gray-500 hover:bg-white/4 hover:text-gray-200"
      }`}
    >
      {/* Gold left-bar indicator */}
      <span
        className={`absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 bg-[#c9a96e] transition-opacity duration-200 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      <Icon
        size={15}
        strokeWidth={1.5}
        className="shrink-0"
      />

      <span className="leading-none">{item.name}</span>
    </NavLink>
  );
}

/* ─── Main sidebar ───────────────────────────────────────────────── */
export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuSections = [
    {
      title: null,
      items: [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
      ],
    },
    {
      title: "STORE",
      items: [
        { name: "Products",   path: "/admin/products",   icon: Package },
        { name: "Categories", path: "/admin/categories", icon: Tags },
        { name: "Inventory",  path: "/admin/inventory",  icon: Boxes },
      ],
    },
    {
      title: "SALES",
      items: [
        { name: "Orders",  path: "/admin/orders",  icon: ShoppingCart },
        { name: "Reviews", path: "/admin/reviews", icon: Star },
      ],
    },
    {
      title: "CONTENT",
      items: [
        { name: "Promotions", path: "/admin/promotions", icon: Tag },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { name: "Admin Users",    path: "/admin/users",          icon: ShieldCheck },
        { name: "Settings",       path: "/admin/settings",       icon: Settings },
        { name: "Activity Logs",  path: "/admin/activity-logs",  icon: Activity },
      ],
    },
  ];

  const handleLogout = () => {
    console.log("Admin logged out");
  };

  return (
    <>
      {/* ── Mobile hamburger ─────────────────────────────────────── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-5 z-40 flex h-9 w-9 items-center justify-center border border-white/10 bg-[#0b0b0b] text-gray-400 transition hover:text-white lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* ── Mobile overlay ───────────────────────────────────────── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ── Sidebar panel ────────────────────────────────────────── */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[240px] flex-col border-r border-white/8 bg-[#0b0b0b] text-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header — logo + close on mobile */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/8 px-5">
          <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="Veloura" className="h-[44px] w-auto" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-7 w-7 items-center justify-center text-gray-600 transition hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Gold accent rule */}
        <div className="mx-5 mt-0 h-px bg-gradient-to-r from-[#c9a96e]/40 via-[#c9a96e]/10 to-transparent" />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin">
          {menuSections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-6">
              {section.title && (
                <p className="mb-2 px-3 text-[9px] font-medium tracking-[0.25em] text-gray-700">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <SidebarNavItem
                    key={item.name}
                    item={item}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="shrink-0 border-t border-white/8 p-4">

          {/* Admin profile card */}
          <div className="mb-3 flex items-center gap-3 border border-white/8 bg-white/3 px-3 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#c9a96e] font-serif text-xs font-semibold text-black">
              A
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-white leading-none">Admin</p>
              <p className="mt-1 truncate text-[10px] text-gray-600 leading-none tracking-wide">
                Administrator
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-xs text-gray-600 transition hover:bg-red-500/8 hover:text-red-400"
          >
            <LogOut size={15} strokeWidth={1.5} />
            <span className="tracking-wide">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
