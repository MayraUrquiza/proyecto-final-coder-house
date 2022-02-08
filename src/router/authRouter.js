import { Router } from "express";
import { getPassport } from "../utils/passport";

const passport = getPassport();
const routerAuth = Router();

routerAuth.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/loginerror" }),
  (req, res) => {
    res.redirect("/");
  }
);

routerAuth.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/registererror" }),
  (req, res) => {
    res.redirect("/usuarios/autenticacion");
  }
);

export default routerAuth;
