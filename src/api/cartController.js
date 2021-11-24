import db from "../daos/DAO";

class CartController {
  constructor() {
    this.productsCollection = db('productos');
    this.cartsCollection = db('carritos');
  }

  getCarts = async (req, res) => {
    try {
      const carts = await this.cartsCollection.getAll();
      res.status(200).json({ carts })
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  getProducts = async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await this.cartsCollection.getById(id);

      if (!cart) res.status(400).json({ error: "Carrito no encontrado." });
      else res.status(200).json({ products: cart.products });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  updateProduct = async (req, res) => {
    const { productId } = req.body;

    const product = await this.productsCollection.getById(productId);

    if (!product)
      throw new Error("Producto no encontrado.");

    if (!product.stock)
      throw new Error("Producto sin stock.");

    const updatedProduct = { ...product, stock: product.stock - 1 };

    return await this.productsCollection.update(productId, updatedProduct);
  };

  saveCart = async (req, res) => {
    try {
      const product = await this.updateProduct(req, res);

      const cart = {
        products: [product],
        timestamp: Date.now(),
      };

      const result = await this.cartsCollection.save(cart);

      res
        .status(200)
        .json({ msg: "El carrito fue creado.", cart: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  saveProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await this.cartsCollection.getById(id);

      if (!cart)
        return res.status(400).json({ error: "Carrito no encontrado." });

      const product = await this.updateProduct(req, res);

      const updatedCart = { ...cart, products: [...cart.products, product] };

      const result = await this.cartsCollection.update(id, updatedCart);

      res.status(200).json({ msg: "El carrito fue actualizado.", cart: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const { id } = req.params;

      await this.cartsCollection.deleteById(id);

      res.status(200).json({ msg: "El carrito fue eliminado." });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id, id_prod } = req.params;

      const cart = await this.cartsCollection.getById(id);

      if (!cart) res.status(400).json({ error: "Carrito no encontrado." });

      const result = await this.cartsCollection.deleteProduct(id_prod, cart);

      res.status(200).json({ msg: "El producto fue eliminado del carrito.", cart: result });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

export default CartController;
