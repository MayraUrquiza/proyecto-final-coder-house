import container from "../persistence/Container";

class CartController {
  constructor() {
    this.cartContainer = container("carritos.txt");
    this.productContainer = container("productos.txt");
  }

  getProducts = async (req, res) => {
    try {
      const { id } = req.params;

      if (isNaN(parseInt(id)))
        return res
          .status(400)
          .json({ error: "El dato pasado como parámetro es incorrecto." });

      const cart = await this.cartContainer.getById(parseInt(id));

      if (!cart) res.status(400).json({ error: "Carrito no encontrado." });
      else res.status(200).json({ products: cart.products });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  updateProduct = async (req, res) => {
    const { productId } = req.body;

    if (isNaN(parseInt(productId)))
      throw new Error("El id de producto es incorrecto.");

    const product = await this.productContainer.getById(parseInt(productId));

    if (!product)
      throw new Error("Producto no encontrado.");

    if (!product.stock)
      throw new Error("Producto sin stock.");

    const updatedProduct = { ...product, stock: product.stock - 1 };

    await this.productContainer.deleteById(parseInt(productId));
    await this.productContainer.update(updatedProduct);

    return updatedProduct;
  };

  saveCart = async (req, res) => {
    try {
      const product = await this.updateProduct(req, res);

      const cart = {
        products: [product],
        timestamp: Date.now(),
      };

      const id = await this.cartContainer.save(cart);

      res
        .status(200)
        .json({ msg: "El carrito fue creado.", cart: { ...cart, id } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  saveProduct = async (req, res) => {
    try {
      const { id } = req.params;

      if (isNaN(parseInt(id)))
        return res
          .status(400)
          .json({ error: "El dato pasado como parámetro es incorrecto." });

      const cart = await this.cartContainer.getById(parseInt(id));

      if (!cart)
        return res.status(400).json({ error: "Carrito no encontrado." });

      const product = await this.updateProduct(req, res);

      const updatedCart = { ...cart, products: [...cart.products, product] };

      await this.cartContainer.deleteById(parseInt(id));
      await this.cartContainer.update(updatedCart);

      res.status(200).json({ msg: "El carrito fue actualizado.", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const { id } = req.params;

      await this.cartContainer.deleteById(parseInt(id));

      res.status(200).json({ msg: "El carrito fue eliminado." });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id, id_prod } = req.params;

      if (isNaN(parseInt(id)) || isNaN(parseInt(id_prod)))
        return res
          .status(400)
          .json({ error: "Los datos pasados como parámetro son incorrectos." });

      const cart = await this.cartContainer.getById(parseInt(id));

      if (!cart) res.status(400).json({ error: "Carrito no encontrado." });

      const updatedCart = { ...cart, products: [...cart.products.filter(prod => prod.id !== parseInt(id_prod))] };

      await this.cartContainer.deleteById(parseInt(id));
      await this.cartContainer.update(updatedCart);

      res.status(200).json({ msg: "El producto fue eliminado del carrito.", cart: updatedCart });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

export default CartController;
