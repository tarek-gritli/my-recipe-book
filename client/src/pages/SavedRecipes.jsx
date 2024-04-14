import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import RecipeCard from "../components/RecipeCard";
import { useToast } from "@chakra-ui/react";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies();
  const userID = useGetUserID();
  const toast = useToast();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/savedRecipes/${userID}`,
          { headers: { authorization: cookies.token } }
        );
        const recipes = response.data.savedRecipes;

        const recipePromises = recipes.map(async (recipe) => {
          const response = await axios.get(
            `http://localhost:3000/auth/${recipe.userOwner}`
          );
          const username = response.data.username;
          return { ...recipe, username };
        });
        const recipesWithUsernames = await Promise.all(recipePromises);
        setSavedRecipes(recipesWithUsernames);
      } catch (err) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          status: "error",
          position: "top-left",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchSavedRecipes();
  }, []);

  return (
    <div className="flex justify-center bg-slate-200">
      <div className="m-10">
        {savedRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} whichPage="saved" />
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;
