import express from "express";
import cors from "cors";
import connectDatabase from "./config/database.js";
import userRoutes from "./routes/users.js";
import recipeRoutes from "./routes/recipes.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();

connectDatabase();

app.use(express.json());
app.use(cors()); 

app.use("/auth", userRoutes);
app.use("/recipes", recipeRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
