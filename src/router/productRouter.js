import { Router } from "express";
import AuthController from "../api/authController";
import ProductController from "../api/productController";

const routerProducts = Router();
const authController = new AuthController();
const productController = new ProductController();

routerProducts.get("/", productController.getProduct);
routerProducts.get("/:id", productController.getProductById);
routerProducts.post("/", authController.authenticate, productController.saveProduct);
routerProducts.put("/:id", authController.authenticate, productController.updateProduct);
routerProducts.delete("/:id", authController.authenticate, productController.deleteProduct);

export default routerProducts;
