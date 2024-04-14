import { RecipeModel } from "../models/recipes.js";
import { UserModel } from "../models/users.js";
import { validationResult, matchedData } from "express-validator";

const createRecipeHandler = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const data = matchedData(req);
  const {
    name,
    description,
    ingredients,
    cookingTime,
    instructions,
    userOwner,
    imageUrl,
  } = data;
  try {
    const newRecipe = new RecipeModel({
      name,
      description,
      ingredients,
      cookingTime,
      instructions,
      userOwner,
      imageUrl,
    });
    const newSavedRecipe = await newRecipe.save();
    res.status(201).json(newSavedRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find({});
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveRecipe = async (req, res) => {
  const { userID, recipeID } = req.body;
  try {
    const recipe = await RecipeModel.findById(recipeID);
    const user = await UserModel.findById(userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSavedRecipesIds = async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await UserModel.findById(userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
};

const getSavedRecipes = async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await UserModel.findById(userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (err) {
    res.json(err);
  }
};

export {
  createRecipeHandler,
  getRecipes,
  getSavedRecipes,
  getSavedRecipesIds,
  saveRecipe
};