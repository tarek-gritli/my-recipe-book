import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import RecipeCard from "../components/RecipeCard";
import { useToast } from "@chakra-ui/react";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies();

  const userID = useGetUserID();
  const toast = useToast();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        const recipes = response.data;

        const recipePromises = recipes.map(async (recipe) => {
          const response = await axios.get(
            `http://localhost:3000/auth/${recipe.userOwner}`
          );
          const username = response.data.username;
          return { ...recipe, username };
        });
        const recipesWithUsernames = await Promise.all(recipePromises);
        setRecipes(recipesWithUsernames);
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
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/savedRecipes/ids/${userID}`,
          { headers: { authorization: cookies.token } }
        );
        setSavedRecipes(response.data.savedRecipes);
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

    fetchRecipes();
    if (cookies.token) fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.token } }
      );
      setSavedRecipes(response.data.savedRecipes);
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

  const isSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="flex justify-center bg-slate-200">
      <div className="m-10">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            saveRecipe={saveRecipe}
            isSaved={isSaved}
            whichPage="home"
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
