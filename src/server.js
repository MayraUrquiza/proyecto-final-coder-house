import express from "express";
import handlebars from "express-handlebars";
import routerProducts from "./router/productRouter";
import routerCarts from "./router/cartRouter";
import connectDatabase from "../db/connection";
import routerUsers from "./router/userRouter";
import routerAuth from "./router/authRouter";
import dotenv from 'dotenv';
import session from "express-session";
import MongoStore from "connect-mongo";
import { initializePassport } from "./utils/passport";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(
  session({
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URI}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000000 * 60 },
  })
);

initializePassport(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: "index.hbs",
  })
);
app.set("view engine", "hbs");

connectDatabase();

app.get("/catalogo", (req, res) => {
  res.render("catalog", {});
});

app.use("/usuarios", routerUsers);
app.use("/api/auth", routerAuth);
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
