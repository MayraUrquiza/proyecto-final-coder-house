import { Router } from "express";
import AuthController from "../controller/authController";
import ProductController from "../controller/productController";

const routerProducts = Router();
const authController = new AuthController();
const productController = new ProductController();

routerProducts.get("/", productController.getProduct);
routerProducts.get("/:id", productController.getProductById);
routerProducts.post("/", authController.authenticate, productController.saveProduct);
routerProducts.put("/:id", authController.authenticate, productController.updateProduct);
routerProducts.delete("/:id", authController.authenticate, productController.deleteProduct);

export default routerProducts;
