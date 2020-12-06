const { Recipe, Ingredient } = require("../db/models");
const RecipeIngredients = require("../db/models/RecipeIngredients");

//FetchRecipes
exports.fetchRecipe = async (recipeId, next) => {
  try {
    const recipe = await Recipe.findByPk(recipeId);
    return recipe;
  } catch (error) {
    next(error);
  }
};

// //Create Ingredient
// exports.ingredientCreate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `${req.protocol}://${req.get("host")}/media/${
//         req.file.filename
//       }`;
//     }
//     req.body.recipeId = req.recipe.id;
//     const newIngredient = await Ingredient.create(req.body);
//     res.status(201).json(newIngredient);
//   } catch (err) {
//     next(err);
//   }
// };

//Create Recipe
exports.recipeCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);

    req.body.ingredientId = req.ingredient.id;
    const newRecipeIngredient = await RecipeIngredients.create(req.body);
    res.status(201).json(newRecipeIngredient);
  } catch (err) {
    next(err);
  }
};

//Categories List
exports.recipesList = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Ingredient,
          as: "ingredients",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

//Delete Recipe
exports.recipeDelete = async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    const foundRecipe = await Recipe.findByPk(recipeId);
    if (foundRecipe) {
      await foundRecipe.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (err) {
    next(err);
  }
};

//Update Recipe
exports.recipeUpdate = async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    const foundRecipe = await fetchRecipe(recipeId, next);
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    if (foundRecipe) {
      await foundRecipe.update(req.body);
      // for (const key in req.body) foundRecipe[key] = req.body[key];
      res.status(204).end();
    } else {
      const err = new Error("Recipe Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
