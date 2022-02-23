import { Router } from "express";

const routerUsers = Router();

routerUsers.get("/autenticacion", (req, res) => {
  res.render("authentication", {});
});

routerUsers.get("/perfil", (req, res) => {
  if (!req.user) res.redirect("/usuarios/autenticacion");
  else res.render("profile", { user: req.user.toObject() });
});

export default routerUsers;
