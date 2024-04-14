import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { createRecipeValidationSchema } from "../utils/validationSchema.js";
import {
  createRecipeHandler,
  getRecipes,
  getSavedRecipes,
  getSavedRecipesIds,
  saveRecipe,
} from "../controllers/recipes.js";
import { checkSchema } from "express-validator";

const router = Router();

router.get("/", getRecipes);

router.post(
  "/",
  checkSchema(createRecipeValidationSchema),
  createRecipeHandler
);

router.put("/", checkAuth, saveRecipe);

router.get("/savedRecipes/ids/:userID", checkAuth, getSavedRecipesIds);

router.get("/savedRecipes/:userID", checkAuth, getSavedRecipes);

export default router;
