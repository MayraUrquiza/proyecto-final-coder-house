import { Router } from "express";
import AuthController from "../controller/authController";
import { getPassport } from "../utils/passport";

const passport = getPassport();
const routerAuth = Router();
const authController = new AuthController();

routerAuth.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/loginerror" }),
  (req, res) => {
    res.redirect("/catalogo");
  }
);

routerAuth.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/registererror" }),
  (req, res) => {
    res.redirect("/usuarios/autenticacion");
  }
);

routerAuth.post("/logout", authController.logout);

export default routerAuth;
