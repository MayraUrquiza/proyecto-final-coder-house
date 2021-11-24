import db from "../daos/DAO";

class ProductController {
  constructor() {
    this.collection = db('productos');
  }

  getProduct = async (req, res) => {
    try {
      const products = await this.collection.getAll();
      res.status(200).json({ products })
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      
      const product = await this.collection.getById(id);

      if (!product) res.status(400).json({ error: "Producto no encontrado." });
      else res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  saveProduct = async (req, res) => {
    try {
      const { name, description, code, price, thumbnail, stock } = req.body;
      const product = {
        name,
        description,
        code,
        price: parseInt(price),
        thumbnail,
        stock,
        timestamp: Date.now(),
      };

      const id = await this.collection.save(product);
      res
        .status(200)
        .json({ msg: "El producto fue creado.", product: { ...product, id } });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { name, description, code, price, thumbnail, stock } = req.body;
      const { id } = req.params;
      const product = {
        name,
        description,
        code,
        price: parseInt(price),
        thumbnail,
        stock,
        timestamp: Date.now(),
      };

      const result = await this.collection.update(id, product);

      res.status(200).json({ msg: "El producto fue actualizado.", product: result });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;

      await this.collection.deleteById(id);

      res.status(200).json({ msg: "El producto fue eliminado." });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

export default ProductController;
