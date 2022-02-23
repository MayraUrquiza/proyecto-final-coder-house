import { db } from "../../db/connection";
import logger from "../utils/logger";

class FirebaseContainer {
  constructor(collection) {
    this.collection = collection;
  }

  async save(entry) {
    try {
      const result = await db(this.collection).add(entry);
      return result._path.segments[1]
    } catch (error) {
      logger.error("ERROR:", error);
    }
  }

  async update(id, entry) {
    try {
      const doc = db(this.collection).doc(id);
      await doc.update(entry);
      return {...entry, id};
    } catch (error) {
      logger.error("ERROR:", error);
    }
  }

  async getById(id) {
    try {
      const doc = db(this.collection).doc(id);
      const item = await doc.get();

      return {...item.data(), id};
    } catch (error) {
      logger.error("ERROR:", error);
    }
  }

  async getAll() {
    try {
      const snapshot = await db(this.collection).get();
      const response = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return response;
    } catch (error) {
      return [];
    }
  }

  async deleteById(id) {
    try {
      const doc = db(this.collection).doc(id);
      await doc.delete();
    } catch (error) {
      logger.error("ERROR:", error);
    }
  }
}

export default FirebaseContainer;
