const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  recipesList,
  recipeDelete,
  recipeCreate,
  recipeUpdate,
  fetchRecipe,
  ingredientCreate,
} = require("../controllers/recipeController");

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipe(recipeId, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    const err = new Error("Recipe Not Found");
    err.status = 404;
    next(err);
  }
});

// //Create Ingredient
// router.post("/:recipeId/ingredients", upload.single("image"), ingredientCreate);

//Create Recipe
router.post("/", upload.single("image"), recipeCreate);

//Read Recipe
router.get("/", recipesList);

//Delete Recipe
router.delete("/:recipeId", recipeDelete);

//Update Recipe
router.put("/:recipeId", upload.single("image"), recipeUpdate);

module.exports = router;
