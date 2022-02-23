import mongoose from "mongoose";
import admin from "firebase-admin";
import configData from "../src/configDB";
import logger from "../src/utils/logger";

export const db = (collection) => {
  return admin.firestore().collection(collection);
};

const connectFirestore = () => {
  const { serviceAccount, connectionString } = configData.firestore;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: connectionString,
  });
  logger.info("Base de datos firestore conectada");
};

const connectMongoDB = () => {
  const { connectionString, options } = configData.mongoDB;

  mongoose.connect(connectionString, options);
  logger.info("Base de datos mongoDB conectada");
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
