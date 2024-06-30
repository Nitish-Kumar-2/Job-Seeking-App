import mongoose from "mongoose";
export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
