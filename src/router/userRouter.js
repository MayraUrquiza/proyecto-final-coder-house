import { Router } from "express";

const routerUsers = Router();

routerUsers.get("/autenticacion", (req, res) => {
  res.render("login", {});
});

export default routerUsers;
