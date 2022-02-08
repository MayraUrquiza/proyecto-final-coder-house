import MongoDBContainer from "../persistence/MongoDBContainer";
import CartSchema from "../models/cart";

class CartsMongoDBDAO extends MongoDBContainer {
  constructor() {
    super("carritos", CartSchema);
  }

  async deleteProduct(idProduct, cart) {
    const updatedCart = {
      ...cart,
      products: [...cart.products.filter((prod) => prod._id !== idProduct)],
    };
    await this.update(cart._id, updatedCart);
    return updatedCart;
  }
}

export default CartsMongoDBDAO;
