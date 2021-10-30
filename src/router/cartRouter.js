import { Router } from "express";
import CartController from "../api/cartController";

const routerCarts = Router();
const cartController = new CartController();

routerCarts.get("/:id/productos", cartController.getProducts);
routerCarts.post("/", cartController.saveCart);
routerCarts.post("/:id/productos", cartController.saveProduct);
routerCarts.delete("/:id", cartController.deleteCart);
routerCarts.delete("/:id/productos/:id_prod", cartController.deleteProduct);

export default routerCarts;
