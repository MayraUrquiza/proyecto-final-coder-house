import { Router } from "express";

const routerErrors = Router();

routerErrors.get("/login", (req, res) => {
  res.render("error", {
    message: "Credenciales inválidas. Vuelve a intentarlo",
    redirect: "/usuarios/autenticacion",
  });
});

routerErrors.get("/register", (req, res) => {
  res.render("error", {
    message: "Ya existe un usuario con el email ingresado",
    redirect: "/usuarios/autenticacion",
  });
});

export default routerErrors;
