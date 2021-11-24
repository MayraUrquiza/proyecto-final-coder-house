import mongoose from "mongoose";
import admin from "firebase-admin";
import configData from "./config.json";

export const db = (collection) => {
  return admin.firestore().collection(collection);
};

const connectFirestore = () => {
  const { firestore: serviceAccount } = configData;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://coderhouse-ecommerce-42899.firebaseio.com",
  });
  console.log("Base de datos firestore conectada");
};

const connectMongoDB = () => {
  const { connectionString, options } = configData.mongoDB;

  mongoose.connect(connectionString, options);
  console.log("Base de datos mongoDB conectada");
};

const connectDatabase = () => {
  const { useDatabase } = configData;

  switch (useDatabase) {
    case "firestore":
      connectFirestore();
      break;
    case "mongoDB":
      connectMongoDB();
      break;
    default:
      break;
  }
};

export default connectDatabase;
