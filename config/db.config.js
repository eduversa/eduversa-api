const mongoose = require("mongoose");

const db_name = process.env.DB_NAME;

const mongoURI = process.env.MONGODB_URI.replace("{{DB_NAME}}", db_name);

const connectToServer = async (app, port) => {
  try {
    const isDBConnected = await mongoose.connect(mongoURI);

    if (!isDBConnected) {
      console.log("Mongoose Connection Failed");
      return;
    }
    console.log("Connected to MongoDB Server. Database: " + db_name);
    app.listen(port, () => {
      console.log("Server is listening at port: " + port);
    });
  } catch (error) {
    console.log("Error in Mongoose Connection");
    console.log(error);
  }
};


const clearAllCollections = async () => {
    try {
      const collections = await mongoose.connection.db.listCollections().toArray();
  
      for (const collection of collections) {
        const modelName = collection.name;
        const Model = mongoose.model(modelName);
  
        await Model.deleteMany({});
        console.log(`Deleted all documents in collection: ${modelName}`);
      }
  
      console.log('All collections cleared.');
    } catch (error) {
      console.error('Error clearing collections:', error);
    } 
  };
  
  

module.exports = {connectToServer, clearAllCollections};
