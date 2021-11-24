import FileContainer from "../persistence/FileContainer";

class ProductsFileSystemDAO extends FileContainer {
  constructor() {
    super("productos.txt");
  }
}

export default ProductsFileSystemDAO;
