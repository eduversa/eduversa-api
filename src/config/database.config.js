const mongoose = require("mongoose");
class Database {
  uri = null;
  name = null;
  connection = null;

  constructor() {
    this.name = process.env.DB_NAME;
    this.uri = process.env.MONGODB_URI.replace("{{DB_NAME}}", this.name);
    console.log("Database Name: " + this.name);
    console.log("Creating New Database...");
  }

  async connect() {
    try {
      const response = await mongoose.connect(this.uri);
      if (!response) {
        throw new Error("Database connection failed");
      }
      console.log("Connected to MongoDB Atlas Successfully");
      this.connection = response;
      return this;
    } catch (error) {
      console.log("Error - Database - Connect");
      console.log(error);
    }
  }

  getConnection() {
    if (this.connection) {
      return this.connection.connection;
    } else {
      return false;
    }
  }

  static format = async () => {
    try {
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();

      for (const collection of collections) {
        const modelName = collection.name;
        const Model = mongoose.model(modelName);

        await Model.deleteMany({});
        console.log(`Deleted all documents in collection: ${modelName}`);
      }

      console.log("All collections cleared.");
    } catch (error) {
      console.error("Error clearing collections:", error);
    }
  };
}
module.exports = Database;
