import { Router } from "express";
import db from "../daos/DAO";

const routerCatalog = Router();
const productsCollection = db("productos");
const cartsCollection = db("carritos");

routerCatalog.get("/", async (req, res) => {
  if (!res.user) res.redirect("/usuarios/autenticacion");
  else res.redirect("/catalogo");
});

routerCatalog.get("/catalogo", async (req, res) => {
  const products = await productsCollection.getAll();
  res.render("catalog", { products });
});

routerCatalog.get("/carrito", async (req, res) => {
  const carts = await cartsCollection.getAll({ user: req.user.id });
  const products = [];

  carts.forEach((element) => {
    products.push(...element.products);
  });

  const total = products.length
    ? Math.trunc(
        products
          .map((prod) => prod.price)
          .reduce((prev, current) => prev + current) * 100
      ) / 100
    : 0;

  res.render("cart", { carts, total });
});

export default routerCatalog;
