import express from "express";
import routerProducts from "./router/productRouter";
import routerCarts from "./router/cartRouter";
import connectDatabase from "../db/connection";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase();

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCarts);

app.use((req, res) => {
  const { method, originalUrl } = req;

  res.status(400).json({
    error: -2,
    description: `Ruta ${originalUrl} método ${method} no implementada.`,
  });
});

const server = app.listen(PORT, () =>
  console.log(`Listen on ${server.address().port}`)
);
server.on("error", (error) => console.log(`Error en el servidor ${error}`));
