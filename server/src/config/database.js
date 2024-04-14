import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log(error));
};

export default connectDatabase