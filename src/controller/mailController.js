import {
  ADMIN_EMAIL,
  NODEMAILER_AUTH_PASS,
  NODEMAILER_AUTH_USER,
  NODEMAILER_HOST,
  NODEMAILER_PORT,
} from "../config";
import nodemailer from "nodemailer";

class MailController {
  static sendMail = async (to, subject, content, attachmentPaths = []) => {
    const transporter = nodemailer.createTransport({
      host: NODEMAILER_HOST,
      port: NODEMAILER_PORT,
      auth: {
        user: NODEMAILER_AUTH_USER,
        pass: NODEMAILER_AUTH_PASS,
      },
    });

    const options = {
      from: "ecommerce_coderhouse",
      to,
      subject,
      html: content,
      attachments: attachmentPaths.map((path) => ({ path })),
    };

    try {
      await transporter.sendMail(options);
    } catch (error) {
      console.log(error);
    }
  };

  static sendNewUserMail = async (user) => {
    await this.sendMail(
      ADMIN_EMAIL,
      "Nuevo registro",
      `<h1>Nuevo usuario registrado</h1><p>Nombre: ${user.name}</p><p>Edad: ${user.age}</p><p>Email: ${user.email}</p><p>Teléfono: ${user.phone}</p><p>Dirección: ${user.address}</p>`,
      [`./public/uploads/${user.image}`]
    );
  };

  static sendPurchaseMail = async (user, products, total) => {
    const productsList = products.map(
      (product) => `<p>${product.name} $${product.price}</p>`
    );

    await this.sendMail(
      ADMIN_EMAIL,
      `Nuevo pedido de ${user.name} (${user.email})`,
      `<h1>Detalle del pedido:</h1>${productsList.join(
        ""
      )}<h4>Total $${total}</h4>`
    );
  };
}

export default MailController;
