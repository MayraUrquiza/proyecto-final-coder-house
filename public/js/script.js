const formulario_login = document.querySelector(".formulario__login");
const formulario_register = document.querySelector(".formulario__register");
const contenedor_login_register = document.querySelector(
  ".contenedor__login-register"
);
const caja_trasera_login = document.querySelector(".caja__trasera-login");
const caja_trasera_register = document.querySelector(".caja__trasera-register");

const login = () => {
  formulario_login.style.display = "block";
  contenedor_login_register.style.left = "10px";
  formulario_register.style.display = "none";
  caja_trasera_register.style.opacity = "1";
  caja_trasera_login.style.opacity = "0";
};

const register = () => {
  formulario_register.style.display = "block";
  contenedor_login_register.style.left = "410px";
  formulario_login.style.display = "none";
  caja_trasera_register.style.opacity = "0";
  caja_trasera_login.style.opacity = "1";
};
