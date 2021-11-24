import FirebaseContainer from "../persistence/FirebaseContainer";

class ProductsFirebaseDAO extends FirebaseContainer {
  constructor() {
    super("productos");
  }
}

export default ProductsFirebaseDAO;
