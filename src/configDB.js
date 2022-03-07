import {
  USE_DATABASE,
  MONGO_TIMEOUT,
  MONGO_ATLAS_DATABASE_URI,
  FIRESTORE_DATABASE_URI,
  FIRESTORE_TYPE,
  FIRESTORE_PROJECT_ID,
  FIRESTORE_PRIVATE_KEY_ID,
  FIRESTORE_PRIVATE_KEY,
  FIRESTORE_CLIENT_EMAIL,
  FIRESTORE_CLIENT_ID,
  FIRESTORE_AUTH_URI,
  FIRESTORE_TOKEN_URI,
  FIRESTORE_AUTH_PROVIDER_X509_CERT_URL,
  FIRESTORE_CLIENT_X509_URL,
} from "./config";

export default {
  availablePersistence: ["mongoDB", "firestore", "filesystem"],
  useDatabase: USE_DATABASE,
  mongoDB: {
    connectionString: MONGO_ATLAS_DATABASE_URI,
    options: {
      serverSelectionTimeoutMS: MONGO_TIMEOUT,
    },
  },
  firestore: {
    connectionString: FIRESTORE_DATABASE_URI,
    serviceAccount: {
      type: FIRESTORE_TYPE,
      project_id: FIRESTORE_PROJECT_ID,
      private_key_id: FIRESTORE_PRIVATE_KEY_ID,
      private_key: FIRESTORE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: FIRESTORE_CLIENT_EMAIL,
      client_id: FIRESTORE_CLIENT_ID,
      auth_uri: FIRESTORE_AUTH_URI,
      token_uri: FIRESTORE_TOKEN_URI,
      auth_provider_x509_cert_url: FIRESTORE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: FIRESTORE_CLIENT_X509_URL,
    },
  },
};
