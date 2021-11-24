import MongoDBContainer from "../persistence/MongoDBContainer";
import ProductSchema from "../schemas/product";

class ProductsMongoDBDAO extends MongoDBContainer {
  constructor() {
    super("productos", ProductSchema);
  }
}

export default ProductsMongoDBDAO;
