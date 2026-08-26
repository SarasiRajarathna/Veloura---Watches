import AdminHeader from '../components/admin/adminHeader'
import AdminSidebar from '../components/admin/adminSidebar'
import { Route, Routes } from "react-router-dom"

/* ─── Placeholder page components ────────────────────────────────── */
function AdminDashboard() {
  const stats = [
    { label: "Total Products",   value: "—", sub: "Across all categories" },
    { label: "Total Orders",     value: "—", sub: "All time" },
    { label: "Total Customers",  value: "—", sub: "Registered accounts" },
    { label: "Pending Orders",   value: "—", sub: "Awaiting fulfilment" },
  ]

  return (
    <div className="p-8 lg:p-10">

      {/* Page heading */}
      <div className="mb-8 border-b border-white/8 pb-6">
        <p className="mb-1.5 text-[10px] tracking-[0.3em] text-[#c9a96e]">OVERVIEW</p>
        <h1 className="font-serif text-3xl text-white">Dashboard</h1>
        <p className="mt-2 text-xs text-gray-500">
          Welcome back, Administrator. Here is a summary of your store.
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
          No data to display yet. Connect your API to populate this section.
        </p>
      </div>

    </div>
  )
}

function AdminOrdersPage() {
  return <h1>Orders Dashboard</h1>
}

function AdminProductsPage() {
  return <h1>Products Dashboard</h1>
}

function AdminAddProductPage() {
  return <h1>Add Product</h1>
}

function AdminEditProductPage() {
  return <h1>Edit Product</h1>
}

export default function AdminPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#0b0b0b]">

      {/* Fixed top header */}
      <AdminHeader />

      {/* Body: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar — single instance; handles desktop fixed column + mobile overlay internally */}
        <AdminSidebar />

        {/* Desktop spacer — reserves the sidebar column so main content doesn't underlap */}
        <div className="hidden w-[240px] shrink-0 lg:block" />

        {/* Main scroll area */}
        <main className="flex-1 overflow-y-auto bg-[#0d0d0d]">

          {/* Subtle top gold rule */}
          <div className="h-px w-full bg-gradient-to-r from-[#c9a96e]/20 via-[#c9a96e]/5 to-transparent" />

          <Routes>
            <Route path="/"             element={<AdminDashboard />} />
            <Route path="/orders"       element={<AdminOrdersPage />} />
            <Route path="/products"     element={<AdminProductsPage />} />
            <Route path="/add-product"  element={<AdminAddProductPage />} />
            <Route path="/edit-product" element={<AdminEditProductPage />} />
            <Route path="/users"        element={
              <div className="p-8 lg:p-10">
                <div className="mb-8 border-b border-white/8 pb-6">
                  <p className="mb-1.5 text-[10px] tracking-[0.3em] text-[#c9a96e]">SYSTEM</p>
                  <h1 className="font-serif text-3xl text-white">Admin Users</h1>
                </div>
                <div className="border border-white/8 bg-white/3 p-6">
                  <p className="text-xs text-gray-600 italic">Users will appear here once connected.</p>
                </div>
              </div>
            } />
            <Route path="/reviews"      element={
              <div className="p-8 lg:p-10">
                <div className="mb-8 border-b border-white/8 pb-6">
                  <p className="mb-1.5 text-[10px] tracking-[0.3em] text-[#c9a96e]">SALES</p>
                  <h1 className="font-serif text-3xl text-white">Reviews</h1>
                </div>
                <div className="border border-white/8 bg-white/3 p-6">
                  <p className="text-xs text-gray-600 italic">Reviews will appear here once connected.</p>
                </div>
              </div>
            } />
          </Routes>
        </main>

      </div>
    </div>
  )
}
