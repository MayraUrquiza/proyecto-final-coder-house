import { Router } from "express";

const routerUsers = Router();

routerUsers.get("/autenticacion", (req, res) => {
  res.render("authentication", {});
});

export default routerUsers;
