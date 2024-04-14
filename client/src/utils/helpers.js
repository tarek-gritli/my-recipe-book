export const validateInputs = ({ recipe, setErrors }) => {
  const newErrors = {};
  if (!recipe.name.trim()) {
    newErrors.name = "Name is required";
  }
  if (!recipe.cookingTime || recipe.cookingTime < 0) {
    newErrors.cookingTime = "Cooking Time must be a positive number";
  }
  if(!recipe.description.trim()) {
    newErrors.description = 'Description is required'
  }
  if (!recipe.instructions.trim()) {
    newErrors.instructions = "Instructions are required";
  }
  if(!recipe.ingredients.length>0)
    newErrors.ingredients = "You should add at least one ingredient"
  if (!recipe.imageUrl.trim()) 
    newErrors.imageUrl = "Image URL is required"
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
