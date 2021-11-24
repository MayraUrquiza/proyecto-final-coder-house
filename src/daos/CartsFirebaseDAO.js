import FirebaseContainer from "../persistence/FirebaseContainer";

class CartsFirebaseDAO extends FirebaseContainer {
  constructor() {
    super("carritos");
  }

  async deleteProduct(idProduct, cart) {
    const updatedCart = {
      ...cart,
      products: [...cart.products.filter((prod) => prod.id !== idProduct)],
    };
    await this.update(cart.id, updatedCart);
    return updatedCart;
  }
}

export default CartsFirebaseDAO;
