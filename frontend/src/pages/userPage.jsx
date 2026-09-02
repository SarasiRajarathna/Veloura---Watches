import CustomerHeader from '../components/customer/customerHeader'
import CustomerSidebar from '../components/customer/customerSidebar'
import { Route, Routes } from "react-router-dom"

/* ─── Placeholder page components ────────────────────────────────── */
function CustomerDashboard() {
  const stats = [
    { label: "My Orders",       value: "—", sub: "All time" },
    { label: "Wishlist Items",  value: "—", sub: "Saved products" },
    { label: "Pending Orders",  value: "—", sub: "Awaiting delivery" },
    { label: "Loyalty Points",  value: "—", sub: "Redeemable balance" },
  ]

  return (
    <div className="p-8 lg:p-10">

      {/* Page heading */}
      <div className="mb-8 border-b border-white/8 pb-6">
        <p className="mb-1.5 text-[10px] tracking-[0.3em] text-[#c9a96e]">OVERVIEW</p>
        <h1 className="font-serif text-3xl text-white">My Dashboard</h1>
        <p className="mt-2 text-xs text-gray-500">
          Welcome back. Here is a summary of your account.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group border border-white/8 bg-white/3 p-6 transition duration-200 hover:border-[#c9a96e]/20 hover:bg-white/5"
          >
            <p className="text-[9px] font-medium tracking-[0.25em] text-gray-600 uppercase">
              {stat.label}
            </p>
            <p className="mt-3 font-serif text-3xl text-white">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[10px] text-gray-600">{stat.sub}</p>
            <div className="mt-4 h-px w-8 bg-[#c9a96e]/40 transition-all duration-300 group-hover:w-14" />
          </div>
        ))}
      </div>

      {/* Placeholder activity area */}
      <div className="mt-8 border border-white/8 bg-white/3 p-6">
        <p className="mb-4 text-[9px] font-medium tracking-[0.25em] text-gray-600 uppercase">
          Recent Activity
        </p>
        <p className="text-xs text-gray-600 italic">
          No data to display yet.
        </p>
      </div>

    </div>
  )
}

function CustomerOrdersPage() {
  return <h1>My Orders</h1>
}

function CustomerWishlistPage() {
  return <h1>My Wishlist</h1>
}

function CustomerProfilePage() {
  return <h1>My Profile</h1>
}

function CustomerSettingsPage() {
  return <h1>Settings</h1>
}

export default function CustomerPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#0b0b0b]">

      {/* Fixed top header */}
      <CustomerHeader />

      {/* Body: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar — single instance; handles desktop fixed column + mobile overlay internally */}
        <CustomerSidebar />

        {/* Desktop spacer — reserves the sidebar column so main content doesn't underlap */}
        <div className="hidden w-[240px] shrink-0 lg:block" />

        {/* Main scroll area */}
        <main className="flex-1 overflow-y-auto bg-[#0d0d0d]">

          {/* Subtle top gold rule */}
          <div className="h-px w-full bg-gradient-to-r from-[#c9a96e]/20 via-[#c9a96e]/5 to-transparent" />

          <Routes>
            <Route path="/"             element={<CustomerDashboard />} />
            <Route path="/my-orders"    element={<CustomerOrdersPage />} />
            <Route path="/whishlist"    element={<CustomerWishlistPage />} />
            <Route path="/profile"      element={<CustomerProfilePage />} />
            <Route path="/settings"     element={<CustomerSettingsPage />} />
            <Route path="/membership"   element={
              <div className="p-8 lg:p-10">
                <div className="mb-8 border-b border-white/8 pb-6">
                  <p className="mb-1.5 text-[10px] tracking-[0.3em] text-[#c9a96e]">LOYALTY</p>
                  <h1 className="font-serif text-3xl text-white">Membership</h1>
                </div>
                <div className="border border-white/8 bg-white/3 p-6">
                  <p className="text-xs text-gray-600 italic">Membership info will appear here once connected.</p>
                </div>
              </div>
            } />
            <Route path="/help"         element={
              <div className="p-8 lg:p-10">
                <div className="mb-8 border-b border-white/8 pb-6">
                  <p className="mb-1.5 text-[10px] tracking-[0.3em] text-[#c9a96e]">SUPPORT</p>
                  <h1 className="font-serif text-3xl text-white">Help Center</h1>
                </div>
                <div className="border border-white/8 bg-white/3 p-6">
                  <p className="text-xs text-gray-600 italic">Help articles will appear here once connected.</p>
                </div>
              </div>
            } />
          </Routes>
        </main>

      </div>
    </div>
  )
}