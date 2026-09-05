import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Watch, ImagePlus, Tag, Layers, BarChart2,
  ChevronRight, Save, X, Hash, AlignLeft,
  DollarSign, Package, CheckCircle
} from "lucide-react";

/* ─── Field wrapper ─────────────────────────────────────── */
function Field({ label, icon: Icon, hint, children, span = "1" }) {
  const colClass = {
    "1": "col-span-12 md:col-span-6 xl:col-span-3",
    "2": "col-span-12 md:col-span-6",
    "3": "col-span-12 md:col-span-9",
    "4": "col-span-12",
  }[span];

  return (
    <div className={colClass}>
      <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] text-gray-500 uppercase">
        {Icon && <Icon size={11} className="text-[#c9a96e]" />}
        {label}
      </label>
      {children}
      {hint && (
        <p className="mt-1 text-[10px] text-gray-700 italic">{hint}</p>
      )}
    </div>
  );
}

/* ─── Input ─────────────────────────────────────────────── */
const inputCls =
  "w-full border border-white/10 bg-white/4 px-3 py-2.5 text-xs text-white placeholder:text-gray-700 outline-none transition " +
  "focus:border-[#c9a96e]/50 focus:bg-white/6 focus:ring-0";

const selectCls = inputCls + " appearance-none cursor-pointer";

/* ─── Section card ──────────────────────────────────────── */
function Section({ title, label, children }) {
  return (
    <div className="border border-white/8 bg-white/[0.02]">
      <div className="flex items-center gap-3 border-b border-white/8 px-5 py-3">
        <span className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/30 to-transparent" />
        <p className="text-[9px] font-medium tracking-[0.3em] text-[#c9a96e] uppercase">
          {label}
        </p>
        <span className="h-px flex-1 bg-gradient-to-l from-[#c9a96e]/30 to-transparent" />
      </div>
      <p className="px-5 pt-4 pb-1 text-xs font-medium text-white">{title}</p>
      <div className="grid grid-cols-12 gap-4 p-5">{children}</div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function AdminAddProductsPage() {
  const [productId, setProductId]         = useState("");
  const [name, setName]                   = useState("");
  const [altNames, setAltNames]           = useState("");
  const [price, setPrice]                 = useState("");
  const [labelledPrice, setLabelledPrice] = useState("");
  const [description, setDescription]     = useState("");
  const [images, setImages]               = useState([]);
  const [brand, setBrand]                 = useState("");
  const [model, setModel]                 = useState("");
  const [category, setCategory]           = useState("");
  const [isAvailable, setIsAvailable]     = useState(true);
  const [stock, setStock]                 = useState("");
  const [isSaving, setIsSaving]           = useState(false);
  const navigate = useNavigate();

  async function handleSave() {
    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to perform this action.");
        window.location.href = "/login";
        return;
      }

      const productData = {
        productId,
        name,
        altNames: altNames.split(",").map((s) => s.trim()).filter(Boolean),
        price: parseFloat(price),
        labelledPrice: parseFloat(labelledPrice),
        description,
        images: [],
        brand,
        model,
        category,
        isAvailable,
        stock: parseInt(stock, 10),
      };

      await axios.post(
        import.meta.env.VITE_API_URL + "/products",
        productData,
        { headers: { Authorization: "Bearer " + token } }
      );

      toast.success("Watch listed successfully!");
      navigate("/admin/products");
    } catch (error) {
      setIsSaving(false);
      console.error("Error adding product:", error);
      toast.error(
        error?.response?.data?.message || "Failed to add product. Please try again."
      );
    }
  }

  function handleCancel() {
    navigate("/admin/products");
  }

  return (
    <div className="min-h-full bg-[#0d0d0d] p-6 lg:p-10">

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-white/8 pb-8">
        <div>
          {/* Breadcrumb */}
          <div className="mb-3 flex items-center gap-1.5 text-[10px] tracking-widest text-gray-600 uppercase">
            <span>Store</span>
            <ChevronRight size={10} />
            <span>Products</span>
            <ChevronRight size={10} />
            <span className="text-[#c9a96e]">Add New</span>
          </div>
          <p className="mb-1 text-[10px] tracking-[0.3em] text-[#c9a96e] uppercase">New Listing</p>
          <h1 className="font-serif text-3xl text-white">Add Timepiece</h1>
          <p className="mt-2 text-xs text-gray-500 max-w-md">
            Complete all required fields to publish a new watch to the Veloura collection.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 border border-white/10 px-5 py-2.5 text-xs text-gray-400 tracking-wide transition hover:border-white/20 hover:text-white"
          >
            <X size={13} />
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 border border-[#c9a96e]/40 bg-[#c9a96e]/8 px-6 py-2.5 text-xs text-[#c9a96e] tracking-wide transition hover:border-[#c9a96e]/70 hover:bg-[#c9a96e]/15 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={13} />
            {isSaving ? "Publishing…" : "Publish Watch"}
          </button>
        </div>
      </div>

      {/* ── Gold accent rule ─────────────────────────────────── */}
      <div className="mb-8 h-px w-24 bg-gradient-to-r from-[#c9a96e]/50 to-transparent" />

      <div className="flex flex-col gap-6">

        {/* ── IDENTIFICATION ─────────────────────────────────── */}
        <Section label="01 — Identification" title="Product Reference & Naming">
          <Field label="Product ID" icon={Hash} span="1">
            <input
              type="text"
              className={inputCls}
              placeholder="e.g. VEL-001"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </Field>
          <Field label="Watch Name" icon={Watch} span="3">
            <input
              type="text"
              className={inputCls}
              placeholder="e.g. Veloura Midnight Tourbillon"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field
            label="Alternative Names"
            icon={Tag}
            span="4"
            hint="Comma-separated search aliases, e.g. Midnight, Tourbillon Edition"
          >
            <input
              type="text"
              className={inputCls}
              placeholder="Midnight, Tourbillon Edition, ..."
              value={altNames}
              onChange={(e) => setAltNames(e.target.value)}
            />
          </Field>
        </Section>

        {/* ── CLASSIFICATION ─────────────────────────────────── */}
        <Section label="02 — Classification" title="Brand, Model & Category">
          <Field label="Brand" icon={Layers} span="1">
            <div className="relative">
              <select
                className={selectCls}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="" disabled>Select brand</option>
                <option value="Rolex">Rolex</option>
                <option value="Patek Philippe">Patek Philippe</option>
                <option value="Audemars Piguet">Audemars Piguet</option>
                <option value="Richard Mille">Richard Mille</option>
                <option value="A. Lange & Söhne">A. Lange &amp; Söhne</option>
                <option value="Jaeger-LeCoultre">Jaeger-LeCoultre</option>
                <option value="Vacheron Constantin">Vacheron Constantin</option>
                <option value="IWC">IWC Schaffhausen</option>
                <option value="Cartier">Cartier</option>
                <option value="Omega">Omega</option>
                <option value="Breitling">Breitling</option>
                <option value="TAG Heuer">TAG Heuer</option>
                <option value="Hublot">Hublot</option>
                <option value="Panerai">Panerai</option>
                <option value="Longines">Longines</option>
                <option value="Tudor">Tudor</option>
                <option value="Seiko">Seiko</option>
                <option value="Grand Seiko">Grand Seiko</option>
                <option value="Veloura">Veloura</option>
                <option value="Other">Other</option>
              </select>
              <ChevronRight size={11} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-600" />
            </div>
          </Field>
          <Field label="Model / Reference" icon={Watch} span="1">
            <input
              type="text"
              className={inputCls}
              placeholder="e.g. Submariner 124060"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </Field>
          <Field label="Category" icon={Layers} span="2">
            <div className="relative">
              <select
                className={selectCls}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Select category</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
                <option value="Dress">Dress</option>
                <option value="Diver">Diver</option>
                <option value="Pilot / Aviation">Pilot / Aviation</option>
                <option value="Chronograph">Chronograph</option>
                <option value="Tourbillon">Tourbillon</option>
                <option value="Skeleton">Skeleton</option>
                <option value="Vintage">Vintage</option>
                <option value="Smart / Connected">Smart / Connected</option>
                <option value="Limited Edition">Limited Edition</option>
              </select>
              <ChevronRight size={11} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-600" />
            </div>
          </Field>
        </Section>

        {/* ── PRICING & STOCK ─────────────────────────────────── */}
        <Section label="03 — Pricing & Inventory" title="Retail Pricing and Stock Levels">
          <Field label="Retail Price (USD)" icon={DollarSign} span="1">
            <input
              type="number"
              min="0"
              className={inputCls}
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Field>
          <Field label="Original / MSRP Price (USD)" icon={DollarSign} span="1"
            hint="Used for strike-through display">
            <input
              type="number"
              min="0"
              className={inputCls}
              placeholder="0.00"
              value={labelledPrice}
              onChange={(e) => setLabelledPrice(e.target.value)}
            />
          </Field>
          <Field label="Stock Quantity" icon={Package} span="1">
            <input
              type="number"
              min="0"
              className={inputCls}
              placeholder="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Field>
          <Field label="Availability" icon={CheckCircle} span="1">
            <div className="relative">
              <select
                className={selectCls}
                value={isAvailable}
                onChange={(e) => setIsAvailable(e.target.value === "true")}
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
              <ChevronRight size={11} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-600" />
            </div>
          </Field>
        </Section>

        {/* ── DESCRIPTION ─────────────────────────────────────── */}
        <Section label="04 — Description" title="Product Story & Details">
          <Field label="Full Description" icon={AlignLeft} span="4">
            <textarea
              rows={6}
              className={inputCls + " resize-none leading-relaxed"}
              placeholder="Describe the watch's heritage, complications, materials, and what makes it exceptional…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
        </Section>

        {/* ── MEDIA ───────────────────────────────────────────── */}
        <Section label="05 — Media" title="Product Images">
          <Field
            label="Upload Images"
            icon={ImagePlus}
            span="4"
            hint="Select multiple high-resolution images. First image will be used as the primary listing photo."
          >
            <label
              className="group flex cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-white/10 bg-white/2 px-6 py-10 text-center transition hover:border-[#c9a96e]/40 hover:bg-white/4"
            >
              <ImagePlus size={28} strokeWidth={1} className="text-gray-700 transition group-hover:text-[#c9a96e]/70" />
              <div>
                <p className="text-xs text-gray-400">
                  Drag &amp; drop images here, or{" "}
                  <span className="text-[#c9a96e]">browse files</span>
                </p>
                <p className="mt-1 text-[10px] text-gray-700">
                  JPG, PNG, WEBP — recommended 1200 × 1200 px
                </p>
              </div>
              {images.length > 0 && (
                <p className="text-[11px] text-[#c9a96e]">
                  {images.length} file{images.length > 1 ? "s" : ""} selected
                </p>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                onChange={(e) => setImages(e.target.files)}
              />
            </label>
          </Field>
        </Section>

      </div>

      {/* ── Bottom action bar ───────────────────────────────── */}
      <div className="mt-10 flex items-center justify-between border-t border-white/8 pt-8">
        <p className="text-[10px] text-gray-700 tracking-wide">
          All fields marked with an asterisk are required before publishing.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 border border-white/10 px-5 py-2.5 text-xs text-gray-400 tracking-wide transition hover:border-white/20 hover:text-white"
          >
            <X size={13} />
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 border border-[#c9a96e]/40 bg-[#c9a96e]/8 px-8 py-2.5 text-xs text-[#c9a96e] tracking-widest uppercase transition hover:border-[#c9a96e]/70 hover:bg-[#c9a96e]/15 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={13} />
            {isSaving ? "Publishing…" : "Publish Watch"}
          </button>
        </div>
      </div>

    </div>
  );
}
