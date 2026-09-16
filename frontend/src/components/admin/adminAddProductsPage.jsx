import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Watch, ImagePlus, Tag, Layers,
  ChevronRight, Save, X, Hash, AlignLeft,
  DollarSign, Package, CheckCircle2, AlertCircle,
  ArrowLeft, Sparkles, Trash2, Compass,
  ShieldCheck, RotateCcw, Plus, Check
} from "lucide-react";

/* ─── Luxury Watch Presets for 1-Click Testing / Demo ─────────────── */
const SAMPLE_PRESETS = [
  {
    name: "Audemars Piguet Royal Oak Chronograph",
    brand: "Audemars Piguet",
    model: "26240ST.OO.1320ST.01",
    category: "Chronograph",
    price: 1850000,
    labelledPrice: 2150000,
    stock: 3,
    description: "An iconic luxury chronograph featuring the Grande Tapisserie dial pattern in midnight blue, integrated stainless steel bracelet, and Manufacture Calibre 4401 with flyback complication.",
    altNames: "Royal Oak, AP Chrono, Blue Tapisserie",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop"
    ],
    movement: "Automatic Calibre 4401",
    caseDiameter: "41mm",
    caseMaterial: "Stainless Steel",
    waterResistance: "50m"
  },
  {
    name: "Patek Philippe Nautilus Self-Winding",
    brand: "Patek Philippe",
    model: "5711/1A-010",
    category: "Luxury",
    price: 3200000,
    labelledPrice: 3500000,
    stock: 2,
    description: "With the rounded octagonal shape of its bezel, the ingenious porthole construction of its case, and its horizontally embossed dial, the Nautilus has epitomized the elegant sports watch since 1976.",
    altNames: "Nautilus, PP 5711, Blue Dial",
    images: [
      "https://images.unsplash.com/photo-1547996160-71dfa63582d8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop"
    ],
    movement: "Calibre 26-330 S C",
    caseDiameter: "40mm",
    caseMaterial: "Stainless Steel",
    waterResistance: "120m"
  },
  {
    name: "Rolex Submariner Date 'Kermit'",
    brand: "Rolex",
    model: "126610LV",
    category: "Diver",
    price: 1450000,
    labelledPrice: 1600000,
    stock: 5,
    description: "The benchmark among divers' watches, featuring an Cerachrom green ceramic bezel, black dial with Chromalight luminescent display, and Oystersteel case resistant to 300 meters.",
    altNames: "Submariner, Kermit, Green Bezel, Oyster Perpetual",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
    ],
    movement: "Rolex Calibre 3235",
    caseDiameter: "41mm",
    caseMaterial: "Oystersteel",
    waterResistance: "300m"
  }
];

const POPULAR_BRANDS = [
  "Rolex", "Patek Philippe", "Audemars Piguet", "Vacheron Constantin",
  "Richard Mille", "A. Lange & Söhne", "Jaeger-LeCoultre", "Cartier",
  "Omega", "Breitling", "IWC", "TAG Heuer", "Hublot", "Panerai",
  "Grand Seiko", "Tudor", "Veloura", "Other"
];

const CATEGORIES = [
  "Luxury", "Chronograph", "Tourbillon", "Diver",
  "Dress", "Skeleton", "Aviation / Pilot", "Limited Edition", "Vintage"
];

/* ─── Form Field Helper ─────────────────────────────────────────── */
function Field({ label, icon: Icon, hint, required, children, className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.22em] text-gray-400 uppercase">
        {Icon && <Icon size={12} className="text-[#c9a96e]" />}
        <span>{label}</span>
        {required && <span className="text-[#c9a96e]">*</span>}
      </label>
      {children}
      {hint && (
        <p className="mt-1.5 text-[10px] text-gray-500 italic">{hint}</p>
      )}
    </div>
  );
}

/* ─── Luxury Section Container ──────────────────────────────────── */
function Section({ number, label, title, children }) {
  return (
    <div className="relative overflow-hidden rounded-none border border-white/8 bg-[#090909]/80 backdrop-blur-md p-6 lg:p-7 transition-all duration-300 hover:border-white/12">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/8 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#c9a96e]/30 bg-[#c9a96e]/10 text-[10px] font-mono font-medium text-[#c9a96e]">
            {number}
          </span>
          <div>
            <p className="text-[9px] font-semibold tracking-[0.28em] text-[#c9a96e] uppercase">
              {label}
            </p>
            <h3 className="font-serif text-base text-white">{title}</h3>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─── ID Generator Utility (Outside component for purity) ────────── */
let idCounter = 1000;
function getNextTimepieceId(brand = "VEL") {
  idCounter += 1;
  const prefix = brand ? brand.substring(0, 3).toUpperCase() : "VEL";
  return `${prefix}-${idCounter}`;
}

export default function AdminAddProductsPage() {
  const navigate = useNavigate();

  // Core product form states
  const [productId, setProductId]         = useState("");
  const [name, setName]                   = useState("");
  const [altNames, setAltNames]           = useState("");
  const [price, setPrice]                 = useState("");
  const [labelledPrice, setLabelledPrice] = useState("");
  const [description, setDescription]     = useState("");
  const [brand, setBrand]                 = useState("");
  const [customBrand, setCustomBrand]     = useState("");
  const [model, setModel]                 = useState("");
  const [category, setCategory]           = useState("Luxury");
  const [isAvailable, setIsAvailable]     = useState(true);
  const [stock, setStock]                 = useState("1");

  // Specifications
  const [movement, setMovement]           = useState("Automatic");
  const [caseDiameter, setCaseDiameter]   = useState("41mm");
  const [caseMaterial, setCaseMaterial]   = useState("Stainless Steel");
  const [waterResistance, setWaterResistance] = useState("100m");

  // Imagery states
  const [images, setImages]               = useState([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isSaving, setIsSaving]           = useState(false);

  // Helper to generate a unique luxury Product ID
  function generateId() {
    const newId = getNextTimepieceId(brand || "VEL");
    setProductId(newId);
    toast.success(`Generated ID: ${newId}`);
  }

  // Helper to load sample preset for instant testing
  function handleLoadPreset(preset) {
    const newId = getNextTimepieceId(preset.brand);
    setProductId(newId);
    setName(preset.name);
    setBrand(preset.brand);
    setModel(preset.model);
    setCategory(preset.category);
    setPrice(preset.price.toString());
    setLabelledPrice(preset.labelledPrice.toString());
    setStock(preset.stock.toString());
    setDescription(preset.description);
    setAltNames(preset.altNames);
    setImages([...preset.images]);
    setMovement(preset.movement);
    setCaseDiameter(preset.caseDiameter);
    setCaseMaterial(preset.caseMaterial);
    setWaterResistance(preset.waterResistance);
    setIsAvailable(true);
    toast.success(`Loaded sample: ${preset.name}`);
  }

  // Handle image URL addition
  function handleAddImageUrl() {
    if (!imageUrlInput.trim()) return;
    const url = imageUrlInput.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("data:")) {
      toast.error("Please enter a valid image URL (http:// or https://)");
      return;
    }
    setImages((prev) => [...prev, url]);
    setImageUrlInput("");
    toast.success("Image URL attached!");
  }

  // Handle local image file upload (converts to Base64)
  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    toast.success(`Loaded ${files.length} image(s)!`);
    e.target.value = "";
  }

  // Remove an image from the list
  function handleRemoveImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  // Make an image the primary thumbnail (swap to index 0)
  function handleSetPrimaryImage(index) {
    setImages((prev) => {
      const copy = [...prev];
      const [chosen] = copy.splice(index, 1);
      return [chosen, ...copy];
    });
    toast.success("Set as primary display photo");
  }

  // Reset form
  function handleReset() {
    if (window.confirm("Are you sure you want to reset all fields?")) {
      setProductId("");
      setName("");
      setAltNames("");
      setPrice("");
      setLabelledPrice("");
      setDescription("");
      setBrand("");
      setCustomBrand("");
      setModel("");
      setCategory("Luxury");
      setIsAvailable(true);
      setStock("1");
      setImages([]);
      setImageUrlInput("");
      toast("Form cleared.", { icon: "🧹" });
    }
  }

  // Calculate discount percentage
  const numPrice = parseFloat(price) || 0;
  const numLabelled = parseFloat(labelledPrice) || 0;
  const discountPercent =
    numLabelled > numPrice && numPrice > 0
      ? Math.round(((numLabelled - numPrice) / numLabelled) * 100)
      : null;

  // Active brand value
  const finalBrand = brand === "Other" ? (customBrand.trim() || "Independent") : brand;

  // Save product to backend
  async function handleSave() {
    // Validation
    if (!productId.trim()) {
      toast.error("Please enter or generate a Product ID.");
      return;
    }
    if (!name.trim()) {
      toast.error("Please provide a name for this timepiece.");
      return;
    }
    if (!price || isNaN(numPrice) || numPrice <= 0) {
      toast.error("Please provide a valid selling price.");
      return;
    }
    if (!labelledPrice || isNaN(numLabelled) || numLabelled < numPrice) {
      toast.error("Labelled MSRP should be greater than or equal to selling price.");
      return;
    }
    if (!category) {
      toast.error("Please select a timepiece category.");
      return;
    }

    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in as administrator to publish watches.");
        navigate("/login");
        return;
      }

      // Default high quality luxury watch images if none provided
      const finalImages =
        images.length > 0
          ? images
          : [
              "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop"
            ];

      // Formulate detailed description with technical specs appended
      const enrichedDescription = description.trim()
        ? `${description.trim()}\n\n[Specifications: Movement: ${movement} | Case: ${caseDiameter}, ${caseMaterial} | Water Resistance: ${waterResistance}]`
        : `An exquisite luxury timepiece by ${finalBrand || "Veloura"}. Crafted with horological precision. [Specifications: Movement: ${movement} | Case: ${caseDiameter}, ${caseMaterial} | Water Resistance: ${waterResistance}]`;

      const productData = {
        productId: productId.trim(),
        name: name.trim(),
        altNames: altNames
          ? altNames.split(",").map((s) => s.trim()).filter(Boolean)
          : [finalBrand, model, category].filter(Boolean),
        price: numPrice,
        labelledPrice: numLabelled,
        description: enrichedDescription,
        images: finalImages,
        brand: finalBrand || "Veloura",
        model: model.trim() || "Signature Edition",
        category: category,
        isAvailable: isAvailable,
        stock: parseInt(stock, 10) || 1,
      };

      await axios.post(
        import.meta.env.VITE_API_URL + "/products",
        productData,
        { headers: { Authorization: "Bearer " + token } }
      );

      toast.success("Timepiece listed successfully in Veloura inventory!");
      navigate("/admin/products");
    } catch (error) {
      setIsSaving(false);
      console.error("Error creating timepiece:", error);
      toast.error(
        error?.response?.data?.message || "Failed to publish timepiece. Please try again."
      );
    }
  }

  return (
    <div className="min-h-full bg-[#0d0d0d] p-6 lg:p-10">

      {/* ── Top Header & Breadcrumbs ───────────────────────────────── */}
      <div className="mb-8 border-b border-white/8 pb-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] tracking-[0.25em] text-gray-500 uppercase">
              <Link to="/admin/products" className="transition hover:text-white">STORE</Link>
              <ChevronRight size={10} className="text-gray-600" />
              <Link to="/admin/products" className="transition hover:text-white">PRODUCTS</Link>
              <ChevronRight size={10} className="text-gray-600" />
              <span className="text-[#c9a96e]">CURATE TIMEPIECE</span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/admin/products"
                className="flex h-8 w-8 items-center justify-center border border-white/10 bg-white/3 text-gray-400 transition hover:border-[#c9a96e]/40 hover:bg-[#c9a96e]/10 hover:text-[#c9a96e]"
                title="Return to Products"
              >
                <ArrowLeft size={14} />
              </Link>
              <div>
                <h1 className="font-serif text-2xl lg:text-3xl font-normal text-white tracking-wide">
                  Publish New Timepiece
                </h1>
                <p className="mt-1 text-xs text-gray-400">
                  Register luxury watches into the Veloura boutique catalogue with rich horological details.
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 border border-white/10 bg-white/2 px-3.5 py-2 text-[11px] font-medium tracking-wider text-gray-400 uppercase transition hover:border-white/25 hover:text-white"
            >
              <RotateCcw size={12} />
              Reset
            </button>

            {/* Quick Demo Fill Dropdown / Button */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 border border-[#c9a96e]/30 bg-[#c9a96e]/8 px-3.5 py-2 text-[11px] font-medium tracking-wider text-[#c9a96e] uppercase transition hover:border-[#c9a96e]/60 hover:bg-[#c9a96e]/15"
              >
                <Sparkles size={12} />
                Sample Presets
              </button>
              <div className="absolute right-0 mt-1 hidden w-64 border border-white/10 bg-[#0c0c0c] p-2 shadow-2xl z-30 group-hover:block backdrop-blur-xl">
                <p className="mb-2 px-2 text-[9px] font-semibold tracking-widest text-gray-500 uppercase">
                  Load Luxury Demo
                </p>
                {SAMPLE_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => handleLoadPreset(p)}
                    className="flex w-full flex-col px-2.5 py-2 text-left text-xs transition hover:bg-[#c9a96e]/10 hover:text-[#c9a96e]"
                  >
                    <span className="font-medium text-white truncate">{p.name}</span>
                    <span className="text-[10px] text-gray-500 font-mono">Rs. {p.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 border border-[#c9a96e] bg-[#c9a96e] px-6 py-2 text-[11px] font-semibold tracking-[0.18em] text-black uppercase transition-all duration-200 hover:bg-[#e4c489] hover:shadow-[0_0_20px_rgba(201,169,110,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={13} />
              {isSaving ? "Publishing..." : "Publish Timepiece"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Layout (Form + Sticky Live Preview) ────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ── LEFT COLUMN: Comprehensive Form (7 cols on lg, 8 on xl) ── */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">

          {/* ── SECTION 01: Identification ───────────────────────── */}
          <Section number="01" label="Identification" title="Reference & Nomenclature">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Product ID with Generate helper */}
              <Field
                label="Product ID / SKU"
                icon={Hash}
                required
                hint="Unique identifier for inventory tracking"
                className="md:col-span-5"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value.toUpperCase())}
                    placeholder="e.g. VEL-4821"
                    className="flex-1 border border-white/10 bg-white/4 px-3.5 py-2.5 text-xs font-mono uppercase text-white placeholder:text-gray-600 outline-none transition focus:border-[#c9a96e]/60 focus:bg-white/6"
                  />
                  <button
                    type="button"
                    onClick={generateId}
                    title="Generate unique Product ID"
                    className="shrink-0 border border-[#c9a96e]/30 bg-[#c9a96e]/10 px-3 py-2.5 text-[10px] font-medium tracking-wider text-[#c9a96e] uppercase transition hover:bg-[#c9a96e]/20"
                  >
                    Auto
                  </button>
                </div>
              </Field>

              {/* Watch Name */}
              <Field
                label="Timepiece Name"
                icon={Watch}
                required
                hint="Full official name of the watch model"
                className="md:col-span-7"
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Oak Selfwinding Flying Tourbillon"
                  className="w-full border border-white/10 bg-white/4 px-3.5 py-2.5 text-xs text-white placeholder:text-gray-600 outline-none transition focus:border-[#c9a96e]/60 focus:bg-white/6"
                />
              </Field>

              {/* Alt Names / Search Tags */}
              <Field
                label="Search Keywords & Aliases"
                icon={Tag}
                hint="Comma-separated search tags for customer queries"
                className="md:col-span-12"
              >
                <input
                  type="text"
                  value={altNames}
                  onChange={(e) => setAltNames(e.target.value)}
                  placeholder="e.g. Royal Oak, Tourbillon, Rose Gold, Skeleton dial"
                  className="w-full border border-white/10 bg-white/4 px-3.5 py-2.5 text-xs text-white placeholder:text-gray-600 outline-none transition focus:border-[#c9a96e]/60 focus:bg-white/6"
                />
              </Field>
            </div>
          </Section>

          {/* ── SECTION 02: Horological Classification ──────────── */}
          <Section number="02" label="Horology" title="Manufacture, Model & Category">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Brand Selector */}
              <Field label="Maison / Brand" icon={Layers} required className="md:col-span-4">
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full border border-white/10 bg-[#0c0c0c] px-3.5 py-2.5 text-xs text-white outline-none transition focus:border-[#c9a96e]/60"
                >
                  <option value="" disabled>Select Maison</option>
                  {POPULAR_BRANDS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {brand === "Other" && (
                  <input
                    type="text"
                    value={customBrand}
                    onChange={(e) => setCustomBrand(e.target.value)}
                    placeholder="Enter custom brand name..."
                    className="mt-2 w-full border border-white/10 bg-white/4 px-3 py-2 text-xs text-white placeholder:text-gray-600 outline-none focus:border-[#c9a96e]/60"
                  />
                )}
              </Field>

              {/* Model Reference */}
              <Field label="Model Reference No." icon={Hash} className="md:col-span-4">
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. Ref. 26331ST.OO.1220ST.01"
                  className="w-full border border-white/10 bg-white/4 px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-gray-600 outline-none transition focus:border-[#c9a96e]/60 focus:bg-white/6"
                />
              </Field>

              {/* Category */}
              <Field label="Category" icon={Compass} required className="md:col-span-4">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-white/10 bg-[#0c0c0c] px-3.5 py-2.5 text-xs text-white outline-none transition focus:border-[#c9a96e]/60"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>

              {/* Quick Category Badges */}
              <div className="md:col-span-12 flex flex-wrap gap-1.5 pt-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-2.5 py-1 text-[10px] tracking-wider uppercase transition-all duration-150 border ${
                      category === cat
                        ? "border-[#c9a96e] bg-[#c9a96e]/15 text-[#c9a96e]"
                        : "border-white/5 bg-white/2 text-gray-500 hover:border-white/15 hover:text-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Section>

          {/* ── SECTION 03: Valuation & Inventory ───────────────── */}
          <Section number="03" label="Commercials" title="Valuation & Inventory Availability">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Selling Price */}
              <Field
                label="Boutique Selling Price (Rs.)"
                icon={DollarSign}
                required
                hint="Customer checkout price"
                className="md:col-span-4"
              >
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#c9a96e]">
                    Rs.
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    className="w-full border border-white/10 bg-white/4 pl-12 pr-3.5 py-2.5 text-xs font-mono text-white placeholder:text-gray-600 outline-none transition focus:border-[#c9a96e]/60 focus:bg-white/6"
                  />
                </div>
              </Field>

              {/* Labelled Price / MSRP */}
              <Field
                label="Official MSRP / Labelled Price (Rs.)"
                icon={DollarSign}
                required
                hint="Used for strike-through retail display"
                className="md:col-span-4"
              >
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
                    Rs.
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={labelledPrice}
                    onChange={(e) => setLabelledPrice(e.target.value)}
                    placeholder="0"
                    className="w-full border border-white/10 bg-white/4 pl-12 pr-3.5 py-2.5 text-xs font-mono text-white placeholder:text-gray-600 outline-none transition focus:border-[#c9a96e]/60 focus:bg-white/6"
                  />
                </div>
              </Field>

              {/* Discount / Valuation Badge */}
              <div className="md:col-span-4 flex flex-col justify-center">
                <label className="mb-2 text-[10px] font-semibold tracking-[0.22em] text-gray-400 uppercase">
                  Valuation Margin
                </label>
                <div className="flex h-[42px] items-center justify-between border border-white/10 bg-white/2 px-3.5">
                  <span className="text-[11px] text-gray-400">Client Advantage:</span>
                  {discountPercent && discountPercent > 0 ? (
                    <span className="inline-block border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                      {discountPercent}% OFF MSRP
                    </span>
                  ) : (
                    <span className="text-[11px] text-gray-600">Boutique Standard</span>
                  )}
                </div>
              </div>

              {/* Stock Quantity */}
              <Field
                label="Physical Stock Count"
                icon={Package}
                required
                hint="Available units in vault"
                className="md:col-span-6"
              >
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="1"
                  className="w-full border border-white/10 bg-white/4 px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-gray-600 outline-none transition focus:border-[#c9a96e]/60 focus:bg-white/6"
                />
              </Field>

              {/* Availability Switch */}
              <Field
                label="Catalog Visibility Status"
                icon={CheckCircle2}
                required
                hint="Display active timepiece to online clients"
                className="md:col-span-6"
              >
                <div className="flex h-[42px] items-center justify-between border border-white/10 bg-white/2 px-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isAvailable ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-red-400"
                      }`}
                    />
                    <span className="text-xs text-white">
                      {isAvailable ? "Available in Boutique" : "Reserved / Unavailable"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAvailable(!isAvailable)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      isAvailable ? "bg-[#c9a96e]" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-black shadow-lg ring-0 transition duration-200 ease-in-out ${
                        isAvailable ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </Field>
            </div>
          </Section>

          {/* ── SECTION 04: Visual Gallery & Media Assets ───────── */}
          <Section number="04" label="Imagery" title="Haute Horlogerie Gallery">
            <div className="space-y-4">
              
              {/* Add Image by URL input */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddImageUrl();
                      }
                    }}
                    placeholder="Paste external image link (https://...)"
                    className="w-full border border-white/10 bg-white/4 pl-3.5 pr-10 py-2.5 text-xs text-white placeholder:text-gray-600 outline-none transition focus:border-[#c9a96e]/60 focus:bg-white/6"
                  />
                  {imageUrlInput && (
                    <button
                      type="button"
                      onClick={() => setImageUrlInput("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="flex items-center justify-center gap-1.5 border border-[#c9a96e]/40 bg-[#c9a96e]/10 px-4 py-2.5 text-[11px] font-medium tracking-wider text-[#c9a96e] uppercase transition hover:bg-[#c9a96e]/20 shrink-0"
                >
                  <Plus size={13} />
                  Add URL
                </button>
              </div>

              {/* Local File Upload Dropzone */}
              <label className="group flex cursor-pointer flex-col items-center justify-center border border-dashed border-white/12 bg-white/[0.01] px-6 py-6 text-center transition-all hover:border-[#c9a96e]/40 hover:bg-[#c9a96e]/5">
                <ImagePlus size={24} className="text-gray-500 transition group-hover:text-[#c9a96e]" />
                <p className="mt-2 text-xs text-gray-300">
                  Select image files from device, or{" "}
                  <span className="text-[#c9a96e] underline underline-offset-4">browse files</span>
                </p>
                <p className="mt-1 text-[10px] text-gray-600">
                  Supports JPG, PNG, WEBP — crisp 1:1 square ratio recommended
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
              </label>

              {/* Image Thumbnails Gallery */}
              {images.length > 0 ? (
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                      Attached Photos ({images.length})
                    </p>
                    <p className="text-[10px] text-gray-600 italic">
                      First image serves as primary storefront photo
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {images.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className={`group relative aspect-square overflow-hidden border bg-black transition-all ${
                          idx === 0
                            ? "border-[#c9a96e] shadow-[0_0_12px_rgba(201,169,110,0.25)]"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <img
                          src={imgSrc}
                          alt={`Product view ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop";
                          }}
                        />

                        {/* Primary Badge */}
                        {idx === 0 && (
                          <span className="absolute left-1.5 top-1.5 border border-[#c9a96e] bg-black/90 px-1.5 py-0.5 text-[8px] font-semibold tracking-wider text-[#c9a96e] uppercase">
                            Primary
                          </span>
                        )}

                        {/* Overlay Controls on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(idx)}
                              title="Set as primary"
                              className="flex h-7 w-7 items-center justify-center border border-white/20 bg-black text-gray-300 transition hover:border-[#c9a96e] hover:text-[#c9a96e]"
                            >
                              <Check size={12} />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            title="Remove image"
                            className="flex h-7 w-7 items-center justify-center border border-red-500/40 bg-black text-red-400 transition hover:border-red-500 hover:bg-red-500/20"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="border border-white/5 bg-white/1 p-3 text-center">
                  <p className="text-[11px] text-gray-500 italic">
                    No custom photos attached yet. If left blank, elegant default luxury timepiece photography will be automatically provided.
                  </p>
                </div>
              )}
            </div>
          </Section>

          {/* ── SECTION 05: Specifications & Story ─────────────── */}
          <Section number="05" label="Craftsmanship" title="Specifications & Narrative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Movement */}
              <Field label="Movement Type" className="md:col-span-3">
                <input
                  type="text"
                  value={movement}
                  onChange={(e) => setMovement(e.target.value)}
                  placeholder="e.g. Automatic Calibre 4401"
                  className="w-full border border-white/10 bg-white/4 px-3 py-2 text-xs text-white placeholder:text-gray-600 outline-none focus:border-[#c9a96e]/60"
                />
              </Field>

              {/* Case Diameter */}
              <Field label="Case Diameter" className="md:col-span-3">
                <input
                  type="text"
                  value={caseDiameter}
                  onChange={(e) => setCaseDiameter(e.target.value)}
                  placeholder="e.g. 41mm"
                  className="w-full border border-white/10 bg-white/4 px-3 py-2 text-xs text-white placeholder:text-gray-600 outline-none focus:border-[#c9a96e]/60"
                />
              </Field>

              {/* Case Material */}
              <Field label="Case Material" className="md:col-span-3">
                <input
                  type="text"
                  value={caseMaterial}
                  onChange={(e) => setCaseMaterial(e.target.value)}
                  placeholder="e.g. 18K Rose Gold"
                  className="w-full border border-white/10 bg-white/4 px-3 py-2 text-xs text-white placeholder:text-gray-600 outline-none focus:border-[#c9a96e]/60"
                />
              </Field>

              {/* Water Resistance */}
              <Field label="Water Resistance" className="md:col-span-3">
                <input
                  type="text"
                  value={waterResistance}
                  onChange={(e) => setWaterResistance(e.target.value)}
                  placeholder="e.g. 100m / 10 ATM"
                  className="w-full border border-white/10 bg-white/4 px-3 py-2 text-xs text-white placeholder:text-gray-600 outline-none focus:border-[#c9a96e]/60"
                />
              </Field>

              {/* Full Description / Story */}
              <Field
                label="Horological Narrative & Provenance"
                icon={AlignLeft}
                hint="Describe the watch's complications, heritage, case finishing, and aesthetic."
                className="md:col-span-12"
              >
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Articulate the bespoke craftsmanship, dial textures, and legacy behind this exquisite timepiece…"
                  className="w-full border border-white/10 bg-white/4 p-3.5 text-xs leading-relaxed text-white placeholder:text-gray-600 outline-none transition focus:border-[#c9a96e]/60 focus:bg-white/6 resize-none"
                />
              </Field>
            </div>
          </Section>

          {/* Bottom Action Footer on Mobile & Tablet */}
          <div className="flex items-center justify-between border-t border-white/8 pt-6">
            <Link
              to="/admin/products"
              className="text-xs text-gray-500 hover:text-white transition"
            >
              Cancel &amp; Return to Inventory
            </Link>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 border border-[#c9a96e] bg-[#c9a96e] px-8 py-2.5 text-xs font-semibold tracking-[0.2em] text-black uppercase transition hover:bg-[#e4c489] disabled:opacity-50"
            >
              <Save size={14} />
              {isSaving ? "Publishing..." : "Publish Timepiece"}
            </button>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Sticky Real-time Luxury Preview (5 cols) ── */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-6 flex flex-col gap-4">

            {/* Preview Banner Header */}
            <div className="flex items-center justify-between border border-white/8 bg-[#0a0a0a] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c9a96e] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c9a96e]" />
                </span>
                <p className="text-[10px] font-semibold tracking-[0.25em] text-[#c9a96e] uppercase">
                  Client Live Preview
                </p>
              </div>
              <span className="text-[9px] font-mono text-gray-500 uppercase">
                {productId || "NO-ID"}
              </span>
            </div>

            {/* Luxury Timepiece Card Mockup */}
            <div className="group relative overflow-hidden border border-[#c9a96e]/30 bg-[#0a0a0a] shadow-[0_12px_40px_rgba(0,0,0,0.9)] transition-all duration-300">
              
              {/* Subtle gold accent top border */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />

              {/* Timepiece Image Showcase */}
              <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-[#161616] to-[#0a0a0a]">
                <img
                  src={
                    images.length > 0
                      ? images[0]
                      : "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={name || "Luxury Timepiece"}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop";
                  }}
                />

                {/* Top Overlay Badges */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  <span className="border border-[#c9a96e]/40 bg-black/80 px-2 py-0.5 text-[9px] font-medium tracking-widest text-[#c9a96e] uppercase backdrop-blur-md">
                    {category || "Timepiece"}
                  </span>
                  {discountPercent && discountPercent > 0 && (
                    <span className="border border-emerald-500/30 bg-black/80 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-emerald-400 backdrop-blur-md">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Availability Badge */}
                <span className="absolute right-3 top-3 border border-white/10 bg-black/80 px-2 py-0.5 text-[9px] font-mono tracking-wider text-gray-300 backdrop-blur-md">
                  {isAvailable ? "In Stock" : "Unavailable"}
                </span>

                {/* Multiple Images Indicator */}
                {images.length > 1 && (
                  <span className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/80 px-2 py-0.5 text-[9px] font-mono text-gray-400 backdrop-blur-md">
                    1 of {images.length} Photos
                  </span>
                )}
              </div>

              {/* Timepiece Card Information */}
              <div className="p-5 lg:p-6">
                
                {/* Brand & Reference */}
                <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#c9a96e]">
                  <span>{finalBrand || "Veloura Horlogerie"}</span>
                  <span className="font-mono text-gray-500">{model || "Reference"}</span>
                </div>

                {/* Watch Name */}
                <h4 className="mt-2 font-serif text-lg text-white line-clamp-2 leading-snug">
                  {name || "Untitled Timepiece"}
                </h4>

                {/* Technical Specs Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5 text-[9px] text-gray-400 font-mono">
                  <span className="border border-white/8 bg-white/3 px-2 py-0.5">
                    {movement}
                  </span>
                  <span className="border border-white/8 bg-white/3 px-2 py-0.5">
                    {caseDiameter}
                  </span>
                  <span className="border border-white/8 bg-white/3 px-2 py-0.5">
                    {caseMaterial}
                  </span>
                </div>

                {/* Pricing Display */}
                <div className="mt-4 border-t border-white/8 pt-4 flex items-baseline justify-between">
                  <div>
                    <p className="text-[9px] font-semibold tracking-widest text-gray-500 uppercase">
                      Boutique Price
                    </p>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-serif text-xl font-medium text-[#c9a96e]">
                        Rs. {numPrice > 0 ? numPrice.toLocaleString() : "—"}
                      </span>
                      {numLabelled > numPrice && (
                        <span className="text-xs text-gray-600 line-through">
                          Rs. {numLabelled.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[9px] font-semibold tracking-widest text-gray-500 uppercase">
                      Vault Inventory
                    </p>
                    <p className="mt-0.5 text-xs font-mono text-white">
                      {stock ? `${stock} unit${parseInt(stock) === 1 ? "" : "s"}` : "0 units"}
                    </p>
                  </div>
                </div>

                {/* Short narrative excerpt */}
                {description && (
                  <p className="mt-3 border-t border-white/5 pt-3 text-[11px] leading-relaxed text-gray-400 line-clamp-2 italic">
                    "{description}"
                  </p>
                )}

                {/* Certified Authenticity Footer */}
                <div className="mt-4 flex items-center justify-center gap-1.5 border border-white/6 bg-white/[0.02] py-2 text-[10px] tracking-wider text-gray-400 uppercase">
                  <ShieldCheck size={12} className="text-[#c9a96e]" />
                  <span>Veloura Horological Authenticity Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Quick Helper Note Card */}
            <div className="border border-white/8 bg-[#090909]/60 p-4 text-[11px] text-gray-500">
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-[#c9a96e] shrink-0 mt-0.5" />
                <p>
                  This live preview represents how clients view this timepiece in the Veloura boutique catalog. All adjustments in the form update instantaneously.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
