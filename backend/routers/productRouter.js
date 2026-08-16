import express from "express";
import { getAllProducts,createProduct,deleteProduct,updateProduct,searchProducts,getProductById } from "../controllers/productControllers";

const productRouter = express.Router();

productRouter.get("/", getAllProducts)
productRouter.post("/", createProduct)
productRouter.get("/search/:query" ,searchProducts)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId", updateProduct)
productRouter.get("/:productId", getProductById)

export default productRouter;