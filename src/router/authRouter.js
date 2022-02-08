import { Router } from "express";
import { getPassport } from "../utils/passport";

const passport = getPassport();
const routerAuth = Router();

routerAuth.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/loginerror" }),
  (req, res) => {
    console.log(req.body);
    res.redirect("/");
  }
);

routerAuth.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/registererror" }),
  (req, res) => {
    console.log(req.body);
    res.redirect("/usuarios/autenticacion");
  }
);

export default routerAuth;
