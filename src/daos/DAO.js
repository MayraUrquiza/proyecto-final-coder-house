import CartsMongoDBDAO from "./CartsMongoDBDAO";
import ProductsMongoDBDAO from "./ProductsMongoDBDAO";
import CartsFirebaseDAO from "./CartsFirebaseDAO";
import ProductsFirebaseDAO from "./ProductsFirebaseDAO";
import ProductsFileSystemDAO from "./ProductsFileSystemDAO";
import CartsFileSystemDAO from "./CartsFileSystemDAO";
import configData from "../../db/config.json";

const getDAOFirestore = (collection) => {
  switch (collection) {
    case "productos":
      return new ProductsFirebaseDAO();
    case "carritos":
      return new CartsFirebaseDAO();
    default:
      break;
  }
};

const getDAOMongoDB = (collection) => {
  switch (collection) {
    case "productos":
      return new ProductsMongoDBDAO();
    case "carritos":
      return new CartsMongoDBDAO();
    default:
      break;
  }
};

const getDAOFileSystem = (collection) => {
  switch (collection) {
    case "productos":
      return new ProductsFileSystemDAO();
    case "carritos":
      return new CartsFileSystemDAO();
    default:
      break;
  }
};

const db = (collection) => {
  const { useDatabase } = configData;

  switch (useDatabase) {
    case "firestore":
      return getDAOFirestore(collection);
    case "mongoDB":
      return getDAOMongoDB(collection);
    case "filesystem":
      return getDAOFileSystem(collection);
    default:
      break;
  }
};

export default db;
