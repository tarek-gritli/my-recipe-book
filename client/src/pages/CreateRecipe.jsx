import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { validateInputs } from "../utils/helpers";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    imageUrl: "",
    instructions: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const [cookies, _] = useCookies();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ""],
    });
  };

  const handleCreateRecipe = async () => {
    if (!validateInputs({ recipe, setErrors })) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/recipes", recipe, {
        headers: { authorization: cookies.token },
      });
      alert("recipe created");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <input
            type="text"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              errors.imageUrl ? "border-red-500" : ""
            }`}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm">{errors.imageUrl}</p>
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Instructions</label>
          <textarea
            value={recipe.instructions}
            name="instructions"
            onChange={handleChange}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              errors.instructions ? "border-red-500" : ""
            }`}
          />
          {errors.instructions && (
            <p className="text-red-500 text-sm">{errors.instructions}</p>
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500" htmlFor="ingredients">
            Ingredients
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              placeholder={`ingredient ${index + 1}`}
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
              className={`border-2 border-gray-500 px-4 py-2 w-full ${
                errors.ingredients ? "border-red-500" : ""
              }`}
            />
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Ingredient
          </button>
          {errors.ingredients && (
            <p className="text-red-500 text-sm">{errors.ingredients}</p>
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Cooking Time</label>
          <input
            type="number"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${
              errors.cookingTime ? "border-red-500" : ""
            }`}
          />
          {errors.cookingTime && (
            <p className="text-red-500 text-sm">{errors.cookingTime}</p>
          )}
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleCreateRecipe}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateRecipe;
