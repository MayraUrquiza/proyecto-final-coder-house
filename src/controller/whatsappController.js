import twilio from "twilio";
import {
  ADMIN_WHATSAPP_NUMBER,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_NUMBER,
} from "../config";
import logger from "../utils/logger";

class WhatsAppController {
  static sendMessage = async (content, to) => {
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    const options = {
      body: content,
      from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
    };

    try {
      await client.messages.create(options);
    } catch (error) {
      logger.error(error);
    }
  };

  static sendPurchaseMessage = async (user, products, total) => {
    const productsList = products.map(
      (product) => `${product.name} $${product.price}\n`
    );

    await this.sendMessage(
      `*Nuevo pedido de ${user.name} (${
        user.email
      })*\n\n*Detalle del pedido:*\n${productsList.join(
        ""
      )}\n*Total $${total}*`,
      ADMIN_WHATSAPP_NUMBER
    );
  };
}

export default WhatsAppController;
