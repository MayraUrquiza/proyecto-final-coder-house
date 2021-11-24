import FileContainer from "../persistence/FileContainer";

class CartsFileSystemDAO extends FileContainer {
  constructor() {
    super("carritos.txt");
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

export default CartsFileSystemDAO;
