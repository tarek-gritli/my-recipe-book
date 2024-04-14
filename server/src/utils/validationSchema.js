export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Username must be 5-32 characters long",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  password: {
    isLength: {
      options: {
        min: 6,
      },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
};

export const createRecipeValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "Description is required",
    },
  },
  imageUrl: {
    notEmpty: {
      errorMessage: "Image URL is required",
    },
  },
  instructions: {
    notEmpty: {
      errorMessage: "Instructions are required",
    },
  },
  ingredients: {
    notEmpty: {
      errorMessage: "Ingredients list is required",
    },
  },
  cookingTime: {
    notEmpty: {
      errorMessage: "Cooking Time field can't be left blank.",
    },
    isNumeric: {
      options: {
        min: 0,
      },
      errorMessage: "Cooking Time  must be a positive number.",
    },
  },
  userOwner: {
    notEmpty: {
      errorMessage: "Owner of recipe is required.",
    }
  }
};
