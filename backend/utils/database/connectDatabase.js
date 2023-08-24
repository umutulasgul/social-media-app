import mongoose from "mongoose";

 const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.error(err);
    });
};

export default databaseConnection;
