import { Router } from "express";
import multer from "multer";
import AuthController from "../controller/authController";
import { getPassport } from "../utils/passport";

const passport = getPassport();
const routerAuth = Router();
const authController = new AuthController();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

routerAuth.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/error/login" }),
  (req, res) => {
    res.redirect("/catalogo");
  }
);

routerAuth.post(
  "/register",
  upload.single("image"),
  passport.authenticate("register", { failureRedirect: "/error/register" }),
  (req, res) => {
    res.redirect("/usuarios/autenticacion");
  }
);

routerAuth.post("/logout", authController.logout);

export default routerAuth;
