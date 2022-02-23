const form_login = document.querySelector(".form_login");
const form_register = document.querySelector(".form_register");
const login_register_container = document.querySelector(
  ".login_register_container"
);
const back_box_login = document.querySelector(".back_box_login");
const back_box_register = document.querySelector(".back_box_register");

const login = () => {
  form_login.style.display = "block";
  login_register_container.style.left = "10px";
  form_register.style.display = "none";
  back_box_register.style.opacity = "1";
  back_box_login.style.opacity = "0";
};

const register = () => {
  form_register.style.display = "block";
  login_register_container.style.left = "410px";
  form_login.style.display = "none";
  back_box_register.style.opacity = "0";
  back_box_login.style.opacity = "1";
};

const addProduct = async (product) => {
  const body = {
    productId: product.id,
  };

  const res = await fetch("/api/carrito/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      admin: true,
    },
    body: JSON.stringify(body),
  });

  if (res.status === 200) alert("Producto agregado al carrito!");
};

const deleteCart = async (cart) => {
  const res = await fetch(`/api/carrito/${cart.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      admin: true,
    },
  });
  if (res.status === 200) window.location.reload();
};

const purchase = async (products, total) => {
  const body = {
    products,
    total,
  };

  const res = await fetch("api/carrito/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      admin: true,
    },
    body: JSON.stringify(body),
  });

  if (res.status === 200) alert("Email enviado al administrador!");
  else alert("Hubo un error al enviar el email al administrador");
};
