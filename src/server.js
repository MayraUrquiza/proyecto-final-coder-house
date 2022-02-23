import express from "express";
import handlebars from "express-handlebars";
import routerProducts from "./router/productRouter";
import routerCarts from "./router/cartRouter";
import connectDatabase from "../db/connection";
import routerUsers from "./router/userRouter";
import routerAuth from "./router/authRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import { initializePassport } from "./utils/passport";
import routerCatalog from "./router/catalogRouter";
import { PORT, MONGO_ATLAS_DATABASE_URI, MODE } from "./config";
import cluster from "cluster";
import * as os from "os";
import routerErrors from "./router/errorRouter";

const app = express();

app.use(
  session({
    store: MongoStore.create({ mongoUrl: MONGO_ATLAS_DATABASE_URI }),
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
    helpers: {
      json: function (context) {
        return JSON.stringify(context);
      },
    },
  })
);
app.set("view engine", "hbs");

connectDatabase();

app.use("/", routerCatalog);
app.use("/usuarios", routerUsers);
app.use("/api/auth", routerAuth);
app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCarts);
app.use("/error", routerErrors);

app.use((req, res) => {
  const { method, originalUrl } = req;

  res.status(400).json({
    error: -2,
    description: `Ruta ${originalUrl} método ${method} no implementada.`,
  });
});

if (MODE === "CLUSTER" && cluster.isPrimary) {
  const CPUs = os.cpus().length;

  for (let i = 0; i < CPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  const server = app.listen(PORT, () =>
    console.log(`Listen on ${server.address().port}`)
  );
  server.on("error", (error) => console.log(`Error en el servidor ${error}`));
}
