import express from "express";
import routerProducts from "./router/productRouter";
import routerCarts from "./router/cartRouter";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCarts);

const server = app.listen(PORT, () =>
  console.log(`Listen on ${server.address().port}`)
);
server.on("error", (error) => console.log(`Error en el servidor ${error}`));
