import * as fs from "fs";
import { join } from "path";
import logger from "../utils/logger";

const FILE_PATH = "data/";

class FileContainer {
  constructor(name) {
    this.name = join(process.cwd(), FILE_PATH.concat(name));
  }

  persist(array = []) {
    const fileContent = JSON.stringify(array, null, 2);
    return fs.promises.writeFile(this.name, fileContent);
  }

  async save(entry) {
    try {
      const content = await this.getAll();
      const id = content.length ? content[content.length - 1].id + 1 : 1;
      content.push({ ...entry, id });
      await this.persist(content);
      return id;
    } catch (error) {
      logger.error("ERROR:", error);
    }
  }

  async update(id, entry) {
    try {
      const content = await this.getAll();
      content.push({id: parseInt(id), ...entry});
      await this.persist(content);
      return {id: parseInt(id), ...entry};
    } catch (error) {
      logger.error("ERROR:", error);
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      return content.find((entry) => entry.id === parseInt(id));
    } catch (error) {
      logger.error("ERROR:", error);
    }
  }

  async getAll() {
    try {
      const fileContent = await fs.promises.readFile(this.name);
      return JSON.parse(fileContent);
    } catch (error) {
      return [];
    }
  }

  async deleteById(id) {
    try {
      const content = await this.getAll();
      const filteredContent = content.filter((entry) => entry.id !== parseInt(id));
      await this.persist(filteredContent);
    } catch (error) {
      logger.error("ERROR:", error);
    }
  }
}

export default FileContainer;
