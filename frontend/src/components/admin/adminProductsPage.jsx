import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import LoadingAnimation from "../../components/loadingAnimation";
import ProductDeleteModal from "../../components/productDeleteModal";


export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [isProductsAreLoaded, setIsProductsAreLoaded] = useState(false);

    useEffect(
        () => {
            if (!isProductsAreLoaded) {
                const token = localStorage.getItem("token");

                axios.get(import.meta.env.VITE_API_URL + "/products", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then(
                    (response) => {
                        setProducts(response.data);
                        setIsProductsAreLoaded(true);
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                );
            }
        },
        [isProductsAreLoaded]
    );

    return (
        <div className="w-full min-h-full bg-[#0d0d0d] p-8 lg:p-10">

            {/* Page heading */}
            <div className="mb-8 border-b border-white/8 pb-6 flex items-end justify-between">
                <div>
                    <p className="mb-1.5 text-[10px] tracking-[0.3em] text-[#c9a96e]">STORE</p>
                    <h1 className="font-serif text-3xl text-white">Products</h1>
                    <p className="mt-2 text-xs text-gray-500">
                        Manage your store inventory with ease.
                    </p>
                </div>
                <Link
                    to="/admin/add-product"
                    className="flex items-center gap-2 border border-[#c9a96e]/30 bg-[#c9a96e]/8 px-4 py-2.5 text-[11px] tracking-[0.15em] text-[#c9a96e] transition-all duration-200 hover:bg-[#c9a96e]/15 hover:border-[#c9a96e]/50"
                >
                    <FaPlus size={11} />
                    ADD PRODUCT
                </Link>
            </div>

            {/* Subtle gold rule */}
            <div className="mb-6 h-px w-full bg-gradient-to-r from-[#c9a96e]/20 via-[#c9a96e]/5 to-transparent" />

            {/* Content */}
            {
                isProductsAreLoaded ? (
                    <div className="w-full overflow-x-auto border border-white/8 bg-[#0b0b0b]">
                        <table className="w-full min-w-[1100px] text-xs text-gray-400">

                            {/* Head */}
                            <thead>
                                <tr className="border-b border-white/8 bg-white/3">
                                    <th className="px-5 py-4 text-left font-medium tracking-[0.18em] text-[9px] text-gray-600 uppercase">Image</th>
                                    <th className="px-5 py-4 text-left font-medium tracking-[0.18em] text-[9px] text-gray-600 uppercase">Product ID</th>
                                    <th className="px-5 py-4 text-left font-medium tracking-[0.18em] text-[9px] text-gray-600 uppercase">Name</th>
                                    <th className="px-5 py-4 text-left font-medium tracking-[0.18em] text-[9px] text-gray-600 uppercase">Price</th>
                                    <th className="px-5 py-4 text-left font-medium tracking-[0.18em] text-[9px] text-gray-600 uppercase">Labelled Price</th>
                                    <th className="px-5 py-4 text-left font-medium tracking-[0.18em] text-[9px] text-gray-600 uppercase">Brand</th>
                                    <th className="px-5 py-4 text-left font-medium tracking-[0.18em] text-[9px] text-gray-600 uppercase">Model</th>
                                    <th className="px-5 py-4 text-left font-medium tracking-[0.18em] text-[9px] text-gray-600 uppercase">Category</th>
                                    <th className="px-5 py-4 text-left font-medium tracking-[0.18em] text-[9px] text-gray-600 uppercase">Availability</th>
                                    <th className="px-5 py-4 text-left font-medium tracking-[0.18em] text-[9px] text-gray-600 uppercase">Stock</th>
                                    <th className="px-5 py-4 text-left font-medium tracking-[0.18em] text-[9px] text-gray-600 uppercase">Actions</th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {
                                    products.map((item) => (
                                        <tr
                                            key={item.productId}
                                            className="border-b border-white/5 transition-colors duration-150 hover:bg-white/3"
                                        >
                                            {/* Image */}
                                            <td className="px-5 py-4">
                                                <div className="h-14 w-14 border border-white/10 bg-white/3 overflow-hidden">
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </td>

                                            {/* Product ID */}
                                            <td className="px-5 py-4">
                                                <span className="inline-block border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono text-gray-500">
                                                    {item.productId}
                                                </span>
                                            </td>

                                            {/* Name */}
                                            <td className="px-5 py-4">
                                                <span className="text-xs font-medium text-white">{item.name}</span>
                                            </td>

                                            {/* Price */}
                                            <td className="px-5 py-4">
                                                <span className="text-xs font-semibold text-[#c9a96e]">
                                                    Rs. {item.price}
                                                </span>
                                            </td>

                                            {/* Labelled Price */}
                                            <td className="px-5 py-4 text-gray-600 line-through text-[11px]">
                                                Rs. {item.labelledPrice}
                                            </td>

                                            {/* Brand */}
                                            <td className="px-5 py-4 text-gray-400">{item.brand || "—"}</td>

                                            {/* Model */}
                                            <td className="px-5 py-4 text-gray-500">{item.model || "—"}</td>

                                            {/* Category */}
                                            <td className="px-5 py-4">
                                                <span className="inline-block border border-[#c9a96e]/20 bg-[#c9a96e]/8 px-2.5 py-1 text-[10px] tracking-[0.1em] text-[#c9a96e]">
                                                    {item.category}
                                                </span>
                                            </td>

                                            {/* Availability */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-block px-2.5 py-1 text-[10px] tracking-[0.1em] border ${
                                                        item.isAvailable
                                                            ? "border-emerald-500/20 bg-emerald-500/8 text-emerald-400"
                                                            : "border-red-500/20 bg-red-500/8 text-red-400"
                                                    }`}
                                                >
                                                    {item.isAvailable ? "Available" : "Unavailable"}
                                                </span>
                                            </td>

                                            {/* Stock */}
                                            <td className="px-5 py-4">
                                                <span className="text-xs font-semibold text-white">{item.stock}</span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <ProductDeleteModal
                                                        product={item}
                                                        refresh={() => {
                                                            setIsProductsAreLoaded(false);
                                                        }}
                                                    />
                                                    <Link
                                                        to="/admin/edit-product"
                                                        state={item}
                                                        className="flex h-8 w-8 items-center justify-center border border-white/10 bg-white/3 text-gray-400 transition-all duration-200 hover:border-[#c9a96e]/30 hover:bg-[#c9a96e]/8 hover:text-[#c9a96e]"
                                                    >
                                                        <BiEdit className="text-base" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <LoadingAnimation />
                )
            }
        </div>
    );
}